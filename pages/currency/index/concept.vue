<template>
  <div :class="$style.concept">
    <div :class="$style.conceptLeft">
      <div :class="$style.content">
        <div :class="$style.scrollContent">
          <div :class="$style.top">
            <p :class="$style.title">IFO概念（78 2.6%)</p>
            <p>总市值：￥8997.00亿，7.8%</p>
            <p>总交易量：￥8997.00亿</p>
            <p>
              24小时总市值涨跌：
              <span class="drop">-1.8%</span>
            </p>
            <p>涨跌比=20：58</p>
            <Pie :value="[79, 169]" />
          </div>
          <div :class="$style.bottom">
            <div
              v-for="(item, index) in 10"
              :key="index"
              :class="$style.common"
            >
              <div :class="$style.text">IFO概念（78 2.6%）</div>
              <div
                :class="[item % 2 === 0 ? 'risebg' : 'fallbg', $style.number]"
              >
                6.89%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.conceptRight">
      <Currency />
      <!-- <div :class="$style.content">
        <div :class="$style.scrollContent"/>
      </div> -->
    </div>
  </div>
</template>
<script>
import Currency from '~/modules/Currency/Concept';
import Pie from '~/components/EchartsPie/pieHalf';
export default {
    components: {
        Currency,
        Pie
    }
};
</script>

<style lang="less" module>
.concept {
  padding-top: 20px;
  height: 760px;
  display: flex;
  .conceptLeft {
    width: 383px;
    background: #fafafa;
    margin-left: -32px;
    padding: 20px;
    .content {
      overflow: auto;
      height: 100%;
      .scrollContent {
        padding-right: 20px;
        .top {
          background: #fff;
          padding: 18px;
          > p {
            font-size: 14px;
            color: #666666;
          }
          .title {
            color: #333;
            font-size: 18px;
          }
        }
        .bottom {
          .common {
            margin-top: 10px;
            width: 100%;
            height: 61px;
            display: flex;
            background: #fff;
            .text {
              flex: 1;
              line-height: 61px;
              color: #333;
              font-size: 18px;
              padding-left: 18px;
            }
            .number {
              width: 82px;
              height: 100%;
              line-height: 61px;
              font-size: 16px;
              text-align: center;
            }
          }
        }
      }
    }
  }
  .conceptRight {
    flex: 1;
    padding: 0px 0px 20px 20px;
    height: 100%;
    .content {
      padding-right: 9px;
      padding-bottom: 18px;
      height: 100%;
      overflow: auto;
    }
  }
  :global {
    .drop {
      color: #e76653;
    }
    .risebg {
      background: #eaf5e8;
      color: #6cb45f;
    }
    .fallbg {
      background: #f6e6e4;
      color: #e76653;
    }
  }
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 13px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    // border-radius: 10px;
    background: #c1c1c1;
  }
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    // border-radius: 10px;
    background: #f1f1f1;
  }
}
</style>
