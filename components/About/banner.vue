<template>
  <div :class="$style.about">
    <div :class="$style.banner">
      <div>
        <span :class="$style.title">{{ title }}</span>
        <span :class="$style.subTitle">{{ subTitle }}</span>
      </div>
    </div>
    <div class="content">
      <div :class="$style.contentWrap">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '关于我们'
        },
        subTitle: {
            type: String,
            default: 'ABOUT US'
        }
    }
};
</script>

<style lang="less" module>
.about {
  margin-bottom: 60px;
  .banner {
    width: 100%;
    height: 270px;
    background: url(~assets/img/about.png) center center no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    > div {
      span {
        display: block;
        text-align: center;
      }
    }
    .title {
      color: #101010;
      font-size: 36px;
    }
    .subTitle {
      color: #7e8096;
      font-size: 20px;
    }
  }
  .contentWrap {
    background: #fff;
    margin-top: -40px;
    padding: 40px 60px;
  }
}
</style>
