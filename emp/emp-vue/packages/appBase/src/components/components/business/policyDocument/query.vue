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
              <el-row :gutter="10" class="f-mb10">
                <el-col :span="24">
                  <!--            <el-col :span="16">
 <el-button class="filter-item f-mr"   @click="pass" type="primary" icon="check">通过</el-button>
 <el-button class="filter-item f-mr"    @click="reject" type="primary" icon="close">驳回</el-button>
 <el-button class="filter-item f-mr"    @click="view" type="primary" icon="view">预览</el-button>
 <el-button class="filter-item f-mr"   @click="down" type="primary" icon="caret-bottom">下载</el-button>
                  </el-col>-->
                  <div class="filter-container">
                    <el-form
                      :inline="true"
                      :model="listPageInfo"
                      label-width="80px"
                      class="demo-form-inline form-inline-168"
                    >
                      <el-row>
                        <el-form-item label="文件名称">
                          <el-input
                            placeholder="请输入文件名称"
                            v-model="listPageInfo.name"
                            class="input-with-select"
                            :clearable="true"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="文件类型">
                          <el-select
                            class="four-col left"
                            :clearable="true"
                            v-model="listPageInfo['fileType']"
                            placeholder="请选择"
                          >
                            <el-option
                              v-for="item in typeOptions"
                              :key="item.propCode"
                              :label="item.propName"
                              :value="item.propCode"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="审核状态">
                          <el-select
                            class="four-col left"
                            :clearable="true"
                            v-model="listPageInfo['examStateName']"
                            placeholder="请选择"
                          >
                            <el-option
                              v-for="item in stateOptions"
                              :key="item.propCode"
                              :label="item.propName"
                              :value="item.propCode"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <QueryCriteria @select="selectQuery(arguments)" @init="initQuery"></QueryCriteria>
                        <el-form-item>
                          <el-button type="primary" @click="handleFilter" icon="el-icon-search">查询</el-button>
                        </el-form-item>
                      </el-row>
                    </el-form>
                  </div>
                </el-col>
              </el-row>

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
                <!-- <el-table-column width="60" align="center" label="类型">
                  <template slot-scope="scope">
                    <span>{{scope.row.fileType}}</span>
                  </template>
                </el-table-column>-->
                <el-table-column align="center" label="发布时间" width="100">
                  <template slot-scope="scope">
                    <span>{{scope.row.publishTime}}</span>
                  </template>
                </el-table-column>
                <el-table-column width="80" align="center" label="审核状态">
                  <template slot-scope="scope">
                    <span>{{scope.row.examStateName}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="审批历史" width="80">
                  <template slot-scope="scope">
                    <div class="btn-link">
                      <a @click="checkHistory(scope.row)">审批历史</a>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="流程状态" width="80">
                  <template slot-scope="scope">
                    <div class="tabTitleStyle">
                      <span @click="processState(scope.row)">
                        <a v-if="scope.row.approvalStatus == 'khshzt03'">
                          <i class="iconfont icon-circle iconStyle3"></i>
                        </a>
                        <a v-else>
                          <i class="iconfont icon-circle iconStyle1"></i>
                        </a>
                      </span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="140">
                  <template slot-scope="scope">
                    <!-- <el-button size="small" type="text" @click="audit(scope.row,2)">通过</el-button>
                    <el-button size="small" type="text" @click="audit(scope.row,3)">驳回</el-button>-->
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
    <!-- 审批历史 -->
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      title="审批历史"
      :visible.sync="checkHistoryDialogVisible"
      custom-class="w800"
      :lock-scroll="true"
    >
      <!--  2019-11-12 #2616 秦侯珍 弹出页面展示问题 start-->
      <div :style="{paddingRight:'10px',height:dialogHeight+'px'}">
        <el-scrollbar>
          <!--  2019-11-12 #2616 秦侯珍 弹出页面展示问题 end-->
          <div>
            <el-table
              border
              :data="list1"
              v-loading.body="checkListLoading"
              ref="list1"
              @selection-change="selsChange"
            >
              <el-table-column align="center" type="selection" width="48"></el-table-column>
              <el-table-column align="center" label="序号" width="48" type="index"></el-table-column>

              <el-table-column align="center" label="审批岗位" width="150">
                <template slot-scope="scope">
                  <div class="txt-left">{{ scope.row.roleName }}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="审批人" width="130">
                <template slot-scope="scope">
                  <div class="txt-left">{{ scope.row.userName }}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="审批时间" width="160">
                <template slot-scope="scope">
                  <div class="txt-left">{{ scope.row.approvalTime }}</div>
                </template>
              </el-table-column>

              <el-table-column align="center" label="审批结果" width="80">
                <template slot-scope="scope">
                  <div class="txt-left">{{ scope.row.result }}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="审批意见">
                <template slot-scope="scope">
                  <span>{{ scope.row.message }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer btn_footer">
        <el-button class="cancel-btn" @click="closeCheck()">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 流程状态 -->
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      title="流程状态"
      :visible.sync="processDialogVisible"
      custom-class="w800"
      :lock-scroll="true"
    >
      <!--  2019-11-12 #2616 秦侯珍 弹出页面展示问题 start-->
      <div :style="{paddingRight:'10px',height:dialogHeight+'px'}">
        <el-scrollbar>
          <!--  2019-11-12 #2616 秦侯珍 弹出页面展示问题 end-->
          <div>
            <img :src="this.imgUrl" style="margin-top: 0px;margin-left: 100px;" />
          </div>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer btn_footer">
        <el-button class="cancel-btn" @click="closeProcess()">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import txt from "@common/assets/icons/txt.png";
import word from "@common/assets/icons/word.png";
import pdf from "@common/assets/icons/pdf.png";
import {
  getViewsList,
  downFile,
  viewsFile,
  audit,
  getHistoryPage,
  checkPage
} from "@common/api/marketingSystem/policyDocument/index";
import {
  getTree,
} from "@common/api/marketingSystem/classification/index";
import { getToken } from "@common/utils/auth";
import { mapGetters } from "vuex";
import { initLayout,initLayoutInfo } from "@common/utils/init";
import { parseTime, initDialogHeight } from "@common/utils/index";
// import {Views,FileInfo} from "@/views/marketingSystem/policyDocument/components";
import { getProcessList } from "@common/api/admin/approvalProcess/processConfiguration/index";
import { getSelectList } from "@common/api/base";
export default {
  name: "query",
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
      typeOptions: [],
      stateOptions: [],
      pdfUrl: "",
      imgUrl: "", //图片地址
      list1: null, //审批历史列表
      viewsDialog: false,
      checkHistoryDialogVisible: false, //审核历史弹出框状态
      checkListLoading: false, //审批历史加载状态
      processDialogVisible: false, //流程状态弹出框状态
      file_rode: false,
      dialogInfo: {
        visible: false,
        status: "pass"
      },
      form: {
        id: "",
        state: "", //文件路径    //例子：电力市场-->政策文件
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
        type: "",
        limit: 10,
        name: "",
        fileType: [],
        examStateName: [],
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
      orgInfo: this.userOrgInfo,
      processKey: "hn_files_sh",
      layoutInfo: {},
      tabWidth: 100
    };
  },
  created() {
    this.init();
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
  computed: {
    ...mapGetters(["elements", "userOrgInfo"])
  },
  watch: {
    userOrgInfo: {
      handler(newVal, oldVal) {
        this.orgInfo = newVal;
      },
      immediate: true,
      deep: true
    }
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
    //获取流程ID
    getProcessCode() {
      let params = {};
      params.limit = "1";
      params.page = "1";
      params.orgId = this.orgInfo[this.orgInfo.length - 1].id;
      params.businessNodeCode = "policyDocumentUpload";
      getProcessList(params).then(res => {
        if (res.status == 200) {
          this.initPageList();
          if (typeof res.data != "undefined") {
            if (typeof res.data.rows != "undefined") {
              if (res.data.total > 0) {
                this.processKey = res.data.rows[0].processCode;
              }
            }
          }
        } else {
          this.$notify({
            title: "失败",
            message: "获取列表数据失败",
            type: "warning",
            duration: 2000
          });
        }
      });
    },
    //查询
    handleFilter() {
      this.getList();
    },
    // selectionChange(selection) {
    //   this.selections = selection;
    // },
    //获取文件类型
    getDocTypes() {
      getSelectList("file_type").then(res => {
        this.typeOptions = res;
      });
    },
    // 关闭流程弹框
    closeProcess() {
      this.processDialogVisible = false;
    },
    // 关闭审核历史弹框
    closeCheck() {
      this.checkHistoryDialogVisible = false;
    },
    //  审批流程
    processState(row) {
      //获取审批流程
      let token = getToken();
      this.imgUrl =
        "/api/admin/processApproval/getActiviImage?businessKey=" +
        row.id +
        "&processKey=" +
        this.processKey +
        "&token=" +
        token;
      this.processDialogVisible = true;
    },
    //获取ID
    selsChange(selection) {
      let infoState = false;
      if (selection != null && selection != "") {
        selection.forEach(item => {
          if (item.approvalStatus != "khshzt01") {
            infoState = true;
          }
        });
      }
      if (selection.length == 0) {
        this.btnState = true;
      } else {
        this.btnState = infoState;
      }
      let id = "";
      selection.forEach(element => {
        id += "," + element.customerId;
      });
      id = id.substring(1);
      this.sels = id;
    },

    //审批历史
    checkHistory(row) {
      //获取审批历史列表
      this.checkListLoading = true;
      let query = {
        businessKey: row.id,
        processKey: this.processKey
      };
      checkPage(query).then(response => {
        this.list1 = response.data;
        this.checkListLoading = false;
      });
      this.checkHistoryDialogVisible = true;
    },
    init() {
      this.getDocTypes();
      this.getTreeList();
      this.scrollbarHeight = initLayout() - 120; //document.body.clientWidth;
      window.onresize = function temp() {
        this.scrollbarHeight = initLayout() - 120;
      };
      this.getProcessCode();
      getSelectList("state").then(res => {
        this.stateOptions = res;
      });
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
    // isChecked(num) {
    //   if (this.selections.length == 1) {
    //     return true;
    //   } else {
    //     this.$message({
    //       message: "请选择一条数据",
    //       type: "warning"
    //     });
    //     return false;
    //   }
    // },
    setPageSize(num) {
      this.listPageInfo.limit = num;
      this.listPageInfo.page = 1;
      this.getList();
    },
    // searchFile() {
    //   this.listPageInfo.page = 1;
    //   this.getList();
    // },
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
      //查询参数赋值
      for(let key  in this.listPageInfo){
        if (this.listPageInfo[key] != "") {
          param[key] = this.listPageInfo[key];
        }
      }
      param.page = this.listPageInfo.page;
      param.limit = this.listPageInfo.limit;
      getHistoryPage(param).then(response => {
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
<style lang="scss" scoped>
.tabTitleStyle {
  padding: 0 10px;
  text-align: center;
  display: block;
  span {
    height: 20px;
    line-height: 20px;
    margin-left: 8px;
    .iconStyle1 {
      color: #1abc9c !important;
    }
    .iconStyle3 {
      color: #ff0000;
    }
    .icon_diamond {
      padding-left: 5px;
      width: 14px;
      height: 14px;
      display: inline-block;
      transform: rotate(45deg);
    }
  }
  .titleDetail {
    float: left;
    margin-left: 0px;
    font-size: 18px;
    font-weight: 700;
  }
}
</style>