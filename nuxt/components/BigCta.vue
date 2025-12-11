<template>
  <div class="big-cta-block pad-t pad-b">
    <NuxtLink :to="path" class="h3 flesh rough-edges-light">
      {{ label }}
    </NuxtLink>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  path: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  }
});
</script>

<style lang='scss'>
.big-cta-block {
  display: flex;
  justify-content: center;

  a {
    position: relative;
    padding-bottom: 0.3em;
    display: inline-flex;

    &:after {
      content: '';
      position: absolute;
      bottom: 0px;
      width: 100%;
      height: 0.2em;
      background-color: $flesh;
    }
  }
}
</style>