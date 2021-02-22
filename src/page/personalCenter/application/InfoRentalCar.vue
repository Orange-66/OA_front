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

        <!-- 新增用车申请 -->
        <b-modal id="modal-update-rentalCar" centered title="新增用车申请" @ok="insert()" cancel-title="返回" ok-title="保存">
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">开始时间：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input type="date" v-model="addDataDetail.startTime"></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">结束时间：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input type="date" v-model="addDataDetail.endTime" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">路线：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input v-model="addDataDetail.line" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">用车原因：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-textarea v-model="addDataDetail.reason" rows="3"></b-form-textarea>
                </b-col>
            </b-row>
        </b-modal>
    
            <!-- 申请详情 -->
        <b-modal id="modal-detail-rentalCar" centered size="lg" title="申请详情" ok-only ok-title="确定">
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;font-weight:bold">申请员工：</p>
                </b-col>
                <b-col cols="3">
                    <p style="padding:6px 0px;">{{dataDetail.employeeName}}</p>
                </b-col>
                <b-col cols="2" >
                  <p style="padding:6px 0px;font-weight:bold;">行政主管：</p>
                </b-col>
                <b-col cols="3">
                    <p style="padding:6px 0px;">{{dataDetail.manager}}</p>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;font-weight:bold;">申请时间：</p>
                </b-col>
                <b-col cols="8">
                  <p style="padding:6px 0px;">{{dataDetail.startTime}}&nbsp;~&nbsp;{{dataDetail.endTime}}</p>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;font-weight:bold;">申请原因：</p>
                </b-col>
                <b-col cols="8">
                  <p style="padding:6px 0px;">{{dataDetail.reason}}</p>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;font-weight:bold;">行车路线：</p>
                </b-col>
                <b-col cols="8">
                  <p style="padding:6px 0px;">{{dataDetail.line}}</p>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;font-weight:bold;">申请日期：</p>
                </b-col>
                <b-col cols="3">
                    <p style="padding:6px 0px;">{{dataDetail.applyTime}}</p>
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
                        prop="arrangestatus"
                        :label="logStateTitle"
                        align="center"
                        >
                        <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <el-tag 
                            :type="scope.row.arrangestatus === stateList[0] ? 'success' : scope.row.arrangestatus === stateList[1] ? 'default' : 'warning'"
                            size="medium">{{ scope.row.arrangestatus }}</el-tag>
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
        baseURL:"person_center/applyCar/",

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
            {"pro":"id","label":"申请编号"},
            {"pro":"manager","label":"行政主管"},
            {"pro":"startTime","label":"开始日期"},
            {"pro":"endTime","label":"结束日期"},
            {"pro":"appTime","label":"申请日期"},
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
            {pro:"carcheckId",label:"序号"},
            {pro:"checkerName",label:"执行人"},
            // {pro:"checkerAdvice",label:"审批意见"},
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
            this.$bvModal.show('modal-update-rentalCar');
        },

        insert(){
            var requestBean = {
                employeeId: this.addDataDetail.employeeId, 
                employeeName: this.addDataDetail.employeeName, 
                line: this.addDataDetail.line, 
                reason: this.addDataDetail.reason,
                starttime: this.addDataDetail.startTime, 
                endtime: this.addDataDetail.endTime};
            var action = "addCarApply.action";
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
            this.$bvModal.show('modal-detail-rentalCar');
            console.log("id",id);
            var requestBean = {id : id};
            this.$http.get(this.baseURL+"getDetail.action", requestBean)
            .then((data) => {
                
                if(data.code==1){
                    var responseBean = data.data;
                    console.log("responseBean", responseBean);
                    this.dataDetail={
                        id:responseBean.carapplicationId,//申请id
                        employeeId:responseBean.employeeId,
                        employeeName:responseBean.employeeName,
                        manager:responseBean.manager,
                        startTime:this.changeTimeFormat(responseBean.starttime),
                        endTime:this.changeTimeFormat(responseBean.endtime),
                        reason: responseBean.reason,
                        line:responseBean.line,
                        state:this.changeStateFormat(responseBean.approvalstatus),
                        applyTime:this.changeTimeFormat(responseBean.approvaltime),
                        log: responseBean.applications
                    }
                    
                    for(var i = 0; i < this.dataDetail.log.length; i++){
                        this.dataDetail.log[i].arrangestatus = this.changeStateFormat(this.dataDetail.log[i].checkState);
                        this.dataDetail.log[i].checkTime = this.changeTimeFormat(this.dataDetail.log[i].checkTime);
                    }
                    console.log("dataDetail123123", this.dataDetail);
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
                console.log("findbyPage",data);
                if(data.code==1){
                    this.refreshList(data);
                }
            })
        },
        refreshList(data){
            console.log("dataList12312",data);
            this.total=data.data.total;
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
                    id:tempList[i].carapplicationId,//申请id
                    employeeId:tempList[i].employeeId,
                    manager:tempList[i].manager,
                    startTime:this.changeTimeFormat(tempList[i].starttime),
                    endTime:this.changeTimeFormat(tempList[i].endtime),
                    state:this.changeStateFormat(tempList[i].approvalstatus),
                    appTime:this.changeTimeFormat(tempList[i].approvaltime),
                })
                
            }
            console.log("dataList12312",this.dataList);
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