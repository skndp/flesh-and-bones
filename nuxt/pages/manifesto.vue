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
</script>
