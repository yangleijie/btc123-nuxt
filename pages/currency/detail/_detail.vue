<template>
  <div :class="$style.currencydetail">
    <div class="content">
      <!-- 顶部 -->
      <div :class="$style.header">
        <div :class="$style.top">
          <div :class="$style.textDesc">
            <div :class="$style.title">
              <img v-lazy="currencyDetail.logo" width="32" height="32" alt="比特币经济" />
              <span>
                {{ currencyDetail.enName }} {{ currencyDetail.cnName }}
              </span>
            </div>
            <div :class="$style.price">¥{{ currencyDetail.cnyPrice }}</div>
            <div :class="$style.otherPrice">
              ≈$ {{ currencyDetail.usdPrice }} ≈
              {{
                (currencyDetail.cnyPrice / currencyDetail.btcCnyPrice)
                  | money('', 8)
              }}
              BTC
            </div>
            <div :class="$style.price24">
              <div>
                24H {{ $t('coin.detail.high') }}:
                <span>¥{{ currencyDetail.cnyHighest24H }}</span>
              </div>
              <div>
                24H {{ $t('coin.detail.low') }}:
                <span>¥{{ currencyDetail.cnyLowest24H }}</span>
              </div>
            </div>
            <div :class="$style.summary">
              {{ currencyDetail.intro || '暂无当前币种的简介' }}
            </div>
          </div>
          <div :class="$style.pieWrap">
            <div :class="$style.pieCommon">
              <div :class="$style.title">{{ $t('coin.detail.marketCap') }}</div>
              <div :class="$style.price">
                ¥{{ currencyDetail.supplyValue | money('', 4, true) }}
                <span :class="$style.tag">
                  第{{ currencyDetail.supplyValueRanking }}名
                </span>
              </div>
              <div :class="$style.otherPrice">
                <!-- 自己计算的美元价格 -->
                ≈$
                {{
                  (currencyDetail.supplyValue /
                    (currencyDetail.cnyPrice / currencyDetail.usdPrice))
                    | money('', 4)
                }}
                <br />
                ≈{{
                  (currencyDetail.supplyValue / currencyDetail.btcCnyPrice)
                    | money('', 2)
                }}
                BTC
              </div>
              <Pie
                :type="2"
                :background="['#67C23A', 'rgba(103, 194, 58, 0.2)']"
                :title="
                  (
                    (currencyDetail.supplyValue / currencyDetail.totalValue) *
                    100
                  ).toFixed(2) + '%'
                "
                :value="[
                  currencyDetail.supplyValue,
                  currencyDetail.totalValue - currencyDetail.supplyValue
                ]"
                :sub-title="$t('coin.detail.ratio')"
                name="pie_one"
              />
            </div>
            <div v-if="1 === 2" :class="$style.pieCommon">
              <div :class="$style.title">流通量</div>
              <div :class="$style.price">
                17,317,487 BTC
                <!-- <span :class="$style.tag">第一名</span> -->
              </div>
              <div :class="$style.otherPrice">
                总发行量
                <br />
                210000BTC
              </div>
              <Pie
                :type="2"
                :background="[
                  'rgba(64, 158, 255, 1)',
                  'rgba(64, 158, 255, .2)'
                ]"
                :value="[8246, 1754]"
                name="pie_two"
                title="82.46%"
                sub-title="流通率"
              />
            </div>
            <div :class="$style.pieCommon">
              <div :class="$style.title">{{ $t('coin.detail.turnover') }}</div>
              <div :class="$style.price">
                ¥{{ currencyDetail.turnover24H | money('', 4, true) }}
                <span :class="$style.tag">
                  第{{ currencyDetail.turnover24HRanking }}名
                </span>
              </div>
              <div :class="$style.otherPrice">
                ≈$
                {{
                  (currencyDetail.turnover24H /
                    (currencyDetail.cnyPrice / currencyDetail.usdPrice))
                    | money('', 4)
                }}
                <br />
                ≈{{
                  (currencyDetail.turnover24H / currencyDetail.btcCnyPrice)
                    | money('', 2)
                }}
                BTC
              </div>
              <Pie
                :type="2"
                :background="[
                  'rgba(244, 104, 104, 1)',
                  'rgba(244, 104, 104, .2)'
                ]"
                :value="[
                  currencyDetail.turnoverRate24H / 100,
                  1 - currencyDetail.turnoverRate24H / 100
                ]"
                :title="
                  (currencyDetail.turnoverRate24H &&
                    currencyDetail.turnoverRate24H.toFixed(2)) + '%'
                "
                :sub-title="$t('coin.detail.turnoverRatio')"
                name="pie_three"
              />
            </div>
          </div>
        </div>
        <div :class="$style.bottom">
          <div :class="$style.leftWrap">
            <div :class="$style.time">
              {{ $t('coin.detail.date') }}：
              <span>{{ currencyDetail.releaseDate }}</span>
            </div>
            <div :class="$style.website">
              {{ $t('coin.detail.website') }}：
              <a :href="currencyDetail.website || 'javascript:;'">
                {{ currencyDetail.website || '--' }}
              </a>
            </div>
            <div :class="$style.website">
              {{ $t('coin.detail.whitepapaer') }}：
              <a :href="currencyDetail.whitePaper || 'javascript:;'">
                {{ currencyDetail.whitePaper || '--' }}
              </a>
            </div>
          </div>
          <a
            v-if="currencyDetail.download"
            :class="$style.download"
            :href="currencyDetail.download"
          >
            {{ currencyDetail.enName }}{{ $t('coin.detail.wallet') }}
          </a>
        </div>
      </div>
      <!-- 下面内容部分 -->
      <div :class="$style.twocolumn">
        <div :class="$style.leftColumn">
          <!-- 交易所对应的交易对表格 -->
          <PairsTable :data-sources="currencyDetail.tradePairsList" />
          <!-- 相关文章 -->
          <lazy-component class="card">
            <Guess />
          </lazy-component>
        </div>
        <div :class="$style.rightColumn">
          <!-- 饼图 -->
          <PieChart :value="pieData360" />
          <!-- 严选列表 -->
          <Pick />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pie from '~/components/EchartsPie/pieHalf';
