<template>
    <div class="employee">
        <BaseActionTable
        :list_title=employeelist_title
        :dataList=employeelist
        :fields= fields
        :options=options
        :total=totalDataNum
        ></BaseActionTable>
    <div>
        <!-- 新增员工信息 -->
        <b-modal id="modal-add" title="新增员工信息" size="lg" @ok="insert" cancel-title="返回" ok-title="添加">
            <b-row >
                <b-col cols="2" offset="1" >
                <p>姓名<code>*</code>：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input
                    @blur="formValidate('employeeName')" 
                    :state="employeeNameState"
                    v-model="employee.employeeName" 
                    placeholder="请输入员工姓名" ></b-form-input>
                </b-col>
                <b-col cols="2" >
                <p>用户名<code>*</code>:</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input 
                    @blur="formValidate('employeeUserName')" 
                    :state="employeeUserNameState"
                    v-model="employee.employeeUsername" 
                    placeholder="请输入登陆用户名" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1" >
                <p>密码<code>*</code>：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input 
                    @blur="formValidate('employeepassword')" 
                    :state="employeepasswordState"
                    v-model="employee.employeePassword" 
                    placeholder="请输入密码" ></b-form-input>
                </b-col>
                <b-col cols="2" >
                <p>性别<code>*</code>：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-radio-group style="padding:6px 0px;" v-model="employee.employeeSex" >
                        <b-form-radio value="1">男</b-form-radio>
                        <b-form-radio value="2">女</b-form-radio>
                    </b-form-radio-group>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1" >
                <p>生日<code>*</code>：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input 
                    @blur="formValidate('employeeBirthday')" 
                    :state="employeeBirthdayState"
                    v-model="employee.employeeBirthday" 
                    type="date"
                    ></b-form-input>
                </b-col>
                <b-col cols="2" >
                <p>电话<code>*</code>：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input 
                    @blur="formValidate('employeePhone')" 
                    :state="employeePhoneState"
                    v-model="employee.employeePhone" 
                    placeholder="请输入电话" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1" >
                <p>邮箱<code>*</code>：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input 
                    @blur="formValidate('employeeEmail')" 
                    :state="employeeEmailState"
                    v-model="employee.employeeEmail" 
                    placeholder="请输入电子邮箱"
                    ></b-form-input>
                </b-col>
                <b-col cols="2" >
                <p>QQ：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input 
                    v-model="employee.employeeQq" 
                    placeholder="请输入QQ" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1" >
                <p>部门<code>*</code>：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input 
                    readonly
                    @click="selectDepartment" 
                    :state="departmentNameState"
                    v-model="employee.department.departmentName" 
                    placeholder="点击选择所属部门"
                    ></b-form-input>
                </b-col>
                <b-col cols="2" >
                <p>职务<code>*</code>：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input 
                    readonly
                    @click="selectJob" 
                    :state="jobNameState"
                    v-model="employee.job.jobName" 
                    placeholder="点击选择职务" ></b-form-input>
                </b-col>
            </b-row>
        </b-modal>
        <!-- 选择所属部门 -->
        <b-modal id="modal-selectDepartment" title="选择所属部门" size="lg" hide-footer >
            <BaseSimpleTable
            :list_title=departmentlist_title
            :dataList=departmentlist
            :fields=departmentfields
            :total=totalDepartmentDataNum
            :showSelect=true
            :formType=departmenttype></BaseSimpleTable>
        </b-modal>
        <!-- 选择职务 -->
        <b-modal id="modal-selectJob" title="选择职务" size="lg" hide-footer>
            <BaseSimpleTable
            :list_title=joblist_title
            :dataList=joblist
            :fields=jobfields
            :total=totalJobDataNum
            :showSelect=true
            :formType=jobtype></BaseSimpleTable>
        </b-modal>
        <!-- 云存储空间 -->
        <b-modal id="modal-setStorage" title="设置云存储空间大小" size="lg" hide-footer>
            <b-row>
                <b-col cols="3" offset="2"><p>用户编号</p></b-col>
                <b-col cols="3"><b-form-input v-model="employee.employeeId" readonly></b-form-input></b-col>
            </b-row>
            <b-row>
                <b-col cols="3" offset="2"><p>文件夹大小(GB)</p></b-col>
                <b-col cols="3"><b-form-input v-model="employee.employeeStorage"></b-form-input></b-col>
                <b-col cols="2"><b-button variant="primary" @click="setStorage">修改</b-button></b-col>
            </b-row>
        </b-modal>
        <!-- 查看/修改信息 -->
        <b-modal id="modal-update" title="查看/修改员工信息" size="xl" hide-footer>
            <MaintainInfo
            :employeeID=employee.employeeId></MaintainInfo>
        </b-modal>
        <!-- 设置角色 -->
        <b-modal id="modal-setCharacter" title="设置角色" @ok="setCharacter()" cancel-title="返回" ok-title="保存">
            <b-row >
                <b-col cols="6" offset="1">
                <p style="padding:6px 0px;">当前员工拥有如下角色：</p>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="10" offset="1">
                    <b-form-checkbox-group
                    v-model="employee.characters"
                    :options="allCharacterslist"
                    class="mb-3"
                    value-field="value"
                    text-field="text"
                    ></b-form-checkbox-group>
                </b-col>
            </b-row>
        </b-modal>
    </div>
    </div>
