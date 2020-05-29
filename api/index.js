import qs from 'qs';
import pickBy from 'lodash/pickBy';
import { message as Message } from 'ant-design-vue';

const files = require.context('~/api', false, /^\.\/(?!-).*\.(js)$/);
const filenames = files.keys();

function getModule(filename) {
  const file = files(filename);
  return file.default ? file.default : file;
}
const api = {};

filenames.forEach(filename => {
  const name = filename.replace(/^\.\//, '').replace(/\.(js)$/, '');
  if (name === 'index') return false;
  api[name] = getModule(filename);
});

const _pickBy = (params, fn = key => key === 0 || key) => {
  return pickBy(params, fn);
};

if (process.env.isProd && process.client) {
  const hostname = location.hostname;
  if (hostname.indexOf('btc123') === -1) {
    // alert('访问BTC123官网');
    location.href = 'https://www.btc123.com';
  }
}

export default (ctx, inject) => {
  const { $axios, store } = ctx;
  inject('pickBy', _pickBy);
  inject('qs', qs);

  const { loggedUser, i18n } = store.state;
  if (loggedUser) {
    $axios.setHeader('token', loggedUser.token);
  }
  if (i18n) {
    $axios.setHeader('lang', i18n.locale);
  }

  // $axios.defaults.timeout = 15000;

  $axios.onRequest(config => {
    const formData = config.data ? config.data.params : false;
    if (!formData) {
      config.headers['Content-Type'] = 'application/json; charset=utf-8;';
    }
    config.params = _pickBy(config.params);
    config.transformRequest = [
      data => {
        data = formData
          ? qs.stringify(_pickBy(formData))
          : JSON.stringify(_pickBy(data));
        return data;
      }
    ];
  });

  /* eslint-disable prefer-promise-reject-errors */
  $axios.onResponse(response => {
    const { data, config } = response;
    if (!data.success) {
      const { message, errorMessage, errorCode } = data;
      if (errorCode === '999') {
        store.commit('setLoggedUser', null);
      }
      return Promise.reject({
        config,
        response,
        message: message || errorMessage
      });
    }
    return data;
  });

  $axios.onError(error => {
    const { message, config, response } = error;
    const { data, status } = response || {
      status: 502,
      data: { message }
    };
    if (data.status === 0) {
      return data;
    }
    const { method, url, params } = config;
    console.error(
      `[Axios] [${status}] [${method.toUpperCase()}] ${url} ${JSON.stringify(
        params
      )} ${config.data} ${message} ${JSON.stringify(data)}`
    );
    if (process.client) {
      console.log(data.message || data.errorMessage || 'Bad Gateway');
      Message.error(data.message || data.errorMessage || 'Bad Gateway');
    }
  });

  for (const key in api) {
    inject(key, api[key]($axios));
  }
};
