<template>
  <div class="item sketch square">
    <div class="image-holder">
      <ResponsiveImage v-if="image" v-bind="image" fit="contain" />
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  image: {
    type: Object,
    required: false
  }
});
</script>

<style lang='scss'>
.item.sketch {
  position: relative;
  min-width: 0;
  aspect-ratio: 1/1;
  display: flex;
  flex-direction: column;

  .item-image {
    @include abs-fill;
  }

  @include respond-to($tablet) {
    aspect-ratio: auto;

    &:only-child {
      aspect-ratio: 1/1;
    }

    & ~ .item.sketch,
    &:has(~ .item.sketch),
    &:has(~ .item.article) {
      aspect-ratio: 1/1;
    }
  }
}
</style>
