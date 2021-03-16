<template>
  <div class="app-container calendar-list-container">
    <!-- 弹窗 -->
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      :before-close="closeDialog"
      custom-class="w1000"
      :title="dialogInfo.title"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      v-loading="saveLoading"
    >
      <!--2019-11-11 #2620 张朋 弹框自适应高度赋值 -->
      <div :style="{paddingRight:'10px',height:dialogHeight+'px'}">
        <!-- <div :style="{paddingRight:'10px',height:(layoutInfo.height-180)+'px'}"> -->
        <el-scrollbar>
          <el-form :inline="true" label-width="100px" class="demo-form-inline">
            <el-row>
              <el-col :span="8">
                <el-form-item label="交易序列名称" algin="right">
                  <el-input class="filter-item" disabled v-model="announcementInfoData.noticeName"></el-input>
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
          <div style="margin-bottom: 20px;" v-if="!dialogInfo.isShow">
            <el-button
              type="primary"
              v-if="!dialogInfo.notEdit && btns.btn_add"
              size="small"
              @click="addTab"
            >添加方案</el-button>
          </div>
          <div class="f-mt10" style="position:relative; z-index:10;">
            <div
              style="position:absolute; right:10px;top:8px; z-index:11;"
              class="filter-container txt-right"
            >
              <!-- <el-button
              class="filter-item"
              type="primary"
              @click="showBenefitCalculation"
              >方案效益测算</el-button
              >-->
            </div>
            <el-tabs
              v-if="btns.btn_add && !dialogInfo.notEdit"
              v-model="programmeTabsValue"
              type="card"
              :closable="!dialogInfo.isShow"
              @tab-remove="removeTab"
              @tab-click="handleClick"
            >
              <el-tab-pane
                v-for="item in programmeTabs"
                :key="item.name"
                :label="item.title"
                :name="item.name"
                :ref="'tab' + item.name"
              >
              <!-- 20200116 阿彪 #3693  detailInfo.stateCode=='27'为已变更的数据状态，需要展示√-->
                <span
                  slot="label"
                  v-if="(detailInfo.stateCode=='10' || detailInfo.stateCode=='27')&&detailInfo.passedScheme==item.name"
                >
                  <i class="el-icon-check"></i>
                  {{item.title}}
                </span>
                <span slot="label" v-else>{{item.title}}</span>

                <province-trade
                  :transactionLineOption="transactionLineOption"
                  :btns="btns"
                  :orgInfo="orgInfo"
                  :dialogInfo="dialogInfo"
                  :ref="'tabList' + item.name"
                  :programme="item.title"
                  :announcementInfo="announcementInfoData"
                  :transactionClassifyOption="transactionClassifyOption"
                  :assignmentTypeOption="assignmentTypeOption"
                  :tradingUnitOption="tradingUnitOption"
                  :quotationSegmentOption="quotationSegmentOption"
                  :unitMaps="unitMap"
                ></province-trade>
              </el-tab-pane>
            </el-tabs>
            <el-tabs v-else v-model="programmeTabsValue" type="card" @tab-click="handleClick">
              <el-tab-pane
                v-for="item in programmeTabs"
                :key="item.name"
                :label="item.title"
                :name="item.name"
                :ref="'tab' + item.name"
              >
                <span
                  slot="label"
                  v-if="(detailInfo.stateCode=='10' || detailInfo.stateCode=='27')&&detailInfo.passedScheme==item.name"
                >
                  <i class="el-icon-check"></i>
                  {{item.title}}
                </span>
                <span slot="label" v-else>{{item.title}}</span>

                <province-trade
                  :transactionLineOption="transactionLineOption"
                  :btns="btns"
                  :orgInfo="orgInfo"
                  :dialogInfo="dialogInfo"
                  :ref="'tabList' + item.name"
                  :programme="item.title"
                  :announcementInfo="announcementInfoData"
                  :assignmentTypeOption="assignmentTypeOption"
                  :tradingUnitOption="tradingUnitOption"
                  :transactionClassifyOption="transactionClassifyOption"
                  :quotationSegmentOption="quotationSegmentOption"
                  :unitMaps="unitMap"
                ></province-trade>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <!--  2019-11-06 #2495 滕超 修改记录 -->
        <el-button style="float:left" v-if="dialogInfo.btnModify" @click="modifyHistory">修改记录</el-button>
        <el-button
          :loading="saveBtnLoading"
          class="save-btn"
          v-if="dialogInfo.btnSave && !dialogInfo.notEdit"
          @click="save('11')"
        >保存</el-button>
        <el-button
          :loading="submitBtnLoading"
          class="submit-btn"
          v-if="dialogInfo.btnSubmit && !dialogInfo.notEdit"
          @click="save('3')"
        >提交</el-button>
        <el-button class="cancel-btn" @click="footerCloseDialog">
          <span v-if="!dialogInfo.notEdit">取消</span>
          <span v-else>关闭</span>
        </el-button>
      </div>
    </el-dialog>
    <benefit-calculation :orgInfo="orgInfo" :unitMaps="unitMap" ref="benefitCalculation"></benefit-calculation>
    <!--  2019-11-06 #2495 滕超 修改记录弹框 start-->
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      custom-class="w800"
      title="修改记录"
      :visible.sync="dialogTableVisible"
      :before-close="resetTemp"
    >
      <div style="height: 400px;">
        <el-scrollbar>
          <el-table border height="350" :data="gridData" v-loading.body="checkListLoading">
            <el-table-column align="center" label="序号" prop="index"></el-table-column>

            <el-table-column align="center" label="操作人">
              <template slot-scope="scope">
                <div class="txt-left">{{ scope.row.crtUser }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <div class="txt-left">{{ scope.row.operation }}</div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作时间">
              <template slot-scope="scope">
                <div class="txt-left">{{ scope.row.crtTime }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="页签">
              <template slot-scope="scope">
                <div class="txt-left">{{ scope.row.label }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="操作字段">
              <template slot-scope="scope">
                <div class="txt-left">{{ scope.row.modifyField }}</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="操作前内容">
              <template slot-scope="scope">
                <div>{{ scope.row.oldValue }}</div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作后内容">
              <template slot-scope="scope">
                <span>{{ scope.row.newValue }}</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination-container">
            <el-pagination
              small
              @size-change="sizeChange"
              @current-change="currentChange"
              :current-page.sync="listQuery.page"
              :page-sizes="[10, 20, 30, 50, 100, 200, 500, 1000]"
              :page-size="listQuery.limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="modifyHistoryTotal"
            ></el-pagination>
          </div>
        </el-scrollbar>
      </div>
    </el-dialog>
    <!--  2019-11-06 #2495 滕超 修改记录弹框 end-->
  </div>
</template>
<script>
import {
  modifyInfo,
  addInfo,
  getDetailListBySchemeId,
  deleteInfoByType,
  getPageListModify,
  addChange
} from "@common/api/business/powerSideOffer/centralizedBidding/index";
import { mapGetters } from "vuex";
//2019-11-12 #2620 张朋 引用弹框自适应路径
import {
  parseTime,
  getUnitMap,
  getUnitMapByModelCode,
  initDialogHeight
} from "@common/utils/index";
import { getValueByOrgIdAndCode } from "@common/api/business/jyTransactionNotice/index";
//#3010 2019-12-06 张亮三 引入请求首页计量单位方法getHomeUnit
import { getHomeUnit } from "@common/api/dashboard/index"
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
    transactionClassifyOption: {
      //交易分类
      type: Array
    },
    assignmentTypeOption: {
      //交易类型
      type: Array
    },
    transactionLineOption: {
      type: Array
    }
  },
  components: {
    "province-trade": () => import("./ProvinceTrade"),
    BenefitCalculation: () => import("./BenefitCalculation")
  },
  data() {
    return {
      saveBtnLoading: false,
      submitBtnLoading: false,
      layoutInfo: {},
      schemeInfo: {},
      detailInfo: {},
      saveLoading: false,
      programmeTabsValue: "1",
      programmeTabs: [],
      dialogInfoData: this.dialogInfo,
      announcementInfoData: {},
      listLoading: false,
      dialogVisible: false,
      dialogTableVisible: false,
      checkListLoading: false,
      gridData: [],
      modifyHistoryTotal: 0, //修改记录数据总数
      listQuery: {
        limit: 10,
        page: 1,
        businessId: ""
      },
      listForm: {
        sdOrgId: "",
        sdOrgName: "",
        tradingUnitId: "",
        detailId: "",
        transactionLine: "",
        transactionLineName: "",
        contractCode: "", //合同编号
        contractName: "", //合同名称
        quotationStall: "",
        tradingClassificationCode: "交易分类",
        tradingClassificationName: "交易分类名称",
        tradingTypeCode: "交易类型",
        tradingTypeName: "交易类型名称",
        declarationElectricity: "",
        declarationElectricityPrices: "",
        schemeDesc: "",
        powerPurchaseUnitCode: "" // 2020-06-08   #4161  qinhz  增加购电侧交易单元
      },
      dialogHeight: "", //2019-11-11 #2620 张朋 弹框获取自适应高度数据
      unitMap:{
        electricityUnit:"",
        priceUnit: "",
        amountUnit: "",
        capacityUnit: ""
      }
    };
  },
  watch: {
    dialogInfo(val) {
      this.dialogInfoData = val;
    }
  },
  created() {
    if (sessionStorage.getItem("modelCode") == "dashboard") {
       setTimeout(this.getHomeUnitData(this.orgId,'sdPricingProposal'),10)
    } else {
      this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
    }
  },
  mounted() {
    const that = this;
    this.layoutInfo = initLayoutInfo();
    this.dialogHeight = initDialogHeight(); //2019-11-12 #2620 张朋 获取弹框高度
    window.onresize = function temp() {
      that.layoutInfo = initLayoutInfo();
      that.dialogHeight = initDialogHeight(); //2019-11-12 #2620 张朋  获取弹框高度(监控高度变化)
    };
  },
  computed: {
    ...mapGetters(["elements", "allSubMenus","orgId"])
  },
  methods: {
    /**
     * @方法名称: getHomeUnitData
     * @功能描述: 获取首页计量单位
     * @参数: 
     * @返回值: 
     * @作者: 张亮三
     * @Date: 2019-12-06 17:51:38
     * @最新修改内容: 
     * @LastEditTime: 
     */
    getHomeUnitData(id,mcode){
      let parm = {
        orgId:id,
        modelCode:mcode
      }
      getHomeUnit(parm).then(res=>{
        if(res.data && res.data!=''){
          this.unitMap.electricityUnit =res.data[1];
          this.unitMap.priceUnit =res.data[2];
          this.unitMap.amountUnit =res.data[3];
          this.unitMap.capacityUnit =res.data[4];
        }
      })
    },
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
          tradingUnitId: item.tradingUnitId,
          tradingUnitName: item.tradingUnitName,
          quotationStall: item.quotationStall,
          quotationStallName: item.quotationStallName,
          declarationElectricity: item.declarationElectricity,
          declarationElectricityPrices: item.declarationElectricityPrices,
          transactionLine: item.transactionLine,
          transactionLineName: item.transactionLineName,
          tradingClassificationCode: item.tradingClassificationCode, //交易分类
          tradingClassificationName: item.tradingClassificationName, //交易分类名称
          tradingTypeCode: item.tradingTypeCode, //交易类型
          tradingTypeName: item.tradingTypeName, //交易类型名称
          contractName: item.contractName, //原合同名称
          contractCode: item.contractCode, //原合同编号
          detailId: item.detailId,
          declarationElectricityStatus: "",
          declarationElectricityPricesStatus: "",
          tradingUnitIdStatus: "",
          quotationStallStatus: "",
          declarationElectricityStatusMsg: "",
          declarationElectricityPricesStatusMsg: "",
          tradingUnitIdStatusMsg: "",
          quotationStallStatusMsg: "",
          schemeDesc: item.schemeDesc,
          powerPurchaseUnitCode: item.powerPurchaseUnitCode,
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
            if(this.dialogInfo.status=="change"){
              //20200116 阿彪 #3693 status=="change"为变更弹窗，只展示审核通过的方案
              if(this.detailInfo.passedScheme==key)
              this.programmeTabs.push({
                title: item.propName,
                name: key
              });
              this.programmeTabsValue = item.propCode;
            }else{
              this.programmeTabs.push({
                title: item.propName,
                name: key
              });
              //20200116 阿彪 #3693 查看编辑默认选中第一个标签页
              this.programmeTabsValue = Object.keys(detailList)[0];
            }
          }
        });
        let _this = this;
        // 20200210 阿彪 #3493 点击查看后数据加载慢，将1000调整为10 
        setTimeout(function() {
          _this.setTabList(key, detailList[key]);
        }, 10);
      }
    },

    //获取报价详情
    getDetailInfo(data) {
      let parame = {};
      parame.schemeId = data.schemeId;
      parame.marketSubjectType = data.marketSubjectType;
      getDetailListBySchemeId(parame).then(res => {
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
    closeDialog() {
      this.dialogVisible = false;
      this.saveBtnLoading = false;
      this.submitBtnLoading = false;
    },
    footerCloseDialog() {
      this.dialogVisible = false;
      this.saveBtnLoading = false;
      this.submitBtnLoading = false;
    },
    //设置提交返回信息
    setRequestInfo(res) {
      this.saveLoading = false;
      this.saveBtnLoading = false;
      this.submitBtnLoading = false;
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
      this.saveBtnLoading = true;
      this.submitBtnLoading = true;
      addInfo(params).then(res => {
        this.saveLoading = false;
        this.saveBtnLoading = false;
        this.submitBtnLoading = false;
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
      this.saveBtnLoading = true;
      this.submitBtnLoading = true;
      modifyInfo(parame)
        .then(res => {
          this.saveLoading = false;
          this.saveBtnLoading = false;
          this.submitBtnLoading = false;
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
          this.saveLoading = false;
          this.saveBtnLoading = false;
          this.submitBtnLoading = false;
          console.log("发生错误！", error);
        });
    },
    addChange(parame){
      addChange(parame)
        .then(res => {
          this.saveLoading = false;
          this.setRequestInfo(res);
        })
        .catch(function(error) {
          this.saveLoading = false;
          this.saveBtnLoading = false;
          this.submitBtnLoading = false;
          console.log("发生错误！", error);
        });
    },
    //检测表格数据
    setParameList() {
      // #3050 wangc 20191210 获取企业参数
      return new Promise((resolve,reject) =>{
      getValueByOrgIdAndCode({
        orgId: this.orgId,
        configurationId: 3,
        parameterCode: "1003008"
      }).then( res => {
        //1是否
      let parameInfo = {};
      parameInfo.isErr = false;
      parameInfo.detailList = {};

      this.programmeTabs.forEach(item => {
        let data = {};
        let tableList = [];
        let tempArr = [];
        this.$refs["tabList" + item.name][0].checkTab(res);
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
      resolve(parameInfo);
      });
    });
    },
    //提交保存
    // #3050 wangc 20191210 同步请求
   async save(stateCode) {
      this.saveLoading = true;
      let parame = {};
      parame.stateCode = stateCode;
         //2020-1-16 #3602 zhangpeng 添加参数
      parame.noticeId = this.announcementInfoData.noticeId;
      parame.marketSubjectType = "1";
      parame.orgId = this.orgInfo.id;
      //#3616 gaoaining 2020-01-15营销管控-营销任务管理-优化 挂牌交易保存传参
      parame.tradeVarietyCode = this.announcementInfoData.tradeVarietyCode;
      parame.tradingWay  = this.announcementInfoData.tradeWayCode;
      //parame.marketSubjectType = this.marketSubjectType;
      let parameInfo = await this.setParameList();
      
      if (parameInfo.isErr) {
        this.saveLoading = false;
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
      } else if(this.dialogInfoData.status == "edit"){
        parame.schemeId = this.schemeInfo.schemeId;
        this.update(parame);
      }else if(this.dialogInfoData.status == "change"){
        parame.schemeId = this.schemeInfo.schemeId;
        this.addChange(parame);
      }
    },
    //2019-11-06 #2495 滕超 修改记录
    modifyHistory() {
      this.dialogTableVisible = true;
      this.getList();
    },
    //2019-11-06 #2495 滕超 修改记录分页查询
    getList() {
      this.checkListLoading = true;
      this.listQuery.businessId = this.schemeInfo.schemeId;
      getPageListModify(this.listQuery).then(res => {
        let items = res.data.rows.map((item, index) => {
          item.index =
            index + 1 + (this.listQuery.page - 1) * this.listQuery.limit;
          return item;
        });
        this.gridData = res.data.rows;
        this.modifyHistoryTotal = res.data.total;
        this.checkListLoading = false;
      });
    },
    sizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    currentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    /**
     * @方法名称: resetTemp
     * @功能描述: 关闭修改记录弹框分页重置
     * @参数:
     * @返回值:
     * @样式作用范围:
     * @作者: 滕超
     * @Date: 2019-11-09 16:49:55
     * @最新修改内容:
     * @LastEditTime:
     */
    resetTemp() {
      this.dialogTableVisible = false;
      this.listQuery.page = 1;
      this.listQuery.limit = 10;
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
      log('lsdata',data);
      this.schemeInfo = data;
      this.announcementInfoData = data;
      this.getDetailInfo(data);
      this.dialogVisible = true;
    },
    //查看信息窗口
    showViewsDialog(data) {
      this.schemeInfo = data;
      this.announcementInfoData = data;
      this.getDetailInfo(data);
      this.dialogVisible = true;
    },
    //效益测算
    showBenefitCalculation() {
      this.$refs["benefitCalculation"].showDialog();
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
          message: "方案最多为4种",
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
</style>





