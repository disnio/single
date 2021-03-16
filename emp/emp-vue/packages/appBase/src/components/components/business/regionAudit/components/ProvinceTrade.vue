<template>
  <div class="app-container calendar-list-container">
    <!-- 省内 -->
    <div v-if="announcementInfoData.tradeVarietyCode == 'jypz01'">
      <In-Province
        :announcementInfo="announcementInfoData"
        :sdtableList="this.sdtableList"
        :fdtableList="this.fdtableList"
        :unitMap="unitMap"
        @callback="callbackA($event)"
        @callback1="callbackB($event)"
        @callback2="callbackC($event)"
      ></In-Province>
    </div>
    <!-- 省外 -->
    <div v-if="announcementInfoData.tradeVarietyCode == 'jypz02'">
      <Out-Province
        :announcementInfo="announcementInfoData"
        :sdtableList="this.sdtableList"
        :fdtableList="this.fdtableList"
        :unitMap="unitMap"
        @callback="callbackA($event)"
        @callback1="callbackB($event)"
      ></Out-Province>
    </div>
    <!-- 发电权 -->
    <div v-if="announcementInfoData.tradeVarietyCode == 'jypz03'">
      <Power-GenerationTransaction
        :announcementInfo="announcementInfoData"
        :sdtableList="this.sdtableList"
        :fdtableList="this.fdtableList"
        :unitMap="unitMap"
        @callback="callbackA($event)"
                @callback1="callbackB($event)"

      ></Power-GenerationTransaction>
    </div>
  </div>
</template>
<script>
import { deleteInfoById } from "@common/api/business/powerSideOffer/centralizedBidding/index";
import { mapGetters } from "vuex";
import { getOrgByName } from "@common/api/admin/orgStruManage/index";

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
  components: {
    "In-Province": () => import("./regionAuditTable/inProvince"),
    "Power-GenerationTransaction": () =>
      import("./regionAuditTable/powerGenerationTransaction"),
    "Out-Province": () => import("./regionAuditTable/outProvince")
  },
  data() {
    return {
      monthlyElectricity: "80000",
      isErr: false,
      listLoading: false,
      tableKey: 0,
      tableList: [],
      sdtableList:[],
      fdtableList:[],
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
        transactionLine: "线路",
        transactionLineName: "线路名称",
        unit: "机组"
      }
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
    ...mapGetters(["elements"])
  },
  methods: {
    init() {
      if (this.tableList.length == 0) {
        this.addRow();
        this.setQuotationSubsection();
      }
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
          if (this.tableList[i].declarationElectricity < 0) {
            this.tableList[i].declarationElectricityStatus = "ipt-err-true"; //交易电价
            this.tableList[i].declarationElectricityStatusMsg =
              "申报电量不能为负值";
            this.isErr = true;
          }
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
      }
    },

    //初始化表格数据
    initTableData() {
      this.tableList = [];
      this.addRow();
    },
    //设置表格数据
    fdsetList(data) {
      this.fdtableList = []
      this.fdtableList = data;
      
    },
    sdsetList(data) {
      this.addRow();
      this.sdtableList = []
      this.sdtableList = data;
      
    },
    callbackA(data) {
      this.$emit("callback", data);
    },
    callbackB(data) {
      this.$emit("callback1", data);
    },
    callbackC(data) {
      this.$emit("callback2", data);
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





