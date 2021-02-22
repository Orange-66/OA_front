<template>
    <div class="card-panel">
        <!-- 卡片 -->
        <b-card  header-tag="header" border-variant="default" header-bg-variant="default" >
           <div slot="header" align="center">
                <strong style="font-size:18px">{{title}}</strong>
            </div>

            <!-- 不需要修改的信息表单 -->
            <b-row>
                <b-col cols="4" offset="1" style="font-weight:bold; text-align: center; margin-top:40px; margin-bottom:40px;">
                    <!-- <b-img-lazy src="../../../public/img/avatars/6.jpg" @click="changeImage"></b-img-lazy> -->
                    <img
                    :src="image_url"
                    class="img-avatar"
                    style="width:120px; margin-bottom:20px"
                    @click="toUpdateImage"/>
                    <table class="table">
                        <tbody>
                            <tr><td>登录名</td><td>{{employeeInfo.username}}</td></tr>
                            <tr><td>姓名</td><td>{{employeeInfo.name}}</td></tr>
                            <tr><td>性别</td><td>{{employeeInfo.sex == 1 ? "男":"女"}}</td></tr>
                            <tr><td>生日</td><td>{{employeeInfo.birthday}}</td></tr>
                            <tr><td>部门</td><td>{{employeeInfo.department}}</td></tr>
                            <tr><td>职位</td><td>{{employeeInfo.job}}</td></tr>
                        </tbody>
                    </table>
                </b-col>

                <!-- 需要修改的个人信息表单 -->
                <b-col cols="5" offset="1"  style="font-weight:bold; text-align: center; margin-top:40px; margin-bottom:40px;">
                    <table class="table">
                        <tbody>
                            <tr><td>手机号码</td><td>{{employeeInfo.phone}}</td></tr>
                            <tr><td>邮箱</td><td>{{employeeInfo.email}}</td></tr>
                            <tr><td>QQ</td><td>{{employeeInfo.qq}}</td></tr>
                            <tr><td>介绍</td><td><textarea class="form-control" rows="9" style="resize:none;background-color:white" readonly  v-model="employeeInfo.introduction"></textarea></td></tr>
                        </tbody>
                    </table>

                    <!-- 修改密码按键 -->
                    <b-row  align-h="around">
                        <b-col cols="4">
                            <b-button class="addbtn" variant="primary" @click="showUpdateInfo()">修改信息</b-button>
                        </b-col>
                        <b-col cols="4">
                            <b-button class="addbtn" variant="primary" @click="showUpdatePassword()">修改密码</b-button>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-card>

        <!-- 修改个人信息弹出框 -->
        <b-modal id="modal-updateInfo" title="修改个人信息" centered @close="cancelInfo"  @cancel="cancelInfo" @ok="handleInfo" cancel-title="返回" ok-title="保存">
            <form @submit.stop.prevent="submitInfo">
                <b-row >
                    <b-col cols="3" offset="1">
                    <p style="padding:6px 0px;">手机：</p>
                    </b-col>
                    <b-col cols="7">
                        <b-form-input v-model="employeeInfo_send.phone" @blur="isEmployeePhone(employeeInfo_send.phone)" :state="employeeInfoState.phoneState" required></b-form-input>
                    </b-col>
                </b-row>
                <b-row >
                    <b-col cols="3" offset="1">
                    <p style="padding:6px 0px;">邮箱：</p>
                    </b-col>
                    <b-col cols="7">
                        <b-form-input v-model="employeeInfo_send.email" @blur="isEmployeeEmail(employeeInfo_send.email)" :state="employeeInfoState.emailState" required></b-form-input>
                    </b-col>
                </b-row>
                <b-row >
                    <b-col cols="3" offset="1">
                    <p style="padding:6px 0px;">QQ：</p>
                    </b-col>
                    <b-col cols="7">
                        <b-form-input v-model="employeeInfo_send.qq" @blur="isEmployeeQQ(employeeInfo_send.qq)" :state="employeeInfoState.qqState" required></b-form-input>
                    </b-col>
                </b-row>
                <b-row >
                    <b-col cols="3" offset="1">
                    <p style="padding:6px 0px;">介绍：</p>
                    </b-col>
                    <b-col cols="7">
                        <b-form-textarea class="form-control" rows="5" maxlength="50" @blur="isEmployeeIntroduction(employeeInfo_send.introduction)" :state="employeeInfoState.introductionState" required style="resize:none;background-color:white" v-model="employeeInfo_send.introduction"></b-form-textarea>
                    </b-col>
                </b-row>
            </form>
        </b-modal>


        <!-- 修改密码弹出框 -->
        <b-modal id="modal-updatePassword" title="修改密码" centered @close="cancelPassword"  @cancel="cancelPassword" @ok="handlePassword" cancel-title="返回" ok-title="保存">
            <form @submit.stop.prevent="submitPassword">
                <b-row >
                    <b-col cols="3" offset="1">
                    <p style="padding:6px 0px;">初始密码：</p>
                    </b-col>
                    <b-col cols="7">
                        <b-form-input v-model="password.origin" placeholder="请输入初始密码" type="password" :state="passwordState.originState" @blur="isOriginPassword(password.origin)" required></b-form-input>
                    </b-col>
                </b-row>
                <b-row >
                    <b-col cols="3" offset="1">
                    <p style="padding:6px 0px;">新的密码：</p>
                    </b-col>
                    <b-col cols="7">
                        <b-form-input v-model="password.new" placeholder="请输入新的密码" type="password" :state="passwordState.newState" @blur="isNewPassword(password.new)" required></b-form-input>
                    </b-col>
                </b-row>
                <b-row >
                    <b-col cols="3" offset="1">
                    <p style="padding:6px 0px;">确认密码：</p>
                    </b-col>
                    <b-col cols="7">
                        <b-form-input v-model="password.confirm" placeholder="请再次输入新的密码" type="password" @blur="isConfirmPassword()" :state="passwordState.confirmState" required></b-form-input>
                    </b-col>
                </b-row>
            </form>
        </b-modal>

                <!-- 修改密码弹出框 -->
        <b-modal id="modal-updateImage" title="修改头像" centered  @ok="updateImage" cancel-title="返回" ok-title="保存">
            <form>
                <b-row >
                    <b-col cols="3" offset="1">
                    <p style="padding:6px 0px;">上传头像：</p>
                    </b-col>
                    <b-col cols="7">
                        <b-form-file
                        v-model="image_url_send"
                        aria-pressed="请选择上传图片"
                        browse-text="选择文件"
                        accept="image/*"
                        ></b-form-file>
                    </b-col>
                </b-row>
            </form>
        </b-modal>
    </div>
