<!--
 * @功能描述: 
 * @版本: 
 * @作者: frj
 * @Date: 2019-11-27 09:56:30
 * @最新修改内容: 
 * @LastEditTime : 2020-01-06 15:55:24
 -->
<template>
  <div class="app-container calendar-list-container" style="margin:0 10px;">
    <!-- 通用表格组件 start -->
    <div class="table-con">
      <h2
        v-if="this.getModelCode == 'DirectTradingOfPowerPlants'"
        style="text-align:center"
      >直接交易情况统计表</h2>
      <h2 v-else style="text-align:center">{{this.orgName}}{{this.issue}}直接交易情况统计表</h2>
      <div class="txt-right">单位：{{unitMap.electricityUnit}}、{{unitMap.priceUnit}}</div>
      <custom-tableJylj
        ref="customTable"
        :dataKeys="dataKeys"
        :resultTableData="resultTableData"
        :colWidth="150"
        :rowspanKey="rowspanKey"
        :colspanKey="colspanKey"
      />
    </div>
    <!-- 通用表格组件 end -->
    <!-- </div> -->
  </div>
</template>

<script>
import { layoutInfo } from "@common/utils/init";
import { getHomeUnit } from "@common/api/dashboard/index";
import {getUnitMapByModelCode, parseTime, getUnitMap } from "@common/utils/index";
import { mapGetters } from "vuex";
import Cookies from "js-cookie";
const CustomTableJylj = () =>
  import("@common/hnReport/components/CustomTableJylj");
