<template>
  <div ref="itemRef" class="item project flesh" :class="[ layout ]" @mouseenter="onItemHover" @mouseleave="onItemHover">
    <div ref="infoRef" class="item-info">
      <h3 class="h3 rough-edges-light">{{ item.title }}</h3>
      <div class="meta">
        <p v-if="!item.directorName && item.director && item.director.title" class="brush xs"><strong>Director - {{ item.director.title }}</strong></p>
        <p v-if="!item.director && item.directorName" class="brush xs"><strong>Director - {{ item.directorName }}</strong></p>
      </div>
    </div>
    <div v-if="item.ctaCardImages" class="item-image">
      <ResponsiveImage
        ref="imgTop"
        v-bind="useSquareImage ? item.ctaCardImages.squareImage.image : item.ctaCardImages.landscapeImage.image"
      />
      <ResponsiveImage
        class="item-hover-image"
        v-bind="useSquareImage ? item.ctaCardImages.squareImage.image : item.ctaCardImages.landscapeImage.image"
      />
    </div>
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';

const store = useSiteStore();
const itemRef = ref(null);
const infoRef = ref(null);
const tearY = ref(0.8);

const imgTop = ref(null);
const isSmallScreen = ref(false);
const landscapeSwap = ref(false);

let mediaQuery = null;
let resizeTo = 0;
let lastWidth = 0;

// Props
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  layout: {
    type: String,
    required: true
  },
  rowLayout: {
    type: String,
    required: true
  },
  nthChild: {
    type: Number,
    required: true
  }
});

const useSquareImage = computed(() => {
  const shouldUseSquare = (props.layout === 'square' || isSmallScreen.value) && !landscapeSwap.value;
  return shouldUseSquare && props.item.ctaCardImages.squareImage;
});

// Lifecycle
onMounted(() => {
  window.addEventListener('resize', onResize);
  onResize();

  mediaQuery = window.matchMedia('(min-width: 1440px)');
  handleMediaChange(mediaQuery);
  mediaQuery.addEventListener('change', handleMediaChange);
});

onBeforeUnmount(() => {
  clearTimeout(resizeTo);
  window.removeEventListener('resize', onResize);

  if (mediaQuery) {
    mediaQuery.removeEventListener('change', handleMediaChange);
  }
});

// Functions
function handleMediaChange(e) {
  landscapeSwap.value =
    e.matches &&
    (
      (props.rowLayout === 'two-third-one-third' && props.nthChild === 1) ||
      (props.rowLayout === 'one-third-two-third' && props.nthChild === 2)
    );
}

function onResize() {
  isSmallScreen.value = window.innerWidth < 768;

  if (window.innerWidth === lastWidth) return;

  clearTimeout(resizeTo);
  resizeTo = setTimeout(() => {
    lastWidth = window.innerWidth;
    reflow();
  }, 250);
}

function onItemHover(e) {
  const t = e.currentTarget,
        img = t.querySelector('.item-hover-image'),
        info = t.querySelector('.item-info');

  if(e.type === 'mouseenter') {
    img.style.maskComposite = 'exclude';
    img.style.maskImage = `url('${store.getRipMask()}'), linear-gradient(#000 0 0)`;

    info.style.maskComposite = 'unset';
    info.style.maskImage = `url('${store.getRipMask()}')`;
  } else {
    img.style.maskComposite = 'unset';
    img.style.maskImage = `url('${store.getRipMask()}')`;

    info.style.maskComposite = 'exclude';
    info.style.maskImage = `url('${store.getRipMask()}'), linear-gradient(#000 0 0)`;
  }
}

function reflow() {
  if(imgTop.value) {
    const b = imgTop.value.$el.getBoundingClientRect(),
          w = b.width,
          h = b.height;

    let y_percent = 1 - (infoRef.value.getBoundingClientRect().height / itemRef.value.getBoundingClientRect().height);
    tearY.value = (Math.round(y_percent * 100) / 100) - 0.02;

    const dataURL = createTornEdge({
      width: w,
      height: h,
      startY: h * tearY.value,
      endY: h * tearY.value,
      wobble: 0.3,
      edgeRoughness: 4
    });

    imgTop.value.$el.style.maskImage = `url(${dataURL})`;
  }
}
</script>

<style lang='scss'>
.item.project {
  position: relative;
  aspect-ratio: 1/1;
  min-width: 0;
  cursor: pointer;

  @include can-hover {
    &:hover {
      .item-image {
        .responsive-image-wrapper {
          &:nth-child(1) {
            transition: visibility 0ms linear;
            visibility: visible;
          }
        }
      }
    }
  }

  .item-info {
    position: absolute;
    bottom: 0px;
    left: 0px;
    padding: $space-8;
    width: calc(100% - $space-16);

    @include can-hover {
      mask-size: cover;
      mask-composite: exclude;
      mask-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDI1NiAyNTYiIj48cGF0aCBkPSJNMTI4IDAgQTEyOCAxMjggMCAxIDEgMCAxMjggMTI4IDEyOCAwIDEgMSAxMjggMCIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==');
    }

    .meta {
      margin: 4px 0 0;
    }
  }

  .item-image {
    position: relative;
    width: 100%;
    height: 100%;

    .responsive-image-wrapper {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      mask-size: cover;

      &:nth-child(2) {
        display: none;
      }

      @include can-hover {
        &:nth-child(1) {
          transition: visibility 0ms linear 350ms;
          visibility: hidden;
        }

        &:nth-child(2) {
          display: block;
          mask-size: 101% 50%;
          mask-position: bottom -1px right -1px;
          pointer-events: none;
          backface-visibility: hidden;
          transform: translateZ(0);
          will-change: transform, mask-image, mask-composite;
        }
      }
    }
  }

  @include respond-to($tablet) {
    &.landscape {
      aspect-ratio: 2/1;
    }

    .item-info {
      padding: $space-16;
      width: calc(100% - $space-32);

      .meta {
        margin: $space-8 0 0;
      }
    }
  }

  @include respond-to($macbook) {
    aspect-ratio: 4/3;

    &.landscape {
      aspect-ratio: 8/3;
    }
  }
}
</style>
