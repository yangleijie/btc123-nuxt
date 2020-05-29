<template>
  <div :class="$style.contact">
    <Banner title="联系我们" sub-title="CONTACT US">
      <a-card
        :tab-list="[{ key: 'pro', tab: $t('contact.project') }]"
        :bordered="false"
        style="width:100%"
      >
        <div :class="$style.project">
          <p>{{ $t('contact.email') }}：business@btc123.com</p>
          <p>{{ $t('contact.tel') }}：028-65292064</p>
          <p>
            {{ $t('contact.time') }}：{{ $t('contact.am') }} 9:00-11:30
            {{ $t('contact.pm') }} 13:00-18:00
          </p>
        </div>
      </a-card>
      <a-card
        :tab-list="[{ key: 'pro', tab: $t('contact.cooperation') }]"
        :bordered="false"
        style="width:100%"
      >
        <div :class="[$style.project, $style.contact]">
          <img width="100" src="~assets/img/bqrcode.jpg" alt="比特币与btc123" />
          <p>{{ $t('contact.contact') }}：BTC123</p>
          <p>{{ $t('contact.tel') }}：17341331785</p>
        </div>
      </a-card>
      <a-card
        :tab-list="[{ key: 'pro', tab: $t('contact.follow') }]"
        :bordered="false"
        style="width:100%"
      >
        <div :class="[$style.focus]">
          <div>
            <img src="~assets/img/wechatma.jpg" width="100" alt="btc123" />
            <p>微信公众号</p>
          </div>
          <div>
            <img src="~assets/img/tvqrcode.jpeg" width="100" alt="btc123" />
            <p>钛妹微信</p>
          </div>
          <div>
            <img src="~assets/img/qqma.png" width="100" alt="btc123" />
            <p>BTC123官方群</p>
          </div>
          <div>
            <img src="~assets/img/tvqqqrcode.jpg" width="100" alt="btc123" />
            <p>钛值社区群</p>
          </div>
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
            title: '联系我们|BTC123',
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: '联系我们,BTC123'
                },
                {
                    hid: 'description',
                    name: 'description',
                    content:
                        'BTC123是全球领先的区块链信息服务平台, 提供比特币，以太坊行情资讯数据、区块讯分析、创业孵化、行业峰会、技术等多元产品与服务，致力于为区块链创业者以及数字货币爱好者提供最好的产品和服务。'
                }
            ]
        };
    }
};
</script>

<style lang="less" module>
.contact {
  .project {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 14px;
    color: #4a4a4a;
    padding: 20px 0px 0px;
    > p ~ p {
      margin-top: 15px;
    }
  }
  .contact {
    > p {
      color: #4a4a4a;
      font-size: 14px;
      margin-top: 10px;
    }
  }
  .focus {
    display: flex;
    justify-content: center;
    padding: 20px 0px 0px;
    > div ~ div {
      margin-left: 20px;
    }
    p {
      text-align: center;
    }
  }

  :global {
    .ant-card-wider-padding .ant-card-head {
      padding: 0px;
    }
    .ant-card-body {
      padding: 0px;
    }
    .ant-tabs-nav-scroll {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
