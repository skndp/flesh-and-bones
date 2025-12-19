<template>
  <!-- Hidden SVG defs shared across the entire app -->
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

      <filter id="roughEdgesLight">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>

      <filter id="specks">
        <!-- fine speckles -->
        <feTurbulence baseFrequency="0.5" numOctaves="1" result="fine"/>
        <!-- larger blotches -->
        <feTurbulence baseFrequency="0.25" numOctaves="2" result="coarse" />
        <!-- add them together -->
        <feComposite in="fine" in2="coarse" operator="arithmetic" k1="0.5" k2="1" k3="0.1" k4="0" result="mix"/>

        <feColorMatrix
          in="mix"
          values="
            0 0 0 8 -4
            0 0 0 8 -4
            0 0 0 8 -4
            0 0 0 0 1"
        />
      </filter>

      <filter id="chalkSmudge" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" stitchTiles="stitch" result="n"/>

        <feColorMatrix in="n" values="
          0 0 0 2 -0.9
          0 0 0 2 -0.9
          0 0 0 2 -0.9
          0 0 0 0  1" result="m"/>

        <!-- Luminance -> alpha mask -->
        <feColorMatrix in="m" type="matrix" values="
          1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0.33 0.33 0.33 0 0" result="mask"/>

        <feComposite in="SourceGraphic" in2="mask" operator="in"/>
      </filter>
    </defs>
  </svg>
</template>

<script setup>
const baseFrequency = ref(0);
const numOctaves = ref(1);
const scale = ref(1);
const seed = ref(1);

let mediaQueryList = null;

// Mounted
onMounted(() => {
  seed.value = Math.floor(Math.random() * 20) + 1;
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
