<template>
    
    <div>
        <el-card class="box-card">
            <div>
                <b-row>
                    <b-col clos="2"><h2>公告栏</h2></b-col>
                    <b-col clos="2" offset="9"><button type="button" class="bg-primary btn btn-default" @click="toPublish">发布公告</button></b-col>   
                </b-row>
                <hr>
            </div>
            <div>
                  <b-card no-body class="mb-1" :key="index" v-for="(item, index) in bulletinData">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button block  @click="show(index)" variant="primary" style="marggin-left:10px;color:white;text-align:left;font-size:large">{{ item.title}}</b-button>
                    </b-card-header>
                    <b-collapse :visible="visible == index">
                      <b-card-body>
                        <b-card-text>{{item.content}}</b-card-text>
                      </b-card-body>
                      <b-card-footer>
                          <b-row align-h="between">
                            <div style="margin-left:10px;padding:5px">{{item.publishDate}}</div>
                            <b-button-group>
                              <b-button variant="info" style="color:white" @click="toUpdateBulletin(item.id)">编辑</b-button>
                              <b-button variant="danger" @click="deleteBulletin(item.id)">删除</b-button>
                            </b-button-group>
                          </b-row>
                      </b-card-footer>
                    </b-collapse>
                  </b-card>
              
                <!-- <el-collapse :key="index" v-for="(item, index) in bulletinData">
                    <el-collapse-item styel="margin=100px">
                        <template slot="title" >
                        <i class="header-icon el-icon-message"></i>{{ item.title}}
                        </template>
                        <div></div>
                        <div></div>
                    </el-collapse-item>
                </el-collapse> -->
            </div>
        </el-card>

                <b-modal id="modal-publish" size="lg" centered title="发布公告" @cancel="clean" @close="clean" @ok="publish" cancel-title="取消"  ok-title="发布">
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;">公告标题</p>
                </b-col>
                <b-col cols="8">
                    <b-form-input v-model="publishInfo.title"></b-form-input>
                </b-col>
            </b-row>
 
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;">公告内容</p>
                </b-col>
                <b-col cols="8">
                    <b-form-textarea  v-model="publishInfo.content"  rows="3"></b-form-textarea>
                </b-col>
            </b-row>
        </b-modal>

               <b-modal id="modal-update" size="lg" centered title="发布公告" @cancel="clean" @close="clean" @ok="updateBulletin" cancel-title="取消"  ok-title="发布">
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;">公告标题</p>
                </b-col>
                <b-col cols="8">
                    <b-form-input v-model="updateInfo.title"></b-form-input>
                </b-col>
            </b-row>
 
            <b-row >
                <b-col cols="2" offset="1">
                <p style="padding:6px 0px;">公告内容</p>
                </b-col>
                <b-col cols="8">
                    <b-form-textarea  v-model="updateInfo.content"  rows="3"></b-form-textarea>
                </b-col>
            </b-row>
        </b-modal>
     </div>
</template>

