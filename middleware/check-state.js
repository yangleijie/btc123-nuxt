const isServer = process.server;
export default async ({ app, $axios, store, redirect, route, req }) => {
  const { state, dispatch } = store;
  const cookieStr = isServer ? req.headers.cookie : document.cookie;
  await dispatch('loadLoggedUser', cookieStr);
  const { loggedUser, i18n } = state;
  if (loggedUser) {
    $axios.setHeader('token', loggedUser.token);
  } else {
    const routeName = route.name;
    if (routeName && routeName.indexOf('personal') !== -1) {
      const localePath = app.localePath('signin');
      redirect('301', localePath, { redirect_uri: route.fullPath });
    }
  }
  if (i18n) {
    $axios.setHeader('lang', i18n.locale);
  }
  await dispatch('getLinks');
};
