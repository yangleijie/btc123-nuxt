<template>
  <a-card :bordered="false" :title="title">
    <a-skeleton
      :loading="spinning"
      :paragraph="{ rows: 3 }"
      :class="$style.skeleton"
      active
      avatar
    >
      <div>
        <BigNews :data-source="data" />
        <div v-if="data.length" :class="$style.more">
          <nuxt-link
            :to="localePath({ name: 'news', query: $pickBy({ categoryId }) })"
          >
            {{ $t('text.more') }}
          </nuxt-link>
        </div>
        <Empty v-else text="暂无相关推荐" />
      </div>
    </a-skeleton>
  </a-card>
</template>
<script>
import BigNews from '~/components/BigNews';
import Empty from '~/components/Empty';
export default {
    components: { BigNews, Empty },
    props: {
        title: {
            type: String,
            default() {
                return this.$t('common.guess');
            }
        },
        dataSource: {
            type: Array,
            default() {
                return [];
            }
        },
        articleId: {
            type: [String, Number],
            default: ''
        },
        categoryId: {
            type: [String, Number],
            default: ''
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            spinning: this.loading,
            data: this.dataSource
        };
    },
    mounted() {
        if (this.articleId) {
            this.getRecommendByArticleId();
        } else {
            this.getRecommend();
        }
    },
    methods: {
        getRecommend() {
            this.spinning = true;
            this.$article
                .recommend({ categoryId: this.categoryId })
                .then(({ data }) => {
                    this.spinning = false;
                    this.data = data;
                })
                .catch(() => {
                    this.spinning = false;
                });
        },
        getRecommendByArticleId() {
            this.spinning = true;
            this.$article
                .recommendByArticleId({ articleId: this.articleId })
                .then(({ data }) => {
                    this.spinning = false;
                    this.data = data;
                })
                .catch(() => {
                    this.spinning = false;
                });
        }
    }
};
</script>
<style lang="less" module>
.skeleton {
  :global {
    .ant-skeleton-avatar {
      width: 260px;
      height: 160px;
      border-radius: 0 !important;
    }
  }
}
.more {
  padding-top: 10px;
  text-align: center;
  border-top: 1px solid #eeeeee;
  a {
    color: #999999;
    &:hover {
      color: #ffb24d;
    }
  }
}
</style>
