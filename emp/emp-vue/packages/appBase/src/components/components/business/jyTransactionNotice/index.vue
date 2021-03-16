
<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container f-ml10 f-mt10">
      <!-- 查询条件 -->
      <!-- <el-form :inline="true" :model="listQuery" class="demo-form-inline" ref="listQueryForm"> -->
      <el-form :inline="true" :model="listQuery" class="demo-form-inline" ref="listQueryForm" style="padding-bottom:15px">
        <!-- <el-row> -->
        <el-form-item label="交易序列名称">
          <el-input type="text" v-model="listQuery.jyxlmc" :clearable="true" style="width:160px"></el-input>
        </el-form-item>
        <el-form-item label="交易品种">
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
        <!--2019-11-3 #2454 张朋 交易周期和交易期次组件  -->
        <org-selectsTime ref="selectsTime" :selectWidth="selectWidth" @selectTime="selectTime" @tradeIssure="tradeIssure"></org-selectsTime>
        <!-- <el-date-picker
              v-if="cycleYear"
              v-model="yearData"
              type="year"
              placeholder="选择年"
              :disabled="isTradingCycle"
              style="width:160px"
              @change="getYearData"
            ></el-date-picker>
            <el-date-picker
              v-if="cycleMonth"
              v-model="monthData"
              type="month"
              placeholder="选择月"
              :disabled="isTradingCycle"
              style="width:160px"
              @change="getMonthData"
            ></el-date-picker>
            <el-date-picker
              class="w-half"
              v-if="cycleQuarter"
              v-model="quarterData.year"
              type="year"
              placeholder="选择年"
              style="width:160px"
              :disabled="isTradingCycle"
              @change="getQuarterDataYear"
            ></el-date-picker>
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
              ></el-option>
            </el-select>
        </el-form-item>-->
        <!--2019-11-8 #2454 张朋 查询按钮位置调整 -->
        <!-- 20191223 阿彪 #3235 添加时间查询 start-->
        <el-form-item label="报价时间">
          <el-date-picker
            style="width:130px;margin-right: -6px;"
            class="picker"
            v-model="listQuery.startDate"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="至">
          <el-date-picker
            style="width:130px"
            class="picker"
            v-model="listQuery.endDate"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <!-- 20191223 阿彪 #3235 添加时间查询 end-->
        <el-form-item label="状态">
          <el-select
            class="four-col left"
            :clearable="true"
            v-model="listQuery['status']"
            placeholder="请选择"
            style="width:130px"
          >
            <el-option
              v-for="item in getStatusOptionsArr"
              :key="item.propCode"
              :label="item.propName"
              :value="item.propCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button
          class="filter-item"
          type="primary"
          v-waves
          icon="el-icon-search"
          @click="handleFilter"
        >查询</el-button>
        <!-- </el-row> -->
      </el-form>
    </div>

    <el-button-group class="f-mb10">
      <!-- <el-button
        v-if="jyTransactionNoticeManager_btn_add"
        class="filter-item"
        type="primary"
        icon="el-icon-plus"
        @click="handleCreate"
        >新增</el-button
      >
      <el-button
        v-if="jyTransactionNoticeManager_btn_del"
        type="primary"
        icon="el-icon-delete"
        @click="handleDeleteById"
        >删除</el-button
      >-->
      <el-button
        v-if="btn.jyTransactionNoticeManager_btn_export"
        type="primary"
        icon="el-icon-upload"
        @click="handleExport"
      >导出</el-button>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-upload"
        @click="handleUpload"
        v-if="btn.jyTransactionNoticeManager_cf_import_btn"
      >导入</el-button>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-view"
        @click="showImportResult"
        v-if="btn.jyTransactionNoticeManager_cf_view_btn"
      >导入解析</el-button>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handledownloadTemplate"
        v-if="btn.jyTransactionNoticeManager_cf_download_btn"
      >模板下载</el-button>
    </el-button-group>
    <span style="float:right;display: inline-block;margin-top: 10px;">单位：{{unitMap.electricityUnit}}</span>
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
     <!-- #4376 去掉选择框 -->
      <!-- <el-table-column align="center" width="55" type="selection"></el-table-column> -->
      <el-table-column prop="index" label="序号" align="center" width="70px"></el-table-column>
      <el-table-column align="center" label="交易中心">
        <template slot-scope="scope">
          <span>{{ scope.row.tradingCenterName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="100px" label="交易序列名称">
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

      <el-table-column align="center" label="成交电量">
        <template slot-scope="scope">
          <div class="txt-right">{{ scope.row.electricitys }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.statusName }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column width="200px" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.crtTime }}</span>
        </template>
      </el-table-column>-->
      <el-table-column fixed="right" align="center" label="操作" width="180">
        <template slot-scope="scope">
          <!-- #2716 2019-11-19 张亮三 修改当在没有状态下查看按钮不显示 start -->
          <el-button
            v-if="scope.row.statusName=='已保存' || scope.row.statusName=='已提交'"
            size="small"
            type="text"
            @click="handleUpdate(scope.row, 'view')"
          >查看</el-button>
          <!-- #2716 2019-11-19 张亮三 修改当在没有状态下查看按钮不显示 start -->
          <el-button
            v-if="btn.jyTransactionNoticeManager_btn_edit&&
            scope.row.statusName=='已保存' || (scope.row.statusName==''|| typeof scope.row.statusName=='undefined')"
            size="small"
            type="text"
            @click="handleUpdate(scope.row, 'edit')"
          >结果维护</el-button>
          <!-- #2716 2019-11-19 张亮三 增加未成交按钮 start -->
          <el-button
            v-if="btn.jyTransactionNoticeManager_btn_no_deal && (scope.row.statusName==''|| typeof scope.row.statusName=='undefined')"
            size="small"
            type="text"
            @click="handleNoDeal(scope.row, '23')"
          >未成交</el-button>
          <!-- #2871 2019-11-27 秦侯珍 增加修改按钮 start -->
          <el-button
            v-if="btn.jyTransactionNoticeManager_btn_no_modify && scope.row.statusName=='已提交'"
            size="small"
            type="text"
            @click="handleUpdate(scope.row, 'revise')"
          >修改</el-button>
          <!-- #2871 2019-11-27 秦侯珍 增加修改按钮 end -->
          <!-- #2716 2019-11-19 张亮三 增加未成交按钮 end -->
          <!-- <el-button
            v-if="jyTransactionNoticeManager_btn_del"
            size="small"
            type="text"
            @click="handleDelete(scope.row)"
            >删除
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
      custom-class="w1100"
      :title="textMap[dialogStatus]"
      :visible.sync="dialogResultVisible"
      :before-close="beforeClose"
    >
      <bus-result
        @closeResultDialog="closeResultDialog"
        :dialogStatus="dialogStatus"
        :isdisabale="isdisabale"
        :btn="btn"
        :resultId="this.resultId"
        :isdisabaleBtn="isdisabaleBtn"
        :varietyOptions="varietyOptions"
        :wayOptions="wayOptions"
        :centerOptions="centerOptions"
        :jyTradingResultsInfo="jyTradingResultsInfo"
        :periodOptions="periodOptions"
        :quarterOptions="quarterOptions"
        :tradingUnitAll="tradingUnitAll"
        :orgAll="orgAll"
        :customerAll="customerAll"
        :transactionData="transactionData"
        :unitMap="unitMap"
        v-on:callList="getList($event)"
        :electricityPriceStyle="electricityPriceStyle"
        :isBfms="isBfms"
        :isWhzz="isWhzz"
        ref="busResult"
      ></bus-result>
    </el-dialog>

    <!--  #4002 chenf 2020/4/30 -- start ---- -->
    <import-dialog ref="importDialog" :resultIds="resultIds" />

    <importResult ref="showResultDialogs" :resultIds="resultIds"/>
    <!--  #4002 chenf 2020/4/30 -- end ---- -->
  </div>
