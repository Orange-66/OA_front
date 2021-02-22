<template>
    <div class="baseInfoTable">
            <b-row>
                <!-- 搜索框 -->
                <b-col cols="5" offset="1">
                    <!-- 搜索条件列表 -->
                    <b-input-group v-show="showfind">
                        <template v-slot:prepend >
                            <b-form-select
                            v-model="selected"
                            :options="options"
                            value-field="value"
                            text-field="text"
                            v-show="searchMethod"
                            ></b-form-select>
                        </template>
                        <b-form-input v-model="searchKey" placeholder="请输入搜索条件"></b-form-input>
                        <b-input-group-append>
                        <b-button variant="primary" @click="toSearch"><i class="icon-magnifier"></i>&nbsp;搜索</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
                <b-col cols="2" offset="1">
                    <b-button v-show="showExport" class="addbtn" variant="success" @click="toExport()">导出数据</b-button>
                </b-col>
                <b-col cols="2">
                    <b-button class="addbtn" variant="primary" @click="toInsert()">新增申请</b-button>
                </b-col>
            </b-row>
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
                    <el-table-column
                        fixed="right"
                        label="操作"
                        align="center"
                        >
                        <template slot-scope="scope">
                            <b-button variant="info" @click="toDetail(scope.row)" style="color:white">详情</b-button>
                        </template>
                    </el-table-column>
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

    </div>
</template>
<script>
export default {
    props:{
        dataList:[],//数据集
        fields:[],//数据
        total: '',//总数据条目量
        showfind:{default:true},//是否展示搜索框，默认展示
        showExport:{default:false},//是否展示导出按钮，默认不展示
        searchMethod:{default:false},//是否展示搜索条件下拉框，默认不展示
    },
   data() {
      return {
          currentPage: 1,
          pageSize: 7, //每页展示数据条数
          options:[
              {text: '编号搜索', value: '1'},
              {text: '名称搜索', value: '2'},
              {text: '类别搜索', value: '3'},
          ],
          selected:'1',//搜索方式，默认按编号搜索
          searchKey:'',//搜索条件
      }
   },
   methods:{
       toOperant(row){//删除
           this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$parent.toDelete(row);
            }).catch(() => {});
       },
       toDelete(row){//删除
           this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$parent.toDelete(row);
            }).catch(() => {});
       },
       toUpdate(row){//更新
           this.$parent.toUpdate(row);
       },
       toInsert(){//插入
           this.$parent.toInsert();
       },
       toDetail(){
           this.$parent.toDetail();
       },
    //    按条件查找
       toSearch(){
           if(this.searchMethod==true){
               this.$parent.toSearch(this.selected,this.searchKey);
           }else{
               this.$parent.toSearch(this.searchKey);
           }
       },
       toExport(){
        //    导出数据
           this.$parent.toExport();
       },
        currentChange(currentPage) {
            this.$parent.findbyPage(currentPage);
            this.currentPage = currentPage;
        },
   },
   created(){
   }
}
</script>
<style lang="scss">
.addbtn{
    width: 100%;
}
el-table td, .el-table th { 
    padding:0px !important; 
}
</style>