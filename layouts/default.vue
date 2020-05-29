<template>
    <a-layout :class="$style.layout">
        <a-affix>
            <a-layout-header :class="$style.wrapper">
                <GlobalHeader />
            </a-layout-header>
        </a-affix>
        <a-layout-content>
            <a-modal
                v-model="visible"
                :footer="null"
                :mask="false"
                :mask-closable="false"
                :after-close="handleAfterClose"
                :wrap-class-name="$style.upgrade"
                style="top: 10vw;"
            >
                <img
                    width="100%"
                    src="~assets/img/f/upgrade@2x.png"
                    alt="BITEBI交易"
                />
            </a-modal>
            <nuxt />
            <div :class="$style.fixed">
                <div :class="$style.item">
                    <a-popover title="QQ交流群" placement="left">
                        <template slot="content">
                            <div :class="$style.qrcode">
                                <img
                                    src="~assets/img/qqma.png"
                                    alt="BITEBI交易"
                                />
                                <div>
                                    BTC123官方②群
                                </div>
                            </div>
                            <div :class="$style.qrcode">
                                <img
                                    src="~assets/img/tvqqqrcode.jpg"
                                    alt="BTC123"
                                />
                                <div>
                                    钛值Ti-Value社区①群
                                </div>
                            </div>
                        </template>
                        <a-icon type="qq" />
                    </a-popover>
                </div>
                <div :class="$style.item">
                    <a-popover title="微信公众号/钛妹" placement="left">
                        <template slot="content">
                            <div :class="$style.qrcode">
                                <img
                                    src="~assets/img/wechatma.jpg"
                                    alt="BITEBIBTC"
                                />
                                <div>
                                    微信公众号
                                </div>
                            </div>
                            <div :class="$style.qrcode">
                                <img
                                    src="~assets/img/tvqrcode.jpeg"
                                    alt="BITEBI123"
                                />
                                <div>
                                    钛妹微信
                                </div>
                            </div>
                        </template>
                        <a-icon type="wechat" />
                    </a-popover>
                </div>
                <a-back-top :class="$style.back" />
            </div>
        </a-layout-content>
        <FixedBottom />
        <a-layout-footer>
            <GlobalFooter />
        </a-layout-footer>
    </a-layout>
</template>
<script>
import { mapGetters } from 'vuex';
import GlobalHeader from '~/components/GlobalHeader';
import GlobalFooter from '~/components/GlobalFooter';
import FixedBottom from '~/components/Fixed';
export default {
    components: { GlobalHeader, GlobalFooter, FixedBottom },
    data() {
        return {
            visible: false
        };
    },
    computed: {
        ...mapGetters(['isUpgrade'])
    },
    mounted() {
        this.$nextTick(() => {
            this.visible = this.isUpgrade;
        });
    },
    methods: {
        handleAfterClose() {
            this.$store.commit('setUpgrade', false);
        }
    }
};
</script>

<style lang="less" module>
.upgrade {
    :global {
        .ant-modal-content {
            background-color: transparent;
            border-radius: 20px;
        }
        .ant-modal-body {
            padding: 0;
            img {
                margin-top: -70px;
            }
        }
        .ant-modal-close {
            right: -10px;
            top: -30px;
            color: white;
        }
    }
}
.layout {
    min-height: 100%;
    min-width: 1230px;
}
.wrapper {
    position: relative;
    z-index: 20;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
}
.fixed {
    position: fixed;
    top: 50%;
    right: 0;
}
.item {
    width: 36px;
    height: 36px;
    background-color: rgba(0, 0, 0, 0.15);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
        background-color: #f79522;
    }
    &:not(:first-child) {
        margin-top: 1px;
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
.back {
    position: static;
    width: 36px;
    height: 36px;
    margin-top: 1px;
    :global {
        .ant-back-top {
            &-content {
                background-color: rgba(0, 0, 0, 0.15);
                border-radius: 0;
                width: 36px;
                height: 36px;
                display: flex;
                justify-content: center;
                align-items: center;
                &:hover {
                    background-color: #f79522;
                }
            }
            &-icon {
                margin: 0;
            }
        }
    }
}
</style>

<style>
#__btc,
#__layout {
    height: 100%;
}
.content {
    width: 1230px;
    margin-right: auto;
    margin-left: auto;
    padding-left: 16px;
    padding-right: 16px;
}
.ant-layout-content {
    min-height: auto;
}
</style>
