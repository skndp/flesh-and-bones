<template>
  <div id="directors-page" :class="page">
    <Paper />
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
const directorsQuery = groq`*[(_type == "directors")][0]{
  heroHeading,
  sketchnoteLeft,
  sketchnoteLeftSketch {
    image ${imageProps}
  },
  directors[]{
    director->{
      title,
      'slug': '/directors/' + slug.current
    },
    backgroundVideo
  },
  heroEndMarkSketch {
    image ${imageProps}
  }
}`;

// Async
const { data } = await useAsyncData('directors', () => useSanity().fetch(directorsQuery));
const page = data.value;
</script>

<style lang="scss">
#directors-page {
  &:before {
    height: 0px;
  }
}
</style>