</template>

<script>
export default {
    props:{
        employeeID:'',
        userInfo:{

            // userid:1,
            type: Object,
            required: true

        }
    },
    data() {
      return {
        //           userInfo:{
        //     userid:1,
        //     type: Object,
        //     required: true

        // },
        image_url:"",
        image_url_send:"",
        baseURL:"person_center/user/",
        title:"员工个人信息维护",//标题
        //用户信息
        employeeInfo: {
            userid: "1",
            username: 'zhangsan',
            name: '张三',
            department:'XXX',
            job:'XXX',
            sex:'X',
            birthday:'YYYY-MM-DD',
            phone:'NNNNNNNNNNN',
            email:'XXXXXX@163.com',
            qq:'NNNNNNNNNN',
            introduction:'这个人很懒，什么也没有留下...'
        },
        employeeInfo_send:{
            phone: "",
            email: "",
            qq: "",
            introduction: ""
        },
        //用户信息表单状态
        employeeInfoState:{
            phoneState : "",
            emailState : "",
            qqState : "",
            introductionState : ""
        },
        //密码信息
        password:{
            origin:"",
            new:"",
            confirm:""
        },
        //密码表单状态
        passwordState:{
            originState : "",
            newState : "",
            confirmState : ""
        }
      }


    },
    methods:{
        toUpdateImage(){
            this.$bvModal.show('modal-updateImage');
        },
        updateImage(){
            const requestBean = new FormData()
            requestBean.append('file', this.image_url_send)
            requestBean.append('employeeId ', this.userInfo.userID)
            console.log("uploadHeader", requestBean)
            var action = "uploadHeader.action"

            this.$http.post("system_management/employee/"+action, requestBean)
            .then((data) => {
                if(data.code == 1){
                    this.showMasage(data.data, "success")
                    this.getImage();
                }
            })
        },
        getImage(){
            var requestBean = {employeeId : this.userInfo.userID};
            console.log(requestBean);
            this.$http.get( "system_management/employee/"+"getHeader.action", requestBean)
            .then((data) => {
                console.log(data);
                if(data.code==1){
                    this.image_url = data.data;
                    console.log(this.image_url);
                }
            })
        },
        // 显示信息函数 √
        // 显示个人用户信息 √
        findInfo(userID){
            var requestBean = {id : userID};
            this.$http.get(this.baseURL+"getUserInfo.action", requestBean)
            .then((data) => {
                // console.log(data);
                if(data.code==1){
                    var dataList = data.data;
                    this.employeeInfo = {
                        userid: dataList.employeeId,
                        username: dataList.employeeUsername,
                        name: dataList.employeeName,
                        department:dataList.department.departmentName,
                        job: dataList.job.jobName,
                        sex: dataList.employeeSex,
                        birthday: this.changeTimeFormat(dataList.employeeBirthday),
                        phone:dataList.employeePhone,
                        email:dataList.employeeEmail,
                        qq:dataList.employeeQq,
                        introduction:dataList.introduction,
                    }
                    this.employeeInfo_send = {
                        phone:dataList.employeePhone,
                        email:dataList.employeeEmail,
                        qq:dataList.employeeQq,
                        introduction:dataList.introduction,
                    }
                }
                else{
                    var msg = data.resultMsg;
                    var typ = "error"
                    this.showMasage(msg, typ);
                }
            })
            this.getImage();
        },

        // -----------------------------------------------------------------------------

        // 弹出模态框函数 √
        // 更新个人信息modal  √
        showUpdateInfo(){
                this.$confirm('此操作将修改个人信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$bvModal.show('modal-updateInfo');
                })
        },
        // 更新密码modal  √
        showUpdatePassword(){
            this.$confirm('此操作将修改密码, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.$bvModal.show('modal-updatePassword');
            })
        },

        changeTimeFormat(timestamp){
            var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate();
            return Y+M+D;
        },

        // -----------------------------------------------------------------------------

        // 向后端发送修改请求 √
        // 修改个人信息请求 √
        updateInfo(){
        //     console.log(this.employeeInfoState.phoneState);
        //     console.log(this.employeeInfoState.phoneState == "");
        //     console.log(this.employeeInfoState.phoneState === "");
             if (
                !(this.employeeInfoState.phoneState === ""
                 && this.employeeInfoState.emailState === ""
                 && this.employeeInfoState.qqState === ""
                 && this.employeeInfoState.introductionState === "")) {
                var requestBean = {
                    employeeId: this.employeeInfo.userid,
                    employeePhone: this.employeeInfo_send.phone,
                    employeeEmail: this.employeeInfo_send.email,
                    employeeQq: this.employeeInfo_send.qq,
                    introduction: this.employeeInfo_send.introduction};
                console.log(requestBean);
                // console.log(requestBean);
                this.$http.post(this.baseURL+"updateUserInfo.action", requestBean)
                .then((data) => {
                    console.log(data);
                    if(data.code==1){
                        this.showMasage("修改成功","success")
                    }else{
                        this.showMasage("修改失败","error")
                    }
                    this.findInfo(this.employeeInfo.userid);
                })}
                else{
                    this.showMasage("修改成功","success")
                }
        },
        // 修改密码请求 √
        updatePassword(){
            var requestBean = {id: this.employeeInfo.userid, originPassword: this.password.origin, password: this.password.new};
            this.$http.get(this.baseURL+"updatePassword.action", requestBean)
            .then((data) => {
                // console.log(data);
                if(data.code==1){
                    this.showMasage("修改成功","success");
                    this.cancelPassword()
                }else{
                    this.showMasage("初始密码错误","error")
                }
                this.findInfo(this.employeeInfo.employeeId);
            })
        },

        // -----------------------------------------------------------------------------

        // 防止提前关闭modal框函数 √
        // 防止关闭修改个人信息框 √
        handleInfo(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault();
            // Trigger submit handler
            this.submitInfo();
        },
        // 防止关闭修改密码框 √
        handlePassword(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault();
            // Trigger submit handler
            this.submitPassword();
        },

        // -----------------------------------------------------------------------------

        // 发送请求前的表单验证函数 √
        // 验证个人信息是否正常 √
        submitInfo(){
            // Exit when the form isn't valid
            console.log(this.employeeInfoState.phoneState);
           console.log((this.employeeInfoState.phoneState != "" && !this.employeeInfoState.phoneState));
           if (
                (this.employeeInfoState.phoneState !== "" && !this.employeeInfoState.phoneState)
            || (this.employeeInfoState.emailState !== "" && !this.employeeInfoState.emailState)
            || (this.employeeInfoState.qqState !== "" && !this.employeeInfoState.qqState)
            || (this.employeeInfoState.introductionState !== "" && !this.employeeInfoState.introductionState)) {
                return
            }
            // Push the name to submitted names
            this.updateInfo();
            // Hide the modal manually
            this.$nextTick(() => {
                this.$bvModal.hide('modal-updateInfo')
            })
        },
        // 验证密码是否正常 √
        submitPassword(){
            // Exit when the form isn't valid
            if (!this.passwordState.originState || !this.passwordState.newState || !this.passwordState.confirmState) {
                return
            }
            // Push the name to submitted names
            this.updatePassword();
            // Hide the modal manually
            this.$nextTick(() => {
                this.$bvModal.hide('modal-updatePassword')
            })
        },

        // -----------------------------------------------------------------------------

        // 验证修改个人信息表单内容是否正常 √
        // 电话的正确性 √
        isEmployeePhone(data){
            this.employeeInfoState.phoneState= this.isPhone(data);
        },
        // 邮箱的正确性 √
        isEmployeeEmail(data){
            this.employeeInfoState.emailState= this.isEmail(data);
        },
        // QQ的正确性 √
        isEmployeeQQ(data){
            this.employeeInfoState.qqState= this.isQQ(data);
        },
        // 介绍的正确性 √
        isEmployeeIntroduction(data){
            this.employeeInfoState.introductionState= this.isTextarea(data);
        },

        // -----------------------------------------------------------------------------

        // 验证修改密码表单内容是否正常 √
        // 初始密码的正确性 √
        isOriginPassword(data){
            this.passwordState.originState= this.isPassword(data);
        },
        // 新的密码的正确性 √
        isNewPassword(data){
            this.passwordState.newState= this.isPassword(data);
        },
        // 确认密码的正确性 √
        isConfirmPassword(){
            if(this.password.new != this.password.confirm){
                this.showMasage("新的密码与确认密码不一致","error");
                this.passwordState.confirmState=false;
            }
            else{
                this.passwordState.confirmState=true
            }
        },

        // -----------------------------------------------------------------------------

        // 基础验证函数 √
        // 检验是否是合格电话 √
        isPhone(data){
            //格式正常
            var format_reg = /^1[34578]\d{9}$/;

            if(data === ''){
                this.showMasage("请输入电话","error");
                return false;
            }else{
                if(!format_reg.test(data)){
                    this.showMasage("输入的电话有误","error");
                    return false;
                }
                else{
                    return true;
                }
            }
        },

        // 检验是否是合格邮箱 √
        isEmail(data){
            //格式正常
            var format_reg = /^[A-Za-z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if(data === ''){
                this.showMasage("请输入邮箱","error");
                return false;
            }else{
                if(!format_reg.test(data)){
                    this.showMasage("输入的邮箱有误","error");
                    return false;
                }
                else{
                    return true;
                }
            }
        },

        // 检验是否是合格QQ √
        isQQ(data){
            //格式正常
            var format_reg = /^[1-9][0-9]{4,9}$/;
            if(data === ''){
                this.showMasage("请输入QQ","error");
                return false;
            }else{
                if(!format_reg.test(data)){
                    this.showMasage("输入的QQ有误","error");
                    return false;
                }
                else{
                    return true;
                }
            }
        },

        // 检验是否是合格Textarea √
        isTextarea(data){
            //格式正常
            if(typeof(data) === "undefined"){
                this.showMasage("请输入介绍","error");
                return false;
            }else{
                this.employeeInfo.introduction_send = this.htmlSpecialChars(data);
                return true;
            }

        },

        // 检验是否是合格密码 √
        isPassword(data){
            //不违法
            var legal_reg = /[^A-Za-z0-9]/;
            //格式正常
            var format_reg = /^[A-Za-z0-9]{5,20}$/;
            if(legal_reg.test(data)){
                this.showMasage("请输入字母或数字作为密码","error");
                return false;
            }else{
                if(!format_reg.test(data)){
                    this.showMasage("请输入5-20位密码","error");
                    return false;
                }
                else{
                    return true;
                }
            }

        },

        //防止注入函数  √
        htmlSpecialChars(str){
            str = str.replace(/&/g, '&amp;');
            str = str.replace(/</g, '&lt;');
            str = str.replace(/>/g, '&gt;');
            str = str.replace(/"/g, '&quot;');
            str = str.replace(/'/g, '&#039;');
            return str;
        },

        // -----------------------------------------------------------------------------

        // 清空面板函数 √
        // 清空modal-Info面板 √
        cancelInfo(){
            this.employeeInfoState = {
                phoneState : "",
                emailState : "",
                qqState : "",
                introductionState : ""
            }
        },

        // 清空modal-Password面板 √
        cancelPassword(){
            this.password = {
                origin:"",
                new:"",
                confirm:""
            }
            this.passwordState = {
                originState : "",
                newState : "",
                confirmState : ""
            }
        },

        // -----------------------------------------------------------------------------

        // 显示提示消息 √
        showMasage(msg, type){
            this.$message({
                showClose: true,
                duration:5000, //展示1000毫秒
                message: msg,
                type:type
            });
        }
    },
   created() {
       if (!isNaN(this.employeeID)) {
           this.findInfo(this.employeeID);
       }else{
           this.findInfo(this.userInfo.userID);
       }
        
   }
  }
</script>

<style scoped>
    td{
        vertical-align:middle;
    }
</style>
