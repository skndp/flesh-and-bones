<template>
  <section class="manifesto-hero pad-t">
    <div class="gutter">
      <p class="fs-lg flesh manic">{{ kicker }}</p>
      <h1 class="h1 pad-b flesh rough-edges">
        <!-- Check if the title has only one word -->
        <span v-if="titleWords.length === 1" class="word">
          <!-- Insert both sketches in the first and last word (since it's the only word) -->
          <template v-if="sketches && sketches.sketch1">
            <div
              class="sketch1-holder"
              :style="{
                'aspect-ratio': `${sketches.sketch1.image.width}/${sketches.sketch1.image.height}`,
                'mask-image': `url(${sketches.sketch1.image.src})`
              }"
            ></div>
          </template>
          <template v-if="sketches && sketches.sketch2">
            <div
              class="sketch2-holder"
              :style="{
                'aspect-ratio': `${sketches.sketch2.image.width}/${sketches.sketch2.image.height}`,
                'mask-image': `url(${sketches.sketch2.image.src})`
              }"
            ></div>
          </template>
          {{ titleWords[0] }}
        </span>

        <!-- If there are multiple words, render each one separately -->
        <span v-else v-for="(word, index) in titleWords" :key="index" class="word">
          <!-- Insert .sketch1 only on the first word -->
          <template v-if="index === 0 && sketches && sketches.sketch1">
            <div
              class="sketch1-holder"
              :style="{
                'aspect-ratio': `${sketches.sketch1.image.width}/${sketches.sketch1.image.height}`,
                'mask-image': `url(${sketches.sketch1.image.src})`
              }"
            ></div>
          </template>

          {{ word }}

          <!-- Insert .sketch2 only on the last word -->
          <template v-if="index === titleWords.length - 1 && sketches && sketches.sketch2">
            <div
              class="sketch2-holder"
              :style="{
                'aspect-ratio': `${sketches.sketch2.image.width}/${sketches.sketch2.image.height}`,
                'mask-image': `url(${sketches.sketch2.image.src})`
              }"
            ></div>
          </template>
        </span>
      </h1>
      <RichTextSketch :copy="copy" appearance="brush" />
      <p class="h3 pad-t flesh rough-edges">{{ endMark }}</p>
      <div v-if="endMarkSketch" class="end-mark-sketch pad-t h1">
        <div
          class="sketch-holder"
          :style="{
            'aspect-ratio': `${endMarkSketch.image.width}/${endMarkSketch.image.height}`,
            'mask-image': `url(${endMarkSketch.image.src})`
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
  // Trim it, then split on any whitespace, handling multiple spaces
  return props.title.trim().split(/\s+/);
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
      white-space: pre-line;

      span {
        position: relative;
      }

      .sketch1-holder {
        position: absolute;
        top: 0.1em;
        left: 0.96ch;
        width: auto;
        height: 0.5em;
        background-color: $bone;
        mask-repeat: no-repeat;
        mask-size: contain;
        mask-position: 50% 50%;
        opacity: 0.9;
      }

      .sketch2-holder {
        position: absolute;
        bottom: -0.1em;
        right: -0.5ch;
        width: auto;
        height: 1.3em;
        background-color: $bone;
        mask-repeat: no-repeat;
        mask-size: contain;
        mask-position: 50% 50%;
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
        background-color: $flesh;
        mask-repeat: no-repeat;
        mask-size: contain;
        mask-position: 50% 50%;
      }
    }
  }

  @include respond-to($tablet) {
    .gutter {
      .h1 {
        .sketch1-holder {
          top: 0px;
        }
      }

      .end-mark-sketch {
        padding-bottom: 1em;
      }
    }
  }
}

</style>
