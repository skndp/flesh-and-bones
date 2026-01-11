<template>
  <div
    class="responsive-image-wrapper"
    :class="{
      '--fit': fit === 'contain',
      '--fill': fit === 'cover',
      'responsive-image-picture--is-loaded': isLoaded,
      'responsive-image-picture--is-errored': isErrored
    }"
  >
    <picture class="responsive-image-picture picture">
      <source
        :srcset="
          src.endsWith('.webp')
            ? generateSrcSet('webp')
            : src.endsWith('.png')
              ? generateSrcSet('png')
              : generateSrcSet('jpg')"
        :type="
          src.endsWith('.webp')
            ? 'image/webp'
            : src.endsWith('.png')
              ? 'image/png'
              : 'image/jpeg'"
        :sizes="`${effectiveWidth}px`"
      >
      <img
        :src="generateSrc()"
        :alt="alt ? alt : dataAlt ? dataAlt : dataFilename"
        :loading="priority ? 'eager' : 'lazy'"
        :sizes="`${effectiveWidth}px`"
        ref="image"
      >
    </picture>
  </div>
</template>

<script>
import { default as throttle } from 'lodash/throttle.js';

export default {
  props: {
    priority: {
      type: Boolean,
      default: false
    },
    src: {
      type: String
    },
    alt: {
      type: String
    },
    dataTitle: {
      type: String
    },
    dataAlt: {
      type: String
    },
    dataFilename: {
      type: String
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    border: {
      type: Boolean,
      default: false
    },
    fit: {
      type: String,
      default: 'cover'
    },
    maxSrcWidth: {
      type: Number,
      default: 2400
    },
    quality: {
      type: Number,
      default: 90
    },
    fallbackEffectiveWidth: {
      type: Boolean,
      default: false
    },
    onLoad: {
      type: Function,
      default: () => {}
    },
    onError: {
      type: Function,
      default: () => {}
    },
    onComplete: {
      type: Function,
      default: () => {}
    },
    callback: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      isLoaded: false,
      isErrored: false,
      effectiveWidth: null,
      min_width: 200
    };
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onViewportResize);
  },
  created() {
    this.throttledResize = throttle(this.onViewportResizeThrottled, 300);
  },
  mounted() {
    window.addEventListener('resize', this.onViewportResize);
    window.requestAnimationFrame(this.onViewportResize);

    if (this.$refs.image) {
      this.$refs.image.addEventListener('load', () => {
        if (!this.isLoaded) {
          this.isLoaded = true;
          this.isComplete = true;
          this.onLoad();
          this.onComplete();
        }
      });

      if (this.$refs.image.complete && this.$refs.image.naturalWidth > 1) {
        if (!this.isLoaded) {
          this.isLoaded = true;
          this.isComplete = true;
          this.onLoad();
          this.onComplete();
        }
      }

      this.$refs.image.addEventListener('error', () => {
        this.isErrored = true;
        this.isComplete = true;
        this.onError();
        this.onComplete();
      });
    }
  },
  methods: {
    generateSrc() {
      if (!this.effectiveWidth) {
        // must return no src if effective width is not determined yet
        // otherwise it will download the asset as if it was the full size
        // of the viewport
        return '';
      }
      let min_width = this.width < this.min_width ? this.min_width : this.width;

      return `${this.src}${this.src.includes('?') ? '&' : '?'}q=${this.quality}&w=${Math.min(min_width, this.maxSrcWidth)}`;
    },
    generateSrcSet(format) {
      if (!this.effectiveWidth) {
        // must return no src if effective width is not determined yet
        // otherwise it will download the asset as if it was the full size
        // of the viewport
        return '';
      }

      let counter = Math.min(this.width, this.maxSrcWidth);
      let widths = [];

      let min_width = this.min_width;
      let diff = 200;

      if (counter <= min_width) {
        widths.push(counter);
      } else {
        while(counter > min_width) {
          widths.push(counter);
          counter -= diff;
        }
      }

      return widths
        .map(width => {
          return `${this.src}${this.src.includes('?') ? '&' : '?'}${format ? 'fm=' + format : ''}&q=${this.quality}&w=${width} ${width}w`;
        })
        .join(', ');
    },
    onViewportResize() {
      this.throttledResize();
    },
    onViewportResizeThrottled() {
      if (!this.$refs.image) {
        return;
      }

      let containerWidth = this.$refs.image.parentNode.parentNode.parentNode.offsetWidth;
      let containerHeight = this.$refs.image.parentNode.parentNode.parentNode.offsetHeight;
      let containerRatio = containerWidth / containerHeight;
      let sourceRatio = this.width / this.height;

      let newWidth = null;
      let newHeight = null;

      if (this.fit === 'cover') {
        if (containerRatio > sourceRatio) {
          newWidth = containerWidth;
          newHeight = Math.ceil(newWidth / sourceRatio);
        } else {
          newHeight = containerHeight;
          newWidth = Math.ceil(newHeight * sourceRatio);
        }
      } else if (this.fit === 'contain') {
        if (containerRatio > sourceRatio) {
          newHeight = containerHeight;
          newWidth = Math.ceil(newHeight * sourceRatio);
        } else {
          newWidth = containerWidth;
          newHeight = Math.ceil(newWidth / sourceRatio);
        }
      } else {
        newWidth = containerWidth;
      }

      this.effectiveWidth = Math.ceil(containerRatio > 1 ? window.innerWidth : window.innerHeight);

      if (!this.effectiveWidth && this.fallbackEffectiveWidth) {
        this.effectiveWidth = window.innerWidth;
      }
    }
  }
};
</script>

<style lang='scss'>

.responsive-image-wrapper {
  position: relative;
  width: 100%;
  user-select: none;
  pointer-events: none;
  
  &.--fill,
  &.--fit {
    @include abs-fill;
    overflow: hidden;

    picture.responsive-image-picture {
      @include abs-fill;

      img {
        @include abs-fill;
        object-fit: cover;
        object-position: 50% 50%;
      }
    }
  }

  &.--fit {
    picture.responsive-image-picture {
      img {
        object-fit: contain;
      }
    }
  }

  picture.responsive-image-picture {
    pointer-events: none;
    opacity: 0;

    img {
      width: 100%;
      height: auto;
    }
  }

  &.responsive-image-picture--is-loaded,
  &.responsive-image-picture--is-errored {
    picture.responsive-image-picture {
      opacity: 1;
      transition: opacity $speed-333 $ease-out;
    }
  }
}
</style>
