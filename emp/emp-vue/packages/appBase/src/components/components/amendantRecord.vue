<!--
 * @功能描述: 版本记录公用模板 
 * @版本: 
 * @作者: frj
 * @Date: 2019-10-28 16:26:30
 * @最新修改内容: 
 * @LastEditTime: 2019-11-13 09:52:34
 -->
<template>
  <div class="app-container calendar-list-container">
    <el-table
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
      height ="380px"
    >
      <el-table-column prop="index" label="序号" align="center" width="60px"></el-table-column>
      <el-table-column width="100px" align="center" label="操作人">
        <template slot-scope="scope">
          <span>{{scope.row.crtUserName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="操作">
        <template slot-scope="scope">
          <span>{{scope.row.operation}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="操作时间">
        <template slot-scope="scope">
          <span>{{scope.row.crtTime}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="页签">
        <template slot-scope="scope">
          <span>{{scope.row.label}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="操作字段">
        <template slot-scope="scope">
          <span>{{scope.row.operateField}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="操作前内容">
        <template slot-scope="scope">
          <span>{{scope.row.beforeContent}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作后内容">
        <template slot-scope="scope">
          <span>{{scope.row.afterContent}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listPageInfo.page"
        :page-sizes="[10, 20, 30, 50, 100, 200, 500, 1000]"
        :page-size="listPageInfo.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getHtRecords } from "@common/api/contractManage/contractLedger/index";
import { mapGetters } from "vuex";
export default {
  props: {
    originalId: {
      type: String
    },
    list: {
      type: Array
    },
    total: {
      type: Number
    }
  },
  data() {
    return {
      listLoading: false,
      tableKey: 0,
      listPageInfo: {
        limit: 10,
        page: 1,
      }
    };
  },
  computed: {
    ...mapGetters(["elements"])
  },
  created() { 
    this.init();
  },
  methods: {
    init(){
      this.listPageInfo = {
        limit: 10,
        page: 1,
      };
      this.$emit("setRecords",this.listPageInfo);
    },
    handleSizeChange(val) {
      /**
       * @方法名称: handleSizeChange
       * @功能描述: 分页
       * @参数:
       * @返回值:
       * @样式作用范围:
       * @作者: frj
       * @issues:
       * @Date: 2019-10-28 19:30:34
       * @最新修改内容:
       * @LastEditTime:
       */
      this.listPageInfo.limit = val;
      this.$emit("setRecords",this.listPageInfo);
    },
    handleCurrentChange(val) {
      this.listPageInfo.page = val;
      this.$emit("setRecords",this.listPageInfo);
    }
  }
};
</script>
<style scoped>
</style>

