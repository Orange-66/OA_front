<template>
    <div class="addConference">
        <b-col cols="12">
            <b-row >
                <b-col cols="2" offset="2" >
                <p>会议发起人：</p>
                </b-col>
                <b-col cols="5">
                    <b-form-input readonly v-model="userInfo.userName"></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="2" >
                <p>会议时间：</p>
                </b-col>
                <b-col cols="5">
                    <el-date-picker
                    v-model="conferenceTime"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间">
                    </el-date-picker>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="2" >
                <p>会议室：</p>
                </b-col>
                <b-col cols="5">
                    <b-form-input v-model="conference.conferenceroomaddr" readonly @click="selectConferenceRoom" placeholder="点击选择会议室"></b-form-input>
                </b-col>
                <b-col cols="3">
                    <b-button @click="checkBook" variant="primary">查询预约情况</b-button>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="2" >
                <p>参会人：</p>
                </b-col>
                <b-col cols="5">
                    <b-form-input v-model="employeesName" readonly @click="selectParticipate" placeholder="点击选择参会人"></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="2" offset="2" >
                <p>会议主题：</p>
                </b-col>
                <b-col cols="5">
                    <b-form-input v-model="conference.conferencetheme" placeholder="请输入会议主题"></b-form-input>
                </b-col>
            </b-row>
            <b-row >
                <b-col cols="3" offset="8">
                    <b-button class="btn" @click="bookConference" variant="primary">预约</b-button>
                </b-col>
            </b-row>
        </b-col>
        <!-- 选择会议室 -->
        <b-modal id="modal-selectConferenceRoom" title="选择会议室" size="lg" hide-footer>
            <BaseSimpleTable
            :list_title=conferenceRoomTitle
            :dataList=conferenceRoomList
            :fields=conferenceRoomfields
            :total=conferenceRoomtotal
            :showSelect=true
            :formType=conferenceRoomType></BaseSimpleTable>
        </b-modal>
        <!-- 选择参会人员 -->
        <b-modal id="modal-selectParticipate" title="选择参会人员" size="lg" ok-only ok-title="确定">
            <BaseSimpleTable
            :list_title=participateTitle
            :dataList=participateList
            :fields=participatefields
            :total=participatetotal
            :showSelect=true
            :formType=participateType></BaseSimpleTable>
        </b-modal>
        <!-- 会议室预约情况 -->
        <b-modal id="modal-getBooking" title="会议室预约情况" ok-only ok-title="确定">
            <b-row >
                <b-col cols="4" offset="1" >
                    <label>已预约时间段：</label>
                </b-col>
            </b-row>
            <b-row v-for="item in this.bookTime" :key="item.id" >
                <b-col cols="10" offset="1" >
                    <el-date-picker
                    readonly=""
                    v-model="item.time"
                    type="datetimerange"
                    range-separator="至"
                    >
                    </el-date-picker>
                    <h6></h6>
                </b-col>
            </b-row>
        </b-modal>
    </div>
