<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form class="form-inline-168" :inline="true" :model="listQuery">
        <el-form-item label="交易中心">
          <el-select
            class="four-col left"
            :clearable="true"
            v-model="listQuery['tradeCenterName']"
            placeholder="请选择"
          >
            <el-option
              v-for="item in jyorgIdOption"
              :key="item.jyorgId"
              :label="item.jyorgName"
              :value="item.jyorgId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易序列名称" label-width="100px" algin="right">
          <!-- </el-select>  -->
          <el-input v-model="listQuery['noticeName']"></el-input>
        </el-form-item>
        <el-form-item label="审批状态">
          <el-select
            class="four-col left"
            :clearable="true"
            v-model="listQuery['state']"
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
        <el-form-item label="提交时间" label-width="70px" algin="right">
          <el-date-picker
            v-model="listQuery.submitTime"
            type="date"
            class="w180"
            placeholder="选择日期"
            @change="setTradeIssure"
          ></el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="交易周期" label-width="70px" algin="right">
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
            v-if="listQuery['tradeCycleCode'] != 'jyzq01'&&listQuery['tradeCycleCode'] != 'jyzq02'&&listQuery['tradeCycleCode'] != 'jyzq03'"
            type="year"
            class="w180"
            :clearable="true"
            placeholder="选择年"
            disabled
          >
          </el-date-picker>
          <el-date-picker
            v-if="listQuery['tradeCycleCode'] == 'jyzq01'"
            v-model="tradeIssureData.yearData"
            type="year"
            class="w180"
            placeholder="选择年"
            :clearable="true"
            @change="setTradeIssure"
          >
          </el-date-picker>
          <el-date-picker
            v-if="listQuery['tradeCycleCode'] == 'jyzq02'"
            v-model="tradeIssureData.yearData"
            type="year"
            @change="setTradeIssure"
            style="width:90px;float:left;"
            placeholder="选择年"
            :clearable="true"
          >
          </el-date-picker>
          <el-date-picker
            @change="setTradeIssure"
            v-if="listQuery['tradeCycleCode'] == 'jyzq03'"
            v-model="tradeIssureData.monthData"
            type="month"
            placeholder="选择月"
            :clearable="true"
            class="w180"
          >
          </el-date-picker>

           <span  v-if="listQuery['tradeCycleCode'] == 'jyzq02'" class="w60">
          <el-select
            @change="setTradeIssure"
            v-if="listQuery['tradeCycleCode'] == 'jyzq02'"
            style="width:60px;"
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
           </span>
        </el-form-item>-->

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
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="交易方式">
          <el-select
            class="four-col left"
            :clearable="true"
            v-model="listQuery['tradeWayCode']"
            placeholder="请选择"
          >
            <el-option
              v-for="item in wayOptions"
              :key="item.propCode"
              :label="item.propName"
              :value="item.propCode"
            ></el-option>
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
    <!-- <el-button-group class="f-mb10">
      <el-button
        v-if="btns.btn_export"
        type="primary"
        icon="el-icon-upload"
        @click="handleExport"
      >导出</el-button>
    </el-button-group>-->
    <!-- <div class="txt-right unit-info">单位:mwh</div> -->
    <el-table
      :key="tableKey"
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
      :height="tabHeight"
    >
      <!-- <el-table-column align="center" width="55" type="selection"> 
      </el-table-column>-->
      <el-table-column prop="index" label="序号" align="center" width="70px"></el-table-column>
      <!-- <el-table-column align="center" label="任务ID">
        <template slot-scope="scope">
          <span>{{ scope.row.tradeCenterName }}</span>
        </template>
      </el-table-column>-->
      <el-table-column align="center" label=" 提交时间">
        <template slot-scope="scope">
          <span>{{ scope.row.submitTime}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="审批状态">
        <template slot-scope="scope">
          <span>{{ scope.row.stateName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="审批历史">
        <template slot-scope="scope">
          <span class="btn-link" @click="approvalHistory(scope.row)">审批历史</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="流程状态">
        <template slot-scope="scope">
          <span @click="processState(scope.row)">
            <a v-if="scope.row.templateState == '7'">
              <i class="iconfont icon-circle iconStyle2"></i>
            </a>
            <a v-else>
              <i class="iconfont icon-circle iconStyle1"></i>
            </a>
          </span>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="交易中心">
        <template slot-scope="scope">
          <span>{{ scope.row.tradeCenterName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" label="交易序列名称">
        <template slot-scope="scope">
          <span>{{ scope.row.noticeName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="140px" align="center" label="交易品种">
        <template slot-scope="scope">
          <span>{{ scope.row.tradeVarietyName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="交易方式">
        <template slot-scope="scope">
          <span>{{ scope.row.tradeWayName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="交易周期">
        <template slot-scope="scope">
          <span>{{ scope.row.tradeCycleName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="90px" align="center" label="期次">
        <template slot-scope="scope">
          <span>{{ scope.row.tradeIssure }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column  align="center" label="发布时间">
        <template slot-scope="scope">
          <span>{{ scope.row.stateName }}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="生效时间">
        <template slot-scope="scope">
          <span>{{ scope.row.stateName }}</span>
        </template>
      </el-table-column>-->

      <!-- <el-table-column width="200px" align="center" label="创建时间">
        <template slot-scope='scope'>
          <span>{{scope.row.crtTime}}</span>
        </template>
      </el-table-column>-->
      <el-table-column fixed="right" align="center" label="操作" width="150px">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="handleViews(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.page"
        :page-sizes="[10, 20, 30, 50, 100, 200, 500, 1000]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <centralized-bidding
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
      :unitMap="unitMap"
      @initList="initList"
      ref="fcentralizedBidding"
    ></centralized-bidding>
    <listing-transaction
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
      :unitMap="unitMap"
      @initList="initList"
      ref="listingTransaction"
    ></listing-transaction>
    <bilateral-consultation
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
      :unitMap="unitMap"
      @initList="initList"
      ref="bilateralConsultation"
    ></bilateral-consultation>
    <!-- <form-detail 
    :dialogInfo="dialogInfo"
    
    ></form-detail>-->
    <el-dialog v-drag :close-on-click-modal="false" title="审批历史" :visible.sync="dialogTableVisible" width="66%">
      <el-table border :data="gridData" v-loading.body="checkListLoading">
        <el-table-column align="center" label="序号" type="index"></el-table-column>

        <el-table-column align="center" label="审批岗位" width="210px">
          <template slot-scope="scope">
            <div class="txt-left">{{ scope.row.roleName }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="审批人" width="80px">
          <template slot-scope="scope">
            <div class="txt-left">{{ scope.row.userName }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="审批时间" width="150px">
          <template slot-scope="scope">
            <div class="txt-left">{{ scope.row.approvalTime }}</div>
          </template>
        </el-table-column>

        <el-table-column align="center" label="审批结果" width="80px">
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
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-btn" @click="dialogTableVisible=false">关 闭</el-button>
      </div>
    </el-dialog>
    <el-dialog v-drag :close-on-click-modal="false"
      title="流程状态"
      :visible.sync="processDialogVisible"
      custom-class="w800"
      :lock-scroll="true"
    >
      <el-scrollbar class="200 bda">
        <div style="height:500px  ">
          <img :src="this.imgUrl">
        </div>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer btn_footer">
        <el-button class="cancel-btn" @click="processDialogVisible=false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { approvalHistoryObj } from "@common/api/contract/contractTemplateAuditQuery/index";
import { getDetailListBySchemeId } from "@common/api/business/powerSideOffer/centralizedBidding/index";
import {
  page,
  getNewPageList,
  getTradingUnitByName,
  getAlreadyOrgIdList,
  getAuditQueryPaging
} from "@common/api/business/sellingSideOffer/sellinLlistingTransaction/index";
import { getToken } from "@common/utils/auth";
import { getTradeCenter } from "@common/api/contract/htTemplate/index";
import { getAllLinList } from "@common/api/basicData/TMdataTieLin/index";
import { getOrgById } from "@common/api/admin/orgStruManage/index";
import { parseTime,getUnitMap } from "@common/utils/index";
import { getSelectList } from "@common/api/base";
import { initLayout } from "@common/utils/init";
import { mapGetters } from "vuex";
export default {
  name: "sellingSideOfferAuditQuery",
  components: {
    "centralized-bidding": () =>
      import("../sdCentralizedBidding/components/FormDetail"), //集中竞价
    "listing-transaction": () =>
      import("../sellinLlistingTransaction/components/FormDetail"), //挂牌交易
    "bilateral-consultation": () =>
      import("../bilateralConsultation/components/FormDialog") //双边协商
  },
  data() {
    return {
      stateOptions: [],
      tradingProductsOption: [],
      assignmentTypeOption: [],
      transactionClassifyOption: [],
      dialogTableVisible: false, //审批历史弹框
      checkListLoading: false,
      gridData: [],
      processDialogVisible: false, //流程状态弹窗
      imgUrl: "",
      jyorgIdOption: [],
      announcementInfo: {},
      transactionLineOption: [],
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
        submitTime: "",
        tradeCenterName: "",
        noticeName: "",
        tradeIssure: "",
        noticeName: "",
        tradeVarietyCode: "",
        tradeCycleCode: "",
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
        // btn_cancelSubmit: false,
        // btn_edit: false,
        btn_reject: false,
        btn_pass: false,
        btn_export: false
      },
      unitMap:{}
    };
  },
  created() {
    //
    this.init();
    this.unitMap = getUnitMap(this.allSubMenus,this.unitMap);
  },
  computed: {
    ...mapGetters(["elements", "orgId","allSubMenus"])
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
      this.btns.btn_pass = this.elements["sellingSideOfferAudit:btn_pass"];
      this.btns.btn_reject = this.elements["sellingSideOfferAudit:btn_reject"];
      this.btns.btn_export = this.elements["sellingSideOfferAudit:btn_export"];
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
      getAllLinList().then(res => {
        if (res.rel) {
          this.transactionLineOption = res.data;
        }
      });
      //状态
      getSelectList("state").then(res => {
        this.stateOptions = res;
      });
      getSelectList("Trading_products").then(res => {
        this.tradingProductsOption = res;
      });
      getSelectList("Exit/Assignment_Type").then(res => {
        this.assignmentTypeOption = res;
      });
      getSelectList("Transaction_classify").then(res => {
        this.transactionClassifyOption = res;
      });
      //获取交易中心下拉框
      this.getTradeCenterData();
      this.getOrgInfo();
      getTradingUnitByName({ orgId: this.orgId }).then(res => {
        this.tradingUnitOption = res;
      });
      getAlreadyOrgIdList({ orgId: this.orgId }).then(res => {
        this.jyorgIdOption = res;
      });
    },

    getOrgInfo() {
      let parame = {};
      parame = this.orgId;
      getOrgById(parame).then(res => {
        this.orgInfo = res.data;
      });
    },

    setTradeIssure(val) {
      if (val != null) {
        this.listQuery.submitTime = parseTime(
          this.listQuery.submitTime,
          "{y}-{m}-{d}"
        );
      } else {
        this.listQuery.submitTime = undefined;
      }
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
      let parma = {};
      // parma.orgId = this.orgId;
      parma.marketSubjectType = "1";
      //parma.tradeWayCode = "jyfs03";
      for (let key in this.listQuery) {
        if (this.listQuery[key] != "") {
          parma[key] = this.listQuery[key];
        }
      }
      getAuditQueryPaging(parma).then(response => {
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
            if (row.tradeWayCode == "jyfs01") {
              // "双边协商"
              this.$refs.bilateralConsultation.showEditDialog(row, res.data);
            } else if (row.tradeWayCode == "jyfs02") {
              //集中竞价
              this.$refs.fcentralizedBidding.showEditDialog(row, res.data);
            } else {
              // "jyfs03"

              this.$refs.listingTransaction.showEditDialog(row, res.data);
            }
          } else {
            if (row.tradeWayCode == "jyfs01") {
              // "双边协商"
              this.$refs.bilateralConsultation.showViewsDialog(row, res.data);
            } else if (row.tradeWayCode == "jyfs02") {
              //集中竞价
              this.$refs.fcentralizedBidding.showViewsDialog(row, res.data);
            } else {
              // "jyfs03"
              this.$refs.listingTransaction.showViewsDialog(row, res.data);
            }
            // this.$refs.formDetail.showViewsDialog(row, res.data);
          }
        } else {
        }
      });
    },
    // //设置期次信息
    // setTradeIssure() {
    //   if (this.listQuery.tradeCycleCode == "jyzq01") {
    //     if (this.tradeIssureData.yearData != null) {
    //       this.listQuery.tradeIssure = parseTime(
    //         this.tradeIssureData.yearData,
    //         "{y}"
    //       );
    //     }
    //   } else if (this.listQuery.tradeCycleCode == "jyzq02") {
    //     if (this.tradeIssureData.yearData != null) {
    //       this.listQuery.tradeIssure =
    //         parseTime(this.tradeIssureData.yearData, "{y}") +
    //         "-" +
    //         this.tradeIssureData.quarter;
    //     }
    //   } else if (this.listQuery.tradeCycleCode == "jyzq03") {
    //     if (this.tradeIssureData.monthData != null) {
    //       this.listQuery.tradeIssure = parseTime(
    //         this.tradeIssureData.monthData,
    //         "{y}-{m}"
    //       );
    //     }
    //   }
    // },
    // 审批历史
    approvalHistory(row) {
      this.checkListLoading = true;
      let query = {
        businessKey: row.schemeId,
        processKey: row.processKey
      };
      this.dialogTableVisible = true;
      approvalHistoryObj(query).then(res => {
        if (res.rel) {
          this.gridData = res.data;
          this.checkListLoading = false;
        }
      });
    },
    //流程状态
    processState(row) {
      let token = getToken();
      this.imgUrl =
        "/api/admin/processApproval/getActiviImage?businessKey=" +
        row.schemeId +
        "&processKey=" +
        row.processKey +
        "&token=" +
        token;
      this.processDialogVisible = true;
    },
    //查询
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
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
.w60 ::v-deep .el-input {
  width: 60px !important;
}
.iconStyle1 {
  color: #1abc9c;
}
.iconStyle2 {
  color: red;
}
</style>


