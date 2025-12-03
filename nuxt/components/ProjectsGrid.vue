<template>
  <section class="grid pad-b">
    <div class="gutter">
      <div class="rows">
        <div v-for="row in grid" class="row">
          <GridItemProject v-for="(item, index) in row.items" :item="item" :key="index" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Props
const props = defineProps({
  grid: {
    type: Array,
    required: true
  }
});
</script>
