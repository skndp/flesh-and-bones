<template>
  <div id="loader" ref="loaderRef">
    <div class="loader-layer" ref="side1">
      <Animated :autoplay="false" type="bolt" :loop="true" background="bg-flesh" ref="bolt1" />
      <Animated :autoplay="false" type="bolt" :loop="true" background="bg-flesh" ref="bolt2" />
      <Animated :autoplay="false" type="bolt" :loop="true" background="bg-flesh" ref="bolt3" />
      <Animated :autoplay="true" type="xxx" :loop="true" background="bg-midnight" />
      <div class="loader-skull"></div>
      <div class="loader-logo"></div>
    </div>
    <div class="loader-layer" ref="side2">
      <Animated :autoplay="false" type="bolt" :loop="true" background="bg-flesh" ref="bolt4" />
      <Animated :autoplay="false" type="bolt" :loop="true" background="bg-flesh" ref="bolt5" />
      <Animated :autoplay="false" type="bolt" :loop="true" background="bg-flesh" ref="bolt6" />
      <Animated :autoplay="true" type="xxx" :loop="true" background="bg-midnight" />
      <div class="loader-skull"></div>
      <div class="loader-logo"></div>
    </div>
    <div class="loader-layer">
      <Animated :autoplay="false" type="bolt" :loop="true" background="bg-flesh" ref="bolt7" />
      <Animated :autoplay="false" type="bolt" :loop="true" background="bg-flesh" ref="bolt8" />
      <Animated :autoplay="false" type="bolt" :loop="true" background="bg-flesh" ref="bolt9" />
      <Animated :autoplay="true" type="xxx" :loop="true" background="bg-midnight" />
      <div class="loader-skull"></div>
      <div class="loader-logo"></div>
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
const bolt1 = ref(null);
const bolt2 = ref(null);
const bolt3 = ref(null);
const bolt4 = ref(null);
const bolt5 = ref(null);
const bolt6 = ref(null);
const bolt7 = ref(null);
const bolt8 = ref(null);
const bolt9 = ref(null);

onMounted(() => {
  // FIRST THINGS FIRST... Is there a scrollbar track?
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  if (scrollbarWidth > 0) {
    document.documentElement.classList.add('--has-track');
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
  }

  preload();

  if (loaderRef.value) {
    disableBodyScroll(loaderRef.value);
  }

  window.scrollTo(0,0);

  bolt1.value.play();
  bolt4.value.play();
  bolt7.value.play();

  setTimeout(() => {
    bolt2.value.play();
    bolt5.value.play();
    bolt8.value.play();
  }, 40);

  setTimeout(() => {
    bolt3.value.play();
    bolt6.value.play();
    bolt9.value.play();
  }, 80);

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
    transition: opacity 4100ms linear;

    .loader-layer {
      transition: transform 2s cubic-bezier(0.95, 0.05, 0.795, 0.035) 2s;

      &:nth-child(3) {
        transition: clip-path 2s $ease-out;
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

    .animated {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 38px;

      &:nth-child(1) {
        transform: translate(120px, -60px);
      }

      &:nth-child(2) {
        transform: translate(0px, -100px) rotate(-45deg);
      }

      &:nth-child(3) {
        transform: translate(-120px, -90px) rotate(-90deg);
      }

      &:nth-child(4) {
        width: 60px;
        transform: translate(-50%, 60px);
        opacity: 0.65;
      }
    }

    .loader-skull {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 60px;
      aspect-ratio: 577/500;
      background-color: $flesh;
      mask-image: url('/images/skull.png');
      mask-size: contain;
      mask-repeat: no-repeat;
      transform: translate(-50%, 60px);
    }

    .loader-logo {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 240px;
      aspect-ratio: 100/27;
      background-color: $flesh;
      mask-image: url('/images/logo.png');
      mask-size: contain;
      mask-repeat: no-repeat;
      transform: translate(-50%, -50%);
    }
  }

  @include respond-to($tablet) {
    .loader-layer {
      .animated {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 50px;

        &:nth-child(1) {
          transform: translate(180px, -90px);
        }

        &:nth-child(2) {
          transform: translate(0px, -150px) rotate(-45deg);
        }

        &:nth-child(3) {
          transform: translate(-180px, -135px) rotate(-90deg);
        }

        &:nth-child(4) {
          width: 90px;
          transform: translate(-50%, 90px);
        }
      }

      .loader-skull {
        width: 90px;
        transform: translate(-50%, 90px);
      }

      .loader-logo {
        width: 320px;
      }
    }
  }
}
</style>
