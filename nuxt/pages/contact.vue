<template>
  <div class="page">
    <Placeholder title="CONTACT" />
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
