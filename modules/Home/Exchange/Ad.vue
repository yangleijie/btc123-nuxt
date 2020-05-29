<template>
  <div :class="$style.ad">
    <div ref="swiper" class="swiper-container">
      <div class="swiper-wrapper">
        <div v-for="(item, i) in data" :key="i" class="swiper-slide">
          <a
            :class="$style.item"
            :href="item.url"
            target="_blank"
            rel="nofollow"
          >
            <span :class="$style.name">
              {{ item.currency }}/{{ item.marketCnName || item.marketEnName }}
            </span>
            <span :class="[$style.price, item.className]">
              {{ item.cnyPrice }}
              <a-icon type="arrow-up" />
              <a-icon type="arrow-down" />
            </span>
            <span :class="$style.label">广告</span>
          </a>
        </div>
      </div>
      <!-- Add Arrows -->
      <div v-if="data.length > 7" ref="next" :class="$style.next">
        <a-icon type="right" />
      </div>
      <div v-if="data.length > 7" ref="prev" :class="$style.prev">
        <a-icon type="left" />
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper';
export default {
    props: {
        dataSource: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            data: this.dataSource
        };
    },
    watch: {
        dataSource(newValue, oldValue) {
            newValue.map((n, i) => {
                const item = oldValue[i];
                if (item && n) {
                    if (n.cnyPrice > item.cnyPrice) {
                        n.className = this.$style.up;
                    } else if (n.cnyPrice < item.cnyPrice) {
                        n.className = this.$style.down;
                    } else {
                        n.className = item.className;
                    }
                }
            });
            this.data = newValue;
        }
    },
    mounted() {
        const { swiper, next, prev } = this.$refs;
        this.$nextTick(() => {
            this.swiper = new Swiper(swiper, {
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                },
                loop: this.data.length > 7,
                slidesPerView: 7,
                spaceBetween: 20,
                navigation: {
                    nextEl: next,
                    prevEl: prev
                }
            });
        });
    }
};
</script>
<style lang="less" module>
.ad {
  margin-top: 20px;
  height: 78px;
  :global {
    .swiper-container {
      padding-left: 20px;
      padding-right: 20px;
      margin-left: -20px;
      margin-right: -20px;
    }
    .swiper-slide {
      width: 154px !important;
      border-radius: 0 !important;
      margin-right: 20px !important;
    }
  }
}
.label {
  position: absolute;
  top: 4px;
  right: 4px;
  color: #999999;
  font-size: 10px;
  border-radius: 9px;
  border: 1px solid #ececec;
  height: 18px;
  line-height: 16px;
  width: 36px;
  text-align: center;
}
.item {
  position: relative;
  background-color: #fff;
  padding: 14px;
  display: block;
}
.name {
  color: #333333;
  font-size: 14px;
  line-height: 1;
}
.price {
  line-height: 1;
  color: #666666;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: flex-end;
  height: 30px;
  :global {
    .anticon-arrow-down,
    .anticon-arrow-up {
      display: none;
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
  width: 12px;
  height: 22px;
  color: #cccccc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate3d(0, -50%, 0);
  transition: all 0.3s;
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
.up {
  color: #6cb45f;
  :global {
    .anticon-arrow-up {
      display: inline-block;
    }
  }
}
.down {
  color: #e76653;
  :global {
    .anticon-arrow-down {
      display: inline-block;
    }
  }
}
</style>
