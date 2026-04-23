<template>
  <div id="loader" ref="loaderRef">
    <div class="loader-layer" ref="side1">
      <div class="loader-loop"></div>
    </div>
    <div class="loader-layer" ref="side2">
      <div class="loader-loop"></div>
    </div>
    <div class="loader-layer">
      <div class="loader-loop"></div>
    </div>
  </div>
</template>

<script setup>
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useSiteStore } from '~/stores/store';

const store = useSiteStore();
const loaderRef = ref(null);
const side1 = ref(null);
const side2 = ref(null);

onMounted(() => {
  // FIRST THINGS FIRST... Is there a scrollbar track?
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  if (scrollbarWidth > 0) {
    document.documentElement.classList.add('--has-track');
  }

  preload();

  if (loaderRef.value) {
    disableBodyScroll(loaderRef.value);
  }

  window.scrollTo(0,0);

  setMasks();
});

onBeforeUnmount(() => {
  if (loaderRef.value) {
    enableBodyScroll(loaderRef.value);
  }
});

// Functions
function preload() {
  // Rip mask
  fetch('/images/rip-mask.png')
    .then(res => res.blob())
    .then(blob => {
      store.setRipMask(blob);
    });

  // Fill mask
  fetch('/images/fill-mask.png')
    .then(res => res.blob())
    .then(blob => {
      store.setFillMask(blob);
    });

  // Page mask
  fetch('/images/page-mask.png')
    .then(res => res.blob())
    .then(blob => {
      store.setPageMask(blob);
    });
}

function setMasks() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const mask = createTornEdge({
    width: w,
    height: h,
    startY: (Math.random() * (h / 2)) + (h / 4),
    endY: (Math.random() * (h / 2)) + (h / 4),
    wobble: 0.6,
    edgeRoughness: 6
  });

  side1.value.style.maskImage = `url(${mask})`;
  side2.value.style.maskImage = `url(${mask}), linear-gradient(#000 0 0)`;
}
</script>

<style lang='scss'>
#loader {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 666;

  &.loading-enter-active,
  &.loading-leave-active {
    transition: opacity 2100ms linear;

    .loader-layer {
      transition: transform 1s cubic-bezier(0.95, 0.05, 0.795, 0.035) 1s;

      &:nth-child(3) {
        transition: clip-path 1s $ease-out;
      }
    }
  }

  &.loading-enter-from,
  &.loading-leave-to {
    opacity: 0.999;

    .loader-layer {
      &:nth-child(1) {
        transform: translate(0%, -100%);
      }

      &:nth-child(2) {
        transform: translate(0%, 100%);
      }

      &:nth-child(3) {
        clip-path: polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%);
      }
    }
  }

  .loader-layer {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: $bone;
    mask-size: 100% calc(100% + 1px);
    mask-repeat: no-repeat;

    &:nth-child(1) {
      mask-position: bottom 1px right 0px;
    }

    &:nth-child(2) {
      mask-composite: exclude;
    }

    &:nth-child(3) {
      clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
    }

    .loader-loop {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 240px;
      aspect-ratio: 1/1;
      background-color: $flesh;
      mask-image: url('/images/loader.webp');
      mask-size: contain;
      mask-repeat: no-repeat;
      transform: translate(-50%, -50%);
    }
  }

  @include respond-to($tablet) {
    .loader-layer {
      .loader-loop {
        width: 320px;
      }
    }
  }
}
</style>
