<template>
  <div class="page">
    <Paper />
    <DirectorHero
      :tagline="page.tagline"
      :title="page.title"
      :skeletons="[{profileImage: page.profileImage}]"
      :reelVideo="page.reelVideo"
      :reelPoster="page.reelPosterImage"
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
    <BigCta
      path="/directors"
      label="Back to Directors"
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
  profileImage ${imageProps},
  reelVideo,
  reelPosterImage ${imageProps},
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
        title,
        slug
      },
      projectVideo,
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
