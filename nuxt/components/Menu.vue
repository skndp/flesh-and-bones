<template>
  <div id="menu" :class="{'offset': offset}">
    <div id="menu-inner">
      <div id="menu-content" ref="contentRef" @click="closeMenu">
        <nav id="menu-paper" class="bg-bone" ref="paper">
          <Paper :light="true" />
          <ul class="primary h1 sm midnight">
            <li>
              <NuxtLink to="/work" @click.native="onClickNavLink">
                <span class="rough-edges bg"></span>
                <span class="rough-edges">Work</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/directors" @click.native="onClickNavLink">
                <span class="rough-edges bg"></span>
                <span class="rough-edges">Directors</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/manifesto" @click.native="onClickNavLink">
                <span class="rough-edges bg"></span>
                <span class="rough-edges">Manifesto</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/zine" @click.native="onClickNavLink">
                <span class="rough-edges bg"></span>
                <span class="rough-edges">Zine</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" @click.native="onClickNavLink">
                <span class="rough-edges bg"></span>
                <span class="rough-edges">Contact</span>
              </NuxtLink>
            </li>
          </ul>
          <ul class="socials">
            <li v-for="link in store.socials">
              <NuxtLink class="rough-edges" :to="link" target="_blank" />
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
const paper = ref(null);
let resize_to = 0;

// Mounted
onMounted(() => {
  offset.value = window.pageYOffset > 0;

  if (contentRef.value) {
    disableBodyScroll(contentRef.value);
  }

  window.addEventListener('resize', onResize);
  setMask();
});

// Before Unmount
onBeforeUnmount(() => {
  if (contentRef.value) {
    enableBodyScroll(contentRef.value);
  }

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

function onResize(e) {
  clearTimeout(resize_to);
  resize_to = setTimeout(() => {
    setMask();
  }, 250);
}

function setMask() {
  const b = paper.value.getBoundingClientRect();
  const mask = createTornEdge({
    width: b.width,
    height: b.height,
    startY: b.height - 100,
    endY: b.height - 100,
    wobble: 0.85,
    edgeRoughness: 4
  });

  paper.value.style.maskImage = `url(${mask})`;
}
</script>

<style lang='scss'>

#menu {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  overflow: hidden;
  z-index: 27;

  &.menu-enter-active,
  &.menu-leave-active {
    transition: opacity $speed-666 $evil-ease;

    #menu-inner {
      &:before {
        transition: opacity $speed-666 $evil-ease;
      }

      #menu-content {
        nav#menu-paper {
          transition: transform $speed-666 $evil-ease;
        }
      }
    }
  }

  &.menu-enter-from,
  &.menu-leave-to {
    opacity: 0.999;

    #menu-inner {
      &:before {
        opacity: 0;
      }

      #menu-content {
        nav#menu-paper {
          transform: translateY(-100%);
        }
      }
    }
  }

  &.offset {
    #menu-inner {
      @include header-ht(top);

      #menu-content {
        nav#menu-paper {
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
    }

    #menu-content {
      @include abs-fill;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;

      nav#menu-paper {
        position: relative;
        width: 100%;
        display: flex;
        mask-size: 101% auto;
        mask-position: bottom center;
        mask-repeat: no-repeat;

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
                visibility: hidden;
              }

              &.router-link-exact-active {
                span.bg {
                  visibility: visible;
                }
              }

              @include can-hover {
                &:hover {
                  span.bg {
                    visibility: visible;
                  }
                }
              }
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
        nav#menu-paper {
          ul.primary  {
            margin: 0.25em auto 0;

            li {
              a {
                padding: 0 0.1em;
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
                  color: $bone;
                  font-size: 12px;
                  display: inline-flex;
                }

                &[href*='instagram'] {
                  &:after {
                    content: 'IG';
                  }
                }

                &[href*='vimeo'] {
                  &:after {
                    content: 'VI';
                  }
                }

                &[href*='facebook'] {
                  &:after {
                    content: 'FB';
                  }
                }

                &[href*='linkedin'] {
                  &:after {
                    content: 'LI';
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
                  // text-decoration: line-through;
                  display: inline-flex;
                  align-items: center;
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
