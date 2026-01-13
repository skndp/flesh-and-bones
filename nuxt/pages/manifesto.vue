<template>
  <div class="page">
    <Paper />
    <ManifestoHero
      :kicker="page.heroKicker"
      :title="page.heroHeading"
      :sketches="page.heroHeadingSketches"
      :copy="page.heroCopy"
      :endMark="page.heroEndMark"
      :endMarkSketch="page.heroEndMarkSketch"
    />
    <Footer />
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';

const store = useSiteStore();

const manifestoQuery = groq`*[(_type == "manifesto")][0]{
  seoSocial {
    description,
    image ${imageProps}
  },
  heroKicker,
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
  heroEndMark,
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
const { data } = await useAsyncData('manifesto', () => useSanity().fetch(manifestoQuery));
const page = data.value;

useSeoMeta({
  title: `Manifesto | ${store.siteName}`,
  description: page.seoSocial?.description ? page.seoSocial.description : store.siteDescription,
  ogTitle: `Manifesto | ${store.siteName}`,
  ogDescription: page.seoSocial?.description ? page.seoSocial.description : store.siteDescription,
  ogImage: page.seoSocial?.image?.src ? page.seoSocial.image.src : store.ogImage,
  ogUrl: `${store.ogUrl}/manifesto`
})
</script>
