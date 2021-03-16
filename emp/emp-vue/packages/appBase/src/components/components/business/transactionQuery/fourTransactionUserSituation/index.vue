<!--
       * @功能描述:四大行业用户交易情况统计表
       * @作者:张朋
       * @工单号:#2820
       * @Date: 2019-11-26
       */
-->
<template>
  <div class="app-container calendar-list-container">
    <div v-if="this.getModelCode=='fourTransactionUserSituation'" class="filter-container">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline" ref="listQueryForm">
        <el-row>
          <org-selects ref="orgSelects" @select="selectOrg" @initOrg="initOrg"></org-selects>
          <el-form-item label="日期" algin="right">
            <el-date-picker
              style="width:150px"
              v-model="listQuery.issue"
              type="month"
              :clearable="true"
              format="yyyy-MM"
              value-format="yyyy-MM"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleFilter" icon="el-icon-search">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleExport" icon="el-icon-upload">导出</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <h2
      v-if="this.getModelCode!='fourTransactionUserSituation'"
      style="text-align:center"
    >{{this.orgName}}{{this.issueN}}全国四大行业用户交易情况统计</h2>
    <!--2019-12-20 #2820 zhangp 单位只保留电量和电价 -->
    <div class="txt-right unit-info">单位:{{unitMap.electricityUnit}}、{{unitMap.priceUnit}}</div>
    <!-- 通用表格组件 start -->
    <!-- <div style="margin:0 10px;"> -->
    <div class="table-con">
      <custom-table
        ref="customTable"
        :resultTableData="resultTableData"
        :colWidth="150"
        :dataKeys="dataKeys"
        :rowspanKey="rowspanKey"
        :colspanKey="colspanKey"
      />
      <!-- </div> -->
    </div>
    <!-- 通用表格组件 end -->
  </div>
</template>

