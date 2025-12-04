<template>
  <section class="grid pad-b">
    <span v-if="sketchnoteLeft" class="sketchnote" inert :data-label="sketchnoteLeft" />
    <span v-if="sketchnoteRight" class="sketchnote right" inert :data-label="sketchnoteRight" />
    <div class="gutter">
      <ul v-if="filters" class="filters pad-b">
        <li class="selected" data-id="all">
          <strong>All</strong>
        </li>
        <li v-for="item in filters" :data-id="item.id.current" class="flesh">
          <strong>{{ item.filter }}</strong>
        </li>
      </ul>
      <div class="rows">
        <div v-for="(row, rowIndex) in grid" class="row" :key="rowIndex">
          <template v-for="(item, index) in row.items" :key="index">
            <GridItemProject
              v-if="item.type[0].type === 'projectItem'"
              :item="item.type[0].project"
              @click="onClickProjectItem(item.type[0])"
            />
            <GridItemArticle
              v-if="item.type[0].type === 'articleItem'"
              :item="item.type[0].article"
            />
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
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

const projectItems = computed(() => {
  return props.grid
    .flatMap(row => row.items)
    .map(item => item.type[0])
    .filter(t => t.type === 'projectItem')
});

function onClickProjectItem(item) {
  const index = projectItems.value.indexOf(item);
  console.log(index + 1, projectItems.value.length);
};
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
      justify-content: center;

      li {
        margin: 0 0.5em;
        padding: 0.25em;
        cursor: default;

        &.selected {
          color: $bone;
          background-color: $flesh;
          pointer-events: none;
        }

        @include can-hover {
          &:hover {
            color: $bone;
            background-color: $flesh;
          }
        }
      }
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
      }
    }
  }

  @include respond-to($small-tablet) {
    .gutter {
      .rows {
        .row {
          grid-template-columns: repeat(2, 1fr);
          gap: span(1);

          &:has(.item:only-child) {
            grid-template-columns: 1fr;
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
