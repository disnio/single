
<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container f-ml10 f-mt10">
      <!-- 查询条件 -->
      <el-form :inline="true" :model="listQuery" class="demo-form-inline" ref="listQueryForm">
        <el-row>
          <org-selects ref="orgSelects" @select="selectOrg" @initOrg="initOrg"></org-selects>
          <el-form-item label="交易序列名称:">
            <el-input type="text" v-model="listQuery.jyxlmc" :clearable="true" style="width:160px"></el-input>
          </el-form-item>
          <el-form-item label="交易品种:">
            <el-select
              class="four-col left"
              :clearable="true"
              v-model="listQuery['tradingVariety']"
              placeholder="请选择"
              style="width:160px"
            >
              <el-option
                v-for="item in varietyOptions"
                :key="item.propCode"
                :label="item.propName"
                :value="item.propCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <!--2019-11-3 #2454 张朋 交易周期和交易期次组件  start-->
          <org-selectsTime ref="selectsTime" @selectTime="selectTime" @tradeIssure="tradeIssure"></org-selectsTime>
          <!-- <el-form-item label="交易周期:">
            <el-select
              class="four-col left"
              :clearable="true"
              v-model="listQuery['tradingCycle']"
              placeholder="请选择"
              @change="changeTradingCycle"
              style="width:161px"

            >
              <el-option
                style="width:160px"
                v-for="item in periodOptions"
                :key="item.propCode"
                :label="item.propName"
                :value="item.propCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易期次:">
            <el-date-picker
              v-if="
                listQuery['tradingCycle'] != 'jyzq01' &&
                  listQuery['tradingCycle'] != 'jyzq02' &&
                  listQuery['tradingCycle'] != 'jyzq03'&&
                  listQuery['tradingCycle'] != 'jyzq04'&&
                  listQuery['tradingCycle'] != 'jyzq05'
              "
              type="year"
              :clearable="true"
              placeholder="选择期次"
              :disabled="true"
              style="width:160px"
            ></el-date-picker>
            <el-date-picker
              v-if="listQuery['tradingCycle'] == 'jyzq01'"
              v-model="tradeIssureData.yearData"
              type="year"
              placeholder="选择年"
              :clearable="true"
              @input="setTradeIssure"
            ></el-date-picker>
            <el-date-picker
              v-if="listQuery['tradingCycle'] == 'jyzq02'"
              v-model="tradeIssureData.yearData"
              type="year"
              @input="setTradeIssure"
              style="width:50%;float:left;"
              placeholder="选择年"
              :clearable="true"
            ></el-date-picker>
            <el-date-picker
              @input="setTradeIssure"
              v-if="listQuery['tradingCycle'] == 'jyzq03'||
              listQuery['tradingCycle'] == 'jyzq04'||
              listQuery['tradingCycle'] == 'jyzq05'"
              v-model="tradeIssureData.monthData"
              type="month"
              placeholder="选择月"
              :clearable="true"
              class="w180"
            ></el-date-picker>

            <el-select
              @input="setTradeIssure"
              v-if="listQuery['tradingCycle'] == 'jyzq02'"
              style="width:40%;float:left;"
              :clearable="true"
              v-model="tradeIssureData.quarter"
              placeholder="季度"
            >
              <el-option
                v-for="item in quarterOptions"
                :key="item.propCode"
                :label="item.propName"
                :value="item.propCode"
              ></el-option>
            </el-select> -->

            <!-- <el-date-picker
              v-if="cycleYear"
              v-model="yearData"
              type="year"
              placeholder="选择年"
              :disabled="isTradingCycle"
              style="width:160px"
              @change="getYearData"
            >
            </el-date-picker>
            <el-date-picker
              v-if="cycleMonth"
              v-model="monthData"
              type="month"
              placeholder="选择月"
              :disabled="isTradingCycle"
              style="width:160px"
              @change="getMonthData"
            >
            </el-date-picker>
            <el-date-picker
              class="w-half"
              v-if="cycleQuarter"
              v-model="quarterData.year"
              type="year"
              placeholder="选择年"
              style="width:160px"
              :disabled="isTradingCycle"
              @change="getQuarterDataYear"
            >
            </el-date-picker>
            <el-select
              v-if="cycleQuarter"
              class="w-half left"
              :clearable="true"
              v-model="quarterData.quarter"
              style="width:160px"
              placeholder="季度"
              @change="getQuarter"
              :disabled="isTradingCycle"
            >
              <el-option
                v-for="item in quarterOptions"
                :key="item.propCode"
                :label="item.propName"
                :value="item.propCode"
                style="width:160px"
              >
              </el-option>
            </el-select>-->
          <!-- </el-form-item> -->
           <!--2019-11-3 #2454 张朋 交易周期和交易期次组件  end-->
           <!--2019-11-8 #2454 张朋 查询按钮位置调整 -->
          <el-button class="filter-item" type="primary" @click="handleFilter" icon="el-icon-search">查询</el-button>
        </el-row>
      </el-form>
    </div>

    <el-button-group class="f-mb10">
      <!-- <el-button type="primary" v-if="jyAreaNoticeManager_btn_del" icon="el-icon-delete" @click="handleDeleteById">删除</el-button> -->
      <el-button
        type="primary"
        v-if="jyAreaNoticeManager_btn_export"
        icon="el-icon-download"
        @click="handleExport"
      >导出</el-button>
    </el-button-group>
    <el-table
      :key="tableKey"
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @selection-change="selsChange"
      :height="tabHeight"
    >
      <el-table-column align="center" width="55" type="selection"></el-table-column>
      <el-table-column prop="index" label="序号" align="center" width="70px"></el-table-column>
      <el-table-column align="center" label="交易中心">
        <template slot-scope="scope">
          <span>{{ scope.row.tradingCenterName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="交易序列名称">
        <template slot-scope="scope">
          <span>{{ scope.row.jyxlmc }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="交易品种">
        <template slot-scope="scope">
          <span>{{ scope.row.tradingVarietyName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="交易方式">
        <template slot-scope="scope">
          <span>{{ scope.row.tradingWayName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="交易周期">
        <template slot-scope="scope">
          <span>{{ scope.row.tradingCycleName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="交易期次">
        <template slot-scope="scope">
          <span>{{ scope.row.tradingTime }}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="handleUpdate(scope.row)">查看</el-button>
          <!-- <el-button v-if="jyAreaNoticeManager_btn_del" size="small" type="text" @click="handleDelete(scope.row)">删除
          </el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.page"
        :page-sizes="[10, 20, 30, 50, 100, 200, 500, 1000]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      ref="dialogResult"
      custom-class="w1000"
      :title="textMap[dialogStatus]"
      :visible.sync="dialogResultVisible"
      :before-close="beforeClose"
    >
      <bus-result
        @closeResultDialog="closeResultDialog"
        :jyTradingResultsId="jyTradingResultsId"
        :dialogStatus="dialogStatus"
        :varietyOptions="varietyOptions"
        :wayOptions="wayOptions"
        :centerOptions="centerOptions"
        :jyTradingResultsInfo="jyTradingResultsInfo"
        :periodOptions="periodOptions"
        v-on:callList="getList($event)"
        ref="busResult"
      ></bus-result>
    </el-dialog>
  </div>
</template>

<script>
import {
  page,
  addObj,
  getObj,
  delObj,
  putObj,
  waySelectObj,
  varietySelectObj,
  centerSelectObj,
  periodSelectObj,
  exportObj
} from "@common/api/business/jysAreaNotice/index";
import { getNewPageList } from "@common/api/business/jySellNotice/index";
import { getUserOrgInfo } from "@common/api/public/index";
import { parseTime } from "@common/utils/index";
import { mapGetters } from "vuex";
import { getSelectList } from "@common/api/base";
import { initLayout } from "@common/utils/init";
// import OrgSelects from "@/views/components/areaComSelectsList";
import OrgSelects from "./components/orgSelectSearch";
export default {
  name: "jysAreaNotice",
  components: {
    "bus-result": () => import("./components/busResult"),
     //2019-11-3 #2454 张朋 交易周期、期次组件路径
    "org-selectsTime": () => import("./components/orgSelectsTime"), 
     OrgSelects
  },
  data() {
    return {
      sels: "",
      yearData: "",
      monthData: "",
      cycleMonth: false,
      cycleQuarter: false,
      isTradingCycle: true,
      cycleYear: true,
      form: {
        isdelete: undefined,
        tradingCenterCode: undefined,
        noticeDate: undefined,
        jyxlmc: undefined,
        tradingCycleCode: undefined,
        tradingTime: undefined,
        tradingVariety: undefined,
        tradingWayCode: undefined,
        enclosure: undefined,
        description: undefined,
        createUser: undefined,
        createTime: undefined,
        modifyUser: undefined,
        modifyTime: undefined
      },
      tradeIssureData: {
        quarter: "",
        monthData: "",
        yearData: "",
        // tradeBeginMonth: "",
        // tradeEndMonth: ""
      },
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        orgId: "",
        regionOrgId:"",
        noticeDate: undefined, //发布日期
        tradingCenterId: undefined, //交易中心
        tradingVariety: undefined, //交易品种
        tradingWay: undefined, //交易方式
        //调整备注名称
        tradingTime: undefined, //交易期次
        //2019-11-4 #2454 张朋 添加交周期次字段
        tradingCycle:undefined, //交易周期
        // tradeBeginMonth: "",
        // tradeEndMonth: ""
      },
      dialogFormVisible: false,
      dialogResultVisible: false,
      dialogStatus: "",
      jyAreaNoticeManager_btn_export: false,
      jyAreaNoticeManager_btn_del: false,
      jyAreaNoticeManager_btn_add: false,
      textMap: {
        update: "查看",
        create: "新增"
      },
      quarterData: {
        quarter: "",
        year: ""
      },
      tableKey: 0,
      //transactionsVariety:"",
      varietyOptions: [],
      //transactionMode:"",
      wayOptions: [],
      centerOptions: [],
      periodOptions: [],
      noticeDate: undefined,
      jyTradingResultsInfo: {},
      jyTradingResultsId: undefined,
      tabHeight: 0
    };
  },
  created() {
    this.init();
    this.getList();
    this.jyAreaNoticeManager_btn_export = this.elements[
      "jyAreaNoticeManager:btn_export"
    ];
    this.jyAreaNoticeManager_btn_del = this.elements[
      "jyAreaNoticeManager:btn_del"
    ];
    this.jyAreaNoticeManager_btn_add = this.elements[
      "jyAreaNoticeManager:btn_add"
    ];
  },
  computed: {
    ...mapGetters(["elements"])
  },
  methods: {
      /**
      * @方法名称: selectTime
      * @功能描述: 获取组件交易周期信息
      * @参数: 
      * @返回值: 
      * @作者: 张朋
      * @Date: 2019-11-03 16:26:04
      * @最新修改内容: 
      * @LastEditTime: 
      */
    selectTime(id) {      
       if(id != null){
           this.listQuery.tradingCycle = id;
       }
    },
       /**
      * @方法名称: tradeIssure
      * @功能描述: 获取组件交易期次信息
      * @参数: 
      * @返回值: 
      * @作者: 张朋
      * @Date: 2019-11-03 16:26:28
      * @最新修改内容: 
      * @LastEditTime: 
      */
     tradeIssure(id){
       if(typeof id == "undefined"){
         //2019-11-4 #2454 张朋 交易期次参数调整
           this.listQuery.tradingTime = undefined;
       }else{
           this.listQuery.tradingTime = id;
       }
    },
    //设置查询条件中组织ID
    selectOrg(id) {
      this.listQuery.regionOrgId = id;
    },
    //按组织初始化列表
    initOrg(id) {
      this.listQuery.regionOrgId = id;
      this.getList();
    },
    init() {
      /**2019-11-3 #2454 增加“周”交易周期筛选项 start*/
      // //交易周期
      // getSelectList("transaction_period").then(res => {
      //   this.periodOptions = res;
      // });
      // //交易季度
      // getSelectList("quarter").then(res => {
      //   this.quarterOptions = res;
      // });
      // //交易季度
      // getSelectList("Quotation_segment").then(res => {
      //   this.quotationSegmentOption = res;
      // });
      /**2019-11-3 #2454 增加“周”交易周期筛选项 end*/
      this.setLayoutHeight();
      this.selctGroup();
    },
    setLayoutHeight() {
      this.tabHeight = initLayout() - 230;
    },
    getList() {
      this.listLoading = true;
      getUserOrgInfo().then(res => {
        res.forEach(element => {
          if (element.attributeTypeCode == "zzjgsx03") {
            this.listQuery.regionOrgId = element.id;
          }
        });
        // this.listQuery.orgId = res[res.length - 1].id;
        this.listQuery.orgType = "product";
        getNewPageList(this.listQuery).then(response => {
          let items = response.data.rows.map((item, index) => {
            item.index =
              index + 1 + (this.listQuery.page - 1) * this.listQuery.limit;
            return item;
          });
          // this.list = items;
          this.list = response.data.rows;
          this.total = response.data.total;
          this.listLoading = false;
        });
      });
    },

    handleFilter() {
      this.listQuery.noticeDate = this.noticeDate;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    handleCreate() {
      this.dialogStatus = "create";
      this.dialogResultVisible = true;
    },
    beforeClose() {
      this.$refs.busResult.resetTemp();
      this.dialogResultVisible = false;
    },
    handleUpdate(row) {
      // this.dialogStatus = "update";
      // this.jyTradingResultsId = row.jyTradingResultsId;
      // this.jyTradingResultsInfo = row;
      // this.dialogResultVisible = true;
      // if (typeof this.$refs.busResult != "undefined") {
      //   this.$refs.busResult.getResultList(this.dialogStatus, row);
      // }
      let params ={
          dialogStatus :"update",
          jyTradingResultsInfo: row
      }      
       //this.$store.commit("SET_NOTICE_QUERY", params);
       // 存储值：将对象转换为Json字符串
        sessionStorage.setItem('objStr', JSON.stringify(params))
        this.$router.push({
          path: "/business/jysAreaNotice/components/busResult"
        });
    },
      /**2019-11-3 #2454 交易周期筛选父组件备注  start*/
    // //点击交易周期匹配对应的交易期次
    // changeTradingCycle(val) {
    //   if (val) {
    //     this.monthData = "";
    //     this.yearData = "";
    //     this.quarterData = {
    //       quarter: "",
    //       year: ""
    //     };
    //     this.isTradingCycle = false;
    //     this.cycleYear = false;
    //     this.cycleQuarter = false;
    //     this.cycleMonth = false;
    //     if (val == "jyzq01") {
    //       this.cycleYear = true;
    //     } else if (val == "jyzq02") {
    //       this.cycleQuarter = true;
    //     } else if (val == "jyzq03") {
    //       this.cycleMonth = true;
    //     }
    //   } else {
    //     this.monthData = "";
    //     this.yearData = "";
    //     this.quarterData = {
    //       quarter: "",
    //       year: ""
    //     };
    //     this.isTradingCycle = true;
    //   }
    // },
      /**2019-11-3 #2454 交易周期筛选父组件备注  end*/

    // 复选框点击
    selsChange(val) {
      let id = "";
      val.forEach(element => {
        id += "," + element.jyTradingResultsId;
      });
      id = id.substring(1);
      this.sels = id;
      this.listQuery.jyTradingResultsId = id;
    },
    handleDeleteById() {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delObj(this.sels).then(() => {
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 2000
          });
          this.getList();
        });
      });
    },
    handleDelete(row) {
      //console.log(row);
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delObj(row.jyTradingResultsId).then(res => {
          if (res.rel) {
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success",
              duration: 2000
            });
          } else {
            this.$notify({
              title: "提示",
              message: res.msg,
              type: "warning",
              duration: 2000
            });
          }

          this.getList();
          const index = this.list.indexOf(row);
          this.list.splice(index, 1);
        });
      });
    },
    //获取对应的交易期次
    //年度
    getYearData(val) {
      if (val) {
        this.yearData = parseTime(val, "{y}");
      }
      this.listQuery.tradingTime = this.yearData;
    },
    //月度
    getMonthData(val) {
      if (val) {
        this.monthData = parseTime(val, "{y}-{m}");
      }
      this.listQuery.tradingTime = this.monthData;
    },
    //季度
    getQuarterDataYear(val) {
      if (val) {
        this.quarterData.year = parseTime(val, "{y}");
      }
    },
    getQuarter(val) {
      if (val) {
        this.quarterData.quarter = val;
        this.listQuery.tradingTime =
          this.quarterData.year + "年-" + this.quarterData.quarter + "季度";
      } else {
        this.tradingTime = "";
      }
    },
    cancel(formName) {
      this.dialogFormVisible = false;
      const set = this.$refs;
      set[formName].resetFields();
    },

    handleExport() {
      let parme = {
        tradingCenterId: this.listQuery.tradingCenterId,
        tradingVariety: this.listQuery.tradingVariety,
        tradingWay: this.listQuery.tradingWay,
        noticeDate: this.listQuery.noticeDate,
        tradingCycle: this.listQuery.tradingCycle,
        tradingTime: this.listQuery.tradingTime,
        orgType: this.listQuery.orgType,
        // orgId: this.listQuery.orgId,
        regionOrgId:this.listQuery.regionOrgId
      };
      exportObj(parme);
    },

    closeUserDialog() {
      this.dialogResultVisible = false;
    },
    getNoticeDate(val) {
      this.noticeDate = val;
    },
    closeResultDialog() {
      this.dialogResultVisible = false;
    },
    selctGroup() {
      varietySelectObj().then(res => {
        this.varietyOptions = res;
      });

      waySelectObj().then(res => {
        this.wayOptions = res;
      });

      centerSelectObj().then(res => {
        this.centerOptions = res;
      });
      periodSelectObj().then(res => {
        this.periodOptions = res;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.w1200 {
  width: 1200px !important;
}
//2019-11-8 #2454 张朋 查询按钮位置调整 
.filter-container ::v-deep .filter-item {
    margin-bottom: -8px!important;
}
</style>

