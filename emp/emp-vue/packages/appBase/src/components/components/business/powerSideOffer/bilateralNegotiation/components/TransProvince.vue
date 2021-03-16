<!--
 * @功能描述: 跨省交易
 * @版本: 
 * @作者: 康如涛
 * @Date: 2019-08-27 13:48:54
 * @最新修改内容:  #2353 解决交易单元显示问题
 * @LastEditTime : 2020-01-16 18:51:47
 -->
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
    >
      <!-- <el-table-column align="center" type="selection"></el-table-column> -->
      <el-table-column prop="index" label="序号" align="center" width="60px"></el-table-column>
      <el-table-column align="center"   label="发电公司">
        <template slot-scope="scope">
          <el-input v-model="scope.row.fdOrgName" disabled></el-input>
        </template>
      </el-table-column>
        <!-- 2019-10-29   #2353  康如涛 修改查看时交易单元显示 start-->
            <el-table-column  v-if="dialogInfo.status == 'view'||dialogInfo.notEdit" align="center"  label="交易单元">
              <template slot-scope="scope">
                 <el-input 
                    :disabled="dialogInfo.notEdit"
                    v-model="scope.row.tradingUnitName"
                  ></el-input>
              </template>
            </el-table-column>
            <!-- 2019-10-29   #2353  康如涛 修改查看时交易单元显示 end-->
      <el-table-column v-else align="center"   label="交易单元">
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
              @change="changeTradingName(scope.row)"
            >
              <el-option
                v-for="(item,index) in tradingUnitOption"
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
            @change="changeTradingName(scope.row)"
          >
            <el-option
              v-for="(item,index) in tradingUnitOption"
              :key="index"
              :label="item.tradingUnitName"
              :value="item.tradingUnitId"
            ></el-option>
          </el-select>
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
              ></el-option>
            </el-select>
          </el-tooltip>
          <el-select
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
            ></el-option>
          </el-select> -->
               <el-input
              disabled
              v-model="scope.row.transactionLineName"
            ></el-input>
        </template>
      </el-table-column>
       <!-- 2019-10-29   #2353  康如涛 修改查看时客户名称显示 start-->
      <el-table-column v-if="dialogInfo.status == 'view' && announcementInfo.tradeWayCode!='jyfs04'"  align="center"  label="客户名称">
        <template slot-scope="scope"> 
          <el-input 
              :disabled="dialogInfo.notEdit"
              v-model="scope.row.customerName"
            ></el-input>
        </template>
      </el-table-column>
            <!-- 2019-10-29   #2353  康如涛 修改查看时客户名称显示 end-->
       <el-table-column v-if="dialogInfo.status != 'view' && announcementInfo.tradeWayCode!='jyfs04'" align="center"  label="客户名称">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.customerIdStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.customerIdStatusMsg"
            placement="top"
          >
            <el-select
              style="width:100%;"
              filterable 
              clearable
              :class="scope.row.customerIdStatus"
              v-model="scope.row.customerId"
              :disabled="dialogInfo.notEdit"
              @change="changeCustomerName(scope.row)"
            >
              <el-option
                v-for="(item,index) in customerNameOptionData"
                :key="index"
                :label="item.customerName"
                :value="item.customerId"
              ></el-option>
            </el-select>
          </el-tooltip>
          <el-select
            v-else
            style="width:100%;"
            filterable 
            clearable
            :class="scope.row.mobilePhoneStatus"
            v-model="scope.row.customerId"
            :disabled="dialogInfo.notEdit"
            @change="changeCustomerName(scope.row)"
          >
            <el-option
              v-for="(item,index) in customerNameOptionData"
              :key="index"
              :label="item.customerName"
              :value="item.customerId"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
 <!-- #4195 gaoaining 2020-06-05 添加报价阶段 start -->
      <el-table-column v-if="dialogInfo.notEdit && announcementInfo.tradeWayCode=='jyfs04'" align="center" label="报价阶段">
        <template slot-scope="scope">
          <!-- <el-input :disabled="dialogInfo.notEdit" v-model="scope.row.quotationPeriodName"></el-input> -->
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
       <!-- #4195 gaoaining 2020-06-05 添加报价阶段验证 end -->
      <el-table-column align="center" width="90" label="申报电量">
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
      <el-table-column align="center" width="90" label="申报电价">
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

      <el-table-column align="center"  width="90" label="操作" v-if="!dialogInfo.notEdit">
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
import { getcustomerId } from "@common/api/business/bilateralNegotiation/index";
import {
  deleteInfoById,
  getDetailListBySchemeId
} from "@common/api/business/powerSideOffer/centralizedBidding/index";
import { mapGetters } from "vuex";
import { getOrgByName } from "@common/api/admin/orgStruManage/index";
import {getUnitMapByModelCode,getUnitMap} from "@common/utils/index"
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
       quotationPeriodOption:[
        {quotationPeriodName:'第一阶段',quotationPeriodCode:'jd01'},
        {quotationPeriodName:'第二阶段',quotationPeriodCode:'jd02'}
        ],//#4195 gaoaining 2020-06-09
      isErr: false,
      listLoading: false,
      tableKey: 0,
      tableList: [],
      customerNameOptionData: [],
      announcementInfoData: this.announcementInfo,
      form: {
        detailId: "",
        declarationElectricity: "申报电量/意向摘牌电量",
        declarationElectricityPrices: "申报电价/意向摘牌电价",
        fdOrgId: "发电公司",
        fdOrgName: "发电公司名称",
        tradingUnitId: "交易单元",
        tradingUnitName: "交易单元名称",
        customerId: "",
        customerName: "", // 2019-11-08   #2613  康如涛 增加客户名称显示 
        transactionLine: "",
        transactionLineName: "",
        schemeDesc:"备注",
        quotationPeriod:"报价阶段",
        quotationPeriodName:'报价阶段名称',
      },

      unitMap:{}
    };
  },
  watch: {
    announcementInfo(val) {
      this.announcementInfoData = val;
      // console.log(val);
    },

    detailListData(val) {
      this.init();
    },
    unitMaps(newVal,oldVal){
      this.unitMap = newVal;
    }
  },
  created() {
    this.init();
    if (sessionStorage.getItem("modelCode") == "dashboard") {
      // this.unitMap = getUnitMapByModelCode(
      //   this.allSubMenus,
      //   this.unitMap,
      //   "bilateralNegotiation"
      // );
      // #3010 2019-12-10 张亮三 修改首页单位不显示问题
      this.unitMap = this.unitMaps;
    } else {
      this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
    }
  },
  computed: {
    ...mapGetters(["elements","allSubMenus"])
  },
  methods: {
    init() {
     if (this.dialogInfo.status == "edit" ||this.dialogInfo.status ==  "change") {
        this.tableList = this.detailListData;
        if(this.tableList.length == 0){
            this.addRow();
            this.setCustomerName();
        }else{
            this.setCustomerName();
      }
      }else if(this.dialogInfo.status == "view"){
            this.tableList = this.detailListData;
             this.setCustomerName();
      }
    },
    //设置客户名称下拉选项
    setCustomerName() {
      this.customerNameOptionData = [];
      let kh = {
        Name: this.customerName
      };
      getcustomerId().then(res => {
        // console.log(res);
        this.customerNameOptionData = res;
      });
    },
    //获取列表数据
    getListData() {
      this.tableList = [];
      let parame = {};
      parame.schemeId = this.announcementInfoData.schemeId;
      getDetailListBySchemeId(parame).then(res => {
        if (res.rel) {
          if (typeof res.data.detailList[this.schemeNameCode] != "undefined") {
            let data = res.data.detailList[this.schemeNameCode];
            if (data.length > 0) {
              data.forEach(item => {
                for (let key in this.form) {
                  item[key] = item[key];
                  if (key.indexOf("Name") < 0) {
                    item[key + "Status"] = "";
                    item[key + "StatusMsg"] = "";
                  }
                }
                this.tableList.push(item);
              });
            }
          } else {
            this.addRow();
          }
        } else {
        }
      });
    },
    //检测交易单元与分段报价唯一性
    checkTradingUnit(data) {
      let isErr = false;
      this.tableList.forEach(item => {
        if (data.index > item.index) {
          if (
            data.tradingUnitId == item.tradingUnitId &&
            data.customerId == item.customerId
          ) {
            //  item.tradingUnitIdStatus="ipt-err-true";

            isErr = true;
          }
        }
      });
      return isErr;
    },
     /**
     * @方法名称: changeTradingName
     * @功能描述: 改变交易单元的值，获取tradingUnitName
     * @参数: 
     * @返回值: 
     * @样式作用范围: 
     * @作者: 滕超
     * @Date: 2019-11-08 09:58:08
     * @最新修改内容: 
     * @LastEditTime: 
     */
    changeTradingName(row) {
      this.tradingUnitOption.forEach(element => {
        if (element.tradingUnitId == row.tradingUnitId) {
          this.$set(
            this.tableList[row.index - 1],
            "tradingUnitName",
            element.tradingUnitName
          );
        }
      });
    },
     /**
     * @方法名称: changeCustomerName
     * @功能描述: 改变客户的值，获取tradingUnitName
     * @参数: 
     * @返回值: 
     * @样式作用范围: 
     * @作者: 滕超
     * @Date: 2019-11-14 15:30:50
     * @最新修改内容: 
     * @LastEditTime: 
     */
    changeCustomerName(row) {
      this.customerNameOptionData.forEach(element => {
        if (element.customerId == row.customerId) {
          this.$set(
            this.tableList[row.index - 1],
            "customerName",
            element.customerName
          );
        }
      });
    },
    //检测表格数据
    checkTab(data) {
      this.isErr = false;
      var patrn = /^(-)?\d+(\.\d+)?$/;
      for (let i = 0, l = this.tableList.length; i < l; i++) {
        this.tableList[i].declarationElectricityStatus = "";
        this.tableList[i].declarationElectricityPricesStatus = "";
        this.tableList[i].customerIdStatus = "";
        this.tableList[i].tradingUnitIdStatus = "";
        this.tableList[i].quotationPeriodStatus = "";
        if (
          patrn.exec(this.tableList[i].declarationElectricity) == null ||
          this.tableList[i].declarationElectricity == "" ||
          typeof this.tableList[i].declarationElectricity == "undefined"
        ) {
          this.tableList[i].declarationElectricityStatus = "ipt-err-true"; //交易电量
          this.tableList[i].declarationElectricityStatusMsg =
            "申报电量必须为数字";
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
          patrn.exec(this.tableList[i].declarationElectricityPrices) == null ||
          this.tableList[i].declarationElectricityPrices == "" ||
          typeof this.tableList[i].declarationElectricityPrices == "undefined"
        ) {
          this.tableList[i].declarationElectricityPricesStatus = "ipt-err-true"; //交易电价
          this.tableList[i].declarationElectricityPricesStatusMsg =
            "申报电价必须为数字";
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
          this.tableList[i].tradingUnitId == "" ||
          typeof this.tableList[i].tradingUnitId == "undefined"
        ) {
          this.tableList[i].tradingUnitIdStatus = "ipt-err-true"; //交易单元
          this.tableList[i].tradingUnitIdStatusMsg = "请选择交易单元"; //交易单元
          this.isErr = true;
        }
        //#2719 郑文杰 客户名称设为非必填项
        // if (
        //   this.tableList[i].customerId == "" ||
        //   typeof this.tableList[i].customerId == "undefined"
        // ) {
        //   this.tableList[i].customerIdStatus = "ipt-err-true"; //客户名称
        //   this.tableList[i].customerIdStatusMsg = "请选择客户名称"; //报价段
        //   this.isErr = true;
        // }
        if (
          this.tableList[i].transactionLine == "" ||
          typeof this.tableList[i].transactionLine == "undefined"
        ) {
          this.tableList[i].transactionLineStatus = "ipt-err-true"; //报价段
          this.tableList[i].transactionLineStatusMsg = "线路信息为空"; //报价段
          this.isErr = true;
        }
        // if (this.checkTradingUnit(this.tableList[i])) {
        //   this.isErr = true;
        //   this.tableList[i].customerIdStatus = "ipt-err-true"; //报价段
        //   this.tableList[i].customerIdStatusMsg = "报价段信息重复";
        // }
         //#4195 gaoaining 2020-06-05 添加报价阶段验证 start
        if (
          (this.tableList[i].quotationPeriod == "" ||
            typeof this.tableList[i].quotationPeriod == "undefined") &&
          this.announcementInfo.tradeWayCode == "jyfs04"
        ) {
          this.tableList[i].quotationPeriodStatus = "ipt-err-true"; //报价阶段
          this.tableList[i].quotationPeriodStatusMsg = "请选择报价阶段"; //报价阶段
          this.isErr = true;

        } 
        //#4195 gaoaining 2020-06-05 添加报价阶段验证 end
      }
    },

    //初始化表格数据
    initTableData() {
      this.tableList = [];
      this.addRow();
      this.setCustomerName();
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
       newData.transactionLine = this.announcementInfo.tieLineId;
        newData.transactionLineName = this.announcementInfo.tieLineName;
      
      newData.fdOrgId = this.orgInfo.id;
      newData.fdOrgName = this.orgInfo.orgName;

      this.tableList.push(newData);
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
                // this.getListData();
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
    //#4195 gaoaining 2020-06-09 添加点击报价阶段方法
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





