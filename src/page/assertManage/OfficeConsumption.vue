<template>
    <div class="officeconsumption">
        <BaseTable 
        :list_title=officeconsumptionlist_title
        :dataList=officeconsumptionlist
        :fields= fields
        :showSearch=false
        :searchMethod=true
        :total=totalDataNum
        :showExport=true
        ></BaseTable>
        <a id="officeconsumption" href="http://localhost:8082/OA_back_war_exploded/asset_management/officeConsumption/exportExcel.action"></a>
        <!-- 新增消耗记录 -->
        <b-modal id="modal-add" title="新增消耗记录" @ok="insert" cancel-title="返回" ok-title="添加">
            <b-row >
                <b-col cols="3" offset="1" >
                <p>资产：</p>
                </b-col>
                <b-col cols="7">
                   <b-form-input 
                    readonly
                    @click="selectAssert" 
                    v-model="officeconsumption.assetname" 
                    placeholder="点击选择资产"
                    ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1" >
                <p>员工：</p>
                </b-col>
                <b-col cols="7">
                   <b-form-input 
                    readonly
                    @click="selectUser" 
                    v-model="officeconsumption.username" 
                    placeholder="点击选择员工"
                    ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1" >
                <p>消耗数量：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input v-model="officeconsumption.consumptionnum" placeholder="请输入消耗数量" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1" >
                <p>消耗日期：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input type="date" v-model="officeconsumption.consumptiondate"></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1" >
                <p>详述：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-textarea v-model="officeconsumption.remarks" placeholder="请输入详述" ></b-form-textarea>
                </b-col>
            </b-row>
        </b-modal>
        <!-- 选择员工 -->
        <b-modal id="modal-selectUser" title="选择员工" size="lg" hide-footer >
            <BaseSimpleTable
            :list_title=userlist_title
            :dataList=userList
            :fields=userfields
            :total=totalUserDataNum
            :showSelect=true
            :formType=userType
            ></BaseSimpleTable>
        </b-modal>
        <!-- 选择资产 -->
        <b-modal id="modal-selectAssert" title="选择资产" size="lg" hide-footer >
            <BaseSimpleTable
            :list_title=assertInventoryList_title
            :dataList=assertInventoryList
            :fields=assertInventoryfields
            :total=totalAssertDataNum
            :showSelect=true
            :formType=assertType
            ></BaseSimpleTable>
        </b-modal>
        <b-modal id="modal-update" title="修改消耗数量" hide-footer>
            <b-row>
                <b-col cols="4" offset="1"><p>请输入归还数量:</p></b-col>
                <b-col cols="4"><b-form-input v-model="rebackNum" @blur="formValidate"  :state="rebackNumeState"></b-form-input></b-col>
                <b-col cols="3"><b-button variant="primary" @click="update" >保存</b-button></b-col>
            </b-row>
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
        baseURL:"asset_management/officeConsumption/",
        officeconsumptionlist_title:"办公用品消耗信息",
        officeconsumptionlist:[],
        fields:[
            {"pro":"assetname","label":"资产名称"},
            {"pro":"assertTypeName","label":"资产类别"},
            {"pro":"applicationName","label":"申请人"},
            {"pro":"consumptionNum","label":"消耗数量"},
            {"pro":"consumptionDate","label":"消耗日期"},
            {"pro":"remarks","label":"详述"},
        ],
        officeconsumption:{ //办公用品消耗表单信息
            officeconsumptionId:'',//消耗记录编号
            asseinventoryId:'',//资产编号
            assetname:'',//资产名称
            assetcategoryId:'',//资产类别编号
            assetcategoryname:'',//资产类别名称
            username:'',//申请人姓名
            consumptionnum:'',//消耗数量
            consumptiondate:'',//消耗日期
            remarks:'',//备注
        },
        totalDataNum:'',//总数据条目数
        currentPageNum:1,//当前页
        userlist_title:'员工列表',
        userList:[],//员工列表
        userfields:[
            {"pro":"userName","label":"姓名"},
            {"pro":"departmentName","label":"部门"},
            {"pro":"jobName","label":"职务"},
        ],
        totalUserDataNum:'',//员工数据总数
        userType:"user",
        assertInventoryList_title:"库存信息",
        assertInventoryList:[],//资产列表 
        assertInventoryfields:[
            {"pro":"id","label":"资产编号"},
            {"pro":"assertname","label":"资产名称"},
            {"pro":"assertTypeName","label":"资产类别"},
            {"pro":"assertNum","label":"库存数量"},
        ],
        totalAssertDataNum:"",//资产数据总数
        assertType:"assert",
        rebackNum:'',//归还数量
        rebackNumeState:'',
      }
   },
   methods:{
       findbyPage(currentPage){//    分页查找
        this.currentPageNum=currentPage;
        this.$http.get(this.baseURL+"selectAll.action",{pageNum:currentPage,pageSize:7})
            .then((data) => {
                if(data.code==1){
                    this.totalDataNum=data.data.total;
                    var tempList=data.data.list;
                    this.officeconsumptionlist=[];
                    // 将之前的页数填满
                    var num=(currentPage-1)*7
                    for (let j = 0; j < num; j++) {
                        this.officeconsumptionlist.push({"id":''})
                    }
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.officeconsumptionlist.push({
                        "id":tempList[i].officeconsumptionId,
                        "assetname":tempList[i].assetname,
                        "asseinventoryId":tempList[i].asseinventoryId,
                        "assertTypeID":tempList[i].assetcategoryId,
                        "assertTypeName":tempList[i].assetcategoryname,
                        "applicationName":tempList[i].username,
                        "consumptionNum":tempList[i].consumptionnum,
                        "consumptionDate":tempList[i].consumptiondate,
                        "remarks":tempList[i].remarks,
                        })
                    }
                }
            })
       },
       toUpdate(row){ //   更新数据
        this.officeconsumption.officeconsumptionId=row.id,
        this.officeconsumption.asseinventoryId=row.asseinventoryId,
        this.officeconsumption.assetname=row.assetname,
        this.officeconsumption.assetcategoryId=row.assertTypeID,
        this.officeconsumption.assetcategoryname=row.assertTypeName,
        this.officeconsumption.username=row.applicationName,
        this.officeconsumption.consumptionnum=row.consumptionNum,
        this.officeconsumption.consumptiondate=row.consumptionDate,
        this.officeconsumption.remarks=row.remarks,
        this.$bvModal.show('modal-update');
       },
       update(){
        this.$bvModal.hide('modal-update');
        this.officeconsumption.consumptionnum=this.officeconsumption.consumptionnum-this.rebackNum
        
        this.$http.post(this.baseURL+"updateConsumption.action",this.officeconsumption)
            .then((data) => {
                console.log(this.officeconsumption);
                if(data.code==1){
                    this.showMasage(data.data,"success")
                }else{
                    this.showMasage(data.data,"error")
                }
                this.findbyPage(this.currentPageNum);
            })
       },
       toDelete(row){ // 删除数据
        this.$http.get(this.baseURL+"deleteConsumption.action",{officeconsumptionId:row.id})
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
       toExport(){//    导出数据
        document.getElementById("officeconsumption").click();
       },
       toSearch(selected,searchKey){//   按条件查询数据
        if (selected=='1') {
            this.$http.get(this.baseURL+"selectByPrimaryKey.action",{officeconsumptionId:searchKey})
                .then((data) => {
                    console.log(data);
                    if(data.code==1){
                    this.totalDataNum=data.data.total;
                    var tempList=data.data.list;
                    this.officeconsumptionlist=[];
                        this.officeconsumptionlist.push({
                        "id":data.data.officeconsumptionId,
                        "assetname":data.data.assetname,
                        "asseinventoryId":data.data.asseinventoryId,
                        "assertTypeID":data.data.assetcategoryId,
                        "assertTypeName":data.data.assetcategoryname,
                        "applicationName":data.data.username,
                        "consumptionNum":data.data.consumptionnum,
                        "consumptionDate":data.data.consumptiondate,
                        "remarks":data.data.remarks,
                        })
                }
                })
        }else if (selected=='2') {
            this.$http.get(this.baseURL+"selectByName.action",{assetname:searchKey})
            .then((data) => {
                console.log(data);
                if(data.code==1){
                    this.totalDataNum=data.data.total;
                    var tempList=data.data.list;
                    this.officeconsumptionlist=[];
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.officeconsumptionlist.push({
                        "id":tempList[i].officeconsumptionId,
                        "assetname":tempList[i].assetname,
                        "asseinventoryId":tempList[i].asseinventoryId,
                        "assertTypeID":tempList[i].assetcategoryId,
                        "assertTypeName":tempList[i].assetcategoryname,
                        "applicationName":tempList[i].username,
                        "consumptionNum":tempList[i].consumptionnum,
                        "consumptionDate":tempList[i].consumptiondate,
                        "remarks":tempList[i].remarks,
                        })
                    }
                }
            })
        }else if (selected=='3') {
            this.$http.get(this.baseURL+"selectByCategory.action",{assetcategoryname:searchKey})
            .then((data) => {
                console.log(data);
                if(data.code==1){
                    this.totalDataNum=data.data.total;
                    var tempList=data.data.list;
                    this.officeconsumptionlist=[];
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.officeconsumptionlist.push({
                        "id":tempList[i].officeconsumptionId,
                        "assetname":tempList[i].assetname,
                        "asseinventoryId":tempList[i].asseinventoryId,
                        "assertTypeID":tempList[i].assetcategoryId,
                        "assertTypeName":tempList[i].assetcategoryname,
                        "applicationName":tempList[i].username,
                        "consumptionNum":tempList[i].consumptionnum,
                        "consumptionDate":tempList[i].consumptiondate,
                        "remarks":tempList[i].remarks,
                        })
                    }
                }
            })
        }
       },
       toInsert(){//    新增数据
        this.$bvModal.show('modal-add');
       },
       insert(){
        this.$http.post(this.baseURL+"addConsumption.action",this.officeconsumption)
        .then((data) => {
            console.log(data);
        if(data.code==1){
            this.showMasage(data.data,"success")
        }else{
            this.showMasage(data.data,"error")
        }
        this.findbyPage(this.currentPageNum);
       })
       },
       selectAssert(){//选择资产模态框
        this.findAssertbyPage();
        this.$bvModal.show('modal-selectAssert');
       },
       findAssertbyPage(){
           this.$http.get("asset_management/inventory/selectAll.action")
            .then((data) => {
                if(data.code==1){
                    this.totalAssertDataNum=data.data.total;
                    var tempList=data.data.list;
                    this.assertInventoryList=[];
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.assertInventoryList.push({
                        "id":tempList[i].asseinventoryId,
                        "assertname":tempList[i].assetname,
                        "assertType":tempList[i].assetcategoryId,
                        "assertTypeName":tempList[i].assetcategoryname,
                        "assertNum":tempList[i].inventorynum,
                        })
                    }
                }
            })
       },
       selectUser(){//选择员工模态框
        this.findUserbyPage();
        this.$bvModal.show('modal-selectUser');
       },
       findUserbyPage(){//选择员工
        this.$http.get("system_management/employee/getEmployee.action")
            .then((data) => {
            console.log(data);
            if(data.code==1){
                this.totalUserDataNum=data.data.total;
                var tempList=data.data.list;
                this.userList=[];
                // 插入数据
                for (let i = 0; i < tempList.length; i++) {
                this.userList.push({
                "id":tempList[i].employeeId,
                "userName":tempList[i].employeeName,
                "departmentName":tempList[i].department.departmentName,
                "jobName":tempList[i].job.jobName,
                })
                }
            }
            })
       },
       selectItem(row,type){//选择员工/资产
            if(type=="user"){
                this.officeconsumption.username=row.userName;
                this.$bvModal.hide('modal-selectUser');
            }else if(type=="assert"){
                this.officeconsumption.asseinventoryId=row.id;
                this.officeconsumption.assetname=row.assertname;
                this.officeconsumption.assetcategoryId=row.assertType;
                this.officeconsumption.assetcategoryname=row.assertTypeName;
                this.$bvModal.hide('modal-selectAssert');
            }
       },
       formValidate(){//    验证表单输入信息（验证的属性）
       console.log(this.officeconsumption);
        if ((this.officeconsumption.consumptionnum-this.rebackNum)<0) {
            this.showMasage("请输入正确的归还数量","error");
            this.rebackNumeState=false;
        }else{
            this.rebackNumeState=true;
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
//    computed:{
// 	rebackNum:function(){
//         if ((this.officeconsumption.consumptionnum-this.rebackNum)<0) {
//             this.showMasage("请输入正确的归还数量","error");
//             this.rebackNumeState=false;
//         }
// 		return {

//         }
//     }
//    },
   created() {
       this.findbyPage(this.currentPageNum);
   }
}
</script>
<style scoped>
p{
    padding:6px 0px;
    padding-left:0px
}
</style>