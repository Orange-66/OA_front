<template>
    <div class="search-info">
        <BaseActionTable
        :list_title=searchInfoList_title
        :dataList=searchInfoList
        :fields= fields
        :options=options
        :total=totalDataNum
        :showfind=true
        :showAdd=false
        ></BaseActionTable>

        <!-- 查看详情个人信息弹出框 -->
        <b-modal id="modal-detail" size="lg" title="查看个人信息" centered  ok-only ok-title="确认">
            <!-- 不需要修改的信息表单 -->
            <b-row>
                <b-col cols="4" offset="1" style="font-weight:bold; text-align: center;">                 
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
                <b-col cols="5" offset="1"  style="font-weight:bold; text-align: center;">
                    <table class="table">
                        <tbody>
                            <tr><td>手机号码</td><td>{{employeeInfo.phone}}</td></tr>
                            <tr><td>邮箱</td><td>{{employeeInfo.email}}</td></tr>
                            <tr><td>QQ</td><td>{{employeeInfo.qq}}</td></tr>
                            <tr><td>介绍</td><td><textarea class="form-control" rows="5" style="resize:none;background-color:white;border:1px solid silver" readonly  v-model="employeeInfo.introduction"></textarea></td></tr>
                        </tbody>
                    </table>
                </b-col>
            </b-row>
        </b-modal>
        <!-- 查看详情个人信息弹出框 -->
        <b-modal id="modal-cloudFile" size="xl" title="查看云共享" centered  ok-only ok-title="确认">
            <FileDirectory :info_lock = info_lock :userInfo= chosen_userInfo></FileDirectory>
        </b-modal>
    </div>
</template>

<script>
import BaseActionTable from "../../component/BaseActionTable"
import FileDirectory from '@/page/cloudFile/FileDirectory'
export default {
    components:{
        BaseActionTable,   
        FileDirectory     
    },
    props:{
        
        userInfo:{
        
            // userid:1,
            type: Object,
            required: true
        
        }
    },
    data() {
        return {
            info_lock:false,
            chosen_userInfo:{},
            baseURL:"person_center/user/",
            searchInfoList_title:"员工信息列表",

            searchInfoList:[],
            sexList:[           
                {text: '男', value: '1'},
                {text: '女', value: '0'}],
            options:[
                {text: '查看详情', value: '1'},
                {text: '查看云共享', value: '2'}
            ],
            fields:[
                {"pro":"id","label":"员工编号"},
                {"pro":"employeeName","label":"员工姓名"},
                {"pro": "departmentName","label":"员工部门"},
                {"pro":"jobName","label":"员工职位"},
                {"pro":"employeePhone","label":"员工电话"}
            ],
            totalDataNum:0,//总数据条目数
            currentPageNum:1,//当前页
            employeeInfo : {
                id:"",
                username: "",
                name: "",
                department: "",
                job: "",
                sex: "",
                birthday: "",
                phone: "",
                email: "",
                qq: "",
                introduction: "",
            },
            findState:true,
            pageSize:7,
            keyword:""
      }
      
      
    },
    methods:{

        refreshList(data){
            // console.log(dataList);
            this.totalDataNum=data.data.total;
            console.log(this.totalDataNum);
            var tempList=data.data.list;
            this.searchInfoList=[];
            // 将之前的页数填满
            var num=(this.currentPageNum-1)*7
            for (let j = 0; j < num; j++) {
                this.searchInfoList.push({"id":''})
            }
            // 插入当前页数据
            for (let i = 0; i < tempList.length; i++) {
                this.searchInfoList.push({
                    id : tempList[i].employeeId,
                    employeeName : tempList[i].employeeName,
                    departmentName : tempList[i].department.departmentName,
                    jobName : tempList[i].job.jobName,
                    employeePhone : tempList[i].employeePhone,
                })
            }
        },

        // 显示信息函数 √
        // 分页显示个人用户信息 √
        findbyPage(currentPage){
            this.currentPageNum=currentPage;
            var requestBean = "";
            var action = "";
            if(this.keyword === ''){
                requestBean = {pageNum : currentPage, pageSize : this.pageSize};
                action =   "getAll.action"
            } 
            else{
                requestBean = {keywords:this.keyword, pageNum: currentPage,  pageSize: this.pageSize};
                action = "getByKeywords.action"
            }

           
            this.$http.get(this.baseURL+action, requestBean)
            .then((data) => {
                console.log(data);
                if(data.code==1){
                    this.refreshList(data);
                }
            })
        },
        changeTimeFormat(timestamp){
            var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate();
            return Y+M+D;
        },
        // 显示个人用户信息 √
        findInfo(id){
            console.log(id);
            var requestBean = {id : id};
            this.$http.get(this.baseURL+"getUserInfo.action", requestBean)
            .then((data) => {
                console.log(data);
                if(data.code==1){
                    var dataList = data.data;
                    this.employeeInfo = {
                        id: dataList.employeeId,
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
                }
                else{
                    var msg = data.resultMsg;
                    var typ = "error"
                    this.showMasage(msg, typ); 
                }
            })
        },

        // -----------------------------------------------------------------------------
        // 详情操作按钮方法分流
        // 操作下拉栏的所有方法
        toDealAction(actionID,objectID){ //处理操作选项(操作，itemID)
            switch(actionID){
                case '1':
                    // 查看详情
                    this.toDetail(objectID);
                    break;
                case '2':
                    // 查看云共享
                    this.toShare(objectID);
                    break;
            }
       },

        // 查看详情
        toDetail(objectID){
            this.findInfo(objectID);
            this.$bvModal.show('modal-detail');
        },

        // 查看云共享
        toShare(objectID){
            console.log(objectID);
            this.chosen_userInfo.userID = objectID;
            this.$bvModal.show('modal-cloudFile');
        },

        // -----------------------------------------------------------------------------
        // 搜索操作按钮
        toSearch(searchKey){//按条件查询员工
            this.keyword = searchKey;
            this.currentPageNum = 1;
            var requestBean = {keywords:searchKey, pageNum: 1,  pageSize: this.pageSize};
            this.$http.get(this.baseURL+"getByKeywords.action", requestBean)
            .then((data) => {
                console.log(data);
                if(data.code==1){
                    this.refreshList(data);
                }
                 else{
                    this.showMasage(data.resultMsg,"error")
                } 
            })
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
        },

    },
   created() {
        this.findbyPage(1);
   }
  }
</script>

<style>

</style>