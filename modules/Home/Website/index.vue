<template>
  <a-card :bordered="false"
    :class="$style.tj"
    :title="$t('text.site')">
    <span slot="extra"
      style="color: #999999;">{{ $t('text.from') }}：B91</span>
    <a-spin :spinning="spinning"
      :tip="$t('text.loading')">
      <div v-for="n in data"
        :key="n.id"
        :class="$style.block">
        <div :class="$style.header">
          <div :class="$style.title">{{ n.categoryName }}</div>
          <!-- <a
            :class="$style.more"
            href="http://www.b91.com/classification"
            target="_blank"
            rel="nofollow"
          >
            {{ $t('text.more') }}
            <a-icon :style="{ fontSize: '12px' }" type="double-right" />
          </a> -->
        </div>
        <a-row :gutter="12">
          <a-col v-for="item in n.advertProjectFrontDtoList"
            :key="item.id"
            :span="4">
            <a :class="$style.site"
              :href="item.url"
              target="_blank"
              rel="nofollow">
              <img v-lazy="item.logo"
                alt="比特币买卖" />
              <span>{{ item.projectName }}</span>
            </a>
          </a-col>
        </a-row>
      </div>
    </a-spin>
  </a-card>
</template>
<script>
export default {
    data() {
        return {
            spinning: true,
            data: []
        };
    },
    mounted() {
        this.fetch();
    },
    methods: {
        fetch() {
            this.spinning = true;
            this.$advert
                .navList()
                .then(({ data }) => {
                    this.data = data;
                    this.spinning = false;
                })
                .catch(() => {
                    this.spinning = false;
                });
        }
    }
};
</script>

<style lang="less" module>
.tj {
    :global {
        .ant-spin-spinning {
            display: block;
        }
    }
}
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding: 10px 0;
    .title {
        color: #333333;
        font-weight: 500;
    }
    .more {
        color: #999999;
        display: flex;
        align-items: center;
        &:hover {
            color: #f79522;
        }
    }
}
.site {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #fafafa;
    margin: 6px 0;
    transition: all 0.3s;
    &:hover {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.09);
    }
    img {
        width: 16px;
        height: 16px;
        margin-right: 8px;
    }
    span {
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #333333;
    }
}
</style>
