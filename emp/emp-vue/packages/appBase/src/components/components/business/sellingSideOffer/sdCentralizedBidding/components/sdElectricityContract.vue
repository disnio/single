<!--
 * @功能描述: 交易品种为售电合同转让交易,交易方式为集中竞价时的弹框
 * @版本: 
 * @作者: 郑文杰
 * @Date: 2019-11-20 15:04:22
 * @最新修改内容: 
 * @LastEditTime : 2020-01-16 20:38:26
 -->
<template>
  <!--售电合同转让交易-->
  <div class="app-container calendar-list-container">
    <el-row>
      <el-col :span="24">
        <div class="txt-right unit-info">单位:{{unitMap.electricityUnit}},{{unitMap.priceUnit}}</div>
      </el-col>
    </el-row>
    <el-table
      :key="tableKey"
      :data="tableList"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      :height="tabHeight"
    >
      <el-table-column prop="index" label="序号" align="center" width="60px"></el-table-column>
      <!-- <el-table-column align="center" width="150" label="交易分类">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.tradingClassificationCodeStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.tradingClassificationCodeStatusMsg"
            placement="top"
          >
            <el-select
              style="width:100%;"
              :disabled="dialogInfo.notEdit"
              :class="scope.row.tradingClassificationCodeStatus"
              v-model="scope.row.tradingClassificationCode"
              @change="changeTradingClass"
            >
              <el-option
                v-for="(item,index) in transactionClassifyOption"
                :key="index"
                :label="item.propName"
                :value="item.propCode"
              ></el-option>
            </el-select>
          </el-tooltip>
          <el-select
            v-else
            style="width:100%;"
            :disabled="dialogInfo.notEdit"
            v-model="scope.row.tradingClassificationCode"
            @change="changeTradingClass"
          >
            <el-option
              v-for="(item,index) in transactionClassifyOption"
              :key="index"
              :label="item.propName"
              :value="item.propCode"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>-->

      <el-table-column align="center" width="120" label="类型">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.tradingTypeCodeStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.tradingTypeCodeStatusMsg"
            placement="top"
          >
            <el-select
              style="width:100%;"
              :class="scope.row.tradingTypeCodeStatus"
              v-model="scope.row.tradingTypeCode"
            >
              <el-option
                v-for="(item,index) in assignmentTypeOption"
                :key="index"
                :disabled="dialogInfo.notEdit"
                :label="item.propName"
                :value="item.propCode"
              ></el-option>
            </el-select>
          </el-tooltip>
          <el-select
            v-else
            style="width:100%;"
            :disabled="dialogInfo.notEdit"
            v-model="scope.row.tradingTypeCode"
          >
            <el-option
              v-for="(item,index) in assignmentTypeOption"
              :key="index"
              :label="item.propName"
              :value="item.propCode"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column align="center" width="150" label="售电公司">
        <template slot-scope="scope">
          <el-input v-model="scope.row.sdOrgName" disabled></el-input>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="原合同编号">
        <template slot-scope="scope">
          <!-- 20191210 源代码有校验不符合需求已去掉 -->
          <!-- :class="scope.row.declarationElectricityPricesStatus" -->
          <el-input
            :disabled="dialogInfo.notEdit"
            v-model="scope.row.contractCode"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px" label="原合同名称">
        <template slot-scope="scope">
            <!-- :class="scope.row.declarationElectricityPricesStatus" -->
          <el-input
            :disabled="dialogInfo.notEdit"
            v-model="scope.row.contractName"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column v-if="dialogInfo.status == 'view'" align="center" width="100" label="报价段">
        <template slot-scope="scope">
          <el-input :disabled="dialogInfo.notEdit" v-model="scope.row.quotationStallName"></el-input>
        </template>
      </el-table-column>
      <el-table-column v-else align="center" width="120" label="报价段">
        <template slot-scope="scope">
          <el-select
            v-if="dialogInfo.status == 'add'"
            style="width:100%;"
            disabled
            :class="scope.row.quotationStallStatus"
            v-model="scope.row.quotationStall"
          >
            <el-option
              v-for="(item,index) in quotationSegmentOptionData"
              :key="index"
              :label="item.propName"
              :value="item.propCode"
            ></el-option>
          </el-select>
          <el-select
            v-else
            style="width:100%;"
            disabled
            :class="scope.row.quotationStallStatus"
            v-model="scope.row.quotationStall"
          >
            <el-option
              v-for="(item,index) in quotationSegmentOptionData"
              :key="index"
              :label="item.quotationStallName"
              :value="item.quotationStall"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column align="center" width="120" label="申报电量">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.declarationElectricityStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :enterable="false"
            :content="scope.row.declarationElectricityStatusMsg"
            placement="top"
          >
            <el-input
              :class="scope.row.declarationElectricityStatus"
              type="number"
              :disabled="dialogInfo.notEdit"
              v-model="scope.row.declarationElectricity"
            ></el-input>
          </el-tooltip>
          <el-input
            v-else
            v-model="scope.row.declarationElectricity"
            :disabled="dialogInfo.notEdit"
            type="number"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="申报电价">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.declarationElectricityPricesStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.declarationElectricityPricesStatusMsg"
            placement="top"
          >
            <el-input
              :class="scope.row.declarationElectricityPricesStatus"
              type="number"
              :disabled="dialogInfo.notEdit"
              v-model="scope.row.declarationElectricityPrices"
            ></el-input>
          </el-tooltip>
          <el-input
            v-else
            v-model="scope.row.declarationElectricityPrices"
            :disabled="dialogInfo.notEdit"
            type="number"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column align="center" width="120" label="备注">
        <template slot-scope="scope">
          <el-input :disabled="dialogInfo.notEdit" v-model="scope.row.schemeDesc"></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {
  getOrgListByClassification,
  getCurrentUserOrg
} from "@common/api/business/bilateralNegotiation/index";
import { getTitleData } from "@common/api/business/sellingSideOffer/sdCentralizedBidding/index";
import { deleteInfoById } from "@common/api/business/powerSideOffer/centralizedBidding/index";
import { mapGetters } from "vuex";
import { getOrgByName } from "@common/api/admin/orgStruManage/index";
import { getSelectList } from "@common/api/base";
import { initLayoutInfo } from "@common/utils/init";
import {
  getUnitMapByModelCode,
  getUnitMap,
  initDialogHeight
} from "@common/utils/index";
export default {
  name: "transProvince",
  props: {
    schemeInfo: { type: Object },
    dialogInfo: { type: Object },
    orgInfo: { type: Object },
    btns: { type: Object },
    programme: { type: String },
    announcementInfo: { type: Object },
    quotationSegmentOption: {
      type: Array
    },
    tradingUnitOption: {
      type: Array
    },
    transactionLineOption: {
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
    detailListData: {
      type: Array
    },
    unitMaps:{
      type:Object
    }
  },
  data() {
    return {
      // shenbaoTotal: "",
      // distributionBtn: true,
      tabHeight: 200,
      tradingType:"",//#3279 2019-12-25 张亮三 增加字段用于当类型改变时保存类型值
      distributionData: "",
      totalMonthBidElectricity: "",
      totalMonthBidProvElectricity: "",
      totalMonthBidProvProportion: "",
      numberArray: [],
      distributionDialogVisible: false,
      distributionOptions: [],
      value1: "固定比例",
      isErr: false,
      listLoading: false,
      tableKey: 0,
      tableList: [],
      quotationSegmentOptionData: [],

      announcementInfoData: this.announcementInfo,
      form: {
        detailId: "",
        tradingClassificationCode: "", //交易分类
        tradingClassificationName: "", //交易分类名称
        tradingTypeCode: "", //交易类型
        tradingTypeName: "", //交易类型名称
        declarationElectricity: "申报电量/意向摘牌电量",
        declarationElectricityPrices: "申报电价/意向摘牌电价",
        sdOrgId: "售电公司",
        sdOrgName: "售电公司名称",
        tradingUnitId: "交易单元",
        tradingUnitName: "交易单元名称",
        quotationStall: "",
        quotationStallName: "",
        transactionLine: "线路",
        transactionLineName: "线路名称",
        schemeDesc: "备注"
      },
      isErrInfo: "",

      unitMap: {}
    };
  },
  watch: {
    announcementInfo(val) {
      this.announcementInfoData = val;
    },
    detailListData(val) {
      this.init();
    },
    unitMaps(newVal,oldVal){
      this.unitMap = newVal;
    }
  },
  created() {
    if (sessionStorage.getItem("modelCode") == "dashboard") {
      // this.unitMap = getUnitMapByModelCode(
      //   this.allSubMenus,
      //   this.unitMap,
      //   "sdCentralizedBidding"
      // );
      // #3010 2019-12-10 张亮三 修改首页单位不显示问题
      this.unitMap = this.unitMaps;
    } else {
      this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
    }
    this.init();
    this.changeTradingClass(this.detailListData.tradingClassificationCode);
    this.setLayoutHeight();
  },
  computed: {
    ...mapGetters(["elements", "orgId", "allSubMenus"])
  },
  methods: {
    //设置表格高度
    setLayoutHeight() {
      let layoutInfo = initLayoutInfo();
      //this.tabHeight = layoutInfo.height- 380;
      this.tabHeight = initDialogHeight() * 0.55 + "px"; //2019-11-12 #2620 张朋 修改计算的表格高度
    },
    init() {
      getSelectList("Distribution_Mode").then(res => {
        this.distributionOptions = res;
      });
      let parme = {
        orgId: this.orgId,
        declarationTime: this.announcementInfoData.tradeIssure
      };
      getTitleData(parme).then(res => {
        this.totalMonthBidElectricity = res.totalMonthBidElectricity; //月竞总电量
        this.totalMonthBidProvElectricity = res.totalMonthBidProvElectricity; //省内交易电量

        if (
          res.totalMonthBidProvProportion == undefined ||
          res.totalMonthBidProvProportion == ""
        ) {
          this.totalMonthBidProvProportion = "";
        } else {
          this.totalMonthBidProvProportion =
            res.totalMonthBidProvProportion * 100; //月竞省内占比
        }
        // this.totalMonthBidElectricity = 100; //月竞总电量
        // this.totalMonthBidProvElectricity = 50; //省内交易电量
        // this.totalMonthBidProvProportion = 50; //月竞省内占比
      });
      if (this.dialogInfo.status == "add") {
        this.setQuotationSubsection();
      } else {
        this.tableList = this.detailListData;
        this.quotationSegmentOptionData = this.detailListData;
      }
    },

    //设置报价分段下拉选项
    setQuotationSubsection() {
      this.quotationSegmentOptionData = [];
      this.tableList = [];
      this.distributionData = Number(
        this.announcementInfoData.quotationSubsection
      );
      let quotationSubsection = Number(
        this.announcementInfoData.quotationSubsection
      );

      for (let i = 0; i < quotationSubsection; i++) {
        this.quotationSegmentOptionData.push(this.quotationSegmentOption[i]);

        this.addRow(this.quotationSegmentOption[i]);
      }
    },
    //获取交易分类
    changeTradingClass(val) {
      getCurrentUserOrg().then(res => {
        this.province = res.provinceCode;
      });
      let qq = {
        tradingClassificationCode: val,
        province: this.province,
        attributeTypeCode: "zzjgsx01"
      };
      getOrgListByClassification(qq).then(res => {
        this.lineOptionData = res.data;
      });
    },
    //获取列表数据
    getListData(data) {
      this.tableList = [];
      data.forEach(item => {
        item.declarationElectricityPricesStatus = ""; //申报电价
        item.tradingUnitIdStatus = ""; //交易电源
        item.quotationStallStatus = ""; //报价段
        item.declarationElectricityStatus = ""; //申报电量
        item.declarationElectricityStatusMsg = "";
        item.declarationElectricityPricesStatusMsg = "";
        item.tradingUnitIdStatusMsg = "";
        item.quotationStallStatusMsg = "";
        item.transactionLineStatus = "";
        item.transactionLineStatusMsg = "";
        this.tableList.push(item);
      });
    },
    //检测交易单元与分段报价唯一性
    checkTradingUnit(data) {
      let isErr = false;
      this.tableList.forEach(item => {
        if (data.index > item.index) {
          if (
            data.tradingUnitId == item.tradingUnitId &&
            data.quotationStall == item.quotationStall
          ) {
            //  item.tradingUnitIdStatus="ipt-err-true";
            isErr = true;
          }
        }
      });
      return isErr;
    },
    //检测表格数据
    checkTab(data) {
      this.isErr = false;
      this.isErrInfo = "";
      let totalNumber = "";
      for (let i = 0, l = this.tableList.length; i < l; i++) {
        totalNumber =
          Number(totalNumber) +
          Number(this.tableList[i].declarationElectricity);
        this.tableList[i].declarationElectricityStatus = "";
        this.tableList[i].declarationElectricityPricesStatus = "";
        // this.tableList[i].quotationStallStatus = "";
        this.tableList[i].tradingUnitIdStatus = "";
        if (
          this.tableList[i].declarationElectricity == "" ||
          typeof this.tableList[i].declarationElectricity == "undefined"
        ) {
          this.tableList[i].declarationElectricityStatus = "ipt-err-true"; //交易电量
          this.tableList[i].declarationElectricityStatusMsg =
            "申报电量信息为空";
          this.isErr = true;
        } else {
          // #3279 2019-12-25 张亮三 增加类型判断，当类型为 '(出让/csrlx_01)' 时申报电量不能为正值，当类型为 （受让/csrlx_02）时申报电量不能为负值 start
         if (this.tableList[i].tradingTypeCode == 'csrlx_01' && this.tableList[i].declarationElectricity > 0) {
            this.tableList[i].declarationElectricityStatus = "ipt-err-true";
            this.tableList[i].declarationElectricityStatusMsg =
              "申报电量不能为正值";
            this.isErr = true;
          }else if(this.tableList[i].tradingTypeCode == 'csrlx_02' && this.tableList[i].declarationElectricity < 0){
            this.tableList[i].declarationElectricityStatus = "ipt-err-true"; 
            this.tableList[i].declarationElectricityStatusMsg =
              "申报电量不能为负值";
            this.isErr = true;
          }
          // else if(this.tableList[i].tradingTypeCode == null && this.tableList[i].declarationElectricity < 0){
          //     this.tableList[i].declarationElectricityStatus = "ipt-err-true"; 
          //     this.tableList[i].declarationElectricityStatusMsg =
          //       "申报电量不能为负值";
          //     this.isErr = true;
            
          // }
          // #3279 2019-12-25 张亮三 增加类型判断，当类型为 '(出让/csrlx_01)' 时申报电量不能为正值，当类型为 （受让/csrlx_02）时申报电量不能为负值 end
        }
        // #3050 wangc 20191210 根据企业参数电价条件判断
        if (data == "1") {
          if (
            this.tableList[i].declarationElectricityPrices == "" ||
            typeof this.tableList[i].declarationElectricityPrices == "undefined"
          ) {
            this.tableList[i].declarationElectricityPricesStatus =
              "ipt-err-true"; //交易电价
            this.tableList[i].declarationElectricityPricesStatusMsg =
              "申报电价信息为空";
            this.isErr = true;
          } else {
            if (this.announcementInfo.quotationMethod == "bjfs01") {
              if (this.tableList[i].declarationElectricityPrices > 0) {
                this.tableList[i].declarationElectricityPricesStatus =
                  "ipt-err-true"; //交易电价
                this.tableList[i].declarationElectricityPricesStatusMsg =
                  "申报电价应为负值";
                this.isErr = true;
              }
            }
          }
        }
      }
    },

    //初始化表格数据
    initTableData() {
      this.tableList = [];
    },
    // //设置表格数据
    // setList(data) {
    //   this.addRow();
    //   this.tableList = data;
    // },
    //模糊查询发电公司
    queryFdOrg(queryString, cb) {
      var list = [{}];
      let attributeTypeCode = "zzjgsx01";
      getOrgByName({ orgName: queryString }, attributeTypeCode).then(res => {
        if (typeof res.dataList != "undefined") {
          if (res.dataList.length > 0) {
            res.dataList.forEach(item => {
              list.push({
                value: item.orgName,
                orgId: item.id
              });
            });
          }
        }
        cb(list);
      });
    },
    //添加表格行
    addRow(query) {
      let index = this.tableList.length + 1;
      var newData = {};
      newData.index = index;
      for (let key in this.form) {
        if (key.indexOf("Name") < 0) {
          if (key == "quotationStall") {
            newData[key] = query.propCode;
            newData[key + "Status"] = "";
            newData[key + "StatusMsg"] = "";
          } else {
            newData[key] = "";
            newData[key + "Status"] = "";
            newData[key + "StatusMsg"] = "";
          }
        } else {
          newData[key] = "";
        }
      }
      newData.transactionLine = this.announcementInfoData.tieLineId;
      newData.transactionLineName = this.announcementInfoData.tieLineName;
      newData.sdOrgId = this.orgInfo.id;
      newData.sdOrgName = this.orgInfo.orgName;
      this.tableList.push(newData);
    }
  }
};
</script>

<style scoped>
.el-input.ddw1 {
  width: 50%;
}
.el-input input {
  text-align: right;
}
.el-select .el-input input {
  text-align: left;
}
</style>

