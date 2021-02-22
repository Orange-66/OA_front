<template>
  <div>
        <BaseActionTable
        :buttonText=buttonText
        :list_title=list_title
        :dataList=dataList
        :fields= fields
        :total=totalDataNum
        :showfind=false
        :showState = false
        :dropdownState=false
        :detailState=false
        :showAdd=false
        :showExport=true
        ></BaseActionTable>

        <a id="carLog" href="http://localhost:8082/OA_back_war_exploded/car_management/toarrange/exportExcel.action"></a>

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
        //   按钮文字
        buttonText:"安排车辆",
        buttonText2:"派遣",
        // 根路径
        baseURL:"car_management/toarrange/",
        // 卡片标题
        list_title:"派车待办",
        dataList:[
           /* {"employee_id":"1",employee_name:"张安","car_id":"布加迪威龙","line":"辽B-A8965",arrangeStatus:"等待中",startTime:"2020-07-09",endTime:"2020-07-09"},
            {"employee_id":"2",employee_name:"张安","car_id":"法拉利","line":"辽A-87456",arrangeStatus:"等待中",startTime:"2020-07-09",endTime:"2020-07-09"},
            {"employee_id":"3",employee_name:"张安","car_id":"法拉利","line":"辽B-A8965",arrangeStatus:"等待中",startTime:"2020-07-09",endTime:"2020-07-09"},
            {"employee_id":"4",employee_name:"张安","car_id":"奔驰S600","line":"辽A-87456",arrangeStatus:"等待中",startTime:"2020-07-09",endTime:"2020-07-09"},
            {"employee_id":"5",employee_name:"张安","car_id":"布加迪威龙","line":"辽B-A8965",arrangeStatus:"等待中",startTime:"2020-07-09",endTime:"2020-07-09"},
            {"employee_id":"6",employee_name:"张安","car_id":"奔驰S600","line":"辽B-Q5428",arrangeStatus:"等待中",startTime:"2020-07-09",endTime:"2020-07-09"},
            {"employee_id":"7",employee_name:"张安","car_id":"法拉利","line":"辽A-87456",arrangeStatus:"等待中",startTime:"2020-07-09",endTime:"2020-07-09"},
            {"employee_id":"8",employee_name:"张安","car_id":"奔驰S600","line":"辽B-Q5428",arrangeStatus:"等待中",startTime:"2020-07-09",endTime:"2020-07-09"},
            {"employee_id":"9",employee_name:"张安","car_id":"法拉利","line":"辽A-87456",arrangeStatus:"等待中",startTime:"2020-07-09",endTime:"2020-07-09"},
            {"employee_id":"10",employee_name:"张安","car_id":"奔驰S600","line":"辽B-Q5428",arrangeStatus:"等待中",startTime:"2020-07-09",endTime:"2020-07-09"},*/
        ],
        fields:[
            {"pro":"employee_id","label":"员工编号"},
            {"pro":"employee_name","label":"员工姓名"},
            {"pro":"car_id","label":"车辆编号"},
            {"pro":"line","label":"路线"},
            {"pro":"startTime","label":"开始时间"},
            {"pro":"endTime","label":"结束时间"}
        ],
        totalDataNum:12,//总数据条目数

        currentPageNum:1,
        pageSize:7,
    }
   },
   methods:{
    // 导出数据
    toExport(){
        document.getElementById("carLog").click();
    },


    // -------------------------------------------
    // 展示车辆信息页面 √
    findbyPage(currentPage){
      console.log("aaaaaaaaaaaaaa")
        this.currentPageNum=currentPage;
        var requestBean = {
            pageNum:currentPage,
            pageSize:this.pageSize};
        var action = "selectAllArrangeInfo.action"

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
        console.log(this.totalDataNum+"aaaaaaaaaaa");

        var tempList=data.list;
        console.log(data)
        this.dataList=[];
        // 将之前的页数填满
        var num=(this.currentPageNum-1)*7
        for (let j = 0; j < num; j++) {
            this.dataList.push({"id":''})
        }
        // 插入当前页数据
        for (let i = 0; i < tempList.length; i++) {
            this.dataList.push({
                toArrange_id :tempList[i].toarrangeId,
                employee_id:tempList[i].employeeId,
                car_id:tempList[i].carId,
                employee_name:tempList[i].employeeName,
                reason:tempList[i].reason,
                line:tempList[i].line,
                startTime: this.changeTimeFormat(tempList[i].starttime),
                endTime: this.changeTimeFormat(tempList[i].endtime),
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

            changeTimeFormat(timestamp){
            var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate();
            return Y+M+D;
        },
   },
  created(){
    this.findbyPage(1);
  }

}
</script>

<style>

</style>
