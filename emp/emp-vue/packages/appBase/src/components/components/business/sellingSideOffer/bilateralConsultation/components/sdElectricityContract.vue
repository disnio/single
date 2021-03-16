<!--
 * @功能描述: 交易品种为售电合同转让交易时的弹框
 * @版本: 
 * @作者: 郑文杰
 * @Date: 2019-11-19 14:44:31
 * @最新修改内容: 
 * @LastEditTime : 2019-12-26 14:20:37
 -->
<template>
  <!--售电合同转让交易-->
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
      <el-table-column prop="index" label="序号" align="center" width="60px"></el-table-column>
      <!-- <el-table-column align="center" width="150" label="交易分类">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.tradingClassificationCodeStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.tradingClassificationCodeStatusMsg"
            placement="top"
          >
            <el-select
              style="width:100%;"
              :disabled="dialogInfo.notEdit"
              :class="scope.row.tradingClassificationCodeStatus"
              v-model="scope.row.tradingClassificationCode"
              @change="changeTradingClass"
            >
              <el-option
                v-for="(item,index) in transactionClassifyOption"
                :key="index"
                :label="item.propName"
                :value="item.propCode"
              ></el-option>
            </el-select>
          </el-tooltip>
          <el-select
            v-else
            style="width:100%;"
            :disabled="dialogInfo.notEdit"
            v-model="scope.row.tradingClassificationCode"
            @change="changeTradingClass"
          >
            <el-option
              v-for="(item,index) in transactionClassifyOption"
              :key="index"
              :label="item.propName"
              :value="item.propCode"
            ></el-option>
          </el-select>
        </template>
      </el-table-column> -->

      <el-table-column align="center" width="120" label="类型">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.tradingTypeCodeStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.tradingTypeCodeStatusMsg"
            placement="top"
          >
            <el-select
              style="width:100%;"
              :class="scope.row.tradingTypeCodeStatus"
              v-model="scope.row.tradingTypeCode"
            >
              <el-option
                v-for="(item,index) in assignmentTypeOption"
                :key="index"
                :disabled="dialogInfo.notEdit"
                :label="item.propName"
                :value="item.propCode"
              ></el-option>
            </el-select>
          </el-tooltip>
          <el-select
            v-else
            style="width:100%;"
            :disabled="dialogInfo.notEdit"
            v-model="scope.row.tradingTypeCode"
          >
            <el-option
              v-for="(item,index) in assignmentTypeOption"
              :key="index"
              :label="item.propName"
              :value="item.propCode"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px" label="售电公司">
        <template slot-scope="scope">
          <el-input v-model="scope.row.sdOrgName" disabled></el-input>
        </template>
      </el-table-column>
