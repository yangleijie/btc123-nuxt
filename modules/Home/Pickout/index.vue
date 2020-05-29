<template>
  <a-card
    :bordered="false"
    :body-style="{ padding: `${!list.length ? 4 : 1}0px 20px` }"
    :title="$t('home.featured.title')"
  >
    <template slot="extra">
      <a-radio-group
        v-model="current"
        :class="$style['radio-group']"
        button-style="solid"
      >
        <a-radio-button
          v-for="(v, k) in types"
          :key="k"
          :value="k"
          :class="$style.radio"
        >
          {{ v }}
        </a-radio-button>
      </a-radio-group>
    </template>
    <a-spin :spinning="loading" tip="加载中...">
      <a-row :gutter="16">
        <a-col v-for="n in list" :key="n.id" :span="6" :class="$style.col">
          <a-card :class="$style.pick" :body-style="{ padding: 0 }" hoverable>
            <a
              :class="$style.item"
              :href="n.url"
              rel="nofollow"
              target="_blank"
            >
              <div
                :key="n.imageUrl"
                v-lazy:background-image="n.imageUrl"
                :class="$style.cover"
                width="140"
                height="140"
              />
              <div :class="$style.project">
                <div :class="$style.logo">
                  <img
                    :key="n.imageUrl"
                    v-lazy="n.imageUrl"
                    width="80"
                    height="80"
                    alt="比特币行情"
                  />
                </div>
                <div :class="$style.span">
                  <div :class="$style.name">{{ n.name }}</div>
                  <div :class="$style.level">
                    项目评级：
                    <span>{{ n.comprehensiveRating }}</span>
                  </div>
                </div>
              </div>
              <div v-if="n.label" :class="$style.tags">
                <a-tag
                  v-for="tag in tags(n.label)"
                  :key="`${n.id}-${tag}`"
                  :class="$style.tag"
                >
                  {{ tag }}
                </a-tag>
              </div>
              <div :class="$style.desc">
                {{ n.summary }}
              </div>
              <div
                v-for="item in raty"
                :key="`${n.id}-${item.label}`"
                :class="$style.rate"
              >
                <div>{{ item.label }}：</div>
                <a-rate
                  :default-value="n[item.key]"
                  :count="n[item.key]"
                  disabled
                />
              </div>
            </a>
          </a-card>
        </a-col>
      </a-row>
      <div v-if="list.length" :class="$style.more">
        <a v-if="query.pageNumber < pages" @click="loadMore()">
          <a-spin v-if="loadingMore" size="small" />
          {{ loadingMore ? $t('text.loading') : $t('text.more') }}
        </a>
        <span v-else>{{ $t('text.nomore') }}~(⊙o⊙)</span>
      </div>
    </a-spin>
    <Empty
      v-if="!loading && !list.length"
      :text="`暂无${types[current]}相关数据(⊙o⊙)~`"
    />
  </a-card>
