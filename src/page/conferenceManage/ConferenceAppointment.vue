<template>
    <div class="conferenceAppointment">
        <b-col cols="12" >
        <b-card  header-tag="header" border-variant="default" header-bg-variant="default" >
            <div slot="header" align="center">
                <strong style="font-size:18px">会议预约信息</strong>
            </div>
            <b-row>
                <!-- 搜索框 -->
                <b-col cols="8" offset="1">
                    <!-- 搜索条件列表 -->
                    <b-input-group >
                        <b-form-input v-model="searchKey" placeholder="请输入会议主题"></b-form-input>
                        <b-input-group-append>
                        <b-button variant="primary" @click="toSearch"><i class="icon-magnifier"></i>&nbsp;搜索</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
                <b-col cols="2">
                    <b-button  class="addbtn" variant="primary" @click="toApproval()">审批会议</b-button>
                </b-col>
            </b-row>
            <br>
            
            <!-- 表格 -->
            <div class="">
                <el-table
                    :data= this.conferenceAppointmentlist.slice((currentPage-1)*pageSize,currentPage*pageSize)
                    class="m-1"
                    :row-style="{height:'45px'}"
                    :cell-style="{padding:'0px'}"
                    >
                    <el-table-column v-for="item in this.fields" :key="item.pro" :property="item.pro" :label="item.label" align="center" ></el-table-column>
                    <el-table-column
                        prop="state"
                        label="审核状态"
                        align="center"
                        >
                        <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <el-tag 
                            :type="scope.row.state === '已通过' ? 'success' : scope.row.state === '已拒绝' ? 'warning' : 'default'"
                            size="medium">{{ scope.row.state }}</el-tag>
                        </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <b-row class="justify-content-center mr-3">
                <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="pageSize"
                @current-change="currentChange"
                >
                </el-pagination>
            </b-row>
        </b-card>
    </b-col>
    </div>
</template>
<script>
export default {
   data() {
      return {
        baseURL:"conference_management/conference/",
        conferenceAppointmentlist:[],
        fields:[
            {"pro":"sponsorName","label":"会议发起人"},
            {"pro":"conferenceRoomAddr","label":"会议地点"},
            {"pro":"conferenceStarTime","label":"会议开始时间"},
            {"pro":"conferenceEndTime","label":"会议结束时间"},
            {"pro":"conferenceTheme","label":"会议主题"},
        ],
        total:0,//总数据条目数
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
        this.$http.get(this.baseURL+"getAll.action",{pageNum:currentPage})
            .then((data) => {
                console.log(data);
                if(data.code==1){
                    this.total=data.data.total;
                    var tempList=data.data.list;
                    this.conferenceAppointmentlist=[];
                    // 将之前的页数填满
                    var num=(currentPage-1)*7
                    for (let j = 0; j < num; j++) {
                        this.conferenceAppointmentlist.push({"id":''})
                    }
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.conferenceAppointmentlist.push({
                        "id":tempList[i].conferenceId,
                        "sponsorName":tempList[i].sponsorname,
                        "conferenceRoomAddr":tempList[i].conferenceroomaddr,
                        "conferenceStarTime":this.formatDate(tempList[i].conferencestartime),
                        "conferenceEndTime":this.formatDate(tempList[i].conferenceendtime),
                        "conferenceTheme":tempList[i].conferencetheme,
                        "state":this.changeconferencesTatus(tempList[i].approvalstatus),
                        });
                    }
                }
            })
       },
       toApproval(){//跳转审批会议
           this.$router.push({path: "/conference_manage/conference_approval"});
       },
       toSearch(){//查找会议
           this.$http.get(this.baseURL+"searchByTopic.action",{topic:this.searchKey})
            .then((data) => {
                if(data.code==1){
                    console.log(data);
                    this.total=data.data.total;
                    var tempList=data.data.list;
                    this.conferenceAppointmentlist=[];
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.conferenceAppointmentlist.push({
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
                    this.showMasage(data.resultMsg,"error")
                }
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
       currentChange(currentPage) {
        this.currentPage = currentPage;
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
.btn{
    width: 100%;
}
</style>