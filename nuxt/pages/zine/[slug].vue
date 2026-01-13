<template>
  <div class="page">
    <Paper />
    <ArticleHero
      :title="page.title"
    />
    <RichText
      v-if="page.content"
      :richText="page.content.content"
    />
    <BigCta
      path="/zine"
      label="Back to Zine"
    />
    <Footer />
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';

const route = useRoute();
const store = useSiteStore();

const params = { slug: route.params.slug };
const articleQuery = groq`*[_type == 'article' && slug.current == $slug][0]{
  title,
  slug,
  ctaCardImages {
    squareImage {
      image ${imageProps}
    }
  },
  content {
    content[] {
      ...,
      _type == 'singleImage' => {
        image ${imageProps}
      }
    }
  }
}`;

// Async data
const { data } = await useSanityQuery(articleQuery, { slug: params.slug });
const page = data.value;

useSeoMeta({
  title: `${page.title} | ${store.siteName}`,
  description: store.siteDescription,
  ogTitle: `${page.title} | ${store.siteName}`,
  ogDescription: store.siteDescription,
  ogImage: page.ctaCardImages?.squareImage?.image?.src ? page.ctaCardImages.squareImage.image.src : store.ogImage,
  ogUrl: page.slug?.current ? `${store.ogUrl}/zine/${page.slug.current}` : store.ogUrl
})
</script>
