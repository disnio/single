<!--
 * @功能描述: 
 * @版本: 
 * @作者: frj
 * @Date: 2019-11-27 09:56:30
 * @最新修改内容: 
 * @LastEditTime : 2020-01-06 15:05:53
 -->
<template>
  <div style="margin:0 10px;">
    <!-- 通用表格组件 start -->
    <div class="table-con">
      <h2 v-if="this.getModelCode == 'TheCumulativeSigning'" style="text-align:center">能销公司月度签约累计情况</h2>
      <h2 v-else style="text-align:center">{{this.orgName}}{{this.issue}}能销公司年度签约累计情况</h2>
      <div class="txt-right">单位：{{unitMap.electricityUnit}}、{{unitMap.priceUnit}}</div>
      <custom-tableLjqy
        ref="customTable"
        :dataKeys="dataKeys"
        :resultTableData="resultTableData"
        :colWidth="150"
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
const CustomTableLjqy = () =>
  import("@common/hnReport/components/CustomTableLjqy");
export default {
  name: "basicLedgerOfPowerPlant",
  components: {
    CustomTableLjqy
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
        descrip1: { value: "all", state: true },
        market_sale_electricity: { value: "all", state: false, rowIndex: "0" }
      },
      colspanKey: { descrip2: "merge" },
      tableHeader: [],
      resultTableData: { tableHeader: [], result: [] },
      dataKeys: {
        descrip1: "",
        descrip2: "",
        market_sale_electricity: "",
        generate_buy_electricity: "",
        market_sale_price: "",
        market_sale_down_price: "",
        sale_electricity: "",
        sale_price: "",
        decline_price: "",
        rank: "",
        agency_sale_price: "",
        remark: ""
      },
      newTableData: []
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
    if (this.getModelCode != "TheCumulativeSigning") {
      this.unitMap = getUnitMapByModelCode(
        this.allSubMenus,
        this.unitMap,
        "TheCumulativeSigning"
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
      this.rowspanKey = {};
      this.colspanKey = {};
      this.tableHeader = [];
      this.tableData.forEach((item, index) => {
        this.tableData[index] = this.setReportData(item, index);
      });
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
        { col_name: "", col_value: "descrip1", fixed: "left" },
        { col_name: "", col_value: "descrip2", fixed: "left" },
        {
          col_name: "市场情况",
          col_value: "",
          fixed: false,
          cols: [
            {
              col_name: "全省售电签约量",
              col_value: "market_sale_electricity",
              fixed: false
            },
            {
              col_name: "发电背景售电签约量",
              col_value: "generate_buy_electricity",
              fixed: false
            },
            {
              col_name: "售电签约价",
              col_value: "market_sale_price",
              fixed: false
            },
            {
              col_name: "售电降幅",
              col_value: "market_sale_down_price",
              fixed: false
            }
          ]
        },
        {
          col_name: "公司情况",
          col_value: "",
          fixed: false,
          cols: [
            { col_name: "签约量", col_value: "sale_electricity", fixed: false },
            { col_name: "售电签约价", col_value: "sale_price", fixed: false },
            { col_name: "售电降幅", col_value: "decline_price", fixed: false },
            {
              col_name: "电量在五大售电公司中排名",
              col_value: "rank",
              fixed: false
            },
            {
              col_name: "签约度电代理费",
              col_value: "agency_sale_price",
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
      // this.newTableData = [];
      // if (this.tableData.length > 0) {
      //   this.tableData.forEach((item, index) => {
      //     if (index < 1) {
      //       this.setTableData("总计", "merge", item);
      //       this.setTableData("自主开拓合计", "merge", item);
      //       this.setTableData("区域能销公司", "小计", item);
      //       this.setTableData("区域能销公司", "自主开拓用户", item);
      //       this.setTableData("区域能销公司", "二级代理协助签约", item);
      //       this.setTableData("区域能销公司", "来自发电背景售电", item);
      //       this.setTableData("区域能销公司", "来自独立售电", item);
      //     } else {
      //        this.setTableData(item.org_name, "merge", item);
      //     }
      //   });
      // }
      this.resultTableData["result"] = this.tableData;
      this.resultTableData["tableHeader"] = this.tableHeader;
      this.resultTableData["rowspanKey"] = this.rowspanKey;
      this.resultTableData["colspanKey"] = this.colspanKey;
      // this.setViewsList();
    },
    setTableData(notice_type1, notice_type2, item) {
      this.newTableData.push({
        notice_type1: notice_type1,
        notice_type2: notice_type2,
        market_sale_electricity: item.market_sale_electricity,
        generate_buy_electricity: item.generate_buy_electricity,
        sum_sale_price: item.sum_sale_price,
        sum_decline_price: item.sum_decline_price,
        sale_electricity: item.sale_electricity,
        sale_price: item.sale_price,
        decline_price: item.decline_price,
        number7: item.generate_buy_electricity,
        agency_price: item.agency_price,
        remark: ""
      });
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

<style rel="stylesheet/scss" lang="scss">
</style>