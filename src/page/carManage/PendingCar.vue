<template>
  <div class="car">
    <BaseActionTable
      :buttonText=buttonText
      :list_title=list_title
      :dataList=dataList
      :fields= fields
      :total=totalDataNum
      :showfind=false
      :showState = false
      :dropdownState=false
      :detailState=true
      :showAdd=false
    ></BaseActionTable>

    <!-- modal-dispatchCar -->
    <b-modal id="modal-dispatchCar" centered title="批准用车" @ok="dispatchCar()" cancel-title="返回" ok-title="保存">
      <b-row >
        <b-col cols="3" offset="1">
          <p style="padding:6px 0px;font-weight:bold">员工姓名：</p>
        </b-col>
        <b-col cols="7">
          <b-form-input readonly style="background-color:white" v-model="arrangeInfo.employee_name"></b-form-input>
        </b-col>
      </b-row>
      <b-row >
        <b-col cols="3" offset="1">
          <p style="padding:6px 0px;font-weight:bold;">用车路线：</p>
        </b-col>
        <b-col cols="7">
          <b-form-input v-model="arrangeInfo.line" readonly style="background-color:white"></b-form-input>
        </b-col>
      </b-row>
      <b-row >
        <b-col cols="3" offset="1">
          <p style="padding:6px 0px;font-weight:bold;">用车原因：</p>
        </b-col>
        <b-col cols="7">
          <b-form-input v-model="arrangeInfo.reason" readonly style="background-color:white" ></b-form-input>
        </b-col>
      </b-row>
      <b-row >
        <b-col cols="3" offset="1">
          <p style="padding:6px 0px;font-weight:bold;">选择车辆：</p>
        </b-col>
        <b-col cols="7">
          <b-form-input v-model="arrangeInfo.car_id" readonly style="background-color:white" @click="toChoseCar"></b-form-input>
        </b-col>
      </b-row>
      <b-row >
        <b-col cols="3" offset="1">
          <p style="padding:6px 0px;font-weight:bold;">申请时间：</p>
        </b-col>
        <b-col cols="7">
          {{arrangeInfo.startTime + ' ~ ' + arrangeInfo.endTime}}
        </b-col>
      </b-row>
    </b-modal>

    <b-modal id="modal-choseCar" size="lg" centered title="选择车辆" ok-only ok-title="返回">
      <el-table
        :data= this.carList
        class="m-1"
        :row-style="{height:'45px'}"
        :cell-style="{padding:'0px'}"
      >
        <el-table-column v-for="item in this.fields2" :key="item.pro" :property="item.pro" :label="item.label" align="center" ></el-table-column>
       <!-- <el-table-column
          fixed="right"
          label="车辆图片"
          align="center"
        >
          <template slot-scope="scope">

            <img
            :src="scope.row.Image"
            class="img-avatar"
            style="width:130px;"/>


          </template>
        </el-table-column>-->
        <el-table-column
            fixed="right"
            label="操作"
            align="center"
            >
            <template slot-scope="scope">

                    <b-button variant="info" style="color:white" @click="choseCar(scope.row.id)">{{buttonText}}</b-button>&nbsp;&nbsp;


            </template>
        </el-table-column>
      </el-table>
    </b-modal>
  </div>
</template>

