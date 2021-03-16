<template>
  <div class="app-container calendar-list-container">
     <!-- 2019-11-14 秦侯珍 #2616 设置弹框高度自适应  start -->
    <div :style="{paddingRight:'10px',height:(dialogHeight)+'px'}">
      <el-scrollbar>
        <!-- 2019-11-14 郑文杰 #2616 设置弹框高度自适应  end-->
    <!--工作计划列表弹出框 -->

    <!-- <plan-list v-bind:listType="listType" ref="planList" @showInfo="showInfo"></plan-list>  -->
    <el-table
      :height="tabHeight"
      border
      @selection-change="selsChange"
      :data="pageList"
      style="width: 100%"
    >
      <el-table-column type="selection" align="center" width="55"></el-table-column>
      <el-table-column type="index" label="序号" align="center" width="70px"></el-table-column>
      <!-- <el-table-column prop="planYear" align="center" label="计划年月">
          <template slot-scope="scope">
            <div>{{ scope.row.planYear }}</div>
          </template>
      </el-table-column>-->
      <!-- <el-table-column prop="planYear" align="center" label="工作计划数量">
          <template slot-scope="scope">
            <div>{{ scope.row.planYear }}</div>
          </template>
      </el-table-column>-->
      <el-table-column prop="jobContent" width="300px" align="center" label="工作内容">
       <template slot-scope="scope">
                <el-popover
                  placement="top-start"
                  title="工作内容预览"
                  width="300"
                  trigger="hover"
                  :content="scope.row.jobContent"
                >
                  <span slot="reference">{{ scope.row.jobContent }}</span>
                </el-popover>
              </template>
      </el-table-column>
      <el-table-column prop="personLiable" align="center" label="责任人">
        <template slot-scope="scope">
          <div>{{ scope.row.personLiable }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="crtUser" align="center" label="制定人">
        <template slot-scope="scope">
          <div>{{ scope.row.crtUser }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="coordinationDepartmentName" align="center" label="协助部门">
        <template slot-scope="scope">
          <div>{{ scope.row.coordinationDepartmentName }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="startTime" align="center" label="开始时间">
        <template slot-scope="scope">
          <div>{{ scope.row.startTime }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="endTime" align="center" label="完成时间">
        <template slot-scope="scope">
          <div>{{ scope.row.endTime }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="workTypeName" align="center" label="工作分类">
        <template slot-scope="scope">
          <div>{{ scope.row.workTypeName }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="completeName" align="center" label="是否完成">
        <template slot-scope="scope">
          <span>{{ scope.row.completeName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="keyWorkName" width="100px" align="center" label="是否重点工作">
        <template slot-scope="scope">
          <span>{{ scope.row.keyWorkName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="stateName" align="center" label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.stateName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remarks" align="center" label="备注">
        <template slot-scope="scope">
          <span>{{ scope.row.remarks }}</span>
        </template>
      </el-table-column>
    </el-table>
    </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { getStateCode } from "@common/api/contractManage/contractLedger/index";
import {
  page,
  getManagePageList,
  delObj,
  getOrginCode,
  exportObj,
  getDetailsById,
  carryoverDetails,
  completeDetails,
  exportDetailsObj,
  cancelCompleteDetails
} from "@common/api/marketingSystem/marketingPlan/index";
import { getUserOrgInfo } from "@common/api/public/index";
import { mapGetters } from "vuex";
import { parseTime,initDialogHeight } from "@common/utils/index";
// const PlanList = () =>
//   import("./planList");
//     const Formulate = () =>
//   import("@common/components//planFormulate/planList");
export default {
  name: "planHandleDetails",
  components: {
    // Formulate,
    // PlanList
  },
  props: {
    listType: { type: String }
  },
  data() {
    return {
      planId: "",
      dialogHeight: "", //弹框高度
      tabHeight: "0", //表格的高度
      carryOverDis: false,
      comDis: false,
      complete: false,
      orgInfo: {
        orgName: "",
        orgId: ""
      },
      total: 0,
      btn_disabale: false,
      pageList: [],
      List: [],
      planId: undefined, //复选框id
      stateOptions: [], //审批状态下拉框
      planYear: new Date(), //计划年份默认日期
      listLoading: false, //刷新
      listQuery: {
        page: 1,
        limit: 10,
        approvalStatus: undefined, //审批状态下拉框
        planYear: undefined //计划年月
      },
      dialogFormVisible: false,
      formLoading: false,
      dialogTitle: "编辑",
      btns: {},
      tabs: {
        lastMonthCarriedForward: true,
        carriedForward: false,
        addWork: true,
        outsideThePlan: false,
        activeName: "addWork"
      }
    };
  },
  computed: {
    ...mapGetters(["elements", "orgId"])
  },
  //初始化
  created() {
    getStateCode().then(res => {
      this.stateOptions = res;
    });
    this.getList();
    this.initBtn();
    this.setLayoutHeight();
  },
  mounted() {
    const that = this;
    this.dialogHeight = initDialogHeight(); //获取弹框高度
    window.onresize = function temp() {
      that.dialogHeight = initDialogHeight(); //获取弹框高度(监控高度变化)
    };
  },
  methods: {
    setLayoutHeight() {
      this.tabHeight = initDialogHeight() * 0.8 + "px"; //修改计算的表格高度 
    },
    //初始化按钮
    initBtn() {
      this.btns.edit = this.elements["planHandle:btn_edit"];
      this.btns.btn_export = this.elements["planHandle:btn_export"];
      this.btns.btn_save = this.elements["planHandle:btn_save"];
      this.btns.btn_carryOver = this.elements["planHandle:btn_carryOver"];
    },
    //删除
    handleDelById() {
      if (this.delByIdStatus == "20") {
        this.$confirm("只可删除状态为“已保存”或“已驳回”的工作计划", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
      } else {
        if (this.sels != "") {
          this.$confirm("此操作将永久删除, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            delObj(this.sels).then(res => {
              if (res.rel) {
                this.$notify({
                  title: res.msg,
                  message: res.msg,
                  type: "success",
                  duration: 2000
                });
                this.getList();
              } else {
                this.$notify({
                  title: res.msg,
                  message: res.msg,
                  type: "warning",
                  duration: 2000
                });
                this.getList();
              }
            });
          });
        } else {
          this.$message({
            message: "请选择一条数据",
            type: "warning"
          });
        }
      }
    },
    //列表数据检索
    handleFilter() {
      this.getList();
    },
    //获取列表数据
    getList() {
      this.listLoading = true; //加载
      let params = {};
      params.page = this.listQuery.page;
      params.limit = this.listQuery.limit;
      if (this.listQuery.planYear != "" && this.listQuery.planYear != null) {
        params.planYear = this.listQuery.planYear;
      }
      if (
        this.listQuery.approvalStatus != "" &&
        this.listQuery.approvalStatus != null
      ) {
        params.approvalStatus = this.listQuery.approvalStatus;
      }
      getManagePageList(params).then(response => {
        let items = response.data.rows.map((item, index) => {
          item.index =
            index + 1 + (this.listQuery.page - 1) * this.listQuery.limit;
          return item;
        });
        //this.list=items;
        this.List = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    getPlanYear(val) {
      if (val) {
        this.monthData = parseTime(val, "{y}-{m}");
      }
      this.listQuery.planYear = this.monthData;
    },
    //变更分页条数
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    //点击分页
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },

    //导出方法
    handleExport() {
      let parme = {
        organizationalAttributes: this.listQuery.organizationalAttributes,
        planYear: this.listQuery.planYear,
        approvalStatus: this.listQuery.approvalStatus
      };
      exportDetailsObj(parme);
    },

    //打开制定新增按钮
    openDialog() {},
    //获取ID
    selsChange(selection) {
      this.carryOverDis = false;
      this.comDis = false;
      this.complete = false;
      let id = "";
      selection.forEach(element => {
        id += "," + element.detailsId;
        if (element.state == "17") {
          //this.carryOverDis = false;
        } else {
          this.carryOverDis = true;
        }
        if (element.state == "16") {
          this.comDis = true;
        } else {
          //this.comDis = false;
        }
        if (element.state == "18") {
          //this.complete = false;
        } else {
          this.complete = true;
        }
      });
      id = id.substring(1);
      this.sels = id;
      // this.$parent.carryOverDis = this.carryOverDis;
      // this.$parent.comDis = this.comDis;
      // this.$parent.complete = this.complete;
       this.$emit("changecarryOverDis",this.carryOverDis);
       this.$emit("changecomDis", this.comDis);
       this.$emit("changecomplete", this.complete);

    },
    //打开制定查看按钮
    viewInfo(row) {
      this.dialogTitle = "查看计划";
      this.dialogFormVisible = true;
      this.btn_disabale = true;
      this.planId = row.planId;
      this.getListInfo(row);
      // if (typeof this.$refs.planList != "undefined") {
      //   this.$refs.planList.initList(row, "view");
      // }
    },
    getListInfo(row) {
      getDetailsById({ pid: row.planId }).then(res => {
        if (res.rel) {
          this.pageList = res.data;
          // this.$notify({
          //   title: "成功",
          //   message: res.msg,
          //   type: "success",
          //   duration: 2000
          // });
        } else {
          this.$notify({
            title: "提示",
            message: res.msg,
            type: "warning",
            duration: 2000
          });
        }
      });
    },
    //编辑按钮展示
    handleUpdate(row) {
      this.planId = row.planId;
      this.btn_disabale = false;
      this.dialogTitle = "编辑计划";
      this.dialogFormVisible = true;
      this.getListInfo(row);
      // if (typeof this.$refs.planList != "undefined") {
      //   this.$refs.planList.initList(row, "view");
      // }
    },
    //显示表单提示
    showResultMsg(res) {
      if (res.rel) {
        this.dialogFormVisible = false;
        this.listQuery.page = 1;
        this.getList();
        this.$notify({
          title: "成功",
          message: res.msg,
          type: "success",
          duration: 2000
        });
      } else {
        this.$notify({
          title: "提示",
          message: res.msg,
          type: "warning",
          duration: 2000
        });
      }
    },
    //删除数据
    handleDelete(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delFormulate(row.taskId).then(res => {
          this.showResultMsg(res);
        });
      });
    },
    //关闭form
    cancel(formName) {
      this.dialogFormVisible = false;
      const set = this.$refs;
      //set[formName].resetFields();
    },

    //弹框关闭执行方法
    handleClose() {
      this.dialogFormVisible = false;
    },
    //提交审核
    submit() {
      completeDetails({ detailsIds: this.sels }).then(res => {
        if (res.rel) {
          //this.dialogFormVisible = false;
          let row = { planId: this.planId };
          this.getListInfo(row);
          this.$notify({
            title: "成功",
            message: res.msg,
            type: "success",
            duration: 2000
          });
        } else {
          this.$notify({
            title: "提示",
            message: res.msg,
            type: "warning",
            duration: 2000
          });
        }
      });
    },
    unsubmit() {
      cancelCompleteDetails({ detailsIds: this.sels }).then(res => {
        if (res.rel) {
          //this.dialogFormVisible = false;
          let row = { planId: this.planId };
          this.getListInfo(row);
          this.$notify({
            title: "成功",
            message: res.msg,
            type: "success",
            duration: 2000
          });
        } else {
          this.$notify({
            title: "提示",
            message: res.msg,
            type: "warning",
            duration: 2000
          });
        }
      });
    },
    carryOver() {
      this.$confirm("未完成工作计划是否结转?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        carryoverDetails({ detailsIds: this.sels }).then(res => {
          if (res.rel) {
            // this.dialogFormVisible = false;
            let row = { planId: this.planId };
            this.getListInfo(row);
            this.$notify({
              title: "成功",
              message: res.msg,
              type: "success",
              duration: 2000
            });
          } else {
            this.$notify({
              title: "提示",
              message: res.msg,
              type: "warning",
              duration: 2000
            });
          }
        });
      });
    },
    //查看计划详情   
    showInfo(row) {
      this.$refs.purchaseAndSale.initUpdateDialog(row, "view");
    }
  }
};
</script>
<style scoped>
</style>