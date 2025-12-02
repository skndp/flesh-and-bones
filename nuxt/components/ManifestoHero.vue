<template>
  <section class="manifesto-hero pad-t pad-b">
    <div class="gutter pad-b">
      <p class="fs-lg flesh">{{ kicker }}</p>
      <h1 class="h1 flesh pad-b">{{ title }}</h1>
      <RichTextSketch class="fs-lg" :copy="copy" />
      <p class="h3 flesh pad-t">{{ endMark }}</p>
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
  copy: {
    type: Array,
    required: true
  },
  endMark: {
    type: String,
    required: true
  }
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
      white-space: pre-line;
    }
  }
}

</style>
