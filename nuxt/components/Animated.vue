<template>
  <div :class="['animated', type, background, {'hidden': autoplay === false && playing === false}]" :style="{'mask-image': mask}" intert></div>
</template>

<script setup>
const stamp = ref('');
const playing = ref(false);

// Props
const props = defineProps({
  type: {
    type: String,
    required: true
  },
  loop: {
    type: Boolean,
    default: false
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  background: {
    type: String,
    required: true
  }
});

const mask = computed(() => {
  return `url('/images/animated/${props.type}${props.loop ? '-loop' : ''}.png?${stamp.value}')`;
});

const play = () => {
  playing.value = true;
  stamp.value = Date.now();
};

const stop = () => {
  playing.value = false;
};

defineExpose({
  play,
  stop
});

watch(() => props.autoplay, (newVal) => {
  if(newVal === true) stamp.value = Date.now();
});
</script>

<style lang='scss'>
.animated {
  width: 100%;

  &.hidden {
    display: none;
    background-color: none;
  }

  &.circle {
    aspect-ratio: 286/251;
    mask-size: contain;
    mask-repeat: no-repeat;
    pointer-events: none;
  }
}
</style>
