<template>
  <NuxtLink :to="item.slug" class="item article flesh" :class="[ layout ]">
    <div class="item-image">
      <template v-if="layout === 'square' && item.ctaCardImages.squareImage">
        <ResponsiveImage v-bind="item.ctaCardImages.squareImage.image" />
      </template>
      <template v-else>
        <ResponsiveImage v-bind="item.ctaCardImages.landscapeImage.image" />
      </template>
    </div>
    <div class="item-details">
      <div class="meta">
        <p class="fs-sm">{{ item.ctaCardSummary }}</p>
        <p class="fs-lg">{{ item.ctaCardLabel }}</p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
// Props
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  layout: {
    type: String,
    required: true
  }
});
</script>

<style lang='scss'>
.item.article {
  position: relative;
  aspect-ratio: 1/1;
  display: flex;
  flex-direction: column;

  &:nth-child(2) {
    margin-top: span(1);
  }

  .item-image {
    position: relative;
    width: 80%;
    aspect-ratio: 1/1;
    margin: 0 auto;
  }

  .item-details {
    width: 80%;
    margin: 0 auto;

    .meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: $space-16;

      p {
        width: 48%;

        &:nth-child(2) {
          text-align: right;
          white-space: nowrap;
          text-decoration: underline;
        }
      }
    }
  }

  @include respond-to($small-tablet) {
    aspect-ratio: 1/1;

    &:only-child {
      aspect-ratio: 2/1;
    }

    &:nth-child(2) {
      margin-top: 0px;
    }
  }

  @include respond-to($tablet) {

  }

  @include respond-to($macbook) {
    aspect-ratio: 4/3;

    &:only-child {
      aspect-ratio: 8/3;
    }

    .item-image {
      width: 66%;
    }

    .item-details {
      width: 66%;

      // .meta {
      //   display: flex;
      //   justify-content: space-between;
      //   align-items: center;
      //   margin-top: $space-16;

      //   p {
      //     width: 48%;

      //     &:nth-child(2) {
      //       text-align: right;
      //       white-space: nowrap;
      //       text-decoration: underline;
      //     }
      //   }
      // }
    }
  }
}
</style>
