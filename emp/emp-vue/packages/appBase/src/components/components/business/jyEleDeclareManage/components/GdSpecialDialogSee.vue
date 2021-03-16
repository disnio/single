<!--
 * @功能描述: #4057 交易管理-意向电量收集-客户申报电量管理-优化-前端开发
 * @detail: 广东
 * @作者: chenf
 * @Date: 2019-11-11 11:14:17
 * @最新修改内容:
 * @LastEditTime: 2019-11-11 10:51:17
 -->
<template>
  <div>
    <el-dialog
      title="客户电量申报查看"
      :visible.sync="dialogFormVisible"
      custom-class="w1200"
      :close-on-click-modal="false"
      @close="closedialog"
      @open="opendialog"
      v-drag
    >
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="申报期次:" label-width="80px">
            <span>{{ formInline.declarationTime }}</span>
          </el-form-item>
          <el-form-item label="状态:" label-width="50px">
            <span>{{ state }}</span>
          </el-form-item>
        </el-form>
      </div>

      <div style="margin: 0 0 5px 8px">
        <el-radio-group v-model="radio" @change="changeLabel">
          <el-radio label="1">全部</el-radio>
          <el-radio label="2">未提交</el-radio>
          <el-radio label="5">待确认</el-radio>
          <el-radio label="6">已确认</el-radio>
        </el-radio-group>
      </div>

      <div style="overflow:hidden">
        <el-button-group style="float: left; margin-bottom: 8px">
          <el-button type="primary" icon="el-icon-download" @click="handleExport">导出</el-button>
        </el-button-group>

        <div
          class="txt-right"
          style="float: right; text-align:right; margin-top: 5px;"
        >单位：{{unitMap["electricityUnit"]}}</div>
      </div>

      <el-table
        :data="tableData"
        border
        fit
        highlight-current-row
        @selection-change="selsChange"
        height="290"
        v-loading="tableLoading"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>

        <el-table-column label="区域负责人" prop="contacts" align="center" width="100"></el-table-column>

        <el-table-column label="客户名称" prop="customerName" align="center" width="100"></el-table-column>

        <el-table-column label="交易中心编码" prop="tradingCenterRegistCode" align="center" width="100"></el-table-column>

        <el-table-column
          :label="`${ agoAgoMonth } 申报电量`"
          prop="beforeDeclarationElectricity"
          align="center"
          width="150"
        ></el-table-column>

        <el-table-column
          :label="`${ agoAgoMonth } 实际电量`"
          prop="beforeActualPowerUseAnalysis"
          align="center"
          width="150"
        ></el-table-column>

        <el-table-column
          :label="`${ agoAgoMonth } 偏差`"
          prop="beforeDeviationPower"
          align="center"
          width="150"
        ></el-table-column>

        <el-table-column
          :label="`${ agoAgoMonth } 偏差率`"
          prop="last2MonthDiffRate"
          align="center"
          width="150"
        ></el-table-column>

        <el-table-column
          :label="`${ agoMonth } 申报电量`"
          prop="lastMonthDeclarationElectricity"
          align="center"
          width="150"
        ></el-table-column>

        <el-table-column
          :label="`${ agoMonth } 偏差预测 `"
          prop="lastMonthDeviationForecast"
          align="center"
          width="150"
        ></el-table-column>

        <el-table-column
          :label="`${ agoMonth } 偏差率预测`"
          prop="lastMonthDeviationRateForecast"
          align="center"
          width="150"
        ></el-table-column>

        <el-table-column label="近期偏差统计" prop="recentlyDeviation" align="center" width="120"></el-table-column>

        <el-table-column
          label="历史同期用电量"
          prop="lastYearActualElectricity"
          align="center"
          width="120"
        ></el-table-column>

        <el-table-column
          label="本月合同电量"
          prop="thisPeriodContractElectricity"
          align="center"
          width="120"
        ></el-table-column>

        <el-table-column
          label="上年月度最大用电量"
          prop="lastYearMostUsedElectricity"
          align="center"
          width="120"
        ></el-table-column>

        <el-table-column label="本月申报电量" prop="declarationElectricity" align="center" width="120"></el-table-column>

        <el-table-column
          label="申报建议调整"
          prop="recommendedAdjustElectricity"
          align="center"
          width="120"
        ></el-table-column>

        <el-table-column label="调整后申报电量" prop="adjustedElectricity" align="center" width="120"></el-table-column>

        <el-table-column label="备注" prop="description" align="center" width="180"></el-table-column>

        <el-table-column label="申报状态" prop="stateName" align="center"></el-table-column>

        <el-table-column label="申报日期" prop="declarationDate" align="center" width="160"></el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="formInline.page"
          :page-sizes="[10, 20, 30, 50, 100, 200, 500, 1000]"
          :page-size="formInline.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <div style="margin-top:5px">
        本期用户申报电量
        <span>{{customerPowerDeclaration}}</span>，
        经专题讨论会决议对用户申报量调增
        <span>{{totalAdjustElectricity}}</span>，
        与电厂对接长协电量
        <el-input disabled style="width: 100px" type="number" v-model.number="longPower"></el-input>，
        预计竞价电量
        <el-input disabled style="width: 100px" v-model.number="biddingPower"></el-input>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-btn" @click="dialogFormVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  downloadImportTemplateNew,
  getDeatilPageById,
  innerExportObj,
  getTips,
  putTips,
  checkData,
  editAllState,
  editInfo,
  getBatchFlag,
  editState,
  reportTemplate,
  getStatusToReport,
  updateReportStatus
} from "@common/api/business/jyEleDeclareManage/index";
import { getUnitMap } from "@common/utils/index";
import { mapGetters } from "vuex";
import ImportDialog from "./ImportDialog";
import importResult from "./importResult";
export default {
  components: {
    ImportDialog,
    importResult
  },
  props: {
    linedata: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      tipsDialogVisible: false, //提示信息弹窗标识
      handleClickSaveLoad: false, //提示信息保存loading
      formInline: {
        page: 1,
        limit: 10,
        declarationTime: "",
        declarationId: ""
      },
      radio: "1",
      state: "",
      total: 0,

      tableData: [],
      tableLoading: false,
      tipsText: "",
      agoAgoMonth: "", //上上月
      agoMonth: "", //上月
      lalal: "",
      unitMap: {},
      allConfimFlag: false, //当前页是否全部确认
      selList: [], //复选框所选则数据
      customerPowerDeclaration: "", //本期用户申报电量
      totalAdjustElectricity: "", //申报电量调整
      longPower: "", //长协电量
      biddingPower: ""
    };
  },
  created() {
    this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
  },
  computed: {
    ...mapGetters(["elements", "allSubMenus"])
  },
  methods: {
    opendialog() {
      this.formInline.declarationTime = this.linedata.declarationTime;
      let month = "";
      if (this.formInline.declarationTime.slice(5, 6) == "0") {
        month = this.formInline.declarationTime.slice(6, 7);
      } else {
        month = this.formInline.declarationTime.slice(5, 7);
      }
      let year = this.formInline.declarationTime.slice(0, 4);

      if (month == "1") {
        this.agoAgoMonth = `${year - 1}年11月`;
        this.agoMonth = `${year - 1}年12月`;
      } else if (month == "2") {
        this.agoAgoMonth = `${year - 1}年12月`;
        this.agoMonth = `${year}年${month - 1}月`;
      } else {
        this.agoAgoMonth = `${year}年${month - 2}月`;
        this.agoMonth = `${year}年${month - 1}月`;
      }
      this.formInline.declarationId = this.linedata.declarationId;
      this.state = this.linedata.stateName;
      this.searchList();
    },
    closedialog() {
      this.tableData = [];
      this.$parent.search();
    },
    //分页
    handleSizeChange(val) {
      this.formInline.limit = val;
      this.searchList();
    },
    // 分页
    handleCurrentChange(val) {
      this.formInline.page = val;
      this.searchList();
    },
    // 状态触发事件
    changeLabel(val) {
      this.searchList();
    },
    // 查找
    async searchList() {
      this.tableLoading = true;
      let param = this.formInline;
      if (this.radio == "1") {
        param.stateCode = "";
      } else if (this.radio == "2") {
        param.stateCode = "2,7";
      } else {
        param.stateCode = this.radio;
      }
      if (param.stateCode == "") {
        delete param.stateCode;
      }
      let res = await getDeatilPageById(param);
      this.tableLoading = false;
      if (res.rel) {
        this.tableData = res.data.data.rows;
        this.total = res.data.data.total;
        this.customerPowerDeclaration =
          res.data.declaration.customerPowerDeclaration;
        this.longPower = res.data.declaration.longPower;
        this.totalAdjustElectricity =
          res.data.declaration.totalAdjustElectricity;
        this.biddingPower = res.data.declaration.biddingPower;
      }
    },
    handleUpload() {
      this.$refs.importDialog.dialogFormVisible = true;
    },
    handleExport() {
        // #4204 gaoaining 2020-06-19 添加传参 start
      let parme = {
        yjjjdl:this.biddingPower,
        djcxdl:this.longPower,
        sbltz:this.totalAdjustElectricity,
        declarationId: this.formInline.declarationId
      };
      innerExportObj(parme);
    // #4204 gaoaining 2020-06-19 添加传参 end
    },
    // 导入解析弹窗
    showImportResult() {
      this.$refs.importResultDialog.init(this.formInline.declarationId);
    },
    // 模板下载
    handledownloadTemplate() {
      downloadImportTemplateNew(
        "customerPage",
        this.formInline.declarationTime
      );
    },

    //行内确认 checkrow
    handleUpdate(row, index) {
      checkData(row).then(res => {
        if (res.rel) {
          let param = Object.assign({}, row);
          param.stateCode = "6";
          this.putLinedata(param);
        } else {
          this.$confirm("超过往期申报电量最大日值范围，是否确认?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            let param = Object.assign({}, row);
            param.stateCode = "6";
            this.putLinedata(param);
          });
        }
      });
    },
    // 行内确认 put
    async putLinedata(row) {
      let param = row;
      param.declarationId = this.formInline.declarationId;
      let res = await editAllState(param);
      if (res.rel) {
        this.searchList();
        this.$notify({
          title: "成功",
          message: "成功",
          type: "success",
          duration: 2000
        });
      } else {
        this.$notify({
          title: "失败",
          message: res.msg,
          type: "warning",
          duration: 2000
        });
      }
    },
    // 行内取消确认
    async handleCancelConfirm(row) {
      let param = {
        detailId: row.detailId,
        stateCode: "5",
        declarationId: this.formInline.declarationId
      };
      let res = await editAllState(param);
      if (res.rel) {
        this.searchList();
        this.$notify({
          title: "成功",
          message: "成功",
          type: "success",
          duration: 2000
        });
      } else {
        this.$notify({
          title: "失败",
          message: res.msg,
          type: "warning",
          duration: 2000
        });
      }
    },
    // 行内驳回
    async handleReject(row) {
      let param = {
        detailId: row.detailId,
        stateCode: "7",
        declarationId: this.formInline.declarationId
      };
      let res = await editAllState(param);
      if (res.rel) {
        this.searchList();
        this.$notify({
          title: "成功",
          message: "成功",
          type: "success",
          duration: 2000
        });
      } else {
        this.$notify({
          title: "失败",
          message: res.msg,
          type: "warning",
          duration: 2000
        });
      }
    },
    // 下发
    handleLowDown() {
      getTips(this.formInline.declarationId).then(res => {
        if (res.data.tips) {
          editState(param).then(res => {
            if (res.rel) {
              this.state = "已下发";
              this.$message({
                message: "下发成功",
                type: "success"
              });
            } else {
              this.$message.error(`失败！${res.msg}`);
            }
          });
        } else {
          this.$confirm("此次下发未填写提示信息，是否确认下发?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              let param = {
                declarationId: this.formInline.declarationId,
                stateCode: "4"
              };
              editState(param).then(res => {
                if (res.rel) {
                  this.state = "已下发";
                  this.$message({
                    message: "下发成功",
                    type: "success"
                  });
                } else {
                  this.$message.error(`失败！${res.msg}`);
                }
              });
            })
            .catch(() => {});
        }
      });
    },
    // 提示信息
    async handleTipsBtn() {
      this.tipsDialogVisible = true;
      let res = await getTips(this.formInline.declarationId);
      if (res.rel) {
        this.tipsText = res.data.tips;
      }
    },
    // 批量确认
    handleConfirm() {
      if (this.selList.length > 0) {
        this.$confirm("选中信息是否批量确认?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            // 是否存在 已确认的
            let haveExit = this.selList.find(item => {
              return item.stateCode == "6";
            });
            if (haveExit) {
              this.$message.error("当前选择存在“已确认”数据，请检查所选数据！");
            } else {
              // 是否存在 不是待确认的
              let flag = this.selList.find(item => {
                return item.stateCode != "5";
              });
              // 存在 调取企业参数配置接口
              if (flag) {
                getBatchFlag({
                  configurationId: "3",
                  parameterCode: "1030001"
                }).then(res => {
                  // 如果值为是则直接走确认
                  if (res == 0) {
                    let param = this.selList;
                    param.forEach(item => {
                      item.stateCode = "6";
                    });
                    editInfo(param).then(res => {
                      if (res.rel) {
                        this.searchList();
                        this.$message({
                          message: "批量确认成功",
                          type: "success"
                        });
                      }
                    });
                  } else {
                    // 否则提示
                    this.$message({
                      message: "请选择待确认数据",
                      type: "warning"
                    });
                  }
                });
              } else {
                //全是待确认数据 直接 存
                let param = this.selList;
                param.forEach(item => {
                  item.stateCode = "6";
                });
                editInfo(param).then(res => {
                  if (res.rel) {
                    this.searchList();
                    this.$message({
                      message: "批量确认成功",
                      type: "success"
                    });
                  }
                });
              }
            }
          })
          .catch(() => {});
      } else {
        this.$message({
          message: "请选择确认数据",
          type: "warning"
        });
      }
    },
    // 批量驳回
    handleRejectMuch() {
      if (this.selList.length > 0) {
        // 是否存在 不是待确认的
        let flag = this.selList.find(item => {
          return item.stateCode != "5";
        });
        //如果存在 提示
        if (flag) {
          this.$message({
            message: "请选择待确认数据",
            type: "warning"
          });
        } else {
          //不存在 保存
          this.$confirm("选中信息是否批量确认?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              let param = this.selList;
              param.forEach(item => {
                item.stateCode = "7";
              });
              editInfo(param).then(res => {
                if (res.rel) {
                  this.searchList();
                  this.$message({
                    message: "批量驳回成功",
                    type: "success"
                  });
                }
              });
            })
            .catch(() => {});
        }
      } else {
        this.$message({
          message: "请选择驳回数据",
          type: "warning"
        });
      }
    },
    openTipsdialog() {},
    closeTipsdialog() {
      this.tipsText = "";
    },
    // 提示信息弹窗保存
    async handleClickSave() {
      let param = {
        declarationId: this.formInline.declarationId,
        tips: this.tipsText
      };
      let res = await putTips(this.formInline.declarationId, param);
      if (res.rel) {
        this.tipsDialogVisible = false;
        this.$message({
          message: "保存成功",
          type: "success"
        });
      }
    },
    //确认完毕
    async handleConfirmOver() {
      let parme = {
        declarationId: this.formInline.declarationId
      };
      let res = await getStatusToReport(parme);
      if (res.rel) {
        if (res.data) {
          let param = {
            declarationId: this.formInline.declarationId,
            stateCode: "6"
          };
          let response = await updateReportStatus(param);
          if (response.rel) {
            this.$message({
              message: response.msg,
              type: "success"
            });
            this.dialogFormVisible = false;
          } else {
            this.$message.error(`${response.msg}`);
          }
        } else {
          this.$message({
            message: res.msg,
            type: "warning"
          });
        }
      } else {
        this.$message({
          message: res.msg,
          type: "warning"
        });
      }
    },
    // 生成上报模板
    handleReport() {
      reportTemplate(this.formInline.declarationId);
    },
    // 页面底部 保存
    async handleSave() {
      let res = await editInfo(this.tableData);
      if (res.rel) {
        this.searchList();
        this.$notify({
          title: "成功",
          message: "保存成功",
          type: "success",
          duration: 2000
        });
      } else {
        this.$notify({
          title: "失败",
          message: res.msg,
          type: "warning",
          duration: 2000
        });
      }
    },
    // 复选框 change 时间
    selsChange(val) {
      this.selList = val;
    },
    // 失去焦点 远程计算 底部电价
    async longPowerBlur() {
      let param = {
        declarationId: this.formInline.declarationId,
        longPower: this.longPower
      };
      let res = await putTips(this.formInline.declarationId, param);
      if (res.rel) {
        this.biddingPower = res.data.biddingPower;
      }
    },
    blurInput(row, index) {
      if (
        this.tableData[index].declarationElectricity == "" &&
        this.tableData[index].recommendedAdjustElectricity == ""
      ) {
        this.tableData[index].adjustedElectricity = "";
      } else if (this.tableData[index].declarationElectricity == "") {
        this.tableData[index].adjustedElectricity = this.tableData[
          index
        ].recommendedAdjustElectricity;
      } else if (this.tableData[index].recommendedAdjustElectricity == "") {
        this.tableData[index].adjustedElectricity = this.tableData[
          index
        ].declarationElectricity;
      } else {
        this.tableData[index].adjustedElectricity =
          Number(this.tableData[index].declarationElectricity) +
          Number(this.tableData[index].recommendedAdjustElectricity);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
