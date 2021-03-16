<!--
 * @功能描述: 集团交易处报表 - 全年市场交易规模预估表
 * @版本: 
 * @作者: 郑文杰
 * @Date: 2019-11-25 11:26:32
 * @最新修改内容: 
 * @LastEditTime : 2020-01-14 20:51:35
 -->
<template>
  <div style="margin:0 10px;">
    <!-- 通用表格组件 start -->
    <div class="table-con">
      <h2
        style="text-align:center"
        v-if="this.getModelCode == 'annualMarketTransactionEstimate'"
      >{{this.orgName}}{{this.issueN}}交易规模预估</h2>
      <div
        v-if="this.getModelCode == 'annualMarketTransactionEstimate'"
        class="txt-right unit-info"
      >单位：{{unitMap.electricityUnit}}、%</div>
      <custom-table
        ref="customTable"
        :resultTableData="resultTableData"
        :colWidth="150"
        :dataKeys="dataKeys"
        :rowspanKey="rowspanKey"
        :colspanKey="colspanKey"
      />
    </div>
    <!-- 通用表格组件 end -->
  </div>
</template>

<script>
import { layoutInfo } from "@common/utils/init";
import { mapGetters } from "vuex";
import { getUnitMapByModelCode, getUnitMap } from "@common/utils/index";
import { getOneById } from "@common/api/business/marketTransactionSizeEstimates/index";
import Cookies from "js-cookie";
const CustomTable = () => import("./CustomTable");
export default {
  name: "marketTransactionSizeEstimates",
  components: {
    CustomTable
  },
  props: {
    amtsId: { type: String },
    tabHeight: { type: String },
    issue: { type: String },
    orgName: { type: String }
  },
  data() {
    return {
      amtsIda: this.amtsId,
      issueN: this.issue,
      orgNameN: this.orgName,
      unitMap: {},
      getModelCode: "",
      newArr: [[]], //表头
      maxHeight: 1, //表头总共占的行数
      colKeyList: [], //所有的key
      reportData: [],
      tableData: [],
      scrollbarHeight: "",
      scrollbarWidth: "",
      tableRowSpan: [],
      month: "",
      dataKeys: {
        unitName: "", //单位
        estimatedAnnualElectricity: "", //预计全年全社会用电量
        annualScal: "", //全年规模
        proportion: "", //占比
        ordinaryElectricity: "", //普通外来电
        specialElectricity: "", //特殊外来电
        unableTransaction: "", //省内无法参与交易
        ableTransaction: "", //省内可参与交易
        annualScaleOutward: "", //外送全年规模
        total: "", //合计 全年规模
        transElectricityTransfer: "", //交易电转让（全年规模）
        baseElectricityTransfer: "", //综合合计_基数电转让（全年规模）
        otherAnnualScale: "" //其他
      },
      rowspanKey: {},
      colspanKey: {},
      tableHeader: [],
      resultTableData: { tableHeader: [], result: [] }
    };
  },
  computed: {
    ...mapGetters(["layoutInfo", "elements", "allSubMenus"])
  },
  watch: {
    layoutInfo: {
      deep: true,
      handler: function(newVal, oldVal) {
        this.scrollbarHeight = newVal.height;
      }
    },
    issue(val) {
      this.issueN = val;
    },
    orgName(val) {
      this.orgNameN = val;
    },
    amtsId(val) {      
      this.amtsIda = val;
      this.initData();
    }
  },
  created() {},
  destroyed() {},
  mounted() {
    this.getModelCode = sessionStorage.getItem("modelCode");
    this.layout = this.layoutInfo;
    this.scrollbarHeight = this.layoutInfo.height;
    if (this.getModelCode != "marketTransactionSizeEstimates") {
      this.initData();
      sessionStorage.setItem("pageModelCode", "marketTransactionSizeEstimates");
      this.unitMap = getUnitMapByModelCode(
        this.allSubMenus,
        this.unitMap,
        "marketTransactionSizeEstimates"
      );
    } else {
      this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
    }
  },
  methods: {
    /*
     * @功能描述:  初始交易台账数据
     * @作者: 康如涛
     * @Date: 2019-11-21
     */
    initData() {
      this.tableHeader = [
        { col_name: "单位", col_value: "unitName", fixed: false },
        {
          col_name: "预计全年全社会用电量",
          col_value: "estimatedAnnualElectricity",
          fixed: false
        },
        {
          col_name: "直接交易电量",
          col_value: "",
          fixed: false,
          cols: [
            {
              col_name: "全年规模(含区外参与机组)",
              col_value: "annualScal",
              fixed: false
            },
            {
              col_name: "占比(%)",
              col_value: "proportion",
              fixed: false
            },
            {
              col_name: "全年规模细分",
              col_value: "",
              fixed: false,
              cols: [
                {
                  col_name: "普通外来电",
                  col_value: "ordinaryElectricity",
                  fixed: false
                },
                {
                  col_name: "特殊外来电(点对网,三峡,溪洛渡,秦山,皖电等)",
                  col_value: "specialElectricity",
                  fixed: false
                },
                {
                  col_name: "省内无法参与交易",
                  col_value: "unableTransaction",
                  fixed: false
                },
                {
                  col_name: "省内可参与交易",
                  col_value: "ableTransaction",
                  fixed: false
                }
              ]
            }
          ]
        },
        {
          col_name: "外送",
          col_value: "",
          fixed: false,
          cols: [
            {
              col_name: "全年规模",
              col_value: "annualScaleOutward",
              fixed: false
            }
          ]
        },
        {
          col_name: "发电权转让",
          col_value: "",
          fixed: false,
          cols: [
            {
              col_name: "合计",
              col_value: "",
              fixed: false,
              cols: [
                {
                  col_name: "全年规模",
                  col_value: "total",
                  fixed: false
                }
              ]
            },
            {
              col_name: "其中:交易电转让",
              col_value: "",
              fixed: false,
              cols: [
                {
                  col_name: "全年规模",
                  col_value: "transElectricityTransfer",
                  fixed: false
                }
              ]
            },
            {
              col_name: "其中:基数电转让",
              col_value: "",
              fixed: false,
              cols: [
                {
                  col_name: "全年规模",
                  col_value: "baseElectricityTransfer",
                  fixed: false
                }
              ]
            }
          ]
        },
        {
          col_name: "其他",
          col_value: "",
          fixed: false,
          cols: [
            {
              col_name: "全年规模",
              col_value: "otherAnnualScale",
              fixed: false
            }
          ]
        }
      ];
      let param = {
        amtsId: this.amtsIda
      };
      getOneById(param).then(res => {
        this.tableData = res.data.result;
        this.resultTableData["result"] = this.tableData;
        this.resultTableData["tableHeader"] = this.tableHeader;
        this.resultTableData["rowspanKey"] = this.rowspanKey;
        this.resultTableData["colspanKey"] = this.colspanKey;
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
</style>



