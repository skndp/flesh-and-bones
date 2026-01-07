<template>
  <div id="home-page" class="page">
    <div id="home-page-inner">
      <Paper :offset="true" />
      <HomeHeroVideo
        :video="page.heroVideo.vimeo"
      />
      <HomeHero
        :title="page.heroHeading"
        :sketches="page.heroHeadingSketches"
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
  </div>
</template>

<script setup>
const homeQuery = groq`*[(_type == "home")][0]{
  heroVideo,
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
  sketchnoteLeft,
  sketchnoteRight,
  featuredGrid[] {
    layout,
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
</script>

<style lang='scss'>
#home-page {
  &:before {
    display: none;
  }

  #home-page-inner {
    position: relative;
  }
}
</style>
