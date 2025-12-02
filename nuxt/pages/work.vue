<template>
  <div class="page">
    <Placeholder :title="page.heroHeading">
      <p>{{ page.heroCopy }}</p>
    </Placeholder>
    <Grid :filters="page.filters" :grid="page.projects" />
    <Footer />
  </div>
</template>

<script setup>
const workQuery = groq`*[(_type == "work")][0]{
  heroHeading,
  heroCopy,
  filters[]->{
    filter,
    id
  },
  projects[] {
    items[] {
      type[] {
        _type == 'projectItem' => {
          'type': _type,
          project->{
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
