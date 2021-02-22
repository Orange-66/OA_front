<template>
<div class="writeMail">
<b-jumbotron style="background:white;padding: 0px;">
    <br><br>
  <b-form @submit.prevent="submit($event)" action="" method="post" enctype="multipart/form-data" id="mailForm">
    <b-row>
      <b-col cols="12" >
        <b-row>
          <b-col cols="1" offset="1">
              <label style="padding:6px 0px;">收件人</label>
          </b-col>
          <b-col cols="9" >
            <b-form-input name="emailiddraft" v-model="this.emailiddraft" hidden/>
            <b-form-input name="emailReceiveNameId1" v-model="receiveid1" hidden></b-form-input>
            <b-form-input name="emailReceiveNameId2" v-model="receiveid2" hidden></b-form-input>
            <b-form-input name="emailReceiveNameId3" v-model="receiveid3" hidden></b-form-input>
            <b-form-input name="emailSendNameId" v-model="this.userInfo.userID" hidden/>
              <b-form-input 
              readonly
              @click="selectReceive" 
              v-model="emailReceiveName" 
              placeholder="点击选择收件人"
              ></b-form-input>
          </b-col>
        </b-row>  
        <b-row>
          <b-col cols="1" offset="1">
            <label style="padding:6px 0px;" >主题</label>
          </b-col>
          <b-col cols="9">
            <b-form-input name="emailHeadline" v-model="emailData.emailHeadline" />
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="2" offset="2">
            <i class="icon-link" style="padding:4px 10px;"></i>
            <a @change="showFile" href="javascript:;" class="upload">选择上传附件
            <input id="fileUpload" class="change" type="file" name="file">
            </a>
          </b-col>
          <b-col cols="8">
            {{this.filename}}
          </b-col> 
        </b-row>
        <b-row>
          <b-col cols="1" offset="1">
            <label>正文</label>
          </b-col>
          <b-form-input name="emailText" v-model="emailData.emailText1" hidden/>
          <b-col cols="9">
            <quill-editor 
            v-model="emailData.emailText"
            ref="myQuillEditor"
            :options="editorOption"
            ></quill-editor>
          </b-col>
        </b-row>
      </b-col> 
    </b-row>
        <br><br><br>
    <b-row>
      <b-col cols="2" offset="2">
        <b-button type="submit" variant="primary" @click='send'>发送</b-button>
      </b-col>
      <b-col cols="2">
        <b-button type="submit" id="btn" variant="primary" @click='isSaveDraft=true'>存草稿</b-button>
      </b-col>
    </b-row>
  </b-form>
    <br>
</b-jumbotron>
  <!-- 选择收件人 -->
  <b-modal id="modal-selectReceive" title="选择收件人" size="lg" ok-only ok-title="确定">
      <BaseSimpleTable
      :list_title=emailReceivelist_title
      :dataList=emailReceiveList
      :fields=emailReceivefields
      :total=totalDataNum
      :showSelect=true
      ></BaseSimpleTable>
  </b-modal>
