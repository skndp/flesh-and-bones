<template>
  <div ref="itemRef" class="item project flesh" :class="[ layout ]">
    <div ref="infoRef" class="item-info">
      <h3 class="h3">{{ item.title }}</h3>
      <div class="meta">
        <p class="brush xs"><strong>Director - {{ item.director.title }}</strong></p>
      </div>
    </div>
    <div v-if="item.ctaCardImages" class="item-image" @mouseenter="onItemHover" @mouseleave="onItemHover">
      <template v-if="(layout === 'square' || isSmallScreen) && item.ctaCardImages.squareImage">
        <div class="item-image-paper" :style="{'background-color': item.ctaCardImages.squareImage.image.palette.muted.background}" ref="paper"></div>
        <ResponsiveImage v-bind="item.ctaCardImages.squareImage.image" ref="imgTop" />
        <ResponsiveImage v-bind="item.ctaCardImages.squareImage.image" class="item-hover-image" />
      </template>
      <template v-else>
        <div class="item-image-paper" :style="{'background-color': item.ctaCardImages.landscapeImage.image.palette.muted.background}" ref="paper"></div>
        <ResponsiveImage v-bind="item.ctaCardImages.landscapeImage.image" ref="imgTop" />
        <ResponsiveImage v-bind="item.ctaCardImages.landscapeImage.image" class="item-hover-image" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';

const store = useSiteStore();
const itemRef = ref(null);
const infoRef = ref(null);
const tearY = ref(0.8);

const paper = ref(null);
const imgTop = ref(null);
const isSmallScreen = ref(false);

// Props
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  layout: {
    type: String,
    required: true
  }
});

// Lifecycle
onMounted(() => {
  window.addEventListener('resize', onResize);
  nextTick(() => {
    onResize();
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
});

// Functions
function onResize() {
  isSmallScreen.value = window.innerWidth < 540;

  nextTick(() => {
    reflow();
  });
}

function onItemHover(e) {
  const t = e.currentTarget,
        i = t.querySelector('.item-hover-image');

  if(e.type === 'mouseenter') {
    i.style.maskComposite = 'exclude';
    i.style.maskImage = `url('${store.getRipMask()}'), linear-gradient(#000 0 0)`;
  } else {
    i.style.maskComposite = 'unset';
    i.style.maskImage = `url('${store.getRipMask()}')`;
  }
}

function reflow() {
  if(paper.value && imgTop.value) {
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

    paper.value.style.maskImage = `url(${dataURL})`;
    imgTop.value.$el.style.maskImage = `url(${dataURL})`;
  }
}
</script>

<style lang='scss'>
.item.project {
  position: relative;
  aspect-ratio: 1/1;
  cursor: pointer;

  &:not(:has(.item-image)) {
    background-color: goldenrod;

    .item-info {
      transition: visibility 0ms linear;
      visibility: visible;
    }
  }

  @include can-hover {
    &:hover {
      .item-info {
        transition: visibility 0ms linear;
        visibility: visible;
      }

      .item-image {
        .item-image-paper {
          transition: visibility 0ms linear;
          visibility: visible;
        }

        .responsive-image-wrapper {
          &:nth-child(2) {
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
    width: 100%;
    padding: $space-8;

    @include can-hover {
      transition: visibility 0ms linear 350ms;
      visibility: hidden;
    }

    .meta {
      margin: 4px 0 0;
    }
  }

  .item-image {
    position: relative;
    width: 100%;
    height: 100%;

    .item-image-paper {
      position: absolute;
      top: 0px;
      left: 0.5px; // pixel rounding patch
      width: calc(100% - 1px); // pixel rounding patch
      height: 100%;
      mask-size: cover;
      transform: translate(0px, 2px);
      opacity: 0.5;

      @include can-hover {
        transition: visibility 0ms linear 350ms;
        visibility: hidden;
      }
    }

    .responsive-image-wrapper {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      mask-size: cover;

      &:nth-child(3) {
        display: none;
      }

      @include can-hover {
        &:nth-child(2) {
          transition: visibility 0ms linear 350ms;
          visibility: hidden;
        }

        &:nth-child(3) {
          display: block;
          mask-size: 101% 50%;
          mask-position: bottom -1px right -1px;
          mask-image: url('/images/rip-mask.png');
          pointer-events: none;
          backface-visibility: hidden;
          transform: translateZ(0);
          will-change: transform, mask-image, mask-composite;
        }
      }
    }
  }

  @include respond-to($small-tablet) {
    aspect-ratio: 1/1;

    &.landscape {
      aspect-ratio: 2/1;
    }
  }

  @include respond-to($tablet) {
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
