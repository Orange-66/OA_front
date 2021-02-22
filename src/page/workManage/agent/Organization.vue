<template>
    <div>
        <b-row>
            <b-col cols="1" offset="1">
                <b-button-group vertical>
                    
                    <b-button @click="getEmployeeByDepart(0)" variant="light" style="width:130px;border:1px solid silver ;color:grey" size="lg" bolck>全体员工</b-button>
                    
                    <b-button v-for="(item,index) in this.departmentList" :key="index" @click="getEmployeeByDepartment(item.departmentId)" variant="light" style="width:130px;border:1px solid silver ;color:grey" size="lg" bolck>{{item.departmentName}}</b-button>
                    
                </b-button-group>
            </b-col>
            <b-col cols="9">
                <div class="application-panel">
                        <BaseActionTable
                        ref = "BaseActionTable"
                        :header = header
                        :dataList = dataList
                        :fields = fields
                        :showfind = false
                        :showAdd = false
                        :showState = false
                        :total = total
                        :dropdownState = true
                        :options = options
                        :detailState = false
                        ></BaseActionTable>

                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import LeaveApproval from '@/page/workManage/approval/LeaveApproval'
import ReimbursementApproval from '@/page/workManage/approval/ReimbursementApproval'
import RentalApproval from '@/page/workManage/approval/RentalApproval'
import BaseActionTable from "@/component/BaseActionTable"
export default {
    components:{
      BaseActionTable,
        LeaveApproval,
        ReimbursementApproval,
        RentalApproval
    },
    props:{
      userInfo:{
            type: Object,
            required: true
        },
    },
    data() {
      return {
          baseURL:"work_arrangement/readSet/",
          options:[
              {text: '设置为读者', value: '1'},
              {text: '设置为代办', value: '2'},
          ],
        buttonText:"删除",
        header:"",
                // 数据列表
        dataList : [            
           {
            employeeId:"1",
            name:"管理员",
            jobId:"2020-3-16",
            jobName:"2020-3-18",
            departmentId:"审核中",
            departmentName:"2020-3-13"}  
        ],
        // 表头数据
        fields:[
            {"pro":"employeeName","label":"姓名"},
            {"pro":"departmentName","label":"部门"},
            {"pro":"jobName","label":"职位"},
        ],
        total:"",
        pageSize:7,
        currentPageNum:"",
        pageNum:"",
        departmentList :[],
        departmentID : -1,
        oldDepartment :""
      }
      
      
    },
    methods:{
        getDepartment(){
            // var requestBean = {
            //     id: this.userInfo.userID,
            //     pageNum: this.currentPageNum, 
            //     pageSize:this.pageSize
            // };
            // console.log("selectAll", requestBean)
            var action = "getDepartment.action"

            this.$http.get(this.baseURL+action)
            .then((data) => {
                if(data.code==1){
                    this.departmentList = data.data;
                }
            })
        },
        getEmployeeByDepart(){
            this.departmentID = -1
             this.$refs.BaseActionTable.currentChange(1);
        },
        getEmployeeByDepartment(type){
            console.log(type)
             this.departmentID = type
             this.$refs.BaseActionTable.currentChange(1);
        },
        // 详情
        toDetail(){
            this.$bvModal.show('modal-addWrok');
        },
         // 分页显示
    // 刷新页面
        findbyPage(currentPage){
            console.log(123)
            this.currentPageNum=currentPage;

            var requestBean;
            var action;
            if(this.departmentID == -1){
                requestBean = {
                    id: this.userInfo.userID,
                    pageNum: this.currentPageNum, 
                    pageSize:this.pageSize
                };
                // console.log("selectAll", requestBean)
                
                action = "getEmployeeByDepart.action"
            }
            else{
                requestBean = {
                    employeeId : this.userInfo.userID,
                    departId : this.departmentID,
                    pageNum : this.pageNum,
                    pageSize : this.pageSize
                };
                // console.log("selectAll", requestBean)
                action = "getEmployeeByDepartment.action"
            }


            this.$http.get(this.baseURL+action, requestBean)
            .then((data) => {
                if(data.code==1){
                    this.refreshList(data.data);
                }
                else{
                    this.showMasage(data.resultMsg, "error")
                    this.dataList = []
                    this.total = 1
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
                    employeeName : tempList[i].employeeName,
                    departmentName : tempList[i].department.departmentName,
                    jobName : tempList[i].job.jobName,
                })
            }
        },
        // 操作下拉栏的所有方法
        toDealAction(actionID, readReceiverId){ //处理操作选项(操作，itemID)
            switch(actionID){
                case '1':
                    // 查看详情
                    this.setRead(readReceiverId);
                    break;
                case '2':
                    // 查看云共享
                    this.setDo(readReceiverId);
                    break;
            }

        },

        setRead(readReceiverId){
            var receiverIdDepartName = "";
            var receiverIdJobName = "";
            var receiverIdName = ""
            for(let i= 0; i< this.dataList.length; i++){
                if(this.dataList[i].id == readReceiverId){
                    receiverIdDepartName = this.dataList[i].departmentName
                    receiverIdJobName = this.dataList[i].jobName
                    receiverIdName = this.dataList[i].employeeName
                }
            }
            var requestBean = {
                readgiverId : this.userInfo.userID,
                readreceiverId : readReceiverId,
                receiverName:receiverIdName,
                receiverDepartName:receiverIdDepartName,
                receiverJobName:receiverIdJobName,
                readstate : 0
            }
            var action = "setRead.action"

            this.$http.post(this.baseURL+action, requestBean)
            .then((data) => {
                if(data.code==1){
                    this.showMasage(data.resultMsg, "success")
                    this.$parent.$parent.$parent.findbyPage(1);
                }
                else{
                    this.showMasage(data.resultMsg, "error")
                }
            })
        },

        setDo(readReceiverId){
            var receiverIdDepartName = "";
            var receiverIdJobName = "";
            var receiverIdName = ""
            for(let i= 0; i< this.dataList.length; i++){
                if(this.dataList[i].id == readReceiverId){
                    receiverIdDepartName = this.dataList[i].departmentName
                    receiverIdJobName = this.dataList[i].jobName
                    receiverIdName = this.dataList[i].employeeName
                }
            }
            var requestBean = {
                readgiverId : this.userInfo.userID,
                readreceiverId : readReceiverId,
                receiverName:receiverIdName,
                receiverDepartName:receiverIdDepartName,
                receiverJobName:receiverIdJobName,
                readstate : 1
            }
            var action = "setRead.action"
            
            this.$http.post(this.baseURL+action, requestBean)
            .then((data) => {
                if(data.code==1){
                    this.showMasage(data.resultMsg, "success")
                    this.$parent.$parent.$parent.findbyPage(1);
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
        this.findbyPage(1)
        this.getDepartment();
    }
  }
</script>

<style>

</style>