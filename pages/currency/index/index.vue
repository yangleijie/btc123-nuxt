<template>
  <div>
    <Currency
      ref="table"
      :data-sources="list"
      :amount="total"
      :turnover="turnover"
      :value-props="valueProps"
      server-or-client="server"
    />
  </div>
</template>

<script>
import Currency from '~/modules/Currency';
//
export default {
    components: {
        Currency
    },
    asyncData({ app, error }) {
        return app.$currency
            .list({
                orign: 1,
                page: 1,
                size: 50,
                field: 1
            })
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
