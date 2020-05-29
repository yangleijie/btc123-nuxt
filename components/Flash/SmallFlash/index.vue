<template>
  <a-card
    :head-style="{ borderTop: '2px solid #F79522' }"
    :class="$style.flash"
    :bordered="false"
    :title="title"
  >
    <a v-if="showExtra" slot="extra" :class="$style.extra" href="#">更多</a>
    <div v-if="!loaded">
      <a-skeleton :active="true" :paragraph="{ rows: 2 }" />
      <a-skeleton :active="true" :paragraph="{ rows: 2 }" />
      <a-skeleton :active="true" :paragraph="{ rows: 2 }" />
    </div>
    <a-timeline v-else :pending="false">
      <Empty v-if="!data.length" text="还没有独家快讯哦/(ㄒoㄒ)/~~" />
      <div v-else>
        <a-timeline-item v-for="(item, index) in data" :key="index">
          <div slot="dot" :class="$style.dot" />
          <div :class="$style.content">
            <h3>{{ item.title }}</h3>
            <p v-showMore>
              {{ item.content }}
              <a class="spreadMore" rel="nofollow">[展开]</a>
            </p>
            <div :class="$style.operate">
              <div>{{ item.createTimeLong | timeago(1) }}</div>
              <div :class="$style['operate-right']">
                <span>{{ $t('flash.share') }}</span>
                <icon-font
                  :class="[$style.weibo, $style.icon]"
                  type="icon-weibo2"
                  @click="shareWeibo(item.title, item.id)"
                />
                <!-- <a-tooltip
                overlay-class-name="wechat_share"
                placement="left">
                <div
                  slot="title"
                  :class="$style.wechatShare">
                  <img
                    :src="item.qrCode"
                    alt="比特币微信扫一扫分享">
                  <p>微信扫一扫分享</p>
                </div>
                <icon-font
                  :class="[$style.wechat,$style.icon]"
                  type="icon-weixin-copy" />
              </a-tooltip> -->
                <a-popover title="微信分享" placement="left">
                  <template slot="content">
                    <div :class="$style.qrcode">
                      <img :src="item.qrCode" alt="比特币独家快讯" />
                      <div>打开微信“扫一扫”</div>
                      <div>打开网页后点击屏幕右上角分享按钮</div>
                    </div>
                  </template>
                  <icon-font
                    :class="[$style.wechat, $style.icon]"
                    type="icon-weixin-copy"
                  />
                </a-popover>
              </div>
            </div>
          </div>
        </a-timeline-item>
      </div>
    </a-timeline>
  </a-card>
</template>
<script>
import Empty from '~/components/Empty';
import QRCode from 'qrcode';
const generateData = data => {
    data.map(async item => {
        item.qrCode = await QRCode.toDataURL(
            `http://h5.btc123.com/flash/${item.id}`
        );
        return item;
    });
    return data;
};
const SHOW_MORE = 42;
let _THIS = null;
export default {
    name: 'SmallFlash',
    components: { Empty },
    directives: {
        showMore: {
            bind: el => {
                _THIS.$nextTick(() => {
                    if (el.scrollHeight > SHOW_MORE) {
                        el.classList.add('showTwoLine');
                    }
                    el.addEventListener('click', function(e) {
                        if (e.target.nodeName !== 'A') {
                            return;
                        }
                        const element = e.target;
                        if (el.clientHeight > SHOW_MORE) {
                            element.classList.remove('closeSpread');
                            el.classList.remove('showAll');
                            element.innerText = '[展开]';
                        } else {
                            element.classList.add('closeSpread');
                            el.classList.add('showAll');
                            element.innerText = '[收起]';
                        }
                    });
                });
            }
        }
    },
    props: {
        flashData: {
            type: Array,
            default: () => []
        },
        showExtra: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default() {
                return this.$t('flash.exclusive');
            }
        },
        type: {
            type: Number,
            default: 1 // 1 独家 2 7*24小时快讯
        }
    },
    data() {
        return {
            loaded: false,
            data: generateData(this.flashData)
        };
    },
    created() {
        _THIS = this;
        if (this.type === 1) {
            this.fetchBtc123();
        } else if (this.type === 2) {
            this.fetch();
        }
    },
    methods: {
        fetchBtc123() {
            this.loaded = false;
            this.$flash.btc123List().then(({ data: { list } }) => {
                this.loaded = true;
                this.data = generateData(list);
            });
        },
        fetch() {
            this.loaded = false;
            this.$flash
                .list({
                    pageSize: 10,
                    sourceId: 1
                })
                .then(({ data: { list } }) => {
                    this.loaded = true;
                    this.data = generateData(list);
                });
        },
        shareWeibo(title, id) {
            const pic =
                'http://static.pulsar.link/btc123/e812e744f18c4220b8f2412ee5321bf0';
            const url = `http://h5.btc123.com/flash/${id}`;
            const sharesinastring = `http://v.t.sina.com.cn/share/share.php?title=${title}&url=${url}&content=utf-8&sourceUrl=url&pic=${pic}`;
            window.open(
                sharesinastring,
                'newwindow',
                'height=400,width=800,top=100,left=200'
            );
        }
    }
};
</script>

<style lang="less" module>
.flash {
  margin-bottom: 20px;
  .dot {
    background: #f79522;
    width: 4px;
    height: 4px;
  }
  .extra {
    font-size: 14px;
    color: #999;
  }
  .content {
    &:hover {
      > h3 {
        color: #f79522;
      }
    }
    > h3 {
      color: #3d464d;
      font-size: 14px;
      transition: 0.3s;
      text-align: justify;
    }
    > p {
      color: #828a92;
      font-size: 14px;
      text-align: justify;
      line-height: 21px;
      max-height: 41px;
      overflow: hidden;
      position: relative;
      margin-top: 5px;
      > a {
        display: none;
      }
    }
  }
  .operate {
    font-size: 12px;
    color: #999999;
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    height: 22px;
    line-height: 22px;
    .icon {
      font-size: 20px;
      margin-left: 10px;
      transition: 0.3s;
      color: #cccccc;
      cursor: pointer;
    }
    .weibo {
      &:hover {
        color: #ea5d5c;
      }
    }
    .wechat {
      &:hover {
        color: #50b674;
      }
    }
    &-right {
      display: flex;
    }
  }
  :global {
    .ant-card-body {
      padding: 18px 20px 0px 8px;
    }
    .ant-timeline-item-content {
      margin-left: 13px;
    }
    .ant-timeline-item {
      padding: 0px 0px 15px;
    }
    .ant-timeline-item-last {
      padding: 0px 0px 15px;
    }
    .ant-timeline-item-tail,
    .ant-timeline-item-tail {
      border-left: 1px solid #f79522 !important;
      opacity: 0.2;
    }
    // 展开收起
    .spreadMore {
      position: absolute;
      padding-left: 19px;
      right: 0px;
      bottom: 0px;
      background: #fff;
      color: #f79522;
      &::before {
        content: '...';
        position: absolute;
        left: 3px;
        bottom: 0px;
        color: #828a92;
      }
    }
    .closeSpread {
      padding-left: 0px;
      position: relative;
      &::before {
        content: '';
      }
    }
    .showTwoLine {
      a {
        display: inline !important;
      }
    }
    .showAll {
      max-height: 20000px !important;
    }
    .ant-skeleton {
      padding-bottom: 20px;
    }
  }
}
.qrcode {
  text-align: center;
  font-size: 12px;
  color: #999999;
  img {
    width: 140px;
    height: auto;
  }
}
</style>
