<template>
  <footer id="footer" class="bg-midnight pad-t pad-b">
    <div class="gutter">
      <p>FOOTER</p>
    </div>
  </footer>
</template>

<script setup>
import { smoothScrollTo } from '~/utils/smooth-scroll-to';

// const route = useRoute();

// Async data
// const uniqKey = 'footer';
// const { data } = await useAsyncData(uniqKey, () => useSanity().fetch(footerQuery));
// const footer = data.value;

// Methods
// function onClickNavLink(e) {
//   let path = new URL(e.currentTarget.href).pathname;

//   if (route.path === path) {
//     smoothScrollTo(0);
//   }
// }
</script>

<style lang='scss'>

#footer {
  position: relative;

  .gutter {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

</style>
