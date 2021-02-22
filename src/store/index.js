import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    // 存储token
    token: localStorage.getItem('token')?localStorage.getItem('token'):'',
    routers:localStorage.getItem('routers')?localStorage.getItem('routers'):'',
    userId:localStorage.getItem('userId')?localStorage.getItem('userId'):''
  },

  mutations: {
    changeUserId (state, r1) {
      state.userId = r1.userId;
      localStorage.setItem('userId',r1.userId);
    },
    changeRouter (state, r) {
      state.routers = r.routers;
      localStorage.setItem('routers',r.routers);
    },
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
      state.token = user.token;
      localStorage.setItem('token',user.token);
    }
  }
});

export default store;
