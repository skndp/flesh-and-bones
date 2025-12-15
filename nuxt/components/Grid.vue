<template>
  <section class="grid pad-b">
    <span v-if="sketchnoteLeft" class="sketchnote manic md" inert :data-label="sketchnoteLeft"></span>
    <span v-if="sketchnoteRight" class="sketchnote right bone manic-alt-1" inert :data-label="sketchnoteRight"></span>
    <div class="gutter">
      <ul v-if="filters" class="filters pad-b brush sm">
        <li class="flesh" :class="{ 'selected': selectedFilterId === 'all' }" @click="onClickFilter('all', 'All')">
          <span class="rough-edges-light bg"></span>
          <span>All</span>
        </li>
        <li
          v-for="(item, index) in filters"
          class="flesh"
          :class="{ 'selected': selectedFilterId === item.id.current }"
          @click="onClickFilter(item.id.current, item.filter, item.filterLayout)"
          :key="index"
        >
          <span class="rough-edges-light bg"></span>
          <span>{{ item.filter }}</span>
        </li>
      </ul>
      <Transition name="grid-switch" mode="out-in" :duration="333">
        <div :key="selectedFilterId">
          <template v-if="filters && selectedFilterId !== 'all'">
            <div :class="[ 'filter-items', filterLayout ]">
              <GridItemProject
                v-for="(projectItem, index) in filteredProjects"
                :layout="filterLayout"
                :item="projectItem.project"
                :key="index"
                @click="onClickProjectItem(projectItem)"
              />
            </div>
          </template>
          <template v-else>
            <div class="rows">
              <div v-for="(row, rowIndex) in grid" class="row" :key="rowIndex">
                <template v-for="(item, index) in row.items" :key="index">
                  <GridItemProject
                    v-if="item.type[0].type === 'projectItem'"
                    :layout="row.items.length > 1 ? 'square' : 'landscape'"
                    :item="item.type[0].project"
                    @click="onClickProjectItem(item.type[0])"
                  />
                  <GridItemArticle
                    v-if="item.type[0].type === 'articleItem'"
                    :layout="row.items.length > 1 ? 'square' : 'landscape'"
                    :item="item.type[0].article"
                  />
                </template>
              </div>
            </div>
          </template>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';

const route = useRoute();
const store = useSiteStore();

// Props
const props = defineProps({
  filters: {
    type: Array,
    required: false
  },
  grid: {
    type: Array,
    required: true
  },
  sketchnoteLeft: {
    type: String,
    required: false
  },
  sketchnoteRight: {
    type: String,
    required: false
  }
});

const selectedFilterId = ref('all');
const selectedFilterLabel = ref('All');
const filterLayout = ref('landscape');

const projectItems = computed(() => {
  return props.grid
    .flatMap(row => row.items)
    .map(item => item.type[0])
    .filter(t => t.type === 'projectItem')
});

const filteredProjects = computed(() => {
  if (selectedFilterId.value === 'all') {
    return [];
  }

  return projectItems.value.filter(item => {
    const filters = item.project?.filters || [];

    return filters.some(f => {
      return f.id.current === selectedFilterId.value;
    });
  });
});

function onClickProjectItem(item) {
  const index = projectItems.value.indexOf(item);
  const flatProjects = projectItems.value.map(item => item.project);
  const directors = true;
  const label = props.filters ? selectedFilterLabel.value : 'Featured';
  store.setModalOpen(flatProjects, index, directors, label);
};

function onClickFilter(id, label, layout) {
  selectedFilterId.value = id === 'all' ? 'all' : id;;
  selectedFilterLabel.value = label === 'All' ? 'All' : label;
  filterLayout.value = layout ? layout : 'landscape';
}
</script>

<style lang='scss'>
section.grid {
  position: relative;

  .sketchnote {
    display: none;
  }

  .gutter {
    ul.filters {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      li {
        position: relative;
        margin: 0 0.5em;
        padding: 0.1em 0.3em 0.3em;
        cursor: pointer;

        span {
          position: relative;
        }

        span.bg {
          @include abs-fill;
          background-color: $flesh;
          visibility: hidden;
        }

        &.selected {
          color: $bone;
          pointer-events: none;

          span.bg {
            visibility: visible;
          }
        }

        @include can-hover {
          &:hover {
            color: $bone;

            span.bg {
              visibility: visible;
            }
          }
        }
      }
    }

    .filter-items {
      width: 100%;
    }

    .rows {
      width: 100%;
      display: block;

      .row {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;

        &:not(:last-child) {
          margin-bottom: span(1);
        }

        .item {
          &:nth-child(2) {
            margin-top: span(1);
          }
        }
      }
    }

    // Grid filter transitions...
    .item {
      transition: opacity $speed-333 $ease-out, transform $speed-333 $ease-out;
    }

    // Cascade in
    .grid-switch-enter-from {
      .item {
        opacity: 0;
        transform: scale(0.9);
      }
    }

    .grid-switch-enter-to {
      .item {
        opacity: 1;
        transform: scale(1);
      }
    }

    // Cascade out
    .grid-switch-leave-from .item {
      opacity: 1;
      transform: scale(1);
    }

    .grid-switch-leave-to .item {
      opacity: 0;
      transform: scale(0.9);
    }
  }

  @include respond-to($small-tablet) {
    .gutter {
      .filter-items {
        &.square {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: span(1);
        }
      }

      .rows {
        .row {
          grid-template-columns: repeat(2, 1fr);
          gap: span(1);

          &:has(.item:only-child) {
            grid-template-columns: 1fr;
          }

          .item {
            &:nth-child(2) {
              margin-top: 0px;
            }
          }
        }
      }
    }
  }

  @include respond-to($tablet) {
    .sketchnote {
      position: absolute;
      top: 0px;
      left: 0px;
      width: span(1);
      height: 100%;
      display: flex;

      &:after {
        content: attr(data-label);
        position: absolute;
        top: 0px;
        left: 50%;
        white-space: nowrap;
        transform-origin: 0% 0%;
        transform: rotate(-90deg) translateX(-100%) translateY(-50%);
      }

      &.right {
        left: auto;
        right: 0px;

        &:after {
          left: auto;
          right: 50%;
          transform-origin: 100% 0%;
          transform: rotate(90deg) translateX(237%) translateY(-50%);
        }
      }
    }

    .gutter {
      .filter-items {
        &.square {
          gap: span(0.75);
        }

        .item {
          &:not(:last-child) {
            margin-bottom: span(0.75);
          }
        }
      }

      .rows {
        .row {
          gap: span(0.75);

          &:not(:last-child) {
            margin-bottom: span(0.75);
          }
        }
      }
    }
  }

  @include respond-to($macbook) {
    .gutter {
      .filter-items {
        &.square {
          gap: span(0.5);
        }

        .item {
          &:not(:last-child) {
            margin-bottom: span(0.5);
          }
        }
      }

      .rows {
        .row {
          gap: span(0.5);

          &:not(:last-child) {
            margin-bottom: span(0.5);
          }
        }
      }
    }
  }
}

</style>
