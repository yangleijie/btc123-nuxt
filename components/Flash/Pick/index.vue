<template>
  <div :class="$style.pick">
    <a-card
      :head-style="{ borderTop: '2px solid #F79522' }"
      :bordered="false"
      :title="titleEnum[type]"
    >
      <div v-if="!data.length" :class="$style.skeleton">
        <a-skeleton
          v-for="(item, index) in 4"
          :key="index"
          :paragraph="{ rows: 1 }"
          avatar
        />
      </div>
      <component
        :is="tagName(item.url)"
        v-for="(item, index) in data"
        v-else
        :key="index"
        v-bind="tagProps(item.url)"
        :class="$style.common"
      >
        <div :class="$style.top">
          <img v-lazy="item.imageUrl" alt="比特币项目评级" />
          <div :class="$style.textWrap">
            <div>
              <p>{{ item.name }}</p>
            </div>
            <div :class="$style.grade">
              <p>
                项目评级：
                <span>{{ item.comprehensiveRating }}</span>
              </p>
              <div v-if="item.label" :class="$style.tag">
                <span
                  v-for="(n, i) in item.label.split(',').slice(0, 1)"
                  :key="i"
                >
                  {{ n }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div :class="$style.bottom">
          <div :class="$style.tag">
            <span v-for="(n, i) in item.label.split(',').slice(1)" :key="i">
              {{ n }}
            </span>
          </div>
          <p :class="$style.desc">
            {{ item.summary }}
          </p>
          <!-- 项目方 -->
          <slot v-if="type === 1" :item="item">
            <p>
              团队背景：
              <a-rate
                :default-value="5"
                :count="item.teamBackground"
                disabled
              />
            </p>
            <p>
              技术实力：
              <a-rate
                :default-value="5"
                :count="item.technicalStrength"
                disabled
              />
            </p>
            <p>
              社区热度：
              <a-rate :default-value="5" :count="item.communityHeat" disabled />
            </p>
            <p>
              商业模式：
              <a-rate :default-value="5" :count="item.businessModel" disabled />
            </p>
          </slot>
          <!-- 交易所 -->
          <slot v-if="type === 0" :item="item">
            <p>
              团队背景：
              <a-rate
                :default-value="5"
                :count="item.teamBackground"
                disabled
              />
            </p>
            <p>
              技术实力：
              <a-rate
                :default-value="5"
                :count="item.technicalStrength"
                disabled
              />
            </p>
            <p>
              社区热度：
              <a-rate :default-value="5" :count="item.communityHeat" disabled />
            </p>
            <p>
              交易规模：
              <a-rate
                :default-value="5"
                :count="item.transactionScale"
                disabled
              />
            </p>
          </slot>
          <!-- 严选媒体 -->
          <slot v-if="type === 2" :item="item">
            <p>
              传播度：
              <a-rate :default-value="5" :count="item.spread" disabled />
            </p>
            <p>
              活动策划：
              <a-rate :default-value="5" :count="item.eventPlanning" disabled />
            </p>
            <p>
              活跃度：
              <a-rate :default-value="5" :count="item.activity" disabled />
            </p>
            <p>
              生态资源：
              <a-rate
                :default-value="5"
                :count="item.ecologicalResources"
                disabled
              />
            </p>
          </slot>
          <!-- 严选社群 -->
          <slot v-if="type === 3" :item="item">
            <p>
              粉丝流量：
              <a-rate
                :default-value="5"
                :count="item.vermicelliFlow"
                disabled
              />
            </p>
            <p>
              平台渠道：
              <a-rate
                :default-value="5"
                :count="item.platformChannel"
                disabled
              />
            </p>
            <p>
              实力背景：
              <a-rate
                :default-value="5"
                :count="item.strengthBackground"
                disabled
              />
            </p>
            <p>
              活动效果：
              <a-rate
                :default-value="5"
                :count="item.activityEffect"
                disabled
              />
            </p>
          </slot>
          <!-- 严选KOL -->
          <slot v-if="type === 4" :item="item">
            <p>
              粉丝数量：
              <a-rate :default-value="5" :count="item.fansNumber" disabled />
            </p>
            <p>
              实力背景：
              <a-rate
                :default-value="5"
                :count="item.strengthBackground"
                disabled
              />
            </p>
            <p>
              个人履历：
              <a-rate
                :default-value="5"
                :count="item.personalResume"
                disabled
              />
            </p>
            <p>
              行业资源：
              <a-rate
                :default-value="5"
                :count="item.industryResources"
                disabled
              />
            </p>
          </slot>
        </div>
      </component>
    </a-card>
  </div>
</template>

<script>
export default {
    name: 'RightPick',
    props: {
        pickData: {
            type: Array,
            default: () => []
        },
        type: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            interface: [
                this.$pick.queryStrictPlatform,
                this.$pick.queryStrictProject,
                this.$pick.queryStrictMedia,
                this.$pick.queryStrictCommunity,
                this.$pick.queryStrictIndustry,
                this.$pick.queryStrictPlatformAndProject
            ],
            titleEnum: [
                this.$t('common.featured.platform'),
                this.$t('common.featured.project'),
                this.$t('common.featured.medias'),
                this.$t('common.featured.community'),
                this.$t('common.featured.kol')
            ],
            enum: {
                teamBackground: '团队背景',
                technicalStrength: '技术实力',
                communityHeat: '社区热度',
                transactionScale: '交易规模',
                businessModel: '商业模式',
                spread: '传播度',
                eventPlanning: '活动策划',
                activity: '活跃度',
                ecologicalResources: '生态资源',
                vermicelliFlow: '粉丝流量',
                platformChannel: '平台渠道',
                strengthBackground: '实力背景',
                activityEffect: '活动效果',
                fansNumber: '粉丝数量',
                personalResume: '个人履历',
                industryResources: '行业资源'
            },
            data: this.pickData
        };
    },
    mounted() {
        if (!this.pickData.length) {
            this.fetch();
        }
    },
    methods: {
        fetch() {
            this.interface[this.type]().then(({ data: { list } }) => {
                this.data = list;
            });
        },
        tagName(url) {
            return this.$isUrl(url) ? 'a' : 'div';
        },
        tagProps(url) {
            return this.$isUrl(url)
                ? {
                    href: url,
                    target: '_blank'
                }
                : {};
        }
    }
};
</script>

