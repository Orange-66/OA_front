<!--必胜！！-->

<template>
  <div class="login">

    <b-col cols="4" offset="4">
      <el-main>
        <b-row>
          <el-form :model="employee" ref="employee" status-icon label-width="60px" class="demo-ruleForm" :rules="rules">
            <b-col>
              <el-form-item label="用户名" prop="username" :show-message="false">
                <el-input type="text" v-model="employee.username" autocomplete="off" placeholder="请输入用户名(用户ID)" suffix-icon="el-icon-user-solid" @keyup.enter.native="submitForm('employee')"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password" :show-message="false">
                <el-input type="password" v-model="employee.password" placeholder="请输入密码" autocomplete="off" suffix-icon="el-icon-lock" @keyup.enter.native="submitForm('employee')"></el-input>
              </el-form-item>
              <el-form-item label-width="0px">
                <!-- <div class="remember">
                  <span>记住密码</span>
                  <el-switch
                    v-model="remember"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
                </div> -->
                <el-button type="primary" icon="el-icon-s-promotion" @click="submitForm('employee')">登录</el-button>
               <!-- <el-button type="primary" icon="el-icon-s-promotion" @click="test()">测试</el-button>-->

              </el-form-item>
            </b-col>
          </el-form>
        </b-row>
      </el-main>
      <b-modal title="通知" class="modal-danger" v-model="errorModal" @ok="errorModal = false" ok-variant="success">
        出现这个提示说明您的登录出现了以下情况:
        <br>用户名或密码输入不正确
        <br>客户端服务端登录选择错误
      </b-modal>
    </b-col>
  </div>




</template>

<script>

  import {mapMutations} from "vuex";
  import qs from 'qs';
  export default {
    name: 'login',
    data() {
      var validateUserID = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(Number(value))) {
            callback(new Error('请输入数字值'));
          } else {
            callback();
          }
        }, 1000);
      };
      var validatePassword = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('密码不能为空'));
        }
        callback();
      };
      return {
        employee: {
          // userID: '',
          username: '',
          password: '',
          //Authorization:''
          //userPermission: ''//用户权限
        },

        remember: true,
        errorModal: false,
        rules: {
          userID: [
            {validator: validateUserID, trigger: 'blur'}
          ],
          password: [
            {validator: validatePassword, trigger: 'blur'}
          ]
        }
      };
    },
    computed: {
      /*getLogUserID() {
        return getCookie("userID")
      },
      getLogPassWord() {
        return getCookie("password")
      }*/
    },
    methods: {
      ...mapMutations(['changeLogin','changeUserId','changeRouter']),
      login() {
        let v = this;
        console.log(v.employee.username,v.employee.password);
        /*   v.employee.userName= "11111";
           v.employee.password="222222222";*/
        console.log(qs.stringify(v.employee));

        v.$http.get(
          'employee/login.action',
         {username:v.employee.username,password:v.employee.password}

        ).then(function (res) {
          //console.log(res);
          var userToken = res.token;
          var userId=res.userId;
          console.log(userId);
          // 将用户token保存到vuex中
          v.changeLogin({token: userToken});
          v.changeUserId({userId: userId});
          console.log(localStorage.getItem('userId'));
          console.log("aaaaaa",localStorage.getItem('token'));

          v.$message('登录成功');
          v.$emit("Login", userId+ ";" + v.employee.username + ";" + localStorage.getItem('token'));
          //v.$router.push({path: '/home'});
        }).catch(function (err) {
          console.log("err", err);
          v.$message('密码或用户名错误');
        })


      },

      test() {
        this.$http.post(
          'employee/test.action'

        ).then(function (res) {
          console.log("res1111111111",res);
        }).catch(function(err){
          console.log("err",err);

      })
      },


      // this.$http.post('login/tologin.order',this.user)
      // .then((data) => {
      //   console.log(data);
      //   if(data.code === 1) {
      //     this.user.userName=data.data.strUserName;
      //     this.user.userPermission=data.data.mapPermission;
      //     this.token = data.data.token;
      //     this.$emit("Login",this.user.userPermission + ";" + data.data.intUserID+ ";" + data.data.strUserName + ";" + data.data.token);
      //     //记住登录状态判断
      //     this.rememberLoginStatus(this.remember);
      //   }else if(data.code === 0) {
      //     this.errorModal = true;
      //   }
      // })


      /*rememberLoginStatus(booleanParam) {
        if(booleanParam){
          setCookie("userID",this.user.userID,1);//默认保存1天
          setCookie("userName",this.user.userName,1);
          setCookie("password",this.user.password,1);
          setCookie("userPermission",this.user.userPermission,1)
          setCookie("token",this.token,1);
        }else {
          deleteCookie("userID");
          deleteCookie("userName");
          deleteCookie("password");
          deleteCookie("userPermission");
          deleteCookie("token");
        }
      },*/
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.login();
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },


      mounted() {
        if (this.getLogUserID != '') {
          this.employee.userName = this.getLogUserID;
          this.employee.password = this.getLogPassWord;//computed属性的调用方法,不加()
        }
      }
    }
  }
</script>

<style scoped>
  .login{
    /* public\img\loginback.png */
    background: url("../public/img/loginback.png");
    min-height: 685px;
    min-width: 414px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 100%;
  }

  .el-main{
    background-color: #F2F6FC;
    color: #333;
    text-align: center;
    border-radius: 6px;
    margin: 150px auto;
    height: 280px;
    top: 66px;
    opacity: 0.9;
  }
  .el-form{
    margin: 40px auto;
  }
  .el-form-item{
    margin: 5px auto;
  }
  .el-button{
    width: 100%;
  }

</style>
