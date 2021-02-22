<template>
<div>
    <!-- 卡片 -->
    <b-card  header-tag="header" border-variant="info" header-bg-variant="info" >
        <b-row slot="header" align-h="between">
            <div style="padding:5px 5px 5px 15px"><strong style="font-size : medium;">{{chosen_share.directoryName}}</strong></div>
            
        </b-row>

        <b-row>
            <div style="padding:5px 5px 5px 15px;font-size : medium;">文件夹描述：</div>
            <div style="padding:5px 5px 5px 15px"><p>{{chosen_share.directoryDescription}}</p></div>
        </b-row>

        <b-row>
            <b-col cols="12">
            <b-card  header-tag="header" border-variant="default" header-bg-variant="default" >
                <b-row slot="header" align-h="between">
                    <div style="padding-left:10px">{{chosen_share.directoryName}}</div>
                </b-row>

                <b-row>
                    <el-table
                    :data= "chosen_share.children[0].type === 'empty' ? empty:chosen_share.children"
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
                                        <el-dropdown-item v-if="scope.row.size === '/'" :command="1+','+scope.row.directoryId">无</el-dropdown-item>
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
            <div style="padding:5px 5px 5px 15px;font-size : medium;">共&nbsp;{{chosen_share.fileNum}}&nbsp;个共享文件,&nbsp;{{chosen_share.folderNum}}&nbsp;个共享文件夹</div>
        </b-row>
    </b-card>

</div>
</template>

<script>
  export default {
    props:{
        chosen_share:{default:{
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
            // console.log(this.chosen_share);
            this.$bvModal.show('modal-uploadFile');
        },
        // 上传文件
        uploadFile(){
            const requestBean = new FormData()
            requestBean.append('employeeId', this.file_add.employeeId)
            requestBean.append('directoryId', this.chosen_share.directoryId)
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
                employeeId:1,
                directoryId:this.chosen_share.directoryId
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
                directoryFather:this.chosen_share.directoryId,
                employeeId:1,
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
                directoryFather: this.chosen_share.directoryId,//父目录编号
                employeeId:1,//当前登陆员工编号
            }

            // console.log("addDirectory", this.directoryInfo_add)
        },

        // 删除目录
        deleteDirectory(){
            
            var requestBean = {
                directoryId : this.chosen_share.directoryId,//目录编号
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
            // console.log(this.chosen_share.directoryIshare);
            // console.log(this.chosen_share.directoryId,id,this.chosen_share.directoryId == id);
            if(this.chosen_share.directoryId === id){
                this.directoryInfo_update = {
                    directoryId: this.chosen_share.directoryId,
                    directoryName: this.chosen_share.directoryName,
                    directoryDescription: this.chosen_share.directoryDescription,
                    directoryIshare: this.chosen_share.directoryIshare
                }
            }
            else{
                for(let i = 0; i < this.chosen_share.children.length; i++){
                    if(this.chosen_share.children[i].directoryId == id){
                        this.directoryInfo_update = {
                            directoryId: this.chosen_share.children[i].directoryId,
                            directoryName: this.chosen_share.children[i].label,
                            directoryDescription: this.chosen_share.children[i].directoryDescription,
                            directoryIshare: this.chosen_share.children[i].Ishare
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
                        directoryId: this.chosen_share.directoryId,
                        directoryName: this.chosen_share.directoryName,
                        directoryDescription: this.chosen_share.directoryDescription,
                        directoryIshare: this.chosen_share.directoryIshare
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
            if(this.chosen_share.directoryIshare === 0){
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
        // console.log(this.chosen_share)
        this.cancelUpdateDirectory();
        this.cancelAddDirectory();
        this.cancelAddFile();
    }
  }  
</script>

<style lang="stylus" scoped>

</style>