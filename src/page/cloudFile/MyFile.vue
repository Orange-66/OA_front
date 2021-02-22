<template>
<div>
    <!-- 卡片 -->
    <b-card  header-tag="header" border-variant="info" header-bg-variant="info" >
        <b-row slot="header" align-h="between">
            <div style="padding:5px 5px 5px 15px"><strong style="font-size : medium;">{{chosen_own.directoryName}}</strong></div>
            
            <b-button-toolbar style="margin-right:15px">
                <b-button-group class="mx-1">
                    <b-button type="button" variant="primary" @click="toUpdateDirectory(chosen_own.directoryId)">修改信息</b-button>
                </b-button-group>
                <b-button-group class="mx-1">
                    <b-button type="button" variant="primary" @click="deleteDirectory">删除目录</b-button>
                </b-button-group>
                <b-button-group class="mx-1">
                    <b-button type="button" variant="success" @click="toAddDirectory">新建子目录</b-button>
                </b-button-group>
                <b-button-group class="mx-1">
                    <b-button type="button" variant="success" @click="toUploadFile">上传文件</b-button>
                </b-button-group>
            </b-button-toolbar >
        </b-row>

        <b-row>
            <div style="padding:5px 5px 5px 15px;font-size : medium;">文件夹描述：</div>
            <div style="padding:5px 5px 5px 15px"><p>{{chosen_own.directoryDescription}}</p></div>
        </b-row>

        <b-row>
            <b-col cols="12">
            <b-card  header-tag="header" border-variant="default" header-bg-variant="default" >
                <b-row slot="header" align-h="between">
                    <div style="padding-left:10px">{{chosen_own.directoryName}}</div>
                </b-row>

                <b-row>
                    <el-table
                    :data= "chosen_own.children[0].type === 'empty' ? empty:chosen_own.children"
                    class="m-1"
                    :row-style="{height:'45px'}"
                    :cell-style="{padding:'0px'}"
                    height="210"
                    >
                    <el-table-column
                        prop="label"
                        label="文件名"
                        align="center"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="size"
                        label="文件大小"
                        align="center"
                        >
                        <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            {{scope.row.size === "/" ? "/": scope.row.size+"MB"}}
                        </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="Ishare"
                        label="共享状态"
                        align="center"
                        >
                        <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <el-tag  :type="scope.row.Ishare === 0 ? '' : 'success'">{{scope.row.Ishare === 0 ? "未共享" : "已共享"}}</el-tag>
                        </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center"
                        >
                        <template slot-scope="scope">
                                <el-dropdown @command="handleCommand" size="small" split-button>
                                    操作
                                <el-dropdown-menu slot="dropdown" >
                                        <el-dropdown-item v-if="scope.row.size === '/'" :command="1+','+scope.row.directoryId">修改信息</el-dropdown-item>
                                        <el-dropdown-item v-if="scope.row.size === '/'" :command="2+','+scope.row.directoryId">删除目录</el-dropdown-item>
                                        <el-dropdown-item v-if="scope.row.size !== '/'" :command="3+','+scope.row.fileId">删除文件</el-dropdown-item>
                                        <el-dropdown-item v-if="scope.row.size !== '/'" :command="4+','+scope.row.fileId">下载文件</el-dropdown-item>
                                     
                                </el-dropdown-menu>
                                </el-dropdown>
                        </template>
                    </el-table-column>
                </el-table>
                </b-row>
            </b-card>
            </b-col>
        </b-row>

        <b-row slot="footer" align-h="between">
            <div style="padding:5px 5px 5px 15px;font-size : medium;">文件夹大小：{{chosen_own.size}}&nbsp;MB</div>
            
            <div style="margin-right:15px">

                <b-button-toolbar >
                    <el-tag  :type="chosen_own.directoryIshare === 0 ? '' : 'success'">{{chosen_own.directoryIshare === 0 ? "未共享" : "已共享"}}</el-tag>
                    <b-button-group class="mx-1">
                        <b-button type="button" variant="primary" size="sm" @click="shareLock(chosen_own.directoryId)">{{chosen_own.directoryIshare === 0 ? "设为共享" : "取消共享"}}</b-button>
                    </b-button-group>
                </b-button-toolbar >
            </div>
        </b-row>
    </b-card>

        <!-- 上传文件弹出框 -->
        <b-modal id="modal-uploadFile" title="上传文件" centered cancel-title="返回" ok-title="上传" @close="cancelAddFile"  @cancel="cancelAddFile" @ok="uploadFile">
            <form>
                <b-row >
                    <b-col cols="3" offset="1">
                    <p style="padding:6px 0px;">上传文件：</p>
                    </b-col>
                    <b-col cols="7">
                        <b-form-file
                        v-model="file_add.file"
                        aria-pressed="请选择上传文件"
                        browse-text="选择文件"
                        accept=".doc,.docx,.ppt,.pptx,.xlsx,.xls,image/*"
                        ></b-form-file>
                    </b-col>
                </b-row>
            </form>
        </b-modal>      

        <!-- 新建子目录弹出框 -->
        <b-modal id="modal-addDirectory" title="新建子目录" centered cancel-title="返回" ok-title="新建" @close="cancelAddDirectory"  @cancel="cancelAddDirectory" @ok="addDirectory">
            <form >
                <b-row >
                    <b-col cols="3" offset="1">
                    <p style="padding:6px 0px;">目录名称：</p>
                    </b-col>
                    <b-col cols="7">
                        <b-form-input v-model="directoryInfo_add.directoryName"></b-form-input>
                    </b-col>
                </b-row>
                <b-row  style="padding-bottom:10px">
                    <b-col cols="3" offset="1">
                    <p style="padding:6px 0px;">目录描述：</p>
                    </b-col>
                    <b-col cols="7">
                        <b-form-textarea
                        v-model="directoryInfo_add.directoryDescription"
                        rows="3"
                         maxlength="100"
                         no-resize
                        ></b-form-textarea>
                    </b-col>
                </b-row>
                <b-row >
                    <b-col cols="3" offset="1">
                    <p style="padding:6px 0px;">设置共享：</p>
                    </b-col>
                    <b-col cols="7">                        
                        <b-form-select v-model="directoryInfo_add.directoryIshare" :options="options"></b-form-select>  
                    </b-col>
                </b-row>
            </form>
        </b-modal>    

        <!-- 修改文件弹出框 -->
        <b-modal id="modal-updateDirectory" title="修改文件" centered cancel-title="返回" ok-title="保存" @close="cancelUpdateDirectory"  @cancel="cancelUpdateDirectory" @ok="updateDirectory">
            <form>
                <b-row >
                    <b-col cols="3" offset="1">
                    <p style="padding:6px 0px;">目录名称：</p>
                    </b-col>
            <b-col cols="7">
                       <b-form-input v-model="directoryInfo_update.directoryName"></b-form-input>
                    </b-col>
                </b-row>
                <b-row style="padding-bottom:10px">
                    <b-col cols="3" offset="1">
                    <p style="padding:6px 0px;">目录描述：</p>
                    </b-col>
                    <b-col cols="7">
                        <b-form-textarea
                        v-model="directoryInfo_update.directoryDescription"
                        rows="3"
                         maxlength="100"
                         no-resize
                        ></b-form-textarea>
                        <!-- <b-form-input v-model="chosen_own.directoryDescription"></b-form-input> -->
                    </b-col>
                </b-row>
                <b-row >
                    <b-col cols="3" offset="1">
                    <p style="padding:6px 0px;">设置共享：</p>
                    </b-col>
                    <b-col cols="7"> 
                        <b-form-select v-model="directoryInfo_update.directoryIshare" :options="options"></b-form-select>                       
                        <!-- <b-form-input v-model="chosen_own.directoryIshare"></b-form-input> -->
                    </b-col>
                </b-row>
            </form>
        </b-modal>      
