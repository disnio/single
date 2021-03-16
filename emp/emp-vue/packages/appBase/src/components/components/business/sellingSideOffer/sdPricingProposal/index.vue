
<template>
<!-- #4297 gaoaining 添加类名filter-container 减少行与行的间距 修改input的宽 start-->
  <div class="app-container calendar-list-container filter-container">
    <div>
      <el-form :inline="true" :model="listQuery" label-width="100px">
        <org-selects ref="orgSelects" @select="selectOrg" @initOrg="initOrg"></org-selects>
        <el-form-item label="交易序列名称">
          <el-input
            class="four-col left"
            v-model="listQuery['noticeName']"
            style="width:160px"
            :clearable="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="交易品种">
          <el-select
            class="four-col left"
            :clearable="true"
            v-model="listQuery['tradeVarietyCode']"
            placeholder="请选择"
            style="width:160px"
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
            style="width:160px"
          >
            <el-option
              v-for="item in wayOptions"
              :key="item.propCode"
              :label="item.propName"
              :value="item.propCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易周期">
          <el-select
            class="four-col left"
            :clearable="true"
            v-model="listQuery['tradeCycleCode']"
            placeholder="请选择"
            @change="changeTradingCycle"
            style="width:160px"
          >
            <el-option
              v-for="item in periodOptions"
              :key="item.propCode"
              :label="item.propName"
              :value="item.propCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易期次">
          <el-date-picker
            v-if="listQuery['tradeCycleCode'] != 'jyzq01'&&listQuery['tradeCycleCode'] != 'jyzq02'&&listQuery['tradeCycleCode'] != 'jyzq03'&&listQuery['tradeCycleCode'] != 'jyzq04'&&listQuery['tradeCycleCode'] != 'jyzq05' && listQuery['tradeCycleCode'] != 'jyzq06'"
            type="year"
            class="w180"
            :clearable="true"
            placeholder="选择年"
            style="width:160px"
            disabled
          ></el-date-picker>
          <el-date-picker
            v-if="listQuery['tradeCycleCode'] == 'jyzq01'|| listQuery['tradeCycleCode'] == 'jyzq02' "
            v-model="tradeIssureData.yearData"
            type="year"
            class="w180"
            placeholder="选择年"
            :clearable="true"
            style="width:160px"
            @change="setTradeIssure"
          ></el-date-picker>
          <!-- <el-date-picker
            v-if="listQuery['tradeCycleCode'] == 'jyzq02'"
            v-model="tradeIssureData.yearData"
            type="year"
            @change="setTradeIssure"
            style="width:90px;"
            placeholder="选择年"
            :clearable="true"
          ></el-date-picker>-->
          <!--2019-10-30 #2454 交易模块相关页面增加“周”交易周期筛选项-->
          <!--当交易周期为半年和不定期时，交易期次显示如下 -->
          <el-date-picker
            @change="setTradeIssure"
            v-if="listQuery['tradeCycleCode'] == 'jyzq03'|| listQuery['tradeCycleCode'] == 'jyzq06'"
            v-model="tradeIssureData.monthData"
            type="month"
            placeholder="选择月"
            :clearable="true"
            style="width:160px"
            class="w180"
          ></el-date-picker>
          <el-date-picker
            @change="setTradeIssure"
            v-if="listQuery.tradeCycleCode == 'jyzq04'"
            v-model="tradeIssureData.tradeBeginMonth"
            type="month"
            placeholder="选择月"
            :clearable="true"
            style="width:160px;float:left;"
            :disabled="dialogInfo.notEdit"
          ></el-date-picker>
          <div v-if="listQuery.tradeCycleCode == 'jyzq04'" style="width:4%;float:left;">至</div>
          <el-date-picker
            @change="setTradeIssureEnd"
            v-if="listQuery.tradeCycleCode == 'jyzq04'"
            v-model="tradeIssureData.tradeEndMonth"
            type="month"
            placeholder="选择月"
            :clearable="true"
            style="width:160px;float:left;"
            :disabled="dialogInfo.notEdit"
          ></el-date-picker>
          <el-date-picker
            @change="setTradeIssure"
            v-if="listQuery.tradeCycleCode == 'jyzq05'"
            v-model="tradeIssureData.tradeBeginMonth"
            type="month"
            placeholder="选择月"
            :clearable="true"
            style="width:160px;float:left;"
            :disabled="dialogInfo.notEdit"
          ></el-date-picker>
          <div v-if="listQuery.tradeCycleCode == 'jyzq05'" style="width:4%;float:left;">至</div>
          <el-date-picker
            @change="setTradeIssure"
            v-if="listQuery.tradeCycleCode == 'jyzq05'"
            v-model="tradeIssureData.tradeEndMonth"
            type="month"
            placeholder="选择月"
            :clearable="true"
            style="width:160px;float:left;"
            :disabled="dialogInfo.notEdit"
          ></el-date-picker>
          <span v-if="listQuery['tradeCycleCode'] == 'jyzq02'" class="w160">
            <el-select
              style="width:90px;"
              popper-class="select"
              @change="setTradeIssure"
              :clearable="true"
              v-model="tradeIssureData.quarter"
              placeholder="季度"
              :disabled="quarterStyle"
            >
              <el-option
                v-for="item in quarterOptions"
                :key="item.propCode"
                :label="item.propName"
                :value="item.propCode"
              ></el-option>
            </el-select>
          </span>
          <span v-if="listQuery['tradeCycleCode'] == 'jyzq06'" class="w160">
            <el-select
              style="width:90px;"
              popper-class="select"
              @change="setTradeIssure"
              :clearable="true"
              v-model="tradeIssureData.week"
              placeholder="选择周"
              :disabled="quarterStyle"
            >
              <el-option
                v-for="item in weekOptions"
                :key="item.propCode"
                :label="item.propName"
                :value="item.propCode"
              ></el-option>
            </el-select>
          </span>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            class="four-col left"
            :clearable="true"
            v-model="listQuery['state']"
            placeholder="请选择"
            style="width:160px"
          >
            <el-option
              v-for="item in stateOptions"
              :key="item.propCode"
              :label="item.propName"
              :value="item.propCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- #4297 gaoaining 添加类名filter-container 减少行与行的间距 修改input的宽 end-->
        <el-form-item>
          <el-button
            style="float:left;"
            type="primary"
            v-waves
            icon="el-icon-search"
            @click="handleFilter"
          >查询</el-button>
        </el-form-item>

        <!-- stateOptions -->
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
      :key="tableKey"
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
      :height="tabHeight"
      row-key="schemeId"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <!-- <el-table-column align="center" width="55" type="selection"> 
      </el-table-column>-->
      <el-table-column prop="index" label="序号" align="center" width="70px"></el-table-column>
      <el-table-column width="140px" align="center" label="交易中心">
        <template slot-scope="scope">
          <span>{{scope.row.tradeCenterName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="交易序列名称">
        <template slot-scope="scope">
          <div class="txt-left">{{scope.row.noticeName}}</div>
        </template>
      </el-table-column>
      <el-table-column width="140px" align="center" label="交易品种">
        <template slot-scope="scope">
          <span>{{scope.row.tradeVarietyName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="140px" align="center" label="交易方式">
        <template slot-scope="scope">
          <span>{{scope.row.tradeWayName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="交易周期">
        <template slot-scope="scope">
          <span>{{scope.row.tradeCycleName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="期次">
        <template slot-scope="scope">
          <span>{{scope.row.tradeIssure}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.stateName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" label="售电公司">
        <template slot-scope="scope">
          <div class="txt-left">{{scope.row.orgName}}</div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="160">
        <template slot-scope="scope">
          <!--2019-11-6 #2596 张朋 查看判断调整 -->
          <!-- #2716 2019-11-19 张亮三 增加判断当为22时不显示查看按钮 start -->
          <el-button
            v-if="typeof scope.row.stateCode!='undefined' && scope.row.stateCode!='22'"
            size="small"
            type="text"
            @click="handleViews(scope.row)"
          >查看</el-button>
          <!-- #2716 2019-11-19 张亮三 增加判断当为22时不显示查看按钮 end -->
          <el-button
            v-if="btns.btn_add&&(scope.row.stateCode==''|| typeof scope.row.stateCode=='undefined')"
            size="small"
            type="text"
            @click="handleCreate(scope.row)"
          >创建方案</el-button>
          <!-- #2716 2019-11-19 张亮三 增加不参与报价方案按钮 start -->
          <el-button
            v-if="btns.btn_no_participation&&(scope.row.stateCode==''|| typeof scope.row.stateCode=='undefined')"
            size="small"
            type="text"
            @click="handleNoParticipation(scope.row)"
          >不参与报价</el-button>
          <!-- #2716 2019-11-19 张亮三 增加不参与报价方案按钮 start -->

          <el-button
            v-if="btns.btn_edit&&(scope.row.stateCode=='11'||scope.row.stateCode=='7')"
            size="small"
            type="text"
            @click="handleUpdate(scope.row)"
          >编辑</el-button>
          <el-button
            v-if="btns.btn_del&&(scope.row.stateCode=='11')"
            size="small"
            type="text"
            @click="handleDelete(scope.row)"
          >删除</el-button>
          <!--  2019-11-06 #2495 滕超 去掉取消提交按钮增加修改按钮 start-->
          <!-- <el-button
            v-if="btns.btn_cancelSubmit&&(scope.row.stateCode=='3')"
            size="small"
            type="text"
            @click="cancelSubmit(scope.row)"
          >取消提交</el-button>-->
          <el-button
            v-if="btns.btn_modify&&(scope.row.stateCode=='3')"
            size="small"
            type="text"
            @click="handleModify(scope.row)"
          >修改</el-button>
          <!--  2019-11-06 #2495 滕超 去掉取消提交按钮增加修改按钮 end-->
          <!-- #3493 2020-01-05 阿彪 增加变更按钮 start -->
          <!-- #4275 2020-06-13 zhangls 增加变更按钮资源权限 start -->
          <el-button
            v-if="btns.btn_change && scope.row.stateCode=='10'"
            size="small"
            type="text"
            @click="handleChange(scope.row)"
          >变更</el-button>
          <!-- #4275 2020-06-13 zhangls 增加变更按钮资源权限 end -->
          <!-- #3493 2020-01-05 阿彪 增加变更按钮 end -->
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50,100,200,500,1000]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <!-- <form-detail
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
    ></form-detail>-->

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
      @initList="reLoadList"
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
      @initList="reLoadList"
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
      @initList="reLoadList"
      ref="bilateralConsultation"
    ></bilateral-consultation>
  </div>
</template>
<script>
import {
  // #2716 2019-11-19 张亮三 添加了保存接口addInfo
  addInfo,
  page,
  getPageList,
  exportObj,
  modifyInfo,
  getDetailListBySchemeId,
  getCurrentUserOrg,
  getTradingUnitByName,
  getChange
} from "@common/api/business/powerSideOffer/centralizedBidding/index";
import {
  delObj,
  cancelCommit,
  getOrgInfor
} from "@common/api/business/sellingSideOffer/sdCentralizedBidding/index";
import { getTradeCenter } from "@common/api/contract/htTemplate/index";
import { getOrgById } from "@common/api/admin/orgStruManage/index";
import { getAllLinList } from "@common/api/basicData/TMdataTieLin/index";
import { parseTime, getUnitMap, getUnitMapByModelCode } from "@common/utils/index";
import { getSelectList } from "@common/api/base";
import { initLayout } from "@common/utils/init";
import { mapGetters } from "vuex";
//引用区域和区域公司组件路径
import OrgSelects from "@common/components//orgSelectSellElectricity";

export default {
  name: "sdPricingProposal",
  components: {
    "centralized-bidding": () =>
      import("../sdCentralizedBidding/components/FormDetail"), //集中竞价
    "listing-transaction": () =>
      import("../sellinLlistingTransaction/components/FormDetail"), //挂牌交易
    "bilateral-consultation": () =>
      import("../bilateralConsultation/components/FormDialog"), //双边协商
    OrgSelects
  },
  data() {
    return {
      quarterStyle: false,
      orgOptions: [],
      stateOptions: [],
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
        btnModify: true, //修改记录按钮
        notEdit: false,
        status: "add",
        title: "新增"
      },
      listLoading: false,
      list: [],
      tableKey: 0,
      listQuery: {
        tradeBeginMonth: "",
        tradeEndMonth: "",
        state: "",
        tradeWayCode: "",
        tradeIssure: "",
        tradingCenterId: "",
        tradingVarietyCode: "",
        tradingCycleCode: "",
        page: 1,
        limit: 10
      },
      //2019-11-8 #2454 张朋 维度信息周数据
      weekOptions: [],
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
        btn_modify: false,
        btn_edit: false,
        btn_del: false,
        btn_add: false,
        btn_export: false, //导出
        //  #4275 2020-06-13 zhangls 增加变更按钮资源权限 start
        btn_change: false,
        //  #4275 2020-06-13 zhangls 增加变更按钮资源权限 start
        // #2716 2019-11-19 张亮三 增加了不参与报价资源
        btn_no_participation: false
      },
      unitMap: {}
    };
  },
  created() {
    this.init();
    if (sessionStorage.getItem("modelCode") == "dashboard") {
      this.unitMap = getUnitMapByModelCode(
        this.allSubMenus,
        this.unitMap,
        "sdPricingProposal"
      );
      
    } else {
      this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
      /**
       * @方法名称: 
       * @功能描述: 
       * @参数: 
       * @返回值: 
       * @作者: 
       * @Date: 2019-12-10 16:01:01
       * @最新修改内容: 
       * @LastEditTime: 
       */      
    }
  },
  computed: {
    ...mapGetters(["elements", "orgId", "allSubMenus"])
  },
  methods: {
    //设置查询条件中组织ID
    selectOrg(id) {
      this.listQuery.orgId = id;
    },
    //按组织初始化列表
    initOrg(id) {
      this.listQuery.orgId = id;
      this.getList();
    },
    init() {
      this.initList();
      this.setLayoutHeight();
      this.initSelects();
      this.initBtn();
    },
    //初始化按钮
    initBtn() {
      this.btns.btn_modify = this.elements["sdPricingProposal:btn_modify"];
      this.btns.btn_edit = this.elements["sdPricingProposal:btn_edit"];
      this.btns.btn_del = this.elements["sdPricingProposal:btn_del"];
      this.btns.btn_add = this.elements["sdPricingProposal:btn_add"];
      this.btns.btn_export = this.elements["sdPricingProposal:btn_export"];
      //  #4275 2020-06-13 zhangls 增加变更按钮资源权限 start 
      this.btns.btn_change = this.elements["sdPricingProposal:btn_change"];
      //  #4275 2020-06-13 zhangls 增加变更按钮资源权限 end
      // #2716 2019-11-19 张亮三 增加了不参与报价资源按钮 start
      this.btns.btn_no_participation = this.elements[
        "sdPricingProposal:btn_no_participation"
      ];
      // #2716 2019-11-19 张亮三 增加了不参与报价资源按钮 start
    },
    setLayoutHeight() {
      this.tabHeight = initLayout() - 280;
    },
    //初始化下拉选项
    initSelects() {
      //2019-11-8 #2454 张朋  获取维度基础信息的周数据
      getSelectList("week").then(res => {
        this.weekOptions = res;
      });
      //组织信息
      let parames = {
        attributeTypeCode: "zzjgsx01"
      };
      getOrgInfor(parames).then(res => {
        this.orgOptions = res;
      });
      //状态
      getSelectList("state").then(res => {
        this.stateOptions = res;
      });
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
        this.orgInfo = res.data;
      });
    },
    initList() {
      this.listQuery.page = 1;
      this.listQuery.marketSubjectType = "1";
      this.getList();
    },
    reLoadList() {
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
      // parame.orgId = this.orgId;

      for (let key in this.listQuery) {
        if (this.listQuery[key] != "") {
          parame[key] = this.listQuery[key];
        }
      }
      getPageList(parame).then(response => {
        if (response.status == 200) {
          this.list = [];
          if (response.data.total > 0) {
            let items=[];
            response.data.rows.forEach((item, index) => {
              if(typeof item.originalSchemeId!="undefined"){
                item['children']= item.changeSchemeList;
              }
              item.index =index + 1 + (this.listQuery.page - 1) * this.listQuery.limit;
              items.push(item);
            });
            this.list = items;
          }
          this.total = response.data.total;
          this.listLoading = false;
        }
      });
    },
    //清空期次信息
    changeTradingCycle() {
      this.tradeIssureData = {
        quarter: "",
        week: "",
        monthData: "",
        yearData: "",
        tradeBeginMonth: "",
        tradeEndMonth: ""
      };
      this.setTradeIssure();
    },
    //设置期次信息
    setTradeIssure(val) {
      if (val != null && val != undefined) {
        if (this.listQuery.tradeCycleCode == "jyzq01") {
          this.listQuery.tradeIssure = parseTime(
            this.tradeIssureData.yearData,
            "{y}"
          );
        } else if (this.listQuery.tradeCycleCode == "jyzq02") {
          this.quarterStyle = false;
          //当季度为空时，清空tradeIssure值
          if (
            typeof this.tradeIssureData.yearData == "undefined" ||
            this.tradeIssureData.yearData == "" ||
            this.tradeIssureData.yearData == null
          ) {
            Vue.set(this.tradeIssureData, "quarter", "");
          } else {
            if (this.tradeIssureData.quarter == "") {
              this.listQuery.tradeIssure = parseTime(
                this.tradeIssureData.yearData,
                "{y}"
              );
            } else {
              this.listQuery.tradeIssure =
                parseTime(this.tradeIssureData.yearData, "{y}") +
                "-" +
                this.tradeIssureData.quarter;
            }
          }
        } else if (this.listQuery.tradeCycleCode == "jyzq03") {
          this.listQuery.tradeIssure = parseTime(
            this.tradeIssureData.monthData,
            "{y}-{m}"
          );
          //#2454 张朋  调整：当周期为半年或不定期时进行
        } else if (this.listQuery.tradeCycleCode == "jyzq04") {
          let tradeEndMonth = parseTime(
            Date.parse(val) + 6 * 31 * 24 * 3600 * 1000,
            "{y}-{m}"
          );
          Vue.set(this.tradeIssureData, "tradeEndMonth", tradeEndMonth);
          this.listQuery.tradeIssure = this.tradeIssureData.tradeBeginMonth = parseTime(
            this.tradeIssureData.tradeBeginMonth,
            "{y}-{m}"
          );
          //2019-10-29 #2454 张朋 当周期为周时进行
        } else if (this.listQuery.tradeCycleCode == "jyzq05") {
          let beginTime = parseTime(
            this.tradeIssureData.tradeBeginMonth,
            "{y}-{m}"
          );
          let endTime = parseTime(
            this.tradeIssureData.tradeEndMonth,
            "{y}-{m}"
          );
          if (
            this.tradeIssureData.tradeBeginMonth == "" &&
            this.tradeIssureData.tradeEndMonth != ""
          ) {
            this.$notify({
              title: "错误提示",
              message: "交易期次的结束时间不能小于开始时间",
              type: "warning",
              duration: 2000
            });
            this.tradeIssureData.tradeEndMonth = "";
          }
          if (beginTime >= endTime && endTime != "0-0") {
            this.tradeIssureData.tradeEndMonth = "";
            this.$notify({
              title: "错误提示",
              message: "交易期次的结束时间不能小于开始时间",
              type: "warning",
              duration: 2000
            });
          } else {
            this.listQuery.tradeIssure = parseTime(
              this.tradeIssureData.tradeBeginMonth,
              "{y}-{m}"
            );
          }
        } else if (this.listQuery.tradeCycleCode == "jyzq06") {
          this.quarterStyle = false;
          //当季度为空时，清空tradeIssure值
          if (
            typeof this.tradeIssureData.monthData == "undefined" ||
            this.tradeIssureData.monthData == "" ||
            this.tradeIssureData.monthData == null
          ) {
            Vue.set(this.tradeIssureData, "week", "");
          } else {
            if (this.tradeIssureData.week == "") {
              this.listQuery.tradeIssure = parseTime(
                this.tradeIssureData.monthData,
                "{y}-{m}"
              );
            } else {
              this.listQuery.tradeIssure =
                parseTime(this.tradeIssureData.monthData, "{y}-{m}") +
                "-" +
                this.tradeIssureData.week;
            }
          }
        }
      } else {
        //如果周期为季度时执行以下操作
        if (this.listQuery.tradeCycleCode == "jyzq02") {
          if (
            typeof this.tradeIssureData.yearData == "undefined" ||
            this.tradeIssureData.yearData == null ||
            this.tradeIssureData.yearData == ""
          ) {
            this.quarterStyle = true;
            Vue.set(this.tradeIssureData, "quarter", "");
          } else {
            this.quarterStyle = false;
          }
        }
        if (this.listQuery.tradeCycleCode == "jyzq06") {
          if (
            typeof this.tradeIssureData.monthData == "undefined" ||
            this.tradeIssureData.monthData == null ||
            this.tradeIssureData.monthData == ""
          ) {
            this.quarterStyle = true;
            Vue.set(this.tradeIssureData, "week", "");
          } else {
            this.quarterStyle = false;
          }
        }
        this.listQuery.tradeIssure = undefined;
      }
    },
    setTradeIssureEnd(val) {
      if (val == null) {
        this.listQuery.tradeIssure = "";
      } else {
        this.listQuery.tradeIssure = this.tradeIssureData.tradeBeginMonth = parseTime(
          Date.parse(val) - 5 * 31 * 24 * 3600 * 1000,
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
      //       console.log(507)
      // console.log(row)
      this.dialogInfo = {
        btnSave: true,
        btnSubmit: true,
        btnModify: false,
        notEdit: false,
        status: "add",
        title: "新增报价方案"
      };
      if (
        //交易方式为双边协商
        row.tradeWayCode == "jyfs01" ||
        //交易方式为复式撮合
        row.tradeWayCode == "jyfs04"
      ) {
        // "双边协商"
        this.$refs.bilateralConsultation.showDialog(row);
      } else if (
        //交易方式为集中竞价
        row.tradeWayCode == "jyfs02" ||
        //交易方式为集中撮合
        row.tradeWayCode == "jyfs05" ||
        //交易方式为单边竞价
        row.tradeWayCode == "jyfs06"
      ) {
        //集中竞价
        this.$refs.fcentralizedBidding.showDialog(row);
      } else {
        // "jyfs03"
        this.$refs.listingTransaction.showDialog(row);
      }
    },
    /**
     * @方法名称: handleNoParticipation()
     * @功能描述: 不参与报价
     * @参数:
     * @返回值:
     * @作者: 张亮三
     * @Date: 2019-11-19 19:20:31
     * @最新修改内容:
     * @LastEditTime:
     */
    handleNoParticipation(row) {
      this.$confirm("确定不参与报价?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let parame = {};
        parame.marketSubjectType = "1";
        parame.orgId = this.listQuery.orgId;
        parame.noticeId = row.noticeId;
        parame.detailList = {};
        parame.stateCode = "22";
        addInfo(parame)
          .then(res => {
            if (res.rel) {
              this.$notify({
                title: "成功",
                message: "不参与报价成功",
                type: "success",
                duration: 2000
              });
              this.reLoadList();
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
      });
    },
    //初始化编辑
    handleUpdate(row) {
      this.dialogInfo = {
        btnSave: true,
        btnSubmit: true,
        btnModify: false,
        notEdit: false,
        status: "edit",
        title: "修改报价方案"
      };
      this.getDetailInfo(row);
    },
    //2019-11-06 #2495 滕超 修改
    handleModify(row) {
      this.$confirm("此条信息包含已上报系统的重要数据，请谨慎修改", "提示", {
        confirmButtonText: "确认修改",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.dialogInfo = {
          btnSave: false,
          btnModify: true,
          btnSubmit: true,
          notEdit: false,
          status: "edit",
          title: "修改报价方案"
        };
        this.getDetailInfo(row);
      });
    },
    //初始化查看
    handleViews(row) {
      this.dialogInfo = {
        btnSave: false,
        btnSubmit: false,
        btnModify: true,
        notEdit: true,
        status: "view",
        title: "查看报价方案"
      };
      this.getDetailInfo(row);
    },
    /**
     * @方法名称: handleChange
     * @功能描述:#3493 变更方案方法 
     * @参数: 
     * @返回值: 
     * @作者: 阿彪
     * @Date: 2020-01-07 10:15:16
     * @最新修改内容: 
     * @LastEditTime: 
     */
    handleChange(row){
      this.dialogInfo = {
        btnSave: true,
        btnSubmit: true,
        btnModify: true,
        notEdit: false,
        isShow:true,
        status: "change",
        title: "变更报价方案"
      };
      this.getDetailInfo(row);
    }, 
    /**
     * @方法名称: loadTreeList
     * @功能描述: 获取变更数据列表
     * @参数: 
     * @返回值: 
     * @样式作用范围: 
     * @作者: 阿彪
     * @Date: 2020-01-16 10:53:16
     * @最新修改内容: 
     * @LastEditTime: 
     */
    loadTreeList(tree, treeNode, resolve){
      getChange({originalSchemeId:tree.originalSchemeId}).then(res=>{
          if(res.rel){
            resolve(arr)
          }else{
             resolve([])
          }
      });
    },
    //获取报价详情
    getDetailInfo(row) {
      let parame = {};
      parame.schemeId = row.schemeId;
      getDetailListBySchemeId(parame).then(res => {
        if (res.rel) {
          this.detailInfo = res.data;
          if (this.dialogInfo.status == "edit") {
            if (
              //交易方式为双边协商
              row.tradeWayCode == "jyfs01" ||
              //交易方式为复式撮合
              row.tradeWayCode == "jyfs04"
            ) {
              // "双边协商"
              this.$refs.bilateralConsultation.showEditDialog(row, res.data);
            } else if (
              //交易方式为集中竞价
              row.tradeWayCode == "jyfs02" ||
              //交易方式为集中撮合
              row.tradeWayCode == "jyfs05" ||
              //交易方式为单边竞价
              row.tradeWayCode == "jyfs06"
            ) {
              //集中竞价
              this.$refs.fcentralizedBidding.showEditDialog(row, res.data);
            } else {
              // "jyfs03"

              this.$refs.listingTransaction.showEditDialog(row, res.data);
            }
          } else {
            if (
              //交易方式为双边协商
              row.tradeWayCode == "jyfs01" ||
              //交易方式为复式撮合
              row.tradeWayCode == "jyfs04"
            ) {
              // "双边协商"
              this.$refs.bilateralConsultation.showViewsDialog(row, res.data);
            } else if (
              //交易方式为集中竞价
              row.tradeWayCode == "jyfs02" ||
              //交易方式为集中撮合
              row.tradeWayCode == "jyfs05" ||
              //交易方式为单边竞价
              row.tradeWayCode == "jyfs06"
            ) {
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
    //取消提交
    // cancelSubmit(row) {
    //   let parame = {};
    //   parame.schemeId = row.schemeId;
    //   parame.stateCode = "11";
    //   modifyInfo(parame)
    //     .then(res => {
    //       if (res.rel) {
    //         this.$notify({
    //           title: "成功取消提交",
    //           message: "成功取消提交",
    //           type: "success",
    //           duration: 2000
    //         });
    //         this.reLoadList();
    //       } else {
    //         this.$notify({
    //           title: res.msg,
    //           message: res.msg,
    //           type: "warning",
    //           duration: 2000
    //         });
    //       }
    //     })
    //     .catch(function(error) {
    //       console.log("发生错误！", error);
    //     });
    // },
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
          .catch(function(error) {});
        this.reLoadList();
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
        this.reLoadList();
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
      if (this.list.length == 0) {
        this.$notify({
          title: "提示",
          message: "暂无数据",
          type: "warning",
          duration: 2000
        });
      } else {
        let parme = {};
        parme.marketSubjectType = "1";
        parme.orgId = this.listQuery.orgId;
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
        if (
          this.listQuery.tradeCycleCode != "" &&
          this.listQuery.tradeCycleCode != undefined
        ) {
          parme.tradeCycleCode = this.listQuery.tradeCycleCode;
        }
        parme.marketSubjectType = "1";
        exportObj(parme);
      }
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
.filter-container ::v-deep .filter-item {
  margin-bottom: 5px !important;
}
</style>


