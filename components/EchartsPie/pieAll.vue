<template>
  <div
    :id="name"
    :style="{
      width: '285px',
      height: 300 + 50 * Math.ceil(value.length / 2) + 'px'
    }"
  />
</template>

<script>
const echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/pie');
require('echarts/lib/component/title');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
export default {
    props: {
        name: {
            type: String,
            default: 'pie_main_360'
        },
        value: {
            type: Array,
            default: () => []
        },
        hoverTitle: {
            type: String,
            default: '比例乌拉拉'
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initPie();
        });
    },
    methods: {
        initPie() {
            const color = [
                '#FFDB5C',
                '#9FE6B8',
                '#67E0E3',
                '#32C5E9',
                '#37A2DA',
                '#67E0E3',
                '#9D96F5',
                '#FB7293',
                '#9FE6B8',
                '#32C5E9',
                '#8378EA',
                '#FF9F7F'
            ];
            const _self = this;
            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'horizontal',
                    bottom: '30px',
                    data: _self.value.map(item => item.name),
                    formatter: function(name) {
                        return '{aaa|' + name + '}';
                    },
                    textStyle: {
                        rich: {
                            aaa: {
                                color: '#333',
                                width: 102,
                                height: 20
                            }
                        }
                    }
                },
                series: [
                    {
                        name: _self.hoverTitle,
                        type: 'pie',
                        radius: '100%',
                        center: _self.value.length >= 9 ? ['50%', '31%'] : ['50%', '42%'],
                        data: _self.value,
                        label: {
                            show: false
                        },
                        hoverOffset: 1,
                        itemStyle: {
                            color: function({ dataIndex }) {
                                return color[dataIndex];
                            }
                        }
                    }
                ]
            };
            echarts.init(document.getElementById(`${this.name}`)).setOption(option);
        }
    }
};
</script>
