<template>
  <section class="zine-grid pad-b">
    <div class="gutter">
      <div class="grid-cells">
        <NuxtLink
          v-for="(item, index) in items"
          :to="getPath(item)"
          :target="getTarget(item)"
          :key="index"
        >
          <ResponsiveImage v-if="item.zineImage" v-bind="item.zineImage.image" />
          <ResponsiveImage v-if="item.zineImageOverlay" v-bind="item.zineImageOverlay.image" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
// Props
const props = defineProps({
  items: {
    type: Array,
    required: true
  }
});

const getPath = (item) => {
  if (item.article && item.article.slug) {
    return `/zine/${item.article.slug.current}`;
  }

  if (item.url) {
    return item.url;
  }

  return '/';
}

const getTarget = (item) => {
  return item.url ? '_blank' : undefined;
};
</script>

<style lang='scss'>
section.zine-grid {
  position: relative;

  .gutter {
    .grid-cells {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
  
      a {
        position: relative;
        width: 50%;
        aspect-ratio: 1/1;
        overflow: hidden;
        display: flex;

        > img {
          @include abs-fill;
          object-fit: contain;
          object-position: 50% 50%;
        }
      }
    }
  }

  @include respond-to($macbook) {
    .gutter {
      .grid-cells {
        width: 1300px;
        margin: 0 auto;
      }
    }  
  }
}
</style>