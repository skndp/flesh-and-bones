<template>
  <section ref="heroVideoRef" class="home-hero-video" :class="{ 'passed': passed }" v-scroll-container>
    <VideoPlayer
      ref="videoPlayerRef"
      :vimeo="video"
      :cover="true"
      :manualPlay="true"
      @ready="onPlayerReady"
      data-scroll="parallax"
      data-fx='[{"prop":"y","from":0,"to":500}]'
    />
  </section>
</template>

<script setup>
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
const playerReady = ref(false);
const passed = ref(false);
const siteLoaded = ref(false);

let readyDelayTimer = null;
let fallbackTimer = null;

let resizeTo = 0;
let lastWidth = 0;

let observer;
let percentOutOfView = 100;
let thresholdVal = (100 - percentOutOfView) / 100;

onMounted(() => {
  lastWidth = window.innerWidth;
  window.addEventListener('resize', onResize);
  setMask();

  observer = new IntersectionObserver(([entry]) => {
      passed.value = entry.intersectionRatio <= thresholdVal && entry.boundingClientRect.top < 0;
    }, { threshold: thresholdVal }
  );

  if (heroVideoRef.value) {
    observer.observe(heroVideoRef.value);
  }

  fallbackTimer = setTimeout(() => {
    triggerSiteLoaded();
  }, 3000);
});

onBeforeUnmount(() => {
  clearTimeout(resizeTo);
  window.removeEventListener('resize', onResize);

  if (observer && heroVideoRef.value) {
    observer.unobserve(heroVideoRef.value);
  }

  clearTimeout(readyDelayTimer);
  clearTimeout(fallbackTimer);
});

function onResize() {
  if (window.innerWidth === lastWidth) return;

  clearTimeout(resizeTo);
  resizeTo = setTimeout(() => {
    lastWidth = window.innerWidth;
    setMask();
  }, 250);
}

function setMask() {
  const b = heroVideoRef.value.getBoundingClientRect();
  const mask = createTornEdge({
    width: b.width,
    height: b.height,
    startY: b.height - 100,
    endY: b.height - 100,
    wobble: 0.2,
    edgeRoughness: 6
  });

  heroVideoRef.value.style.maskImage = `url(${mask})`;
}

function onPlayerReady() {
  if (siteLoaded.value) return;

  playerReady.value = true;

  readyDelayTimer = setTimeout(() => {
    triggerSiteLoaded();
  }, 1000);
}

function triggerSiteLoaded() {
  if (siteLoaded.value) return;

  siteLoaded.value = true;
  clearTimeout(readyDelayTimer);
  clearTimeout(fallbackTimer);

  store.setLoaderComplete();

  if (videoPlayerRef.value) {
    videoPlayerRef.value.playPlayer();
  }
}

watch(passed, (isPassed) => {
  if (!videoPlayerRef.value || !playerReady.value) return;

  if (isPassed) {
    videoPlayerRef.value.pausePlayer();
  } else {
    videoPlayerRef.value.playPlayer();
  }
});
</script>

<style lang='scss'>
section.home-hero-video {
  position: relative;
  width: 100%;
  height: calc(100svh + 50px);
  overflow: hidden;

  &.passed {
    visibility: hidden;
  }
}

</style>
