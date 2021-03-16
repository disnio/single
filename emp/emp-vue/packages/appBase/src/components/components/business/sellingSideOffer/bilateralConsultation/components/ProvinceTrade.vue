
<!--
 * @功能描述:省内交易 
 * @版本: 
 * @作者: 康如涛
 * @Date: 2019-08-27 13:48:54
 * @最新修改内容: 修改查看时发电公司显示
 * @LastEditTime: 2020-12-25 10:26:32
 -->
<template>
  <!---->
  <div class="app-container calendar-list-container">
    <!-- <el-row v-if="this.announcementInfoData.tradeCycleCode=='jyzq03'">
      <el-col :span="6">
        <div class="f-size16">
          省内月双交易电量：
          <span class="f-size20">{{electricityInfor.totalMonthProvElectricity}}</span>
          {{unitMap.electricityUnit}}
        </div>
      </el-col>
      <el-col :span="6">
        <div class="f-size16">
          月双交易总电量：
          <span class="f-size20">{{electricityInfor.totalMonthElectricity}}</span>
          {{unitMap.electricityUnit}}
        </div>
      </el-col>
      <el-col :span="6">
        <div class="f-size16">
          省内月双电量占比：
          <span class="f-size20">{{electricityInfor.totalMonthProvProportion|keepTwoNum}}</span> %
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
      @cell-mouse-enter="cellClick"
      style="width: 100%;"
      :height="tabHeight"
    >
      <!-- <el-table-column align="center" type="selection"></el-table-column> -->
      <el-table-column prop="index" label="序号" align="center" width="60px"></el-table-column>
      <el-table-column align="center" width="240px" label="售电公司">
        <template slot-scope="scope">
          <el-input v-model="scope.row.sdOrgName" disabled></el-input>
        </template>
      </el-table-column>
      <!-- 2020-06-04 #4151  qinhz 售电侧报价方案-交易品种为省内直接交易,交易方式为双边协商-新增购电侧交易单元字段 start-->
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
      <!-- 2020-06-04 #4151  qinhz 售电侧报价方案-交易品种为省内直接交易,交易方式为双边协商-新增购电侧交易单元字段 end-->
      <!-- 2019-10-29   #2353  康如涛 修改查看时发电公司显示 start-->
      <el-table-column v-if="dialogInfo.notEdit && announcementInfo.tradeWayCode!='jyfs04'" align="center" label="发电公司">
        <template slot-scope="scope">
          <el-input :disabled="dialogInfo.notEdit" v-model="scope.row.fdOrgName"></el-input>
        </template>
      </el-table-column>
      <!-- 2019-10-29   #2353  康如涛 修改查看时发电公司显示 end-->
      <el-table-column v-if="!dialogInfo.notEdit && announcementInfo.tradeWayCode!='jyfs04'" align="center" label="发电公司">
        <template slot-scope="scope">
          <div>
            <el-tooltip
              v-if="scope.row.fdOrgIdStatus=='ipt-err-true'"
              class="item"
              effect="dark"
              :content="scope.row.fdOrgIdStatusMsg"
              placement="top"
            >
              <!-- 2019-10-30 #2534 张朋 发电公司下拉替换成模糊搜索 start-->
              <!-- <el-select
                style="width:100%;"
                :class="scope.row.fdOrgIdStatus"
                v-model="scope.row.fdOrgId"
                :disabled="dialogInfo.notEdit"
                @change="changeFdOrgId($event, scope.row)"
              >
                <el-option
                  v-for="(item,index) in fdOrgIdOption"
                  :key="index"
                  :label="item.orgName"
                  :value="item.id"
                ></el-option>
              </el-select>-->
              <!-- <el-select
              v-else
              style="width:100%;"
              :disabled="dialogInfo.notEdit"
              v-model="scope.row.fdOrgId"
              @change="changeFdOrgId($event, scope.row)"
            >
              <el-option
                v-for="(item,index) in fdOrgIdOption"
                :key="index"
                :label="item.orgName"
                :value="item.id"
              ></el-option>
              </el-select>-->
              <el-autocomplete
                :class="scope.row.fdOrgIdStatus"
                v-model="scope.row.fdOrgName"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                @select="changeFdOrgId($event, scope.row)"
                :disabled="dialogInfo.notEdit"
              ></el-autocomplete>
            </el-tooltip>
            <el-autocomplete
              v-else
              v-model="scope.row.fdOrgName"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
              @select="changeFdOrgId($event, scope.row)"
              :disabled="dialogInfo.notEdit"
            ></el-autocomplete>
            <!--2019-10-30 #2534  发电公司下拉替换成模糊搜索 end -->
          </div>
          <!-- <el-input v-model="scope.row.fdOrgName"></el-input> -->
        </template>
      </el-table-column>
      <!-- 2019-10-29   #2353  康如涛 修改查看时交易单元显示 start-->
      <el-table-column v-if="dialogInfo.notEdit && announcementInfo.tradeWayCode!='jyfs04'" align="center" label="交易单元">
        <template slot-scope="scope">
          <el-input :disabled="dialogInfo.notEdit" v-model="scope.row.tradingUnitName"></el-input>
        </template>
      </el-table-column>
      <!-- 2019-10-29   #2353  康如涛 修改查看时交易单元显示 end-->
      <el-table-column v-if="!dialogInfo.notEdit && announcementInfo.tradeWayCode!='jyfs04'" align="center" label="交易单元">
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
          <el-select
            v-else
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
        </template>
      </el-table-column>
            <!-- 2019-10-29   #2353  康如涛 修改查看时交易单元显示 end-->
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
import {
  getValueByOrgIdAndCode, //是否启用审批流
  getPowerTestTransactionUnit //获取购电侧交易单元
} from "@common/api/business/bilateralNegotiation/index";
//2019-10-30 #2534 张朋 发电公司模糊查询api地址
import { getAllOrgListByProvince } from "@common/api/business/jySellNotice/index";
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
      loading: false,
      powerTestTransactionUnit: [], //购电侧交易单元
      isShow: false,
      optionArr: [],
      tradingUnitOption: [],
      electricityInfor: {
        totalMonthElectricity: "", //月双总电量
        totalMonthProvElectricity: "", //月双省内交易量
        totalMonthProvProportion: "" //月双省内占比
      },
      fdOrgIdOption: [],
      isErr: false,
      listLoading: false,
      tableKey: 0,
      tableList: [],
      // quotationSegmentOptionData: [],
      announcementInfoData: this.announcementInfo,
      form: {
        detailId: "",
        declarationElectricity: "申报电量/意向摘牌电量",
        declarationElectricityPrices: "申报电价/意向摘牌电价",
        fdOrgId: "发电公司",
        fdOrgName: "发电公司名称",
        quotationPeriod:"报价阶段",
        quotationPeriodName:'报价阶段名称',
        sdOrgId: "售电公司",
        sdOrgName: "售电公司名称",
        tradingUnitId: "交易单元",
        tradingUnitName: "交易单元名称",
        quotationStall: "",
        quotationStallName: "",
        schemeDesc: "备注",
        powerPurchaseUnitCode: "购电侧交易单元", //购电侧交易单元
        powerPurchaseUnitName: "购电侧交易单元名称", //购电侧交易单元
      },

      unitMap: {}
    };
  },
  watch: {
    announcementInfo(val) {
      this.announcementInfoData = val;
    },

    detailListData(val) {
      this.tableList = val;
      this.init();
    },
    unitMaps(newVal, oldVal) {
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
    ...mapGetters(["elements", "orgId", "allSubMenus"])
  },
  methods: {
    tradingUnit(data,row) {},
    // 2020-06-08   #4161  qinhz  判断企业参数
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

    // 2020-06-08   #4161  qinhz  获取购电侧交易单元下拉框
    async getPowerTestTransactionUnit() {
      let id = this.announcementInfoData.tradeCenterId      
      let res = await getPowerTestTransactionUnit(id);
      this.powerTestTransactionUnit = res.data
    },
    /**
     * @方法名称: querySearchAsync
     * @功能描述: 发电公司模糊搜索
     * @参数: queryString(输入的发电公司名称)
     * @返回值: cb
     * @作者: 张朋
     * @Date: 2019-10-30 16:27:51
     * @最新修改内容:
     * @LastEditTime:
     */
    querySearchAsync(queryString, cb) {
      var list = [{}];
      //发电公司模糊查询
      this.loading = true;
      this.isSelectOrg = true;
      this.orgFilterData = [];
      let parameters = { orgName: queryString };

      getAllOrgListByProvince(parameters).then(res => {
        if (typeof res != "undefined") {
          if (res.length > 0) {
            res.forEach(item => {
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
    //设置表格高度
    setLayoutHeight() {
      let layoutInfo = initLayoutInfo();
      // this.tabHeight = layoutInfo.height - 360;
      this.tabHeight = initDialogHeight() * 0.55 + "px"; //2019-11-12 #2620 张朋 修改计算的表格高度
    },
    init() {
      if (this.dialogInfo.status == "add") {
        this.addRow();
      } else {
        this.tableList = this.detailListData;
        if (this.tableList.length == 0) {
          this.tableList = [];
          this.addRow();
        } else {
          this.getOptionArr();
        }
      }
      getCurrentUserOrg().then(res => {
        this.orgName = res.orgName;
        let params = {
          // provinceType: "1",
          // province: res.provinceCode,
          // orgName: res.orgName,
          attributeTypeCode: "zzjgsx02"
        };
        getAllOrgByProvince(params).then(res => {
          this.fdOrgIdOption = res;
        });
      });
      //获取电量信息
      let params = {
        orgId: this.orgId,
        declarationTime: this.announcementInfoData.tradeIssure
      };
      getElectricityInfor(params).then(res => {
        this.electricityInfor.totalMonthElectricity = res.totalMonthElectricity;
        this.electricityInfor.totalMonthProvElectricity =
          res.totalMonthProvElectricity;
        if (
          res.totalMonthProvProportion == undefined ||
          res.totalMonthProvProportion == ""
        ) {
          this.totalMonthProvProportion = "";
        } else {
          this.electricityInfor.totalMonthProvProportion = (
            Number(res.totalMonthProvProportion) * 100
          ).toFixed(2);
        }
      });
    },
    cellClick(row, column, cell, event) {
      if (!this.isSelectOrg) {
        this.listRowData = row;
      }
    },
    getOrgByName() {
      this.loading = true;
      this.isSelectOrg = true;
      getCurrentUserOrg().then(res => {
        this.orgId = res.id;
        this.orgName = res.orgName;
        let params = {
          // provinceType: "0",
          // province: res.provinceCode,
          // orgName: res.orgName,
          attributeTypeCode: "zzjgsx02"
        };
        getAllOrgByProvince(params).then(res => {
          this.fdOrgIdOption = res;
          //console.log(res);
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
      //  console.log(this.tableList);
    },

    //2019-10-30 #2534 张朋 传参（fdOrgId为发电公司id）
    getOptionArrByChange(fdOrgId, row) {
      // this.optionArr = [];
      this.$set(this.tableList[row.index - 1], "tradingUnitId", "");
      this.$set(this.tableList[row.index - 1], "tradingUnitName", "");
      getTradingUnitByName({ orgId: fdOrgId }).then(res => {
        this.$set(this.tableList[row.index - 1], "tradingUnits", res);
      });
    },

    changeFdOrgId(data, row) {
      //2019-10-30 #2534 张朋 传参（data.orgId为当前发电公司id）
      this.tableList[row.index - 1].fdOrgId = data.orgId;
      this.getOptionArrByChange(data.orgId, row);
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
          declaredElecTotal != this.electricityInfor.totalMonthProvElectricity
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
      for (let i = 0, l = this.tableList.length; i < l; i++) {
        this.tableList[i].declarationElectricityStatus = "";
        this.tableList[i].declarationElectricityPricesStatus = "";
        this.tableList[i].quotationStallStatus = "";
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
        // #3918 复式撮合交易单元可以不是必填项 start frj 2020-4-21 13:28:10 
        if (
          (this.tableList[i].tradingUnitId == "" ||
            typeof this.tableList[i].tradingUnitId == "undefined") &&
          this.announcementInfo.tradeWayCode != "jyfs04"
        ) {
          this.tableList[i].tradingUnitIdStatus = "ipt-err-true"; //交易单元
          this.tableList[i].tradingUnitIdStatusMsg = "请选择交易单元"; //交易单元
          this.isErr = true;
        }
        // #3918 复式撮合交易单元可以不是必填项 end frj 2020-4-21 13:28:10 
        // #3918 复式撮合发电公司可以不是必填项 start frj 2020-4-21 13:28:10 
        if (
          (this.tableList[i].fdOrgId == "" ||
            typeof this.tableList[i].fdOrgId == "undefined") &&
          this.announcementInfo.tradeWayCode != "jyfs04"
        ) {
          this.tableList[i].fdOrgIdStatus = "ipt-err-true"; //交易单元
          this.tableList[i].fdOrgIdStatusMsg = "请选择发电公司"; //交易单元
          this.isErr = true;
        }
        // #3918 复式撮合发电公司可以不是必填项 end frj 2020-4-21 13:28:10 
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
        //   this.isErr = true;
        // }
      }
    },
    //初始化表格数据
    initTableData() {
      this.tableList = [];
      this.addRow();
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
      newData.sdOrgId = this.orgInfo.id;
      newData.tradingUnits = [];
      newData.sdOrgName = this.orgInfo.orgName;
      newData.transactionLine = this.announcementInfoData.tieLineId;
      newData.transactionLineName = this.announcementInfoData.tieLineName;
      // newData.quotationPeriodName = this.announcementInfoData.quotationPeriodName;
      // newData.quotationPeriod = this.announcementInfoData.quotationPeriod;

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





