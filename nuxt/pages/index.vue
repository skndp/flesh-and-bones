<template>
  <div class="page">
    <Placeholder title="HOME - HERO" />
    <Placeholder title="HOME - FEATURED WORK" />
    <Footer />
  </div>
</template>

<script setup>
const homeQuery = groq`*[(_type == "home")][0]{
  heroHeading,
  heroCopy
}`;

// Async
const { data } = await useAsyncData('home', () => useSanity().fetch(homeQuery));
const page = data.value;

// Mounted
onMounted(() => {
  console.log('Home:', page);
});
</script>
