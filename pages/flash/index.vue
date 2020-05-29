<template>
  <div>
    <div class="content">
      <div :class="$style.flash">
        <div :class="$style.left">
          <!-- 大快讯 -->
          <lazy-component>
            <BigFlash
              :loading="loading"
              :flash-data="flashData"
              @loadMore="loadMore"
            />
          </lazy-component>
        </div>

        <div :class="$style.right">
          <!-- 小快讯 -->
          <SmallFlash :type="1" />
          <!-- 严选项目 -->
          <Pick :style="{ marginTop: '20px' }" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SmallFlash from '~/components/Flash/SmallFlash';
import BigFlash from '~/components/Flash/BigFlash';
import Pick from '~/components/Flash/Pick';
export default {
    name: 'FlashIndex',
    components: {
        SmallFlash,
        BigFlash,
        Pick
    },
    head() {
        return {
            title: '区块链快讯|BTC123',
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: '区块链快讯'
                },
                {
                    hid: 'description',
                    name: 'description',
                    content:
                        'BTC123是全球最领先的区块链比特币行情媒体网站，每日为您提供最新、最及时的区块链快讯新闻，帮您随时了解区块链市场行情提供最快，最全面的新闻资讯。'
                }
            ]
        };
    },
    data() {
        return {
            query: {
                pageNumber: 1,
                pageSize: 20,
                sourceId: 1
            },
            flashData: [],
            btc123FlashData: [],
            loading: false
        };
    },
    asyncData({ app, error }) {
        return Promise.all([app.$flash.list()])
            .then(data => {
                return {
                    flashData: data[0].data.list
                };
            })
            .catch(err => {
                const { message, response = {} } = err;
                return error({ statusCode: response.status, message });
            });
    },
    methods: {
        fetch() {
            this.$flash.list(this.query).then(({ data: { list } }) => {
                this.flashData = [...this.flashData, ...list];
                this.loading = false;
            });
        },
        loadMore() {
            this.loading = true;
            this.query.pageNumber++;
            this.fetch();
        }
    }
};
</script>

<style lang="less" module>
.flash {
  display: flex;
  width: 100%;
  margin: 20px 0px 50px;
  flex-direction: row;
  .left {
    flex: 1;
  }
  .right {
    margin-left: 20px;
    width: 330px;
    // background: #fff;
    // padding: 0px 10px;
  }
}
:global {
  html,
  body {
    height: auto;
  }
}
</style>
