const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const lessToJS = require('less-vars-to-js');

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
    fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8')
);

const isProd = process.env.NODE_ENV === 'production';

let baseURL = 'https://apioperate.btc123.com';
let browserBaseURL = 'https://apioperate.btc123.com';
let wsURL = 'wss://ws.btc123.com/websocket';
if (process.env.NODE_ENV === 'qa') {
    baseURL = browserBaseURL = 'https://apioperate.btc123.com';
    wsURL = 'wss://ws.btc123.com/websocket';
}

if (isProd) {
    baseURL = 'http://172.31.108.21:8001';
    browserBaseURL = 'https://apioperate.btc123.com';
    wsURL = 'wss://ws.btc123.com/websocket';
}

module.exports = {
    mode: 'universal',

    /*
    ** Headers of the page
    */
    head: {
        titleTemplate: function(titleChunk) {
            const siteTitle = '比特币行情_专注于比特币与区块链信息服务|BTC123';
            return titleChunk || siteTitle;
        },
        meta: [
            { 'http-equiv': 'x-ua-compatible', content: 'IE=Edge, chrome=1' },
            { name: 'renderer', content: 'webkit' },
            { charset: 'utf-8' },
            { name: 'format-detection', content: 'telephone=no, email=no' },
            { name: 'viewport', content: 'width=1280, viewport-fit=cover' },
            {
                hid: 'keywords',
                name: 'keywords',
                content:
                '比特币,btc,比特币行情,比特币价格,区块链,区块链峰会,btc123,比特币K线图,bitebi'
            },
            {
                hid: 'description',
                name: 'description',
                content:
                'BTC123是国内最早比特币(bitcoin)行情交易资讯区块链信息服务媒体，提供行情数据、块讯分析、创业孵化、行业峰会、技术扶持等多元产品和优质服务，致力于为区块链创业者以及数字货币爱好者提供最好的产品和服务。'
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },

    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#f79522' },

    /*
    ** Global CSS
    */
    css: [
        'swiper/dist/css/swiper.min.css',
        'ant-design-vue/dist/antd.less',
        '~assets/style/global.less'
    ],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: ['~/plugins/antd', '~/plugins/helpers', '~/api', '~/plugins/gt'],
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://github.com/nuxt-community/axios-module#usage
        '@nuxtjs/axios',
        // Doc: https://github.com/nuxt-community/nuxt-i18n
        [
        'nuxt-i18n',
        {
            // 启用后有bug，暂时禁用
            // seo: false,
            locales: [
            {
                code: 'cn',
                name: '简体中文',
                iso: 'zh-CN',
                file: 'zh-CN.json'
            },
            {
                code: 'en',
                name: 'English',
                iso: 'en-US',
                file: 'en-US.json'
            }
            ],
            defaultLocale: 'cn',
            lazy: true,
            langDir: 'lang/'
        }
        ]
    ],
    /*
    ** Axios module configuration
    */
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
        baseURL,
        browserBaseURL
    },
    router: {
        linkActiveClass: 'is-active',
        linkExactActiveClass: 'exact-active',
        middleware: ['check-state']
    },
    /*
    ** Build configuration
    */
    build: {
        // analyze: isProd,
        publicPath: isProd
            ? 'https://pulsar-resource.oss-cn-shanghai.aliyuncs.com/static/'
            : '/static/',
        optimization:{
            minimize: true,
        },
        extractCSS:true,
        html:{
            minify:{
                collapseBooleanAttributes: false,
                collapseWhitespace: false,
                decodeEntities: true,
                minifyCSS: true,
                minifyJS: true,
                processConditionalComments: true,
                removeAttributeQuotes: false,
                removeComments: false,
                removeEmptyAttributes: false,
                removeOptionalTags: false,
                removeRedundantAttributes: false,
                removeScriptTypeAttributes: false,
                removeStyleLinkTypeAttributes: false,
                removeTagWhitespace: false,
                sortClassName: false,
                trimCustomFragments: false,
                useShortDoctype: false
            }
        },
        cssSourceMap:true,
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
            // Run ESLint on save
            // if (ctx.isDev && ctx.isClient) {
            //     config.module.rules.push({
            //     enforce: 'pre',
            //     test: /\.(js|vue)$/,
            //     loader: 'eslint-loader',
            //     exclude: /(node_modules)/
            //     });
            // }
        },
        plugins: [
            // Ignore all locale files of moment.js
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        ],
        loaders: {
            cssModules: {
                localIdentName: isProd ? '_[hash:base64:5]' : '[local]_[hash:base64:5]'
            },
            less: {
                javascriptEnabled: true,
                modifyVars: themeVariables // make your antd custom effective
            }
        },
        postcss: {
            plugins: {
                'postcss-cssnext': {
                    browsers: ['last 4 versions']
                }
            },
            preset: {
                autoprefixer: {
                    remove: false
                }
            }
        }
    },
    globalName: 'btc',
    env: {
        isProd: isProd,
        wsURL,
        browserBaseURL
	},
	render:{
        // 是否预加载资源
		resourceHints:false
	}
};
