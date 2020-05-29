<template
    ><div :class="$style.gqWrap">
        <section class="content">
            <!-- <img :class="$style.gqimg" src="~assets/img/gq70_t.png" alt="" /> -->
            <div v-if="exchangeAdData.length">
                <ExchangeAd :data-source="exchangeAdData" />
            </div>
            <div :class="$style.layout">
                <div :class="$style.main">
                    <!-- 交易所 -->
                    <div v-if="mergeData.length">
                        <Exchange :data-source="mergeData" />
                    </div>
                    <!-- 轮播 -->
                    <div :class="$style.layout">
                        <div :class="$style.main">
                            <div :class="$style['swiper-wrap']">
                                <Swiper
                                    :data-source="swiperData"
                                    height="340px"
                                />
                            </div>
                        </div>
                        <div :class="$style.right" style="width: 260px;">
                            <a
                                v-for="n in coverData"
                                :key="n.id"
                                :class="$style.cover"
                                :href="n.url"
                                target="_blank"
                                rel="nofollow"
                                @click="clickAd(n)"
                            >
                                <span v-if="n.mining" :class="$style.tv" />
                                <img
                                    :src="$oss(n.path, 260, 160)"
                                    alt="比特币交易"
                                />
                                <span :class="$style.text">{{ n.title }}</span>
                            </a>
                        </div>
                    </div>
                    <!-- 新闻 -->
                    <!-- <lazy-component class="card"> -->
                    <NewsList :data="newsData" :category-id="categoryId" />
                    <!-- </lazy-component> -->
                    <!-- 严选 -->
                    <lazy-component class="card">
                        <Pickout />
                    </lazy-component>
                    <!-- 网址导航 -->
                    <lazy-component class="card">
                        <Website />
                    </lazy-component>
                </div>
                <div :class="$style.right">
                    <!-- 热门行情 -->
                    <Market
                        v-if="marketData.length"
                        :data-source="marketData"
                    />
                    <!-- AD -->
                    <Ad position-id="3" />
                    <!-- 热门关键字 -->
                    <Keyword v-if="keyword.length" :data="keyword" />
                    <lazy-component class="card">
                        <!-- 快讯 -->
                        <SmallFlash :type="2" :title="`7x24H ${$t('brief')}`" />
                    </lazy-component>
                    <lazy-component class="card">
                        <!-- 推荐 -->
                        <Recommend />
                    </lazy-component>
                    <Ad position-id="6" />
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import Market from '~/modules/Home/Market';
import Exchange from '~/modules/Home/Exchange';
import ExchangeAd from '~/modules/Home/Exchange/Ad';
import Keyword from '~/modules/Home/Keyword';
import Recommend from '~/modules/Home/Recommend';
import Pickout from '~/modules/Home/Pickout';
import Website from '~/modules/Home/Website';
import NewsList from '~/modules/NewsList';
import SmallFlash from '~/components/Flash/SmallFlash';
import Ad from '~/modules/Ad';
import Swiper from '~/components/Swiper';
// import func from '../vue-temp/vue-editor-bridge';
// import { functionDeclaration, functionExpression, returnStatement } from '@babel/types';

