<template>
    <div :class="$style.download">
        <div :class="$style.one">
            <div :class="$style.textwrap">
                <div :class="$style.title">LINK-E</div>
                <div :class="$style.desc">链圈、币圈社交新方式！</div>
                <div :class="$style.summary">
                    LINK-E，专注提供区块行业全方位资讯，打造多功能社交互动场景，创新支持Token在线购物，了解、掌握、玩转区块链从这里开始。
                </div>
                <div :class="$style.download">
                    <img
                        width="126"
                        src="~assets/img/f/linke@2x.png"
                        alt="比特币社区"
                    />
                    <div>
                        <a
                            href="https://testflight.apple.com/join/0CRfrq2U"
                            target="_blank"
                        >
                            <a-icon type="apple" theme="filled" />iphone下载
                        </a>
                        <a
                            href="https://link-e-pro.oss-cn-beijing.aliyuncs.com/Tchat_online_enc_signed_Aligned.apk"
                            target="_blank"
                        >
                            <a-icon type="android" theme="filled" />Android下载
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div :class="$style.two"></div>
        <div :class="$style.three"></div>
        <div :class="$style.four"></div>
    </div>
</template>
<script>
import { Modal } from 'ant-design-vue';
export default {
    methods: {
        download(event) {
            if (/MicroMessenger(.*)/.test(navigator.userAgent)) {
                event.preventDefault();
                Modal.warning({ content: '请使用默认浏览器打开' });
            }
        }
    }
};
</script>

<style lang="less" module>
.download {
    width: 100%;
    > div {
        height: 700px;
        background-size: cover;
    }
    .one {
        height: 880px;
        background: url(~assets/img/appdownload/1.png) center center no-repeat;
        .textwrap {
            width: 320px;
            display: flex;
            flex-direction: column;
            padding-top: 170px;
            transition: 0.3s;
            margin-left: 19%;
            @media screen and(max-width: 1560px) {
                margin-left: 14%;
            }
            @media screen and(max-width: 1388px) {
                margin-left: 10%;
            }
            .title {
                font-size: 100px;
                color: #333333;
            }
            .desc {
                font-size: 26px;
                color: #333;
                margin-bottom: 30px;
                margin-top: 20px;
            }
            .summary {
                color: #333333;
                font-size: 16px;
            }
            .download {
                margin-top: 90px;
                display: flex;
                height: 126px;
                > div {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    margin-left: 15px;
                    a {
                        width: 187px;
                        height: 49px;
                        background: rgba(255, 255, 255, 1);
                        border: 1px solid rgba(238, 238, 238, 1);
                        border-radius: 25px;
                        line-height: 49px;
                        padding-left: 29px;
                        color: #333;
                        font-size: 18px;
                        text-decoration: none;
                        :global {
                            .anticon svg {
                                margin-right: 5px;
                            }
                        }
                    }
                }
            }
        }
    }
    .two {
        background: url(~assets/img/appdownload/2.png) center center no-repeat;
    }
    .three {
        background: url(~assets/img/appdownload/3.png) center center no-repeat;
    }
    .four {
        background: url(~assets/img/appdownload/4.png) center center no-repeat;
    }
}
</style>
