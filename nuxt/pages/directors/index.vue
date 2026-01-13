<template>
  <div id="directors-page" :class="page">
    <Paper :edges="false" />
    <DirectorsHero
      :sketchHeading="page.heroHeading"
      :sketchnoteLeft="page.sketchnoteLeft"
      :sketchnoteLeftSketch="page.sketchnoteLeftSketch"
      :directors="page.directors"
      :endMarkSketch="page.heroEndMarkSketch"
    />
    <Footer :cover="true" />
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';

const store = useSiteStore();

const directorsQuery = groq`*[(_type == "directors")][0]{
  seoSocial {
    description,
    image ${imageProps}
  },
  heroHeading,
  sketchnoteLeft,
  sketchnoteLeftSketch {
    image ${imageProps},
    properties {
      height,
      offsetX,
      offsetY
    }
  },
  directors[]{
    director->{
      title,
      'slug': '/directors/' + slug.current
    },
    backgroundVideo
  },
  heroEndMarkSketch {
    image ${imageProps},
    properties {
      height,
      offsetX,
      offsetY
    }
  }
}`;

// Async
const { data } = await useAsyncData('directors', () => useSanity().fetch(directorsQuery));
const page = data.value;

useSeoMeta({
  title: `Directors | ${store.siteName}`,
  description: page.seoSocial?.description ? page.seoSocial.description : store.siteDescription,
  ogTitle: `Directors | ${store.siteName}`,
  ogDescription: page.seoSocial?.description ? page.seoSocial.description : store.siteDescription,
  ogImage: page.seoSocial?.image?.src ? page.seoSocial.image.src : store.ogImage,
  ogUrl: `${store.ogUrl}/directors`
})
</script>

<style lang="scss">
#directors-page {
  &:before {
    display: none;
  }
}
</style>
