<!--
 * @功能描述: 
 * @版本: 
 * @作者: 
 * @Date: 2019-10-18 09:39:16
 * @最新修改内容: 
 * @LastEditTime : 2020-01-16 20:40:49
 -->
<template>
<!--发电权交易-->
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
       <el-table-column align="center" width="160" label="交易分类">
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
            >
              <el-option
                v-for="(item,index) in transactionClassifyOption"
                :key="index"
                :label="item.propName"
                :value="item.propCode"
              >
              </el-option>
            </el-select>
            </el-tooltip>
            <el-select
            v-else
              style="width:100%;"
                :disabled="dialogInfo.notEdit"
              v-model="scope.row.tradingClassificationCode"     
            >
              <el-option
                v-for="(item,index) in transactionClassifyOption"
                :key="index"
                :label="item.propName"
                :value="item.propCode"
              >
              </el-option>
            </el-select>
        </template>
      </el-table-column>
           <el-table-column  align="center" label="类型">
          <template slot-scope='scope'>
              <el-tooltip
            v-if="scope.row.tradingTypeCodeStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.tradingTypeName"
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
              >
              </el-option>
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
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column> 
      <el-table-column align="center"   label="发电公司">
        <template slot-scope="scope">
          <el-input v-model="scope.row.fdOrgName" disabled></el-input>
        </template>
      </el-table-column>
      <!-- 2019-11-1   #2435  王岑 合同电量转让交易，机组做成下拉框形式 start-->
      <el-table-column  align="center" label="机组">
          <template slot-scope='scope'>
            <el-tooltip
            v-if="scope.row.unitStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.unitStatusMsg"
              :disabled="dialogInfo.notEdit"
            placement="top"
          >
            <!-- <el-input  :class="scope.row.unitStatus"  v-model="scope.row.unit"></el-input> -->
            <el-select
              style="width:100%;"
              :class="scope.row.unitStatusStatus"
              v-model="scope.row.unit"
              :disabled="dialogInfo.notEdit"
            >
              <el-option
                v-for="(item,index) in unitList"
                :key="index"
                :label="item.tradingUnitName"
                :value="item.tradingUnitName"
              ></el-option>
            </el-select>
            <!-- 2019-11-1   #2435  王岑 合同电量转让交易，机组做成下拉框形式 end-->
              </el-tooltip>
               <!-- <el-input v-else  v-model="scope.row.unit"   :disabled="dialogInfo.notEdit"></el-input> -->
               <el-select
               v-else
              style="width:100%;"
              :class="scope.row.unitStatusStatus"
              v-model="scope.row.unit"
              :disabled="dialogInfo.notEdit"
            >
              <el-option
                v-for="(item,index) in unitList"
                :key="index"
                :label="item.tradingUnitName"
                :value="item.tradingUnitName"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="产品">
          <template slot-scope='scope'>
            <el-tooltip
            v-if="scope.row.tradingProductStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.tradingProductStatusMsg"
            placement="top"
          >
            <el-select
              style="width:100%;"
               :class="scope.row.tradingProductStatus"
                 :disabled="dialogInfo.notEdit"
              v-model="scope.row.tradingProduct"     
            >
              <el-option
                v-for="(item,index) in tradingProductsOption"
                :key="index"
                :label="item.propName"
                :value="item.propCode"
              >
              </el-option>
            </el-select>
            </el-tooltip>
                <el-select
                v-else
              style="width:100%;"
                :disabled="dialogInfo.notEdit"
              v-model="scope.row.tradingProduct"     
            >
              <el-option
                v-for="(item,index) in tradingProductsOption"
                :key="index"
                :label="item.propName"
                :value="item.propCode"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column :disabled="dialogInfo.notEdit" prop label="用电企业" align="center">
            <template slot-scope="scope">
              <el-select
                style="width:100%;"
                v-model="scope.row.eleEnterpriseName"
                :remote-method="getAlleleEnterprise"
                @change="tradingUnitNameFocus1(scope.$index,scope.row)"
                filterable
                clearable
                remote
                :loading="loading"
                :disabled="dialogInfo.notEdit"
              >
                <!-- @focus="tradingUnitNameFocus" -->

                <el-option
                  v-for="(item, index) in eleEnterpriseList"
                  :key="index"
                  :label="item.customerName"
                  :value="item.customerName"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
      <el-table-column align="center" width="160" label="意向挂牌电量">
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

      <el-table-column align="center" width="100" label="操作" v-if="!dialogInfo.notEdit">
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
import { deleteInfoById , getDetailListBySchemeId} from "@common/api/business/powerSideOffer/centralizedBidding/index";
import {
  getTradingUnitbyOrgId,
  getAlleleEnterprise
} from "@common/api/business/bilateralNegotiation/index";
import { mapGetters } from "vuex";
import { getOrgByName } from "@common/api/admin/orgStruManage/index";
  import {getSelectList} from '@common/api/base';
