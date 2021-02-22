<template>
  <div class="application-panel">
        <!-- 卡片 -->
        <b-card  header-tag="header" border-variant="default" header-bg-variant="default" >
           <div slot="header" align="center">
                <strong style="font-size:18px">审批待办中心</strong>
            </div>

            <b-tabs justified>
                <b-tab>
                    <template v-slot:title>
                        <div style="font-size:large">
                            <img class="img-rounded" style="width:30px; border-radius:5px;" src="../../../public/img/application/Leave.png" />
                            请假申请审批
                        </div>
                    </template>
                    <LeaveApproval :userInfo=userInfo></LeaveApproval>
                </b-tab>
                <b-tab>
                    <template v-slot:title>
                        <div style="font-size:large">
                            <img style="width:30px; border-radius:5px;" src="../../../public/img/application/Reimbursement.png" />
                            报销申请审批
                        </div>
                    </template>
                    <ReimbursementApproval :userInfo=userInfo></ReimbursementApproval>
                </b-tab>
                <b-tab>
                    <template v-slot:title>
                        <div style="font-size:large">
                            <img class="img-rounded" style="width:30px; border-radius:5px;" src="../../../public/img/application/RentalCar.png" />
                            用车申请审批
                        </div>
                    </template>
                    <RentalApproval :userInfo=userInfo></RentalApproval>
                </b-tab>
            </b-tabs>
        </b-card>

    </div>
</template>

<script>
import LeaveApproval from '@/page/workManage/approval/LeaveApproval'
import ReimbursementApproval from '@/page/workManage/approval/ReimbursementApproval'
import RentalApproval from '@/page/workManage/approval/RentalApproval'
export default {
    components:{
        LeaveApproval,
        ReimbursementApproval,
        RentalApproval
    },
    props:{
      userInfo:{
            type: Object,
            required: true
        },
    },
    data() {
      return {

      }
      
      
    },
    methods:{

    }
  }
</script>

<style>

</style>