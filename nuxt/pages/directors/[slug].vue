<template>
  <div class="page">
    <DirectorHero
      :tagline="page.tagline"
      :title="page.title"
    />
    <DirectorAnatomy
      :label="page.anatomyLabel"
      :bio="page.anatomyBio"
      :location="page.anatomyLocation"
      :tags="page.anatomyTags"
    />
    <ProjectsGrid
      v-if="page.projects"
      :grid="page.projects"
    />
    <Footer />
  </div>
</template>

<script setup>
const route = useRoute();
const params = { slug: route.params.slug };
const directorQuery = groq`*[_type == 'director' && slug.current == $slug][0]{
  title,
  slug,
  tagline,
  anatomyLabel,
  anatomyBio,
  anatomyLocation,
  anatomyTags[]->{
    tag,
    id
  },
  projects[] {
    items[]->{
      title,
      director->{
        title
      },
      ctaCardImages {
        landscapeImage {
          image ${imageProps}
        },
        squareImage {
          image ${imageProps}
        }
      }
    }
  }
}`;

// Async data
const { data } = await useSanityQuery(directorQuery, { slug: params.slug });
const page = data.value;

// Mounted
onMounted(() => {
  console.log('Director:', page);
});

</script>
