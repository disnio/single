<!--
 * @功能描述: 双边协商
 * @版本: 
 * @作者: 康如涛
 * @Date: 2019-08-27 13:48:54
 * @最新修改内容: 
 * @LastEditTime : 2020-01-17 01:47:54
 -->
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
      v-loading="saveLoading"
      :modal-append-to-body="false"
    >
      <!-- <el-scrollbar> -->
      <!--2019-11-11 #2620 张朋 弹框自适应高度赋值 -->
      <div :style="{paddingRight:'10px',height:dialogHeight+'px'}">
        <!-- <div :style="{paddingRight:'10px',height:(layoutInfo.height-180)+'px'}"> -->
        <el-scrollbar>
          <el-form :inline="true" label-width="100px" class="demo-form-inline">
            <el-row>
              <el-col :span="8">
                <el-form-item label="交易序列名称" algin="right">
                  <el-input class="filter-item" disabled v-model="schemeInfo.noticeName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="交易品种" algin="right">
                  <el-input class="filter-item" disabled v-model="schemeInfo.tradeVarietyName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="报价方式" algin="right">
                  <el-input class="filter-item" disabled v-model="schemeInfo.quotationMethodName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!-- <div style="margin-bottom: 20px;">
          <el-button
            type="primary"
            v-if="!dialogInfo.notEdit&&btns.btn_add"
            size="small"
            @click="addTab"
          >添加方案</el-button>
          </div>-->
          <div class="f-mt10" style="position:relative; z-index:10;">
            <div
              style="position:absolute; right:10px;top:8px; z-index:11;"
              class="filter-container txt-right"
            >
              <el-button class="filter-item" type="primary" @click="showBenefitCalculation">方案效益测算</el-button>
            </div>
            <div v-if="dialogVisible">
              <el-tabs type="card" v-model="programmeTabsValue">
                <el-tab-pane key="fa_01" name="fa_01" ref="tabfa_01">
                  <span slot="label" v-if="detailInfo.stateCode=='10'">
                    <i class="el-icon-check"></i>
                    方案一
                  </span>
                  <span slot="label" v-else>方案一</span>
                  <!-- 省内交易 -->
                  <!-- 2019-11-19 #2704 郑文杰 交易管理--售电侧报价方案页面优化 添加交易品种为扩需增发专场交易的判断 -->
                  <province-trade
                    :btns="btns"
                    v-if="schemeInfo.tradeVarietyCode=='jypz01'||schemeInfo.tradeVarietyCode=='jypz10'"
                    :orgInfo="orgInfo"
                    :dialogInfo="dialogInfo"
                    ref="tabListfa_01"
                    :announcementInfo="schemeInfo"
                    :quotationSegmentOption="quotationSegmentOption"
                    :detailListData="detailListData"
                    :unitMaps="unitMap"
                  ></province-trade>

                  <!-- 跨省交易 -->
                  <trans-province
                    v-if="schemeInfo.tradeVarietyCode=='jypz02'"
                    :btns="btns"
                    :orgInfo="orgInfo"
                    :dialogInfo="dialogInfo"
                    ref="tabListfa_01"
                    :announcementInfo="schemeInfo"
                    :transactionLineOption="transactionLineOption"
                    :quotationSegmentOption="quotationSegmentOption"
                    :detailListData="detailListData"
                    :unitMaps="unitMap"
                  ></trans-province>

                  <!-- 2019-11-19 #2704 郑文杰 交易管理--售电侧报价方案页面优化 添加交易品种为售电合同转让交易的判断 start-->
                  <!-- 售电合同转让交易 electricityContract-->
                  <electricity-Contract
                    v-if="schemeInfo.tradeVarietyCode=='jypz09'"
                    :btns="btns"
                    :orgInfo="orgInfo"
                    :dialogInfo="dialogInfo"
                    ref="tabListfa_01"
                    :announcementInfo="schemeInfo"
                    :transactionLineOption="transactionLineOption"
                    :quotationSegmentOption="quotationSegmentOption"
                    :transactionClassifyOption="transactionClassifyOption"
                    :assignmentTypeOption="assignmentTypeOption"
                    :detailListData="detailListData"
                    :unitMaps="unitMap"
                  ></electricity-Contract>
                  <!-- 2019-11-19 #2704 郑文杰 交易管理--售电侧报价方案页面优化 添加交易品种为售电合同转让交易的判断 end-->
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <div style="height: 30px;"></div>
      <!-- </el-scrollbar> -->

      <div slot="footer" class="dialog-footer">
        <!--  2019-11-06 #2495 滕超 修改记录 -->
        <el-button style="float:left" v-if="dialogInfo.btnModify" @click="modifyHistory">修改记录</el-button>
        <el-button
          :loading="saveBtnLoading"
          class="save-btn"
          v-if="dialogInfo.btnSave&&!dialogInfo.notEdit"
          @click="save('11')"
        >保存</el-button>
        <el-button
          :loading="submitBtnLoading"
          class="submit-btn"
          v-if="dialogInfo.btnSubmit&&!dialogInfo.notEdit"
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
  deleteInfoByType,
  getPageListModify,
  addChange
} from "@common/api/business/powerSideOffer/centralizedBidding/index";
//#3010 2019-12-06 张亮三 引入请求首页计量单位方法getHomeUnit
import { getHomeUnit } from "@common/api/dashboard/index"
import { mapGetters } from "vuex";
//2019-11-12 #2620 张朋 引用弹框自适应路径
import {
  parseTime,
  getUnitMap,
  getUnitMapByModelCode,
  initDialogHeight
} from "@common/utils/index";
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
    marketSubjectType: { type: String },
    quotationSegmentOption: {
      type: Array
    },
    tradingProductsOption: {
      type: Array
    },
    assignmentTypeOption: {
      type: Array
    },
    transactionClassifyOption: {
      type: Array
    },
    transactionLineOption: {
      type: Array
    },
    unitMaps:{
      type:Object
    }
  },
  components: {
    "province-trade": () => import("./ProvinceTrade"),
    "trans-province": () => import("./TransProvince"),
    "electricity-Contract": () => import("./sdElectricityContract"),
    BenefitCalculation: () => import("./BenefitCalculation")
  },
  data() {
    return {
      saveBtnLoading: false,
      submitBtnLoading: false,
      revieweFormLoading: false,
      programmeTabsValue: "fa_01",
      detailListData: [],
      layoutInfo: {},
      detailInfo: {},
      saveLoading: false,
      programmeTabs: [],
      dialogInfoData: this.dialogInfo,
      schemeInfo: {},
      listLoading: false,
      dialogVisible: false,
      dialogTableVisible: false, //修改记录弹框
      checkListLoading: false,
      gridData: [], //修改记录弹框数据
      modifyHistoryTotal: 0, //修改记录数据总数
      listQuery: {
        //修改记录分页
        limit: 10,
        page: 1,
        businessId: ""
      },
      listForm: {
        detailId: "",
        sdOrgId: "",
        sdOrgName: "",
        fdOrgId: "",
        fdOrgName: "",
        tradingUnitId: "",
        tradingUnitName: "",
        declarationElectricity: "",
        declarationElectricityPrices: "",
        transactionLine: "",
        transactionLineName: "",
        schemeDesc: "",
        quotationPeriod:"",
        quotationPeriodName:"",
        powerPurchaseUnitCode: "" // 2020-06-08   #4161  qinhz  增加购电侧交易单元
      },
      transProvinceForm: {
        sdOrgId: "",
        sdOrgName: "",
        fdOrgId: "",
        fdOrgName: "",
        detailId: "",
        tradingUnitId: "",
        tradingUnitName: "",
        transactionLine: "",
        declarationElectricity: "",
        declarationElectricityPrices: "",
        transactionLine: "",
        transactionLineName: "",
        schemeDesc: "",
        quotationPeriod:"",
        quotationPeriodName:"",
      },
      electricityContractform: {
        detailId: "", //主键
        tradingClassificationCode: "", //交易分类
        tradingClassificationName: "", //交易分类名称
        tradingTypeCode: "", //交易类型
        tradingTypeName: "", //交易类型名称
        sdOrgId: "", //售电公司
        sdOrgName: "", //售电公司名称
        sellTransfereeOrgId: "", //出/受让售电企业
        sellTransfereeOrgName: "", //出/受让售电企业
        contractName: "", //原合同名称
        contractCode: "", //原合同编号
        declarationElectricity: "", //电量
        declarationElectricityPrices: "", //电价
        schemeDesc: "", //备注
        quotationPeriod:"",
        quotationPeriodName:"",
      },
      dialogHeight: "",
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
    },
    programmeTabs(val) {
      if (this.dialogInfo.state != "add") {
        // this.initTabInfo();
      }
    },
    unitMaps(newVal,oldVal){
      log('newVal',newVal)
      this.unitMap = newVal;
    }
  },
  created() {
    if (sessionStorage.getItem("modelCode") == "dashboard") {
      // this.unitMap = getUnitMapByModelCode(
      //   this.allSubMenus,
      //   this.unitMap,
      //   "bilateralConsultation"
      // );
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
    //设置列表数据
    setTabList() {
      let listData = [];
      this.detailListData.forEach((item, index) => {
        let dataInfo = {};
        dataInfo["index"] = index + 1;
        if (
          this.schemeInfo.tradeVarietyCode == "jypz01" ||
          //添加交易品种为扩需增发专场交易的判断
          this.schemeInfo.tradeVarietyCode == "jypz10"
        ) {
          for (let key in this.listForm) {
            dataInfo[key] = item[key];
            if (key.indexOf("Name") < 0) {
              dataInfo[key + "Status"] = "";
              dataInfo[key + "StatusMsg"] = "";
            }
          }
        } else if (this.schemeInfo.tradeVarietyCode == "jypz02") {
          for (let key in this.transProvinceForm) {
            dataInfo[key] = item[key];
            if (key.indexOf("Name") < 0) {
              dataInfo[key + "Status"] = "";
              dataInfo[key + "StatusMsg"] = "";
            }
          }
        } else if (this.schemeInfo.tradeVarietyCode == "jypz09") {
          //当交易品种为售电合同转让交易时
          for (let key in this.electricityContractform) {
            dataInfo[key] = item[key];
            if (key.indexOf("Name") < 0) {
              dataInfo[key + "Status"] = "";
              dataInfo[key + "StatusMsg"] = "";
            }
          }
        }
        listData.push(dataInfo);
      });
      this.detailListData = listData;
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
        this.saveBtnLoading = false;
        this.submitBtnLoading = false;
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
      // if(this.schemeInfo.tradeWayCode == "jyfs04"){
      //   params.detailList.fa_01 = params.detailList.fa_01.forEach(item=>{
      //     delete item.fdOrgId
      //     delete item.fdOrgName
      //     delete item.tradingUnitId
      //     delete item.tradingUnitName
      //   })
      // }
      //#4194 修改传参  gaoaining  2020-06-09
      params.tradeWayCode = this.schemeInfo.tradeWayCode
      addInfo(params).then(res => {
        this.saveLoading = false;
        this.setRequestInfo(res);
      });
    },
    //修改信息
    update(parame) {
      modifyInfo(parame)
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
      let parameInfo = {};
      parameInfo.isErr = false;
      parameInfo.detailList = {};
      this.$refs["tabListfa_01"].checkTab();
      let tableList = this.$refs["tabListfa_01"].tableList;
      let tempArr = [];
      tableList.forEach(item2 => {
        let dataInfo = {};
        if (
          this.schemeInfo.tradeVarietyCode == "jypz01" ||
          // 2019-11-19 #2704 郑文杰 交易管理--售电侧报价方案页面优化 添加交易品种为扩需增发专场交易的判断
          this.schemeInfo.tradeVarietyCode == "jypz10"
        ) {
          for (let key in this.listForm) {
            if (key == "detailId") {
              if (
                item2[key] != "" &&
                typeof item2[key] != "undefined" &&
                item2[key] != null
              ) {
                dataInfo[key] = item2[key];
              }
            } else {
              dataInfo[key] = item2[key];
            }
          }
        } else if (this.schemeInfo.tradeVarietyCode == "jypz02") {
          for (let key in this.transProvinceForm) {
            if (key == "detailId") {
              if (
                item2[key] != "" &&
                typeof item2[key] != "undefined" &&
                item2[key] != null
              ) {
                dataInfo[key] = item2[key];
              }
            } else {
              dataInfo[key] = item2[key];
            }
          }
        } else if (this.schemeInfo.tradeVarietyCode == "jypz09") {
           //当交易品种为售电合同转让交易时
          for (let key in this.electricityContractform) {
            if (key == "detailId") {
              if (
                item2[key] != "" &&
                typeof item2[key] != "undefined" &&
                item2[key] != null
              ) {
                dataInfo[key] = item2[key];
              }
            } else {
              dataInfo[key] = item2[key];
            }
          }
        }
        tempArr.push(dataInfo);
      });
      if (this.$refs["tabListfa_01"].isErr) {
        parameInfo.isErr = true;
      }
      //2019-11-6 张朋 判断isErrInfo并赋值
      if (typeof this.$refs["tabListfa_01"].isErrInfo != "undefined") {
        parameInfo.isErrInfo = this.$refs["tabListfa_01"].isErrInfo;
      }
      parameInfo.detailList["fa_01"] = tempArr;
      return parameInfo;
    },
    //提交保存
    save(state) {
      this.saveBtnLoading = true;
      this.submitBtnLoading = true;
      this.saveLoading = true;
      let parame = {};
      parame.stateCode = state;
         //2020-1-16 #3602 zhangpeng 添加参数
      parame.tradeVarietyCode = this.schemeInfo.tradeVarietyCode;
      parame.tradingWay  = this.schemeInfo.tradeWayCode;
      parame.noticeId = this.schemeInfo.noticeId;
      parame.orgId = this.orgInfo.id;
      parame.marketSubjectType = "1";
      // parame.quotationPeriod = this.schemeInfo.quotationPeriod;
      let parameInfo = this.setParameList();
      if (parameInfo.isErr) {
        this.saveLoading = false;
        /**2019-11-1 #2534 张朋 保存失败放开按钮加载  start*/
        this.saveBtnLoading = false;
        this.submitBtnLoading = false;
        /**2019-11-1 #2534 张朋 保存失败放开按钮加载  end*/

        if (typeof parameInfo.isErrInfo != "undefined") {
          if (parameInfo.isErrInfo != "") {
            this.$confirm(parameInfo.isErrInfo, "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                this.saveLoading = true;
                parame.detailList = parameInfo.detailList;
                if (this.dialogInfoData.status == "add") {
                  this.createInfo(parame);
                } else if(this.dialogInfoData.status == "edit"){
                  parame.schemeId = this.schemeInfo.schemeId;
                  this.update(parame);
                }else if(this.dialogInfoData.status == "change"){
                  parame.schemeId = this.schemeInfo.schemeId;
                  this.addChange(parame);
                }
              })
              .catch(() => {
                this.saveLoading = false;
                console.log("错误异常");
              });
          }
        } else {
          return false;
        }
      }
      /**2019-11-6 #2556 张朋  备注多余代码 start */
      // if (parameInfo.isErr) {
      //   this.saveLoading = false;
      //   /**2019-11-1 #2534 张朋 保存失败放开按钮加载  start*/
      //   this.saveBtnLoading = false;
      //   this.submitBtnLoading = false;
      //   /**2019-11-1 #2534 张朋 保存失败放开按钮加载  end*/
      //   return false;
      // }
      /**2019-11-6 #2556 张朋  备注多余代码 end */
      else {
        parame.detailList = parameInfo.detailList;

        this.saveLoading = true;
        if (this.dialogInfoData.status == "add") {
          this.createInfo(parame);
        } else if(this.dialogInfoData.status == "edit"){
          parame.schemeId = this.schemeInfo.schemeId;
          this.update(parame);
        }else if(this.dialogInfoData.status == "change"){
          parame.schemeId = this.schemeInfo.schemeId;
          this.addChange(parame);
        }
      }
    },
    modifyHistory() {
      this.dialogTableVisible = true;
      this.getList();
    },
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
    //显示新增
    showDialog(data) {
      this.saveBtnLoading = false;
      this.submitBtnLoading = false;
      this.detailListData = [];
      this.schemeInfo = data;
      this.detailInfo = {};
      // this.addTab();
      this.programmeTabsValue = "fa_01";
      this.dialogVisible = true;
    },
    initTabInfo() {
      let keys = [];
      let detailList = this.detailInfo.detailList.fa_01;
      for (let key in detailList) {
        this.setTabList(key);
      }
    },
    //显示编辑
    showEditDialog(schemeInfo, detailInfo) {
      this.saveBtnLoading = false;
      this.submitBtnLoading = false;
      this.programmeTabsValue = "fa_01";
      if (typeof detailInfo.detailList.fa_01 != "undefined") {
        this.detailListData = detailInfo.detailList.fa_01;
        this.schemeInfo = schemeInfo;
        this.detailInfo = detailInfo;
        this.setTabList("fa_01");
        this.dialogVisible = true;
      } else {
        this.schemeInfo = schemeInfo;
        this.detailInfo = detailInfo;
        this.detailListData = [];
        this.dialogVisible = true;
      }
    },
    //查看信息窗口
    showViewsDialog(schemeInfo, detailInfo) {
      this.programmeTabsValue = "fa_01";
      if (typeof detailInfo.detailList.fa_01 != "undefined") {
        this.detailListData = detailInfo.detailList.fa_01;
        this.schemeInfo = schemeInfo;
        this.detailInfo = detailInfo;
        this.setTabList("fa_01");
        this.dialogVisible = true;
      } else {
        this.schemeInfo = schemeInfo;
        this.detailInfo = detailInfo;
        this.detailListData = [];
        this.dialogVisible = true;
      }
      this.dialogVisible = true;
    },
    //效益测算
    showBenefitCalculation() {
      let sureData = this.setParameList();
      if (JSON.stringify(sureData.detailList) == "{}") {
        this.$confirm("请先创建报价方案", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
      } else {
        this.$refs["benefitCalculation"].showDialog(
          this.schemeInfo,
          this.programmeTabsValue
        );
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.w-half {
  width: 80px !important;
}
</style>





