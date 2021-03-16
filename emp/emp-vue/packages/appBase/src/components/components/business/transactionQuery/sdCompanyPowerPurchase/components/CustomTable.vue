<!--
 * @功能描述: 
 * @版本: 
 * @作者: 康如涛
 * @Date: 2019-08-27 13:48:57
 * @最新修改内容: 
 * @LastEditTime: 2020-02-27 18:07:43
 -->
<template>
  <div class="bigdata-table">
    <!-- <ElBigdataTable
      highlight-current-row
      ref="singleTable"
      :data="tableData"
      :height="640"
      :row-height="32"
      :span-method="objectSpanMethod"
      style="width: 100%"
    >-->
    <el-table :data="tableData" :height="dialogHeight+60" :span-method="objectSpanMethod">
      <custom-column
        style="align:center"
        v-for="(item,index) in tableHeader"
        :key="index"
        :col="item"
        :colWidth="colWidthData"
      ></custom-column>
    </el-table>
    <!-- </ElBigdataTable> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { parseTime, tableHeight } from "@common/utils/index";
import { initLayoutInfo } from "@common/utils/init";
const CustomColumn = () => import("./CustomColumn");
export default {
  name: "CustomTable",
  components: {
    CustomColumn
  },
  props: {
    resultTableData: { type: Object },
    rowspanKey: { type: Object },
    colspanKey: { type: Object },
    colWidth: {
      type: Number
    },
    tableHeight: {
      type: Number
    },
    dataKeys: {
      type: Object
    }
  },
  data() {
    return {
      dialogHeight: 0,
      tabHeight: 300,
      loadingData: false,
      tableData: this.resultTableData.result,
      tableHeader: this.resultTableData.tableHeader,
      colWidthData: this.colWidth,
      tableRowSpan: []
    };
  },
  watch: {
    tableHeader: [],
    resultTableData: {
      deep: true,
      handler: function(newVal, oldVal) {
        this.tableData = newVal.result;
        this.tableHeader = this.resultTableData.tableHeader;
        this.setViewsList();
      }
    },

    colWidth(val) {
      this.colWidthData = val;
    }
  },
  created() {
    this.dialogHeight = tableHeight();
    window.onresize = function temp() {
      this.dialogHeight = tableHeight(); //获取弹框高度(监控高度变化)
    };
  },
  mounted() {
    this.setViewsList();
  },
  computed: {},
  methods: {
    setViewsList() {
      /*
       * @功能描述: 设置表格数据
       * @作者: 康如涛
       * @Date: 2019-11-21
       */
      let listData = this.tableData;
      this.tableRowSpan = [];
      listData.forEach((item, index) => {
        // console.log(item, 1111);
        this.tableRowSpan.push([]);
        this.setRowColspan(index, item);
      });
      // console.log(this.tableRowSpan,99999);
      
    },
    setRowspan(
      data,
      key,
      nowRowIndex,
      rowIndex,
      columnIndex,
      rowspan,
      keyArr,
      key2
    ) {
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
      // console.log(data,key,nowRowIndex,rowIndex,columnIndex,rowspan,keyArr,key2);
      
      let isMerge = false;
      let isIndex = false;
      //       if(typeof this.tableData[rowIndex - 1][key] !="undefined" ){
      //  console.log(this.tableData[rowIndex - 1][key] == data[key],rowIndex,key);
      //       }else{
      //         console.log(this.tableData[rowIndex - 1],rowIndex,key);
      //       }
      //  if(rowIndex==36){
      //    console.log(this.tableRowSpan);

      //  }
      if (typeof this.rowspanKey[key].state != "undefined") {
        // console.log(data[key], this.rowspanKey[key]["value"].indexOf(data[key]));
        if (typeof this.rowspanKey[key].rowIndex == "undefined") {
          if (
            (this.rowspanKey[key].state &&
              (this.rowspanKey[key]["value"] == "all" ||
                this.rowspanKey[key]["value"].indexOf(data[key]) > -1)) ||
            (!this.rowspanKey[key].state &&
              this.rowspanKey[key]["value"].indexOf(data[key]) < 0)
          ) {
            isMerge = true;
          }
        } else {
          let rowIndexs = this.rowspanKey[key].rowIndex;
          let rowIndexArr = rowIndexs.split(",");
          rowIndexArr.forEach(item => {
            if (item == rowIndex) {
              isIndex = true;
            }
          });
          // console.log(isIndex,nowRowIndex,99777777);

          if (
            (!isIndex && !this.rowspanKey[key].state) ||
            (isIndex && this.rowspanKey[key].state)
          ) {
            isMerge = true;
          }
        }
      }
      let isRow = true;
      // console.log(columnIndex - 1, rowIndex - 1);
      // console.log(columnIndex > 0 && rowIndex > 0);

      // if (columnIndex > 0 && rowIndex > 0) {
      //   if (
      //     this.tableData[rowIndex - 1][keyArr[columnIndex - 1]] !=
      //     this.tableData[rowIndex][keyArr[columnIndex - 1]]
      //   ) {
      //     isRow = false;
      //   }
      // }

      if (isMerge) {
        if (rowIndex > 0) {
          let isCheck = false;
          if (key2 != "") {
            if (
              this.tableData[rowIndex - 1][key2] == data[key2] &&
              this.tableData[rowIndex - 1][key] == data[key] &&
              isRow
            ) {
              isCheck = true;
            }
          } else {
            if (this.tableData[rowIndex - 1][key] == data[key] && isRow) {
              isCheck = true;
            }
          }
          if (isCheck) {
            this.setRowspan(
              data,
              key,
              nowRowIndex,
              rowIndex - 1,
              columnIndex,
              rowspan + 1,
              keyArr,
              key2
            );

            this.tableRowSpan[rowIndex][columnIndex]["rowspan"] = rowspan;
            this.tableRowSpan[nowRowIndex][columnIndex]["rowspan"] = 0;
            this.tableRowSpan[nowRowIndex][columnIndex][
              "colspan"
            ] = this.tableRowSpan[rowIndex][columnIndex]["colspan"];
          } else {
            // console.log(rowIndex,nowRowIndex,key);

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
      } else {
        if (typeof this.rowspanKey[key].rowIndex != "undefined") {
          if (rowIndex < nowRowIndex) {
            this.tableRowSpan[rowIndex + 1][columnIndex]["rowspan"] =
              rowspan - 1;
            this.tableRowSpan[nowRowIndex][columnIndex]["rowspan"] = 0;
            this.tableRowSpan[nowRowIndex][columnIndex][
              "colspan"
            ] = this.tableRowSpan[rowIndex + 1][columnIndex]["colspan"];
          }
        }
      }
    },
    setColspan(rowIndex, nowColumnIndex, columnIndex, key) {
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
      // if (key == "notice_date" || key == "notice_name") {
      //   console.log(this.colspanKey[key], key, 99999);
      // }

      // console.log(this.colspanKey[key], key, 99999);
      if (nowColumnIndex === columnIndex) {
        this.tableRowSpan[rowIndex][columnIndex] = { rowspan: 0, colspan: 0 };
      }
      if (this.tableRowSpan[rowIndex][columnIndex - 1]["colspan"] > 0) {
        this.tableRowSpan[rowIndex][columnIndex - 1]["colspan"] =
          this.tableRowSpan[rowIndex][columnIndex - 1]["colspan"] + 1;
      } else {
        this.setColspan(rowIndex, nowColumnIndex, columnIndex - 1);
      }
      console.log(rowIndex,nowColumnIndex);
      
    },
    /*
     * @功能描述: 重新设置单元格rowspan和colspan值
     * @param {Object} data  当前数据项
     * @param {Number} nowRowIndex  当前数据所在索引
     * @作者: 康如涛
     * @Date: 2019-11-21
     */
    setRowColspan(rowIndex, data) {
      // console.log(this.dataKeys, 280);

      let keyArr = [];
      for (let key in this.dataKeys) {
        keyArr.push(key);
        // console.log(data[key],key,typeof data[key]=="undefined",rowIndex);
        if (typeof data[key] == "undefined") {
          data[key] = "";
          this.tableData[rowIndex][key] = "";
        }
        let columnIndex = this.tableRowSpan[rowIndex].length;
        this.tableRowSpan[rowIndex][columnIndex] = {
          rowspan: 1,
          colspan: 1,
          data: data[key],
          key: key
        };
        if (columnIndex > 0) {
          if (this.colspanKey[key] == data[key]) {
            this.setColspan(rowIndex, columnIndex, columnIndex, key);
          }
          // this.setColspan(data,key,rowIndex, columnIndex, columnIndex);
        }
        if (rowIndex > 0) {
          if (typeof this.rowspanKey[key] != "undefined") {
            // console.log(this.tableData[rowIndex - 1][key],305);
            
            if (this.tableData[rowIndex - 1][key] == data[key]) {
              if (
                key=="sale_company_name"||
                key=="date"||
                key=="trading_name"||
                key=="market_trading_electricity"||
                key=="market_buy_electricity"||
                key=="market_sale_price"||
                key=="market_sale_down_price"||
                key=="market_buy_price"||
                key=="market_buy_down_price"||
                key=="market_buy_sale_price"||
                key=="market_sale_company_proportion_percent"||
                key=="market_proportion_price"||
                key=="market_proportion_sale_down_price"||
                key=="market_proportion_buy_sale_price"||
                key=="generate_buy_electricity"||
                key=="generate_proportion_percent"
              ) {
                if (
                  this.tableData[rowIndex - 1]["notice_id"] ===
                    data["notice_id"] &&
                  data["notice_id"] != " "
                ) {
                  this.setRowspan(
                    data,
                    key,
                    rowIndex,
                    rowIndex,
                    columnIndex,
                    1,
                    keyArr,
                    "notice_id"
                  );
                }
              }
              // else {
              //   this.setRowspan(
              //     data,
              //     key,
              //     rowIndex,
              //     rowIndex,
              //     columnIndex,
              //     1,
              //     keyArr,
              //     ""
              //   );
              // }
            }
          }
        }
      }
      // console.log(this.tableRowSpan, 245);
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
      // console.log(this.tableRowSpan[rowIndex][columnIndex],305);
      // console.log(this.tableRowSpan[rowIndex][columnIndex].rowspan,306);
      if (rowIndex > 33 && rowIndex < 36 && columnIndex < 3) {
      }
      return {
        rowspan: this.tableRowSpan[rowIndex][columnIndex].rowspan,
        colspan: this.tableRowSpan[rowIndex][columnIndex].colspan
      };
    }
  }
};
</script>
 
<style  scoped>
/* 20191231 阿彪 #3406 解决滚动轴无法拖动问题 */
.bigdata-table >>> .el-table__fixed {
  height: auto !important;
  bottom: 17px;
}
</style>