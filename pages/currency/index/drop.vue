<template>
  <div>
    <!-- 跌幅榜 -->
    <!-- <Currency :rate="0"/> -->
    <Currency
      ref="table"
      :data-sources="list"
      :amount="total"
      :rate="0"
      :field-props="0"
      :turnover="turnover"
      :value-props="valueProps"
      server-or-client="server"
    />
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
            .list({ field: 0, origin: 1, size: 50, page: 1, rate: 0 })
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
