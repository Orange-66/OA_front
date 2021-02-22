<template>
    <div class="company">
        <BaseActionTable
        :list_title=companylist_title
        :dataList=companylist
        :fields= fields
        :options=options
        :total=totalDataNum
        :showfind=false
        ></BaseActionTable>
        <!-- 新增合作公司 -->
        <b-modal id="modal-add" title="新增合作公司" @ok="insert()" cancel-title="返回" ok-title="添加">
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">公司名称：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input
                    @blur="formValidate('companyName')" 
                    :state="companyNameState"
                    v-model="companyInfo.companyName" 
                    placeholder="请输入公司名称"></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">联系人姓名：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input
                    @blur="formValidate('contactName')" 
                    :state="contactNameState"
                    v-model="companyInfo.contactName" 
                    placeholder="请输入联系人姓名"></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">联系人电话：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input 
                    @blur="formValidate('contactNum')" 
                    :state="contactNumState"
                    v-model="companyInfo.contactNumber" 
                    placeholder="请输入正确的手机格式"></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">联系人QQ：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input v-model="companyInfo.contactQq" placeholder="请输入正确的QQ号"></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">备注：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input v-model="companyInfo.note" placeholder="请输入联系人备注"></b-form-input>
                </b-col>
            </b-row>
        </b-modal>
        <!-- 修改合作公司信息 -->
        <b-modal id="modal-update" title="修改合作公司信息" @ok="update()" cancel-title="返回" ok-title="保存">
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">公司编号：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input v-model="companyInfo.companyId" readonly></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">公司名称：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input v-model="companyInfo.companyName" readonly></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">联系人姓名：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input v-model="companyInfo.contactName" readonly></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">联系人电话：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input 
                    @blur="formValidate('contactNum')" 
                    :state="contactNumState"
                    v-model="companyInfo.contactNumber" 
                    placeholder="请输入正确的手机格式"></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">联系人QQ：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input v-model="companyInfo.contactQq" placeholder="请输入正确的QQ号"></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1">
                <p style="padding:6px 0px;">备注：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input v-model="companyInfo.note" placeholder="请输入联系人备注"></b-form-input>
                </b-col>
            </b-row>
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
        baseURL:"expatriate_management/coCompany/",
        companylist_title:"合作公司列表",
        companylist:[],
        fields:[
            {"pro":"id","label":"公司编号"},
            {"pro":"companyName","label":"公司名称"},
            {"pro":"contactName","label":"联系人姓名"},
            {"pro":"contactNumber","label":"联系人电话"},
            {"pro":"contactQq","label":"联系人QQ"},
            {"pro":"note","label":"备注"},
        ],
        totalDataNum:'',//总数据条目数
        options:[
            {text: '查看需求', value: '1'},
            {text: '修改', value: '2'},
            {text: '删除', value: '3'},
        ],
        currentPageNum:1,//当前页
        companyInfo:{
            companyId:'',//公司编号
            companyName:'',//公司名称
            contactName:'',//联系人姓名
            contactNumber:'',//联系人电话
            contactQq:'',//联系人QQ
            note:'',//备注
        },
        companyNameState:'',
        contactNameState:'',
        contactNumState:'',
      }
   },
   methods:{
       findbyPage(currentPage){//    分页查找
        this.currentPageNum=currentPage;
        this.$http.get(this.baseURL+"getAll.action",{pageNum:currentPage})
            .then((data) => {
                if(data.code==1){
                    this.totalDataNum=data.data.total;
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
                        "contactNumber":tempList[i].contactNumber,
                        "contactQq":tempList[i].contactQq,
                        "note":tempList[i].note,
                        })
                    }
                }
            })
       },
       toDealAction(actionID,objectID){ //处理操作选项(操作，itemID)
            switch(actionID){
                case '1':
                    // 查看需求
                    this.$router.push({path: "/expatriate_manage/companyDemand",query:{companyId:objectID}});
                    break;
                case '2':
                    // 修改
                    this.toUpdate(objectID);
                    break;
                case '3':
                    // 删除
                    this.toDelete(objectID);
                    break;
            }
       },
       toUpdate(id){//   更新数据模态框
            for (let i = 0; i < this.companylist.length; i++) {
                if(this.companylist[i].id==id){
                    this.companyInfo.companyId=this.companylist[i].id;
                    this.companyInfo.companyName=this.companylist[i].companyName;
                    this.companyInfo.contactName=this.companylist[i].contactName;
                    this.companyInfo.contactNumber=this.companylist[i].contactNumber;
                    this.companyInfo.contactQq=this.companylist[i].contactQq;
                    this.companyInfo.note=this.companylist[i].note;
                }
            }
            this.$bvModal.show('modal-update');
       },
       update(){//更新数据
           this.$http.post(this.baseURL+"updateCompany.action",this.companyInfo)
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
        this.$http.get(this.baseURL+"deleteCompany.action",{id:id})
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
           this.$http.post(this.baseURL+"addCompany.action",this.companyInfo)
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
       formValidate(attr){//    验证表单输入信息（验证的属性）
           switch(attr){  
            case "companyName":
                if(this.companyInfo.companyName==''){
                    this.showMasage("请输入信息","error");
                    this.companyNameState=false;
                }else{
                    this.companyNameState=true;
                }
                break;
            case "contactName":
                if(this.companyInfo.contactName==''){
                    this.showMasage("请输入信息","error");
                    this.contactNameState=false;
                }else{
                    this.contactNameState=true;
                }
                break;
            case "contactNum":
                var reg = /^\d{11}$/;
                if(reg.test(this.companyInfo.contactNumber)==false){
                    this.showMasage("请输入11位电话","error");
                    this.contactNumState=false;
                }else{
                    this.contactNumState=true;
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
</style>