<template>
  <section
    ref="heroVideoRef"
    class="home-hero-video"
    :class="{ 'init': playerReady }"
  >
    <div class="home-hero-video-inner" ref="inner">
      <VideoPlayer
        ref="videoPlayerRef"
        :vimeo="video"
        :cover="true"
        :manualPlay="true"
        @ready="onPlayerReady"
      />
    </div>
    <Transition name="loading">
      <div v-if="!playerReady" class="loading-label">
        <span class="h3 flesh rough-edges-light">LOADING</span>
      </div>
    </Transition>
    <Transition name="hint">
      <button v-if="scrollHint" class="scroll-hint" @click="clickScrollHint"></button>
    </Transition>
  </section>
</template>

<script setup>
import { bgBoogie } from '~/utils/bg-boogie';
import { smoothScrollTo } from '~/utils/smooth-scroll-to';

const store = useSiteStore();

// Props
const props = defineProps({
  video: {
    type: Object,
    required: true
  }
});

const heroVideoRef = ref(null);
const videoPlayerRef = ref(null);
const inner = ref(null);

const playerReady = ref(false);
const siteLoaded = ref(false);
const scrollHint = ref(true);

let readyDelayTimer = null;
let fallbackTimer = null;
let resizeTo = 0;

onMounted(() => {
  window.addEventListener('resize', onResize);

  setMask();
  bgBoogie(inner, 0.27);

  fallbackTimer = setTimeout(() => {
    triggerSiteLoaded();
  }, 3000);
});

onBeforeUnmount(() => {
  clearTimeout(resizeTo);
  window.removeEventListener('resize', onResize);

  clearTimeout(readyDelayTimer);
  clearTimeout(fallbackTimer);
});

function onResize() {
  clearTimeout(resizeTo);
  resizeTo = setTimeout(() => {
    setMask();
  }, 250);
}

function setMask() {
  if (!heroVideoRef.value) return;

  const b = heroVideoRef.value.getBoundingClientRect();
  const mask = createTornEdge({
    width: b.width,
    height: Math.ceil(b.height), // Ceil up, pixel rounding issue for Safari
    startY: b.height - 100,
    endY: b.height - 100,
    wobble: 0.2,
    edgeRoughness: 6
  });

  heroVideoRef.value.style.maskImage = `url(${mask})`;
}

function onPlayerReady() {
  if (siteLoaded.value) return;

  readyDelayTimer = setTimeout(() => {
    triggerSiteLoaded();
  }, 1000);
}

function triggerSiteLoaded() {
  playerReady.value = true;

  if (siteLoaded.value) return;
  siteLoaded.value = true;

  clearTimeout(readyDelayTimer);
  clearTimeout(fallbackTimer);

  store.setLoaderComplete();

  if (videoPlayerRef.value) {
    videoPlayerRef.value.playPlayer();
  }
}

function clickScrollHint() {
  if (!heroVideoRef.value) return;

  const destination = heroVideoRef.value.getBoundingClientRect().height;
  smoothScrollTo(destination);
  scrollHint.value = false;
}
</script>

<style lang='scss'>
section.home-hero-video {
  position: relative;
  width: 100%;
  background-color: rgba(0,0,0,0.27);
  height: calc(100svh + 50px); // a quarter of the 200px tear height
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &.init {
    .home-hero-video-inner {
      .video-player-wrapper {
        opacity: 1;
        transition: opacity $speed-666 $ease-out 2s;
      }
    }
  }

  .home-hero-video-inner {
    @include abs-fill;

    .video-player-wrapper {
      opacity: 0;
    }
  }

  .loading-label {
    position: relative;
    margin-top: -25px; // half of 50px offset of tear line
    white-space: nowrap;
    display: flex;

    span {
      position: relative;
      display: flex;
      animation: vibrate $speed-666 steps(1) infinite;

      &:after {
        content: '';
        position: absolute;
        top: 0px;
        left: 100%;
        height: 0.8em;
        aspect-ratio: 203/184;
        background-color: $bone;
        mask-image: url('/images/bolts.png');
        mask-repeat: no-repeat;
        mask-position: 50% 50%;
        mask-size: contain;
        transform: translateX(0.1em) translateY(-27%) scaleX(-1);
      }
    }

    @keyframes vibrate {
      0% { transform: translate(0px, 0px); }
      10% { transform: translate(0.5px, -0.5px); }
      20% { transform: translate(-0.5px, 0.5px); }
      30% { transform: translate(0.5px, 0px); }
      40% { transform: translate(-0.5px, -0.5px); }
      50% { transform: translate(0px, 0.5px); }
      60% { transform: translate(0.5px, 0.5px); }
      70% { transform: translate(-0.5px, 0px); }
      80% { transform: translate(0px, -0.5px); }
      90% { transform: translate(0.5px, 0px); }
      100% { transform: translate(0px, 0px); }
    }

    &.loading-enter-active,
    &.loading-leave-active {
      transition: opacity $speed-666 $ease-out 1.333s;
    }

    &.loading-enter-from,
    &.loading-leave-to {
      opacity: 0;
    }
  }

  .scroll-hint {
    position: absolute;
    bottom: 120px;
    left: 50%;
    width: 40px;
    aspect-ratio: 1/1;
    background-image: url('/images/middle-finger.png');
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
    transform: translateX(-50%) scaleY(-1);
    cursor: pointer;

    &.hint-enter-active,
    &.hint-leave-active {
      transition: opacity $speed-666 linear;
    }

    &.hint-enter-from,
    &.hint-leave-to {
      opacity: 0;
    }
  }

  @include respond-to($tablet) {
    .scroll-hint {
      width: 60px;
      bottom: 140px;
    }
  }
}

</style>
