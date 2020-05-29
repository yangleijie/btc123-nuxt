<template>
  <div :class="[$style.left, 'searchWrap']">
    <a-card
      :head-style="{ padding: '0px' }"
      :bordered="false"
      :title="isServer ? $t('flash.title') : ''"
    >
      <a-timeline :pending="false">
        <a-timeline-item v-for="(item, index) in data" :key="index">
          <div slot="dot" :class="$style.dot">
            {{ item.createTimeLong | timeago(1) }}
          </div>
          <div :class="$style.content">
            <h3>{{ item.title }}</h3>
            <p>
              {{ item.content }}
            </p>
            <div :class="$style.operate">
              <div>{{ $t('flash.source') }}：{{ item.source }}</div>
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
                      width="120"
                      alt="btc123">
                    <p>微信扫一扫分享</p>
                  </div>
                  <icon-font
                    :class="[$style.wechat,$style.icon]"
                    type="icon-weixin-copy" />
                </a-tooltip> -->
                <a-popover title="微信分享" placement="left">
                  <template slot="content">
                    <div :class="$style.qrcode">
                      <img :src="item.qrCode" alt="比特币分享" />
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
      </a-timeline>
      <Empty v-if="!data.length" type="search" />
    </a-card>
    <a-button v-if="isServer" :loading="loading" block @click="loadMore">
      {{ $t('text.more') }}
    </a-button>
    <a-pagination
      v-else
      v-model="current"
      :hide-on-single-page="true"
      :page-size="20"
      :total="total"
    />
  </div>
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
export default {
    name: 'BigFlash',
    components: {
        Empty
    },
    props: {
        flashData: {
            type: Array,
            default: () => []
        },
        loading: {
            type: Boolean,
            default: false
        },
        isServer: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            data: generateData(this.flashData),
            current: 1,
            total: 0
        };
    },
    watch: {
        current: function() {
            this.fetch();
        },
        flashData: function(newV) {
            this.data = generateData(newV);
        }
    },
    mounted() {
        if (!this.isServer) {
            this.fetch();
        }
    },
    methods: {
        fetch() {
            const { keyword } = this.$route.query;
            this.$flash
                .list({
                    pageNumber: this.current,
                    title: keyword
                })
                .then(({ data: { list, total } }) => {
                    this.data = generateData(list);
                    this.total = total;
                });
        },
        onSearch() {
            this.current = 1;
            this.fetch();
        },
        loadMore() {
            this.$emit('loadMore');
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
.left {
  padding: 0 20px;
  width: 100%;
  background: #fff;
  .dot {
    background: #f79522;
    color: #fff;
    padding: 3px 6px;
    border-radius: 4px;
    font-weight: 400;
    font-size: 12px;
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
    }
    > p {
      color: #828a92;
      font-size: 14px;
      text-align: justify;
      line-height: 21px;
      margin-top: 5px;
    }
  }
  .operate {
    font-size: 12px;
    color: #999999;
    display: flex;
    justify-content: space-between;
    height: 22px;
    line-height: 22px;
    margin-top: 12px;
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
      padding: 18px 30px 0px;
    }
    .ant-timeline-item-content {
      margin-left: 54px;
    }
    .ant-timeline-item {
      padding: 0px 0px 31px;
    }
    .ant-timeline-item-last {
      padding: 0px 0px 21px;
    }

    .ant-timeline-item-tail,
    .ant-timeline-item-tail {
      border-left: 1px solid #f79522 !important;
      opacity: 0.2;
    }
    .ant-btn-default {
      box-shadow: none;
      border: none;
      height: 40px;
      border-top: 1px solid #eee;
    }
    button[ant-click-animating-without-extra-node]:after {
      border: 0 none;
      opacity: 0;
      animation: none 0 ease 0 1 normal;
    }
  }
  .wechatShare {
    > img {
      width: 100px;
      height: 100px;
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
