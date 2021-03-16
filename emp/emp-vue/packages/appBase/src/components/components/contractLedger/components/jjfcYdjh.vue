<!--
 * @功能描述: 竞价分成含多年用电计划组件
 * @版本: 
 * @作者: frj
 * @Date: 2019-11-19 14:47:41
 * @最新修改内容: 
 * @LastEditTime: 2019-11-26 21:07:29
 -->
<template>
  <div>
    <div>
      <div class="txt-right">单位：{{unitMap.electricityUnit}},{{unitMap.priceUnit}}</div>
      <el-table :data="tableData" style="width: 100%" height="400px">
        <el-table-column
          v-for="(item,index) in tableHead"
          :prop="item.prop"
          :label="item.label"
          :key="index"
          width="180"  
        >
          <template slot-scope="scope">
            <div v-if="item.prop=='month'">
              {{
              scope.row[item.prop]
              }}
            </div>
            <el-input
              disabled
              v-else-if="item.prop=='year_decompose_electricity'||item.prop=='year_decompose_price'"
              v-model="scope.row[item.prop]"
            ></el-input>
            <el-input v-else :disabled="checkState" v-model="scope.row[item.prop]"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import {
  page,
  addObj,
  getObj,
  delObj,
  putObj,
  taggingObj
} from "@common/api/customer/khLabelDefinition/index";
import {
  getAllCustomerTags,
  getCustomerTagsByCustomerId,
  addCustomerTag,
  delCustomerTag
} from "@common/api/customer/customerTag";
import { mapGetters } from "vuex";
export default {
  name: "jjfcYdjh",
  props: {
    htContract: {
      type: Array
    },
    jjfchdnTableData: {
      type: Array
    },
    unitMap: {
      type: Object
    },
    checkState: {
      type: Boolean
    }
  },
  data() {
    return {
      tableHead: [
        { prop: "month", label: "" },
        { prop: "year_decompose_electricity", label: "年度双边分解电量" }
      ],
      // tableData: [
      //   { month: "2019-11月", ndsbfj: "222", vl01: "333", vl02: "333",vl03: "333" }
      // ]
      tableData: this.jjfchdnTableData
    };
  },
  watch: {
    // 表格数据变化
    jjfchdnTableData(val) {
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
    }
  },
  created() {
    this.initTableHead();
  },
  computed: {
    ...mapGetters(["elements"])
  },
  methods: {
    initTableHead() {
      //初始化表头数据
      let arr = [
        { label: "年度双边分解电价", propCode: "year_decompose_price" },
        { label: "月度竞价分解电量", propCode: "month_bidding_electricity" },
        { label: "月度竞价分解电价", propCode: "month_bidding_price" }
      ];
      arr.forEach(item => {
        this.tableHead.push({ prop: item.propCode, label: item.label });
      });
    }
  }
};
</script>

<style scoped>
.tag-dialog {
  width: 880px;
}
</style>
