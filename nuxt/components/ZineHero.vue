<template>
  <section class="zine-hero pad-t pad-b">
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
section.zine-hero {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .gutter {
    text-align: center;

    p {
      margin-top: 1em;
    }
  }
}

</style>
