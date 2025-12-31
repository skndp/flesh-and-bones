<template>
  <section class="manifesto-hero pad-t">
    <div class="gutter" :class="{ 'tab-b': !endMarkSketch}">
      <p class="fs-lg flesh manic">{{ kicker }}</p>
      <h1 class="h1 pad-b flesh rough-edges">
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
      <RichTextSketch :copy="copy" appearance="brush" />
      <p class="h3 pad-t flesh rough-edges-light">{{ endMark }}</p>
      <div v-if="endMarkSketch" class="end-mark-sketch pad-t h1">
        <div
          class="sketch-holder"
          :style="{
            'aspect-ratio': `${endMarkSketch.image.width}/${endMarkSketch.image.height}`,
            'background-image': `url(${endMarkSketch.image.src})`
          }"
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

const titleWords = computed(() => {
  const lines = props.title.split('\n');
  return lines.map(line => line.trim().split(/\s+/));
});
</script>

<style lang='scss'>
section.manifesto-hero {
  position: relative;
  display: flex;
  flex-direction: column;

  .gutter {
    text-align: center;

    .h1 {
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
        right: -0.5ch;
        width: auto;
        height: 1.3em;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: 50% 50%;
        opacity: 0.96;
      }
    }

    .end-mark-sketch {
      height: 1em;
      display: flex;
      justify-content: center;

      .sketch-holder {
        position: relative;
        width: auto;
        height: 100%;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: 50% 50%;
      }
    }
  }

  @include respond-to($tablet) {
    .gutter {
      &.tab-b {
        padding-bottom: span(1);
      }

      .h1 {
        .sketch1-holder {
          top: 0.04em;
        }
      }

      .end-mark-sketch {
        padding-bottom: 1em;
      }
    }
  }
}

</style>
