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
const manifestoQuery = groq`*[(_type == "manifesto")][0]{
  heroKicker,
  heroHeading,
  heroHeadingSketches {
    sketch1 {
      image ${imageProps}
    },
    sketch2 {
      image ${imageProps}
    }
  },
  heroCopy,
  heroEndMark,
  heroEndMarkSketch {
    image ${imageProps}
  }
}`;

// Async
const { data } = await useAsyncData('manifesto', () => useSanity().fetch(manifestoQuery));
const page = data.value;

// Mounted
onMounted(() => {
  console.log('Manifesto:', page);
});
</script>
