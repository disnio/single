<!--
 * @功能描述: 
 * @版本: 
 * @作者: 康如涛
 * @Date: 2019-08-27 13:48:57
 * @最新修改内容: 
 * @LastEditTime : 2020-01-14 10:08:02
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
    > -->
      <el-table :data="tableData"  style="width: 100%" :height="dialogHeight+140"   :span-method="objectSpanMethod" >
      <custom-column
      style="align:center"
        v-for="(item,index) in tableHeader"
        :key="index"
        :col="item"
      
      ></custom-column>
      </el-table>
    <!-- </ElBigdataTable> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { parseTime,tableHeight } from "@common/utils/index";
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
      dialogHeight:0,
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
        // console.log(7777777);
        
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
    // console.log(8888888);
    
    this.setViewsList()
  },
  computed: {},
  methods: {
    setViewsList() {
      /*
       * @功能描述: 设置表格数据
       * @作者: 康如涛
       * @Date: 2019-11-21
       */
        //  console.log(9999999);
      let listData = this.tableData;
     this.tableRowSpan=[];
      listData.forEach((item, index) => {
        this.tableRowSpan.push([]);
        this.setRowColspan(index, item);
      });
      // console.log(this.tableRowSpan);
      // console.log(this.tableData,666666);
      
    },
    setRowspan(data, key, nowRowIndex, rowIndex, columnIndex, rowspan, keyArr) {
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
      let isIndex = false;

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
          if (
            (!isIndex && !this.rowspanKey[key].state) ||
            (isIndex && this.rowspanKey[key].state)
          ) {
            isMerge = true;
          }
        }
      }
      let isRow = true;

      if (columnIndex > 0 && rowIndex > 0) {
        if (
          this.tableData[rowIndex - 1][keyArr[columnIndex - 1]] !=
          this.tableData[rowIndex][keyArr[columnIndex - 1]]
        ) {
          isRow = false;
        }
      }

      if (isMerge) {
        if (rowIndex > 0) {
          if(key==="total_use_electricity"){
            // console.log(this.tableData[rowIndex - 1][key] === data[key]);
            // console.log(this.tableData[rowIndex - 1][key] ,rowIndex);
            // console.log(data[key],rowIndex);
            // console.log(isRow);
          }

          if (this.tableData[rowIndex - 1][key] === data[key]) {
            this.setRowspan(
              data,
              key,
              nowRowIndex,
              rowIndex - 1,
              columnIndex,
              rowspan + 1,
              keyArr
            );
            //  this.tableRowSpan[rowIndex][columnIndex]["rowspan"] = rowspan;
            // this.tableRowSpan[nowRowIndex][columnIndex]["rowspan"] = 0;
            // this.tableRowSpan[nowRowIndex][columnIndex][
            //   "colspan"
            // ] = this.tableRowSpan[rowIndex][columnIndex]["colspan"];
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
    },
    /*
     * @功能描述: 重新设置单元格rowspan和colspan值
     * @param {Object} data  当前数据项
     * @param {Number} nowRowIndex  当前数据所在索引
     * @作者: 康如涛
     * @Date: 2019-11-21
     */
    setRowColspan(rowIndex, data) {
      // console.log(rowIndex,218);
      // console.log(data,219);
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
        // if (columnIndex > 0) {
        //   if (this.colspanKey[key] === data[key]) {
        //     this.setColspan(rowIndex, columnIndex, columnIndex, key);
        //   }
        //   // this.setColspan(data,key,rowIndex, columnIndex, columnIndex);
        // }
        if (rowIndex > 1) {
          if (typeof this.rowspanKey[key] != "undefined") {
            // console.log(this.tableData[rowIndex - 1][key] ,data[key],key,rowIndex,columnIndex,9999999999998);
            // //  console.log(typeof this.rowspanKey[key] != "undefined",key,22222222);
            // console.log(this.tableData[rowIndex - 1][key] === data[key],key);
            // console.log(keyArr[columnIndex - 1], rowIndex);
            // console.log(this.tableData[rowIndex - 1][keyArr[columnIndex - 1]]);
            // console.log(this.tableData[rowIndex][keyArr[columnIndex - 1]]);

            if (this.tableData[rowIndex - 1][key] === data[key]) {
              // console.log(this.tableData[rowIndex - 1][key],111111111111111111111);
              
              this.setRowspan(
                data,
                key,
                rowIndex,
                rowIndex,
                columnIndex,
                1,
                keyArr
              );
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
      //  console.log(this.tableRowSpan[rowIndex][columnIndex].rowspan,306);
    //  if(rowIndex<1){
    //   return {
    //           rowspan: 1,
    //           colspan: 1
    //         };
    //  }else{
    //      return {
    //           rowspan: this.tableRowSpan[rowIndex][columnIndex].rowspan,
    //           colspan: this.tableRowSpan[rowIndex][columnIndex].colspan
    //      };
    //  }   

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
      height:auto !important; 
      bottom:17px; 
    }
</style>