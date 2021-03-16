 <template>
  <div>
    <el-dialog v-drag 
      :close-on-click-modal="false"
      :title="dialogTitle"
      :visible.sync="examineDialogVisible"
      custom-class="w1000 "
      v-loading="formLoading"
      :before-close="Close"
    >
      <!--  2019-11-12 #2616 秦侯珍 弹出页面展示问题 start-->
      <div :style="{paddingRight:'10px',height:dialogHeight+'px'}">
        <el-scrollbar>
      <!--  2019-11-12 #2616 秦侯珍 弹出页面展示问题 end-->
      <!--from弹出 -->
      <div class="app-container calendar-list-container">
        <div class="f-ml10 form-inline-168">
          <el-form :inline="true" :model="form" class="demo-form-inline" label-width="120px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="计划年月:" algin="right">
                  <el-date-picker
                    :disabled="isSubmit"
                    v-model="form.planYear"
                    type="month"
                    placeholder="选择月"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="组织机构:">
                  <el-input disabled v-model="form.orgName" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row>
              <el-col :span="12">
                <el-form-item label="审批人:">
                  <el-input disabled v-model="form.approver" placeholder></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="审批状态:">
                  <el-input disabled v-model="form.approvalStatus" placeholder="请输入审批状态"></el-input>
                </el-form-item>
              </el-col>
            </el-row>-->
          </el-form>
        </div>
      </div>
      <el-tabs v-model="tabs.activeNameOne" type="border-card" @tab-click="handleClickOne">
        <!-- <el-tab-pane label="上月工作计划" name="lastMonetPlan">
          <el-tabs v-model="tabs.activeName" type="border-card" @tab-click="handleClick">
           
            <el-tab-pane label="计划内工作" name="insideThePlan" v-if="tabs.insideThePlan"> 
              <el-table
                @selection-change="selsChange"
                :key="tableKey"
                border
                fit
                highlight-current-row
                :data="insideThePlanList"
                style="width: 100%"
                height="300px"
              >
                <el-table-column type="selection" align="center" width="55"></el-table-column>
                <el-table-column type="index" label="序号" align="center" width="70px"></el-table-column>
                <el-table-column align="center" label="是否完成">
                  <template slot-scope="scope">
                    <div class="txt-left">
                      <el-checkbox v-model="scope.row.complete"></el-checkbox>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column width="140px" align="center" label="是否重点工作">
                  <template slot-scope="scope">
                    <div class="txt-left">
                      <el-checkbox v-model="scope.row.keyWork"></el-checkbox>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="工作内容" width="180">
                  <template slot-scope="scope">
                    <div class="txt-left">{{ scope.row.jobContent }}</div>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="开始时间">
                  <template slot-scope="scope">
                    <div class="txt-left">{{ scope.row.startTime }}</div>
                  </template>
                </el-table-column>
                <el-table-column width="140px" align="center" label="完成时间">
                  <template slot-scope="scope">
                    <div class="txt-left">{{ scope.row.endTime }}</div>
                  </template>
                </el-table-column>
                <el-table-column width="200px" align="center" label="负责人">
                  <template slot-scope="scope">
                    <div class="txt-left">{{ scope.row.personLiable }}</div>
                  </template>
                </el-table-column>
                <el-table-column width="200px" align="center" label="配合部门">
                  <template slot-scope="scope">
                    <div class="txt-left">{{ scope.row.coordinationDepartmentName }}</div>
                  </template>
                </el-table-column>
                <el-table-column width="140px" align="center" label="备注">
                  <template slot-scope="scope">
                    <div class="txt-left">{{ scope.row.remarks }}</div>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
           
            <el-tab-pane label="计划外工作" name="outsideThePlan" v-if="tabs.outsideThePlan">
              <el-table
                @selection-change="selsChange"
                :key="tableKey"
                border
                fit
                highlight-current-row
                :data="outsideThePlanList"
                style="width: 100%"
                height="300px"
              >
                <el-table-column type="selection" align="center" width="55"></el-table-column>
                <el-table-column type="index" label="序号" align="center" width="70px"></el-table-column>
                <el-table-column align="center" label="是否完成">
                  <template slot-scope="scope">
                    <div class="txt-left">
                      <el-checkbox v-model="scope.row.complete"></el-checkbox>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column width="140px" align="center" label="是否重点工作">
                  <template slot-scope="scope">
                    <div class="txt-left">
                      <el-checkbox v-model="scope.row.keyWork"></el-checkbox>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="工作内容" width="180">
                  <template slot-scope="scope">
                    <div class="txt-left">{{ scope.row.jobContent }}</div>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="开始时间">
                  <template slot-scope="scope">
                    <div class="txt-left">{{ scope.row.startTime }}</div>
                  </template>
                </el-table-column>
                <el-table-column width="140px" align="center" label="完成时间">
                  <template slot-scope="scope">
                    <div class="txt-left">{{ scope.row.endTime }}</div>
                  </template>
                </el-table-column>
                <el-table-column width="200px" align="center" label="负责人">
                  <template slot-scope="scope">
                    <div class="txt-left">{{ scope.row.personLiable }}</div>
                  </template>
                </el-table-column>
                <el-table-column width="200px" align="center" label="配合部门">
                  <template slot-scope="scope">
                    <div class="txt-left">{{ scope.row.coordinationDepartmentName }}</div>
                  </template>
                </el-table-column>
                <el-table-column width="140px" align="center" label="备注">
                  <template slot-scope="scope">
                    <div class="txt-left">{{ scope.row.remarks }}</div>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>-->
        <el-tab-pane label="本月工作计划" name="thiMonthPlan">
          <el-tabs v-model="tabs.activeName" type="border-card" @tab-click="handleClick">
            <!--结转工作 -->
            <el-tab-pane label="结转工作" name="carriedForward" v-if="tabs.carriedForward">
              <el-table
                :key="tableKey"
                :data="carryForwardList"
                v-loading.body="listLoading"
                :height="tabHeight"
                border
                fit
                highlight-current-row
                style="width: 100%"
              >
                <el-table-column type="selection" align="center" width="55"></el-table-column>
                <el-table-column prop="index" label="序号" align="center" width="70px"></el-table-column>
                <el-table-column align="center" label="是否完成">
                  <template slot-scope="scope">
                    <div class="txt-left">
                      <el-checkbox :disabled="iscomplete" v-model="scope.row.complete"></el-checkbox>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column width="140px" align="center" label="是否重点工作">
                  <template slot-scope="scope">
                    <div class="txt-left">
                      <el-checkbox v-model="scope.row.keyWork"></el-checkbox>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column width="220px" align="center" label="工作内容">
                  <template slot-scope="scope">
                <el-popover
                  placement="top-start"
                  title="工作内容预览"
                  width="300"
                 trigger="hover"
                  :content="scope.row.jobContent"
                  
                >
                  <a slot="reference" >{{scope.row.jobContent}}</a>
                </el-popover>
              </template>
                </el-table-column>
                <el-table-column align="center" label="开始时间">
                  <template slot-scope="scope">
                    <span>{{ scope.row.startTime }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="完成时间">
                  <template slot-scope="scope">
                    <span>{{ scope.row.endTime }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="负责人">
                  <template slot-scope="scope">
                    <span>{{ scope.row.personLiable }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="配合部门">
                  <template slot-scope="scope">
                    <span>{{ scope.row.coordinationDepartmentName }}</span>
                  </template>
                </el-table-column>
                <el-table-column width="140px" align="center" label="备注">
                  <template slot-scope="scope">
                    <span>{{ scope.row.remarks }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <!--新增工作 -->
            <el-tab-pane label="新增工作" name="addWork" v-if="tabs.addWork">
              <!--  :data="listQuery.addWorkList"-->
              <el-table
                @selection-change="selsChange"
                :key="tableKey"
                border
                fit
                :height="tabHeight"
                highlight-current-row
                :data="addWorkList"
                style="width: 100%"
              >
                <el-table-column type="selection" align="center" width="55"></el-table-column>
                <!-- <el-table-column :disabled="isEdit" type="index" label="序号" align="center" width="70px">
                </el-table-column>-->
                <el-table-column type="index" label="序号" align="center" width="70px"></el-table-column>
                <el-table-column align="center" label="是否完成">
                  <template slot-scope="scope">
                    <div class="txt-left">
                      <el-checkbox :disabled="iscomplete" v-model="scope.row.complete"></el-checkbox>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column width="140px" align="center" label="是否重点工作">
                  <template slot-scope="scope">
                    <div class="txt-left">
                      <el-checkbox v-model="scope.row.keyWork"></el-checkbox>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="工作内容" width="180">
                  <template slot-scope="scope">
                <el-popover
                  placement="top-start"
                  title="工作内容预览"
                  width="300"
                  trigger="hover"
                  :content="scope.row.jobContent"
                >
                  <a slot="reference" >{{scope.row.jobContent}}</a>
                </el-popover>
              </template>
                </el-table-column>
                <el-table-column align="center" label="开始时间">
                  <template slot-scope="scope">
                    <div class="txt-left">{{ scope.row.startTime }}</div>
                  </template>
                </el-table-column>
                <el-table-column width="140px" align="center" label="完成时间">
                  <template slot-scope="scope">
                    <div class="txt-left">{{ scope.row.endTime }}</div>
                  </template>
                </el-table-column>
                <el-table-column width="200px" align="center" label="负责人">
                  <template slot-scope="scope">
                    <div class="txt-left">{{ scope.row.personLiable }}</div>
                  </template>
                </el-table-column>
                <el-table-column width="200px" align="center" label="配合部门">
                  <template slot-scope="scope">
                    <div class="txt-left">{{ scope.row.coordinationDepartmentName }}</div>
                  </template>
                </el-table-column>
                <el-table-column width="140px" align="center" label="备注">
                  <template slot-scope="scope">
                    <div class="txt-left">{{ scope.row.remarks }}</div>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>
      </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" @click="openCheckWin('3')" class="pass-btn">通 过</el-button>
        <el-button type="warning" class="reject-btn" @click="openCheckWin('4')">驳 回</el-button>
      </div>
    </el-dialog>

    <el-dialog v-drag 
      :close-on-click-modal="false"
      custom-class="w480"
      title="请填写审批意见"
      :visible.sync="checkDialogVisible"
      append-to-body
      :before-close="handleClose"
    >
      <!--  2019-11-12 #2616 秦侯珍 弹出页面展示问题 start-->
      <div :style="{paddingRight:'10px',height:dialogHeight+'px'}">
        <el-scrollbar>
      <!--  2019-11-12 #2616 秦侯珍 弹出页面展示问题 end-->
      <el-input
        placeholder="请填写文本信息.."
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 5 }"
        :maxlength="400"
        @input="approvalOpinionInput"
        v-model="approvalOpinion"
      ></el-input>
      <span class="validateText">{{ approvalOpinionRemnant }}/400</span>
      </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer btn_footer">
        <el-button class="ok-btn" @click="switchCheck">确 认</el-button>
        <el-button class="cancel-btn" @click="close()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
    
<script>
import {
  resultPage,
  resultList
} from "@common/api/business/jyTransactionNotice/index";
import {
  addObj,
  changeStatus,
  pageList,
  pageCheckList,
  getDetailsById
} from "@common/api/marketingSystem/marketingPlan/index";
import { getUserOrgInfo } from "@common/api/public/index";
import { mapGetters } from "vuex";
import { parseTime,initDialogHeight } from "@common/utils/index";
export default {
  name: "result",
  props: {
    tabsData: {
      type: Object
    }
  },
  watch: {
    tabsData(val) {
      this.tabs = val;
    }
  },
  data() {
    return {
      tabs: this.tabsData,
      state: false,
      isSubmit: false,
      dialogType: "add",
      name: "",
      dialogHeight: "",
      //form中的 状态禁用
      noButten: true,
      iscomplete: false, //是否完成默认值
      addNoButten: false, //新增工作按钮隐藏
      // lastMonthCarriedForward:false, //上月结转信息
      // carriedForward:false, //结转信息
      // addWork:false, //新增工作
      // outsideThePlan:false, //计划外工作
      sels: [],
      //activeName:'',
      addWorkList: [], //静态新增工作数组信息
      carryForwardList: [], //结转列表
      outsideThePlanList: [], //计划外工作列表
      insideThePlanList: [], //计划内工作列表
      lastMonthCarriedForwardList: [], //上月结转工作列表
      listLoading: false, //加载列表
      disabled: false, //禁用
      dialogFormVisible: false, //新增工作=》新增form表单
      carryOverFormVisible: false, //结转弹出确认信息
      examineDialogVisible: false,
      checkDialogVisible: false, //审核弹出框
      approvalOpinionRemnant: 0, //计数器
      approvalOpinion: "", //输入审核内容
      flag: "", //记录
      passString: "true", //通过状态
      rejectString: "false", //驳回状态
      formLoading: false,
      startTime: new Date(),
      endTime: new Date(),
      dialogTitle: "",
      orgInfo: {
        orgName: "",
        orgId: ""
      },
      lastMonthCarriedForwardList: [],

      //新增工作
      addWorkList: [],
      visible: false,

      //结转工作
      carryForwardList: [],
      insideThePlanList: [],
      outsideThePlanList: [],
      planInfoForm: {
        complete: "",
        keyWork: "",
        jobContent: "",
        startTime: "",
        endTime: "",
        personLiable: "",
        coordinationDepartment: "",
        remarks: ""
      },
      dialogStatus: "",
      form: {
        orgName: "",
        planYear: "",
        approvalStatus: "",
        personLiable: "",
        planId: ""
      },
      dialogResultStatus: "",
      textMap: {
        update: "编辑",
        create: "新增"
      },
      sels: "", //复选框
      tableKey: 0,
      tabHeight: "" //表格高度
    };
  },
  created() {
    this.setLayoutHeight();
  },

  mounted() {
    const that = this;
    this.dialogHeight = initDialogHeight();
    window.onresize = function temp() {
      that.dialogHeight = initDialogHeight();
    }
  },
  methods: {
    setLayoutHeight() {
      this.tabHeight = initDialogHeight() * 0.8 + "px"; //修改计算的表格高度
    },
    //初始化
    initUpdateDialog(data, type) {
      this.resetTemp(); //清空form表单
      this.form.planYear = data.planYear;
      this.form.orgName = data.orgName;
      this.form.orgId = data.orgId;
      this.form.deptId = data.deptId;
      this.form.personLiable = data.personLiable;
      this.form.approver = data.approver;
      console.log(this.form.approver);

      this.form.approvalStatus = data.approvalStatusName;
      this.form.planId = data.planId;
      this.dialogType = type;
      if (type == "view") {
        this.dialogTitle = "工作计划查看";
        this.iscomplete = true;
      } else if (type == "examine") {
        this.dialogTitle = "工作计划审核";
        this.iscomplete = true;
      }
      this.examineDialogVisible = true;
      this.workType = "1";
      this.carryOverState = "0";
      this.state = "false";
      this.getList();
    },


    //获取用户单位信息
    getUserOrgInfo() {
      getUserOrgInfo().then(res => {
        if (res.length > 0) {
          this.orgInfo.orgId = res[0].id;
          this.orgInfo.orgName = res[0].orgName;
        }
      });
    },

    //打开审核窗口
    openCheckWin(data) {
      this.approvalOpinionRemnant = 0;
      this.approvalOpinion = "";
      this.flag = data;
      this.checkDialogVisible = true;
    },

    //选择审核方法
    switchCheck() {
      if (this.flag == "1") {
        this.passArray();
      } else if (this.flag == "2") {
        this.rejectArray();
      } else if (this.flag == "3") {
        this.passBtn();
      } else if (this.flag == "4") {
        this.rejectBtn();
      }
    },

    //通过方法
    passBtn() {
      let query = {
        isPass: this.passString,
        approvalComments: this.approvalOpinion,
        workPlanIds: this.form.planId
      };
      this.pass(query);
    },
    //驳回方法
    rejectBtn() {
      let query = {
        isPass: this.rejectString,
        approvalComments: this.approvalOpinion,
        workPlanIds: this.form.planId
      };
      this.reject(query);
    },
    //通过
    pass(query) {
      if (query.workPlanIds != "" && query.workPlanIds != null) {
        changeStatus(query).then(res => {
          if (res.rel) {
            this.$notify({
              title: res.msg,
              message: res.msg,
              type: "success",
              duration: 2000
            });
            this.$emit("getList");

            this.examineDialogVisible = false;
            this.checkDialogVisible = false;
          } else {
            this.$notify({
              title: res.msg,
              message: res.msg,
              type: "warning",
              duration: 2000
            });
            this.examineDialogVisible = false;
            this.checkDialogVisible = false;
            this.$emit("getList");
          }
        });
      } else {
        this.$alert("请选择要通过选项", "消息提示", {
          type: "warning",
          confirmButtonText: "确定",
          callback: action => {}
        });
      }
    },
    //驳回
    reject(query) {
      if (query.workPlanIds != "" && query.workPlanIds != null) {
        changeStatus(query).then(res => {
          if (res.rel) {
            this.$notify({
              title: res.msg,
              message: res.msg,
              type: "success",
              duration: 2000
            });
            this.$emit("getList");
            this.examineDialogVisible = false;
            this.checkDialogVisible = false;
          } else {
            this.$notify({
              title: res.msg,
              message: res.msg,
              type: "warning",
              duration: 2000
            });
            this.examineDialogVisible = false;
            this.checkDialogVisible = false;
            this.$emit("getList");
          }
        });
      } else {
        this.$alert("请选择要驳回项", "消息提示", {
          type: "warning",
          confirmButtonText: "确定",
          callback: action => {}
        });
      }
    },
    // 关闭方法
    close() {
      this.checkDialogVisible = false;
    },

    //输入字数
    approvalOpinionInput() {
      let txtVal = this.approvalOpinion.length;
      this.approvalOpinionRemnant = 400 - txtVal;
    },

    //获取计划详细表信息
    getList() {
      this.listLoading = true; //加载
      let params = {};
      // if (this.form.planYear != "" && this.form.planYear != null) {
      //   params.planYear = this.form.planYear;
      // }
      // if (this.form.orgName != "" && this.form.orgName != null) {
      //   params.orgName = this.form.orgName;
      // }
      // if (this.form.orgId != "" && this.form.orgId != null) {
      //   params.orgId = this.form.orgId;
      // }
      // if (this.form.deptId != "" && this.form.deptId != null) {
      //   params.deptId = this.form.deptId;
      // }
      // if (this.workType != "" && this.workType != null) {
      //   params.workType = this.workType;
      // }
      // if (this.state != "" && this.state != null) {
      //   params.state = this.state;
      // }
      if (this.workType != "" && this.workType != null) {
        params.workType = this.workType;
      }

      if (this.form.planId != "" && this.form.planId != null) {
        params.pid = this.form.planId;
      }
      params.carryOverState = this.carryOverState;

      getDetailsById(params).then(response => {
        if (this.workType == 1) {
          if (typeof response.data != "undefined") {
            this.carryForwardList = response.data;
            this.carryForwardList.forEach(element => {
              element.index = 0;
            });
          }
        }
        if (this.workType == 2) {
          if (typeof response.data != "undefined") {
            this.addWorkList = response.data;
            this.addWorkList.forEach(element => {
              element.index = 0;
            });
          }
        }
        if (this.workType == 4) {
          if (typeof response.data != "undefined") {
            this.insideThePlanList = response.data;
            this.insideThePlanList.forEach(element => {
              element.index = 0;
            });
          }
        }
        if (this.workType == 3) {
          if (typeof response.data != "undefined") {
            this.outsideThePlanList = response.data;
            this.outsideThePlanList.forEach(element => {
              element.index = 0;
            });
          }
        }
        this.listLoading = false;
      });
    },

    resetTemp() {
      this.form = {
        orgName: "",
        planYear: "",
        approvalStatus: "",
        personLiable: ""
      };
    },

    resetPlanInfoForm() {
      this.planInfoForm = {
        planId: 1,
        complete: "",
        keyWork: "",
        jobContent: "",
        startTime: "",
        endTime: "",
        personLiable: "",
        coordinationDepartment: "",
        remarks: ""
      };
    },

    //复选框
    selsChange(val) {
      let id = "";
      val.forEach(element => {
        id += "," + element.planId;
      });
      id = id.substring(1);
      this.sels = id;
    },

    handleClickOne(tab, event) {
      if (tab.name == "lastMonetPlan") {
        this.tabs.activeName = "carriedForward";
      } else {
        this.tabs.activeName = "insideThePlan";
      }
    },
    //
    handleClick(tab, event) {
      this.workType = tab.name;
      if (this.workType == "insideThePlan") {
        this.workType = "4";
        this.carryOverState = "0";
        this.state = "false";
      } else if (this.workType == "outsideThePlan") {
        this.state = "false";
        this.carryOverState = "0";
        this.workType = "3";
      } else if (this.workType == "carriedForward") {
        this.workType = "1";
        this.carryOverState = "0";
        this.state = "true";
      } else if (this.workType == "addWork") {
        this.workType = "2";
        this.carryOverState = "0";
        this.state = "true";
      }
      this.getList();
    },

    //弹框关闭执行方法
    handleClose() {
      //清空表单
      const _set = this.$refs;
      if (_set.contractLedgerForm === undefined) {
      } else {
        _set.contractLedgerForm.resetTemp();
      }
      this.checkDialogVisible = false;
    },
    //弹框关闭执行方法
    Close() {
      //清空表单
      this.examineDialogVisible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.validateText {
  position: absolute;
  font-size: 10px;
  bottom: 60px;
  right: 20px;
}
.altdiv {
  height: 450px;
  padding-right: 15px;
}
</style>