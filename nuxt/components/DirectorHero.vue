<template>
  <section class="director-hero pad-b">
    <div class="cutout pad-t pad-b bg-bone flesh">
      <div class="gutter">
        <p v-if="tagline" class="pad-t pad-b flesh manic md">{{ tagline }}</p>
        <h1 class="h1 xs rough-edges-light">
          <span class="bg-midnight">{{ title }}</span>
        </h1>
      </div>
    </div>
    <div class="gutter pad-t">
      <div class="hero-video-wrapper">
        <span class="bg-flesh rough-edges"></span>
        <p class="h5 bone">Reel / Video Player</p>
      </div>
    </div>
  </section>
</template>

<script setup>
// Props
const props = defineProps({
  tagline: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: true
  }
});
</script>

<style lang='scss'>
section.director-hero {
  .cutout {
    text-align: center;

    .manic {
      white-space: pre-line;
    }

    .h1 {
      span {
        padding: 0.125em 0.25em;
      }
    }
  }

  .hero-video-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;
    display: flex;
    align-items: center;
    justify-content: center;

    span.bg-flesh {
      @include abs-fill;
    }

    p {
      position: relative;
      margin: 0 span(0.5);
    }
  }

  @include respond-to($tablet) {
    .hero-video-wrapper {
      aspect-ratio: 2/1;
    }
  }
}
</style>
