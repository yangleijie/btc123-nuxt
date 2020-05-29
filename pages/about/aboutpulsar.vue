<template>
  <div :class="$style.aboutPulsar">
    <h2>什么是波霎通行证</h2>
    <p>
      波霎通行证是波霎推出的区块链行业跨平台、跨应用的统一身份认证系统。采用OAUTH2.0认证技术，在所接入的第三方应用中，实现通过（账号+密码/账号+验证码）完成登录、通过手机/邮箱/
      谷歌多重安全验证完成身份授权。避免在各类应用中反复注册、认证（kyc），避免重复记忆众多账号密码，交易所级别的安全等级防护，高效保护账户安全。
    </p>
    <p>
      波霎成立于2018年，专注于区块链底层技术研究与开发。波霎涵盖了共链研究开发、智能合约研究开发、技术扶持、超级课堂等多元区块链底层服务，致力于打造区块链技术一站式生态体系，引领行业发展未来。
    </p>
    <div :class="$style.logoWrap">
      <div>
        <p><IconFont type="icon-anquan1" /></p>
        <div>
          <p>
            安全
            <span>safety</span>
          </p>
          <p>帐号保护神器</p>
        </div>
      </div>
      <div>
        <p><IconFont type="icon-rocket" /></p>
        <div>
          <p>
            快捷
            <span>Faster</span>
          </p>
          <p>一站式帐号管家</p>
        </div>
      </div>
      <div>
        <p><IconFont type="icon-zuzhi" /></p>
        <div>
          <p>
            通用
            <span>General</span>
          </p>
          <p>跨平台跨应用整合</p>
        </div>
      </div>
      <div>
        <p><IconFont type="icon-hangye" /></p>
        <div>
          <p>
            专业
            <span>Professional</span>
          </p>
          <p>深耕区块链行业</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    layout: 'signinAbout'
};
</script>

<style lang="less" module>
.aboutPulsar {
  > h2 {
    color: #222222;
    font-size: 20px;
    font-weight: 400;
    text-align: center;
  }
  > p {
    font-size: 14px;
    color: #666666;
    margin-top: 50px;
    line-height: 28px;
    text-align: justify;
  }
  .logoWrap {
    width: 900px;
    margin: 50px auto 0px;
    height: 47px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    > div {
      width: 193px;
      height: 47px;
      display: flex;
      > p {
        width: 47px;
        height: 47px;
        background: #4899ef;
        border-radius: 50%;
        text-align: center;
        line-height: 57px;
        > i {
          color: #fff;
          font-size: 26px;
        }
      }
      > div {
        margin-left: 13px;
        > p {
          margin: 0px;
        }
        > p:nth-of-type(1) {
          margin-top: 0px;
          font-weight: bold;
          font-size: 20px;
          > span {
            font-size: 14px;
            color: #4d4d4d;
            font-weight: normal;
            margin-left: 6px;
          }
        }
        > p:nth-of-type(2) {
          font-size: 14px;
          color: rgba(77, 77, 77, 1);
        }
      }
    }
    > div:nth-of-type(2) {
      > p {
        background: #28c8e0;
      }
    }
    > div:nth-of-type(3) {
      > p {
        background: #84d464;
      }
    }
    > div:nth-of-type(4) {
      > p {
        background: #dfcd36;
      }
    }
  }
}
</style>
