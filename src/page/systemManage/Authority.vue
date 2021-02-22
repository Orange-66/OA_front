<template>
    <div class="authority">
        <BaseTable
        :list_title=authoritylist_title
        :dataList=authoritylist
        :fields= fields
        :showfind=false
        :total=totalDataNum
        ></BaseTable>
    <!-- 新增权限 -->
    <b-modal id="modal-add" title="新增权限" @ok="insert()" cancel-title="返回" ok-title="添加">
        <b-row >
            <b-col cols="3" offset="1">
            <p style="padding:6px 0px;">权限名称：</p>
            </b-col>
            <b-col cols="7">
                <b-form-input v-model="authority.authorityName" placeholder="请输入权限名称"></b-form-input>
            </b-col>
        </b-row>
        <b-row >
            <b-col cols="3" offset="1">
            <p style="padding:6px 0px;">权限描述：</p>
            </b-col>
            <b-col cols="7">
                <b-form-textarea v-model="authority.authorityDescription" placeholder="请输入权限相关的描述"></b-form-textarea>
            </b-col>
        </b-row>
    </b-modal>
    <!-- 修改权限信息 -->
    <b-modal id="modal-update" title="修改权限信息" @ok="update()" cancel-title="返回" ok-title="保存">
        <b-row >
            <b-col cols="3" offset="1">
            <p style="padding:6px 0px;">权限编号：</p>
            </b-col>
            <b-col cols="7">
                <b-form-input v-model="authority.authorityId" readonly=""></b-form-input>
            </b-col>
        </b-row>
        <b-row >
            <b-col cols="3" offset="1">
            <p style="padding:6px 0px;">权限名称：</p>
            </b-col>
            <b-col cols="7">
                <b-form-input v-model="authority.authorityName" ></b-form-input>
            </b-col>
        </b-row>
        <b-row >
            <b-col cols="3" offset="1">
            <p style="padding:6px 0px;">权限描述：</p>
            </b-col>
            <b-col cols="7">
                <b-form-textarea v-model="authority.authorityDescription" ></b-form-textarea>
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
        baseURL:"system_management/authority/",
        authoritylist_title:"权限信息",
        authoritylist:[],
        fields:[
            {"pro":"id","label":"权限编号"},
            {"pro":"authorityName","label":"权限名"},
            {"pro":"authorityDescription","label":"权限描述"},
        ],
        totalDataNum:'',//总数据条目数
        authority:{ //权限表单信息
            authorityId:'',
            authorityName:'',//权限名称
            authorityDescription:'', //权限描述
        },
        currentPageNum:1,//当前页
      }
   },
   methods:{
       findbyPage(currentPage){//    分页查找
        this.currentPageNum=currentPage;
        this.$http.get(this.baseURL+"getAuthority.action",{pageNum:currentPage})
            .then((data) => {
                if(data.code==1){
                    this.totalDataNum=data.data.total;
                    var tempList=data.data.list;
                    this.authoritylist=[];
                    // 将之前的页数填满
                    var num=(currentPage-1)*7
                    for (let j = 0; j < num; j++) {
                        this.authoritylist.push({"id":''})
                    }
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.authoritylist.push({
                        "id":tempList[i].authorityId,
                        "authorityName":tempList[i].authorityName,
                        "authorityDescription":tempList[i].authorityDescription,
                        })
                    }
                }
            })
       },
       toUpdate(row){//   更新数据模态框
            this.authority.authorityId=row.id;
            this.authority.authorityName=row.authorityName
            this.authority.authorityDescription=row.authorityDescription
            this.$bvModal.show('modal-update');
       },
       update(){//更新数据
           this.$http.post(this.baseURL+"updateAuthority.action",this.authority)
            .then((data) => {
                // console.log(data);
                if(data.code==1){
                    this.showMasage("修改成功","success")
                }else{
                    this.showMasage("修改失败","error")
                }
                this.findbyPage(this.currentPageNum);
            })
       },
       toInsert(){ //    展示新增数据模态框
        this.$bvModal.show('modal-add');
       },
       toDelete(row){// 删除数据
           this.$http.get(this.baseURL+"deleteAuthority.action",{authorityId:row.id})
            .then((data) => {
                if(data.code==1){
                    this.showMasage(data.data,"success")
                }else{
                    this.showMasage(data.data,"error")
                }
                this.findbyPage(this.currentPageNum);
            })
       },
       insert(){//插入数据
           this.$http.post(this.baseURL+"addAuthority.action",this.authority)
            .then((data) => {
                if(data.code==1){
                    this.showMasage("新增成功","success")
                }else{
                    this.showMasage("新增失败","error")
                }
                this.findbyPage(this.currentPageNum);
            })
       },
    //    消息提示 （消息，类型）
       showMasage(msg,typ){
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