<template>
    <div class="conferenceRoom">
    <b-col cols="12" >
        <!-- 表格 -->
        <b-card header-tag="header" border-variant="default" header-bg-variant="default" >
            <div slot="header" align="center">
                <strong style="font-size:18px">会议室信息</strong>
            </div>
            <b-row>
                <!-- 搜索框 -->
                <b-col cols="7" offset="1">
                    <b-input-group>
                        <b-form-input v-model="searchKey" placeholder="可输入楼层号进行模糊搜索"></b-form-input>
                        <b-input-group-append>
                        <b-button variant="primary" @click="toSearch"><i class="icon-magnifier"></i>&nbsp;搜索</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
                <b-col cols="2" offset="1">
                    <b-button class="addbtn" variant="primary" @click="toInsert()">新增</b-button>
                </b-col>
            </b-row>
            <h1></h1>
            <b-row>
                <b-col cols="1" offset="2">
                    <b-form-checkbox class="checkbox" v-model="airConditionerKey" value="1" unchecked-value="0">空调</b-form-checkbox>
                </b-col>
                <b-col cols="1">
                    <b-form-checkbox class="checkbox" v-model="roomStateKey" value="0" unchecked-value=" "><label style="width:100px">可以预约</label></b-form-checkbox>
                </b-col>
                <b-col cols="2">
                    <b-form-select
                    class="select"
                    v-model="selectedNumber"
                    :options="options"
                    value-field="value"
                    text-field="text"
                    ></b-form-select>
                </b-col>
            </b-row>
            <h1></h1>
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
                        prop="hasairconditioner"
                        :label="'空调情况'"
                        align="center"
                        >
                        <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <el-tag 
                            :type="scope.row.hasairconditioner === '有空调' ? 'success' : 'warning'"
                            size="medium">{{ scope.row.hasairconditioner }}</el-tag>
                        </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="conferenceroomstate"
                        :label="'会议室状态'"
                        align="center"
                        >
                        <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <el-tag 
                            :type="scope.row.conferenceroomstate === '未使用' ? 'success' : 'warning'"
                            size="medium">{{ scope.row.conferenceroomstate }}</el-tag>
                        </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        align="center"
                        >
                        <template slot-scope="scope">
                            <b-button variant="primary" @click="toUpdate(scope.row)">修改</b-button>&nbsp;&nbsp;
                            <b-button variant="outline-danger" @click="toDelete(scope.row)">删除</b-button>
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
    <!-- 新增会议室信息 -->
    <b-modal id="modal-add" title="新增会议室信息" @ok="insert()" cancel-title="返回" ok-title="添加">
        <b-row >
            <b-col cols="3" offset="1">
            <p style="padding:6px 0px;">会议室名称：</p>
            </b-col>
            <b-col cols="7">
                <b-form-input v-model="conferenceRoom.conferenceroomname" placeholder="请输入会议室名称"></b-form-input>
            </b-col>
        </b-row>
        <b-row >
            <b-col cols="3" offset="1">
            <p style="padding:6px 0px;">会议室地点：</p>
            </b-col>
            <b-col cols="7">
                <b-form-input v-model="conferenceRoom.conferenceroomaddr" placeholder="请输入会议室地点"></b-form-input>
            </b-col>
        </b-row>
        <b-row >
            <b-col cols="3" offset="1">
            <p style="padding:6px 0px;">容纳人数：</p>
            </b-col>
            <b-col cols="7">
               <b-form-select
                v-model="conferenceRoom.capacity"
                :options="options"
                value-field="value"
                text-field="text"
                ></b-form-select>
            </b-col>
        </b-row>
        <b-row >
            <b-col cols="3" offset="1">
            <p style="padding:6px 0px;">空调情况：</p>
            </b-col>
            <b-col cols="7">
               <b-form-select
                v-model="conferenceRoom.hasairconditioner"
                :options="airOptions"
                value-field="value"
                text-field="text"
                ></b-form-select>
            </b-col>
        </b-row>
    </b-modal>
    <!-- 修改会议室信息 -->
    <b-modal id="modal-update" title="修改会议室信息" @ok="update()" cancel-title="返回" ok-title="保存">
        <b-row >
            <b-col cols="3" offset="1">
            <p style="padding:6px 0px;">会议室编号：</p>
            </b-col>
            <b-col cols="7">
                <b-form-input readonly v-model="conferenceRoom.conferenceroomId"></b-form-input>
            </b-col>
        </b-row>
        <b-row >
            <b-col cols="3" offset="1">
            <p style="padding:6px 0px;">会议室名称：</p>
            </b-col>
            <b-col cols="7">
                <b-form-input v-model="conferenceRoom.conferenceroomname"></b-form-input>
            </b-col>
        </b-row>
        <b-row >
            <b-col cols="3" offset="1">
            <p style="padding:6px 0px;">会议室地点：</p>
            </b-col>
            <b-col cols="7">
                <b-form-input readonly v-model="conferenceRoom.conferenceroomaddr"></b-form-input>
            </b-col>
        </b-row>
        <b-row >
            <b-col cols="3" offset="1">
            <p style="padding:6px 0px;">容纳人数：</p>
            </b-col>
            <b-col cols="7">
               <b-form-select
                v-model="conferenceRoom.capacity"
                :options="options"
                value-field="value"
                text-field="text"
                ></b-form-select>
            </b-col>
        </b-row>
        <b-row >
            <b-col cols="3" offset="1">
            <p style="padding:6px 0px;">空调情况：</p>
            </b-col>
            <b-col cols="7">
               <b-form-select
                v-model="conferenceRoom.hasairconditioner"
                :options="airOptions"
                value-field="value"
                text-field="text"
                ></b-form-select>
            </b-col>
        </b-row>
    </b-modal>
    </div>
