<!--
 * @功能描述: 
 * @版本: 
 * @作者: frj
 * @Date: 2020-03-05 14:51:42
 * @最新修改内容: 
 * @LastEditTime: 2020-03-09 15:03:34
 -->
<template>
  <div class="app-container calendar-list-container" style="margin:0 10px;">
    <!-- 通用表格组件 start -->
    <div class="table-con">
      <!-- <h2 style="text-align:center">年度交易累计</h2> -->
      <!-- <h2 v-else style="text-align:center">{{this.orgName}}{{this.issue}}年度交易累计</h2>
      <div class="txt-right">单位：{{unitMap.electricityUnit}}、{{unitMap.priceUnit}}</div>-->
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
import { getUnitMapByModelCode, parseTime, getUnitMap } from "@common/utils/index";
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
    temporaryTable: { type: Array }
    // issueN: { type: String },
    // orgIdN: { type: String },
    // orgNameN: { type: String }
  },
  data() {
    //   issue: this.issueN,
    //   orgId: this.orgIdN,
    //   orgName: this.orgNameN,
    return {
      getModelCode: "",
      unitMap: {}, //单位统一
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
        market_fd_gskcygm_electricity: ""
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
    }
    // issueN(val) {
    //   this.issue = val;
    // },
    // orgIdN(val) {
    //   this.orgId = val;
    // },
    // orgNameN(val) {
    //   this.orgName = val;
    // }
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
      this.rowspanKey = {};
      this.colspanKey = {};
      this.tableHeader = [];
      // this.tableData.forEach((item, index) => {
      //   this.tableData[index] = this.setReportData(item, index);
      // });
      this.resultTableData["result"] = this.tableData;
      this.resultTableData["tableHeader"] = this.tableHeader;

      // console.log(this.resultTableData);

      // this.setViewsList();
    },
    /*
     * @功能描述:  初始交易台账数据
     * @作者: 康如涛
     * @Date: 2019-11-21
     */
    initJyData() {
      this.tableHeader = [
        { col_name: "电厂名称", col_value: "notice_type1", fixed: "left" },
        { col_name: "期次", col_value: "notice_type2", fixed: "left" },
        { col_name: "厂用电率", col_value: "notice_type3", fixed: "left" },
        {
          col_name: "年度长协",
          col_value: "",
          fixed: false,
          cols: [
            {
              col_name: "发电量",
              col_value: "market_fd_jyzgm_electricity",
              fixed: false
            },
            {
              col_name: "上网电量",
              col_value: "market_fd_sccjdl_electricity",
              fixed: false
            },
            {
              col_name: "实际成交价格",
              col_value: "market_fd_gskcygm_electricity",
              fixed: false
            }
          ]
        }
      ];

      this.resultTableData["result"] = this.tableData;
      this.resultTableData["tableHeader"] = this.tableHeader;
      this.resultTableData["rowspanKey"] = this.rowspanKey;
      this.resultTableData["colspanKey"] = this.colspanKey;
      // console.log(JSON.stringify(this.resultTableData));
      // console.log(this.tableRowSpan, 389);

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