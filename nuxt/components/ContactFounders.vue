<template>
  <section class="contact-founders pad-b">
    <Boneyard :tagline="cutoutTitle" :skeletons="founders" />
    <div class="gutter cols pad-b">
      <div v-for="founder in founders" class="col">
        <p class="flesh brush">{{ founder.name }}</p>
        <p class="manic sm">{{ founder.role }}</p>
        <p class="manic sm">
          <NuxtLink :to="`mailto:${founder.email}`" target="_blank">{{ founder.email }}</NuxtLink>
        </p>
        <p class="manic sm">{{ founder.location }}</p>
        <p class="bio">{{ founder.bio }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
// Props
const props = defineProps({
  cutoutTitle: {
    type: String,
    required: true
  },
  founders: {
    type: Array,
    required: true
  }
});
</script>

<style lang='scss'>
section.contact-founders {
  .cols {
    padding-top: span(1);

    .col {
      &:not(:last-child) {
        margin-bottom: $space-48;
      }

      p {
        margin-bottom: 0.25em;

        &.bio {
          max-width: 666px;
          line-height: 1.666em;
          margin-bottom: 0px;
          padding-top: 2em;
          white-space: pre-line;
        }
      }
    }
  }

  @include respond-to($tablet) {
    .cols {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: span(1);

      .col {
        &:not(:last-child) {
          margin-bottom: 0px;
        }
      }
    }
  }
}
</style>