import PieChart from '~/modules/Currency/Detail/pieChart';
import Pick from '~/components/Flash/Pick';
import PairsTable from '~/modules/Currency/Detail/detailTable';
import Guess from '~/modules/Guess'; // 相关文章
export default {
    components: {
        Pie,
        Pick,
        PairsTable,
        PieChart,
        Guess
    },
    head() {
        return {
            title:  `${this.currencyDetail.cnName}|BTC123`,
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content:this.currencyDetail.cnName
                },
                {
                    hid: 'description',
                    name: 'description',
                    content:this.currencyDetail.intro
                }
            ]
        };
    },
    asyncData({ app, params }) {
        const currencyId = params.detail || app.$router.currentRoute.params.detail; // 获取币种id
        return Promise.all([app.$currency.detail({ currencyId })]).then(data => {
            return {
                currencyDetail: data[0].data,
                pieData360: data[0].data.proportionList
                    ? data[0].data.proportionList.map(item => ({
                        value: item.proportion,
                        name: item.exchangeEnName
                    }))
                    : []
            };
        });
    }
};
</script>

<style lang="less" module>
.currencydetail {
  .header {
    margin: 20px 0px;
    height: 358px;
    background: #fff;
    padding: 20px;
    .top {
      display: flex;
    }
    .textDesc {
      // width: 310px;
      width: 480px;
      .title {
        display: flex;
        align-items: center;
        height: 32px;
        > span {
          height: 100%;
          font-size: 16px;
          color: #333333;
          line-height: 32px;
          margin-left: 10px;
        }
      }
      .price {
        color: #333333;
        font-size: 34px;
        margin-top: 10px;
      }
      .otherPrice {
        font-size: 14px;
        color: #666;
      }
      .price24 {
        display: flex;
        margin-top: 30px;
        > div {
          font-size: 14px;
          color: #666666;
          > span {
            color: #333333;
            font-weight: 500;
            overflow: hidden;
          }
          & ~ div {
            margin-left: 20px;
          }
        }
      }
      .summary {
        font-size: 14px;
        color: #666666;
        line-height: 20px;
        height: 58px;
        overflow: hidden;
        margin-top: 25px;
      }
    }
    .pieWrap {
      flex: 1;
      display: flex;
      // justify-content: space-between;
      margin-left: 20px;
      .pieCommon {
        width: 320px;
        height: 252px;
        background: #fafafa;
        padding: 20px 0px 0px 39px;
        .title {
          color: #666666;
          font-size: 16px;
        }
        .price {
          font-size: 20px;
          color: #333;
          display: flex;
          align-items: center;
          .tag {
            background: rgba(247, 149, 34, 1);
            padding: 0px 5px;
            font-size: 12px;
            line-height: 22px;
            height: 22px;
            color: #fff;
            border-radius: 4px;
            margin-left: 10px;
          }
        }
        .otherPrice {
          margin-top: 15px;
          color: #666;
          margin-bottom: 5px;
        }
        & ~ .pieCommon {
          margin-left: 20px;
        }
      }
    }
    .bottom {
      height: 65px;
      margin-top: 20px;
      border-top: 1px solid #eee;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .leftWrap {
        display: flex;
        a {
          text-decoration: none;
        }
        > div {
          font-size: 14px;
          color: #333;
        }
        > .website {
          margin-left: 30px;
        }
      }
      .download {
        padding: 0px 10px;
        background: #f79522;
        height: 30px;
        line-height: 30px;
        color: #fff;
        border-radius: 6px;
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
