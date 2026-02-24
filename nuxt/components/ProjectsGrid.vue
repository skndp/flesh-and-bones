<template>
  <section class="grid pad-b">
    <div class="gutter">
      <div class="grid-wrapper">
        <div class="rows">
          <div v-for="(row, rowIndex) in grid" class="row" :class="getLayout(row.layout, row.items.length)" :key="rowIndex">
            <GridItemProject
              v-for="(item, index) in row.items"
              :layout="row.items.length > 1 ? 'square' : 'landscape'"
              :rowLayout="row.layout ? row.layout : ''"
              :nthChild="index + 1"
              :item="item"
              :key="index"
              @click="onClickProjectItem(item)"
            />
          </div>
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

function getLayout(layout, total) {
  return total === 2 ? layout ? layout : '' : '';
}

function onClickProjectItem(item) {
  const index = projectItems.value.indexOf(item);
  const directors = false;
  const label = '';
  store.setModalOpen(projectItems.value, index, directors, label);
}
</script>
