<template>
  <div class="paper" :class="{ 'offset': offset }">
    <div
      v-if="store.backgroundTexture"
      class="background"
      :style="{ 'background-image': `url('${store.backgroundTexture}')` }"
    ></div>
    <div
      v-if="edges && store.leftEdgeDistress" class="edge left"
      :style="{ 'mask-image': `url('${store.leftEdgeDistress}')` }"
    ></div>
    <div
      v-if="edges && store.rightEdgeDistress" class="edge right"
      :style="{ 'mask-image': `url('${store.rightEdgeDistress}')` }"
    ></div>
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';

const store = useSiteStore();

// Props
const props = defineProps({
  offset: {
    type: Boolean,
    required: false
  },
  edges: {
    type: Boolean,
    required: false,
    default: true
  }
});
</script>

<style lang="scss">
.paper {
  @include abs-fill;
  overflow: hidden;
  pointer-events: none;

  .background {
    @include abs-fill;
    background-repeat: repeat-y;
    background-position: 50% 0%;
    background-size: 100% auto;
  }

  .edge {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: span(0.5);
    max-width: 16px;
    background-color: $bone;
    mask-repeat: repeat-y;
    mask-size: 100% auto;

    &.left {
      left: 0px;
      mask-image: url('/images/left-edge-distress.png');
    }

    &.right {
      right: 0px;
      mask-image: url('/images/right-edge-distress.png');
    }
  }

  &.offset {
    .edge {
      top: 100svh;
    }
  }
}
</style>
