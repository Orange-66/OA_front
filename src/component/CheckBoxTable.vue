<template>
<div class="">
<b-col cols="12" >
    <!-- 表格 -->
    <b-card  header-tag="header" border-variant="default" header-bg-variant="default" >
        <div slot="header" align="center">
            <strong style="font-size:18px">{{this.list_title}}</strong>
        </div>
        <b-row>
                <!-- 搜索框 -->
                <b-col cols="6" offset="1">
                    <!-- 搜索条件列表 -->
                    <b-input-group >
                        <b-form-input v-model="searchKey" placeholder="请输入关键字查找相关邮件"></b-form-input>
                        <b-input-group-append>
                        <b-button variant="primary" @click="toSearch"><i class="icon-magnifier"></i>&nbsp;搜索</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
                <b-col cols="2" offset="2">
                    <b-button v-show="showRead" class="addbtn" variant="primary" @click="toRead()">设置为已读</b-button>
                    <b-button v-show="showDelete" class="addbtn" variant="primary" @click="toDelete()">删除</b-button>
                </b-col>
            </b-row>
            <br>
        <b-row>
            <!-- 表格 -->
            <el-table
                ref="multipleTable"
                :data=this.dataList.slice((currentPage-1)*pageSize,currentPage*pageSize)
                tooltip-effect="dark"
                :row-style="{height:'45px'}"
                :cell-style="{padding:'0px'}"
                @row-click="clickData"
                @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column v-for="item in this.fields" :key="item.pro" :property="item.pro" :label="item.label" align="center" ></el-table-column>
            </el-table>
        </b-row>
        <br>
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
        showRead:{default:false},//是否展示标为已读按钮，默认不展示
        showDelete:{default:true},//是否展示删除按钮，默认不展示
    },
   data() {
      return {
          currentPage: 1,
          pageSize:6, //每页展示数据条数
          searchKey:'',//搜索条件
          selectid:[],//选择的ID
      }
   },
   methods:{
        handleSelectionChange(val) {
            this.selectid = val;
        },
        toRead(){//标为已读
            this.$parent.toRead(this.selectid);
        },
        toSearch(){//全文查找搜索
            this.$parent.toSearch(this.searchKey);
        },
        toDelete(){//删除
           this.$confirm('确认是否删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$parent.toDelete(this.selectid);
            }).catch(() => {});
      },
        currentChange(currentPage) {
            this.$parent.findbyPage(currentPage);
            this.currentPage = currentPage;
        },
        clickData(row) {
            this.$parent.getEmailDetail(row);
     }
   }
}
</script>
<style scoped>
</style>