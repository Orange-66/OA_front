<template>
    <div class="info-reimbursement">
        <b-row>
            <b-col cols="2" offset="9" >
                <b-button variant="primary" size="lg" block @click="addWork">添加新的工作</b-button>
            </b-col>
        </b-row>
        <BaseActionTable
        :header = header
        :dataList = dataList
        :fields = fields
        :showfind = false
        :showState = false
        :showAdd = false
        :total = total
        :dropdownState = false
        :detailState = true
        :stateList = stateList
        :stateTitle = stateTitle
        :buttonText = buttonText
        ></BaseActionTable>

        <!-- 安排工作 -->
        <!-- <b-modal id="modal-arrangeWrok" centered size="lg" title="安排工作" @ok="arrangeWrok()" cancel-title="返回" ok-title="保存">
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;">工作授予人：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input v-model="addDataDetail.startTime"></b-form-input>
                </b-col>
                <b-col cols="2">
                <p style="padding:6px 0px;">工作接受人：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input v-model="addDataDetail.startTime"></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;">开始时间：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input type="date" v-model="addDataDetail.startTime"></b-form-input>
                </b-col>
                <b-col cols="2">
                <p style="padding:6px 0px;">结束时间：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input type="date" v-model="addDataDetail.startTime"></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;">工作主题：</p>
                </b-col>
                <b-col cols="8">
                    <b-form-input v-model="addDataDetail.line" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;">工作内容：</p>
                </b-col>
                <b-col cols="8">
                    <b-form-textarea v-model="addDataDetail.reason" rows="3"></b-form-textarea>
                </b-col>
            </b-row>
        </b-modal> -->
    


    <!-- 添加工作 -->
        <b-modal id="modal-addWrok" centered size="lg" title="安排工作"  @close="cancelInfo"  @cancel="cancelInfo" @ok="arrangeWrok_before" cancel-title="返回" ok-title="保存">
            <form  id="form-updateInfo" @submit.stop.prevent="submitInfo">
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;">工作授予人：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input v-model="userInfo.userName" readonly></b-form-input>
                </b-col>
                <b-col cols="2">
                <p style="padding:6px 0px;">工作接受人：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input v-model="arrangeInfo.workreceiverName" readonly></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;">开始时间：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input type="date"  @blur="isInTimeRange()" :state="timeArange" required v-model="arrangeInfo.workstart"></b-form-input>
                </b-col>
                <b-col cols="2">
                <p style="padding:6px 0px;">结束时间：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input type="date"  @blur="isInTimeRange()" :state="timeArange" required v-model="arrangeInfo.workend"></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;">工作主题：</p>
                </b-col>
                <b-col cols="8">
                    <b-form-input v-model="arrangeInfo.topic" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;">工作内容：</p>
                </b-col>
                <b-col cols="8">
                    <b-form-textarea v-model="arrangeInfo.content" rows="3"></b-form-textarea>
                </b-col>
            </b-row>
            </form>
        </b-modal>
    </div>
</template>

