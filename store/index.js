import Cookie from 'cookie';
import Cookies from 'js-cookie';
const inBrowser = process.client;

export const state = () => ({
  loggedUser: null,
  isUpgrade: false,
  logos: [],
  links: []
});

export const getters = {
  isUpgrade(state) {
    return state.isUpgrade;
  },
  loggedUser(state) {
    return state.loggedUser;
  },
  logos(state) {
    return state.logos;
  },
  links(state) {
    return state.links;
  }
};
export const mutations = {
  setLoggedUser(state, loggedUser = null) {
    state.loggedUser = loggedUser;
    if (inBrowser) {
      if (!loggedUser) {
        this.$axios.setHeader('token', '');
        Cookies.remove('LOGGED_USER');
      } else {
        Cookies.set('LOGGED_USER', loggedUser);
      }
    }
  },
  setUpgrade(state, isUpgrade = true) {
    state.isUpgrade = isUpgrade;
    if (inBrowser) {
      if (isUpgrade) {
        Cookies.remove('IS_UPGRADE');
      } else {
        Cookies.set('IS_UPGRADE', isUpgrade, { expires: 365 });
      }
    }
  },
  SET_LOGOS(state, logos = []) {
    state.logos = logos;
  },
  SET_LINKS(state, links = []) {
    state.links = links;
  }
};
export const actions = {
  loadLoggedUser({ commit }, str = '') {
    const cookie = Cookie.parse(str);
    const loggedUser = cookie.LOGGED_USER ? JSON.parse(cookie.LOGGED_USER) : '';
    commit('setLoggedUser', loggedUser);
    // const isUpgrade = cookie.IS_UPGRADE ? JSON.parse(cookie.IS_UPGRADE) : true;
    // commit('setUpgrade', isUpgrade);
  },
  async getLinks({ commit, state }) {
    const { logos, links } = state;
    if (!logos.length) {
      const logo = await this.$advert.logos();
      commit('SET_LOGOS', logo.data);
    }
    if (!links.length) {
      const link = await this.$advert.links();
      commit('SET_LINKS', link.data);
    }
  }
};
