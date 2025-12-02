<template>
  <section class="grid pad-b">
    <div class="gutter">
      <ul v-if="filters" class="filter-bar pad-b">
        <li data-id="all">
          <strong>All</strong>
        </li>
        <li v-for="item in filters" :data-id="item.id.current" class="flesh">
          <strong>{{ item.filter }}</strong>
        </li>
      </ul>
      <div class="rows">
        <div v-for="row in grid" class="row">
          <template v-for="(item, index) in row.items" :key="index">
            <GridItemWork v-if="item.type[0].type === 'projectItem'" :item="item.type[0].project" />
            <GridItemArticle v-if="item.type[0].type === 'articleItem'" :item="item.type[0].article" />
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
  }
});
</script>

<style lang='scss'>
section.grid {
  position: relative;

  .gutter {
    ul.filter-bar {
      display: flex;
      justify-content: center;

      li {
        padding: 0 1em;
      }
    }

    .rows {
      width: 100%;
      display: block;

      .row {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        overflow: hidden;

        &:not(:last-child) {
          margin-bottom: span(1);
        }

        .item {
          position: relative;
          aspect-ratio: 4/3;
          box-shadow: inset 0px 0px 0px 1px $flesh;
          padding: $space-16;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;

          &:nth-child(2) {
            margin-top: span(1);
          }

          .meta {
            width: calc(100% - span(0.5));
            max-width: 400px;
            margin: 1em auto 0;

            p {
              &:nth-child(2) {
                margin-top: 1em;
              }
            }
          }
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

          .item {
            aspect-ratio: 1/1;

            &:only-child {
              aspect-ratio: 2/1;
            }

            &:nth-child(2) {
              margin-top: 0px;
            }
          }
        }
      }
    }
  }

  @include respond-to($tablet) {
    .gutter {
      .rows {
        .row {
          gap: span(0.75);

          &:not(:last-child) {
            margin-bottom: span(0.75);
          }

          .item {
            .meta {
              text-align: left;
              display: flex;
              flex-direction: row;
              justify-content: space-between;

              &:has(p:only-child) {
                text-align: center;
                justify-content: center;
              }

              p {
                display: inline-flex;

                &:nth-child(2) {
                  margin-top: 0px;
                  margin-left: 1em;
                  flex-shrink: 0;
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
      .rows {
        .row {
          gap: span(0.5);

          &:not(:last-child) {
            margin-bottom: span(0.5);
          }

          .item {
            aspect-ratio: 4/3;

            &:only-child {
              aspect-ratio: 8/3;
            }
          }
        }
      }
    }
  }
}

</style>
