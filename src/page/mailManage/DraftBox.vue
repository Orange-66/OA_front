<template>
    <div class="draftBox">
        <CheckBoxTable
        :list_title=draftMaillist_title
        :dataList=draftMaillist
        :fields=fields
        :total=totalDataNum
        ></CheckBoxTable>
        <!-- 查看邮件详细信息 -->
        <b-modal id="modal-showDetail" size="lg" title="邮件详情" hide-footer >
            <b-col>
            <b-row>
                <b-col cols="2" offset="1"><p>发件人</p></b-col>
                <b-col cols="3"><b-form-input v-model="mailDetail.sendName" readonly></b-form-input></b-col>
                <b-col cols="2" ><p>收件人</p></b-col>
                <b-col cols="3"><b-form-input v-model="mailDetail.receiveName" readonly></b-form-input></b-col>
            </b-row>
            <b-row>
                <b-col cols="2" offset="1"><p>时间</p></b-col>
                <b-col cols="5"><b-form-input v-model="mailDetail.mailTime" readonly></b-form-input></b-col>
            </b-row>
            <b-row>
                <b-col cols="2" offset="1"><p>主题</p></b-col>
                <b-col cols="5"><b-form-input v-model="mailDetail.mailHeadline" readonly></b-form-input></b-col>
            </b-row>
            <b-row>
                <b-col cols="2" offset="1"><p>内容</p></b-col>
                <b-col cols="8"><b-form-textarea style="height: 150px;" v-model="mailDetail.mailText" readonly></b-form-textarea></b-col>
            </b-row>
            <!-- <b-row>
                <b-col offset="3">
                    <b-row>
                        <i class="icon-link" style="padding:4px 10px;"></i>
                        <a id="expatriateLog" href="http://localhost:8082/OA_back_war_exploded/expatriate_management/expatriateLog/exportExcel.action">点击下载附件</a>
                    </b-row>
                </b-col>
            </b-row> -->
            <br>
            <b-row>
                <b-col id="btn" cols="2" offset="9"><b-button variant="primary" @click="toForward">转发</b-button></b-col>
            </b-row>
            </b-col>
        </b-modal>
    </div>
</template>
<script>
import CheckBoxTable from "../../component/CheckBoxTable"
export default {
    props: {
        userInfo: {
        type: Object,
        required: true
        }
    },
   components:{
        CheckBoxTable
    },
   data() {
      return {
        baseURL:"email/",
        draftMaillist_title:'我的草稿箱',
        draftMaillist:[],
        fields:[
            {"pro":"emailreceivename","label":"收件人"},
            {"pro":"emailheadline","label":"邮件主题"},
            {"pro":"emaildrafttime","label":"时间"},
        ],
        currentPageNum:1,//当前页
        totalDataNum:'',//总数据条目数
        mailDetail:{//邮件详细信息
            sendId:"",//发送人编号
            sendName:"",//发送人姓名
            receiveId:"",//接收人编号
            receiveName:"",//接收人姓名
            mailTime:"",//发送时间
            mailHeadline:"",//发送主题
            mailText:"",//发送内容
            mailAttachment:"",//发送附件
        }
      }
   },
   methods: {
       findbyPage(currentPage){//    分页查找草稿箱内容
        this.currentPageNum=currentPage;
        this.$http.get(this.baseURL+"getAllByDraft.action",{pageNum:currentPage,pageSize:6,sendEmailNameId:this.userInfo.userID})
            .then((data) => {
                console.log(data);
                if(data.code==1){
                    this.totalDataNum=data.data.total;
                    var tempList=data.data.list;
                    this.draftMaillist=[];
                    // 将之前的页数填满
                    var num=(currentPage-1)*6
                    for (let j = 0; j < num; j++) {
                        this.draftMaillist.push({"id":''})
                    }
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.draftMaillist.push({
                        "id":tempList[i].emailid,
                        "emailreceivename":tempList[i].emailsendreceive.emailreceivename,
                        "emailheadline":tempList[i].emailheadline,
                        "emaildrafttime":this.formatDate(tempList[i].emailsendtime),
                        })
                    }
                }
            })
       },
       toSearch(searchKey){//全文检索草稿
        this.$http.get(this.baseURL+"searchAllTextByDraft.action",{emailSendNameId:this.userInfo.userID,keyWord:searchKey})
            .then((data) => {
                console.log(data);
                if(data.code==1){
                    this.totalDataNum=data.data.total;
                    var tempList=data.data;
                    this.draftMaillist=[];
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.draftMaillist.push({
                        "id":tempList[i].email.emailid,
                        "emailreceivename":tempList[i].emailreceivename,
                        "emailheadline":tempList[i].email.emailheadline,
                        "emaildrafttime":this.formatDate(tempList[i].email.emailsendtime),
                        })
                    }
                }
            })
       },
       toDelete(selectidList){
           var temp = new Array();
           for (var i = 0; i < selectidList.length; i++) {
                temp.push(selectidList[i].id);
            }
           this.$http.post(this.baseURL+"deleteDraftMessage.action",temp)
            .then((data) => {
                if(data.code==1){
                    this.showMasage(data.resultMsg,"success")
                }else{
                    this.showMasage(data.resultMsg,"error")
                }
                this.findbyPage(this.currentPageNum);
            })
       },
       getEmailDetail(row){//查看邮件详细信息
           this.$http.get(this.baseURL+"getDraftDetail.action",{emailid:row.id})
            .then((data) => {
                console.log(data);
                if(data.code==1){
                    var temp=data.data;
                    this.mailDetail.receiveName='';
                    for (let i = 0; i < temp.emailsendreceives.length; i++) {
                       this.mailDetail.receiveName+=temp.emailsendreceives[i].emailreceivename+";";  
                    }
                    this.mailDetail.mailTime=this.formatDate(temp.emailsendtime);
                    this.mailDetail.mailHeadline=temp.emailheadline;
                    this.mailDetail.mailText=temp.emailtext;
                    this.mailDetail.mailAttachment=temp.emailattachmentnameold;
                    // 展示邮件模态框
                    this.$bvModal.show('modal-showDetail');
                }else{
                    this.showMasage(data.resultMsg,"error")
                }
            })
       },
       toForward(){//转发邮件
        this.$router.push({path: "/mailManage/write_mail",query:{receiveId:'',receiveName:'',mailAttachment:this.mailDetail.mailAttachment,mailHeadline:this.mailDetail.mailHeadline,mailText:this.mailDetail.mailText}});
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
       this.findbyPage(this.currentPageNum);
   }
}
</script>
<style scoped>
p{
    padding:6px 0px;
    padding-left:45px
}
.btn{
    width: 90%;
}
#b-form-textarea{
height: 300px;
}
</style>