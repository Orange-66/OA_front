<template>
    <div class="info-reimbursement">
        <b-row align-h="around">
            <b-col cols="2">
                <b-button variant="primary" size="lg" block @click="show_1">编辑我的任务</b-button>
            </b-col>
            <b-col  cols="2">
                <b-button variant="primary" size="lg" block @click="show_2">编辑授予任务</b-button>
            </b-col>
            <b-col  cols="2">
                <b-button variant="primary" size="lg" block @click="show_3">查看我的任务</b-button>
            </b-col>
            <b-col  cols="2">
                <b-button variant="primary" size="lg" block @click="show_4">查看他人任务</b-button>
            </b-col>
        </b-row>
        <div v-show="lock_1">
            <BaseActionTable
            :header = header
            :dataList = dataList
            :fields = fields
            :showfind = false
            :showState = true
            :showAdd = false
            :total = total
            :dropdownState = true
            :detailState = false
            :options = options
            :stateTitle = stateTitle2
            :stateList = stateList
            ></BaseActionTable>
        </div>

        <div v-show="lock_2">
            <BaseActionTable
            :header = header
            :dataList = dataList
            :fields = fields
            :showfind = false
            :showState = true
            :showAdd = false
            :total = total
            :dropdownState = true
            :detailState = false
            :options = options
            :stateTitle = stateTitle2
            :stateList = stateList
            ></BaseActionTable>
        </div>

        <div v-show="lock_3">
            <BaseActionTable
            :header = header
            :dataList = dataList
            :fields = fields
            :showfind = false
            :showState = true
            :showAdd = false
            :total = total
            :dropdownState = false
            :detailState = true
            :buttonText = buttonText_1
            :options = options
            :stateTitle = stateTitle2
            :stateList = stateList
            ></BaseActionTable>
        </div>

        <div v-show="lock_4">
            <BaseActionTable
            :header = header
            :dataList = dataList
            :fields = fields
            :showfind = false
            :showState = true
            :showAdd = false
            :total = total
            :dropdownState = false
            :detailState = true
            :buttonText = buttonText_1
            :options = options
            :stateTitle = stateTitle2
            :stateList = stateList
            ></BaseActionTable>
        </div>
         <!-- 新增用车申请 -->
        <b-modal id="modal-editWork" centered size="lg" title="安排工作" @ok="editWork()" cancel-title="返回" ok-title="保存">
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;">工作授予人：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input v-model="editInfo.workgiverName" ></b-form-input>
                </b-col>
                <b-col cols="2">
                <p style="padding:6px 0px;">工作接受人：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input v-model="editInfo.workreciverName"></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;">开始时间：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input type="date" v-model="editInfo.workstart"></b-form-input>
                </b-col>
                <b-col cols="2">
                <p style="padding:6px 0px;">结束时间：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input type="date" v-model="editInfo.workend"></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;">工作主题：</p>
                </b-col>
                <b-col cols="8">
                    <b-form-input v-model="editInfo.topic" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;">工作内容：</p>
                </b-col>
                <b-col cols="8">
                    <b-form-textarea v-model="editInfo.content" rows="3"></b-form-textarea>
                </b-col>
            </b-row>
        </b-modal>
     <!-- 新增用车申请 -->
        <b-modal id="modal-searchWork" centered size="lg" title="查看工作" ok-only ok-title="确定">
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;">工作授予人：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input v-model="editInfo.workgiverName" readonly style="background-color:white"></b-form-input>
                </b-col>
                <b-col cols="2">
                <p style="padding:6px 0px;">工作接受人：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input v-model="editInfo.workreciverName" readonly style="background-color:white"></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;">开始时间：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input type="date" v-model="editInfo.workstart" readonly style="background-color:white"></b-form-input>
                </b-col>
                <b-col cols="2">
                <p style="padding:6px 0px;">结束时间：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input type="date" v-model="editInfo.workend" readonly style="background-color:white"></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;">工作主题：</p>
                </b-col>
                <b-col cols="8">
                    <b-form-input v-model="editInfo.topic" readonly style="background-color:white"></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;">工作内容：</p>
                </b-col>
                <b-col cols="8">
                    <b-form-textarea v-model="editInfo.content" rows="3" readonly style="background-color:white"></b-form-textarea>
                </b-col>
            </b-row>
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
        stateTitle2:"完成状态",
        lock_1: true,
        lock_2:false,
        lock_3:false,
        lock_4:false,
        options:[
              {text: '编辑工作', value: '1'},
              {text: '完成工作', value: '2'},
              {text: '删除工作', value: '3'},
          ],
        //   根路径
        baseURL:"work_arrangement/arrangement/",
        buttonText:"安排工作",
        buttonText_1:"查看工作",
        // ---------------------------------------
        // 组件变量
        // 总数据条目数
        total:'',
        // 卡片表头控制器
        header:"",
        // 状态列表
        stateList:[
                "已完成",//绿
                // "已执行",//蓝
                "未完成",//黄
                ""
        ],
        // 状态标题
        stateTitle:"申请状态",
        // 数据列表
        dataList : [            
           {
            workgiverName:"0",//申请id
            workreciverName:"1",
            topic:"管理员",
            appTime:"2020-3-16",
            workstate:"2020-3-18",
            }  
        ],
        // 表头数据
        fields:[
            {"pro":"workgiverName","label":"授予人"},
            {"pro":"workreciverName","label":"接收人"},
            {"pro":"topic","label":"工作主题"},
            {"pro":"appTime","label":"布置时间"},
            // {"pro":"workstate","label":"完成状态"},
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
        editInfo:{
            workgiverName: "",//申请id
            workgiverId: "",//申请id
            workreciverName: "",
            workreciverId:"",
            topic: "",
            appTime: "",
            workstate: "",
        }
      }
      
      
    },
    methods:{
        changeTimeFormat(timestamp){
            var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate());
            return Y+M+D;
        },
        editWork(){
            var requestBean = this.editInfo;
            var action = "updateWork.action"
            console.log(requestBean)
            this.$http.post(this.baseURL+action, requestBean)
            .then((data) => {
                console.log(data);
                if(data.code==1){
                    this.showMasage(data.resultMsg, "success")
                    this.findbyPage(1);
                }
            })
        },
        show_1(){
            this.lock_1 = true;
            this.lock_2 = false;
            this.lock_3 = false;
            this.lock_4 = false;
            this.currentPageNum = 1;
            this.findbyPage(1);
        },
        show_2(){
            this.lock_1 = false;
            this.lock_2 = true;
            this.lock_3 = false;
            this.lock_4 = false;
            this.currentPageNum = 1;
            this.findbyPage(1);
        },
        show_3(){
            this.lock_1 = false;
            this.lock_2 = false;
            this.lock_3 = true;
            this.lock_4 = false;
            this.currentPageNum = 1;
            this.findbyPage(1);
        },
        show_4(){
            this.lock_1 = false;
            this.lock_2 = false;
            this.lock_3 = false;
            this.lock_4 = true;
            this.currentPageNum = 1;
            this.findbyPage(1);
        },
