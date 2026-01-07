<template>
  <footer id="footer">
    <div class="footer-mask bg-bone pad-b" :class="{ 'cover': cover }" ref="foot">
      <div
        v-if="store.lightPaper"
        class="footer-paper"
        :style="{ 'background-image': `url('${store.lightPaper}')` }"
      ></div>
      <div class="gutter">
        <ul class="locations manic md">
          <li v-for="location in store.locations">
            <p>{{ location }}</p>
          </li>
        </ul>
        <ul class="pages midnight brush">
          <li><NuxtLink to="/work" @click.native="onClickNavLink" @mouseenter="onItemHover" @mouseleave="onItemHover">
            <span class="rough-edges"></span>
            <span>Work</span></NuxtLink>
          </li>
          <li><NuxtLink to="/directors" @click.native="onClickNavLink" @mouseenter="onItemHover" @mouseleave="onItemHover">
            <span class="rough-edges"></span>
            <span>Directors</span></NuxtLink>
          </li>
          <li><NuxtLink to="/manifesto" @click.native="onClickNavLink" @mouseenter="onItemHover" @mouseleave="onItemHover">
            <span class="rough-edges"></span>
            <span>Manifesto</span></NuxtLink>
          </li>
          <li><NuxtLink to="/zine" @click.native="onClickNavLink" @mouseenter="onItemHover" @mouseleave="onItemHover">
            <span class="rough-edges"></span>
            <span>Zine</span></NuxtLink>
          </li>
          <li><NuxtLink to="/contact" @click.native="onClickNavLink" @mouseenter="onItemHover" @mouseleave="onItemHover">
            <span class="rough-edges"></span>
            <span>Contact</span></NuxtLink>
          </li>
        </ul>
        <ul class="socials">
          <li v-for="link in store.socials">
            <NuxtLink class="rough-edges-light" :to="link" target="_blank" />
          </li>
        </ul>
        <p class="manic sm">© {{ new Date().getFullYear() }} Flesh and Bones, Inc.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';
import { smoothScrollTo } from '~/utils/smooth-scroll-to';

// Props
const props = defineProps({
  cover: {
    type: Boolean,
    required: false,
    default: false
  }
});

const route = useRoute();
const store = useSiteStore();
const foot = ref(null);
let resizeTo = 0;
let lastWidth = 0;

// Lifecycle
onMounted(() => {
  lastWidth = window.innerWidth;
  window.addEventListener('resize', onResize);
  setMask();
});

onBeforeUnmount(() => {
  clearTimeout(resizeTo);
  window.removeEventListener('resize', onResize);
});

// Methods
function onClickNavLink(e) {
  let path = new URL(e.currentTarget.href).pathname;

  if (route.path === path) {
    smoothScrollTo(0);
  }
}

function onResize() {
  if (window.innerWidth === lastWidth) return;

  clearTimeout(resizeTo);
  resizeTo = setTimeout(() => {
    lastWidth = window.innerWidth;
    setMask();
  }, 250);
}

function setMask() {
  const w = window.innerWidth;
  const mask = createTornEdge({
    width: w,
    height: 200,
    startY: 100,
    endY: 100,
    wobble: 0.6,
    edgeRoughness: 6
  });

  foot.value.style.maskImage = `url(${mask}), linear-gradient(#000 0 0)`;
}

function onItemHover(e) {
  const t = e.currentTarget,
        bg = t.querySelector('.rough-edges');

  if(e.type === 'mouseenter') {
    bg.style.maskComposite = 'unset';
    bg.style.maskImage = `url('${store.getRipMask()}')`;
  } else {
    bg.style.maskComposite = 'exclude';
    bg.style.maskImage = `url('${store.getRipMask()}'), linear-gradient(#000 0 0)`;
  }
}
</script>

<style lang='scss'>
#footer {
  position: relative;

  .footer-mask {
    position: relative;
    padding-top: calc(span(0.5) + 200px);
    mask-size: 101% auto;
    mask-composite: exclude;
    mask-repeat: no-repeat;
    backface-visibility: hidden;
    transform: translateZ(0);

    &.cover {
      margin-top: -200px;
    }

    .footer-paper {
      @include abs-fill;
      background-repeat: no-repeat;
      background-position: 50% 100%;
      background-size: cover;
    }
  }

  .gutter {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    ul.locations {
      margin-bottom: $space-24;
      display: inline-flex;
      justify-content: center;

      li {
        display: inline-flex;

        &:not(:first-child) {
          p {
            margin-left: $space-24;
          }

          &:before {
            content: 'X';
            margin-left: $space-24;
            display: inline-flex;
          }
        }

        p {
          position: relative;
          display: inline-flex;
          align-items: center;

          &:after {
            content: '';
            position: absolute;
            top: 0px;
            left: -0.5em;
            right: -0.5em;
            bottom: 0px;
            background-image: url('/images/underline.png');
            background-repeat: no-repeat;
            background-position: 50% 50%;
            background-size: 100% 4px;
          }
        }

        &:last-child {
          p {
            &:after {
              background-image: url('/images/underline-2.png');
            }
          }
        }
      }
    }

    ul.pages {
      margin-bottom: $space-48;
      display: inline-flex;
      flex-direction: column;
      justify-content: center;

      li {
        display: inline-flex;
        justify-content: center;

        a {
          position: relative;
          margin: 0 0.5em;
          padding: 0.1em 0.2em 0.2em;
          display: inline-flex;
          justify-content: center;

          span.rough-edges {
            @include abs-fill;
            background-color: $flesh;
            mask-size: cover;
            mask-composite: exclude;
            mask-image: linear-gradient(#000 0 0), linear-gradient(#000 0 0);
            pointer-events: none;
            backface-visibility: hidden;
            transform: translateZ(0);
            will-change: transform, mask-image, mask-composite;
          }

          span:not(.rough-edges) {
            position: relative;
          }
        }
      }
    }

    ul.socials {
      margin-bottom: $space-24;
      display: inline-flex;
      align-items: center;

      li {
        padding: 0 $space-8;
        display: inline-flex;

        a {
          width: $space-32;
          height: $space-32;
          border-radius: 50%;
          background-color: $flesh;
          display: flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;

          &:after {
            content: "";
            display: inline-flex;
          }

          &[href*='instagram'] {
            &:after {
              width: 18px;
              height: 18px;
              @include instagram($bone);
            }
          }

          &[href*='vimeo'] {
            &:after {
              width: 18px;
              height: 16px;
              margin: 1px 0 0 1px;
              @include vimeo($bone);
            }
          }

          &[href*='facebook'] {
            &:after {
              width: 16px;
              height: 16px;
              @include facebook($bone);
            }
          }

          &[href*='linkedin'] {
            &:after {
              width: 16px;
              height: 16px;
              margin: -1px 0 0 1px;
              @include linkedin($bone);
            }
          }
        }
      }
    }
  }

  @include respond-to($tablet) {
    .gutter {
      ul.pages {
        flex-direction: row;
      }
    }
  }
}

</style>
