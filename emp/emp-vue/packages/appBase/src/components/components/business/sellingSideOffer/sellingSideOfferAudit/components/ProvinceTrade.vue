<template>
  <div class="app-container calendar-list-container">
    <!-- <el-row v-if="announcementInfo.tradeVarietyCode == 'jypz01'">
      <div v-if="announcementInfo.tradeWayCode == 'jyfs01'&&this.announcementInfoData.tradeCycleCode=='jyzq03'">
        <el-col :span="6">
          <div>
            省内月双交易电量:
            <span class="fontRed">
              {{
              totalMonthProvElectricity
              }}
            </span>{{units.electricityUnit}}
          </div>
        </el-col>
        <el-col :span="6">
          月双交易总电量：
          <span class="font">{{ totalMonthElectricity }}</span>{{units.electricityUnit}}
        </el-col>
        <el-col :span="6">
          <div>
            省内月双交易电量占比：
            <span class="font">
              {{
              totalMonthProvProportion|keepTwoNum
              }}
            </span>%
          </div>
        </el-col>
      </div>
      <div v-if="announcementInfo.tradeWayCode == 'jyfs02'&&this.announcementInfoData.tradeCycleCode=='jyzq03'">
        <el-col :span="6">
          <div>
            省内月竟交易电量：
            <span class="fontRed">
              {{
              totalMonthBidProvElectricity
              }}
            </span>{{units.electricityUnit}}
          </div>
        </el-col>
        <el-col :span="6">
          月竞交易总电量：
          <span class="font">{{ totalMonthBidElectricity }}</span>{{units.electricityUnit}}
        </el-col>
        <el-col :span="6">
          <div>
            省内月竟交易电量占比：
            <span class="font">
              {{
              totalMonthBidProvProportion|keepTwoNum
              }}
            </span>%
          </div>
        </el-col>
      </div>
      <el-col :span="6">
        <div class="txt-right unit-info">单位:{{units.electricityUnit}},{{units.priceUnit}}</div>
      </el-col>
    </el-row> -->
    <!-- <el-row v-if="announcementInfo.tradeVarietyCode == 'jypz02'">
      <div v-if="announcementInfo.tradeWayCode == 'jyfs01'&&this.announcementInfoData.tradeCycleCode=='jyzq03'">
        <el-col :span="6">
          <div>
            跨区月双交易电量:
            <span class="fontRed">
              {{
              totalMonthOutprovElectricity
              }}
            </span>{{units.electricityUnit}}
          </div>
        </el-col>
        <el-col :span="6">
          月双交易总电量：
          <span class="font">{{ totalMonthElectricity }}</span>{{units.electricityUnit}}
        </el-col>
        <el-col :span="6">
          <div>
            跨区月双交易电量占比：
            <span class="font">
              {{
              totalMonthOutprovProportion|keepTwoNum
              }}
            </span>%
          </div>
        </el-col>
      </div>

      <div v-if="announcementInfo.tradeWayCode == 'jyfs02'&&this.announcementInfoData.tradeCycleCode=='jyzq03'">
        <el-col :span="6">
          <div>
            跨区月竟交易电量：
            <span class="fontRed">
              {{
              totalMonthBidOutprovElectricity

              }}
            </span>{{units.electricityUnit}}
          </div>
        </el-col>
        <el-col :span="6">
          月竞交易总电量：
          <span class="font">{{ totalMonthBidElectricity }}</span>{{units.electricityUnit}}
        </el-col>
        <el-col :span="6">
          <div>
            跨区月竟交易电量占比：
            <span class="font">
              {{
              totalMonthBidOutprovProportion|keepTwoNum
              }}
            </span>%
          </div>
        </el-col>
      </div>

      <el-col :span="6">
        <div class="txt-right unit-info">单位:{{units.electricityUnit}},{{units.priceUnit}}</div>
      </el-col>
    </el-row> -->

    <el-table
      :key="tableKey"
      :data="tableList"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <!-- <el-table-column align="center" type="selection"></el-table-column> -->
      <el-table-column
        prop="index"
        label="序号"
        align="center"
        width="60px"
      ></el-table-column>
      <el-table-column
        v-if="announcementInfo.tradeVarietyCode == 'jypz02'"
        align="center"
        label="线路"
      >
        <template slot-scope="scope">
          <el-select
            disabled
            :class="scope.row.transactionLineStatus"
            v-model="scope.row.transactionLine"
          >
            <el-option
              v-for="(item, index) in transactionLineOption"
              :key="index"
              :label="item.tieLineName"
              :value="item.tieLineId"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="售电公司"
      >
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.sdOrgName"
            disabled
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        v-if="announcementInfo.tradeWayCode == 'jyfs01'"
        align="center"
        label="发电公司"
      >
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.fdOrgName"
            disabled
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        v-if="announcementInfo.tradeWayCode == 'jyfs01'"
        align="center"
        label="交易单元"
      >
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.tradingUnitName"
            disabled
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        v-if="announcementInfo.tradeWayCode == 'jyfs02'"
        align="center"
        label="报价段"
      >
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.quotationStallName"
            disabled
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        v-if="
          announcementInfo.tradeWayCode == 'jyfs01' ||
            announcementInfo.tradeWayCode == 'jyfs02'
        "
        align="center"
        label="申报电量"
      >
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.declarationElectricity"
            disabled
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        v-if="
          announcementInfo.tradeWayCode == 'jyfs01' ||
            announcementInfo.tradeWayCode == 'jyfs02'
        "
        align="center"
        label="申报电价"
      >
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.declarationElectricityPrices"
            disabled
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        v-if="announcementInfo.tradeWayCode == 'jyfs03'"
        align="center"
        label="挂牌电量"
      >
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
      <el-table-column
        align="center"
        v-if="announcementInfo.tradeWayCode == 'jyfs03'"
        label="挂牌电价"
      >
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

      <el-table-column
        align="center"
        label="操作"
        v-if="!dialogInfo.notEdit"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.index == tableList.length"
            icon="el-icon-plus"
            size="small"
            type="primary"
            @click="addRow"
          ></el-button>
          <el-button
            size="small"
            type="text"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { deleteInfoById } from "@common/api/business/powerSideOffer/centralizedBidding/index";
