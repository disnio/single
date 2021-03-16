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

              <el-table
                class
                :data="pageList"
                @row-click="showDocumentInfo"
                v-loading.body="listLoading"
                border
                fit
                highlight-current-row
                style="width: 100%"
              >
                <!-- <el-table-column align="center" label="序号" width="65" type="index" fixed> 
                </el-table-column>-->
                <!--             <el-table-column align="center" width="48" type="selection"> 
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
                <!-- <el-table-column
                  width="48"
                  align="center"
                  label="类型"
                >
                  <template slot-scope='scope'>
                    <span>{{scope.row.fileType}}</span>
                  </template>
                </el-table-column>-->
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
                <el-table-column align="center" label="操作" width="190">
                  <template slot-scope="scope">
                    <el-button size="small" type="text" @click="audit(scope.row,true)">通过</el-button>
                    <el-button size="small" type="text" @click="audit(scope.row,false)">驳回</el-button>
                    <!-- <el-button
                      size="small"
                      type="text"
                      @click="audit(scope.row,3)"
                    >上报
                    </el-button>-->
                    <el-button size="small" type="text" @click="down(scope.row)">下载</el-button>
                    <el-button
                      size="small"
                      v-if="scope.row.fileType=='pdf'"
                      type="text"
                      @click="view(scope.row)"
                    >预览</el-button>
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
        <el-button class="btn-save" @click="closeModal">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      title="请填写审批意见"
      :visible.sync="dialogInfo.visible"
      v-loading.body="saveLoading"
      custom-class="w480"
      :lock-scroll="true"
    >
      <!--  2019-11-12 #2616 秦侯珍 弹出页面展示问题 start-->
      <div :style="{paddingRight:'10px',height:dialogHeight+'px'}">
        <el-scrollbar>
          <!--  2019-11-12 #2616 秦侯珍 弹出页面展示问题 end-->
          <el-row>
            <el-col :span="24" class="f-mt10">
              <el-form :model="form" :rules="rules" ref="form" label-width="0px">
                <el-form-item prop="opinion">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 3, maxRows: 5}"
                    placeholder="请输入反馈信息"
                    v-model="form.opinion"
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer" align="right">
        <el-button class="save-btn" @click="save()">确 定</el-button>
        <el-button @click="cancel('form')" class="cancel-btn">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import txt from "@common/assets/icons/txt.png";
import word from "@common/assets/icons/word.png";
import pdf from "@common/assets/icons/pdf.png";
import {
  getExamineList,
  downFile,
  viewsFile,
  audit
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
  name: "audit",
  components: {
    Views: () => import("./components/Views"),
    FileInfo: () => import("./components/FileInfo"),
    QueryCriteria: () => import("./components/QueryCriteria")
  },
  data() {
    return {
      txt,
      word,
      pdf,
      isInit: true,
      scrollbarHeight: "",
      dialogHeight: "",
      selections: [],
      pdfUrl: "",
      viewsDialog: false,
      file_rode: false,
      dialogInfo: {
        visible: false,
        status: "pass"
      },
      form: {
        id: "",
        isPass: "", //文件路径    //例子：电力市场-->政策文件
        opinion: "" //政策解读
      },
      docInfo: {},
      treeData: [], //树的数据
      defaultProps: {
        children: "children",
        label: "label"
      },
      pageList: [],
      listPageInfo: {
        page: 1,
        filePath: "",
        type: "9",
        limit: 10,
        name: "",
        publishProCode: "", //发布省份查询
        publishMech: "", //发文机构查询
        fileType: "", //文件类型查询
        publishTime: "", //发布时间查询
        publishYear: "" //发布年度查询
      },
      rules: {
        opinion: [
          {
            required: true,
            message: "请输入反馈信息",
            trigger: "blur"
          }
        ]
      },
      listLoading: false,
      saveLoading: false,
      treeDataAll: [],
      layoutInfo: {},
      tabWidth: 100
    };
  },
  mounted() {
    const that = this;
    this.dialogHeight = initDialogHeight();
    this.layoutInfo = initLayoutInfo();
    this.setTabWidth();
    window.onresize = function temp() {
      that.dialogHeight = initDialogHeight();
      that.layoutInfo = initLayoutInfo();
      that.setTabWidth();
    };
  },
  created() {
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
    selectionChange(selection) {
      this.selections = selection;
    },
    init() {
      this.getTreeList();
      this.scrollbarHeight = initLayout() - 120; //document.body.clientWidth;
      window.onresize = function temp() {
        this.scrollbarHeight = initLayout() - 120;
      };
      this.initPageList();
    },
    view(data) {
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
    down(data) {
      let params = {
        id: data.id,
        storagePath: data.storagePath,
        token: getToken()
      };
      downFile(params);
    },
    isChecked(num) {
      if (this.selections.length == 1) {
        return true;
      } else {
        this.$message({
          message: "请选择一条数据",
          type: "warning"
        });
        return false;
      }
    },
    audit(data, type) {
      this.form.isPass = type;
      this.form.id = data.id;
      this.dialogInfo.visible = true;
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
    showDocumentInfo(data) {
      let fileInfoCom = this.$refs.fileInfo;
      if (typeof fileInfoCom != "undefined") {
        fileInfoCom.showDoc(data);
      } else {
        this.docInfo = data;
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
    initPageList() {
      this.listPageInfo.page = 1;
      this.getList();
    },
    getList() {
      this.listLoading = true;
      let param = {};

      for(let key  in this.listPageInfo){
        if (this.listPageInfo[key] != "") {
          param[key] = this.listPageInfo[key];
        }
      }
      param.page = this.listPageInfo.page;
      param.limit = this.listPageInfo.limit;
      param.type = this.listPageInfo.type;

      getExamineList(param).then(response => {
        this.listLoading = false;
        let items = response.rows.map((item, index) => {
          item.index =
            index + 1 + (this.listPageInfo.page - 1) * this.listPageInfo.limit;
          return item;
        });
        this.pageList = items;
        if (response.rows.length > 0) {
          this.showDocumentInfo(items[0]);
        }
        this.listPageInfo.total = response.total;
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getNodeData(data) {
      /*点击树 */
      //获取文件路径
      //#3846 gaoaining 2020-03-05 修改图片路径
      let fileInfoCom = this.$refs.fileInfo;
      if (this.pageList != "undefined") {
        this.docInfo.filePath = this.setFilePath(data.roleCode)
      } else {
        this.docInfo.filePath =''
      }
 
      this.docInfo.filePath = this.setFilePath(data.roleCode)
      this.listPageInfo.filePath =data.roleCode;
      this.listPageInfo.name = "";
      this.listPageInfo.page = 1;
      this.initPageList();
    },
    fileChange(file, fileList) {
      //文件选择变更回调
      let existFile = fileList
        .slice(0, fileList.length - 1)
        .find(f => f.name === file.name);
      this.fileInfo.name = file.name;
      this.fileInfo.path = "";
      this.file_rode = true;
      this.uploadInfo.uploadBtn = false;
    },
    save() {
      let set = this.$refs;

      set["form"].validate(valid => {
        if (valid) {
          this.saveLoading = true;
          audit(this.form).then(res => {
            this.saveLoading = false;
            this.dialogInfo.visible = false;
            if (res.success) {
              this.$notify({
                title: "成功",
                message: res.msg,
                type: "success",
                duration: 2000
              });
              this.$refs["form"].resetFields();
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
          return false;
        }
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
    cancel(formName) {
      this.dialogInfo.visible = false;
      this.$refs[formName].resetFields();
    }
  }
};
</script>