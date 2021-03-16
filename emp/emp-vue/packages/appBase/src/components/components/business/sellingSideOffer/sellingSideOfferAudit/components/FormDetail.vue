<template>
  <div class="app-container calendar-list-container">
    <!-- 弹窗 -->
    <!-- 2019-10-28 #2434  滕超 弹框页面调整-->
    <el-dialog v-drag :close-on-click-modal="false"
      custom-class="w1000"
      :title="dialogInfo.title"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
    >
    <!-- 2019-10-28 #2434  滕超 弹框页面调整-->
      <div
        :style="{ paddingRight: '10px', height: layoutInfo.height - 180 + 'px' }"
        v-loading="saveLoading"
      >
        <el-form
          :inline="true"
          label-width="120px"
          class="demo-form-inline"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="交易序列名称"
                algin="right"
              >
                <el-input
                  class="filter-item"
                  disabled
                  v-model="announcementInfoData.noticeName"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="交易品种"
                algin="right"
              >
                <el-input
                  class="filter-item"
                  disabled
                  v-model="announcementInfoData.tradeVarietyName"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="报价方式"
                algin="right"
              >
                <el-input
                  class="filter-item"
                  disabled
                  v-model="announcementInfoData.quotationMethodName"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="margin-bottom: 20px;">
          <el-button
            type="primary"
            v-if="!dialogInfo.notEdit && btns.btn_add"
            size="small"
            @click="addTab"
          >添加方案</el-button>
        </div>
        <div
          class="f-mt10"
          style="position:relative; z-index:10;"
	    v-if="dialogVisible"
        >
          <div
            style="position:absolute; right:10px;top:8px; z-index:11;"
            class="filter-container txt-right"
          >
            <el-button
              v-if="announcementInfoData.tradeWayCode != 'jyfs03'"
              class="filter-item"
              type="primary"
              @click="showBenefitCalculation"
            >方案效益测算</el-button>
          </div>
          <el-tabs
            v-if="btns.btn_add && !dialogInfo.notEdit"
            v-model="programmeTabsValue"
            type="card"
            closable
            @tab-remove="removeTab"
            @tab-click="handleClick"
          >
            <el-tab-pane
              v-for="item in programmeTabs"
              :key="item.name"
              :name="item.name"
              :ref="'tab' + item.name"
            >
    
         <span
                  slot="label"
                  v-if="detailInfo.stateCode=='10'&&detailInfo.passedScheme==item.name"
                >
                  <i class="el-icon-check"></i>
                  {{item.title}}
                </span>
                 <span slot="label"  v-else>{{item.title}}</span>
        
              <province-trade
                :btns="btns"
                :orgInfo="orgInfo"
                :dialogInfo="dialogInfo"
                :ref="'tabList' + item.name"
                :programme="item.title"
                :announcementInfo="announcementInfoData"
                :tradingUnitOption="tradingUnitOption"
                :quotationSegmentOption="quotationSegmentOption"
                :unitMap="unitMap"
              ></province-trade>
            </el-tab-pane>
          </el-tabs>
          <el-tabs
            v-else
            v-model="programmeTabsValue"
            type="card"
            @tab-click="handleClick"
          >
            <el-tab-pane
              v-for="item in programmeTabs"
              :key="item.name"
              :name="item.name"
              :ref="'tab' + item.name"
            >
  <span
                  slot="label"
                  v-if="detailInfo.stateCode=='10'&&detailInfo.passedScheme==item.name"
                >
                  <i class="el-icon-check"></i>
                  {{item.title}}
                </span>
                 <span slot="label"  v-else>{{item.title}}</span>
 
  
              <province-trade
                :btns="btns"
                :orgInfo="orgInfo"
                :dialogInfo="dialogInfo"
                :ref="'tabList' + item.name"
                :programme="item.title"
                :announcementInfo="announcementInfoData"
                :tradingUnitOption="tradingUnitOption"
                :quotationSegmentOption="quotationSegmentOption"
                :unitMap="unitMap"
              ></province-trade>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div
        slot="footer"
        class="dialog-footer btn_footer"
      >
        <el-button
          v-if="btns.btn_pass"
          type="success"
          @click="openCheckWin('3')"
          class="pass-btn"
        >通 过</el-button>

        <el-button
          v-if="btns.btn_reject"
          type="warning"
          class="reject-btn"
          @click="openCheckWin('4')"
        >驳 回</el-button>
      </div>
    </el-dialog>
    <benefit-calculation
      :orgInfo="orgInfo"
      :unitMap="unitMap"
      ref="benefitCalculation"
    ></benefit-calculation>

    <el-dialog v-drag :close-on-click-modal="false"
      custom-class="w640"
      title="请填写审批意见"
      :visible.sync="checkDialogVisible"
      append-to-body
      :before-close="handleClose"
    >
 
    <div style="padding:10px;">
    <div class="mb10">
    <el-radio-group v-model="selectedFa"  v-if="flag=='3'&&programmeTabs.length>1">
    <el-radio :label="item.name" v-for="(item,index) in programmeTabs"  :key="index"> {{item.title}}</el-radio>
  </el-radio-group>
    </div>
    <div class="mt10" style="margin-top:10px;">
      <el-input
        placeholder="请填写文本信息.."
        type="textarea"
        rows="6"
        :maxlength="400"
        resize="none"
        @input="approvalOpinionInput"
        v-model="approvalOpinion"
      >
      </el-input>
      
      <span class="validateText">{{ approvalOpinionRemnant }}/400</span>
    </div>
        </div>
      <div
        slot="footer"
        class="dialog-footer btn_footer"
      >
        <el-button
          class="ok-btn"
          @click="switchCheck"
        >确 认</el-button>
        <el-button
          class="cancel-btn"
          @click="close()"
        >取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  modifyInfo,
  addInfo,
  getDetailListBySchemeId,
  getDetailListBySchemeIdNew,
  deleteInfoByType,
  changeStatus
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
    unitMap: {
      type: Object
    }
  },
  components: {
    "province-trade": () => import("./ProvinceTrade"),
    BenefitCalculation: () => import("./BenefitCalculation")
  },
  data() {
    return {
      flag:"",
      selectedFa:"",
      layoutInfo: {},
      schemeInfo: {},
      detailInfo: {},
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
        tradingUnitId: "",
        detailId: "",
        transactionLine: "",
        // tradingUnitName: "",
        quotationStall: "",
        // quotationStallName: "",
        declarationElectricity: "",
        declarationElectricityPrices: "",
        schemeDesc:"",
      }
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
    setTabList(key, data) {
      let listData = [];
      data.forEach((item, index) => {
        let dataInfo = {};
        dataInfo = {
          index: index + 1,

          sdOrgId: item.sdOrgId,
          sdOrgName: item.sdOrgName,
          fdOrgId: item.fdOrgId,
          fdOrgName: item.fdOrgName,
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
          quotationStallStatusMsg: ""
        };
        listData.push(dataInfo);
      });

      this.$refs["tabList" + key][0].setList(listData);
    },
    //初始化编辑tab
    initEditTabs() {
      this.programmeTabs = [];
      let detailList = this.detailInfo.detailList;

      for (let key in detailList) {
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
          _this.setTabList(key, detailList[key]);
        }, 1000);
      }
    },
    //获取报价详情
    getDetailInfo(schemeId) {
      let parame = {};
      parame.schemeId = schemeId;
      getDetailListBySchemeIdNew(parame).then(res => {
        if (res.rel) {
          this.detailInfo = res.data;
          this.initEditTabs();
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
         //2020-1-16 #3602 zhangpeng 添加参数
      parame.tradeVarietyCode = this.schemeInfo.tradeVarietyCode;
      parame.tradingWay  = this.schemeInfo.tradeWayCode;
      parame.noticeId = this.announcementInfoData.noticeId;
      parame.marketSubjectType = "1";
      parame.orgId = this.orgInfo.id;
      //parame.marketSubjectType = this.marketSubjectType;
      let parameInfo = this.setParameList();
      if (parameInfo.isErr) {
        // this.$notify({
        //   title: "提示",
        //   message: "报错失败，列表数据有误！",
        //   type: "warning",
        //   duration: 2000
        // });
        // return false;
        this.$confirm("申报电量与省内交易电量不等，是否继续？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          parame.detailList = parameInfo.detailList;
          if (this.dialogInfoData.status == "add") {
            this.createInfo(parame);
          } else {
            parame.schemeId = this.schemeInfo.schemeId;
            this.update(parame);
          }
        });
      }
    },
    //切换tab
    handleClick(tab, event) {
      this.programmeTabsValue = tab.name;
     
    },
    //显示新增
    showDialog(data) {
      this.schemeInfo = {};
      this.announcementInfoData = data;
      this.programmeTabs = [];
      this.addTab();
      this.dialogVisible = true;
    },
    //显示编辑
    showEditDialog(data) {
      this.schemeInfo = data;
      this.announcementInfoData = data;
      this.getDetailInfo(data.schemeId);
      this.dialogVisible = true;
    },
    //查看信息窗口
    showViewsDialog(data) {
      this.schemeInfo = data;
      this.announcementInfoData = data;
      this.getDetailInfo(data.schemeId);
      this.dialogVisible = true;
      
    },
    //效益测算
    showBenefitCalculation() {
      this.$refs["benefitCalculation"].showDialog(
        this.schemeInfo,
        this.programmeTabsValue
      );
    },
    //打开审核窗口
    openCheckWin(data) {
      this.approvalOpinionRemnant = 0;
      this.approvalOpinion = "";
      this.flag = data;
      this.selectedFa="";
      this.checkDialogVisible = true;
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
      let query = {
        approvalStatus: this.passString,
        approvalOpinion: this.approvalOpinion,
        schemeIds: this.sels
      };
      this.pass(query);
    },
    //驳回方法（id数组）
    rejectArray() {
      let query = {
        approvalStatus: this.rejectString,
        approvalOpinion: this.approvalOpinion,
        schemeIds: this.sels
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
        schemeId: this.schemeInfo.schemeId,
        // schemeNameCode :this.programmeTabsValue,
      };
      query.schemeNameCode="";
      if(this.programmeTabs.length==1){
        query.schemeNameCode=this.programmeTabs[0].name;
      }else{
        if(this.selectedFa!=""){
          query.schemeNameCode=this.selectedFa;
        }else{
           this.$notify({
              title:"提示信息",
              message: "请选择审核通过的方案",
              type: "warning",
              duration: 2000
            });
            return false
        }
        
      }
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
      
      if (query.schemeId != "" && query.schemeId != null) {
        changeStatus(query).then(res => {
          if (res.rel) {
            this.$notify({
              title: res.msg,
              message: res.msg,
              type: "success",
              duration: 2000
            });
            this.$emit("initList");

            this.dialogVisible = false;
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
        this.$alert("请选择要通过选项", "消息提示", {
          type: "warning",
          confirmButtonText: "确定",
          callback: action => {}
        });
      }
    },
    //驳回
    reject(query) {
      if (query.schemeId != "" && query.schemeId != null) {
        changeStatus(query).then(res => {
          if (res.rel) {
            this.$notify({
              title: res.msg,
              message: res.msg,
              type: "success",
              duration: 2000
            });
            this.$emit("initList");
            this.dialogVisible = false;
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
 bottom: 55px;
    right: 25px;
}
.altdiv {
  height: 450px;
  padding-right: 15px;
}
</style>





