<template>
  <div class="page">
    <Placeholder title="MANIFESTO" />
    <Footer />
  </div>
</template>

<script setup>
const manifestoQuery = groq`*[(_type == "manifesto")][0]{
  heroKicker,
  heroHeading,
  heroCopy,
  heroEndMark
}`;

// Async
const { data } = await useAsyncData('manifesto', () => useSanity().fetch(manifestoQuery));
const page = data.value;

// Mounted
onMounted(() => {
  console.log('Manifesto:', page);
});
</script>
