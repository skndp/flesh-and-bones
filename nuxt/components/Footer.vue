<template>
  <footer id="footer" class="bg-midnight pad-t pad-b">
    <div class="gutter">
      <p>FOOTER</p>
      <p>© {{ new Date().getFullYear() }} Flesh and Bones</p>
    </div>
  </footer>
</template>

<script setup>
const footerQuery = groq`*[(_type == "footer")][0]{
  locations[],
  socials[]
}`

// Async data
const uniqKey = 'footer';
const { data } = await useAsyncData(uniqKey, () => useSanity().fetch(footerQuery));
const footer = data.value;

onMounted(() => {
  console.log('Footer:', footer);
});
</script>

<style lang='scss'>

#footer {
  position: relative;

  .gutter {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
}

</style>
