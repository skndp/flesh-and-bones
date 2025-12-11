<template>
  <!-- Hidden SVG defs shared across the entire app -->
  <svg width="0" height="0" style="position: absolute; pointer-events: none;">
    <defs>
      <filter id="roughEdges">
        <feTurbulence type="fractalNoise" :baseFrequency="baseFrequency" :numOctaves="numOctaves" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" :scale="scale" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="roughEdgesLight">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
</template>

<script setup>
const baseFrequency = ref(0);
const numOctaves = ref(1);
const scale = ref(1);
let mediaQueryList = null;

// Mounted
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
    baseFrequency.value = 0.4;
    numOctaves.value = 3;
    scale.value = 2;
  } else {
    baseFrequency.value = 0.6;
    numOctaves.value = 2;
    scale.value = 1.5;
  }
}
</script>