<script>
 export default {
    data() {
      return {
        baseURL:"bulletin_management/",
        bulletinData: [{
          title : '关于周年庆放假的通知',
          publishDate : '2015-08-11',
          content : '因为8月30日是本公司成立10周年的纪念日，故放假5天。具体放假时间为 8月30日~9月3日，请相互转告！'
        },{
          title : '热烈庆祝反法西斯战争胜利70周年',
          publishDate : '2015-08-11',
          content : '鉴于反法西斯战争胜利70周年之际，我们公司积极响应上级号召进行庆祝，9月3日晚举行庆祝Party。'
        },{
          title : '关于八月十四日项目结束的通知',
          publishDate : '2015-08-11',
          content : '全体员工在项目结束之后在会议中心一室进行集合。项目组负责人到达二楼会客厅进行会谈'
        },{
          title : '开发部的同志们注意啦！',
          publishDate : '2015-08-11',
          content : '因公司效益状况不佳，本月工资推迟到9月10发下发，对此我们表示由衷的歉意'
        }],
        publishInfo:{
          title:"",
          publishDate:"",
          content:"",
          id :"",
          publishId:"",
          publishName: "",
          bulletinType: "",
          notifyObject:"",
        },
        updateInfo:{
          title:"",
          publishDate:"",
          content:"",
          id :"",
          publishId:"",
          publishName: "",
          bulletinType: "",
          notifyObject:"",
        },
        userInfo:{
          userid:1,
          userName:"张三"
        },
        visible:0
      }
    },
    methods:{
      clean(){
        this.publishInfo={
          title:"",
          publishDate:"",
          content:"",
          id :"",
          publishId:"",
          publishName: "",
          bulletinType: "",
          notifyObject:"",
        }
        this.updateInfo={
          title:"",
          publishDate:"",
          content:"",
          id :"",
          publishId:"",
          publishName: "",
          bulletinType: "",
          notifyObject:"",
        }
      },
      show(index){
          this.visible = index
      },
      deleteBulletin(id){

        var requestBean = {bulletinId : id}
        var action = "deleteBulletin.action"
        
        this.$http.get(this.baseURL+action, requestBean)
        .then((data) => {
          if(data.code == "1"){
            this.showMasage(data.data, "success");
            this.refresh();
          }
          
        })
      },
      toPublish(){
        this.$bvModal.show('modal-publish');
      },
      publish(){
        var requestBean = {
          //  bulletinId : this.publishInfo.id,
           bulletinTitle : this.publishInfo.title,
           publishDate : new Date(),
           bulletinContent : this.publishInfo.content,
           publishId : this.userInfo.userId,
           publishName : this.userInfo.userName,
           bulletinType :  1,
           notifyObject :  1
        }
        var action = "addBulletin.action";
        console.log("requestBean",requestBean);
        this.$http.post(this.baseURL+action, requestBean)
        .then((data) => {
          if(data.code == "1"){
            this.showMasage(data.data, "success");
            this.clean();
            this.refresh();
          }
          
        })
      },
       toUpdateBulletin(id){
        this.$bvModal.show('modal-update');
        for(let i = 0; i < this.bulletinData.length; i++){
          if(this.bulletinData[i].id == id){
              this.updateInfo.id = this.bulletinData[i].id
              this.updateInfo.title = this.bulletinData[i].title
              this.updateInfo.publishDate = this.bulletinData[i].publishDate
              this.updateInfo.content = this.bulletinData[i].content
          }
        }
      },
      updateBulletin(){
        var requestBean = {
           bulletinId : this.updateInfo.id,
           bulletinTitle : this.updateInfo.title,
           publishDate :  new Date(),
           bulletinContent : this.updateInfo.content,
           publishId : this.userInfo.userId,
           publishName : this.userInfo.userName,
           bulletinType :  1,
           notifyObject :  1
        }
        var action = "updateBulletin.action";
        console.log("requestBean",requestBean);
        this.$http.post(this.baseURL+action, requestBean)
        .then((data) => {
          if(data.code == "1"){
            this.showMasage(data.data, "success");
            this.clean();
            this.refresh();
          }
          
        })
      },
      refresh(){
        var action = "getBulletin.action";
        this.$http.get(this.baseURL+action)
        .then((data) => {
          var temList = data.data;
          this.bulletinData = []
          for(let i = 0; i < temList.length; i++){
            this.bulletinData.push({
              id : temList[i].bulletinId,
              title: temList[i].bulletinTitle,
              publishDate: this.changeTimeFormat(temList[i].publishDate),
              content: temList[i].bulletinContent,
              publishId: temList[i].publishId,
              publishName: temList[i].publishName,
              bulletinType: temList[i].bulletinType,
              notifyObject: temList[i].notifyObject
            })
          }
        })
      } ,
      changeTimeFormat(timestamp){
            var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();

            var HH = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
            var MM = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
            return Y+M+D + "  " + HH + MM;
        },
              // 显示提示消息 √
        showMasage(msg, type){
            this.$message({
                showClose: true,
                duration:5000, //展示1000毫秒
                message: msg,
                type:type
            });
        }
    },
    created(){
      this.refresh();
    }
  }
</script>

<style>
    a{
        color: #7ac804;
    }
    .el-collapse-item__header{
        background-color: #20a8d8;
        color: white;
        font-size: medium;
        padding : 10px 15px;

        border-radius: 5px 5px 0px 0px;
    }

    .el-collapse-item__content{
        padding : 5px 15px 10px 15px;
        border: 1.5px solid #20a8d8;
        border-top: 0px;
    }
    .el-icon-message{
        margin-right: 5px;
    }

    .el-collapse{
        margin-bottom: 10px;
    }
</style>