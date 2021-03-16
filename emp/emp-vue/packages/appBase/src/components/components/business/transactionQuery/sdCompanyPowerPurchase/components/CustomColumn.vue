<!--
 * @功能描述: 
 * @版本: 
 * @作者: 康如涛
 * @Date: 2019-11-22 14:10:02
 * @最新修改内容: 
 * @LastEditTime: 2019-12-11 16:14:05
 -->
<template>
  <el-table-column
    :width="colWidthData"
    :fixed="colData.fixed"
    v-if="typeof colData.cols=='undefined'"
    :label="colData.col_name"
    :render-header="renderheader"
    align="center"
  >
    <template slot-scope="scope">
      <span :title="scope.row[colData.col_value]" :class="scope.row[colData.col_value]|setNegativeColor">{{scope.row[colData.col_value]}}</span>
    </template>
  </el-table-column>
  <el-table-column
    v-else
    :label="colData.col_name"
    :render-header="renderheader"
    width="120"
    align="center"
  >
    <template v-if="typeof colData.cols!='undefined'">
      <CustomColumn
        v-for="(item, index) in colData.cols"
        :key="index"
        :col="item"
        :colWidth="colWidthData"
      ></CustomColumn>
    </template>
  </el-table-column>
</template>

<script>
import filter from '@common/utils/filter' 
export default {
  name: "CustomColumn", //MyColumn MyTable
  props: {
    col: {
      type: Object
    },
    colWidth: {
      type: Number
    }
  },
  data() {
    return {
      colData: this.col,
      colWidthData: 150
    };
  },
  watch: {
    col: {
      deep: true,
      handler: function(newVal, oldVal) {
        this.colData = newVal;        
      }
    }
  },
  created() {},
  computed: {},
  methods: {
    //页面初始化
    init() {},
    // 表头换行
    renderheader(h, { column, $index }) {
      let arr = column.label.split("");
      let one = "";
      let two = "";
      if (column.children == undefined) {
        if (arr.length > 9) {
          for (let index = 0; index < 9; index++) {
            one = one + arr[index];
          }
          for (let index = 9; index < arr.length; index++) {
            two = two + arr[index];
          }
        } else {
          one = column.label;
        }
      } else {
        one = column.label;
      }

      return h("span", {}, [h("span", {}, one), h("br"), h("span", {}, two)]);
    }
  }
};
</script>
<style scoped>

</style>
