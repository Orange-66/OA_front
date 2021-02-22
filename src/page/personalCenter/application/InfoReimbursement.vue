<template>
    <div class="info-reimbursement">
        <BaseActionTable
        :header = header
        :dataList = dataList
        :fields = fields
        :showfind = false
        :showState = true
        :total = total
        :dropdownState = false
        :detailState = true
        :stateList = stateList
        :stateTitle = stateTitle
        ></BaseActionTable>

        <!-- 新增报销申请 -->
        <b-modal id="modal-update-reimbursement" centered title="新增报销申请" @ok="insert()" cancel-title="返回" ok-title="保存">
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">报销金额：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input v-model="addDataDetail.amount"></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">报销用途：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-textarea v-model="addDataDetail.expenseReason" rows="3"></b-form-textarea>
                </b-col>
            </b-row>
        </b-modal>

        <!-- 申请详情 -->
        <b-modal id="modal-detail-reimbursement" centered size="lg" title="申请详情" ok-only ok-title="确定">
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;font-weight:bold">申请员工：</p>
                </b-col>
                <b-col cols="3">
                    <p style="padding:6px 0px;">{{dataDetail.employeeName}}</p>
                </b-col>
                <b-col cols="2" >
                  <p style="padding:6px 0px;font-weight:bold;">部门经理：</p>
                </b-col>
                <b-col cols="3">
                    <p style="padding:6px 0px;">{{dataDetail.manager}}</p>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;font-weight:bold;">报销用途：</p>
                </b-col>
                <b-col cols="8">
                  <p style="padding:6px 0px;">{{dataDetail.expenseReason}}</p>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;font-weight:bold;">申请日期：</p>
                </b-col>
                <b-col cols="3">
                    <p style="padding:6px 0px;">{{dataDetail.appTime}}</p>
                </b-col>
                <b-col cols="2">
                  <p style="padding:6px 0px;font-weight:bold;">审核状态：</p>
                </b-col>
                <b-col cols="3">
                    <el-tag 
                        :type="dataDetail.state === stateList[0] ? 'success' : dataDetail.state === stateList[1] ? 'default' : 'warning'"
                        size="medium">{{ dataDetail.state }}</el-tag>
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
                    :data= this.dataDetail.log
                    :row-style="{height:'45px'}"
                    :cell-style="{padding:'0px'}"
                    >
                    <el-table-column v-for="item in this.detailFields" :key="item.pro" :property="item.pro" :label="item.label" align="center" ></el-table-column>
                    <el-table-column
                        prop="excheckerState"
                        :label="logStateTitle"
                        align="center"
                        >
                        <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <el-tag 
                            :type="scope.row.excheckerState === stateList[0] ? 'success' : scope.row.excheckerState === stateList[1] ? 'default' : 'warning'"
                            size="medium">{{ scope.row.excheckerState }}</el-tag>
                        </div>
                        </template>
                    </el-table-column>
                </el-table>
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
        
            // userid:1,
            type: Object,
            required: true
        
        }
    },
    data() {
      return {
        //   根路径
        baseURL:"person_center/expense/",

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
        dataList:[            
           {
            id:"0",//申请id
            employeeId:"1",
            manager:"管理员",
            amount:"123.12",
            state:"审核中",
            appTime:"2020-3-13"}
        ],
        // 表头数据
        fields:[
            {pro:"id",label:"报销编号"},
            {pro:"manager",label:"部门经理"},
            {pro:"amount",label:"报销金额"},
            {pro:"appTime",label:"申请日期"},
        
        ],
        
            // 分页器 - 当前页
            currentPageNum:1,
            // 分页器 - 页容量
            pageSize:6,

        // ---------------------------------------
        // 详情模态框
        dataDetail:{
            id:"0",//申请id
            employeeId:"1",
            employeeName:"张三",
            manager:"管理员",
            amount:"123.12",
            expenseReason: "团建",
            state:"审核中",
            appTime:"2020-3-13",
            log: [{
                expensecheckId : 1,
                excheckerId: 1,
                excheckerTime: "202-04-04",
                excheckerAdvice: "批准",
                state: "审核中",
                expenseId: 1,
                checkerName: "李清照"
            },
            {
                expensecheckId : 1,
                excheckerId: 1,
                excheckerTime: "202-04-04",
                excheckerAdvice: "批准",
                state: "已通过",
                expenseId: 1,
                checkerName: "李清照"
            },
            {
                expensecheckId : 1,
                excheckerId: 1,
                excheckerTime: "202-04-04",
                excheckerAdvice: "批准",
                state: "已执行",
                expenseId: 1,
                checkerName: "李清照"
            }]
        },
        // 表头数据
        detailFields:[
            {pro:"expensecheckId",label:"序号"},
            {pro:"checkerName",label:"执行人"},
            {pro:"excheckerAdvice",label:"审批意见"},
            {pro:"excheckerTime",label:"执行时间"},
        ],
        logStateTitle:"申请状态",
        // ---------------------------------------
        // 新增模态框
        addDataDetail:{
            employeeId:"1",
            amount:"",
            expenseReason: "",
        }
      }
      
      
    },
    methods:{
        // 申请模块特有的函数
        changeStateFormat(state){
            switch(state){
                case 0: return "审核中";
                case 1: return "已通过";
                case 2: return "已执行";
                default: return "审核中";
            }
        },

        changeTimeFormat(timestamp){
            var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate();
            return Y+M+D;
        },


        // ------------------------------------------
        // 新增
        toInsert(){
            this.$bvModal.show('modal-update-reimbursement');
        },
        insert(){
            var requestBean = {employeeId: this.addDataDetail.employeeId, amount: this.addDataDetail.amount, expenseReason: this.addDataDetail.expenseReason};
            var action = "addExpense.action";
            this.$http.post(this.baseURL+action, requestBean)
            .then((data) => {
                console.log(data);
                if(data.code==1){
                    this.showMasage(data.resultMsg,"success")
                }else{
                    this.showMasage(data.resultMsg,"error")
                }
                this.findbyPage(1);
            })
        },

        // 详情
        toDetail(id){
            this.$bvModal.show('modal-detail-reimbursement');
            console.log(id);
            var requestBean = {id : id};
            this.$http.get(this.baseURL+"getDetail.action", requestBean)
            .then((data) => {
                
                if(data.code==1){
                    var responseBean = data.data;
                    console.log(1, responseBean);
                    this.dataDetail={
                        id: responseBean.expenseId,//申请id
                        employeeId:responseBean.employeeId,
                        employeeName:responseBean.employee.employeeName,
                        manager:responseBean.manager,
                        amount:responseBean.amount,
                        expenseReason: responseBean.expenseReason,
                        state: this.changeStateFormat(responseBean.expenseState),
                        appTime:this.changeTimeFormat(responseBean.appTime),
                        log: responseBean.expensechecks
                    }
                    for(var i = 0; i < this.dataDetail.log.length; i++){
                        this.dataDetail.log[i].excheckerState = this.changeStateFormat(this.dataDetail.log[i].excheckerState);
                        this.dataDetail.log[i].excheckerTime = this.changeTimeFormat(this.dataDetail.log[i].excheckerTime);
                    }
                    console.log(2, this.dataDetail);
                }
                else{
                    var msg = data.resultMsg;
                    var typ = "error"
                    this.showMasage(msg, typ); 
                }
            })
        },

        // 分页显示
        findbyPage(currentPage){
            this.currentPageNum=currentPage;
            var requestBean = {id:this.userInfo.userID, pageNum:currentPage, pageSize:this.pageSize};
            var action = "getAll.action"
           
            this.$http.get(this.baseURL+action, requestBean)
            .then((data) => {
                // console.log(data);
                if(data.code==1){
                    this.refreshList(data);
                }
            })
        },
        refreshList(data){
            console.log(data);
            this.total=data.data.total;
            // console.log(this.totalDataNum);
            var tempList=data.data.list;
            this.dataList=[];
            // 将之前的页数填满
            var num=(this.currentPageNum-1)*7
            for (let j = 0; j < num; j++) {
                this.dataList.push({"id":''})
            }
            // 插入当前页数据
            for (let i = 0; i < tempList.length; i++) {
                this.dataList.push({
                    id:tempList[i].expenseId,//申请id
                    employeeId:tempList[i].employeeId,
                    manager:tempList[i].manager,
                    amount:tempList[i].amount,
                    state:this.changeStateFormat(tempList[i].expenseState),
                    appTime:this.changeTimeFormat(tempList[i].appTime),
                })
            }
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