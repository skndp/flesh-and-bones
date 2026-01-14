<template>
  <section class="director-hero" :class="{ 'pad-b': reelVideo && reelVideo.vimeo && reelPoster }">
    <Boneyard :tagline="tagline" :title="title" :skeletons="skeletons" />
    <div v-if="reelVideo && reelVideo.vimeo && reelPoster" class="gutter">
      <div class="hero-video-wrapper">
        <VideoPlayer
          :vimeo="reelVideo.vimeo"
          :poster="reelPoster"
          :controls="true"
          :cover="false"
        />
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
  },
  reelVideo: {
    type: Object,
    required: false
  },
  reelPoster: {
    type: Object,
    required: false
  }
});
</script>

<style lang='scss'>
section.director-hero {
  position: relative;

  .boneyard {
    margin-top: -75px;
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
    .boneyard {
      margin-top: -100px;
    }
  }
}
</style>
