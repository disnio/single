
<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container f-ml10 f-mt10">
      <el-form lass="demo-form-inline"  :inline="true" :model="listQuery">
        <el-form-item label="交易序列名称" label-width="100px" algin="right">
          <!-- </el-select>  -->
          <el-input v-model="listQuery['noticeName']"></el-input>
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
          <!--2019-11-3 #2454 张朋 交易周期和交易期次组件  -->
          <org-selectsTime ref="selectsTime" :selectWidth="selectWidth"  @selectTime="selectTime" @tradeIssure="tradeIssure"></org-selectsTime>
        <!-- <el-form-item label="交易周期" label-width="70px" algin="right">
          <el-select
            class="four-col left"
            :clearable="true"
            v-model="listQuery['tradeCycleCode']"
            placeholder="请选择"
            @change="changeTradingCycle"
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
            v-if="listQuery['tradeCycleCode'] != 'jyzq01'
            &&listQuery['tradeCycleCode'] != 'jyzq02'
            &&listQuery['tradeCycleCode'] != 'jyzq03'
            &&listQuery['tradeCycleCode'] != 'jyzq04'
            &&listQuery['tradeCycleCode'] != 'jyzq05'"
            type="year"
            class="w180"
            :clearable="true"
            placeholder="选择年"
            disabled
          ></el-date-picker>
          <el-date-picker
            v-if="listQuery['tradeCycleCode'] == 'jyzq01'"
            v-model="tradeIssureData.yearData"
            type="year"
            class="w180"
            placeholder="选择年"
            :clearable="true"
            @change="setTradeIssure"
          ></el-date-picker>
          <el-date-picker
            v-if="listQuery['tradeCycleCode'] == 'jyzq02'"
            v-model="tradeIssureData.yearData"
            type="year"
            @change="setTradeIssure"
            style="width:90px;float:left;"
            placeholder="选择年"
            :clearable="true"
          ></el-date-picker>
          <el-date-picker
            @change="setTradeIssure"
            v-if="listQuery['tradeCycleCode'] == 'jyzq03'
            ||listQuery['tradeCycleCode'] == 'jyzq04'
            ||listQuery['tradeCycleCode'] == 'jyzq05'"
            v-model="tradeIssureData.monthData"
            type="month"
            placeholder="选择月"
            :clearable="true"
            class="w180"
          ></el-date-picker>

          <span v-if="listQuery['tradeCycleCode'] == 'jyzq02'" class="w60">
            <el-select
              @change="setTradeIssure"
              v-if="listQuery['tradeCycleCode'] == 'jyzq02'"
              style="width:60px;"
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
          </span>
        </el-form-item> -->

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
          <span>{{ scope.row.tradeCenterName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label=" 交易序列名称">
        <template slot-scope="scope">
          <span>{{ scope.row.noticeName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="140px" align="center" label="交易品种">
        <template slot-scope="scope">
          <span>{{ scope.row.tradeVarietyName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="140px" align="center" label="交易方式">
        <template slot-scope="scope">
          <span>{{ scope.row.tradeWayName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="140px" align="center" label="交易周期">
        <template slot-scope="scope">
          <span>{{ scope.row.tradeCycleName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="140px" align="center" label="期次">
        <template slot-scope="scope">
          <span>{{ scope.row.tradeIssure }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.stateName }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column width="200px" align="center" label="创建时间">
        <template slot-scope='scope'>
          <span>{{scope.row.crtTime}}</span>
        </template>
      </el-table-column>-->
      <el-table-column fixed="right" align="center" label="操作" width="150px">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="handleViews(scope.row)">审核</el-button>
        </template>
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

    <form-detail
      :dialogInfo="dialogInfo"
      :dialogStatus="dialogStatus"
      :quotationSegmentOption="quotationSegmentOption"
      :orgInfo="orgInfo"
      marketSubjectType="1"
      :tradingUnitOption="tradingUnitOption"
      :btns="btns"
      :pricingProposalOption="pricingProposalOption"
      @initList="initList"
      :unitMap="unitMap"
      ref="formDetail"
    ></form-detail>
  </div>
</template>
<script>
import {
  page,
  getPageList,
  getNewPageList,
  exportObj,
  getCurrentUserOrg,
  getTradingUnitByName,
  delInfoById,
  modifyInfo,
  putInfo
} from "@common/api/business/sellingSideOffer/sellinLlistingTransaction/index";
import { getTradeCenter } from "@common/api/contract/htTemplate/index";
import { getAllLinList } from "@common/api/basicData/TMdataTieLin/index";
import { getOrgById } from "@common/api/admin/orgStruManage/index";
import { parseTime,getUnitMap } from "@common/utils/index";
import { getSelectList } from "@common/api/base";
import { initLayout } from "@common/utils/init";
import { mapGetters } from "vuex";
export default {
  name: "sellingSideOfferAudit",
  components: {
    "form-detail": () => import("./components/FormDetail"),
     //2019-11-3 #2454 张朋 交易周期、期次组件路径
    "org-selectsTime": () => import("@common/components//orgSelectsTime"), 
  },
  data() {
    return {
      announcementInfo: {},
      transactionLineOption: [],
      //2019-11-3 #2454 张朋 交易周期下拉框宽度设定变量
      selectWidth:true,
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
      tradingUnitOption: [],
      quotationSegmentOption: [],
      dialogDetailtVisible: false,
      dialogStatus: "",

      btns: {
        // btn_cancelSubmit: false,
        // btn_edit: false,
        btn_reject: false,
        btn_pass: false,
        btn_export: false
      },
      unitMap:{}
    };
  },
  created() {
    //
    this.init();
    this.unitMap = getUnitMap(this.allSubMenus,this.unitMap);
   
  },
  computed: {
    ...mapGetters(["elements", "orgId","allSubMenus"])
  },
  methods: {
      /**
      * @方法名称: selectTime
      * @功能描述: 获取组件交易周期信息
      * @参数: 
      * @返回值: 
      * @作者: 
      * @Date: 2019-11-03 16:26:04
      * @最新修改内容: 
      * @LastEditTime: 
      */
    selectTime(id) {      
       if(id != null){
         //2019-11-4 #2454  张朋 交易周期字段替换
           this.listQuery.tradeCycleCode = id;
       }
    },
       /**
      * @方法名称: tradeIssure
      * @功能描述: 获取组件交易期次信息
      * @参数: 
      * @返回值: 
      * @作者: 
      * @Date: 2019-11-03 16:26:28
      * @最新修改内容: 
      * @LastEditTime: 
      */
       tradeIssure(id){
       if(typeof id == "undefined"){
           this.listQuery.tradeIssure = undefined;
       }else{
           this.listQuery.tradeIssure = id;
       }
     }, 
    init() {
      this.initList();
      this.setLayoutHeight();
      this.initSelects();
      this.initBtn();
    },
    //初始化按钮
    initBtn() {
      this.btns.btn_pass = this.elements["sellingSideOfferAudit:btn_pass"];
      this.btns.btn_reject = this.elements["sellingSideOfferAudit:btn_reject"];
      this.btns.btn_export = this.elements["sellingSideOfferAudit:btn_export"];
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
      getAllLinList().then(res => {
        if (res.rel) {
          this.transactionLineOption = res.data;
        }
      });
      //获取交易中心下拉框
      this.getTradeCenterData();
      this.getOrgInfo();
      getTradingUnitByName({ orgId: this.orgId }).then(res => {
        this.tradingUnitOption = res;
      });
    },
    getOrgInfo() {
      let parame = {};
      parame = this.orgId;
      getOrgById(parame).then(res => {
        this.orgInfo = res.data;
      });
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
      let parma = {};
      // parma.orgId = this.orgId;
      parma.marketSubjectType = "1";
      //parma.tradeWayCode = "jyfs03";
      for (let key in this.listQuery) {
        if (this.listQuery[key] != "") {
          parma[key] = this.listQuery[key];
        }
      }

      getNewPageList(parma).then(response => {
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
    //清空期次信息
    changeTradingCycle() {
      this.tradeIssureData = {
        quarter: "",
        monthData: "",
        yearData: ""
      };
      this.setTradeIssure();
    },

    //设置期次信息
    setTradeIssure(val) {
      if (val != null && val != undefined) {
        if (this.listQuery.tradeCycleCode == "jyzq01") {
          if (this.tradeIssureData.yearData != null) {
            this.listQuery.tradeIssure = parseTime(
              this.tradeIssureData.yearData,
              "{y}"
            );
          }
        } else if (this.listQuery.tradeCycleCode == "jyzq02") {
          if (this.tradeIssureData.yearData != null) {
            this.listQuery.tradeIssure =
              parseTime(this.tradeIssureData.yearData, "{y}") +
              "-" +
              this.tradeIssureData.quarter;
          }
        } else if (
          this.listQuery.tradeCycleCode == "jyzq03" ||
          this.listQuery.tradeCycleCode == "jyzq04" ||
          this.listQuery.tradeCycleCode == "jyzq05"
        ) {
          if (this.tradeIssureData.monthData != null) {
            this.listQuery.tradeIssure = parseTime(
              this.tradeIssureData.monthData,
              "{y}-{m}"
            );
          }
        }
      } else {
        this.listQuery.tradeIssure = "";
      }
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
      this.$refs.formDetail.showDialog(row);
    },
    //取消提交
    cancelSubmit(row) {
      row.stateCode = "11";
      putInfo(row, row.schemeId)
        .then(res => {
          if (res.rel) {
            this.getList();
            this.$notify({
              title: res.msg,
              message: res.msg,
              type: "success",
              duration: 2000
            });
          } else {
            this.$notify({
              title: res.msg,
              message: res.msg,
              type: "warning",
              duration: 2000
            });
          }
        })
        .catch(function(error) {
          console.log("发生错误！", error);
        });
    },
    //删除
    cancelDel(row) {
      delInfoById(row.schemeId)
        .then(res => {
          if (res.rel) {
            this.getList();
            this.$notify({
              title: res.msg,
              message: res.msg,
              type: "success",
              duration: 2000
            });
          } else {
            this.$notify({
              title: res.msg,
              message: res.msg,
              type: "warning",
              duration: 2000
            });
          }
        })
        .catch(function(error) {
          console.log("发生错误！", error);
        });
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
      this.$refs.formDetail.showEditDialog(row);
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
      this.$refs.formDetail.showViewsDialog(row);
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
      if (this.listQuery.tradeIssure != "") {
        parme.tradeIssure = this.listQuery.tradeIssure;
      }
      if (this.listQuery.tradeCycleCode != "") {
        parme.tradeCycleCode = this.listQuery.tradeCycleCode;
      }
      if (this.listQuery.tradeVarietyCode != "") {
        parme.tradeVarietyCode = this.listQuery.tradeVarietyCode;
      }
      if (this.listQuery.noticeName != "") {
        parme.noticeName = this.listQuery.noticeName;
      }
      if (
        this.listQuery.tradeCycleCode != "" &&
        this.listQuery.tradeCycleCode != undefined
      ) {
        parme.tradeCycleCode = this.listQuery.tradeCycleCode;
      }
      // parme.tradeWayCode = "jyfs03";
      parme.marketSubjectType = "1";
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
.w60 ::v-deep .el-input {
  width: 60px !important;
}
.filter-container ::v-deep .filter-item {
    margin-bottom: -8px!important;
}
</style>


