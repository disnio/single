<template>
  <div class="app-container calendar-list-container">
    <div v-if="!btnStatus" class="filter-container">
      <el-form :inline="true" :model="listQuery" label-width="70px">
        <el-row>
          <el-form-item label="区域">
            <el-select
              style="width:140px"
              clearable
              :disabled="qyDisabled"
              v-model="listQuery['areaCode']"
            >
              <el-option
                v-for="item in orgAreaOptions"
                :key="item.index"
                :label="item.orgName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="区域公司">
            <el-select
              style="width:140px"
              clearable
              :disabled="qyOrgDisabled"
              v-model="listQuery['areaCompanyCode']"
            >
              <el-option
                v-for="item in orgAreaComOptions"
                :key="item.index"
                :label="item.orgName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易中心">
            <el-select
              style="width:140px"
              :disabled="true"
              :clearable="true"
              v-model="listQuery.tradingCenterCode"
              placeholder="请选择"
            >
              <el-option
                v-for="item in tradingCenterOptions"
                :key="item.propCode"
                :label="item.jyorgName"
                :value="item.jyorgId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
              style="width:215px"
              clearable
              v-model="dateArr"
              type="daterange"
              align="right"
              unlink-panels
              value-format="yyyy-MM-dd"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="发电公司">
            <el-select
              style="width:140px"
              @change="chooseFdOrg"
              clearable
              :disabled="true"
              v-model="listQuery['orgCode']"
            >
              <el-option
                v-for="item in fdOrgOptions"
                :key="item.index"
                :label="item.orgName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易单元">
            <el-select
              style="width:140px"
              clearable
              v-model="listQuery['tradingUnitCode']"
              :disabled="true"
              placeholder="请选择"
            >
              <el-option
                v-for="item in transactionUnitOptions"
                :key="item.index"
                :label="item.unitName"
                :value="item.unitId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期类型">
            <el-select
              style="width:140px"
              clearable
              v-model="listQuery['transactionDateType']"
              placeholder="请选择"
            >
              <el-option
                v-for="item in dateTypeOptions"
                :key="item.index"
                :label="item.propName"
                :value="item.propCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
        </el-row>
      </el-form>
    </div>
    <div v-else class="filter-container">
      <el-form :inline="true" :model="listQuery" label-width="70px">
        <el-row>
          <el-form-item label="日期">
            <el-date-picker
              style="width:215px"
              clearable
              v-model="dateArr"
              type="daterange"
              align="right"
              unlink-panels
              value-format="yyyy-MM-dd"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="日期类型">
            <el-select
              style="width:140px"
              clearable
              v-model="listQuery['transactionDateType']"
              placeholder="请选择"
            >
              <el-option
                v-for="item in dateTypeOptions"
                :key="item.index"
                :label="item.propName"
                :value="item.propCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
        </el-row>
      </el-form>
    </div>
    <div>
      <!-- Wang Qiang 统一单位 2019-12-16 start -->
      <div class="txt-right unit-info">单位：{{ unitMap.electricityUnit }}、{{ unitMap.priceUnit }}</div>
      <!-- Wang Qiang 统一单位 2019-12-16 end -->
      <el-table
        ref="multipleTable"
        @selection-change="getSelectionIds"
        :key="tableKey"
        :data="tableData"
        v-loading.body="listLoading"
        border
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column type="selection" align="center" min-width="60"></el-table-column>
        <el-table-column type="index" label="序号" align="center" min-width="80"></el-table-column>
        <el-table-column align="center" label="交易日期">
          <template slot-scope="scope">
            <div>{{scope.row.transactionDate}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="最大负荷">
          <template slot-scope="scope">
            <div v-if="scope.row.powerMax">{{(scope.row.powerMax).toFixed(4)}}</div>
            <div v-else>{{scope.row.powerMax}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="最小负荷">
          <template slot-scope="scope">
            <div v-if="scope.row.powerMin">{{(scope.row.powerMin).toFixed(4)}}</div>
            <div v-else>{{scope.row.powerMin}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="平均负荷">
          <template slot-scope="scope">
            <div v-if="scope.row.powerAvg">{{(scope.row.powerAvg).toFixed(4)}}</div>
            <div v-else>{{scope.row.powerAvg}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="平均出清电价">
          <template slot-scope="scope">
            <div v-if="scope.row.priceAvg">{{parseFloat(scope.row.priceAvg).toFixed(4)}}</div>
            <div v-else>{{scope.row.priceAvg}}</div>
          </template>
        </el-table-column>
        <!-- fixed="right" -->
        <el-table-column align="center" label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="handleCheck(scope.row)">查看报价</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="!listLoading" class="pagination-container">
      <!-- v-if="btnStatus" -->
      <div style="float:left">
        <el-button
          style="float:left;"
          class="filter-item"
          @click="handelClickChoose"
          type="primary"
          icon="el-icon-plus"
        >确认选择</el-button>
      </div>
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

    <checkPrice
      ref="checkPrice"
      :orgAreaOptions="orgAreaOptions"
      :orgAreaComOptions="orgAreaComOptions"
      :fdOrgOptions="fdOrgOptions"
      :transactionUnitOptions="transactionUnitOptions"
    ></checkPrice>
  </div>
</template>

<script>
import {
  getMainPage,
  getDetailPage
} from "@common/api/spot/configure/historicalQuotationScheme/index";
import {
  getUserOrgInfo,
  getAllOrgByPorgId,
  getAllOrgByAttribute,
  getTradingUnitbyTradingUnitName,
  getListAll // 机组
} from "@common/api/public/index";
import { parseTime } from "@common/utils/index";
import { mapGetters } from "vuex";
import { getSelectList } from "@common/api/base";
import {
  getDataListByOrgId //交易中心
} from "@common/api/public/index";
export default {
  name: "historicalQuotationScheme",
  props: {
    btnStatus: { type: Boolean }
  },
  components: {
    checkPrice: () => import("./components/checkPrice")
  },
  data() {
    return {
      dateArr: [],
      publicdata: [],
      delIds: [],
      jydyDisabled: true,
      listLoading: false,
      tableData: [{ id: "11" }],
      tableKey: 0,
      dateTypeOptions: [],
      transactionUnitOptions: [],
      fdOrgOptions: [],
      qyOrgDisabled: false,
      qyDisabled: false,
      tradingCenterOptions: [], //交易中心数据
      orgAreaComOptions: [],
      orgAreaOptions: [],
      tradingUnitCode: "",
      listQuery: {
        page: 1,
        limit: 10,
        orgCode: "",
        tradingUnitCode: "",
        tradingCenterCode: ""
      },
      total: 0,
      unitMap: {}
    };
  },
  computed: {
    ...mapGetters(["elements", "orgId", "allSubMenus"])
  },
  mounted () {
    this.initUnitMap()
  },
  created() {
    // console.log("test", this.$route.path);
    /*this.init();
    console.log("页面在请求新数据")*/
    if (this.$route.path === "/spot/configure/historicalQuotationScheme") {
      this.init();
      // console.log("页面进行无控制初始化");
    } else {
      // console.log("页面是弹窗非完整路由");
    }
  },
  watch: {
    dateArr: {
      handler(newVal, oldVal) {
        //console.log(("日期数据改变了呀"));
        //console.log(newVal);
        if (newVal) {
          this.listQuery.transactionDate = newVal.join("~");
        } else {
          this.listQuery.transactionDate = "";
        }
      },
      deep: true
    }
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
    /**
     * @方法名称: 获取数据
     * @功能描述: 此功能为复用性公共组件 ，报价方案创建页面进入触发的函数，
     * @参数: 参数为 标的 交易中心 发电公司 交易单元 方案名称 交易日期 的id
     * @返回值:
     * @样式作用范围:
     * @作者: 吴志超  工单 #430
     * @Date: 2019-11-18 17:18:25
     * @最新修改内容:
     * @LastEditTime:
     */
    async getData(data) {
      getSelectList("typical_day_type").then(res => {
        this.dateTypeOptions = res;
      });
      this.listQuery.areaCode = data.areaCode;
      this.listQuery.areaCompanyCode = data.areaCompanyCode;
      this.listQuery.tradingCenterCode = data.tradingCenterCode;
      this.listQuery.orgCode = data.orgCode;
      this.listQuery.tradingUnitCode = data.tradingUnitCode;
      this.listQuery.tranObjectCode = data.tranObjectCode;
      this.listQuery.page = 1;
      this.listQuery.limit = 10;
      this.getList();
      // console.log("1");
      // await this.init(data.tradingCenterCode, data.orgCode, data.tradingUnitCode);
      // console.log("2");
      // this.listQuery.tradingCenterCode = data.tradingCenterCode;
      // this.listQuery.orgCode = data.orgCode;
      // this.listQuery.tradingUnitCode = data.tradingUnitCode;
      //this.handleFilter();
    },
    getSelectionIds(val) {
      if (val) {
        this.publicdata = val;
        let id = [];
        val.forEach(element => {
          id.push(element.schemeId + "");
        });
        this.delIds = id;
      }
    },
    handelClickChoose() {
      if (this.publicdata.length === 1) {
        this.$emit("listenToChildEvent", this.publicdata);
        this.$refs.multipleTable.clearSelection();
      } else {
        this.$notify({
          title: "提示信息",
          message: "策略只能选择一条机组数据！",
          type: "warning",
          duration: 2000
        });
        this.$refs.multipleTable.clearSelection();
      }
    },

    // init(a, b, c) {
    //   return new Promise((resolve, reject) => {
    //     getUserOrgInfo()
    //       .then(response => {
    //         if (response.length == 1) {
    //           this.qyDisabled = false;
    //           this.qyOrgDisabled = false;
    //         } else if (response.length == 2) {
    //           this.qyDisabled = true;
    //           this.qyOrgDisabled = false;
    //           this.listQuery.areaCode = response[1].id;
    //         } else if (response.length == 3) {
    //           this.qyDisabled = true;
    //           this.qyOrgDisabled = true;
    //           this.listQuery.areaCode = response[1].id;
    //           this.listQuery.areaCompanyCode = response[2].id;
    //         } else if (response.length == 4) {
    //           this.qyDisabled = true;
    //           this.qyOrgDisabled = true;
    //           this.listQuery.areaCode = response[1].id;
    //           this.listQuery.areaCompanyCode = response[2].id;
    //         }
    //       })
    //       .then(() => {
    //         //获取当前日期的前一天
    //         // let curDate = new Date();
    //         // let preDate = new Date(curDate.getTime() - 24 * 60 * 60 * 1000);
    //         // this.listQuery.transactionDate = parseTime(preDate, "{y}-{m}-{d}");
    //         let parame = {
    //           attributeTypeCode: "zzjgsx05"
    //         };
    //         getAllOrgByAttribute(parame).then(res => {
    //           this.orgAreaOptions = res;
    //           let orgAreaComId = res[res.length - 1].id;
    //         });
    //         let parmes = {
    //           attributeTypeCode: "zzjgsx03",
    //           pOrgId: this.orgAreaComId
    //         };
    //         getAllOrgByPorgId(parmes).then(res => {
    //           this.orgAreaComOptions = res;
    //         });
    //         let query = {
    //           orgId: this.listQuery.areaCompanyCode
    //         };
    //         //获取交易中心数据
    //         getDataListByOrgId(query).then(res => {
    //           this.tradingCenterOptions = res;
    //           this.listQuery.tradingCenterCode = a;
    //         });
    //         //获取发电公司
    //         let par = {
    //           attributeTypeCode: "zzjgsx02",
    //           pOrgId: this.orgAreaComId
    //         };
    //         getAllOrgByPorgId(par).then(res => {
    //           this.fdOrgOptions = res;
    //           this.chooseFdOrg(b, 1, c);
    //         });
    //         // 获取日期类型
    //         getSelectList("typical_day_type").then(res => {
    //           this.dateTypeOptions = res;
    //         });
    //       });
    //   });
    // },

    //点击发电公司
    chooseFdOrg(val, data, a) {
      this.listQuery.orgCode = val;
      if (!data) {
        this.listQuery.tradingUnitCode = "";
      }
      this.jydyDisabled = false;
      let parames = {
        porgId: val
      };
      getListAll(parames).then(res => {
        this.transactionUnitOptions = res.data;
        this.listQuery.tradingUnitCode = a;
        this.getList();
      });
    },

    getList() {
      this.listLoading = true;
      // this.listQuery.transactionDate = "2019-06-27";
      getMainPage(this.listQuery).then(response => {
        this.listLoading = false;
        if (response.rel) {
          let items = response.data.rows.map((item, index) => {
            item.index =
              index + 1 + (this.listQuery.page - 1) * this.listQuery.limit;
            return item;
          });
          this.tableData = response.data.rows;
          this.total = response.data.total;
        } else {
          this.$notify({
            title: "失败",
            message: response.msg,
            type: "warning",
            duration: 2000
          });
        }
      });
    },

    handleCheck(row) {
      //查看报价
      this.$refs.checkPrice.init(row, this.listQuery.tradingCenterCode);
    },
    handleFilter() {
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    }
  }
};
</script>

<style scoped>
</style>
