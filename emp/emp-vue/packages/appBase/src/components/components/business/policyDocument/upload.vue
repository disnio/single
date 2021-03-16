<!--
 * @功能描述: 
 * @版本: 
 * @作者: 
 * @Date: 2019-10-31 16:27:05
 * @最新修改内容: 
 * @LastEditTime: 2020-08-25 14:30:06
 -->
<template>
  <div class="app-container calendar-list-container">
    <el-row :gutter="10">
      <el-col :span="4" class="f-mt10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>政策分类</span>
          </div>
          <div :style="'height:'+(scrollbarHeight-5)+'px'">
            <el-scrollbar>
              <el-tree
                class="filter-tree nobd"
                :data="treeData"
                highlight-current
                :props="defaultProps"
                ref="menuTree"
                @node-click="getNodeData"
              ></el-tree>
            </el-scrollbar>
          </div>
        </el-card>
      </el-col>
      <el-col :span="15" class="f-mt10 col-r">
        <el-card class="box-card">
          <div :style="'height:'+(scrollbarHeight+25)+'px'">
            <el-scrollbar>
              <div class="filter-container">
                <el-form
                  :inline="true"
                  :model="listPageInfo"
                  label-width="80px"
                  class="demo-form-inline form-inline-168"
                >
                  <!-- 李志佳 添加查询组件 2020年2月4日13:45:47 start -->
                  <QueryCriteria @select="selectQuery(arguments)" @init="initQuery"></QueryCriteria>
                  <el-form-item label="检索文件">
                    <el-input v-model="listPageInfo.name" placeholder="检索文件" style="width:160px"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="searchFile" icon="el-icon-search">查询</el-button>
                  </el-form-item>
                  <!-- 李志佳 添加查询组件 2020年2月4日13:45:47 end -->
                </el-form>
              </div>

              <el-row :gutter="10" class="f-mb10">
                <el-col :span="16">
                  <el-button class="filter-item f-mr" @click="add" type="primary" icon="upload">上传</el-button>
                  <!-- <el-button class="filter-item f-mr"    @click="viewsDoc" type="primary" icon="view">预览</el-button>
                  <el-button class="filter-item f-mr"   @click="down" type="primary" icon="caret-bottom">下载</el-button>-->
                </el-col>
              </el-row>
              <el-table
                class
                @row-click="showDocumentInfo"
                :data="pageList"
                v-loading.body="listLoading"
                border
                fit
                highlight-current-row
                style="width: 100%"
              >
                <!-- <el-table-column align="center" label="序号" width="65" type="index" fixed> 
                </el-table-column>-->
                <el-table-column prop="index" label="序号" align="center" width="48"></el-table-column>
                <el-table-column align="center" label="文件名称">
                  <template slot-scope="scope">
                    <div class="txt-left">{{scope.row.name}}</div>
                  </template>
                </el-table-column>
                <el-table-column width="50" align="center" label="类型">
                  <template slot-scope="scope">
                    <span v-if="scope.row.fileType=='txt'">
                      <img :src="txt" alt="txt" height="24" />
                    </span>
                    <span v-if="scope.row.fileType=='pdf'">
                      <img :src="pdf" alt="txt" height="24" />
                    </span>
                    <span
                      v-if="scope.row.fileType=='docx'||scope.row.fileType=='doc'||scope.row.fileType=='word'"
                    >
                      <img :src="word" alt="txt" height="24" />
                    </span>
                  </template>
                </el-table-column>

                <el-table-column width="100" align="center" label="发布时间">
                  <template slot-scope="scope">
                    <span>{{scope.row.publishTime}}</span>
                  </template>
                </el-table-column>
                <el-table-column width="80" align="center" label="状态">
                  <template slot-scope="scope">
                    <span>{{scope.row.examStateName}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="140">
                  <template slot-scope="scope">
                    <el-button
                      v-if="scope.row.examState!='9'&&scope.row.examState!='3'&&scope.row.examState!='10'"
                      size="small"
                      type="text"
                      @click="edit(scope.row)"
                    >编辑</el-button>
                    <el-button size="small" type="text" @click="down(scope.row)">下载</el-button>
                    <el-button
                      v-if="scope.row.fileType=='pdf'"
                      size="small"
                      type="text"
                      @click="view(scope.row)"
                    >预览</el-button>
                    <el-button
                      v-if=" scope.row.examState == '7' || scope.row.examState == '11'"
                      size="small"
                      type="text"
                      @click="del(scope.row)"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>

              <div class="pagination-container">
                <el-pagination
                  @size-change="setPageSize"
                  @current-change="showPage"
                  :current-page.sync="listPageInfo.page"
                  :page-sizes="[10,20,30, 50,100,200,500,1000]"
                  :page-size="listPageInfo.limit"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="listPageInfo.total"
                ></el-pagination>
              </div>
            </el-scrollbar>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5" class="f-mt10 col-r">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>文件属性</span>
          </div>
          <div :style="'height:'+(scrollbarHeight-5)+'px'">
            <el-scrollbar>
              <FileInfo :docInfo="docInfo" ref="fileInfo"></FileInfo>
            </el-scrollbar>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      :title="dialogInfo.title"
      :visible.sync="dialogInfo.visible"
      v-loading="saveLoading"
      custom-class="w800"
      :lock-scroll="true"
      :before-close="beforeClose"
      :element-loading-text="loginText"
      element-loading-background="rgba(0, 0, 0, 0.7)"
    >
      <!--  2019-11-12 #2616 秦侯珍 弹出页面展示问题 start-->
      <div :style="{paddingRight:'10px',height:dialogHeight+'px'}">
        <el-scrollbar>
          <!--  2019-11-12 #2616 秦侯珍 弹出页面展示问题 end-->
          <el-row>
            <el-col :span="24" class="f-mt10">
              <el-form :model="form" :rules="rules" ref="form" label-width="80px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item class="nofloat" label="发布机构" prop="publishMechCode">
                      <el-select
                        class="four-col left width100"
                        v-model="form.publishMechCode"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="(item,key) in publishMechs"
                          :key="key"
                          :label="item.propName"
                          :value="item.propCode"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="发布时间" prop="publishTime">
                      <el-date-picker
                        style="width:100%;"
                        type="date"
                        placeholder="日期选择"
                        v-model="form.publishTime"
                        @change="getTime"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item class="nofloat" label="发布地区" prop="publishProCode">
                      <el-select
                        class="four-col left width100"
                        v-model="form.publishProCode"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="(item,key) in publishPros"
                          :key="key"
                          :label="item.propName"
                          :value="item.propCode"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item v-if="dialogInfo.status=='edit'" class="nofloat" label="文件类别">
                      <el-cascader
                        class="width100"
                        v-model="edit_filePath"
                        :options="treeData"
                        :props="{ value: 'roleCode', label: 'roleName'}"
                        change-on-select
                      ></el-cascader>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item v-if="dialogInfo.status=='add'" class="nofloat" label="文件类别">
                      <el-input disabled placeholder="请输入内容" v-model="addwjlb"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- <el-row>
              <el-col :span="12">
                <el-form-item
                  class="nofloat"
                  label="阅读范围"
                  prop="readScope"
                >
                  <el-select
                    class="four-col left"
                    v-model="form.readScope"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item,key) in readScopes"
                      :key="key"
                      :label="item.propName"
                      :value="item.propCode"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
                </el-row>-->
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="文件类型" prop="fileSort">
                      <el-select
                        class="four-col left width100"
                        v-model="form.fileSort"
                        @change="changeFileType"
                        placeholder="请选择文件类型"
                      >
                        <el-option
                          v-for="(item,key) in fileSort"
                          :key="key"
                          :label="item.propName"
                          :value="item.propCode"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item class="nofloat" label="发文号">
                      <el-input placeholder="请输入内容" v-model="form.publishDocumentCode"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-form-item label="上传附件" prop="storagePath">
                  <div class="clearfix">
                    <span v-if="!uploadInfo.uploadBtn" class="fileName">
                      <a
                        href="javascript:void(0)"
                        :title="fileInfo.name"
                        :data-title="fileInfo.path"
                      >{{fileInfo.name}}</a>
                    </span>
                    <span class="delFile" v-if="!uploadInfo.uploadBtn" @click="showUpload">
                      <i class="el-icon-close"></i>
                    </span>
                    <!-- #2562 2019-11-7 张亮三 增加了data额外参数，提交保存时传状态 start -->
                    <el-upload
                      class="upload-btn no-list"
                      ref="uploadFileAdd"
                      action="/api/policy/policy/upload"
                      :file-list="fileList"
                      :data="{requestType:requestType}"
                      :before-upload="beforeUpload"
                      :headers="uploadInfo.uplaodHeaders"
                      :on-change="fileChange"
                      :list-type="form.fileType"
                      :auto-upload="false"
                      :multiple="false"
                      :on-success="uploadCb"
                      :accept="accept"
                      :on-progress="onProgress"
                    >
                      <!-- #2562 2019-11-7 张亮三 增加了data额外参数，提交保存时传状态 end -->
                      <el-button
                        slot="trigger"
                        size="small"
                        type="primary"
                        v-if="uploadInfo.uploadBtn"
                      >选取文件</el-button>
                    </el-upload>
                  </div>
                  <!-- <el-input v-model="form.storagePath"></el-input> -->
                </el-form-item>
                <el-form-item label="政策解读" prop="remark">
                  <el-input
                    type="textarea"
                    resize="none"
                    rows="5"
                    placeholder="请输入内容"
                    v-model="form.remark"
                    :maxlength="2000"
                    :autosize="{ minRows: 5, maxRows: 5}"
                    @input="approvalOpinionInput"
                  ></el-input>
                  <span class="validateText">{{ approvalOpinionRemnant }}/2000</span>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer" align="right">
        <el-button class="save-btn" @click="submitSave()">保 存</el-button>
        <el-button class="submit-btn" @click="submit()">提 交</el-button>

        <el-button @click="cancel('form')" class="cancel-btn">关闭</el-button>
      </div>
    </el-dialog>

    <el-dialog
      v-drag
      :close-on-click-modal="false"
      title="查看文件"
      :visible.sync="viewsDialog"
      custom-class="w800"
      :lock-scroll="true"
    >
      <!--  2019-11-12 #2616 秦侯珍 弹出页面展示问题 start-->  
      <div :style="{paddingRight:'10px',height:dialogHeight+'px'}">
        <el-scrollbar>
          <!--  2019-11-12 #2616 秦侯珍 弹出页面展示问题 end-->
          <el-row>
            <el-col :span="24">
              <Views :pdfUrl="pdfUrl" type="pdf" ref="views"></Views>
            </el-col>
          </el-row>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer" align="right">
        <el-button class="save-btn" @click="closeModal">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import txt from "@common/assets/icons/txt.png";
