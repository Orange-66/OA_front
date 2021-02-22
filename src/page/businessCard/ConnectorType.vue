<template>
    <div class="connectorType">
        <BaseActionTable
        :list_title=connectorTypelist_title
        :dataList=connectorTypelist
        :fields= fields
        :options=options
        :showfind=false
        :total=totalDataNum
        ></BaseActionTable>
        <!-- 新增名片夹信息 -->
        <b-modal id="modal-add" title="新增名片夹" @ok="insert" cancel-title="返回" ok-title="添加">
            <b-row >
                <b-col cols="3" offset="2" >
                <p>名片夹名称：</p>
                </b-col>
                <b-col cols="6">
                    <b-form-input v-model="connectorType.connectorTypeName" placeholder="请输入名片夹名称" ></b-form-input>
                </b-col>
            </b-row>
        </b-modal>
        <!-- 修改名片夹信息 -->
        <b-modal id="modal-update" title="查看/修改名片夹信息" @ok="update" cancel-title="返回" ok-title="保存">
            <b-row >
                <b-col cols="3" offset="2" >
                <p>名片夹编号：</p>
                </b-col>
                <b-col cols="6">
                    <b-form-input readonly="" v-model="connectorType.connectorTypeId" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="2" >
                <p>名片夹名称：</p>
                </b-col>
                <b-col cols="6">
                    <b-form-input v-model="connectorType.connectorTypeName"></b-form-input>
                </b-col>
            </b-row>
        </b-modal>
        <!-- 查看名片夹下的联系人 -->
        <b-modal id="modal-check" title="名片夹详细信息" size="lg" ok-only ok-title="返回">
            <b-row >
                <b-col cols="2" offset="1" >
                <p>名片夹编号：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input readonly v-model="connectorType.connectorTypeId" ></b-form-input>
                </b-col>
                <b-col cols="2" >
                <p>名片夹名称：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input readonly v-model="connectorType.connectorTypeName"></b-form-input>
                </b-col>
            </b-row>
            <BaseSimpleTable
            :list_title=connectorlist_title
            :dataList=connectorlist
            :fields=connectorfields
            :total=totalConnectorDataNum
            ></BaseSimpleTable>
        </b-modal>
    </div>
</template>
<script>
import BaseActionTable from "../../component/BaseActionTable"
import BaseSimpleTable from "../../component/BaseSimpleTable"
export default {
    props: {
        userInfo: {
        type: Object,
        required: true
        }
    },
    components:{
        BaseActionTable,
        BaseSimpleTable
    },
   data() {
      return {
        baseURL:"connectortype/",
        connectorTypelist_title:"名片信息",
        connectorTypelist:[],
        fields:[
            {"pro":"id","label":"名片夹分类编号"},
            {"pro":"connectortypename","label":"名片夹分类名称"},
        ],
        totalDataNum:0,//总数据条目数
        options:[
            {text: '查看详细', value: '1'},
            {text: '修改名片夹', value: '2'},
            {text: '删除', value: '3'},
        ],
        currentPageNum:1,//当前页
        connectorType:{
            connectorTypeName:'',//名片夹名称
            connectorTypeId:'',//名片夹编号
        },
        connectorlist_title:"联系人信息",
        connectorlist:[],
        connectorfields:[
            {"pro":"connectorName","label":"姓名"},
            {"pro":"connectorphone","label":"电话"},
            {"pro":"connectordepart","label":"职务"},
            {"pro":"connectoroccu","label":"部门"},
        ],
        
      }
   },
   methods:{
       findbyPage(currentPage){//    分页查找名片夹
        this.currentPageNum=currentPage;
        this.$http.get(this.baseURL+"getConnectorType.action",{employeeid:this.userInfo.userID})
            .then((data) => {
                if(data.code==1){
                    this.totalDataNum=data.data.length;
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
       toInsert(){//    展示新增数据模态框
           this.$bvModal.show('modal-add');
       },
       insert(){//插入数据
        this.$http.get(this.baseURL+"addConnectorType.action",{employeeid:this.userInfo.userID,connectortypename:this.connectorType.connectorTypeName})
        .then((data) => {
            if(data.code==1){
                this.showMasage(data.resultMsg,"success")
            }else{
                this.showMasage(data.resultMsg,"error")
            }
            this.findbyPage(this.currentPageNum);
        })
       },
       toDealAction(actionID,objectID){ //处理操作选项(操作，itemID)
            switch(actionID){
                case '1':
                    // 查看名片夹信息
                    this.connectorType.connectorTypeId=objectID;
                    var ctName='';
                    for (var i = 0; i < this.connectorTypelist.length; i++) {
                        if (this.connectorTypelist[i].id==objectID) {
                            this.connectorType.connectorTypeName=this.connectorTypelist[i].connectortypename;
                            ctName=this.connectorTypelist[i].connectortypename;
                            break;
                        }
                    }
                    this.getAllByConnectorType(ctName);
                    this.$bvModal.show('modal-check');
                    break;
                case '2':
                    // 修改信息
                    this.connectorType.connectorTypeId=objectID;
                    for (var i = 0; i < this.connectorTypelist.length; i++) {
                        if (this.connectorTypelist[i].id==objectID) {
                            this.connectorType.connectorTypeName=this.connectorTypelist[i].connectortypename;
                            break;
                        }
                    }
                    this.$bvModal.show('modal-update');
                    break;
                case '3':
                    // 删除
                    this.toDelete(objectID);
                    break;
            }
       },
       getAllByConnectorType(name){//查看名片夹下的人员
        this.$http.get("connector/getAllByConnectorType.action",{employeeid:this.userInfo.userID,connectortype:name})
            .then((data) => {
                console.log(data);
                if(data.code==1){
                    this.totalConnectorDataNum=data.data.total;
                    var tempList=data.data.list;
                    this.connectorlist=[];
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.connectorlist.push({
                        "connectorName":tempList[i].connectorname,
                        "connectorphone":tempList[i].connectorphone,
                        "connectordepart":tempList[i].connectordepart,
                        "connectoroccu":tempList[i].connectoroccu,
                        })
                    }
                }
            })
       },
       toDelete(id){//删除确认
           this.$confirm('此操作将删除该名片夹分类以及该分类下的联系人, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delete(id);
            }).catch(() => {});
       },
       delete(id){//删除信息
            this.$http.get(this.baseURL+"deleteConnectorType.action",{connectortypeid:id})
            .then((data) => {
                if(data.code==1){
                    this.showMasage(data.resultMsg,"success")
                }else{
                    this.showMasage(data.resultMsg,"error")
                }
                this.findbyPage(this.currentPageNum);
            })
       },
       update(){//更新信息
           this.$bvModal.hide('modal-update');
            this.$http.get(this.baseURL+"updateConnectorType.action",{employeeid:this.userInfo.userID,Connectortypeid:this.connectorType.connectorTypeId,connectortypename:this.connectorType.connectorTypeName})
            .then((data) => {
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
       this.findbyPage(this.currentPageNum);
   }
}
</script>
<style scoped>
p{
    padding:6px 0px;
}
</style>