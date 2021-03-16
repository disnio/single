<!--
 * @功能描述: 售电合同-固定降价（分成）合同组件
 * @版本:
 * @作者: 滕超
 * @Date: 2019-11-19 13:12:25
 * @最新修改内容:
 * @LastEditTime: 2019-11-26 21:07:14
 -->
<template>
  <div>
    <div class="txt-right">单位：{{unitMap.electricityUnit}},{{unitMap.priceUnit}}</div>
    <el-table :data="tableData" style="width: 100%" height="400px">
      <el-table-column
        v-for="(item,index) in tableHead"
        :prop="item.prop"
        :label="item.label"
        :key="index"
        align="center"
        width="180"
      >
        <template slot-scope="scope">
          <el-input v-if="index==1||index==2"
                    :disabled="checkState"
                    v-model="scope.row[item.prop]"></el-input>
          <el-input v-else :disabled="true"
                    v-model="scope.row[item.prop]"></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "gdjjfc",
  props: {
    htContract: {
      type: Object
    },
    tbData: {
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
      tableData: this.tbData,
      newTableHeadData: this.tableHeadData
    };
  },
  watch: {
    // 表格数据变化
    tbData(val) {
      this.tableData = val;
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
    initTableHead() {
      this.tableHead = [{ prop: "month", label: "" }];
      //初始化表头数据
      // let arr = [
      //   { label: "年度双边分解电价", prop: "1" },
      //   { label: "月度竞价分解电量", prop: "2" }
      // ];
      this.newTableHeadData.forEach(item => {
        this.tableHead.push({ prop: item.propCode, label: item.propName });
      });
    }
  }
};
</script>

<style scoped>
</style>
