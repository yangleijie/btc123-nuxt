<template>
  <div class="content">
    <div :class="$style.header"
      v-bind="{ lang: $i18n.locale }">
      <a-menu v-model="current"
        mode="horizontal">
        <a-menu-item key="logo"
          :class="$style.logo"
          disabled>
          <h1 title="BTC123">
            <span>比特币(BTC)123</span>
            <nuxt-link :to="localePath('index')">
              <img src="~assets/img/logo.png"
                alt="独家比特币" />
            </nuxt-link>
          </h1>
        </a-menu-item>
        <a-menu-item key="/">
          <nuxt-link :to="localePath('index')">
            {{ $t('menu.home') }}
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="currency">
          <nuxt-link :to="localePath('currency-index')">
            {{ $t('menu.currency') }}
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="exchange">
          <nuxt-link :to="localePath('exchange')">
            {{ $t('menu.exchange') }}
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="news">
          <nuxt-link :to="localePath('news')">
            {{ $t('menu.news') }}
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="flash">
          <nuxt-link :to="localePath('flash')">
            {{ $t('menu.flash') }}
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="activity">
          <nuxt-link :to="localePath('activity')">
            {{ $t('menu.activity') }}
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="nav">
          <a href="https://www.bitsg.com/"
            target="_blank"
            rel="nofollow"
            @click.stop>
            {{ $t('menu.nav') }}
          </a>
        </a-menu-item>
      </a-menu>
      <div :class="$style.right">
        <ul class="ant-menu ant-menu-horizontal">
          <li :class="actived('search')"
            role="menuitem">
            <nuxt-link :to="localePath({ name: 'search', query: $pickBy({ type }) })">
              <img src="~assets/img/search.png"
                alt="btc123交易" />
              {{ $t('menu.search') }}
            </nuxt-link>
          </li>
          <li :class="actived('service')"
            role="menuitem">
            <nuxt-link :to="localePath('service')">
              <img src="~assets/img/diamond.png"
                alt="比特币btc买卖" />
              {{ $t('menu.service') }}
            </nuxt-link>
          </li>
          <li :class="actived('download')"
            role="menuitem">
            <nuxt-link :to="localePath('download')">
              <img src="~assets/img/app.png"
                alt="bitebiokcoin" />
              APP
            </nuxt-link>
          </li>
          <li role="menuitem"
            class="ant-menu-item">
            <a-dropdown :trigger="['click']">
              <a :href="switchLocalePath($i18n.locale)">
                <img src="~assets/img/lang.png"
                  alt="OKcoin" />
                {{ locale.name }}
                <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item v-for="n in $i18n.locales"
                  :key="n.code">
                  <nuxt-link :to="switchLocalePath(n.code)">
                    {{ n.name }}
                  </nuxt-link>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </li>
          <li v-if="!loggedUser"
            role="menuitem"
            class="ant-menu-item">
            <nuxt-link :to="
                localePath({
                  name: 'signin',
                  query: { redirect_uri: $route.fullPath }
                })
              ">
              <img src="~assets/img/signin.png"
                alt="bitcoin" />
              {{ $t('menu.signin') }}
            </nuxt-link>
          </li>
          <li v-if="!loggedUser"
            class="ant-menu-item"
            style="margin-left: 0;">
            <a-divider type="vertical" />
          </li>
          <li v-if="!loggedUser"
            role="menuitem"
            class="ant-menu-item"
            style="margin-left: 0;">
            <nuxt-link to="/signin">{{ $t('menu.signup') }}</nuxt-link>
          </li>
          <li v-if="loggedUser"
            :class="$style.user"
            role="menuitem"
            class="ant-menu-item">
            <a-dropdown :trigger="['click']">
              <a href="javascript:;"
                rel="nofollow">
                <img v-lazy="loggedUser.headPic"
                  width="90"
                  height="90"
                  alt="okcoin交易" />
              </a>
              <a-menu slot="overlay"
                @click="handleSelect">
                <a-menu-item>
                  <nuxt-link :to="localePath('personal')">
                    {{ $t('menu.income') }}
                  </nuxt-link>
                </a-menu-item>
                <a-menu-item>
                  <nuxt-link :to="localePath('personal-comments')">
                    {{ $t('menu.comment') }}
                  </nuxt-link>
                </a-menu-item>
                <a-menu-item>
                  <nuxt-link :to="localePath('personal-collection')">
                    {{ $t('menu.favorite') }}
                  </nuxt-link>
                </a-menu-item>
                <a-menu-item>
                  <nuxt-link :to="localePath('personal-optional')">
                    {{ $t('menu.optional') }}
                  </nuxt-link>
                </a-menu-item>
                <a-menu-item>
                  <nuxt-link :to="localePath('personal-info')">
                    {{ $t('menu.security') }}
                  </nuxt-link>
                </a-menu-item>

                <a-menu-item key="logout">{{ $t('menu.logout') }}</a-menu-item>
              </a-menu>
            </a-dropdown>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            current: ['/'],
            type: ''
        };
    },
    computed: {
        ...mapGetters(['loggedUser']),
        locale() {
            const { locales, locale } = this.$i18n;
            let currentLocale = {};
            locales.map(item => {
                if (item.code === locale) {
                    currentLocale = item;
                }
            });
            return currentLocale;
        }
    },
    watch: {
        $route() {
            this.setDefaultActive();
        }
    },
    mounted() {
        this.setDefaultActive();
    },
    methods: {
        actived(key) {
            return {
                'ant-menu-item': true,
                'ant-menu-item-selected': key === this.current[0]
            };
        },
        handleSelect({ key }) {
            if (key === 'logout') {
                this.logout();
            }
        },
        logout() {
            this.$store.commit('setLoggedUser', null);
            this.$message.success('退出成功');
        },
        setDefaultActive() {
            const { path, query } = this.$route;
            const { locale } = this.$i18n;
            const parentPath = path.split('/')[locale === 'cn' ? 1 : 2] || '/';
            const types = ['currency', 'exchange', 'news', 'flash'];
            this.type = types.includes(parentPath) ? parentPath : query.type;
            this.current = [parentPath];
        }
    }
};
</script>