import word from "@common/assets/icons/word.png";
import pdf from "@common/assets/icons/pdf.png";
import {
  add,
  update,
  getList,
  downFile,
  viewsFile,
  delObjPage
} from "@common/api/marketingSystem/policyDocument/index";
import {
  getTree,
} from "@common/api/marketingSystem/classification/index";
// import initTree from "@/views/marketingSystem/policyDocument/components/tree";
import { getToken } from "@common/utils/auth";
import { mapGetters } from "vuex";
import { initLayout, initLayoutInfo } from "@common/utils/init";
import { parseTime, initDialogHeight } from "@common/utils/index";
// import {Views,FileInfo} from "@/views/marketingSystem/policyDocument/components";
import { getSelectList } from "@common/api/base";
export default {
  name: "upload",
  components: {
    Views: () => import("./components/Views"),
    FileInfo: () => import("./components/FileInfo"),
    QueryCriteria: () => import("./components/QueryCriteria"),
  },
  data() {
    return {
      submitStatus: "",
      addwjlb: "",
      txt,
      word,
      pdf,
      accept:
        "application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,text/plain",
      scrollbarHeight: "",
      widthTabe: "",
      dialogHeight: "",
      publishPros: [],
      publishMechs: [],
      // readScopes: [],
      pdfUrl: "",
      edit_filePath: [],
      viewsDialog: false,
      isInit: true,
      file_rode: false,
      dialogInfo: {
        title: "添加政策法规",
        visible: false,
        status: "add"
      },
      fileInfo: {
        name: "",
        path: ""
      },
      uploadInfo: {
        uplaodHeaders: {},
        uploadBtn: true,
        limit: 1,
        total: 0,
        status: "",
        file_name: ""
      },
      treeData: [], //树的数据
      defaultProps: {
        children: "children",
        label: "label"
      },
      pageList: [],
      listPageInfo: {
        page: 1,
        filePath: "",
        limit: 10,
        name: "",
        publishProCode: "", //发布省份查询
        publishMech: "", //发文机构查询
        fileType: "", //文件类型查询
        publishTime: "", //发布时间查询
        publishYear: "" //发布年度查询
      },
      fileList: [],
      fileTypes: [],
      fileSort: [],
      fileType: "",
      form: {
        filePath: "", //文件路径    //例子：电力市场-->政策文件
        name: "", //文件名称
        publishMechCode: "", //发布机构编码
        publishMechName: "", //发布机构名称
        publishProCode: "", //发布省份编码
        publishProName: "", //发布省份名称
        size: "", // 文件大小
        userCode: "", // 用户code
        userName: "", //用户名称
        publishTime: "", //发布时间
        examState: "", //审核状态 未审批 1 已审批 2 驳回 3'
        examUser: "", // 审核人
        storagePath: "", //存储路径
        remark: "", //政策解读
        publishDocumentCode: "", //发文号
        // readScope: "", // 阅读范围
        fileType: "", //文件类型
        fileSort: "" //文件分类
      },
      requestType: "", //增加保存或者提交类型判断 2019-11-6 亮
      rules: {
        fileType: [
          {
            required: true,
            message: "文件类型",
            trigger: "blur"
          }
        ],
        fileSort: [
          {
            required: true,
            message: "文件类型",
            trigger: "blur"
          }
        ],
        publishProCode: [
          {
            required: true,
            message: "请选择发布省份",
            trigger: "blur"
          }
        ],
        publishMechCode: [
          {
            required: true,
            message: "请选择发布机构",
            trigger: "blur"
          }
        ],
        // readScope: [
        //   {
        //     required: true,
        //     message: "请选择阅读范围",
        //     trigger: "blur"
        //   }
        // ],
        publishTime: [
          {
            required: true,
            message: "请选择发布时间",
            trigger: "blur"
          }
        ],
        remark: [
          {
            required: true,
            message: "请输入政策解读",
            trigger: "blur"
          }
        ]
      },
      docInfo: {},
      listLoading: false,
      saveLoading: false,
      documentId: "",
      isCanUpload: true, //上传文件类型标记
      treeDataAll: [],
      Upload_btn_del: false,
      loginText: "保存中",
      approvalOpinionRemnant: 0, //计数器
      layoutInfo: {},
      tabWidth: 100
    };
  },
  mounted() {
    const that = this;
    this.dialogHeight = initDialogHeight();
    this.layoutInfo = initLayoutInfo();
    that.setTabWidth();
    window.onresize = function temp() {
      this.layoutInfo = initLayoutInfo();
      // this.setTabWidth();
      that.dialogHeight = initDialogHeight();
      that.layoutInfo = initLayoutInfo();
      that.setTabWidth();
    };
  },
  created() {
    this.Upload_btn_del = this.elements["policyDocumentUpload:btn_del"];

    this.init();
  },
  computed: {
    ...mapGetters(["elements"])
  },
  methods: {
    //查询插件 李志佳 2020年2月4日14:32:39
    selectQuery(arg) {
      let name = arg[0];
      this.listPageInfo[name] = arg[1];
    }, 
    //初始化查询插件 李志佳 2020年2月4日14:32:39
    initQuery() {
      this.listPageInfo.publishProCode = "";
      this.listPageInfo.publishMech = "";
      this.listPageInfo.fileType = "";
      this.listPageInfo.publishTime = "";
      this.listPageInfo.publishYear = "";
    },
    //设置列表文件名列宽
    setTabWidth() {
      if (this.layoutInfo.width < 1069) {
        this.tabWidth = 100;
      } else if (this.layoutInfo.width < 1229 && this.layoutInfo.width > 1069) {
        this.tabWidth = 160;
      } else if (this.layoutInfo.width < 1479 && this.layoutInfo.width > 1229) {
        this.tabWidth = 300;
      } else if (this.layoutInfo.width > 1479) {
        this.tabWidth = 420;
      }
    },
    changeFileType(val) {
      if (val == "txt") {
        this.accept = "text/plain";
      } else if (val == "pdf") {
        this.accept = "application/pdf";
      } else if (val == "word") {
        this.accept =
          "application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      }
    },
    init() {
      this.getTreeList();
      this.scrollbarHeight = initLayout() - 120; //document.body.clientWidth;
      window.onresize = function temp() {
        this.scrollbarHeight = initLayout() - 120;
      };
      this.uploadInfo.uplaodHeaders = {
        Authorization: getToken()
      };
      this.getProCode();
      this.getMechCode();
      // this.getReadScope();
      this.getDocTypes();
      this.initPageList();
    },
    add() {
      //2019-11-06 #2572 滕超 新增时清空表单
      this.clearForm();
      this.approvalOpinionRemnant = 0;
      if (this.listPageInfo.filePath != "") {
        this.form.filePath = this.listPageInfo.filePath;
        this.dialogInfo.title = "添加" + this.addwjlb;
        this.dialogInfo.status = "add";
        this.form.storagePath = "";
        this.dialogInfo.visible = true;
      } else {
        this.$notify({
          title: "提示信息",
          message: "请选择文件分类",
          type: "warning",
          duration: 2000
        });
      }
    },
    edit(row) {

      let data = Object.assign({}, row);
      let filePath = data.filePath.split("-");
      this.edit_filePath = filePath;
      this.fileInfo.name = data.name;
      this.fileInfo.path = data.storagePath;
      this.form = data;
      this.form.publishTime = data.publishTime.split(" ")[0];
      this.uploadInfo.uploadBtn = false;
      this.dialogInfo.title = "编辑信息";
      this.approvalOpinionRemnant = 2000 - this.form.remark.length;
      this.dialogInfo.status = "edit";
      this.dialogInfo.visible = true;
    },
    view(row) {
      let data = Object.assign({}, row);
      if (this.isInit) {
        this.isInit = false;
        this.pdfUrl =
          "/api/policy/policy/read?token=" + getToken() + "&id=" + data.id;
      } else {
        this.pdfUrl =
          "/api/policy/policy/read?token=" + getToken() + "&id=" + data.id;
        this.$refs.views.showFile("show", this.pdfUrl);
      }
      this.viewsDialog = true;
    },
    closeModal() {
      this.viewsDialog = false;
    },
    clearForm() {
      const set = this.$refs;
      if (typeof set["form"] != "undefined") {
        set["form"].resetFields();
        set.uploadFileAdd.clearFiles();
      }
      for (let key in this.form) {
        this.$set(this.form, key, "");
      }
      this.edit_filePath = [];
      this.fileInfo.name = "";
      this.fileInfo.path = "";
      this.uploadInfo.uploadBtn = true;

      this.dialogInfo.visible = false;
    },
    down(data) {
      let params = {
        id: data.id,
        storagePath: data.storagePath,
        token: getToken()
      };
      downFile(params);
    },
    submitSave() {
      
      let set = this.$refs;
      set["form"].validate(valid => {
        if (valid) {
         
          // #3699 2020-02-04 秦侯珍 营销管控-营销信息库-政策文件上传-上传附件请设为必选项 start
          if (this.fileInfo.name == "") {
            this.$notify({
              title: "提示信息",
              message: "请上传附件",
              type: "warning",
              duration: 2000
            });
            return false;
          } else {
          // #3699 2020-02-04 秦侯珍 营销管控-营销信息库-政策文件上传-上传附件请设为必选项 end
          this.loginText = "保存中";
          if (
            this.fileInfo.path === this.form.storagePath &&
            this.fileInfo.path != ""
          ) {
            this.saveLoading = true;
            this.submitStatus = "11";
            this.save("11");
          } else {
            this.saveLoading = true;
            this.submitStatus = "11";
            // #2562 2019-11-7 张亮三 保存时改变状态
            this.requestType = "11";
            // #2562 2019-11-7 张亮三 做延时提交，防止状态提交失败
            setTimeout(function() {
              set.uploadFileAdd.submit();
            }, 500);
            }
          }
        } else {
          return false;
        }
      });
    },
    submit() {
      let set = this.$refs;

      set["form"].validate(valid => {
        if (valid) {
          // #3699 2020-02-04 秦侯珍 营销管控-营销信息库-政策文件上传-上传附件请设为必选项 start
          if (this.fileInfo.name == "") {
            this.$notify({
              title: "提示信息",
              message: "请上传附件",
              type: "warning",
              duration: 2000
            });
            return false;
          } else {
          // #3699 2020-02-04 秦侯珍 营销管控-营销信息库-政策文件上传-上传附件请设为必选项 end
          this.loginText = "提交中";
          if (
            this.fileInfo.path === this.form.storagePath &&
            this.fileInfo.path != ""
          ) {
            this.saveLoading = true;
            this.submitStatus = "3";
            this.save("3");
          } else {
            this.saveLoading = true;
            this.submitStatus = "3";
            // #2562 2019-11-7 张亮三 保存时改变状态
            this.requestType = "3";
            // #2562 2019-11-7 张亮三 做延时提交，防止状态提交失败
            setTimeout(function() {
              set.uploadFileAdd.submit();
            }, 500);
            }
          }
        } else {
          return false;
        }
      });
    },
    //删除 ---------
    del(data) {
      let params = {
        id: data.id
      };
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delObjPage(params).then(res => {
          if (res.success) {
            this.$notify({
              title: "成功",
              message: res.message,
              type: "success",
              duration: 2000
            });
            this.getList();
          } else {
            this.$notify({
              title: "失败",
              message: res.message,
              type: "warning",
              duration: 2000
            });
          }
        });
      });
    },

    setPageSize(num) {
      this.listPageInfo.limit = num;
      this.listPageInfo.page = 1;
      this.getList();
    },
    searchFile() {
      this.listPageInfo.page = 1;
      this.getList();
    },
    showPage(num) {
      this.listPageInfo.page = num;
      this.getList();
    },
    //3846 gaoaining 2020-03-06 修改文件属性里面文件路径
    showDocumentInfo(data) {
      //显示文件信息
      let fileInfoCom = this.$refs.fileInfo;
      if (typeof fileInfoCom != "undefined") {
        fileInfoCom.showDoc(data);
      } else {
        this.docInfo = data;
        this.docInfo.filePath =''
      }
    },
     //#3846 gaoaining 2020-03-05 修改树接口
    getTreeList() {
      getTree().then(data => {
        this.treeData = data;
       
        this.setTreeDataAll(this.treeData);
      });
    },
    //#3846 gaoaining 2020-03-05 修改setTreeDataAll方法中参数
    setTreeDataAll(data) {
      data.map(item => {
        if (typeof item.children != "undefined") {
          this.setTreeDataAll(item.children);
        }
        this.treeDataAll.push({
          roleCode: item.roleCode,
          roleName: item.roleName,
          proleCode: item.proleCode
        });
      });
    },
    //#3846 gaoaining 2020-03-05 修改setFilePath方法中参数
    setFilePath(roleCode) {
      let filePath = "";
      this.treeDataAll.map(item => {
        if (item.roleCode == roleCode) {
          if (item.proleCode != '-1') {
            filePath = this.setFilePath(item.proleCode) + "-" + item.roleName;
          } else {
            filePath = item.roleName;
          }    
        }
      });
      return filePath;
    },
    getDocTypes() {
      //获取文档类型
      getSelectList("file_type").then(res => {
        this.fileTypes = res;
      });
      //获取文档分类
      getSelectList("file_sort").then(res => {
        this.fileSort = res;
      });
    },
    initPageList() {
      this.listPageInfo.page = 1;
      this.getList();
    },
    getList() {
      //获取文件列表
      this.listLoading = true;
      let param = {};
      //查询参数赋值
      for(let key  in this.listPageInfo){
        if (this.listPageInfo[key] != "") {
          param[key] = this.listPageInfo[key];
        }
      }
      param.page = this.listPageInfo.page;
      param.limit = this.listPageInfo.limit;

      getList(param).then(response => {
        let items = response.rows.map((item, index) => {
          item.index =
            index + 1 + (this.listPageInfo.page - 1) * this.listPageInfo.limit;
          return item;
        });
        this.listLoading = false;
        this.pageList = items;
        if (items.length > 0) {
          this.showDocumentInfo(items[0]);
        }
        this.listPageInfo.total = response.total;
      });
    },
    getMechCode() {
      //获取机构
      getSelectList("publish_mech").then(res => {
        this.publishMechs = res;
      });
    },
    getProCode() {
      //获取省份
      getSelectList("province").then(res => {
        this.publishPros = res;
      });
    },
    // getReadScope() {
    //   //获取阅读范围
    //   getSelectList("read_scope").then(res => {
    //     this.readScopes = res;
    //   });
    // },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    changeTree(id) {},
    getNodeData(data) {
      /*点击树 */
      this.addwjlb = data.label;

      //获取文件路径
      //#3846 gaoaining 2020-03-05 修改图片路径
      let fileInfoCom = this.$refs.fileInfo;
      if (this.pageList != "undefined") {
        this.docInfo.filePath = this.setFilePath(data.roleCode)
      } else {
        this.docInfo.filePath =''
      }
 
      this.listPageInfo.filePath =data.roleCode;
      this.listPageInfo.name = "";
      this.listPageInfo.page = 1;
      this.initPageList();
    },
    beforeClose() {
      this.clearForm();
    },
    save(data) {
      //提交上传表单
     
      let params = {
        examState: data,
        filePath: this.form.filePath,
        name: this.form.name, //文件名称
        // size: this.form.size, // 文件大小
        // publishTime: parseTime(this.form.publishTime, "{y}-{m}-{d}"), //发布时间
        // publishTime:parseTime(this.form.publishTime),
        storagePath: this.form.storagePath, //存储路径
        remark: this.form.remark, //政策解读
        publishDocumentCode: this.form.publishDocumentCode, //发文号
        // readScope: this.form.readScope, // 阅读范围
        fileType: this.form.fileType, //文件类型
        fileSort: this.form.fileSort //文件分类
      };
      if (typeof this.form.size == "undefined") {
        params.size = 0;
      } else {
        params.size = this.form.size;
      }
      if (typeof this.form.publishTime == "string") {
        params.publishTime = this.form.publishTime;
      } else {
        params.publishTime = parseTime(this.form.publishTime, "{y}-{m}-{d}");
      }
      this.publishPros.forEach(item => {
        if (item.propCode == this.form.publishProCode) {
          this.form.publishProName = item.propName;
          params.publishProName = this.form.publishProName;
          params.publishProCode = this.form.publishProCode;
        }
      });
      this.publishMechs.forEach(item => {
        if (item.propCode == this.form.publishMechCode) {
          this.form.publishMechName = item.propName;
          params.publishMechName = this.form.publishMechName;
          params.publishMechCode = this.form.publishMechCode;
        }
      });

      if (this.dialogInfo.status == "add") {
        add(params).then(res => {
          if (res.success) {
            this.dialogInfo.visible = false;
            this.saveLoading = false;
            this.$notify({
              title: "成功",
              message: res.message,
              type: "success",
              duration: 2000
            });
            this.$refs["form"].resetFields();
            this.initPageList();
            this.fileInfo.name = "";
            this.uploadInfo.uploadBtn = true;
          } else {
            // #2562 2019-11-3 张亮三 当提交失败时取消loading的加载 start
             //#3746 gaoaining  2020-02-13 当发问号重复时点击提交，弹出发文号重复提示时，不应关闭原窗口
            // this.dialogInfo.visible = false;
            //#3870 gaoaining 2020-04-07 引发的解决新增失败时 保存不成功问题
            this.saveLoading = false;
            this.fileInfo.path =this.form.storagePath;
            // #2562 2019-11-3 张亮三 当提交失败时取消loading的加载 end
            this.$notify({
              title: "失败",
              message: res.message,
              type: "warning",
              duration: 2000
            });
          }
        });
      } else {
        params.id = this.form.id;
        let filePath = this.edit_filePath.join("-");
        params.filePath = filePath;
        // if (this.form.storagePath == "") {
        //   this.$notify({
        //     title: "提示信息",
        //     message: "请选择上传文件！",
        //     type: "warning",
        //     duration: 2000
        //   });
        //   return false;
        // }
        update(params).then(res => {
          this.saveLoading = false;
          
          if (res.success) {
            this.$notify({
              title: "成功",
              message: res.message,
              type: "success",
              duration: 2000
            });
            this.$refs["form"].resetFields();
            this.initPageList();
            this.fileInfo.name = "";
            this.uploadInfo.uploadBtn = true;
            this.dialogInfo.visible = false;
          } else {
            this.saveLoading = false; 
            //#3746 gaoaining  2020-02-13 当发问号重复时点击提交，弹出发文号重复提示时，不应关闭原窗口
            // this.dialogInfo.visible = false;
            this.$notify({
              title: "失败",
              message: res.message,
              type: "warning",
              duration: 2000
            });
          }
        });
      }
    },
    cancel(formName) {
      this.clearForm();

      // this.$refs[formName].resetFields();
    },
    getNodeDataSub(data) {
      //获取的点击树的节点
      this.form.orgId = data.id;
    },
    showUplaodFile(data) {
      if (data) {
        let file = data;
        let fileArr = file.split("/");
        this.fileInfo.path = data;

        this.fileInfo.name = fileArr[fileArr.length - 1];
           this.save(this.submitStatus);
      }
    },
    checkFileType() {
      //检测文件类型
      // if (this.form.fileType === "") {
      //   console.log(123);

      //   this.$notify({
      //     title: "失败",
      //     message: "请选择上传文件类型",
      //     type: "warning",
      //     duration: 2000
      //   });
      //   return false;
      // }
      if (this.form.fileType != "word") {
        if (this.form.fileType != this.fileType) {
          this.$notify({
            title: "失败",
            message: "请选择上传文件为" + this.form.fileType + "！",
            type: "warning",
            duration: 2000
          });
          return false;
        } else {
          return true;
        }
      } else {
        if (this.fileType === "doc" || this.fileType === "docx") {
          return true;
        } else {
          this.$notify({
            title: "失败",
            message: "请选择上传文件为" + this.form.fileType + "！",
            type: "warning",
            duration: 2000
          });
          return false;
        }
      }
    },
    fileChange(file, fileList) {
      this.fileType = file.name.substring(file.name.lastIndexOf(".") + 1);

      this.fileList[0] = fileList[fileList.length - 1];
      this.fileInfo.name = file.name;
      this.fileInfo.path = "";
      this.uploadInfo.uploadBtn = false;
    },
    getTime(data) {
      this.form.publishTime = data;
    },
    showUpload() {
      this.$refs.uploadFileAdd.clearFiles();
      this.fileInfo.name = "";
      this.uploadInfo.uploadBtn = true;
    },
    beforeUpload(file) {
      let type = file.name.substring(file.name.lastIndexOf(".") + 1);
      if (this.fileType != type) {
        this.isCanUpload = false;
        this.$notify({
          title: "失败",
          message: "请选择上传文件为" + type + "！",
          type: "warning",
          duration: 2000
        });
      } else {
        this.isCanUpload = true;
      }
    },
    onProgress(event, file, fileList) {},
    uploadCb(response, file, fileList) {
      if (response.success) {
        this.form.storagePath = response.strogePath;
        this.form.name = response.name;
        this.form.size = response.size;
        this.showUplaodFile(this.form.storagePath);
      } else {
        this.$notify({
          title: "失败",
          message: response.name,
          type: "warning",
          duration: 2000
        });
        // #2562 2019-11-3 张亮三 当提交失败时取消loading的加载 start
        this.dialogInfo.visible = false;
        this.saveLoading = false;
        // #2562 2019-11-3 张亮三 当提交失败时取消loading的加载 end
      }
    },
    //输入字数统计
    approvalOpinionInput() {
      if (this.form.remark != undefined) {
        let txtVal = this.form.remark.length;
        this.approvalOpinionRemnant = 2000 - txtVal;
      }
    }
  }
};
</script>