<!--
 * @功能描述: 
 * @版本: 
 * @作者: frj
 * @Date: 2019-11-25 20:13:08
 * @最新修改内容: 
 * @LastEditTime: 2020-05-15 14:38:45
 -->
<template>
  <div class="app-container calendar-list-container" style="margin:0 10px;">
    <div v-if="this.getModelCode=='basicLedgerOfPowerPlant'" class="filter-container">
      <el-form :inline="true" :model="listQuery">
        <el-row>
          <org-selects ref="orgSelects" @select="selectOrg" @initOrg="initOrg"></org-selects>
          <div style="padding-top:10px; display: inline-block;">
            <el-form-item label="时间">
              <el-date-picker
                style="width:160px"
                @change="changeBeginDate"
                v-model="listQuery.startDate"
                type="month"
                placeholder="开始日期"
              ></el-date-picker>
              <!-- <span>至</span>
              <el-date-picker
                style="width:160px"
                @change="changeEndDate"
                v-model="listQuery.endDate"
                type="date"
                placeholder="结束日期"
                
              ></el-date-picker>-->
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                :disabled="disaQuery"
                v-waves
                icon="el-icon-search"
                @click="handleFilter"
              >查询</el-button>
              <el-button
                v-if="basicLedgerOfPowerPlant_btn_export"
                type="primary"
                icon="el-icon-upload"
                @click="handleExport"
              >导出</el-button>
              <el-button
                :disabled="disaHand"
                type="primary"
                icon="el-icon-upload"
                @click="showExecuteMsg"
              >计算</el-button>
            </el-form-item>
          </div>
        </el-row>
      </el-form>
    </div>

    <!-- 通用表格组件 start -->
    <div class="table-con">
      <h2 v-if="this.getModelCode=='basicLedgerOfPowerPlant'" style="text-align:center">交易情况统计表</h2>
      <h2 v-else style="text-align:center">{{this.orgName}}{{this.issueN}}交易情况统计表</h2>
      <div
        class="txt-right"
      >单位：{{unitMap.capacityUnit}}、{{unitMap.electricityUnit}}、{{unitMap.priceUnit}}、%</div>
      <custom-table
        v-loading="loading"
        ref="customTable"
        :resultTableData="resultTableData"
        :dataKeys="dataKeys"
        :colWidth="150"
        :rowspanKey="rowspanKey"
        :colspanKey="colspanKey"
      />
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
  getTransactionBusinessReport,
  executeJob,
  jobStatus
} from "@common/api/business/transactionQuery/basicLedgerOfPowerPlant/index";
import { getHomeUnit } from "@common/api/dashboard/index";
import { getUnitMapByModelCode, getUnitMap, parseTime } from "@common/utils/index";
import { layoutInfo } from "@common/utils/init";
import { mapGetters } from "vuex";
import Cookies from "js-cookie";
//引用区域和区域公司组件路径
import OrgSelects from "@common/components//areaComSelectsList";
const CustomTable = () => import("@common/hnReport/components/CustomTable");
import {
  getPageProgress,
  setProgressState,
  initProgress,
  setProgressFinished,
  getRequesting
} from "@common/utils/waitingProgress";
import WaitingProgress from "@common/components/WaitingProgress";
export default {
  name: "basicLedgerOfPowerPlant",
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
      basicLedgerOfPowerPlant_btn_export: false, //导出默认权限
      loading: false,
      criteria: "", //点击计算后判断是否可以查询
      disaQuery: false,
      disaHand: false, //计算按钮
      jobId: "",
      listQuery: {
        orgId: "",
        startDate: ""
      },
      unitMap: {},
      //////////////////////////////////////////////
      newArr: [[]], //表头
      maxHeight: 1, //表头总共占的行数
      colKeyList: [], //所有的key
      reportData: [],
      tableData: [],
      scrollbarHeight: "",
      scrollbarWidth: "",
      tableRowSpan: [],
      rowspanKey: {
        trading_variety_name: { value: "all", state: true },
        notice_date: {
          value: "合计,月度合计，年度合计,按周期统计：年度合计",
          state: true
        }
      },
      colspanKey: { notice_date: "merge", notice_name: "merge" },
      tableHeader: [],
      newTableData: [],
      resultTableData: { tableHeader: [], result: [] },
      dataKeys: {
        trading_variety_name: "",
        notice_date: "",
        notice_name: "",
        unit_type_name: "",
        deal_electricity: "",
        deal_out_electricity: "",
        deal_cannot_trade_electricity: "",
        deal_can_trade_electricity: "",
        can_trade_capacity: "",
        avg_price: "",
        avg_decrease_price: "",
        participate_hn_capacity: "",
        gained_on_grid_electricity: "",
        gained_generate_electricity: "",
        deducted_electricity: "",
        electricity_percent: "",
        capacity_percent: "",
        share_diff_percent: "",
        deal_price: "",
        deal_decrement_price: "",
        decrement_degree_price: ""
      },
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
    // this.basicLedgerOfPowerPlant_btn_export = this.elements[
    //   "basicLedgerOfPowerPlant:btn_export"
    // ];
  },
  destroyed() {},
  mounted() {
    this.layout = this.layoutInfo;
    this.scrollbarHeight = this.layoutInfo.height;
    // this.handleFilter();
    if (this.getModelCode != "basicLedgerOfPowerPlant") {
      let param = {
        issue: this.issue,
        region_org_id: this.orgId,
        region_org_name: this.orgName
      };
      this.unitMap = getUnitMapByModelCode(
        this.allSubMenus,
        this.unitMap,
        "basicLedgerOfPowerPlant"
      );
      sessionStorage.setItem("pageModelCode", "basicLedgerOfPowerPlant");
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
      this.listQuery.orgId = data.region_org_id;
      this.listQuery.startDate = data.issue;
      this.getList();
    },
    //初始化页面期次信息
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
      this.listQuery.startDate = ym;
    },
    //设置查询条件中组织ID
    selectOrg(id) {
      this.listQuery.orgId = id;
    },
    //按组织初始化列表
    initOrg(id) {
      this.listQuery.orgId = id;
      this.getList();
    },
    //变更开始时间
    changeBeginDate(val) {
      if (val != "" && val != undefined) {
        this.listQuery.startDate = parseTime(val, "{y}-{m}");
      } else {
        this.listQuery.startDate = "";
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
    // 计算
    handClickExecute() {
      this.disaHand = true;
      this.disaQuery = false;
      let param = {
        job: "/mkt/rpt/mkt_rpt_gen_trading_base",
        issue: this.listQuery.startDate
      };
      executeJob(param).then(res => {
        this.jobId = res.data;
         this.progressInfo = initProgress(this.progressInfo);
        this.progressInfo["jobId"] = this.jobId;
        this.$refs.waitingProgress.initProgress();
      });
    },
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
          //   this.$notify({
          //     // title: "失败",
          //     message: "计算中，请稍后...",
          //     type: "warning",
          //     duration: 2000
          //   });
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
    /**
     * @方法名称: handleFilter
     * @功能描述: 查询
     * @参数:
     * @返回值:
     * @作者: frj
     * @issues:
     * @Date: 2019-11-28 17:26:30
     * @最新修改内容:
     * @LastEditTime:
     */
    handleFilter() {
      if (this.jobId == "") {
        this.getList();
      } else {
        this.getJobStatus();
      }
    },
    getList() {
      this.loading = true;
      let parma = {
        orgId: this.listQuery.orgId,
        issue: this.listQuery.startDate
      };
      getTransactionBusinessReport(parma).then(res => {
        if (res.rel) {
          this.newTableData = res.result;
          this.initJyData();
        } else {
          this.$notify({
            title: "失败",
            message: res.msg,
            type: "warning",
            duration: 2000
          });
          this.newTableData = [];
          this.initJyData();
        }
        this.initJyData();
        this.loading = false;
      });
    },
    /*
     * @功能描述:  初始交易台账数据
     * @作者: 康如涛
     * @Date: 2019-11-21
     */
    initJyData() {
      this.tableData = [];
      this.newTableData.forEach((item, index) => {
        // if (index < 6) {
        //   item.notice_date = "merge";
        //   item.notice_name = "merge";
        // }
        // if (
        //   item.totalType != "" &&
        //   (item.notice_date == "" || item.notice_date == undefined)
        // ) {
        //   item.notice_date = item.totalType;
        //   item.notice_name = "merge";
        // }
        this.tableData.push(item);
      });
      this.tableHeader = [
        {
          col_name: "类型",
          col_value: "trading_variety_name",
          fixed: "left"
        },
        { col_name: "交易日期", col_value: "notice_date", fixed: "left" },
        {
          col_name: "交易名称",
          col_value: "notice_name",
          fixed: "left"
        },
        { col_name: "机组类型", col_value: "unit_type_name", fixed: "left" },
        {
          col_name: "市场情况",
          col_value: "",
          fixed: false,
          cols: [
            {
              col_name: "市场成交电量",
              col_value: "deal_electricity",
              fixed: false
            },
            {
              col_name: "其中1:外来电",
              col_value: "deal_out_electricity",
              fixed: false
            },
            {
              col_name: "其中2：省内公司无法参与交易",
              col_value: "deal_cannot_trade_electricity",
              fixed: false
            },
            {
              col_name: "公司可参与交易情况",
              col_value: "",
              fixed: false,
              cols: [
                {
                  col_name: "其中3:公司可参与交易",
                  col_value: "deal_can_trade_electricity",
                  fixed: false
                },
                {
                  col_name: "可参与装机",
                  col_value: "can_trade_capacity",
                  fixed: false
                },
                {
                  col_name: "市场平均电价",
                  col_value: "avg_price",
                  fixed: false
                },
                {
                  col_name: "市场平均降幅",
                  col_value: "avg_decrease_price",
                  fixed: false
                }
              ]
            }
          ]
        },
        {
          col_name: "公司情况",
          col_value: "",
          fixed: false,
          cols: [
            {
              col_name: "电量",
              col_value: "",
              fixed: false,
              cols: [
                {
                  col_value: "participate_hn_capacity",
                  col_name: "参与装机",
                  fixed: false
                },
                {
                  col_value: "gained_on_grid_electricity",
                  col_name: "获得电量",
                  fixed: false
                },
                {
                  col_value: "gained_generate_electricity",
                  col_name: "获得发电量",
                  fixed: false
                },
                {
                  col_value: "deducted_electricity",
                  col_name: "扣减基数电量",
                  fixed: false
                },
                {
                  col_value: "electricity_percent",
                  col_name: "电量份额",
                  fixed: false
                },
                {
                  col_value: "capacity_percent",
                  col_name: "容量份额",
                  fixed: false
                },
                {
                  col_value: "share_diff_percent",
                  col_name: "电量份额-容量份额",
                  fixed: false
                }
              ]
            },
            {
              col_name: "电价",
              col_value: "",
              fixed: false,
              cols: [
                {
                  col_value: "deal_price",
                  col_name: "电价",
                  fixed: false
                },
                {
                  col_value: "deal_decrement_price",
                  col_name: "降价幅度",
                  fixed: false
                },
                {
                  col_value: "decrement_degree_price",
                  col_name: "降幅较市场",
                  fixed: false
                }
              ]
            }
          ]
        }
      ];

      // this.tableData.forEach((item, index) => {
      //   this.tableData[index] = this.setReportData(item, index);
      // });
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
      for (let i = 1; i < 19; i++) {
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
      // console.log(9);
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

<style  scoped>

/* 20200212 阿彪 #3736 解决滚动轴无法拖动问题 */
  .bigdata-table >>> .el-table__fixed {
      height:auto !important; 
      bottom:17px; 
    }
</style>