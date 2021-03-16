<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form class="form-inline-168" :inline="true" :model="listQuery">
        <el-form-item label="交易序列名称" algin="right">
          <el-input class="filter-item" v-model="listQuery['noticeName']" :clearable="true"></el-input>
        </el-form-item>

        <el-form-item label="交易品种">
          <el-select
            class="four-col left"
            :clearable="true"
            v-model="listQuery['tradeVarietyCode']"
            placeholder="请选择"
          >
            <el-option
              v-for="item in varietyOptions"
              :key="item.propCode"
              :label="item.propName"
              :value="item.propCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易周期" label-width="70px" algin="right">
          <el-select
            class="four-col left"
            :clearable="true"
            v-model="listQuery['tradeCycleCode']"
            placeholder="请选择"
          >
            <el-option
              v-for="item in periodOptions"
              :key="item.propCode"
              :label="item.propName"
              :value="item.propCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易期次">
          <el-date-picker
            v-if="listQuery['tradeCycleCode']!='jyzq01'&&listQuery['tradeCycleCode']!='jyzq02'&&listQuery['tradeCycleCode']!='jyzq03'"
            type="year"
            class="w180"
            :clearable="true"
            placeholder="选择期次"
            disabled
          ></el-date-picker>
          <el-date-picker
            v-if="listQuery['tradeCycleCode']=='jyzq01'"
            v-model="tradeIssureData.yearData"
            type="year"
            class="w180"
            placeholder="选择年"
            :clearable="true"
            @change="setTradeIssure"
          ></el-date-picker>
          <el-date-picker
            v-if="listQuery['tradeCycleCode']=='jyzq02'"
            v-model="tradeIssureData.yearData"
            type="year"
            @change="setTradeIssure"
            style="width:100px"
            placeholder="选择年"
            :clearable="true"
          ></el-date-picker>
          <el-date-picker
            @change="setTradeIssure"
            v-if="listQuery['tradeCycleCode']=='jyzq03'"
            v-model="tradeIssureData.monthData"
            type="month"
            placeholder="选择月"
            :clearable="true"
            class="w180"
          ></el-date-picker>

          <el-select
            @change="setTradeIssure"
            v-if="listQuery['tradeCycleCode']=='jyzq02'"
            style="width:60px"
            :clearable="true"
            v-model="tradeIssureData.quarter"
            placeholder="季度"
          >
            <el-option
              v-for="item in quarterOptions"
              :key="item.propCode"
              :label="item.propName"
              :value="item.propCode"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-button
          class="filter-item"
          type="primary"
          v-waves
          icon="el-icon-search"
          @click="handleFilter"
        >查询</el-button>
      </el-form>
    </div>
    <el-button-group class="f-mb10">
      <el-button
        v-if="btns.btn_export"
        type="primary"
        icon="el-icon-upload"
        @click="handleExport"
      >导出</el-button>
    </el-button-group>
    <!-- <div class="txt-right unit-info">单位:mwh</div> -->
    <el-table
      :key="tableKey"
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
      :height="tabHeight"
    >
      <!-- <el-table-column align="center" width="55" type="selection"> 
      </el-table-column>-->
      <el-table-column prop="index" label="序号" align="center" width="70px"></el-table-column>
      <el-table-column align="center" label="交易中心">
        <template slot-scope="scope">
          <span>{{scope.row.tradeCenterName}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="交易序列名称">
        <template slot-scope="scope">
          <span>{{scope.row.noticeName}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="交易品种">
        <template slot-scope="scope">
          <span>{{scope.row.tradeVarietyName}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="交易方式">
        <template slot-scope="scope">
          <span>{{scope.row.tradeWayName}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="交易周期">
        <template slot-scope="scope">
          <span>{{scope.row.tradeCycleName}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="期次">
        <template slot-scope="scope">
          <span>{{scope.row.tradeIssure}}</span>
        </template>
      </el-table-column>

      <el-table-column  align="center" label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.stateName}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="220px">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="text"
            v-if="typeof scope.row.stateName!='undefined'"
            @click="handleViews(scope.row)"
          >查看</el-button>
          <el-button
            v-if="btns.btn_add&&(scope.row.stateName==''|| typeof scope.row.stateName=='undefined')"
            size="small"
            type="text"
            @click="handleCreate(scope.row)"
          >创建方案</el-button>
          <el-button
            v-if="btns.btn_edit&&(scope.row.stateCode=='11'||scope.row.stateCode=='7')"
            size="small"
            type="text"
            @click="handleUpdate(scope.row)"
          >编辑方案</el-button>

          <el-button
            v-if="btns.btn_edit&&(scope.row.stateCode=='11'||scope.row.stateCode=='7')"
            size="small"
            type="text"
            @click="handleDelete(scope.row)"
          >删除方案</el-button>

          <el-button
            v-if="btns.btn_cancelSubmit&&scope.row.stateCode=='3'"
            size="small"
            type="text"
            @click="cancelSubmit(scope.row)"
          >取消提交</el-button>
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

    <form-dialog
      :dialogInfo="dialogInfo"
      :dialogStatus="dialogStatus"
      :quotationSegmentOption="quotationSegmentOption"
      :orgInfo="orgInfo"
      :btns="btns"
      :tradingProductsOption="tradingProductsOption"
      :assignmentTypeOption="assignmentTypeOption"
      :transactionClassifyOption="transactionClassifyOption"
      :pricingProposalOption="pricingProposalOption"
      @initList="initList"
      ref="formDetail"
    ></form-dialog>
  </div>
</template>
<script>
import {
  page,
  getPageList,
  exportObj,
  getCurrentUserOrg,
  modifyInfo,
  getDetailListBySchemeId,
  getTradingUnitByName,
  delObj
} from "@common/api/business/powerSideOffer/centralizedBidding/index";
import { getTradeCenter } from "@common/api/contract/htTemplate/index";
import { getOrgById } from "@common/api/admin/orgStruManage/index";
import { parseTime } from "@common/utils/index";
import { getSelectList } from "@common/api/base";
import { initLayout } from "@common/utils/init";
import { mapGetters } from "vuex";
export default {
  name: "bilateralConsultation",
  components: {
    "form-dialog": () => import("./components/FormDialog")
  },
  data() {
    return {
      announcementInfo: {},
      tradeIssureData: {
        quarter: "",
        monthData: "",
        yearData: ""
      },
      orgInfo: null,
      dialogInfo: {
        btnSave: true,
        btnSubmit: true,
        notEdit: false,
        status: "add",
        title: "新增"
      },
      listLoading: false,
      list: [],
      tableKey: 0,
      listQuery: {
        tradeIssure: "",
        noticeName: "",
        tradeVarietyCode: "",
        tradeCycleCode: "",
        page: 1,
        limit: 10
      },
      schemeId: "",
      varietyOptions: [],
      wayOptions: [],
      periodOptions: [],
      quarterOptions: [],
      pricingProposalOption: [],
      centerOptions: [],
      tabHeight: "",
      total: null,
      quotationSegmentOption: [],
      dialogDetailtVisible: false,
      dialogStatus: "",

      btns: {
        btn_cancelSubmit: false,
        btn_edit: false,
        btn_del: false,
        btn_add: false,
        btn_export: false
      },
      assignmentTypeOption: [],
      transactionClassifyOption: [],
      tradingProductsOption: [],
      
    };
  },
  created() {
    //
    this.init();
  },
  computed: {
    ...mapGetters(["elements", "orgId"])
  },
  methods: {
    init() {
      this.initList();
      this.setLayoutHeight();
      this.initSelects();
      this.initBtn();
    },
    //初始化按钮
    initBtn() {
      this.btns.btn_cancelSubmit = this.elements[
        "sdBilateralConsultation:btn_cancelSubmit"
      ];
      this.btns.btn_edit = this.elements["sdBilateralConsultation:btn_edit"];
      this.btns.btn_del = this.elements["sdBilateralConsultation:btn_del"];
      this.btns.btn_add = this.elements["sdBilateralConsultation:btn_add"];
      this.btns.btn_export = this.elements["sdBilateralConsultation:btn_export"];
    },
    setLayoutHeight() {
      this.tabHeight = initLayout() - 210;
    },
    //初始化下拉选项
    initSelects() {
      //交易品种
      getSelectList("transactions_variety").then(res => {
        this.varietyOptions = res;
      });
      //交易方式
      getSelectList("transaction_mode").then(res => {
        this.wayOptions = res;
      });
      //交易周期
      getSelectList("transaction_period").then(res => {
        this.periodOptions = res;
      });
      //交易季度
      getSelectList("quarter").then(res => {
        this.quarterOptions = res;
      });
      //交易季度
      getSelectList("Quotation_segment").then(res => {
        this.quotationSegmentOption = res;
      });
      //方案信息
      getSelectList("Pricing_proposal").then(res => {
        this.pricingProposalOption = res;
      });
      //获取交易中心下拉框
      this.getTradeCenterData();
      this.getOrgInfo();
      // getTradingUnitByName({ orgId: this.orgId }).then(res => {
      //   this.tradingUnitOption = res;
      // });

      getSelectList("Exit/Assignment_Type").then(res => {
        this.assignmentTypeOption = res;
      });
      getSelectList("Transaction_classify").then(res => {
        this.transactionClassifyOption = res;
      });
      getSelectList("Trading_products").then(res => {
        this.tradingProductsOption = res;
      });
     
      
    },
    getOrgInfo() {
      let parame = {};
      parame = this.orgId;
      getOrgById(parame).then(res => {
        this.orgInfo = res.data;
      });
    },
    //取消提交
    cancelSubmit(row) {
      let parame = {};
      parame.stateCode = "11";
      parame.schemeId = row.schemeId;
      modifyInfo(parame)
        .then(res => {
          this.setRequestInfo(res);
        })
        .catch(function(error) {
          console.log("发生错误！", error);
        });
    },
    //设置提交返回信息
    setRequestInfo(res) {
      this.saveLoading = false;
      if (res.rel) {
        this.dialogVisible = false;
        this.$notify({
          title: res.msg,
          message: res.msg,
          type: "success",
          duration: 2000
        });
        this.initList();
      } else {
        this.$notify({
          title: res.msg,
          message: res.msg,
          type: "warning",
          duration: 2000
        });
      }
    },
    initList() {
      this.listQuery = {
        tradeIssure: "",
        tradingCenterId: "",
        tradingVarietyCode: "",
        tradingCycleCode: "",
        page: 1,
        limit: 10
      };
      this.getList();
    },
    //获取交易中心下拉框
    getTradeCenterData() {
      let parame = {
        orgId: this.orgId
      };
      getTradeCenter(parame).then(res => {
        this.centerOptions = res;
      });
    },
    //获取列表
    getList() {
      this.listLoading = true;
      let parame = {};
      parame.orgId = this.orgId;
      parame.marketSubjectType = "1";
      parame.tradeWayCode = "jyfs01";
      for (let key in this.listQuery) {
        if (this.listQuery[key] != "") {
          parame[key] = this.listQuery[key];
        }
      }
      getPageList(parame).then(response => {
        if (response.status == 200) {
          this.list = [];
          if (response.data.total > 0) {
            let items = response.data.rows.map((item, index) => {
              item.index =
                index + 1 + (this.listQuery.page - 1) * this.listQuery.limit;
              return item;
            });
            this.list = items;
          }

          this.total = response.data.total;
          this.listLoading = false;
        }
      });
    },
    //设置期次信息
    setTradeIssure(val) {
      if(val!=null){

      
      if (this.listQuery.tradeCycleCode == "jyzq01") {
        this.listQuery.tradeIssure = parseTime(
          this.tradeIssureData.yearData,
          "{y}"
        );
      } else if (this.listQuery.tradeCycleCode == "jyzq02") {
        this.listQuery.tradeIssure =
          parseTime(this.tradeIssureData.yearData, "{y}") +
          "-" +
          this.tradeIssureData.quarter;
      } else if (this.listQuery.tradeCycleCode == "jyzq03") {
        this.listQuery.tradeIssure = parseTime(
          this.tradeIssureData.monthData,
          "{y}-{m}"
        );
      }
      }
    },
      //获取报价详情
    getDetailInfo(row) {
      let parame = {};
          parame.schemeId =row.schemeId;
      getDetailListBySchemeId(parame).then(res => {
        if (res.rel) {
           this.detailInfo = res.data;
          if( this.dialogInfo.status=="edit"){
            this.$refs.formDetail.showEditDialog(row,res.data);
          }else{
            this.$refs.formDetail.showViewsDialog(row,res.data);
          }
        } else {
        }
      });
    },
    //查询
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    //打开新增窗口
    handleCreate(row) {
      this.dialogInfo = {
        btnSave: true,
        btnSubmit: true,
        notEdit: false,
        status: "add",
        title: "新增报价方案"
      };
      this.detailInfo ={};
      
      this.$refs.formDetail.showDialog(row);
    },
    //删除方案
    handleDelete(row){
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delObj(row.schemeId).then(res=>{
          if(res.rel){
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success",
              duration: 2000
            });
            this.getList();
          }else {
            this.$notify({
              title: "提示",
              message: res.msg,
              type: "warning",
              duration: 2000
            });
          }
        })
      })
      
    },
    //初始化编辑
    handleUpdate(row) {
      this.dialogInfo = {
        btnSave: true,
        btnSubmit: true,
        notEdit: false,
        status: "edit",
        title: "修改报价方案"
      };
      this.getDetailInfo(row)
    },
    //初始化查看
    handleViews(row) {
      this.dialogInfo = {
        btnSave: false,
        btnSubmit: false,
        notEdit: true,
        status: "view",
        title: "查看报价方案"
      };
       this.getDetailInfo(row)
      
    },
    //获取所选id
    selsChange(val) {
      let id = "";
      val.forEach(element => {
        id += "," + element.jyTradingResultsId;
      });
      id = id.substring(1);
      this.sels = id;
    },
    //导出
    handleExport() {
      let parme = {};  
      parme.marketSubjectType = "1";
      parme.tradeWayCode = "jyfs01";
      if (this.listQuery.tradeIssure != "") {
        parme.tradeIssure = this.listQuery.tradeIssure;
      }
      if (this.listQuery.tradeCenterId != "") {
        parme.tradeCenterId = this.listQuery.tradeCenterId;
      }
      if (this.listQuery.tradeCycleCode != "") {
        parme.tradeCycleCode = this.listQuery.tradeCycleCode;
      }
      if (this.listQuery.tradeVarietyCode != "") {
        parme.tradeVarietyCode = this.listQuery.tradeVarietyCode;
      }
      exportObj(parme);
    },

    //变更每页条数
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    //分页操作
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    }
  }
};
</script>
<style lang="scss" scoped>
.w-half {
  width: 80px !important;
}
</style>


