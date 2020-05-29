<template>
  <div class="content">
    <a-breadcrumb :class="$style.breadcrumb" separator=">">
      <a-breadcrumb-item>
        <nuxt-link :to="localePath('index')">
          {{ $t('news.detail.home') }}
        </nuxt-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>
        <nuxt-link :to="localePath('news')">
          {{ $t('news.detail.news') }}
        </nuxt-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>{{ $t('news.detail.text') }}</a-breadcrumb-item>
    </a-breadcrumb>
    <div :class="$style.layout">
      <div :class="$style.left">
        <img src="~assets/img/bless.png" width="120" alt="虚拟货币" />
        <div :class="$style.share">
          <div
            :class="{ [$style.item]: true, [$style.active]: action.collect }"
            @click="handleFavorite"
          >
            <a-badge
              :dot="haveReward"
              :number-style="{ backgroundImage: `url(${dot})` }"
            >
              <icon-font type="icon-shoucang1" />
            </a-badge>
            {{ $t('news.detail.favorite') }} {{ data.collectNum }}
          </div>
          <div :class="$style.item">
            <a-badge
              :dot="haveReward"
              :number-style="{ backgroundImage: `url(${dot})` }"
            >
              <icon-font type="icon-comment" />
            </a-badge>
            {{ $t('news.detail.comment') }} {{ data.commentCount }}
          </div>
          <a-popover :class="$style.item" placement="right" title="微信分享">
            <template slot="content">
              <div :class="$style.qrcode">
                <img :src="data.qrCode" alt="微信分享比特币" />
                <div>打开微信“扫一扫”</div>
                <div>打开网页后点击屏幕右上角分享按钮</div>
              </div>
            </template>
            <a-badge
              :dot="haveReward"
              :number-style="{ backgroundImage: `url(${dot})` }"
            >
              <icon-font type="icon-weixin-copy" />
            </a-badge>
            {{ $t('common.wechat') }}
          </a-popover>
          <a :class="$style.item" :href="shareWeibo" target="_blank">
            <a-badge
              :dot="haveReward"
              :number-style="{ backgroundImage: `url(${dot})` }"
            >
              <icon-font type="icon-weibo2" />
            </a-badge>
            {{ $t('common.weibo') }}
          </a>
        </div>
        <div v-if="haveReward" style="margin-top: 20px;">
          <a-affix :offset-top="80">
            <div :class="$style.tip">
              <img src="~assets/img/coin.png" alt="虚拟比特币" />
              <div v-if="!rewarding">
                <nuxt-link
                  v-if="!loggedUser"
                  :to="
                    localePath({
                      name: 'signin',
                      query: { redirect_uri: $route.fullPath }
                    })
                  "
                >
                  {{ $t('menu.signin') }}
                </nuxt-link>
                <span v-else>{{ countdown }}s</span>
                {{ $t('news.detail.after') }}
              </div>
              <div v-if="!rewarding">{{ $t('news.detail.get') }}</div>
              <a-spin v-else :tip="$t('news.detail.geting')" />
            </div>
          </a-affix>
        </div>
      </div>
      <div :class="$style.main">
        <div :class="$style.content">
          <h1>{{ data.title }}</h1>
          <div :class="$style.source">
            <div :class="$style.icon">
              <img v-lazy="data.sourceLogo" width="40" height="40" alt="比特币数量" />
            </div>
            <div :class="$style.bd">
              {{ data.source }}·{{ data.createTimeLong | timeago }}
            </div>
            <div :class="$style.view">
              <a-icon type="eye" />
              {{ data.browseNum }}
            </div>
          </div>
          <div v-if="data.summary" :class="$style.summary">
            {{ data.summary }}
          </div>
          <div v-html="data.content" />
          <div v-for="name in data.labelNames" :key="name" :class="$style.tag">
            {{ name }}
          </div>
          <div :class="$style.statement">
            声明：BTC123登载此文出于传递更多信息之目的，并不意味着赞同其观点或证实其描述。文章内容仅供参考，不构成投资建议。投资者据此操作，风险自担。
          </div>
        </div>
        <lazy-component class="card" @show="showComment">
          <Comment
            ref="comment"
            :data-source="comment"
            :loading="loading"
            :total="total"
            :page-size="query.pageSize"
            @comment="handleComment"
            @page-change="handlePageChange"
          />
        </lazy-component>
        <lazy-component class="card">
          <Guess :article-id="data.id" />
        </lazy-component>
      </div>
      <div :class="$style.right">
        <Pick :type="0" />
      </div>
    </div>
    <a-modal v-model="visibleModal" :footer="false" :width="240">
      <div :class="$style.modal">
        <img src="~assets/img/coin.png" alt="比特币交易" />
        <div :class="$style.title">
          {{
            modalType === 'comment' ? $t('reward.comment') : $t('reward.read')
          }}
        </div>
        <div :class="$style.reward">
          <span>+{{ reward }}TV</span>
          {{
            modalType === 'comment' ? $t('reward.comment') : $t('reward.read')
          }}
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import dot from '~/assets/img/coin_s.png';
import Pick from '~/components/Flash/Pick';
import Comment from '~/components/Comment';
import Guess from '~/modules/Guess';
import { mapGetters } from 'vuex';
export default {
    components: { Pick, Comment, Guess },
    data() {
        return {
            dot,
            reward: 0,
            rewarding: false,
            data: {},
            total: 0,
            countdown: 30,
            loading: false,
            comment: [],
            query: {},
            action: {},
            visibleModal: false,
            modalType: ''
        };
    },
    head() {
        const meta = [];
        const {
            seoTitle,
            seoKeyword,
            seoDescription,
            title,
            labelNames,
            summary
        } = this.data;
        if (seoKeyword || labelNames.length) {
            meta.push({
                hid: 'keywords',
                name: 'keywords',
                content: seoKeyword || labelNames.join(',')
            });
        }
        if (seoDescription || summary) {
            meta.push({
                hid: 'description',
                name: 'description',
                content: seoDescription || summary
            });
        }
        const t = seoTitle || title ? `${seoTitle || title}|BTC123` : '';
        return { title: t, meta };
    },
    computed: {
        ...mapGetters(['loggedUser']),
        haveReward() {
            return !!this.data.reward;
        },
        shareWeibo() {
            const wb = 'https://service.weibo.com/share/share.php?';
            const query = this.$qs.stringify({
                url: encodeURIComponent(this.currentUrl),
                title: encodeURIComponent(this.data.title),
                pic: this.data.picUrl
            });
            return `${wb}${query}`;
        }
    },
    asyncData({ app, params, error }) {
        // if (process.server) {
        //   const { originalUrl, headers } = req;
        //   currentUrl = `http://${headers.host}${originalUrl}`;
        // } else {
        //   currentUrl = `${location.origin}${route.fullPath}`;
        // }
        const articleId = params.id;
        const currentUrl = `http://h5.btc123.com/news/${articleId}`;
        const sourceId = 1;
        return Promise.all([
            app.$article.detail({ id: articleId, sourceId, url: currentUrl }),
            app.$article.action({ articleId, sourceId })
        ])
            .then(([article, action]) => {
                if (article.data) {
                    article.data.content = app.$rewriteUrl(article.data.content);
                }
                return {
                    data: article.data,
                    action: action.data,
                    sourceId,
                    articleId,
                    currentUrl,
                    query: { articleId, pageNumber: 1, pageSize: 10 }
                };
            })
            .catch(err => {
                const { message, response = {} } = err;
                return error({ statusCode: response.status, message });
            });
    },
    mounted() {
        if (this.loggedUser && this.haveReward) {
            this.startTimer();
        }
    },
    methods: {
        startTimer() {
            if (this.countdown > 1) {
                this.countdown--;
                this.timer = setTimeout(() => {
                    this.startTimer();
                }, 1000);
            } else {
                this.clearTimer();
                this.getReward();
            }
        },
        clearTimer() {
            clearTimeout(this.timer);
        },
        getReward() {
            this.rewarding = true;
            this.$article
                .browseReward({
                    sourceId: this.sourceId,
                    articleId: this.articleId
                })
                .then(({ data }) => {
                    this.data.reward = false;
                    this.rewarding = false;
                    if (data.first) {
                        this.modalType = '';
                        this.visibleModal = true;
                        this.reward = data.award;
                    } else {
                        this.$message.warning(`已领取过阅读奖励： ${data.award}TV`);
                    }
                })
                .catch(() => {
                    this.rewarding = false;
                    this.data.reward = false;
                });
        },
        showComment() {
            this.getComment();
        },
        handleFavorite() {
            const isCollect = this.action.collect;
            if (this.loggedUser) {
                this.action.collect = !isCollect;
                if (isCollect) {
                    this.data.collectNum--;
                } else {
                    this.data.collectNum++;
                }
                this.$article.favorite({
                    sourceId: this.sourceId,
                    articleId: this.articleId,
                    status: isCollect ? 0 : 1
                });
            }
        },
        handleComment(value, parentId) {
            this.$article
                .addComment({
                    articleId: this.query.articleId,
                    content: value,
                    sourceId: this.sourceId,
                    parentId
                })
                .then(({ data }) => {
                    if (data.first) {
                        this.modalType = 'comment';
                        this.visibleModal = true;
                        this.reward = data.award;
                    } else {
                        this.$message.success(`${parentId ? '回复' : '评论'}成功`);
                    }
                    this.data.commentCount += 1;
                    this.getComment();
                    this.$refs.comment.clearInput();
                    this.$refs.comment.hideLoading(parentId);
                })
                .catch(() => {
                    this.$refs.comment.hideLoading(parentId);
                });
        },
        getComment() {
            this.loading = true;
            const { query } = this;
            this.$article
                .comment(query)
                .then(({ data: { list, total } }) => {
                    this.loading = false;
                    this.comment = list;
                    this.total = total;
                })
                .catch(() => {
                    this.loading = false;
                });
        },
        handlePageChange(current, size) {
            this.query.pageNumber = current;
            this.query.pageSize = size;
            this.getComment();
        }
    },
    beforeRouteLeave(to, from, next) {
        if (this.loggedUser && this.haveReward && this.countdown > 1) {
            this.clearTimer();
            const h = this.$createElement;
            const content = h('div', [
                h('span', {}, '再坚持一下，还有'),
                h('span', { style: { color: '#F79522' } }, ` ${this.countdown}s `),
                h('span', {}, '就可以获得阅读奖励。确定离开？')
            ]);
            this.$confirm({
                title: '阅读奖励',
                cancelText: '残忍的离开',
                okText: '继续浏览',
                content,
                onOk: () => {
                    this.startTimer();
                    next(false);
                },
                onCancel: () => {
                    next();
                }
            });
        } else {
            next();
        }
    }
};
</script>

