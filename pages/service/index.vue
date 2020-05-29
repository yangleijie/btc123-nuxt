<template>
  <section :class="$style.service">
    <section :class="$style['service-banner']">
      <div>
        <p>{{ $t('service.year') }}</p>
        <p>{{ $t('service.leader') }}</p>
        <p />
        <p v-html="$t('service.after')" />
      </div>
    </section>
    <section :class="$style['service-list']">
      <div :class="$style.container">
        <div :class="$style.title">
          创投服务
        </div>
        <div :class="$style.common">
          <img
            src="~assets/img/service/planing.png"
            width="440px"
            height="300px"
            alt="Bitcoin,btc123"
          />
          <div>
            <div>
              <span>
                <icon-font type="icon-huiyi" />
              </span>
              <div>
                <p>
                  {{ $t('service.review') }}
                </p>
                <p>
                  {{ $t('service.reviewDesc') }}
                </p>
              </div>
            </div>
            <div>
              <span>
                <icon-font type="icon-analysis" />
              </span>
              <div>
                <p>
                  {{ $t('service.analysis') }}
                </p>
                <p>
                  {{ $t('service.analysisDesc') }}
                </p>
              </div>
            </div>
            <div>
              <span>
                <icon-font type="icon-gongchengguihua" />
              </span>
              <div>
                <p>
                  {{ $t('service.collation') }}
                </p>
                <p>
                  {{ $t('service.collationDesc') }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div :class="$style.common">
          <img
            src="~assets/img/service/construction.png"
            width="440px"
            height="300px"
            alt="比特币交易,btc123"
          />
          <div>
            <div>
              <span>
                <icon-font type="icon-cailiaozhiding" />
              </span>
              <div>
                <p>
                  {{ $t('service.plan') }}
                </p>
                <p>
                  {{ $t('service.planDesc') }}
                </p>
              </div>
            </div>
            <div>
              <span>
                <icon-font type="icon-wodezijin" />
              </span>
              <div>
                <p>
                  {{ $t('service.capital') }}
                </p>
                <p>
                  {{ $t('service.capitalDesc') }}
                </p>
              </div>
            </div>
            <div>
              <span>
                <icon-font type="icon-iconqyxx" />
              </span>
              <div>
                <p>
                  {{ $t('service.brand') }}
                </p>
                <p>
                  {{ $t('service.brandDesc') }}
                </p>
              </div>
            </div>
            <div>
              <span>
                <icon-font type="icon-leijishufuwux" />
              </span>
              <div>
                <p>
                  {{ $t('service.guidance') }}
                </p>
                <p>
                  {{ $t('service.guidanceDesc') }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div :class="$style.common">
          <img
            src="~assets/img/service/operating.png"
            width="440px"
            height="300px"
            alt="比特币,btc123"
          />
          <div>
            <div>
              <span>
                <icon-font type="icon-huobi" />
              </span>
              <div>
                <p>
                  {{ $t('service.transaction') }}
                </p>
                <p>
                  {{ $t('service.transactionDesc') }}
                </p>
              </div>
            </div>
            <div>
              <span>
                <icon-font type="icon-tuoguanshangjin-hui" />
              </span>
              <div>
                <p>
                  {{ $t('service.market') }}
                </p>
                <p>
                  {{ $t('service.marketDesc') }}
                </p>
              </div>
            </div>
            <div>
              <span>
                <icon-font type="icon-iconfontquanzi-copy" />
              </span>
              <div>
                <p>
                  {{ $t('service.promotion') }}
                </p>
                <p>
                  {{ $t('service.promotionDesc') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <lazy-component>
      <section :class="$style['service-advantage']">
        <div :class="$style.container">
          <div :class="$style.title">
            我们的优势
          </div>
          <div :class="$style.module">
            <div>
              <img src="~assets/img/service/tech.png" alt="比特币优势" />
              <div>
                {{ $t('service.surporting') }}
              </div>
              <p>
                {{ $t('service.surportingDesc') }}
              </p>
            </div>
            <div>
              <img src="~assets/img/service/spread.png" alt="比特币用处" />
              <div>
                {{ $t('service.promotion2') }}
              </div>
              <p>
                {{ $t('service.promotion2Desc') }}
              </p>
            </div>
            <div>
              <img src="~assets/img/service/offline.png" alt="比特币btc123" />
              <div>
                {{ $t('service.offline') }}
              </div>
              <p>
                {{ $t('service.offlineDesc') }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </lazy-component>
    <lazy-component>
      <section :class="$style['service-cooperation']">
        <div :class="$style.container">
          <div :class="$style.title">
            合作单位
          </div>
          <div :class="$style.imgwrap">
            <a
              v-for="(item, key) in co"
              :key="key"
              :href="item.url"
              target="_blank"
            >
              <img
                v-lazy="item.pic"
                width="144"
                height="78"
                alt="btc123合作伙伴"
              />
            </a>
          </div>
        </div>
      </section>
    </lazy-component>
    <lazy-component>
      <section :class="$style['service-connect']">
        <div :class="$style.title">
          欢迎洽谈·合作共赢
          <!-- {{ $t('service.welcome') }} -->
        </div>
        <div :class="$style.people">
          <div>
            <h3>{{ $t('service.cooperate') }}</h3>
            <div>
              <p>
                18782046562
              </p>
              <p>
               1058815076@qq.com
              </p>
            </div>
          </div>
          <img src="~assets/img/bqrcode.jpg" alt="btc123,区块链" />
        </div>
      </section>
    </lazy-component>
  </section>
</template>

<script>
// import img1 from '../../assets/img/service/logo1.png';
export default {
    head() {
        return {
            title: '区块链创投服务于投资|BTC',
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: '区块链可以投资吗,区块链投资,区块链创投'
                },
                {
                    hid: 'description',
                    name: 'description',
                    content:
                        'BTC123是国内最早的区块链（blockchain）资讯社区门户，为区块链创业者、投资者提供信息、交流与投融资服务。'
                }
            ]
        };
    },
    data() {
        return {
            co: [
                {
                    pic: require('../../assets/img/service/logo1.png'),
                    url: 'https://www.chainfor.com/'
                },
                {
                    pic: require('../../assets/img/service/logo2.png'),
                    url: 'https://www.kg.com/'
                },
                {
                    pic: require('../../assets/img/service/logo3.png'),
                    url: 'https://bitcoin.org/en/'
                },
                {
                    pic: require('../../assets/img/service/logo4.png'),
                    url: 'http://www.btc798.com/'
                },
                {
                    pic: require('../../assets/img/service/logo5.png'),
                    url: 'http://biqushi.cn/'
                },
                {
                    pic: require('../../assets/img/service/logo6.png'),
                    url: 'http://jgy.com/'
                },
                {
                    pic: require('../../assets/img/service/logo7.png'),
                    url: 'http://www.jinniu.cn/'
                },
                {
                    pic: require('../../assets/img/service/logo8.png'),
                    url: 'http://www.qukuainews.cn/'
                },
                {
                    pic: require('../../assets/img/service/logo9.png'),
                    url: 'https://www.jinse.com/'
                },
                {
                    pic: require('../../assets/img/service/logo10.png'),
                    url: 'https://mp.toutiao.com/login/?redirect_url=JTJG'
                },
                {
                    pic: require('../../assets/img/service/logo11.png'),
                    url: 'https://36kr.com/'
                },
                {
                    pic: require('../../assets/img/service/logo12.png'),
                    url: 'http://www.ifeng.com/'
                },
                {
                    pic: require('../../assets/img/service/logo13.png'),
                    url: 'https://finance.sina.com.cn/'
                },
                {
                    pic: require('../../assets/img/service/logo14.png'),
                    url: 'http://www.shangfang.cn/'
                },
                {
                    pic: require('../../assets/img/service/logo15.png'),
                    url: 'https://news.163.com/'
                },
                {
                    pic: require('../../assets/img/service/logo16.png'),
                    url: 'https://about.bnef.com/'
                },
                {
                    pic: require('../../assets/img/service/logo17.png'),
                    url: 'https://forexlive.com/'
                },
                {
                    pic: require('../../assets/img/service/logo18.png'),
                    url: 'https://www.marketwatch.com/'
                },
                {
                    pic: require('../../assets/img/service/logo19.png'),
                    url: 'https://www.yahoo.com/'
                },
                {
                    pic: require('../../assets/img/service/logo20.png'),
                    url: 'https://www.asahi.com/'
                },
                {
                    pic: require('../../assets/img/service/logo21.png'),
                    url: 'https://edition.cnn.com/'
                },
                {
                    pic: require('../../assets/img/service/logo22.png'),
                    url: 'https://trust.ecitic.com/'
                },
                {
                    pic: require('../../assets/img/service/logo23.png'),
                    url: 'https://www.okex.com/'
                },
                {
                    pic: require('../../assets/img/service/logo24.png'),
                    url: 'https://www.zb.com/'
                },
                {
                    pic: require('../../assets/img/service/logo25.png'),
                    url: 'http://cn.reuters.com/'
                },
                {
                    pic: require('../../assets/img/service/logo26.png'),
                    url: 'https://www.huobipro.com/'
                },
                {
                    pic: require('../../assets/img/service/logo27.png'),
                    url: 'http://www.nytimes-se.com/'
                },
                {
                    pic: require('../../assets/img/service/logo28.png'),
                    url: 'https://www.allcoin.ca/'
                },
                {
                    pic: require('../../assets/img/service/logo29.png'),
                    url: 'https://bitbank.cc/'
                },
                {
                    pic: require('../../assets/img/service/logo30.png'),
                    url: 'https://taiyiyun.com/'
                },
                {
                    pic: require('../../assets/img/service/logo31.png'),
                    url: 'http://www.bitcoin86.com/'
                }
            ]
        };
    }
};
</script>

<style lang="less" module>
.service {
  width: 100%;
  background: #fff;
  &-banner {
    width: 100%;
    height: 600px;
    background: url(~assets/img/service/bg.png) center center/cover no-repeat;
    padding-left: 24.6%;
    padding-top: 150px;
    > div {
      > p {
        margin-bottom: 0px;
        &:nth-child(1) {
          font-size: 40px;
          font-weight: 500;
          color: #000;
        }
        &:nth-child(2) {
          font-size: 60px;
          font-weight: 800;
          color: #000;
          margin-top: 10px;
        }
        &:nth-child(3) {
          width: 80px;
          height: 6px;
          background: #b28850;
          margin: 40px 0px 60px;
        }
        &:nth-child(4) {
          font-size: 20px;
          color: #333333;
        }
      }
    }
  }
  &-list {
    width: 100%;
    .container {
      width: 1080px;
      margin: 0 auto;
      padding-top: 46px;
      .title {
        font-size: 32px;
        color: #000;
        text-align: center;
        width: 290px;
        height: 45px;
        margin: 0px auto 95px;
        background: url(~assets/img/service/service.png) center center/contain
          no-repeat;
        line-height: 90px;
        position: relative;
        &::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 75px;
          width: 60px;
          height: 4px;
          background: #b28850;
          transform: translateX(-50%);
        }
      }
      .common {
        width: 100%;
        height: 300px;
        display: flex;
        background: #fafafa;
        margin-bottom: 60px;
        > img {
          flex: 0 0 auto;
          margin-top: -20px;
          margin-left: -20px;
          box-shadow: 0px 6px 16px 0px #fff;
        }
        > div {
          flex: 1 1 auto;
          padding: 20px 0px;
          > div {
            height: 60px;
            margin-left: 30px;
            display: flex;
            margin-top: 20px;
            > span {
              width: 60px;
              height: 60px;
              background: #f4f0e9;
              border-radius: 50%;
              text-align: center;
              line-height: 70px;
              flex: 0 0 auto;
              > i {
                color: #b28850;
                font-size: 30px;
                font-weight: bold;
              }
            }
            > div {
              margin-left: 20px;
              padding: 10px 0px;
              line-height: 1;
              > p {
                margin-bottom: 0px;
                &:nth-child(1) {
                  color: #333;
                  font-size: 18px;
                }
                &:nth-child(2) {
                  color: #666666;
                  font-size: 14px;
                  margin-top: 10px;
                }
              }
            }
          }
        }
        &:nth-child(3) {
          height: 340px;
          > div {
            padding: 0px;
          }
        }
      }
    }
  }
  &-advantage {
    height: 629px;
    width: 100%;
    background: #f6f6f6;
    .container {
      width: 1080px;
      margin: 0 auto;
      padding-top: 50px;
      .title {
        font-size: 32px;
        color: #000;
        text-align: center;
        width: 462px;
        height: 45px;
        margin: 0px auto 95px;
        background: url(~assets/img/service/adve.png) center center/contain
          no-repeat;
        line-height: 90px;
        position: relative;
        &::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 75px;
          width: 60px;
          height: 4px;
          background: #b28850;
          transform: translateX(-50%);
        }
      }
      .module {
        display: flex;
        justify-content: space-between;
        > div {
          text-align: center;
          width: 340px;
          height: 360px;
          background: #fff;
          transition: 0.3s;
          padding: 50px 34px 0px;
          &:hover {
            box-shadow: 0px 6px 16px 0px rgba(129, 81, 28, 0.12);
            > div {
              border-bottom: 2px solid #b28850;
            }
          }
          > img {
            display: block;
            width: 100px;
            height: 100px;
            margin: 0 auto;
          }
          > div {
            // width: 100px;
            // margin: 0 auto;
            display: inline-block;
            text-align: center;
            font-size: 24px;
            color: #333333;
            transition: 0.3s;
            border-bottom: 2px solid transparent;
            padding-bottom: 5px;
            margin-top: 46px;
          }
          > p {
            font-size: 16px;
            color: #666666;
            margin-top: 20px;
            line-height: 24px;
            text-align: left;
            max-height: 74px;
            overflow: auto;
          }
        }
      }
    }
  }
  &-cooperation {
    // height: 629px;
    width: 100%;
    background: #fff;
    .container {
      width: 1080px;
      margin: 0 auto;
      padding-top: 50px;
      padding-bottom: 60px;
      .title {
        font-size: 32px;
        color: #000;
        text-align: center;
        width: 462px;
        height: 45px;
        margin: 0px auto 95px;
        background: url(~assets/img/service/hezuo.png) center center/contain
          no-repeat;
        line-height: 90px;
        position: relative;
        &::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 75px;
          width: 60px;
          height: 4px;
          background: #b28850;
          transform: translateX(-50%);
        }
      }
      .imgwrap {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        > a {
          width: 163px;
          height: 80px;
          border: 1px solid #efefef;
          margin-bottom: 20px;
          > img {
            display: block;
            max-height: 100%;
            max-width: 100%;
          }
        }
      }
    }
  }
  &-connect {
    width: 100%;
    height: 400px;
    background: url('~assets/img/service/coop-bg.png') center center/cover
      no-repeat;
    padding-top: 50px;
    .title {
      font-size: 32px;
      color: #000;
      text-align: center;
      width: 694px;
      height: 45px;
      margin: 0px auto 80px;
      background: url(~assets/img/service/hezuo.png) center center/contain
        no-repeat;
      line-height: 90px;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 75px;
        width: 60px;
        height: 4px;
        background: #b28850;
        transform: translateX(-50%);
      }
    }
    .people {
      width: 552px;
      height: 215px;
      background: url(~assets/img/service/shadow.png) center center/100% 100%
        no-repeat;
      margin: 0 auto;
      padding: 35px 76px 38px 87px;
      display: flex;
      justify-content: space-between;
      > div {
        h3 {
          color: #000;
          font-size: 24px;
          margin-bottom: 25px;
        }
        p {
          font-size: 18px;
          color: #000000;
          margin-bottom: 6px;
        }
      }
      > img {
        width: 120px;
        height: 120px;
        background: #ccc;
      }
    }
  }
}
</style>
