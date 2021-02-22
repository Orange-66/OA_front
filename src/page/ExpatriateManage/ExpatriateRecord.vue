<template>
    <div class="expatriateRecord">
        <BaseTable
        :list_title=expatriateRecordlist_title
        :dataList=expatriateRecordlist
        :fields= fields
        :options=options
        :total=totalDataNum
        :showUpdate=false
        :showfind=false
        :showExport=true
        ></BaseTable>
        <a id="expatriateLog" href="http://localhost:8082/OA_back_war_exploded/expatriate_management/expatriateLog/exportExcel.action"></a>
        <!-- 增加外派记录 -->
        <b-modal id="modal-add" title="增加外派记录" @ok="insert()" cancel-title="返回" ok-title="添加">
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">公司：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input 
                    readonly
                    @click="selectCompany" 
                    v-model="companyInfo.companyName"
                    placeholder="点击选择公司" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">员工：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input 
                    readonly
                    @click="selectEmployee" 
                    v-model="expatriateEmployee.expatriateEmployeeName"
                    placeholder="点击选择员工" ></b-form-input>
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
            :formType=companyType
            ></BaseSimpleTable>
        </b-modal>
        <!-- 选择员工 -->
        <b-modal id="modal-selectEmployee" title="选择员工" hide-footer>
            <BaseSimpleTable
            :list_title=employeelist_title
            :dataList=employeelist
            :fields=employeefields
            :total=totalemployeeDataNum
            :showSelect=true
            :formType=employeeType
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
        baseURL:"expatriate_management/expatriateLog/",
        expatriateRecordlist_title:"外派记录",
        expatriateRecordlist:[],
        fields:[
            {"pro":"id","label":"外派编号"},
            {"pro":"employeeId","label":"员工编号"},
            {"pro":"employeeName","label":"员工姓名"},
            {"pro":"companyId","label":"公司编号"},
            {"pro":"companyName","label":"公司姓名"},
        ],
        totalDataNum:'',//总数据条目数
        currentPageNum:1,//当前页
        companylist_title:"合作公司信息",
        companylist:[],//公司列表
        companyfields:[
            {"pro":"id","label":"公司编号"},
            {"pro":"companyName","label":"公司名称"},
            {"pro":"contactName","label":"联系人姓名"},
        ],
        companyInfo:{
            companyId:'',//公司编号
            companyName:'',//公司名称
            contactName:'',//联系人姓名
            contactNumber:'',//联系人电话
            contactQq:'',//联系人QQ
            note:'',//备注
        },
        totalcompanyDataNum:'',//公司列表数据总数
        companyType:'company',
        employeelist_title:"员工管理",
        employeelist:[],
        employeefields:[
            {"pro":"id","label":"员工编号"},
            {"pro":"employeeName","label":"员工姓名"},
            {"pro":"workExperience","label":"工作经验"},
        ],
        employeeType:'employee',
        expatriateEmployee:{
            expatriateEmployeeId:'',//外派人员编号
            expatriateEmployeeName:'',//外派人员姓名
            educationExperience:'',//教育经历
            workExperience:'',//工作经验
            skill:'',//技能特长
            address:'',//户口
            salary:'',//工资/月
            expatriateState:'0',//人才状态
            expatriatePhonenumber:'',
            expatriateResume:[],//简历文件地址
         },
        totalemployeeDataNum:'',//员工列表数据总数
        totalDataNum:'',//总数据条目数
        state:1,//外派状态，默认为外派中
      }
   },
   methods:{
       findbyPage(currentPage){//    分页查找外派记录信息
            this.currentPageNum=currentPage;
            this.$http.get(this.baseURL+"getAll.action",{pageNum:currentPage})
            .then((data) => {
                if(data.code==1){
                    this.totalDataNum=data.data.total;
                    var tempList=data.data.list;
                    this.expatriateRecordlist=[];
                    // 将之前的页数填满
                    var num=(currentPage-1)*7
                    for (let j = 0; j < num; j++) {
                        this.expatriateRecordlist.push({"id":''})
                    }
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.expatriateRecordlist.push({
                        "id":tempList[i].expatriateRecordId,
                        "employeeId":tempList[i].employeeId,
                        "employeeName":tempList[i].expatriateEmployee.expatriateEmployeeName,
                        "companyName":tempList[i].companyName,
                        "companyId":tempList[i].companyId,
                        })
                    }
                }
            })
       },
       toDelete(row){//删除外派记录信息
            this.$http.get(this.baseURL+"deleteLog.action",{logId:row.id})
            .then((data) => {
                if(data.code==1){
                    this.showMasage(data.resultMsg,"success")
                }else{
                    this.showMasage(data.resultMsg,"error")
                }
                this.findbyPage(this.currentPageNum);
            })
       },
       toInsert(){//    新增数据
           this.$bvModal.show('modal-add');
       },
       insert(){//插入数据
        this.$http.get(this.baseURL+"addLog.action",{expatriateEmployeeId:this.expatriateEmployee.expatriateEmployeeId,companyId:this.companyInfo.companyId,companyName:this.companyInfo.companyName})
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
       findCompanybyPage(currentPage){//    分页查找公司
        this.currentPageNum=currentPage;
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
       findEmployeebyPage(currentPage){//    分页查找员工信息
            this.currentPageNum=currentPage;
            this.$http.get("expatriate_management/expatriateEmployee/getAll.action",{pageNum:currentPage})
            .then((data) => {
                if(data.code==1){
                    this.totalemployeeDataNum=data.data.total;
                    var tempList=data.data.list;
                    this.employeelist=[];
                    // 将之前的页数填满
                    var num=(currentPage-1)*7
                    for (let j = 0; j < num; j++) {
                        this.employeelist.push({"id":''})
                    }
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.employeelist.push({
                        "id":tempList[i].expatriateEmployeeId,
                        "employeeName":tempList[i].expatriateEmployeeName,
                        "workExperience":tempList[i].workExperience,
                        })
                    }
                }
            })
       },
       selectCompany(){//选择公司模态框
        this.findCompanybyPage(1);
        this.$bvModal.show('modal-selectCompany');
       },
       selectEmployee(){//选择员工模态框
        this.findEmployeebyPage(1);
        this.$bvModal.show('modal-selectEmployee');
       },
       selectItem(row,type){//选择部门/职务
            if(type=="company"){
                this.companyInfo.companyId=row.id;
                this.companyInfo.companyName=row.companyName;
                this.$bvModal.hide('modal-selectCompany');
            }else if(type=="employee"){
                this.expatriateEmployee.expatriateEmployeeId=row.id;
                this.expatriateEmployee.expatriateEmployeeName=row.employeeName;
                this.$bvModal.hide('modal-selectEmployee');
            }
       },
       toExport(){//   导出数据
        document.getElementById("expatriateLog").click();
        
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