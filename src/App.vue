<template>
  <div class="app">
    <router-view :userInfo="userInfo" @Login="changeView($event)" v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import {setCookie,getCookie,deleteCookie} from '@/shared/CookieUtils.js'

export default {
  name: 'app',
  provide() { // 注册一个方法
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      userInfo: {
        userID: '',
        userName: '',
        token: '',

      },
      isRouterAlive: true,
    }
  },
  methods: {
    changeView(result) {
      var info = result.split(";");

      this.userInfo.userID = info[0];
      this.userInfo.userName = info[1];
      this.userInfo.token = info[2];
      console.log(this.userInfo);
      this.$router.push({path: "/home"});

    },
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style lang="scss">
  // CoreUI Icons Set
  @import '~@coreui/icons/css/coreui-icons.min.css';
  /* Import Font Awesome Icons Set */
  $fa-font-path: '~font-awesome/fonts/';
  @import '~font-awesome/scss/font-awesome.scss';
  /* Import Simple Line Icons Set */
  $simple-line-font-path: '~simple-line-icons/fonts/';
  @import '~simple-line-icons/scss/simple-line-icons.scss';
  /* Import Flag Icons Set */
  @import '~flag-icon-css/css/flag-icon.min.css';
  /* Import Bootstrap Vue Styles */
  @import '~bootstrap-vue/dist/bootstrap-vue.css';
  // Import Main styles for this application
  @import 'assets/scss/style';
</style>
