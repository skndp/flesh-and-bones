<template>
  <section class="contact-founders pad-b">
    <div class="cutout pad-t pad-b bg-bone flesh">
      <div class="gutter pad-t pad-b">
        <p>{{ cutoutTitle }}</p>
      </div>
    </div>
    <div class="gutter cols pad-b">
      <div v-for="founder in founders" class="col">
        <p class="fs-lg flesh">{{ founder.name }}</p>
        <p>{{ founder.role }}</p>
        <p>
          <NuxtLink :to="`mailto:${founder.email}`" target="_blank">{{ founder.email }}</NuxtLink>
        </p>
        <p>{{ founder.location }}</p>
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
  .cutout {
    text-align: center;
  }

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
          padding-top: $space-16;
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