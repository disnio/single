<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        class="form-inline-168 "
        :inline="true"
        :model="listQuery"
      >
        <el-form-item
          label="交易序列名称"
          algin="right"
        >
          <el-input
            class="filter-item"
            v-model="listQuery['noticeName']"
            :clearable="true"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item
          label="交易中心"
          label-width="70px"
          algin="right"
        >
          <el-select
            class="four-col left"
            :clearable="true"
            v-model="listQuery['tradingCenterId']"
            placeholder="请选择"
          >
            <el-option
              v-for="item in centerOptions"
              :key="item.jyorgId"
              :label="item.jyorgName"
              :value="item.jyorgId"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="交易品种">
          <el-select
            class="four-col left"
            :clearable="true"
            v-model="listQuery['tradeVarietyCode']"
            placeholder="请选择"
          >
            <el-option
              v-for="item in varietyOptions"
              :key="item.propCode"
              :label="item.propName"
              :value="item.propCode"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="交易周期"
          label-width="70px"
          algin="right"
        >
          <el-select
            class="four-col left"
            :clearable="true"
            v-model="listQuery['tradeCycleCode']"
            placeholder="请选择"
          >
            <el-option
              v-for="item in periodOptions"
              :key="item.propCode"
              :label="item.propName"
              :value="item.propCode"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易期次">
          <el-date-picker
            v-if="listQuery['tradeCycleCode']==''"
            type="year"
            class="w180"
            :clearable="true"
            placeholder="选择年"
            disabled
          >
          </el-date-picker>
          <el-date-picker
            v-if="listQuery['tradeCycleCode']=='jyzq01'"
            v-model="tradeIssureData.yearData"
            type="year"
            class="w180"
            placeholder="选择年"
            :clearable="true"
            @change="setTradeIssure"
          >
          </el-date-picker>
          <el-date-picker
            v-if="listQuery['tradeCycleCode']=='jyzq02'"
            v-model="tradeIssureData.yearData"
            type="year"
            @change="setTradeIssure"
            style="width:50%;float:left;"
            placeholder="选择年"
            :clearable="true"
          >
          </el-date-picker>
          <el-date-picker
            @change="setTradeIssure"
            v-if="listQuery['tradeCycleCode']=='jyzq03'"
            v-model="tradeIssureData.monthData"
            type="month"
            placeholder="选择月"
            :clearable="true"
            class="w180"
          >
          </el-date-picker>

          <el-select
            @change="setTradeIssure"
            v-if="listQuery['tradeCycleCode']=='jyzq02'"
            style="width:40%;float:left;"
            :clearable="true"
            v-model="tradeIssureData.quarter"
            placeholder="季度"
          >
            <el-option
              v-for="item in quarterOptions"
              :key="item.propCode"
              :label="item.propName"
              :value="item.propCode"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-button
          class="filter-item"
          type="primary"
          v-waves
          icon="el-icon-search"
          @click="handleFilter"
        >查询</el-button>
      </el-form>
    </div>
    <el-button-group class="f-mb10">
      <el-button
        v-if="btns.btn_export"
        type="primary"
        icon="el-icon-upload"
        @click="handleExport"
      >导出</el-button>
    </el-button-group>
    <!-- <div class="txt-right unit-info">单位:mwh</div> -->
    <el-table
      :key='tableKey'
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
      :height="tabHeight"
    >
      <!-- <el-table-column align="center" width="55" type="selection"> 
      </el-table-column>  -->
      <el-table-column
        prop="index"
        label="序号"
        align="center"
        width="70px"
      >
      </el-table-column>
      <el-table-column
        width="140px"
        align="center"
        label="交易中心"
      >
        <template slot-scope='scope'>
          <span>{{scope.row.tradeCenterName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="交易序列名称"
      >
        <template slot-scope='scope'>
          <span>{{scope.row.noticeName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="140px"
        align="center"
        label="交易品种"
      >
        <template slot-scope='scope'>
          <span>{{scope.row.tradeVarietyName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="140px"
        align="center"
        label="交易方式"
      >
        <template slot-scope='scope'>
          <span>{{scope.row.tradeWayName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="140px"
        align="center"
        label="交易周期"
      >
        <template slot-scope='scope'>
          <span>{{scope.row.tradeCycleName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="140px"
        align="center"
        label="期次"
      >
        <template slot-scope='scope'>
          <span>{{scope.row.tradeIssure}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="140px"
        align="center"
        label="状态"
      >
        <template slot-scope='scope'>
          <span>{{scope.row.stateName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        align="center"
        label="操作"
        width="220"
      >
        <template slot-scope='scope'>
          <el-button
            v-if="scope.row.state!=''&& typeof scope.row.stateCode!='undefined'"
            size="small"
            type="text"
            @click="handleViews(scope.row)"
          >查看
          </el-button>
          <el-button
            v-if="btns.btn_add&&(scope.row.stateCode==''|| typeof scope.row.stateCode=='undefined')"
            size="small"
            type="text"
            @click="handleCreate(scope.row)"
          >创建方案
          </el-button>
          <el-button
            v-if="btns.btn_edit&&(scope.row.stateCode=='11'||scope.row.stateCode=='7')"
            size="small"
            type="text"
            @click="handleUpdate(scope.row)"
          >编辑
          </el-button>
          <el-button
            v-if="btns.btn_del&&(scope.row.stateCode=='11')"
            size="small"
            type="text"
            @click="handleDelete(scope.row)"
          >删除
          </el-button>
          <el-button
            v-if="btns.btn_cancelSubmit&&(scope.row.stateCode=='3')"
            size="small"
            type="text"
            @click="cancelSubmit(scope.row)"
          >取消提交
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div
      v-show="!listLoading"
      class="pagination-container"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50,100,200,500,1000]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <form-detail
      :dialogInfo="dialogInfo"
      :dialogStatus="dialogStatus"
      :quotationSegmentOption="quotationSegmentOption"
      :orgInfo="orgInfo"
      :tradingUnitOption="tradingUnitOption"
      :btns="btns"
      :tradingProductsOption="tradingProductsOption"
      :assignmentTypeOption="assignmentTypeOption"
      :transactionClassifyOption="transactionClassifyOption"
      :pricingProposalOption="pricingProposalOption"
      :transactionLineOption="transactionLineOption"
      @initList="initList"
      ref="formDetail"
    ></form-detail>
  </div>
</template>
<script>
import {
  page,
  getPageList,
  exportObj,
  modifyInfo,
  getDetailListBySchemeId,
  getCurrentUserOrg,
  getTradingUnitByName
} from "@common/api/business/powerSideOffer/centralizedBidding/index";
import {
  delObj,
  cancelCommit
} from "@common/api/business/sellingSideOffer/sdCentralizedBidding/index";
import { getTradeCenter } from "@common/api/contract/htTemplate/index";
import { getOrgById } from "@common/api/admin/orgStruManage/index";
import { getAllLinList } from "@common/api/basicData/TMdataTieLin/index";
import { parseTime } from "@common/utils/index";
import { getSelectList } from "@common/api/base";
import { initLayout } from "@common/utils/init";
import { mapGetters } from "vuex";
export default {
  name: "sdCentralizedBidding",
  components: {
    "form-detail": () => import("./components/FormDetail")
  },
  data() {
    return {
      tradingProductsOption: [],
      transactionClassifyOption: [],
      transactionLineOption: [],
      assignmentTypeOption: [],
      quotationStallData: [],
      announcementInfo: {},
      tradeIssureData: {
        quarter: "",
        monthData: "",
        yearData: ""
      },
      orgInfo: null,
      dialogInfo: {
        btnSave: true,
        btnSubmit: true,
        notEdit: false,
        status: "add",
        title: "新增"
      },
      listLoading: false,
      list: [],
      tableKey: 0,
      listQuery: {
        tradeIssure: "",
        tradingCenterId: "",
        tradingVarietyCode: "",
        tradingCycleCode: "",
        page: 1,
        limit: 10
      },
      schemeId: "",
      varietyOptions: [],
      wayOptions: [],
      periodOptions: [],
      quarterOptions: [],
      pricingProposalOption: [],
      centerOptions: [],
      tabHeight: "",
      total: null,
      tradingUnitOption: [],
      quotationSegmentOption: [],
      dialogDetailtVisible: false,
      dialogStatus: "",

      btns: {
        btn_cancelSubmit: false,
        btn_edit: false,
        btn_del: false,
        btn_add: false,
        btn_export: false
      }
    };
  },
  created() {
    this.init();
  },
  computed: {
    ...mapGetters(["elements", "orgId"])
  },
  methods: {
    init() {
      this.initList();
      this.setLayoutHeight();
      this.initSelects();
      this.initBtn();
    },
    //初始化按钮
    initBtn() {
      this.btns.btn_cancelSubmit = this.elements[
        "sdCentralizedBidding:btn_cancelSubmit"
      ];
      this.btns.btn_edit = this.elements["sdCentralizedBidding:btn_edit"];
      this.btns.btn_del = this.elements["sdCentralizedBidding:btn_del"];
      this.btns.btn_add = this.elements["sdCentralizedBidding:btn_add"];
      this.btns.btn_export = this.elements["sdCentralizedBidding:btn_export"];
      // this.btns.btn_cancelSubmit = this.elements[
      //   "fdCentralizedBidding:btn_cancelSubmit"
      // ];
      // this.btns.btn_edit = this.elements["fdCentralizedBidding:btn_edit"];
      // this.btns.btn_del = this.elements["fdCentralizedBidding:btn_del"];
      // this.btns.btn_add = this.elements["fdCentralizedBidding:btn_add"];
      // this.btns.btn_export = this.elements["fdCentralizedBidding:btn_export"];
    },
    setLayoutHeight() {
      this.tabHeight = initLayout() - 210;
    },
    //初始化下拉选项
    initSelects() {
      //交易品种
      getSelectList("transactions_variety").then(res => {
        this.varietyOptions = res;
      });
      //交易方式
      getSelectList("transaction_mode").then(res => {
        this.wayOptions = res;
      });
      //交易周期
      getSelectList("transaction_period").then(res => {
        this.periodOptions = res;
      });
      //交易季度
      getSelectList("quarter").then(res => {
        this.quarterOptions = res;
      });
      //交易季度
      getSelectList("Quotation_segment").then(res => {
        this.quotationSegmentOption = res;
      });
      //方案信息
      getSelectList("Pricing_proposal").then(res => {
        this.pricingProposalOption = res;
      });
      //报价段数据
      getSelectList("Quotation_segment").then(res => {
        this.quotationStallData = res;
      });
      //获取交易中心下拉框
      this.getTradeCenterData();
      this.getOrgInfo();
      getTradingUnitByName({ orgId: this.orgId }).then(res => {
        this.tradingUnitOption = res;
      });

      getSelectList("Exit/Assignment_Type").then(res => {
        this.assignmentTypeOption = res;
      });
      getSelectList("Transaction_classify").then(res => {
        this.transactionClassifyOption = res;
      });
      getSelectList("Trading_products").then(res => {
        this.tradingProductsOption = res;
      });
      getAllLinList().then(res => {
        if (res.rel) {
          this.transactionLineOption = res.data;
        }
      });
    },
    getOrgInfo() {
      let parame = {};
      parame = this.orgId;
      getOrgById(parame).then(res => {
        // console.log(res);
        this.orgInfo = res.data;
      });
    },
    initList() {
      this.listQuery = {
        tradeIssure: "",
        tradingCenterId: "",
        tradingVarietyCode: "",
        tradingCycleCode: "",
        page: 1,
        limit: 10
      };
      this.listQuery.marketSubjectType = "1";
      this.listQuery.tradeWayCode = "jyfs02";
      this.getList();
    },
    //获取交易中心下拉框
    getTradeCenterData() {
      let parame = {
        orgId: this.orgId
      };
      getTradeCenter(parame).then(res => {
        this.centerOptions = res;
      });
    },
    //获取列表
    getList() {
      this.listLoading = true;
      let parame = {};
      parame.orgId = this.orgId;
      for (let key in this.listQuery) {
        if (this.listQuery[key] != "") {
          parame[key] = this.listQuery[key];
        }
      }
      getPageList(parame).then(response => {
        if (response.status == 200) {
          this.list = [];
          if (response.data.total > 0) {
            let items = response.data.rows.map((item, index) => {
              item.index =
                index + 1 + (this.listQuery.page - 1) * this.listQuery.limit;
              return item;
            });
            this.list = items;
          }
          this.total = response.data.total;
          this.listLoading = false;
        }
      });
    },
    //设置期次信息
    setTradeIssure() {
      if (this.listQuery.tradeCycleCode == "jyzq01") {
        this.listQuery.tradeIssure = parseTime(
          this.tradeIssureData.yearData,
          "{y}"
        );
      } else if (this.listQuery.tradeCycleCode == "jyzq02") {
        this.listQuery.tradeIssure =
          parseTime(this.tradeIssureData.yearData, "{y}") +
          "-" +
          this.tradeIssureData.quarter;
      } else if (this.listQuery.tradeCycleCode == "jyzq03") {
        this.listQuery.tradeIssure = parseTime(
          this.tradeIssureData.monthData,
          "{y}-{m}"
        );
      }
    },
    //查询
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    //打开新增窗口
    handleCreate(row) {
      this.dialogInfo = {
        btnSave: true,
        btnSubmit: true,
        notEdit: false,
        status: "add",
        title: "新增报价方案"
      };
      this.$refs.formDetail.showDialog(row);
    },
    //初始化编辑
    handleUpdate(row) {
      this.dialogInfo = {
        btnSave: true,
        btnSubmit: true,
        notEdit: false,
        status: "edit",
        title: "修改报价方案"
      };
      this.getDetailInfo(row);
    },
    //初始化查看
    handleViews(row) {
      this.dialogInfo = {
        btnSave: false,
        btnSubmit: false,
        notEdit: true,
        status: "view",
        title: "查看报价方案"
      };
      this.getDetailInfo(row);
    },
    //获取报价详情
    getDetailInfo(row) {
      let parame = {};
      parame.schemeId = row.schemeId;
      getDetailListBySchemeId(parame).then(res => {
        if (res.rel) {
          this.detailInfo = res.data;
          if (this.dialogInfo.status == "edit") {
            this.$refs.formDetail.showEditDialog(row, res.data);
          } else {
            this.$refs.formDetail.showViewsDialog(row, res.data);
          }
        } else {
        }
      });
    },
    //取消提交
    cancelSubmit(row) {
      let parame = {};
      parame.schemeId = row.schemeId;
      parame.stateCode = "11";
      modifyInfo(parame)
        .then(res => {
          if (res.rel) {
            this.$notify({
              title: "成功取消提交",
              message: "成功取消提交",
              type: "success",
              duration: 2000
            });
            this.initList();
          } else {
            this.$notify({
              title: res.msg,
              message: res.msg,
              type: "warning",
              duration: 2000
            });
          }
        })
        .catch(function(error) {
          console.log("发生错误！", error);
        });
    },
    //删除方案
    handleDelete(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delObj(row.schemeId)
          .then(res => {
            this.setRequestInfo(res);
          })
          .catch(function(error) {
            // console.log("发生错误！", error);
          });
        this.initList();
      });
    },
    //设置提交返回信息
    setRequestInfo(res) {
      this.saveLoading = false;
      if (res.rel) {
        this.dialogVisible = false;
        this.$notify({
          title: res.msg,
          message: res.msg,
          type: "success",
          duration: 2000
        });
        this.initList();
      } else {
        this.$notify({
          title: res.msg,
          message: res.msg,
          type: "warning",
          duration: 2000
        });
      }
    },
    //获取所选id
    selsChange(val) {
      let id = "";
      val.forEach(element => {
        id += "," + element.jyTradingResultsId;
      });
      id = id.substring(1);
      this.sels = id;
    },
    //导出
    handleExport() {
      let parme = {};
      parme.marketSubjectType = "1";
      parme.tradeWayCode = "jyfs02";
      if (this.listQuery.tradeIssure != "") {
        parme.tradeIssure = this.listQuery.tradeIssure;
      }
      if (this.listQuery.tradingCenterId != "") {
        parme.tradingCenterId = this.listQuery.tradingCenterId;
      }
      if (this.listQuery.tradingCycleCode != "") {
        parme.tradingCycleCode = this.listQuery.tradingCycleCode;
      }
      if (this.listQuery.tradingVarietyCode != "") {
        parme.tradingVarietyCode = this.listQuery.tradingVarietyCode;
      }
      exportObj(parme);
    },

    //变更每页条数
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    //分页操作
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    }
  }
};
</script>
<style lang="scss" scoped>
.w-half {
  width: 80px !important;
}
</style>


