<template>
  <section class="director-hero pad-b">
    <Boneyard :tagline="tagline" :title="title" :skeletons="skeletons" />
    <div class="gutter">
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
  },
  skeletons: {
    type: Array,
    required: true
  }
});
</script>

<style lang='scss'>
section.director-hero {
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
