<!--
       * @功能描述:售电公司购电交易明细表
       * @作者:张朋
       * @工单号:#2818
       * @Date: 2019-11-26
       */
-->
<template>
  <div class="app-container calendar-list-container">
    <div v-if="this.getModelCode =='sdCompanyPowerPurchase'" class="filter-container">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline" ref="listQueryForm">
        <el-row>
          <org-selects ref="orgSelects" @select="selectOrg" @initOrg="initOrg"></org-selects>
          <el-form-item label="日期" algin="right">
            <el-date-picker
              style="width:150px"
              v-model="listQuery.issue"
              type="month"
              :clearable="true"
              format="yyyy-MM"
              value-format="yyyy-MM"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <!--2020-2-26 #3791 zhangp 添加计算按钮-->
            <el-button type="primary"  :disabled="disaQuery" icon="el-icon-search" @click="handleFilter">查询</el-button>
              <el-button
                :disabled="disaHand"
                type="primary"
                icon="el-icon-upload"
                @click="showExecuteMsg"
              >计算</el-button>
          </el-form-item>
          <!-- <el-form-item>
            <el-button type="primary" @click="handleExport"  icon="el-icon-upload">导出</el-button>
          </el-form-item>-->
        </el-row>
      </el-form>
    </div>
    <!--2019-12-11 #2822 张朋 添加标题 -->
    <h2 v-if="this.getModelCode =='sdCompanyPowerPurchase'" style="text-align:center">售电公司购电交易明细表</h2>
    <h2 v-else style="text-align:center">{{this.orgName}}{{this.issueN}}售电公司购电交易明细表</h2>
    <!--2019-12-17 #2181 张朋 去除容量单位 -->
    <div
      class="txt-right unit-info"
    >单位:{{unitMap.electricityUnit}}、{{unitMap.priceUnit}}、{{unitMap.amountUnit}}、%</div>
    <!-- 通用表格组件 start -->
    <!-- <div style="margin:0 10px;"> -->
    <div class="table-con">
      <custom-table
        ref="customTable"
        :resultTableData="resultTableData"
        :colWidth="150"
        :dataKeys="dataKeys"
        :rowspanKey="rowspanKey"
        :colspanKey="colspanKey"
      />
      <!-- </div> -->
    </div>
    <!-- 通用表格组件 end -->
    
    <!-- 等待进度组件 start -->
    <waiting-progress
      ref="waitingProgress"
      :waitingTime="progressInfo.waitingTime"
      :startTime="progressInfo.startTime"
      :isWaiting="progressInfo.isWaiting"
      :type="progressInfo.type"
      :progressVal="progressInfo.progressVal"
      :isRequesting="isRequesting"
      @closeProgress="closeProgress"
      @getProgressState="getProgressState"
      @initData="getList"
      @startCalculate="handClickExecute"
      
    />
    <!-- 等待进度组件 end -->
  </div>
</template>

<script>
import {
  sdCompanyPowerPurchaseList,
  exportAllJmtsFile
} from "@common/api/business/transactionQuery/sdElectricitySitituation/index";
import {
  executeJob,
  jobStatus
} from "@common/api/business/transactionQuery/basicLedgerOfPowerPlant/index";
import { getHomeUnit } from "@common/api/dashboard/index";
import { layoutInfo } from "@common/utils/init";
import { mapGetters } from "vuex";
import Cookies from "js-cookie";
//2019-12-11 #2822 zhangp 引用单位
import { getUnitMapByModelCode, getUnitMap } from "@common/utils/index";
//引用区域和区域公司组件路径
import OrgSelects from "@common/components//areaComSelectsList";
import { parseTime } from "@common/utils/index";