import { getUnitMapByModelCode, getUnitMap } from "@common/utils/index";
export default {
  name: "generationRights",
  props: {
    dialogInfo: { type: Object },
    orgInfo: { type: Object },
    btns: { type: Object },
    programme: { type: String },
    schemeNameCode:{type:String},
    announcementInfo: { type: Object },
    quotationSegmentOption: {
      type: Array
    },
    tradingProductsOption: {
      type: Array
    },
    assignmentTypeOption: {
      type: Array
    },
    transactionClassifyOption: {
      type: Array
    },
    tradingUnitOption: {
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
      isErr: false,
      listLoading: false,
       loading:false,
      tableKey: 0,
      tableList: [],
       unitList:[],
       eleEnterpriseList:[], //用电企业
      quotationSegmentOptionData: [],
      announcementInfoData: this.announcementInfo,
      form: {
        customerName: "客户名称",
        detailId:"",
        declarationElectricity: "申报电量/意向摘牌电量",
        declarationElectricityPrices: "申报电价/意向摘牌电价",
        fdOrgId: "发电公司",
        fdOrgName: "发电公司名称",
        tradingClassificationCode: "交易分类",
        tradingClassificationName: "交易分类名称",
        tradingProduct: "产品/交易产品",
        tradingProductName: "产品/交易产品名称",
        tradingTypeCode: "交易类型",
        tradingTypeName: "交易类型名称",
        tradingVarietyCode: "交易品种",
        tradingVarietyName: "交易品种名称",
        eleEnterprise:"",
        eleEnterpriseName: "",//用电企业
        unit: "机组",
        schemeDesc:"备注",
      },

      unitMap: {}
    };
  },
  watch: {
    announcementInfo(val) {
      this.announcementInfoData = val;
    },
    detailListData(val){
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
      //   "listExchange"
      // );
      // #3010 2019-12-10 张亮三 修改首页单位不显示问题
      this.unitMap = this.unitMaps;
    } else {
      this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
    }
  },
  computed: {
    ...mapGetters(["elements", "allSubMenus","orgId"])
  },
  methods: {
    //初始化数据
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
      //根据当前orgId获取机组 2019-11-1   #2435  王岑
         getTradingUnitbyOrgId(this.orgId).then( res => {
        this.unitList = res.data.rows;
        // console.log(res);
        
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
     // #3545 2020-01-13 张亮三 用电企业模糊 查询数据 start
    getAlleleEnterprise(query) {
      this.eleEnterpriseList = [];
      this.loading = true;
      let parameters = {
        name:query
      };
      getAlleleEnterprise(parameters).then(res => {
        this.loading = false;
        this.eleEnterpriseList = res;
      });
    },
    tradingUnitNameFocus1(index,row) {
      this.eleEnterpriseList.forEach(item=>{
        if(item.customerName==this.tableList[index].eleEnterpriseName){
          this.tableList[index].eleEnterprise=item.customerId;
        }
      })
    },
    // #3545 2020-01-13 张亮三 用电企业模糊查询数据 end
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
    //检测交易单元与分段报价唯一性
    checkTradingUnit(data) {
      let isErr = false;
      this.tableList.forEach(item => {
        if (data.index > item.index) {
          if (
            data.quotationStall == item.quotationStall
          ) {
            isErr = true;
          }
        }
      });
      return isErr;
    },
    //检测表格数据
    checkTab(data) {
      this.isErr = false;
      var patrn = /^(-)?\d+(\.\d+)?$/;
      for (let i = 0, l = this.tableList.length; i < l; i++) {
        this.tableList[i].declarationElectricityStatus = "";
        this.tableList[i].declarationElectricityPricesStatus = "";
        if (
          patrn.exec(this.tableList[i].declarationElectricity) == null ||
          this.tableList[i].declarationElectricity == "" ||
          typeof this.tableList[i].declarationElectricity == "undefined") {
          this.tableList[i].declarationElectricityStatus = "ipt-err-true"; //交易电量
          this.tableList[i].declarationElectricityStatusMsg =
            "申报电量必须为数字";
          this.isErr = true;
        }else{
          // if(this.tableList[i].declarationElectricity<0){
          //        this.tableList[i].declarationElectricityStatus = "ipt-err-true"; //交易电价
          // this.tableList[i].declarationElectricityStatusMsg =
          //   "申报电量不能为负值";
          // this.isErr = true;
          //     }
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
          }
          // else if(this.tableList[i].tradingTypeCode == null && this.tableList[i].declarationElectricity < 0){
          //   this.tableList[i].declarationElectricityStatus = "ipt-err-true"; //申报电量
          //   this.tableList[i].declarationElectricityStatusMsg =
          //     "申报电量不能为负值";
          //   this.isErr = true;
          // }
          // #3279 2019-12-25 张亮三 增加类型判断，当类型为 '(出让/csrlx_01)' 时申报电量不能为正值，当类型为 （受让/csrlx_02）时申报电量不能为负值 end
        }
        // #3050 wangc 20191210 根据企业参数电价条件判断
        if (data=="1") {
            if (
              patrn.exec(this.tableList[i].declarationElectricityPrices) == null ||
              this.tableList[i].declarationElectricityPrices == "" ||
              typeof this.tableList[i].declarationElectricityPrices == "undefined") {
              this.tableList[i].declarationElectricityPricesStatus = "ipt-err-true"; //交易电价
              this.tableList[i].declarationElectricityPricesStatusMsg =
                "申报电价必须为数字";
              this.isErr = true;
            }else{
                if(this.announcementInfo.quotationMethod=="bjfs01"){
                  if(this.tableList[i].declarationElectricityPrices>=0){
                    this.tableList[i].declarationElectricityPricesStatus = "ipt-err-true"; //交易电价
              this.tableList[i].declarationElectricityPricesStatusMsg =
                "申报电价应为负值";
              this.isErr = true;
                  }
                }
            }
        }
        if (this.tableList[i].unit == "" ||typeof this.tableList[i].unit == "undefined") {
          this.tableList[i].unitStatus = "ipt-err-true"; 
          this.tableList[i].unitStatusMsg = "请输入机组信息"; 
          this.isErr = true;
        }
        if (this.tableList[i].tradingTypeCode == "" ||typeof this.tableList[i].tradingTypeCode == "undefined") {
          this.tableList[i].tradingTypeCodeStatus = "ipt-err-true"; 
          this.tableList[i].tradingTypeCodeStatusMsg = "请选择类型"; 
          this.isErr = true;
        }
        if (this.tableList[i].tradingProduct == "" ||typeof this.tableList[i].tradingProduct == "undefined") {
          this.tableList[i].tradingProductStatus = "ipt-err-true"; 
          this.tableList[i].tradingProductStatusMsg = "请选择产品"; 
          this.isErr = true;
        }
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
      if(index==1){
        for(let key in this.form){
            if(key.indexOf('Name')<0){
              newData[key]="";
              newData[key+"Status"]="";
              newData[key+"StatusMsg"]="";
            }else{
              newData[key]="";
            }
          }
      }else{
          let rowData= Object.assign({}, this.tableList[this.tableList.length-1]);
        for(let key in this.form){
          if(typeof rowData[key]!="undefined" ){
            if(key!="detailId" && key!="declarationElectricity" && key!="declarationElectricityPrices"){              
               newData[key]=rowData[key];
            }else{
              newData[key]="";
            }
          }else{
            newData[key]="";
          }
        // if(key.indexOf('Name')<0){
        //   newData[key+"Status"]="";
        //   newData[key+"StatusMsg"]="";
          
        // }
      }
      }
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





