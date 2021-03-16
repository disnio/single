<!--
 * @功能描述: 
 * @版本: 
 * @作者: 康如涛
 * @Date: 2019-08-27 13:48:54
 * @最新修改内容: 
 * @LastEditTime: 2020-12-24 09:54:47
 -->
<template>
  <!--跨省交易-->
  <div class="app-container calendar-list-container">
    <!-- 李志佳 2019年11月27日15:34:16 只在月季数据中显示-->
    <!-- <el-row v-if="this.announcementInfoData.tradeCycleCode=='jyzq03'">
      <el-col :span="6">
        <div>省内月竞交易电量:{{totalMonthBidProvElectricity}} {{unitMap.electricityUnit}}</div>
      </el-col>
      <el-col :span="6">
        <div>月竞交易总电量:{{totalMonthBidElectricity}} {{unitMap.electricityUnit}}</div>
      </el-col>
      <el-col :span="6">
        <div>省内月竞交易电量占比:{{totalMonthBidProvProportion|keepTwoNum}} %</div>
      </el-col>
      <el-col :span="6">
        <div style="padding-bottom:5px;">
          <el-select
            :disabled="dialogInfo.notEdit"
            style="width:60%;"
            v-model="value1"
          >
            <el-option
              v-for="item in distributionOptions"
              :key="item.index"
              :label="item.propName"
              :value="item.propCode"
            >
            </el-option>
          </el-select>
          <el-button
            :disabled="dialogInfo.notEdit"
            @click="IntelligenceDistribution"
            type="primary"
          >智能分配</el-button>
        </div>
      </el-col>
    </el-row> -->
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
      <el-table-column
        prop="index"
        label="序号"
        align="center"
        width="60px"
      ></el-table-column>
      <el-table-column
        align="center"
        width="225"
        label="售电公司"
      >
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.sdOrgName"
            disabled
          ></el-input>
        </template>
      </el-table-column>
 <!-- 2019-10-29   #2353  康如涛 修改查看时报价段显示 start-->
            <el-table-column  v-if="dialogInfo.status == 'view'"  align="center"  width="100"   label="报价段">
              <template slot-scope="scope">
                 <el-input 
                    :disabled="dialogInfo.notEdit"
                    v-model="scope.row.quotationStallName"
                  ></el-input>
              </template>
            </el-table-column>
       <!-- 2019-10-29   #2353  康如涛 修改查看时报价段显示 end--> 
      <el-table-column v-else align="center" width="100" label="报价段">
        <template slot-scope="scope">
          <!-- <el-input
            v-model="scope.row.quotationStall"
            disabled
          ></el-input> -->
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
            >
            </el-option>
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
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        width="225"
        label="申报电量"
      >
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.declarationElectricityStatus=='ipt-err-true'"
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
      <el-table-column
        align="center"
        label="申报电价"
      >
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

        <el-table-column align="center"  width="160"  label="备注">
          <template slot-scope="scope">
            <el-input 
                :disabled="dialogInfo.notEdit"
                v-model="scope.row.schemeDesc"
              ></el-input>
          </template>
        </el-table-column>
    </el-table>
    <el-dialog v-drag :close-on-click-modal="false"
      title="电量分配"
      :visible.sync="distributionDialogVisible"
      width="30%"
      append-to-body
    >
      <div
        style="text-align:center;"
        v-for="(item,index) in tableList"
        :key="index"
      >
        <!-- {{item.propName}} -->
        第{{index+1}}段 &nbsp;
        <el-input-number
          v-model="numberArray[index]"
          :min="1"
          :max="100"
          label="描述文字"
        ></el-input-number> &nbsp;%
      </div>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="distributionDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="clickDistributionSure"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getTitleData } from "@common/api/business/sellingSideOffer/sdCentralizedBidding/index";
import { deleteInfoById } from "@common/api/business/powerSideOffer/centralizedBidding/index";
import { mapGetters } from "vuex";
import { getOrgByName } from "@common/api/admin/orgStruManage/index";
import { getSelectList } from "@common/api/base";
import { initLayoutInfo } from "@common/utils/init";
//2019-11-11 #2620 张朋 引用弹框自适应路径
import { getUnitMapByModelCode, getUnitMap, initDialogHeight } from "@common/utils/index";
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
       tabHeight:200,
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
         schemeDesc:"备注",
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
      this.unitMap = this.unitMaps;
    } else {
      this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
    }
    this.init();
     this.setLayoutHeight();
  },
  computed: {
    ...mapGetters(["elements", "orgId", "allSubMenus"])
  },
  methods: {
    //设置表格高度
     setLayoutHeight() {
      let  layoutInfo=initLayoutInfo();
      //this.tabHeight = layoutInfo.height- 380;
      this.tabHeight = initDialogHeight() * 0.55   + "px"; //2019-11-12 #2620 张朋 修改计算的表格高度       

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

    //智能分配=======================================================================
    IntelligenceDistribution() {
      this.distributionDialogVisible = true;
      if (this.tableList.length == 0) {
        this.numberArray = [];
      } else if (this.tableList.length == 1) {
        this.numberArray = [100];
      } else if (this.tableList.length == 2) {
        this.numberArray = [50, 50];
      } else if (this.tableList.length == 3) {
        this.numberArray = [33, 33, 34];
      } else if (this.tableList.length == 4) {
        this.numberArray = [25, 25, 25, 25];
      } else if (this.tableList.length == 5) {
        this.numberArray = [20, 20, 20, 20, 20];
      } else if (this.tableList.length == 6) {
        this.numberArray = [17, 17, 17, 17, 17, 15];
      }
    },
    clickDistributionSure() {
      let proportion = "";
      for (let i = 0, l = this.numberArray.length; i < l; i++) {
        proportion = Number(proportion) + Number(this.numberArray[i]);
      }
      if (proportion != 100) {
        this.$notify({
          title: "提示",
          message: "分配比例不是100% 无法分配",
          type: "warning",
          duration: 2000
        });
      } else {
        this.tableList.forEach((item, index) => {
          item.quotationStallPercentage = this.numberArray[index];
          item.declarationElectricity = (
            (this.numberArray[index] / 100) *
            this.totalMonthBidProvElectricity
          ).toFixed(2);
        });
      }
      this.distributionDialogVisible = false;
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
        // console.log(this.tableList[i].declarationElectricity)
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
        } 
        // else {
        //   if (this.tableList[i].declarationElectricity < 0) {
        //     this.tableList[i].declarationElectricityStatus = "ipt-err-true"; //交易电价
        //     this.tableList[i].declarationElectricityStatusMsg =
        //       "申报电量不能为负值";
        //     this.isErr = true;
        //   }
        // }
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
      if (!this.isErr) {
        // if (Number(this.totalMonthBidProvElectricity) != totalNumber) {
        //   this.isErrInfo = "申报电量总合不等于省内交易电量";
        //   this.isErr = true;
        // }
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

