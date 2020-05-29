<template>
  <div class="content">
    <div :class="$style.layout">
      <div :class="$style.main">
        <div v-if="swiperData.length" style="height:420px;">
          <Swiper :data-source="swiperData" height="420px" />
        </div>
        <NewsList
          :data="newsData"
          :category-id="categoryId"
          show-more="loading"
        />
      </div>
      <div :class="$style.right">
        <a
          v-for="n in coverData"
          :key="n.id"
          :class="$style.cover"
          :href="n.url"
          target="_blank"
          rel="nofollow"
          @click="clickAd(n)"
        >
          <span v-if="n.mining" :class="$style.tv" />
          <img
            v-lazy="n.path"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURUxpcU3H2DoAAAABdFJOUwBA5thmAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg=="
            alt="比特币总量"
          />
          <span :class="$style.text">{{ n.title }}</span>
        </a>
        <a-card :bordered="false">
          <div v-if="!recommend.length">
            <a-skeleton
              :title="false"
              :paragraph="false"
              :class="[$style.skeleton, $style.big]"
              active
              avatar
            />
            <a-skeleton
              :title="false"
              :paragraph="{ rows: 3 }"
              :class="$style.skeleton"
              active
              avatar
            />
          </div>
          <News v-else :data-source="recommend" size="small" label="推荐" />
          <div v-if="!hot.length">
            <a-skeleton
              :title="false"
              :paragraph="false"
              :class="[$style.skeleton, $style.big]"
              active
              avatar
            />
            <a-skeleton
              :title="false"
              :paragraph="{ rows: 3 }"
              :class="$style.skeleton"
              active
              avatar
            />
          </div>
          <News v-else :data-source="hot" size="small" label="热门" />
        </a-card>
        <!-- 严选项目 -->
        <Pick :style="{ marginTop: '20px' }" />
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from '~/components/Swiper';
import News from '~/components/News';
import NewsList from '~/modules/NewsList';
import Pick from '~/components/Flash/Pick';
export default {
    components: { Swiper, NewsList, News, Pick },
    head() {
        return {
            title: '区块链-每日最新比特币新闻资讯|BTC123',
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: '区块链新闻,比特币新闻,比特币新闻网,比特币新闻中文网'
                },
                {
                    hid: 'description',
                    name: 'description',
                    content:
                        '比特币123是全球领先的区块链信息服务平台，提供最新的比特币新闻资讯，区块链数字货币动态信息,致力于为区块链比特币的创业者提供最全面的新闻资讯。'
                }
            ]
        };
    },
    data() {
        return {
            hot: [],
            recommend: [],
            pickData: []
        };
    },
    asyncData({ app, query, error }) {
        const { categoryId } = query;
        return Promise.all([
            app.$article.category(),
            app.$article.list({ categoryId }),
            app.$advert.advertList({ positionId: 22 }),
            app.$advert.advertList({ positionId: 23 })
        ])
            .then(([category, news, slide, cover]) => {
                const newsData = category.data.map(({ id, name }) => {
                    const cid = id.toString();
                    return {
                        id: cid,
                        name,
                        loading: categoryId !== cid,
                        list: categoryId === cid ? news.data.list : [],
                        pages: categoryId === cid ? news.data.pages : '',
                        pageNumber: categoryId === cid ? news.data.pageNum : 1
                    };
                });
                newsData.unshift({
                    name: '最新',
                    id: '',
                    loading: !!categoryId,
                    list: !categoryId ? news.data.list : [],
                    pages: !categoryId ? news.data.pages : '',
                    pageNumber: !categoryId ? news.data.pageNum : 1
                });
                const swiperData = slide.data.map(item => ({
                    src: app.$rewriteUrl(item.path),
                    href: item.url,
                    text: item.title,
                    ...item
                }));
                return {
                    categoryId,
                    newsData,
                    swiperData,
                    coverData: cover.data
                };
            })
            .catch(err => {
                const { message, response = {} } = err;
                return error({ statusCode: response.status, message });
            });
    },
    created() {
        this.getHot();
        this.getRecommend();
    },
    methods: {
        getHot() {
            this.$article.hot().then(({ data }) => {
                this.hot = data;
            });
        },
        getRecommend() {
            this.$article.recommend().then(({ data }) => {
                this.recommend = data;
            });
        }
    }
};
</script>
<style lang="less" module>
.layout {
  display: flex;
  padding: 20px 0;
  & + & {
    padding-top: 0;
  }
  .main {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    position: relative;
    & + .right {
      margin-left: 20px;
    }
  }
  .right {
    flex: 0 0 auto;
    width: 330px;
  }
}
.cover {
  position: relative;
  display: block;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  & + & {
    margin-top: 20px;
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    transition: all 0.5s;
  }
  &:hover {
    img {
      transform: scale(1.05);
    }
  }
  .text {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12px;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    font-size: 12px;
  }
}
.skeleton {
  margin-top: 10px;
  margin-bottom: 10px;
  &.big {
    :global {
      .ant-skeleton-avatar {
        width: 290px;
        height: 180px;
      }
    }
  }
  :global {
    .ant-skeleton-avatar {
      width: 100px;
      height: 80px;
      border-radius: 0 !important;
    }
  }
}
.tv {
  position: absolute;
  top: 8px;
  left: 8px;
  width: 40px;
  height: 22px;
  background: rgba(247, 149, 34, 1);
  border-radius: 2px;
  z-index: 1;
  background-image: url(~assets/img/tv.png);
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 28px;
}
</style>
