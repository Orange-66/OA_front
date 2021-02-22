<template>
  <div class="animated fadeIn">

    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="2000"
      controls
      indicators
    >
      <b-carousel-slide>
        <img
          slot="img"
          src="..\..\assets\img\100.jpg"
          alt="image slot"
          width="100%"
          height="50%"

        >
      </b-carousel-slide>
       <b-carousel-slide>
        <img
          slot="img"
          src="..\..\assets\img\101.jpg"
          alt="image slot"
          width="100%"
          height="50%"
        >
      </b-carousel-slide>
      <b-carousel-slide>
        <img
          slot="img"
          src="..\..\assets\img\102.jpg"
          alt="image slot"
          width="100%"
          height="50%"
        >
      </b-carousel-slide>
    </b-carousel>
    <b-modal title="通知" v-model="showError" ok-only>您已经在别的地方登录 或登录已失效!</b-modal>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'dashboard',
  props: {
    userInfo: {
      type: Object,
      required: true
    }
  },
  components: {
  },
  data: function () {
    return {
      showError: false,
      slide: 0,
      sliding: null
    }
  },
  methods: {
    // 登录验证
    // tokenCheck() {
    //   this.$http.post("login/token_check",this.userLogInfo)
    //   .then((data) => {
    //     // console.log(data);
    //     if(data.data.strToken == "fail") {
    //       this.showError = true;
    //       setTimeout(() => {
    //         this.$router.push({path: '/login'});
    //       },'3000')//三秒后返回登录界面
    //     }
    //   })
    // },
    flag (value) {
      return 'flag-icon flag-icon-' + value
    }
  },
  watch: {
    // 监听userLogInfo的变化
  //   userLogInfo: {
  //     handler(newObject,oldObject) {
  //       console.log(newObject)
  //       if(newObject.userName != '' && newObject.token != '') {
  //         this.tokenCheck();
  //       }
  //     },
  //     deep: true, //深度监听对象内部变化
  //     immediate: true
  //   }
  }
}
</script>

<style>

</style>
