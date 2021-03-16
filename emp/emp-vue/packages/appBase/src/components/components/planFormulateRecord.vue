<!--
 * @功能描述: 
 * @版本: 
 * @作者: 阿彪
 * @Date: 2019-11-19 14:07:31
 * @最新修改内容: 营销计划管理 工作计划制定 修改记录模板
 * @LastEditTime: 2019-11-19 17:25:20
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
      <el-table-column width="100px" align="center" label="工作计划编码">
        <template slot-scope="scope">
          <span>{{scope.row.label}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="操作人">
        <template slot-scope="scope">
          <span>{{scope.row.crtUser}}</span>
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
      <el-table-column width="100px" align="center" label="操作字段">
        <template slot-scope="scope">
          <span>{{scope.row.modifyField}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="操作前内容">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="操作前内容预览"
            width="300"
            trigger="hover"
            :content="scope.row.beforeValue"
          >
            <span slot="reference">{{ scope.row.beforeValue }}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作后内容">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="操作后内容预览"
            width="300"
            trigger="hover"
            :content="scope.row.afterValue"
          >
            <span slot="reference">{{ scope.row.afterValue }}</span>
          </el-popover>
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

