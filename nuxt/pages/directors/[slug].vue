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
import { useSiteStore } from '~/stores/store';

const route = useRoute();
const store = useSiteStore();

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
    layout,
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

useSeoMeta({
  title: `${page.title} | ${store.siteName}`,
  description: page.tagline ? page.tagline : store.siteDescription,
  ogTitle: `${page.title} | ${store.siteName}`,
  ogDescription: page.tagline ? page.tagline : store.siteDescription,
  ogImage: page.profileImage?.image?.src ? page.profileImage.image.src : store.ogImage,
  ogUrl: page.slug?.current ? `${store.ogUrl}/directors/${page.slug.current}` : store.ogUrl
})
</script>