<!-- 
      <el-table-column align="center" width="120" label="出/受让售电企业">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.sellTransfereeOrgIdStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.sellTransfereeOrgIdStatusMsg"
            placement="top"
          >
            <el-select
              style="width:100%;"
              :class="scope.row.sellTransfereeOrgIdStatus"
              v-model="scope.row.sellTransfereeOrgId"
              :disabled="dialogInfo.notEdit"
              clearable
            >
              <el-option
                v-for="(item,index) in lineOptionData"
                :key="index"
                :label="item.orgName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-tooltip>
          <el-select
            v-else
            style="width:100%;"
            :class="scope.row.mobilePhoneStatus"
            v-model="scope.row.sellTransfereeOrgId"
            :disabled="dialogInfo.notEdit"
            clearable
          >
            <el-option
              v-for="(item,index) in lineOptionData"
              :key="index"
              :label="item.orgName"
              :value="item.id"
            ></el-option>
          </el-select>
        </template>
      </el-table-column> -->
      <!-- 出/受让售电企业做成可模糊查询的下拉框  #3047  秦侯珍   2019-12-06  start -->
      <el-table-column align="center" width="120" label="出/受让售电企业">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.sellTransfereeOrgIdStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.sellTransfereeOrgIdStatusMsg"
            placement="top"
          >
            <div :class="scope.row.sellOrAssigneeSdOrgNameStatus">
              <el-select
                style="width:100%;"
                v-model="scope.row.sellTransfereeOrgName"
                :disabled="dialogInfo.notEdit"
                :class="scope.row.sellTransfereeOrgIdStatus"
                @change="getSellOrAssigneeFdOrgId($event, scope.row)"
                :remote-method="getAllDataList"
                filterable
                remote
              >
                <el-option
                  v-for="(item, index) in lineOptionData2"
                  :key="index"
                  :label="item.customerName"
                  :value="item.customerId"
                ></el-option>
              </el-select>
            </div>
          </el-tooltip>
          <el-select
            v-else
            style="width:100%;"
            v-model="scope.row.sellTransfereeOrgName"
            :disabled="dialogInfo.notEdit"
            :class="scope.row.sellTransfereeOrgIdStatus"
            @change="getSellOrAssigneeFdOrgId($event, scope.row)"
            :remote-method="getAllDataList"
            filterable
            remote
          >
          <el-option
            v-for="(item, index) in lineOptionData2"
            :key="index"
            :label="item.customerName"
            :value="item.customerId"
          ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <!-- 出/受让售电企业做成可模糊查询的下拉框  #3047  秦侯珍   2019-12-06  end -->
      <!-- :class="scope.row.declarationElectricityPricesStatus" -->
      <el-table-column width="120px" align="center" label="原合同编号">
        <template slot-scope="scope">
          <el-input
            
            :disabled="dialogInfo.notEdit"
            v-model="scope.row.contractCode"
          ></el-input>
        </template>
      </el-table-column>
            <!-- :class="scope.row.declarationElectricityPricesStatus" -->

      <el-table-column align="center" width="120px" label="原合同名称">
        <template slot-scope="scope">
          <el-input
            :disabled="dialogInfo.notEdit"
            v-model="scope.row.contractName"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" width="90" label="电量">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.declarationElectricityStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :enterable="false"
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
      <el-table-column align="center" width="90" label="电价">
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

      <el-table-column
        fixed="right"
        align="center"
        width="90"
        label="操作"
        v-if="!dialogInfo.notEdit"
      >
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
  getAllDataList
} from "@common/api/business/jyTransactionNotice/index";
import {
  getOrgListByClassification,
  getCurrentUserOrg
} from "@common/api/business/bilateralNegotiation/index";
import { deleteInfoById } from "@common/api/business/powerSideOffer/centralizedBidding/index";
import { mapGetters } from "vuex";
import { getOrgByName } from "@common/api/admin/orgStruManage/index";
import { getSelectList } from "@common/api/base";
import { getUnitMapByModelCode, getUnitMap } from "@common/utils/index";
export default {
  name: "sdelectricityContract",
  props: {
    dialogInfo: { type: Object },
    orgInfo: { type: Object },
    btns: { type: Object },
    programme: { type: String },
    announcementInfo: { type: Object },
    quotationSegmentOption: {
      //报价分段
      type: Array
    },
    tradingProductsOption: {
      //交易产品
      type: Array
    },
    assignmentTypeOption: {
      //交易类型
      type: Array
    },
    transactionClassifyOption: {
      //交易分类
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
      tradingType:"",//#3279 2019-12-25 张亮三 增加字段用于当类型改变时保存类型值
      lineOptionData: [], //出/受让售电企业
      lineOptionData2: [], //出/受让售电企业
      isErr: false,
      listLoading: false,
      tableKey: 0,
      tableList: [],
      quotationSegmentOptionData: [],
      announcementInfoData: this.announcementInfo,
      form: {
        detailId: "", //主键
        // tradingClassificationCode: "", //交易分类
        // tradingClassificationName: "", //交易分类名称
        tradingTypeCode: "", //交易类型
        tradingTypeName: "", //交易类型名称
        sdOrgId: "", //售电公司
        sdOrgName: "", //售电公司名称
        sellTransfereeOrgId: "", //出/受让售电企业
        contractName: "", //原合同名称
        contractCode: "", //原合同编号
        declarationElectricity: "", //电量
        declarationElectricityPrices: "", //电价
        schemeDesc: "" //备注
      },
      unitMap: {}
    };
  },
  watch: {
    announcementInfo(val) {
      this.announcementInfoData = val;
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
    // 编辑查看时 调用changeTradingClass 
    // this.changeTradingClass(this.detailListData.tradingClassificationCode);
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
    ...mapGetters(["elements", "allSubMenus", "orgId"])
  },
  methods: {
    //初始化数据
    init() {
      if (this.dialogInfo.status == "edit") {
        this.tableList = this.detailListData;
        if (this.tableList.length == 0) {
          this.addRow();
        }
      } else if (this.dialogInfo.status == "view") {
        this.tableList = this.detailListData;
      } else if (this.dialogInfo.status == "add") {
        this.addRow();
      }
    },
    //获取交易分类
    // changeTradingClass(val) {
    //   getCurrentUserOrg().then(res => {
    //     this.province = res.provinceCode;
    //   });
    //   let qq = {
    //     tradingClassificationCode: val,
    //     province: this.province,
    //     attributeTypeCode: "zzjgsx01"
    //   };
    //   getOrgListByClassification(qq).then(res => {
    //     this.lineOptionData = res.data;
    //   });
    // },
    //获取列表数据
    getListData(data) {
      this.tableList = [];
      data.forEach(item => {
        item.sellTransfereeOrgIdStatus = ""; 
        item.sellTransfereeOrgIdStatusMsg = "";
        item.declarationElectricityPricesStatus = ""; //申报电价
        item.declarationElectricityStatus = ""; //申报电量
        item.declarationElectricityStatusMsg = "";
        item.declarationElectricityPricesStatusMsg = "";
        // item.tradingUnitIdStatusMsg = "";
        // item.quotationStallStatusMsg = "";
        this.tableList.push(item);
      });
    },
    //出/受让售电企业做成可模糊查询的下拉框  #3047  秦侯珍   2019-12-06  start
    getAllDataList(query) {
      //按名称模糊查询
      this.lineOptionData2 = [];
      let cantantName = {
        orgId:this.orgId,
        customerName:query
      }
      getAllDataList(cantantName).then(res => {
        this.lineOptionData2 = res.data;
      });
    },
    //出/受让售电企业做成可模糊查询的下拉框  #3047  秦侯珍   2019-12-06  end

    getSellOrAssigneeFdOrgId(data, row) {
      this.tableList[row.index - 1].sellTransfereeOrgId = data;
    },

    //检测表格数据
    checkTab(data) {
      this.isErr = false;
      var patrn = /^(-)?\d+(\.\d+)?$/;
      for (let i = 0, l = this.tableList.length; i < l; i++) {
        this.tableList[i].declarationElectricityStatus = "";
        this.tableList[i].declarationElectricityPricesStatus = "";
        this.tableList[i].sellTransfereeOrgIdStatus = "";
        this.tableList[i].tradingTypeCodeStatus = "";
        // this.tableList[i].quotationStallStatus = "";
        // this.tableList[i].tradingUnitIdStatus = "";
        if (
          patrn.exec(this.tableList[i].declarationElectricity) == null ||
          this.tableList[i].declarationElectricity == "" ||
          typeof this.tableList[i].declarationElectricity == "undefined"
        ) {
          this.tableList[i].declarationElectricityStatus = "ipt-err-true"; //交易电量
          this.tableList[i].declarationElectricityStatusMsg =
            "申报电量必须为数字";
          this.isErr = true;
        } else {
          // #3279 2019-12-25 张亮三 增加类型判断，当类型为 '(出让/csrlx_01)' 时申报电量不能为正值，当类型为 （受让/csrlx_02）时申报电量不能为负值 start
         if (this.tableList[i].tradingTypeCode == 'csrlx_01' && this.tableList[i].declarationElectricity > 0) {
            this.tableList[i].declarationElectricityStatus = "ipt-err-true"; //申报电量
            this.tableList[i].declarationElectricityStatusMsg =
              "申报电量不能为正值";
            this.isErr = true;
          }else if(this.tableList[i].tradingTypeCode == 'csrlx_02' && this.tableList[i].declarationElectricity < 0){
            this.tableList[i].declarationElectricityStatus = "ipt-err-true"; //申报电量
            this.tableList[i].declarationElectricityStatusMsg =
              "申报电量不能为负值";
            this.isErr = true;
          }else if(this.tableList[i].tradingTypeCode == null && this.tableList[i].declarationElectricity < 0){
              this.tableList[i].declarationElectricityStatus = "ipt-err-true"; //申报电量
              this.tableList[i].declarationElectricityStatusMsg =
                "申报电量不能为负值";
              this.isErr = true;
          }
          // #3279 2019-12-25 张亮三 增加类型判断，当类型为 '(出让/csrlx_01)' 时申报电量不能为正值，当类型为 （受让/csrlx_02）时申报电量不能为负值 end
        }
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
          this.tableList[i].tradingTypeCode == "" ||
          typeof this.tableList[i].tradingTypeCode == "undefined"
        ) {
          this.tableList[i].tradingTypeCodeStatus = "ipt-err-true";
          this.tableList[i].tradingTypeCodeStatusMsg = "请选择类型";
          this.isErr = true;
        }
        if(this.tableList[i].sellTransfereeOrgId == '' || typeof this.tableList[i].sellTransfereeOrgId == "undefined") {
          this.tableList[i].sellTransfereeOrgIdStatus = "ipt-err-true";
          this.tableList[i].sellTransfereeOrgIdStatusMsg = "请选择";
          this.isErr = true;
        }
      }
    },

    //初始化表格数据
    initTableData() {
      this.tableList = [];
      this.addRow();
    },
    //模糊查询售电公司
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
      newData.sdOrgId = this.orgInfo.id;
      newData.sdOrgName = this.orgInfo.orgName;

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





