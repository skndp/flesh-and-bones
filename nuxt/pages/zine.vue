<template>
  <div class="page">
    <Placeholder :title="page.heroHeading" />
    <Footer />
  </div>
</template>

<script setup>
const zineQuery = groq`*[(_type == "zine")][0]{
  heroHeading
}`;

// Async
const { data } = await useAsyncData('zine', () => useSanity().fetch(zineQuery));
const page = data.value;

// Mounted
onMounted(() => {
  console.log('Zine:', page);
});
</script>
