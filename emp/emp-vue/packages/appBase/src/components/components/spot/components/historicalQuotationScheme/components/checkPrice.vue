<template>
  <div>
    <el-dialog
      title="申报信息"
      :visible.sync="dialogVisible"
      custom-class="w800"
      append-to-body
      :close-on-click-modal="false"
      v-drag
    >
      <div class="filter-container">
        <el-form
          :inline="true"
          :model="listQuery"
          label-width="140px"
        >
          <el-form-item label="发电公司">
            <el-select
              disabled
              v-model="fdOrg"
            >
            </el-select>
            <!-- <el-select
              clearable
              v-model="listQuery['fdOrg']"
            >
              <el-option
                v-for="item in fdOrgOptions"
                :key="item.index"
                :label="item.orgName"
                :value="item.code"
              ></el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item label="交易单元">
            <el-select
              disabled
              v-model="transactionUnit"
            ></el-select>
            <!-- <el-select
              clearable
              v-model="listQuery['transactionUnit']"
              placeholder="请选择"
            >
              <el-option
                v-for="item in transactionUnitOptions"
                :key="item.index"
                :label="item.propName"
                :value="item.propCode"
              ></el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item label="标的">
            <el-select
              disabled
              v-model="target"
            ></el-select>
            <!-- <el-select
              clearable
              v-model="listQuery['target']"
              placeholder="请选择"
            >
              <el-option
                v-for="item in targetOptions"
                :key="item.index"
                :label="item.propName"
                :value="item.propCode"
              ></el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item label="交易中心">
            <el-select
              style="width:100%"
              clearable
              v-model="tradingCenter"
              placeholder="请选择"
              disabled
            >
              <el-option
                v-for="item in tradingCenterOptions"
                :key="item.propCode"
                :label="item.jyorgName"
                :value="item.jyorgId"
              ></el-option>
            </el-select>
          </el-form-item>

        </el-form>
      </div>

      <div>
        <!-- Wang Qiang 统一单位 2019-12-16 start -->
        <div class="txt-right unit-info">单位：{{ unitMap.electricityUnit }}、{{ unitMap.priceUnit }}</div>
        <!-- Wang Qiang 统一单位 2019-12-16 end -->
        <el-table
          :key='tableKey'
          :data="tableData"
          v-loading.body="listLoading"
          border
          fit
          highlight-current-row
          style="width: 100%"
          height="400"
        >

          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="70px"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="时点"
          >
            <template slot-scope='scope'>
              <div>{{scope.row.timeCode}}</div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="段号"
          >
            <template slot-scope='scope'>
              <div>{{scope.row.bandCode}}</div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="起始出力"
          >
            <template slot-scope='scope'>
              <div>{{scope.row.capacityStart}}</div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="终止出力"
          >
            <template slot-scope='scope'>
              <div>{{scope.row.capacityEnd}}</div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="申报电价"
          >
            <template slot-scope='scope'>
              <div>{{scope.row.declarePrice}}</div>
            </template>
          </el-table-column>
        </el-table>

      </div>

    </el-dialog>
  </div>
</template>

<script>
import { getDetailPage } from "@common/api/spot/configure/historicalQuotationScheme/index";
import { page } from "@common/api/basicData/tMdataJyorg/index";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      fdOrg: "", //发电公司
      transactionUnit: "", //交易单元
      target: "", //标的
      tradingCenter: "", //交易中心
      // ?==================/
      listLoading: false,
      tableData: [],
      tableKey: 1,
      tradingCenterOptions: [], //交易中心
      targetOptions: [], //标的
      transactionUnitOptions: [], //交易单元
      fdOrgOptions: [], // 发电公司
      listQuery: {},
      dialogVisible: false,
      unitMap: {}
    };
  },
  computed: {
    ...mapGetters(["elements", "orgId", "allSubMenus"])
  },
  mounted () {
    this.initUnitMap()
  },
  methods: {
    // 初始化页面计量单位
    initUnitMap () {
      this.allSubMenus.forEach(menu => {
        if (menu.code == sessionStorage.getItem('modelCode')) {
          this.unitMap['electricityUnit'] = menu.unitMap[1]
          this.unitMap['priceUnit'] = menu.unitMap[2]
          this.unitMap['chargeUnit'] = menu.unitMap[3]
          this.unitMap['capacityUnit'] = menu.unitMap[4]
        }
      });
    },
    init(data, tradingCenter) {
      this.fdOrg = data.orgName; //发电公司
      this.transactionUnit = data.tradingName; //交易单元
      this.target = data.tranObjectName; //标的
      page({page: 1, limit: 1000}).then(res => {
        this.tradingCenterOptions = res.data.rows;
        this.tradingCenter = tradingCenter;

        //交易中心
        this.dialogVisible = true;
        let par = {
          schemeId: data.schemeId,
          tradingCenter: this.tradingCenter
        };
        this.listLoading = true;
        getDetailPage(par).then(res1 => {
          this.listLoading = false;
          if (res1.rel) {
            this.tableData = res1.data;
          } else {
            this.$notify({
              title: "提示",
              message: res1.msg,
              type: "warning",
              duration: 2000
            });
          }
        });
      });

    }
  }
};
</script>

<style scoped>
</style>
