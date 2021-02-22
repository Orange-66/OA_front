<template>
  <div class="application-panel">
            <BaseActionTable
            :header = header
            :dataList = dataList
            :fields = fields
            :showfind = false
            :showAdd = false
            :showState = false
            :total = total
            :dropdownState = false
            :detailState = flase
            :buttonText = buttonText
            ></BaseActionTable>

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
        buttonText:"删除",
        header:"",
                // 数据列表
        dataList : [            
             
        ],
        // 表头数据
        fields:[
            {"pro":"employeeName","label":"姓名"},
            {"pro":"departmentName","label":"部门"},
            {"pro":"jobName","label":"职位"},
            {"pro":"state","label":"代读状态"},
        ],
        total:1,
        currentPageNum:1,
        pageSize:7
      }
      
      
    },
    methods:{
        // 详情
        toDetail(readId){
              var requestBean = {id: readId}
              var action = "deleteRead.action"
              this.$http.get(this.baseURL+action, requestBean)
            .then((data) => {
              if(data.code == 1){
                this.showMasage(data.resultMsg, "success");
                this.$parent.$parent.$parent.findbyPage(1);
              }
            })
            },

      // 分页显示
    // 刷新页面
        findbyPage(currentPage){
            this.currentPageNum=currentPage;
             var  requestBean = {
                    id : this.userInfo.userID,
                    pageNum : this.currentPageNum,
                    pageSize : this.pageSize
                };
                // console.log("selectAll", requestBean)
             var   action = "getAll.action"
          


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
                    id : tempList[i].readId,
                    employeeId : tempList[i].readgiverId,
                    employeeName : tempList[i].receiverName,
                    departmentName : tempList[i].receiverDepartName,
                    state: this.changeStateFormat(tempList[i].readstate),
                    jobName : tempList[i].receiverJobName,
                })
            }
            console.log(9999999,this.dataList)
        },
                // 申请模块特有的函数
        changeStateFormat(state){
            switch(state){
                case 0: return "代读";
                case 1: return "代办";
            }
        },

        changeTimeFormat(timestamp){
            var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate());
            return Y+M+D;
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
    created(){
      this.findbyPage(1);
    }
  }
</script>

<style>

</style>