</div>
</template>
<script>
import BaseSimpleTable from "../../component/BaseSimpleTable"
export default {
  components:{
    BaseSimpleTable,
  },
  props: {
    userInfo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      baseURL:"email/",
      emailData: {//邮件信息
          emailHeadline:'',//邮件标题
          emailText: '',//邮件正文
          emailText1:'',//去掉p标签后的内容
      },
      emailReceiveName:'',//收件人姓名
      emailReceivelist_title:'联系人列表',
      emailReceiveList:[],//收件人列表
      emailReceivefields:[
        {"pro":"employeeName","label":"姓名"},
        {"pro":"departmentName","label":"部门"},
        {"pro":"jobName","label":"职务"},
      ],
      totalDataNum:'',//收件人数据总数
      filename:'',//文件名
      index:1,//收件人索引
      emailiddraft:'',//草稿ID
      receiveid1:'',
      receiveid2:'',
      receiveid3:'',
      isSaveDraft:false,//是否保存为草稿
      editorOption: {//富文本编辑器配置
            modules: {
              toolbar: [
                  // 加粗 斜体 下划线 删除线  引用  代码块 1、2 级标题  有序、无序列表 上标/下标  缩进 标题 字体颜色、字体背景颜色  字体种类 对齐方式
                ["bold", "italic", "underline", "strike","blockquote", "code-block"], 
                [{ header: 1 }, { header: 2 },{ list: "ordered" }, { list: "bullet" },{ script: "sub" }, { script: "super" },{ indent: "-1" }, { indent: "+1" },{ header: [1, 2, 3, 4, 5, 6, false] },{ color: [] }, { background: [] },{ font: [] },{ align: [] }],
              ], //工具菜单栏配置
            },
            placeholder: '请在这里输入邮件内容', //提示
            syntax: true, //语法检测
          }
    }
  },
  methods: {
    submit(event) {//检查邮件格式
      if (!this.emailData.emailHeadline ||!this.emailData.emailText) {
        this.showMasage('请填写完整邮件信息',"error")
        return false
      }
      if (this.isSaveDraft) {
        this.saveDraft();
        this.isSaveDraft=false;
      }else{
        this.send();
      }
    },
    send () {//发送邮件
      var formData = new FormData(event.target);
      this.$http.post(this.baseURL+'addMessage.action', formData)
        .then((data) => {
          if(data.code==1){
            this.showMasage(data.resultMsg,"success");
            this.toClean();
          }else{
            this.showMasage(data.resultMsg,"error")
          }
        })
    },
    saveDraft () {//存为草稿
      var formData = new FormData(event.target);
      this.$http.post(this.baseURL+'addDraft.action', formData)
        .then((data) => {
          if(data.code==1){
            this.showMasage(data.resultMsg,"success")
          }else{
            this.showMasage(data.resultMsg,"error")
          }
        })
    },
    showFile(){//展示文件名
      this.filename=document.getElementById("fileUpload").files[0].name;
    },
    findReceivebyPage(){//选择收件人
      this.$http.get("system_management/employee/getEmployee.action")
        .then((data) => {
          console.log(data);
          if(data.code==1){
            this.index=1;
            this.totalDataNum=data.data.total;
            var tempList=data.data.list;
            this.emailReceiveList=[];
            // 插入数据
            for (let i = 0; i < tempList.length; i++) {
              this.emailReceiveList.push({
              "id":tempList[i].employeeId,
              "employeeName":tempList[i].employeeName,
              "departmentName":tempList[i].department.departmentName,
              "jobName":tempList[i].job.jobName,
              
              })
            }
          }
        })
    },
    selectReceive(){//选择收件人模态框
      this.findReceivebyPage();
      this.$bvModal.show('modal-selectReceive');
    },
    selectItem(row){//选择联系人
      switch (this.index) {
        case 1:
          this.receiveid1=row.id;
          this.emailReceiveName=this.emailReceiveName+row.employeeName+"；";
          break;
        case 2:
          this.receiveid2=row.id;
          this.emailReceiveName=this.emailReceiveName+row.employeeName+"；";
          break;
        case 3:
          this.receiveid3=row.id;
          this.emailReceiveName=this.emailReceiveName+row.employeeName+"；";
          break;
        default:
          this.showMasage("最多只能选择三位收件人","error");
          break;
      }
      this.index=this.index+1;
    },
    showMasage(msg,typ){//    消息提示 （消息，类型）
      this.$message({
        showClose: true,
        duration:1000,//展示1000毫秒
        message: msg,
        type:typ
      });
    },
    toClean(){
      this.emailReceiveName='';//收件人姓名
      this.emailData.emailHeadline='';//邮件标题
      this.emailData.emailText='';//邮件内容
      this.receiveid1='';
      this.receiveid2='';
      this.receiveid3='';
      this.filename='';
    },
  },
  created() {
    this.toClean();
    var mailHeadline=this.$route.query.mailHeadline;
    if (typeof(mailHeadline) != 'undefined') {
      this.receiveid1=this.$route.query.receiveId;//收件人ID
      this.emailReceiveName=this.$route.query.receiveName;//收件人姓名
      this.emailData.emailText=this.$route.query.mailText;//邮件内容
      if (typeof(this.$route.query.mailText) != 'undefined') {
        this.emailData.emailHeadline=this.$route.query.mailHeadline;//邮件标题
      }else{
        this.emailData.emailHeadline="回复："+this.$route.query.mailHeadline;//邮件标题
      }
    }
    
  },
  watch:{
    emailData:{//深度监听,去掉富文本框的p标签
      handler(val, oldVal){
        var temp=this.emailData.emailText;
        temp=temp.replace("<p>", "");
        temp=temp.replace("</p>", "");
        this.emailData.emailText1=temp;
      },
      deep:true
    }
  }
}
</script>
<style scoped>
.btn{
    width: 90%;
}
.quill-editor{
    height:250px;
    width: 100%;
}
.change{
    position: absolute;
    overflow: hidden;
    right: 0;
    top: 0;
    opacity: 0;
    /* filter:alpha； */
}
</style>
