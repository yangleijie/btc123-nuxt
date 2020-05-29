<template>
  <div :class="{ [$style.swiper]: true, [$style.small]: arrow === 'small' }">
    <div ref="swiper" :style="getStyle" class="swiper-container">
      <div class="swiper-wrapper">
        <div
          v-for="(item, i) in dataSource"
          :key="i"
          :style="{ width, height }"
          class="swiper-slide"
          @click="clickAd(item)"
        >
          <slot v-bind="item" :item="item">
            <span v-if="item.mining" :class="$style.tv"></span>
            <component :is="tagName(item)" v-bind="tagProps(item)">
              <img
                v-if="options.lazy"
                v-lazy="item.src"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURUxpcU3H2DoAAAABdFJOUwBA5thmAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg=="
                class="swiper-lazy"
                 alt="btc123财经"
              />
              <img v-else :src="item.src" alt="bitebi财经" />
              <div v-if="item.text" :class="$style.text">{{ item.text }}</div>
            </component>
          </slot>
        </div>
      </div>
      <!-- Add Pagination -->
      <div v-if="pagination" ref="pagination" class="swiper-pagination" />
      <!-- Add Arrows -->
      <div
        v-show="dataSource.length > 1"
        ref="next"
        :class="$style.next"
        class="swiper-next"
      >
        <a-icon type="right" />
      </div>
      <div
        v-show="dataSource.length > 1"
        ref="prev"
        :class="$style.prev"
        class="swiper-prev"
      >
        <a-icon type="left" />
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper';
export default {
    props: {
        pagination: {
            type: Boolean,
            default: false
        },
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: 'auto'
        },
        arrow: {
            type: String,
            default: ''
        },
        dataSource: {
            type: Array,
            default() {
                return [];
            }
        },
        options: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    computed: {
        getStyle() {
            const style = {};
            if (this.pagination) {
                style.paddingBottom = '20px';
            }
            const { spaceBetween } = this.options;
            if (spaceBetween) {
                style.paddingLeft = `${spaceBetween}px`;
                style.paddingRight = `${spaceBetween}px`;
                style.marginLeft = `-${spaceBetween}px`;
                style.marginRight = `-${spaceBetween}px`;
            }
            return style;
        }
    },
    watch: {
        dataSource() {
            this.init();
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        tagName({ href }) {
            if (!href) {
                return 'div';
            } else {
                return this.$isUrl(href) ? 'a' : 'nuxt-link';
            }
        },
        tagProps({ href }) {
            if (href) {
                let props = { target: '_blank', href };
                if (!this.$isUrl(href)) {
                    props = { to: href };
                }
                props = {
                    ...props,
                    rel: 'nofollow'
                };
                return props;
            }
        },
        init() {
            const length = this.dataSource.length;
            if (!length) {
                return false;
            }
            const loop = length !== 1;
            const autoplay = !loop || {
                delay: 3000,
                disableOnInteraction: false
            };
            const { swiper, pagination, next, prev } = this.$refs;
            this.defaults = {
                loop,
                autoplay,
                speed: 500,
                preloadImages: false,
                lazy: true,
                allowTouchMove: loop,
                pagination: {
                    el: pagination,
                    clickable: true
                },
                navigation: {
                    nextEl: next,
                    prevEl: prev
                },
                ...this.options
            };
            this.$nextTick(() => {
                if (this.swiper) {
                    this.swiper.updateSlides();
                }
                this.swiper = new Swiper(swiper, this.defaults);
                if (this.options.lazy) {
                    this.swiper.on('lazyImageReady', (slideEl, imageEl) => {
                        const { width, height } = imageEl;
                        imageEl.onerror = () => {
                            imageEl.src = this.$oss(
                                'https://cdn.btc123.com/error.png',
                                width,
                                height
                            );
                        };
                    });
                }
            });
        }
    }
};
</script>
<style lang="less" module>
.swiper {
  height: 100%;
  &:hover {
    .next {
      right: 16px;
    }
    .prev {
      left: 16px;
    }
  }
  :global {
    .swiper {
      &-slide {
        overflow: hidden;
        border-radius: 8px;
        > div,
        a,
        img {
          width: 100%;
          height: 100%;
          display: block;
          transition: all 0.5s;
        }
        &:hover {
          img {
            transform: scale(1.05);
          }
        }
      }
      &-pagination {
        bottom: 0;
        &-bullet {
          height: 3px;
          width: 16px;
          transition: all 0.3s;
          background-color: #cccccc;
          border-radius: 1px;
          margin: 0 2px !important;
          opacity: 1;
          &-active {
            width: 24px;
            background-color: #f79522;
          }
        }
      }
    }
  }
  &.small {
    .next,
    .prev {
      background-color: transparent;
      width: 12px;
      height: 22px;
      color: #cccccc;
      font-size: 18px;
      &:hover {
        color: #f79522;
      }
    }
    .next {
      right: 0;
    }
    .prev {
      left: 0;
    }
  }
}
.next,
.prev {
  position: absolute;
  top: 50%;
  z-index: 10;
  cursor: pointer;
  font-size: 22px;
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate3d(0, -50%, 0);
  transition: all 0.3s;
  &[aria-disabled='true'] {
    background-color: rgba(0, 0, 0, 0.1);
    color: rgba(255, 255, 255, 0.6);
    cursor: not-allowed;
  }
}
.next {
  right: -40px;
}
.prev {
  left: -40px;
}
.text {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  font-size: 14px;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: rgba(0, 0, 0, 0.6);
}
.tv {
  position: absolute;
  top: 8px;
  left: 8px;
  width: 40px;
  height: 22px;
  background: rgba(247, 149, 34, 1);
  border-radius: 2px;
  z-index: 1;
  background-image: url(~assets/img/tv.png);
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 28px;
}
</style>
