<template>
  <div class="error-page">
    <Paper />
    <section class="pad-t pad-b">
      <div class="gutter">
        <h2 class="h2">Error 404</h2>
        <p class="p2">The page you requested could not be found.</p>
        <NuxtLink to="/" @click.prevent="goHome">Go Home</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
const goHome = () => {
  clearError({ redirect: '/' })
  
  // Then hard reload (so we see the site loader, clean slate)
  setTimeout(() => {
    window.location.href = '/';
  }, 0);
}
</script>

<style lang='scss'>
.error-page {
  section {
    .h2 {
      margin-bottom: 0.5em;
    }

    a {
      margin-top: 2em;
      text-decoration: underline;
      text-underline-offset: 4px;
      display: inline-flex;
    }
  }
}

</style>
