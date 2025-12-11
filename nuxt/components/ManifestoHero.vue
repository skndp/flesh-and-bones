<template>
  <section class="manifesto-hero pad-t pad-b">
    <div class="gutter pad-b">
      <p class="fs-lg flesh manic">{{ kicker }}</p>
      <h1 class="h1 pad-b flesh rough-edges">{{ title }}</h1>
      <RichTextSketch class="brush" :copy="copy" />
      <p class="h3 pad-t flesh rough-edges">{{ endMark }}</p>
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
