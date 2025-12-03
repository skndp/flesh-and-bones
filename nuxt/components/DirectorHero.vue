<template>
  <section class="director-hero pad-b">
    <div class="cutout pad-t pad-b bg-bone flesh">
      <div class="gutter">
        <p v-if="tagline" class="pad-b">{{ tagline }}</p>
        <h1 class="h1">
          <span class="bg-midnight">{{ title }}</span>
        </h1>
      </div>
    </div>
    <div class="gutter pad-t">
      <div class="hero-video-wrapper">
        <p class="h3">Reel / Video Player</p>
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
    box-shadow: inset 0px 0px 0px 1px $flesh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @include respond-to($tablet) {
    .hero-video-wrapper {
      aspect-ratio: 2/1;
    }
  }
}
</style>
