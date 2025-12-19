<template>
  <div class="page">
    <Paper />
    <Hero
      :title="page.title"
    />
    <Footer />
  </div>
</template>

<script setup>
const route = useRoute();
const params = { slug: route.params.slug };
const articleQuery = groq`*[_type == 'article' && slug.current == $slug][0]{
  title,
  slug
}`;

// Async data
const { data } = await useSanityQuery(articleQuery, { slug: params.slug });
const page = data.value;

// Mounted
onMounted(() => {
  console.log('Article:', page);
});

</script>