// 操作下拉栏的所有方法
        toDealAction(actionID,objectID){ //处理操作选项(操作，itemID)
            if(this.lock_1 || this.lock_2){
                switch(actionID){
                    case '1':
                        // 查看详情
                        this.toSearch(objectID);
                        break;
                    case '2':
                        // 查看云共享
                        this.completeWork(objectID);
                        break;
                    case '3':
                        // 删除
                        this.deleteWork(objectID);
                        break;
                }
            }

        },

        findbyPage(currentPageNum){
            this.currentPageNum = currentPageNum;
        var requestBean = {id: this.userInfo.userID, pageNum: this.currentPageNum,  pageSize:this.pageSize};
        var action
        if(this.lock_1 || this.lock_3){
            action = "getMyWork.action"
        }
        else{
            action = "getArrangeWork.action"
        }

        this.$http.get(this.baseURL+action, requestBean)
        .then((data) => {
            console.log(12312321312312312312312312123123,data);
            if(data.code==1){
                this.refreshList(data.data);
            }
        })
      },
        // 刷新列表 √
        refreshList(data){
            // console.log(dataList);
            this.total=data.total;
            console.log(this.total);
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
                    id: tempList[i].workId,
                    workgiverName: tempList[i].workgiverName,//申请id
                    workgiverId: tempList[i].workgiverId,//申请id
                    workreciverName: tempList[i].workreceiverName,
                    workreciverId:tempList[i].workreceiverId,
                    topic: tempList[i].topic,
                    appTime: this.changeTimeFormat(tempList[i].appTime),
                    state: this.changeStateFormat(tempList[i].workstate),
                    content: tempList[i].content,
                    workstart:this.changeTimeFormat(tempList[i].workstart),
                    workend: this.changeTimeFormat(tempList[i].workend),
                })
            }

        },
        // 申请模块特有的函数
        changeStateFormat(state){
            switch(state){
                case 0: return "未完成";
                case 1: return "已完成";
            }
        },
        toSearch(id){
for(let i = 0; i < this.dataList.length; i++){
                if(this.dataList[i].id == id){
                    this.editInfo.workId = this.dataList[i].id
                    this.editInfo.workgiverName = this.dataList[i].workgiverName;
                    this.editInfo.workreciverName = this.dataList[i].workreciverName;
                    this.editInfo.workgiverId = this.dataList[i].workgiverId;
                    this.editInfo.workreciverId = this.dataList[i].workreciverId;
                    this.editInfo.topic = this.dataList[i].topic
                    this.editInfo.appTime = this.dataList[i].appTime
                    this.editInfo.content = this.dataList[i].content
                    this.editInfo.workstate = this.dataList[i].workstate
                    this.editInfo.workstart = this.dataList[i].workstart;
                    this.editInfo.workend = this.dataList[i].workend;
                    break;
                }
            }
            this.$bvModal.show('modal-editWork');
            console.log(36574654657465,this.editInfo);
        },
    

        // 详情
        toDetail(id){
            for(let i = 0; i < this.dataList.length; i++){
                if(this.dataList[i].id == id){
                    this.editInfo.workId = this.dataList[i].id
                    this.editInfo.workgiverName = this.dataList[i].workgiverName;
                    this.editInfo.workreciverName = this.dataList[i].workreciverName;
                    this.editInfo.workgiverId = this.dataList[i].workgiverId;
                    this.editInfo.workreciverId = this.dataList[i].workreciverId;
                    this.editInfo.topic = this.dataList[i].topic
                    this.editInfo.appTime = this.dataList[i].appTime
                    this.editInfo.content = this.dataList[i].content
                    this.editInfo.workstate = this.dataList[i].workstate
                    this.editInfo.workstart = this.dataList[i].workstart;
                    this.editInfo.workend = this.dataList[i].workend;
                    break;
                }
            }
            this.$bvModal.show('modal-searchWork');
            console.log(36574654657465,this.editInfo);
        },

        completeWork(id){
            var requestBean = {id: id};
            var action = "completeWork.action";
            console.log(8888888888888888,id);
            this.$http.get(this.baseURL+action, requestBean)
            .then((data) => {
                console.log(data);
                if(data.code==1){
                    this.findbyPage(1);
                    this.showMasage(data.resultMsg, "success")
                }
                else{
                    this.showMasage(data.resultMsg, "error")

                }
            })

        },
        deleteWork(id){
            var requestBean = {id: id};
            var action = "deleteWork.action";

            this.$http.get(this.baseURL+action, requestBean)
            .then((data) => {
                console.log(data);
                if(data.code==1){
                    this.findbyPage(1);
                     this.showMasage(data.resultMsg, "success")
                }
                else{
                    this.showMasage(data.resultMsg, "error")

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
        console.log("userInfo",this.userInfo)
    }
  }
</script>

<style>

</style>