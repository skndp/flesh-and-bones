<template>
  <div id="directors-page" :class="page">
    <DirectorsHero
      :sketchnoteLeft="page.sketchnoteLeft"
      :sketchHeading="page.heroHeading"
      :directors="page.directors"
    />
    <Footer :cover="true" />
  </div>
</template>

<script setup>
const directorsQuery = groq`*[(_type == "directors")][0]{
  heroHeading,
  sketchnoteLeft,
  directors[]{
    director->{
      title,
      'slug': '/directors/' + slug.current
    },
    backgroundVideo
  }
}`;

// Async
const { data } = await useAsyncData('directors', () => useSanity().fetch(directorsQuery));
const page = data.value;

// Mounted
onMounted(() => {
  console.log('Directors:', page);
});
</script>

<style lang="scss">
#directors-page {
  &:before {
    display: none;
  }
}
</style>