<template>
  <div class="page">
    <Paper />
    <WorkHero
      :title="page.heroHeading"
      :sketches="page.heroHeadingSketches"
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
  heroHeadingSketches {
    sketch1 {
      image ${imageProps}
    },
    sketch2 {
      image ${imageProps}
    }
  },
  heroCopy,
  filters[]->{
    filter,
    id,
    filterLayout
  },
  projects[] {
    layout,
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
      }
    }
  }
}`;

// Async
const { data } = await useAsyncData('work', () => useSanity().fetch(workQuery));
const page = data.value;
</script>
