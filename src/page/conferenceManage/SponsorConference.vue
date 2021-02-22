<template>
    <div class="sponsorConference">
    <b-col cols="12" >
        <b-card  header-tag="header" border-variant="default" header-bg-variant="default" >
            <div slot="header" align="center">
                <strong style="font-size:18px">我发布的会议</strong>
            </div>
            <b-row>
                <b-col cols="2" offset="9">
                    <b-button class="addbtn" variant="primary" @click="toSponsorConference()">预约会议</b-button>
                </b-col>
            </b-row>
            <br>
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
                    <el-table-column
                        prop="cancelConference"
                        :label="'取消预约'"
                        align="center"
                        >
                        <template slot-scope="scope">
                            <b-button :disabled="scope.row.iscancel=='1'" variant="primary" @click="cancelConference(scope.row)">取消</b-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label=" 会议记录"
                        align="center"
                        >
                        <template slot-scope="scope">
                            <div>
                            <el-dropdown @command="handleCommand" size="small" split-button>操作
                                <el-dropdown-menu slot="dropdown" >
                                    <el-dropdown-item  v-for="op in options" :key="op.value" :command="op.value+','+scope.row.id">{{op.text}}</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
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
            <a id="down" href="javascript:;"></a>
        </b-card>
    </b-col>
    <!-- 添加预约会议 -->
    <b-modal id="modal-add" title="预约会议" size="lg" hide-footer>
        <AddConference
        :userInfo=userInfo></AddConference>
    </b-modal>
    <!-- 上传会议记录 -->
    <b-modal id="modal-upload" title="上传会议记录" hide-footer>
        <b-form @submit.prevent="uploadRecord($event)" action="" method="post" enctype="multipart/form-data" id="mailForm">
        <b-col cols="12" >
            <br>
            <b-form-input name="id" v-model="conferenceId" hidden />
            <b-row>
                <b-col cols="8" offset="2">
                <b-button @change="showFile" variant="success" class="upload btn">选择文件
                <input id="fileUpload" class="change" type="file" name="file"></b-button>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="8" offset="2">
                    <label>{{this.filename}}</label>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="8" offset="2">
                    <b-button class="btn"  type="submit" variant="primary" @click='uploadRecord'>上传文件</b-button>
                </b-col> 
            </b-row>
            <br>
        </b-col>
        </b-form>
    </b-modal>
    </div>
</template>
<script>
import AddConference from "./AddConference" 
export default {
    components:{
        AddConference
    },
    props: {
        userInfo: {
        type: Object,
        required: true
        }
    },
   data() {
      return {
        baseURL:"conference_management/myConference/",
        dataList:[],
        fields:[
            {"pro":"conferenceRoomAddr","label":"会议地点"},
            {"pro":"conferenceStarTime","label":"会议开始时间"},
            {"pro":"conferenceEndTime","label":"会议结束时间"},
            {"pro":"conferenceTheme","label":"会议主题"},
        ],
        total: 0,//总数据条目量
        currentPage: 1,
        pageSize: 7, //每页展示数据条数
        options:[
            {text: '上传会议记录', value:'1'},
            {text: '下载会议记录', value:'2'},
            {text: '删除会议记录', value:'3'},
        ],
        disabled:false,//取消预约按钮内容状态
        filename:'',//文件名
        conferenceId:'',//会议编号
      }
   },
  methods: {
       findbyPage(currentPage){//    分页查找
        this.currentPage=currentPage;
        this.$http.get(this.baseURL+"getMyPublish.action",{id:this.userInfo.userID})
            .then((data) => {
                console.log(data);
                if(data.code==1){
                    this.total=data.data.total;
                    var tempList=data.data.list;
                    this.dataList=[];
                    // 将之前的页数填满
                    var num=(currentPage-1)*7
                    for (let j = 0; j < num; j++) {
                        this.dataList.push({"id":''})
                    }
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.dataList.push({
                        "id":tempList[i].conferenceId,
                        "conferenceRoomAddr":tempList[i].conferenceroomaddr,
                        "conferenceStarTime":this.formatDate(tempList[i].conferencestartime),
                        "conferenceEndTime":this.formatDate(tempList[i].conferenceendtime),
                        "conferenceTheme":tempList[i].conferencetheme,
                        "iscancel":tempList[i].iscancel,
                        "approvalStatus":this.changeconferencesTatus(tempList[i].approvalstatus),
                        });
                    }
                }
            })
       },
       cancelConference(row){//取消会议
        this.$confirm('此操作将取消预约的会议, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.cancel(row.id);
            }).catch(() => {});
       },
       cancel(id){
           this.$http.get(this.baseURL+"cancelBooking.action",{id:id})
            .then((data) => {
                if(data.code==1){
                    this.showMasage(data.resultMsg,"success")
                }else{
                    this.showMasage(data.resultMsg,"error")
                }
                this.findbyPage(this.currentPage);
            })
       },
       toSponsorConference(){//发起预约会议,展示预约会议模态框
        this.$bvModal.show('modal-add');
       },
       addSuccess(){//成功预约会议
        this.$bvModal.hide('modal-add');
        this.findbyPage(this.currentPage);
       },
       handleCommand(command){//处理会议记录上传下载
        var list=command.split(',');
        switch(list[0]){
            case '1':
                // 上传会议记录
                this.conferenceId=list[1];
                this.$bvModal.show('modal-upload');
                break;
            case '2':
                // 下载会议记录
                this.downloadRecord(list[1]);
                break;
            case '3':
                // 删除会议记录;
                this.$confirm('此操作将删除该会议的会议记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRecord(list[1]);
                }).catch(() => {});
                break;
        }
       },
       uploadRecord(){//上传会议文件
        if (this.filename=='') {
            this.showMasage("请选择文件！","error");
        }
        else{
            var formData = new FormData(event.target);
            this.$http.post(this.baseURL+"uploadRecord.action",formData)
            .then((data) => {
                this.$bvModal.hide('modal-upload');
                if(data.code==1){
                    this.showMasage(data.resultMsg,"success")
                }else{
                    this.showMasage(data.resultMsg,"error")
                }
                this.findbyPage(this.currentPage);
            })
        }
       },
       downloadRecord(conferenceid){//下载会议文件
        document.getElementById("down").href="http://localhost:8082/OA_back_war_exploded/conference_management/myConference/downloadRecord.action?id="+conferenceid;
        document.getElementById("down").click();
       },
       deleteRecord(conferenceid){//删除会议文件
        this.$http.get(this.baseURL+"deleteRecord.action",{id:conferenceid})
        .then((data) => {
            console.log(data);
            if(data.code==1){
                this.showMasage(data.resultMsg,"success")
            }else{
                this.showMasage(data.resultMsg,"error")
            }
            this.findbyPage(this.currentPage);
        })
        
       },
       showFile(){//展示文件名
        this.filename=document.getElementById("fileUpload").files[0].name;
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
.change{
    position: absolute;
    overflow: hidden;
    right: 0;
    top: 0;
    opacity: 0;
}
.btn{
    width: 100%;
}
p{
    font-size: 20px;
}
</style>