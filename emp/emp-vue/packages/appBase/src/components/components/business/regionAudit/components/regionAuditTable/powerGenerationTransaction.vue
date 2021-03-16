<template>
  <div class="app-container calendar-list-container">
    <!-- 发电权双边交易 -->
    <div v-if="announcementInfoData.tradeWayCode == 'jyfs01'">
      <el-row>
        <el-col :span="24">
          <div class="txt-right unit-info">单位:{{units.electricityUnit}},{{units.priceUnit}}</div>
        </el-col>
      </el-row>
      <el-table
        :key="tableKey"
        :data="fdtableListData"
        @selection-change="selsChange"
        v-loading.body="listLoading"
        :span-method="objectSpanMethod"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column align="center" type="selection"> </el-table-column>
        <el-table-column
          prop="index"
          label="序号"
          align="center"
          width="60px"
        ></el-table-column>
        <el-table-column align="center" label="交易分类">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.tradingClassificationName"
              disabled
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="类型">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.tradingTypeName"
              disabled
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="发电企业">
          <template slot-scope="scope">
            <el-input v-model="scope.row.fdOrgName" disabled></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="机组">
          <template slot-scope="scope">
            <el-input v-model="scope.row.unit" disabled></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="交易产品">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.tradingProductName"
              disabled
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="出/受让发电企业">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.sellTransfereeOrgName"
              disabled
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="出/受让机组">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.sellTransfereeUnit"
              disabled
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="电量">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.declarationElectricity"
              disabled
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="电价">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.declarationElectricityPrices"
              disabled
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="审核状态">
          <template slot-scope="scope">
            <el-input v-model="scope.row.stateName" disabled></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 发电权集中竞价 -->
    <div v-if="announcementInfoData.tradeWayCode == 'jyfs02'">
      <el-row>
        <el-col :span="24">
          <div class="txt-right unit-info">单位:{{units.electricityUnit}},{{units.priceUnit}}</div>
        </el-col>
      </el-row>
      <el-table
        :key="tableKey"
        :data="fdtableListData"
        @selection-change="selsChange"
        :span-method="objectSpanMethod1"
        v-loading.body="listLoading"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column align="center" type="selection"> </el-table-column>
        <el-table-column
          prop="index"
          label="序号"
          align="center"
          width="60px"
        ></el-table-column>
        <el-table-column align="center" label="交易分类">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.tradingClassificationName"
              disabled
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="类型">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.tradingTypeName"
              disabled
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="发电企业">
          <template slot-scope="scope">
            <el-input v-model="scope.row.fdOrgName" disabled></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="机组">
          <template slot-scope="scope">
            <el-input v-model="scope.row.unit" disabled></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="交易产品">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.tradingProductName"
              disabled
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="报价段">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.quotationStallName"
              disabled
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="电量">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.declarationElectricity"
              disabled
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="电价">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.declarationElectricityPrices"
              disabled
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="审核状态">
          <template slot-scope="scope">
            <el-input v-model="scope.row.stateName" disabled></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 发电权挂牌 -->
    <div v-if="announcementInfoData.tradeWayCode == 'jyfs03'">
      <el-row>
        <el-col :span="24">
          <div class="txt-right unit-info">单位:{{units.electricityUnit}},{{units.priceUnit}}</div>
        </el-col>
      </el-row>
      <el-table
        :key="tableKey"
        :data="fdtableListData"
        @selection-change="selsChange"
        v-loading.body="listLoading"
        :span-method="objectSpanMethod2"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column align="center" type="selection"> </el-table-column>
        <el-table-column
          prop="index"
          label="序号"
          align="center"
          width="60px"
        ></el-table-column>
        <el-table-column align="center" label="交易分类">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.tradingClassificationName"
              disabled
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="类型">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.tradingTypeName"
              disabled
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="发电企业">
          <template slot-scope="scope">
            <el-input v-model="scope.row.fdOrgName" disabled></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="机组">
          <template slot-scope="scope">
            <el-input v-model="scope.row.unit" disabled></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="交易产品">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.tradingProductName"
              disabled
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="电量">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.declarationElectricity"
              disabled
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="电价">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.declarationElectricityPrices"
              disabled
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="审核状态">
          <template slot-scope="scope">
            <el-input v-model="scope.row.stateName" disabled></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { deleteInfoById } from "@common/api/business/powerSideOffer/centralizedBidding/index";
