<template>
  <div class="filter-container">
    <!-- 弹窗 -->
    <el-dialog
      custom-class="w800"
      title="报价方案查询"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      v-drag
    >
      <el-form :inline="true" :model="listQuery">
        <el-row>
          <el-form-item label="交易日期">
            <el-date-picker
              disabled
              style="width:150px"
              v-model="listQuery.transactionDate"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="发电公司">
            <el-input disabled v-model="listQuery['orgName']"  style="width:150px"></el-input>
          </el-form-item>
          <el-form-item label="交易单元">
            <el-input disabled  style="width:150px"  v-model="listQuery['tradingUnitName']"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="programmeDetailsData"
        tooltip-effect="dark"
        style="width: 100%"
        height="350px"
        border
      >
        <el-table-column prop="index" align="center" label="序号" width="70px"></el-table-column>
        <el-table-column align="center" label="时点" width="150">
          <template slot-scope="scope">{{ scope.row.timeId }}</template>
        </el-table-column>
        <el-table-column align="center" label="段号" width="150">
          <template slot-scope="scope">{{scope.row.bnadId}}</template>
        </el-table-column>
        <el-table-column align="center" label="申报容量(MW)" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.declareCapacity}}</template>
        </el-table-column>
        <el-table-column align="center" label="申报电价(元/千千瓦时)" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.declarePrice}}</template>
        </el-table-column>
      </el-table>
      <div v-show="!listLoading" class="pagination-container">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="listQuery.page"
          :page-sizes="[10, 20, 30, 50, 100, 200, 500, 1000]"
          :page-size="listQuery.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getDetailPage } from "@common/api/spot/tran/quotationSchemeManage/createQuotationScheme/index";
export default {
  // props:{
  //     transactionDate:{
  //        type: Date
  //     }
  // },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        orgName:"",
        tradingUnitName:"",
        transactionDate:this.transactionDate
      },
      programmeDetailsData: [],
      dialogVisible: false,
      listLoading: false,
      total: 0
    };
  },
  //初始化接收路由参数
  // mounted() {
  //   this.init(this.$store.state.settl.record);
  // },
  methods: {
    initUpdateDialog(data) {
      this.listQuery = data
      this.dialogVisible = true;
      if (data != null || row != undefined) {
        let Parameters = {
          page: this.listQuery.page,
          limit: this.listQuery.limit,
          mainId: data.schemeId
        };
        //根据报价方案主表id获取详情信息
        getDetailPage(Parameters).then(response => {
          this.programmeDetailsData = response.data.rows;
          this.total = response.data.total;
        });
      }
    },
    //列表分页变更条数
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    //列表分页切换
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    }
  }
};
</script>
<style>
</style>

