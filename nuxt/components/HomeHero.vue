<template>
  <section class="home-hero pad-t pad-b">
    <div class="gutter">
      <h1 class="h1 flesh rough-edges">
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
      <p v-if="copy" class="manic pad-t">{{ copy }}</p>
    </div>
  </section>
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
  copy: {
    type: String,
    required: false
  }
});

const titleWords = computed(() => {
  const lines = props.title.split('\n');
  return lines.map(line => line.trim().split(/\s+/));
});
</script>

<style lang='scss'>
section.home-hero {
  position: relative;
  display: flex;
  flex-direction: column;

  &:before {
    content: '';
    width: 100%;
    @include header-ht(height);
    display: flex;
  }

  .gutter {
    position: relative;
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;

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
        bottom: -0.3em;
        right: 0px;
        width: auto;
        height: 2.3em;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: 50% 50%;
        transform: translateX(80%);
        opacity: 1;
      }
    }

    p {
      width: 100%;
      max-width: 666px;
      margin: 0 auto 2em;
    }
  }

  @include respond-to($tablet) {
    .gutter {
      .h1 {
        .sketch1-holder {
          top: 0.04em;
        }
      }
    }
  }
}

</style>
