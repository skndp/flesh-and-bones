<template>
  <div class="item project flesh" :class="[ layout ]">
    <div class="item-details">
      <h3 class="h3">{{ item.title }}</h3>
      <div class="meta">
        <p class="fs-sm"><strong>Director - {{ item.director.title }}</strong></p>
      </div>
    </div>
    <div v-if="item.ctaCardImages" class="item-image">
      <template v-if="(layout === 'square' || isSmallScreen) && item.ctaCardImages.squareImage">
        <ResponsiveImage v-bind="item.ctaCardImages.squareImage.image" ref="imgTop" />
        <ResponsiveImage v-bind="item.ctaCardImages.squareImage.image" ref="imgBottom" />
        <ResponsiveImage v-bind="item.ctaCardImages.squareImage.image" />
      </template>
      <template v-else>
        <ResponsiveImage v-bind="item.ctaCardImages.landscapeImage.image" ref="imgTop" />
        <ResponsiveImage v-bind="item.ctaCardImages.landscapeImage.image" ref="imgBottom" />
        <ResponsiveImage v-bind="item.ctaCardImages.landscapeImage.image" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { Noise } from 'noisejs';

const noise = new Noise(Math.random());
const imgTop = ref(null);
const imgBottom = ref(null);
const isSmallScreen = ref(false);
let mediaQueryList, cnv, ctx;

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
  mediaQueryList = window.matchMedia('(min-width: 540px)');
  mediaQueryList.addEventListener('change', handleMediaChange);

  handleMediaChange(mediaQueryList);
});

function handleMediaChange(e) {
  if(e.matches) isSmallScreen.value = false;
  else isSmallScreen.value = true;

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

    createTornEdge(0, h * 0.8, b.width, h * 0.8, 3, 0.5);
    setMasks();
  }
}

function createTornEdge(startX, startY, endX, endY, amplitude, frequency) {
  const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
  const step = 3;
  const freqs = [0.005, 0.01, 0.015, 0.02];
  let noiseOffset = 0;
  let currentWaveAmplitude = Math.random() * 10;
  let currentWaveFrequency = freqs[Math.floor(Math.random() * freqs.length)];
  let last_sin = 0;

  ctx.beginPath();
  ctx.moveTo(startX, startY);

  for (let i = 0; i < distance; i += step) {
    const t = i / distance;
    const x = startX + (endX - startX) * t;
    const sin = Math.sin(currentWaveFrequency * x);
    const y = startY + currentWaveAmplitude * sin;
    
    if(sin > 0 && last_sin < 0 || sin < 0 && last_sin > 0) {
      currentWaveAmplitude = Math.random() * 10 + 1;
      currentWaveFrequency = freqs[Math.floor(Math.random() * freqs.length)];
    }
    
    last_sin = sin;

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
  //ctx.stroke();
}

function setMasks() {
  const dataURL = cnv.toDataURL('image/png');
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
    .item-image {
      .responsive-image-wrapper {
        &:nth-child(2) {
          transition: transform 400ms cubic-bezier(0.550, 0.085, 0.680, 0.530), opacity 400ms cubic-bezier(0.550, 0.085, 0.680, 0.530);
          transform: translate(0, 10%) rotateZ(-7deg) rotateY(5deg);
          opacity: 0;
        }

        &:nth-child(3) {
          transition: visibility 0ms linear;
          visibility: hidden;
        }
      }
    }
  }

  &:nth-child(2) {
    margin-top: span(1);
  }

  .item-details {
    position: absolute;
    bottom: 0px;
    left: 0px;
    padding: $space-8;
    width: calc(100% - $space-16);
    max-width: 400px;

    .meta {
      margin: 4px 0 0;
    }
  }

  .item-image {
    position: relative;
    width: 100%;
    height: 100%;

    .responsive-image-wrapper {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      mask-size: cover;

      &:nth-child(2) {
        display: none;
      }

      &:nth-child(3) {
        display: none;
      }

      @include can-hover {
        &:nth-child(2) {
          display: block;
          mask-composite: exclude;
          transform-origin: 100% 80%;
          transition: transform 400ms cubic-bezier(0.075, 0.820, 0.165, 1.000), opacity 400ms cubic-bezier(0.075, 0.820, 0.165, 1.000);
          pointer-events: none;
        }

        &:nth-child(3) {
          display: block;
          transition: visibility 0ms linear 400ms;
          pointer-events: none;
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

    &:only-child {
      aspect-ratio: 2/1;
    }

    &:nth-child(2) {
      margin-top: 0px;
    }
  }

  @include respond-to($tablet) {
    .item-details {
      padding: $space-16;
      width: calc(100% - $space-32);

      .meta {
        margin: $space-8 0 0;
      }
    }
  }

  @include respond-to($macbook) {
    aspect-ratio: 4/3;

    &:only-child {
      aspect-ratio: 8/3;
    }
  }
}
</style>
