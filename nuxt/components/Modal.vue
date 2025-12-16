<template>
  <div id="modal" ref="modalRef">
    <div id="modal-inner">
      <div id="btn-container">
        <button id="close-modal-btn" @click="closeModal">
          <span class="x"></span>
        </button>
      </div>
      <div class="modal-content">
        <div class="title-block">
          <div class="title-row h2 sm">
            <ClientOnly>
              <Swiper
                class="titles-swiper"
                ref="titlesSwiperRef"
                direction="vertical"
                slides-per-view="1"
                :modules="[Controller]"
                :grab-cursor="false"
                :allow-touch-move="false"
                :loop="store.modalProjects.length > 1"
                :looped-slides="store.modalProjects.length > 1 ? store.modalProjects.length : 0"
                @swiper="onTitlesSwiperReady"
              >
                <SwiperSlide v-for="(item, index) in store.modalProjects" class="swiper-slide" :key="index">
                  <h2 class="title rough-edges-light">{{ item.title }}</h2>
                </SwiperSlide>
              </Swiper>
            </ClientOnly>
          </div>
          <div v-if="store.modalShowDirectors" class="directors-row">
            <ClientOnly>
              <Swiper
                class="directors-swiper brush sm"
                ref="directorsSwiperRef"
                direction="vertical"
                slides-per-view="1"
                :modules="[Controller]"
                :grab-cursor="false"
                :allow-touch-move="false"
                :loop="store.modalProjects.length > 1"
                :looped-slides="store.modalProjects.length > 1 ? store.modalProjects.length : 0"
                @swiper="onDirectorsSwiperReady"
              >
                <SwiperSlide v-for="(item, index) in store.modalProjects" class="swiper-slide" :key="index">
                  <span>Director</span>
                  <NuxtLink :to="`/directors/${item.director.slug.current}`" class="flesh">{{ item.director.title }}<span class="bg-flesh rough-edges-light"></span></NuxtLink>
                </SwiperSlide>
              </Swiper>
            </ClientOnly>
          </div>
        </div>
        <div ref="carouselBlockRef" class="carousel-block">
          <div class="carousel-wrapper" :style="ratioStyle">
            <ClientOnly>
              <Swiper
                class="main-swiper"
                ref="mainSwiperRef"
                slides-per-view="auto"
                :modules="[Controller]"
                :grab-cursor="store.modalProjects.length > 1"
                :allow-touch-move="store.modalProjects.length > 1"
                :loop="store.modalProjects.length > 1"
                :looped-slides="store.modalProjects.length > 1 ? store.modalProjects.length : 0"
                @swiper="onMainSwiperReady"
              >
                <SwiperSlide v-for="(item, index) in store.modalProjects" class="swiper-slide" :key="index">
                  <div v-if="item.ctaCardImages && item.ctaCardImages.landscapeImage" class="video-holder">
                    <ResponsiveImage v-bind="item.ctaCardImages.landscapeImage.image" />
                  </div>
                  <div v-else class="video-holder">
                    <p class="manic bone">{{ store.modalIndex + 1 }}</p>
                  </div>
                </SwiperSlide>
              </Swiper>
            </ClientOnly>
          </div>
        </div>
        <div class="controls-block">
          <button
            class="arrow prev"
            :disabled="store.modalProjects.length <= 1"
            :aria-hidden="store.modalProjects.length <= 1"
            aria-label="Previous Slide"
            @click="onClickPrev">
          </button>
          <div class="counter">
            <p class="brush sm">
              <span v-if="store.modalPaginationLabel">{{ store.modalPaginationLabel }}</span>
              <span v-else>{{ store.modalProjects[0].director.title }}</span>
              <span class="flesh">{{ String(store.modalIndex + 1).padStart(2, '0') }} / {{ String(store.modalProjects.length).padStart(2, '0') }}</span>
            </p>
          </div>
          <button
            class="arrow"
            :disabled="store.modalProjects.length <= 1"
            :aria-hidden="store.modalProjects.length <= 1"
            aria-label="Next Slide"
            @click="onClickNext">
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide, useSwiper } from 'swiper/vue';
import { Controller } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/controller';

