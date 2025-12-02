<template>
  <div class="page">
    <Placeholder :title="page.heroHeading">
      <p>{{ page.heroCopy }}</p>
    </Placeholder>
    <Grid :grid="page.featuredGrid" />
    <Footer />
  </div>
</template>

<script setup>
const homeQuery = groq`*[(_type == "home")][0]{
  heroHeading,
  heroCopy,
  sketchnoteLeft,
  sketchnoteRight,
  featuredGrid[] {
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
        },
        _type == 'articleItem' => {
          'type': _type,
          article->{
            title,
            'slug': '/zine/' + article->slug.current,
            ctaCardImages {
              landscapeImage {
                image ${imageProps}
              },
              squareImage {
                image ${imageProps}
              }
            },
            ctaCardLabel,
            ctaCardSummary
          }
        }
      }
    }
  }
}`;

// Async
const { data } = await useAsyncData('home', () => useSanity().fetch(homeQuery));
const page = data.value;

// Mounted
onMounted(() => {
  console.log('Home:', page);
});
</script>
