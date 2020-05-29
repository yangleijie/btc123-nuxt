<template>
  <div :class="$style.copyright">
    <div :class="$style.bd" class="content">
      <div>
        蜀ICP备16030831号-1,Copyright 2015
      </div>
    </div>
  </div>
</template>
<style lang="less" module>
.copyright {
  padding: 12px 0;
  background-color: #f6f6f6;
}
.bd {
  display: flex;
  color: #999999;
  font-size: 14px;
  justify-content: space-between;
}
</style>
