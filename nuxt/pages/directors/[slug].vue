<template>
  <div class="page">
    <Placeholder :title="page.title" />
    <Footer />
  </div>
</template>

<script setup>
const route = useRoute();
const params = { slug: route.params.slug };
const query = groq`*[_type == 'director' && slug.current == $slug][0]{
  title,
  slug,
  tagline,
  anatomyLabel,
  anatomyBio,
  anatomyLocation,
  anatomyTags[]->{
    tag,
    id
  }
}`;

// Async data
const { data } = await useSanityQuery(query, { slug: params.slug });
const page = data.value;

// Mounted
onMounted(() => {
  console.log('Director:', page);
});

</script>