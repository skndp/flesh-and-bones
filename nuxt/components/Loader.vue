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
    <div class="loader-pants">
      <div class="loader-crack" ref="crack"></div>
    </div>
  </div>
</template>

<script setup>
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

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
const crack = ref(null);

onMounted(() => {
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
function setMasks() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const mask = createTornEdge(w, h, 0, h * 0.5, w, h * 0.5, 3, 0.5);

  //paper.value.style.maskImage = `url(${mask})`;
  side1.value.style.maskImage = `url(${mask})`;
  side2.value.style.maskImage = `url(${mask}), linear-gradient(#000 0 0)`;
  crack.value.style.backgroundImage = `url(${mask})`;
  crack.value.style.maskImage = `url(${mask}), linear-gradient(#000 0 0)`;
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
        transition: visibility 0ms linear 2s;
      }
    }

    .loader-pants {
      transition: width 2s $ease-out, opacity 100ms linear 2s;
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
        visibility: hidden;
      }
    }

    .loader-pants {
      width: 100%;
      opacity: 0;
    }
  }

  .loader-layer {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: $bone;
    mask-size: cover;

    &:nth-child(2) {
      mask-composite: exclude;
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

  .loader-pants {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 0%;
    height: 100%;
    overflow: hidden;

    .loader-crack {
      width: 100vw;
      height: 100%;
      mask-size: cover;
      background-size: cover;
      background-position-y: 2px;
      mask-composite: exclude;
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
