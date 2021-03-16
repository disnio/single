<template>
  <div class="app-container calendar-list-container">
    <!-- 弹窗 -->
    <el-dialog v-drag :close-on-click-modal="false"
      :width="layoutInfo.width - 40 + 'px'"
      :height="layoutInfo.height - 50 + 'px'"
      custom-class="dialog-max"
      :title="dialogInfo.title"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
    >
      <!-- , height: layoutInfo.height - 20 + 'px' -->
      <div :style="{ paddingRight: '10px' }" v-loading="saveLoading">
        <el-form :inline="true" label-width="120px" class="demo-form-inline">
          <el-row>
            <el-col :span="8">
              <el-form-item label="交易序列名称" algin="right">
                <el-input
                  class="filter-item"
                  disabled
                  v-model="announcementInfoData.noticeName"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="交易品种" algin="right">
                <el-input
                  class="filter-item"
                  disabled
                  v-model="announcementInfoData.tradeVarietyName"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="报价方式" algin="right">
                <el-input
                  class="filter-item"
                  disabled
                  v-model="announcementInfoData.quotationMethodName"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <el-button-group class="f-mb10">
          <el-button
            v-if="this.btns.btn_pass"
            :disabled="prohibitOpenCheckWin"
            type="success"
            @click="openCheckWin('1')"
            class="pass-btn"
            >通 过</el-button
          >

          <el-button
            v-if="this.btns.btn_reject"
            :disabled="prohibitOpenCheckWin"
            type="warning"
            class="reject-btn"
            @click="openCheckWin('2')"
            >驳 回</el-button
          >
        </el-button-group>
        <div style="margin-bottom: 20px;">
          <el-button
            type="primary"
            v-if="!dialogInfo.notEdit && btns.btn_add"
            size="small"
            @click="addTab"
            >添加方案</el-button
          >
        </div>
        <div class="f-mt10" style="position:relative; z-index:10;">
          <div
            style="position:absolute; right:10px;top:8px; z-index:11;"
            class="filter-container txt-right"
          >
            <el-button
              v-if="announcementInfoData.tradeVarietyCode != 'jypz03'"
              class="filter-item"
              type="primary"
              @click="showBenefitCalculation"
              >方案效益测算</el-button
            >
          </div>
          <province-trade
            :btns="btns"
            :orgInfo="orgInfo"
            :dialogInfo="dialogInfo"
            ref="tabList"
            :announcementInfo="announcementInfoData"
            :tradingUnitOption="tradingUnitOption"
            :quotationSegmentOption="quotationSegmentOption"
            :unitMap="unitMap"
            @callback="callbackA($event)"
            @callback1="callbackB($event)"
            @callback2="callbackC($event)"
          ></province-trade>
        </div>
      </div>
      <div slot="footer" class="dialog-footer btn_footer">
        <el-button type="warning" class="reject-btn" @click="outClose()"
          >关 闭</el-button
        >
      </div>
    </el-dialog>

    <benefit-calculation
      :announcementInfo="announcementInfoData"
      :orgInfo="orgInfo"
      :unitMap="unitMap"
      ref="benefitCalculation"
    ></benefit-calculation>

    <el-dialog v-drag :close-on-click-modal="false"
      custom-class="w480"
      title="请填写审批意见"
      :visible.sync="checkDialogVisible"
      append-to-body
      :before-close="handleClose"
    >
      <el-input
        placeholder="请填写文本信息.."
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 5 }"
        :maxlength="400"
        @input="approvalOpinionInput"
        v-model="approvalOpinion"
      ></el-input>
      <span class="validateText">{{ approvalOpinionRemnant }}/400</span>
      <div slot="footer" class="dialog-footer btn_footer">
        <el-button class="ok-btn" @click="switchCheck">确 认</el-button>
        <el-button class="cancel-btn" @click="close()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  modifyInfo,
  addInfo,
  getDetailListBySchemeId,
  getSchemeDetailListByNoticeId,
  deleteInfoByType,
  changeStatus,
  completeAllApproval
} from "@common/api/business/powerSideOffer/centralizedBidding/index";
import { mapGetters } from "vuex";
import { parseTime } from "@common/utils/index";
import { initLayoutInfo } from "@common/utils/init";
export default {
  name: "result",
  props: {
    dialogInfo: { type: Object },
    dialogStatus: {
      type: String
    },
    orgInfo: {
      type: Object
    },
    pricingProposalOption: { type: Array },
    btns: { type: Object },
    tradingUnitOption: {
      type: Array
    },
    marketSubjectType: { type: String },
    quotationSegmentOption: {
      type: Array
    },
    unitMap:{type:Object }
  },
  components: {
    "province-trade": () => import("./ProvinceTrade"),
    "benefit-calculation": () => import("./BenefitCalculation")
  },
  data() {
    return {
      callbackBVal: "",
      callbackAVal: "",
      callbackCVal: "",
      ids: "",
      ids1: "",
      ids2: "",
      noticeId: "",
      layoutInfo: {},
      schemeInfo: {},
      sddetailInfo: [],
      fddetailInfo: [],
      approvalOpinion: "", //输入审核内容
      approvalOpinionRemnant: 0, //计数器
      checkDialogVisible: false, //审核弹出框
      saveLoading: false,
      programmeTabsValue: "1",
      programmeTabs: [],
      dialogInfoData: this.dialogInfo,
      announcementInfoData: {},
      listLoading: false,
      dialogVisible: false,
      listForm: {
        sdOrgId: "",
        sdOrgName: "",
        fdOrgId: "",
        fdOrgName: "",
        tradingUnitId: "",
        tradingUnitName: "",
        detailId: "",
        transactionLine: "",
        // tradingUnitName: "",
        quotationStall: "",
        // quotationStallName: "",
        declarationElectricity: "",
        declarationElectricityPrices: ""
      },
      prohibitOpenCheckWin: false
    };
  },
  watch: {
    dialogInfo(val) {
      this.dialogInfoData = val;
    }
  },
  created() {},
  mounted() {
    const that = this;
    this.layoutInfo = initLayoutInfo();
    window.onresize = function temp() {
      that.layoutInfo = initLayoutInfo();
    };
  },
  computed: {
    ...mapGetters(["elements"])
  },
  methods: {
    //初始化tabs
    initTabs() {
      if (this.dialogInfo.status == "add") {
        let data = {
          title: "方案1",
          name: "1"
        };
        this.programmeTabs.push(data);
      }
    },
    //设置列表数据
    sdsetTabList(key, data) {
      let listData = [];
      data.forEach((item, index) => {
        let dataInfo = {};
        dataInfo = {
          index: index + 1,
          sdOrgId: item.sdOrgId,
          sdOrgName: item.sdOrgName,
          fdOrgId: item.fdOrgId,
          fdOrgName: item.fdOrgName,
          customerName: item.customerName,
          tradingUnitId: item.tradingUnitId,
          tradingUnitName: item.tradingUnitName,
          quotationStall: item.quotationStall,
          quotationStallName: item.quotationStallName,
          declarationElectricity: item.declarationElectricity,
          declarationElectricityPrices: item.declarationElectricityPrices,
          detailId: item.detailId,
          quotationStallName: item.quotationStallName,
          tradingClassificationName: item.tradingClassificationName,
          tradingTypeName: item.tradingTypeName,
          unit: item.unit,
          tradingProductName: item.tradingProductName,
          transactionLine: item.transactionLine,
          declarationElectricityStatus: "",
          declarationElectricityPricesStatus: "",
          tradingUnitIdStatus: "",
          quotationStallStatus: "",
          declarationElectricityStatusMsg: "",
          declarationElectricityPricesStatusMsg: "",
          tradingUnitIdStatusMsg: "",
          quotationStallStatusMsg: "",
          stateName: item.state,
          // stateName: this.fddetailInfo.stateName,
          schemeId: item.schemeId
        };
        listData.push(dataInfo);
      });
      this.$refs["tabList"].sdsetList(listData);
      this.$refs["benefitCalculation"].sdsetList(listData);
    },
    fdsetTabList(key, data) {
      let listData = [];
      if (data.length > 0) {
        data.forEach((item, index) => {
          let dataInfo = {};
          dataInfo = {
            index: index + 1,
            sdOrgId: item.sdOrgId,
            sdOrgName: item.sdOrgName,
            fdOrgId: item.fdOrgId,
            fdOrgName: item.fdOrgName,
            customerName: item.customerName,
            tradingUnitId: item.tradingUnitId,
            tradingUnitName: item.tradingUnitName,
            quotationStall: item.quotationStall,
            quotationStallName: item.quotationStallName,
            declarationElectricity: item.declarationElectricity,
            declarationElectricityPrices: item.declarationElectricityPrices,
            detailId: item.detailId,
            quotationStallName: item.quotationStallName,
            tradingClassificationName: item.tradingClassificationName,
            tradingTypeName: item.tradingTypeName,
            unit: item.unit,
            tradingProductName: item.tradingProductName,
            transactionLine: item.transactionLine,
            declarationElectricityStatus: "",
            declarationElectricityPricesStatus: "",
            tradingUnitIdStatus: "",
            quotationStallStatus: "",
            declarationElectricityStatusMsg: "",
            declarationElectricityPricesStatusMsg: "",
            tradingUnitIdStatusMsg: "",
            quotationStallStatusMsg: "",
            stateName: item.state,
            schemeId: item.schemeId
          };
          listData.push(dataInfo);
        });
      }
      this.$refs["tabList"].fdsetList(listData);
      this.$refs["benefitCalculation"].fdsetList(listData);
    },
    //初始化编辑tab
    sdinitEditTabs() {
      this.programmeTabs = [];
      let array = [];
      let sddetail = {};
      this.sddetailInfo.forEach(element => {
        for (let key in element.detailList) {
          element.detailList[key].forEach(element => {
            array.push(element);
          });
          sddetail[key] = array;
        }
      });
      let sddetailList = sddetail;
      for (let key in sddetailList) {
        // Cannot read property '0' of undefined"
        this.pricingProposalOption.forEach(item => {
          if (key == item.propCode) {
            this.programmeTabs.push({
              title: item.propName,
              name: key
            });
            this.programmeTabsValue = key;
          }
        });
        let _this = this;

        setTimeout(function() {
          _this.sdsetTabList(key, sddetailList[key]);
        }, 1000);
        //--------------------------------------
      }
    },
    fdinitEditTabs() {
      this.programmeTabs = [];
      let array = [];
      let fddetail = {};
      this.fddetailInfo.forEach(element => {
        for (let key in element.detailList) {
          element.detailList[key].forEach(element => {
            array.push(element);
          });
          fddetail[key] = array;
        }
      });
      let fddetailList = fddetail;
      for (let key in fddetailList) {
        // Cannot read property '0' of undefined"

        this.pricingProposalOption.forEach(item => {
          if (key == item.propCode) {
            this.programmeTabs.push({
              title: item.propName,
              name: key
            });
            this.programmeTabsValue = key;
          }
        });
        let _this = this;
        setTimeout(function() {
          _this.fdsetTabList(key, fddetailList[key]);
        }, 1000);
        //--------------------------------------
      }
    },

    //初始获取报价详情
    getDetailInfo(noticeId) {
      let state = "";
      let parame = {};
      parame.noticeId = noticeId;
      //清空
      if (typeof this.$refs["tabList"] != "undefined") {
        this.$refs["tabList"].fdsetList([]);
        this.$refs["tabList"].sdsetList([]);
      }
      getSchemeDetailListByNoticeId(parame).then(res => {
        if (res.rel) {
          if (res.data.sd) {
            // res.data.sd.forEach(element => {
            //   this.sddetailInfo = element;
            //   this.sdinitEditTabs();
            // });
            this.sddetailInfo = res.data.sd;
            this.sdinitEditTabs();
          }
          if (res.data.fd) {
            this.fddetailInfo = res.data.fd;
            this.fdinitEditTabs();
          }
        } else {
          this.$notify({
            title: res.msg,
            message: res.msg,
            type: "warning",
            duration: 2000
          });
        }
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
        this.$emit("initList");
      } else {
        this.$notify({
          title: res.msg,
          message: res.msg,
          type: "warning",
          duration: 2000
        });
      }
    },
    //添加信息
    createInfo(params) {
      addInfo(params).then(res => {
        if (res.rel) {
          this.$notify({
            title: res.msg,
            message: res.msg,
            type: "success",
            duration: 2000
          });
          this.setRequestInfo(res);
        } else {
          this.$notify({
            title: res.msg,
            message: res.msg,
            type: "warning",
            duration: 2000
          });
        }
      });
    },
    //修改信息
    update(parame) {
      modifyInfo(parame)
        .then(res => {
          if (res.rel) {
            this.$notify({
              title: res.msg,
              message: res.msg,
              type: "success",
              duration: 2000
            });
            this.setRequestInfo(res);
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
    //检测表格数据
    setParameList() {
      let parameInfo = {};
      parameInfo.isErr = false;
      parameInfo.detailList = {};

      this.programmeTabs.forEach(item => {
        let data = {};
        let tableList = [];
        let tempArr = [];
        this.$refs["tabList" + item.name][0].checkTab();
        tableList = this.$refs["tabList" + item.name][0].tableList;
        tableList.forEach(item2 => {
          let dataInfo = {};
          for (let key in this.listForm) {
            dataInfo[key] = item2[key];
          }
          tempArr.push(dataInfo);
        });
        //  data[this.pricingProposalOption[item.name].propCode]=tempArr;
        parameInfo.detailList[item.name] = tempArr;
        if (this.$refs["tabList" + item.name][0].isErr) {
          parameInfo.isErr = true;
        }
      });
      return parameInfo;
    },
    //提交保存
    save(stateCode) {
      let parame = {};
      parame.stateCode = stateCode;
      parame.noticeId = this.announcementInfoData.noticeId;
      parame.marketSubjectType = "1";
      parame.orgId = this.orgInfo.id;
      //parame.marketSubjectType = this.marketSubjectType;
      let parameInfo = this.setParameList();
      if (parameInfo.isErr) {
        this.$notify({
          title: "提示",
          message: "报错失败，列表数据有误！",
          type: "warning",
          duration: 2000
        });
        return false;
      } else {
        parame.detailList = parameInfo.detailList;
      }
      if (this.dialogInfoData.status == "add") {
        this.createInfo(parame);
      } else {
        parame.schemeId = this.schemeInfo.schemeId;
        this.update(parame);
      }
    },
    //切换tab
    handleClick(tab, event) {
      this.programmeTabsValue = tab.name;
    },
    //查看信息窗口
    showViewsDialog(data) {
      this.schemeInfo = data;
      this.noticeId = data.noticeId;
      this.announcementInfoData = data;
      this.getDetailInfo(data.noticeId);
      this.dialogVisible = true;
    },
    //效益测算
    showBenefitCalculation() {
      this.$refs["benefitCalculation"].showDialog(
        this.schemeInfo,
        this.programmeTabsValue,
        this.announcementInfoData
      );
    },

    //打开审核窗口
    openCheckWin(data) {
      if (this.callbackBVal.length > 0) {
        this.ids1Name(data);
      } else if (this.callbackAVal.length > 0) {
        this.idsName(data);
      } else if (this.callbackCVal.length > 0) {
        this.ids2Name(data);
      } else if (
        this.callbackBVal.length == 0 &&
        this.callbackAVal.length == 0 &&
        this.callbackCVal.length == 0
      ) {
        this.$notify({
          title: "提示",
          message: "请选择需要通过的数据",
          type: "success",
          duration: 2000
        });
      }
    },
    ids2Name(data) {
      for (let i = 0; i < this.callbackCVal.length; i++) {
        if (this.callbackCVal[i].stateName == "已通过") {
          this.checkDialogVisible = false;
          this.$notify({
            title: "提示",
            message: "该数据已审核通过",
            type: "success",
            duration: 2000
          });
          break; //当 stateName为已通过时，终止循环
        } else {
          this.approvalOpinionRemnant = 0;
          this.approvalOpinion = "";
          this.flag = data;
          this.checkDialogVisible = true;
        }
      }
    },
    ids1Name(data) {
      let id = "";
      for (let i = 0; i < this.callbackBVal.length; i++) {
        if (this.callbackBVal[i].stateName == "已通过") {
          this.checkDialogVisible = false;
          this.$notify({
            title: "提示",
            message: "该数据已审核通过",
            type: "success",
            duration: 2000
          });
          break; //当 stateName为已通过时，终止循环
        } else {
          this.approvalOpinionRemnant = 0;
          this.approvalOpinion = "";
          this.flag = data;
          this.checkDialogVisible = true;
        }
      }
      id = id.substring(1);
      this.sels = id;
    },
    idsName(data) {
      for (let i = 0; i < this.callbackAVal.length; i++) {
        this.checkDialogVisible = false;
        if (this.callbackAVal[i].stateName == "已通过") {
          this.$notify({
            title: "提示",
            message: "该数据已审核通过",
            type: "success",
            duration: 2000
          });
          break; //当 stateName为已通过时，终止循环
        } else {
          this.approvalOpinionRemnant = 0;
          this.approvalOpinion = "";
          this.flag = data;
          this.checkDialogVisible = true;
        }
      }
    },
    //选择审核方法
    switchCheck() {
      if (this.flag == "1") {
        this.passArray();
      } else if (this.flag == "2") {
        this.rejectArray();
      } else if (this.flag == "3") {
        this.passBtn();
      } else if (this.flag == "4") {
        this.rejectBtn();
      }
    },
    //通过方法（id数组）
    passArray() {
      let schemeIds = "";
      if (this.ids) {
        schemeIds = this.ids;
      } else if (this.ids1) {
        schemeIds = this.ids1;
      } else if (this.ids2) {
        schemeIds = this.ids2;
      }
      if (schemeIds == "," || schemeIds == ",,") {
        schemeIds = "";
      }
      let query = {
        isPass: "true",
        approvalComments: this.approvalOpinion,
        schemeIds: schemeIds
      };
      this.pass(query);
    },
    //驳回方法（id数组）
    rejectArray() {
      // if(schemeIds==","){
      //   schemeIds = "";
      // }
      // let schemeIds = this.ids + "," + this.ids1 + "," + this.ids2;
      let schemeIds = "";
      if (this.ids) {
        schemeIds = this.ids;
      } else if (this.ids1) {
        schemeIds = this.ids1;
      } else if (this.ids2) {
        schemeIds = this.ids2;
      }
      let query = {
        isPass: "false",
        approvalComments: this.approvalOpinion,
        schemeIds: schemeIds
      };
      this.reject(query);
    },
    //通过方法
    passBtn() {
      let query = {
        isPass: "true",
        tradeWayCode: this.announcementInfoData.tradeWayCode,
        marketSubjectType: "1",
        approvalComments: this.approvalOpinion,
        schemeId: this.schemeInfo.schemeId
      };
      this.pass(query);
    },
    //驳回方法
    rejectBtn() {
      let query = {
        isPass: "false",
        tradeWayCode: this.announcementInfoData.tradeWayCode,
        marketSubjectType: "1",
        approvalComments: this.approvalOpinion,
        schemeId: this.schemeInfo.schemeId
      };
      this.reject(query);
    },
    //通过
    pass(query) {
      if (query.schemeIds != "" && query.schemeIds != null) {
        completeAllApproval(query).then(res => {
          if (res.rel) {
            this.$notify({
              title: res.msg,
              message: res.msg,
              type: "success",
              duration: 2000
            });
            //  this.$emit("initList");
            this.getDetailList(this.noticeId);
            this.checkDialogVisible = false;
            this.callbackCVal = [];
            this.callbackAVal = [];
            this.callbackBVal = [];
          } else {
            this.$notify({
              title: res.msg,
              message: res.msg,
              type: "warning",
              duration: 2000
            });
            this.$emit("initList");
          }
        });
      } else {
        this.$alert("请选择要通过选项", "消息提示", {
          type: "warning",
          confirmButtonText: "确定",
          callback: action => {}
        });
      }
    },

    //驳回
    reject(query) {
      if (query.schemeIds != "" && query.schemeIds != null) {
        completeAllApproval(query).then(res => {
          if (res.rel) {
            this.$notify({
              title: res.msg,
              message: res.msg,
              type: "success",
              duration: 2000
            });
            // this.$emit("initList");
            this.getDetailList(this.noticeId);
            this.checkDialogVisible = false;
          } else {
            this.$notify({
              title: res.msg,
              message: res.msg,
              type: "warning",
              duration: 2000
            });
            this.$emit("initList");
          }
        });
      } else {
        this.$alert("请选择要驳回项", "消息提示", {
          type: "warning",
          confirmButtonText: "确定",
          callback: action => {}
        });
      }
    },
    //获取报价详情
    getDetailList() {
      let parame = {};
      let tabState = "";
      parame.noticeId = this.noticeId;
      //清空
      if (typeof this.$refs["tabList"] != "undefined") {
        this.$refs["tabList"].fdsetList([]);
        this.$refs["tabList"].sdsetList([]);
      }
      getSchemeDetailListByNoticeId(parame).then(res => {
        if (res.rel) {
          if (res.data.sd) {
            this.sddetailInfo = res.data.sd;
            tabState = true;
            if (this.sddetailInfo.forEach) {
              this.sddetailInfo.forEach((item, index) => {
                if (item.stateName == "审核中") {
                  tabState = false;
                }
              });
            }
          }
          if (res.data.fd) {
            this.fddetailInfo = res.data.fd;
            if (this.fddetailInfo.forEach) {
              this.fddetailInfo.forEach((item, index) => {
                if (item.stateName == "审核中") {
                  tabState = false;
                }
              });
            }
          }
          if (tabState) {
            this.dialogVisible = false;
            this.$emit("initList");
          } else {
            this.sdinitEditTabs();
            this.fdinitEditTabs();
          }
        } else {
          this.$notify({
            title: res.msg,
            message: res.msg,
            type: "warning",
            duration: 2000
          });
        }
      });
    },
    callbackA(data) {
      this.callbackAVal = data;
      let id = "";
      data.forEach(element => {
        id += "," + element.schemeId;
      });
      id = id.substring(1);
      this.ids = id;
    },
    callbackB(data) {
      this.callbackBVal = data;
      let id = "";
      data.forEach(element => {
        id += "," + element.schemeId;
      });
      id = id.substring(1);
      this.ids1 = id;
    },
    callbackC(data) {
      this.callbackCVal = data;
      let id = "";
      data.forEach(element => {
        id += "," + element.schemeId;
      });
      id = id.substring(1);
      this.ids2 = id;
    },
    //输入字数
    approvalOpinionInput() {
      let txtVal = this.approvalOpinion.length;
      this.approvalOpinionRemnant = 400 - txtVal;
    },
    // 关闭方法
    handleClose(done) {
      done();
    },
    // 关闭方法
    close() {
      this.checkDialogVisible = false;
    },
    // 关闭方法
    outClose() {
      this.dialogVisible = false;
    },
    //添加方案
    addTab(targetName) {
      let newTabName = this.programmeTabs.length;
      if (this.programmeTabs.length < 4) {
        this.programmeTabs.push({
          title: this.pricingProposalOption[newTabName].propName,
          name: this.pricingProposalOption[newTabName].propCode
        });
        let _this = this;
        this.programmeTabsValue = this.pricingProposalOption[
          newTabName
        ].propCode;
        setTimeout(function() {
          _this.$refs["tabList" + _this.programmeTabsValue][0].initTableData();
          //  _this.$refs["tabList" + this.programmeTabsValue][0].initTableData();
        }, 1000);
      } else {
        this.$notify({
          title: "提示",
          message: "方案最多为4中",
          type: "warning",
          duration: 2000
        });
      }
    },
    //删除方案
    removeTab(targetName) {
      this.$confirm("即将删除此条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let parame = {};
        parame.schemeId = this.schemeInfo.schemeId;
        parame.schemeNameCode = targetName;
        deleteInfoByType(parame).then(res => {
          if (res.rel) {
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success",
              duration: 2000
            });
            let tabs = this.programmeTabs;
            let activeName = this.programmeTabsValue;
            if (activeName === targetName) {
              tabs.forEach((tab, index) => {
                if (tab.name === targetName) {
                  let nextTab = tabs[index + 1] || tabs[index - 1];
                  if (nextTab) {
                    activeName = nextTab.name;
                  }
                }
              });
            }
            this.programmeTabsValue = activeName;
            this.programmeTabs = tabs.filter(tab => tab.name !== targetName);
          } else {
            this.$notify({
              title: "提示",
              message: res.msg,
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
<style lang="scss" scoped>
.w-half {
  width: 80px !important;
}
.validateText {
  position: absolute;
  font-size: 10px;
  bottom: 60px;
  right: 20px;
}
.altdiv {
  height: 450px;
  padding-right: 15px;
}
</style>