//引用区域和区域公司组件路径
import OrgSelects from "@common/components//orgSelectSellElectricity";
export default {
  name: "basicLedgerOfPowerPlant",
  components: {
    CustomTableJylj,
    OrgSelects
  },
  props: {
    temporaryTable: { type: Array },
    issueN: { type: String },
    orgIdN: { type: String },
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
        notice_type2: { value: "all", state: false, rowIndex: "0,1" },
        notice_type3: { value: "合计", state: true }
      },
      colspanKey: { notice_type2: "merge", notice_type3: "merge" },
      tableHeader: [],
      resultTableData: { tableHeader: [], result: [] },
      dataKeys: {
        notice_type1: "",
        notice_type2: "",
        notice_type3: "",
        market_fd_jyzgm_electricity: "",
        market_fd_sccjdl_electricity: "",
        market_fd_gskcygm_electricity: "",
        market_fd_scpjdj_price: "",
        market_fd_scjf_price: "",
        company_deal_electricity: "",
        company_electricity_dlfe_percent: "",
        company_deal_price: "",
        company_electricity_jf_price: "",
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
    if (this.getModelCode != "DirectTradingOfPowerPlants") {
      this.unitMap = getUnitMapByModelCode(
        this.allSubMenus,
        this.unitMap,
        "DirectTradingOfPowerPlants"
      );
    } else {
      this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
    }
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
      (this.rowspanKey = {}),
        (this.colspanKey = {}),
        (this.tableHeader = [
          { col_name: "省份", col_value: "type", fixed: "left" },
          {
            col_name: "市场情况",
            col_value: "",
            fixed: false,
            cols: [
              { col_name: "已成交规模", col_value: "number1", fixed: false },
              {
                col_name: "公司可交易规模",
                col_value: "number2",
                fixed: false
              },
              {
                col_name: "可参与装机",
                col_value: "number3",
                fixed: false
              },
              { col_name: "平均电价", col_value: "number4", fixed: false },
              { col_name: "可参与装机", col_value: "number5", fixed: false },
              { col_name: "市场平均电价", col_value: "number6", fixed: false },
              {
                col_name: "市场平降价均电价",
                col_value: "number7",
                fixed: false
              },
              {
                col_name: "2018年公司可交易规模",
                col_value: "number8",
                fixed: false
              },
              {
                col_name: "同比",
                col_value: "number8",
                fixed: false
              }
            ]
          },
          {
            col_name: "公司情况",
            col_value: "",
            fixed: false,
            cols: [
              { col_name: "参与装机", col_value: "number1", fixed: false },
              { col_name: "公司电量", col_value: "number2", fixed: false },
              {
                col_name: "电量占比",
                col_value: "number3",
                fixed: false
              },
              { col_name: "容量份额", col_value: "number4", fixed: false },

              { col_name: "较容量份额", col_value: "number5", fixed: false },
              { col_name: "电价", col_value: "number6", fixed: false },
              {
                col_name: "降价",
                col_value: "number7",
                fixed: false
              },
              {
                col_name: "降幅较市场",
                col_value: "number8",
                fixed: false
              },
              {
                col_name: "电价较市场平均",
                col_value: "number8",
                fixed: false
              },
              {
                col_name: "2018年电量",
                col_value: "number8",
                fixed: false
              },
              {
                col_name: "同比",
                col_value: "number8",
                fixed: false
              }
            ]
          }
        ]);
      // this.tableData.forEach((item, index) => {
      //   this.tableData[index] = this.setReportData(item, index);
      // });
      this.resultTableData["result"] = this.tableData;
      this.resultTableData["tableHeader"] = this.tableHeader;
      // this.setViewsList();
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
        { col_name: "", col_value: "notice_type3", fixed: "left" },
        {
          col_name: "市场情况",
          col_value: "",
          fixed: false,
          cols: [
            {
              col_name: "市场总规模",
              col_value: "market_fd_jyzgm_electricity",
              fixed: false
            },
            {
              col_name: "市场成交规模",
              col_value: "market_fd_sccjdl_electricity",
              fixed: false
            },
            {
              col_name: "公司可参与规模",
              col_value: "market_fd_gskcygm_electricity",
              fixed: false
            },
            {
              col_name: "平均电价",
              col_value: "market_fd_scpjdj_price",
              fixed: false
            },
            {
              col_name: "平均降幅",
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
              col_name: "电量",
              col_value: "company_deal_electricity",
              fixed: false
            },
            {
              col_name: "电量份额",
              col_value: "company_electricity_dlfe_percent",
              fixed: false
            },
            {
              col_name: "电价",
              col_value: "company_deal_price",
              fixed: false
            },
            {
              col_name: "降幅",
              col_value: "company_electricity_jf_price",
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
      // this.tableData.push({
      //   type: "合计",
      //   businessName: "",
      //   data: ""
      // });
      // this.tableData.push({
      //   type: "直接交易",
      //   businessName: "协商合计",
      //   data: ""
      // });
      // this.tableData.push({
      //   type: "直接交易",
      //   businessName: "协商直签大用户",
      //   data: ""
      // });
      // this.tableData.push({
      //   type: "直接交易",
      //   businessName: "与售电公司协商对接",
      //   data: "内部协同合计"
      // });
      // this.tableData.push({
      //   type: "直接交易",
      //   businessName: "与售电公司协商对接",
      //   data: "山西能销"
      // });
      // this.tableData.push({
      //   type: "直接交易",
      //   businessName: "",
      //   data: ""
      // });
      // this.tableData.push({
      //   type: "直接交易",
      //   businessName: "",
      //   data: ""
      // });
      // this.tableData.push({
      //   type: "直接交易",
      //   businessName: "",
      //   data: ""
      // });
      // this.tableData.push({
      //   type: "直接交易",
      //   businessName: "",
      //   data: ""
      // });
      // this.tableData.push({
      //   type: "直接交易",
      //   businessName: "",
      //   data: ""
      // });
      // this.tableData.push({
      //   type: "直接交易",
      //   businessName: "",
      //   data: ""
      // });
      // this.tableData.push({
      //   type: "直接交易",
      //   businessName: "",
      //   data: ""
      // });
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
    // setReportData(data, rowIndex) {
    //   let item = data;
    //   for (let i = 1; i < 19; i++) {
    //     item["number" + i] = "1068.74";
    //   }
    //   return item;
    // },
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

      if (typeof this.rowspanKey[key].rowIndex == "undefined") {
        if (
          (this.rowspanKey[key].state &&
            (this.rowspanKey[key]["value"] == "all" ||
              this.rowspanKey[key]["value"] == data[key])) ||
          (!this.rowspanKey[key].state &&
            this.rowspanKey[key]["value"] != data[key])
        ) {
          isMerge = true;
        }
      } else {
        let rowIndexs = this.rowspanKey[key].rowIndex;
        let rowIndexArr = rowIndexs.split(",");
        rowIndexArr.forEach(item => {
          if (
            ((this.rowspanKey[key].state &&
              (this.rowspanKey[key]["value"] == "all" ||
                this.rowspanKey[key]["value"] == data[key])) ||
              (!this.rowspanKey[key].state &&
                this.rowspanKey[key]["value"] != data[key])) &&
            item == nowRowIndex
          ) {
            isMerge = true;
          }
        });
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

<style rel="stylesheet/scss" lang="scss" scoped>
</style>