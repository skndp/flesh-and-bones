<template>
  <section class="work-hero pad-t pad-b">
    <div class="gutter">
      <HeroTitle
        :title="title"
        :sketches="sketches"
      />
      <p v-if="copy" class="manic">{{ copy }}</p>
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
</script>

<style lang='scss'>
section.work-hero {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .gutter {
    position: relative;
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
      position: relative;
      width: 100%;
      margin: 0 auto 0.5em;
      transform: rotate(-1.8deg);
    }
  }

  @include respond-to($tablet) {
    .gutter {
      p {
        position: relative;
        width: 100%;
        margin: 0 auto 2em;
      }
    }
  }
}

</style>
