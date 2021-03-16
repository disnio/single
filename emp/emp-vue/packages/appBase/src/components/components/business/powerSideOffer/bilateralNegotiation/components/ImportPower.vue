
<template>
  <div class="app-container calendar-list-container">
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      width="90%"
      title="交易公告数据"
      :visible.sync="dialogImport"
      :modal-append-to-body="false"
      :before-close="beforeClose"
      append-to-body
    >
      <div style="padding-right:10px;">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleTabsClick">
          <el-tab-pane label="待入库数据" name="dataSuccess">
            <el-button
              class="filter-item"
              @click="createImport"
              type="primary"
              icon="el-icon-upload"
            >确认入库</el-button>
            <el-table
              :data="importTableList"
              v-loading="importLoading"
              border
              style="width: 100%"
              height="310px"
            >
              <el-table-column type="index" label="序号" align="center" width="60px"></el-table-column>

              <el-table-column align="center" width="120" label="交易分类">
                <template slot-scope="scope">{{scope.row.tradingClassificationName}}</template>
              </el-table-column>

              <el-table-column align="center" label="类型">
                <template slot-scope="scope">{{scope.row.tradingTypeName}}</template>
              </el-table-column>

              <el-table-column width="180px" align="center" label="发电企业">
                <template slot-scope="scope">{{scope.row.fdOrgName}}</template>
              </el-table-column>

              <el-table-column align="center" label="机组">
                <template slot-scope="scope">{{scope.row.unitName}}</template>
              </el-table-column>

              <el-table-column align="center" label="交易产品">
                <template slot-scope="scope">{{scope.row.tradingProductName}}</template>
              </el-table-column>

              <el-table-column align="center" width="160px" label="出/受让发电企业">
                <template slot-scope="scope">{{scope.row.sellTransfereeOrgName}}</template>
              </el-table-column>

              <el-table-column width="120px" align="center" label="出/受让机组">
                <template slot-scope="scope">{{scope.row.sellTransfereeUnitName}}</template>
              </el-table-column>

              <el-table-column label="用电企业" align="center">
                <template slot-scope="scope">{{scope.row.eleEnterpriseName}}</template>
              </el-table-column>

              <el-table-column align="center" width="90" label="电量">
                <template slot-scope="scope">{{scope.row.declarationElectricity}}</template>
              </el-table-column>
              <el-table-column align="center" width="90" label="电价">
                <template slot-scope="scope">{{scope.row.declarationElectricityPrices}}</template>
              </el-table-column>

              <el-table-column align="center" width="160" label="备注">
                <template slot-scope="scope">{{scope.row.schemeDesc}}</template>
              </el-table-column>
            </el-table>

            <!-- <div class="pagination-container">
              <el-pagination
                @size-change="handleImportSizeChange"
                @current-change="handleImportCurrentChange"
                :current-page.sync="importListQuery.page"
                :page-size="importListQuery.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="importTotal"
              ></el-pagination>
            </div>-->
          </el-tab-pane>
          <el-tab-pane label="异常数据" name="dataErr">
            <el-button
              class="filter-item"
              @click="exportData"
              type="primary"
              icon="el-icon-upload"
            >导出数据</el-button>

            <el-table
              :data="importTableList"
              v-loading="importLoading"
              border
              style="width: 100%"
              height="310px"
            >
              <el-table-column type="index" label="序号" align="center" width="60px"></el-table-column>

              <el-table-column align="center" width="120" label="交易分类">
                <template slot-scope="scope">{{scope.row.tradingClassificationName}}</template>
              </el-table-column>

              <el-table-column align="center" label="类型">
                <template slot-scope="scope">{{scope.row.tradingTypeName}}</template>
              </el-table-column>

              <el-table-column width="180px" align="center" label="发电企业">
                <template slot-scope="scope">{{scope.row.fdOrgName}}</template>
              </el-table-column>

              <el-table-column align="center" label="机组">
                <template slot-scope="scope">{{scope.row.unitName}}</template>
              </el-table-column>

              <el-table-column align="center" label="交易产品">
                <template slot-scope="scope">{{scope.row.tradingProductName}}</template>
              </el-table-column>

              <el-table-column align="center" width="160px" label="出/受让发电企业">
                <template slot-scope="scope">{{scope.row.sellTransfereeOrgName}}</template>
              </el-table-column>

              <el-table-column width="120px" align="center" label="出/受让机组">
                <template slot-scope="scope">{{scope.row.sellTransfereeUnitName}}</template>
              </el-table-column>

              <el-table-column prop label="用电企业" align="center">
                <template slot-scope="scope">{{scope.row.eleEnterpriseName}}</template>
              </el-table-column>

              <el-table-column align="center" width="90" label="电量">
                <template slot-scope="scope">{{scope.row.declarationElectricity}}</template>
              </el-table-column>
              <el-table-column align="center" width="90" label="电价">
                <template slot-scope="scope">{{scope.row.declarationElectricityPrices}}</template>
              </el-table-column>

              <el-table-column align="center" width="160" label="备注">
                <template slot-scope="scope">{{scope.row.schemeDesc}}</template>
              </el-table-column>

              <el-table-column align="center" width="600px" label="数据异常原因">
                <template slot-scope="scope">
                  <span>{{scope.row.errMsg}}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-btn" @click="cancelImport">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template> 
