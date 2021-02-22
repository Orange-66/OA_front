<template>
    <div class="authority">
        <BaseTable
        :list_title=joblist_title
        :dataList=joblist
        :fields= fields
        :total=totalDataNum
        ></BaseTable>
        <!-- 修改职务信息 -->
        <b-modal id="modal-update" title="修改职务信息" @ok="update()" cancel-title="返回" ok-title="保存">
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">职务编号：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input v-model="job.jobId" readonly=""></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">职务名称：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input v-model="job.jobName" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">职务描述：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-textarea v-model="job.jobDescription" ></b-form-textarea>
                </b-col>
            </b-row>
        </b-modal>
        <!-- 新增职务信息 -->
        <b-modal id="modal-add" title="新增职务信息" @ok="insert()" cancel-title="返回" ok-title="添加">
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">职务名称：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input v-model="job.jobName" placeholder="请输入职务名称"></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">职务描述：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-textarea v-model="job.jobDescription" placeholder="请输入职务相关的描述"></b-form-textarea>
                </b-col>
            </b-row>
        </b-modal>
    </div>
</template>
<script>
import BaseTable from "../../component/BaseTable"
export default {
    components:{
        BaseTable
    },
   data() {
      return {
        baseURL:"system_management/job/",  
        joblist_title:"职务信息",
        joblist:[],
        fields:[
            {"pro":"id","label":"职务编号"},
            {"pro":"jobName","label":"职务名称"},
            {"pro":"jobDescription","label":"职务描述"},
        ],
        totalDataNum:'',//总数据条目数
        currentPageNum:1,//当前页
        job:{ //职务表单信息
            jobId:'',
            jobName:'',//职务名称
            jobDescription:'', //职务描述
        },
      }
   },
   methods:{
       findbyPage(currentPage){//    分页查找
            this.currentPageNum=currentPage;
            this.$http.get(this.baseURL+"getJob.action",{pageNum:currentPage})
            .then((data) => {
                if(data.code==1){
                    this.totalDataNum=data.data.total;
                    var tempList=data.data.list;
                    this.joblist=[];
                    // 将之前的页数填满
                    var num=(currentPage-1)*7
                    for (let j = 0; j < num; j++) {
                        this.joblist.push({"id":''})
                    }
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.joblist.push({
                        "id":tempList[i].jobId,
                        "jobName":tempList[i].jobName,
                        "jobDescription":tempList[i].jobDescription,
                        })
                    }
                }
            })
       },
       toUpdate(row){//   更新数据模态框
            this.job.jobId=row.id;
            this.job.jobName=row.jobName
            this.job.jobDescription=row.jobDescription
            this.$bvModal.show('modal-update');
       },
       update(){//更新数据
           this.$http.post(this.baseURL+"updateJob.action",this.job)
            .then((data) => {
                if(data.code==1){
                    this.showMasage(data.data,"success")
                }else{
                    this.showMasage(data.data,"error")
                }
                this.findbyPage(this.currentPageNum);
            })
       },
       toDelete(row){// 删除数据
           this.$http.get(this.baseURL+"deleteJob.action",{jobId:row.id})
            .then((data) => {
                if(data.code==1){
                    this.showMasage(data.data,"success")
                }else{
                    this.showMasage(data.data,"error")
                }
                this.findbyPage(this.currentPageNum);
            })
       },
       toInsert(){ //    展示新增数据模态框
        this.$bvModal.show('modal-add');
       },
       insert(){//插入数据
           this.$http.post(this.baseURL+"addJob.action",this.job)
            .then((data) => {
                if(data.code==1){
                    this.showMasage("新增成功","success")
                }else{
                    this.showMasage("新增失败","error")
                }
                this.findbyPage(this.currentPageNum);
            })
       },
       toSearch(condition){//   按条件查询数据
        this.$http.get(this.baseURL+"findJob.action",{jobKey:condition})
            .then((data) => {
                if(data.code==1){
                    this.totalDataNum=data.data.total;
                    var tempList=data.data.list;
                    this.joblist=[];
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.joblist.push({
                        "id":tempList[i].jobId,
                        "jobName":tempList[i].jobName,
                        "jobDescription":tempList[i].jobDescription,
                        })
                    }
                }
            })
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
</style>