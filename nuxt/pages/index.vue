<template>
  <div class="page">
    <HomeHero
      :title="page.heroHeading"
      :copy="page.heroCopy"
    />
    <Grid
      :grid="page.featuredGrid"
      :sketchnoteLeft="page.sketchnoteLeft"
      :sketchnoteRight="page.sketchnoteRight"
    />
    <BigCta
      path="/work"
      label="View All Work"
    />
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
        },
        _type == 'articleItem' => {
          'type': _type,
          article->{
            title,
            'slug': '/zine/' + slug.current,
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