</div>
</template>

<script>
  export default {
    props:{
        chosen_own:{default:{
            label:"文件名",
            directoryId: 1,
            directoryDescription: "中软云办公为您提供免费默认1G云空间，在您今后的工作生活中有机会增加容量。",
            directoryIshare: 0,
            employeeId: 1,
            directoryFather: 1,
            children: [],
            size: 0
        }},
        userInfo:{
        
            // userid:1,
            type: Object,
            required: true
        
        },

    },
    data() {
      return {
        //   根目录
          baseURL:"cloudFile_management/",
        empty:[],
        options:[
        { value: 0, text: '不共享' },
        { value: 1, text: '共享' },
        ],
        // modal框中的文件信息对象
        // 上传文件
        file_add:{
            
            employeeId:"",
            directoryId:"",
            file:"",
        },

        // 新建子目录
        directoryInfo_add:{
            directoryName:'',//目录名称
            directoryDescription:'', //目录描述
            directoryIshare:'', //共享与否
            directoryFather:'',//父目录编号
            employeeId:'',//当前登陆员工编号
        },

        // 修改目录信息
        directoryInfo_update:{
            directoryId:"",
            directoryName:"",
            directoryDescription:"",
            directoryIshare:""
        }
      }
        
    },
    methods:{
        handleCommand(command){
            var list=command.split(',');
            var type = list[0];
            var id = list[1];

            // console.log(typeof(type), id)
            switch(type) {
                case "1":
                    this.toUpdateDirectory(id);
                    break;
                case "2":
                    this.deleteDirectory(id);
                    break;
                case "3":
                    this.deleteFile(id);
                    break;
                case "4":
                    this.downloadFile(id);
                    break;
            }
        },

        // ---------------------------------------------------------------------------
        // 上传文件-modal
        toUploadFile(){
            // console.log(this.chosen_own);
            this.$bvModal.show('modal-uploadFile');
        },
        // 上传文件
        uploadFile(){
            const requestBean = new FormData()
            requestBean.append('employeeId', this.file_add.employeeId)
            requestBean.append('directoryId', this.chosen_own.directoryId)
            requestBean.append('file', this.file_add.file)
            console.log("uploadfile", requestBean)
            var action = "uploadFile.action"

            this.$http.post(this.baseURL+action, requestBean)
            .then((data) => {
                if(data.code === "1"){
                    this.showMasage(data.data, "success");
                }
                else{
                    this.showMasage(data.data, "error");
                }
                this.$parent.refreshPage();
            })
        },

        // 取消上传文件
        cancelAddFile(){
            this.file_add ={
                file:"",
                employeeId: this.userInfo.userID,
                directoryId:this.chosen_own.directoryId
            }
            // console.log("file_add", this.file_add)
        },

        // ---------------------------------------------------------------------------
        // 新建子目录-modal
        toAddDirectory(){
            this.$bvModal.show('modal-addDirectory');
        },

        // 新建子目录
        addDirectory(){
            var requestBean = {
                directoryName:this.directoryInfo_add.directoryName,
                directoryDescription:this.directoryInfo_add.directoryDescription, 
                directoryIshare:this.directoryInfo_add.directoryIshare, 
                directoryFather:this.chosen_own.directoryId,
                employeeId: this.userInfo.userID,
            }
            console.log("requestBena", requestBean)
            var action = "addDirectory.action"

            this.$http.post(this.baseURL+action, requestBean)
            .then((data) => {
                if(data.code === "1"){
                    this.showMasage(data.data, "success");
                }
                else{
                    this.showMasage(data.data, "error");
                }
                this.$parent.refreshPage();
            })
        },
        
        // 取消新建子目录
        cancelAddDirectory(){
            this.directoryInfo_add={
                directoryName:'',//目录名称
                directoryDescription:'', //目录描述
                directoryIshare:'', //共享与否
                directoryFather: this.chosen_own.directoryId,//父目录编号
                employeeId: this.userInfo.userID,//当前登陆员工编号
            }

            // console.log("addDirectory", this.directoryInfo_add)
        },

        // 删除目录
        deleteDirectory(){
            
            var requestBean = {
                directoryId : this.chosen_own.directoryId,//目录编号
                };
            var action = "deleteDirectory.action"

            this.$http.get(this.baseURL+action, requestBean)
            .then((data) => {
                if(data.code === "1"){
                    this.showMasage(data.data, "success");
                }
                else{
                    this.showMasage(data.data, "error");
                }
                this.$parent.refreshPage();
            })
        },

        // 删除文件信息
        deleteFile(id){
            var requestBean = {
                fileId  : id,//文件编号F
                };
            var action = "deleteFile.action"
            // console.log(requestBean.fileId);
            this.$http.get(this.baseURL+action, requestBean)
            .then((data) => {
                if(data.code === "1"){
                    this.showMasage(data.data, "success");
                }
                else{
                    this.showMasage(data.data, "error");
                }
                this.$parent.refreshPage();
            })
        },

        // ---------------------------------------------------------------------------
        // 修改文件-modal
        toUpdateDirectory(id){
            // console.log(this.chosen_own.directoryIshare);
            // console.log(this.chosen_own.directoryId,id,this.chosen_own.directoryId == id);
            if(this.chosen_own.directoryId === id){
                this.directoryInfo_update = {
                    directoryId: this.chosen_own.directoryId,
                    directoryName: this.chosen_own.directoryName,
                    directoryDescription: this.chosen_own.directoryDescription,
                    directoryIshare: this.chosen_own.directoryIshare
                }
            }
            else{
                for(let i = 0; i < this.chosen_own.children.length; i++){
                    if(this.chosen_own.children[i].directoryId == id){
                        this.directoryInfo_update = {
                            directoryId: this.chosen_own.children[i].directoryId,
                            directoryName: this.chosen_own.children[i].label,
                            directoryDescription: this.chosen_own.children[i].directoryDescription,
                            directoryIshare: this.chosen_own.children[i].Ishare
                        } 
                        break;
                    }
                }

            }
            
            this.$bvModal.show('modal-updateDirectory');

            // console.log(1,this.directoryInfo_update);
        },

        // 修改文件
        updateDirectory(){
            var requestBean = this.directoryInfo_update;
            var action = "updateDirectory.action"

            this.$http.post(this.baseURL+action, requestBean)
            .then((data) => {
                // console.log(data);
                if(data.code === "1"){
                    this.showMasage(data.data, "success");
                }
                else{
                    this.showMasage(data.data, "error");
                }
                this.$parent.refreshPage();
            })
        },

        // 取消修改文件
        cancelUpdateDirectory(){
            this.directoryInfo_update={
                        directoryId: this.chosen_own.directoryId,
                        directoryName: this.chosen_own.directoryName,
                        directoryDescription: this.chosen_own.directoryDescription,
                        directoryIshare: this.chosen_own.directoryIshare
                    }
        },

        // 下载文件
        downloadFile(id){
            var requestBean = {
                fileId   : id,//文件编号
                };
            var action = "downloadFile.action"

            this.$http.get(this.baseURL+action, requestBean)
            .then((data) => {
                if(data.code === "1"){
                    this.showMasage("下载成功", "success");
                    window.open(data.data, '_blank');
                }
                else{
                    this.showMasage("下载失败", "error");
                }
                this.$parent.refreshPage();
            })
        },
        // 获取当前目录大小
        getDirectorySize(){
            var requestBean = {
                directoryId :"",//目录编号
                };
            var action = "getDirectorySize.action"

            this.$http.get(this.baseURL+action, requestBean)
            .then((data) => {
                if(data.code === "1"){
                    this.showMasage(data.data, "success");
                }
                else{
                    this.showMasage(data.data, "error");
                }
                this.$parent.refreshPage();
            })
        },

        // ---------------------------------------------------------------------------
        // 共享
        shareLock(id){
            if(this.chosen_own.directoryIshare === 0){
                this.changeShare(id);
            }
            else{
                this.cancelShare(id);
            }
        },
        // 设为共享
        changeShare(id){
            var requestBean = {
                directoryId : id,//目录编号
                };
            var action = "changeShare.action"

            this.$http.get(this.baseURL+action, requestBean)
            .then((data) => {
                if(data.code === "1"){
                    this.showMasage(data.data, "success");
                }
                else{
                    this.showMasage(data.data, "error");
                }
                this.$parent.refreshPage();
            })
        },
        // 取消共享
        cancelShare(id){
            var requestBean = {
                directoryId :id,//目录编号
                };
            var action = "cancelShare.action"

            this.$http.get(this.baseURL+action, requestBean)
            .then((data) => {
                if(data.code === "1"){
                    this.showMasage(data.data, "success");
                }
                else{
                    this.showMasage(data.data, "error");
                }
                this.$parent.refreshPage();
            })
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
        }
    },
    created(){
        // console.log(this.chosen_own)
        this.cancelUpdateDirectory();
        this.cancelAddDirectory();
        this.cancelAddFile();
    }
  }  
</script>

<style lang="stylus" scoped>

</style>