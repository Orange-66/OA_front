<template>
<div class="echartsContainer">
    <b-card  header-tag="header" border-variant="default" header-bg-variant="default" >
        <div slot="header" align="center">
            <strong style="font-size:18px">垃圾邮件数量统计</strong>
        </div>
        <b-row>
            <b-col cols="6" offset="3">
                <v-chart :options="this.option"/>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="2" offset="10">
                <b-button class="btn" variant="primary" @click="toBack">返回</b-button>
            </b-col>
        </b-row>
    </b-card>
</div>
</template>
<script>
import 'echarts/lib/chart/pie';
export default {
    props: {
        rubbishData:{
            default:()=>[]
        },
    },
   data() {
      return {
          baseURL:"echarts/",
          option :{
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 10,
                data: ['正常邮件', '垃圾邮件']
            },
            series: [
                {
                    name: '数量',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    center: ['40%', '50%'],
                    data: this.rubbishData,
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                }
            ]
        },
      }
   },
   methods:{

       getData(){//获取邮件数据
        var id =this.$route.query.userId;
        this.$http.get(this.baseURL+"selectEmail.action",{receiveEmailNameId:id})
            .then((data) => {
                console.log(data);
                if(data.code==1){
                    var tempList=data.data;
                    // 插入数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.rubbishData.push({
                        "name":tempList[i].name==0? "正常邮件":"垃圾邮件",
                        "value":tempList[i].number,
                        })
                    }
                }
            })
       },
       toBack(){//返回上一页
           this.$router.push({path: "/mailManage/rubbish_box"});
       }
   },
   created() {
       this.getData();
   }
}
</script>
<style scoped>
.btn{
    width: 100%;
}
</style>