import { useSiteStore } from '~/stores/store';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const route = useRoute();
const store = useSiteStore();

const modalRef = ref(null);
const mainSwiperRef = ref(null);
const titlesSwiperRef = ref(null);
const directorsSwiperRef = ref(null);
let mainSwiper = null;
let titlesSwiper = null;
let directorsSwiper = null;

const carouselBlockRef = ref(null);
const ratioStyle = ref({
  width: '0px',
  height: '0px'
});

const ratio = 16/9;

// Mounted
onMounted(() => {
  window.addEventListener('resize', onResize);
  onResize();

  if (modalRef.value) {
    disableBodyScroll(modalRef.value);
  }

  console.log(store.modalProjects);
  console.log(store.modalIndex);
  console.log(store.modalShowDirectors);
  console.log(store.modalPaginationLabel);
});

// Before Unmount
onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);

  if (modalRef.value) {
    enableBodyScroll(modalRef.value);
  }
});

// Methods
function onResize() {
  if (!carouselBlockRef.value) return;

  const w = carouselBlockRef.value.clientWidth;
  const h = carouselBlockRef.value.clientHeight;

  if (w / h > ratio) {
    ratioStyle.value.height = `${h}px`;
    ratioStyle.value.width = `${h * ratio}px`;
  } else {
    ratioStyle.value.width = `${w}px`;
    ratioStyle.value.height = `${w / ratio}px`;
  }
}

function onMainSwiperReady(swiper) {
  mainSwiper = swiper;
  trySync();

  mainSwiper.on('slideChange', () => {
    store.setModalIndex(mainSwiper.realIndex);
  })
}

function onTitlesSwiperReady(swiper) {
  titlesSwiper = swiper;
  trySync();
}

function onDirectorsSwiperReady(swiper) {
  directorsSwiper = swiper;
  trySync();
}

function trySync() {
  if (mainSwiper && titlesSwiper && directorsSwiper) {
    mainSwiper.controller.control = [titlesSwiper, directorsSwiper];

    const index = store.modalIndex || 0;
    const duration = 0;

    mainSwiper.slideToLoop(index, duration);
    titlesSwiper.slideToLoop(index, duration);
    directorsSwiper.slideToLoop(index, duration);
  }
}

function onClickPrev() {
  if (mainSwiper && store.modalProjects.length > 1) {
    mainSwiper.slidePrev();
  }
}

function onClickNext() {
  if (mainSwiper && store.modalProjects.length > 1) {
    mainSwiper.slideNext();
  }
}

function closeModal() {
  store.setModalClose(false);
}

// Watchers
watch(route, () => {
  closeModal();
});
</script>

