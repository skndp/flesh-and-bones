<template>
  <div class="page">
    <DirectorsHero
      :sketchnoteLeft="page.sketchnoteLeft"
      :sketchHeading="page.heroHeading"
      :directors="page.directors"
    />
    <Footer />
  </div>
</template>

<script setup>
const directorsQuery = groq`*[(_type == "directors")][0]{
  heroHeading,
  sketchnoteLeft,
  directors[]->{
    title,
    'slug': '/directors/' + slug.current
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
