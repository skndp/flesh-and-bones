<template>
  <div id="menu" :class="{'offset': offset, 'open': store.menuOpen}">
    <div id="menu-inner">
      <div id="menu-content" ref="contentRef" @click="closeMenu">
        <nav id="menu-mask" class="bg-bone" ref="maskRef">
          <div
            v-if="store.lightPaper"
            id="menu-paper"
            :style="{ 'background-image': `url('${store.lightPaper}')` }"
          ></div>
          <ul class="primary h1 sm midnight">
            <li>
              <NuxtLink to="/work" @click.native="onClickNavLink" @mouseenter="onItemHover" @mouseleave="onItemHover">
                <span class="rough-edges bg"></span>
                <span class="rough-edges">Work</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/directors" @click.native="onClickNavLink" @mouseenter="onItemHover" @mouseleave="onItemHover">
                <span class="rough-edges bg"></span>
                <span class="rough-edges">Directors</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/manifesto" @click.native="onClickNavLink" @mouseenter="onItemHover" @mouseleave="onItemHover">
                <span class="rough-edges bg"></span>
                <span class="rough-edges">Manifesto</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/zine" @click.native="onClickNavLink" @mouseenter="onItemHover" @mouseleave="onItemHover">
                <span class="rough-edges bg"></span>
                <span class="rough-edges">Zine</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" @click.native="onClickNavLink" @mouseenter="onItemHover" @mouseleave="onItemHover">
                <span class="rough-edges bg"></span>
                <span class="rough-edges">Contact</span>
              </NuxtLink>
            </li>
          </ul>
          <ul class="socials">
            <li v-for="link in store.socials">
              <NuxtLink class="rough-edges-light" :to="link" target="_blank" />
            </li>
          </ul>
          <div class="locations-wrapper">
            <ul class="locations manic md">
              <li v-for="location in store.locations">
                <p>{{ location }}</p>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { smoothScrollTo } from '~/utils/smooth-scroll-to';

const route = useRoute();
const store = useSiteStore();
const contentRef = ref(null);
const offset = ref(false);
const maskRef = ref(null);
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

  store.setMenu(false);
}

function closeMenu(e) {
  if (e.target && e.target.id === 'menu-content') {
    store.setMenu(false);
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
  const b = maskRef.value.getBoundingClientRect();
  const mask = createTornEdge({
    width: b.width,
    height: Math.ceil(b.height), // Ceil up, pixel rounding issue for Safari
    startY: b.height - 100,
    endY: b.height - 100,
    wobble: 0.6,
    edgeRoughness: 6
  });

  maskRef.value.style.maskImage = `url(${mask})`;
}

function onItemHover(e) {
  const t = e.currentTarget,
        bg = t.querySelector('.bg');

  if(e.type === 'mouseenter') {
    bg.style.maskComposite = 'unset';
    bg.style.maskImage = `url('${store.getRipMask()}')`;
  } else {
    bg.style.maskComposite = 'exclude';
    bg.style.maskImage = `url('${store.getRipMask()}'), linear-gradient(#000 0 0)`;
  }
}

// Watch
watch(() => store.menuOpen, (isOpen, wasOpen) => {
  if(!contentRef.value) return;

  if(!isOpen && wasOpen) {
    enableBodyScroll(contentRef.value);
  } else {
    disableBodyScroll(contentRef.value);
  }
});
</script>

<style lang='scss'>
#menu {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  overflow: hidden;
  visibility: hidden;
  transition: visibility 0ms linear $speed-666;
  z-index: 27;

  &.open {
    visibility: visible;
    transition: visibility 0ms linear;

    #menu-inner {
      &:before {
        opacity: 1;
      }

      #menu-content {
        nav#menu-mask {
          transform: translate3d(0px, 0px, 0px);
        }
      }
    }
  }

  &.offset {
    #menu-inner {
      @include header-ht(top);

      #menu-content {
        nav#menu-mask {
          ul.primary {
            padding-top: 0px;
            padding-bottom: 200px;
          }

          ul.socials {
            padding-bottom: 200px;
          }

          .locations-wrapper {
            height: calc(100% - 200px);
          }
        }
      }
    }
  }

  #menu-inner {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    overflow: hidden;

    &:before {
      content: "";
      @include abs-fill;
      opacity: 1;
      background-color: rgba($midnight, 0.5);
      opacity: 0;
      transition: opacity $speed-666 $evil-ease;
    }

    #menu-content {
      @include abs-fill;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;

      nav#menu-mask {
        position: relative;
        width: 100%;
        display: flex;
        mask-size: 101% auto;
        mask-position: bottom center;
        mask-repeat: no-repeat;
        transform: translate3d(0px, -100%, 0px);
        transition: transform $speed-666 $evil-ease;

        #menu-paper {
          @include abs-fill;
          background-repeat: no-repeat;
          background-position: 50% 0%;
          background-size: cover;
        }

        ul.primary  {
          margin: 0.25em auto -0.5em;
          @include header-ht(padding-top);
          padding-bottom: 200px;
          display: inline-flex;
          flex-direction: column;
          justify-content: center;

          li {
            display: inline-flex;

            a {
              position: relative;
              padding: 0.04em 0.1em;
              display: flex;
              align-items: center;

              span.rough-edges {
                position: relative;
              }

              span.bg {
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

              // &.router-link-exact-active {
              //   &:after {
              //     visibility: visible;
              //   }
              // }

              // &:after {
              //   content: "";
              //   position: absolute;
              //   top: 50%;
              //   left: 100%;
              //   width: 40px;
              //   aspect-ratio: 96 / 31;
              //   margin-left: $space-8;
              //   mask-image: url('/images/bolt.png');
              //   mask-size: contain;
              //   mask-repeat: no-repeat;
              //   background-color: $flesh;
              //   transform: translate(0px, -100%) rotate(-5deg);
              //   visibility: hidden;
              //   transition: visibility 0ms linear 1s;
              // }
            }
          }
        }

        ul.socials {
          display: none;
        }

        .locations-wrapper {
          display: none;
        }
      }
    }
  }

  @include respond-to($tablet) {
    #menu-inner {
      #menu-content {
        nav#menu-mask {
          ul.primary  {
            margin: 0.25em auto 0;

            li {
              a {
                padding: 0 0.1em;

                &:after {
                  width: 60px;
                }
              }
            }
          }

          ul.socials {
            position: absolute;
            top: 50%;
            left: span(1);
            display: flex;
            flex-direction: column;
            transform: translateY(-50%);

            li {
              padding: $space-8 0;
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

          .locations-wrapper {
            position: absolute;
            left: span(3);
            top: 0px;
            height: 100%;
            width: 2em;
            overflow: hidden;
            display: flex;

            ul.locations {
              position: absolute;
              top: 50%;
              left: 50%;
              white-space: nowrap;
              transform-origin: 0% 0%;
              transform: rotate(-90deg) translateX(-50%) translateY(-50%);

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
                    background-size: 100% 5px;
                    transform: scaleX(-1);
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
          }
        }
      }
    }
  }
}
</style>
