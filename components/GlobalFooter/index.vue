<template>
  <div :class="$style.footer">
    <div :class="$style.menu">
      <div class="content">
        <a-menu v-model="current" mode="horizontal">
          <a-menu-item key="logo" :class="$style.logo" disabled>
            <div>
              <nuxt-link :to="localePath('index', $i18n.locale)">
                <img src="~assets/img/logo.png" alt="比特币,交易,btc123" />
              </nuxt-link>
            </div>
          </a-menu-item>
          <a-menu-item key="about">
            <nuxt-link :to="localePath('about')">
              {{ $t('menu.about') }}
            </nuxt-link>
          </a-menu-item>
          <a-menu-item key="contact">
            <nuxt-link :to="localePath('about-contact')">
              {{ $t('menu.contact') }}
            </nuxt-link>
          </a-menu-item>
          <a-menu-item key="feedback">
            <nuxt-link :to="localePath('about-feedback')">
              {{ $t('menu.feedback') }}
            </nuxt-link>
          </a-menu-item>
          <a-menu-item key="copyright">
            <nuxt-link :to="localePath('about-copyright')">
              {{ $t('menu.copyright') }}
            </nuxt-link>
          </a-menu-item>
          <!-- <a-menu-item key="api">
            <nuxt-link to="/api">API</nuxt-link>
          </a-menu-item> -->
        </a-menu>
        <div :class="$style.share">
          <a-popover :class="$style.item" placement="topRight" title="QQ交流群">
            <template slot="content">
              <div :class="$style.qrcode">
                <img v-lazy="qqma" alt="比特币交流群" />
                <div>
                  BTC123官方②群
                </div>
              </div>
              <div :class="$style.qrcode">
                <img v-lazy="qqma2" alt="钛值社区群" />
                <div>
                  钛值Ti-Value社区①群
                </div>
              </div>
            </template>
            <a-icon :class="$style.icon" type="qq" />
          </a-popover>
          <a-popover
            :class="$style.item"
            title="微信公众号/钛妹"
            placement="topRight"
          >
            <template slot="content">
              <div :class="$style.qrcode">
                <img v-lazy="wxma" alt="钛妹" />
                <div>
                  微信公众号
                </div>
              </div>
              <div :class="$style.qrcode">
                <img v-lazy="wxma2" alt="比特币微信公众号" />
                <div>
                  钛妹微信
                </div>
              </div>
            </template>
            <a-icon :class="$style.icon" type="wechat" />
          </a-popover>
          <a
            :class="$style.item"
            href="https://weibo.com/btc123"
            target="_blank"
          >
            <a-icon :class="$style.icon" type="weibo" />
          </a>
          <!-- <div :class="$style.item">
            <icon-font
              :class="$style.icon"
              type="icon-facebook"
            />
          </div>
          <div :class="$style.item">
            <a-icon
              :class="$style.icon"
              type="twitter"
            />
          </div> -->
        </div>
      </div>
    </div>
    <FooterNav />
    <Copyright />
  </div>
</template>
<script>
import FooterNav from './nav';
import Copyright from './copyright';
export default {
    components: { FooterNav, Copyright },
    data() {
        return {
            current: [],
            qqma: require('~/assets/img/qqma.png'),
            qqma2: require('~/assets/img/tvqqqrcode.jpg'),
            wxma: require('~/assets/img/wechatma.jpg'),
            wxma2: require('~/assets/img/tvqrcode.jpeg')
        };
    }
};
</script>

<style lang="less" module>
.menu {
  border-bottom: 1px solid #eeeeee;
  padding-top: 16px;
  padding-bottom: 16px;
  margin-bottom: 16px;
  :global {
    .content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .ant-menu-horizontal {
      border-bottom: none;
      .ant-menu {
        &-item {
          padding-left: 0;
          padding-right: 0;
          border-bottom: none;
        }
      }
      .ant-menu-submenu + .ant-menu-item {
        margin-right: 40px;
      }
    }
  }
}
.qrcode {
  display: inline-block;
  text-align: center;
  &:not(:first-child) {
    border-left: 1px solid #e8e8e8;
    margin-left: 8px;
    padding-left: 8px;
  }
  img {
    width: 140px;
    height: 140px;
  }
}
.logo {
  margin-right: 40px !important;
  cursor: pointer;
  padding-left: 0;
  padding-right: 0;
  a {
    display: block;
  }
  img {
    max-width: 130px;
    // height: 30px;
  }
}
.share {
  display: flex;
  .item {
    width: 30px;
    height: 30px;
    background-color: #cccccc;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background-color: #f79522;
    }
    & + .item {
      margin-left: 20px;
    }
  }
  img {
    height: 20px;
  }
  .icon {
    color: white;
    font-size: 20px;
  }
}
</style>
