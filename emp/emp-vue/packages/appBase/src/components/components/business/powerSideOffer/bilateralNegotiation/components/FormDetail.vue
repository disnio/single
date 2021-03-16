<!--
 * @功能描述: 双边协商弹窗
 * @版本: 
 * @作者: 康如涛
 * @Date: 2019-08-27 13:48:53
 * @最新修改内容: #2353  康如涛 增加客户名称显示 
 * @LastEditTime: 2020-08-25 15:58:25
 -->
<template>
  <div class="app-container calendar-list-container">
    <!-- 弹窗 -->
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      :before-close="closeDialog"
      custom-class="w1000"
      :title="dialogInfo.title"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
    >
      <!--2019-11-11 #2620 张朋 弹框自适应高度赋值 -->
      <div :style="{paddingRight:'10px',height:dialogHeight+'px'}">
        <el-scrollbar>
            <el-form :inline="true" label-width="100px" class="demo-form-inline">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="交易序列名称" algin="right">
                    <el-input class="filter-item" disabled v-model="schemeInfo.noticeName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="交易品种" algin="right">
                    <el-input class="filter-item" disabled v-model="schemeInfo.tradeVarietyName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="报价方式" algin="right">
                    <el-input class="filter-item" disabled v-model="schemeInfo.quotationMethodName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

            </el-form>

          <!-- <div style="margin-bottom: 20px;">
          <el-button
            type="primary"
            v-if="!dialogInfo.notEdit&&btns.btn_add"
            size="small"
            @click="addTab"
          >添加方案</el-button>
          </div>-->
          <div class="f-mt10" style="position:relative; z-index:10;" v-if="dialogVisible">
            <div
              style="position:absolute; right:10px;top:8px; z-index:11;"
              class="filter-container txt-right"
            >
              <el-button class="filter-item" type="primary" @click="showBenefitCalculation">方案效益测算</el-button>
            </div>

            <el-tabs
              v-if="btns.btn_add&&!dialogInfo.notEdit"
              v-model="programmeTabsValue"
              type="card"
              @tab-remove="removeTab"
              @tab-click="handleClick"
            >
              <el-tab-pane
                v-for="item in programmeTabs"
                :key="item.name"
                :name="item.name"
                :ref="'tab'+item.name"
              >
                <span
                  slot="label"
                  v-if="detailInfo.stateCode=='10'&&detailInfo.passedScheme==item.name"
                >
                  <i class="el-icon-check"></i>
                  {{item.title}}
                </span>
                <span slot="label" v-else>{{item.title}}</span>

                <!-- 省内交易 -->
                <!-- 2019-11-18 #2703  郑文杰 交易管理--发电侧报价方案页面优化 添加 交易品种为扩需增发专场交易的判断-->
                <province-trade
                  :btns="btns"
                  v-if="schemeInfo.tradeVarietyCode=='jypz01'||schemeInfo.tradeVarietyCode=='jypz10'"
                  :orgInfo="orgInfo"
                  :dialogInfo="dialogInfo"
                  :ref="'tabList'+item.name"
                  :programme="item.title"
                  :announcementInfo="schemeInfo"
                  :tradingUnitOption="tradingUnitOption"
                  :quotationSegmentOption="quotationSegmentOption"
                  :detailListData="detailListData[item.name]"
                  :unitMaps="unitMap"
                ></province-trade>
                <!-- 发电权转让 -->
                <generation-rights
                  :btns="btns"
                  v-if="schemeInfo.tradeVarietyCode=='jypz03'"
                  :orgInfo="orgInfo"
                  :dialogInfo="dialogInfo"
                  :ref="'tabList'+item.name"
                  :programme="item.title"
                  :announcementInfo="schemeInfo"
                  :tradingUnitOption="tradingUnitOption"
                  :tradingProductsOption="tradingProductsOption"
                  :assignmentTypeOption="assignmentTypeOption"
                  :transactionClassifyOption="transactionClassifyOption"
                  :quotationSegmentOption="quotationSegmentOption"
                  :detailListData="detailListData[item.name]"
                  :unitMaps="unitMap"
                ></generation-rights>
                <!-- 跨省交易 -->
                <trans-province
                  v-if="schemeInfo.tradeVarietyCode=='jypz02'"
                  :btns="btns"
                  :orgInfo="orgInfo"
                  :dialogInfo="dialogInfo"
                  :ref="'tabList'+item.name"
                  :programme="item.title"
                  :announcementInfo="schemeInfo"
                  :tradingUnitOption="tradingUnitOption"
                  :quotationSegmentOption="quotationSegmentOption"
                  :transactionLineOption="transactionLineOption"
                  :detailListData="detailListData[item.name]"
                  :unitMaps="unitMap"
                ></trans-province>
              </el-tab-pane>
            </el-tabs>
            <el-tabs v-else v-model="programmeTabsValue" type="card" @tab-click="handleClick">
              <el-tab-pane
                v-for="item in programmeTabs"
                :key="item.name"
                :name="item.name"
                :ref="'tab'+item.name"
              >
                <span
                  slot="label"
                  v-if="detailInfo.stateCode=='10'&&detailInfo.passedScheme==item.name"
                >
                  <i class="el-icon-check"></i>
                  {{item.title}}
                </span>
                <span slot="label" v-else>{{item.title}}</span>

                <!-- 省内交易 -->
                <!-- 2019-11-18 #2703  郑文杰 交易管理--发电侧报价方案页面优化  添加 交易品种为扩需增发专场交易的判断-->
                <province-trade
                  :btns="btns"
                  v-if="schemeInfo.tradeVarietyCode=='jypz01'||schemeInfo.tradeVarietyCode=='jypz10'"
                  :orgInfo="orgInfo"
                  :dialogInfo="dialogInfo"
                  :ref="'tabList'+item.name"
                  :programme="item.title"
                  :announcementInfo="schemeInfo"
                  :tradingUnitOption="tradingUnitOption"
                  :quotationSegmentOption="quotationSegmentOption"
                  :detailListData="detailListData[item.name]"
                  :unitMaps="unitMap"
                ></province-trade>
                <!-- 发电权转让 -->
                <generation-rights
                  :btns="btns"
                  v-if="schemeInfo.tradeVarietyCode=='jypz03'"
                  :orgInfo="orgInfo"
                  :dialogInfo="dialogInfo"
                  :ref="'tabList'+item.name"
                  :programme="item.title"
                  :announcementInfo="schemeInfo"
                  :tradingUnitOption="tradingUnitOption"
                  :tradingProductsOption="tradingProductsOption"
                  :assignmentTypeOption="assignmentTypeOption"
                  :transactionClassifyOption="transactionClassifyOption"
                  :quotationSegmentOption="quotationSegmentOption"
                  :detailListData="detailListData[item.name]"
                  :unitMaps="unitMap"
                ></generation-rights>
                <!-- 跨省交易 -->
                <trans-province
                  v-if="schemeInfo.tradeVarietyCode=='jypz02'"
                  :btns="btns"
                  :orgInfo="orgInfo"
                  :dialogInfo="dialogInfo"
                  :ref="'tabList'+item.name"
                  :programme="item.title"
                  :announcementInfo="schemeInfo"
                  :transactionLineOption="transactionLineOption"
                  :tradingUnitOption="tradingUnitOption"
                  :quotationSegmentOption="quotationSegmentOption"
                  :detailListData="detailListData[item.name]"
                  :unitMaps="unitMap"
                ></trans-province>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <!--  2019-11-05 #2494 滕超 修改记录 -->
        <el-button style="float:left" v-if="dialogInfo.btnModify" @click="modifyHistory">修改记录</el-button>
        <el-button
          :loading="saveBtnLoading"
          class="save-btn"
          v-if="dialogInfo.btnSave&&!dialogInfo.notEdit"
          @click="save('11')"
        >保存</el-button>
        <el-button
          :loading="submitBtnLoading"
          class="submit-btn"
          v-if="dialogInfo.btnSubmit&&!dialogInfo.notEdit"
          @click="save('3')"
        >提交</el-button>
        <el-button class="cancel-btn" @click="footerCloseDialog">
          <span v-if="!dialogInfo.notEdit">取消</span>
          <span v-else>关闭</span>
        </el-button>
      </div>
    </el-dialog>
    <benefit-calculation
      :schemeInfo="schemeInfo"
      :orgInfo="orgInfo"
      :unitMaps="unitMap"
      ref="benefitCalculation"
    ></benefit-calculation>
    <!--  2019-11-05 #2494 滕超 修改记录弹框 start-->
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      custom-class="w800"
      title="修改记录"
      :visible.sync="dialogTableVisible"
      :before-close="resetTemp"
    >
      <div style="height: 400px;">
        <el-scrollbar>
          <el-table border height="350" :data="gridData" v-loading.body="checkListLoading">
            <el-table-column align="center" label="序号" prop="index"></el-table-column>

            <el-table-column align="center" label="操作人">
              <template slot-scope="scope">
                <div class="txt-left">{{ scope.row.crtUser }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <div class="txt-left">{{ scope.row.operation }}</div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作时间">
              <template slot-scope="scope">
                <div class="txt-left">{{ scope.row.crtTime }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="页签">
              <template slot-scope="scope">
                <div class="txt-left">{{ scope.row.label }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="操作字段">
              <template slot-scope="scope">
                <div class="txt-left">{{ scope.row.modifyField }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="操作前内容">
              <template slot-scope="scope">
                <div>{{ scope.row.oldValue }}</div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作后内容">
              <template slot-scope="scope">
                <span>{{ scope.row.newValue }}</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination-container">
            <el-pagination
              small
              @size-change="sizeChange"
              @current-change="currentChange"
              :current-page.sync="listQuery.page"
              :page-sizes="[10, 20, 30, 50, 100, 200, 500, 1000]"
              :page-size="listQuery.limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="modifyHistoryTotal"
            ></el-pagination>
          </div>
        </el-scrollbar>
      </div>
    </el-dialog>
    <!--  2019-11-05 #2494 滕超 修改记录弹框 end-->
  </div>
</template>
<script>
import {
  modifyInfo,
  addInfo,
  getDetailListBySchemeId,
  deleteInfoByType,
  getcustomerId,
  getPageListModify,
  addChange
} from "@common/api/business/powerSideOffer/centralizedBidding/index";
//#3010 2019-12-06 张亮三 引入请求首页计量单位方法getHomeUnit
import { getHomeUnit } from "@common/api/dashboard/index";
import { mapGetters } from "vuex";
//2019-11-11 #2620 张朋 引用弹框自适应路径
import {
  parseTime,
  getUnitMap,
  getUnitMapByModelCode,
  initDialogHeight
} from "@common/utils/index";
import { initLayoutInfo } from "@common/utils/init";
export default {
  name: "result",
  props: {
    dialogInfo: { type: Object },
    dialogStatus: {
      type: String
    },
    orgInfo: {
      type: Object
    },
    pricingProposalOption: { type: Array },
    btns: { type: Object },
    tradingUnitOption: {
      type: Array
    },
    marketSubjectType: { type: String },
    quotationSegmentOption: {
      type: Array
    },
    transactionLineOption: {
      type: Array
    },
    tradingProductsOption: {
      type: Array
    },
    assignmentTypeOption: {
      type: Array
    },
    transactionClassifyOption: {
      type: Array
    }
    // #3010 2019-12-07 张亮三 接收父组件传的unitMaps
    // unitMaps: {
    //   type: Object
    // }
  },
  components: {
    "province-trade": () => import("./ProvinceTrade"), //省内
    "generation-rights": () => import("./GenerationRights"), //发电权
    "trans-province": () => import("./TransProvince"), //跨省
    BenefitCalculation: () => import("./BenefitCalculation")
  },
  data() {
    return {
      saveBtnLoading: false,
      submitBtnLoading: false,
      detailListData: [],
      layoutInfo: {},
      detailInfo: {},
      saveLoading: false,
      programmeTabsValue: "1",
      programmeTabs: [],
      dialogInfoData: this.dialogInfo,
      schemeInfo: {},
      listLoading: false,
      dialogVisible: false,
      dialogTableVisible: false, //修改记录弹框
      checkListLoading: false,
      gridData: [], //修改记录弹框数据
      modifyHistoryTotal: 0, //修改记录数据总数
      listQuery: {
        //修改记录分页
        limit: 10,
        page: 1,
        businessId: ""
      },
      listForm: {
        detailId: "",
        fdOrgId: "",
        fdOrgName: "",
        tradingUnitId: "",
        tradingUnitName: "",
        // quotationStall: "",
        // quotationStallName: "",
        declarationElectricity: "",
        declarationElectricityPrices: "",
        powerPurchaseUnitCode: "", // 2020-06-08   #4161  qinhz  增加购电侧交易单元
        customerId: "",
        customerName: "", // 2019-10-29   #2353  康如涛 增加客户名称显示
        schemeDesc: "",
        quotationPeriod:"",//#4195 gaoaining 2020-06-09
        quotationPeriodName:"",//#4195 gaoaining 2020-06-09
      },
      transProvinceForm: {
        fdOrgId: "",
        detailId: "",
        fdOrgName: "",
        tradingUnitId: "",
        tradingUnitName: "", // 2019-10-30   #2430  康如涛 交易单元名称
        quotationStall: "",
        quotationStallName: "", // 2019-10-30   #2430  康如涛 报价段名称
        declarationElectricity: "",
        transactionLine: "",
        transactionLineName: "",
        declarationElectricityPrices: "",
        customerId: "",
        customerName: "", // 2019-11-08   #2613  康如涛 增加客户名称显示
        schemeDesc: "",
        quotationPeriod:"",//#4195 gaoaining 2020-06-09
        quotationPeriodName:"",//#4195 gaoaining 2020-06-09
      },
      generationRightsForm: {
        fdOrgId: "",
        fdOrgName: "",
        detailId: "",
        //tradingUnitId: "",
        // quotationStall: "",
        declarationElectricity: "",
        // transactionLine: "",
        declarationElectricityPrices: "",
        tradingClassificationCode: "",
        tradingTypeCode: "",
        tradingClassificationName: "交易分类名称",
        tradingProductName: "产品/交易产品名称",
        tradingTypeName: "交易类型名称",
        tradingVarietyName: "交易品种名称",
        unit: "",
        tradingProduct: "",
        sellTransfereeOrgId: "出/受让发电企业",
        sellTransfereeUnit: "出/受让机组",
        transactionLine: "",
        transactionLineName: "",
        schemeDesc: "",
        eleEnterprise: "",
        eleEnterpriseName: "",
        quotationPeriod:"",//#4195 gaoaining 2020-06-09
        quotationPeriodName:"",//#4195 gaoaining 2020-06-09
      },
      unitMap: {
        electricityUnit: "",
        priceUnit: "",
        amountUnit: "",
        capacityUnit: ""
      },
      listForm: {
        detailId: "",
        declarationElectricity: "",
        declarationElectricityPrices: "",
        fdOrgId: "",
        fdOrgName: "",
        tradingUnitId: "",
        tradingUnitName: "",
        customerId: "",
        customerName: "",
        schemeDesc: "",
        quotationPeriod:"",//#4195 gaoaining 2020-06-09
        quotationPeriodName:"",//#4195 gaoaining 2020-06-09
        powerPurchaseUnitCode: "", // 2020-06-08   #4161  qinhz  增加购电侧交易单元

      },
      dialogHeight: "" //2019-11-11 #2620 张朋 弹框获取自适应高度数据
    };
  },
  watch: {
    dialogInfo(val) {
      this.dialogInfoData = val;
    },
    programmeTabs(val) {
      if (this.dialogInfo.state != "add") {
        // this.initTabInfo();
      }
    }
  },
  created() {
    if (sessionStorage.getItem("modelCode") == "dashboard") {
      // this.unitMap = getUnitMapByModelCode(
      //   this.allSubMenus,
      //   this.unitMap,
      //   "bilateralNegotiation"
      // );
      //#3010 2019-12-06 张亮三 当modelCode未首页时获取首页的计量单位 start
      setTimeout(this.getHomeUnitData(this.orgId, "fdPricingProposal"), 10);
      // #3010 2019-12-06 张亮三 当modelCode未首页时获取首页的计量单位 end
    } else {
      this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
    }
    //  this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
  },
  /**2019-11-11 #2620 张朋  弹框自适应高度 start */
  mounted() {
    const that = this;
    this.dialogHeight = initDialogHeight(); //2019-11-12 #2620 张朋 获取弹框高度
    this.layoutInfo = initLayoutInfo();
    window.onresize = function temp() {
      that.layoutInfo = initLayoutInfo();
      that.dialogHeight = initDialogHeight(); //2019-11-12 #2620 张朋  获取弹框高度(监控高度变化)
    };
  },
  /**2019-11-11 #2620 张朋  弹框自适应高度 end */
  computed: {
    ...mapGetters(["elements", "allSubMenus", "orgId"])
  },
  methods: {
    //初始化tabs
    initTabs() {
      if (this.dialogInfo.status == "add") {
        let data = {
          title: "方案1",
          name: "1"
        };
        this.programmeTabs.push(data);
      }
    },
    /**
     * @方法名称: getHomeUnitData
     * @功能描述: 获取首页计量单位
     * @参数:
     * @返回值:
     * @作者: 张亮三
     * @Date: 2019-12-06 17:51:38
     * @最新修改内容:
     * @LastEditTime:
     */
    getHomeUnitData(id, mcode) {
      let parm = {
        orgId: id,
        modelCode: mcode
      };
      getHomeUnit(parm).then(res => {
        if (res.data && res.data != "") {
          this.unitMap.electricityUnit = res.data[1];
          this.unitMap.priceUnit = res.data[2];
          this.unitMap.amountUnit = res.data[3];
          this.unitMap.capacityUnit = res.data[4];
        }
      });
    },
    addChange(parame) {
      addChange(parame)
        .then(res => {
          this.saveLoading = false;
          this.setRequestInfo(res);
        })
        .catch(function(error) {
          this.saveLoading = false;
          this.saveBtnLoading = false;
          this.submitBtnLoading = false;
        });
    },
    //设置列表数据
    setTabList(key, data) {
      let listData = [];
      data.forEach((item, index) => {
        let dataInfo = {};
        dataInfo["index"] = index + 1;
        if (
          this.schemeInfo.tradeVarietyCode == "jypz01" ||
          this.schemeInfo.tradeVarietyCode == "jypz10" //添加交易品种为扩需增发专场交易的判断
        ) {
          for (let key in this.listForm) {
            dataInfo[key] = item[key];
            if (key.indexOf("Name") < 0) {
              dataInfo[key + "Status"] = "";
              dataInfo[key + "StatusMsg"] = "";
            }
          }
        } else if (this.schemeInfo.tradeVarietyCode == "jypz03") {
          for (let key in this.generationRightsForm) {
            dataInfo[key] = item[key];
            if (key.indexOf("Name") < 0) {
              dataInfo[key + "Status"] = "";
              dataInfo[key + "StatusMsg"] = "";
            }
          }
        } else if (this.schemeInfo.tradeVarietyCode == "jypz02") {
          for (let key in this.transProvinceForm) {
            dataInfo[key] = item[key];
            if (key.indexOf("Name") < 0) {
              dataInfo[key + "Status"] = "";
              dataInfo[key + "StatusMsg"] = "";
            }
          }
        }

        listData.push(dataInfo);
      });
      this.detailListData[key] = listData;
    },
    initTabInfo() {
      let keys = [];
      let detailList = this.detailInfo.detailList;
      for (let key in detailList) {
        this.setTabList(key, detailList[key]);
      }
    },
    //初始化编辑tab
    initEditTabs() {
      this.programmeTabs = [];
      let detailList = this.detailInfo.detailList;
      this.programmeTabsValue = "";

      let isNull = true;
      for (let key in detailList) {
        isNull = false;
        this.pricingProposalOption.forEach(item => {
          if (key == item.propCode) {
            this.programmeTabs.push({
              title: item.propName,
              name: key
            });
          }
        });
      }
      /** 2020-01-13 #3579 康如涛 解决删除数据之后页面显示空白问题 start */
      if (isNull) {
        let data = {
          title: "方案一",
          name: "fa_01"
        };
        this.programmeTabs.push(data);
        this.detailInfo.detailList["fa_01"] = [];
      }
      this.programmeTabsValue = this.pricingProposalOption[0].propCode;
      this.detailListData = this.detailInfo.detailList;
      /** 2020-01-13 #3579 康如涛 解决删除数据之后页面显示空白问题 end */
      this.initTabInfo();
    },
    //获取报价详情
    getDetailInfo(id) {
      let parame = {};
      parame.schemeId = id;
      getDetailListBySchemeId(parame).then(res => {
        if (res.rel) {
          this.detailInfo = res.data;
          this.initEditTabs(this.detailInfo);
        } else {
        }
      });
    },
    closeDialog() {
      this.dialogVisible = false;
      this.saveBtnLoading = false;
      this.submitBtnLoading = false;
      if (this.dialogInfo.status === "add") {
        this.$emit("initList");
      }
    },
    footerCloseDialog() {
      this.dialogVisible = false;
      this.saveBtnLoading = false;
      this.submitBtnLoading = false;
      if (this.dialogInfo.status === "add") {
        this.$emit("initList");
      }
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
        this.$emit("initList");
      } else {
        this.saveBtnLoading = false;
        this.submitBtnLoading = false;
        this.$notify({
          title: res.msg,
          message: res.msg,
          type: "warning",
          duration: 2000
        });
      }
    },
    //添加信息
    createInfo(params) {
      addInfo(params).then(res => {
        this.setRequestInfo(res);
      });
    },
    //修改信息
    update(parame) {
      modifyInfo(parame)
        .then(res => {
          this.setRequestInfo(res);
        })
        .catch(function(error) {
        });
    },
    //检测表格数据
    setParameList() {
      let parameInfo = {};
      parameInfo.isErr = false;
      parameInfo.detailList = {};
      this.programmeTabs.forEach(item => {
        let data = {};
        let tableList = [];
        let tempArr = [];
        if (this.schemeInfo.tradeVarietyCode == "jypz01") {
          this.$refs["tabList" + item.name][0].checkTableListData();
        } else {
          this.$refs["tabList" + item.name][0].checkTab();
        }
        tableList = this.$refs["tabList" + item.name][0].tableList;

        tableList.forEach(item2 => {
          let dataInfo = {};
          if (
            this.schemeInfo.tradeVarietyCode == "jypz01" ||
            this.schemeInfo.tradeVarietyCode == "jypz10" //添加交易品种为扩需增发专场交易的判断
          ) {
            for (let key in this.listForm) {
              dataInfo[key] = item2[key];
            }
          } else if (this.schemeInfo.tradeVarietyCode == "jypz03") {
            for (let key in this.generationRightsForm) {
              dataInfo[key] = item2[key];
            }
          } else if (this.schemeInfo.tradeVarietyCode == "jypz02") {
            for (let key in this.transProvinceForm) {
              dataInfo[key] = item2[key];
            }
          }
          tempArr.push(dataInfo);
        });
        parameInfo.detailList[item.name] = tempArr;
        if (this.schemeInfo.tradeVarietyCode == "jypz01") {
          let tableListIsNull = this.$refs["tabList" + item.name][0].tableListIsNull;
          if (tableListIsNull)
            parameInfo.detailList[item.name][0]["schemeDesc"] = "";
            if (this.$refs["tabList" + item.name][0].isErr && !tableListIsNull) {
              parameInfo.isErr = true;
            }
        } else {
          if (this.$refs["tabList" + item.name][0].isErr) {
            parameInfo.isErr = true;
          }
        }
      });
      return parameInfo;
    },
    //提交保存
    save(state) {
      this.saveBtnLoading = true;
      this.submitBtnLoading = true;
      let parame = {};
      parame.stateCode = state;
      parame.tradeVarietyCode = this.schemeInfo.tradeVarietyCode;
      parame.tradingWay = this.schemeInfo.tradeWayCode;
      parame.noticeId = this.schemeInfo.noticeId;
      parame.orgId = this.orgInfo.id;
      parame.marketSubjectType = "0";
      let parameInfo = this.setParameList();
      if (parameInfo.isErr) {
        this.$notify({
          title: "提示",
          message: "报错失败，列表数据有误！",
          type: "warning",
          duration: 2000
        });
        this.saveBtnLoading = false;
        this.submitBtnLoading = false;
        return false;
      } else {
        parame.detailList = parameInfo.detailList;
      }
      // #3545 2020-01-14 张亮三 解决当清空用电企业时id不为空的 问题 start
      for (const key in parame.detailList) {
        if (parame.detailList.hasOwnProperty(key)) {
          parame.detailList[key].forEach(item => {
            if (item.eleEnterpriseName == "") {
              item.eleEnterprise = "";
            }
          });
        }
      }
      // #3545 2020-01-14 张亮三 解决当清空用电企业时id不为空的 问题 end
      if (this.dialogInfoData.status == "add") {
        this.createInfo(parame);
      } else if (this.dialogInfoData.status == "edit") {
        parame.schemeId = this.schemeInfo.schemeId;
        this.update(parame);
      } else if (this.dialogInfoData.status == "change") {
        parame.schemeId = this.schemeInfo.schemeId;
        this.addChange(parame);
      }
    },
    //2019-11-05 #2494 滕超 修改记录
    modifyHistory() {
      this.dialogTableVisible = true;
      this.getList();
    },
    //2019-11-05 #2494 滕超 修改记录分页查询
    getList() {
      this.checkListLoading = true;
      this.listQuery.businessId = this.schemeInfo.schemeId;
      getPageListModify(this.listQuery).then(res => {
        let items = res.data.rows.map((item, index) => {
          item.index =
            index + 1 + (this.listQuery.page - 1) * this.listQuery.limit;
          return item;
        });
        this.gridData = res.data.rows;
        this.modifyHistoryTotal = res.data.total;
        this.checkListLoading = false;
      });
    },
    sizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    currentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    /**
     * @方法名称: resetTemp
     * @功能描述: 关闭修改记录弹框分页重置
     * @参数:
     * @返回值:
     * @样式作用范围:
     * @作者: 滕超
     * @Date: 2019-11-09 16:49:55
     * @最新修改内容:
     * @LastEditTime:
     */
    resetTemp() {
      this.dialogTableVisible = false;
      this.listQuery.page = 1;
      this.listQuery.limit = 10;
    },
    //切换tab
    handleClick(tab, event) {
      this.programmeTabsValue = tab.name;
    },
    //显示新增
    showDialog(data) {
      this.saveBtnLoading = false;
      this.submitBtnLoading = false;
      this.schemeInfo = data;
      this.programmeTabs = [];
      this.detailInfo = {};
      this.addTab();
      this.dialogVisible = true;
    },
    //显示编辑
    showEditDialog(schemeInfo, detailInfo) {
      this.saveBtnLoading = false;
      this.submitBtnLoading = false;
      this.schemeInfo = schemeInfo;
      this.programmeTabs = [];
      this.detailInfo = detailInfo;
      this.initEditTabs(this.detailInfo);
      this.dialogVisible = true;
    },
    //查看信息窗口
    showViewsDialog(schemeInfo, detailInfo) {
      this.saveBtnLoading = false;
      this.submitBtnLoading = false;
      this.schemeInfo = schemeInfo;
      this.programmeTabs = [];
      this.detailInfo = detailInfo;
      this.initEditTabs(this.detailInfo);
      this.dialogVisible = true;
    },
    //效益测算
    showBenefitCalculation() {
      let sureData = this.setParameList();
      if (JSON.stringify(sureData.detailList) == "{}") {
        this.$confirm("请先创建报价方案", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
      } else {
        this.$refs["benefitCalculation"].showDialog(
          this.schemeInfo,
          this.programmeTabsValue
        );
      }
    },
    setTabName() {
      let noAdded = [];
      for (let i = 0, l = this.pricingProposalOption.length; i < l; i++) {
        let isAdded = this.programmeTabs.filter(
          item => item.name == this.pricingProposalOption[i].propCode
        );
        if (isAdded.length < 1) {
          let tabInfo = {};
          tabInfo.title = this.pricingProposalOption[i].propName;
          tabInfo.name = this.pricingProposalOption[i].propCode;
          noAdded.push(tabInfo);
        }
      }
      return noAdded[0];
    },
    //添加方案
    addTab() {
      let tabInfo = {};
      tabInfo.title = this.pricingProposalOption[
        this.programmeTabs.length
      ].propName;
      tabInfo.name = this.pricingProposalOption[
        this.programmeTabs.length
      ].propCode;

      if (this.dialogInfo.status == "edit") {
        if (this.programmeTabs.length > 0) {
          tabInfo = this.setTabName();
        }
      }
      if (this.programmeTabs.length < 4) {
        this.programmeTabs.push(tabInfo);
        let _this = this;
        this.programmeTabsValue = tabInfo.name;
        this.detailListData[this.programmeTabsValue] = [];
        setTimeout(function() {
          _this.$refs["tabList" + _this.programmeTabsValue][0].initTableData();
          //  _this.$refs["tabList" + this.programmeTabsValue][0].initTableData();
        }, 500);
      } else {
        this.$notify({
          title: "提示",
          message: "方案最多为4中",
          type: "warning",
          duration: 2000
        });
      }
    },
    delTab(targetName) {
      let tabs = this.programmeTabs;
      let activeName = this.programmeTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.programmeTabsValue = activeName;
      this.programmeTabs = tabs.filter(tab => tab.name !== targetName);
    },
    //删除方案
    removeTab(targetName) {
      this.$confirm("即将删除此条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let parame = {};
        if (typeof this.schemeInfo.schemeId == "undefined") {
          this.delTab(targetName);
        } else {
          if (this.schemeInfo.schemeId == "") {
            this.delTab(targetName);
          } else {
            parame.schemeId = this.schemeInfo.schemeId;
            parame.schemeNameCode = targetName;
            deleteInfoByType(parame).then(res => {
              if (res.rel) {
                this.$notify({
                  title: "成功",
                  message: "删除成功",
                  type: "success",
                  duration: 2000
                });
                this.delTab(targetName);
              } else {
                this.$notify({
                  title: "提示",
                  message: res.msg,
                  type: "warning",
                  duration: 2000
                });
              }
            });
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.w-half {
  width: 80px !important;
}
</style>





