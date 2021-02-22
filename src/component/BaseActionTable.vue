<template>
    <div class="baseActionTable">
    <b-col cols="12" >
        <!-- 表格 -->
        <b-card  :header-tag="header" v-bind:style="borderWidth" border-variant="default" header-bg-variant="default" >
            <div slot="header" align="center">
                <strong style="font-size:18px">{{this.list_title}}</strong>
            </div>
            <b-row>
                <!-- 搜索框 -->
                <b-col :cols="findLength" offset="1">
                    <!-- 搜索条件列表 -->
                    <b-input-group v-show="showfind">
                        <b-form-input v-model="searchKey" placeholder="请输入搜索条件"></b-form-input>
                        <b-input-group-append>
                        <b-button variant="primary" @click="toSearch"><i class="icon-magnifier"></i>&nbsp;搜索</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
                <b-col cols="2"  v-show="showExport">
                    <b-button class="addbtn" variant="success" @click="toExport()">导出数据</b-button>
                </b-col>
                <b-col cols="2" v-show="showAdd">
                    <b-button  class="addbtn" variant="primary" @click="toInsert()">新增</b-button>
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
                        prop="state"
                        :label="stateTitle"
                        align="center"
                        v-if="showState"
                        >
                        <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <el-tag 
                            :type="scope.row.state === stateList[0] ? 'success' : scope.row.state === stateList[1] ? 'default' : 'warning'"
                            size="medium">{{ scope.row.state }}</el-tag>
                        </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        align="center"
                        v-if="showColumn"
                        >
                        <template slot-scope="scope">
                            <div v-show="dropdownState">
                                <el-dropdown @command="handleCommand" size="small" split-button @click="test(scope.row)">
                                    操作
                                <el-dropdown-menu slot="dropdown" >
                                    <el-dropdown-item  v-for="op in options" :key="op.value" :command="op.value+','+scope.row.id+','+scope.row.employeeStorage">{{op.text}}</el-dropdown-item>
                                </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                            <div v-show="detailState">
                                <b-button variant="info" style="color:white" @click="toDetail(scope.row.id)">{{buttonText}}</b-button>&nbsp;&nbsp;
                            </div>
                            
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <b-row class="justify-content-center mr-3">
                <el-pagination
                :current-page="currentPage"
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
        buttonText:{default:"详情"},
        dataList:'',
        fields:'',
        list_title:'',
        options:{default:[
              {text: '编号搜索', value: '1'},
              {text: '名称搜索', value: '2'},
              {text: '类别搜索', value: '3'},
          ]},
        total: 0,//总数据条目量
        showAdd:{default:true},//是否展示添加按钮，默认展示
        showfind:{default:true},//是否展示搜索框，默认展示
        showExport:{default:false},//是否展示导出按钮，默认不展示
        showState:{default:false},//是否展示人才状态，默认不展示

        stateList:{default:[
                "闲置中",
                "外派中",
                "已离职",
          ]},
        stateTitle:{default:"外派人才"},
        dropdownState:{default:true},
        detailState:{default:false},
        header:{default:"header"}
    },
   data() {
      return {
          borderWidth: { "border-width" : this.header === "" ? "0px" : "1px"},
        findLength : 5,
          currentPage: 1,
        //   total: {default:11},//总数据条目量
          pageSize: 7, //每页展示数据条数
          searchKey:'',//搜索条件
          showColumn: true
      }
   },
   methods:{
    //    处理下拉菜单选项
       handleCommand(command){
           var list=command.split(',');
            this.$parent.toDealAction(list[0],list[1],list[2]);
       },
       test(scope){
           console.log(scope);
       },
       toInsert(){
           this.$parent.toInsert();
       },
    //    按条件查找
       toSearch(){
           this.currentPage = 1;
           this.$parent.toSearch(this.searchKey);
           console.log("toSearch", this.currentPage)
       },
       toExport(){
           this.$parent.toExport();
       },
        currentChange(currentPage) {
            this.$parent.findbyPage(currentPage);
            this.currentPage = currentPage;
        },
        toDetail(id){
        this.$parent.toDetail(id)
        }
   },
   created(){
       this.showColumn = this.dropdownState || this.detailState
       console.log(this.showColumn);
        if(this.showAdd && this.showExport)
            this.findLength = 6;
        else
            if(this.showAdd || this.showExport)
                this.findLength = 8;
            else
                this.findLength = 10;

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