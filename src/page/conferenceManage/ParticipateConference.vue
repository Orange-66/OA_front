<template>
    <div class="participateConference">
        <b-card  header-tag="header" border-variant="default" header-bg-variant="default" >
            <div slot="header" align="center">
                <strong style="font-size:18px">会议信息列表</strong>
            </div>
            <!-- 表格 -->
            <div class="">
                <el-table
                    :data= this.dataList.slice((currentPage-1)*pageSize,currentPage*pageSize)
                    class="m-1"
                    :row-style="{height:'45px'}"
                    :cell-style="{padding:'0px'}"
                    >
                    <el-table-column v-for="item in this.fields" :key="item.pro" :property="item.pro" :label="item.label" align="center" ></el-table-column>
                    <el-table-column
                        prop="approvalStatus"
                        :label="'审批状态'"
                        align="center"
                        >
                        <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <el-tag 
                            :type="scope.row.approvalStatus === '已通过' ? 'success' : scope.row.approvalStatus === '已拒绝' ? 'warning' : 'default'"
                            size="medium">{{ scope.row.approvalStatus }}</el-tag>
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
    </div>
</template>
<script>
export default {
    props: {
        userInfo: {
        type: Object,
        required: true
        }
    },
   data() {
      return {
        baseURL:"conference_management/myConference/",
        dataList:[
        ],
        fields:[
            {"pro":"sponsorName","label":"会议发起人"},
            {"pro":"conferenceRoomAddr","label":"会议地点"},
            {"pro":"conferenceStarTime","label":"会议开始时间"},
            {"pro":"conferenceEndTime","label":"会议结束时间"},
            {"pro":"conferenceTheme","label":"会议主题"},
        ],
        total: 0,//总数据条目量
        currentPage: 1,
        pageSize: 7, //每页展示数据条数
      }
   },
   methods:{
       findbyPage(){//    分页查找
        this.$http.get(this.baseURL+"getAll.action",{id:this.userInfo.userID})
            .then((data) => {
                console.log(data);
                if(data.code==1){
                    this.total=data.data.total;
                    var tempList=data.data.list;
                    this.dataList=[];
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.dataList.push({
                        "sponsorName":tempList[i].sponsorname,
                        "conferenceRoomAddr":tempList[i].conferenceroomaddr,
                        "conferenceStarTime":this.formatDate(tempList[i].conferencestartime),
                        "conferenceEndTime":this.formatDate(tempList[i].conferenceendtime),
                        "conferenceTheme":tempList[i].conferencetheme,
                        "approvalStatus":this.changeconferencesTatus(tempList[i].approvalstatus),
                        })
                    }
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
   },
   created() {
       this.findbyPage(this.currentPage);
   }
}
</script>
<style scoped>
</style>