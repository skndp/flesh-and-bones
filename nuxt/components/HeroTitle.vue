<template>
  <h1 class="hero-title h1 flesh rough-edges">
    <template v-for="(line, index) in titleWords" :key="index">
      <span v-for="(word, wordIndex) in line" :key="wordIndex">
        {{ word }}
        <template v-if="index === 0 && wordIndex === 0 && sketches && sketches.sketch1 && titleWords.length === 1">
          <div
            class="sketch1-holder"
            :style="{
              'aspect-ratio': `${sketches.sketch1.image.width}/${sketches.sketch1.image.height}`,
              'background-image': `url(${sketches.sketch1.image.src})`
            }"
          ></div>
        </template>
        <template v-if="index === titleWords.length - 1 && wordIndex === line.length - 1 && sketches && sketches.sketch2 && titleWords.length === 1">
          <div
            class="sketch2-holder"
            :style="{
              'aspect-ratio': `${sketches.sketch2.image.width}/${sketches.sketch2.image.height}`,
              'background-image': `url(${sketches.sketch2.image.src})`
            }"
          ></div>
        </template>
        <template v-if="index === 0 && wordIndex === 0 && sketches && sketches.sketch1 && titleWords.length > 1">
          <div
            class="sketch1-holder"
            :style="{
              'aspect-ratio': `${sketches.sketch1.image.width}/${sketches.sketch1.image.height}`,
              'background-image': `url(${sketches.sketch1.image.src})`
            }"
          ></div>
        </template>
        <template v-if="index === titleWords.length - 1 && wordIndex === line.length - 1 && sketches && sketches.sketch2 && titleWords.length > 1">
          <div
            class="sketch2-holder"
            :style="{
              'aspect-ratio': `${sketches.sketch2.image.width}/${sketches.sketch2.image.height}`,
              'background-image': `url(${sketches.sketch2.image.src})`
            }"
          ></div>
        </template>
        <template v-if="wordIndex < line.length - 1"> </template>
      </span>
      <template v-if="index < titleWords.length - 1"> <br></template>
    </template>
  </h1>
</template>

<script setup>
// Props
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  sketches: {
    type: Object,
    required: false
  }
});

const titleWords = computed(() => {
  const lines = props.title.split('\n');
  return lines.map(line => line.trim().split(/\s+/));
});
</script>

<style lang='scss'>
.hero-title {
  position: relative;

  span {
    position: relative;
  }

  .sketch1-holder {
    position: absolute;
    top: 0.1em;
    left: 1em;
    width: auto;
    height: 0.5em;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 50% 50%;
    transform: translateX(-50%);
    opacity: 0.9;
  }

  .sketch2-holder {
    position: absolute;
    bottom: -0.1em;
    right: 0px;
    width: auto;
    height: 1.3em;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 50% 50%;
    transform: translateX(30%);
  }

  @include respond-to($tablet) {
    .sketch1-holder {
      top: 0.04em;
    }
  }
}
</style>
