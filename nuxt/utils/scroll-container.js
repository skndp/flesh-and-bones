class ScrollContainer {
  constructor(node, ctx = {}) {
    this._node = node
    this._ctx = ctx

    this._event_horizons = Number(ctx.horizons) || 4

    this._window_segments = []
    this._triggered_offsets = []
    this._parallaxed_ranges = []
    this._lastTransforms = new WeakMap()

    this._latestScrollY = 0
    this._rafId = 0
    this._pendingMeasure = true
    this._pendingUpdate = true

    // motion preference
    this._reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // bind
    this.onResize = this.onResize.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.onRAF = this.onRAF.bind(this)

    this.refresh()

    window.addEventListener("resize", this.onResize, { passive: true })
    window.addEventListener("scroll", this.onScroll, { passive: true })

    this._rafId = requestAnimationFrame(this.onRAF)
  }

  refresh() {
    this._triggered = this._node.querySelectorAll('[data-scroll="trigger"]')
    this._parallaxed = this._node.querySelectorAll('[data-scroll="parallax"]')
    this._pendingMeasure = true
    this._pendingUpdate = true
  }

  onResize() {
    this._pendingMeasure = true
    this._pendingUpdate = true
  }

  onScroll() {
    this._latestScrollY = window.pageYOffset
    this._pendingUpdate = true
  }

  // ----- measuring (DOM reads) -----

  measure() {
    const viewH = window.innerHeight
    const segment = viewH / this._event_horizons

    this._window_segments.length = 0
    for (let i = 0; i < this._event_horizons; i++) {
      this._window_segments[i] = segment * i
    }
    this._window_segments[this._event_horizons] = viewH

    this.cacheTriggeredOffsets()
    this.cacheParallaxedRanges()
  }

  cacheTriggeredOffsets() {
    this._triggered_offsets = Array.from(this._triggered).map(
      (t) => t.getBoundingClientRect().top + window.pageYOffset
    )
  }

  parseFx(el) {
    const fxRaw = el.getAttribute("data-fx")
    if (!fxRaw) return []

    try {
      const parsed = JSON.parse(fxRaw)
      if (!Array.isArray(parsed)) return []
      return parsed
        .map((p) => {
          if (!p || typeof p !== "object") return null
          const prop = p.prop
          const from = Number(p.from)
          const to = Number(p.to)
          if (!prop || !Number.isFinite(from) || !Number.isFinite(to)) return null
          return { prop, from, to, at: from }
        })
        .filter(Boolean)
    } catch {
      return []
    }
  }

  cacheParallaxedRanges() {
    this._parallaxed_ranges = Array.from(this._parallaxed).map((t) => {
      const rect = t.getBoundingClientRect()
      const fx = this.parseFx(t)

      return {
        from: (rect.top - window.innerHeight) + window.pageYOffset,
        to: ((rect.bottom) + window.pageYOffset),
        fx,
      }
    })
  }

  // ----- computing (no DOM reads) -----

  compute(scrollY) {
    // triggered classes
    this._triggered_offsets.forEach((offset, i) => {
      const el = this._triggered[i]
      if (!el) return

      const add = []
      const remove = []

      this._window_segments.forEach((segment, j) => {
        const c = `trigger-${Math.floor((1 - j / this._event_horizons) * 100)}`
        if (scrollY + segment > offset) add.push(c)
        else remove.push(c)
      })

      el.classList.remove(...remove)
      el.classList.add(...add)
    })

    // parallax compute
    this._parallaxed_ranges.forEach((range) => {
      let percent = 0
      if (scrollY > range.from && scrollY < range.to) {
        percent = (scrollY - range.from) / (range.to - range.from)
      } else if (scrollY > range.to) {
        percent = 1
      }

      range.fx.forEach((prop) => {
        prop.at = prop.from + (prop.to - prop.from) * percent
      })
    })
  }

  // ----- applying (DOM writes) -----

  apply() {
    if (this._reducedMotion) return

    Array.from(this._parallaxed).forEach((el, i) => {
      const range = this._parallaxed_ranges[i]
      if (!range) return

      let transform = ""
      let opacity = 1

      range.fx.forEach((fx) => {
        const at = fx.at != null ? fx.at : fx.from

        switch (fx.prop) {
          case "x":
            transform += `translateX(${Math.round(at)}px) `
            break
          case "y":
            transform += `translateY(${Math.round(at)}px) `
            break
          case "r":
            transform += `rotateZ(${Math.round(at)}deg) `
            break
          case "rx":
            transform += `perspective(800px) rotateX(${Math.round(at)}deg) `
            break
          case "ry":
            transform += `perspective(800px) rotateY(${Math.round(at)}deg) `
            break
          case "s":
            transform += `scale(${at}) `
            break
          case "o":
            opacity = at
            break
        }
      })

      const prev = this._lastTransforms.get(el)
      const next = transform + "|" + opacity
      if (prev !== next) {
        el.style.transform = transform
        el.style.opacity = String(opacity)
        this._lastTransforms.set(el, next)
      }
    })
  }

  onRAF() {
    this._rafId = requestAnimationFrame(this.onRAF)

    if (this._pendingMeasure) {
      this.measure()
      this._pendingMeasure = false
      this._pendingUpdate = true
    }

    if (this._pendingUpdate) {
      this.compute(this._latestScrollY || window.pageYOffset)
      this.apply()
      this._pendingUpdate = false
    }
  }

  unmount() {
    window.removeEventListener("resize", this.onResize)
    window.removeEventListener("scroll", this.onScroll)
    if (this._rafId) cancelAnimationFrame(this._rafId)
  }
}

const DEFAULTS = { directiveName: "scroll-container" }

export default {
  install(app, options = {}) {
    const opts = { ...DEFAULTS, ...options }

    app.directive(opts.directiveName, {
      getSSRProps() {
        return {}
      },

      mounted(el, binding) {
        if (!process.client) return
        el.__scrollContainer = new ScrollContainer(el, binding.value || {})
      },

      updated(el) {
        if (!process.client) return
        if (el.__scrollContainer) el.__scrollContainer.refresh()
      },

      unmounted(el) {
        if (!process.client) return
        if (el.__scrollContainer) el.__scrollContainer.unmount()
        delete el.__scrollContainer
      },
    })
  },
}