import { getTitleData } from "@common/api/business/sellingSideOffer/sdCentralizedBidding/index";
import { mapGetters } from "vuex";
import { getOrgByName } from "@common/api/admin/orgStruManage/index";
import { getAllLinList } from "@common/api/basicData/TMdataTieLin/index";

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
    unitMap: {
      type: Object
    }
  },
  data() {
    return {
      transactionLineOption: [],
      totalMonthBidElectricity: "",
      totalMonthBidProvElectricity: "",
      totalMonthBidProvProportion: "",
      totalMonthProvElectricity: "", //  省内月双总电量
      totalMonthElectricity: "", //月双总交易
      totalMonthProvProportion: "", //省内月双电量占比
      totalMonthOutprovElectricity: "", //跨区月双交易电量
      totalMonthOutprovProportion: "", // 跨区月双电量占比

      totalMonthBidOutprovElectricity: "", //   跨区月竞总电量
      totalMonthBidOutprovProportion: "", //  跨区月竞电量占比
      monthlyElectricity: "80000",
      isErr: false,
      listLoading: false,
      tableKey: 0,
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
        fdOrgName: "发电公司名称",
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
        transactionLine: "线路",
        transactionLineName: "线路名称",
        unit: "机组"
      },

      units:this.unitMap
    };
  },
  watch: {
    announcementInfo(val) {
      this.announcementInfoData = val;
    }
  },
  created() {
    this.init();
  },
  computed: {
    ...mapGetters(["elements", "orgId"])
  },
  methods: {
    init() {
      getAllLinList().then(res => {
        if (res.rel) {
          this.transactionLineOption = res.data;
        }
      });
      this.getTitleData();
      if (this.tableList.length == 0) {
        this.addRow();
        this.setQuotationSubsection();
      }
    },
    getTitleData() {
      let parme = {
        orgId: this.orgId,
        declarationTime: this.announcementInfoData.tradeIssure
      };
      getTitleData(parme).then(res => {
        this.totalMonthBidElectricity = res.totalMonthBidElectricity; //月竞总电量
        this.totalMonthBidProvElectricity = res.totalMonthBidProvElectricity; //省内交易电量
        this.totalMonthBidProvProportion =
          typeof res.totalMonthBidProvProportion == "undefined"
            ? ""
            : res.totalMonthBidProvProportion * 100; //月竞省内占比

        this.totalMonthProvProportion =
          typeof res.totalMonthProvProportion == "undefined"
            ? ""
            : res.totalMonthProvProportion * 100;
        //跨区月竞电量占比
        this.totalMonthBidOutprovProportion =
          typeof res.totalMonthBidOutprovProportion == "undefined"
            ? ""
            : res.totalMonthBidOutprovProportion * 100;

        this.totalMonthOutprovProportion =
          typeof res.totalMonthOutprovProportion == "undefined"
            ? ""
            : res.totalMonthOutprovProportion * 100;
        this.totalMonthProvElectricity =
          typeof res.totalMonthProvElectricity != "undefined"
            ? res.totalMonthProvElectricity
            : ""; //月竞省内占比

        this.totalMonthElectricity =
          typeof res.totalMonthElectricity != "undefined"
            ? res.totalMonthElectricity
            : ""; //月竞省内占比

        this.totalMonthOutprovElectricity =
          typeof res.totalMonthOutprovElectricity != "undefined"
            ? res.totalMonthOutprovElectricity
            : ""; //月竞省内占比
        //跨区月竞总电量
        this.totalMonthBidOutprovElectricity =
          typeof res.totalMonthBidOutprovElectricity != "undefined"
            ? res.totalMonthBidOutprovElectricity
            : ""; //月竞省内占比
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
      this.getTitleData();
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
        fdOrgName: this.orgInfo.orgName,
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
        quotationStallStatusMsg: ""
      };
      this.tableList.push(newData);
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
.font {
  font-weight: bold;
  font-size: 25px;
}
.fontRed {
  font-weight: bold;
  color: #ff0000;
  font-size: 25px;
}
</style>





