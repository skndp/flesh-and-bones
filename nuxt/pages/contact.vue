<template>
  <div class="page">
    <ContactHero
      :title="page.heroHeading"
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
const contactQuery = groq`*[(_type == "contact")][0]{
  heroHeading,
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

// Mounted
onMounted(() => {
  console.log('Contact:', page);
});
</script>
