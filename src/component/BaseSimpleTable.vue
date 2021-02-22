<template>
    <div class="baseSimpleTable">
    <b-col cols="12" >
        <!-- 表格 -->
        <b-card  header-tag="header" border-variant="default" header-bg-variant="default" >
            <div slot="header" align="center">
                <strong style="font-size:18px">{{this.list_title}}</strong>
            </div>
            <b-row>
                <!-- 搜索框 -->
                <b-col cols="5" offset="1">
                    <b-input-group v-show="showfind">
                        <b-form-input v-model="searchKey" placeholder="请输入搜索条件"></b-form-input>
                        <b-input-group-append>
                        <b-button variant="primary" @click="toSearch"><i class="icon-magnifier"></i>&nbsp;搜索</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
                <b-col cols="2" offset="1">
                    <b-button v-show="showExport" class="addbtn" variant="success" @click="toExport()">导出数据</b-button>
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
                        label="选择"
                        align="center"
                        v-if="showSelect"
                        >
                        <template slot-scope="scope">
                            <b-button variant="primary" @click="selectItem(scope.row)">选择</b-button>&nbsp;&nbsp;
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
        </b-card>
    </b-col>
    </div>
</template>
<script>
export default {
    props:{
        dataList:[],
        fields:[],
        list_title:'',
        total: '',//总数据条目量
        showfind:{default:false},//是否展示搜索框，默认展示
        showExport:{default:false},//是否展示导出按钮，默认不展示
        showSelect:{default:false},//是否展示选择列，默认不展示
        formType:'',
    },
   data() {
      return {
          currentPage: 1,
          pageSize: 7, //每页展示数据条数
          searchKey:'',//搜索条件
      }
   },
   methods:{
    //    按条件查找
       toSearch(){
           this.$parent.toSearch(this.searchKey);
       },
       toExport(){
        //    导出数据
           this.$parent.toExport();
       },
       selectItem(row){// 选择item
       console.log(this.$parent.$parent.$options);
            var t=this.formType;
           this.$parent.$parent.$options.parent.selectItem(row,t);
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
// el-table td, .el-table th { 
//     padding:0px !important; 
// }
</style>