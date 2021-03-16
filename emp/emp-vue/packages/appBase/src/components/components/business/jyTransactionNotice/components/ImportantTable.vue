<!--
 * @功能描述: #3262 交易管理 - 交易结果-发电 - 新增导入功能
 * @版本: 
 * @作者: qinhz
 * @Date: 2019-12-29 16:44:11
 * @最新修改内容: 
 * @LastEditTime: 2020-08-25 14:27:46
 -->
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
          :loading="createImportLoading"
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
      v-if="this.tradingVariety != 'jypz03'"
      border
      style="width: 100%"
      height="310px"
    >
      <el-table-column prop="index" label="序号" align="center" width="70px"></el-table-column>
      <el-table-column align="center" label="发电公司">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.fdOrgNameStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.fdOrgNameStatusMsg"
            placement="top"
          >
            <span :class="scope.row.fdOrgNameStatus">{{scope.row.fdOrgName}}</span>
          </el-tooltip>
          <span v-else>{{scope.row.fdOrgName}}</span>
        </template>
      </el-table-column>
       <el-table-column align="center" label="交易单元">
        <template slot-scope="scope">
          <span>{{scope.row.tradingUnitName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="线路">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.tradingLineNameStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.tradingLineNameStatusMsg"
            placement="top"
          >
            <span
              :class="scope.row.tradingLineNameStatus"
            >{{scope.row.tradingLineName}}</span>
          </el-tooltip>
          <span v-else>{{scope.row.tradingLineName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="客户名称">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.customerNameStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.customerNameStatusMsg"
            placement="top"
          >
            <span
              :class="scope.row.customerNameStatus"
            >{{scope.row.customerName}}</span>
          </el-tooltip>
          <span v-else>{{scope.row.customerName}}</span>
        </template>
      </el-table-column>
      <!-- 2020-06-04 #4151  qinhz 导入解析-交易结果-发电-交易品种为省内直接交易-新增购电侧交易单元字段 start-->
      <el-table-column align="center" v-if="this.tradingVariety == 'jypz01' && isShow" width="120px" label="购电侧交易单元">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.powerPurchaseUnitNameStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.powerPurchaseUnitNameStatusMsg"
            placement="top"
          >
            <span :class="scope.row.powerPurchaseUnitNameStatus">{{scope.row.powerPurchaseUnitName}}</span>
          </el-tooltip>
          <span v-else>{{scope.row.powerPurchaseUnitName}}</span>
        </template>
      </el-table-column>
      <!-- 2020-06-04 #4151  qinhz 导入解析-交易结果-发电-交易品种为省内直接交易-新增购电侧交易单元字段 end-->
      <el-table-column align="center" label="成交电量">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.dealElectricityStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.dealElectricityStatusMsg"
            placement="top"
          >
            <span
              :class="scope.row.dealElectricityStatus"
            >{{scope.row.dealElectricity}}</span>
          </el-tooltip>
          <span v-else>{{scope.row.dealElectricity}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="成交电价">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.dealPriceStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.dealPriceStatusMsg"
            placement="top"
          >
            <span
              :class="scope.row.dealPriceStatus"
            >{{scope.row.dealPrice}}</span>
          </el-tooltip>
          <span v-else>{{scope.row.dealPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="年份">
        <template slot-scope="scope">
          <span>{{scope.row.year}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="1月">
        <template slot-scope="scope">
          <span>{{scope.row.month1}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="2月">
        <template slot-scope="scope">
          <span>{{scope.row.month2}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="3月">
        <template slot-scope="scope">
          <span>{{scope.row.month3}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="4月">
        <template slot-scope="scope">
          <span>{{scope.row.month4}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="5月">
        <template slot-scope="scope">
          <span>{{scope.row.month5}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="6月">
        <template slot-scope="scope">
          <span>{{scope.row.month6}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="7月">
        <template slot-scope="scope">
          <span>{{scope.row.month7}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="8月">
        <template slot-scope="scope">
          <span>{{scope.row.month8}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="9月">
        <template slot-scope="scope">
          <span>{{scope.row.month9}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="10月">
        <template slot-scope="scope">
          <span>{{scope.row.month10}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="11月">
        <template slot-scope="scope">
          <span>{{scope.row.month11}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="12月">
        <template slot-scope="scope">
          <span>{{scope.row.month12}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="调整原因" v-if="isErrInfo">
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
      <el-table-column align="center" width="400px" label="数据异常原因" v-if="isErrInfo">
        <template slot-scope="scope">
          <span>{{scope.row.remark}}</span>
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="数据异常原因"   width="600px" v-if="isErrInfo">
          <template slot-scope="scope">
          <span>{{scope.row.remark}}</span>
        </template>
      </el-table-column>
    </el-table>
    
    <el-table
      class="input-table"
      :data="importTabList"
      v-if="this.tradingVariety == 'jypz03'"
      v-loading.body="importLoading"
      border
      style="width: 100%"
      height="310px"
    >
      <el-table-column prop="index" label="序号" align="center" width="70px"></el-table-column>
      <el-table-column align="center" label="交易分类">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.tradingVarietyNameStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.tradingVarietyNameStatusMsg"
            placement="top"
          >
            <span :class="scope.row.tradingVarietyNameStatus">{{scope.row.tradingVarietyName}}</span>
          </el-tooltip>
          <span v-else>{{scope.row.tradingVarietyName}}</span>
        </template>
      </el-table-column>
       <el-table-column align="center" label="类型" >
        <template slot-scope="scope">
          <div class="txt-left">
            {{scope.row.typeName}}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发电企业">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.fdOrgNameStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.fdOrgNameStatusMsg"
            placement="top"
          >
            <span
              :class="scope.row.fdOrgNameStatus"
            >{{scope.row.fdOrgName}}</span>
          </el-tooltip>
          <span v-else>{{scope.row.fdOrgName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="机组">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.unitNameStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.unitNameStatusMsg"
            placement="top"
          >
            <span
              :class="scope.row.unitNameStatus"
            >{{scope.row.unitName}}</span>
          </el-tooltip>
          <span v-else>{{scope.row.unitName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="产品">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.productNameStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.productNameStatusMsg"
            placement="top"
          >
            <span
              :class="scope.row.productNameStatus"
            >{{scope.row.productName}}</span>
          </el-tooltip>
          <span v-else>{{scope.row.productName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="出/受让发电企业">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.transOrgNameStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.transOrgNameStatusMsg"
            placement="top"
          >
            <span
              :class="scope.row.transOrgNameStatus"
            >{{scope.row.transOrgName}}</span>
          </el-tooltip>
          <span v-else>{{scope.row.transOrgName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="出/受让机组">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.transUnitNameStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.transUnitNameStatusMsg"
            placement="top"
          >
            <span :class="scope.row.transUnitNameStatus">{{scope.row.transUnitName}}</span>
          </el-tooltip>
          <span v-else>{{scope.row.transUnitName}}</span>
        </template>
      </el-table-column>
      <!-- #3580 2020-01-13 张亮三 增加用电企业字段 start -->
       <el-table-column align="center" label="用电企业">
        <template slot-scope="scope">
          <span >{{ scope.row.eleEnterpriseName }}</span>
        </template>
      </el-table-column>
      <!-- #3580 2020-01-13 张亮三 增加用电企业字段 end -->
      <el-table-column align="center" label="成交电量">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.dealElectricityStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.dealElectricityStatusMsg"
            placement="top"
          >
            <span :class="scope.row.dealElectricityStatus">{{scope.row.dealElectricity}}</span>
          </el-tooltip>
          <span v-else>{{scope.row.dealElectricity}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="成交电价">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.dealPriceStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.dealPriceStatusMsg"
            placement="top"
          >
            <span :class="scope.row.dealPriceStatus">{{scope.row.dealPrice}}</span>
          </el-tooltip>
          <span v-else>{{scope.row.dealPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="年份">
        <template slot-scope="scope">
          <span>{{scope.row.year}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="1月">
        <template slot-scope="scope">
          <span>{{scope.row.month1}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="2月">
        <template slot-scope="scope">
          <span>{{scope.row.month2}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="3月">
        <template slot-scope="scope">
          <span>{{scope.row.month3}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="4月">
        <template slot-scope="scope">
          <span>{{scope.row.month4}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="5月">
        <template slot-scope="scope">
          <span>{{scope.row.month5}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="6月">
        <template slot-scope="scope">
          <span>{{scope.row.month6}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="7月">
        <template slot-scope="scope">
          <span>{{scope.row.month7}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="8月">
        <template slot-scope="scope">
          <span>{{scope.row.month8}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="9月">
        <template slot-scope="scope">
          <span>{{scope.row.month9}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="10月">
        <template slot-scope="scope">
          <span>{{scope.row.month10}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="11月">
        <template slot-scope="scope">
          <span>{{scope.row.month11}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="12月">
        <template slot-scope="scope">
          <span>{{scope.row.month12}}</span>
        </template>
      </el-table-column>
     
      <el-table-column align="center"  width="600px" label="数据异常原因" v-if="isErrInfo">
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
  // importjyEleDeclareManage,
  getTradingEnter,
  exportDataErrData
} from "@common/api/business/jyTransactionNotice/index";
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
    resultId: {
      type: String
    },
    tradingVariety: {
      type: String
    },
    tradingWay: {
      type: String
    },
    mounthList: {
      type: Array
    },
    isShow: {
      type: Boolean
    },
  },
  data() {
    return {
      declarationType:"",
      templatePowerList: [],
      isErrInfo: false,
      importList: [],
      isverify:"0",
      importTotal: 0,
      importTableKey: 1,
      importTabList: [],
      importTableHeight: 0,
      importLoading: false,
      // num:0,
      importListQuery: {
        page: 1,
        limit: 20,
        description: "jyTransactionNotice",
        correct: "1"
      },
      contractForm: this.mainContractForm,
      dialogImport: false,
      unitMap:{},
      createImportLoading:false,
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
      parme.description = this.importListQuery.description;
      parme.correct = this.importListQuery.correct;
      parme.resultId = this.resultId;
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
          // if (this.importTabList!=null&&this.importTabList.length>0) {
          // this.isverify=this.importTabList[0].isverify;
            
          // }
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
      exportDataErrData("jyTransactionNotice", this.resultId);
    },
    //保存导入
    createImport(type) {
      // #3932 按钮不可重复点击 fengzp 2020-0423 
      this.createImportLoading = true;
      let parame = {};
      parame.description = "jyTransactionNotice";
      parame.resultId = this.resultId;
      getTradingEnter(parame).then(res => {
        if (res.rel) {
          this.$emit("setImportState", type);
          this.getImportList();
          this.$notify({
            title: "成功",
            message: res.msg,
            type: "success",
            duration: 1000,
            onClose:()=>{
              this.createImportLoading = false;
            }

          });
        } else {
          this.getImportList();

          this.$notify({
            title: "失败",
            message: res.msg,
            type: "warning",
            duration: 1000,
            onClose:()=>{
              this.createImportLoading = false;
            }

          });
        }
      });
    },

    initList(flag, isErrInfo, resultId,declarationType) {
      this.isErrInfo = isErrInfo;
      // this.importTabList = [];
      // this.importList = [];
      // this.importTotal = 0;
      // this.num = num;
      this.importListQuery.correct = flag;
      this.getImportList(this.importListQuery.correct);
    },
    //清空列表
    removeList() {
      this.importTabList = [];
      this.importList = [];
      this.importTotal = 0;
      // this.num = 0;
    }
  }
};
</script>
