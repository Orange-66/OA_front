<template>

    <div class="info-leave">
        <!-- 卡片 -->
        <b-card  header-tag="header" border-variant="default" header-bg-variant="default" >
            <div slot="header" align="center">
                <strong style="font-size:18px">日程安排</strong>
            </div>
           <b-tabs justified>
                <b-tab>
                    <template v-slot:title>
                        <div style="font-size:large">安排工作</div>
                    </template>
                    <ArrangeWork :userInfo=userInfo></ArrangeWork>
                </b-tab>
                <b-tab>
                    <template v-slot:title>
                        <div style="font-size:large">编辑工作</div>
                    </template>
                    <EditWork :userInfo=userInfo></EditWork>
                </b-tab>
            </b-tabs>
        </b-card>
        
    </div>
</template>

<script>
import ArrangeWork from '@/page/workManage/scheduleManage/ArrangeWork'
import EditWork from '@/page/workManage/scheduleManage/EditWork'
export default {
    components:{
        ArrangeWork,
        EditWork
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

    },
    created() {
    }
  }
</script>

<style scoped>
</style>