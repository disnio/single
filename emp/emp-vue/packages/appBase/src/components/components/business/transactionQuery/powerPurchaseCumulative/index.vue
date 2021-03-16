<!--
 * @功能描述: 
 * @版本: 
 * @作者: frj
 * @Date: 2019-11-26 13:21:16
 * @最新修改内容: 
 * @LastEditTime: 2020-05-15 15:48:29
 -->
<template>
  <div class="app-container calendar-list-container" style="margin:0 10px;">
    <div v-if="this.getModelCode=='powerPurchaseCumulative'" class="filter-container">
      <el-form :inline="true" :model="listQuery">
        <el-row>
          <org-selects ref="orgSelects" @select="selectOrg" @initOrg="initOrg"></org-selects>
          <div style="padding-top:10px; display: inline-block;">
            <el-form-item label="时间">
              <el-date-picker
                style="width:160px"
                @change="changeBeginDate"
                v-model="listQuery.issue"
                type="month"
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
                v-if="powerPurchaseCumulative_btn_exportfa"
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
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane
          v-if="this.getModelCode=='powerPurchaseCumulative'||this.getModelCode == 'monthlyTotalDirectSigningChannelStatistics'"
          label="月度购电"
          name="first"
        >
          <MonthlyPurchasing
            :temporaryTable="temporaryTable"
            :issueN="issueN"
            :orgIdN="orgIdN"
            :orgNameN="orgNameN"
            ref="MonthlyPurchasing"
          ></MonthlyPurchasing>
        </el-tab-pane>
        <el-tab-pane
          v-if="this.getModelCode=='powerPurchaseCumulative'||this.getModelCode== 'ySigningTable'"
          label="年度购电"
          name="second"
        >
          <YearlyPurchasing
            :temporaryTable="temporaryTable"
            :issueN="issueN"
            :orgIdN="orgIdN"
            :orgNameN="orgNameN"
            ref="YearlyPurchasing"
          ></YearlyPurchasing>
        </el-tab-pane>
        <el-tab-pane
          v-if="this.getModelCode=='powerPurchaseCumulative'||this.getModelCode=='yMSigningTable'"
          label="年度月度合计"
          name="third"
        >
          <PurchasingPower
            :temporaryTable="temporaryTable"
            :issueN="issueN"
            :orgIdN="orgIdN"
            :orgNameN="orgNameN"
            ref="PurchasingPower"
          ></PurchasingPower>
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
import { parseTime } from "@common/utils/index";
import MonthlyPurchasing from "./components/MonthlyPurchasing";
import YearlyPurchasing from "./components/YearlyPurchasing";
import PurchasingPower from "./components/PurchasingPower";
//引用区域和区域公司组件路径
import OrgSelects from "@common/components//areaComSelectsList";
import {
  getPageProgress,
  setProgressState,
  initProgress,
  setProgressFinished,
  getRequesting
} from "@common/utils/waitingProgress";
import WaitingProgress from "@common/components/WaitingProgress";
export default {
  name: "powerPurchaseCumulative",
  components: {
    MonthlyPurchasing,
    YearlyPurchasing,
    PurchasingPower,
    OrgSelects,
    WaitingProgress
  },
  props: {
    issue: { type: String },
    orgId: { type: Number },
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
      powerPurchaseCumulative_btn_exportfa: false, //导出权限
      activeName: "first",
      listQuery: {
        orgId: "",
        issue: "",
        jylx: "2"
      },
      temporaryTable: [],
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
    // this.powerPurchaseCumulative_btn_export = this.elements[
    //   // "powerPurchaseCumulative:btn_export"
    // ];
  },
  mounted() {
    if (
      this.getModelCode != "powerPurchaseCumulative" &&
      this.getModelCode == "yMSigningTable"
    ) {
      this.activeName = "third";
      this.listQuery.jylx = "3";
      let param = {
        issue: this.issue,
        org_id: this.orgId,
        org_sname: this.orgName
      };
      this.showSubDialog(param);
      sessionStorage.setItem("pageModelCode", "powerPurchaseCumulative");
    } else if (
      this.getModelCode != "powerPurchaseCumulative" &&
      this.getModelCode == "ySigningTable"
    ) {
      this.activeName = "second";
      this.listQuery.jylx = "1";
      let param = {
        issue: this.issue,
        org_id: this.orgId,
        org_sname: this.orgName
      };
      this.showSubDialog(param);
      sessionStorage.setItem("pageModelCode", "powerPurchaseCumulative");
    } else if (
      this.getModelCode != "powerPurchaseCumulative" &&
      this.getModelCode == "monthlyTotalDirectSigningChannelStatistics"
    ) {
      this.activeName = "first";
      this.listQuery.jylx = "2";
      let param = {
        issue: this.issue,
        org_id: this.orgId,
        org_sname: this.orgName
      };
      this.showSubDialog(param);
      sessionStorage.setItem("pageModelCode", "powerPurchaseCumulative");
    } else {
      this.initIssue();
    }
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
      this.listQuery.issue = data.issue;
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
      this.listQuery.issue = ym;
      this.getList();
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
    selectOrg(id) {
      this.listQuery.orgId = id;
    },
    //按组织初始化列表
    initOrg(id) {
      this.listQuery.orgId = id;      
    },
    //变更开始时间
    changeBeginDate(val) {
      if (val != "" && val != undefined) {
        this.listQuery.issue = parseTime(val, "{y}-{m}");
      } else {
        this.listQuery.issue = "";
      }
    },
    handleFilter() {
      if (this.jobId == "") {
        this.getList();
      } else {
        this.getJobStatus();
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
        job: "/mkt/rpt/mkt_rpt_vendibility_company_buy_electricity",
        signingType: "2",
        orgId: this.listQuery.orgId,
        issue: this.listQuery.issue,
        yearOrMonth: this.listQuery.jylx
      };
      executeJob(param).then(res => {
        this.jobId = res.data;
         this.progressInfo = initProgress(this.progressInfo);
        this.progressInfo["jobId"] = this.jobId;
        this.$refs.waitingProgress.initProgress();
      });
    },
    getList() {
      let parma = {
        // orgId: "001005001003",
        // issue: "2019-10",
        // jylx: "2",
        signingType: "2",
        orgId: this.listQuery.orgId,
        issue: this.listQuery.issue,
        jylx: this.listQuery.jylx
      };
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
    handleExport() {}
  }
};
</script>

<style lang="scss" scoped>
.el-table__body td:nth-child(0),
.el-table__body td:nth-child(1) {
  background: #fff;
}
</style>