<template>
  <section class="contact-founders">
    <Boneyard :tagline="cutoutTitle" :skeletons="founders" />
    <div class="gutter cols">
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
  position: relative;
  
  .cols {
    margin-top: -$space-40;

    .col {
      &:not(:last-child) {
        margin-bottom: $space-48;

        p {
          a {
            background-image: url('/images/underline-2.png');
          }
        }
      }

      p {
        margin-bottom: 0.25em;

        a {
          position: relative;
          padding-bottom: 2px;
          background-image: url('/images/underline.png');
          background-repeat: no-repeat;
          background-position: 50% 100%;
          background-size: 100% 5px;
          display: inline-flex;
        }

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
    padding-bottom: span(1);

    .cols {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: span(1);

      .col {
        &:not(:last-child) {
          margin-bottom: 0px;
        }

        p {
          a {
            position: relative;
            margin-bottom: 2px;
            padding-bottom: 4px;
          }
        }
      }
    }
  }
}
</style>
