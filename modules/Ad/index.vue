<template>
  <div v-if="!isEmpty" :class="$style.ad">
    <div :class="$style.label">广告</div>
    <a-skeleton
      :title="false"
      :paragraph="false"
      :loading="loading"
      :class="$style.skeleton"
      active
      avatar
    >
      <Swiper :data-source="data" height="200px" />
    </a-skeleton>
  </div>
</template>
<script>
import Swiper from '~/components/Swiper';
export default {
    components: { Swiper },
    props: {
        positionId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            loading: false,
            isEmpty: false,
            data: []
        };
    },
    mounted() {
        this.getAdvertByPos();
    },
    methods: {
        getAdvertByPos() {
            const { positionId } = this;
            this.loading = true;
            this.$advert
                .advertList({ positionId })
                .then(({ data }) => {
                    this.data = data.map(item => ({
                        src: this.$oss(item.path, 330, 200),
                        href: item.url,
                        ...item
                    }));
                    this.loading = false;
                    this.isEmpty = !data.length;
                })
                .catch(() => {
                    this.loading = false;
                });
        }
    }
};
</script>

<style lang="less" module>
.ad {
  position: relative;
  height: 200px;
  &:not(:first-child) {
    margin-top: 20px;
  }
  :global {
    .swiper-slide {
      border-radius: 0 !important;
    }
  }
  .label {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 40px;
    height: 20px;
    line-height: 20px;
    background: rgba(0, 0, 0, 0.2);
    text-align: center;
    color: white;
    font-size: 12px;
    z-index: 10;
  }
}
.skeleton {
  :global {
    .ant-skeleton-header {
      padding-right: 0;
    }
    .ant-skeleton-avatar {
      width: 100%;
      height: 200px;
      border-radius: 0 !important;
    }
  }
}
</style>
