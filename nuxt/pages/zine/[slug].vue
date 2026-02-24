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
      path="javascript:void(0)"
      label="Back"
      @click="handleBack"
    />
    <Footer />
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useSiteStore } from '~/stores/store';

const store = useSiteStore();
const router = useRouter();
const route = useRoute();

function handleBack() {
  if (store.initialRoute) {
    router.push('/zine');
  } else {
    router.back();
  }
}

const params = { slug: route.params.slug };
const articleQuery = groq`*[_type == 'article' && slug.current == $slug][0]{
  seoSocial {
    description,
    image ${imageProps}
  },
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
  description: page.seoSocial?.description ? page.seoSocial.description : store.siteDescription,
  ogTitle: `${page.title} | ${store.siteName}`,
  ogDescription: page.seoSocial?.description ? page.seoSocial.description : store.siteDescription,
  ogImage:
    page.seoSocial?.image?.src
      ? page.seoSocial.image.src
      : page.ctaCardImages?.squareImage?.image?.src
        ? page.ctaCardImages.squareImage.image.src
        : store.ogImage,
  ogUrl: page.slug?.current ? `${store.ogUrl}/zine/${page.slug.current}` : store.ogUrl
})
</script>