</template>
<script>
import BaseActionTable from "../../component/BaseActionTable"
import BaseSimpleTable from "../../component/BaseSimpleTable"
import MaintainInfo from "../personalCenter/MaintainInfo" 
export default {
    components:{
        BaseActionTable,
        BaseSimpleTable,
        MaintainInfo
    },
   data() {
      return {
        baseURL:"system_management/employee/",
        employeelist_title:"员工管理",
        employeelist:[],
        fields:[
            {"pro":"id","label":"员工编号"},
            {"pro":"employeeName","label":"员工姓名"},
            {"pro":"jobName","label":"职务"},
            {"pro":"departmentName","label":"所属部门"},
        ],
        totalDataNum:'',//总数据条目数
        currentPageNum:1,//当前页
        employee:{ //员工表单信息
            employeeId:'',//员工编号
            employeeName:'',//员工姓名
            employeeUsername:'',//登陆用户名
            employeePassword:'',//密码
            employeeSex:'1',//性别
            employeeBirthday:'',//生日
            employeePhone:'',//电话
            employeeEmail:'',//电子邮件
            employeeQq:'',//QQ号
            employeeStorage:'',//用户云存储空间
            departmentId:'',//所属部门编号
            jobId:'',//职务编号
            department:{
                departmentId:'',//所属部门编号
                departmentName:'',//所属部门名称
                departmentDescription:''
            },
            job:{
                jobId:'',
                jobName:'',//职务名称
                jobDescription:''
            },
            characters:[]//员工所拥有的角色
        },
        // 表单状态
        employeeNameState:'',
        employeeUserNameState:'',
        employeepasswordState:'',
        employeeBirthdayState:'',
        employeePhoneState:'',
        employeeEmailState:'',
        departmentNameState:'',
        jobIDState:'',
        jobNameState:'',
        // 操作选项
        options:[
            {text: '查看/修改详细信息', value: '1'},
            {text: '设置云存储空间', value: '2'},
            {text: '设置系统角色', value: '3'},
            {text: '删除员工', value: '4'},
        ],
        // 部门信息
        departmentlist_title:"部门信息",
        departmentlist:[],
        departmentfields:[
            {"pro":"id","label":"部门编号"},
            {"pro":"departmentName","label":"部门名称"},
            {"pro":"departmentDescription","label":"部门描述"},
        ],
        totalDepartmentDataNum:'',
        departmenttype:'department',
        // 职务信息
        joblist_title:"职务信息",
        joblist:[],
        jobfields:[
            {"pro":"id","label":"职务编号"},
            {"pro":"jobName","label":"职务名称"},
            {"pro":"jobDescription","label":"职务描述"},
        ],
        totalJobDataNum:'',
        jobtype:'job',
        allCharacterslist:[],//所有角色的列表
      }
   },
   methods:{
       findbyPage(currentPage){//    分页查找员工信息
            this.currentPageNum=currentPage;
            this.$http.get(this.baseURL+"getEmployee.action",{pageNum:currentPage})
            .then((data) => {
                if(data.code==1){
                    this.totalDataNum=data.data.total;
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
                        "id":tempList[i].employeeId,
                        "employeeName":tempList[i].employeeName,
                        "departmentName":tempList[i].department.departmentName,
                        "jobName":tempList[i].job.jobName,
                        "employeeStorage":tempList[i].employeeStorage
                        })
                    }
                }
            })
       },
       toSearch(searchKey){//按条件查询员工
            this.$http.get(this.baseURL+"findEmployee.action",{searchKey:searchKey})
            .then((data) => {
                if(data.code==1){
                    this.totalDataNum=data.data.total;
                    var tempList=data.data.list;
                    this.employeelist=[];
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.employeelist.push({
                        "id":tempList[i].employeeId,
                        "employeeName":tempList[i].employeeName,
                        "departmentName":tempList[i].department.departmentName,
                        "jobName":tempList[i].job.jobName,
                        })
                    }
                }
            })
       },
       toDealAction(actionID,objectID,storage){ //处理操作选项(操作，itemID)
            switch(actionID){
                case '1':
                    // 查看/修改信息
                    this.employee.employeeId=objectID;
                    // 跳转到个人中心，员工维护
                    this.$bvModal.show('modal-update');
                    break;
                case '2':
                    // 设置云存储空间
                    this.employee.employeeId=objectID;
                    this.employee.employeeStorage=storage;
                    this.$bvModal.show('modal-setStorage');
                    break;
                case '3':
                    // 设置系统角色
                    this.employee.employeeId=objectID;
                    this.getNotOwnedCharacter(objectID);
                    this.$bvModal.show('modal-setCharacter');
                    break;
                case '4':
                    // 删除员工
                    this.toDelete(objectID);
                    break;
            }
       },
       setStorage(){ // 设置云存储空间
            this.$bvModal.hide('modal-setStorage');
            this.$http.get(this.baseURL+"updateStorage.action",{employeeId:this.employee.employeeId,employeeStorage:this.employee.employeeStorage})
            .then((data) => {
                if(data.code==1){
                    this.showMasage(data.data,"success")
                }else{
                    this.showMasage(data.data,"error")
                }
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
       delete(id){//删除员工信息
            this.$http.get(this.baseURL+"deleteEmployee.action",{employeeId:id})
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
        this.$http.post(this.baseURL+"addEmployee.action",this.employee)
        .then((data) => {
            if(data.code==1){
                this.showMasage(data.data,"success")
            }else{
                this.showMasage(data.data,"error")
            }
            this.findbyPage(this.currentPageNum);
        })
       },
       findDepartmentbyPage(currentPage){//  分页查找部门
        this.$http.get("system_management/department/getDepartment.action",{pageNum:currentPage})
            .then((data) => {
                if(data.code==1){
                    this.totalDepartmentDataNum=data.data.total;
                    var tempList=data.data.list;
                    this.departmentlist=[];
                    // 将之前的页数填满
                    var num=(currentPage-1)*7
                    for (let j = 0; j < num; j++) {
                        this.departmentlist.push({"id":''})
                    }
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.departmentlist.push({
                        "id":tempList[i].departmentId,
                        "departmentName":tempList[i].departmentName,
                        "departmentDescription":tempList[i].departmentDescription,
                        })
                    }
                }
            })
       },
       findJobbyPage(currentPage){//    分页查找职务
            this.$http.get("system_management/job/getJob.action",{pageNum:currentPage})
            .then((data) => {
                if(data.code==1){
                    if(data.code==1){
                        this.totalJobDataNum=data.data.total;
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
                }
            })
       },
       selectDepartment(){//选择部门模态框
        this.findDepartmentbyPage(1);
        this.$bvModal.show('modal-selectDepartment');
       },
       selectJob(){//选择职务模态框
        this.findJobbyPage(1);
        this.$bvModal.show('modal-selectJob');
       },
       selectItem(row,type){//选择部门/职务
            if(type=="department"){
                this.employee.department.departmentName=row.departmentName;
                this.employee.department.departmentId=row.id;
                this.employee.departmentId=row.id;
                this.$bvModal.hide('modal-selectDepartment');
                this.formValidate('departmentName');
            }else if(type=="job"){
                this.employee.job.jobName=row.jobName;
                this.employee.job.jobId=row.id;
                this.employee.jobId=row.id;
                this.$bvModal.hide('modal-selectJob');
                this.formValidate('jobName');
            }
       },
       getNotOwnedCharacter(employeeId){//查找未拥有的角色
            this.$http.get(this.baseURL+"getNotOwnedCharacter.action",{employeeId:employeeId})
            .then((data) => {
                if(data.code==1){
                    var tempList1=data.data[0];
                    var tempList2=data.data[1];
                    this.employee.characters=[];
                    this.allCharacterslist=[];
                    // 已拥有的权限
                    for (let i = 0; i < tempList1.length;i++) {
                        this.employee.characters.push(tempList1[i].characterId);
                    }
                    // 全部权限
                    for (let i = 0; i < tempList2.length;i++) {
                        this.allCharacterslist.push({
                        "text":tempList2[i].characterName,
                        "value":tempList2[i].characterId,
                        })
                    }
                }
            })
       },
       setCharacter(){
           var temp = new Array();
           for (var i = 0; i < this.employee.characters.length; i++) {
                var a={};
                a.characterId=this.employee.characters[i];
                temp.push(a);
            }
            this.employee.characters=temp;
            this.$http.post(this.baseURL+"setCharacter.action", this.employee)
            .then((data) => {
                if(data.code==1){
                    this.showMasage(data.data,"success")
                }else{
                    this.showMasage(data.data,"error")
                }
                this.findbyPage(this.currentPageNum);
            })
       },
       formValidate(attr){//    验证表单输入信息（验证的属性）
           switch(attr){
            case "employeeName":
                if(this.employee.employeeName.length==0){
                    this.showMasage("姓名不能为空","error");
                    this.employeeNameState=false;
                }else{
                    this.employeeNameState=true;
                }
                break;
            case "employeeUserName":
                var reg = /^[A-Za-z]{6,16}$/;
                if(reg.test(this.employee.employeeUsername)==false){
                    this.showMasage("请输入6-12位字母","error");
                    this.employeeUserNameState=false;
                }else{
                    this.employeeUserNameState=true;
                }
                break;
            case "employeepassword":
                var reg = /^.{5,20}$/;
                if(reg.test(this.employee.employeePassword)==false){
                    this.showMasage("请输入5-20位字符","error");
                    this.employeepasswordState=false;
                }else{
                    this.employeepasswordState=true;
                }
                break;
            case "employeeBirthday":
                if(this.employee.employeeBirthday==''){
                    this.showMasage("生日不能为空","error");
                    this.employeeBirthdayState=false;
                }else{
                    this.employeeBirthdayState=true;
                }
                break;
            case "employeePhone":
                var reg = /^\d{11}$/;
                if(reg.test(this.employee.employeePhone)==false){
                    this.showMasage("请输入11位电话","error");
                    this.employeePhoneState=false;
                }else{
                    this.employeePhoneState=true;
                }
                break;
            case "employeeEmail":
                var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                if(reg.test(this.employee.employeeEmail)==false){
                    this.showMasage("请输入正确的邮箱","error");
                    this.employeeEmailState=false;
                }else{
                    this.employeeEmailState=true;
                }
                break;
            case "departmentName":
                if(this.employee.department.departmentName==''){
                    this.showMasage("请选择所属部门","error");
                    this.departmentNameState=false;
                }else{
                    this.departmentNameState=true;
                }
                break;
            case "jobName":
                if(this.employee.job.jobName==''){
                    this.showMasage("请选择职务","error");
                    this.jobNameState=false;
                }else{
                    this.jobNameState=true;
                }
                break;
            }
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
</style>