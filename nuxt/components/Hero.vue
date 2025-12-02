<template>
  <section class="hero pad-t pad-b">
    <div class="gutter pad-b">
      <h1 class="h1 flesh">{{ title }}</h1>
      <p v-if="copy">{{ copy }}</p>
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
      white-space: pre-line;
    }

    p {
      margin-top: 1em;
    }
  }
}

</style>
