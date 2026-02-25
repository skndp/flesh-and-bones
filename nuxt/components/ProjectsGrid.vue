<template>
  <section class="grid pad-b">
    <div class="gutter">
      <div class="grid-wrapper">
        <div class="rows">
          <div v-for="(row, rowIndex) in grid" class="row" :class="getLayout(row.layout, row.items.length)" :key="rowIndex">
            <template v-for="(item, index) in row.items" :key="index">
              <GridItemProject
                v-if="item.type === 'project'"
                :layout="row.items.length > 1 ? 'square' : 'landscape'"
                :rowLayout="row.layout ? row.layout : ''"
                :nthChild="index + 1"
                :item="item"
                @click="onClickProjectItem(item)"
              />
              <GridItemSketch
                v-if="item.type === 'sketchItem'"
                :image="item.image"
              />
            </template>
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
  const directors = false;
  const label = '';

  const flatProjects = projectItems.value.filter(item => item?.type === 'project');
  const index = flatProjects.findIndex(project => project.id === item.id);

  store.setModalOpen(flatProjects, index, directors, label);
}
</script>
