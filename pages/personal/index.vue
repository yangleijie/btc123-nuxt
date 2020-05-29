<template>
  <section :class="$style.service">
    <PersonalLeft :tab-index="0" />
    <div :class="$style.right">
      <div :class="$style.title">{{ $t('menu.income') }}</div>
      <div :class="$style.line" />
      <div :class="$style.wallet">
        <div :class="$style.num">{{ info.availableBalance }}</div>
        <div :class="$style.btn" @click="visible = true">
          {{ $t('user.transfer') }}
        </div>
        <div :class="$style.num_text">
          <div :class="$style.text">
            {{ $t('user.activeReward') }}（TV）：
            <span>{{ info.rewardAmount }}</span>
          </div>
          <div :class="$style.text">
            {{ $t('user.interest') }}（TV）：
            <span>{{ info.balanceAnnualized }}</span>
          </div>
        </div>
      </div>
      <div :class="$style.line" />
      <div style="margin-top: 40px;">{{ $t('user.latestReward') }}（TV）</div>
      <div :class="$style.new_num">{{ info.newReward }}</div>
      <div :class="$style.title">
        {{ $t('menu.income') }}
        <div :class="$style.title_right" @click="openStatus">
          {{ status[dataType] }}
          <img
            :style="statusOpen ? 'transform: rotate(180deg);' : ''"
            src="~assets/img/personal/more.png"
            width="11"
            height="7"
            alt="获取比特币"
          />
        </div>
        <ul :style="statusOpen ? 'opacity: 1;z-index: 1;' : ''">
          <li
            v-for="(item, i) in status"
            :key="i"
            :style="dataType == i ? 'color: #ff9000;font-weight: bold;' : ''"
            @click="changeStatu(i)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div :class="$style.line" />
      <Empty v-if="!list.length" type="empty" />
      <a-table
        v-if="list.length"
        :columns="columns"
        :data-source="list"
        :pagination="pagination"
        :loading="loading"
        style="color: #666;"
      >
        <span slot="serviceType" slot-scope="serviceType">
          {{ serviceTypes[serviceType] }}
        </span>
      </a-table>
      <div v-if="visible" :class="$style.modal">
        <div :class="$style.title">{{ $t('user.transfer') }}</div>
        <a-icon
          type="close"
          style="position: absolute;right: 20px;top: 20px;cursor: pointer;"
          @click="visible = false"
        />
        <img src="~assets/img/personal/q_code.png" width="200" height="200" />
        <div style="margin-top: 20px;">{{ $t('user.linke') }}</div>
      </div>
    </div>
  </section>
</template>
<script>
import PersonalLeft from '~/components/PersonalLeft';
import Empty from '~/components/Empty';
import dayjs from 'dayjs';

const formater = 'YYYY-MM-DD';
const today = dayjs().format(formater);
const yesterday = dayjs()
    .subtract(1, 'day')
    .format(formater);
const week = dayjs()
    .subtract(1, 'week')
    .format(formater);
const month = dayjs()
    .subtract(1, 'month')
    .format(formater);
const lastMonth = dayjs()
    .subtract(3, 'month')
    .format(formater);
const dateList = ['', today, yesterday, week, month, lastMonth];