export default {
    components: {
        Market,
        Exchange,
        ExchangeAd,
        Keyword,
        Recommend,
        NewsList,
        Pickout,
        Website,
        Ad,
        SmallFlash,
        Swiper
    },
    data() {
        return {
            swiperData: [],
            coverData: [],
            keyword: [],
            marketData: [],
            mergeData: [],
            exchangeAdData: []
        };
    },
    asyncData({ app, query, error }) {
        const { categoryId } = query;
        return Promise.all([
            app.$article.category(),
            app.$article.list({ categoryId }),
            app.$advert.advertList({ positionId: 4 }),
            app.$advert.advertList({ positionId: 5 }),
            app.$global.keyword(),
            app.$market.hot(),
            app.$market.exchange(),
            app.$market.ad(),
            app.$market.markets()
        ])
            .then(
                ([
                    category,
                    news,
                    slide,
                    cover,
                    keyword,
                    market,
                    exchange,
                    exchangeAd,
                    pair
                ]) => {
                    const swiperData = slide.data.map(item => ({
                        src: app.$oss(item.path, 570, 340),
                        href: item.url,
                        text: item.title,
                        ...item
                    }));
                    const pairData = [];
                    const exchangeData = exchange.data;
                    pair.data.forEach(item => {
                        pairData.push({
                            type: 'exchange',
                            currency: item.marketName,
                            exchangeList: item.tradePairsList
                        });
                    });
                    const mergeData = pairData.concat(exchangeData);
                    const newsData = category.data.map(({ id, name }) => {
                        const cid = id.toString();
                        return {
                            id: cid,
                            name,
                            loading: categoryId !== cid,
                            list: categoryId === cid ? news.data.list : [],
                            pages: categoryId === cid ? news.data.pages : '',
                            pageNumber:
                                categoryId === cid ? news.data.pageNum : 1
                        };
                    });
                    newsData.unshift({
                        name: '最新',
                        id: '',
                        loading: !!categoryId,
                        list: !categoryId ? news.data.list : [],
                        pages: !categoryId ? news.data.pages : '',
                        pageNumber: !categoryId ? news.data.pageNum : 1
                    });
                    return {
                        categoryId,
                        swiperData,
                        marketData: market.data,
                        mergeData,
                        newsData,
                        exchangeAdData: exchangeAd.data,
                        coverData: cover.data.slice(0, 2),
                        keyword: keyword.data,
                        pairData,
                        exchangeData
                    };
                }
            )
            .catch(err => {
                const { message, response = {} } = err;
                return error({ statusCode: response.status, message });
            });
    },
    mounted() {
        this.$nextTick(() => {
            this.init();
        });
    },
    methods: {
        init() {
            const url = `${process.env.wsURL}/index`;
            this.lockReconnect = false;
            this.ws = new WebSocket(url);
            const reconnect = () => {
                if (this.lockReconnect || this.forbidReconnect) return;
                this.lockReconnect = true;
                // 没连接上会一直重连，设置延迟避免请求过多
                setTimeout(() => {
                    this.ws = new WebSocket(url);
                    this.lockReconnect = false;
                }, 2000);
            };
            this.ws.onopen = () => {
                this.heartbeat();
            };

            this.ws.onmessage = ({ data }) => {
                this.heartbeat();
                try {
                    const render = JSON.parse(data);
                    const type = render.type;
                    let list = render.data || [];
                    // 1: 顶部交易对行情。2: 币种所在交易所行情。3: 右侧热门币种
                    list = list.filter(item => !!item);
                    if (type === 1) {
                        this.exchangeAdData = list;
                    } else if (type === 2) {
                        this.exchangeData = list;
                        const exchanges = [];
                        this.pairData.forEach(item => {
                            exchanges.push({
                                type: 'exchange',
                                currency: item.marketName,
                                exchangeList: item.tradePairsList
                            });
                        });
                        this.mergeData = exchanges.concat(list);
                    } else if (type === 3) {
                        this.marketData = list;
                    } else if (type === 4) {
                        this.pairData = list;
                        const pairs = [];
                        list.forEach(item => {
                            pairs.push({
                                type: 'exchange',
                                currency: item.marketName,
                                exchangeList: item.tradePairsList
                            });
                        });
                        this.mergeData = pairs.concat(this.exchangeData);
                    }
                } catch {
                    // console.log(err);
                }
            };

            this.ws.onclose = () => {
                reconnect();
            };
            this.ws.onerror = () => {
                reconnect();
            };
        },
        heartbeat() {
            const pingTimeout = 10000; // 未收到消息多少秒之后发送ping请求, 毫秒
            const pongTimeout = 10000; // 发送ping之后，未收到消息超时时间，毫秒
            clearTimeout(this.pingTimeout);
            clearTimeout(this.pongTimeout);
            if (this.forbidReconnect) return; // 不再重连就不再执行心跳
            this.pingTimeout = setTimeout(() => {
                this.ws.send('PING');
                // 如果超过一定时间还没重置，说明后端主动断开了
                this.pongTimeout = setTimeout(() => {
                    this.ws.close();
                }, pongTimeout);
            }, pingTimeout);
        }
    },
    beforeRouteLeave(to, from, next) {
        if (this.ws) {
            this.forbidReconnect = true;
            this.heartbeat();
            this.ws.close();
            console.log('ws closed.');
        }
        next();
    }
};
</script>
<style lang="less" module>
.gqWrap {
    /* 国庆活动 */
    //background: url(~assets/img/gq70.png) no-repeat center top/100% auto;
    .gqimg {
        margin-top: 20px;
    }
}
.layout {
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
    .main {
        flex: 1 1 auto;
        min-width: 0;
        & + .right {
            margin-left: 20px;
        }
        .layout {
            &:first-child {
                margin-top: 0;
            }
        }
    }
    .right {
        flex: 0 0 auto;
        width: 330px;
    }
}
.cover {
    position: relative;
    display: block;
    height: 160px;
    border-radius: 8px;
    overflow: hidden;
    & + & {
        margin-top: 20px;
    }
    img {
        width: 100%;
        height: 100%;
        display: block;
        transition: all 0.5s;
    }
    &:hover {
        img {
            transform: scale(1.05);
        }
    }
    .text {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 12px;
        background-color: rgba(0, 0, 0, 0.6);
        color: white;
        font-size: 12px;
    }
}
.swiper-wrap {
    position: relative;
    height: 340px;
    width: 100%;
    overflow: hidden;
    border-radius: 8px;
}
.tv {
    position: absolute;
    top: 8px;
    left: 8px;
    width: 40px;
    height: 22px;
    background: rgba(247, 149, 34, 1);
    border-radius: 2px;
    z-index: 1;
    background-image: url(~assets/img/tv.png);
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 28px;
}
</style>
