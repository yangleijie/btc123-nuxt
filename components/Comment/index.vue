<template>
  <a-card :bordered="false" :class="$style.comment" :title="$t('text.comment')">
    <a-spin :spinning="posting" tip="正在拼命说话...">
      <div :class="$style.input">
        <a-textarea
          v-model="value"
          :rows="6"
          :placeholder="$t('news.detail.something')"
          maxlength="200"
        />
        <div v-if="loggedUser" :class="$style.action">
          <div :class="$style.label">{{ $t('common.comment.tips') }}</div>
          <a-button type="primary" @click="handleComment()">
            {{ $t('common.comment.submit') }}
          </a-button>
        </div>
        <div v-else :class="$style.action">
          <div :class="$style.label">
            {{ $t('common.please') }}
            <span>
              <nuxt-link
                :to="
                  localePath({
                    name: 'signin',
                    query: { redirect_uri: $route.fullPath }
                  })
                "
              >
                {{ $t('menu.signin') }}
              </nuxt-link>
              /
              <nuxt-link :to="localePath({ name: 'signin' })">
                {{ $t('menu.signup') }}
              </nuxt-link>
            </span>
            {{ $t('common.for') }}
          </div>
        </div>
      </div>
    </a-spin>
    <a-skeleton
      :paragraph="{ rows: 4 }"
      :loading="visible"
      avatar
      active
      style="margin-top: 16px;"
    >
      <div>
        <div v-for="n in dataSource" :key="n.id" :class="$style.item">
          <div :class="$style.icon">
            <img v-lazy="n.userLogo" alt="比特币" />
          </div>
          <div :class="$style.content">
            <div :class="$style.title">
              <div>
                <span :class="$style.name">{{ n.nickName }}</span>
                <span :class="$style.date">{{ n.createTime | timeago }}</span>
              </div>
              <a rel="nofollow" @click="handleReply(n)">
                {{
                  n.replying
                    ? $t('common.comment.collapse')
                    : $t('common.comment.reply')
                }}
              </a>
            </div>
            <div :class="$style.text">
              {{ n.content }}
            </div>
            <div v-if="n.replying" :class="$style['reply-input']">
              <a-input-search
                :read-only="item.loading"
                :placeholder="$t('news.detail.something')"
                @search="handleComment($event, n.id)"
              >
                <a-button
                  slot="enterButton"
                  :disabled="item.loading"
                  :loading="item.loading"
                  type="primary"
                >
                  {{ $t('common.comment.reply') }}
                </a-button>
              </a-input-search>
            </div>
            <div
              v-for="val in n.articleCommentDtos"
              :key="val.id"
              :class="$style.content"
            >
              <div :class="$style.title">
                <div>
                  <span :class="$style.name">{{ val.nickName }}</span>
                  <span :class="$style.date">
                    {{ val.createTime | timeago }}
                  </span>
                </div>
                <a @click="handleReply(val)">
                  {{
                    val.replying
                      ? $t('common.comment.collapse')
                      : $t('common.comment.reply')
                  }}
                </a>
              </div>
              <div :class="$style.text">
                <span v-if="val.replayName" :class="$style.reply">
                  {{ $t('common.comment.reply') }}{{ val.replayName }}
                </span>
                {{ val.content }}
              </div>
              <div v-if="val.replying" :class="$style['reply-input']">
                <a-input-search
                  :read-only="val.loading"
                  :placeholder="$t('news.detail.something')"
                  @search="handleComment($event, val.id)"
                >
                  <a-button
                    slot="enterButton"
                    :disabled="val.loading"
                    :loading="val.loading"
                    type="primary"
                  >
                    {{
                      val.loading
                        ? $t('common.comment.replying')
                        : $t('common.comment.reply')
                    }}
                  </a-button>
                </a-input-search>
              </div>
            </div>
          </div>
        </div>
        <Empty v-if="!dataSource.length" type="comment" />
        <a-pagination
          v-if="total > pageSize"
          :total="total"
          :class="$style.pagination"
          size="small"
          @change="handlePageChange"
        />
      </div>
    </a-skeleton>
  </a-card>
