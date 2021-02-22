<template>
    <div class="character">
        <BaseActionTable
        :list_title=characterlist_title
        :dataList=characterlist
        :fields= fields
        :options=options
        :total=totalDataNum
        :showfind=false
        ></BaseActionTable>
    <!-- 增加新角色 -->
    <b-modal id="modal-add" title="新增角色" @ok="insert()" cancel-title="返回" ok-title="添加">
        <b-row >
            <b-col cols="3" offset="1">
            <p style="padding:6px 0px;">角色名称：</p>
            </b-col>
            <b-col cols="7">
                <b-form-input v-model="character.characterName" placeholder="请输入角色名称"></b-form-input>
            </b-col>
        </b-row>
        <b-row >
            <b-col cols="3" offset="1">
            <p style="padding:6px 0px;">角色描述：</p>
            </b-col>
            <b-col cols="7">
                <b-form-textarea v-model="character.characterDescription" placeholder="请输入角色相关的描述"></b-form-textarea>
            </b-col>
        </b-row>
    </b-modal>
    <!-- 修改角色信息 -->
    <b-modal id="modal-update" title="修改角色信息" @ok="update()" cancel-title="返回" ok-title="保存">
        <b-row >
            <b-col cols="3" offset="1">
            <p style="padding:6px 0px;">角色编号：</p>
            </b-col>
            <b-col cols="7">
                <b-form-input v-model="character.characterId" readonly></b-form-input>
            </b-col>
        </b-row>
        <b-row >
            <b-col cols="3" offset="1">
            <p style="padding:6px 0px;">角色名称：</p>
            </b-col>
            <b-col cols="7">
                <b-form-input v-model="character.characterName" ></b-form-input>
            </b-col>
        </b-row>
        <b-row >
            <b-col cols="3" offset="1">
            <p style="padding:6px 0px;">角色描述：</p>
            </b-col>
            <b-col cols="7">
                <b-form-textarea v-model="character.characterDescription" ></b-form-textarea>
            </b-col>
        </b-row>
    </b-modal>
    <!-- 设置权限 -->
    <b-modal id="modal-setAuthority" title="设置权限" @ok="setAuthority()" cancel-title="返回" ok-title="保存">
        <b-row >
            <b-col cols="6" offset="1">
            <p style="padding:6px 0px;">当前角色拥有如下权限：</p>
            </b-col>
        </b-row>
        <b-row >
            <b-col cols="10" offset="1">
                <b-form-checkbox-group
                v-model="character.authorities"
                :options="allAuthoritylist"
                class="mb-3"
                value-field="value"
                text-field="text"
                ></b-form-checkbox-group>
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
        baseURL:"system_management/character/",
        characterlist_title:"角色管理",
        characterlist:[],
        fields:[
            {"pro":"id","label":"角色编号"},
            {"pro":"characterName","label":"角色名"},
            {"pro":"characterDescription","label":"角色描述"},
        ],
        totalDataNum:'',//总数据条目数
        options:[
            {text: '修改信息', value: '1'},
            {text: '设置权限', value: '2'},
            {text: '删除角色', value: '3'},
        ],
        currentPageNum:1,//当前页
        character:{ //角色表单信息
            characterId:'',
            characterName:'',//角色名称
            characterDescription:'', //角色描述
            authorities:[]//已获得的权限列表
        },
        allAuthoritylist:[],//全部权限列表
        
      }
   },
   methods:{
       findbyPage(currentPage){//    分页查找
        this.currentPageNum=currentPage;
        this.$http.get(this.baseURL+"getCharacter.action",{pageNum:currentPage})
            .then((data) => {
                if(data.code==1){
                    // console.log(data);
                    this.totalDataNum=data.data.total;
                    var tempList=data.data.list;
                    this.characterlist=[];
                    // 将之前的页数填满
                    var num=(currentPage-1)*7
                    for (let j = 0; j < num; j++) {
                        this.characterlist.push({"id":''})
                    }
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.characterlist.push({
                        "id":tempList[i].characterId,
                        "characterName":tempList[i].characterName,
                        "characterDescription":tempList[i].characterDescription,
                        })
                    }
                }
            })
       },
       toDealAction(actionID,objectID){ //处理操作选项(操作，itemID)
            switch(actionID){
                case '1':
                    // 修改信息
                    this.toUpdate(objectID);
                    break;
                case '2':
                    // 设置权限
                    this.character.characterId=objectID;
                    this.getNotOwnedAuthority(objectID);
                    this.$bvModal.show('modal-setAuthority');
                    break;
                case '3':
                    // 删除角色
                    this.toDelete(objectID);
                    break;
            }
       },
       getNotOwnedAuthority(characterId){//查找未拥有的权限
            this.$http.get(this.baseURL+"getNotOwnedAuthority.action",{characterId:characterId})
            .then((data) => {
                if(data.code==1){
                    var tempList1=data.data[0];
                    var tempList2=data.data[1];
                    this.character.authorities=[];
                    this.allAuthoritylist=[];
                    // 已拥有的权限
                    for (let i = 0; i < tempList1.length;i++) {
                        this.character.authorities.push(tempList1[i].authorityId);
                    }
                    
                    // 全部权限
                    for (let i = 0; i < tempList2.length;i++) {
                        this.allAuthoritylist.push({
                        "text":tempList2[i].authorityName,
                        "value":tempList2[i].authorityId,
                        })
                    }
                }
            })
       },
       setAuthority(){
           var temp = new Array();
           for (var i = 0; i < this.character.authorities.length; i++) {
                var a={};
                a.authorityId=this.character.authorities[i];
                temp.push(a);
            }
            this.character.authorities=temp;
           this.$http.post(this.baseURL+"setAuthority.action", this.character)
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
       toUpdate(id){//   更新数据模态框
            for (let i = 0; i < this.characterlist.length; i++) {
                if(this.characterlist[i].id==id){
                    this.character.characterId=this.characterlist[i].id;
                    this.character.characterName=this.characterlist[i].characterName
                    this.character.characterDescription=this.characterlist[i].characterDescription
                }
            }
            
            this.$bvModal.show('modal-update');
       },
       update(){//更新数据
           this.$http.post(this.baseURL+"updateCharacter.action",this.character)
            .then((data) => {
                // console.log(data);
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
       delete(id){// 删除数据
        this.$http.get(this.baseURL+"deleteCharacter.action",{characterId:id})
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
           this.$http.post(this.baseURL+"addCharacter.action",this.character)
            .then((data) => {
                // console.log(data);
                if(data.code==1){
                    this.showMasage(data.data,"success")
                }else{
                    this.showMasage(data.data,"error")
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