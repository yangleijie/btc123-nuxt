<template>
  <div :class="$style.signin">
    <div :class="$style.header">
      <div :class="$style.container">
        <div>
          <img height="45" src="~assets/img/bosalogo.png" alt="比特币科技" />
          <a-divider type="vertical" />
          <nuxt-link to="/">
            <img height="40" src="~assets/img/123logo.png" alt="比特币认准网" />
          </nuxt-link>
        </div>
        <nuxt-link
          :class="$style.about"
          to="/about/aboutpulsar"
          target="_blank"
        >
          什么是波霎通行证
        </nuxt-link>
      </div>
    </div>

    <div :class="$style.content">
      <div :class="$style.container">
        <div :class="[$style.left, 'hideInAbout']">
          <img
            :class="$style.one"
            src="~assets/img/slogan.png"
            width="359px"
            alt="比特币活动"
          />
          <p :class="$style.two">安全快速实现第三方登录认证授权</p>
          <img
            :class="$style.three"
            width="700px"
            src="~assets/img/altostack.png"
            alt="比特币安全"
          />
        </div>
        <div :class="[$style.right, 'hideInAbout']">
          <nuxt />
        </div>
      </div>
    </div>

    <div :class="$style.footer">
      蜀ICP备16030831号-1,CopyRight 2015
    </div>
  </div>
</template>
<script>
export default {
    head: {
        script: [
            {
                src: '/gt.js'
            }
        ]
    }
};
</script>

<style lang="less" module>
.signin {
  width: 100%;
  display: flex;
  flex-direction: column;
  .header {
    height: 80px;
    background: #222222;
    .container {
      width: 1200px;
      margin: 0 auto;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .about {
        color: #fff;
        font-size: 16px;
      }
    }
  }
  .content {
    height: 834px;
    .container {
      width: 1160px;
      padding-top: 70px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .left {
        .one,
        .two {
          margin-left: 65px;
        }
        .two {
          font-size: 16px;
          color: #222222;
        }
        .one {
          margin-bottom: 12px;
        }
      }
    }
  }
  .footer {
    height: 46px;
    background: #fafafa;
    text-align: center;
    line-height: 46px;
    color: #666;
  }
  :global {
    .ant-divider-vertical {
      margin: 0px 30px;
      height: 23px;
      background: #505050;
    }
    .ant-btn-primary {
      background: #007aff !important;
      border-color: #007aff !important;
    }
    .ant-input:focus,
    .ant-input:hover {
      border: none;
      border: 1px solid #007aff !important;
      box-shadow: none;
    }
    .ant-tabs-ink-bar-animated {
      background-color: #007aff !important;
    }
    button[ant-click-animating-without-extra-node]:after {
      border: 0 none;
      opacity: 0;
      animation: none 0 ease 0 1 normal;
    }
    // 1
    // 下拉国家等样式
    .select-btn {
      position: absolute;
      z-index: 99;
      width: 73px;
      left: 0px;
      top: -11px;
      text-align: center;
      font-size: 14px;
      color: #222;
      cursor: pointer;
      > i {
        transition: 0.3s;
        display: inline-block;
        font-size: 10px;
        transform: rotateZ(0deg);
      }
      &.spread {
        > i {
          transform: rotateZ(90deg);
        }
      }
    }
    .pd-53 {
      padding-left: 73px;
      transition: none;
    }
    // 下拉国家的菜单
    .select-menu-wrap {
      position: absolute;
      box-sizing: border-box;
      top: 40px;
      width: 297px;
      height: 315px;
      z-index: 100;
      background: #fff;
      box-shadow: 0px 3px 10px 0px rgba(184, 218, 242, 0.4);
      padding: 24px 10px 24px 19px;
      .select-menu-content {
        width: 100%;
        height: 100%;
        overflow: auto;
        &::-webkit-scrollbar {
          width: 8px;
        }
        &::-webkit-scrollbar-thumb {
          /*滚动条里面小方块*/
          border-radius: 10px;
          box-shadow: inset 0 0 5px #999999;
          background: #535353;
        }
        &::-webkit-scrollbar-track {
          /*滚动条里面轨道*/
          box-shadow: inset 0 0 5px #eeeeee;
          border-radius: 10px;
          background: #ededed;
        }
        > ul {
          > li {
            cursor: pointer;
            color: #666666;
            font-size: 14px;
            transition: color 0.3s;
            &:hover {
              color: #007aff;
            }
          }
          > li.active {
            color: #007aff;
          }
        }
      }
    }
    // 发送验证码的按钮样式
    .new_send_btn {
      position: absolute;
      cursor: pointer;
      height: 20px;
      right: 17px;
      top: -11px;
      > button {
        background: #fff !important;
        color: #007aff;
        padding: 0px 10px;
        line-height: 14px;
        height: 14px;
        border: none;
        border-left: 1px solid #efefef !important;
        border-radius: 0px;
      }
      > button[disabled='disabled'] {
        color: #c8e2ff;
        &:hover {
          color: #c8e2ff !important;
        }
      }
    }

    // y
    .ant-card-head {
      padding: 0px;
      .ant-tabs-nav-scroll {
        display: flex;
        justify-content: center;
      }
    }
    .ant-card-body {
      padding: 40px 40px 30px;
    }
    .ant-tabs-nav .ant-tabs-tab {
      margin: 0 52px 0 0;
    }
    .ant-input-lg {
      font-size: 14px;
    }
  }
  input:-webkit-autofill {
    box-shadow: 0 0 0px 1000px white inset;
  }
}
</style>
