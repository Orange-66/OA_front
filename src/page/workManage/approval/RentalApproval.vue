<template>
    <div class="info-reimbursement">
        <BaseActionTable
        :header = header
        :dataList = dataList
        :fields = fields
        :showfind = false
        :showState = false
        :total = total
        :showAdd = false
        :dropdownState = false
        :detailState = true
        :stateList = stateList
        :stateTitle = stateTitle
        :buttonText = buttonText
        ></BaseActionTable>

        <!-- 申请详情 -->
        <b-modal id="modal-detail-rentalCar" centered size="lg" title="申请详情">
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;font-weight:bold">申请员工：</p>
                </b-col>
                <b-col cols="3">
                    <p style="padding:6px 0px;">{{approvalInfo.employeeName}}</p>
                </b-col>
                <b-col cols="2" >
                  <p style="padding:6px 0px;font-weight:bold;">部门经理：</p>
                </b-col>
                <b-col cols="3">
                    <p style="padding:6px 0px;">{{approvalInfo.manager}}</p>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;font-weight:bold;">申请时间：</p>
                </b-col>
                <b-col cols="8">
                  <p style="padding:6px 0px;">{{approvalInfo.starttime}} ~ {{approvalInfo.endtime}}</p>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;font-weight:bold;">请假原因：</p>
                </b-col>
                <b-col cols="3">
                    <p style="padding:6px 0px;">{{approvalInfo.reason}}</p>
                </b-col>
                <b-col cols="2">
                  <p style="padding:6px 0px;font-weight:bold;">审核状态：</p>
                </b-col>
                <b-col cols="3">
                    <p style="padding:6px 0px;">{{approvalInfo.approvalstatus}}</p>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="4" offset="1">
                    <hr/>
                </b-col>
                <b-col cols="2" style="text-align: center;">
                <p style="padding:6px 0px;">审批流程日志</p>
                </b-col>
                <b-col cols="4">
                    <hr/>
                </b-col>
            </b-row>

            <el-table
                    class="m-1"
                    :data= this.approvalInfo.applications
                    :row-style="{height:'45px'}"
                    :cell-style="{padding:'0px'}"
                    >
                    <el-table-column v-for="item in this.detailFields" :key="item.pro" :property="item.pro" :label="item.label" align="center" ></el-table-column>
                    <!-- <el-table-column
                        prop="checkState"
                        :label="logStateTitle"
                        align="center"
                        >
                        <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <el-tag 
                            :type="scope.row.checkState === stateList[0] ? 'success' : scope.row.checkState === stateList[1] ? 'default' : 'warning'"
                            size="medium">{{ scope.row.checkState }}</el-tag>
                        </div>
                        </template>
                    </el-table-column> -->
                </el-table>

                <b-row >
                    <b-col cols="10" offset="1">
                        <hr/>
                    </b-col>
                </b-row>
                <b-row >
                    <b-col cols="10" offset="1">
                        <b-form-textarea
                        id="textarea"
                        v-model="approvalInfo.suggestion"
                        placeholder="请输入审批意见"
                        rows="4"
                        ></b-form-textarea>
                    </b-col>
                </b-row>

                <template v-slot:modal-footer align-h="around">
                    <b-button variant="danger" @click="refuse">
                        拒绝
                    </b-button>
                    <b-button variant="success" @click="approve">
                        同意
                    </b-button>
                </template> 
        </b-modal>
    
    </div>
</template>