</template>

<script>
import {
  // #2716 2019-11-19 张亮三 增加编辑update
  update,
  page,
  pageList,
  addObj,
  delObj,
  putObj,
  //selectObj,
  waySelectObj,
  varietySelectObj,
  centerSelectObj,
  periodSelectObj,
  getTradingUnitAll,
  getOrgAll,
  getCustomerAll,
  exportObj,
  quarterSelectObj,
  getTradingStatuss,
  downloadTemplate,
  getValueByOrgIdAndCode
} from "@common/api/business/jyTransactionNotice/index";
//2019-11-4 #2556 张朋 交易中心根据id获取信息地址
//#4359 gaoaining 2020-06-28 
import {
  getValueByOrgIdAndCode2,
} from "@common/api/business/jyTransactionNotice/index";
import{getObj } from "@common/api/basicData/tMdataJyorg/index";
import { getNewPageList ,getStatusOptionsObj} from "@/api/business/jySellNotice/index";
import { getUserOrgInfo } from "@common/api/public/index";
import { mapGetters } from "vuex";
import { initLayout } from "@common/utils/init";
import { getSelectList } from "@common/api/base";

import { parseTime,getUnitMap } from "@common/utils/index";
import mixin from "./mixins/importResolutionMixins"
export default {
  name: "jyTransactionNotice",
  mixins: [mixin],
  components: {
    "bus-result": () => import("./components/busResult"),
     //2019-11-3 #2454 张朋 交易周期、期次组件路径
    "org-selectsTime": () => import("./components/orgSelectsTime"),
    // #4002 chenf 2020/4/30 -- start ----
    "cTable": () => import("./components/cTablePagination"),
    "importDialog": () => import("./components/ImportDialog"),
    "importResult": () => import("./components/importResult")
    // #4002 chenf 2020/4/30 -- end ----
  },
  data() {
    return {
      isWhzz:false,//#4369 gaoaining 2020-06-28 
      isBfms:false,//4188 gaoaining 2020-06-22
      resultIds:[],
      dialogInfo: {
        btnSave: true,
        btnSubmit: true,
        notEdit: false,
        status: "add",
        title: "新增"
      },
      tradeIssureData: {
        quarter: "",
        monthData: "",
        yearData: ""
      },
      selectWidth:true,
      isTradingCycle: true,

      cycleQuarter: false,
      cycleYear: true,
      cycleMonth: false,
      yearData: "",
      monthData: "",
      quarterData: {
        quarter: "",
        year: ""
      },
      //2019-11-3 #2454 张朋 交易周期下拉框宽度设定变量
      selectWidth:true,
      sels: "",
      form: {
        isdelete: undefined,
        tradingCenterCode: undefined,
        noticeDate: undefined,
        noticeName: undefined,
        tradingCycleCode: undefined,
        tradingTime: undefined,
        tradingVarietyCode: undefined,
        tradingWayCode: undefined,
        enclosure: undefined,
        description: undefined,
        createUser: undefined,
        createTime: undefined,
        modifyUser: undefined,
        modifyTime: undefined
      },

      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        tradingCycle: undefined,
        orgType: "product",
        // tradeBeginMonth: "",
        // tradeEndMonth: "",
        page: 1,
        limit: 10,
        noticeDate: undefined, //发布日期
        tradingTime: undefined, //交易期次
        tradingCenterId: undefined, //交易中心
        tradingVariety: undefined, //交易品种
        tradingWay: undefined, //交易方式
        // tradingTime: undefined, //交易周期
        regionOrgId: "",
        orgId: "",
        startDate: '',
        endDate: ''
      },
      electricityPriceStyle:false, //张朋 成交电价类型
      dialogFormVisible: false,
      dialogResultVisible: false,
      dialogStatus: "",
      isdisabale: false,
      isdisabaleBtn: true,
      btn: {
        jyTransactionNoticeManager_btn_edit: false,
        jyTransactionNoticeManager_btn_del: false,
        jyTransactionNoticeManager_btn_add: false,
        jyTransactionNoticeManager_btn_export: false,
        jyTransactionNoticeManager_btn_import: false,
        jyTransactionNoticeManager_btn_save: false,
        jyTransactionNoticeManager_btn_submit: false,
        // #2716 2019-11-19 张亮三 增加了未成交按钮资源 start
        jyTransactionNoticeManager_btn_no_deal:false,
        // #2716 2019-11-19 张亮三 增加了未成交按钮资源 start
        //#2873 2019-12-11 秦侯珍 增加修改资源按钮 start
        jyTransactionNoticeManager_btn_no_modify: false,
        //#2873 2019-12-11 秦侯珍 增加修改资源按钮 start
        jyTransactionNoticeManager_cf_import_btn: false, //主页导出
        jyTransactionNoticeManager_cf_view_btn: false, //导入解析
        jyTransactionNoticeManager_cf_download_btn: false, //模板下载
      },
      objcetData:{},
      textMap: {
        edit: "编辑",
        view: "查看",
        revise: "修改"
      },
      transactionData: [], //交易周期数据
      tableKey: 0,
      //transactionsVariety:"",
      varietyOptions: [],
      //transactionMode:"",
      wayOptions: [],
      centerOptions: [],
      periodOptions: [],
      quarterOptions: [],
      noticeDate: undefined,
      jyTradingResultsInfo: {},
      jyTradingResultsId: undefined,
      tradingUnitAll: [], //交易单位所有数据
      customerAll: [], //客户模糊所有数据
      orgAll: [], //发电公司所有数据
      tabHeight: 0,
      unitMap:{},
      getStatusOptionsArr:[],//状态下拉框
      resultId: ''
    };
  },
  activated(){
    this.getList();
  },
  created() {
     
    // 添加默认检索日期
    this.listQuery.startDate = this.getOldFormatDate()
    this.listQuery.endDate = this.getNowFormatDate()

    this.unitMap = getUnitMap(this.allSubMenus,this.unitMap);
    this.getList();
    this.init();


    this.btn.jyTransactionNoticeManager_btn_edit = this.elements[
      "jyTransactionNoticeManager:btn_edit"
    ];
    this.btn.jyTransactionNoticeManager_btn_del = this.elements[
      "jyTransactionNoticeManager:btn_del"
    ];
    this.btn.jyTransactionNoticeManager_btn_add = this.elements[
      "jyTransactionNoticeManager:btn_add"
    ];
    this.btn.jyTransactionNoticeManager_btn_export = this.elements[
      "jyTransactionNoticeManager:btn_export"
    ];
    this.btn.jyTransactionNoticeManager_btn_import = this.elements[
      "jyTransactionNoticeManager:btn_import"
    ];
    this.btn.jyTransactionNoticeManager_btn_save = this.elements[
      "jyTransactionNoticeManager:btn_save"
    ];
    this.btn.jyTransactionNoticeManager_btn_submit = this.elements[
      "jyTransactionNoticeManager:btn_submit"
    ];
    // #2716 2019-11-19 张亮三 增加未成交按钮资源
    this.btn.jyTransactionNoticeManager_btn_no_deal = this.elements[
      "jyTransactionNoticeManager:btn_no_deal"
    ];

    //#2873 2019-12-11 秦侯珍 增加修改资源按钮 start
    this.btn.jyTransactionNoticeManager_btn_no_modify = this.elements[
      "jyTransactionNoticeManager:btn_no_modify"
    ];
    //#2873 2019-12-11 秦侯珍 增加修改资源按钮 end
     this.btn.jyTransactionNoticeManager_cf_import_btn = this.elements[
      "jyTransactionNoticeManager:btn_cf_import"
    ];
     this.btn.jyTransactionNoticeManager_cf_view_btn = this.elements[
      "jyTransactionNoticeManage:btn_cf_view"
    ];
     this.btn.jyTransactionNoticeManager_cf_download_btn = this.elements[
      "jyTransactionNoticeManager:btn_cf_download"
    ];
  },
  computed: {
    ...mapGetters(["elements","allSubMenus","orgId","userOrgInfo"])
  },
  methods: {
    /**
      * @方法名称: getNowFormatDate
      * @功能描述: 获取当前日期
      * @参数:
      * @返回值:
      * @作者: wangq
      * @Date: 2020-04-26
      * @最新修改内容:
      * @LastEditTime:
      */
    getNowFormatDate () {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    /**
      * @方法名称: getOldFormatDate
      * @功能描述: 获取三个月前的日期
      * @参数:
      * @返回值:
      * @作者: wangq
      * @Date: 2020-04-26
      * @最新修改内容:
      * @LastEditTime:
      */
    getOldFormatDate () {
      var date = new Date();
      date.setMonth( date.getMonth()-3 );
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
     /**
      * @方法名称: selectTime
      * @功能描述: 获取组件交易周期信息
      * @参数:
      * @返回值:
      * @作者:
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
      * @作者:
      * @Date: 2019-11-03 16:26:28
      * @最新修改内容:
      * @LastEditTime:
      */
     tradeIssure(id){
       if(typeof id == "undefined"){
         //2019-11-4 #2454 张朋  参数调整
           this.listQuery.tradingTime = undefined;
       }else{
           this.listQuery.tradingTime = id;
       }
    },
    getList() {
      this.listLoading = true;
      getUserOrgInfo().then(res => {
        res.forEach(element => {
          if (element.attributeTypeCode == "zzjgsx03") {
            this.listQuery.regionOrgId = element.id;
          }
        });
        //2019-12-3 #2933  张朋 获取降幅参照对象,省份编码，发电类型，是否供热，
        this.objcetData = {
            isThermoelectricity : res[res.length - 1].isThermoelectricity,
            provinceCode : res[res.length - 1].provinceCode,
            powerTypeCode :res[res.length - 1].powerTypeCode,
            dropReferenceCode : res[res.length - 1].dropReferenceCode,
            //2020-1-13 #3471 zhangp 获取调度电网
            gridCode : res[res.length - 1].gridCode,
        }
        this.listQuery.orgId = res[res.length - 1].id;
        this.listQuery.orgType = "product";
        // 20191223 阿彪 添加过滤空字段
        let obj={};
        for(let k in this.listQuery){
          if(this.listQuery[k])obj[k]=this.listQuery[k];
        }
        
        getNewPageList(obj).then(response => {
          this.listLoading = false;
          this.resultIds = []
          // for(let i=0; i<response.length; i++){
          //   this.resultIds.push(response.data.rows[i].jyTradingResultsId)
          // }             
          let items = response.data.rows.map((item, index) => {
            this.resultIds.push(item.jyTradingResultsId) 
            item.index =
              index + 1 + (this.listQuery.page - 1) * this.listQuery.limit;
            return item;           
          });        
          this.list = items;
          this.list = response.data.rows;
          this.total = response.data.total;
        });
      });
    },
    init() {

     //#4188 gaoaining 2020-06-22 添加发电权转让交易结果北方模式的判断 start
     let bfmsObj={
          orgId: this.orgId,
          configurationId: 3,
          parameterCode: 1030018
        }
        getValueByOrgIdAndCode(bfmsObj).then(res => {
          if (res == "0") {
            this.isBfms = true;
          }else{
            this.isBfms = false;
          }
        });
       //#4188 gaoaining 2020-06-22 添加发电权转让交易结果北方模式的判断 end

      this.selctGroup();
      this.getTradingUnitData();
      this.getCustomerData();
      this.getOrgData();
      this.setLayoutHeight();
      this.getStatusOptions()
       //2020-1-14 #3471 zhangp 获取交易周期
      getSelectList("transaction_period").then(res => {
        this.transactionData = res;
      });
    },
    setLayoutHeight() {
      this.tabHeight = initLayout() - 230;
    },
    /**
     * @方法名称: getStatusOptions
     * @功能描述: 获取状态下拉框
     * @参数:
     * @返回值:
     * @样式作用范围:
     * @作者: 阿彪
     * @Date: 2019-12-23 14:26:11
     * @最新修改内容:
     * @LastEditTime:
     */
    getStatusOptions(){
      getStatusOptionsObj().then(res => {
        this.getStatusOptionsArr=res;
      });
    },
    getTradingUnitData() {
      //获取所有交易单元数据
      // getTradingUnitAll().then(res => {
      //   this.tradingUnitAll = res;
      // });
    },
    getCustomerData() {
      //获取所有客户数据
      getCustomerAll().then(res => {
        this.customerAll = res;
      });
    },
    getOrgData() {
      //获取所有发电公司数据
      getOrgAll().then(res => {
        this.orgAll = res;
      });
    },
    /**2019-11-3 #2454 交易周期筛选父组件备注 start*/
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
    //清空期次信息
    // changeTradingCycle() {
    //   this.tradeIssureData = {
    //     quarter: "",
    //     monthData: ""
    //     // yearData: "",
    //     // tradeBeginMonth: "",
    //     // tradeEndMonth: ""
    //   };
    //   this.setTradeIssure();
    // },
    //设置期次信息
    // setTradeIssure(val) {
    //   if (val != null && val != undefined) {
    //     if (this.listQuery.tradingCycle == "jyzq01") {
    //       this.listQuery.tradingTime = parseTime(
    //         this.tradeIssureData.yearData,
    //         "{y}"
    //       );
    //     } else if (this.listQuery.tradingCycle == "jyzq02") {
    //       this.listQuery.tradingTime =
    //         parseTime(this.tradeIssureData.yearData, "{y}") +
    //         "-" +
    //         this.tradeIssureData.quarter;
    //     } else if (
    //       this.listQuery.tradingCycle == "jyzq03" ||
    //       this.listQuery.tradingCycle == "jyzq04" ||
    //       this.listQuery.tradingCycle == "jyzq05"
    //     ) {
    //       this.listQuery.tradingTime = parseTime(
    //         this.tradeIssureData.monthData,
    //         "{y}-{m}"
    //       );
    //     }
    //   }  else {
    //     this.listQuery.tradingTime = undefined;
    //     // this.listQuery.tradeBeginMonth = undefined;
    //     // this.listQuery.tradeEndMonth = undefined;
    //   }
    // },
      /**2019-11-3 #2454 交易周期筛选父组件备注  end*/
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
      }
    },
    //查询
    handleFilter() {
      if (this.quarterData.year && !this.quarterData.quarter) {
        this.$notify({
          title: "提示",
          message: "请选择交易期次季度",
          type: "warning",
          duration: 2000
        });
      } else if (!this.quarterData.year && this.quarterData.quarter) {
        this.$notify({
          title: "提示",
          message: "请选择交易期次年",
          type: "warning",
          duration: 2000
        });
      } else if (
        new Date(this.listQuery.startDate).valueOf() >
        new Date(this.listQuery.endDate).valueOf()
      ) {//20191223 阿彪 #3235 添加时间查询
        this.$notify({
          title: "提示",
          message: "结束时间必须大于开始时间",
          type: "warning",
          duration: 2000
        });
      }else {
        this.listQuery.noticeDate = this.noticeDate;
        this.getList();
      }
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
    /**
     * @方法名称: handleNoDeal()
     * @功能描述: 未成交功能
     * @参数:
     * @返回值:
     * @作者: 张亮三
     * @Date: 2019-11-19 19:31:05
     * @最新修改内容:
     * @LastEditTime:
     */
    handleNoDeal(row,status){
      this.$confirm("该期次交易结果是否未成交?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
         let params = {};
          params = row;
          params.detailList = [];
          params.orgType = "product";
          params.status = status;
          if(row.detailList&& row.detailList.length>0){
            row.detailList.forEach(ele=>{
              ele.orgType='product';
              ele.status = status;
            })
            params.detailList = row.detailList;
          }else {
            let detailInfo = {
              orgType:'product',
              status:status,
              fdOrgId:this.listQuery.orgId,
              jyTradingResultsId:row.jyTradingResultsId
            }
            params.detailList = [];
            params.detailList.push(detailInfo);
          }

        update(params).then(res=>{
          if(res.rel){
            this.$notify({
              title: "成功",
              message: "未成交成功",
              type: "success",
              duration: 2000
            });
            this.getList();
          }else {
             this.$notify({
              title: "错误",
              message: res.msg,
              type: "success",
              duration: 2000
            });
          }
        })
      });
    },
    beforeClose() {
      this.$refs.busResult.resetTemp();
      this.dialogResultVisible = false;
      this.getList();
    },

    handleUpdate(row, stauts) {
      //#4369 gaoaining 2020-06-24 报价方式为价差，省内集中竞价报价方案价和交易结果电价是否可以维护正值 start
            if(row.tradingVariety == "jypz01" && row.tradingWay  == "jyfs02"){
              
              getValueByOrgIdAndCode2({
                configurationId: 3,
                parameterCode: "1030019"
              }).then( res => {
                if(res == '0'){
                  this.isWhzz = true
                }else{
                  this.isWhzz = false
                }
              })
          }else{
            this.isWhzz = false
          }
          //#4369 gaoaining 2020-06-24 报价方式为价差，省内集中竞价报价方案价和交易结果电价是否可以维护正值 end
      this.resultId = row.jyTradingResultsId
         /** 张朋 获取交易中心id查询报价信息 start*/
      if(row.tradingCenterId == null || row.tradingCenterId == "" || typeof row.tradingCenterId == "undefined"){
        this.electricityPriceStyle = true;
      }else{
       getObj(row.tradingCenterId).then(response => {
         row.quotationMethodName  = response.data.quotationMethodName; //获取报价方式赋值
          row.quotationMethod = response.data.quotationMethod;
          //当报价方式为价差时，bjfs01为价差的编码
          if(response.data.quotationMethod == "bjfs01"){
            this.electricityPriceStyle = false;
          }else{
            this.electricityPriceStyle = true;
          }
       });
      }
      //2019-12-7 #2933 张朋 根据编码获取发布时间
       pageList(row.jyTradingResultsId).then(res => {
        this.objcetData.releaseDate = res.data.noticeDate;
        /** 张朋 获取交易中心id查询报价信息 end*/
        this.dialogStatus = stauts;
        if (stauts == "view") {
          this.isdisabale = true;
          this.isdisabaleBtn = true;
        } else if (stauts == "revise"){
          this.isdisabale = false;
          this.isdisabaleBtn = true;
        } else {
          this.isdisabale = false;
          this.isdisabaleBtn = false;
        }
        //#2871 2019-11-27 秦侯珍 交易管理-交易结果-发电点击修改按钮，弹出提示框
        if(stauts == "revise") {
          this.$confirm("此条信息包含已上报系统的重要数据，请谨慎修改", "提示", {
            confirmButtonText: "确认修改",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.jyTradingResultsId = row.jyTradingResultsId;
            row.objcetData = this.objcetData  //存入信息
            this.jyTradingResultsInfo = row;
            this.dialogResultVisible = true;
            if (typeof this.$refs.busResult != "undefined") {
              this.$refs.busResult.getResultList(this.dialogStatus, row);
            }
            this.isdisabaleBtn = true;
            this.isdisabale = false;
          }).catch(()=>{
            this.$notify({
              title: "提示",
              message: "取消修改",
              type: "info",
              duration: 2000
            });
          });
        } else {
          this.jyTradingResultsId = row.jyTradingResultsId;
          row.objcetData = this.objcetData  //存入信息
          this.jyTradingResultsInfo = row;
          this.dialogResultVisible = true;
          if (typeof this.$refs.busResult != "undefined") {
            this.$refs.busResult.getResultList(this.dialogStatus, row);
          }
        }
      })
    },

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
    create(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          addObj(this.form).then(() => {
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
          });
        } else {
          return false;
        }
      });
    },
    cancel(formName) {
      this.dialogFormVisible = false;
      const set = this.$refs;
      set[formName].resetFields();
    },
    update(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false;
          this.form.password = undefined;
          putObj(this.form.id, this.form).then(() => {
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
          });
        } else {
          return false;
        }
      });
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
        regionOrgId: this.listQuery.regionOrgId,
        orgId: this.listQuery.orgId
      };

      exportObj(parme);
    },
    // #4002 chenf 2020/4/29 ---- start ----
    // 导入按钮
    handleUpload(){
      this.$refs.importDialog.dialogFormVisible = true
    },
    // 模板下载
    handledownloadTemplate(){
      downloadTemplate()
    },
    // 导入解析
    showImportResult(){
      let param = {}
      param.description = 'jyTransactionNotice'
      param.resultIds = this.resultIds.join(',')
      
       //this.$refs.showResultDialogs.init()
      getTradingStatuss(param).then(res => {
        if(res.rel){
          this.$refs.showResultDialogs.init()
        }else {
          this.$notify({
            title: "提示",
            message:res.msg,
            type: "warning",
            duration: 2000
          });
        }
      })
      
    },
    // #4002 chenf 2020/4/29 ---- end ----

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
      quarterSelectObj().then(res => {
        this.quarterOptions = res;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
//2019-11-8 #2454 张朋 查询按钮位置调整
.filter-container ::v-deep .filter-item {
    margin-bottom: -8px!important;
}
</style>

