<!--
 * @功能描述: 
 * @版本: 
 * @作者: frj
 * @Date: 2019-11-27 09:37:11
 * @最新修改内容: 
 * @LastEditTime: 2020-05-15 15:48:17
 -->
<template>
  <div class="app-container calendar-list-container" style="margin:0 10px;">
    <div v-if="this.getModelCode == 'DirectTradingOfPowerPlants'" class="filter-container">
      <el-form :inline="true" :model="listQuery">
        <el-row>
          <org-selects ref="orgSelects" @select="selectOrg" @initOrg="initOrg"></org-selects>
          <div style="padding-top:10px; display: inline-block;">
            <el-form-item label="时间">
              <el-date-picker
                style="width:160px"
                @change="changeBeginDate"
                v-model="listQuery.startDate"
                type="month"
                format="yyyy-MM"
                value-format="yyyy-MM"
                placeholder="开始日期"
              ></el-date-picker>
              <!-- <span>至</span>
              <el-date-picker
                style="width:160px"
                @change="changeEndDate"
                v-model="listQuery.endDate"
                type="date"
                placeholder="结束日期"
                :clearable="false"
              ></el-date-picker>-->
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                :disabled="disaQuery"
                v-waves
                icon="el-icon-search"
                @click="handleFilter"
              >查询</el-button>
              <el-button
                v-if="DirectTradingOfPowerPlants_btn_export"
                type="primary"
                icon="el-icon-upload"
                @click="handleExport"
              >导出</el-button>
              <el-button
                :disabled="disaHand"
                type="primary"
                icon="el-icon-upload"
                @click="showExecuteMsg"
              >计算</el-button>
            </el-form-item>
          </div>
        </el-row>
      </el-form>

      <!-- 通用表格组件 start -->
    </div>
    <div>
      <el-tabs style="heihght:600px" v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane
          v-if="this.getModelCode == 'DirectTradingOfPowerPlants'||         
          this.getModelCode == 'monthlyTotalDirectSigningChannelStatistics'"
          label="月度交易"
          name="first"
        >
          <MonthlyTransaction
            :temporaryTable="temporaryTable"
            :issueN="issueN"
            :orgIdN="orgIdN"
            :orgNameN="orgNameN"
            ref="MonthlyTransaction"
          ></MonthlyTransaction>
        </el-tab-pane>
        <el-tab-pane
          v-if="this.getModelCode == 'DirectTradingOfPowerPlants'||
          
          this.getModelCode == 'ySigningTable'"
          label="年度交易"
          name="second"
        >
          <YearlyTransaction
            :temporaryTable="temporaryTable"
            :issueN="issueN"
            :orgIdN="orgIdN"
            :orgNameN="orgNameN"
            ref="YearlyTransaction"
          ></YearlyTransaction>
        </el-tab-pane>
        <el-tab-pane
          v-if="this.getModelCode == 'DirectTradingOfPowerPlants'||
          this.getModelCode == 'yMSigningTable'"
          label="年度月度合计"
          name="third"
        >
          <CumulativeAnnualTransaction
            :temporaryTable="temporaryTable"
            :issueN="issueN"
            :orgIdN="orgIdN"
            :orgNameN="orgNameN"
            ref="CumulativeAnnualTransaction"
          ></CumulativeAnnualTransaction>
        </el-tab-pane>
      </el-tabs>
    </div>
    
    <!-- 等待进度组件 start -->
    <waiting-progress
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
      
    />
    <!-- 等待进度组件 end -->
  </div>
</template>

<script>
import {
  getSigningChannels,
  executeJob,
  jobStatus
} from "@common/api/business/transactionQuery/basicLedgerOfPowerPlant/index";
import { layoutInfo } from "@common/utils/init";
import { mapGetters } from "vuex";
import { getUnitMap, parseTime } from "@common/utils/index";
import MonthlyTransaction from "./components/MonthlyTransaction";
import YearlyTransaction from "./components/YearlyTransaction";
import CumulativeAnnualTransaction from "./components/CumulativeAnnualTransaction";

