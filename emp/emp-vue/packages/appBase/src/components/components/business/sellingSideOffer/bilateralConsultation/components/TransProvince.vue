<!--
 * @功能描述: 
 * @版本: 
 * @作者: 康如涛
 * @Date: 2019-08-27 13:48:54
 * @最新修改内容: 修改查看时发电公司显示
 * @LastEditTime: 2020-04-21 13:26:05
 -->
<template>
  <!--跨省交易-->
  <div class="app-container calendar-list-container">
    <el-row v-if="this.announcementInfoData.tradeCycleCode=='jyzq03'">
      <el-col :span="6">
        <div class="f-size16">
          跨区月双交易电量：
          <span class="f-size20">{{this.electricityInfor.totalMonthOutprovElectricity}}</span>
          {{unitMap.electricityUnit}}
        </div>
      </el-col>
      <el-col :span="6">
        <div class="f-size16">
          月双交易总电量：
          <span class="f-size20">{{this.electricityInfor.totalMonthElectricity}}</span>
          {{unitMap.electricityUnit}}
        </div>
      </el-col>
      <el-col :span="6">
        <div class="f-size16">
          跨区月双交易电量占比：
          <span
            class="f-size20"
          >{{this.electricityInfor.totalMonthOutprovProportion|keepTwoNum}}</span> %
        </div>
      </el-col>
    </el-row>

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
      @cell-mouse-enter="mouseEnter"
      :height="tabHeight"
      style="width: 100%;"
    >
      <!-- <el-table-column align="center" type="selection"></el-table-column> -->
      <el-table-column prop="index" label="序号" align="center" width="60px"></el-table-column>
      <el-table-column align="center" width="240px" label="售电公司">
        <template slot-scope="scope">
          <el-input v-model="scope.row.sdOrgName" disabled></el-input>
        </template>
      </el-table-column>
      <!-- 2019-10-29   #2353  康如涛 修改查看时发电公司显示 start-->
      <el-table-column v-if="dialogInfo.notEdit && announcementInfo.tradeWayCode!='jyfs04'" align="center" label="发电公司">
        <template slot-scope="scope">
          <el-input :disabled="dialogInfo.notEdit" v-model="scope.row.fdOrgName"></el-input>
        </template>
      </el-table-column>
      <!-- 2019-10-29   #2353  康如涛 修改查看时发电公司显示 end-->
      <!-- 2019-11-04   #2524  秦侯珍 查询筛选条件“区域公司”“发售电公司”显示名称统一修改为公司简称 start-->
      <el-table-column v-if="!dialogInfo.notEdit && announcementInfo.tradeWayCode!='jyfs04'" align="center" label="发电公司">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.fdOrgIdStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.fdOrgIdStatusMsg"
            placement="top"
          >
            <!--2019-11-7 #2534 张朋 发电公司调整为模糊查询（filterable属性即可启用搜索功能） -->
            <el-select
              filterable
              style="width:100%;"
              :class="scope.row.fdOrgIdStatus"
              v-model="scope.row.fdOrgId"
              :disabled="dialogInfo.notEdit"
              @change="changeFdOrgId($event, scope.row)"
            >
              <el-option
                v-for="(item,index) in fdOrgIdOption"
                :key="index"
                :label="item.orgSname"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-tooltip>
          <el-select
            v-else
            filterable
            style="width:100%;"
            :disabled="dialogInfo.notEdit"
            v-model="scope.row.fdOrgId"
            @change="changeFdOrgId($event, scope.row)"
          >
            <el-option
              v-for="(item,index) in fdOrgIdOption"
              :key="index"
              :label="item.orgSname"
              :value="item.id"
            ></el-option>
          </el-select>
          <!-- <el-input v-model="scope.row.fdOrgName"></el-input> -->
        </template>
      </el-table-column>
      <!-- 2019-11-04   #2524  秦侯珍 查询筛选条件“区域公司”“发售电公司”显示名称统一修改为公司简称 end-->
      <!-- 2019-10-29   #2353  康如涛 修改查看时交易单元显示 start-->
      <el-table-column v-if="dialogInfo.status == 'view' && announcementInfo.tradeWayCode!='jyfs04'" align="center" label="交易单元">
        <template slot-scope="scope">
          <el-input :disabled="dialogInfo.notEdit" v-model="scope.row.tradingUnitName"></el-input>
        </template>
      </el-table-column>
      <!-- 2019-10-29   #2353  康如涛 修改查看时交易单元显示 end-->
      <el-table-column v-if="dialogInfo.status != 'view' && announcementInfo.tradeWayCode!='jyfs04'" align="center" label="交易单元">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.tradingUnitIdStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.tradingUnitIdStatusMsg"
            placement="top"
          >
            <el-select
              style="width:100%;"
              :class="scope.row.tradingUnitIdStatus"
              v-model="scope.row.tradingUnitId"
              :disabled="dialogInfo.notEdit"
              @change="changeTradingName($event, scope.row)"
            >
              <el-option
                v-for="(item,index) in scope.row.tradingUnits"
                :key="index"
                :label="item.tradingUnitName"
                :value="item.tradingUnitId"
              ></el-option>
            </el-select>
          </el-tooltip>
          <div v-else>
            <el-select
              style="width:100%;"
              :disabled="dialogInfo.notEdit"
              v-model="scope.row.tradingUnitId"
              @change="changeTradingName($event, scope.row)"
            >
              <el-option
                v-for="(item,index) in scope.row.tradingUnits"
                :key="index"
                :label="item.tradingUnitName"
                :value="item.tradingUnitId"
              ></el-option>
            </el-select>
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" label="线路">
        <template slot-scope="scope">
          <!-- <el-tooltip
            v-if="scope.row.transactionLineStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.transactionLineStatusMsg"
            placement="top"
          >
            <el-select
              style="width:100%;"
              :disabled="dialogInfo.notEdit"
              :class="scope.row.transactionLineStatus"
              v-model="scope.row.transactionLine"
            >
              <el-option
                v-for="(item,index) in transactionLineOption"
                :key="index"
                :label="item.tieLineName"
                :value="item.tieLineId"
              >
              </el-option>
            </el-select>
          </el-tooltip>
          s
            v-else
            style="width:100%;"
            :disabled="dialogInfo.notEdit"
            v-model="scope.row.transactionLine"
          >
            <el-option
              v-for="(item,index) in transactionLineOption"
              :key="index"
              :label="item.tieLineName"
              :value="item.tieLineId"
            >
            </el-option>
          </el-select>-->
          <el-input v-model="scope.row.transactionLineName" disabled></el-input>
        </template>
      </el-table-column>

       <!-- #4194 gaoaining 2020-06-05 添加报价阶段 start -->
      <el-table-column v-if="dialogInfo.notEdit && announcementInfo.tradeWayCode=='jyfs04'" align="center" label="报价阶段">
        <template slot-scope="scope">
          <!-- <el-input :disabled="dialogInfo.notEdit" v-model="scope.row.quotationPeriod"></el-input> -->
          <el-select
              style="width:100%;"
              v-model="scope.row.quotationPeriod"
              :disabled="dialogInfo.notEdit"
            >
              <el-option
                v-for="(item,index) in quotationPeriodOption"
                :key="index"
                :label="item.quotationPeriodName"
                :value="item.quotationPeriodCode"
              ></el-option>
            </el-select>
        </template>
      </el-table-column>

      <el-table-column v-if="!dialogInfo.notEdit && announcementInfo.tradeWayCode=='jyfs04'"  align="center" label="报价阶段">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.quotationPeriodStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.quotationPeriodStatusMsg"
            placement="top"
          >
            <el-select
              style="width:100%;"
              :class="scope.row.quotationPeriodStatus"
              v-model="scope.row.quotationPeriod"
              :disabled="dialogInfo.notEdit"
              @change="changeQuotationPeriod($event, scope.row)"
            >
              <el-option
                v-for="(item,index) in quotationPeriodOption"
                :key="index"
                :label="item.quotationPeriodName"
                :value="item.quotationPeriodCode"
              ></el-option>
            </el-select>
          </el-tooltip>
          <el-select
            v-else
            style="width:100%;"
            :disabled="dialogInfo.notEdit"
            v-model="scope.row.quotationPeriod"
            @change="changeQuotationPeriod($event, scope.row)"
          >
            <el-option
              v-for="(item,index) in quotationPeriodOption"
              :key="index"
              :label="item.quotationPeriodName"
              :value="item.quotationPeriodCode"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
       <!-- #4194 gaoaining 2020-06-05 添加报价阶段验证 end -->

      <el-table-column align="center" width="100px" label="申报电量">
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
      <el-table-column align="center" width="100px" label="申报电价">
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

      <el-table-column align="center" width="160" label="备注">
        <template slot-scope="scope">
          <el-input :disabled="dialogInfo.notEdit" v-model="scope.row.schemeDesc"></el-input>
        </template>
      </el-table-column>

      <el-table-column align="center" width="120px" label="操作" v-if="!dialogInfo.notEdit">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.index==(tableList.length)"
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
  getAllOrgByProvince,
  getCurrentUserOrg,
  getElectricityInfor
} from "@common/api/business/sellingSideOffer/bilateralConsultation/index";
import {
  deleteInfoById,
  getTradingUnitByName
} from "@common/api/business/powerSideOffer/centralizedBidding/index";
import { mapGetters } from "vuex";
import { getOrgByName } from "@common/api/admin/orgStruManage/index";
import { initLayoutInfo } from "@common/utils/init";
//2019-11-11 #2620 张朋 引用弹框自适应路径
import {
  getUnitMapByModelCode,
  getUnitMap,
  initDialogHeight
} from "@common/utils/index";
export default {
  name: "transProvince",
  props: {
    dialogInfo: { type: Object },
    orgInfo: { type: Object },
    btns: { type: Object },
    programme: { type: String },
    announcementInfo: { type: Object },
    quotationSegmentOption: {
      type: Array
    },
    transactionLineOption: {
      type: Array
    },
    detailListData: {
      type: Array
    },
    unitMaps: {
      type: Object
    }
  },
  data() {
    return {
      quotationPeriodOption:[
        {quotationPeriodName:'第一阶段',quotationPeriodCode:'jd01'},
        {quotationPeriodName:'第二阶段',quotationPeriodCode:'jd02'}
        ],
      tabHeight: 200,
      optionArr: [],
      tradingUnitOption: [],
      electricityInfor: {
        totalMonthElectricity: "", //月双总电量
        totalMonthOutprovElectricity: "", //月双省内交易量
        totalMonthOutprovProportion: "" //月双省内占比
      },
      tableListIndex: 1,
      fdOrgIdOption: [],
      isErr: false,
      listLoading: false,
      tableKey: 0,
      tableList: [],
      announcementInfoData: this.announcementInfo,
      form: {
        detailId: "",
        declarationElectricity: "申报电量/意向摘牌电量",
        declarationElectricityPrices: "申报电价/意向摘牌电价",
        fdOrgId: "发电公司",
        fdOrgName: "发电公司名称",
        sdOrgId: "售电公司",
        sdOrgName: "售电公司名称",
        tradingUnitId: "交易单元",
        tradingUnitName: "交易单元名称",
        transactionLine: "",
        transactionLineName: "",
        schemeDesc: "备注",
        quotationPeriod:"报价阶段",
        quotationPeriodName:'报价阶段名称',
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
      // this.tableList = val;
      this.getListData(val);
      this.init();
    },
    unitMaps(newVal, oldVal) {
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
      // #3010 2019-12-10 张亮三 修改首页单位不显示问题
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
      let layoutInfo = initLayoutInfo();
      //this.tabHeight = layoutInfo.height - 360;
      this.tabHeight = initDialogHeight() * 0.55 + "px"; //2019-11-12 #2620 张朋 修改计算的表格高度
    },
    init() {
      this.getOrgNames();
      if (this.dialogInfo.status == "add") {
        this.addRow();
      } else {
        this.tableList = this.detailListData;
        this.getOptionArr();
      }

      //获取申报电量数据
      if (this.announcementInfo.tradeCycleCode == "jyzq03") {
        let params = {
          orgId: this.orgId,
          declarationTime: this.announcementInfoData.tradeIssure
        };
        getElectricityInfor(params).then(res => {
          this.electricityInfor.totalMonthElectricity =
            res.totalMonthElectricity;
          this.electricityInfor.totalMonthOutprovElectricity =
            res.totalMonthOutprovElectricity;

          if (
            res.totalMonthOutprovProportion == undefined ||
            res.totalMonthOutprovProportion == ""
          ) {
            this.totalMonthOutprovProportion = "";
          } else {
            this.electricityInfor.totalMonthOutprovProportion =
              res.totalMonthOutprovProportion * 100;
          }
        });
      }
    },

    //获取发电公司数据
    getOrgNames() {
      getCurrentUserOrg().then(res => {
        this.orgName = res.orgName;
        let params = {
          // provinceType: "0",
          // province: res.provinceCode,
          // orgName: res.orgName,
          attributeTypeCode: "zzjgsx02"
        };
        getAllOrgByProvince(params).then(res => {
          this.fdOrgIdOption = res;
        });
      });
    },
    getOptionArr() {
      this.optionArr = [];
      let dataArr = [];

      this.tableList.forEach((item, index) => {
        if (item.fdOrgId != "" && item.fdOrgId.length > 0) {
          getTradingUnitByName({ orgId: item.fdOrgId }).then(res => {
            this.$set(this.tableList[index], "tradingUnits", res);
          });
        } else {
          item.tradingUnits = [];
        }
        dataArr.push(item);
      });
      // console.log(dataArr);
      this.tableList = [];
      this.tableList = dataArr;
    },
    mouseEnter(row) {
      this.tableListIndex = row.index;
    },
    getOptionArrByChange(row) {
      // this.optionArr = [];
      this.$set(this.tableList[row.index - 1], "tradingUnitId", "");
      this.$set(this.tableList[row.index - 1], "tradingUnitName", "");
      getTradingUnitByName({ orgId: row.fdOrgId }).then(res => {
        this.$set(this.tableList[row.index - 1], "tradingUnits", res);
      });
    },
    //通过发电公司获取交易单元
    changeFdOrgId(data, row) {
      this.$set(this.tableList[row.index - 1], "fdOrgId", data);
      this.getOptionArrByChange(row);
    },
    /**
     * @方法名称: changeTradingName
     * @功能描述: 改变交易单元的值，获取tradingUnitName
     * @参数:
     * @返回值:
     * @样式作用范围:
     * @作者: 滕超
     * @Date: 2019-11-07 19:44:31
     * @最新修改内容:
     * @LastEditTime:
     */
    changeTradingName(value, row) {
      // console.log(row, "tradingUnits");
      this.tableList.forEach(element => {
        element.tradingUnits.forEach(elements => {
          if (elements.tradingUnitId == value) {
            // console.log(elements.tradingUnitName);
            this.$set(
              this.tableList[row.index - 1],
              "tradingUnitName",
              elements.tradingUnitName
            );
          }
        });
      });
    },
    //设置列表数据
    setListData(data) {
      let dataArr = [];
      data.forEach((item, index) => {
        item.declarationElectricityPricesStatus = ""; //申报电价
        item.tradingUnitIdStatus = ""; //交易电源
        item.transactionLineStatus = ""; //线路
        item.declarationElectricityStatus = ""; //申报电量
        item.declarationElectricityStatusMsg = "";
        item.declarationElectricityPricesStatusMsg = "";
        item.tradingUnitIdStatusMsg = "";
        item.transactionLineStatusMsg = "";
        item.quotationPeriodStatusMsg = "";//#4194 gaoaining 报价阶段提示重新清空
        item.quotationPeriodStatus= "";//#4194 gaoaining 报价阶段标红重新清空
        if (item.fdOrgId != "" && item.fdOrgId.length > 0) {
          getTradingUnitByName({ orgId: item.fdOrgId }).then(res => {
            item.tradingUnits = res;
          });
        } else {
          item.tradingUnits = [];
        }
        dataArr.push(item);
      });
      setTimeout(() => {
        this.tableList = dataArr;
      }, 500);
    },
    //获取列表数据
    getListData(data) {
      this.tableList = [];
      let dataArr = [];
      if (this.fdOrgIdOption.length == 0) {
        getCurrentUserOrg().then(res => {
          this.orgName = res.orgName;
          let params = {
            // provinceType: "0",
            // province: res.provinceCode,
            // orgName: res.orgName,
            attributeTypeCode: "zzjgsx02"
          };
          getAllOrgByProvince(params).then(res => {
            this.fdOrgIdOption = res;
            this.setListData(data);
          });
        });
      } else {
        this.setListData(data);
      }
    },
    //检测售电公司、发电公司、交易单元唯一性
    checkTradingUnit(data) {
      let isErr = false;
      this.tableList.forEach(item => {
        if (data.index > item.index) {
          if (
            data.fdOrgId == item.fdOrgId &&
            data.tradingUnitId == item.tradingUnitId
            // data.sdOrgId == item.sdOrgId
          ) {
            //  item.tradingUnitIdStatus="ipt-err-true";

            isErr = true;
          }
        }
      });
      return isErr;
    },
    //检测所有申报电量是否等于总交易量
    checkDeclaredElecTotal() {
      let isErr = false;
      if (this.announcementInfoData.tradeCycleCode == "jyzq03") {
        let declaredElecTotal = 0;
        this.tableList.forEach((item, index) => {
          declaredElecTotal += parseInt(
            this.tableList[index].declarationElectricity
          );
        });
        // console.log(declaredElecTotal);
        if (
          declaredElecTotal !=
          this.electricityInfor.totalMonthOutprovElectricity
        ) {
          isErr = true;
        } else {
          isErr = false;
        }
      } else {
        isErr = false;
      }

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
        this.tableList[i].transactionLineStatus = "";
        this.tableList[i].tradingUnitIdStatus = "";
        this.tableList[i].quotationPeriodStatus = "";
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
        if (
          (this.tableList[i].tradingUnitId == "" ||
            typeof this.tableList[i].tradingUnitId == "undefined") &&
          this.announcementInfo.tradeWayCode != "jyfs04"
        ) {
          this.tableList[i].tradingUnitIdStatus = "ipt-err-true"; //交易单元
          this.tableList[i].tradingUnitIdStatusMsg = "请选择交易单元"; //交易单元
          this.isErr = true;
        }

        if (
          (this.tableList[i].fdOrgId == "" ||
            typeof this.tableList[i].fdOrgId == "undefined") &&
          this.announcementInfo.tradeWayCode != "jyfs04"
        ) {
          this.tableList[i].fdOrgIdStatus = "ipt-err-true"; //交易单元
          this.tableList[i].fdOrgIdStatusMsg = "请选择发电公司"; //交易单元
          this.isErr = true;
        }
        if (
          this.tableList[i].transactionLine == "" ||
          typeof this.tableList[i].transactionLine == "undefined"
        ) {
          this.tableList[i].transactionLineStatus = "ipt-err-true"; //线路
          this.tableList[i].transactionLineStatusMsg = "请选择线路"; //线路
          this.isErr = true;
        }

         //#4194 gaoaining 2020-06-05 添加报价阶段验证 start
        if (
          (this.tableList[i].quotationPeriod == "" ||
            typeof this.tableList[i].quotationPeriod == "undefined") &&
          this.announcementInfo.tradeWayCode == "jyfs04"
        ) {
          this.tableList[i].quotationPeriodStatus = "ipt-err-true"; //报价阶段
          this.tableList[i].quotationPeriodStatusMsg = "请选择报价阶段"; //报价阶段
          this.isErr = true;

        } 
        //#4194 gaoaining 2020-06-05 添加报价阶段验证 end
        // 交易管理 - 售/发电侧报价方案 - 优化 #3316 wangc 20191229
        // if (this.checkTradingUnit(this.tableList[i])) {
        //   this.isErr = true;
        //   this.tableList[i].fdOrgIdStatus = "ipt-err-true"; //发电公司
        //   this.tableList[i].fdOrgIdStatusMsg = "发电公司信息重复";
        //   this.tableList[i].tradingUnitIdStatus = "ipt-err-true"; //交易单元
        //   this.tableList[i].tradingUnitIdStatusMsg = "交易单元信息重复";
        // }

        // if (this.checkDeclaredElecTotal()) {
        //   console.log(111);
        //   this.isErr = true;
        //   this.$notify({
        //     title: "提示",
        //     message: "总申报电量不等于总交易量",
        //     type: "warning",
        //     duration: 2000
        //   });
        // }
      }
      if (
        this.announcementInfo.tradeCycleCode == "jyzq03" &&
        typeof this.electricityInfor.totalMonthOutprovElectricity != "undefined"
      ) {
        if (this.electricityInfor.totalMonthOutprovElectricity != "") {
          if (!this.isErr) {
            if (
              Number(this.electricityInfor.totalMonthOutprovElectricity) !=
              totalNumber
            ) {
              this.isErrInfo = "申报电量总合不等于跨省交易电量，是否继续！";
              this.isErr = true;
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
      let attributeTypeCode = "zzjgsx02";
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
    selectBlur(Event) {
      console.log(Event.$ref);
    },
    //添加表格行
    addRow() {
      let index = this.tableList.length + 1;
      var newData = {};
      newData.index = index;
      for (let key in this.form) {
        if (key.indexOf("Name") < 0) {
          newData[key] = "";
          newData[key + "Status"] = "";
          newData[key + "StatusMsg"] = "";
        } else {
          newData[key] = "";
        }
      }
      newData.transactionLine = this.announcementInfoData.tieLineId;
      newData.transactionLineName = this.announcementInfoData.tieLineName;
      newData.sdOrgId = this.orgInfo.id;
      newData.tradingUnits = [];
      newData.sdOrgName = this.orgInfo.orgName;
      this.tableList.push(newData);
      this.optionArr.push({ arr: [] });
    },
    //移除行信息
    delRowData(row) {
      let items = [];
      for (let i = 0, l = this.tableList.length; i < l; i++) {
        if (row.index != this.tableList[i].index) {
          items.push(this.tableList[i]);
        }
      }
      items.forEach((item, index) => {
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
    },
     changeQuotationPeriod(value,row){
       this.tableList.forEach(element => {
        this.quotationPeriodOption.forEach(elements => {
          if (elements.quotationPeriod == value) {
            this.$set(
              this.tableList[row.index - 1],
              "quotationPeriodName",
              elements.quotationPeriodName
            );
          }
        });
      });
    },
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