<style lang="less" module>
.layout {
  display: flex;
  padding: 20px 0;
  .main {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    position: relative;
    &:not(:first-child) {
      margin-left: 20px;
    }
    &:not(:last-child) {
      margin-right: 20px;
    }
  }
  .left {
    flex: 0 0 auto;
    width: 120px;
  }
  .right {
    flex: 0 0 auto;
    width: 330px;
  }
}
.content {
  padding: 20px;
  background-color: #fff;
  font-size: 16px;
  line-height: 1.75;
  color: #3d464d;
  h1 {
    color: #3d464d;
    font-size: 24px;
  }
  img {
    max-width: 100%;
    height: auto;
    margin-top: 16px;
    margin-bottom: 16px;
  }
  :global {
    .content {
      width: 100%;
      padding-left: 0;
      padding-right: 0;
    }
  }
}
.source {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #999999;
  font-size: 14px;
  padding: 20px 0;
  border-bottom: 1px solid #eeeeee;
  .icon {
    background-color: #f6f6f6;
    width: 20px;
    height: 20px;
    overflow: hidden;
    border-radius: 10px;
    margin-right: 8px;
    img {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0;
    }
  }
  .icon,
  .view {
    flex: 0 0 auto;
  }
  .bd {
    flex: 1 1 auto;
  }
}
.summary {
  font-size: 16px;
  color: #999999;
  padding: 16px 0;
  line-height: 32px;
}
.statement {
  font-size: 14px;
  color: #999999;
  padding-top: 20px;
  border-top: 1px solid #eeeeee;
  margin-top: 16px;
  line-height: 22px;
}
.share {
  padding: 0 10px;
  background-color: #fff;
  &:not(:first-child) {
    margin-top: 20px;
  }
  .item {
    display: flex;
    align-items: center;
    padding: 16px 0;
    color: #666666;
    font-size: 14px;
    cursor: pointer;
    &:not(:last-child) {
      border-bottom: 1px solid #eeeeee;
    }
    &.active {
      :global {
        .anticon {
          color: #f79522;
        }
      }
    }
    :global {
      .ant-badge {
        margin-left: 6px;
        margin-right: 10px;
        &-dot {
          background-color: #fff;
          background-repeat: no-repeat;
          background-size: contain;
          background-position: 50%;
          top: -5px;
          height: 10px;
          width: 10px;
          z-index: 9;
        }
      }
      .anticon {
        font-size: 20px;
        color: #cccccc;
      }
    }
  }
}
.tag {
  font-size: 12px;
  color: #666666;
  height: 28px;
  line-height: 28px;
  padding: 0 10px;
  border-radius: 14px;
  background-color: #f6f6f6;
  display: inline-block;
  margin-top: 16px;
  & + & {
    margin-left: 10px;
  }
}
.breadcrumb {
  padding-top: 20px;
  font-size: 12px;
}
.tip {
  padding: 16px;
  background-color: #fff;
  color: #666666;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  &:not(:first-child) {
    margin-top: 20px;
  }
  img {
    width: 48px;
    margin-bottom: 10px;
  }
  span {
    color: #f79522;
    margin-right: 6px;
  }
}
.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 48px;
  }
  .title {
    font-size: 18px;
    color: #4d4d4d;
    margin-top: 20px;
    margin-bottom: 10px;
    font-weight: 500;
  }
  .reward {
    color: #666666;
    font-size: 14px;
    span {
      color: #f79522;
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
