<template>
  <div ref="itemRef" class="item project flesh" :class="[ layout ]">
    <div ref="infoRef" class="item-info">
      <h3 class="h3">{{ item.title }}</h3>
      <div class="meta">
        <p class="brush xs"><strong>Director - {{ item.director.title }}</strong></p>
      </div>
    </div>
    <div v-if="item.ctaCardImages" class="item-image">
      <template v-if="(layout === 'square' || isSmallScreen) && item.ctaCardImages.squareImage">
        <div class="item-image-paper" :style="{'background-color': item.ctaCardImages.squareImage.image.palette.muted.background}" ref="paper"></div>
        <ResponsiveImage v-bind="item.ctaCardImages.squareImage.image" ref="imgTop" />
        <ResponsiveImage v-bind="item.ctaCardImages.squareImage.image" ref="imgBottom" />
        <ResponsiveImage v-bind="item.ctaCardImages.squareImage.image" />
      </template>
      <template v-else>
        <div class="item-image-paper" :style="{'background-color': item.ctaCardImages.landscapeImage.image.palette.muted.background}" ref="paper"></div>
        <ResponsiveImage v-bind="item.ctaCardImages.landscapeImage.image" ref="imgTop" />
        <ResponsiveImage v-bind="item.ctaCardImages.landscapeImage.image" ref="imgBottom" />
        <ResponsiveImage v-bind="item.ctaCardImages.landscapeImage.image" />
      </template>
    </div>
  </div>
</template>

<script setup>
import NoiseModule from 'noisejs'

const itemRef = ref(null);
const infoRef = ref(null);
const tearY = ref(0.8);

const noise = new NoiseModule.Noise(Math.random());
const paper = ref(null);
const imgTop = ref(null);
const imgBottom = ref(null);
const isSmallScreen = ref(false);
let cnv, ctx;

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

onMounted(() => {
  window.addEventListener('resize', onResize);
  nextTick(() => {
    onResize();
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
});

function onResize() {
  isSmallScreen.value = window.innerWidth < 540;

  nextTick(() => {
    reflow();
  });
}

function reflow() {
  if(imgTop.value && imgBottom.value) {
    const b = imgTop.value.$el.getBoundingClientRect(),
          w = b.width,
          h = b.height;
    
    cnv = document.createElement('canvas');
    cnv.width = w;
    cnv.height = h;
    ctx = cnv.getContext('2d');

    let y_percent = 1 - (infoRef.value.getBoundingClientRect().height / itemRef.value.getBoundingClientRect().height);
    tearY.value = (Math.round(y_percent * 100) / 100) - 0.02;

    createTornEdge(0, h * tearY.value, b.width, h * tearY.value, 3, 0.5);
    setMasks();
  }
}

function createTornEdge(startX, startY, endX, endY, amplitude, frequency) {
  const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
  const step = 3;
  const freqs = [0.002, 0.004, 0.006, 0.008, 0.01, 0.012, 0.014, 0.016, 0.018, 0.02];
  let noiseOffset = 0;
  let currentWaveAmplitude = 1 + Math.random() * 4;
  let currentWaveFrequency = freqs[Math.floor(Math.random() * freqs.length)];
  let period_x = ((2 * Math.PI) / currentWaveFrequency);

  ctx.beginPath();
  ctx.moveTo(startX, startY);

  for (let i = 0; i < distance; i += step) {
    const t = i / distance;
    const x = startX + (endX - startX) * t;
    const sin = Math.sin(currentWaveFrequency * x);
    const y = startY + currentWaveAmplitude * sin;
    
    if(x >= period_x) {
      currentWaveAmplitude = 1 + Math.random() * 4;
      currentWaveFrequency = freqs[Math.floor(Math.random() * freqs.length)];

      period_x = x + ((2 * Math.PI) / currentWaveFrequency);
    }

    const noiseValue = noise.perlin2(i * frequency, noiseOffset);

    const offsetX = (endY - startY) / distance * noiseValue * amplitude;
    const offsetY = (endX - startX) / distance * noiseValue * amplitude;

    ctx.lineTo(x + offsetX, y - offsetY);

    noiseOffset += 0.01;
  }

  ctx.lineTo(endX, endY);
  ctx.lineTo(endX, 0);
  ctx.lineTo(0, 0);
  ctx.lineTo(0, 400);
  ctx.fill();
}

function setMasks() {
  const dataURL = cnv.toDataURL('image/png');
  paper.value.style.maskImage = `url(${dataURL})`;
  imgTop.value.$el.style.maskImage = `url(${dataURL})`;
  imgBottom.value.$el.style.maskImage = `url(${dataURL}), linear-gradient(#000 0 0)`;
}
</script>

<style lang='scss'>
.item.project {
  position: relative;
  aspect-ratio: 1/1;
  cursor: pointer;

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
<<<<<<< HEAD
        &:nth-child(2) {
=======
        &:nth-child(1), &:nth-child(2) {
>>>>>>> db690adafca02579bf6a45423328bf5060a2640a
          transition: visibility 0ms linear;
          visibility: visible;
        }

        &:nth-child(3) {
          transition: transform $speed-333 cubic-bezier(0.550, 0.085, 0.680, 0.530), opacity $speed-333 cubic-bezier(0.550, 0.085, 0.680, 0.530), visibility 0ms linear;
          transform: translate(0, 10%) rotateZ(-7deg) rotateY(5deg);
          opacity: 0;
          visibility: visible;
        }

        &:nth-child(4) {
          transition: visibility 0ms linear;
          visibility: hidden;
        }
      }
    }
  }

  .item-info {
    position: absolute;
    bottom: 0px;
    left: 0px;
    padding: $space-8;
    width: calc(100% - $space-16);
    max-width: 400px;
    transition: visibility 0ms linear $speed-333;
    visibility: hidden;

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
      transition: visibility 0ms linear $speed-333;
      visibility: hidden;
      opacity: 0.5;
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

      &:nth-child(4) {
        display: none;
      }

      @include can-hover {
        &:nth-child(1), &:nth-child(2) {
          transition: visibility 0ms linear $speed-333;
          visibility: hidden;
        }

        &:nth-child(3) {
          display: block;
          mask-composite: exclude;
          transform-origin: 100% 80%;
          transition: transform $speed-333 cubic-bezier(0.075, 0.820, 0.165, 1.000), opacity $speed-333 cubic-bezier(0.075, 0.820, 0.165, 1.000), visibility 0ms linear $speed-333;
          pointer-events: none;
          visibility: hidden;
        }

        &:nth-child(4) {
          display: block;
          transition: visibility 0ms linear $speed-333;
          pointer-events: none;
          visibility: visible;
        }
      }

      img {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: auto;
        transform: translate(-50%, -50%);
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