</template>
<script>
export default {
   data() {
      return {
        baseURL:"conference_management/conferenceRoom/",
        dataList:[],
        fields:[
            {"pro":"conferenceroomname","label":"会议室名称"},
            {"pro":"conferenceroomaddr","label":"会议室地点"},
            {"pro":"capacity","label":"容纳人数"},
        ],
        total: 0,//总数据条目量
        currentPage: 1,
        pageSize: 7, //每页展示数据条数
        searchKey:'',//搜索楼层号
        airConditionerKey:'',//搜索是否有空调
        roomStateKey:'',//会议室状态
        selectedNumber:'',//搜索容纳的人数
        options:[//人数
            {text: '容纳人数', value: ''},
            {text: '10', value: '10'},
            {text: '30', value: '30'},
            {text: '50', value: '50'},
        ],
        airOptions:[//空调情况
            {text: '无空调', value: '0'},
            {text: '有空调', value: '1'},
        ],
        conferenceRoom:{//会议室信息
            conferenceroomId:'',//会议室编号
            conferenceroomname:'',//会议室名称
            conferenceroomaddr:'',//会议室地点
            hasairconditioner:'1',//是否有空调
            capacity:'',//容纳人数
            conferenceroomstate:'0',//会议室状态
        }
      }
   },
   methods:{
       findbyPage(currentPage){//    分页查找
        this.currentPage=currentPage;
        this.$http.get(this.baseURL+"getAll.action",{pageNum:currentPage})
            .then((data) => {
                console.log(data);
                if(data.code==1){
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
                        "id":tempList[i].conferenceroomId,
                        "conferenceroomname":tempList[i].conferenceroomname,
                        "conferenceroomaddr":tempList[i].conferenceroomaddr,
                        "hasairconditioner":this.changeAirConditioner(tempList[i].hasairconditioner),
                        "capacity":tempList[i].capacity,
                        "conferenceroomstate":this.changeconferenceroomstate(tempList[i].conferenceroomstate),
                        })
                    }
                }
            })
       },
       toSearch(){//    按条件查找
       console.log(this.airConditionerKey+","+this.roomStateKey)
           this.$http.get(this.baseURL+"searchByCondition.action",{floorNum:this.searchKey,hasAirConditioner:this.airConditionerKey,conferenceRoomState:this.roomStateKey,capacity:this.selectedNumber,pageSize:7})
            .then((data) => {
                console.log(data);
                if(data.code==1){
                    this.total=data.data.total;
                    var tempList=data.data.list;
                    this.dataList=[];
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.dataList.push({
                        "id":tempList[i].conferenceroomId,
                        "conferenceroomname":tempList[i].conferenceroomname,
                        "conferenceroomaddr":tempList[i].conferenceroomaddr,
                        "hasairconditioner":this.changeAirConditioner(tempList[i].hasairconditioner),
                        "capacity":tempList[i].capacity,
                        "conferenceroomstate":this.changeconferenceroomstate(tempList[i].conferenceroomstate),
                        })
                    }
                }else{
                    this.showMasage("暂无符合条件的会议室！","error");
                }
            })
       },
       toInsert(){ //    展示新增数据模态框
        this.$bvModal.show('modal-add');
       },
       insert(){
           console.log(this.conferenceRoom);
           this.$http.post(this.baseURL+"addRoom.action",this.conferenceRoom)
            .then((data) => {
                if(data.code==1){
                    this.showMasage(data.resultMsg,"success")
                }else{
                    this.showMasage(data.resultMsg,"error")
                }
                this.findbyPage(this.currentPage);
            })
       },
       toUpdate(row){//   更新数据模态框
        this.conferenceRoom.conferenceroomId=row.id;
        this.conferenceRoom.conferenceroomname=row.conferenceroomname;
        this.conferenceRoom.conferenceroomaddr=row.conferenceroomaddr;
        this.conferenceRoom.capacity=row.capacity;
        if (row.hasairconditioner=="有空调") {
            this.conferenceRoom.hasairconditioner=1;
        }else{
            this.conferenceRoom.hasairconditioner=0;
        }
        this.$bvModal.show('modal-update');
       },
       update(){//更新会议室信息
        this.$http.post(this.baseURL+"updateRoom.action",this.conferenceRoom)
            .then((data) => {
                console.log(data);
                if(data.code==1){
                    this.showMasage(data.resultMsg,"success")
                }else{
                    this.showMasage(data.resultMsg,"error")
                }
                this.findbyPage(this.currentPage);
            })
       },
       toDelete(row){//删除确认
           this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delete(row);
            }).catch(() => {});
       },
       delete(row){// 删除数据
        this.$http.get(this.baseURL+"deleteRoom.action",{id:row.id})
            .then((data) => {
                console.log(data);
                if(data.code==1){
                    this.showMasage(data.resultMsg,"success")
                }else{
                    this.showMasage(data.resultMsg,"error")
                }
                this.findbyPage(this.currentPage);
            })
       },
       changeAirConditioner(value){//转换空调情况
        if (value==0) {
            return "无空调"
        } else if(value==1){
            return "有空调"
        }
       },
       changeconferenceroomstate(value){//转换会议室情况
        if (value==0) {
            return "未使用"
        } else if(value==1){
            return "使用中"
        }
       },
       currentChange(currentPage) {
            this.currentPage = currentPage;
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
       this.findbyPage(this.currentPage);
   }
}
</script>
<style scoped>
.checkbox{
    padding: 6px;
}
.select{
    margin-left: 17px;
}
</style>