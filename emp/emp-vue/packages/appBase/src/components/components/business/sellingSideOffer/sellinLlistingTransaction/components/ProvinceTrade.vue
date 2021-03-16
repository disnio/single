<template>
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
      <!-- <el-table-column align="center" type="selection"></el-table-column> -->
      <el-table-column prop="index" label="序号" align="center" width="60px"></el-table-column>
      <!-- <el-table-column
        v-if="announcementInfo.tradeVarietyCode == 'jypz09'"
        align="center"
        width="150"
        label="交易分类"
      >
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
      </el-table-column> -->

      <el-table-column
        v-if="announcementInfo.tradeVarietyCode == 'jypz09'"
        align="center"
        width="120"
        label="类型"
      >
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

      <el-table-column
        v-if="announcementInfo.tradeVarietyCode == 'jypz02'"
        align="center"
        label="线路"
      >
        <template slot-scope="scope">
          <!-- <el-select
            style="width:100%;"
            :disabled="dialogInfo.notEdit"
            :class="scope.row.transactionLineStatus"
            v-model="scope.row.transactionLine"
          >
            <el-option
              v-for="(item, index) in transactionLineOption"
              :key="index"
              :label="item.tieLineName"
              :value="item.tieLineId"
            >
            </el-option>
          </el-select>-->
          <el-input v-model="scope.row.transactionLineName" disabled></el-input>
        </template>
      </el-table-column>
      <!-- 李志佳 2019年12月2日14:04:12  #2895 页面样式修改 -->
      <el-table-column  align="center" label="售电公司">
        <template slot-scope="scope">
          <el-input v-model="scope.row.sdOrgName" disabled></el-input>
        </template>
      </el-table-column>
      <!-- 2020-06-04 #4161  qinhz 售电侧报价方案-交易品种为省内直接交易,交易方式为挂牌交易-新增购电侧交易单元字段 start-->
      <el-table-column align="center" width="120px" v-if="announcementInfo.tradeVarietyCode == 'jypz01' && (announcementInfo.tradeWayCode == 'jyfs01' || announcementInfo.tradeWayCode == 'jyfs03') && isShow" label="购电侧交易单元">
        <template slot-scope="scope">              
          <el-select
            style="width:100%;"
            v-model="scope.row.powerPurchaseUnitCode"
            @change="tradingUnit($event, scope.row)"
            clearable
            :disabled="dialogInfo.notEdit"
          >
            <el-option
              v-for="(item, index) in powerTestTransactionUnit"
              :key="index"
              :label="item.propName"
              :value="item.propCode"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <!-- 2020-06-04 #4161  qinhz 售电侧报价方案-交易品种为省内直接交易,交易方式为挂牌交易-新增购电侧交易单元字段 end-->

      <el-table-column
        v-if="announcementInfo.tradeVarietyCode == 'jypz09'"
        width="120px"
        align="center"
        label="原合同编号"
      >
            <!-- :class="scope.row.declarationElectricityPricesStatus" -->
        <template slot-scope="scope">
          <el-input
            :disabled="dialogInfo.notEdit"
            v-model="scope.row.contractCode"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        v-if="announcementInfo.tradeVarietyCode == 'jypz09'"
        align="center"
        width="120px"
        label="原合同名称"
      >
            <!-- 20191210需求无校验已去除 -->
            <!-- :class="scope.row.declarationElectricityPricesStatus" -->
        <template slot-scope="scope">
          <el-input
            :disabled="dialogInfo.notEdit"
            v-model="scope.row.contractName"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="挂牌电量">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.declarationElectricityStatus == 'ipt-err-true'"
            class="item"
            effect="dark"
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
      <el-table-column width="120px" align="center" label="挂牌电价">
        <template slot-scope="scope">
          <el-tooltip
            v-if="
              scope.row.declarationElectricityPricesStatus == 'ipt-err-true'
            "
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
       <!-- 2019年11月28日10:19:25 李志佳 #2895  调整页面显示-->
      <el-table-column align="center"  label="备注">
        <template slot-scope="scope">
          <el-input :disabled="dialogInfo.notEdit" v-model="scope.row.schemeDesc"></el-input>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" v-if="!dialogInfo.notEdit">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.index == tableList.length"
            icon="el-icon-plus"
            size="small"
            type="primary"
            @click="addRow"
          ></el-button>
          <el-button size="small" type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {
  getOrgListByClassification,
  getCurrentUserOrg,
  getValueByOrgIdAndCode, //是否启用审批流
  getPowerTestTransactionUnit //获取购电侧交易单元
} from "@common/api/business/bilateralNegotiation/index";
import { deleteInfoById } from "@common/api/business/powerSideOffer/centralizedBidding/index";
import { mapGetters } from "vuex";
import { getOrgByName } from "@common/api/admin/orgStruManage/index";
import { getAllLinList } from "@common/api/basicData/TMdataTieLin/index";
import { initLayoutInfo } from "@common/utils/init";
//2019-11-11 #2620 张朋 引用弹框自适应路径
import {
  getUnitMapByModelCode,
  getUnitMap,
  initDialogHeight
} from "@common/utils/index";
export default {
  name: "provinceTrade",
  props: {
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
    transactionClassifyOption: {
      //交易分类
      type: Array
    },
    assignmentTypeOption: {
      //交易类型
      type: Array
    },
    transactionLineOption: { type: Array },
    unitMaps:{
      type:Object
    }
  },
  data() {
    return {
      powerTestTransactionUnit: [], //购电侧交易单元
      isShow: false,
      tabHeight: 200,
      isErr: false,
      listLoading: false,
      tableKey: 0,
      tradingType:"",//#3279 2019-12-25 张亮三 增加字段用于当类型改变时保存类型值
      tableList: [],
      quotationSegmentOptionData: [],
      announcementInfoData: this.announcementInfo,
      form: {
        announcementInfo: "",
        customerId: "客户id",
        customerName: "客户名称",
        declarationElectricity: "申报电量/意向摘牌电量",
        declarationElectricityPrices: "申报电价/意向摘牌电价",
        detailId: "发电公司",
        //fdOrgName: "发电公司名称",
        schemeId: "方案表id",
        sdOrgId: "售电公司",
        sdOrgName: "售电公司名称",
        // sellTransfereeOrgId:'出/受让发电企业',
        // sellTransfereeOrgName:'出/受让发电企业名称',
        // sellTransfereeUnit:'出/受让机组',
        tradingClassificationCode: "交易分类",
        tradingClassificationName: "交易分类名称",
        tradingProduct: "产品/交易产品",
        tradingProductName: "产品/交易产品名称",
        tradingTypeCode: "交易类型",
        tradingTypeName: "交易类型名称",
        tradingUnitId: "交易单元",
        tradingUnitName: "交易单元名称",
        tradingVarietyCode: "交易品种",
        tradingVarietyName: "交易品种名称",
        contractCode: "", //合同编号
        contractName: "", //合同名称
        transactionLine: "",
        transactionLineName: "",
        powerPurchaseUnitCode: "购电侧交易单元",
        powerPurchaseUnitName: "购电侧交易单元名称",
        unit: "机组",
        schemeDesc: "备注"
      },
      unitMap: {}
    };
  },
  watch: {
    transactionLineOption(val) {
      this.transactionLineOption = val;
    },
    announcementInfo(val) {
      this.announcementInfoData = val;

      this.form.transactionLine = this.announcementInfoData.tieLineId;
      this.form.transactionLineName = this.announcementInfoData.tieLineName;
    },
    unitMaps(newVal,oldVal){
      this.unitMap = newVal;
    }
  },
  created() {
    this.getValueByOrgIdAndCode();
    this.getPowerTestTransactionUnit();
    if (sessionStorage.getItem("modelCode") == "dashboard") {
      // this.unitMap = getUnitMapByModelCode(
      //   this.allSubMenus,
      //   this.unitMap,
      //   "bilateralConsultation"
      // );
      // #3010 2019-12-10 张亮三 修改首页单位不显示问题
      this.unitMap = this.unitMaps;
    } else {
      this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
    }
    this.init();
    this.setLayoutHeight();
  },
  computed: {
    ...mapGetters(["elements", "allSubMenus"])
  },
  methods: {
    tradingUnit(data,row) {},
    async getValueByOrgIdAndCode() {
      let params = {};
      params.parameterCode = "1030016";
      params.configurationId = "3";
      let res = await getValueByOrgIdAndCode(params);   
      if (res == "0") {
        // 交易报价方案和结果是否展示购电侧交易单元
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    async getPowerTestTransactionUnit() {
      let id = this.announcementInfoData.tradeCenterId;
      let res = await getPowerTestTransactionUnit(id);
      this.powerTestTransactionUnit = res.data
    },
    //设置表格高度
    setLayoutHeight() {
      let layoutInfo = initLayoutInfo();
      //this.tabHeight = layoutInfo.height- 360;
      this.tabHeight = initDialogHeight() * 0.55 + "px"; //2019-11-12 #2620 张朋 修改计算的表格高度
    },
    init() {
      this.form.transactionLine = this.announcementInfoData.tieLineId;
      this.form.transactionLineName = this.announcementInfoData.tieLineName;
      if (this.tableList.length == 0) {
        this.addRow();
        this.setQuotationSubsection();
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
    //设置报价分段下拉选项
    setQuotationSubsection() {
      this.quotationSegmentOptionData = [];
      let quotationSubsection = Number(
        this.announcementInfo.quotationSubsection
      );
      for (let i = 0; i < quotationSubsection; i++) {
        this.quotationSegmentOptionData.push(this.quotationSegmentOption[i]);
      }
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
      for (let i = 0, l = this.tableList.length; i < l; i++) {
        this.tableList[i].declarationElectricityStatus = "";
        this.tableList[i].declarationElectricityPricesStatus = "";
        this.tableList[i].quotationStallStatus = "";
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
            this.tableList[i].declarationElectricityStatus = "ipt-err-true"; //交易电价
            this.tableList[i].declarationElectricityStatusMsg =
              "申报电量不能为正值";
            this.isErr = true;
          }else if(this.tableList[i].tradingTypeCode == 'csrlx_02' && this.tableList[i].declarationElectricity < 0){
            this.tableList[i].declarationElectricityStatus = "ipt-err-true"; //交易电价
            this.tableList[i].declarationElectricityStatusMsg =
              "申报电量不能为负值";
            this.isErr = true;
             }
          // else if(this.tableList[i].tradingTypeCode == null && this.tableList[i].declarationElectricity < 0){
          //     this.tableList[i].declarationElectricityStatus = "ipt-err-true"; //交易电价
          //     this.tableList[i].declarationElectricityStatusMsg =
          //       "申报电量不能为负值";
          //     this.isErr = true;
          // }
          // #3279 2019-12-25 张亮三 增加类型判断，当类型为 '(出让/csrlx_01)' 时申报电量不能为正值，当类型为 （受让/csrlx_02）时申报电量不能为负值 end
        }
        // #3050 wangc 20191210 根据企业参数电价条件判断
        if (data=="1") {          
          if (
            this.tableList[i].declarationElectricityPrices == "" ||
            typeof this.tableList[i].declarationElectricityPrices == "undefined"
          ) {
            this.tableList[i].declarationElectricityPricesStatus = "ipt-err-true"; //交易电价
            this.tableList[i].declarationElectricityPricesStatusMsg =
              "申报电价信息为空";
            this.isErr = true;
          } else {
            if (this.announcementInfo.quotationMethod == "bjfs01") {
              if (this.tableList[i].declarationElectricityPrices >= 0) {
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
      this.addRow();
    },
    //设置表格数据
    setList(data) {
      this.addRow();
      this.tableList = data;
    },
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
    addRow() {
      let index = this.tableList.length + 1;
      var newData = {
        index: index,
        sdOrgId: this.orgInfo.id,
        // fdOrgName: this.orgInfo.orgName,
        sdOrgName: this.orgInfo.orgName,
        tradingUnitId: "",
        tradingUnitName: "",
        quotationStall: "",
        quotationStallName: "",
        declarationElectricity: "",
        declarationElectricityPrices: "",
        declarationElectricityStatus: "",
        declarationElectricityPricesStatus: "",
        tradingUnitIdStatus: "",
        quotationStallStatus: "",
        declarationElectricityStatusMsg: "",
        declarationElectricityPricesStatusMsg: "",
        tradingUnitIdStatusMsg: "",
        quotationStallStatusMsg: "",
        transactionLine: this.announcementInfoData.tieLineId,
        transactionLineName: this.announcementInfoData.tieLineName
      };
      this.tableList.push(newData);

      //    this.form.transactionLine=this.announcementInfoData.tieLineId;
      // this.form.transactionLineName=this.announcementInfoData.tieLineName;
    },

    //移除行信息
    delRowData(row) {
      this.tableList.splice(row, 1);
      let items = this.tableList.map((item, index) => {
        item.index = index + 1;
        return item;
      });
      this.tableList = items;
      if (this.tableList.length == 0) {
        this.addRow();
      }
    },
    //删除行信息
    handleDelete(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (typeof row.detailId == "undefined") {
          this.delRowData(row);
        } else {
          if (row.detailId == "") {
            this.delRowData(row);
          } else {
            deleteInfoById(row.detailId).then(res => {
              if (res.rel) {
                this.$notify({
                  title: "成功",
                  message: "删除成功",
                  type: "success",
                  duration: 2000
                });
                this.delRowData(row);
              } else {
                this.$notify({
                  title: "提示",
                  message: res.msg,
                  type: "warning",
                  duration: 2000
                });
              }
            });
          }
        }
        return false;
      });
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





