<!--
 * @功能描述: 
 * @版本: 
 * @作者: 李志佳
 * @Date: 2020-05-13 10:52:45
 * @最新修改内容: 
 * @LastEditTime: 2020-06-01 17:06:30
 -->
<template>
  <div class="app-container calendar-list-container">
    <div v-if="this.getModelCode =='yearLongAssociationAggregate'" class="filter-container">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline" ref="listQueryForm">
        <el-row>
          <org-selects ref="orgSelects" @select="selectOrg" @initOrg="initOrg"></org-selects>
          <el-form-item label="期次" algin="right">
            <el-date-picker
              @change="showExportChange"
              style="width:150px"
              v-model="listQuery.issue"
              type="year"
              :clearable="true"
              format="yyyy"
              value-format="yyyy"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :disabled="disaQuery"
              icon="el-icon-search"
              @click="handleFilter"
            >查询</el-button>
            <!-- <el-button
              :disabled="disaHand"
              type="primary"
              icon="el-icon-upload"
              @click="showExecuteMsg"
            >计算</el-button> -->
            <el-button :disabled="!showExport" @click="handleExport" type="primary" icon="el-icon-upload">导出</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <div class="txt-right unit-info">单位:{{unitMap.electricityUnit}}、{{unitMap.priceUnit}}</div>
    <div class="table-con">
      <custom-table
        ref="customTable"
        :resultTableData="resultTableData"
        :colWidth="150"
        :dataKeys="dataKeys"
        :rowspanKey="rowspanKey"
        :colspanKey="colspanKey"
      />
    </div>
    <!-- <waiting-progress
      ref="waitingProgress"
      :waitingTime="progressInfo.waitingTime"
      :startTime="progressInfo.startTime"
      :isWaiting="progressInfo.isWaiting"
      :type="progressInfo.type"
      :progressVal="progressInfo.progressVal"
      :isRequesting="isRequesting"
      @closeProgress="closeProgress"
      @getProgressState="getProgressState"
      @initData="getList"
      @startCalculate="handClickExecute"
    /> -->
  </div>
</template>

<script>
import {
  getPageProgress,
  setProgressState,
  initProgress,
  setProgressFinished,
  getRequesting
} from "@common/utils/waitingProgress";
import {
  jssummary1,
  exportSummary1
} from "@common/api/business/transactionQuery/yearLongAssociationAggregate/index";
import {
  executeJob,
  jobStatus
} from "@common/api/business/transactionQuery/basicLedgerOfPowerPlant/index";
import { getHomeUnit } from "@common/api/dashboard/index";
import { layoutInfo } from "@common/utils/init";
import { mapGetters } from "vuex";
import Cookies from "js-cookie";
import { getUnitMapByModelCode, getUnitMap } from "@common/utils/index";
import OrgSelects from "@common/components//orgSelectToSellsElectricity";
import { parseTime } from "@common/utils/index";
const CustomTable = () => import("./components/CustomTable");
import WaitingProgress from "@common/components/WaitingProgress";