export default {
    components: {
        PersonalLeft,
        Empty
    },
    data() {
        return {
            userId: '',
            info: {
                availableBalance: 0, // 可用余额
                rewardAmount: 0, // 活跃
                balanceAnnualized: 0, // 余额年化利息
                newReward: 0 // 最新奖励
            },
            userWalletId: '',
            list: [],
            status: [
                this.$t('user.all'),
                this.$t('user.today'),
                this.$t('user.yesterday'),
                this.$t('user.week'),
                this.$t('user.month'),
                this.$t('user.lastMonth')
            ],
            serviceTypes: {
                1: '提现',
                2: '充值',
                3: '邀请好友',
                4: '手续费',
                5: '登录',
                6: '邀请服务商',
                7: '阅读文章',
                8: '评论文章',
                9: '分享文章',
                10: '打赏',
                11: '发红包',
                12: '抢红包',
                13: '空投',
                14: '活动奖励',
                15: '余额年化收益',
                16: '购物',
                17: '创建圈子',
                18: '进入圈子',
                19: '溯源扫一扫奖励',
                20: '溯源抽奖',
                21: '发布动态',
                22: '红包过期',
                23: '锁定年化收益',
                24: '广告挖矿',
                25: '加入圈子',
                26: '邀请入圈',
                27: '日常签到',
                28: '红包任务平台运营费',
                29: '快讯分享',
                30: '红包任务平台运营费退款'
            },
            dataType: 0,
            statusOpen: false,
            columns: [
                {
                    title: this.$t('user.type'),
                    dataIndex: 'serviceType',
                    scopedSlots: { customRender: 'serviceType' }
                },
                {
                    title: this.$t('user.time'),
                    dataIndex: 'createTime',
                    key: 'createTime'
                },
                {
                    title: this.$t('user.amount'),
                    dataIndex: 'amount',
                    key: 'amount'
                }
            ],
            loading: false,
            visible: false,
            pagination: {
                defaultCurrent: 1,
                defaultPageSize: 8
            },
            startTime: '',
            endTime: ''
        };
    },
    mounted() {
        this.userId = this.$store.getters.loggedUser.id;
        this.getInfo();
    },
    methods: {
        getInfo: function() {
            const params = {
                userId: this.userId,
                platformCode: 'link-e',
                currencyCodes: 'TV'
            };
            this.$personal.findUserWalletByUserId(params).then(
                res => {
                    if (res.success) {
                        this.info = res.data[0];
                        this.userWalletId = res.data[0].id;
                        this.getList();
                    }
                },
                err => {
                    console.log(err.errorMessage);
                }
            );
        },
        getList: function() {
            const params = {
                page: this.pagination.defaultCurrent,
                size: this.pagination.defaultPageSize,
                userWalletId: this.userWalletId,
                startTime: this.startTime,
                endTime: this.endTime
            };
            this.$personal.userBillPageListByParam(params).then(
                res => {
                    if (res.success) {
                        this.list = res.data.list;
                    }
                },
                err => {
                    console.log(err.errorMessage);
                }
            );
        },
        openStatus: function() {
            if (this.statusOpen) this.statusOpen = false;
            else this.statusOpen = true;
        },
        changeStatu: function(i) {
            this.dataType = i;
            this.statusOpen = false;
            this.endTime = i === 0 ? '' : today;
            this.startTime = dateList[i];
            this.getList();
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
      .title_right {
        float: right;
        font-size: 14px;
        cursor: pointer;
        margin-top: 8px;
        img {
          vertical-align: center;
          margin-left: 4px;
          transition: all 0.5s ease 0s;
          transform: rotate(0deg);
          transform-origin: 50% 50%;
        }
      }
      ul {
        padding: 0;
        list-style: none;
        width: 222px;
        height: auto;
        background-color: #fff;
        box-shadow: 4px 0 10px rgba(207, 207, 207, 0.4);
        position: absolute;
        right: 0;
        transition: all 0.2s ease 0s;
        opacity: 0;
        z-index: -1;
        font-size: 14px;
        font-weight: normal;
        li {
          width: 222px;
          padding-left: 30px;
          height: 60px;
          line-height: 58px;
          text-align: left;
          cursor: pointer;
          &:hover {
            background-color: #efefef;
          }
        }
      }
    }
    .line {
      width: 100%;
      height: 1px;
      background-color: #eee;
      margin-top: 10px;
    }
    .wallet {
      width: 100%;
      height: 200px;
      .num {
        font-size: 48px;
        font-weight: bold;
        display: inline-block;
        height: 100px;
        line-height: 150px;
      }
      .btn {
        width: 90px;
        height: 38px;
        border-radius: 20px;
        text-align: center;
        line-height: 38px;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        background-color: #f79522;
        display: inline-block;
        margin-left: 20px;
        vertical-align: bottom;
        margin-bottom: 4px;
      }
      .num_text {
        margin-top: 30px;
        .text {
          display: inline-block;
          &:last-child {
            margin-left: 100px;
          }
          span {
            font-size: 16px;
            font-weight: bold;
          }
        }
      }
    }
    .new_num {
      font-size: 30px;
      color: #ff6012;
      height: 80px;
      font-weight: bold;
    }
    .modal {
      position: absolute;
      left: 50%;
      margin-left: -200px;
      top: 300px;
      width: 400px;
      height: 370px;
      background: #fff;
      box-shadow: 0 0 10px 0 rgba(207, 207, 207, 0.4);
      border-radius: 8px;
      color: #666;
      z-index: 100;
      text-align: center;
      .title {
        color: #4d4d4d;
        font-size: 18px;
        padding: 40px 0 10px;
      }
    }
  }
}
</style>
