<template>
  <h1 class="hero-title h1 flesh">
    <template v-for="(line, index) in titleWords" :key="index">
      <span v-for="(word, wordIndex) in line" :key="wordIndex">
        <span class="rough-edges">{{ word }}</span>
        <template v-if="index === 0 && wordIndex === 0 && sketches && sketches.sketch1 && titleWords.length === 1">
          <div
            class="sketch1-holder"
            :style="sketchStyles(sketches.sketch1)"
          ></div>
        </template>
        <template v-if="index === titleWords.length - 1 && wordIndex === line.length - 1 && sketches && sketches.sketch2 && titleWords.length === 1">
          <div
            class="sketch2-holder"
            :style="sketchStyles(sketches.sketch2, true)"
          ></div>
        </template>
        <template v-if="index === 0 && wordIndex === 0 && sketches && sketches.sketch1 && titleWords.length > 1">
          <div
            class="sketch1-holder"
            :style="sketchStyles(sketches.sketch1)"
          ></div>
        </template>
        <template v-if="index === titleWords.length - 1 && wordIndex === line.length - 1 && sketches && sketches.sketch2 && titleWords.length > 1">
          <div
            class="sketch2-holder"
            :style="sketchStyles(sketches.sketch2, true)"
          ></div>
        </template>
      </span>
      <template v-if="index < titleWords.length - 1"><br></template>
    </template>
    <div
      v-if="subSketch"
      class="sub-sketch-holder"
      :style="sketchStyles(subSketch)"
    ></div>
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
  },
  subSketch: {
    type: Object,
    required: false
  }
});

const titleWords = computed(() => {
  const arr = props.title.split('\n');
  const lines = arr.map(line => line.trim().split(/\s+/));

  return lines;
});

const sketchStyles = (sketch, fromRight) => {
  const styles = {
    'aspect-ratio': `${sketch.image.width}/${sketch.image.height}`,
    'background-image': `url(${sketch.image.src})`
  }

  if (sketch.properties) {
    if (sketch.properties.height) {
      styles.height = `${sketch.properties.height / 100}em`;
    }
    if (sketch.properties.offsetX) {
      if (fromRight) {
        styles.right = `${-sketch.properties.offsetX}%`;
      } else {
        styles.left = `${sketch.properties.offsetX}%`;
      }
    }
    if (sketch.properties.offsetY) {
      styles.marginTop = `${sketch.properties.offsetY / 100}em`;
    }
  }

  return styles;
};
</script>

<style lang='scss'>
.hero-title {
  position: relative;
  margin-left: 0.2em;
  white-space: normal;

  > span {
    position: relative;
    margin-right: 0.2em;
    display: inline-block;

    .rough-edges {
      position: relative;
    }
  }

  br {
    display: none;
  }

  .sketch1-holder {
    position: absolute;
    top: 0px;
    left: 0px;
    width: auto;
    height: 0.5em;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 50% 50%;
  }

  .sketch2-holder {
    position: absolute;
    top: 0px;
    right: 0px;
    width: auto;
    height: 50%;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 50% 50%;
  }

  .sub-sketch-holder {
    position: relative;
    width: auto;
    height: 0.5em;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 50% 50%;
  }

  @include respond-to($desktop) {
    br {
      display: inline;
    }
  }
}
</style>
