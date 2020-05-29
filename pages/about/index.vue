<template>
  <div :class="$style.about">
    <Banner>
      <a-card
        :tab-list="[{ key: 'pro', tab: $t('about.project') }]"
        :bordered="false"
        style="width:100%"
      >
        <p :class="$style.text">{{ $t('about.desc') }}</p>
      </a-card>
      <a-card
        :tab-list="[{ key: 'pro', tab: $t('about.roadmap') }]"
        :bordered="false"
        style="width:100%"
      >
        <div :class="$style.timeLine">
          <a-timeline>
            <a-timeline-item v-for="(item, index) in timeLine" :key="index">
              <div slot="dot">
                <span :class="$style.dot" />
              </div>
              <div class="timeLine">{{ item.time }}</div>
              {{ item.text }}
            </a-timeline-item>
          </a-timeline>
        </div>
      </a-card>
    </Banner>
  </div>
</template>
<script>
import Banner from '~/components/About/banner';
export default {
    components: {
        Banner
    },
    head() {
        return {
            title: '关于我们|BTC123',
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: '关于我们,BTC123'
                },
                {
                    hid: 'description',
                    name: 'description',
                    content:
                        'BTC123是全球领先的区块链信息服务平台, 提供比特币，以太坊行情资讯数据、区块讯分析、创业孵化、行业峰会、技术等多元产品与服务，致力于为区块链创业者以及数字货币爱好者提供最好的产品和服务。'
                }
            ]
        };
    },
    data() {
        return {
            timeLine: [
                {
                    time: '2018年9月',
                    text:
                        'BTC123总部迁往香港，成立BTC123 Global Media Technology Limited（比特123全球传媒科技有限公司）'
                },
                {
                    time: '2017年12月',
                    text: 'BTC23被评为“中国区块链风云媒体”'
                },
                {
                    time: '2017年6月',
                    text:
                        '成功举办“第一届全球区块链高峰论坛”，并成立“西南区块链创新发展联盟”'
                },
                {
                    time: '2017年',
                    text:
                        'BTC123被评为“2016年成都天府软件园值得关注的十大创业融资项目”之一'
                },
                {
                    time: '2016年12月',
                    text: 'BTC123获得了光照资本领投的千万级A轮融资'
                },
                {
                    time: '2015年',
                    text:
                        'BTC123从单一比特币门户网站升级为涵盖数字货币与区块链的专业媒体平台'
                },
                {
                    time: '2014年',
                    text:
                        '比特币著名天使投资人宝二爷加入，BTC123成为行业内首家第三方公正平台'
                },
                {
                    time: '2013年',
                    text: 'BTC123成为数字货币与区块链行业的领军品牌'
                },
                {
                    time: '2011年',
                    text: '首家比特币导航网站www.btc123.com由墨不一建立'
                }
            ]
        };
    }
};
</script>
<style lang="less" module>
.about {
  .text {
    font-size: 14px;
    color: #4a4a4a;
    line-height: 32px;
    margin-top: 20px;
    text-align: justify;
  }
  .timeLine {
    margin-top: 40px;
    padding-left: 105px;
    .dot {
      display: block;
      width: 8px;
      height: 8px;
      background: #f79522;
      border-radius: 50%;
    }
  }
  :global {
    .ant-card-wider-padding .ant-card-head {
      padding: 0px;
    }
    .ant-card-body {
      padding: 0px;
    }
    .ant-timeline-item-content {
      color: #4a4a4a;
      font-size: 14px;
      .timeLine {
        position: absolute;
        left: -120px;
      }
    }
    .ant-timeline-item {
      padding: 0px 0px 40px;
    }
    .ant-timeline-item-last {
      padding: 0px;
    }
  }
}
</style>
