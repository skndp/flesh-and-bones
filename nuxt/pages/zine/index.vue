<template>
  <div class="page">
    <Paper />
    <ZineHero
      :title="page.heroHeading"
      :sketches="page.heroHeadingSketches"
      :copy="page.heroCopy"
    />
    <ZineGrid
      :items="page.items"
    />
    <Footer />
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';

const store = useSiteStore();

const zineQuery = groq`*[(_type == "zine")][0]{
  seoSocial {
    description,
    image ${imageProps}
  },
  heroHeading,
  heroHeadingSketches {
    sketch1 {
      image ${imageProps},
      properties {
        height,
        offsetX,
        offsetY
      }
    },
    sketch2 {
      image ${imageProps},
      properties {
        height,
        offsetX,
        offsetY
      }
    }
  },
  heroCopy,
  items[]{
    article->{
      title,
      slug
    },
    url,
    zineImage{
      image ${imageProps}
    },
    zineImageOverlay {
      image ${imageProps}
    }
  }
}`;

// Async
const { data } = await useAsyncData('zine', () => useSanity().fetch(zineQuery));
const page = data.value;

useSeoMeta({
  title: `Zine | ${store.siteName}`,
  description: page.seoSocial?.description ? page.seoSocial.description : store.siteDescription,
  ogTitle: `Zine | ${store.siteName}`,
  ogDescription: page.seoSocial?.description ? page.seoSocial.description : store.siteDescription,
  ogImage: page.seoSocial?.image?.src ? page.seoSocial.image.src : store.ogImage,
  ogUrl: `${store.ogUrl}/zine`
})
</script>
