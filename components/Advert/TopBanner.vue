<template>
  <div v-if="!!dataSource.length" :class="$style.carsorWrap">
    <Swiper :data-source="dataSource" :options="swiperOptions" arrow="small">
      <div slot-scope="item" :class="[$style.dapp, 'advert_dapp']">
        <component
          :is="tagName(item.url)"
          :class="$style.common"
          v-bind="tagProps(item.url)"
        >
          <div :class="$style.imgWrap">
            <img v-lazy="item.path" alt="比特币" />
          </div>
          <div :class="$style.textWrap">
            <h3>{{ item.title }}</h3>
            <p>
              {{ item.remark }}
            </p>
          </div>
        </component>
      </div>
    </Swiper>
  </div>
</template>

<script>
import Swiper from '~/components/Swiper';
export default {
    components: {
        Swiper
    },
    props: {
        dataSource: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            swiperOptions: {
                autoplay: false,
                slidesPerView: 6,
                spaceBetween: 20,
                loop: false
            }
        };
    },
    methods: {
        tagName(url) {
            return this.$isUrl(url) ? 'a' : 'div';
        },
        tagProps(url) {
            return this.$isUrl(url)
                ? {
                    href: url,
                    target: '_blank'
                }
                : {};
        }
    }
};
</script>

<style lang="less" module>
.carsorWrap {
  // overflow: hidden;
  height: 56px;
  // width: 1230px;
  // padding: 0px 16px;
  margin: 20px auto 0px;
  .dapp {
    .common {
      width: 196px;
      height: 58px;
      display: flex;
      align-items: center;
      text-decoration: none;
      .imgWrap {
        width: 40px;
        height: 40px;
        > img {
          max-height: 100%;
          max-width: 100%;
          display: block;
        }
      }
      .textWrap {
        flex: 1;
        margin-left: 10px;
        > * {
          display: block;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        > h3 {
          color: #101010;
          font-size: 14px;
        }
        > p {
          font-size: 12px;
          color: #666;
        }
      }
    }
  }
}
</style>
