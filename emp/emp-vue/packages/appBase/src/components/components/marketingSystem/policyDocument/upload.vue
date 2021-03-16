<template>
<div class="app-container calendar-list-container">
  <el-row :gutter="10">
      <el-col :span="4" class="f-mt10">
<el-card class="box-card">
     <div slot="header" class="clearfix">
    <span>政策分类</span>
    
  </div>
  <div :style="'height:'+(scrollbarHeight-5)+'px'">
          <el-scrollbar >
      <el-tree class="filter-tree  nobd" :data="treeData" node-key="id" highlight-current 
      :props="defaultProps"  ref="menuTree" 
      @node-click="getNodeData" >
      </el-tree>
      </el-scrollbar>
      </div>
 </el-card>
      </el-col>
      <el-col :span="15" class="f-mt10 col-r">
           <el-card class="box-card" :style="'height:'+(scrollbarHeight+40)+'px'">

        <div class="filter-container ">
          <el-input @keyup.enter.native="searchFile" style="width: 200px;" class="filter-item" placeholder="检索文件" v-model="listPageInfo.key"> </el-input>
          <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="searchFile">搜索</el-button>
          <el-button class="filter-item"  style="margin-left: 10px;" @click="add" type="primary" icon="add">添加</el-button>
        </div>
        <el-table class="" :key='tableKey' :data="pageList" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
          <!-- <el-table-column align="center" label="序号" width="65" type="index" fixed> 
          </el-table-column> -->
          <el-table-column
            prop="index"
            label="序号"
            align="center"
            width="70px"
            >
          </el-table-column> 
          <el-table-column width="110" align="center" label="文件名称" >
            <template slot-scope='scope'>
                <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column width="110" align="center" label="图标">
                <template slot-scope='scope'>
                  <span>{{scope.row.username}}</span>
                </template>
          </el-table-column>
          <el-table-column width="60" align="center" label="类型">
          <template slot-scope='scope'>
                  <span>{{scope.row.sex}}</span>
                </template> 
        </el-table-column>
         <el-table-column  align="center" label="发布时间">
            <template slot-scope='scope'>
               <span>{{scope.row.createTime}}</span>
            </template>
        </el-table-column> 
          <el-table-column align="center" label="操作" width="140" > <template slot-scope='scope'>
              <el-button  size="small" type="text" @click="edit(scope.row)">编辑
              </el-button>
              <el-button   size="small" type="text" @click="down(scope.row)">下载
              </el-button>
              <el-button   size="small" type="text" @click="view(scope.row)">预览
              </el-button>
            </template> </el-table-column>
        </el-table>
      
        <div  class="pagination-container">
          <el-pagination @size-change="setPageSize" @current-change="showPage" :current-page.sync="listPageInfo.page" :page-sizes="[10,20,30, 50,100,200,500,1000]" :page-size="listPageInfo.limit" layout="total, sizes, prev, pager, next, jumper" :total="listPageInfo.total"> </el-pagination>
        </div>

        </el-card>
      </el-col>
    <el-col :span="5" class="f-mt10 col-r">
    <el-card class="box-card">
     <div slot="header" class="clearfix">
    <span>文件属性</span>
    
  </div>
  <div :style="'height:'+(scrollbarHeight-5)+'px'">
          <el-scrollbar >
     <div class="fileInfo">
            <el-row>
              <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">文件路径</el-col>
              <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">{{documentInfo.filePath}}</el-col>
            </el-row>
               <el-row>
              <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">系统编号</el-col>
              <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">{{documentInfo.filePath}}</el-col>
            </el-row>
               <el-row>
              <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">文件名称</el-col>
              <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">{{documentInfo.name}}</el-col>
            </el-row>
               <el-row>
              <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">发布机构</el-col>
              <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">{{documentInfo.publishMechName}}</el-col>
            </el-row>
               <el-row>
              <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">发布省份</el-col>
              <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">{{documentInfo.publishProName}}</el-col>
            </el-row>
               <el-row>
              <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">文件大小</el-col>
              <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">{{documentInfo.size}}</el-col>
            </el-row>
               <el-row>
              <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">创建人</el-col>
              <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">{{documentInfo.userName}}</el-col>
            </el-row>
               <el-row>
              <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">创建时间</el-col>
              <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">{{documentInfo.createTime}}</el-col>
            </el-row>
               <el-row>
              <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">审批状态</el-col>
              <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">{{documentInfo.examState}}</el-col>
            </el-row>
               <el-row>
              <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"> 审批人</el-col>
              <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">{{documentInfo.examUser}}</el-col>
            </el-row>
              <el-row>
              <el-col :xl="24"> 文件解读</el-col>
              <el-col  :xl="24"><div>{{documentInfo.remark}}</div></el-col>
            </el-row>
        </div>
      </el-scrollbar>
      </div>
 </el-card>
       
    </el-col>
    </el-row>
  <el-dialog :close-on-click-modal="false" :title="dialogInfo.title" :visible.sync="dialogInfo.visible" custom-class="w480" :lock-scroll='true'>
    <el-row>
      <el-col :span="24" class="f-mt10">
        <el-form :model="form"   ref="form" label-width="80px">
          <el-form-item label="文件类型">
           <el-select v-model="form.fileType" >
            <el-option
              v-for="item in fileTypes"
              :key="item.propCode"
              :label="item.propName"
              :value="item.propCode"
            >
            </el-option>
          </el-select>
           </el-form-item>
           <el-form-item label="上传附件">
              <span
                v-if="file_rode"
                class="fileName"
              ><a
                  href="#"
                  :title="fileInfo.name"
                  :data-title="fileInfo.path"
                >{{fileInfo.name}}</a></span>
              <span
                class="delFile"
                v-if="!uploadInfo.uploadBtn"
                @click="showUpload"
              ><i class="el-icon-close"></i></span>
              <el-upload
                class="upload-demo"
                ref="uploadFileAdd"
                action="/api/customer/khCustomerVisit/uploadFile"
                :show-file-list="uploadInfo.file_name"
                :before-upload="before_upload"
                :headers="uploadInfo.uplaodHeaders"
                :on-change="fileChange"
                :auto-upload="false"
                :on-success="uploadCb"
                :limit="uploadInfo.limit"
                :on-progress="uploadCb"
              >

                <el-button
                  slot="trigger"
                  size="small"
                  type="primary"
                  v-if="uploadInfo.uploadBtn"
                >选取文件</el-button>

              </el-upload>
              <!-- <el-input v-model="form.storagePath"></el-input> -->
            </el-form-item>
           <el-form-item class="nofloat" label="发布地区" prop="publishProCode">
              <el-select class="four-col left" v-model="form.publishProCode" placeholder="请选择" >
                    <el-option 
                    v-for="item in publishPros" 
                    :key="item.propCode"  
                    :label="item.propName" 
                    :value="item.propCode"   
                    >
                    </el-option>
                </el-select>
            </el-form-item>
          <el-form-item class="nofloat" label="发布机构" prop="publishMechCode">
              <el-select class="four-col left" v-model="form.publishMechCode" placeholder="请选择" >
                    <el-option 
                    v-for="item in publishMechs" 
                    :key="item.propCode"  
                    :label="item.propName" 
                    :value="item.propCode"   
                    >
                    </el-option>
                </el-select>
            </el-form-item>
                     <el-form-item class="nofloat" label="阅读范围" prop="readScope">
              <el-select class="four-col left" v-model="form.readScope" placeholder="请选择" >
                    <el-option 
                    v-for="item in readScopes" 
                    :key="item.propCode"  
                    :label="item.propName" 
                    :value="item.propCode"   
                    >
                    </el-option>
                </el-select>
            </el-form-item>
              <el-form-item label="发布时间">
          <el-date-picker
            @change="getCreateTime"
            type="date"
            placeholder="日期选择"
            style="width:200px;"
            v-model="form.createTime"
          >
          </el-date-picker>
        </el-form-item>
          <el-form-item label="政策解读">
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入内容" v-model="form.remark"> </el-input>
          </el-form-item>
        </el-form> 
      
      </el-col>

    </el-row>
    <div  slot="footer" class="dialog-footer" align="right">
          <el-button @click="cancel('form')" class="btn-cancel">取 消</el-button>
          <el-button   class="btn-save" @click="save()">确 定</el-button>
        </div>
  </el-dialog>
  
  <el-dialog :close-on-click-modal="false" title="查看文件" :visible.sync="viewsDialog" custom-class="w480" :lock-scroll='true'>
    <el-row>
      <el-col :span="24" class="f-mt10">
       <Views  :pdfUrl="pdfUrl" ></Views>
      
      </el-col>

    </el-row>
    <div  slot="footer" class="dialog-footer" align="right">
          <el-button   class="btn-save" @click="closeModal">确 定</el-button>
        </div>
  </el-dialog>