</template>
<script>
import { mapGetters } from 'vuex';
import Empty from '~/components/Empty';
export default {
    components: { Empty },
    props: {
        dataSource: {
            type: Array,
            default() {
                return [];
            }
        },
        loading: {
            type: Boolean,
            default: false
        },
        total: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 10
        }
    },
    data() {
        return {
            item: {},
            visible: this.loading,
            value: '',
            commented: false,
            posting: false
        };
    },
    computed: {
        ...mapGetters(['loggedUser'])
    },
    watch: {
        loading(v) {
            this.visible = v;
            if (this.dataSource.length) {
                this.visible = false;
            }
        }
    },
    methods: {
        handleReply(item) {
            if (!this.loggedUser) {
                this.$message.error('请登录后再回复评论');
                return false;
            }
            this.$set(item, 'replying', !item.replying);
            this.$set(item, 'loading', false);
            this.item = item;
        },
        handleComment(value, parentId) {
            if (!this.loggedUser) {
                this.$message.error('请登录后再评论');
                return false;
            }
            const val = value || this.value;
            if (!val) {
                this.$message.warning(
                    `请输入${value !== undefined ? '回复' : '评论'}内容`
                );
                return false;
            }
            if (!parentId) {
                this.posting = true;
            } else {
                this.item.loading = true;
            }
            this.$emit('comment', val, parentId);
        },
        hideLoading(parentId) {
            if (!parentId) {
                this.posting = false;
            } else {
                this.item.loading = false;
            }
        },
        clearInput() {
            this.value = '';
        },
        handlePageChange(current, size) {
            this.$emit('page-change', current, size);
        }
    }
};
</script>
<style lang="less" module>
.comment {
  &:not(:first-child) {
    margin-top: 20px;
  }
}
.input {
  position: relative;
  transition: all 0.3s;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  &:hover {
    border-color: #ffb24d;
    .action {
      border-color: #ffb24d;
    }
  }
  &:focus-within {
    border-color: #ffb24d;
    outline: 0;
    box-shadow: 0 0 0 2px rgba(247, 149, 34, 0.2);
    .action {
      border-color: #ffb24d;
    }
  }
  :global {
    .ant-input {
      margin-bottom: 48px;
      border: none;
      resize: none;
      &:focus {
        box-shadow: none;
      }
    }
  }
}
.action {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 44px;
  display: flex;
  padding: 0 10px;
  justify-content: space-between;
  align-items: center;
  background-color: #f6f6f6;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top: 1px solid #d9d9d9;
  transition: all 0.3s;
}
.label {
  color: #666666;
  font-size: 14px;
  span {
    margin: 0 4px;
    color: #101010;
  }
  a {
    color: #101010;
    &:hover {
      color: #f79522;
    }
  }
}
.item {
  display: flex;
  padding: 20px 0;
  &:not(:last-child) {
    border-bottom: 1px solid #eeeeee;
  }
}
.content {
  flex: 1 1 auto;
  &:not(:first-child) {
    margin-left: 12px;
  }
  .content {
    margin-left: 0;
    background-color: #fafafa;
    padding: 12px 16px;
    &:not(:last-child) {
      border-bottom: 1px solid #eeeeee;
    }
    .text {
      padding-bottom: 0;
    }
    .reply-input {
      margin-top: 16px;
    }
  }
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.name {
  color: #333333;
  font-size: 14px;
}
.reply {
  margin-right: 10px;
  &-input {
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }
}
.reply,
.date {
  color: #cccccc;
  font-size: 14px;
  &:not(:first-child) {
    margin-left: 10px;
  }
}
.icon {
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 100%;
  flex: 0 0 auto;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.text {
  padding: 10px 0;
  line-height: 24px;
  font-size: 14px;
  color: #666666;
}
.pagination {
  padding-top: 20px;
  padding-bottom: 10px;
  text-align: center;
}
</style>
