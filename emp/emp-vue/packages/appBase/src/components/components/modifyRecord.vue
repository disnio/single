<!--
 * @功能描述: 交易管理-交易结果-发电/售电新增了公共的修改记录组件
 * @版本: 
 * @作者: 秦侯珍
 * @Date: 2019-11-27 13.20.11
 * @最新修改内容: 交易管理-交易结果-发电/售电新增了公共的修改记录组件
 * @LastEditTime: 2020-08-25 14:47:13
 -->
<template>
  <!-- 2019-11-27 #2871 秦侯珍 交易管理-交易结果-发电/售电新增了公共的修改记录组件 start -->
  <div>
    <!-- 弹窗 -->
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      title="修改记录"
      custom-class="w1000"
      :append-to-body="true"
      :visible.sync="openadjustmentReviseDialogVisible"
      @close="closeDialog"
    >
      <div :style="{paddingRight:'10px',height:(dialogHeight)+'px'}">
        <el-scrollbar>
          <el-table
            :key="tableKey"
            :data="tableList"
            v-loading.body="listLoading"
            border
            fit
            highlight-current-row
            style="width: 100%;"
            :height="tabHeight"
          >
            <el-table-column type="index" label="序号" align="center" width="70px"></el-table-column>
            <el-table-column width="200px" align="center" label=" 操作人">
              <template slot-scope="scope">
                <span>{{ scope.row.crtUser }}</span>
              </template>
            </el-table-column>
            <el-table-column width="200px" align="center" label=" 操作">
              <template slot-scope="scope">
                <span>{{ scope.row.operation }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作时间">
              <template slot-scope="scope">
                <span>{{ scope.row.crtTime }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="页签">
              <template slot-scope="scope">
                <span>{{ scope.row.label }}</span>
              </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="操作字段">
              <template slot-scope="scope">
                <span>{{ scope.row.modifyField }}</span>
              </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="操作前内容">
              <template slot-scope="scope">
                <span>{{ scope.row.oldValue}}</span>
              </template>
            </el-table-column>
            <el-table-column width="200px" align="center" label="操作后内容">
              <template slot-scope="scope">
                <span>{{ scope.row.newValue}}</span>
              </template>
            </el-table-column>
          </el-table>
          <div v-show="!listLoading" class="pagination-container">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="listQuery.page"
              :page-sizes="[10,20,30, 50,100,200,500,1000]"
              :page-size="listQuery.limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </el-scrollbar>
      </div>
    </el-dialog>
    <!-- 2019-11-27 #2871 秦侯珍 交易管理-交易结果-发电/售电新增了公共的修改记录组件 end -->
  </div>
</template>
<script>
import { getJyTradingResultsDetailPageList } from "@common/api/business/jyTransactionNotice/index";
import { mapGetters } from "vuex";
import { initDialogHeight } from "@common/utils/index";
export default {
  name: "result",
  data() {
    return {
      mainIndex: [],
      mainIndexPos: "",
      maskStatus: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      total: 0,
      openadjustmentReviseDialogVisible: false,
      tableKey: 3,
      tableList: [],
      listLoading: false,
      dialogHeight: "", //弹框高度
      tabHeight: "" //表格高度
    };
  },
  mounted() {
    const that = this;
    this.dialogHeight = initDialogHeight(); //获取弹框高度
    window.onresize = function temp() {
      that.dialogHeight = initDialogHeight(); //获取弹框高度(监控高度变化)
    };
  },
  created() {
    this.setLayoutHeight();
  },
  computed: {
    ...mapGetters(["elements", "orgId"])
  },
  methods: {
    setLayoutHeight() {
      this.tabHeight = initDialogHeight() * 0.85 + "px"; //修改计算的表格高度
    },
    openadjustmentReviseDialog(data) {
      this.openadjustmentReviseDialogVisible = true;
      this.listQuery.businessId = data.jyTradingResultsId;
      // this.changeMainId = data;
      getJyTradingResultsDetailPageList(this.listQuery).then(res => {
        if(res.data) {
          this.tableList = res.data.rows;
          this.total = res.data.total;  
          // this.setViewsList();
        }
      });
    },
    // setViewsList() {
    //   let listData = this.tableList;
    //   this.mainIndex = [];
    //   this.mainIndexPos = 0;
    //   let isMainData = false;
    //   let arr = [];
    //   for (let i = 0, l = listData.length; i < l; i++) {
    //     if (i === 0) {
    //       arr.push(listData[i].recordPerson);
    //       this.mainIndex.push(1);
    //       this.mainIndexPos = 0;
    //     } else {
    //       if (arr[arr.length - 1].indexOf(listData[i].recordPerson) < 0) {
    //         arr.push(listData[i].recordPerson);
    //         this.mainIndex.push(1);
    //         this.mainIndexPos = i;
    //       } else {
    //         this.mainIndex[this.mainIndexPos] += 1;
    //         this.mainIndex.push(0);
    //       }
    //     }
    //   }
    //   this.tableList = listData;
    // },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.openadjustmentReviseDialog();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.openadjustmentReviseDialog();
    },
    closeDialog() {
      this.maskStatus = true
      this.listQuery.page = 1;
      this.listQuery.limit = 10;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>





