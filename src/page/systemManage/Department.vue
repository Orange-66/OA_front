<template>
    <div class="department">
        <BaseTable
        :list_title=departmentlist_title
        :dataList=departmentlist
        :fields= fields
        :showfind=false
        :total=totalDataNum
        ></BaseTable>
        <div>
  <!-- 新增部门 -->
  <b-modal id="modal-add" title="新增部门" @ok="insert()" cancel-title="返回" ok-title="添加">
    <b-row >
        <b-col cols="3" offset="1">
          <p style="padding:6px 0px;">部门名称：</p>
        </b-col>
        <b-col cols="7">
            <b-form-input v-model="department.departmentName" placeholder="请输入部门名称"></b-form-input>
        </b-col>
    </b-row>
    <b-row >
        <b-col cols="3" offset="1">
          <p style="padding:6px 0px;">部门描述：</p>
        </b-col>
        <b-col cols="7">
            <b-form-textarea v-model="department.departmentDescription" placeholder="请输入部门相关的描述"></b-form-textarea>
        </b-col>
    </b-row>
  </b-modal>
  <!-- 修改部门信息 -->
  <b-modal id="modal-update" title="修改部门信息" @ok="update()" cancel-title="返回" ok-title="保存">
    <b-row >
        <b-col cols="3" offset="1">
          <p style="padding:6px 0px;">部门编号：</p>
        </b-col>
        <b-col cols="7">
            <b-form-input v-model="department.departmentId" readonly=""></b-form-input>
        </b-col>
    </b-row>
    <b-row >
        <b-col cols="3" offset="1">
          <p style="padding:6px 0px;">部门名称：</p>
        </b-col>
        <b-col cols="7">
            <b-form-input v-model="department.departmentName" ></b-form-input>
        </b-col>
    </b-row>
    <b-row >
        <b-col cols="3" offset="1">
          <p style="padding:6px 0px;">部门描述：</p>
        </b-col>
        <b-col cols="7">
            <b-form-textarea v-model="department.departmentDescription" ></b-form-textarea>
        </b-col>
    </b-row>
  </b-modal>
</div>
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
        baseURL:"system_management/department/",
        departmentlist_title:"部门信息",
        departmentlist:[],
        fields:[
            {"pro":"id","label":"部门编号"},
            {"pro":"departmentName","label":"部门名称"},
            {"pro":"departmentDescription","label":"部门描述"},
        ],
        totalDataNum:'',//总数据条目数
        department:{ //部门表单信息
            departmentId:'',//部门编号
            departmentName:'',//部门名称
            departmentDescription:'' //部门描述
        },
        currentPageNum:1,//当前页
      }
   },
   methods:{
       findbyPage(currentPage){//    分页查找
        this.currentPageNum=currentPage;
        this.$http.get(this.baseURL+"getDepartment.action",{pageNum:currentPage})
            .then((data) => {
                if(data.code==1){
                    this.totalDataNum=data.data.total;
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
       toUpdate(row){//   更新数据模态框
            this.department.departmentId=row.id;
            this.department.departmentName=row.departmentName
            this.department.departmentDescription=row.departmentDescription
            this.$bvModal.show('modal-update');
       },
       update(){//更新数据
           this.$http.post(this.baseURL+"updateDepartment.action",this.department)
            .then((data) => {
                if(data.code==1){
                    this.showMasage("修改成功","success")
                }else{
                    this.showMasage("修改失败","error")
                }
                this.findbyPage(this.currentPageNum);
            })
       },
       toDelete(row){// 删除数据
        this.$http.get(this.baseURL+"deleteDepartment.action",{departmentId:row.id})
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
           this.$http.post(this.baseURL+"addDepartment.action",this.department)
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