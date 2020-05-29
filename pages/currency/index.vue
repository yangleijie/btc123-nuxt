<template>
  <div :class="$style.currency">
    <div class="content">
      <topBanner :data-source="advertData" />
      <a-card :bordered="false">
        <div slot="extra" :class="$style.nav">
          <div :class="$style.navWrap">
            <nuxt-link
              v-for="(item, index) in tabList"
              :key="index"
              :to="localePath(item.locale, $i18n.locale)"
            >
              {{ item.tab }}
            </nuxt-link>
          </div>
          <span :class="$style.more" @click="showModal">
            +{{ $t('coin.apply') }}
          </span>
        </div>
        <nuxt-child />
      </a-card>
    </div>
    <!-- 模态框 -->
    <a-modal
      v-model="visible"
      :footer="null"
      :title="$t('coin.apply')"
      width="400px"
    >
      <p :class="$style.modalContent">
        <span>{{ $t('common.tel') }}</span>
        <span>17341331785</span>
      </p>
      <p :class="$style.modalContent">
        <span>{{ $t('common.email') }}</span>
        <span>business@btc123.com</span>
      </p>
      <p :class="$style.modalContent">
        <span>{{ $t('common.wechat') }}</span>
        <img width="120" height="120" src="~assets/img/bqrcode.jpg" alt="比特币状态" />
      </p>
    </a-modal>
  </div>
</template>

<script>
import topBanner from '~/components/Advert/TopBanner';
const POSITION = 20;
export default {
    components: {
        topBanner
    },
    head() {
        return {
            title: '币圈-比特币数字货币有哪些|BTC123',
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content:
                        '数字货币有哪些, 真正的数字货币有哪些, 有哪些数字货币,合法的数字货币有哪些,比特币有哪些'
                },
                {
                    hid: 'description',
                    name: 'description',
                    content:
                        'BTC123是全球领先的区块链信息服务平台，了解数字货币有哪些就上btc123.com。'
                }
            ]
        };
    },
    data() {
        return {
            loading: false,
            visible: false,
            tabList: [
                {
                    tab: this.$t('coin.tab.all'),
                    key: '/currency',
                    locale: 'currency-index'
                },
                // {
                //   tab: '概念行情',
                //   key: '/currency/concept'
                // },
                {
                    tab: this.$t('coin.tab.top'),
                    key: '/currency/rise',
                    locale: 'currency-index-rise'
                },
                {
                    tab: this.$t('coin.tab.drop'),
                    key: '/currency/drop',
                    locale: 'currency-index-drop'
                }
            ],
            advertData: []
        };
    },
    mounted() {
        this.fetchAdvert();
    },
    methods: {
        showModal() {
            this.visible = true;
        },
        fetchAdvert() {
            this.$advert
                .advertList({
                    positionId: POSITION
                })
                .then(({ data }) => {
                    this.advertData = data;
                });
        }
    }
};
</script>

<style lang="less" module>
.currency {
  // padding: 20px 0px;
  margin-bottom: 50px;
  margin-top: 20px;
  .more {
    position: absolute;
    // top: 20px;
    right: 20px;
    font-size: 16px;
    color: #333;
    cursor: pointer;
  }
  .nav {
    height: 51px;
    display: flex;
    align-items: center;
    > .navWrap {
      height: 100%;
      display: flex;
      > a {
        display: block;
        height: 100%;
        color: #333;
        line-height: 51px;
        font-size: 16px;
        margin-right: 40px;
        text-decoration: none;
        border-bottom: 2px solid transparent;
      }
    }
  }
  :global {
    .ant-card-body {
      padding: 0px 32px 24px;
    }
    .ant-card-extra {
      width: 100%;
    }
    .ant-card-head-wrapper {
      height: 51px;
    }
    .exact-active {
      border-bottom: 2px solid #f79522 !important;
    }
  }
}
.modalContent {
  display: flex;
  margin-bottom: 23px;
  span {
    font-size: 16px;
    color: #666;
    &:nth-of-type(1) {
      width: 131px;
    }
    &:nth-of-type(2) {
      flex: 1;
    }
  }
}
</style>
