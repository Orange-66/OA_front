<template>
    <div class="connector">
        <BaseTable
        :list_title=connectorlist_title
        :dataList=connectorlist
        :fields= fields
        :total=totalDataNum
        ></BaseTable>
        <!-- 新增联系人信息 -->
        <b-modal id="modal-add" title="新增联系人信息" @ok="insert" cancel-title="返回" ok-title="添加">
          
            <b-row >
                <b-col cols="2" offset="2" >
                <p>姓名<code>*</code>：</p>
                </b-col>
                <b-col cols="6">
                    <b-form-input 
                    @blur="formValidate('connectorname')" 
                    :state="connectornameState"
                    v-model="connector.connectorname" 
                    placeholder="请输入员工姓名" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="2">
                <p>电话<code>*</code>：</p>
                </b-col>
                <b-col cols="6">
                    <b-form-input 
                    @blur="formValidate('connectorPhone')" 
                    :state="connectorPhoneState"
                    v-model="connector.connectorphone" 
                    placeholder="请输入电话" ></b-form-input>
                </b-col>
            </b-row>
             <b-row >
                <b-col cols="2" offset="2" >
                <p>部门：</p>
                </b-col>
                <b-col cols="6">
                    <b-form-input 
                    readonly
                    @click="selectDepartment" 
                    v-model="connector.connectordepart" 
                    placeholder="点击选择所属部门"
                    ></b-form-input>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="2" offset="2">
                <p>职务：</p>
                </b-col>
                <b-col cols="6">
                    <b-form-input 
                    readonly
                    @click="selectJob" 
                    v-model="connector.connectoroccu" 
                    placeholder="点击选择职务" ></b-form-input>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="2" offset="2">
                <p>名片夹<code>*</code>:</p>
                </b-col>
                <b-col cols="6">
                    <b-form-input 
                    readonly
                    :state="connectortypeState"
                    @click="selectType" 
                    v-model="connector.connectortype" 
                    placeholder="点击选择名片夹分类" ></b-form-input>
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
        <!-- 选择名片夹 -->
        <b-modal id="modal-selectConnectorType" title="选择职务" size="lg" hide-footer>
            <BaseSimpleTable
            :list_title=connectorTypelist_title
            :dataList=connectorTypelist
            :fields=connectorTypefields
            :total=totalConnectorTypeDataNum
            :showSelect=true
            :formType=connectorTypetype></BaseSimpleTable>
        </b-modal>
        <!-- 更新联系人信息 -->
        <b-modal id="modal-update" title="更新联系人信息" @ok="update" cancel-title="返回" ok-title="保存">
            <b-row >
                <b-col cols="2" offset="2" >
                <p>编号<code>*</code>：</p>
                </b-col>
                <b-col cols="6">
                    <b-form-input readonly v-model="connector.connectorid" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="2" >
                <p>姓名<code>*</code>：</p>
                </b-col>
                <b-col cols="6">
                    <b-form-input 
                    @blur="formValidate('connectorname')" 
                    :state="connectornameState"
                    v-model="connector.connectorname" 
                    placeholder="请输入员工姓名" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="2">
                <p>电话<code>*</code>：</p>
                </b-col>
                <b-col cols="6">
                    <b-form-input 
                    @blur="formValidate('connectorPhone')" 
                    :state="connectorPhoneState"
                    v-model="connector.connectorphone" 
                    placeholder="请输入电话" ></b-form-input>
                </b-col>
            </b-row>
             <b-row >
                <b-col cols="2" offset="2" >
                <p>部门：</p>
                </b-col>
                <b-col cols="6">
                    <b-form-input 
                    readonly
                    @click="selectDepartment" 
                    v-model="connector.connectordepart" 
                    placeholder="点击选择所属部门"
                    ></b-form-input>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="2" offset="2">
                <p>职务：</p>
                </b-col>
                <b-col cols="6">
                    <b-form-input 
                    readonly
                    @click="selectJob" 
                    v-model="connector.connectoroccu" 
                    placeholder="点击选择职务" ></b-form-input>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="2" offset="2">
                <p>名片夹<code>*</code>:</p>
                </b-col>
                <b-col cols="6">
                    <b-form-input 
                    readonly
                    :state="connectortypeState"
                    @click="selectType" 
                    v-model="connector.connectortype" 
                    placeholder="点击选择名片夹分类" ></b-form-input>
                </b-col> 
            </b-row>
        </b-modal>
        
    </div>
