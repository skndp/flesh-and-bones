<template>
  <section class="grid pad-b">
    <div class="gutter">
      <div class="rows">
        <div v-for="(row, rowIndex) in grid" class="row" :key="rowIndex">
          <GridItemProject
            v-for="(item, index) in row.items"
            :layout="row.items.length > 1 ? 'square' : 'landscape'"
            :item="item"
            :key="index"
            @click="onClickProjectItem(item)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';

const store = useSiteStore();

// Props
const props = defineProps({
  grid: {
    type: Array,
    required: true
  }
});

const projectItems = computed(() => {
  return props.grid.flatMap(row => row.items)
});

function onClickProjectItem(item) {
  const index = projectItems.value.indexOf(item);
  const directors = false;
  const label = '';
  store.setModalOpen(projectItems.value, index, directors, label);
}
</script>
