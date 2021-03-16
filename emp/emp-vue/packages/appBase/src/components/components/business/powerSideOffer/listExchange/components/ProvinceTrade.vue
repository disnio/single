<!--
 * @功能描述: 
 * @版本: 
 * @作者: 康如涛
 * @Date: 2019-08-27 13:48:54
 * @最新修改内容: 
 * @LastEditTime : 2020-02-04 10:57:50
 -->
<template>
<!--省内交易 -->
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
      <el-table-column align="center"  label="发电公司">
        <template slot-scope="scope">
          <el-input v-model="scope.row.fdOrgName" disabled></el-input>
        </template>
      </el-table-column>
      <!-- <el-table-column  align="center" label="交易单元">
          <template slot-scope='scope'>
              <el-tooltip
            v-if="scope.row.unitStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.unitStatusMsg"
              :disabled="dialogInfo.notEdit"
            placement="top"
          >
          <el-input  :class="scope.row.unitStatus"  v-model="scope.row.unit"></el-input>
              </el-tooltip>
              <el-input v-else  v-model="scope.row.unit"   :disabled="dialogInfo.notEdit"></el-input>
          </template>
        </el-table-column> -->

     <!-- 2019-10-30   #2430  康如涛 修改查看时交易单元显示 start-->
            <el-table-column  v-if="dialogInfo.status == 'view'||dialogInfo.notEdit" align="center"  label="交易单元">
              <template slot-scope="scope">
                 <el-input 
                    :disabled="dialogInfo.notEdit"
                    v-model="scope.row.tradingUnitName"
                  ></el-input>
              </template>
            </el-table-column>
            <!-- 2019-10-30   #2430  康如涛 修改查看时交易单元显示  end--> 
            <el-table-column v-else align="center"  label="交易单元">
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
      <el-table-column  align="center"  label="交易用户">
          <template slot-scope='scope'>
              <el-tooltip
            v-if="scope.row.customerNameStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.customerNameStatusMsg"
              :disabled="dialogInfo.notEdit"
            placement="top"
          >
          <el-input  :class="scope.row.customerNameStatus"  v-model="scope.row.customerName"></el-input>
             <el-autocomplete
             :class="scope.row.customerNameStatus"
            v-model="scope.row.customerName"
            placeholder="请输入交易用户名称"
            :fetch-suggestions="querySearchCustomer"
            :trigger-on-focus="false"
            :disabled="dialogInfo.notEdit"
           @select="selectCustomerToSearch"
            :clearable="true"
          ></el-autocomplete>
              </el-tooltip>
              <el-autocomplete
              v-else
            v-model="scope.row.customerName"
            placeholder="请输入交易用户名称"
            :fetch-suggestions="querySearchCustomer"
            :trigger-on-focus="false"
            :disabled="dialogInfo.notEdit"
            @select="selectCustomerToSearch"
            :clearable="true"
          ></el-autocomplete>
          </template>
        </el-table-column>
      <!-- 2020-06-04 #4161  qinhz 发电侧报价方案-交易品种为省内直接交易,交易方式为挂牌交易-新增购电侧交易单元字段 start-->
      <el-table-column align="center" width="120px" v-if="announcementInfo.tradeVarietyCode == 'jypz01' && (announcementInfo.tradeWayCode == 'jyfs01' || announcementInfo.tradeWayCode == 'jyfs03') && isShow" label="购电侧交易单元">
        <template slot-scope="scope">              
          <el-select
            style="width:100%;"
            v-model="scope.row.powerPurchaseUnitCode"
            clearable
            @change="tradingUnit($event, scope.row)"
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
      <!-- 2020-06-04 #4161  qinhz 发电侧报价方案-交易品种为省内直接交易,交易方式为挂牌交易-新增购电侧交易单元字段 end-->
      <el-table-column align="center" width="160" label="意向挂牌电量">
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
      <el-table-column align="center" width="160" label="意向挂牌电价">
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

      <el-table-column align="center" width="120px" label="操作" v-if="!dialogInfo.notEdit" >
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
import { deleteInfoById , getDetailListBySchemeId } from "@common/api/business/powerSideOffer/centralizedBidding/index";
import {
   getCustomerListByName,
} from "@common/api/contract/htAgentProtocol/index";
import {
  getValueByOrgIdAndCode, //是否启用审批流
  getPowerTestTransactionUnit //获取购电侧交易单元
} from "@common/api/business/bilateralNegotiation/index";
import { mapGetters } from "vuex";
import { getOrgByName } from "@common/api/admin/orgStruManage/index";
import { getUnitMapByModelCode, getUnitMap } from "@common/utils/index";
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
    detailListData: {
      type: Array
    },
    schemeNameCode:{type:String},
    unitMaps:{
      type:Object
    }
  },
  data() {
    return {
      powerTestTransactionUnit: [], //购电侧交易单元
      isShow: false,
      isErr: false,
      listLoading: false,
      tableKey: 0,
      tableList: [],
      quotationSegmentOptionData: [],
      announcementInfoData: this.announcementInfo,
      form: {
        customerId:"",
        customerName: "客户名称",
        detailId:"",
        declarationElectricity: "申报电量/意向摘牌电量",
        declarationElectricityPrices: "申报电价/意向摘牌电价",
        fdOrgId: "发电公司",
        fdOrgName: "发电公司名称",
        tradingUnitId: "交易单元",
        tradingUnitName: "交易单元名称",
        quotationStall:"",
        quotationStallName:"",
        powerPurchaseUnitCode: "购电侧交易单元",
        powerPurchaseUnitName: "购电侧交易单元名称",
        unit: "机组",
        schemeDesc:"备注",
      },

      unitMap: {}
    };
  },
  watch: {
    announcementInfo(val) {
      this.announcementInfoData = val;
      // console.log(val);
    },
    
    detailListData(val){
        this.init();
    },
    unitMaps(newVal,oldVal){
      this.unitMap = newVal;
    }
  },
  created() {
    this.getValueByOrgIdAndCode();
    this.getPowerTestTransactionUnit();
    this.init();
    if (sessionStorage.getItem("modelCode") == "dashboard") {
      // this.unitMap = getUnitMapByModelCode(
      //   this.allSubMenus,
      //   this.unitMap,
      //   "listExchange"
      // );
      // #3010 2019-12-10 张亮三 修改首页单位不显示问题s
      this.unitMap = this.unitMaps;
    } else {
      this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
    }
  },
  computed: {
    ...mapGetters(["elements", "allSubMenus"])
  },
  methods: {
    tradingUnit(data,row) {},
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
    async getPowerTestTransactionUnit() {   
      let id = this.announcementInfoData.tradeCenterId      
      let res = await getPowerTestTransactionUnit(id);
      this.powerTestTransactionUnit = res.data
    },
    setCustomerInfo(custName,index){
       getCustomerListByName({ "custName": custName }).then(res => {
        if (typeof res.dataList != "undefined") {
          if (res.dataList.length > 0) {
            // console.log("0000",res.dataList)
            this.tableList[index].customerId=res.dataList[0].customerId;
            this.tableList[index].customerName=res.dataList[0].customerName;
          }
        }
      }); 
    },
    selectCustomerToSearch(){
      this.tableList.forEach((item,index)=>{
        if(item.customerName!=""){
          this.setCustomerInfo(item.customerName,index);
        }
      });
    },
    querySearchCustomer(queryString, cb) {
      var list = [{}];
      getCustomerListByName({ custName: queryString }).then(res => {
        // console.log(res.dataList)
        if (typeof res.dataList != "undefined") {
          if (res.dataList.length > 0) {
            res.dataList.forEach(item => {
              list.push({
                value: item.customerName,
                customerId: item.customerId
              });
            });
          }
        }
        cb(list);
      });
    },
    init() {
      if (this.dialogInfo.status == "edit" || this.dialogInfo.status == "change") {
           this.tableList=this.detailListData;
        if(this.tableList.length == 0){
           this.addRow();
           this.setQuotationSubsection();
        }else{
           this.setQuotationSubsection();
        }
      }else if(this.dialogInfo.status == "view"){
            this.tableList = this.detailListData;
        this.setQuotationSubsection();

      }
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
    //获取列表数据
    getListData() {
      this.tableList = [];
        let parame={};
        parame.schemeId=this.announcementInfoData.schemeId;
        getDetailListBySchemeId(parame).then(res=>{
          if(res.rel){
            if(typeof res.data.detailList[this.schemeNameCode]!="undefined"){
              let data=res.data.detailList[this.schemeNameCode];
              if(data.length>0){
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
            }else{
              this.addRow();
            }
          }else{

          }
      });
    },
    //设置报价分段下拉选项
    setQuotationSubsection() {
      this.quotationSegmentOptionData = [];
     
      let quotationSubsection = Number(
        this.announcementInfoData.quotationSubsection
      );
      for (let i = 0; i < quotationSubsection; i++) {
        this.quotationSegmentOptionData.push(this.quotationSegmentOption[i]);
      }
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
      let  dataArr=[];
      var patrn = /^(-)?\d+(\.\d+)?$/;
      for (let i = 0, l = this.tableList.length; i < l; i++) {
        let dataJson=this.tableList[i];
        dataJson.declarationElectricityStatus = "";
        dataJson.declarationElectricityPricesStatus = "";
        dataJson.quotationStallStatus = "";
        dataJson.tradingUnitIdStatus = "";
        if (
          patrn.exec( dataJson.declarationElectricity) == null ||
          dataJson.declarationElectricity == "" ||
          typeof dataJson.declarationElectricity == "undefined") {
          dataJson.declarationElectricityStatus = "ipt-err-true"; //交易电量
          dataJson.declarationElectricityStatusMsg =
            "申报电量必须为数字";
          this.isErr = true;
        }
        // else{
        //       if(dataJson.declarationElectricity<0){
        //          dataJson.declarationElectricityStatus = "ipt-err-true"; //交易电价
        //   dataJson.declarationElectricityStatusMsg =
        //     "申报电量不能为负值";
        //   this.isErr = true;
        //       }
        // }
        if (data=="1") {
          if (
            patrn.exec( dataJson.declarationElectricityPrices) == null ||
            dataJson.declarationElectricityPrices == "" ||
            typeof dataJson.declarationElectricityPrices == "undefined") {
            dataJson.declarationElectricityPricesStatus = "ipt-err-true"; //交易电价
            dataJson.declarationElectricityPricesStatusMsg =
              "申报电价必须为数字";
            this.isErr = true;
          }else{
              if(this.announcementInfo.quotationMethod=="bjfs01"){
                if(dataJson.declarationElectricityPrices>=0){
                  dataJson.declarationElectricityPricesStatus = "ipt-err-true"; //交易电价
            dataJson.declarationElectricityPricesStatusMsg =
              "申报电价应为负值";
            this.isErr = true;
                }
              }
          }
        }
        if (dataJson.tradingUnitId == "" ||typeof dataJson.tradingUnitId == "undefined") {
          dataJson.tradingUnitIdStatus = "ipt-err-true"; //交易单元
          dataJson.tradingUnitIdStatusMsg = "请选择交易单元"; //交易单元
          this.isErr = true;
        }
        //2019-11-05 #2568 秦侯珍 交易管理 - 发电侧报价方案-“交易用户”字段设置为非必填项
        if (dataJson.customerName == "" ||typeof dataJson.customerName == "undefined") {
          // dataJson.customerNameStatus = "ipt-err-true"; 
          dataJson.customerNameStatusMsg = "请输入交易用户信息"; 
          // this.isErr = true;
        }
        dataArr.push(dataJson)
      }
      this.tableList=dataArr;
    },

    //初始化表格数据
    initTableData() {
      this.tableList = [];
      this.addRow();
      this.setQuotationSubsection();
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
          newData.index=index;
      for(let key in this.form){
        if(key.indexOf('Name')<0){
          newData[key]="";
          newData[key+"Status"]="";
          newData[key+"StatusMsg"]="";
        }else{
           newData[key]="";
        }
      }
          newData.transactionLine = this.announcementInfoData.tieLineId;
      newData.transactionLineName = this.announcementInfoData.tieLineName;
        newData.fdOrgId=this.orgInfo.id;
        newData.fdOrgName=this.orgInfo.orgName;
   
      this.tableList.push(newData);
    },
    //移除行信息
    delRowData(row) {
      let items=[];
      for(let i=0,l= this.tableList.length;i<l;i++){
        if(row.index!=this.tableList[i].index){
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
                this.getListData();
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
</style>
