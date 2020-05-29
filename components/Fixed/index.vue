<template>
  <div v-if="!isRemove" class="fixed">
    <div class="content">
      <div :class="$style.fixed">
        <div :class="$style.close" @click="isRemove = true" />
        <div :class="[$style.logo, $style.item]">
          <img src="~assets/img/f/link-e@2x.png" />
          <div>
            <div :class="$style.name">LINK-E</div>
            <div :class="$style.desc">链圈、币圈社交新方式！</div>
          </div>
        </div>
        <div :class="[$style.app, $style.item]">
          <img src="~assets/img/f/linke@2x.png" />
          <div>
            <a
              class="ant-btn ant-btn-default"
              href="https://testflight.apple.com/join/0CRfrq2U"
              target="_blank"
              rel="nofollow"
            >
              <img src="~assets/img/f/iPhone@2x.png" />
              iPhone 下载
            </a>
            <a
              class="ant-btn ant-btn-default"
              href="https://link-e-pro.oss-cn-beijing.aliyuncs.com/Tchat_online_enc_signed_Aligned.apk"
              target="_blank"
              rel="nofollow"
            >
              <img src="~assets/img/f/Android@2x.png" />
              Android 下载
            </a>
          </div>
        </div>
        <div :class="$style.item">
          <img
            :class="$style.bless"
            width="200"
            src="~assets/img/f/bless@2x.png"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name: 'Fixed',
    data() {
        return {
            isRemove: false
        };
    }
};
</script>
<style lang="less" module>
.fixed {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  .item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.bless {
  position: absolute;
  bottom: 10px;
  // right: 24px;
}
.close {
  position: absolute;
  right: 0;
  top: 16px;
  width: 24px;
  height: 24px;
  background-image: url(~assets/img/f/close.png);
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
}
.app {
  img {
    width: 70px;
    height: 70px;
    margin-right: 16px;
  }
  a {
    display: flex;
    width: 140px;
    align-items: center;
    border-radius: 16px;
    line-height: 28px;
    height: 28px;
    img {
      width: 20px;
      height: auto;
    }
    + a {
      margin-top: 12px;
    }
  }
}
.logo {
  img {
    width: 70px;
    height: 70px;
    margin-right: 16px;
  }
  .name {
    font-size: 30px;
    color: white;
    line-height: 1;
    margin-bottom: 12px;
  }
  .desc {
    color: white;
    font-size: 18px;
    line-height: 1;
  }
}
</style>
<style lang="less">
.fixed {
  position: fixed;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 20;
  left: 0;
  bottom: 0;
  right: 0;
  + .ant-layout-footer {
    padding-bottom: 100px;
  }
}
</style>
