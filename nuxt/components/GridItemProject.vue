<template>
  <div class="item flesh">
    <h3 class="h3">{{ item.title }}</h3>
    <div class="meta">
      <p class="fs-sm"><strong>Director - {{ item.director.title }}</strong></p>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});
</script>