<script>
//
import {
  fourTransactionList,
  fourTransactionExportAllFile
} from "@common/api/business/transactionQuery/sdElectricitySitituation/index";
import { layoutInfo } from "@common/utils/init";
import { mapGetters } from "vuex";
//2019-12-11 #2822 zhangp 引用单位
import {getUnitMapByModelCode, getUnitMap } from "@common/utils/index";
//引用区域和区域公司组件路径
import OrgSelects from "@common/components//areaComSelectsList";
import { parseTime } from "@common/utils/index";
const CustomTable = () => import("./components/CustomTable");
export default {
  name: "fourTransactionUserSituation",
  components: {
    CustomTable,
    OrgSelects
  },
  props: {
    issue: { type: String },
    orgId: { type: String },
    orgName: { type: String }
  },
  data() {
    return {
      issueN: this.issue,
      orgIdN: this.orgId,
      orgNameN: this.orgName,
      getModelCode: "",
      newArr: [[]], //表头
      maxHeight: 1, //表头总共占的行数
      colKeyList: [], //所有的key
      reportData: [],
      tableData: [],
      scrollbarHeight: "",
      scrollbarWidth: "",
      tableRowSpan: [],
      dataKeys: {
        month_name: "",
        total_use_electricity: "",
        coloured_use_electricity: "",
        steel_use_electricity: "",
        build_use_electricity: "",
        coal_use_electricity: "",
        sign_total_electricity: "",
        sign_total_ele_price: "",
        sign_total_dec_price: "",
        sign_coloured_electricity: "",
        sign_coloured_ele_price: "",
        sign_coloured_dec_price: "",
        sign_steel_electricity: "",
        sign_steel_ele_price: "",
        sign_steel_dec_price: "",
        sign_build_electricity: "",
        sign_build_ele_price: "",
        sign_build_dec_price: "",
        sign_coal_electricity: "",
        sign_coal_ele_price: "",
        sign_coal_dec_price: "",
        hj_total_electricity: "",
        hj_total_price: "",
        hj_total_dec_price: "",
        hj_coloured_electricity: "",
        hj_coloured_price: "",
        hj_coloured_dec_price: "",
        hj_steel_electricity: "",
        hj_steel_price: "",
        hj_steel_dec_price: "",
        hj_build_electricity: "",
        hj_build_price: "",
        hj_build_dec_price: "",
        hj_coal_electricity: "",
        hj_coal_price: "",
        hj_coal_dec_price: "",
        fd_total_electricity: "",
        fd_total_price: "",
        fd_total_dec_price: "",
        fd_coloured_electricity: "",
        fd_coloured_price: "",
        fd_coloured_dec_price: "",
        fd_steel_electricity: "",
        fd_steel_price: "",
        fd_steel_dec_price: "",
        fd_build_electricity: "",
        fd_build_price: "",
        fd_build_dec_price: "",
        fd_coal_electricity: "",
        fd_coal_price: "",
        fd_coal_dec_price: "",
        sd_total_electricity: "",
        sd_total_price: "",
        sd_total_dec_price: "",
        sd_coloured_electricity: "",
        sd_coloured_price: "",
        sd_coloured_dec_price: "",
        sd_steel_dec_price: "",
        sd_steel_electricity: "",
        sd_steel_price: "",
        sd_build_electricity: "",
        sd_build_price: "",
        sd_build_dec_price: "",
        sd_coal_electricity: "",
        sd_coal_price: "",
        sd_coal_dec_price: ""
      },
      listQuery: {
        issue: ""
      },
      unitMap: {}, //单位
      periodOptions: [], //周期
      rowspanKey: {
        total_use_electricity: { value: "all", state: false, rowIndex: "0" },
        coloured_use_electricity: { value: "all", state: false, rowIndex: "0" },
        steel_use_electricity: { value: "all", state: false, rowIndex: "0" },
        build_use_electricity: { value: "all", state: false, rowIndex: "0" },
        coal_use_electricity: { value: "all", state: false, rowIndex: "0" }
      },
      colspanKey: {},
      tableHeader: [],
      resultTableData: { tableHeader: [], result: [] }
    };
  },
  computed: {
    ...mapGetters(["layoutInfo", "allSubMenus"])
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
    }
  },
  created() {
    this.getModelCode = sessionStorage.getItem("modelCode");
    // this.initIssue();
    if (this.getModelCode != "fourTransactionUserSituation") {
      this.unitMap = getUnitMapByModelCode(
        this.allSubMenus,
        this.unitMap,
        "fourTransactionUserSituation"
      );
      let param = {
        issue: this.issue,
        region_org_id: this.orgId,
        region_org_name: this.orgName
      };
      this.showSubDialog(param);
      sessionStorage.setItem("pageModelCode", "fourTransactionUserSituation");
    } else {
      this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
      this.initIssue();
    }
  },
  destroyed() {},
  mounted() {
    this.layout = this.layoutInfo;
    this.scrollbarHeight = this.layoutInfo.height;

    this.initJyData();
  },
  methods: {
    showSubDialog(data) {
      this.listQuery.region_org_id = data.region_org_id;
      this.listQuery.issue = data.issue;
      this.getList();
    },    
    //初始化页面期次信息 //20191223 阿彪 #3277 报表期次统一调整
    initIssue() {
      let nowTime = new Date();
      let d = nowTime.getDate();
      let ym = "";
      if (d > 5) {
        nowTime.setMonth(nowTime.getMonth() - 1);
        ym = nowTime.getFullYear() + "-" + (nowTime.getMonth() + 1);
      } else {
        nowTime.setMonth(nowTime.getMonth() - 2);
        ym = nowTime.getFullYear() + "-" + (nowTime.getMonth() + 1);
      }
      this.listQuery.issue = ym;
    },
    //按组织初始化列表
    initOrg(id) {
      this.listQuery.region_org_id = id;
    },
    //设置查询条件中组织ID
    selectOrg(id) {
      this.listQuery.region_org_id = id;
      this.getList();
    },
    /**
     * @功能描述: 查询
     * @参数:
     * @返回值:
     * @作者: 张朋
     * @Date: 2019-11-26 13:59:59
     * @最新修改内容:
     * @LastEditTime:
     */
    handleFilter() {
      this.getList();
    },
    getList() {
      //2019-12-13 #2820 zhangp 日期为必选
      if (
        this.listQuery.issue == "" ||
        this.listQuery.issue == null ||
        typeof this.listQuery.issue == "undefined"
      ) {
        this.$notify({
          title: "提示",
          message: "请选择期次",
          type: "warning",
          duration: 2000
        });
        return true;
      } else {
        fourTransactionList(this.listQuery).then(res => {
          if (res.rel) {
            this.resultTableData["result"] = res.result;
          } else {
            this.$notify({
              title: "失败",
              message: res.msg,
              type: "warning",
              duration: 2000
            });
            this.resultTableData["result"] = [];
          }
          this.loading = false;
        });
      }
    },
    /*
     * @功能描述:  初始交易台账数据
     * @作者: 康如涛
     * @Date: 2019-11-21
     */
    initJyData() {
      this.tableHeader = [
        {
          col_name: "",
          col_value: "month_name",
          fixed: "left"
        },
        {
          col_name: "预计全年用电量",
          col_value: "",
          fixed: false,
          cols: [
            {
              col_name: "合计",
              col_value: "total_use_electricity",
              fixed: false
            },
            {
              col_name: "有色",
              col_value: "coloured_use_electricity",
              fixed: false
            },
            {
              col_name: "钢铁 ",
              col_value: "steel_use_electricity",
              fixed: false
            },
            {
              col_name: "建材 ",
              col_value: "build_use_electricity",
              fixed: false
            },
            {
              col_name: "煤炭",
              col_value: "coal_use_electricity",
              fixed: false
            }
          ]
        },
        {
          col_name: "市场签约情况 ",
          fixed: false,
          cols: [
            {
              col_name: "合计",
              fixed: false,
              cols: [
                {
                  col_name: "签约量",
                  col_value: "sign_total_electricity",
                  fixed: false
                },
                {
                  col_name: "电价",
                  col_value: "sign_total_ele_price",
                  fixed: false
                },
                {
                  col_name: "降幅",
                  col_value: "sign_total_dec_price",
                  fixed: false
                }
              ]
            },
            {
              col_name: "有色",
              fixed: false,
              cols: [
                {
                  col_name: "签约量",
                  col_value: "sign_coloured_electricity",
                  fixed: false
                },
                {
                  col_name: "电价",
                  col_value: "sign_coloured_ele_price",
                  fixed: false
                },
                {
                  col_name: "降幅",
                  col_value: "sign_coloured_dec_price",
                  fixed: false
                }
              ]
            },
            {
              col_name: "钢铁",
              fixed: false,
              cols: [
                {
                  col_name: "签约量",
                  col_value: "sign_steel_electricity",
                  fixed: false
                },
                {
                  col_name: "电价",
                  col_value: "sign_steel_ele_price",
                  fixed: false
                },
                {
                  col_name: "降幅",
                  col_value: "sign_steel_dec_price",
                  fixed: false
                }
              ]
            },
            {
              col_name: "建材",
              fixed: false,
              cols: [
                {
                  col_name: "签约量",
                  col_value: "sign_build_electricity",
                  fixed: false
                },
                {
                  col_name: "电价",
                  col_value: "sign_build_ele_price",
                  fixed: false
                },
                {
                  col_name: "降幅",
                  col_value: "sign_build_dec_price",
                  fixed: false
                }
              ]
            },
            {
              col_name: "煤炭",
              fixed: false,
              cols: [
                {
                  col_name: "签约量",
                  col_value: "sign_coal_electricity",
                  fixed: false
                },
                {
                  col_name: "电价",
                  col_value: "sign_coal_ele_price",
                  fixed: false
                },
                {
                  col_name: "降幅",
                  col_value: "sign_coal_dec_price",
                  fixed: false
                }
              ]
            }
          ]
        },
        {
          col_name: "公司合计签约情况 ",
          fixed: false,
          cols: [
            {
              col_name: "合计",
              fixed: false,
              cols: [
                {
                  col_name: "签约量",
                  col_value: "hj_total_electricity",
                  fixed: false
                },
                { col_name: "电价", col_value: "hj_total_price", fixed: false },
                {
                  col_name: "降幅",
                  col_value: "hj_total_dec_price",
                  fixed: false
                }
              ]
            },
            {
              col_name: "有色",
              fixed: false,
              cols: [
                {
                  col_name: "签约量",
                  col_value: "hj_coloured_electricity",
                  fixed: false
                },
                {
                  col_name: "电价",
                  col_value: "hj_coloured_price",
                  fixed: false
                },
                {
                  col_name: "降幅",
                  col_value: "hj_coloured_dec_price",
                  fixed: false
                }
              ]
            },
            {
              col_name: "钢铁",
              fixed: false,
              cols: [
                {
                  col_name: "签约量",
                  col_value: "hj_steel_electricity",
                  fixed: false
                },
                { col_name: "电价", col_value: "hj_steel_price", fixed: false },
                {
                  col_name: "降幅",
                  col_value: "hj_steel_dec_price",
                  fixed: false
                }
              ]
            },
            {
              col_name: "建材",
              fixed: false,
              cols: [
                {
                  col_name: "签约量",
                  col_value: "hj_build_electricity",
                  fixed: false
                },
                { col_name: "电价", col_value: "hj_build_price", fixed: false },
                {
                  col_name: "降幅",
                  col_value: "hj_build_dec_price",
                  fixed: false
                }
              ]
            },
            {
              col_name: "煤炭",
              fixed: false,
              cols: [
                {
                  col_name: "签约量",
                  col_value: "hj_coal_electricity",
                  fixed: false
                },
                { col_name: "电价", col_value: "hj_coal_price", fixed: false },
                {
                  col_name: "降幅",
                  col_value: "hj_coal_dec_price",
                  fixed: false
                }
              ]
            }
          ]
        },
        {
          col_name: "电厂签约情况 ",
          fixed: false,
          cols: [
            {
              col_name: "合计",
              fixed: false,
              cols: [
                {
                  col_name: "签约量",
                  col_value: "fd_total_electricity",
                  fixed: false
                },
                { col_name: "电价", col_value: "fd_total_price", fixed: false },
                {
                  col_name: "降幅",
                  col_value: "fd_total_dec_price",
                  fixed: false
                }
              ]
            },
            {
              col_name: "有色",
              fixed: false,
              cols: [
                {
                  col_name: "签约量",
                  col_value: "fd_coloured_electricity",
                  fixed: false
                },
                {
                  col_name: "电价",
                  col_value: "fd_coloured_price",
                  fixed: false
                },
                //2019-12-18 #2820 zhangp 电厂签约情况-有色-降幅字段调整
                {
                  col_name: "降幅",
                  col_value: "fd_coloured_dec_price",
                  fixed: false
                }
              ]
            },
            {
              col_name: "钢铁",
              fixed: false,
              cols: [
                {
                  col_name: "签约量",
                  col_value: "fd_steel_electricity",
                  fixed: false
                },
                { col_name: "电价", col_value: "fd_steel_price", fixed: false },
                {
                  col_name: "降幅",
                  col_value: "fd_steel_dec_price",
                  fixed: false
                }
              ]
            },
            {
              col_name: "建材",
              fixed: false,
              cols: [
                {
                  col_name: "签约量",
                  col_value: "fd_build_electricity",
                  fixed: false
                },
                { col_name: "电价", col_value: "fd_build_price", fixed: false },
                {
                  col_name: "降幅",
                  col_value: "fd_build_dec_price",
                  fixed: false
                }
              ]
            },
            {
              col_name: "煤炭",
              fixed: false,
              cols: [
                {
                  col_name: "签约量",
                  col_value: "fd_coal_electricity",
                  fixed: false
                },
                { col_name: "电价", col_value: "fd_coal_price", fixed: false },
                {
                  col_name: "降幅",
                  col_value: "fd_coal_dec_price",
                  fixed: false
                }
              ]
            }
          ]
        },
        {
          col_name: "售电公司签约情况 ",
          fixed: false,
          cols: [
            {
              col_name: "合计",
              fixed: false,
              cols: [
                {
                  col_name: "签约量",
                  col_value: "sd_total_electricity",
                  fixed: false
                },
                { col_name: "电价", col_value: "sd_total_price", fixed: false },
                {
                  col_name: "降幅",
                  col_value: "sd_total_dec_price",
                  fixed: false
                }
              ]
            },
            {
              col_name: "有色",
              fixed: false,
              cols: [
                {
                  col_name: "签约量",
                  col_value: "sd_coloured_electricity",
                  fixed: false
                },
                {
                  col_name: "电价",
                  col_value: "sd_coloured_price",
                  fixed: false
                },
                {
                  col_name: "降幅",
                  col_value: "sd_coloured_dec_price",
                  fixed: false
                }
              ]
            },
            {
              col_name: "钢铁",
              fixed: false,
              cols: [
                {
                  col_name: "签约量",
                  col_value: "sd_steel_electricity",
                  fixed: false
                },
                { col_name: "电价", col_value: "sd_steel_price", fixed: false },
                {
                  col_name: "降幅",
                  col_value: "sd_steel_dec_price",
                  fixed: false
                }
              ]
            },
            {
              col_name: "建材",
              fixed: false,
              cols: [
                {
                  col_name: "签约量",
                  col_value: "sd_build_electricity",
                  fixed: false
                },
                { col_name: "电价", col_value: "sd_build_price", fixed: false },
                {
                  col_name: "降幅",
                  col_value: "sd_build_dec_price",
                  fixed: false
                }
              ]
            },
            {
              col_name: "煤炭",
              fixed: false,
              cols: [
                {
                  col_name: "签约量",
                  col_value: "sd_coal_electricity",
                  fixed: false
                },
                { col_name: "电价", col_value: "sd_coal_price", fixed: false },
                {
                  col_name: "降幅",
                  col_value: "sd_coal_dec_price",
                  fixed: false
                }
              ]
            }
          ]
        }
      ];
      // this.tableData.forEach((item, index) => {
      //   this.tableData[index] = this.setReportData(item, index);
      // });
      this.resultTableData["result"] = this.tableData;
      this.resultTableData["tableHeader"] = this.tableHeader;
      this.resultTableData["rowspanKey"] = this.rowspanKey;
      this.resultTableData["colspanKey"] = this.colspanKey;
      // this.setViewsList();
    },
    /*
     * @功能描述: 导出数据
     * @作者: 康如涛
     * @Date: 2019-11-21
     */
    handleExport() {
      if (this.listQuery.issue) {
        let param = {
          issue: this.listQuery.issue,
          region_org_id: this.listQuery.region_org_id
        };
        fourTransactionExportAllFile(param);
      } else {
        this.$notify({
          title: "提示",
          message: "请选择期次",
          type: "warning",
          duration: 2000
        });
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
</style>