</div>
</template>

<script>
import {getTree,add,update,getList} from '@common/api/marketingSystem/policyDocument/index';
import initTree from '@common/components/marketingSystem/policyDocument/components/tree';
import {getToken } from "@common/utils/auth";
import {mapGetters } from 'vuex';
import {initLayout} from '@common/utils/init';
import {parseTime} from '@common/utils/index';
// import {Views} from "@common/components/marketingSystem/policyDocument/components";
import {getSelectList} from '@common/api/base';
export default {
  name: 'upload',
  components: {
    Views: () => import("./components/Views")
  },
  data() {
    return {
      scrollbarHeight:"",
      publishPros:[],
      publishMechs:[],
      readScopes:[],
      pdfUrl:"111",
      viewsDialog:false,
      file_rode: false,
      dialogInfo:{
        title:"添加政策法规",
        visible:false,
        status:"add"

      },
      uploadInfo:{
        uplaodHeaders:{},
        uploadBtn:true,
        limit:1,
        total:0,
        file_name:""
      },
      treeData: [],//树的数据
      defaultProps: {
        children: "children",
        label: "label"
      },
      pageList:[],
      listPageInfo:{
        page:1,
        type:"",
        limit:10,
        key:""
      },
      fileTypes:[],
      form: {
         filePath:"",   //文件路径    //例子：电力市场-->政策文件
         name:"",   //文件名称
         publishMechCode:"",    //发布机构编码
         publishMechName:"",    //发布机构名称
         publishProCode:"",    //发布省份编码
         publishProName:"",    //发布省份名称
         size:"",    // 文件大小
         userCode:"",    // 用户code
         userName:"",    //用户名称
         createTime:"",    //发布时间
         examState:"",    //审核状态 未审批 1 已审批 2 驳回 3'
         examUser:"",    // 审核人
         storagePath:"",    //存储路径
         remark:"",    //政策解读
         readScope:"",    // 阅读范围
         fileType:"",    //文件类型
      },
      rules: {
      },
      documentInfo: {
         filePath:"",   //文件路径    //例子：电力市场-->政策文件
         name:"",   //文件名称
         publishMechCode:"",    //发布机构编码
         publishMechName:"",    //发布机构名称
         publishProCode:"",    //发布省份编码
         publishProName:"",    //发布省份名称
         size:"",    // 文件大小
         userCode:"",    // 用户code
         userName:"",    //用户名称
         createTime:"",    //发布时间
         examState:"",    //审核状态 未审批 1 已审批 2 驳回 3'
         examUser:"",    // 审核人
         storagePath:"",    //存储路径
         remark:"",    //政策解读
         readScope:"",    // 阅读范围
         fileType:"",    //文件类型
      }, 
      listLoading:false,
      documentId:"",
      tableKey: 0,
      treeDataAll:[]

  }
 },
  created() {
    this.init();
  },
  computed: {
    ...mapGetters([
      'elements'
    ])
  },
  methods: {
     init(){
      this.getTreeList();
       this.scrollbarHeight = initLayout()-120        //document.body.clientWidth;
      window.onresize = function temp() {
        this.scrollbarHeight = initLayout()-120;
      };
      this.uploadInfo.uplaodHeaders = {
        Authorization: getToken()
      };
      this.getProCode();
      this.getMechCode();
      this.getReadScope();
      this.getDocTypes();
      this.initPageList();
    },
    getCreateTime(){

    },
    add(){
      this.dialogInfo.title="添加政策法规";
      this.dialogInfo.status="add";
       this.dialogInfo.visible=true;
    },
    edit(data){
       this.dialogInfo.title="编辑政策法规";
       this.dialogInfo.status="edit"
         this.dialogInfo.visible=true;
    },
    view(){
      this.pdfUrl="baidu.com"
      this.viewsDialog=true;
    },
    closeModal () {
       this.viewsDialog = false
    },
    down(){

    },
    submitSave() {
      let _this = this;
      set["form"].validate(valid => {
        if (valid) {
          if (typeof this.form.storagePath == "undefined") {
            if (this.fileInfo.name === "") {
              this.save();
            } else {
              set.uploadFileAdd.submit();
            }
          } else {
            if (this.fileInfo.path === this.form.storagePath) {
              this.save();
            } else {
              set.uploadFileAdd.submit();
            }
          }
        } else {
          return false;
        }
      });
    },
    setPageSize(num){
      this.listPageInfo.limit=num;
      this.listPageInfo.page=1;
      this.getList();

    },
    searchFile(){
      this.listPageInfo.page=1;
      this.getList();
    },
    showPage(num){
      this.listPageInfo.page=num;
      this.getList();
    },
    showDocuentInfo(data){
      for(let key in this.documentInfo){
          this.documentInfo[key]=data[key]
      }
    },
    getTreeList(){
       this.treeData = initTree.data;
       this.setTreeDataAll(this.treeData);
    },
    setTreeDataAll(data){
      data.map((item)=>{
          if(item.children.length>0){
            this.setTreeDataAll(item.children);
          }
          this.treeDataAll.push({id:item.id,label:item.label,parentId:item.parentId});
      });
    },
    setFilePath(id){
      let filePath=[];
      this.treeDataAll.map((item)=>{
          if(item.id=="filePath"){
             if(item.parentId!="-1"){

             }
          }

      });

    },
    getDocTypes() {
               getSelectList("file_type").then(res => {
            let firstList={
              propName:"--请选择--",
            }
            res.unshift(firstList);
            this.fileTypes = res;
          });
    },
    initPageList(){
      this.listPageInfo.page=1;
      this.getList();
    },
    getList() {
      this.listLoading = true;
      let param={};
          param.page=this.listPageInfo.page;
          param.limit=this.listPageInfo.limit;
        if(this.listPageInfo.key!=""){
           param.key=this.listPageInfo.key;
        }
        // console.log(param)
        getList(param).then(response => {
            let items= response.data.rows.map((item,index) =>{ 
                item.index = (index+1)+(this.listPageInfo.page-1)*this.listPageInfo.limit ;  
                return  item
            }) ;
            this.listLoading = false;
            this.pageList=items;
            this.documentInfo =items[0];
            this.listPageInfo.total = response.data.total;         
        })   
      
     
    },
    getMechCode() {
                getSelectList("publish_mech").then(res => {
            let firstList={
              propName:"--请选择--",
            }
            res.unshift(firstList);
            this.publishMechs = res;
          });
     
    },
    getProCode() {
          getSelectList("province").then(res => {
            let firstList={
              propName:"--请选择--",
            }
            res.unshift(firstList);
            this.publishPros = res;
          });
     
    },
    getReadScope(){
          getSelectList("read_scope").then(res => {
            let firstList={
              propName:"--请选择--",
            }
            res.unshift(firstList);
            this.readScopes = res;
          });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getNodeData(data) {   /*点击树 */ 
      this.listPageInfo.type=data.id;
      this.initPageList();
    },
    fileChange(file, fileList) {
      let existFile = fileList
        .slice(0, fileList.length - 1)
        .find(f => f.name === file.name);
      this.fileInfo.name = file.name;
      this.fileInfo.path = "";
      this.file_rode = true;
      this.uploadInfo.uploadBtn = false;
    },
    save() {
      if (this.dialogInfo.status=="add") {
        // console.log(this.form);
        add(this.form)
          .then(() => {
            this.dialogInfo.visible = false;
            this.getList();
          })
          .then(res => {
            if (res.rel) {
              this.$notify({
                title: "成功",
                message: res.msg,
                type: "success",
                duration: 2000
              });
              this.initPageList();
            } else {
              this.$notify({
                title: "失败",
                message: res.msg,
                type: "warning",
                duration: 2000
              });
            }
          });
      } else {
        update(this.documentId, this.form).then(res => {
          this.dialogInfo.visible = false;
          if (res.rel) {
            this.$notify({
              title: "成功",
              message: res.msg,
              type: "success",
              duration: 2000
            });
             this.initPageList();
          } else {
            this.$notify({
              title: "失败",
              message: res.msg,
              type: "warning",
              duration: 2000
            });
          }
        });
      }
    },
    cancel(formName) {
      this.dialogInfo.visible = false;
      this.$refs[formName].resetFields();
    },
    getNodeDataSub(data){//获取的点击树的节点
      this.form.orgId = data.id;
    },
   showUplaodFile(data) {
      let file = data;
      let fileArr = file.split("/");
      this.fileInfo.path = data;
      this.fileInfo.name = fileArr[fileArr.length - 1];
    },
    showUpload(){
      this.$refs.uploadFileAdd.clearFiles();
      this.fileInfo.name = "";
      this.uploadInfo.uploadBtn = true;
    },
    before_upload(){

    },
   uploadCb(response, file, fileList) {
      if (response.rel) {
        this.form.storagePath = response.data.filePath;
        this.showUplaodFile(this.form.storagePath);
        this.form.visitDate = this.visitDate;
        this.save();
      } else {
        this.$notify({
          title: "失败",
          message: res.msg,
          type: "warning",
          duration: 2000
        });
      }
    },
  }
}
</script>
<style type="text/css">
  .fileInfo{font-size: 12px;line-height: 32px;}
</style>