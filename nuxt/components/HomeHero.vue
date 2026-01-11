<template>
  <section class="home-hero pad-b">
    <div class="gutter">
      <HeroTitle
        :title="title"
        :sketches="sketches"
      />
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
</script>

<style lang='scss'>
section.home-hero {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;

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

    p {
      width: 100%;
      max-width: 666px;
      margin: 0 auto 2em;
    }
  }
}

</style>
