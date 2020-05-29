<template>
  <div :id="name" style="width: 200px;height:100px;" />
</template>

<script>
const echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/pie');
export default {
    props: {
        type: {
            default: 1,
            type: Number
        },
        name: {
            type: String,
            default: 'pie_main'
        },
        background: {
            type: Array,
            default: () => ['#6CB45F', '#E76653']
        },
        value: {
            type: Array,
            default: () => [20, 58]
        },
        title: {
            type: String,
            default: ''
        },
        subTitle: {
            type: String,
            default: ''
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initPie();
        });
    },
    methods: {
        initPie() {
            const _self = this;
            let title = {};
            const data = [
                {
                    value: this.value[0],
                    itemStyle: {
                        normal: {
                            color: this.background[0]
                        }
                    }
                },
                {
                    value: this.value[1],
                    itemStyle: {
                        normal: {
                            color: this.background[1]
                        }
                    },
                    // 去除其余部分的选中效果
                    emphasis: {
                        itemStyle: {
                            color: this.background[1],
                            shadowColor: 'transparent',
                            opacity: 1
                        }
                    }
                }
            ];
            // 隐藏下面部分圆
            const amount = data.reduce((total, item) => {
                return total + item.value;
            }, 0);
            data.push({
                value: amount,
                itemStyle: {
                    normal: {
                        color: 'rgba(0,0,0,0)'
                    }
                }
            });
            let option = {
                tooltip: {
                    show: false
                },
                grid: {
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0
                },
                series: [
                    {
                        type: 'pie',
                        startAngle: -180,
                        radius: ['130%', '190%'],
                        center: ['50%', '100%'],
                        data: data,
                        hoverAnimation: false,
                        legendHoverLink: false,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        label: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        }
                    }
                ]
            };
            if (this.type === 1) {
                // 概念行情里面的图表
                title = {
                    title: {
                        text: [`{aaa| 涨${this.value[0]}}{bbb|:}{ccc|${this.value[1]}跌}`],
                        x: 'center',
                        top: '70px',
                        textStyle: {
                            rich: {
                                aaa: {
                                    color: _self.background[0],
                                    fontSize: 14
                                },
                                bbb: {
                                    color: '#666666',
                                    fontSize: 14,
                                    width: 16
                                },
                                ccc: {
                                    color: _self.background[1],
                                    fontSize: 14
                                }
                            }
                        }
                    }
                };
            } else if (this.type === 2) {
                // 币种详情的比例图表
                title = {
                    title: {
                        text: _self.title,
                        subtext: _self.subTitle,
                        x: 'center',
                        top: '50px'
                    }
                };
            }
            option = Object.assign(option, title);
            echarts.init(document.getElementById(`${this.name}`)).setOption(option);
        }
    }
};
</script>
