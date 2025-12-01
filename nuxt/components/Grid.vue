<template>
  <section class="grid pad-b">
    <div class="gutter">
      <div class="rows">
        <div v-for="row in grid" class="row">
          <template v-for="(item, index) in row.items" :key="index">
            <NuxtLink v-if="item.slug" :to="item.slug" class="item">
              <p>{{  item.title }}</p>
            </NuxtLink>
            <div v-else class="item">
              <p>{{  item.title }}</p>
            </div>
          </template>
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

function getPath(item) {
  let prefix = 'proj';

  return `/${prefix}/${item.slug.current}`;
}
</script>

<style lang='scss'>
section.grid {
  position: relative;

  .gutter {
    .rows {
      width: 100%;
      display: block;

      .row {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: $space-16;

        &:has(.item:only-child) {
          grid-template-columns: 1fr;
        }

        &:not(:last-child) {
          margin-bottom: $space-16;
        }
      }

      .item {
        aspect-ratio: 3/2;
        box-shadow: inset 0px 0px 0px 1px $flesh;
        padding: $space-16;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;

        &:only-child {
          aspect-ratio: 3/1;
        }
      }
    }
  }
}

</style>
