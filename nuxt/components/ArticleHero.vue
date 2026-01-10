<template>
  <section class="hero pad-t pad-b">
    <div class="gutter">
      <h1 class="h1 flesh rough-edges">{{ title }}</h1>
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
  copy: {
    type: String,
    required: false
  }
});
</script>

<style lang='scss'>
section.hero {
  position: relative;
  display: flex;
  flex-direction: column;

  .gutter {
    position: relative;
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .h1 {
      width: 100%;
      max-width: 900px;
      white-space: pre-line;
    }

    p {
      width: 100%;
      max-width: 900px;
      margin: 0 auto 2em;
    }
  }
}

</style>