</template>
<script>
import BaseTable from "../../component/BaseTable"
import BaseSimpleTable from "../../component/BaseSimpleTable"
export default {
    props: {
        userInfo: {
        type: Object,
        required: true
        }
    },
    components:{
        BaseTable,
        BaseSimpleTable
    },
   data() {
      return {
        baseURL:"connector/",
        connectorlist_title:"名片信息",
        connectorlist:[],
        fields:[
            {"pro":"id","label":"联系人编号"},
            {"pro":"connectorName","label":"姓名"},
            {"pro":"connectorphone","label":"电话"},
            {"pro":"connectordepart","label":"职务"},
            {"pro":"connectoroccu","label":"部门"},
            {"pro":"connectortype","label":"名片夹分类"},
        ],
        connector:{
            connectorid:'',//联系人编号
            connectorname:'',//联系人姓名
            connectoroccu:'',//联系人职务名称
            connectorphone:'',//联系人电话
            connectordepart:'',//联系人部门名称
            connectortype:'',//名片夹分类名称
            employeeid:'',
        },
        totalDataNum:'',//总数据条目数
        currentPageNum:1,//当前页
        connectornameState:'', 
        connectorPhoneState:'', 
        connectortypeState:'',
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
        // 名片夹信息
        connectorTypelist_title:"名片夹信息",
        connectorTypelist:[],
        connectorTypefields:[
            {"pro":"id","label":"名片夹分类编号"},
            {"pro":"connectortypename","label":"名片夹分类名称"},
        ],
        totalConnectorTypeDataNum:'',
        connectorTypetype:'connectorType',
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
      }
   },
   methods:{
       findbyPage(currentPage){//    分页查找联系人
        this.currentPageNum=currentPage;
        this.$http.get(this.baseURL+"getAllByConnector.action",{pageNum:currentPage,employeeid:this.userInfo.userID})
            .then((data) => {
                if(data.code==1){
                    this.totalDataNum=data.data.total;
                    var tempList=data.data.list;
                    this.connectorlist=[];
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.connectorlist.push({
                        "id":tempList[i].connectorid,
                        "connectorName":tempList[i].connectorname,
                        "connectorphone":tempList[i].connectorphone,
                        "connectordepart":tempList[i].connectordepart,
                        "connectoroccu":tempList[i].connectoroccu,
                        "connectortype":tempList[i].connectortype,
                        })
                    }
                }
            })
       },
       toSearch(searchKey){//按条件查询联系人
            this.$http.get(this.baseURL+"searchConnectorByName.action",{keyword:searchKey,employeeid:this.userInfo.userID})
            .then((data) => {
                console.log(data);
                if(data.code==1){
                    this.totalDataNum=data.data.total;
                    var tempList=data.data;
                    this.connectorlist=[];
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.connectorlist.push({
                        "id":tempList[i].connectorid,
                        "connectorName":tempList[i].connectorname,
                        "connectorphone":tempList[i].connectorphone,
                        "connectordepart":tempList[i].connectordepart,
                        "connectoroccu":tempList[i].connectoroccu,
                        "connectortype":tempList[i].connectortype,
                        })
                    }
                }
            })
       },
       toDelete(row){//删除信息
            this.$http.get(this.baseURL+"deleteConnector.action",{connectorid:row.id})
            .then((data) => {
                if(data.code==1){
                    this.showMasage(data.resultMsg,"success")
                }else{
                    this.showMasage(data.resultMsg,"error")
                }
                this.findbyPage(this.currentPageNum);
            })
       },
       toUpdate(row){
        this.connector.connectorid=row.id;
        this.connector.connectorname=row.connectorName;
        this.connector.connectoroccu=row.connectoroccu;
        this.connector.connectorphone=row.connectorphone;
        this.connector.connectordepart=row.connectordepart;
        this.connector.connectortype=row.connectortype;
        this.$bvModal.show('modal-update');
       },
       update(){
            this.connector.employeeid=this.userInfo.userID;
            this.$http.post(this.baseURL+"updateConnector.action",this.connector)
            .then((data) => {
            if(data.code==1){
                this.showMasage(data.resultMsg,"success")
            }else{
                this.showMasage(data.resultMsg,"error")
            }
            this.findbyPage(this.currentPageNum);
        })
       },
       toInsert(){//    新增数据模态框
        this.$bvModal.show('modal-add');
       },
       insert(){//插入数据
        this.connector.employeeid=this.userInfo.userID;
        this.$http.post(this.baseURL+"addConnector.action",this.connector)
        .then((data) => {
            if(data.code==1){
                this.showMasage(data.resultMsg,"success")
            }else{
                this.showMasage(data.resultMsg,"error")
            }
            this.findbyPage(this.currentPageNum);
        })
       },
       selectDepartment(){//选择部门模态框
        this.findDepartmentbyPage();
        this.$bvModal.show('modal-selectDepartment');
       },
       selectJob(){//选择职务模态框
        this.findJobbyPage();
        this.$bvModal.show('modal-selectJob');
       },
       selectType(){//选择名片夹模态框
        this.findbyConnectorTypePage();
        this.$bvModal.show('modal-selectConnectorType');
       },
       selectItem(row,type){//选择部门/职务
            if(type=="department"){
                this.connector.connectordepart=row.departmentName;
                this.$bvModal.hide('modal-selectDepartment');
            }else if(type=="job"){
                this.connector.connectoroccu=row.jobName;
                this.$bvModal.hide('modal-selectJob');
            }else if(type=="connectorType"){
                this.connector.connectortype=row.connectortypename;
                this.$bvModal.hide('modal-selectConnectorType');
                this.formValidate('connectortype');
            }
       },
       findbyConnectorTypePage(){//    分页查找名片夹
        this.$http.get("connectortype/getConnectorType.action",{employeeid:this.userInfo.userID})
            .then((data) => {
                console.log(data);
                if(data.code==1){
                    this.totalConnectorTypeDataNum=data.data.length;
                    var tempList=data.data;
                    this.connectorTypelist=[];
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.connectorTypelist.push({
                        "id":tempList[i].connectortypeid,
                        "connectortypename":tempList[i].connectortypename,
                        })
                    }
                }
            })
       },
       findDepartmentbyPage(){//  分页查找部门
        this.$http.get("system_management/department/getDepartment.action")
            .then((data) => {
                if(data.code==1){
                    this.totalDepartmentDataNum=data.data.total;
                    var tempList=data.data.list;
                    this.departmentlist=[];
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
       findJobbyPage(){//    分页查找职务
            this.$http.get("system_management/job/getJob.action")
            .then((data) => {
                if(data.code==1){
                    if(data.code==1){
                        this.totalJobDataNum=data.data.total;
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
       },
       formValidate(attr){//    验证表单输入信息（验证的属性）
           switch(attr){
            case "connectorname":
                if(this.connector.connectorname==''){
                    this.showMasage("联系人姓名不能为空","error");
                    this.connectornameState=false;
                }else{
                    this.connectornameState=true;
                }
                break;
            case "connectortype":
                if(this.connector.connectortype==''){
                    this.showMasage("请选择名片夹分类!","error");
                    this.connectortypeState=false;
                }else{
                    this.connectortypeState=true;
                }
                break;
            case "connectorPhone":
                var reg = /^\d{11}$/;
                if(reg.test(this.connector.connectorphone)==false){
                    this.showMasage("请输入11位电话","error");
                    this.connectorPhoneState=false;
                }else{
                    this.connectorPhoneState=true;
                }
                break;
           }
       },
   },
   created() {
       this.findbyPage(this.currentPageNum);
   }
}
</script>
<style scoped>
p{
    padding:6px 0px;
}
</style>