<script>
import BaseActionTable from "../../../component/BaseActionTable"
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
        //   根路径
        baseURL:"person_center/applyCar/",
 buttonText:"审批",
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
            id:"0",//申请id
            employeeId:"1",
            manager:"管理员",
            startTime:"2020-3-16",
            endTime:"2020-3-18",
            state:"审核中",
            appTime:"2020-3-13"}  
        ],
        // 表头数据
        fields:[
            {"pro":"employeeName","label":"申请员工"},
            {"pro":"expenseReason","label":"申请原因"},
            {"pro":"manager","label":"部门领导"},
            {"pro":"approvalstatus","label":"当前审批流程"},
            {"pro":"appTime","label":"申请提交日期"},
        ],

        // 分页器 - 当前页
        currentPageNum:1,
        // 分页器 - 页容量
        pageSize:5,

        // ---------------------------------------
        // 详情模态框
        dataDetail:{
            id:"0",//申请id
            employeeId:"1",
            employeeName:"张三",
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
            {pro:"id",label:"序号"},
            {pro:"checkerName",label:"执行人"},
            {pro:"checkAdvice",label:"审批意见"},
            {pro:"checkTime",label:"执行时间"},
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
                approvalInfo:{
            id:"",
            employeeName:"",
            manager:"",
            expenseReason: "",
            amount: "",
            expenseState:"",
            expensechecks:"",
            appTime:"",
        }
      }
      
      
    },
    methods:{
         // 申请模块特有的函数
        changeStateFormat(state){
            switch(state){
                case 0: return "部门主管审批";
                case 1: return "财务部门报销";
            }
        },

        changeTimeFormat(timestamp){
            var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate());
            return Y+M+D;
        },

        // 详情
        toDetail(id){
            
             // console.log(134523,this.dataList)
            var requestBean = {id: id};
            var action = "getDetail.action"
            console.log("requestBean", requestBean)
            this.$http.get("person_center/applyCar/"+action, requestBean)
            .then((data) => {
                console.log(123123123,data)
                if(data.code==1){
                    this.approvalInfo = {
                        id:data.data.carapplicationId,
                        employeeName:data.data.employeeName,
                        manager:data.data.departmanager,
                        reason: data.data.reason,
                        amount: data.data.amount,
                        approvalstatus:this.changeStateFormat(data.data.approvalstatus),
                        starttime:this.changeTimeFormat(data.data.starttime),
                        endtime:this.changeTimeFormat(data.data.endtime),
                        applications:data.data.applications,
                        appTime: this.changeTimeFormat(data.data.approvaltime),
                        line:data.data.line
                    };
                    for(let i = 0; i < this.approvalInfo.applications.length; i++){
                        this.approvalInfo.applications[i].id = this.approvalInfo.applications[i].carcheckId
                        this.approvalInfo.applications[i].checkState = this.changeStateFormat(this.approvalInfo.applications[i].checkState)
                        this.approvalInfo.applications[i].checkTime = this.changeTimeFormat(this.approvalInfo.applications[i].checkTime)
                    }
                    console.log(34534,this.approvalInfo)
                }
            })
            
            this.$bvModal.show('modal-detail-rentalCar');
        },

// 分页显示
    // 刷新页面
        findbyPage(currentPage){
            console.log(currentPage)
            this.currentPageNum=currentPage;
            var requestBean = {id: this.userInfo.userID, pageNum: this.currentPageNum,  pageSize:this.pageSize};
            var action = "getAll.action"
            console.log("requestBean", requestBean)
            this.$http.get(this.baseURL+action, requestBean)
            .then((data) => {
                if(data.code==1){
                    this.refreshList(data.data);
                }
            })
        },
        // 刷新列表 √
        refreshList(data){
            console.log(7451231265,data)
            this.total=data.total;
            // console.log(this.total);
            var tempList=data.list;
       
            this.dataList=[];
          
            // 将之前的页数填满
            var num=(this.currentPageNum-1)*7
        
            for (let j = 0; j < num; j++) {
                this.dataList.push({"id":''})
            }

                // console.log(6666,this.dataList)
            // 插入当前页数据
            for (let i = 0; i < tempList.length; i++) {
        
                this.dataList.push({
                    id : tempList[i].carapplicationId,
                    employeeId: tempList[i].employeeId,//申请id
                    employeeName: tempList[i].employeeName,
                    expenseReason: tempList[i].reason,
                    manager: tempList[i].departmanager,//申请id
                    approvalstatus: this.changeStateFormat(tempList[i].approvalstatus),
                    appTime: this.changeTimeFormat(tempList[i].approvaltime),
                    amount: tempList[i].amount
                })
            }

            console.log(6666,this.dataList)
        },


        approve(){
          var requestBean = {
                applyId: this.approvalInfo.id,
                checkId: this.userInfo.userID,
                suggestion: this.approvalInfo.suggestion,
                state :1
            }
            var action = "check.action";
            console.log(requestBean)

            this.$http.get("work_arrangement/carCheck/"+action, requestBean)
            .then((data)=>{
                if(data.code == 1){
                    this.showMasage(data.resultMsg, "success")
                    this.$bvModal.hide('modal-detail-rentalCar');
                    this.findbyPage(1)
                }
            })
        },

        refuse(){
          var requestBean = {
                applyId: this.approvalInfo.id,
                checkId: this.userInfo.userID,
                suggestion: this.approvalInfo.suggestion,
                state :2
            }
            var action = "check.action";

            this.$http.get("work_arrangement/carCheck/"+action, requestBean)
            .then((data)=>{
                if(data.code == 1){
                this.showMasage(data.resultMsg, "success")
                    this.$bvModal.hide('modal-detail-rentalCar');
                    this.findbyPage(1)
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
        this.findbyPage(1);
    }
  }
</script>

<style>

</style>