<!--
 * @功能描述: 售电合同-固定降价（电压等级）合同组件
 * @版本:
 * @作者: 滕超
 * @Date: 2019-11-19 13:12:25
 * @最新修改内容:
 * @LastEditTime : 2020-01-16 16:58:13
 -->
<template>
  <div>
    <div class="txt-right">单位：{{unitMap.priceUnit}},{{unitMap.electricityUnit}}</div>
    <el-table
      :data="tableData"
      :summary-method="getSummaries"
      show-summary
      style="width: 100%"
      height="400px"
    >
      <el-table-column
        v-for="(item,index) in tableHead"
        :prop="item.prop"
        :label="item.label"
        :key="index"
        align="center"
        width="180"
      >
        <template slot-scope="scope">
          <!-- #2912 求和计算 wangc 20191206 -->
          <el-input
            v-if="index==0"
            @input="sum(scope.row,scope.$index)"
            :disabled="true"
            v-model="scope.row[item.prop]"
          ></el-input>
          <el-input
            type="number"
            v-else
            :disabled="checkState"
            @input="sum(scope.row,scope.$index)"
            v-model="scope.row[item.prop]"
          ></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "gdjjdydj",
  props: {
    htContract: {
      type: Object
    },
    gdjjdydjTableData: {
      type: Array
    },
    unitMap: {
      type: Object
    },
    tableHeadData: {
      type: Array
    },
    checkState: {
      type: Boolean
    }
  },
  data() {
    return {
      tableHead: [],
      newTableHeadData: this.tableHeadData,
      tableData: [],
      sums: ""
    };
  },
  watch: {
    // 表格数据变化
    gdjjdydjTableData: {
      handler(val) {
        this.tableData = val;
      },
      immediate: true
    },
    //单位数据
    unitMap: {
      handler(val) {
        this.unitMap = val;
      },
      immediate: true
    },
    //输入框状态
    checkState: {
      handler(val) {
        this.checkState = val;
      },
      immediate: true
    },
    tableHeadData(val) {
      this.newTableHeadData = val;
      this.initTableHead();
    }
  },
  created() {},
  computed: {
    ...mapGetters(["elements"])
  },
  methods: {
    //#2912 初始化用电计划数据 wangc 20191210
    initInt(data) {
      // console.log(data, this.tableHead, 110);
      //#3668 初始化用电计划数据时赋值为0 frj 2020-1-16 16:58:10
      // if (data.length < this.tableHead.length - 1) {
      if (data.length > 0) {
        data.forEach(element => {
          this.tableHead.forEach(element1 => {
            if (typeof element[element1.prop] == "undefined") {
              this.$set(element, element1.prop, 0);
            }
          });
        });
      }
    },
    // #2912 求和计算方法 wangc 20191206
    sum(row, index) {
      let sums = 0;
      //#2912 初始化用电计划数据 wangc 20191210
      if (
        this.tableData[index].amount == "" ||
        typeof this.tableData[index].amount == "undefined" ||
        this.tableData[index].amount == "NaN"
      ) {
        this.tableData[index].amount = 0;
      }
      this.tableHead.forEach((element, index1) => {
        if (index1 != 0 && index1 != this.tableHead.length - 1) {
          sums += Number(this.tableData[index][element.prop]);
        }
      });
      // 合同管理--合同台账管理--优化20191209 wangc  #2912 保留6位小数
      this.tableData[index].amount = sums.toFixed(6);
    },
    initTableHead() {
      this.tableHead = [
        { prop: "month", label: "" }
        // ,
        // { prop: "year_decompose_price", label: "年度双边分解电价" }
      ];
      //初始化表头数据
      // let arr = [
      //   { label: "10kV", prop: "vl01" },
      //   { label: "100kV", prop: "vl02" }
      // ];
      this.newTableHeadData.forEach(item => {
        this.tableHead.push({ prop: item.propCode, label: item.propName });
      });
      this.tableHead.push({ prop: "amount", label: "合计" });
    },
    //列表总计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计:";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          if (column.property == "year_decompose_price") {
            //年度双边分解电价求平均
            let sumss = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            // 20191209 wangc  #2912 保留6位小数
            sums[index] = (sumss / values.length).toFixed(6);
          } else {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            // 20191209 wangc  #2912 保留6位小数
            sums[index] = sums[index].toFixed(6);
          }
        }
      });
      // #2912 求和计算判断 wangc 20191206
      this.sums = sums;
      return sums;
    }
  }
};
</script>

<style scoped>
</style>
