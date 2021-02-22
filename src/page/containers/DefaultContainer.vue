<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="">
        <!-- <img class="navbar-brand-full" src="img/brand/logo.svg" width="89" height="25" alt="CoreUI Logo"> -->
        <img src="../../../public/img/logo-inverse.jpg" class="navbar-brand-full logoimg" >
        <!-- public\ -->
        <img class="navbar-brand-minimized" src="img/brand/sygnet.svg" width="30" height="30" alt="CoreUI Logo">
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" :defaultOpen=true />
      <b-navbar-nav class="d-md-down-none">
        <b-nav-item class="px-3" to="/home">OA办公集成系统</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item class="d-md-down-none">
          <i class="icon-bell" @click="toUnread"></i>
          <b-badge pill variant="danger">{{this.unread}}</b-badge>
        </b-nav-item>
        <DefaultHeaderDropdownAccnt v-bind:userInfo="user" v-on:Logout="logout($event)"/>
      </b-navbar-nav>
      <!--<AsideToggler class="d-lg-none" mobile />-->
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>
        <SidebarNav :navItems="nav"></SidebarNav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view :userInfo="user"></router-view>
        </div>
      </main>
      <AppAside fixed>
        <!--aside-->
        <DefaultAside/>
      </AppAside>
    </div>
    <b-modal title="通知" v-model="show" ok-only>您已经在别的地方登录 或登录已失效!</b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import nav from '@/page/_nav'
import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, AsideToggler, Footer as TheFooter, Breadcrumb } from '@coreui/vue'
import DefaultAside from './DefaultAside'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'
import {setCookie,getCookie,deleteCookie} from '@/shared/CookieUtils.js'

export default {
  name: 'DefaultContainer',
  props: {
    userInfo: {
      // userName
      // token
      type: Object,
      required: true
    }
  },
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    DefaultAside,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer
  },
  data () {
    return {
      show: false,
      confirm: false,
      nav: nav.items,
      user: {
        userID: '2',
        userName: '李白',
        token: '',
        userPermission:''
      },
      unread:'',//未阅消息
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched.filter((route) => route.name || route.meta.label )
    }
  },
  methods: {
    getUnreadNum(){//获取当前用户未阅消息
      this.$http.get("email/getAllByUnRead.action",{receiveEmailNameId:this.userInfo.userID})
        .then((data) => {
          if(data.code==1){
            this.unread=data.data.total;
          }
        })
    },
    toUnread(){//跳转到未阅消息页面
       this.$router.push({path: "/mailManage/unread_mail"});
    },
    startSelectEmail(){//开启邮件定时任务
      this.$http.get("echarts/startSelectEmail.action",{receiveEmailNameId:this.user.userID})
        .then((data) => {
          console.log(data);
        })
    },
    logout(){
      localStorage.removeItem('userId');
      this.$router.push({path: '/login'});
    },
    // 登录验证
    // tokenCheck() {
    //   var user = {
    //     userID:getCookie("userID"),
    //     userName: getCookie("userName"),
    //     token: getCookie("token"),
    //     userPermission: getCookie("userPermission"),
    //   }
    //    this.$http.post("token_check",user)
    //   .then((data) => {
    //     // console.log(data);
    //     if(data.data.strToken == "fail") {
    //       this.show = true;
    //       setTimeout(() => {
    //         this.$router.push({path: '/login'});
    //       },'3000')//三秒后返回登录界面
    //     }else {
    //       this.user.userID=getCookie("userID");
    //       this.user.userName = getCookie("userName");
    //       this.user.token = getCookie("token");
    //       this.user.userPermission=getCookie("userPermission");
    //     }
    //   })
    // },
    // 退出登录
    // logout(message) {
    //   // console.log(this.user.token);
    //   if(message == 'logout') {
    //      this.$http.del("login/logout.order",this.user)
    //     .then((data) => {
    //       // console.log(data);
    //       if(data.code == "1"){
    //         //删除会话信息(如果有)
    //         deleteCookie("userID");
    //         deleteCookie("userName");
    //         deleteCookie("password");
    //         deleteCookie("userPermission");
    //         deleteCookie("token");
    //         this.$router.push({path: "/login"}); //回到登录页面
    //       }
    //     })
    //   }
    // },
    // 登录信息过滤
    // loginFilter() {
    //   if(this.userInfo.userID == '' || this.userInfo.token == '') {
    //     if(getCookie("userID") == '' || getCookie("token") == '') {
    //       this.$router.push({path: '/login'});
    //     }else if(getCookie("userID") != '' && getCookie("token") != '') {
    //       // 登录检测该用户当前token是否有效
    //       this.tokenCheck();
    //     }
    //   }else {
    //     this.user.userID=this.userInfo.userID;
    //     this.user.userPermission=this.userInfo.userPermission;
    //     this.user.userName = this.userInfo.userName;
    //     this.user.token = this.userInfo.token;
    //   }
    // }
  },
  created() {
    // this.loginFilter();
    // this.startSelectEmail();
  },
  mounted() {
    // setInterval(this.getUnreadNum, 1000);
  },
}
</script>
<style scoped>
.logoimg{
  width: 130px;
}
.main{
  background-color: #f8f8f8;
}
</style>
