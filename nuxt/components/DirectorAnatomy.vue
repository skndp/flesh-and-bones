<template>
  <section class="director-anatomy pad-b">
    <div class="gutter cols">
      <div class="col">
        <p class="flesh manic md">{{ label }}</p>
        <p class="bio">{{ bio }}</p>
      </div>
      <div class="col">
        <p class="brush md">{{ location }}</p>
        <ul class="brush xs">
          <li v-for="item in tags">{{ item.tag }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
// Props
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: true
  }
});
</script>

<style lang='scss'>
section.director-anatomy {
  position: relative;
  
  .cols {
    display: flex;
    flex-direction: column;

    .col {
      &:first-child {
        order: 2;

        .bio {
          margin-top: 0.5em;
          line-height: 1.666em;
        }
      }
  
      &:last-child {
        order: 1;
        margin-bottom: $space-32;

        ul {
          margin-top: 0.5em;
          margin-left: -0.2em;
          display: flex;
          flex-wrap: wrap;

          li {
            padding: 0.2em;
            display: inline-flex;

            &:not(:last-child) {
              &:after {
                content: ',\a0';
                display: inline-flex;
              }
            }
          }
        }
      }
    }
  }

  @include respond-to($large-tablet) {
    .cols {
      flex-direction: row;

      .col {
        &:first-child {
          order: 1;
          margin-right: span(1);
        }

        &:last-child {
          order: 2;
          margin-top: 0.2em;
          margin-bottom: 0px;
          width: 33.333%;
          flex-shrink: 0;

          .brush.md {
            margin-top: 1em;
          }

          ul {
            margin-top: 1em;
            margin-left: 0px;
            flex-direction: column;

            li {
              padding: 0.4em 0;

              &:not(:last-child) {
                &:after {
                 display: none; 
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>