<template>
    <div class="assertInventory">
        <BaseTable
        :list_title=assertInventorylist_title
        :dataList=assertInventorylist
        :fields= fields
        :showSearch=false
        :searchMethod=true
        :total=totalDataNum
        ></BaseTable>
        <!-- 新增资产库存信息 -->
        <b-modal id="modal-add" title="新增资产库存信息" @ok="insert" cancel-title="返回" ok-title="添加">
            <b-row >
                <b-col cols="3" offset="1" >
                <p>资产名称：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input v-model="assetInventory.assetname" placeholder="请输入资产名称" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1" >
                <p>资产类别：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-select
                    v-model="assetInventory.assetcategoryId"
                    :options="options"
                    value-field="value"
                    text-field="text"
                    ></b-form-select>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1" >
                <p>资产规格：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input v-model="assetInventory.assetspecification" placeholder="请输入资产规格" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1" >
                <p>资产单价：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input v-model="assetInventory.assetprice" placeholder="请输入资产单价" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1" >
                <p>库存数量：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input v-model="assetInventory.inventorynum" placeholder="请输入库存数量" ></b-form-input>
                </b-col>
            </b-row>
        </b-modal>
        <!-- 修改资产库存信息 -->
        <b-modal id="modal-update" title="修改资产库存信息" @ok="update" cancel-title="返回" ok-title="保存">
            <b-row >
                <b-col cols="3" offset="1" >
                <p>资产编号：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input v-model="assetInventory.asseinventoryId" readonly></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1" >
                <p>资产名称：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input v-model="assetInventory.assetname" placeholder="请输入资产名称" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1" >
                <p>资产类别：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-select
                    v-model="assetInventory.assetcategoryId"
                    :options="options"
                    value-field="value"
                    text-field="text"
                    ></b-form-select>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1" >
                <p>资产规格：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input v-model="assetInventory.assetspecification" placeholder="请输入资产规格" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1" >
                <p>资产单价：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input v-model="assetInventory.assetprice" placeholder="请输入资产单价" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="1" >
                <p>库存数量：</p>
                </b-col>
                <b-col cols="7">
                    <b-form-input v-model="assetInventory.inventorynum" placeholder="请输入库存数量" ></b-form-input>
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
        baseURL:"asset_management/inventory/",
        assertInventorylist_title:"库存信息",
        assertInventorylist:[],
        fields:[
            {"pro":"id","label":"资产编号"},
            {"pro":"assertName","label":"资产名称"},
            {"pro":"assertTypeName","label":"资产类别"},
            {"pro":"assertSpecification","label":"资产规格"},
            {"pro":"assertPrice","label":"资产单价"},
            {"pro":"assertNum","label":"库存数量"},
        ],
        totalDataNum:'',//总数据条目数
        currentPageNum:1,//当前页
        assetInventory:{ //资产库存表单信息
            asseinventoryId:"",//资产编号
            assetname:'', //资产名称
            assetcategoryId:'1', //资产类别编号
            assetcategoryname:'', //资产类别名称
            assetspecification:'', //资产规格
            assetprice:'', //资产单价
            inventorynum:'', //库存数量  
        },
        options:[],//资产类别
      }
   },
   methods:{
       findbyPage(currentPage){//    分页查找
        this.currentPageNum=currentPage;
        this.$http.get(this.baseURL+"selectAll.action",{pageNum:currentPage})
            .then((data) => {
                if(data.code==1){
                    this.totalDataNum=data.data.total;
                    var tempList=data.data.list;
                    this.assertInventorylist=[];
                    // 将之前的页数填满
                    var num=(currentPage-1)*7
                    for (let j = 0; j < num; j++) {
                        this.assertInventorylist.push({"id":''})
                    }
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.assertInventorylist.push({
                        "id":tempList[i].asseinventoryId,
                        "assertName":tempList[i].assetname,
                        "assertTypeID":tempList[i].assetcategoryId,
                        "assertTypeName":tempList[i].assetcategoryname,
                        "assertSpecification":tempList[i].assetspecification,
                        "assertPrice":tempList[i].assetprice,
                        "assertNum":tempList[i].inventorynum,
                        })
                    }
                }
            })
       },
       findInventoryCategory(){//    查找资产类别信息
        this.$http.get(this.baseURL+"getInventoryCategory.action")
            .then((data) => {
                if(data.code==1){
                    var tempList=data.data;
                    this.options=[];
                    for (let i = 0; i < tempList.length; i++) {
                        this.options.push({
                            "text":tempList[i].assetcategoryname,
                            "value":tempList[i].assetcategoryId
                        })
                    }
                }
            })
       },
       toUpdate(row){//   更新数据
        this.assetInventory.asseinventoryId=row.id;
        this.assetInventory.assetname=row.assertName;
        this.assetInventory.assetcategoryId=row.assertTypeID;
        this.assetInventory.assetcategoryname=row.assertTypeName;
        this.assetInventory.assetspecification=row.assertSpecification;
        this.assetInventory.assetprice=row.assertPrice;
        this.assetInventory.inventorynum=row.assertNum;
        this.$bvModal.show('modal-update');
       },
       update(){
           this.$http.post(this.baseURL+"updateInventory.action",this.assetInventory)
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
        this.$http.get(this.baseURL+"deleteInventory.action",{asseinventoryId:row.id})
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
       toInsert(){//    新增数据
        this.$bvModal.show('modal-add');
       },
       insert(){
           for (var i = 0; i < this.options.length; i++) {
               if(this.options[i].value==this.assetInventory.assetcategoryId){
                   this.assetInventory.assetcategoryname=this.options[i].text;
               }
           }
           this.$http.post(this.baseURL+"addInventory.action",this.assetInventory)
            .then((data) => {
            if(data.code==1){
                this.showMasage(data.data,"success")
            }else{
                this.showMasage(data.data,"error")
            }
            this.findbyPage(this.currentPageNum);
        })
       },
       toSearch(selected,searchKey){//   按条件查询数据
        if (selected=='1') {
            this.$http.get(this.baseURL+"selectByPrimaryKey.action",{asseinventoryId:searchKey})
                .then((data) => {
                    if(data.code==1){
                        this.totalDataNum=1;
                        this.assertInventorylist=[];
                        // 插入当前页数据
                        this.assertInventorylist.push({
                            "id":data.data.asseinventoryId,
                            "assertName":data.data.assetname,
                            "assertTypeID":data.data.assetcategoryId,
                            "assertTypeName":data.data.assetcategoryname,
                            "assertSpecification":data.data.assetspecification,
                            "assertPrice":data.data.assetprice,
                            "assertNum":data.data.inventorynum,
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
                        this.assertInventorylist=[];
                        // 插入当前页数据
                        for (let i = 0; i < tempList.length; i++) {
                            this.assertInventorylist.push({
                            "id":tempList[i].asseinventoryId,
                            "assertName":tempList[i].assetname,
                            "assertType":tempList[i].assetcategoryId,
                            "assertTypeName":tempList[i].assetcategoryname,
                            "assertSpecification":tempList[i].assetspecification,
                            "assertPrice":tempList[i].assetprice,
                            "assertNum":tempList[i].inventorynum,
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
                        this.assertInventorylist=[];
                        // 插入当前页数据
                        for (let i = 0; i < tempList.length; i++) {
                            this.assertInventorylist.push({
                            "id":tempList[i].asseinventoryId,
                            "assertName":tempList[i].assetname,
                            "assertType":tempList[i].assetcategoryId,
                            "assertTypeName":tempList[i].assetcategoryname,
                            "assertSpecification":tempList[i].assetspecification,
                            "assertPrice":tempList[i].assetprice,
                            "assertNum":tempList[i].inventorynum,
                            })
                        }
                    }
            })
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
       this.findInventoryCategory();
   }
}
</script>
<style scoped>
p{
    padding:6px 0px;
}
</style>