<template>
  <div class="page">
    <WorkHero
      :title="page.heroHeading"
      :copy="page.heroCopy"
    />
    <Grid
      :filters="page.filters"
      :grid="page.projects"
    />
    <Footer />
  </div>
</template>

<script setup>
const workQuery = groq`*[(_type == "work")][0]{
  heroHeading,
  heroCopy,
  filters[]->{
    filter,
    id,
    filterLayout
  },
  projects[] {
    items[] {
      type[] {
        _type == 'projectItem' => {
          'type': _type,
          project->{
            title,
            filters[]->{
              filter,
              id
            },
            director->{
              title,
              slug
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
      }
    }
  }
}`;

// Async
const { data } = await useAsyncData('work', () => useSanity().fetch(workQuery));
const page = data.value;

// Mounted
onMounted(() => {
  console.log('Work:', page);
});
</script>