</template>
<script>
import Empty from '~/components/Empty';
export default {
    components: { Empty },
    data() {
        return {
            loading: false,
            loadingMore: false,
            pages: 0,
            list: [],
            query: {
                pageNumber: 1,
                pageSize: 12
            },
            current: '1',
            types: {
                '1': this.$t('home.featured.platform'),
                '2': this.$t('home.featured.project'),
                '3': this.$t('home.featured.medias'),
                '4': this.$t('home.featured.community'),
                '5': this.$t('home.featured.kol')
            },
            ratySelect: {
                1: [
                    { label: '团队背景', key: 'teamBackground' },
                    { label: '技术实力', key: 'technicalStrength' },
                    { label: '社区热度', key: 'communityHeat' },
                    { label: '交易规模', key: 'transactionScale' }
                ],
                2: [
                    { label: '团队背景', key: 'teamBackground' },
                    { label: '技术实力', key: 'technicalStrength' },
                    { label: '社区热度', key: 'communityHeat' },
                    { label: '商业模式', key: 'businessModel' }
                ],
                3: [
                    { label: '传播度', key: 'spread' },
                    { label: '活动策划', key: 'eventPlanning' },
                    { label: '活跃度', key: 'activity' },
                    { label: '生态资源', key: 'ecologicalResources' }
                ],
                4: [
                    { label: '粉丝流量', key: 'vermicelliFlow' },
                    { label: '平台渠道', key: 'platformChannel' },
                    { label: '实力背景', key: 'strengthBackground' },
                    { label: '活动效果', key: 'activityEffect' }
                ],
                5: [
                    { label: '粉丝数量', key: 'fansNumber' },
                    { label: '实力背景', key: 'strengthBackground' },
                    { label: '个人履历', key: 'personalResume' },
                    { label: '行业资源', key: 'industryResources' }
                ]
            }
        };
    },
    computed: {
        raty() {
            return this.ratySelect[this.current];
        }
    },
    watch: {
        current() {
            this.$nextTick(() => {
                this.query.pageNumber = 1;
                this.fetch();
            });
        }
    },
    mounted() {
        this.fetch();
    },
    methods: {
        tags(label = []) {
            return label.split(',');
        },
        handleChange(page, pageSize) {
            this.query = { ...this.query, pageNumber: page, pageSize };
            this.fetch();
        },
        fetch() {
            const actions = {
                1: 'queryStrictPlatform',
                2: 'queryStrictProject',
                3: 'queryStrictMedia',
                4: 'queryStrictCommunity',
                5: 'queryStrictIndustry'
            };
            const action = actions[this.current];
            const { query } = this;
            const isMore = query.pageNumber > 1;
            if (isMore) {
                this.loadingMore = true;
            } else {
                this.loading = true;
            }
            this.$pick[action](query)
                .then(({ data: { list, pages, pageNum } }) => {
                    this.list = isMore ? this.list.concat(list) : list;
                    this.pages = pages;
                    this.loading = false;
                    this.loadingMore = false;
                    this.query = {
                        ...this.query,
                        pageNumber: pageNum
                    };
                })
                .catch(() => {
                    this.loading = false;
                    this.loadingMore = false;
                });
        },
        loadMore() {
            if (this.loadingMore) {
                return false;
            }
            this.loadingMore = true;
            this.query.pageNumber++;
            this.fetch();
        }
    }
};
</script>

<style lang="less" module>
.col {
  padding: 10px 0;
}
.pick {
  height: 274px;
  overflow: hidden;
}

.item {
  position: relative;
  display: block;
  padding: 16px;
  height: 274px;
  &:hover {
    .cover {
      height: 0;
      transform: scale(0);
      margin-bottom: 0;
    }
    .logo {
      display: block;
    }
    .level {
      padding-bottom: 0;
    }
    .tags {
      display: none;
    }
  }
}
.project {
  display: flex;
  align-items: center;
  .span {
    flex: 1 1 auto;
    min-width: 0;
  }
}

.logo {
  width: 40px;
  height: 40px;
  display: none;
  margin-right: 10px;
  flex: 0 0 auto;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.cover {
  height: 140px;
  background-repeat: no-repeat;
  background-size: 100px;
  background-position: 50%;
  transition: all 0.3s;
  margin-bottom: 20px;
  img {
    width: 100%;
    height: 100%;
  }
}

.name {
  color: #222222;
  font-weight: 500;
  font-size: 14px;
  line-height: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  position: relative;
  top: 0;
}
.level {
  position: relative;
  top: 0;
  color: #999999;
  font-size: 12px;
  padding-top: 12px;
  line-height: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  span {
    color: #f79522;
  }
}

.radio-group {
  background-color: #f6f6f6;
  border-radius: 18px;
  :global {
    .ant-radio-button-wrapper {
      border: none;
      color: #999999;
      border-radius: 18px;
      background-color: transparent;
      &::before {
        display: none;
      }
      &:hover {
        color: #f79522;
      }
    }
  }
}
.tags {
  height: 44px;
}
.tag {
  background: #f6f6f6;
  border-radius: 10px;
  height: 20px;
  line-height: 20px;
  font-size: 10px;
  color: #666666;
  padding: 0 8px;
  margin-right: 6px;
  margin-top: 6px;
  border: none;
}
.desc {
  font-size: 14px;
  line-height: 22px;
  color: #666666;
  height: 66px;
  overflow: hidden;
  margin-top: 16px;
  margin-bottom: 16px;
}
.rate {
  font-size: 14px;
  color: #999999;
  display: flex;
  align-items: center;
  & + & {
    margin-top: 8px;
  }
  :global {
    .ant-rate {
      font-size: 14px;
      &-star {
        margin-right: 2px;
      }
    }
    .anticon svg {
      color: #f79522;
    }
  }
}
.more {
  border-top: 1px solid #eeeeee;
  margin-top: 12px;
  padding-top: 12px;
  text-align: center;
  a {
    color: #999999;
    &:hover {
      color: #f79522;
    }
  }
}
</style>
