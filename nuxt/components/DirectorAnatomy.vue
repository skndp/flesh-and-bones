<template>
  <section class="director-anatomy pad-b">
    <div class="gutter cols">
      <div class="col">
        <p class="fs-lg flesh">{{ label }}</p>
        <p class="bio">{{ bio }}</p>
      </div>
      <div class="col">
        <p class="fs-lg">{{ location }}</p>
        <ul>
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
          display: flex;
          flex-wrap: wrap;

          li {
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
          margin-top: 0.5em;
          margin-bottom: 0px;
          width: 25%;
          flex-shrink: 0;

          .fs-lg {
            margin-top: 1.1em;
          }

          ul {
            flex-direction: column;

            li {
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

  @include respond-to($desktop) {
    .cols {
      .col {
        &:last-child {
          width: 33.333%;
        }
      }
    }
  }
}
</style>