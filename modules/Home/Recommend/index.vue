<template>
  <a-card
    v-if="data.length"
    :bordered="false"
    :head-style="{ borderTop: '2px solid #F79522' }"
    :title="$t('text.rcmd')"
    :class="$style.header"
  >
    <span slot="extra" style="color: #999999;">{{ $t('text.from') }}：B91</span>
    <a-row>
      <a-col v-for="n in data" :key="n.id" :class="$style.col">
        <a :class="$style.item" :href="n.url" target="_blank" rel="nofollow">
          <span class="ant-avatar ant-avatar-circle ant-avatar-image">
            <img v-lazy="n.path" alt="比特币市场" />
          </span>
          <div>
            <div :class="$style.name">{{ n.title }}</div>
            <div :class="$style.label">{{ n.remark || n.title }}</div>
          </div>
        </a>
      </a-col>
    </a-row>
  </a-card>
</template>
<script>
export default {
    data() {
        return {
            data: []
        };
    },
    mounted() {
        this.fetch();
    },
    methods: {
        fetch() {
            this.$advert
                .project({ positionId: 10, pageSize: 12 })
                .then(({ data }) => {
                    // console.log(data);
                    this.data = data;
                });
        }
    }
};
</script>
<style lang="less" module>
.item {
  display: flex;
  // flex-direction: column;
  align-items: center;
  padding: 16px 8px;
  span {
    flex: 0 0 auto;
    margin-right: 8px;
    border-radius: 4px;
  }
  > div {
    flex: 1 1 auto;
  }
}
.name {
  color: #333333;
  font-size: 14px;
  font-weight: 500;
  margin: 10px 0;
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
}
.label {
  border-radius: 16px;
  // background-color: #f6f6f6;
  color: #666666;
  font-size: 10px;
  // padding: 4px 0;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
}
.col {
  border: 1px solid #ededed;
  margin-bottom: 16px;
  transition: all 0.3s;
  &:hover {
    border-color: rgb(247, 149, 34);
  }
  &:last-child {
    margin-bottom: 0;
  }
}
.header {
  :global {
    .ant-card-head-wrapper {
      border-bottom: 0;
    }
  }
}
</style>
