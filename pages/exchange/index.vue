<template>
  <div :class="[$style.exchange]">
    <div class="content">
      <top-banner :data-source="advertData" />
      <div :class="$style.contentWrap">
        <div :class="$style['exchange-left']">
          <!-- 行情 -->
          <Exchange
            ref="table"
            :data-source="data"
            :total="total"
            server-or-client="server"
          />
        </div>
        <div :class="$style['exchange-right']">
          <!-- 严选 -->
          <Pick :type="0" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pick from '~/components/Flash/Pick';
import Exchange from '~/modules/Exchange';
import TopBanner from '~/components/Advert/TopBanner';
const POSITION = 21;
const PAGE_SIZE = 50; // 初始化的时候一页请求的数据
export default {
    components: {
        Pick,
        Exchange,
        TopBanner
    },
    head() {
        return {
            title: '全球数字货币比特币交易所平台排行榜|BTC123',
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content:
                        '数字货币交易平台,十大数字货币交易平台,十大虚拟货币交易平台,比特币交易平台,比特币交易平台排名,数字货币交易平台排行,中币数字货币交易平台'
                },
                {
                    hid: 'description',
                    name: 'description',
                    content:
                        'BTC123是全球领先的区块链信息服务平台，为广大数字货币比特币玩家收集全球所有的虚拟数字货币交易平台大全，提供实时的交易数据动态。'
                }
            ]
        };
    },
    data() {
        return {
            advertData: []
        };
    },
    asyncData({ app, error }) {
        return app.$exchange
            .list({
                pageNum: 1,
                pageSize: PAGE_SIZE,
                sort: 'desc'
            })
            .then(({ data: { list, total } }) => {
                return {
                    data: list.map((item, index) => ({
                        ...item,
                        index: index
                    })),
                    total: total
                };
            })
            .catch(err => {
                const { message, response = {} } = err;
                return error({ statusCode: response.status, message });
            });
    },
    mounted() {
        this.fetchAdvert();
    },
    methods: {
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
.exchange {
  width: 100%;
  overflow-x: hidden;
  margin-top: 20px;
  .bannerWrap {
    width: 1230px;
    margin: 0 auto;
  }
  .contentWrap {
    display: flex;
    margin-bottom: 50px;
  }
  &-left {
    flex: 1;
  }
  &-right {
    width: 330px;
    margin-left: 20px;
  }
}
</style>
