<template>
    <div class="conferenceApproval">
        <BaseActionTable
        :list_title=conferenceApprovallist_title
        :dataList=conferenceApprovallist
        :fields= fields
        :options=options
        :total=totalDataNum
        :showAdd=false
        :stateList=stateList
        :stateTitle=stateTitle
        :showState=true
        :showfind=false
        ></BaseActionTable>
    </div>
</template>
<script> 
import BaseActionTable from "../../component/BaseActionTable"
export default {
    components:{
        BaseActionTable
    },
   data() {
      return {
        baseURL:"conference_management/conference/",
        conferenceApprovallist_title:"预约会议审批",
        conferenceApprovallist:[],
        fields:[
            {"pro":"sponsorName","label":"会议发起人"},
            {"pro":"conferenceRoomAddr","label":"会议地点"},
            {"pro":"conferenceStarTime","label":"会议开始时间"},
            {"pro":"conferenceEndTime","label":"会议结束时间"},
            {"pro":"conferenceTheme","label":"会议主题"},
        ],
        totalDataNum:0,//总数据条目数
        options:[
            {text: '同意', value: '1'},
            {text: '拒绝', value: '2'},
        ],
        currentPage: 1,
        pageSize: 7, //每页展示数据条数
        searchKey:'',//搜索关键词
        stateList:[//会议审批状态
            "已通过",
            "审批中",
            "已拒绝",
        ],
        stateTitle:"审批状态"
      }
   },
   methods:{
       findbyPage(currentPage){//    分页查找
        this.currentPage=currentPage;
        this.$http.get(this.baseURL+"getCheckMeeting.action",{pageNum:currentPage})
            .then((data) => {
                console.log(data);
                if(data.code==1){
                    this.total=data.data.total;
                    var tempList=data.data.list;
                    this.conferenceApprovallist=[];
                    // 将之前的页数填满
                    var num=(currentPage-1)*7
                    for (let j = 0; j < num; j++) {
                        this.conferenceApprovallist.push({"id":''})
                    }
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.conferenceApprovallist.push({
                        "id":tempList[i].conferenceId,
                        "sponsorName":tempList[i].sponsorname,
                        "conferenceRoomAddr":tempList[i].conferenceroomaddr,
                        "conferenceStarTime":this.formatDate(tempList[i].conferencestartime),
                        "conferenceEndTime":this.formatDate(tempList[i].conferenceendtime),
                        "conferenceTheme":tempList[i].conferencetheme,
                        "state":this.changeconferencesTatus(tempList[i].approvalstatus),
                        });
                    }
                }else{
                    this.total=0;
                    this.conferenceApprovallist=[];
                }
            })
       },
       toDealAction(actionID,objectID){ //处理操作选项(操作，itemID)
            switch(actionID){
                case '1':
                    // 同意
                    this.$confirm('确定审批通过该会议?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.approval(objectID,1);
                    }).catch(() => {});
                    break;
                case '2':
                    // 拒绝
                    this.$confirm('确定拒绝通过该会议?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.approval(objectID,0);
                    }).catch(() => {});
                    break;
            }
       },
       approval(id,action){//审批会议
           this.$http.get(this.baseURL+"checkMeeting.action",{id:id,state:action})
            .then((data) => {
                console.log(data);
                if(data.code==1){
                    this.showMasage(data.resultMsg,"success");
                    this.findbyPage(this.currentPage);
                }else{
                    this.showMasage(data.resultMsg,"error")
                }
                this.findbyPage(this.currentPage);
            })
       },
       changeconferencesTatus(value){//转换会议审批情况
        if (value==0) {
            return "已拒绝"
        } else if(value==1){
            return "已通过"
        }else {
            return "审批中"
        }
       },
       formatDate(value){//日期格式转换
        var now = new Date(value);
        return now.toLocaleDateString().replace(/\//g, "-") + " " + now.toTimeString().substr(0, 8);
       },
       showMasage(msg,typ){//    消息提示 （消息，类型）
           this.$message({
                showClose: true,
                duration:1000,//展示1000毫秒
                message: msg,
                type:typ
            });
       }
   },
   created() {
       this.findbyPage(this.currentPage);
   }
}
</script>
<style scoped>
</style>