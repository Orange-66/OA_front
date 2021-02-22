<template>
    <div class="companyDemand">
        <BaseTable
        :list_title=companyDemandlist_title
        :dataList=companyDemandlist
        :fields= fields
        :total=totalDataNum
        :showfind=false
        ></BaseTable>
        <!-- 增加公司需求 -->
        <b-modal id="modal-add" title="增加公司需求" @ok="insert()" cancel-title="返回" ok-title="添加">
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">公司：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input 
                    readonly
                    @click="selectCompany" 
                    v-model="companyDemand.companyName" 
                    placeholder="点击选择公司" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">职位需求：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input v-model="companyDemand.jobDemand" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">工作类型：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input v-model="companyDemand.jobType" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">工资每月：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input v-model="companyDemand.salary" ></b-form-input>
                </b-col>
            </b-row>
        </b-modal>
        <!-- 修改公司需求 -->
        <b-modal id="modal-update" title="修改公司需求" @ok="update()" cancel-title="返回" ok-title="保存">
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">公司编号：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input v-model="companyDemand.companyId" readonly></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">公司名称：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input v-model="companyDemand.companyName" readonly></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">职位需求：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input v-model="companyDemand.jobDemand" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">工作类型：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input v-model="companyDemand.jobType" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">工资每月：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input v-model="companyDemand.salary" ></b-form-input>
                </b-col>
            </b-row>
        </b-modal>
        <!-- 选择公司 -->
        <b-modal id="modal-selectCompany" title="选择公司" hide-footer>
            <BaseSimpleTable
            :list_title=companylist_title
            :dataList=companylist
            :fields=companyfields
            :total=totalcompanyDataNum
            :showSelect=true
            ></BaseSimpleTable>
        </b-modal>
    </div>
</template>
<script>
import BaseTable from "../../component/BaseTable"
import BaseSimpleTable from "../../component/BaseSimpleTable"
export default {
    components:{
        BaseTable,
        BaseSimpleTable
    },
   data() {
      return {
        baseURL:"expatriate_management/companyDemand/",
        companyDemandlist_title:"公司需求列表",
        companyDemandlist:[],
        fields:[
            {"pro":"companyId","label":"公司编号"},
            {"pro":"companyName","label":"公司名称"},
            {"pro":"jobDemand","label":"职位需求"},
            {"pro":"jobType","label":"工作类型"},
            {"pro":"salary","label":"工资/月"},
        ],
        totalDataNum:'',//总数据条目数
        currentPageNum:1,//当前页
        companyDemand:{
            companyDemandId:'',//需求编号
            companyId:'',//公司编号
            companyName:'',//公司名称
            jobDemand:'',//职位需求
            jobType:'',//工作类型
            salary:'',//工资每月
        },
        companylist_title:"合作公司信息",
        companylist:[],//公司列表
        companyfields:[
            {"pro":"id","label":"公司编号"},
            {"pro":"companyName","label":"公司名称"},
            {"pro":"contactName","label":"联系人姓名"},
        ],
        totalcompanyDataNum:'',//公司列表数据总数
      }
   },
   methods:{
       findbyCompanyid(id){//根据公司ID查找需求
           this.$http.get("expatriate_management/coCompany/getDemand.action",{id:id})
            .then((data) => {
                if(data.code==1){
                    var tempList=data.data;
                    this.totalDataNum=tempList.length;
                    this.companyDemandlist=[];
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.companyDemandlist.push({
                        "id":tempList[i].companyDemandId,
                        "companyId":tempList[i].companyId,
                        "companyName":tempList[i].companyName,
                        "jobDemand":tempList[i].jobDemand,
                        "jobType":tempList[i].jobType,
                        "salary":tempList[i].salary,
                        })
                    }
                }
            })
       },
       findbyPage(currentPage){//    分页查找
        this.currentPageNum=currentPage;
        this.$http.get(this.baseURL+"getAll.action",{pageNum:currentPage})
            .then((data) => {
                if(data.code==1){
                    this.totalDataNum=data.data.total;
                    var tempList=data.data.list;
                    this.companyDemandlist=[];
                    // 将之前的页数填满
                    var num=(currentPage-1)*7
                    for (let j = 0; j < num; j++) {
                        this.companyDemandlist.push({"id":''})
                    }
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.companyDemandlist.push({
                        "id":tempList[i].companyDemandId,
                        "companyId":tempList[i].companyId,
                        "companyName":tempList[i].companyName,
                        "jobDemand":tempList[i].jobDemand,
                        "jobType":tempList[i].jobType,
                        "salary":tempList[i].salary,
                        })
                    }
                }
            })
       },
       toInsert(){ //    展示新增数据模态框
        this.$bvModal.show('modal-add');
       },
       insert(){//插入数据
           this.$http.post(this.baseURL+"addDemand.action",this.companyDemand)
            .then((data) => {
                if(data.code==1){
                    this.showMasage(data.resultMsg,"success")
                }else{
                    this.showMasage(data.resultMsg,"error")
                }
                this.findbyPage(this.currentPageNum);
            })
       },
       selectCompany(){//选择公司模态框
        this.findCompanybyPage(1);
        this.$bvModal.show('modal-selectCompany');
       },
       selectItem(row,type){//选择公司
            this.companyDemand.companyName=row.companyName;
            this.companyDemand.companyId=row.id;
            this.$bvModal.hide('modal-selectCompany');
       },
       findCompanybyPage(currentPage){//    分页查找公司信息
        this.$http.get("expatriate_management/coCompany/getAll.action",{pageNum:currentPage})
            .then((data) => {
                if(data.code==1){
                    this.totalcompanyDataNum=data.data.total;
                    var tempList=data.data.list;
                    this.companylist=[];
                    // 将之前的页数填满
                    var num=(currentPage-1)*7
                    for (let j = 0; j < num; j++) {
                        this.companylist.push({"id":''})
                    }
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.companylist.push({
                        "id":tempList[i].companyId,
                        "companyName":tempList[i].companyName,
                        "contactName":tempList[i].contactName,
                        "contactNum":tempList[i].contactNum,
                        "contactQq":tempList[i].contactQq,
                        "note":tempList[i].note,
                        })
                    }
                }
            })
       },
       toUpdate(row){//   更新数据模态框
            this.companyDemand.companyDemandId=row.id;
            this.companyDemand.companyId=row.companyId;
            this.companyDemand.companyName=row.companyName;
            this.companyDemand.jobDemand=row.jobDemand;
            this.companyDemand.jobType=row.jobType;
            this.companyDemand.salary=row.salary;
            this.$bvModal.show('modal-update');
       },
       update(){//更新数据
           this.$http.post(this.baseURL+"updateDemand.action",this.companyDemand)
            .then((data) => {
                
                if(data.code==1){
                    this.showMasage(data.resultMsg,"success")
                }else{
                    this.showMasage(data.resultMsg,"error")
                }
                this.findbyPage(this.currentPageNum);
            })
       },
       toDelete(row){// 删除数据
        this.$http.get(this.baseURL+"deleteDemand.action",{demandId:row.id})
            .then((data) => {
                console.log(data);
                if(data.code==1){
                    this.showMasage(data.resultMsg,"success")
                }else{
                    this.showMasage(data.resultMsg,"error")
                }
                this.findbyPage(this.currentPageNum);
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
    //    判断companyid是否为数值，即判断父组件是否传值
       var id = this.$route.query.companyId;
       if(!isNaN(id)){
           this.findbyCompanyid(id);
       }else{
           this.findbyPage(this.currentPageNum)
       }
   }
}
</script>
<style scoped>
</style>