<template>
  <div class="application-panel" style="padding-top:0;padding-bottom:0">
        <FullCalendar  
        :events = events
        :config = config
        @event-selected='eventClick'>
        </FullCalendar>
    

     <!-- 新增用车申请 -->
        <b-modal id="modal-editWork" centered size="lg" title="安排工作" ok-only ok-title="确定">
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;">工作授予人：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input v-model="editInfo.workgiverName"></b-form-input>
                </b-col>
                <b-col cols="2">
                <p style="padding:6px 0px;">工作接受人：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input v-model="editInfo.workreceiverName"></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;">开始时间：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input type="date" v-model="editInfo.workstart"></b-form-input>
                </b-col>
                <b-col cols="2">
                <p style="padding:6px 0px;">结束时间：</p>
                </b-col>
                <b-col cols="3">
                    <b-form-input type="date" v-model="editInfo.workend"></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;">工作主题：</p>
                </b-col>
                <b-col cols="8">
                    <b-form-input v-model="editInfo.topic" ></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;">工作内容：</p>
                </b-col>
                <b-col cols="8">
                    <b-form-textarea v-model="editInfo.content" rows="3"></b-form-textarea>
                </b-col>
            </b-row>
        </b-modal>
        </div>
</template>

<script>
import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/fullcalendar.css'
import LeaveApproval from '@/page/workManage/approval/LeaveApproval'
import ReimbursementApproval from '@/page/workManage/approval/ReimbursementApproval'
import RentalApproval from '@/page/workManage/approval/RentalApproval'
export default {
    components:{
        LeaveApproval,
        ReimbursementApproval,
        RentalApproval,
        FullCalendar 
    },
    props:{
      userInfo:{
            type: Object,
            required: true
        },
    },
    data() {
      return {
          //   根路径
        baseURL:"work_arrangement/search/",
        events: [
            {
                title  : 'event1',
                start  : '2020-07-01',
                color: 'green',
                textColor: 'white',
            },
            {
                title  : 'event2',
                start  : '2020-07-18',
                end    : '2020-07-19',
            },
            {
                title  : 'event3',
                start  : '2020-07-18T12:30:00',
                end  : '2020-07-18T23:30:00',
                allDay : false,
            },
        ],
        
      config:{
        firstDay:'0' ,//以周日为每周的第一天
        locale: 'zh-cn' ,//语言
        defaultView: 'month' ,//默认按显示
        weekMode: "Liquid", //周数不定，每周的高度可变， 整个日历高度不变
        buttonText:{
            today:'今天',
            month:"月",
            week:"周",
            day:"天"
        }
        },
        editInfo:{
            workgiverName: "",//申请id
            workreceiverName: "",
            topic: "",
            appTime: "",
            weekend:"",
            weekstart:""
        },
        pickEvent_1:"",
        pickEvent_2:""
    }
    },
    methods:{
        eventClick(event){
            var count = 0;
            // console.log(this.events.length)
            for(var i = 0; i < this.events.length; i++){
                if(count == 2){
                    break;
                }
                // console.log(this.events[i].id, event.id)
                if(this.events[i].id == event.id){
                    // console.log(this.events[i].textColor)
                    
                    
                    count = count + 1;
                    if(count == 1){
                        if(this.pickEvent_1 != ""){
                        this.events[this.pickEvent_1].color = ''
                        }
                        this.pickEvent_1 = i
                        this.editInfo.workgiverName = this.events[i].workgiverName;
                        this.editInfo.workreceiverName = this.events[i].workreceiverName;
                        this.editInfo.topic = this.events[i].topic
                        this.editInfo.content = this.events[i].content
                        this.editInfo.workstart = this.events[i].workstart;
                        this.editInfo.workend = this.events[i].workend;
                        this.editInfo.content = this.events[i].content;
                    }
                    else{
                        if(this.pickEvent_2 != ""){
                        this.events[this.pickEvent_2].color = 'green'
                        }
                    
                        this.pickEvent_2 = i
                    }

                    this.events[i].color = 'indianred'
                    this.events[i].textColor = 'white'
                }
            }
            // console.log(this.editInfo)
            this.$bvModal.show('modal-editWork');
        },
        changeTimeFormat(timestamp){
            var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
            return Y+M+D;
        },
        getCalendar(){
            this.events = []
            for(let i = 1; i < 13; i++){
                var month = i < 10 ? "0" + i: i;
                var requestBean = {id: this.userInfo.userID, searchDate : "2020-" + month};
                var action = "searchByMonth.action";
                this.$http.get(this.baseURL+action, requestBean)
                .then((data) => {
                    
                    if(data.code==1){
                        var temList = data.data;
                        console.log(123312312, temList);
                        
                        for(let j = 0; j < temList.length; j++){
                            // console.log(temList[j].topic)
                            this.events.push({
                                title : temList[j].topic,
                                start : this.changeTimeFormat(temList[j].workstart),
                                textColor: 'white',
                                id : temList[j].workId,
                                workgiverName: temList[j].workgiverName,//申请id
                                workreceiverName: temList[j].workreceiverName,
                                topic:temList[j].topic,
                                content:temList[j].content,
                                workend: this.changeTimeFormat(temList[j].workend),
                                workstart: this.changeTimeFormat(temList[j].workstart)
                            })
                            // console.log(this.events)
                            this.events.push({
                                title : temList[j].topic,
                                start : this.changeTimeFormat(temList[j].workend),
                                color: 'green',
                                textColor: 'white',
                                id : temList[j].workId
                            })
                            
                        }
                        // console.log(123312312, this.events);
                        
                    }
                    
                })
            }
            
        

        },
    },
    created(){
        this.getCalendar();
    }
    
}
</script>

<style scoped>
card-body{
  padding-top:0;
  padding-bottom:0;
}
</style>