import { mapGetters } from "vuex";
import { getOrgByName } from "@common/api/admin/orgStruManage/index";

export default {
  name: "powerGenerationTransaction",
  props: {
    announcementInfo: { type: Object },
    fdtableList: { type: Array },
    sdtableList: { type: Array },
    unitMap: { type: Object }
  },
  data() {
    return {
      activeNames: ["1"],
      monthlyElectricity: "80000",
      isErr: false,
      listLoading: false,
      tableKey: 0,
     fdtableListData: this.fdtableList,
      sdtableListData: this.sdtableList,
      quotationSegmentOptionData: [],
      announcementInfoData: this.announcementInfo,
      form: {
        announcementInfo: "",
        customerId: "客户id",
        customerName: "客户名称",
        declarationElectricity: "申报电量/意向摘牌电量",
        declarationElectricityPrices: "申报电价/意向摘牌电价",
        detailId: "发电公司",
        //fdOrgName: "发电公司名称",
        schemeId: "方案表id",
        sdOrgId: "售电公司",
        sdOrgName: "售电公司名称",
        // sellTransfereeOrgId:'出/受让发电企业',
        // sellTransfereeOrgName:'出/受让发电企业名称',
        // sellTransfereeUnit:'出/受让机组',
        tradingClassificationName: "交易分类",
        tradingTypeName: "交易分类名称",
        tradingProduct: "产品/交易产品",
        tradingProductName: "产品/交易产品名称",
        tradingTypeCode: "交易类型",
        tradingTypeName: "交易类型名称",
        tradingUnitId: "交易单元",
        tradingUnitName: "交易单元名称",
        tradingVarietyCode: "交易品种",
        tradingVarietyName: "交易品种名称",
        transactionLine: "线路",
        transactionLineName: "线路名称",
        unit: "机组"
      },

      units:this.unitMap
    };
  },
  watch: {
    announcementInfo(val) {
      this.announcementInfoData = val;
    },
     fdtableList(val) {       
      this.fdtableListData = val;
    },
    sdtableList(val) {
      this.sdtableListData = val;
    }
  },
  created() {
    this.init();
  },
  computed: {
    ...mapGetters(["elements"])
  },
  methods: {
    init() {
      //this.addRow();
      // this.setQuotationSubsection();
    },
    //设置报价分段下拉选项
    // setQuotationSubsection() {
    //   this.quotationSegmentOptionData = [];
    //   let quotationSubsection = Number(
    //     this.announcementInfo.quotationSubsection
    //   );
    //   for (let i = 0; i < quotationSubsection; i++) {
    //     this.quotationSegmentOptionData.push(this.quotationSegmentOption[i]);
    //   }
    // },
    handleChange(val) {},
    
   // 复选框点击
    selsChange(val) {
      // let id = "";
      // let statusVal = [];
      // val.forEach(element => {
      //   id += "," + element.schemeId;
      // });
      // id = id.substring(1);
      // this.sels = id;
      this.$emit("callback",val);
    },

//合并行列
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      this.setViewsList();
      if (columnIndex === 4 || columnIndex === 11 || columnIndex === 0) {
        const _row_1 = this.mainIndex[rowIndex];
        const _col_1 = _row_1 > 0 ? 1 : 0; //如果被合并了_row=0则它这个列需要取消
        return {
          rowspan: _row_1,
          colspan: _col_1
        };
      }
    },
    setViewsList() {
      let listData = this.fdtableListData;

      this.mainIndex = [];
      this.mainIndexPos = 0;
      let isMainData = false;
      let arr = [];
      for (let i = 0, l = listData.length; i < l; i++) {
        if (i === 0) {
          arr.push(listData[i].fdOrgId);
          this.mainIndex.push(1);
          this.mainIndexPos = 0;
        } else {
          if (arr.indexOf(listData[i].fdOrgId) < 0) {
            arr.push(listData[i].fdOrgId);
            this.mainIndex.push(1);
            this.mainIndexPos = i;
          } else {
            this.mainIndex[this.mainIndexPos] += 1;
            this.mainIndex.push(0);
          }
        }
      }
      this.fdtableListData = listData;
    },
//合并行列
    objectSpanMethod1({ row, column, rowIndex, columnIndex }) {
      this.setViewsList1();
      if (columnIndex === 4 || columnIndex === 10 || columnIndex === 0) {
        const _row_1 = this.mainIndex[rowIndex];
        const _col_1 = _row_1 > 0 ? 1 : 0; //如果被合并了_row=0则它这个列需要取消
        return {
          rowspan: _row_1,
          colspan: _col_1
        };
      }
    },
    setViewsList1() {
      let listData = this.fdtableListData;

      this.mainIndex = [];
      this.mainIndexPos = 0;
      let isMainData = false;
      let arr = [];
      for (let i = 0, l = listData.length; i < l; i++) {
        if (i === 0) {
          arr.push(listData[i].fdOrgId);
          this.mainIndex.push(1);
          this.mainIndexPos = 0;
        } else {
          if (arr.indexOf(listData[i].fdOrgId) < 0) {
            arr.push(listData[i].fdOrgId);
            this.mainIndex.push(1);
            this.mainIndexPos = i;
          } else {
            this.mainIndex[this.mainIndexPos] += 1;
            this.mainIndex.push(0);
          }
        }
      }
      this.fdtableListData = listData;
    },
//合并行列
    objectSpanMethod2({ row, column, rowIndex, columnIndex }) {
      this.setViewsList2();
      if (columnIndex === 4 || columnIndex === 9 || columnIndex === 0) {
        const _row_1 = this.mainIndex[rowIndex];
        const _col_1 = _row_1 > 0 ? 1 : 0; //如果被合并了_row=0则它这个列需要取消
        return {
          rowspan: _row_1,
          colspan: _col_1
        };
      }
    },
    setViewsList2() {
      let listData = this.fdtableListData;

      this.mainIndex = [];
      this.mainIndexPos = 0;
      let isMainData = false;
      let arr = [];
      for (let i = 0, l = listData.length; i < l; i++) {
        if (i === 0) {
          arr.push(listData[i].fdOrgId);
          this.mainIndex.push(1);
          this.mainIndexPos = 0;
        } else {
          if (arr.indexOf(listData[i].fdOrgId) < 0) {
            arr.push(listData[i].fdOrgId);
            this.mainIndex.push(1);
            this.mainIndexPos = i;
          } else {
            this.mainIndex[this.mainIndexPos] += 1;
            this.mainIndex.push(0);
          }
        }
      }
      this.fdtableListData = listData;
    },
    //获取列表数据
    getListData(data) {      
      this.tableList = [];
      data.forEach(item => {
        item.declarationElectricityPricesStatus = ""; //申报电价
        item.tradingUnitIdStatus = ""; //交易电源
        item.quotationStallStatus = ""; //报价段
        item.declarationElectricityStatus = ""; //申报电量
        item.declarationElectricityStatusMsg = "";
        item.declarationElectricityPricesStatusMsg = "";
        item.tradingUnitIdStatusMsg = "";
        item.quotationStallStatusMsg = "";
        this.tableList.push(item);
      });
    },

    //初始化表格数据
    initTableData() {
      this.tableList = [];
      //this.addRow();
    },
    //设置表格数据
    setfdList(data) {
      //this.addRow();
      this.fdtableListData = data;
    }
  }
};
</script>

<style scoped>
.el-input.ddw1 {
  width: 50%;
}
.el-input input {
  text-align: right;
}
.el-select .el-input input {
  text-align: left;
}
.font {
  font-weight: bold;
  font-size: 25px;
}
.fontRed {
  font-weight: bold;
  color: #ff0000;
  font-size: 25px;
}
</style>





