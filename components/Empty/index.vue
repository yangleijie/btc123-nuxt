<template>
  <div :class="$style.empty">
    <img :src="types[type].icon"  alt="比特币" />
    <div :class="$style.text">
      {{ text || types[type].text }}
    </div>
  </div>
</template>
<script>
const types = {
    empty: {
        icon: require('~/assets/img/empty.png'),
        text: '暂无数据(⊙o⊙)'
    },
    comment: {
        icon: require('~/assets/img/empty_comment.png'),
        text: '还没有评论，说点什么吧~'
    },
    favorites: {
        icon: require('~/assets/img/empty_favorites.png'),
        text: '你还没有收藏过资讯，快去收藏吧~'
    },
    search: {
        icon: require('~/assets/img/empty_search.png'),
        text: '什么也没有，换一个词语试试吧~'
    }
};
export default {
    props: {
        type: {
            type: String,
            default: 'empty'
        },
        text: {
            type: String,
            default: ''
        }
    },
    data() {
        return { types };
    }
};
</script>

<style lang="less" module>
.empty {
  padding: 24px;
  text-align: center;
  img {
    width: 230px;
    height: 230px;
  }
}
.text {
  color: #999999;
  font-size: 14px;
}
</style>
