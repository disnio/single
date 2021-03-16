<!--
 * @功能描述: 
 * @版本: 
 * @作者: frj
 * @Date: 2019-11-26 13:40:31
 * @最新修改内容: 
 * @LastEditTime : 2020-01-07 10:28:45
 -->
<template>
  <div style="margin:0 10px;">
    <!-- 通用表格组件 start -->
    <div class="table-con">
      <h2
        v-if="this.getModelCode == 'powerPurchaseCumulative'"
        style="text-align:center"
      >能销公司月度购电累计情况</h2>
      <h2 v-else style="text-align:center">{{this.orgName}}{{this.issue}}能销公司月度购电累计情况</h2>
      <div class="txt-right">单位：{{unitMap.electricityUnit}}、{{unitMap.priceUnit}}</div>
      <custom-tableGdlj
        :dataKeys="dataKeys"
        ref="customTable"
        :resultTableData="resultTableData"
        :rowspanKey="rowspanKey"
        :colspanKey="colspanKey"
      />
    </div>
    <!-- 通用表格组件 end -->
  </div>
</template>

<script>
import {getUnitMapByModelCode, parseTime, getUnitMap } from "@common/utils/index";
import { layoutInfo } from "@common/utils/init";
import { mapGetters } from "vuex";
import Cookies from "js-cookie";
const CustomTableGdlj = () =>
  import("@common/hnReport/components/CustomTableGdlj");
export default {
  name: "MonthlyPurchasing",
  components: {
    CustomTableGdlj
  },
  props: {
    temporaryTable: { type: Array },
    issueN: { type: String },
    orgIdN: { type: Number },
    orgNameN: { type: String }
  },
  data() {
    return {
      issue: this.issueN,
      orgId: this.orgIdN,
      orgName: this.orgNameN,
      getModelCode: "",
      unitMap: {},
      newArr: [[]], //表头
      maxHeight: 1, //表头总共占的行数
      colKeyList: [], //所有的key
      reportData: [],
      tableData: this.temporaryTable,
      scrollbarHeight: "",
      scrollbarWidth: "",
      tableRowSpan: [],
      rowspanKey: {
        notice_type1: { value: "all", state: true },
        notice_type2: {
          value: "all",
          state: true
        }
      },
      colspanKey: { notice_type2: "merge" },
      tableHeader: [],
      resultTableData: { tableHeader: [], result: [] },
      dataKeys: {
        notice_type1: "",
        notice_type2: "",
        market_fd_sccjdl_electricity: "",
        market_fd_scpjdj_price: "",
        market_fd_scjf_price: "",
        company_deal_electricity: "",
        company_market_percent: "",
        company_absolute_price: "",
        company_decline_price: "",
        company_market_decline_price: "",
        remark: ""
      }
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
    temporaryTable(val) {
      this.tableData = [];
      this.tableData = val;
      this.initJyData();
    },
    issueN(val) {
      this.issue = val;
    },
    orgIdN(val) {
      this.orgId = val;
    },
    orgNameN(val) {
      this.orgName = val;
    }
  },
  created() {
    this.getModelCode = sessionStorage.getItem("modelCode");
    if (this.getModelCode != "powerPurchaseCumulative") {
      this.unitMap = getUnitMapByModelCode(
        this.allSubMenus,
        this.unitMap,
        "powerPurchaseCumulative"
      );
    } else {
      this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
    }
    this.tableData = [];
  },
  destroyed() {},
  mounted() {
    this.layout = this.layoutInfo;
    this.scrollbarHeight = this.layoutInfo.height;
    this.initJyData();
  },
  methods: {    
    /*
     * @功能描述: 初始化数据
     * @作者: 康如涛
     * @Date: 2019-11-21
     */
    initData() {
      this.rowspanKey = {};
      this.colspanKey = {};
      this.tableHeader = [];
      // this.tableData.forEach((item, index) => {
      //   this.tableData[index] = this.setReportData(item, index);
      // });
      this.resultTableData["result"] = this.tableData;
      this.resultTableData["tableHeader"] = this.tableHeader;
    },
    /*
     * @功能描述:  初始交易台账数据
     * @作者: 康如涛
     * @Date: 2019-11-21
     */
    initJyData() {
      this.tableHeader = [
        { col_name: "", col_value: "notice_type1", fixed: "left" },
        { col_name: "", col_value: "notice_type2", fixed: "left" },
        {
          col_name: "市场情况",
          col_value: "",
          fixed: false,
          cols: [
            {
              col_name: "购电量",
              col_value: "market_fd_sccjdl_electricity",
              fixed: false
            },
            {
              col_name: "购电价",
              col_value: "market_fd_scpjdj_price",
              fixed: false
            },
            {
              col_name: "购电降幅",
              col_value: "market_fd_scjf_price",
              fixed: false
            }
          ]
        },
        {
          col_name: "公司情况",
          col_value: "",
          fixed: false,
          cols: [
            {
              col_name: "购电量",
              col_value: "company_deal_electricity",
              fixed: false
            },
            {
              col_name: "占比",
              col_value: "company_market_percent",
              fixed: false
            },
            {
              col_name: "购电价",
              col_value: "company_absolute_price",
              fixed: false
            },
            {
              col_name: "购电降幅",
              col_value: "company_decline_price",
              fixed: false
            },
            {
              col_name: "降幅较市场",
              col_value: "company_market_decline_price",
              fixed: false
            }
          ]
        },
        {
          col_name: "备注",
          col_value: "remark",
          fixed: false
        }
      ];
      // this.tableData.forEach((item, index) => {
      //   this.tableData[index] = this.setReportData(item, index);
      // });
      this.resultTableData["result"] = this.tableData;
      this.resultTableData["tableHeader"] = this.tableHeader;
      this.resultTableData["rowspanKey"] = this.rowspanKey;
      this.resultTableData["colspanKey"] = this.colspanKey;
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