<template>
  <div class="page">
    <Paper />
    <ZineHero
      :title="page.heroHeading"
      :sketches="page.heroHeadingSketches"
    />
    <ZineGrid
      :items="page.items"
    />
    <Footer />
  </div>
</template>

<script setup>
const zineQuery = groq`*[(_type == "zine")][0]{
  heroHeading,
  heroHeadingSketches {
    sketch1 {
      image ${imageProps}
    },
    sketch2 {
      image ${imageProps}
    }
  },
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
</script>
