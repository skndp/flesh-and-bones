<template>
  <section class="grid">
    <span v-if="sketchnoteLeft" class="sketchnote manic md" inert :data-label="sketchnoteLeft"></span>
    <span v-if="sketchnoteRight" class="sketchnote right bone manic-alt-1" inert :data-label="sketchnoteRight"></span>
    <div class="gutter">
      <ul v-if="hasFilters" class="filters pad-b brush sm">
        <li
          v-for="(item, index) in filters"
          :key="item.id.current"
          class="flesh"
          :class="{ selected: selectedFilterIndex === index }"
          @click="onClickFilter(index)"
          @mouseenter="onItemHover"
          @mouseleave="onItemHover"
        >
          <span class="rough-edges-light bg"></span>
          <span>{{ item.filter }}</span>
        </li>
      </ul>
      <Transition
        v-if="activeGrid.length"
        name="grid-switch"
        mode="out-in"
        :duration="333"
      >
        <div class="grid-wrapper" :key="selectedFilterIndex">
          <div class="rows">
            <div
              v-for="(row, rowIndex) in activeGrid"
              :key="rowIndex"
              class="row"
              :class="getLayout(row.layout, row.items.length)"
            >
              <template v-for="(item, index) in row.items" :key="index">
                <GridItemProject
                  v-if="item.type[0].type === 'projectItem'"
                  :layout="row.items.length > 1 ? 'square' : 'landscape'"
                  :item="item.type[0].project"
                  @click="onClickProjectItem(item.type[0])"
                />
                <GridItemArticle
                  v-if="item.type[0].type === 'articleItem'"
                  :item="item.type[0].article"
                />
                <GridItemSketch
                  v-if="item.type[0].type === 'sketchItem'"
                  :image="item.type[0].image"
                />
              </template>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';

const store = useSiteStore();

// Props
const props = defineProps({
  sketchnoteLeft: {
    type: String,
    required: false
  },
  sketchnoteRight: {
    type: String,
    required: false
  },
  modalLabel: {
    type: String,
    required: false
  },
  filters: {
    type: Array,
    required: false,
    default: () => []
  },
  grid: {
    type: Array,
    required: false,
    default: () => []
  }
});

// State
const selectedFilterIndex = ref(0);

// Computed
const hasFilters = computed(() => {
  return props.filters.length > 0;
});

const activeFilter = computed(() => {
  if (!hasFilters.value) return null;
  return props.filters[selectedFilterIndex.value];
});

const activeGrid = computed(() => {
  if (hasFilters.value) {
    return activeFilter.value?.projects || [];
  }

  return props.grid || [];
});

// Methods
function getLayout(layout, total) {
  return total === 2 ? layout || '' : '';
}

function onClickFilter(index) {
  selectedFilterIndex.value = index;
}

function onClickProjectItem(item) {
  const directors = true;
  const label = hasFilters.value ? activeFilter.value.filter : props.modalLabel || 'Work';

  const flatProjects = activeGrid.value
    .flatMap(row => row.items)
    .map(item => item.type[0])
    .filter(t => t.type === 'projectItem')
    .map(t => t.project)

  const index = flatProjects.findIndex(
    project => project === item.project
  );

  store.setModalOpen(flatProjects, index, directors, label);
}

function onItemHover(e) {
  const t = e.currentTarget;
  const bg = t.querySelector('.bg');

  if (e.type === 'mouseenter') {
    bg.style.maskComposite = 'unset';
    bg.style.maskImage = `url('${store.getRipMask()}')`;
  } else {
    bg.style.maskComposite = 'exclude';
    bg.style.maskImage = `url('${store.getRipMask()}'), linear-gradient(#000 0 0)`;
  }
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
          mask-size: cover;
          mask-composite: exclude;
          mask-image: linear-gradient(#000 0 0), linear-gradient(#000 0 0);
          pointer-events: none;
          backface-visibility: hidden;
          transform: translateZ(0);
          will-change: transform, mask-image, mask-composite;
        }

        &.selected {
          color: $bone;
          pointer-events: none;

          span.bg {
            mask-image: none !important;
          }
        }

        @include can-hover {
          &:hover {
            color: $bone;
          }
        }
      }
    }

    .grid-wrapper {
      margin-bottom: span(-1);

      .filter-items {
        width: 100%;

        .item {
          margin-bottom: span(1);
        }
      }

      .rows {
        width: 100%;
        display: block;

        .row {
          width: 100%;
          display: flex;
          flex-direction: column;

          .item {
            margin-bottom: span(1);
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

  @include respond-to($tablet) {
    padding-bottom: span(0.5);

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
      .grid-wrapper {
        margin-bottom: span(-0.75);

        .filter-items {
          &.square {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            column-gap: span(0.75);
          }

          .item {
            margin-bottom: span(0.75);
          }
        }

        .rows {
          .row {
            display: grid;
            flex-direction: unset;
            grid-template-columns: repeat(2, 1fr);
            column-gap: span(0.75);
  
            &:has(.item:only-child) {
              grid-template-columns: 1fr;
            }
  
            &:has(.item.square:only-child) {
              .item {
                width: calc(50% - span(0.375));
                margin-left: auto;
                margin-right: auto;
              }
            }
  
            .item {
              margin-bottom: span(0.75);
            }
          }
        }
      }
    }
  }

  @include respond-to($average-desktop) {
    .gutter {
      .grid-wrapper {
        .rows {
          .row {
            &.one-third-two-third {
              &:not(:has(.item.article)) {
                grid-template-columns: 1fr 2fr;

                .item {
                  &:first-child {
                    aspect-ratio: auto;
                  }

                  &:last-child {
                    aspect-ratio: 16/9;
                  }
                }
              }
            }

            &.two-third-one-third {
              &:not(:has(.item.article)) {
                grid-template-columns: 2fr 1fr;

                .item {
                  &:first-child {
                    aspect-ratio: 16/9;
                  }

                  &:last-child {
                    aspect-ratio: auto;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  @include respond-to($macbook) {
    .gutter {
      .grid-wrapper {
        margin-bottom: span(-0.5);

        .filter-items {
          &.square {
            column-gap: span(0.5);
          }

          .item {
            margin-bottom: span(0.5);
          }
        }

        .rows {
          .row {
            column-gap: span(0.5);
  
            &:has(.item.square:only-child) {
              .item {
                width: calc(50% - span(0.25));
              }
            }
  
            .item {
              margin-bottom: span(0.5);
            }
          }
        }
      }
    }
  }
}

</style>
