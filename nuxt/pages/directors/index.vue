<template>
  <div class="page">
    <Placeholder title="DIRECTORS" />
    <Footer />
  </div>
</template>

<script setup>
const directorsQuery = groq`*[(_type == "directors")][0]{
  heroHeading,
  sketchnoteLeft,
  directors[]->{
    title,
    slug
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
