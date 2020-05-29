<template>
  <a-card :bordered="false">
    <a-tabs
      v-if="category.length"
      :active-key="query.categoryId"
      :animated="false"
      :tab-bar-style="{ display: showHeader ? 'block' : 'none' }"
      @change="handleChange"
    >
      <a-tab-pane v-for="n in category" :key="n.id" :tab="n.name">
        <a-skeleton
          :loading="n.loading"
          :paragraph="{ rows: 3 }"
          :class="$style.skeleton"
          active
          avatar
        >
          <div :style="{ marginTop: showHeader ? '-16px' : 0 }">
            <BigNews :data-source="n.list" />
            <div v-if="n.list.length" :class="$style.more">
              <div v-if="pagination">
                <a-pagination
                  v-model="query.pageNumber"
                  :total="n.total"
                  @change="handlePageChange"
                />
              </div>
              <div v-else>
                <div v-if="showMore === 'loading'">
                  <a v-if="n.pageNumber < n.pages" @click="loadMore(n)">
                    <a-spin v-if="loadingMore" size="small" />
                    {{ loadingMore ? $t('text.loading') : $t('text.more') }}
                  </a>
                  <span v-else>{{ $t('text.nomore') }}~(⊙o⊙)</span>
                </div>
                <nuxt-link v-else :to="newsPath(n)">
                  {{ $t('text.more') }}
                </nuxt-link>
              </div>
            </div>
            <Empty v-if="!n.list.length" :type="emptyType" />
          </div>
        </a-skeleton>
      </a-tab-pane>
    </a-tabs>
    <a-skeleton
      v-else
      :loading="true"
      :paragraph="{ rows: 4 }"
      :class="$style.skeleton"
      active
      avatar
    />
  </a-card>
</template>
<script>
import BigNews from '~/components/BigNews';
import Empty from '~/components/Empty';
export default {
    components: { BigNews, Empty },
    props: {
        data: {
            type: Array,
            default() {
                return [];
            }
        },
        showMore: {
            type: String,
            default: 'link'
        },
        showHeader: {
            type: Boolean,
            default: true
        },
        // SEO
        categoryId: {
            type: String,
            default: ''
        },
        pagination: {
            type: [Boolean, Object],
            default: false
        }
    },
    data() {
        return {
            loadingMore: false,
            category: this.data,
            page: this.pagination,
            query: {
                pageNumber: 1,
                // pageSize: '',
                title: '',
                categoryId: this.categoryId
            }
        };
    },
    computed: {
        emptyType() {
            return this.query.title ? 'search' : 'empty';
        }
    },
    watch: {
        $route({ name }) {
            // this.query = {
            //   ...this.query,
            //   ...query
            // };
            if (name.indexOf('search') === -1) {
                this.getList();
            }
        }
    },
    async mounted() {
        this.query = {
            ...this.query,
            ...this.$route.query,
            title: this.$route.query.keyword
        };
        if (!this.category.length) {
            await this.getCategory();
            this.getList();
        }
    },
    methods: {
        getCategory() {
            return this.$article.category().then(({ data }) => {
                data.unshift({ name: '最新', id: '', loading: true, list: [] });
                this.category = data.map(({ id, name }) => ({
                    id: id.toString(),
                    name,
                    loading: true,
                    list: []
                }));
            });
        },
        getListById(item) {
            const { query } = this;
            const isMore = query.pageNumber > 1;
            if (this.pagination) {
                // console.log('pagination loading ');
            } else if (isMore) {
                this.loadingMore = true;
            } else {
                item.loading = true;
            }
            const { keyword, ...q } = query;
            this.$article
                .list({ ...q, title: keyword })
                .then(({ data: { list, pages, pageNum, total } }) => {
                    if (this.pagination) {
                        item.list = list;
                    } else {
                        item.list = isMore ? item.list.concat(list) : list;
                    }
                    item.pages = pages;
                    item.pageNumber = pageNum;
                    item.total = total;
                    item.loading = false;
                    this.loadingMore = false;
                })
                .catch(() => {
                    item.loading = false;
                    this.loadingMore = false;
                });
        },
        getList() {
            this.query = {
                ...this.query,
                ...this.$route.query
            };
            this.category.map(item => {
                if (item.id === this.query.categoryId) {
                    if (!item.list.length) {
                        this.getListById(item);
                    } else if (this.pagination) {
                        this.getListById(item);
                    } else if (this.query.pageNumber > 1) {
                        this.getListById(item);
                    }
                }
            });
        },
        onSearch() {
            this.query.pageNumber = 1;
            this.getList();
        },
        loadMore(n) {
            if (this.loadingMore) {
                return false;
            }
            this.query.pageNumber = n.pageNumber;
            this.loadingMore = true;
            this.query.pageNumber++;
            this.getList();
        },
        handleChange(key) {
            this.query = {
                ...this.query,
                pageNumber: 1,
                categoryId: key
            };
            this.$router.push({
                name: this.$route.name,
                query: this.$pickBy({ categoryId: key })
            });
        },
        handlePageChange(page) {
            this.query.pageNumber = page;
            this.getList();
        },
        newsPath(n) {
            const query = this.$pickBy({ categoryId: n.id });
            return this.localePath({ name: 'news', query });
        }
    }
};
</script>
<style lang="less" module>
.more {
  padding-top: 12px;
  text-align: center;
  border-top: 1px solid #eeeeee;
  a {
    color: #999999;
    font-size: 14px;
    &:hover {
      color: #f79522;
    }
  }
}
.skeleton {
  :global {
    .ant-skeleton-avatar {
      width: 260px;
      height: 160px;
      border-radius: 0 !important;
    }
  }
}
</style>
