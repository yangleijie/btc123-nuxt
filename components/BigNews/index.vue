<template>
  <div>
    <nuxt-link
      v-for="n in dataSource"
      :key="n.id"
      :class="$style.news"
      :to="localePath({ name: 'news-id', params: { id: n.id } })"
    >
      <div :class="$style.icon">
        <span v-if="n.firstBrowse" :class="$style.tv" />
        <img
          v-lazy="n.picUrl"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURUxpcU3H2DoAAAABdFJOUwBA5thmAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg=="
          width="260"
          height="160"
          alt="比特币"
        />
      </div>
      <div :class="$style.content">
        <div>
          <div :class="$style.title">
            <span v-if="n.isStick" :class="$style.stick">置顶</span>
            {{ n.title }}
          </div>
          <div :class="$style.desc">{{ n.summary }}</div>
        </div>
        <div :class="$style.footer">
          <div>{{ n.source }}·{{ n.createTimeLong | timeago }}</div>
          <div>
            <a-icon type="eye" />
            {{ n.browseNum }}
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>
<script>
export default {
    props: {
        dataSource: {
            type: Array,
            default() {
                return [];
            }
        }
    }
};
</script>

<style lang="less" module>
.news {
  position: relative;
  display: flex;
  padding-top: 20px;
  padding-bottom: 20px;
  transition: all 0.5s;
  &:not(:last-child) {
    border-bottom: 1px solid #eeeeee;
  }
  &:hover {
    background-color: #fafafa;
    .title {
      color: #f79522;
    }
    .stick {
      color: white;
      background-color: #e76653;
    }
    img {
      transform: scale(1.05);
    }
  }
}

.icon {
  position: relative;
  flex: 0 0 auto;
  margin-right: 20px;
  overflow: hidden;
  img {
    width: 260px;
    height: 160px;
    display: block;
    transition: all 0.3s;
  }
}

.content {
  flex: 1 1 auto;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.title {
  color: #3d464d;
  font-size: 20px;
  max-height: 64px;
  line-height: 1.5;
  overflow: hidden;
  font-weight: 500;
  transition: all 0.3s;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.desc {
  margin-top: 12px;
  color: #828a92;
  max-height: 60px;
  line-height: 20px;
  font-size: 14px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #999999;
  font-size: 14px;
}
.stick {
  background-color: #fff4e9;
  color: #f79522;
  padding: 0 8px;
  height: 22px;
  line-height: 22px;
  border-radius: 2px;
  font-size: 14px;
  display: inline-block;
  transition: all 0.3s;
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
