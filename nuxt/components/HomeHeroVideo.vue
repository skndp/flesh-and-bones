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

let observer;
let percentOutOfView = 100;
let thresholdVal = (100 - percentOutOfView) / 100;

onMounted(() => {
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
  if (heroVideoRef.value) {
    observer.unobserve(heroVideoRef.value);
  }

  clearTimeout(readyDelayTimer);
  clearTimeout(fallbackTimer);
});

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
  height: 100svh;
  overflow: hidden;
}

</style>
