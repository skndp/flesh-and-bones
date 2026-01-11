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
const directorsQuery = groq`*[(_type == "directors")][0]{
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
</script>

<style lang="scss">
#directors-page {
  &:before {
    display: none;
  }
}
</style>
