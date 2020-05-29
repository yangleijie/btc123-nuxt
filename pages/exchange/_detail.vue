<template>
  <div :class="$style.exchange">
    <div class="content">
      <div :class="$style.breadcrumb">
        <a-breadcrumb separator=">">
          <a-breadcrumb-item>
            <nuxt-link :to="localePath('index')">
              {{ $t('exchange.detail.home') }}
            </nuxt-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <nuxt-link :to="localePath('exchange')">
              {{ $t('exchange.detail.exchange') }}
            </nuxt-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            {{ $t('exchange.detail.text') }}
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>

      <div :class="$style.title">
        <img v-lazy="exchangeProjectOutDto.flagLogo" width="150" height="150" alt="比特币排名" />
        <div :class="$style.textdesc">
          <h3>
            {{
              exchangeProjectOutDto.exchangeChineseName ||
                exchangeProjectOutDto.exchangeEnglishName ||
                '--'
            }}
          </h3>
          <p>{{ exchangeProjectOutDto.discription || '--' }}</p>
          <div :class="$style.desc">
            <div :class="$style.left">
              <span>
                {{ exchangeProjectOutDto.countryNameCn }}
              </span>
              <p>
                {{ $t('exchange.detail.pairs') }}：
                <span>{{ total }}</span>
              </p>
              <span :class="$style.time">
                {{ exchangeProjectOutDto.establishDate }}
              </span>
              <span
                v-for="(item, index) in exchangeProjectOutDto.labels"
                :key="index"
              >
                {{ item }}
              </span>
            </div>
            <div :class="$style.right">
              <div :class="$style.website">
                {{ $t('exchange.detail.website') }}:
                <a
                  :href="exchangeProjectOutDto.website || 'javascript:;'"
                  target="_blank"
                  rel="nofollow"
                >
                  {{ exchangeProjectOutDto.website || '--' }}
                </a>
              </div>
              <div v-if="1 === 2" :class="$style.official">
                官方：
                <a href="">
                  <IconFont type="icon-weibo2" />
                </a>
                <a href="">
                  <IconFont type="icon-facebookfacebook52" />
                </a>
                <a href="">
                  <IconFont type="icon-twitter3" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div :class="$style.rank">
          <p :class="$style.rankNum">
            <img
              v-if="
                exchangeTotalOutDto.sort <= 10 && exchangeTotalOutDto.sort >= 1
              "
              src="~assets/img/paiming.png"
              alt="比特币排名"
            />
            {{
              exchangeTotalOutDto.sort
                ? `全球第${exchangeTotalOutDto.sort}`
                : `暂无相关排名`
            }}
          </p>
          <p :class="$style.rankAmount">
            {{ exchangeTotalOutDto.total | money('¥', 4, true) }}
          </p>
          <span>{{ $t('exchange.detail.turnover') }}</span>
        </div>
      </div>
      <div :class="$style.twocolumn">
        <div :class="$style.leftColumn">
          <!-- 交易所对应的交易对表格 -->
          <PairsTable
            :total="total"
            :data-sources="tradePairsExchangeOutDtos"
            :name="exchangeProjectOutDto.exchangeEnglishName"
          />
          <!-- 相关文章 -->
          <Guess />
        </div>
        <div :class="$style.rightColumn">
          <!-- 占比图 -->
          <PieChart
            :value="pieData360"
            :hover-title="$t('exchange.detail.txRatio')"
            :title="$t('exchange.detail.txRatio')"
          />
          <!-- 严选列表 -->
          <Pick title="严选项目" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pick from '~/components/Flash/Pick';
import PairsTable from '~/modules/Exchange/detailTable';
import PieChart from '~/modules/Currency/Detail/pieChart';
import Guess from '~/modules/Guess'; // 相关文章
export default {
    name: 'ExchangeDetail',
    components: {
        Pick,
        PairsTable,
        PieChart,
        Guess
    },
    head() {
        return {
            title: (this.exchangeProjectOutDto.exchangeChineseName || this.exchangeProjectOutDto.exchangeEnglishName) + '|BTC123',
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: this.exchangeProjectOutDto.exchangeChineseName || this.exchangeProjectOutDto.exchangeEnglishName
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: this.exchangeProjectOutDto.discription || '--'
                }
            ]
        };
    },
    asyncData({ app, params, error }) {
        const { detail: exchangeConkey } = params;
        // exchangeConkey = 'bcex';
        return app.$exchange
            .detail({ exchangeConkey, pageNum: 1, pageSize: 10, sort: 'desc' })
            .then(
                ({
                    data: {
                        exchangeProjectOutDto,
                        exchangeTotalOutDto,
                        pcExchangeTradePairsOutDtoPageInfo: {
                            total,
                            list: tradePairsExchangeOutDtos
                        }
                    }
                }) => {
                    return {
                        total,
                        exchangeProjectOutDto, // 交易所右侧的简介
                        exchangeTotalOutDto, //  成交量 和 排名
                        tradePairsExchangeOutDtos, // 交易所下面的交易对
                        pieData360: tradePairsExchangeOutDtos
                            ? tradePairsExchangeOutDtos.slice(0, 10).map(item => ({
                                value: Number(item.turnover24HRadio)
                                    ? Number(item.turnover24HRadio).toFixed(2)
                                    : 0,
                                name: `${item.shortName}/${item.buyCurrency}`
                            }))
                            : []
                    };
                }
            )
            .catch(err => {
                const { message, response = {} } = err;
                return error({ statusCode: response.status, message });
            });
    }
};
</script>

<style lang="less" module>
.exchange {
  width: 100%;
  .breadcrumb {
    margin: 20px 0px;
  }
  // 头部样式
  .title {
    height: 230px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 40px 20px;
    > img {
      // border: 1px solid #eeee;
      display: block;
      max-width: 100%;
      max-height: 100%;
    }
    .textdesc {
      flex: 1;
      margin: 0px 20px;
      > h3 {
        font-size: 20px;
        color: #333;
      }
      > p {
        font-size: 14px;
        color: #828a92;
        text-align: justify;
        height: 88px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
      }
      .desc {
        display: flex;
        justify-content: space-between;
        .left {
          display: flex;
          align-items: center;
          span {
            color: #f79522;
            margin-right: 10px;
          }
          p {
            color: #999;
            margin-bottom: 0px;
          }
          .time {
            color: #999;
          }
        }
        .right {
          display: flex;
          align-items: center;
          .website {
            margin-right: 20px;
          }
          .official {
            display: flex;
            align-items: center;
            > a {
              color: #cccccc;
              font-size: 24px;
              margin-right: 10px;
            }
          }
        }
      }
    }
    .rank {
      width: 290px;
      height: 150px;
      background: #fafafa;
      padding: 30px 20px;
      .rankNum {
        font-size: 16px;
        display: flex;
        align-items: center;
        color: #f79522;
        margin-bottom: 10px;
        > img {
          margin-right: 5px;
        }
      }
      .rankAmount {
        color: #333;
        font-size: 28px;
        margin-bottom: 0px;
      }
      span {
        font-size: 14px;
        color: #999999;
      }
    }
  }
  // 两栏布局
  .twocolumn {
    margin-top: 20px;
    display: flex;
    margin-bottom: 40px;
    .leftColumn {
      flex: 1;
    }
    .rightColumn {
      width: 330px;
      margin-left: 20px;
    }
  }
}
</style>
