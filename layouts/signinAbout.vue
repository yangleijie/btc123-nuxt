<template>
  <div :class="$style.signin">
    <div :class="$style.header">
      <div :class="$style.container">
        <div>
          <img height="45" src="~assets/img/bosalogo.png" alt="比特币服务" />
          <a-divider type="vertical" />
          <nuxt-link to="/">
            <img height="40" src="~assets/img/123logo.png" alt="比特币资讯" />
          </nuxt-link>
        </div>
      </div>
    </div>

    <div :class="$style.content">
      <div :class="$style.container">
        <nuxt />
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
    min-height: 800px;
    .container {
      width: 1160px;
      padding-top: 70px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
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
  }
}
</style>
