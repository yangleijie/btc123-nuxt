<template>
  <div class="personal_left">
    <div class="head">
      <div class="head_bg">
        <img
          v-if="loggedUser.headPic"
          v-lazy="loggedUser.headPic"
          width="84"
          height="84"
          alt="btc交易"
        />
        <img
          v-if="!loggedUser.headPic"
          src="~assets/img/default_head.png"
          width="84"
          height="84"
          alt="btc推广"
        />
      </div>
      <div class="name">{{ loggedUser.nickName }}</div>
    </div>
    <ul>
      <li
        v-for="(item, i) in menu"
        :key="i"
        :style="
          menuIndex == i
            ? 'color: #101010; font-weight: bold; background-color: #fafafa;'
            : ''
        "
        @click="checkMenu(i)"
      >
        <icon-font :type="icons[i]" />
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    props: { tabIndex: { type: Number, default: 0 } },
    data() {
        return {
            user: {},
            menu: [
                this.$t('menu.income'),
                this.$t('menu.comment'),
                this.$t('menu.favorite'),
                this.$t('menu.optional'),
                this.$t('menu.security')
            ],
            icons: [
                'icon-qianbao',
                'icon-pinglun',
                'icon-shoucang',
                'icon-jia',
                'icon-gerenzhongxinkaobei'
            ],
            urls: [
                this.localePath('personal'),
                this.localePath('personal-comments'),
                this.localePath('personal-collection'),
                this.localePath('personal-optional'),
                this.localePath('personal-info')
            ],
            menuIndex: 0
        };
    },
    computed: {
        ...mapGetters(['loggedUser'])
    },
    mounted() {
        this.menuIndex = this.tabIndex;
    },
    methods: {
        checkMenu: function(i) {
            this.menuIndex = i;
            this.$router.push(this.urls[i]);
        }
    }
};
</script>

<style scoped lang="less">
.personal_left {
  width: 250px;
  height: 1100px;
  display: inline-block;
  vertical-align: top;
  background-color: #fff;
  .head {
    width: 250px;
    height: 220px;
    color: #333;
    text-align: center;
  }
  .head_bg {
    width: 84px;
    height: 84px;
    position: relative;
    top: 36px;
    margin: auto;
    overflow: hidden;
    border-radius: 42px;
  }
  .name {
    font-size: 24px;
    height: 50px;
    line-height: 54px;
    position: relative;
    top: 36px;
  }
  .mobile {
    font-size: 18px;
    position: relative;
    top: 34px;
  }
  ul {
    padding: 0;
    list-style: none;
    width: 210px;
    li {
      width: 250px;
      height: 46px;
      line-height: 46px;
      text-align: center;
      font-size: 14px;
      color: #333;
      cursor: pointer;
      img {
        margin-left: 25px;
        vertical-align: middle;
        margin-right: 10px;
        margin-top: -3px;
      }
      &:hover {
        color: #333;
        background-color: #fafafa;
      }
    }
    .active {
      width: 3px;
      float: left;
      height: 59px;
      background: -webkit-linear-gradient(#ff9000, #fe5134);
    }
  }
}
</style>