<script>
  import BaseActionTable from "../../component/BaseActionTable"
  export default {
    components:{
      BaseActionTable
    },
    props:{

      userInfo:{

        // userid:1,
        type: Object,
        required: true

      }
    },
    data() {
      return {
        header:"",
        //   按钮文字
        buttonText:"安排车辆",
        // 根路径
        baseURL:"car_management/toarrange/",
        // 卡片标题
        list_title:"派车待办",
        dataList:[
          /*            {"employee_name":"1","reason":"布加迪威龙","manager_name":"辽B-A8965",arrangeStatus:"等待中",approvalTime:"2020-07-09"},
                      {"employee_name":"2","reason":"法拉利","manager_name":"辽A-87456",arrangeStatus:"等待中",approvalTime:"2020-07-09"},
                      {"employee_name":"3","reason":"法拉利","manager_name":"辽B-A8965",arrangeStatus:"等待中",approvalTime:"2020-07-09"},
                      {"employee_name":"4","reason":"奔驰S600","manager_name":"辽A-87456",arrangeStatus:"等待中",approvalTime:"2020-07-09"},
                      {"employee_name":"5","reason":"布加迪威龙","manager_name":"辽B-A8965",arrangeStatus:"等待中",approvalTime:"2020-07-09"},
                      {"employee_name":"6","reason":"奔驰S600","manager_name":"辽B-Q5428",arrangeStatus:"等待中",approvalTime:"2020-07-09"},
                      {"employee_name":"7","reason":"法拉利","manager_name":"辽A-87456",arrangeStatus:"等待中",approvalTime:"2020-07-09"},
                      {"employee_name":"8","reason":"奔驰S600","manager_name":"辽B-Q5428",arrangeStatus:"等待中",approvalTime:"2020-07-09"},
                      {"employee_name":"9","reason":"法拉利","manager_name":"辽A-87456",arrangeStatus:"等待中",approvalTime:"2020-07-09"},
                      {"employee_name":"10","reason":"奔驰S600","manager_name":"辽B-Q5428",arrangeStatus:"等待中",approvalTime:"2020-07-09"},*/
        ],
        fields:[
          {"pro":"employee_name","label":"申请员工"},
          {"pro":"reason","label":"申请原因"},
          {"pro":"manager_name","label":"部门领导"},
          {"pro":"arrangeStatus","label":"当前审批流程"},
          {"pro":"approvalTime","label":"申请提交日期"}
        ],
        totalDataNum:12,//总数据条目数

        // 像后端发送数据包时使用的数据对象
        arrangeInfo:{
          toArrange_id:"",
          carApplication_id:"",
          manager_id:"",
          manager_name:"",
          employee_id:"",
          employee_name:"",
          approvalTime:"",
          arrangeStatus:"",
          reason:"",
          line:"",
          startTime:"",
          endTime:"",
          car_id:""
        },
        currentPageNum:1,
        pageSize:7,
        carList:[],
        fields2:[
          {"pro":"id","label":"车辆编号"},
          {"pro":"carType","label":"车辆类型"},
          {"pro":"license","label":"车辆牌照"},
          // {"pro":"Image","label":"车辆图片"},
        ],
        dataList2:[
          // {"id":"1","carType":"布加迪威龙","license":"辽B-A8965",image:"等待中"},
          // {"id":"1","carType":"布加迪威龙","license":"辽B-A8965",image:"等待中"},
          // {"id":"1","carType":"布加迪威龙","license":"辽B-A8965",image:"等待中"},
          // {"id":"1","carType":"布加迪威龙","license":"辽B-A8965",image:"等待中"},
          // {"id":"1","carType":"布加迪威龙","license":"辽B-A8965",image:"等待中"},
          // {"id":"1","carType":"布加迪威龙","license":"辽B-A8965",image:"等待中"},
          // {"id":"1","carType":"布加迪威龙","license":"辽B-A8965",image:"等待中"},
          // {"id":"1","carType":"布加迪威龙","license":"辽B-A8965",image:"等待中"},
          // {"id":"1","carType":"布加迪威龙","license":"辽B-A8965",image:"等待中"},
        ],
      }
    },
    methods:{

      // 申请模块特有的函数
      changeStateFormat(state){
        switch(state){
          case 0: return "审核中";
          case 1: return "已通过";
          case 2: return "已执行";
          default: return "审核中";
        }
      },

      changeTimeFormat(timestamp){
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate();
        return Y+M+D;
      },
      // -------------------------------------------
      // 选择车辆信息
      toChoseCar(){
        this.$bvModal.show('modal-choseCar');

        var requestBean = {
          pageNum:1,
          pageSize:999};
        var action = "selectAllUsable.action"
        var baseURL ="car_management/car/";
        this.$http.get( baseURL + action, requestBean)
          .then((res) => {
            console.log(res.data.list);
            this.carList=[];
            if(res.code==1){
              //this.carList=res.data.list;
              var tempList=res.data.list;
              for (let i = 0; i < tempList.length; i++) {
                this.carList.push({
                  id : tempList[i].carId,
                  carType : tempList[i].cartype,
                  license : tempList[i].license,
                  Image : tempList[i].image
                })
              }

              this.$bvModal.show('modal-choseCar');
            }
          })
      },
      choseCar(id){
        this.arrangeInfo.car_id = id;
        console.log(id+"aaaaaaaaaaaaaaa")
        this.$bvModal.hide('modal-choseCar');
      },
      // -------------------------------------------
      // 派遣车辆信息页面 √
      toDetail(id){
        for(let i = 0; i < this.dataList.length; i++){
          if(this.dataList[i].id ==id){
            this.arrangeInfo={
              toArrange_id : this.dataList[i].toArrange_id,
              employee_id : this.dataList[i].employee_id,
              car_id : this.dataList[i].car_id,
              employee_name : this.dataList[i].employee_name,
              reason : this.dataList[i].reason,
              line : this.dataList[i].line,
              startTime : this.dataList[i].startTime,
              endTime : this.dataList[i].endTime,
              manager_id:this.dataList[i].manager_id,
              manager_name:this.dataList[i].manager_name
            },
              this.$bvModal.show('modal-dispatchCar');
            break;
          }
        }
      },
      dispatchCar(){

        var requestBean = {
          toarrangeId : this.arrangeInfo.toArrange_id,
          employeeId : this.arrangeInfo.employee_id,
          carId : this.arrangeInfo.car_id,
          employeeName : this.arrangeInfo.employee_name,
          reason : this.arrangeInfo.reason,
          line : this.arrangeInfo.line,
          starttime : this.arrangeInfo.startTime,
          endtime : this.arrangeInfo.endTime,
          carmanagerId:this.userInfo.userID,
          carmanagerName:this.userInfo.userName};
        var action = "arrangeCar.action"
        console.log(this.arrangeInfo)
        this.$http.post(this.baseURL+action, requestBean)
          .then((data) => {
            console.log(data);
            if(data.code==1){
              this.findbyPage(1);
              this.showMasage(data.data,"success");
            }
            else{
              this.showMasage(data.data,"error");
            }
          })
      },

      // -------------------------------------------
      // 展示车辆信息页面 √
      findbyPage(currentPage){
        this.currentPageNum=currentPage;
        var requestBean = {
          pageNum:currentPage,
          pageSize:this.pageSize};
        var action = "selectAll.action"

        this.$http.get(this.baseURL+action, requestBean)
          .then((data) => {
            console.log(data);
            if(data.code==1){
              this.refreshList(data.data);
            }
          })
      },

      // 刷新列表 √
      refreshList(data){
        // console.log(dataList);
        this.totalDataNum=data.total;
        console.log(this.totalDataNum);
        var tempList=data.list;
        this.dataList=[];
        // 将之前的页数填满
        var num=(this.currentPageNum-1)*7
        for (let j = 0; j < num; j++) {
          this.dataList.push({"id":''})
        }
        console.log("@@@@@@@@@@@@@@@",data);
        // 插入当前页数据
        for (let i = 0; i < tempList.length; i++) {
          this.dataList.push({
            toArrange_id : tempList[i].toarrangeId,
            carApplication_id : tempList[i].carapplicationId,
            manager_id : tempList[i].managerId,
            manager_name : tempList[i].managerName,
            employee_id : tempList[i].employeeId,
            employee_name : tempList[i].employeeName,
            approvalTime : this.changeTimeFormat(tempList[i].approvaltime),
            arrangeStatus : this.changeStateFormat(tempList[i].arrangestatus),
            reason : tempList[i].reason,
            line : tempList[i].line,
            startTime : this.changeTimeFormat(tempList[i].starttime),
            endTime : this.changeTimeFormat(tempList[i].endtime),

          })
        }
      },

      // -----------------------------------------------------------------------------
      // 显示提示消息 √
      showMasage(msg, type){
        this.$message({
          showClose: true,
          duration:5000, //展示1000毫秒
          message: msg,
          type:type
        });
      },
    },
    created() {
      this.findbyPage(1);
    }
  }
</script>

<style>

</style>
