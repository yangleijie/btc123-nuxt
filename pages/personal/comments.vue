<template>
  <section :class="$style.service">
    <PersonalLeft :tab-index="1" />
    <div :class="$style.right">
      <a-tabs :default-active-key="tabsIndex">
        <a-tab-pane v-for="(n, i) in tabs" :key="i + ''" :tab="item">
          <Empty v-if="!list.length" type="empty" />
          <a-list v-if="list.length" :data-source="list">
            <a-list-item slot="renderItem" slot-scope="item">
              <a
                slot="actions"
                style="margin-top: 20px;"
                @click="deleteItem(item.id)"
              >
                {{ $t('user.delete') }}
              </a>
              <a-list-item-meta
                :description="
                  `${item.createTime} ${$t('user.commented')} ${item.content}`
                "
              >
                <a
                  slot="title"
                  :href="
                    localePath({ name: 'news-id', params: { id: item.id } })
                  "
                  target="_blank"
                >
                  <div
                    style="width: 830px;overflow: hidden; text-overflow:ellipsis; white-space:nowrap;"
                  >
                    {{ item.title }}
                  </div>
                </a>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
          <a-pagination
            v-if="list.length"
            v-model="current"
            :default-page-size="size"
            :total="total"
            style="text-align: center;margin-top: 30px;"
            @change="changeSize"
          />
        </a-tab-pane>
      </a-tabs>
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
            list: [],
            busy: false,
            loading: false,
            tabs: [this.$t('user.news')],
            current: 1,
            size: 12,
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
            this.$personal.findArticleComment(params).then(res => {
                if (res.success) {
                    this.list = res.data.list;
                    this.total = res.data.total;
                }
            });
        },
        changeSize: function(val) {
            this.current = val;
            this.getInfo();
        },
        deleteItem(id) {
            const _this = this;
            this.$confirm({
                title: '删除自选',
                content: '你确定要删除该条评论吗？',
                okText: '确定',
                okType: 'danger',
                cancelText: '取消',
                onOk() {
                    _this.$personal.deleteComment({ commentId: id }).then(res => {
                        if (res.success) {
                            _this.getInfo();
                            _this.$message.success('删除成功！');
                        }
                    });
                },
                onCancel() {
                    console.log('Cancel');
                }
            });
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
    .container {
      overflow: auto;
      height: 890px;
    }
  }
}
</style>
