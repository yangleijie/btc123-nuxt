<template>
  <section :class="$style.service">
    <PersonalLeft :tab-index="2" />
    <div :class="$style.right">
      <div :class="$style.title">{{ $t('user.favorite') }}</div>
      <div :class="$style.line" />
      <Empty v-if="!data.length" type="empty" />
      <a-list v-if="data.length" :data-source="data" :class="$style.list">
        <a-list-item slot="renderItem" slot-scope="item">
          <div>
            <img :src="item.picUrl" width="200" height="120" alt="比特币与主流货币" />
            <span
              slot="title"
              style="vertical-align: top;color: #3d464d;font-size: 20px;display: inline-block;width: 690px; margin-left: 10px;"
              href="https://vuecomponent.github.io/ant-design-vue/"
            >
              {{ item.title }}
            </span>
            <div :class="$style.item_time">
              <span>{{ $t('user.time') }} {{ item.createTime }}</span>
              <a
                slot="actions"
                style="float: right;"
                @click="deleteCollect(item)"
              >
                {{ $t('user.delete') }}
              </a>
            </div>
          </div>
        </a-list-item>
      </a-list>
      <div :class="$style.line" />
      <a-pagination
        v-if="data.length"
        v-model="current"
        :default-page-size="size"
        :total="total"
        style="text-align: center;margin-top: 30px;"
        @change="changeSize"
      />
    </div>
  </section>
</template>
<script>
import PersonalLeft from '~/components/PersonalLeft';
import Empty from '~/components/Empty';
export default {
    components: { PersonalLeft, Empty },
    data() {
        return {
            data: [],
            busy: false,
            loading: false,
            tabs: ['资讯', '币种', '交易所'],
            current: 1,
            size: 8,
            total: 1,
            tabsIndex: '0'
        };
    },
    mounted() {
        this.getInfo();
    },
    methods: {
        getInfo: function() {
            const params = {
                pageNumber: this.current,
                pageSize: this.size
            };
            this.$personal.pageByArticleCollect(params).then(
                res => {
                    if (res.success) {
                        this.total = res.data.total;
                        this.data = res.data.list;
                    }
                },
                err => {
                    console.log(err.errorMessage);
                }
            );
        },
        deleteCollect: function(item) {
            const _this = this;
            this.$confirm({
                title: '取消收藏',
                content: '你确定要取消收藏《' + item.title + '》这篇文章吗？',
                okText: '确定',
                okType: 'danger',
                cancelText: '取消',
                onOk() {
                    _this.$personal
                        .deleteByArticleCollect({ articleIds: item.id + '' })
                        .then(
                            res => {
                                if (res.success) {
                                    _this.$message.success('取消收藏成功！');
                                    _this.getInfo();
                                }
                            },
                            err => {
                                console.log(err.errorMessage);
                            }
                        );
                },
                onCancel() {
                    console.log('Cancel');
                }
            });
        },
        changeSize: function(val) {
            this.current = val;
            this.getInfo();
        }
    }
};
</script>
<style lang="less" module>
.service {
  width: 1280px;
  margin: 20px auto;
  .right {
    width: 1000px;
    height: 1100px;
    background-color: #fff;
    margin-left: 20px;
    display: inline-block;
    vertical-align: top;
    padding: 44px;
    color: #333;
    .title {
      font-size: 20px;
      font-weight: bold;
      position: relative;
    }
    .list {
      max-height: 860px;
      overflow: hidden;
    }
    .line {
      width: 100%;
      height: 1px;
      background-color: #eee;
      margin-top: 10px;
    }
    .item_time {
      padding-left: 215px;
      margin-top: -20px;
      color: #999;
      a {
        color: #999;
      }
    }
  }
}
</style>