</template>
<script>
import BaseSimpleTable from "../../component/BaseSimpleTable"
export default {
    components:{
        BaseSimpleTable,
    },
    props: {
        userInfo: {
        type: Object,
        required: true
        }
    },
   data() {
      return {
        baseURL:"conference_management/conference/",
        conference:{//会议信息
            sponsorId:'',//会议发起人编号
            sponsorname:'',//会议发起人姓名
            conferenceroomId:'',//会议室编号
            conferenceroomaddr:'',//会议室地点
            conferencestartime:'',//会议开始时间
            conferenceendtime:'',//会议结束时间
            conferencetheme:'',//会议主题
        },
        conferenceTime:'',//会议开始结束时间
        conferenceRoomTitle:'会议室信息',
        conferenceRoomList:[],//会议室列表
        conferenceRoomfields:[//会议室表头
            {"pro":"id","label":"会议室编号"},
            {"pro":"conferenceroomname","label":"会议室名称"},
            {"pro":"conferenceroomaddr","label":"会议室地点"},
            {"pro":"capacity","label":"容纳人数"},
        ],
        conferenceRoomtotal: 0,//会议室总数据条目量
        conferenceRoomType:'conferenceRoom',
        participateTitle:'员工信息',
        participateList:[],//参与人ID列表
        participatefields:[
            {"pro":"id","label":"员工编号"},
            {"pro":"employeeName","label":"员工姓名"}
        ],
        participatetotal: 0,//员工总数据条目量
        participateType:'participates',
        employees:'',//参会员工信息,
        employeesName:'',//员工姓名列表
        bookTime:[],//预约的时间段
      }
   },
   methods: {
       bookConference(){//添加预约会议
        var tempStart=new Date(this.conferenceTime[0]);
        var changetempStart=tempStart.getFullYear() + '-' + (tempStart.getMonth() + 1) + '-' + tempStart.getDate() + ' ' + tempStart.getHours() + ':' + tempStart.getMinutes() + ':' + tempStart.getSeconds();
        var tempEnd=new Date(this.conferenceTime[1]);
        var changetempEnd=tempEnd.getFullYear() + '-' + (tempEnd.getMonth() + 1) + '-' + tempEnd.getDate() + ' ' + tempEnd.getHours() + ':' + tempEnd.getMinutes() + ':' + tempEnd.getSeconds();
        
        this.$http.get(this.baseURL+"addConference.action",{
            sponsorId:this.userInfo.userID,
            sponsorname:this.userInfo.userName,
            conferenceroomId:this.conference.conferenceroomId,
            conferenceroomaddr:this.conference.conferenceroomaddr,
            conferencestartime:changetempStart,
            conferenceendtime:changetempEnd,
            conferencetheme:this.conference.conferencetheme,
            employees:this.employees})
            .then((data) => {
                console.log(data);
                if(data.code==1){
                    this.showMasage(data.resultMsg,"success");
                    this.$parent.$parent.$parent.addSuccess()
                }else{
                    this.showMasage(data.resultMsg,"error")
                }
            })
       },
       selectConferenceRoom(){//选择会议室
        this.findselectConferenceRoombyPage();
        this.$bvModal.show('modal-selectConferenceRoom');
       },
       findselectConferenceRoombyPage(){//查找会议室
           this.$http.get("conference_management/conferenceRoom/getAll.action")
            .then((data) => {
                if(data.code==1){
                    this.conferenceRoomtotal=data.data.total;
                    var tempList=data.data.list;
                    this.conferenceRoomList=[];
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.conferenceRoomList.push({
                        "id":tempList[i].conferenceroomId,
                        "conferenceroomname":tempList[i].conferenceroomname,
                        "conferenceroomaddr":tempList[i].conferenceroomaddr,
                        "capacity":tempList[i].capacity,
                        })
                    }
                }
            })
       },
       selectParticipate(){//选择参会人员
        this.findselectParticipatebyPage();
        this.employees=[];//清空参会人员ID列表
        this.$bvModal.show('modal-selectParticipate');
       },
       findselectParticipatebyPage(){//查找员工
           this.$http.get(this.baseURL+"getEmployee.action",{id:this.userInfo.userID})
            .then((data) => {
                if(data.code==1){
                    this.participatetotal=data.data.total;
                    var tempList=data.data.list;
                    this.participateList=[];
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        this.participateList.push({
                        "id":tempList[i].employeeId,
                        "employeeName":tempList[i].employeeName,
                        })
                    }
                }
            })
       },
       selectItem(row,type){//选择会议室/参会人员
            if(type=="conferenceRoom"){
                this.conference.conferenceroomaddr=row.conferenceroomaddr;
                this.conference.conferenceroomId=row.id;
                this.$bvModal.hide('modal-selectConferenceRoom');
            }else if(type=="participates"){
                this.employeesName=this.employeesName+row.employeeName+";";
                // var employee={employeeId:row.id,employeeName:row.employeeName};
                this.employees=this.employees+row.id+",";
                console.log(this.employees);
            }
       },
       checkBook(){//查询会议室预约情况
        this.$http.get(this.baseURL+"getBooking.action",{id:this.conference.conferenceroomId})
            .then((data) => {
                // console.log(data);
                if(data.code==1){
                    var tempList=data.data.list;
                    this.bookTime=[];
                    // 插入当前页数据
                    for (let i = 0; i < tempList.length; i++) {
                        var tempTime=[];
                        tempTime.push(this.changeTimeType(tempList[i].conferencestartime));
                        tempTime.push(this.changeTimeType(tempList[i].conferenceendtime));
                        this.bookTime.push({
                        "id":tempList[i].conferenceId,
                        "time":tempTime,
                        })
                    }
                    console.log(this.bookTime);
                    this.$bvModal.show('modal-getBooking');
                }
            })
       },
       changeTimeType(value){//修改时间戳为标准时间
            var tempTime=new Date(value);
            let y = tempTime.getFullYear();
            let MM = tempTime.getMonth();
            let d = tempTime.getDate();
            let h = tempTime.getHours();
            let m = tempTime.getMinutes();
            return new Date(y,MM,d,h,m);
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
   created(){
       this.employees=new Array();
   }
}
</script>
<style scoped>
p{
    padding:6px 0px;
    width: 300px;
}
.picker .btn{
    width: 100%;
}
.btn{
    width: 100%;
}
</style>