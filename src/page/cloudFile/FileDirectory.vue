<template>
    <!-- 卡片 -->
    <b-card  header-tag="header" border-variant="default" style="height : 100%" header-bg-variant="default">
        <div slot="header" align="center">
            <strong style="font-size:18px">云文件目录</strong>
        </div>
        <b-row>
            <b-col cols="3">
                <div role="tablist">
                  <div v-if="info_lock">
                    <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                        <b-button block v-b-toggle.accordion-1 variant="primary" @click="toShowFile(true)">我的云目录</b-button>
                    </b-card-header>
                    <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <el-tree :data="directory_own"  @node-click="handleNodeClick"></el-tree>
                        </b-card-body>
                    </b-collapse>
                    </b-card>
                  </div>
                    <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                        <b-button block v-b-toggle.accordion-2 variant="primary" @click="toShowFile(false)">我的云共享</b-button>
                    </b-card-header>
                    <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                        <el-tree :data="directory_share" @node-click="handleNodeClick"></el-tree>
                        </b-card-body>
                    </b-collapse>
                    </b-card>
                </div>
            </b-col>
            <b-col cols="9">
                <div v-show="showFile"><MyFile :userInfo=userInfo :chosen_own=chosen_own></MyFile></div>
                <div v-show="!showFile"><MyShare  :userInfo=userInfo :chosen_share=chosen_share></MyShare></div>
            </b-col>
        </b-row>
    </b-card>
</template>