<style lang='scss'>
#modal {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 237;

  &.modal-enter-active,
  &.modal-leave-active {
    transition: opacity $speed-666 $evil-ease;
  }

  &.modal-enter-from,
  &.modal-leave-to {
    opacity: 0;
  }

  #modal-inner {
    @include abs-fill;
    background-color: $midnight;
    overflow: hidden;

    #btn-container {
      position: absolute;
      top: 0px;
      @include header-ht(height);
      right: span(1);
      display: flex;
      align-items: center;
      z-index: 2;

      #close-modal-btn {
        position: relative;
        width: $space-48;
        height: $space-48;
        margin-right: -6px;
        border-radius: 50%;
        background-color: $flesh;
        cursor: pointer;

        span.x {
          @include abs-fill;

          &:before,
          &:after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 66.666%;
            aspect-ratio: 47/10;
            background-color: $bone;
            mask-image: url('/images/bone.png');
            mask-size: contain;
            mask-repeat: no-repeat;
          }

          &:before {
            transform: translate(-50%, -50%) rotate(45deg);
          }
          &:after {
            transform: translate(-50%, -50%) rotate(-45deg);
          }
        }
      }
    }

    .modal-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;

      .title-block {
        text-align: center;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        flex: 0 0 auto;

        &:has(.directors-row) {
          padding-bottom: $space-16;
        }

        .title-row {
          position: relative;
          @include header-ht(height);
          display: flex;
          align-items: center;
          justify-content: center;

          .titles-swiper {
            position: relative;
            height: 1em;
            pointer-events: none;
            z-index: auto;

            .swiper-slide {
              position: relative;
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;

              .title {
                white-space: nowrap;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
              }
            }
          }
        }

        .directors-row {
          width: 100%;
          margin-top: -1.2em;
          display: flex;
          align-items: center;
          justify-content: center;

          .directors-swiper {
            height: 1.5em;
            display: inline-flex;
            justify-content: center;

            .swiper-slide {
              position: relative;
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;

              span {
                display: inline-flex;

                &:after {
                  content: '';
                  margin-right: 0.5em;
                  display: inline-flex;
                }
              }

              a {
                position: relative;
                display: inline-flex;

                span {
                  position: absolute;
                  bottom: 0px;
                  width: 100%;
                  height: 2px;
                  background-color: $flesh;
                }
              }
            }
          }
        }
      }

      .carousel-block {
        position: relative;
        display: flex;
        margin: 0 $space-8;
        flex: 1 1 auto;
        align-items: center;
        justify-content: center;

        .carousel-wrapper {
          position: relative;
          overflow: hidden;

          &:after {
            content: '';
            @include abs-fill;
            filter: url(#roughEdgesLight);
          }
        }

        .main-swiper {
          @include abs-fill;
          z-index: auto;
          overflow: visible;

          .swiper-slide {
            position: relative;
            width: 100%;
            height: 100%;
            margin-right: $space-16;

            .video-holder {
              @include abs-fill;
              overflow: hidden;

              &:has(.manic) {
                background-color: goldenrod;
              }

              .manic {
                position: absolute;
                top: 50%;
                left: 50%;
                white-space: nowrap;
                transform: translate(-50%, -50%);
              }
            }
          }
        }
      }

      .controls-block {
        padding: $space-16 0;
        display: flex;
        flex: 0 0 auto;
        align-items: center;
        justify-content: center;

        .arrow {
          position: relative;
          width: $space-32;
          aspect-ratio: 55/21;
          background-color: $flesh;
          mask-image: url('/images/right-arrow.png');
          mask-size: contain;
          mask-repeat: no-repeat;
          display: inline-flex;

          &.prev {
            transform: scaleX(-1);
          }

          &:disabled {
            opacity: 0.3;
            cursor: default;
            pointer-events: none;
          }
        }

        .counter {
          margin: -0.3em 1em 0;
          display: inline-flex;
          align-items: center;

          span {
            display: inline-flex;
          }

          span.flesh {
            width: 3.1em;
            margin-left: 0.5em;
            letter-spacing: -0.04em;
            word-spacing: -0.04em;
            white-space: nowrap;
            justify-content: center;
          }
        }
      }
    }
  }

  @include respond-to($portrait) {
    #modal-inner {
      .modal-content {
        justify-content: center;

        .title-block {
          padding-bottom: $space-16;

          .title-row {
            height: auto;
          }

          .directors-row {
            margin-top: 0px;
          }
        }

        .carousel-block {
          flex: 0 0 auto;
        }
      }
    }

    @include respond-to($tablet) {
      #modal-inner {
        .modal-content {
          .title-block {
            padding-bottom: $space-24;
          }
        }
      }
    }
  }

  @include respond-to($tablet) {
    #modal-inner {
      .modal-content {
        .title-block {
          &:has(.directors-row) {
            padding-bottom: $space-24;
          }
        }

        .carousel-block {
          margin: 0 span(0.5);
        }

        .controls-block {
          padding: $space-24 0;

          .arrow {
            width: $space-40;
          }
        }
      }
    }
  }

  @include respond-to($desktop) {
    #modal-inner {
      .modal-content {
        .title-block {
          .directors-row {
            margin-top: -1.5em;
          }
        }

        .controls-block {
          .arrow {
            width: $space-48;
          }
        }
      }
    }
  }

  @include respond-to($average-desktop) {
    #modal-inner {
      #btn-container {
        #close-modal-btn {
          width: $space-56;
          height: $space-56;
          margin-right: -12px;
        }
      }
    }
  }
}
</style>
