<template>
  <div class="app-container calendar-list-container">
    <div class="txt-right">单位：{{unitMap["electricityUnit"]}}</div>
    <div class="mb10">
      <el-button-group>
        <el-button
          v-if="dataType=='success'&&this.isverify=='0'"
          class="filter-item"
          @click="createImport('0')"
          type="primary"
          icon="el-icon-upload"
        >确认入库</el-button>
        <el-button
          v-if="dataType=='err'"
          class="filter-item"
          @click="exportData"
          type="primary"
          icon="el-icon-upload"
        >导出数据</el-button>
      </el-button-group>
    </div>
    <el-table
      class="input-table"
      :data="importTabList"
      v-loading.body="importLoading"
      border
      style="width: 100%"
      height="310px"
    >
      <el-table-column prop="index" label="序号" align="center" width="70px"></el-table-column>
      <el-table-column align="center" label="客户名称">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.customerNameStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.customerNameStatusMsg"
            placement="top"
          >
            <span :class="scope.row.customerNameStatus">{{scope.row.customerName}}</span>
          </el-tooltip>
          <span v-else>{{scope.row.customerName}}</span>
        </template>
      </el-table-column>
      <!-- 20191125 #2767 wangc  新增户表号字段 start -->
       <el-table-column v-if="this.declarationType=='0'" align="center" label="户表号" >
        <template slot-scope="scope">
          <div class="txt-left">
            <!-- 2019年11月20日19:40:17 李志佳 #2741 查看不可点 start-->
            {{scope.row.meterNumber}}
          </div>
        </template>
      </el-table-column>
        <!-- 20191125 #2767 wangc  新增户表号字段 end -->
      <el-table-column align="center" label="上年同期实际用电量">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.lastYearActualElectricityStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.lastYearActualElectricityStatusMsg"
            placement="top"
          >
            <span
              :class="scope.row.lastYearActualElectricityStatus"
            >{{scope.row.lastYearActualElectricity}}</span>
          </el-tooltip>
          <span v-else>{{scope.row.lastYearActualElectricity}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="本期合同电量">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.thisPeriodContractElectricityStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.thisPeriodContractElectricityStatusMsg"
            placement="top"
          >
            <span
              :class="scope.row.thisPeriodContractElectricityStatus"
            >{{scope.row.thisPeriodContractElectricity}}</span>
          </el-tooltip>
          <span v-else>{{scope.row.thisPeriodContractElectricity}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="本月申报电量">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.declarationElectricityStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.declarationElectricityStatusMsg"
            placement="top"
          >
            <span
              :class="scope.row.declarationElectricityStatus"
            >{{scope.row.declarationElectricity}}</span>
          </el-tooltip>
          <span v-else>{{scope.row.declarationElectricity}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="年度双边分解电量">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.yearDecomposeElectricityStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.yearDecomposeElectricityStatusMsg"
            placement="top"
          >
            <span
              :class="scope.row.yearDecomposeElectricityStatus"
            >{{scope.row.yearDecomposeElectricity}}</span>
          </el-tooltip>
          <span v-else>{{scope.row.yearDecomposeElectricity}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" v-if="this.isDlsbGD==false" label="月度缩减电量">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.monthDecrementStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.monthDecrementStatusMsg"
            placement="top"
          >
            <span :class="scope.row.monthDecrementStatus">{{scope.row.monthDecrement}}</span>
          </el-tooltip>
          <span v-else>{{scope.row.monthDecrement}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" v-if="this.isDlsbGD==false" label="月度双边电量">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.monthBilateralPowerStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.monthBilateralPowerStatusMsg"
            placement="top"
          >
            <span :class="scope.row.monthBilateralPowerStatus">{{scope.row.monthBilateralPower}}</span>
          </el-tooltip>
          <span v-else>{{scope.row.monthBilateralPower}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="月度竞价电量">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.monthBiddingVolumeStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.monthBiddingVolumeStatusMsg"
            placement="top"
          >
            <span :class="scope.row.monthBiddingVolumeStatus">{{scope.row.monthBiddingVolume}}</span>
          </el-tooltip>
          <span v-else>{{scope.row.monthBiddingVolume}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" v-if="this.isDlsbGD==false" label="光伏电量">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.gfdlStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.gfdlStatusMsg"
            placement="top"
          >
            <span :class="scope.row.gfdlStatus">{{scope.row.gfdl}}</span>
          </el-tooltip>
          <span v-else>{{scope.row.gfdl}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="调整电量">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.adjustElectricityStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.adjustElectricityStatusMsg"
            placement="top"
          >
            <span :class="scope.row.adjustElectricityStatus">{{scope.row.adjustElectricity}}</span>
          </el-tooltip>
          <span v-else>{{scope.row.adjustElectricity}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="调整原因">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.adjustCauseStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.adjustCauseStatusMsg"
            placement="top"
          >
            <span :class="scope.row.adjustCauseStatus">{{scope.row.adjustCause}}</span>
          </el-tooltip>
          <span v-else>{{scope.row.adjustCause}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.descriptionStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.descriptionMsg"
            placement="top"
          >
            <span :class="scope.row.descriptionStatus">{{scope.row.description}}</span>
          </el-tooltip>
          <span v-else>{{scope.row.description}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="600px" label="数据异常原因" v-if="isErrInfo">
        <template slot-scope="scope">
          <span>{{scope.row.remark}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.stateNameStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.stateNameStatusMsg"
            placement="top"
          >
            <span :class="scope.row.stateNameStatus">{{scope.row.stateName}}</span>
          </el-tooltip>
          <span v-else>{{scope.row.stateName}}</span>
        </template>
    </el-table-column>-->

    <div class="pagination-container">
      <el-pagination
        @size-change="handleImportSizeChange"
        @current-change="handleImportCurrentChange"
        :current-page.sync="importListQuery.page"
        :page-size="importListQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="importTotal"
      ></el-pagination>
    </div>
  </div>
</template> 
<script>
import {
  getExceptpage,
  importjyEleDeclareManage,
  exportDataErrData
} from "@common/api/business/jyEleDeclareManage/index";
import { mapGetters } from "vuex";
import { parseTime, reverse, isNumber, excelDateToJSDate ,getUnitMap} from "@common/utils/index";
export default {
  name: "ImportantDialog",
  props: {
    dataType: {
      type: String
    },
    mainContractForm: {
      type: Object
    },
    declarationId: {
      type: String
    }
  },
  data() {
    return {
      //20191125 #2767 wangc  新增户表号字段 
      declarationType:"",
      isDlsbGD: false, // 申报电量是否广东模式
      // unit:"千千瓦时", // 电量单位，广东模式显示万千瓦时，否则为千千瓦时
      templatePowerList: [],
      isYearBilateElectric: false, //显示年度双边电量
      isYearLongtermElectric: false, //显示长协
      isMonthBidElectric: false, //显示月度竞价电量
      isFixDeprice: false, //显示固定降价/保底电价
      isCustomerProportion: false, //显示甲方分成比例
      isBottomElectricPrice: false, //显示保底降价/电价
      isFixDeprice2: false, //长协电量+竞价降价/电价
      isKwhCost: false, //度电费用
      isErrInfo: false,
      importList: [],
      isverify:"0",
      importTotal: 0,
      importTableKey: 1,
      importTabList: [],
      importTableHeight: 0,
      importLoading: false,
      importListQuery: {
        page: 1,
        limit: 20,
        fileType: "jyEleDeclareManage",
        iscorrect: "1"
      },
      contractForm: this.mainContractForm,
      dialogImport: false,
      importFomr: {
        contractTypeCode: "",
        saleContractTypeName: "",
        contractName: "",
        signingDate: "",
        beginDate: "",
        endDate: "",
        customerName: "",
        remarks: "",
        monthBidElectric: "",
        customerProportion: "",
        allowPosDevRatio: "",
        allowNegDevRatio: "",
        posDevRatio: "",
        negDevRatio: "",
        devAssessmentElecPriceWay: "",
        devAssessmentElecPrice: "",
        customerCompensateWay: "",
        customerCompensateValue: "",
        secondPartCompensateWay: "",
        secondPartCompensateValue: "",
        additionalClauseText: "",
        description:""
      },
      unitMap:{}
    };
  },
  watch: {
    mainContractForm: {
      handler(newVal, oldVal) {
        this.contractForm = newVal;
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
    this.getImportList();
  },
  computed: {
    ...mapGetters(["elements","allSubMenus"])
  },
  methods: {
    // 获取导入列表数据
    getImportList() {
      let parme = {};
      parme.page = this.importListQuery.page;
      parme.limit = this.importListQuery.limit;
      parme.fileType = this.importListQuery.fileType;
      parme.iscorrect = this.importListQuery.iscorrect;
      parme.declarationId = this.declarationId;
      getExceptpage(parme).then(response => {
        this.importLoading = false;
        if (response.status == "200") {
          if (response.data.total != "0") {
            let items = response.data.rows.map((item, index) => {
              item.index =
                index +
                1 +
                (this.importListQuery.page - 1) * this.importListQuery.limit;
              return item;
            });
          }
          this.importTabList = response.data.rows;
          if (this.importTabList!=null&&this.importTabList.length>0) {
          this.isverify=this.importTabList[0].isverify;
            
          }
          this.importTotal = response.data.total;
        } else {
          console.log(response);
        }
      });
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
    },
    reSetImportList() {
      this.importList.forEach(item => {
        for (let key in item) {
          item[key + "Status"] = "";
          item[key + "StatusMsg"] = "";
        }
      });
    },
    //导出异常数据
    exportData() {
      // console.log("customerPage")
      exportDataErrData("jyEleDeclareManage", this.declarationId,"customerPage");
    },
    //保存导入
    createImport(type) {
      let parame = {};
      parame.type = "jyEleDeclareManage";
      parame.declarationId = this.declarationId;
      importjyEleDeclareManage(parame).then(res => {        
        if (res.rel) {
          this.$emit("setImportState", type);
          this.getImportList();

          this.$notify({
            title: "成功",
            message: res.msg,
            type: "success",
            duration: 2000
          });
        } else {
          this.getImportList();

          this.$notify({
            title: "失败",
            message: res.msg,
            type: "warning",
            duration: 2000
          });
        }
      });
    },
    setShowCols() {
      this.isYearBilateElectric = false;
      this.isMonthBidElectric = false;
      this.isFixDeprice = false;
      this.isCustomerProportion = false;
      this.isBottomElectricPrice = false;
      this.isKwhCost = false; //度电费用
      this.isFixDeprice2 = false; //显示保底降价/电价
      let saleContractType = this.contractForm.saleContractType;
      if (
        saleContractType == "sdhtlx01" ||
        saleContractType == "sdhtlx04" ||
        saleContractType == "sdhtlx05"
      ) {
        this.isYearBilateElectric = true; //年度双边电量
        this.isFixDeprice = true; //显示固定降价/保底电价
      }

      if (
        saleContractType == "sdhtlx02" ||
        saleContractType == "sdhtlx03" ||
        saleContractType == "sdhtlx04" ||
        saleContractType == "sdhtlx05" ||
        saleContractType == "sdhtlx08"
      ) {
        this.isMonthBidElectric = true; //显示月度竞价电量
        this.isCustomerProportion = true; //显示甲方分成比例
      }

      if (
        saleContractType == "sdhtlx03" ||
        saleContractType == "sdhtlx04" ||
        saleContractType == "sdhtlx05"
      ) {
        this.isBottomElectricPrice = true; //显示保底降价/电价 
      }
      if (saleContractType == "sdhtlx08") {
        this.isFixDeprice2 = true; //显示保底降价/电价
      }
      if (saleContractType == "sdhtlx06") {
        this.isKwhCost = true; //度电费用
      }
      if (saleContractType == "sdhtlx06") {
        this.isYearLongtermElectric = true; //年度长协
      }
    },

    initList(flag, isErrInfo, declarationId,isDlsbGD,declarationType) {
      //20191125 #2767 wangc  判断户表号状态
      this.declarationType = declarationType;
      this.isDlsbGD = isDlsbGD;
      if(this.isDlsbGD){
        // this.unit = "万千瓦时";
      }
      this.isErrInfo = isErrInfo;
      this.importTabList = [];
      this.importList = [];
      this.importTotal = 0;
      this.importListQuery.iscorrect = flag;
      this.getImportList(this.importListQuery.iscorrect);
    }
  }
};
</script>