<script>
import MyFile from '@/page/cloudFile/MyFile'
import MyShare from '@/page/cloudFile/MyShare'
  
  export default {
    components:{
        MyFile,
        MyShare
    },
    props:{
      userInfo:{
        
            // userid:1,
            type: Object,
            required: true
        
        },
        info_lock:{default:true}
    },
    data() {
      return {
        //   根目录
          baseURL:"cloudFile_management/",
          showFile: true,
        directory_own: [{
            label: '我的云文件',
            type: "folder",
            directoryId: 1,
            directoryDescription: "中软云办公为您提供免费默认1G云空间，在您今后的工作生活中有机会增加容量。",
            directoryIshare: 0,
            employeeId: this.userInfo.userID,
            directoryFather: 1,
            children: [{}]
        }],
        directory_share: [{
          label: '我的云共享',
          url:"home",
          children: [{}]
        }],

        chosen_own:{
            direcotryName:"文件名",
            directoryId: 1,
            directoryDescription: "中软云办公为您提供免费默认1G云空间，在您今后的工作生活中有机会增加容量。",
            directoryIshare: 0,
            employeeId: this.userInfo.userID,
            directoryFather: 1,
            directory: [],
            size: 0
        },
        chosen_share:{
            direcotryName:"文件名",
            directoryId: 1,
            directoryDescription: "中软云办公为您提供免费默认1G云空间，在您今后的工作生活中有机会增加容量。",
            directoryIshare: 0,
            employeeId: this.userInfo.userID,
            directoryFather: 1,
            directory: [],
            fileNum: 0,
            folderNum: 0,
        }
      };
    },
    methods: {

      // 刷新页面
      refreshPage(){
        var requestBean = {employeeId : this.userInfo.userID};
        var action;
        if(this.showFile){
          action = "getDirectory.action"
        }
        else{
          action = "getShare.action"
          // action = "getDirectory.action"
        }
        this.$http.get(this.baseURL+action, requestBean)
        .then((data) => {
          console.log(123123123,data.data)
          // console.log(data.data)
            if(this.showFile){
              if(data.data[0].length == 0){
                this.directory_own = [{
                      label: '#空文件夹',
                      type: "empty",
                  }]
                  this.chosen_own = {
                    directoryName: "#空文件夹",
                    type: "empty",
                    children:[{type:"empty"}]
                }
                  return
              }
              this.directory_own = this.findDirectory(data.data)
              this.handleNodeClick(this.directory_own[0])
            }
            else{
               if(data.data[0].length == 0){
                this.directory_share = [{
                      label: '#空文件夹',
                      type: "empty",
                  }]
                  this.chosen_share = {
                    directoryName: "#空文件夹",
                    type: "empty",
                    directoryDescription:"无",
                    children:[{type:"empty"}],
                    fileNum:0,
                    folderNum:0
                }
                  return
              }
              this.directory_share = this.findDirectory(data.data)
              this.handleNodeClick(this.directory_share[0])
              // this.deleteEmptyFolder(this.directory_share[0]);
              console.log("this.directory_share",this.directory_share);
              console.log("this.directory_share[0]",this.directory_share[0]);
            }
            
        })
      },

      // deleteEmptyFolder(node){
      //   for(let i = node.children.length-1; i === 0 ; i--){
      //     if(node.children[i].type === "folder"){
      //       if(node.children[i].children.length === 1 && node.children[i].children[0].type === "empty"){
      //         node.children.splice(i, 1);
      //       }
      //     }
      //   }

      //   for(let i = 0; i < node.children.length ; i++){
      //     if(node.children[i].type === "folder"){
      //       this.deleteEmptyFolder(node.children[i])
      //     }
      //   }
        
        
      // },

      // 处理点击节点时间从而转换页面右侧的该文件下的详细信息
      handleNodeClick(data) {
        console.log("data",data);
        if(data.type === "folder"){
            if(this.showFile){

                var requestBean = {directoryId  : data.directoryId};
                var action = "getDirectorySize.action"
                this.$http.get(this.baseURL+action, requestBean)
                .then((res) => {
                    if(res.code == 1){
                      
                      this.chosen_own={
                      directoryId: data.directoryId,
                      directoryName: data.label,
                      directoryDescription: data.directoryDescription,
                      directoryIshare: data.Ishare,
                      employeeId: data.employeeId,
                      directoryFather: data.directoryFather,
                      fileName: data.label,
                      children: data.children,
                      size: (res.data / (1024*1024)).toFixed(2)
                  }
                    }
                })
                
                // console.log(this.chosen_own);
            }
            else{
                
                var fileNum = 0;
                var folderNum = 0;
                for(let i = 0; i < data.children.length; i++){
                    if(data.children[i].type === "file"){
                        fileNum += 1
                    }
                    if(data.children[i].type === "folder"){
                        folderNum += 1
                    }
                }

                this.chosen_share={
                    directoryId: data.directoryId,
                    directoryName: data.label,
                    directoryDescription: data.directoryDescription,
                    directoryIshare: data.Ishare,
                    employeeId: data.employeeId,
                    directoryFather: data.directoryFather,
                    children: data.children,
                    // size: folderSize,
                    fileName: data.label,
                    directory: data.children,
                    fileNum: fileNum,
                    folderNum: folderNum,
                    direcotryName: data.label
                }

                console.log("chosen_share",this.chosen_share);
            }
        }
      },

      toShowFile(lock){
        if(this.showFile !== lock){
            this.showFile = lock
            this.refreshPage();
        }
      },


        // 制作目录需要的节点格式
      findDirectory(data){
        //   分别获取文件以及目录的所有信息
          var directoryList = data[0];
          var fileList = data[1];
          var directory = [];
        // 最终我们要放在directory这个list中，其中这个list的头节点是根节点，及长度为1其余所有都是root的children
          directory.push(this.changeDirectory(directoryList[0]));
          
          var fatherNode = "";
          for(var i = 0; i < directoryList.length; i++){

                fatherNode = this.findNextFatherNode(directory[0], directoryList[i].directoryId);

                // console.log("fatherNode",fatherNode);
                // 遍历文件中的fatherid与该父节点的id号相同的文件与目录
                var id = fatherNode.directoryId
                var childrenFile = this.findChildrenFile(fileList, id)
                var childrenDirectory = this.findChildrenDirectory(directoryList, fatherNode.directoryId)
                this.pushChildren(fatherNode, childrenFile);
                this.pushChildren(fatherNode, childrenDirectory);
                
         }

          // console.log("@@@@@",directory);
          return directory;
      },

    // 找到下一个父节点
      findNextFatherNode(node, id){
        // console.log("nodeid",node,id);
        if(node.type === "folder"){
          if( node.directoryId === id){
                  // console.log("node",node);

                    return node;
          }
          // console.log("fatherandNode",node, id)
            for(var i = 0; i < node.children.length; i++){
                // console.log("#",node.children[i].type,node.children[i].type == "folder",node.children[i].type === "folder", typeof(node.children[i].type));

                var result = this.findNextFatherNode(node.children[i], id)
                if(result !== undefined){
                  return result;
                }

            }
        }
      },

        // 将孩子节点放入父节点的children这个list中
      pushChildren(fatherNode, dataList){
        if(dataList.length > 0 && fatherNode.children.length === 1 && fatherNode.children[0].type === "empty"){
          fatherNode.children = [];
        }
        for(var i = 0; i < dataList.length; i++){
          fatherNode.children.push(dataList[i]);
        }
      },

        // 找到所有孩子节点
        // 从文件中找到所有孩子节点
      findChildrenFile(fileList, id){
        var temList = [];
        // if(this.showFile){
          for(let i = 0; i < fileList.length; i++){
              if(fileList[i].directoryId === id){
                  temList.push(this.changeFile(fileList[i]));
              }
          }
        // }
        // else{
        //   for(let i = 0; i < fileList.length; i++){
        //     if(fileList[i].directoryId === id && fileList[i].Ishare === 1){
        //         temList.push(this.changeFile(fileList[i]));
        //     }
        // }
        // }


        return temList;
      },

        //从目录中超导所有孩子节点 
      findChildrenDirectory(directoryList, id){
        var temList = [];
        for(var i = 0; i < directoryList.length; i++){
            if(directoryList[i].directoryFather === id){
                temList.push(this.changeDirectory(directoryList[i]));
            }
        }

        return temList;
      },


        // 改变后端传过来的item级别的数据格式
        // 目录
      changeDirectory(directory){
        var returnBean = {
            label: directory.directoryName,
            type: "folder",
            directoryId: directory.directoryId,
            directoryDescription: directory.directoryDescription,
            Ishare: directory.directoryIshare,
            employeeId: directory.employeeId,
            directoryFather: directory.directoryFather,
            size: "/",
            children:[{
                label: "#空文件夹",
                type: "empty",}]
        }

        return returnBean;
      },

        // 文件
      changeFile(file){
        var returnBean = {
            label: file.fileName,
            type: "file",
            fileId: file.fileId,
            directoryId: file.directoryId,
            Ishare: file.fileIshare,
            fileAddress: file.fileAddress,
            employeeId: file.employeeId,
            size: (file.fileSize/(1024*1024)).toFixed(2)
        }

        return returnBean;
      },

    },
    created(){
       this.refreshPage();
    }
        
    
  }  
  
</script>

<style scoped>
body{
    height : 100%
}
</style>