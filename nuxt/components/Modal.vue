<template>
  <div id="modal" class="bg-midnight" ref="modalRef">
    <ClientOnly>
      <div id="modal-inner">
        <div v-if="store.modalPaper" id="modal-paper" :style="{ 'background-image': `url('${store.modalPaper}')` }"></div>
        <div id="btn-container">
          <button id="close-modal-btn" @click="closeModal">
            <span class="x"></span>
          </button>
        </div>
        <div class="modal-content">
          <div class="titles-block">
            <Swiper
              class="titles-swiper"
              direction="vertical"
              slides-per-view="1"
              :modules="[Controller]"
              :grab-cursor="false"
              :allow-touch-move="false"
              :loop="store.modalProjects.length > 1 ? true : false"
              :initial-slide="store.modalIndex"
              @swiper="onTitlesSwiperReady"
            >
              <SwiperSlide v-for="(item, index) in store.modalProjects" class="swiper-slide" :key="index">
                <h2 class="title-row h2 sm rough-edges-light"><span>{{ item.title }}</span></h2>
                <div v-if="store.modalShowDirectors" class="director-row bone brush xs">
                  <span>Director</span>
                  <NuxtLink v-if="!item.directorName && item.director && item.director.title" :to="`/directors/${item.director.slug.current}`">{{ item.director.title }}<span class="bg-flesh rough-edges-light"></span></NuxtLink>
                  <span v-if="!item.director && item.directorName">{{ item.directorName }}</span>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div ref="carouselBlockRef" class="carousel-block">
            <Swiper
              class="main-swiper"
              slides-per-view="1"
              :spaceBetween="8"
              :modules="[Controller]"
              :grab-cursor="store.modalProjects.length > 1"
              :allow-touch-move="store.modalProjects.length > 1"
              :loop="store.modalProjects.length > 1 ? true : false"
              :initial-slide="store.modalIndex"
              @swiper="onMainSwiperReady"
            >
              <SwiperSlide
                v-for="(item, index) in store.modalProjects"
                class="swiper-slide"
                :key="index"
              >
                <div class="slide-containment" :class="{ 'portrait': item.modalPortrait, 'square': item.modalSquare }">
                  <div class="slide-flex-containment">
                    <div class="slide-box">
                      <VideoPlayer
                        v-if="item.projectVideo && item.projectVideo.vimeo"
                        ref="videoRefs"
                        :vimeo="item.projectVideo.vimeo"
                        :poster="item.ctaCardImages && item.ctaCardImages.landscapeImage ? item.ctaCardImages.landscapeImage.image : null"
                        :controls="true"
                        :cover="false"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
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
    </ClientOnly>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Controller } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/controller';

import { useSiteStore } from '~/stores/store';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const route = useRoute();
const store = useSiteStore();

const modalRef = ref(null);
const videoRefs = ref([]);

let mainSwiper = null;
let titlesSwiper = null;

// Mounted
onMounted(() => {
  if (modalRef.value) {
    disableBodyScroll(modalRef.value);

    modalRef.value.style.maskComposite = 'unset';
    modalRef.value.style.maskImage = `url('${store.getFillMask()}')`;
  }
});

// Before Unmount
onBeforeUnmount(() => {
  if (modalRef.value) {
    enableBodyScroll(modalRef.value);

    modalRef.value.style.maskComposite = 'exclude';
    modalRef.value.style.maskImage = `url('${store.getFillMask()}'), linear-gradient(#000 0 0)`;
  }
});

function onMainSwiperReady(swiper) {
  mainSwiper = swiper;
  trySync();

  mainSwiper.on('slideChange', () => {
    store.setModalIndex(mainSwiper.realIndex);

    videoRefs.value.forEach((vid) => {
      if (vid && vid.pausePlayer) {
        vid.pausePlayer();
      }
    });
  })

  mainSwiper.on('slideChangeTransitionEnd', () => {
    videoRefs.value.forEach((vid) => {
      if (vid && vid.resetPlayer) {
        vid.resetPlayer();
      }
    });
  })
}

function onTitlesSwiperReady(swiper) {
  titlesSwiper = swiper;
  trySync();
}

function trySync() {
  if (mainSwiper && titlesSwiper) {
    mainSwiper.controller.control = [titlesSwiper];
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
  setTimeout(() => {
    store.setModalClose(false);
  }, 27);
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
  mask-size: cover;
  mask-composite: exclude;
  mask-image: linear-gradient(#000 0 0), linear-gradient(#000 0 0);

  #modal-inner {
    @include abs-fill;
    overflow: hidden;

    #modal-paper {
      @include abs-fill;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: cover;
    }

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
      height: 100%;

      .titles-block {
        @include header-ht(height);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .titles-swiper {
          position: relative;
          height: calc(100% - 16px);
          z-index: auto;

          .swiper-slide {
            position: relative;
            width: 100%;
            height: 100%;
            flex-direction: column;
            display: flex;
            text-align: center;
            align-items: center;
            justify-content: center;

            .title-row {
              margin: 0 $space-56;
              display: flex;
              align-items: center;
              line-height: 0.85em;

              span {
                position: relative;
              }
            }

            .director-row {
              margin: 0 auto;
              height: 22px;

              > span {
                margin-top: -3px;
                display: inline-flex;

                &:after {
                  content: '';
                  margin-right: 0.5em;
                  display: inline-flex;
                }
              }

              a {
                position: relative;
                margin-top: -3px;
                display: inline-flex;

                span {
                  position: absolute;
                  bottom: -1px;
                  width: 100%;
                  height: 2px;
                  margin-top: 0px;
                  background-color: $flesh;
                }
              }
            }
          }
        }
      }

      .carousel-block {
        position: relative;
        height: auto;
        margin: 0 $space-8;
        flex: 1 1 auto;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .main-swiper {
          @include abs-fill;
          overflow: hidden;
          z-index: auto;

          .swiper-slide {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            .slide-containment {
              position: relative;
              width: 100%;
              height: 100%;
              container-name: containment;
              container-type: size;

              .slide-flex-containment {
                position: relative;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
  
                @container containment (aspect-ratio < 16/9) {
                  flex-direction: row;
                }
              }
  
              .slide-box {
                position: relative;
                aspect-ratio: 16/9;
                flex-grow: 1;
              }

              // Portrait override
              &.portrait {
                .slide-flex-containment {
                  flex-direction: column;

                  @container containment (aspect-ratio < 16/9) {
                    flex-direction: column;
                  }

                  @container containment (aspect-ratio < 9/16) {
                    flex-direction: row;
                  }
                }

                .slide-box {
                  aspect-ratio: 9/16;
                }
              }

              // Square override
              &.square {
                .slide-flex-containment {
                  flex-direction: column;

                  @container containment (aspect-ratio < 16/9) {
                    flex-direction: column;
                  }

                  @container containment (aspect-ratio < 1/1) {
                    flex-direction: row;
                  }
                }

                .slide-box {
                  aspect-ratio: 1/1;
                }
              }
            }
          }
        }
      }

      .controls-block {
        position: relative;
        height: $space-48;
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
          cursor: pointer;

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

  @include respond-to($tablet) {
    #modal-inner {
      .modal-content {
        .carousel-block {
          margin: 0 $space-16;
        }

        .controls-block {
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
        .titles-block {
          &:has(.director-row) {
            .titles-swiper {
              height: calc(100% - 8px);

              .swiper-slide {
                .title-row {
                  margin-top: 22px;
                }
              }
            }
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
