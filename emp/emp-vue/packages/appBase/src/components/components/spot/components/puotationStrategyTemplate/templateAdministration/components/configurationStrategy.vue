<template>
  <div>
    <div
      v-if="this.bjcnmbpzDelQuery.isCheckStatus"
      class="filter-container"
    >
      <el-button-group>
        <el-button
          :loading="saveBtnLoding"
          @click="configSave"
          class="filter-item"
          type="primary"
          icon="el-icon-circle-plus-outline"
        >保存</el-button>
        <el-button
          @click="configDel"
          class="filter-item"
          type="primary"
          icon="el-icon-delete"
        >删除</el-button>
      </el-button-group>
    </div>
    <div class="table" ref="testcf">
      <el-table
        height="500"
        @selection-change="getSelectionIds"
        :key="tableKey"
        :data="tableDataList"
        v-loading.body="listLoading"
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          v-if="this.bjcnmbpzDelQuery.isCheckStatus"
          type="selection"
          align="center"
          width="55"
        ></el-table-column>
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="70px"
        ></el-table-column>
        <el-table-column
          align="center"
          label="报价时点"
        >
          <template slot-scope="scope">
            <div>{{scope.row.tranTime}}</div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="段号"
        >
          <template slot-scope="scope">
            <div>{{scope.row.bandCode}}</div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="负荷/容量"
        >
          <template slot-scope="scope">
            <div style="white-space: normal;">
              {{scope.row.capacityFormula}}&nbsp;&nbsp;
              <i
                v-if="bjcnmbpzDelQuery.isCheckStatus"
                @click="clickCapacityIcon(scope.$index, scope.row)"
                class="el-icon-edit iconStyle"
              ></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="报价"
        >
          <template slot-scope="scope">
            <div style="white-space: normal;">
              {{scope.row.priceFormula}}&nbsp;&nbsp;
              <i
                v-if="bjcnmbpzDelQuery.isCheckStatus"
                @click="clickPriceIcon(scope.$index,scope.row)"
                class="el-icon-edit iconStyle"
              ></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :before-close="clearForm"
      title="负荷/容量"
      :visible.sync="LoadapacityDialog"
      custom-class="w640"
      :close-on-click-modal="false"
      v-drag
    >
      <div>
        <el-row>
          <el-col :span="8">
            <el-card class="box-card">
              <div
                slot="header"
                class="clearfix"
              >
                <span>可选指标区域</span>
              </div>
              <div
                class="calculationStyle"
                style="height:264px;"
              >
                <el-scrollbar>
                  <div
                    v-for="item in chooeTable"
                    class="calculation"
                    :key="item.index"
                    @dblclick="clickFormula(item)"
                  >{{item.tragetName}}</div>
                </el-scrollbar>
              </div>
            </el-card>
          </el-col>
          <el-col :span="16">
            <el-card class="box-card">
              <div
                slot="header"
                class="clearfix"
              >
                <span>公式编辑区域</span>
              </div>
              <div class="text item">
                <el-input
                  :disabled="!this.bjcnmbpzDelQuery.isCheckStatus"
                  type="textarea"
                  :autosize="{ minRows: 12, maxRows:20}"
                  :maxlength="400"
                  v-model="editCapacityFormula"
                ></el-input>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <span class="smtips">
          操作说明： 双击左侧可选指定区域指标进行指标选择
        </span>
        <el-button
          v-if="bjcnmbpzDelQuery.isCheckStatus"
          @click="clickCheckFormula"
        >校验公式</el-button>
        <el-button
          v-if="bjcnmbpzDelQuery.isCheckStatus"
          type="primary"
          @click="makeBackclickCheckFormula"
        >确认返回</el-button>
        <!-- <div>{{bjcnmbpzDelQuery}}</div> -->
        <el-button
          v-if="!bjcnmbpzDelQuery.isCheckStatus"
          class="cancel-btn"
          @click="LoadapacityDialog = false;"
        >关闭</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :before-close="clearForm"
      title="报价"
      :visible.sync="offerDialog"
      custom-class="w640"
      :close-on-click-modal="false"
      v-drag
    >
      <div>
        <el-row>
          <el-col :span="8">
            <el-card class="box-card">
              <div
                slot="header"
                class="clearfix"
              >
                <span>可选指标区域</span>
              </div>
              <div
                class="calculationStyle"
                style="height:264px;"
              >
                <el-scrollbar>
                  <div
                    v-for="item in offerTable"
                    class="calculation"
                    :key="item.index"
                    @dblclick="clickoffer(item)"
                  >{{item.tragetName}}</div>
                </el-scrollbar>
              </div>
            </el-card>
          </el-col>
          <el-col :span="16">
            <el-card class="box-card">
              <div
                slot="header"
                class="clearfix"
              >
                <span>公式编辑区域</span>
              </div>
              <div class="text item">
                <el-input
                  :disabled="!this.bjcnmbpzDelQuery.isCheckStatus"
                  type="textarea"
                  :autosize="{ minRows: 12, maxRows:20}"
                  :maxlength="400"
                  v-model="editofferInput"
                ></el-input>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <span class="smtips">
          操作说明： 双击左侧可选指定区域指标进行指标选择
        </span>
        <el-button
          v-if="bjcnmbpzDelQuery.isCheckStatus"
          @click="clickCheckoffer"
        >校验公式</el-button>
        <el-button
          v-if="bjcnmbpzDelQuery.isCheckStatus"
          type="primary"
          @click="makeBackclickCheckoffer"
        >确认返回</el-button>
        <el-button
          v-if="!bjcnmbpzDelQuery.isCheckStatus"
          class="cancel-btn"
          @click="offerDialog = false;"
        >关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getDetailAll,
  deleteDetailObj,
  addDetailObj,
  getDetailzbjg,
  getDetailzbrl,
  updateDetail,
  getZbgs
} from "@common/api/spot/configure/puotationStrategyTemplate/templateAdministration/index";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      saveBtnLoding: false,
      // offerString: "",
      FormulaString: "",
      initDisabled: false,
      offerTableRow: [],
      offerTableIndex: 0,
      FormulatableDataRow: {},
      FormulatableDataIndex: 0,
      offer: "",
      capacity: "",
      editofferInput: "",
      offerTable: [],
      offerDialog: false,
      chooeTable: [],
      editCapacityFormula: "",
      LoadapacityDialog: false,
      delIds: "",
      total: 0,
      tableKey: 1,
      listLoading: false,
      tableDataList: []
    };
  },
  computed: {
    ...mapGetters(["elements", "bjcnmbpzDelQuery"])
  },
  created() {
    this.configCreate();
  },
  mounted() {

  },
  methods: {
    getList() {
      this.listLoading = true;
      let parame = {
        templateid: this.bjcnmbpzDelQuery.templateid
      };
      getDetailAll(parame).then(response => {
        this.listLoading = false;
        if (response.data.length > 0) {
          this.tableDataList = response.data;
          this.initDisabled = true;
        } else {
          this.initDisabled = false;
          this.tableDataList = response.data;
        }
      });
    },
    configCreate() {
      getDetailAll({ templateid: this.bjcnmbpzDelQuery.templateid }).then(
        response => {
          if (response.rel) {
            if (response.data.length != 0) {
              this.tableDataList = response.data;
            } else {
              let parame = {
                areaCode: this.bjcnmbpzDelQuery.areaCode,
                areaCompanyCode: this.bjcnmbpzDelQuery.areaCompanyCode,
                tradingCenterCode: this.bjcnmbpzDelQuery.tradingCenterCode, //新增交易中心条件
                templateid: this.bjcnmbpzDelQuery.templateid
              };
              addDetailObj(parame).then(res => {
                if (res.rel) {
                  // this.$notify({
                  //   title: "成功",
                  //   message: res.msg,
                  //   type: "success",
                  //   duration: 2000
                  // });
                  this.getList();
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
          } else {
            this.$notify({
              title: "失败",
              message: response.msg,
              type: "warning",
              duration: 2000
            });
          }
        }
      );
    },
    // ==========负荷 容量b===================================================
    // 负荷 容量 点击图标
    clickCapacityIcon(index, row) {
      if (row.capacityFormula != undefined) {
        this.editCapacityFormula = row.capacityFormula;
      }
      this.FormulatableDataIndex = index;
      this.FormulatableDataRow = row;
      this.LoadapacityDialog = true;
      let par = {
        areaCompanyCode: this.bjcnmbpzDelQuery.areaCompanyCode,
        areaCode: this.bjcnmbpzDelQuery.areaCode,
        trandingCenterCode: this.bjcnmbpzDelQuery.tradingCenterCode
      };
      getDetailzbrl(par).then(res => {
        this.chooeTable = res.data;
      });
    },
    // 负荷 容量 点击 左侧值
    clickFormula(data) {
      if (this.bjcnmbpzDelQuery.isCheckStatus) {
        this.editCapacityFormula += "{" + data.tragetName + "}";
        this.FormulaString += "," + data.tragetName;
        this.FormulaString = this.FormulaString.substring(1);
      } else {
      }
    },
    // 负荷 容量 点击 校验公式
    clickCheckFormula() {
      this.editCapacityFormula = this.editCapacityFormula.trim();
      let parme = {
        zbJsgs: this.editCapacityFormula
        // zbNames: this.FormulaString
      };
      // console.log(parme.zbJsgs);
      if (parme.zbJsgs){
        getZbgs(parme).then(res => {
          if (res.rel) {
            this.$notify({
              title: "成功",
              message: res.msg,
              type: "success",
              duration: 2000
            });
            this.$set(
              this.tableDataList[this.FormulatableDataIndex],
              "capacityFormula",
              this.editCapacityFormula
            );
            // this.LoadapacityDialog = false;
          } else {
            this.$notify({
              title: "提示",
              message: res.msg,
              type: "warning",
              duration: 2000
            });
            this.LoadapacityDialog = true;
          }
        });
      } else {
        this.$notify({
          title: "提示",
          message: "请编辑公式后再进行校验",
          type: "warning",
          duration: 2000
        });
      }
    },
    //负荷 容量 确认返回
    makeBackclickCheckFormula() {
      this.editCapacityFormula = this.editCapacityFormula.trim();
      let parme = {
        zbJsgs: this.editCapacityFormula
        // zbNames: this.FormulaString
      };
      if (parme.zbJsgs){
        getZbgs(parme)
          .then(res => {
            if (res.rel) {
              this.$notify({
                title: "成功",
                message: res.msg,
                type: "success",
                duration: 2000
              });
              this.$set(
                this.tableDataList[this.FormulatableDataIndex],
                "capacityFormula",
                this.editCapacityFormula
              );
              this.LoadapacityDialog = false;
            } else {
              this.$notify({
                title: "提示",
                message: res.msg,
                type: "warning",
                duration: 2000
              });
              this.$set(this.editCapacityFormula);
              this.LoadapacityDialog = true;
            }
          })
          .then(res => {
            this.FormulaString = "";
            this.editofferInput = "";
            this.editCapacityFormula = "";
          });
      } else {
        this.$notify({
          title: "提示",
          message: "请编辑公式后再进行确认",
          type: "warning",
          duration: 2000
        });
      }
    },
    // ==========负荷 容量e======================================================
    // ============报价b======================================================
    // 报价 点击图标
    clickPriceIcon(index, row) {
      if (row.priceFormula != undefined) {
        this.editofferInput = row.priceFormula;
      }
      this.offerTableIndex = index;
      this.offerTableRow = row;
      this.offerDialog = true;
      let par = {
        areaCompanyCode: this.bjcnmbpzDelQuery.areaCompanyCode,
        areaCode: this.bjcnmbpzDelQuery.areaCode,
        /*
        #586 现货配置管理-报价策略模板配置
        备注： 增加交易中心判断           --- start---
        author:chenf
        */
        trandingCenterCode: this.bjcnmbpzDelQuery.tradingCenterCode
        /*
        #586 现货配置管理-报价策略模板配置
        备注： 增加交易中心判断           --- end---
        author:chenf
        */
      };
      getDetailzbjg(par).then(res => {
        this.offerTable = res.data;
      });
    },
    // 报价  点击左侧值
    clickoffer(data) {
      if (this.bjcnmbpzDelQuery.isCheckStatus) {
        this.editofferInput = this.editofferInput + "{" + data.tragetName + "}";
      } else {
      }
    },
    // 报价 公式校验
    clickCheckoffer() {
      this.editofferInput = this.editofferInput.trim()
      let parme = {
        zbJsgs: this.editofferInput
      };
      if (parme.zbJsgs){
        getZbgs(parme).then(res => {
          if (res.rel) {
            this.$notify({
              title: "成功",
              message: res.msg,
              type: "success",
              duration: 2000
            });
            this.$set(
              this.tableDataList[this.offerTableIndex],
              "priceFormula",
              this.editofferInput
            );
            // this.offerDialog = false;
          } else {
            this.$notify({
              title: "提示",
              message: res.msg,
              type: "warning",
              duration: 2000
            });
            this.offerDialog = true;
          }
        });
      } else {
        this.$notify({
          title: "提示",
          message: "请编辑公式后再进行校验",
          type: "warning",
          duration: 2000
        });
      }
    },
    // 报价 确认返回
    makeBackclickCheckoffer() {
      this.editofferInput = this.editofferInput.trim()
      let parme = {
        zbJsgs: this.editofferInput
      };
      if (parme.zbJsgs){
        getZbgs(parme)
          .then(res => {
            if (res.rel) {
              this.$notify({
                title: "成功",
                message: res.msg,
                type: "success",
                duration: 2000
              });
              this.$set(
                this.tableDataList[this.offerTableIndex],
                "priceFormula",
                this.editofferInput
              );
              this.offerDialog = false;
            } else {
              this.$notify({
                title: "提示",
                message: res.msg,
                type: "warning",
                duration: 2000
              });
              this.$set(this.editofferInput);
              this.offerDialog = true;
            }
          })
          .then(res => {
            this.FormulaString = "";
            this.editofferInput = "";
            this.editCapacityFormula = "";
          });
      } else {
        this.$notify({
          title: "提示",
          message: "请编辑公式后再进行确认",
          type: "warning",
          duration: 2000
        });
      }

    },
    // ============报价e======================================================
    clearForm() {
      this.FormulaString = "";
      this.offerDialog = false;
      this.LoadapacityDialog = false;
      this.editofferInput = "";
      this.editCapacityFormula = "";
    },
    // makeBack() {
    //   this.offerString = "";
    //   this.FormulaString = "";
    //   this.offerDialog = false;
    //   this.LoadapacityDialog = false;
    //   this.editofferInput = "";
    //   this.editCapacityFormula = "";
    // },
    configSave() {
      this.saveBtnLoding = true;
      updateDetail(this.tableDataList).then(res => {
        this.saveBtnLoding = false;
        if (res.rel) {
          this.$notify({
            title: "成功",
            message: res.msg,
            type: "success",
            duration: 2000
          });
          this.getList();
        } else {
          this.$notify({
            title: "失败",
            message: res.msg,
            type: "warning",
            duration: 2000
          });
        }
      });
    },
    configDel() {
      let parames = {
        templateDetailIds: this.delIds
      };
      deleteDetailObj(parames).then(res => {
        if (res.rel) {
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 2000
          });
          this.getList();
        } else {
          this.$notify({
            title: "失败",
            message: "删除失败",
            type: "warning",
            duration: 2000
          });
        }
      });
    },
    getSelectionIds(val) {
      if (val) {
        let id = [];
        val.forEach(element => {
          id.push(element.templateDetailId + "");
        });
        this.delIds = id;
      }
    }
  }
};
</script>

<style scoped>
.calculationStyle {
  height: 180px;
}
.calculation {
  height: 30px;
  line-height: 30px;
}
.calculation:hover {
  background-color: #d1dcf1;
}
.iconStyle:hover {
  color: blue;
}
.smtips {
  display: inline-block;
  float: left;
  color: orangered;
  font-size: 14px
}


/*.el-table--border td:nth-last-child(1){
  border-bottom: none;
}*/

.el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}
</style>
