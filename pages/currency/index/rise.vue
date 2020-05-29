<template>
  <div>
    <!-- 涨幅榜 -->
    <Currency
      ref="table"
      :data-sources="list"
      :amount="total"
      :rate="1"
      :field-props="5"
      :turnover="turnover"
      :value-props="valueProps"
      server-or-client="server"
    />
    <!-- <Currency :rate="1" /> -->
  </div>
</template>

<script>
import Currency from '~/modules/Currency';
export default {
    components: {
        Currency
    },
    asyncData({ app, error }) {
        return app.$currency
            .list({ field: 5, origin: 1, size: 50, page: 1, rate: 1 })
            .then(({ data: { dataList: { total, list }, turnover24H, value } }) => {
                return {
                    total: total,
                    list: list.map((item, index) => ({
                        ...item,
                        index: index
                    })),
                    turnover: turnover24H,
                    valueProps: value
                };
            })
            .catch(err => {
                const { message, response = {} } = err;
                return error({ statusCode: response.status, message });
            });
    }
};
</script>