<script>
import {
  importData,
  exportDetail,
  putInDatabase
} from "@common/api/business/bilateralNegotiation/index";
// import { importData } from "@common/api/contractManage/contractLedger/index";
// import { mapGetters } from "vuex";
import { parseTime, reverse, isNumber, excelDateToJSDate } from "@common/utils/index";
export default {
  name: "ImportantDialog",
  props: {
    announcementInfo: { type: Object }
  },
  data() {
    return {
      importTotal: 0,
      importListQuery: {},
      importLoading: false,
      importTableList: [],
      dialogImport: false,
      activeName: "dataSuccess"
    };
  },

  created() {},
  // computed: {
  //   ...mapGetters(["elements"])
  // },
  methods: {
    //切换tabs
    async handleTabsClick(tab, event) {
      if (this.activeName == "dataSuccess") {
        let parame = { schemeId: this.announcementInfo.schemeId, isCorrect: 1 };
        this.importLoading = true;
        let res = await importData(parame);
        this.importLoading = false;
        if (res.rel) {
          this.importTableList = res.data.rows;
        } else {
          this.$notify({
            title: "提示",
            message: res.msg,
            type: "warning",
            duration: 2000
          });
        }
      } else {
        let parame = { schemeId: this.announcementInfo.schemeId, isCorrect: 0 };
        this.importLoading = true;
        let res = await importData(parame);
        this.importLoading = false;
        if (res.rel) {
          this.importTableList = res.data.rows;
        } else {
          this.$notify({
            title: "提示",
            message: res.msg,
            type: "warning",
            duration: 2000
          });
        }
      }
    },
    async initImportData() {
      this.dialogImport = true;
      this.activeName = "dataSuccess";
      this.handleTabsClick();
    },

    cancelImport() {
      this.checkImported();
    },
    beforeClose() {
      this.checkImported();
    },
    checkImported() {
      this.dialogImport = false;
      // if (!this.isImport && this.importList.length > 0) {
      //   if (this.importList[0].isverify == "1") {
      //     this.dialogImport = false;
      //   } else {
      //     this.$confirm("已解析的正确数据是否入库?", "提示", {
      //       confirmButtonText: "确定",
      //       cancelButtonText: "取消",
      //       type: "warning"
      //     })
      //       .then(() => {
      //         this.$refs.importantTableSuccess.createImport("1");
      //       })
      //       .catch(() => {
      //         this.dialogImport = false;
      //       });
      //   }
      // } else {
      //   this.dialogImport = false;
      // }
    },
    // 确认入库
    async createImport() {
      let res = await putInDatabase({
        schemeId: this.announcementInfo.schemeId
      });
      this.dialogImport = false;
      if (res.rel) {
        this.$parent.delGetList(this.announcementInfo.schemeId);
      } else {
        this.$notify({
          title: "提示",
          message: res.msg,
          type: "warning",
          duration: 2000
        });
      }
    },
    async exportData() {
      let par = {
        schemeId: this.announcementInfo.schemeId,
        ModelCode: "fdPricingProposal",
        isCorrect: 0
      };
      let res = await exportDetail(par);
    },
    // 点击分页
    handleImportSizeChange(val) {
      this.importListQuery.limit = val;
      this.getImportList();
    },
    //变更分页条数
    handleImportCurrentChange(val) {
      this.importListQuery.page = val;
      this.getImportList();
    }
  }
};
</script>