const CustomTable = () => import("./components/CustomTable");
import {
  getPageProgress,
  setProgressState,
  initProgress,
  setProgressFinished,
  getRequesting
} from "@common/utils/waitingProgress";
import WaitingProgress from "@common/components/WaitingProgress";
export default {
  name: "TransactionLedger",
  components: {
    CustomTable,
    OrgSelects,
    WaitingProgress
  },
  props: {
    issue: { type: String },
    orgId: { type: String },
    orgName: { type: String }
  },
  data() {
    return {
      issueN: this.issue,
      orgIdN: this.orgId,
      orgNameN: this.orgName,
      getModelCode: "",
      disaHand: false,
      disaQuery: false,
      jobId: "",
      newArr: [[]], //表头
      maxHeight: 1, //表头总共占的行数
      colKeyList: [], //所有的key
      reportData: [],
      tableData: [],
      scrollbarHeight: "",
      scrollbarWidth: "",
      tableRowSpan: [],
      newTableData: [], //新table数据
      listQuery: {
        issue: ""
      },
      unitMap: {}, //单位
      rowspanKey: {
        sale_company_name: { value: "all", state: false }, //售电公司名称
        date: { value: "all", state: true }, //日期
        trading_name: { value: "all", state: true }, //交易名称
        market_trading_electricity: { value: "all", state: true }, //可参与直接交易规模
        market_buy_electricity: { value: "all", state: true }, //购电量
        market_sale_price: { value: "all", state: true }, //售电价
        market_sale_down_price: { value: "all", state: true }, //售电降幅
        market_buy_price: { value: "all", state: true }, //购电价
        market_buy_down_price: { value: "all", state: true }, //购电降幅
        market_buy_sale_price: { value: "all", state: true }, //购销价差
        market_sale_company_proportion_percent: { value: "all", state: true }, //售电公司获价差分成比例
        market_proportion_price: { value: "all", state: true }, //考虑分成后售电价
        market_proportion_sale_down_price: { value: "all", state: true }, //考虑分成后售电降幅
        market_proportion_buy_sale_price: { value: "all", state: true }, //考虑分成后购销价差
        generate_buy_electricity:{value:"all",state:true},
        generate_proportion_percent:{value:"all",state:true},
      },
      colspanKey: { date: "merge", trading_name: "merge" },
      dataKeys: {
        sale_company_name: "", //售电公司名称
        date: "", //日期
        trading_name: "", //交易名称
        market_trading_electricity: "", //市场情况 -- 可参与直接交易规模
        market_buy_electricity: "", //市场情况 -- 购电量
        market_sale_price: "", //市场情况 -- 售电价
        market_sale_down_price: "", //市场情况 -- 售电降幅
        market_buy_price: "", //市场情况 -- 购电价
        market_buy_down_price: "", //市场情况 -- 购电降幅
        market_buy_sale_price: "", // 市场情况 -- 购销价差
        market_sale_company_proportion_percent: "", //市场情况 -- 售电公司获价差分成比例
        market_proportion_price: "", //市场情况 -- 考虑分成后售电价
        market_proportion_sale_down_price: "", //市场情况 -- 考虑分成后售电降幅
        market_proportion_buy_sale_price: "", //市场情况 -- 考虑分成后购销价差
        generate_buy_electricity: "", //发电背景售电公司 -- 购电量
        generate_proportion_percent: "", //发电背景售电公司 -- 占售电份额
        company_trading_proportion_percent: "", // 公司情况 -- 参与交易装机份额
        company_buy_electricity: "", //公司情况 -- 购电量
        company_bloc_buy_electricity: "", // 公司情况 -- 集团内协商购电
        company_unbloc_buy_electricity: "", //公司情况 -- 集团外协商购电
        company_bid_buy_electricity: "", // 公司情况 -- 竞价购电
        company_inner_percent: "", //公司情况 -- 电量内部协同率
        company_share_percent: "", //公司情况 -- 份额
        company_installed_share_percent: "", //公司情况 -- 较装机份额（前）
        company_sale_share_percent: "", //公司情况 -- 占发电售电背景份额
        company_installed_behand_share_percent: "", // 公司情况 -- 较装机份额（后）
        // company_sale_price: "", //公司情况 -- 售电价
        // company_sale_down_price: "", // 公司情况 -- 售电降幅
        company_buy_price: "", //公司情况 -- 购电价
        company_buy_down_price: "", //公司情况 -- 购电降幅
        // company_buy_sale_price: "", //公司情况 -- 购销价差
        // company_sale_comany_proportion_percent: "", //公司情况 -- 公司获价差分成比例
        // company_proportion_price: "", //公司情况 -- 考虑分成后售电价
        // company_proportion_sale_down_price: "", //公司情况 -- 考虑分成后售电降幅
        // company_proportion_buy_sale_price: "", // 公司情况 -- 考虑分成后购销价差
        // company_service_income_fee: "", //公司情况 -- 售电服务费收入（从用户）
        // company_commission_income_fee: "", //公司情况 -- 售电佣金收入（从电厂）
        // company_assess_income_fee: "", //公司情况 -- 考核用户偏差收入
        // company_deviation_out_fee: "", //公司情况 -- 被偏差考核支出
        // company_agency_fees_fee: "", //公司情况 -- 二级代理费支出
        // company_margin_fee: "", //公司情况 -- 价差毛利
        // company_all_margin_fee: "", //公司情况 -- 总毛利
        remark: "" //公司情况 -- 备注
      },
      periodOptions: [], //周期
      
      tableHeader: [],
      resultTableData: { tableHeader: [], result: [] },
       progressInfo: {
        waitingTime: 5000, //请求间隔
        step: 5, //递增数值
        startTime: "", //开始请求时间
        isWaiting: false, // 是否显示等待
        type: "1",  //loading类型 1：计算 2，上传
        progressVal: 0, //进度
        jobId: ""   //计算id
      },
      listLoading:false,
      isRequesting:false,
    };
  },
  computed: {
    ...mapGetters(["layoutInfo", "allSubMenus"])
  },
  watch: {
    layoutInfo: {
      deep: true,
      handler: function(newVal, oldVal) {
        this.scrollbarHeight = newVal.height;
      }
    },
    issue(val) {
      this.issueN = val;
    }
  },
  created() {
    this.getModelCode = sessionStorage.getItem("modelCode");
  },
  destroyed() {},
  mounted() {
    this.layout = this.layoutInfo;
    this.scrollbarHeight = this.layoutInfo.height;
    this.initJyData();
    if (this.getModelCode != "sdCompanyPowerPurchase") {
      this.unitMap = getUnitMapByModelCode(
        this.allSubMenus,
        this.unitMap,
        "sdCompanyPowerPurchase"
      );
      sessionStorage.setItem("pageModelCode", "sdCompanyPowerPurchase");
      let param = {
        issue: this.issue,
        regional: this.orgId,
        province: this.orgName
      };
      this.showSubDialog(param);
    } else {
      this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
      this.initIssue();
    }
     if (getPageProgress()) {
      this.progressInfo = setProgressState();
      this.jobId = this.progressInfo["jobId"];
     this.getJobStatus();
    }
  },
  methods: {
     /*
     * @功能描述: 提前关闭进度
     * @作者: 康如涛
     * @Date: 2020-04-26
     */
    closeProgress() {
      this.progressInfo.isWaiting = false;
      this.disaHand = false;
    },
    /*
     * @功能描述: 获取进度
     * @作者: 康如涛
     * @Date: 2020-04-26
     */
    getProgressState() {
      this.getJobStatus();
    },
    showSubDialog(data) {
      this.listQuery.orgid = data.regional;
      this.listQuery.issue = data.issue;
      this.getList();
    },
    getHomeUnitData(id, mcode) {
      let parm = {
        orgId: id,
        modelCode: mcode
      };
      getHomeUnit(parm).then(res => {
        let unitMaps = {};
        if (res.data && res.data != "") {
          unitMaps["electricityUnit"] = res.data[1];
          unitMaps["priceUnit"] = res.data[2];
          unitMaps["amountUnit"] = res.data[3];
          unitMaps["capacityUnit"] = res.data[4];
          this.unitMap = unitMaps;
        }
      });
    },
    //初始化页面期次信息 //20191223 阿彪 #3277 报表期次统一调整
    initIssue() {
      let nowTime = new Date();
      let d = nowTime.getDate();
      let ym = "";
       if (d > 5) {
        nowTime.setMonth(nowTime.getMonth() - 1);
        //2020-3-3 #3832 zhangp 判断计算之后的月份小于10时，在月份前添加0
         if(nowTime.getMonth() + 1 >= 10){
            ym = nowTime.getFullYear() + "-" +  (nowTime.getMonth() + 1);
          }else{
              ym = nowTime.getFullYear() + "-" + '0' +(nowTime.getMonth() + 1);
          }
      } else {
        nowTime.setMonth(nowTime.getMonth() - 2);
          if(nowTime.getMonth() + 1 >= 10){
              ym = nowTime.getFullYear() + "-" +  (nowTime.getMonth() + 1);
          }else{
              ym = nowTime.getFullYear() + "-" + '0' +(nowTime.getMonth() + 1);
          }
      }
      this.listQuery.issue = ym;
    },
    //按组织初始化列表
    initOrg(id) {
      this.listQuery.orgid = id;
    },
    //设置查询条件中组织ID
    selectOrg(id) {
      this.listQuery.orgid = id;
      this.getList();
    },
    /**
     * @功能描述: 查询
     * @参数:
     * @返回值:
     * @作者: 张朋
     * @Date: 2019-11-26 13:59:59
     * @最新修改内容:
     * @LastEditTime:
     */
    handleFilter() {
       //查询方法
      if (this.jobId == "") {
        this.getList();
      } else {
        this.getJobStatus();
      }
    },
    getList() {
      sdCompanyPowerPurchaseList(this.listQuery).then(res => {
        if (res.rel) {
          this.resultTableData["result"] = res.result;
        } else {
          this.$notify({
            title: "失败",
            message: res.msg,
            type: "warning",
            duration: 2000
          });
          this.resultTableData["result"] = [];
        }
        this.loading = false;
      });
    },
    /*
     * @功能描述:  初始交易台账数据
     * @作者: 康如涛
     * @Date: 2019-11-21
     */
    initJyData() {
      this.tableData = this.newTableData;
      this.tableHeader = [
        {
          col_name: "售电公司名称",
          col_value: "sale_company_name",
          fixed: "left"
        },
        { col_name: "日期", col_value: "date", fixed: "left" },
        {
          col_name: "交易名称（省份+时间+交易类型）",
          col_value: "trading_name",
          fixed: "left"
        },
        {
          col_name: "市场整体情况",
          fixed: false,
          cols: [
            {
              col_name: "购电量",
              fixed: false,
              cols: [
                {
                  col_name: "可参与直接交易规模",
                  col_value: "market_trading_electricity",
                  fixed: false
                },
                {
                  col_name: "购电量",
                  col_value: "market_buy_electricity",
                  fixed: false
                }
              ]
            },
            {
              col_name: "原始电价",
              fixed: false,
              cols: [
                {
                  col_name: "售电价",
                  col_value: "market_sale_price",
                  fixed: false
                },
                {
                  col_name: "售电降幅",
                  col_value: "market_sale_down_price",
                  fixed: false
                },
                {
                  col_name: "购电价",
                  col_value: "market_buy_price",
                  fixed: false
                },
                {
                  col_name: "购电降幅",
                  col_value: "market_buy_down_price",
                  fixed: false
                },
                {
                  col_name: "购销价差",
                  col_value: "market_buy_sale_price",
                  fixed: false
                },
                {
                  col_name: "售电公司获价差分成比例",
                  col_value: "market_sale_company_proportion_percent",
                  fixed: false
                }
              ]
            },
            {
              col_name: "考虑分成后电价 ",
              fixed: false,
              cols: [
                {
                  col_name: "考虑分成后售电价",
                  col_value: "market_proportion_price",
                  fixed: false
                },
                {
                  col_name: "考虑分成后售电降幅",
                  col_value: "market_proportion_sale_down_price",
                  fixed: false
                },
                {
                  col_name: "考虑分成后购销价差",
                  col_value: "market_proportion_buy_sale_price",
                  fixed: false
                }
              ]
            }
          ]
        },
        {
          col_name: "发电背景售电公司",
          fixed: false,
          cols: [
            {
              col_name: "购电量",
              col_value: "generate_buy_electricity",
              fixed: false
            },
            {
              col_name: "占售电份额",
              col_value: "generate_proportion_percent",
              fixed: false
            }
          ]
        },
        {
          col_name: "公司情况",
          fixed: false,
          cols: [
            {
              col_name: "参与交易装机份额",
              col_value: "company_trading_proportion_percent",
              fixed: false
            },
            {
              col_name: "购电量结构",
              fixed: false,
              cols: [
                {
                  col_name: "购电量",
                  col_value: "company_buy_electricity",
                  fixed: false
                },
                {
                  col_name: "集团内协商购电",
                  col_value: "company_bloc_buy_electricity",
                  fixed: false
                },
                {
                  col_name: "集团外协商购电",
                  col_value: "company_unbloc_buy_electricity",
                  fixed: false
                },
                {
                  col_name: "竞价购电",
                  col_value: "company_bid_buy_electricity",
                  fixed: false
                },
                {
                  col_name: "电量内部协同率",
                  col_value: "company_inner_percent",
                  fixed: false
                }
              ]
            },
            {
              col_name: "购电量份额",
              fixed: false,
              cols: [
                {
                  col_name: "份额",
                  col_value: "company_share_percent",
                  fixed: false
                },
                {
                  col_name: "较装机份额",
                  col_value: "company_installed_share_percent",
                  fixed: false
                },
                {
                  col_name: "占发电售电背景分额",
                  col_value: "company_sale_share_percent",
                  fixed: false
                },
                {
                  col_name: "较装机份额",
                  col_value: "company_installed_behand_share_percent",
                  fixed: false
                }
              ]
            },
            {
              col_name: "原始电价",
              fixed: false,
              cols: [
                // {
                //   col_name: "售电价",
                //   col_value: "company_sale_price",
                //   fixed: false
                // },
                // {
                //   col_name: "售电降幅",
                //   col_value: "company_sale_down_price",
                //   fixed: false
                // },
                {
                  col_name: "购电价",
                  col_value: "company_buy_price",
                  fixed: false
                },
                {
                  col_name: "购电降幅",
                  col_value: "company_buy_down_price",
                  fixed: false
                },
                // {
                //   col_name: "购销价差",
                //   col_value: "company_buy_sale_price",
                //   fixed: false
                // },
                // {
                //   col_name: "公司获价差分成比例",
                //   col_value: "company_sale_comany_proportion_percent",
                //   fixed: false
                // }
              ]
            },
            // {
            //   col_name: "考虑分成后电价",
            //   fixed: false,
            //   cols: [
                // {
                //   col_name: "考虑分成后售电价",
                //   col_value: "company_proportion_price",
                //   fixed: false
                // },
            //     {
            //       col_name: "考虑分成后售电降幅",
            //       col_value: "company_proportion_sale_down_price",
            //       fixed: false
            //     },
            //     {
            //       col_name: "考虑分成后购销价差",
            //       col_value: "company_proportion_buy_sale_price",
            //       fixed: false
            //     }
            //   ]
            // },
            // {
            //   col_name: "售电收支",
            //   fixed: false,
            //   cols: [
                // {
                //   col_name: "售电服务费收入(从用户)",
                //   col_value: "company_service_income_fee",
                //   fixed: false
                // },
                // {
                //   col_name: "售电佣金收入(从电厂)",
                //   col_value: "company_commission_income_fee",
                //   fixed: false
                // },
                // {
                //   col_name: "考核用户偏差收入",
                //   col_value: "company_assess_income_fee",
                //   fixed: false
                // },
                // {
                //   col_name: "被偏差考核支出",
                //   col_value: "company_deviation_out_fee",
                //   fixed: false
                // },
                // {
                //   col_name: "二级代理费支出",
                //   col_value: "company_agency_fees_fee",
                //   fixed: false
                // },
                // {
                //   col_name: "价差毛利",
                //   col_value: "company_margin_fee",
                //   fixed: false
                // },
                // {
                //   col_name: "总毛利",
                //   col_value: "company_all_margin_fee",
                //   fixed: false
                // }
            //   ]
            // }
          ]
        },
        {
          col_name: "备注",
          col_value: "remark",
          fixed: false
        }
      ];

      this.resultTableData["result"] = this.tableData;
      this.resultTableData["tableHeader"] = this.tableHeader;
      this.resultTableData["rowspanKey"] = this.rowspanKey;
      this.resultTableData["colspanKey"] = this.colspanKey;
      // this.setViewsList();
    },
    /*
     * @功能描述: 增加模拟数据
     * @作者: 康如涛
     * @Date: 2019-11-21
     */
    setReportData(data, rowIndex) {
      let item = data;
      for (let i = 1; i < 14; i++) {
        item["number" + i] = "1068.74";
      }
      return item;
    },
    setViewsList() {
      /*
       * @功能描述: 设置表格数据
       * @作者: 康如涛
       * @Date: 2019-11-21
       */
      let listData = this.tableData;
      listData.forEach((item, index) => {
        this.tableRowSpan.push([]);
        this.setRowColspan(index, item);
      });
      // console.log(this.tableRowSpan, 888999);
    },
    setRowspan(data, key, nowRowIndex, rowIndex, columnIndex, rowspan) {
      /*
       * @功能描述: 重新设置单元格rowspan值
       * @param {String} key 当前数据key值
       * @param {Object} data  当前数据项
       * @param {Number} nowRowIndex  当前数据所在索引
       * @param {Number} rowIndex  行索引
       * @param {Number} columnIndex  当前单元格列索引
       * @param {Number} rowspan  合并行数
       * @作者: 康如涛
       * @Date: 2019-11-21
       */
      let isMerge = false;
      if (
        (this.rowspanKey[key].state &&
          (this.rowspanKey[key]["value"] == "all" ||
            this.rowspanKey[key]["value"] == data[key])) ||
        (!this.rowspanKey[key].state &&
          this.rowspanKey[key]["value"] != data[key])
      ) {
        isMerge = true;
      }
      if (isMerge) {
        if (rowIndex > 0) {
          if (this.tableData[rowIndex - 1][key] == data[key]) {
            this.setRowspan(
              data,
              key,
              nowRowIndex,
              rowIndex - 1,
              columnIndex,
              rowspan + 1
            );
          } else {
            this.tableRowSpan[rowIndex][columnIndex]["rowspan"] = rowspan;
            this.tableRowSpan[nowRowIndex][columnIndex]["rowspan"] = 0;
            this.tableRowSpan[nowRowIndex][columnIndex][
              "colspan"
            ] = this.tableRowSpan[rowIndex][columnIndex]["colspan"];
          }
        } else {
          this.tableRowSpan[rowIndex][columnIndex]["rowspan"] = rowspan;
          this.tableRowSpan[nowRowIndex][columnIndex]["rowspan"] = 0;
          this.tableRowSpan[nowRowIndex][columnIndex][
            "colspan"
          ] = this.tableRowSpan[rowIndex][columnIndex]["colspan"];
        }
      }
    },
    setColspan(rowIndex, nowColumnIndex, columnIndex) {
      /*
       * @功能描述: 重新设置单元格colpan值
       * @param {Object} data  当前数据项
       * @param {String} key 当前数据key值
       * @param {Number} rowIndex  当前数据所在索引
       *  @param {Number} nowColumnIndex  当前单元格列索引
       * @param {Number} columnIndex  单元格列索引
       * @param {Boolean} isMerge  合并标记
       * @作者: 康如涛
       * @Date: 2019-11-21
       */
      if (nowColumnIndex === columnIndex) {
        this.tableRowSpan[rowIndex][columnIndex] = { rowspan: 0, colspan: 0 };
      }
      if (this.tableRowSpan[rowIndex][columnIndex - 1]["colspan"] > 0) {
        this.tableRowSpan[rowIndex][columnIndex - 1]["colspan"] =
          this.tableRowSpan[rowIndex][columnIndex - 1]["colspan"] + 1;
      } else {
        this.setColspan(rowIndex, nowColumnIndex, columnIndex - 1);
      }
    },
     /*
     * @功能描述: 显示计算提示
     */
    showExecuteMsg(){
    if (getPageProgress()) {
      this.progressInfo = setProgressState();
      this.jobId = this.progressInfo["jobId"];
     this.getJobStatus();
    }else{
      this.$refs.waitingProgress.showMsg();
    }
    },
   /**
     * @方法名称: handClickExecute
     * @功能描述: 计算报表信息
     * @参数:
     * @返回值:
     * @作者: zhangp
     * @issues:
     * @Date: 2019-02-26 10:29:40
     * @最新修改内容:
     * @LastEditTime:
     */
     handClickExecute() {
      this.disaHand = true;
      this.disaQuery = false;
      let param = {
        job: "/mkt/rpt/mkt_rpt_sale_electricity_detail",
        issue: this.listQuery.issue
      };
      executeJob(param).then(res => {
        this.jobId = res.data;
         this.progressInfo = initProgress(this.progressInfo);
        this.progressInfo["jobId"] = this.jobId;
        this.$refs.waitingProgress.initProgress();
      });
    },
        /*
     * @功能描述: 获取计算状态
     * @param {String} jobId  汇总计算ID
     * @作者: zhangp
     * @Date: 2020-2-26
     */
    getJobStatus() {
      let param = {
        id: this.jobId
      };
       if(this.jobId==""){ 
         this.disaHand = false;
         this.progressInfo = setProgressFinished();
        
      }else{
        let requestingInfo=getRequesting(this.progressInfo);
      if(requestingInfo.isRequesting&&!this.isRequesting){
        this.progressInfo=requestingInfo.progressInfo;
        this.isRequesting=true;
      jobStatus(param).then(res => {
        if (res.rel) {
          this.criteria = res.data;
          // if (res.data == "Running") {
          //   this.disaHand = true;
          // } else {
          //   this.getList();
          //   this.jobId = "";
          //   this.disaHand = false;
          // }
            this.isRequesting=false;
          if (res.data == "Running") {
            this.progressInfo = setProgressState();
            this.disaHand = true;
          } else {
             this.progressInfo = setProgressFinished();
            this.jobId = "";
            this.disaHand = false;
          }
        } else {
          this.$notify({
            title: "失败",
            message: "计算出错",
            type: "warning",
            duration: 2000
          });
        }
      });}}
    },
    /*
     * @功能描述: 重新设置单元格rowspan和colspan值
     * @param {Object} data  当前数据项
     * @param {Number} nowRowIndex  当前数据所在索引
     * @作者: 康如涛
     * @Date: 2019-11-21
     */
    setRowColspan(rowIndex, data) {
      for (let key in data) {
        let columnIndex = this.tableRowSpan[rowIndex].length;
        this.tableRowSpan[rowIndex][columnIndex] = {
          rowspan: 1,
          colspan: 1,
          data: data[key],
          key: key
        };
        if (columnIndex > 0) {
          if (this.colspanKey[key] == data[key]) {
            this.setColspan(rowIndex, columnIndex, columnIndex);
          }
          // this.setColspan(data,key,rowIndex, columnIndex, columnIndex);
        }
        if (rowIndex > 0) {
          if (typeof this.rowspanKey[key] != "undefined") {
            this.setRowspan(data, key, rowIndex, rowIndex, columnIndex, 1);
          }
        }
      }
    },
    /*
     * @功能描述: 导出数据
     * @作者: 康如涛
     * @Date: 2019-11-21
     */
    handleExport() {
      let param = {
        orgId: this.listQuery.orgid,
        issue: this.listQuery.issue
      };
      exportAllJmtsFile(param);
    },
    /*
     * @功能描述: 自动合并表格单元格
     * @param {Object} row  当前行数据项
     * @param {Object} column  当前列数据项
     * @param {Number} rowIndex  当前数据所在行索引
     * @param {Number} columnIndex  当前数据所在列索引
     * @作者: 康如涛
     * @Date: 2019-11-21
     */
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      return {
        rowspan: this.tableRowSpan[rowIndex][columnIndex].rowspan,
        colspan: this.tableRowSpan[rowIndex][columnIndex].colspan
      };
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
</style>



