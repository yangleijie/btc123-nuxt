<template>
  <div class="content">
    <div v-if="swiperData.length" :class="$style.swiper">
      <Swiper
        :options="options"
        :data-source="swiperData"
        :pagination="true"
        width="930px"
        height="360px"
      />
    </div>
    <div :class="$style.layout">
      <div :class="$style.main">
        <NewsList
          :data="newsData"
          :category-id="categoryId"
          :show-header="false"
          show-more="loading"
        />
      </div>
      <div :class="$style.right">
        <a-card
          v-if="hotData.length"
          :bordered="false"
          :style="{ borderTop: '2px solid #F79522' }"
          title="热门活动"
        >
          <News :data-source="hotData" size="small" label="TOP1" />
        </a-card>
        <Pick :type="1" :class="$style.pickout" />
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
    components: { Swiper, News, NewsList, Pick },
    head() {
        return {
            title: '区块链峰会_最新行业技术交流活动|BTC123',
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content:
                        '区块链峰会,行业活动,区块链技术沙龙,高峰论坛,区块链全球峰会,区块链线上活动,区块链万里行'
                },
                {
                    hid: 'description',
                    name: 'description',
                    content:
                        'BTC123是全球最领先的区块链比特币行情媒体网站，提供最全的区块链行业峰会、技术沙龙、区块链大会、区块链高峰论坛等活动信息。'
                }
            ]
        };
    },
    data() {
        return {
            options: {
                // loop: false,
                lazy: false,
                effect: 'coverflow',
                centeredSlides: true,
                slidesPerView: 'auto',
                coverflowEffect: {
                    rotate: 20,
                    stretch: 697,
                    depth: 300,
                    modifier: 1,
                    slideShadows: false
                }
            }
        };
    },
    asyncData({ app, error }) {
        const categoryId = '36';
        return Promise.all([
            app.$advert.advertList({ positionId: 24 }),
            app.$advert.advertList({ positionId: 25 }),
            app.$article.list({ categoryId })
        ])
            .then(([slide, hot, news]) => {
                const swiperData = slide.data.map(item => ({
                    src: app.$rewriteUrl(item.path),
                    href: item.url,
                    text: item.title,
                    ...item
                }));
                if (swiperData.length === 1) {
                    swiperData.push(swiperData[0]);
                }
                const hotData = hot.data.map(item => ({ ...item, picUrl: item.path }));
                const newsData = [
                    {
                        name: '活动',
                        id: categoryId,
                        loading: false,
                        list: news.data.list,
                        pages: news.data.pages,
                        pageNumber: news.data.pageNum
                    }
                ];
                return {
                    categoryId,
                    newsData,
                    swiperData,
                    hotData
                };
            })
            .catch(err => {
                const { message, response = {} } = err;
                return error({ statusCode: response.status, message });
            });
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
    & + .right {
      margin-left: 20px;
    }
  }
  .right {
    flex: 0 0 auto;
    width: 330px;
  }
}
.pickout {
  &:not(:first-child) {
    margin-top: 20px;
  }
}
.swiper {
  position: relative;
  width: 100%;
  overflow: hidden;
  margin-top: 40px;
  height: 380px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    :global {
      .swiper-prev {
        left: 160px;
        opacity: 1;
      }
      .swiper-next {
        right: 160px;
        opacity: 1;
      }
    }
  }
  :global {
    .swiper-prev {
      left: 80px;
      opacity: 0;
    }
    .swiper-next {
      right: 80px;
      opacity: 0;
    }
  }
}
.more {
  padding-top: 12px;
  border-top: 1px solid #eeeeee;
  text-align: center;
  a {
    color: #999999;
    font-size: 14px;
    &:hover {
      color: #f79522;
    }
  }
}
</style>
