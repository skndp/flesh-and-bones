import { onMounted, onBeforeUnmount } from 'vue';

export const bgBoogie = function (el, speed = 0.3) {
  let ticking = false;

  let lastTop = null;
  let offsetY = 0;

  // NEW: baseline state
  let baseScrollY = 0;   // scrollY when we anchored
  let baseOffsetY = 0;   // offsetY at the moment of anchoring (usually 0)

  function applyTransform(y) {
    if (!el?.value) return;
    el.value.style.transform = `translate3d(0px, ${y}px, 0px)`;
  }

  function anchorToCurrentState() {
    // Treat the current scroll position as "reference" to prevent accumulating error.
    baseScrollY = window.scrollY || 0;
    baseOffsetY = offsetY;
  }

  function measureAndApply() {
    if (!el?.value) return;

    const rect = el.value.getBoundingClientRect();
    const vh = window.innerHeight;

    if (lastTop === null) lastTop = rect.top;

    // If the user is at the very top, force-reset to baseline
    // (use a small threshold to account for iOS bounce / fractional scroll)
    const atTop = (window.scrollY || 0) <= 1;
    if (atTop) {
      offsetY = 0;
      applyTransform(0);
      lastTop = rect.top;
      anchorToCurrentState();
      return;
    }

    const deltaTop = rect.top - lastTop;
    const deltaScroll = -deltaTop;

    const isNearViewport = rect.bottom > -200 && rect.top < vh + 200;
    if (isNearViewport) {
      offsetY += deltaScroll * speed;
      applyTransform(offsetY);
    }

    lastTop = rect.top;
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      measureAndApply();
      ticking = false;
    });
  }

  function onResize() {
    if (!el?.value) return;
    lastTop = el.value.getBoundingClientRect().top;
    // Optional: re-anchor on resize to avoid jumps when layout changes
    anchorToCurrentState();
  }

  onMounted(() => {
    if (!el?.value) return;

    lastTop = el.value.getBoundingClientRect().top;
    offsetY = 0;
    applyTransform(0);
    anchorToCurrentState();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
  });
};
