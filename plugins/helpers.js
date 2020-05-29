import Vue from 'vue';
import dayjs from 'dayjs';
import { format } from 'timeago.js';
import VueLazyload from 'vue-lazyload';
import accounting from 'accounting';

import { Icon, Modal } from 'ant-design-vue';

import rewardIcon from '~/assets/img/coin.png';
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_866320_vybvi5fb2kc.js'
});

/* eslint-disable no-useless-escape */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/i;
export function isUrl(path) {
  return reg.test(path);
}

const lazyloadOption = {
  observer: true,
  error: 'https://cdn.btc123.com/error.png',
  loading: 'https://cdn.btc123.com/loading.png',
  attempt: 2,
  lazyComponent: true,
  filter: {
    progressive(listener, options) {
      const aw = listener.el.getAttribute('width');
      const ah = listener.el.getAttribute('height');
      const type = listener.el.getAttribute('type') || 'resize';
      let { width, height } = listener.el;
      width = aw || width;
      height = ah || height;
      const { error, loading } = options;
      const formatType = options.supportWebp ? 'webp' : 'jpg';
      listener.loading = oss(loading, width, height, formatType, type);
      listener.error = oss(error, width, height, formatType, type);
      listener.src = oss(listener.src, width, height, formatType);
    }
  }
};

const linkeCDN = 'https://link-e-pro.oss-cn-beijing.aliyuncs.com';
const CDN = 'https://pulsar-resource.oss-cn-shanghai.aliyuncs.com';

const rewriteUrl = url => {
  return url.replace(
    /https:\/\/cdn.btc123.com|http:\/\/static.pulsar.link/g,
    CDN
  );
};

const oss = (url, w = 100, h = 100, formatType = 'jpg', type = 'resize') => {
  const isCDN = /cdn.btc123.com|static.pulsar.link|aliyuncs.com/g;
  if (url) {
    url = rewriteUrl(url);
  } else {
    url = oss(lazyloadOption.loading, w, h, formatType, 'crop');
  }
  if (!isUrl(url)) {
    if (/alioss_/.test(url)) {
      url = `${linkeCDN}/${url}`;
    }
    if (/img\/img/.test(url)) {
      url = `${process.env.browserBaseURL}/api/user/noAuth${url}`;
    }
  }
  return isCDN.test(url) && url.indexOf('?') === -1
    ? `${url}?x-oss-process=image/interlace,1/${type},w_${w},h_${h},${
        type === 'crop' ? 'g_center' : 'm_fill'
      }/quality,q_90/format,${formatType}`
    : url;
};
Vue.use(VueLazyload, lazyloadOption);

Vue.component('IconFont', IconFont);

const date = (time, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(time).format(format);
};

Vue.filter('date', date);
Vue.filter('timeago', (value, distance = 7, formater = 'MM-DD HH:mm') => {
  const isAfter = dayjs().isAfter(dayjs(value).add(distance, 'day'));
  return isAfter ? date(value, formater) : format(value, 'zh_CN');
});

const money = (value, formater, precision, filter = false) => {
  let company = '';
  if (filter) {
    if (value >= Math.pow(10, 7)) {
      value /= Math.pow(10, 8);
      company = '亿';
    } else if (value < Math.pow(10, 7) && value >= Math.pow(10, 3)) {
      value /= Math.pow(10, 4);
      company = '万';
    }
  }
  return accounting.formatMoney(value, formater, precision) + company;
};

Vue.filter('money', money);

/* eslint-disable no-undef */
export default ({ app, store }, inject) => {
  inject('date', date);
  inject('money', money);
  inject('isUrl', isUrl);
  inject('oss', oss);
  inject('rewriteUrl', rewriteUrl);
  app.router.beforeEach((to, from, next) => {
    if (process.client) {
      _hmt.push(['_setAutoPageview', false]);
      _hmt.push(['_trackPageview', to.fullPath]);
    }
    next();
  });
  Vue.mixin({
    methods: {
      clickAd({ mining, id }) {
        const { loggedUser } = store.state;
        if (!loggedUser) {
          Modal.warning({
            width: 320,
            title: '挖矿红包',
            content: '登录后可获得挖矿奖励'
          });
          return false;
        }
        if (mining) {
          const query = { id, userId: loggedUser.id };
          app.$advert.click(query).then(({ data }) => {
            const modal = Modal.info();
            const h = this.$createElement;
            const content = h(
              'div',
              {
                style: {
                  margin: '-10px -10px -10px -48px',
                  textAlign: 'center'
                }
              },
              [
                h(
                  'div',
                  {
                    style: {
                      position: 'absolute',
                      cursor: 'pointer',
                      top: 0,
                      right: 0,
                      width: '56px',
                      height: '56px',
                      lineHeight: '56px',
                      fontWeight: 700,
                      fontSize: '18px',
                      color: 'rgba(0, 0, 0, 0.45)'
                    },
                    on: {
                      click: () => {
                        modal.destroy();
                      }
                    }
                  },
                  [h('AIcon', { props: { type: 'close' } })]
                ),
                h('img', {
                  attrs: { src: rewardIcon, width: 48 },
                  style: { marginLeft: '-24px' }
                }),
                h(
                  'div',
                  {
                    style: {
                      color: '#4d4d4d',
                      fontSize: '18px',
                      marginTop: '20px',
                      marginBottom: '10px',
                      fontWeight: 500
                    }
                  },
                  '挖矿红包'
                ),
                h(
                  'div',
                  {
                    style: {
                      color: '#666',
                      fontSize: '14px'
                    }
                  },
                  data.first
                    ? [
                        h(
                          'span',
                          { style: { color: '#f79522' } },
                          `+${data.award}${data.currency || 'TV'} `
                        ),
                        h('span', '红包奖励')
                      ]
                    : [
                        h(
                          'span',
                          `已领取过该奖励: ${data.award}${data.currency ||
                            'TV'}`
                        )
                      ]
                )
              ]
            );
            modal.update({
              iconType: 'x',
              centered: true,
              width: 240,
              content,
              okButtonProps: {
                style: {
                  display: 'none'
                }
              }
            });
          });
        }
      }
    }
  });
};
