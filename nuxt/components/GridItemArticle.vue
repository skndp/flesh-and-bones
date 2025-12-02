<template>
  <NuxtLink :to="item.slug" class="item flesh">
    <h3 class="h3">{{ item.title }}</h3>
    <div class="meta">
      <p class="fs-sm">{{ item.ctaCardSummary }}</p>
      <p class="fs-lg">{{ item.ctaCardLabel }}</p>
    </div>
  </NuxtLink>
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