export default {
  name: "yearLongAssociationAggregate",
  components: {
    CustomTable,
    OrgSelects,
    WaitingProgress
  },
  props: {
    issue: { type: String },
    orgId: { type: String },
    orgName: { type: String }
  },
  data() {
    return {
      showExport:false,
      issueN: this.issue,
      orgIdN: this.orgId,
      orgNameN: this.orgName,
      getModelCode: "",
      disaHand: false,
      disaQuery: false,
      jobId: "",
      newArr: [[]], //表头
      maxHeight: 1, //表头总共占的行数
      colKeyList: [], //所有的key
      reportData: [],
      tableData: [],
      scrollbarHeight: "",
      scrollbarWidth: "",
      tableRowSpan: [],
      newTableData: [], //新table数据
      listQuery: {
        issue: parseTime(new Date(), "{y}") //获取当前年
      },
      unitMap: {}, //单位
      rowspanKey: {
        orgName: { value: "all", state: true }, //售电公司名称
        idx3DealElectricity:{ value: "all", state: true }, 
        idx3TradeSpread:{ value: "all", state: true },
        tradeTopLimit:{ value: "all", state: true}
      },
      colspanKey: {},
      dataKeys: {
        orgName: "", //售电公司名称
        idx0CustomerName:"",
        idx0DealElectricity:"",
        idx0TradeSpread:"",
        idx1CustomerName:"",
        idx1DealElectricity:"",
        idx1TradeSpread:"",
        idx2CustomerName:"",
        idx2DealElectricity:"",
        idx2TradeSpread:"",
        idx3DealElectricity:"",
        idx3TradeSpread:"",
        tradeTopLimit:"",
      },
      periodOptions: [], //周期

      tableHeader: [],
      progressInfo: {
        waitingTime: 5000, //请求间隔
        step: 5, //递增数值
        startTime: "", //开始请求时间
        isWaiting: false, // 是否显示等待
        type: "1",  //loading类型 1：计算 2，上传
        progressVal: 0, //进度
        jobId: ""   //计算id
      },
      resultTableData: { tableHeader: [], result: [] }
    };
  },
  computed: {
    ...mapGetters(["layoutInfo", "allSubMenus"])
  },
  watch: {
    layoutInfo: {
      deep: true,
      handler: function(newVal, oldVal) {
        this.scrollbarHeight = newVal.height;
      }
    },
    issue(val) {
      this.issueN = val;
    }
  },
  created() {
    this.getModelCode = sessionStorage.getItem("modelCode");
  },
  mounted() {
    this.layout = this.layoutInfo;
    this.scrollbarHeight = this.layoutInfo.height;
    this.initJyData();
    if (this.getModelCode != "yearLongAssociationAggregate") {
      this.unitMap = getUnitMapByModelCode(
        this.allSubMenus,
        this.unitMap,
        "yearLongAssociationAggregate"
      );
      sessionStorage.setItem("pageModelCode", "yearLongAssociationAggregate");
      let param = {
        issue: this.issue,
        regional: this.orgId,
        province: this.orgName
      };
      this.showSubDialog(param);
    } else {
      this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
    }
    if (getPageProgress()) {
      this.progressInfo = setProgressState();
      this.jobId = this.progressInfo["jobId"];
     this.getJobStatus();
    }
  },
  methods: {
    showSubDialog(data) {
      this.listQuery.orgId = data.regional;
      this.listQuery.issue = data.issue;
      this.getList();
    },
    //按组织初始化列表
    initOrg(id) {
      this.listQuery.orgId = id;
    },
    //设置查询条件中组织ID
    selectOrg(id) {
      this.listQuery.orgId = id;
      this.showExport = false;
    },
    /**
     * @功能描述: 查询
     * @参数:
     * @返回值:
     * @作者: zhangp
     * @Date: 2019-03-05 9:59:59
     * @最新修改内容:
     * @LastEditTime:
     */
    handleFilter() {
      //查询方法
      if (this.jobId == "") {
        this.getList();
      } else {
        this.getJobStatus();
      }
    },
    getList() {
      if(!this.listQuery.issue||this.listQuery.orgId.length < 10){
        this.$notify({
          title: "提示",
          message: "请选择完整的查询条件",
          type: "warning",
          duration: 2000
        });
        return;
      }
      jssummary1(this.listQuery).then(res => {
        if (res.rel) {
          this.resultTableData["result"] = res.data;
        } else {
          this.$notify({
            title: "失败",
            message: res.msg,
            type: "warning",
            duration: 2000
          });
          this.resultTableData["result"] = [];
        }
          if(this.resultTableData["result"].length > 0){
          this.showExport = true
        }
        this.loading = false;
      });
    },
    showExportChange(){
      this.showExport = false;
    },
    /*
     * @功能描述:  初始交易台账数据
     * @作者: 康如涛
     * @Date: 2019-11-21
     */
    initJyData() {
      this.tableData = this.newTableData;
      this.tableHeader = [
        {
          col_name: "电厂名称",
          col_value: "orgName",
          fixed: "left"
        },
        {
          col_name: "电力用户",
          fixed: false,
          cols: [
            {
              col_name: "客户名称",
              col_value: "idx0CustomerName",
              fixed: false
            },
            {
              col_name: "成交电量",
              col_value: "idx0DealElectricity",
              fixed: false
            },
            {
              col_name: "成交价差 ",
              col_value: "idx0TradeSpread",
              fixed: false
            }
          ]
        },
        {
          col_name: "社会售电公司",
          fixed: false,
          cols: [
            {
              col_name: "客户名称",
              col_value: "idx1CustomerName",
              fixed: false
            },
            {
              col_name: "成交电量",
              col_value: "idx1DealElectricity",
              fixed: false
            },
            {
              col_name: "成交价差",
              col_value: "idx1TradeSpread",
              fixed: false
            }
          ]
        },
        {
          col_name: "能销公司",
          fixed: false,
          cols: [
            {
              col_name: "客户名称",
              col_value: "idx2CustomerName",
              fixed: false
            },
            {
              col_name: "成交电量",
              col_value: "idx2DealElectricity",
              fixed: false
            },
            {
              col_name: "成交价差",
              col_value: "idx2TradeSpread",
              fixed: false
            }
          ]
        },
        {
          col_name: "合计",
          fixed: false,
          cols: [
            {
              col_name: "成交电量",
              col_value: "idx3DealElectricity",
              fixed: false
            },
            {
              col_name: "成交价差",
              col_value: "idx3TradeSpread",
              fixed: false
            }
          ]
        },
        {
          col_name: "交易上限",
          col_value: "tradeTopLimit",
          fixed: false
        }
      ];

      this.resultTableData["result"] = this.tableData;
      this.resultTableData["tableHeader"] = this.tableHeader;
      this.resultTableData["rowspanKey"] = this.rowspanKey;
      this.resultTableData["colspanKey"] = this.colspanKey;
    },
    /**
     * @方法名称: handClickExecute
     * @功能描述: 计算报表信息
     * @参数:
     * @返回值:
     * @作者: zhangp
     * @issues:
     * @Date: 2019-02-26 10:29:40
     * @最新修改内容:
     * @LastEditTime:
     */
    // handClickExecute() {
    //   this.disaHand = true;
    //   this.disaQuery = false;
    //   let param = {
    //     job: "/mkt/rpt/mkt_rpt_sale_electricity_detail",
    //     issue: this.listQuery.issue
    //   };
    //   executeJob(param).then(res => {
    //     this.jobId = res.data;
    //   });
    // },
    /*
     * @功能描述: 显示计算提示
     */
    showExecuteMsg(){
     if (getPageProgress()) {
      this.progressInfo = setProgressState();
      this.jobId = this.progressInfo["jobId"];
     this.getJobStatus();
    }else{
      this.$refs.waitingProgress.showMsg();
    }
    },
    /*
     * @功能描述: 获取计算状态
     * @param {String} jobId  汇总计算ID
     * @作者: zhangp
     * @Date: 2020-2-26
     */
    getJobStatus() {
      let param = {
        id: this.jobId
      };
      jobStatus(param).then(res => {
        if (res.rel) {
          this.criteria = res.data;
          if (res.data == "Running") {
            this.disaHand = true;
          } else {
            this.getList();
            this.jobId = "";
            this.disaHand = false;
          }
        } else {
          this.$notify({
            title: "失败",
            message: "计算出错",
            type: "warning",
            duration: 2000
          });
        }
      });
    },
    /*
     * @功能描述: 导出数据
     * @作者: 康如涛
     * @Date: 2019-11-21
     */
    handleExport() {
       if(!this.listQuery.issue||this.listQuery.orgId.length < 10){
        this.$notify({
          title: "提示",
          message: "请选择完整的条件",
          type: "warning",
          duration: 2000
        });
        return;
      }
      let param = {
        orgId: this.listQuery.orgId,
        issue: this.listQuery.issue
      };
      exportSummary1(param);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
</style>



