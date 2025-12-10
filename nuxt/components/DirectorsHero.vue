<template>
  <section class="directors-hero pad-t pad-b">
    <div class="gutter pad-b">
      <h1 class="fs-lg flesh">
        <RichTextSketch :copy="sketchHeading" />
      </h1>
      <div class="directors">
        <span v-if="sketchnoteLeft" class="sketchnote" inert :data-label="sketchnoteLeft"></span>
        <ul>
          <li v-for="director in directors">
            <NuxtLink :to="director.slug">
              <p class="h3">{{ director.title }}</p>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
// Props
const props = defineProps({
  sketchnoteLeft: {
    type: String,
    required: false
  },
  sketchHeading: {
    type: Array,
    required: true
  },
  directors: {
    type: Array,
    required: false
  }
});
</script>

<style lang='scss'>
section.directors-hero {
  position: relative;
  display: flex;
  flex-direction: column;

  .gutter {
    text-align: center;

    .h1 {
      white-space: pre-line;
    }

    .directors {
      position: relative;
      padding: 1em 0;

      .sketchnote {
        position: absolute;
        top: 0px;
        left: span(-1);
        width: span(1);
        height: 100%;
        display: flex;

        &:after {
          content: attr(data-label);
          position: absolute;
          top: 50%;
          left: 50%;
          white-space: nowrap;
          transform-origin: 0% 0%;
          transform: rotate(-90deg) translateX(-50%) translateY(-50%);
        }
      }

      ul {
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        li {
          display: inline-flex;

          a {
            display: inline-flex;

            p {
              color: $bone;
              margin: 0.5em;
              padding: 0.2em 0.1em;
              display: flex;
            }

            @include can-hover {
              &:hover {
                p {
                  color: $midnight;
                  background-color: $flesh;
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
