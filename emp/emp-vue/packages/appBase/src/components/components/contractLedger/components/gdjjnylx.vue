<!--
 * @功能描述: 售电合同-固定降价（能源类型）合同组件
 * @版本: 
 * @作者: 滕超
 * @Date: 2019-11-19 13:12:25
 * @最新修改内容: 
 * @LastEditTime: 2020-06-11 11:01:49
 -->
<template>
  <div>
    <span style="margin:2cm 1cm 2cm 1cm;">火电常规:</span>
    <div class="txt-right">单位：{{unitMap.electricityUnit}},{{unitMap.priceUnit}}</div>
    <el-table :data="tableData" :summary-method="getSummaries" show-summary style="width: 100%" height="400px">
      <el-table-column
        v-for="(item,index) in tableHead"
        :prop="item.prop"
        :label="item.label"
        :key="index"
        align="center"
        width="180"
      >
        <template slot-scope="scope">
          <el-input v-if="index==0" :disabled="true" v-model="scope.row[item.prop]"></el-input>
          <el-input v-else :disabled="checkState" v-model="scope.row[item.prop]"></el-input>
        </template>
      </el-table-column>
    </el-table>
   <span style="margin:2cm 1cm 2cm 1cm;">富余电量:</span>
    <div class="txt-right"> 单位：{{unitMap.electricityUnit}},{{unitMap.priceUnit}}</div>
    <el-table :data="tableData1" :summary-method="getSummaries1" show-summary style="width: 100%" height="400px">
      <el-table-column
        v-for="(item,index) in tableHead"
        :prop="item.prop"
        :label="item.label"
        :key="index"
        align="center"
        width="180"
      >
        <template slot-scope="scope">
          <el-input v-if="index==0" :disabled="true" v-model="scope.row[item.prop]"></el-input>
          <el-input v-else :disabled="checkState" v-model="scope.row[item.prop]"></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
  
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "gdjjnylx",
  props: {
    htContract: {
      type: Object
    },
    gdjjnylxTableData: {
      type: Array
    },
    gdjjnylxTableData1: {
      type: Array
    },
    unitMap: {
      type: Object
    },
    checkState: {
      type: Boolean
    },
    tableHeadData: {
      type: Array
    }
  },
  data() {
    return {
      tableHead: [{ prop: "month", label: "" }],
      tableData: this.gdjjnylxTableData,
      tableData1: this.gdjjnylxTableData1,
      newTableHeadData: this.tableHeadData
    };
  },
  watch: {
    // 表格数据变化
    gdjjnylxTableData(val) {
      this.tableData = val;
    },
    // 表格数据变化
    gdjjnylxTableData1(val) {
      this.tableData1 = val;
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
  created() {
  },
  computed: {
    ...mapGetters(["elements"])
  },
  methods: {
    initTableHead() {
      this.tableHead = [{ prop: "month", label: "" }];
      this.newTableHeadData.forEach(item => {
        this.tableHead.push({ prop: item.propCode, label: item.propName });
      });
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
        const values1 = data.map(item => item[column.property]); 
        if (!values.every(value => isNaN(value))) {
          if (
            column.property == "hydroelectricity_price" ||
            column.property == "thermal_new_energy_price" ||
            column.property == "hydroelectricity_increment_price"
          ) {
            // #4233 gaoainig 2020-06-11 修改火电常规（月度电价）的总计算 start
             let isNullKey = false;
              values1.forEach( item => {
                if(item==''){
                  isNullKey = true;
                }
              })  
            //列表电价求平均
            if(Math.max.apply(null,values)==Math.min.apply(null,values)){
              if( isNullKey == true){
                sums[index] = ""
              }else{
                sums[index] = Math.max.apply(null,values).toFixed(4)
              }         
            }else{
              sums[index] = ""
            } 
              // #4233 gaoainig 2020-06-11 修改火电常规（月度电价）的总计算 end
            // let sumss = values.reduce((prev, curr) => { 
            //   const value = Number(curr);
            //   if (!isNaN(value)) {
            //     return prev + curr;
            //   } else {
            //     return prev;
            //   }
            // }, 0);
            // sums[index] = (sumss / values.length).toFixed(4);
          } else {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index];
          }
        }
      });

      return sums;
    },
    // #4233 gaoainig 2020-06-11 富余电量的总计算 start
     getSummaries1(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计:";
          return;
        }
        let values = data.map(item => Number(item[column.property]));
        const values1 = data.map(item => item[column.property]); 
        if (!values.every(value => isNaN(value))) {
          if (
            column.property == "hydroelectricity_price" ||
            column.property == "thermal_new_energy_price" ||
            column.property == "hydroelectricity_increment_price"
          ) {
            //重新整理平均的数据
            //先去除空的字符串
            for(var i = 0 ;i<values1.length;i++){  
              if(values1[i] == "" || values1[i] == null || typeof(values1[i]) == "undefined"){  
                values1.splice(i,1);  
                i= i-1;  
              }  
            } 
            //将字符串数组转化为数字数组
            values = values1.map(Number);
            //列表电价求平均
            if(Math.max.apply(null,values)==Math.min.apply(null,values)){
              sums[index] = Math.max.apply(null,values).toFixed(4)        
            }else{
              sums[index] = ""
            } 
            // let sumss = values.reduce((prev, curr) => { 
            //   const value = Number(curr);
            //   if (!isNaN(value)) {
            //     return prev + curr;
            //   } else {
            //     return prev;
            //   }
            // }, 0);
            // sums[index] = (sumss / values.length).toFixed(4);
          } else {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index];
          }
        }
      });

      return sums;
    }
    // #4233 gaoainig 2020-06-11 富余电量的总计算 end
  }
};
</script>

<style scoped>
</style>
