<template>
  <div class="car">
    <BaseActionTable
      :list_title=list_title
      :dataList=dataList
      :fields= fields
      :options=options
      :total=totalDataNum
      :showfind=false
      :showState = false
    ></BaseActionTable>

    <!-- modal-modifyCarInfo -->
    <b-modal id="modal-modifyCarInfo" centered title="修改车辆信息" @ok="modifyCarInfo()" cancel-title="返回" ok-title="保存">
      <b-row >
        <b-col cols="3" offset="1">
          <p style="padding:6px 0px;font-weight:bold">车辆编号：</p>
        </b-col>
        <b-col cols="7">
          <b-form-input readonly style="background-color:white" v-model="Car.id"></b-form-input>
        </b-col>
      </b-row>
      <b-row >
        <b-col cols="3" offset="1">
          <p style="padding:6px 0px;font-weight:bold;">车辆类型：</p>
        </b-col>
        <b-col cols="7">
          <b-form-input v-model="Car.carType" ></b-form-input>
        </b-col>
      </b-row>
            <b-row >
        <b-col cols="3" offset="1">
          <p style="padding:6px 0px;font-weight:bold;">车辆拍照：</p>
        </b-col>
        <b-col cols="7">
          <b-form-input v-model="Car.license" ></b-form-input>
        </b-col>
      </b-row>
    </b-modal>
    <!-- modal-checkCarImage -->
    <b-modal id="modal-checkCarImage" centered  title="查看车辆图片" ok-only ok-title="确定">
      <img
      :src="Car.Image"
      class="img-avatar"
      style="width:200px;"/>
    </b-modal>
    <!-- modal-addCarInfo -->
    <b-modal id="modal-addCarInfo" centered title="新增车辆信息" @ok="addCarInfo()" cancel-title="返回" ok-title="保存">
      <b-row >
        <b-col cols="3" offset="1">
          <p style="padding:6px 0px;font-weight:bold">车辆类型：</p>
        </b-col>
        <b-col cols="7">
          <b-form-input v-model="Car.carType"></b-form-input>
        </b-col>
      </b-row>
      <b-row >
        <b-col cols="3" offset="1">
          <p style="padding:6px 0px;font-weight:bold;">车辆牌照：</p>
        </b-col>
        <b-col cols="7">
          <b-form-input v-model="Car.license"></b-form-input>
        </b-col>
      </b-row>
      <b-row >
        <b-col cols="3" offset="1">
          <p style="padding:6px 0px;font-weight:bold;">车辆照片：</p>
        </b-col>
        <b-col cols="7">
          <b-form-file
            v-model="Car.Image"
            placeholder="上传车辆图片"
            browse-text="点击选择图片"
            accept="image/*"
            name="file"
          ></b-form-file>
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
        // 根路径
        baseURL:"car_management/car/",
        list_title:"车辆查看",
        dataList:[
          /*{"id":"1","carType":"布加迪威龙","license":"辽B-A8965",Image:"url"},
          {"id":"2","carType":"法拉利","license":"辽A-87456",Image:"url"},
          {"id":"3","carType":"法拉利","license":"辽B-A8965",Image:"url"},
          {"id":"4","carType":"奔驰S600","license":"辽A-87456",Image:"url"},
          {"id":"5","carType":"布加迪威龙","license":"辽B-A8965",Image:"url"},
          {"id":"6","carType":"奔驰S600","license":"辽B-Q5428",Image:"url"},
          {"id":"7","carType":"法拉利","license":"辽A-87456",Image:"url"},
          {"id":"8","carType":"奔驰S600","license":"辽B-Q5428",Image:"url"},
          {"id":"9","carType":"法拉利","license":"辽A-87456",Image:"url"},
          {"id":"10","carType":"奔驰S600","license":"辽B-Q5428",Image:"url"},*/
        ],
        fields:[
          {"pro":"id","label":"车辆编号"},
          {"pro":"carType","label":"车辆类型"},
          {"pro":"license","label":"车辆牌照"},
        ],
        totalDataNum:12,//总数据条目数
        options:[
          {text: '修改车辆信息', value: '1'},
          {text: '查看车辆图片', value: '2'},
          {text: '删除', value: '3'},
        ],
        // 像后端发送数据包时使用的数据对象
        Car:{
          id:"",
          carType: "布加迪威龙",
          license:"辽B-Q5428",
          Image:"url"
        },
        currentPageNum:1
      }
    },
    methods:{
      // -----------------------------------------------------------------------------
      // 详情操作按钮方法分流
      // 操作下拉栏的所有方法
      toDealAction(actionID,objectID){ //处理操作选项(操作，itemID)
        switch(actionID){
          case '1':
            // 查看详情
            this.toModifyCarInfo(objectID);
            break;
          case '2':
            // 查看云共享
            this.toCheckCarImage(objectID);
            break;
          case '3':
            // 删除
            this.deleteCarInfo(objectID);
            break;
        }
      },

      // -------------------------------------------
      // 修改车辆信息页面
      toModifyCarInfo(id){
        for(let i = 0; i < this.dataList.length; i++){
          if(this.dataList[i].id == id){
            this.Car = {
              id : this.dataList[i].id,
              carType : this.dataList[i].carType,
              license : this.dataList[i].license,
              Image : this.dataList[i].Image
            }
            this.$bvModal.show('modal-modifyCarInfo');
            break;
          }
        }
      },

      modifyCarInfo(){
        var requestBean = {
          carId:this.Car.id,
          cartype:this.Car.carType,
          license:this.Car.license
          };
        var action = "updateCar.action"
       console.log(requestBean);
        this.$http.post(this.baseURL+action, requestBean)
          .then((data) => {
            console.log(data);
            if(data.code==1){
              this.findbyPage(1);
            }
          })
      },

      // -------------------------------------------
      // 查看车辆图片页面
      toCheckCarImage(id){
        this.$bvModal.show('modal-checkCarImage');
        var requestBean = {carId:id};
        var action = "getHeader.action"

        this.$http.get(this.baseURL+action, requestBean)
          .then((data) => {
            console.log(data);
            if(data.code==1){
              this.Car.Image = data.data
            }
          })
      },

      // -------------------------------------------
      // 删除车辆信息页面
      deleteCarInfo(id){
        this.$confirm('此操作将删除此车辆信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var requestBean = {carId:id};
          var action = "deleteCar.action"

          this.$http.get(this.baseURL+action, requestBean)
            .then((data) => {
              console.log(data);
              if(data.code==1){
                this.findbyPage(1);
              }
            })
        })
      },

      // -------------------------------------------
      // 新增车辆信息页面 √
      toInsert(){
        this.$bvModal.show('modal-addCarInfo');
      },
      addCarInfo(){
        const requestBean = new FormData()
        requestBean.append('carId', this.Car.id)
        requestBean.append('cartype', this.Car.carType)
        requestBean.append('license', this.Car.license)
        requestBean.append('file', this.Car.Image)
        var action = "addCar.action"
        console.log(requestBean);
        this.$http.post(this.baseURL+action, requestBean)
          .then((data) => {
            console.log(data);
            if(data.code==1){
              this.findbyPage(1);
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
        // 插入当前页数据
        for (let i = 0; i < tempList.length; i++) {
          this.dataList.push({
            id : tempList[i].carId,
            carType : tempList[i].cartype,
            license : tempList[i].license,
            Image : tempList[i].image
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
<style scoped>
</style>
