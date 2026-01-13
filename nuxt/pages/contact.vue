<template>
  <div class="page">
    <Paper />
    <ContactHero
      :title="page.heroHeading"
      :sketches="page.heroHeadingSketches"
      :subSketch="page.subHeadingSketch"
    />
    <ContactDirectory
      :directory="page.directory"
    />
    <ContactFounders
      :cutoutTitle="page.foundersSketchnote"
      :founders="page.founders"
    />
    <Footer />
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';

const store = useSiteStore();

const contactQuery = groq`*[(_type == "contact")][0]{
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
  subHeadingSketch {
    image ${imageProps},
    properties {
      height,
      offsetX,
      offsetY
    }
  },
  directory[] {
    sketchnote,
    lists[] {
      label,
      items[] {
        label,
        link
      }
    }
  },
  foundersSketchnote,
  founders[] {
    profileImage ${imageProps},
    name,
    role,
    email,
    location,
    bio
  }
}`;

// Async
const { data } = await useAsyncData('contact', () => useSanity().fetch(contactQuery));
const page = data.value;

useSeoMeta({
  title: `Contact | ${store.siteName}`,
  description: page.seoSocial?.description ? page.seoSocial.description : store.siteDescription,
  ogTitle: `Contact | ${store.siteName}`,
  ogDescription: page.seoSocial?.description ? page.seoSocial.description : store.siteDescription,
  ogImage: page.seoSocial?.image?.src ? page.seoSocial.image.src : store.ogImage,
  ogUrl: `${store.ogUrl}/contact`
})
</script>
