<!--
 * @Author: fengzp
 * @Date: 2020-10-14 11:01:13
 * @LastEditors: fengzp
 * @LastEditTime: 2020-11-06 20:25:06
 * @Introduce: 审批历史组件
-->
<template>
  <div class="container">
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      :title="appTitle"
      :visible.sync="dialogTableVisible"
      width="66%"
    >
      <el-table border :data="tableData">
        <el-table-column
          align="center"
          label="序号"
          type="index"
          width="50px"
        ></el-table-column>
<!-- 
        <el-table-column align="center" label="审批岗位" width="210px">
          <template slot-scope="scope">
            <div class="txt-left">{{ scope.row.roleName }}</div>
          </template>
        </el-table-column> -->
        <el-table-column align="center" label="审批人" width="80px">
          <template slot-scope="scope">
            <div class="txt-left">{{ scope.row.createUser }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="审批时间" width="150px">
          <template slot-scope="scope">
            <div class="txt-left">{{ scope.row.createTime }}</div>
          </template>
        </el-table-column>

        <el-table-column align="center" label="审批结果" width="80px">
          <template slot-scope="scope">
            <div class="txt-left">{{ scope.row.result == "true" ? '通过' : '驳回'}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="审批意见">
          <template slot-scope="scope">
            <span>{{ scope.row.message }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-btn" @click="dialogTableVisible = false"
          >关 闭</el-button
        >
      </div>
      <el-row
        v-if="showPage"
        class="cfpagination_container"
        style="text-align: right; margin-top: 12px"
      >
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="curPageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-row>

    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  computed: {},
  data() {
    return {
      dialogTableVisible:false,
      tableData:this.gridData,
    };
  },
  watch: {
    
  },

  mounted() {},
  props: {
    // gridData:{
    //   type:Array,
    //   default: [],
    // },
    /* Pagination 相关 */
    showPage: {
      type: Boolean,
      default: false,
    },
    total: {
      type: Number,
      default: 0,
    },
    curPageSize: {
      type: Number,
      default: 10,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    appTitle:{
      type:String,
      default:'审批历史'
    }
  },
  destroyed() {},

  methods: {
    init(data) {
      this.tableData = data;
      this.dialogTableVisible = true;
    },
    /* Pagination 相关*/
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.$emit("fetchData", { page: this.currentPage, curPageSize: val });
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.$emit("fetchDataSize", { page: val, curPageSize: this.curPageSize });
    },

  },
};
</script>

<style lang='scss' scoped>
</style>
