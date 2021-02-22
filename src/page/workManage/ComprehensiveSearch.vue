<template>
  <div class="application-panel">
        <!-- 卡片 -->
        <b-card  header-tag="header" border-variant="default" header-bg-variant="default" >
           <div slot="header" align="center">
                <strong style="font-size:18px">综合查询</strong>
            </div>
            <b-row>

                <b-col cols="1" offset="1" style="padding:6px 0px;text-align:center"><strong>工作接受人</strong></b-col>
                <b-col cols="2" ><b-form-input v-model="searchInfo.receiver"></b-form-input></b-col>
                <b-col cols="1" style="padding:6px 0px;text-align:center"><strong>工作授予人</strong></b-col>
                <b-col cols="2" ><b-form-input v-model="searchInfo.giver"></b-form-input></b-col>
                <b-col cols="1" style="padding:6px 0px;text-align:center"><strong>布置时间</strong></b-col>
                <b-col cols="2" ><b-form-input type="date" v-model="searchInfo.applyDate"></b-form-input></b-col>
                <b-col cols="1" ><b-button variant="primary" style="color:white" @click="searchByCondition" block>查询</b-button></b-col>
            </b-row>

            <BaseActionTable
            ref="BaseActionTable"
            :header = header
            :dataList = dataList
            :fields = fields
            :showfind = false
            :showAdd = false
            :showState = false
            :total = total
            :dropdownState = false
            :detailState = true
            :buttonText = buttonText
            ></BaseActionTable>

        </b-card>
         <!-- 新增用车申请 -->
        <b-modal id="modal-addWrok" centered size="lg" title="查看工作"   ok-title="确认">
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;">工作授予人：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input v-model="detailInfo.giverName"></b-form-input>
                </b-col>
                <b-col cols="2">
                <p style="padding:6px 0px;">工作接受人：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input v-model="detailInfo.receiverName"></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;">开始时间：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input type="date"  v-model="detailInfo.start"></b-form-input>
                </b-col>
                <b-col cols="2">
                <p style="padding:6px 0px;">结束时间：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input type="date" v-model="detailInfo.end"></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;">工作主题：</p>
                </b-col>
                <b-col cols="8">
                    <b-form-input v-model="detailInfo.topic"></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;">工作内容：</p>
                </b-col>
                <b-col cols="8">
                    <b-form-textarea  v-model="detailInfo.content"  rows="3"></b-form-textarea>
                </b-col>
            </b-row>
        </b-modal>
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
                  //   根路径
         baseURL: "work_arrangement/search/",
          searchInfo:{
              giver:"",
              receiver:"",
              applyDate:""
          },
        buttonText:"查看详细",
        header:"",
                // 数据列表
        dataList : [            
        ],
        // 表头数据
        fields:[
            {"pro":"workreceiverName","label":"接受人"},
            {"pro":"workgiverName","label":"授予人"},
            {"pro":"topic","label":"工作主题"},
            {"pro":"workstart","label":"开始日期"},
            {"pro":"workend","label":"结束日期"},
        ],
        total:"",
        pageSize:7,

        detailInfo:{
            giverName:"",
            receiverName:"",
            start:"",
            end:"",
            topic:"",
            content:""
        }
      }
      
      
    },
    methods:{
        searchByCondition(){
            this.$refs.BaseActionTable.currentChange(1)
            this.currentPageNum = 1
        },
        changeTimeFormat(timestamp){
            var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + '  ';

            var HH = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var MM = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
            return Y+M+D+HH+MM;
        },
        // 分页显示
    // 刷新页面
        findbyPage(currentPage){
            this.currentPageNum=currentPage;
            var requestBean;
            var action;
            if(this.searchInfo.receiver == "" && this.searchInfo.giver == "" && this.searchInfo.applyDate == "")
            {
                requestBean = {
                    id: this.userInfo.userID,
                    pageNum: this.currentPageNum, 
                    pageSize:this.pageSize
                };
                // console.log("selectAll", requestBean)
                action = "selectAll.action"
            }
            else{
                requestBean = {
                    searcherId: this.userInfo.userID,
                    receiver: this.searchInfo.receiver,
                    giver: this.searchInfo.giver,
                    applyDate: this.searchInfo.applyDate,
                    pageNum: this.currentPageNum, 
                    pageSize:this.pageSize
                };
                console.log("searchByCondition", requestBean)
                action = "searchByCondition.action"
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
                    id : tempList[i].workId,
                    workgiverId : tempList[i].workgiverId,
                    workreceiverId : tempList[i].workreceiverId,
                    appTime : this.changeTimeFormat(tempList[i].appTime),
                    workstart : this.changeTimeFormat(tempList[i].workstart),
                    workend : this.changeTimeFormat(tempList[i].workend),
                    content : tempList[i].content,
                    topic : tempList[i].topic,
                    workstate : tempList[i].workstate,
                    workgiverName : tempList[i].workgiverName,
                    workreceiverName : tempList[i].workreceiverName
                })
            }
        },

        // 详情
        toDetail(id){
            this.$bvModal.show('modal-addWrok');
            for(let i = 0; i < this.dataList.length; i++){
                if(this.dataList[i].id == id){
                    this.detailInfo = {
                        giverName: this.dataList[i].workgiverName,
                        receiverName: this.dataList[i].workreceiverName,
                        start: (this.dataList[i].workstart).substr(0,10),
                        end: (this.dataList[i].workend).substr(0,10),
                        topic: this.dataList[i].topic,
                        content: this.dataList[i].content
                    }
                }
            }
            
        },

        // searchByCondition(){
        //     var requestBean = {
        //         searcherId: this.userInfo.employeeId,
        //         receiver: this.searchInfo.receiver,
        //         giver: this.searchInfo.giver,
        //         applyDate: this.searchInfo.time
        //         }
        //     var action = "searchByCondition.action"
        //     this.$http.get(this.baseURL+action, requestBean)
        //     .then((data) => {
        //         if(data.code==1){
        //                 var temList = data.data;
        //                 for(let i = 0; i < temList.lenght; i++){
        //                     this.dataList.push({
        //                         id: temList[i].workId,
        //                         employeeId:temList[i].workreceiverId,
        //                         employeeName:temList[i].workreceiverName,
        //                         manager:temList[i].workgiverName,
        //                         startTime:temList[i].workstart,
        //                         endTime:temList[i].workend,
        //                         state:temList[i].workstate,
        //                         appTime:temList[i].appTime,
        //                         topic:temList[i].topic,
        //                         content:temList[i].content,
        //                     })
        //                 }
        //             }
        //     })
        // },

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
    }
  }
</script>

<style>

</style>