<style lang="less" module>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    :global {
        .ant-menu-horizontal {
            line-height: 62px;
            border-bottom: none;
            .ant-menu {
                &-item {
                    padding-left: 0;
                    padding-right: 0;
                    &-selected,
                    &-active {
                        color: #101010;
                        a {
                            color: #101010;
                        }
                    }
                }
            }
            .ant-menu-submenu + .ant-menu-item {
                margin-right: 16px;
            }
        }
    }
    &[lang='cn'] {
        :global {
            .ant-menu-horizontal {
                .ant-menu-submenu + .ant-menu-item {
                    margin-right: 32px;
                }
            }
        }
        .right {
            :global {
                .ant-menu-item {
                    & + .ant-menu-item {
                        margin-left: 24px;
                    }
                }
            }
        }
    }
}
.logo {
    margin-right: 40px !important;
    cursor: pointer;
    h1 {
        position: relative;
        margin-bottom: 0;
        span {
            position: absolute;
            top: -9999px;
        }
        a {
            display: block;
        }
    }
    img {
        max-width: 130px;
        // height: 30px;
    }
}
.right {
    :global {
        .anticon {
            margin-right: 0 !important;
        }
        .ant-menu-item {
            &:hover {
                color: #101010 !important;
                // border-color: transparent !important;
            }
            & + .ant-menu-item {
                margin-left: 16px;
            }
            a {
                &:hover {
                    color: #101010 !important;
                }
            }
            img {
                width: 20px;
                height: auto;
                vertical-align: middle;
                margin-right: 6px;
                margin-top: -2px;
            }
        }
    }
}
.signin {
    border-color: transparent !important;
    a {
        color: rgba(0, 0, 0, 0.65);
        &:focus {
            text-decoration: none;
        }
    }
}
.user {
    img {
        width: 20px;
        height: 20px;
        overflow: hidden;
        border-radius: 100%;
    }
}
</style>
