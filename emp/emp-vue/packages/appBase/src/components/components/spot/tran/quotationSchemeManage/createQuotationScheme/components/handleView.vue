<template>
  <div class="filter-container">
    <!-- 弹窗 -->
    <el-dialog
      custom-class="w1000"
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
              v-model="cTime"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="发电公司">
            <el-input disabled v-model="listQuery['orgName']" style="width:150px"></el-input>
          </el-form-item>
          <el-form-item label="交易单元">
            <el-input disabled style="width:150px" v-model="listQuery['tradingUnitName']"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
      <!-- Wang Qiang 统一单位 2019-12-16 start -->
      <div class="txt-right unit-info">单位：{{ unitMap.capacityUnit }}、{{ unitMap.priceUnit }}</div>
      <!-- Wang Qiang 统一单位 2019-12-16 end -->
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
          <template slot-scope="scope">{{ scope.row.timeName }}</template>
        </el-table-column>
        <el-table-column align="center" label="段号" width="150">
          <template slot-scope="scope">{{scope.row.bnadName}}</template>
        </el-table-column>
        <el-table-column align="center" label="起始出力" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.capacityStart}}</template>
        </el-table-column>
        <el-table-column align="center" label="终止出力" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.capacityEnd}}</template>
        </el-table-column>
        <el-table-column align="center" label="申报容量" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.declareCapacity}}</template>
        </el-table-column>
        <el-table-column align="center" label="申报电价" show-overflow-tooltip>
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
import { mapGetters } from "vuex";
import { getDetailPage } from "@common/api/spot/tran/quotationSchemeManage/createQuotationScheme/index";
export default {
  props: {
    transactionDate: {
      type: String
    }
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        orgName: "",
        tradingUnitName: ""
      },
      cTime: "",
      schemeId: "",
      programmeDetailsData: [],
      dialogVisible: false,
      listLoading: false,
      total: 0,
      unitMap: {}
    };
  },
  //初始化接收路由参数
  // mounted() {
  //   this.init(this.$store.state.settl.record);
  // },
  computed: {
    ...mapGetters(["elements", "orgId", "allSubMenus"])
  },
  mounted() {
    this.initUnitMap();
  },
  methods: {
    // 初始化页面计量单位
    initUnitMap() {
      this.allSubMenus.forEach(menu => {
        if (menu.code == sessionStorage.getItem("modelCode")) {
          this.unitMap["electricityUnit"] = menu.unitMap[1];
          this.unitMap["priceUnit"] = menu.unitMap[2];
          this.unitMap["chargeUnit"] = menu.unitMap[3];
          this.unitMap["capacityUnit"] = menu.unitMap[4];
        }
      });
    },

    // 吴志超 2020年2月17日 修改 #766 系统首页-现货业务方案
    initUpdateDialog(data) {
      this.allSubMenus.forEach(menu => {
        if (menu.code == "createQuotationScheme") {
          this.unitMap["electricityUnit"] = menu.unitMap[1];
          this.unitMap["priceUnit"] = menu.unitMap[2];
          this.unitMap["chargeUnit"] = menu.unitMap[3];
          this.unitMap["capacityUnit"] = menu.unitMap[4];
        }
      });
      this.dialogVisible = true;
      this.listQuery.orgName = data.orgName;
      this.listQuery.tradingUnitName = data.tradingUnitName;
      this.schemeId = data.schemeId;
      this.cTime = data.transactionDate;
      this.getList();
    },
    getList() {
      if (this.schemeId != null) {
        let Parameters = {
          page: this.listQuery.page,
          limit: this.listQuery.limit,
          mainId: this.schemeId
        };
        //根据报价方案主表id获取详情信息
        getDetailPage(Parameters).then(response => {
          let items = response.data.rows.map((item, index) => {
            item.index =
              index + 1 + (this.listQuery.page - 1) * this.listQuery.limit;
            return item;
          });
          this.programmeDetailsData = items;
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

