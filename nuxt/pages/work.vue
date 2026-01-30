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
    />
    <Footer />
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';

const store = useSiteStore();

const workQuery = groq`*[(_type == "work")][0]{
  seoSocial {
    description,
    image ${imageProps}
  },
  heroHeading,
  heroHeadingSketches {
    sketch1 {
      image ${imageProps},
      properties {
        height,
        offsetX,
        offsetY
      }
    },
    sketch2 {
      image ${imageProps},
      properties {
        height,
        offsetX,
        offsetY
      }
    }
  },
  heroCopy,
  filters[]->{
    filter,
    id,
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
              directorName,
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
          _type == 'sketchItem' => {
            'type': _type,
            image ${imageProps}
          }
        }
      }
    }
  }
}`;

// Async
const { data } = await useAsyncData('work', () => useSanity().fetch(workQuery));
const page = data.value;

useSeoMeta({
  title: `Work | ${store.siteName}`,
  description: page.seoSocial?.description ? page.seoSocial.description : store.siteDescription,
  ogTitle: `Work | ${store.siteName}`,
  ogDescription: page.seoSocial?.description ? page.seoSocial.description : store.siteDescription,
  ogImage: page.seoSocial?.image?.src ? page.seoSocial.image.src : store.ogImage,
  ogUrl: `${store.ogUrl}/work`
})
</script>
