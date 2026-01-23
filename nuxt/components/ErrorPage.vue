<template>
  <div class="error-page">
    <svg
      width="0"
      height="0"
      style="position: absolute; pointer-events: none;"
      aria-hidden="true"
    >
      <defs>
        <filter id="roughEdges">
          <feTurbulence type="fractalNoise" :baseFrequency="baseFrequency" :numOctaves="numOctaves" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" :scale="scale" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
    <Paper />
    <section class="pad-t pad-b">
      <div class="gutter">
        <template v-if="error.statusCode === 404">
          <h1 class="h1 flesh rough-edges">Error 404</h1>
          <p class="p2">The page you requested could not be found.</p>
          <NuxtLink to="/" @click.prevent="goHome">Go Home</NuxtLink>
        </template>
        <template v-else>
          <h1 v-if="error.statusMessage" class="h1 flesh rough-edges">{{ error.statusMessage }}</h1>
          <p v-if="error.message" class="p2">{{ error.message }}</p>
        </template>
      </div>
    </section>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  error: {
    type: Object
  }
});

const baseFrequency = ref(0);
const numOctaves = ref(1);
const scale = ref(1);

let mediaQueryList = null;

const goHome = () => {
  clearError({ redirect: '/' })
  
  // Then hard reload (so we see the site loader, clean slate)
  setTimeout(() => {
    window.location.href = '/';
  }, 0);
}

onMounted(() => {
  mediaQueryList = window.matchMedia('(min-width: 1024px)');
  mediaQueryList.addEventListener('change', handleMediaChange);
  handleMediaChange(mediaQueryList);
});

// Before Unmount
onBeforeUnmount(() => {
  if (mediaQueryList) {
    mediaQueryList.removeEventListener('change', handleMediaChange);
  }
});

function handleMediaChange(e) {
  if (e.matches) {
    baseFrequency.value = 0.3;
    numOctaves.value = 2;
    scale.value = 2;
  } else {
    baseFrequency.value = 0.6;
    numOctaves.value = 1;
    scale.value = 1.5;
  }
}
</script>

<style lang='scss'>
.error-page {
  section {
    .h1 {
      margin-bottom: 0.5em;
    }

    a {
      margin-top: 2em;
      padding-bottom: 5px;
      background-image: url('/images/underline.png');
      background-repeat: no-repeat;
      background-position: 50% 100%;
      background-size: 100% 5px;
      display: inline-flex;
    }
  }
}

</style>
