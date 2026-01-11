<template>
  <section class="manifesto-hero pad-t">
    <div class="gutter" :class="{ 'tab-b': !endMarkSketch}">
      <p class="fs-lg flesh manic">{{ kicker }}</p>
      <HeroTitle
        :title="title"
        :sketches="sketches"
      />
      <RichTextSketch :copy="copy" appearance="pad-t brush" />
      <p class="h3 pad-t flesh rough-edges-light">{{ endMark }}</p>
      <div v-if="endMarkSketch" class="end-mark-sketch pad-t h1">
        <div
          class="sketch-holder"
          :style="sketchStyles(endMarkSketch)"
        ></div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Props
const props = defineProps({
  kicker: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  sketches: {
    type: Object,
    required: false
  },
  copy: {
    type: Array,
    required: true
  },
  endMark: {
    type: String,
    required: true
  },
  endMarkSketch: {
    type: Object,
    required: false
  }
});

const sketchStyles = (sketch) => {
  const styles = {
    'aspect-ratio': `${sketch.image.width}/${sketch.image.height}`,
    'background-image': `url(${sketch.image.src})`
  }

  if (sketch.properties) {
    if (sketch.properties.height) {
      styles.height = `${sketch.properties.height / 100}em`;
    }
    if (sketch.properties.offsetX) {
      styles.left = `${sketch.properties.offsetX}%`;
    }
    if (sketch.properties.offsetY) {
      styles.marginTop = `${sketch.properties.offsetY / 100}em`;
    }
  }

  return styles;
};
</script>

<style lang='scss'>
section.manifesto-hero {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .gutter {
    text-align: center;

    .end-mark-sketch {
      display: flex;
      justify-content: center;
      
      .sketch-holder {
        position: relative;
        width: auto;
        height: 0.5em;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: 50% 50%;
      }
    }
  }

  @include respond-to($tablet) {
    .gutter {
      .end-mark-sketch {
        padding-bottom: 1em;
      }
    }
  }
}

</style>
