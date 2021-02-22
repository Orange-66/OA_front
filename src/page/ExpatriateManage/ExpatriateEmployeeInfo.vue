<template>
    <div class="expatriateEmployee">
        <BaseActionTable
        :list_title=expatriateEmployeelist_title
        :dataList=expatriateEmployeelist
        :fields= fields
        :options=options
        :total=totalDataNum
        :showState=true
        ></BaseActionTable>
        <a id="down" href="javascript:;"></a>
        <!-- 新增外派人员信息 -->
        <b-modal id="modal-add" title="新增外派人员信息" size="lg" hide-footer>
            <b-form @submit.prevent="insert($event)" action="" method="post" enctype="multipart/form-data">
            <b-row >
                <b-col cols="2" offset="1" >
                <p>员工姓名：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input name="expatriateEmployeeName" v-model="expatriateEmployee.expatriateEmployeeName" placeholder="请输入员工姓名" ></b-form-input>
                </b-col>
                <b-col cols="2" >
                <p>教育经历:</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input name="educationExperience" v-model="expatriateEmployee.educationExperience" placeholder="请输入学历" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1" >
                <p>工作经验：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input name="workExperience" v-model="expatriateEmployee.workExperience" placeholder="请输入工作经验" ></b-form-input>
                </b-col>
                <b-col cols="2" >
                <p>技能特长:</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input name="skill" v-model="expatriateEmployee.skill" placeholder="请输入技能特长" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1" >
                <p>户口：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input name="address" v-model="expatriateEmployee.address" placeholder="请输入户口所在地" ></b-form-input>
                </b-col>
                <b-col cols="2" >
                <p>工资:</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input name="salary" v-model="expatriateEmployee.salary" placeholder="请输入工资" ></b-form-input>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="2" offset="1">
                <p>电话:</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input 
                    @blur="formValidate()" 
                    :state="phoneState"
                    name="expatriatePhonenumber" 
                    v-model="expatriateEmployee.expatriatePhonenumber" 
                    placeholder="请输入电话号码" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1" >
                <p>上传简历：</p>
                </b-col>
                <b-col cols="3">
                    <b-button @change="showFile" variant="success" class="upload btn">选择文件
                    <input id="fileUpload" class="change" type="file" name="file"></b-button>
                </b-col>
                <b-col cols="6">
                    <label style="padding:6px 0px;">{{this.filename}}</label>
                </b-col>
                </b-row>
            <b-row>
                <b-col cols="2" offset="1">
                <p>外派状态:</p>
                </b-col>
                <b-col cols="5">
                    <b-form-radio-group name="expatriateState" style="padding:6px 0px;" v-model="expatriateEmployee.expatriateState" >
                        <b-form-radio value="0">闲置中</b-form-radio>
                        <b-form-radio value="1">外派中</b-form-radio>
                        <b-form-radio value="2">已离职</b-form-radio>
                    </b-form-radio-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="2" offset="8">
                    <b-button id="btn" @click="$bvModal.hide('modal-add')">返回</b-button>
                </b-col>
                <b-col cols="2">
                    <b-button type="submit" id="btn" variant="primary">添加</b-button>
                </b-col>
            </b-row>
            </b-form>
        </b-modal>
        <!-- 修改人员信息 -->
        <b-modal id="modal-update" title="修改外派人员信息" size="lg" hide-footer>
            <b-form @submit.prevent="update($event)" action="" method="post" enctype="multipart/form-data">
            <b-row >
                <b-col cols="2" offset="1" >
                <p>员工编号：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input name="expatriateEmployeeId" v-model="expatriateEmployee.expatriateEmployeeId" readonly></b-form-input>
                </b-col>
                <b-col cols="2" >
                <p>员工姓名：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input name="expatriateEmployeeName" v-model="expatriateEmployee.expatriateEmployeeName" placeholder="请输入员工姓名" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1" >
                <p>教育经历:</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input name="educationExperience" v-model="expatriateEmployee.educationExperience" placeholder="请输入学历" ></b-form-input>
                </b-col>
                <b-col cols="2"  >
                <p>工作经验：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input name="workExperience" v-model="expatriateEmployee.workExperience" placeholder="请输入工作经验" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1">
                <p>技能特长:</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input name="skill" v-model="expatriateEmployee.skill" placeholder="请输入技能特长" ></b-form-input>
                </b-col>
                <b-col cols="2"  >
                <p>户口：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input name="address" v-model="expatriateEmployee.address" placeholder="请输入户口所在地" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1">
                <p>工资:</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input name="salary" v-model="expatriateEmployee.salary" placeholder="请输入工资" ></b-form-input>
                </b-col>
                <b-col cols="2" >
                <p>电话:</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input 
                    @blur="formValidate()" 
                    :state="phoneState"
                    name="expatriatePhonenumber" 
                    v-model="expatriateEmployee.expatriatePhonenumber" 
                    placeholder="请输入电话号码" ></b-form-input>
                </b-col>
                </b-row>
            <b-row>
                <b-col cols="2"  offset="1">
                <p>上传简历：</p>
                </b-col>
                <b-col cols="3">
                    <b-button @change="showFile" variant="success" class="upload btn">选择文件
                    <input id="fileUpload" class="change" type="file" name="file"></b-button>
                </b-col>
                <b-col cols="6">
                    <label style="padding:6px 0px;">{{this.filename}}</label>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="2" offset="1">
                <p>外派状态:</p>
                </b-col>
                <b-col cols="5">
                    <b-form-radio-group name="expatriateState" style="padding:6px 0px;" v-model="expatriateEmployee.expatriateState" >
                        <b-form-radio value="0">闲置中</b-form-radio>
                        <b-form-radio value="1">外派中</b-form-radio>
                        <b-form-radio value="2">已离职</b-form-radio>
                    </b-form-radio-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="2" offset="8">
                    <b-button id="btn" @click="$bvModal.hide('modal-update')">返回</b-button>
                </b-col>
                <b-col cols="2">
                    <b-button type="submit" id="btn" variant="primary">保存</b-button>
                </b-col>
            </b-row>
            </b-form>
        </b-modal>
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
        baseURL:"expatriate_management/expatriateEmployee/",
        expatriateEmployeelist_title:"外派人员信息",
        expatriateEmployeelist:[],
        fields:[
            {"pro":"id","label":"员工编号"},
            {"pro":"expatriateEmployeeName","label":"员工姓名"},
            {"pro":"educationExperience","label":"教育经历"},
            {"pro":"workExperience","label":"工作经验"},
            {"pro":"skill","label":"技能特长"},
            {"pro":"address","label":"户口"},
            {"pro":"salary","label":"工资/月"},
        ],
        totalDataNum:'',//总数据条目数
        options:[
            {text: '修改个人信息', value: '1'},
            {text: '下载简历', value: '2'},
            {text: '删除', value: '3'},
        ],
         currentPageNum:1,//当前页
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
            expatriateResume:'',//简历文件地址
         },
         filename:'',//简历文件名称
         phoneState:'',//验证电话号码
      }
   },
   methods:{
       findbyPage(currentPage){//    分页查找
        this.currentPageNum=currentPage;
        this.$http.get(this.baseURL+"getAll.action",{pageNum:currentPage})
            .then((data) => {
                console.log(data);
                if(data.code==1){
                    this.totalDataNum=data.data.total;
                    var tempList=data.data.list;
                    this.expatriateEmployeelist=[];
                    // 将之前的页数填满
                    var num=(currentPage-1)*7
                    for (let j = 0; j < num; j++) {
                        this.expatriateEmployeelist.push({"id":''})
                    }
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.expatriateEmployeelist.push({
                        "id":tempList[i].expatriateEmployeeId,
                        "expatriateEmployeeName":tempList[i].expatriateEmployeeName,
                        "educationExperience":tempList[i].educationExperience,
                        "workExperience":tempList[i].workExperience,
                        "skill":tempList[i].skill,
                        "address":tempList[i].address,
                        "salary":tempList[i].salary,
                        "state":this.getexpatriateState(tempList[i].expatriateState),
                        "expatriatePhonenumber":tempList[i].expatriatePhonenumber,
                        })
                    }
                }
            })
       },
       getexpatriateState(state){
            switch (state) {
                case 0:
                    return "闲置中"
                case 1:
                    return "外派中"
                default:
                    return "离职中"
            }
       },
       toSearch(condition){//   按条件查询数据
        this.$http.get(this.baseURL+"getByKeywords.action",{keywords:condition})
            .then((data) => {
                if(data.code==1){
                    this.totalDataNum=data.data.total;
                    var tempList=data.data.list;
                    this.expatriateEmployeelist=[];
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.expatriateEmployeelist.push({
                        "id":tempList[i].expatriateEmployeeId,
                        "expatriateEmployeeName":tempList[i].expatriateEmployeeName,
                        "educationExperience":tempList[i].educationExperience,
                        "workExperience":tempList[i].workExperience,
                        "skill":tempList[i].skill,
                        "address":tempList[i].address,
                        "salary":tempList[i].salary,
                        "state":this.getexpatriateState(tempList[i].expatriateState),
                        "expatriatePhonenumber":tempList[i].expatriatePhonenumber,
                        })
                    }
                }
            })
       },
       toDealAction(actionID,objectID){ //处理操作选项(操作，itemID)
            switch(actionID){
                case '1':
                    // 修改个人信息
                    this.toUpdate(objectID);
                    break;
                case '2':
                    // 下载简历
                    this.downloadResume(objectID);
                    break;
                case '3':
                    // 删除
                    this.toDelete(objectID);
                    break;
            }
       },
       toUpdate(id){//   更新数据模态框
            for (let i = 0; i < this.expatriateEmployeelist.length; i++) {
                if(this.expatriateEmployeelist[i].id==id){
                    var state='';
                    switch (this.expatriateEmployeelist[i].state) {
                        case "闲置中":
                            state=0;
                            break;
                        case "外派中":
                            state=1;
                            break;
                        default:
                            state=2;
                            break;
                    }
                    this.expatriateEmployee.expatriateEmployeeId=this.expatriateEmployeelist[i].id;
                    this.expatriateEmployee.expatriateEmployeeName=this.expatriateEmployeelist[i].expatriateEmployeeName
                    this.expatriateEmployee.educationExperience=this.expatriateEmployeelist[i].educationExperience;
                    this.expatriateEmployee.workExperience=this.expatriateEmployeelist[i].workExperience;
                    this.expatriateEmployee.skill=this.expatriateEmployeelist[i].skill;
                    this.expatriateEmployee.address=this.expatriateEmployeelist[i].address;
                    this.expatriateEmployee.salary=this.expatriateEmployeelist[i].salary;
                    this.expatriateEmployee.expatriateState=state;
                    this.expatriateEmployee.expatriatePhonenumber=this.expatriateEmployeelist[i].expatriatePhonenumber;
                }
            }
            this.$bvModal.show('modal-update');
       },
       update(){//更新数据
        let formData = new FormData(event.target);
           this.$http.post(this.baseURL+"updateExp.action",formData)
            .then((data) => {
                if(data.code==1){
                    this.showMasage(data.resultMsg,"success")
                }else{
                    this.showMasage(data.resultMsg,"error")
                }
                this.$bvModal.hide('modal-update');
                this.findbyPage(this.currentPageNum);
            })
       },
       toDelete(id){
           this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delete(id);
            }).catch(() => {});
       },
       delete(id){// 删除数据
        this.$http.get(this.baseURL+"delete.action",{id:id})
            .then((data) => {
                if(data.code==1){
                    this.showMasage(data.resultMsg,"success")
                }else{
                    this.showMasage(data.resultMsg,"error")
                }
                this.findbyPage(this.currentPageNum);
            })
       },
       toInsert(){ //    展示新增数据模态框
        this.$bvModal.show('modal-add');
       },
       insert(){//插入数据
        let formData = new FormData(event.target);
           this.$http.post(this.baseURL+"addExp.action",formData)
            .then((data) => {
                if(data.code==1){
                    this.showMasage(data.resultMsg,"success")
                }else{
                    this.showMasage(data.resultMsg,"error")
                }
                this.$bvModal.hide('modal-add');
                this.findbyPage(this.currentPageNum);
            })
       },
       downloadResume(id){//下载简历
        document.getElementById("down").href="http://localhost:8082/OA_back_war_exploded/expatriate_management/expatriateEmployee/downloadResume.action?expId="+id;
        document.getElementById("down").click();
       },
       showMasage(msg,typ){//    消息提示 （消息，类型）
           this.$message({
                showClose: true,
                duration:1000,//展示1000毫秒
                message: msg,
                type:typ
            });
       },
       showFile(){//展示文件名
        this.filename=document.getElementById("fileUpload").files[0].name;
        },
       formValidate(){//验证表单
        var reg = /^\d{11}$/;
        if(reg.test(this.expatriateEmployee.expatriatePhonenumber)==false){
            this.showMasage("请输入11位电话","error");
            this.phoneState=false;
        }else{
            this.phoneState=true;
        }
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
    padding-left:30px
}
.btn{
    width: 100%;
}
.change{
    position: absolute;
    overflow: hidden;
    right: 0;
    top: 0;
    opacity: 0;
}
</style>