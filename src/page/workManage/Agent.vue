<template>
  <div class="application-panel">
        <!-- 卡片 -->
        <b-card  header-tag="header" border-variant="default" header-bg-variant="default" >
           <div slot="header" align="center">
                <strong style="font-size:18px">代读设置</strong>
            </div>

            <b-tabs justified>
                <b-tab>
                    <template v-slot:title>
                       <div style="font-size:large">组织机构</div> 
                    </template>
                    <Organization ref="Organization" :userInfo=userInfo></Organization>
                </b-tab>
                <b-tab>
                    <template v-slot:title>
                        <div style="font-size:large">代读管理</div> 
                    </template>
                    <AgentManage ref="AgentManage" :userInfo=userInfo></AgentManage>
                    
                </b-tab>
                <b-tab>
                    <template v-slot:title>
                        <div style="font-size:large">代读查看</div> 
                    </template>
                    <AgentSearch ref="AgentSearch" :userInfo=userInfo></AgentSearch>
                </b-tab>
            </b-tabs>
        </b-card>

    </div>
</template>

<script>
import AgentManage from '@/page/workManage/agent/AgentManage'
import AgentSearch from '@/page/workManage/agent/AgentSearch'
import Organization from '@/page/workManage/agent/Organization'
export default {
    components:{
        AgentManage,
        AgentSearch,
        Organization
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
        findbyPage(page){
            console.log(1212312312312312312300000000000000,page)
            this.$refs.Organization.findbyPage(page);
            this.$refs.AgentManage.findbyPage(page);
            this.$refs.AgentSearch.findbyPage(page);
            
        }
    }
  }
</script>

<style>

</style>