<script>
import BaseActionTable from "@/component/BaseActionTable"
export default {
    components:{
        BaseActionTable
    },
    props:{
      userInfo:{
            type: Object,
            required: true
        },
    },
    data() {
      return {
          timeArange:"",
        //   根路径
         baseURL: "work_arrangement/arrangement/",
        buttonText:"安排工作",
        // ---------------------------------------
        // 组件变量
        // 总数据条目数
        total:'',
        // 卡片表头控制器
        header:"",
        // 状态列表
        stateList:[
                "已通过",//绿
                "已执行",//蓝
                "审核中"//黄
        ],
        // 状态标题
        stateTitle:"申请状态",
        // 数据列表
        dataList : [            
            {
            employeeName:"哈哈",//申请id
            departmentName:"外派部",
            jobName:"外派管理员"
            }  
        ],
        // 表头数据
        fields:[
            {"pro":"employeeName","label":"姓名"},
            {"pro":"departmentName","label":"部门"},
            {"pro":"jobName","label":"职位"}
        ],

        // 分页器 - 当前页
        currentPageNum:1,
        // 分页器 - 页容量
        pageSize:7,

        // ---------------------------------------
        // 详情模态框
        dataDetail:{
            id:"0",//申请id
            employeeId:"1",
            employeeName:"哈哈",
            manager:"管理员",
            startTime:"2020-3-16",
            endTime:"2020-3-18",
            reason: "团建",
            line:"公司到飞机场",
            state:"审核中",
            applyTime:"2020-3-13",
            log: [{
                toarrangeId: 1,
                managerId: 1,
                managerName: "李清照",
                approvaltime: "2020-04-04",
                arrangestatus: "已审核",
                carapplicationId: 1
            },
            {
                toarrangeId: 1,
                managerId: 1,
                managerName: "李清照",
                approvaltime: "2020-04-04",
                arrangestatus: "已通过",
                carapplicationId: 1
            },
            {
                toarrangeId: 1,
                managerId: 1,
                managerName: "李清照",
                approvaltime: "2020-04-04",
                arrangestatus: "已执行",
                carapplicationId: 1
            }]
        },

        // 表头数据
        detailFields:[
            {pro:"toarrangeId",label:"序号"},
            {pro:"managerName",label:"执行人"},
            // {pro:"checkerAdvice",label:"审批意见"},
            {pro:"approvaltime",label:"执行时间"},
        ],
        logStateTitle:"申请状态",

        // ---------------------------------------
        // 新增模态框
        addDataDetail:{
            employeeId:"1",
            employeeName:"张安",
            line:"",
            reason: "",
            startTime:"",
            endTime:""
        },

        arrangeInfo:{
            workgiverId: "",
            workreceiverId: "",
            workstart: "",
            workend: "",
            content: "",
            topic: "",
            workstate: "",
            workgiverName:"",
            workreceiverName: ""
        }

       
      }
      
      
    },
    methods:{
         cancelInfo()
        {
            console.log("cancelInfo")
            this.timeArange = "";
            this.arrangeInfo = {
                workgiverId: "",
            workreceiverId: "",
            workstart: "",
            workend: "",
            content: "",
            topic: "",
            workstate: "",
            workgiverName:"",
            workreceiverName: ""
            }
        },
        isInTimeRange(){
            if(this.arrangeInfo.workstart != "" && this.arrangeInfo.workend != ""){
                this.timeArange = this.arrangeInfo.workstart < this.arrangeInfo.workend;
                if(!this.timeArange){
                    this.showMasage("开始时间不得晚于结束时间!","error")
                }
            }
        },
        // 防止提前关闭modal框函数 √
        // 防止关闭修改个人信息框 √
        arrangeWrok_before(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault();
            // Trigger submit handler
            this.submitInfo();
        },
        submitInfo(){

           if (this.arrangeInfo.workstart == "" && this.arrangeInfo.workend == "") {
               this.timeArange = false
               this.showMasage("请填写完整开始时间与结束时间!","error")
                return
            }
            if (!this.timeArange) {
                return
            }
            // Push the name to submitted names
            this.arrangeWrok();
            // Hide the modal manually
            this.$nextTick(() => {
                this.$bvModal.hide('modal-addWrok')
            })
        },
        addWork(){
            this.$bvModal.show('modal-addWrok');
            this.arrangeInfo.workreceiverId = this.userInfo.userID
            this.arrangeInfo.workreceiverName = this.userInfo.userName
            this.arrangeInfo.workgiverId = this.userInfo.userID;
            this.arrangeInfo.workgiverName = this.userInfo.userName
        },

        // 申请模块特有的函数
        changeStateFormat(state){
            switch(state){
                case 0: return "审核中";
                case 1: return "已通过";
                case 2: return "已执行";
            }
        },

        changeTimeFormat(timestamp){
            var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate();
            return Y+M+D;
        },

        // 详情
        toDetail(id){
            console.log("123123", this.dataList, id)
            for(let i = 0; i < this.dataList.length; i++){
                if(this.dataList[i].id == id){
                    this.arrangeInfo.workreceiverId = this.dataList[i].id;
                    this.arrangeInfo.workreceiverName = this.dataList[i].employeeName;
                    this.arrangeInfo.workgiverId = this.userInfo.userID;
                    this.arrangeInfo.workgiverName = this.userInfo.userName
                    break;
                }
            }
            console.log(this.arrangeInfo);
            this.$bvModal.show('modal-addWrok');

        },
        arrangeWrok(){
            var requestBean = {
                workgiverId : this.arrangeInfo.workgiverId,
                workreceiverId: this.arrangeInfo.workreceiverId,
                workstart : this.arrangeInfo.workstart,
                workend : this.arrangeInfo.workend,
                content : this.arrangeInfo.content,
                topic : this.arrangeInfo.topic,
                workgiverName : this.arrangeInfo.workgiverName,
                workreceiverName : this.arrangeInfo.workreceiverName
            };
            var action = "arrangeWork.action"
            console.log("arrangeWorkr",requestBean);
            this.$http.post(this.baseURL+action, requestBean)
            .then((data) => {
                if(data.code == 1){
                    this.showMasage(data.resultMsg, "success")
                                        this.cancelInfo();
                }
            })
        },
        // 分页显示
    // 刷新页面
        findbyPage(currentPage){
            this.currentPageNum=currentPage;
        var requestBean = {id: this.userInfo.userID, pageNum: this.currentPageNum,  pageSize:this.pageSize};
        var action = "getEmployee.action"

        this.$http.get(this.baseURL+action, requestBean)
        .then((data) => {
            if(data.code==1){
                this.refreshList(data.data);
            }
        })
      },
        // 刷新列表 √
        refreshList(data){
            console.log(123,data);
            this.total=data.total;
            // console.log(this.total);
            var tempList=data.list;
            this.dataList=[];
            // 将之前的页数填满
            var num=(this.currentPageNum-1)*7
            for (let j = 0; j < num; j++) {
                this.dataList.push({"id":''})
            }
            // 插入当前页数据
            for (let i = 0; i < tempList.length; i++) {
                this.dataList.push({
                    id : tempList[i].employeeId,
                    employeeName: tempList[i].employeeName,//申请id
                    departmentName: tempList[i].department.departmentName,
                    jobName: tempList[i].job.jobName
                })
            }
        },


        arrangeWork(){
            var requestBean = {
                workgiverId: this.userInfo.employeeId,
                workreceiverId: this.userInfo.employeeId,
                workstart: this.arrangeInfo.workstart,
                workend: this.arrangeInfo.workend,
                content: this.arrangeInfo.content,
                topic: this.arrangeInfo.topic,
                workstate: this.arrangeInfo.workstate,
                workgiverName: this.userInfo.employeeName,
                workreceiverName: this.userInfo.employeeName
            };
            var action = "arrangeWork.action"

            this.$http.get(this.baseURL+action, requestBean)
            .then((data) => {
                // console.log(data);
                if(data.code==1){
                    this.showMasage(data.resultMsg, "success");

                }
            })
        },


        // -----------------------------------------------------------------------------
        //每个页面都会用到的基础函数
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
    created(){
        this.findbyPage();
    }
  }
</script>

<style>

</style>