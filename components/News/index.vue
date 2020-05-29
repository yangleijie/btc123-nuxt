<template>
  <div>
    <component
      :is="tagName(n)"
      v-for="(n, i) in dataSource"
      :key="n.id"
      v-bind="tagProps(n)"
      :class="{ [$style.news]: true, [$style['news-small']]: size === 'small' }"
      @click="clickAd(n)"
    >
      <div :class="$style.pos">
        <span
          v-if="n.mining || n.firstBrowse"
          :class="{ [$style.tv]: true, [$style.next]: i }"
        />
        <div v-if="label && !i" :class="$style.label">{{ label }}</div>
        <div v-if="sortOrder && i" :class="$style.order">{{ i + 1 }}</div>
      </div>
      <div :class="$style.icon">
        <img
          v-lazy="n.picUrl"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURUxpcU3H2DoAAAABdFJOUwBA5thmAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg=="
          alt="比特币btc123推荐"
        />
      </div>
      <div :class="$style.content">
        <div :class="$style.title">{{ n.title }}</div>
        <div v-if="n.createTimeLong" :class="$style.datetime">
          {{ n.createTimeLong | timeago }}
        </div>
      </div>
    </component>
  </div>
</template>
<script>
export default {
    props: {
        size: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: '推荐'
        },
        sortOrder: {
            type: Boolean,
            default: true
        },
        dataSource: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    methods: {
        tagName({ url }) {
            if (url) {
                return this.$isUrl(url) ? 'a' : 'nuxt-link';
            } else {
                return 'nuxt-link';
            }
        },
        tagProps({ url, id }) {
            let props = { target: '_blank', href: url };
            if (url) {
                if (!this.$isUrl(url)) {
                    props = {
                        to: this.localePath({ name: 'news-id', params: { id } })
                    };
                }
            } else {
                props = {
                    to: this.localePath({ name: 'news-id', params: { id } })
                };
            }
            props = {
                ...props,
                rel: 'nofollow'
            };
            return props;
        }
    }
};
</script>

<style lang="less" module>
.news {
  position: relative;
  display: flex;
  align-items: flex-start;
  padding-top: 10px;
  padding-bottom: 10px;
  transition: all 0.3s;
  &:hover {
    background-color: #fafafa;
    .title {
      color: #f79522;
    }
    img {
      transform: scale(1.05);
    }
  }
  &:first-child {
    flex-direction: column;
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 10px;
    margin-bottom: 10px;
    .icon {
      margin-right: 0;
      width: 100%;
      img {
        width: 100%;
        height: 180px;
      }
    }
    .content {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.6);
      padding: 10px;
    }
    .title {
      color: white;
      height: 22px;
      -webkit-line-clamp: 1;
    }
    .datetime {
      display: none;
    }
  }
  &-small {
    .title {
      font-size: 14px;
      font-weight: 400;
    }
  }
}
.pos {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  display: flex;
}
.label,
.order {
  background-color: #e76653;
  padding-left: 8px;
  padding-right: 8px;
  height: 22px;
  line-height: 22px;
  color: white;
  font-size: 14px;
  z-index: 2;
  display: inline-block;
}
.order {
  margin-top: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 1px 6px;
}
.icon {
  position: relative;
  flex: 0 0 auto;
  margin-right: 10px;
  overflow: hidden;
  img {
    width: 100px;
    height: 80px;
    display: block;
    transition: all 0.5s;
  }
}

.tv {
  width: 40px;
  height: 22px;
  background: rgba(247, 149, 34, 1);
  z-index: 1;
  background-image: url(~assets/img/tv.png);
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 28px;
  display: inline-block;
  margin-right: 6px;
  &.next {
    margin-top: 10px;
    width: 30px;
    height: 22px;
    background-size: 22px;
    margin-right: 2px;
  }
}

.content {
  flex: 1 1 auto;
  min-width: 0;
}
.title {
  color: #3d464d;
  font-size: 20px;
  font-weight: 500;
  height: 60px;
  line-height: 20px;
  overflow: hidden;
  transition: all 0.3s;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.datetime {
  color: #999999;
  font-size: 14px;
}
</style>