//引用区域和区域公司组件路径
import OrgSelects from "@common/components//orgSelectsListDc";
const CustomTable = () => import("@common/hnReport/components/CustomTable");
import {
  getPageProgress,
  setProgressState,
  initProgress,
  setProgressFinished,
  getRequesting
} from "@common/utils/waitingProgress";
import WaitingProgress from "@common/components/WaitingProgress";
export default {
  name: "DirectTradingOfPowerPlants",
  components: {
    MonthlyTransaction,
    YearlyTransaction,
    CumulativeAnnualTransaction,
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
      issueN: this.issue,
      orgIdN: this.orgId,
      orgNameN: this.orgName,
      getModelCode: "",
      disaHand: false,
      disaQuery: false,
      jobId: "",
      DirectTradingOfPowerPlants_btn_export: false, //导出权限
      disaHand: false,
      activeName: "first",
      listQuery: {
        orgId: "",
        startDate: "",
        jylx: "2",
        tradingCycleCodes: "0"
      },
      temporaryTable: [],
      attributeTypeCode: "",
      areacompanycode: "",
       progressInfo: {
        waitingTime: 5000, //请求间隔
        step: 5, //递增数值
        startTime: "", //开始请求时间
        isWaiting: false, // 是否显示等待
        type: "1",  //loading类型 1：计算 2，上传
        progressVal: 0, //进度
        jobId: ""   //计算id
      },
      listLoading:false,
      isRequesting:false,
    };
  },
  watch: {
    issue(val) {
      this.issueN = val;
    },
    orgId(val) {
      this.orgIdN = val;
    },
    orgName(val) {
      this.orgNameN = val;
    }
  },
  created() {
    this.getModelCode = sessionStorage.getItem("modelCode");
    // this.DirectTradingOfPowerPlants_btn_export = this.elements[
    //   "DirectTradingOfPowerPlants:btn_export"
    // ];
  },
  mounted() {
    if (
      this.getModelCode != "DirectTradingOfPowerPlants" &&
      this.getModelCode == "yMSigningTable"
    ) {
      this.activeName = "third";
      this.listQuery.jylx = "3";
      let param = {
        issue: this.issue,
        org_id: this.orgId,
        prop_name: this.orgName
      };
      sessionStorage.setItem("pageModelCode", "DirectTradingOfPowerPlants");
      this.showSubDialog(param);
    } else if (
      this.getModelCode != "DirectTradingOfPowerPlants" &&
      this.getModelCode == "ySigningTable"
    ) {
      this.activeName = "second";
      this.listQuery.jylx = "1";
      let param = {
        issue: this.issue,
        org_id: this.orgId,
        prop_name: this.orgName
      };
      this.showSubDialog(param);
      sessionStorage.setItem("pageModelCode", "DirectTradingOfPowerPlants");
    } else if (
      this.getModelCode != "DirectTradingOfPowerPlants" &&
      this.getModelCode == "monthlyTotalDirectSigningChannelStatistics"
    ) {
      this.activeName = "first";
      this.listQuery.jylx = "2";
      let param = {
        issue: this.issue,
        org_id: this.orgId,
        prop_name: this.orgName
      };
      this.showSubDialog(param);
      sessionStorage.setItem("pageModelCode", "DirectTradingOfPowerPlants");
    } else {
      //this.initOrg("","");
      this.initIssue();
    }
    // this.handleFilter();
    if (getPageProgress()) {
      this.progressInfo = setProgressState();
      this.jobId = this.progressInfo["jobId"];
     this.getJobStatus();
    }
  },
  methods: {
     /*
     * @功能描述: 提前关闭进度
     * @作者: 康如涛
     * @Date: 2020-04-26
     */
    closeProgress() {
      this.progressInfo.isWaiting = false;
      this.disaHand = false;
    },
    /*
     * @功能描述: 获取进度
     * @作者: 康如涛
     * @Date: 2020-04-26
     */
    getProgressState() {
      this.getJobStatus();
    },
    showSubDialog(data) {
      this.listQuery.orgId = data.org_id;
      this.listQuery.startDate = data.issue;
      this.getList();
    },
    //初始化页面期次信息 //20191223 阿彪 #3277 报表期次统一调整
    initIssue() {
      let nowTime = new Date();
      let d = nowTime.getDate();
      let ym = "";
      if (d > 5) {
        nowTime.setMonth(nowTime.getMonth() - 1);
        //2020-3-3 #3832 zhangp 判断计算之后的月份小于10时，在月份前添加0
         if(nowTime.getMonth() + 1 >= 10){
            ym = nowTime.getFullYear() + "-" +  (nowTime.getMonth() + 1);
        }else{
            ym = nowTime.getFullYear() + "-" + '0' +(nowTime.getMonth() + 1);
        }
      } else {
        nowTime.setMonth(nowTime.getMonth() - 2);
        if(nowTime.getMonth() + 1 >= 10){
            ym = nowTime.getFullYear() + "-" +  (nowTime.getMonth() + 1);
        }else{
            ym = nowTime.getFullYear() + "-" + '0' +(nowTime.getMonth() + 1);
        }
      }
      this.listQuery.startDate = ym;
    },
    handleClick(tab, event) {
      if (this.activeName == "first") {
        // this.$refs.MonthlyTransaction;
        this.listQuery.jylx = "2";
        this.getList();
      } else if (this.activeName == "second") {
        this.listQuery.jylx = "1";
        this.getList();
      } else if (this.activeName == "third") {
        this.listQuery.jylx = "3";
        this.getList();
      }
    },
    //设置查询条件中组织ID
    selectOrg(id, attributeTypeCode, areacompanycode) {
      this.listQuery.orgId = id;
      this.attributeTypeCode = attributeTypeCode;
      this.areacompanycode = areacompanycode;
      this.getList();
    },
    //按组织初始化列表
    initOrg(id, attributeTypeCode) {
      this.listQuery.orgId = id;
      this.attributeTypeCode = attributeTypeCode;
      //this.getList();
    },
    //变更开始时间
    changeBeginDate(val) {
      if (val != "" && val != undefined) {
        this.listQuery.startDate = parseTime(val, "{y}-{m}");
      } else {
        this.listQuery.startDate = "";
      }
    },
    /*
     * @功能描述: 获取计算状态
     * @param {String} jobId  汇总计算ID
     * @作者: 康如涛
     * @Date: 2019-12-5
     */
    getJobStatus() {
      let param = {
        id: this.jobId
      };
       if(this.jobId==""){ 
         this.disaHand = false;
         this.progressInfo = setProgressFinished();
        
      }else{
        let requestingInfo=getRequesting(this.progressInfo);
      if(requestingInfo.isRequesting&&!this.isRequesting){
        this.progressInfo=requestingInfo.progressInfo;
        this.isRequesting=true;
      jobStatus(param).then(res => {
        if (res.rel) {
          this.criteria = res.data;
          // if (res.data == "Running") {
          //   this.disaHand = true;
          //   this.$notify({
          //     // title: "失败",
          //     message: "计算中，请稍后...",
          //     type: "warning",
          //     duration: 2000
          //   });
          // } else {
          //   this.getList();
          //   this.jobId = "";
          //   this.disaHand = false;
          // }
           this.isRequesting=false;
          if (res.data == "Running") {
            this.progressInfo = setProgressState();
            this.disaHand = true;
          } else {
             this.progressInfo = setProgressFinished();
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
      }}
    },
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
    /**
     * @方法名称: handClickExecute
     * @功能描述: 计算报表信息
     * @参数:
     * @返回值:
     * @作者: frj
     * @issues:
     * @Date: 2019-12-17 14:29:40
     * @最新修改内容:
     * @LastEditTime:
     */
    handClickExecute() {
      this.disaHand = true;
      this.disaQuery = false;
      let param = {
        job: "/mkt/rpt/mkt_rpt_electricity_direct_transaction_detail",
        orgId: this.listQuery.orgId,
        issue: this.listQuery.startDate,
        yearOrMonth: this.listQuery.jylx
        // signingType: "0"
      };
      if (this.attributeTypeCode == "zzjgsx03") {
        param.orgtype = "QYGS";
      } else if (this.attributeTypeCode == "zzjgsx02") {
        param.orgtype = "DC";
      }
      if (this.areacompanycode != "") {
        param.areacompanycode = this.areacompanycode;
      }
      executeJob(param).then(res => {
        this.jobId = res.data;
         this.progressInfo = initProgress(this.progressInfo);
        this.progressInfo["jobId"] = this.jobId;
        this.$refs.waitingProgress.initProgress();
      });
    },
    handleFilter() {
      if (this.jobId == "") {
        this.getList();
      } else {
        this.getJobStatus();
      }
    },
    getList() {
      let parma = {
        orgId: this.listQuery.orgId,
        issue: this.listQuery.startDate,
        jylx: this.listQuery.jylx,
        signingType: "0"
        // orgId: "001005001002",
        // issue: "201910",
        // jylx: "3"
      };
      this.temporaryTable = [];
      //  if(this.attributeTypeCode=="zzjgsx03"){
      //    parma.areacompanycode=this.areacompanycode;
      //     parma.orgId="*";
      //   }else if(this.attributeTypeCode=="zzjgsx02"){
      //      parma.areacompanycode=this.areacompanycode;
      //   }
      getSigningChannels(parma).then(res => {
        if (res.rel) {
          this.temporaryTable = res.result;
        } else {
          this.temporaryTable = [];
          this.$notify({
            title: "失败",
            message: res.msg,
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
      // console.log(9);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-table__body td:nth-child(0),
.el-table__body td:nth-child(1),
.el-table__body td:nth-child(2) {
  background: #fff;
}
</style>