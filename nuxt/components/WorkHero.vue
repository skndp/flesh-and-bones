<template>
  <section class="work-hero pad-t pad-b">
    <div class="gutter">
      <h1 class="h1 flesh rough-edges">{{ title }}</h1>
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
      position: relative;
      width: 100%;
      margin: 0 auto 2em;
      transform: rotate(-1.8deg);
    }
  }
}

</style>
