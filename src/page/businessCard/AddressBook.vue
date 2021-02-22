<template>
    <div class="addressBook">
        <b-col cols="12" >
        <!-- 表格 -->
        <b-card  header-tag="header" border-variant="default" header-bg-variant="default" >
            <div slot="header" align="center">
                <strong style="font-size:18px">公司通讯录</strong>
            </div>
            <b-row>
                <!-- 搜索框 -->
                <b-col cols="5" offset="1">
                    <!-- 搜索条件列表 -->
                    <b-input-group >
                        <b-form-input v-model="searchKey"  placeholder="请输入搜索条件"></b-form-input>
                        <b-input-group-append>
                        <b-button variant="primary" @click="toSearch"><i class="icon-magnifier"></i>&nbsp;搜索</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
                <b-col cols="2" offset="3">
                    <b-button class="addbtn" variant="success" @click="toExport()">导出数据</b-button>
                </b-col>
            </b-row>
            <a id="addressBook" href="http://localhost:8888/OA_back_war_exploded/person_center/user/exportExcel.action"></a>
            <br>
            <!-- 表格 -->
            <div class="">
                <el-table
                    :data= this.dataList.slice((currentPage-1)*pageSize,currentPage*pageSize)
                    class="m-1"
                    :row-style="{height:'45px'}"
                    :cell-style="{padding:'0px'}"
                    >
                    <el-table-column v-for="item in this.fields" :key="item.pro" :property="item.pro" :label="item.label" align="center" ></el-table-column>

                </el-table>
            </div>
            <b-row class="justify-content-center mr-3">
                <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="pageSize"
                @current-change="currentChange"
                >
                </el-pagination>
            </b-row>
        </b-card>
    </b-col>
    </div>
</template>
<script>
export default {
   data() {
      return {
          baseURL:'person_center/user/',
          searchKey:'',//搜索条件
          dataList:[],
          fields:[
            {"pro":"employeeName","label":"姓名"},
            {"pro":"departmentName","label":"部门"},
            {"pro":"jobName","label":"职务"},
            {"pro":"employeePhone","label":"联系电话"},
          ],
          total: '',//总数据条目量
          currentPage: 1,
          pageSize: 7,
      }
   },
   methods: {
       findbyPage(currentPage){//    分页查找联系人
        this.currentPage=currentPage;
        this.$http.get(this.baseURL+"getAll.action")
            .then((data) => {
                if(data.code=="1"){
                    this.total=data.data.total;
                    var tempList=data.data.list;
                    this.dataList=[];
                    // 将之前的页数填满
                    var num=(currentPage-1)*7
                    for (let j = 0; j < num; j++) {
                        this.dataList.push({"id":''})
                    }
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.dataList.push({
                        "id":tempList[i].employeeId,
                        "employeeName":tempList[i].employeeName,
                        "departmentName":tempList[i].department.departmentName,
                        "jobName":tempList[i].job.jobName,
                        "employeePhone":tempList[i].employeePhone,
                        })
                    }
                }
            })
       },
       toSearch(){//按条件查询员工
            this.$http.get(this.baseURL+"getByKeywords.action",{keywords:this.searchKey})
            .then((data) => {
                console.log(data);
                if(data.code=="1"){
                    this.total=data.data.total;
                    var tempList=data.data.list;
                    this.dataList=[];
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.dataList.push({
                        "id":tempList[i].employeeId,
                        "employeeName":tempList[i].employeeName,
                        "departmentName":tempList[i].department.departmentName,
                        "jobName":tempList[i].job.jobName,
                        "employeePhone":tempList[i].employeePhone,
                        })
                    }
                }
            })
       },
       toExport(){//   导出数据
        document.getElementById("addressBook").click();
       },
       currentChange(currentPage) {
            this.currentPage = currentPage;
        },
   },
   created() {
       this.findbyPage(this.currentPage);
   }
}
</script>
<style scoped>
</style>