<style lang="less" module>
.pick {
  .common {
    display: block;
    overflow: hidden;
    border-bottom: 1px solid #eeeeee;
    padding: 20px 0px;
    text-decoration: none;
    .top {
      display: flex;
      > img {
        width: 40px;
        height: 40px;
      }
      .textWrap {
        flex: 1;
        margin-left: 10px;
        height: 40px;
        > div {
          display: flex;
          justify-content: space-between;
          > p {
            font-size: 14px;
            color: #222;
            height: 20px;
            line-height: 20px;
            margin-bottom: 0px;
            font-weight: bold;
            max-width: 150px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .grade {
          font-size: 14px;
          margin-bottom: 0px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          > p {
            color: #999999;
            font-weight: 400;
            > span {
              color: #f79522;
            }
          }
          .tag {
            display: flex;
            height: 20px;
            > span {
              background: #f6f6f6;
              border-radius: 10px;
              font-size: 12px;
              color: #666666;
              padding: 0px 10px;
              margin-left: 10px;
              & ~ span {
                margin-left: 4px;
              }
            }
          }
        }
      }
    }
    .bottom {
      height: 0px;
      overflow: hidden;
      transition: 0.5s ease-out;
      .tag {
        display: flex;
        height: 20px;
        margin-bottom: 20px;
        > span {
          background: #f6f6f6;
          border-radius: 10px;
          font-size: 10px;
          color: #666666;
          padding: 0px 6px;
          & ~ span {
            margin-left: 4px;
          }
        }
      }

      > p {
        font-size: 14px;
        color: #666666;
        text-align: justify;
        display: flex;
        margin: 15px 0px 0px;
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
        &.desc {
          height: 39px;
          line-height: 21px;
          margin-bottom: 20px;
          margin-top: 0px;
          overflow: hidden;
        }
      }
    }
    &:nth-last-of-type(1) {
      border-bottom: none;
    }
    &:hover {
      .bottom {
        padding-top: 20px;
        height: 250px;
      }
    }
  }
  .skeleton {
    padding: 20px 0px;
  }
  :global {
    .ant-card-body {
      padding: 0px 20px;
    }
    .ant-skeleton-title {
      margin-top: 0px !important;
    }
    .ant-skeleton-paragraph {
      margin-top: 10px !important;
    }
    .ant-skeleton-with-avatar ~ .ant-skeleton-with-avatar {
      margin-top: 20px;
    }
  }
}
</style>
