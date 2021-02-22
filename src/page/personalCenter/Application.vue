<template>
  <div class="application-panel">
        <!-- 卡片 -->
        <b-card  header-tag="header" border-variant="default" header-bg-variant="default" >
           <div slot="header" align="center">
                <strong style="font-size:18px">{{title}}</strong>
            </div>

            <b-tabs justified>
                <b-tab>
                    <template v-slot:title>
                        <img class="img-rounded" style="width:30px; border-radius:5px;" src="../../../public/img/application/Leave.png" />
                        请假申请
                    </template>
                    <InfoLeave :userInfo= userInfo></InfoLeave>
                </b-tab>
                <b-tab>
                    <template v-slot:title>
                        <img style="width:30px; border-radius:5px;" src="../../../public/img/application/Reimbursement.png" />
                        报销申请
                    </template>
                    <InfoReimbursement :userInfo= userInfo></InfoReimbursement>
                </b-tab>
                <b-tab>
                    <template v-slot:title>
                        <img class="img-rounded" style="width:30px; border-radius:5px;" src="../../../public/img/application/RentalCar.png" />
                        用车申请
                    </template>
                    <InfoRentalCar :userInfo= userInfo></InfoRentalCar>
                </b-tab>
            </b-tabs>
        </b-card>

    </div>
</template>

<script>
import InfoLeave from '@/page/personalCenter/application/InfoLeave'
import InfoReimbursement from '@/page/personalCenter/application/InfoReimbursement'
import InfoRentalCar from '@/page/personalCenter/application/InfoRentalCar'
export default {
    components:{
        InfoLeave,
        InfoReimbursement,
        InfoRentalCar
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
        title:"个人申请中心",//标题
      }
      
      
    },
    methods:{

    }
  }
</script>

<style>

</style>