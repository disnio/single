<template>
  <div class="app-container calendar-list-container">
    <!-- 省内双边交易 -->
    <div v-if="announcementInfoData.tradeWayCode == 'jyfs01'">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="发电公司" name="1">
          <el-row>
            <el-col :span="24">
              <div class="txt-right unit-info">单位:{{units.electricityUnit}},{{units.priceUnit}}</div>
            </el-col>
          </el-row>
          <el-table
            :key="tableKey"
            :data="fdtableListData"
            v-loading.body="listLoading"
            :span-method="objectSpanMethod"
            @selection-change="selsChange"
            border
            fit
            highlight-current-row
            style="width: 100%;"
          >
            <el-table-column align="center" type="selection"> </el-table-column>
            <el-table-column
              prop="index"
              label="序号"
              align="center"
              width="60px"
            ></el-table-column>
            <el-table-column align="center" label="发电公司">
              <template slot-scope="scope">
                <el-input v-model="scope.row.fdOrgName" disabled></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="交易单元">
              <template slot-scope="scope">
                <el-input v-model="scope.row.tradingUnitName" disabled></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="客户名称">
              <template slot-scope="scope">
                <el-input v-model="scope.row.customerName" disabled></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="申报电量">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.declarationElectricity"
                  disabled
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="申报电价">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.declarationElectricityPrices"
                  disabled
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="审核状态">
              <template slot-scope="scope">
                <el-input v-model="scope.row.stateName" disabled></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="售电公司" name="2">
          <!-- <el-row>
            <el-col :span="6">
              <div>
                月竞总电量：<span class="font">{{
                  totalMonthBidElectricity
                }}</span
                >Mwh
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                跨省交易电量：<span class="fontRed">{{
                  totalMonthBidProvElectricity
                }}</span
                >Mwh
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                跨省交易电量占比：<span class="font">{{
                  totalMonthBidProvProportion
                }}</span
                >%
              </div>
            </el-col>
            <el-col :span="6">
              <div class="txt-right unit-info">单位:mwh,元/mwh</div>
            </el-col>
          </el-row> -->

          <el-table
            :key="tableKey"
            :data="sdtableListData"
            @selection-change="selsChange1"
            v-loading.body="listLoading"
            :span-method="objectSpanMethod2"
            border
            fit
            highlight-current-row
            style="width: 100%;"
          >
            <el-table-column align="center" type="selection"> </el-table-column>
            <el-table-column
              prop="index"
              label="序号"
              align="center"
              width="60px"
            ></el-table-column>
            <el-table-column align="center"  label="售电公司">
              <template slot-scope="scope">
                <el-input v-model="scope.row.sdOrgName" disabled></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center"  label="发电公司">
              <template slot-scope="scope">
                <el-input v-model="scope.row.fdOrgName" disabled></el-input>
              </template>
            </el-table-column>
               <el-table-column align="center"  label="交易单元">
              <template slot-scope="scope">
                <el-input v-model="scope.row.tradingUnitName" disabled></el-input>
              </template>
            </el-table-column>

            <el-table-column align="center"  :label="'申报电量('+units.electricityUnit+')'">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.declarationElectricity"
                  disabled
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center"  :label="'申报电价('+units.priceUnit+')'">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.declarationElectricityPrices"
                  disabled
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center"  label="审核状态">
              <template slot-scope="scope">
                <el-input v-model="scope.row.stateName" disabled></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>
    <!-- 省内集中竞价 -->
    <div v-if="announcementInfoData.tradeWayCode == 'jyfs02'">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="发电公司" name="1">
          <el-row>
            <el-col :span="24">
              <div class="txt-right unit-info">单位:{{units.electricityUnit}},{{units.priceUnit}}</div>
            </el-col>
          </el-row>
          <el-table
            :key="tableKey"
            :data="fdtableListData"
            @selection-change="selsChange"
            v-loading.body="listLoading"
            :span-method="objectSpanMethod"
            border
            fit
            highlight-current-row
            style="width: 100%;"
          >
            <el-table-column align="center" type="selection"> </el-table-column>
            <el-table-column
              prop="index"
              label="序号"
              align="center"
              width="60px"
            ></el-table-column>
            <el-table-column align="center" label="发电公司">
              <template slot-scope="scope">
                <el-input v-model="scope.row.fdOrgName" disabled></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="交易单元">
              <template slot-scope="scope">
                <el-input v-model="scope.row.tradingUnitName" disabled></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="报价段">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.quotationStallName"
                  disabled
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column align="center" label="申报电量">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.declarationElectricity"
                  disabled
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="申报电价">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.declarationElectricityPrices"
                  disabled
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="审核状态">
              <template slot-scope="scope">
                <el-input v-model="scope.row.stateName" disabled></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="售电公司" name="2">
          <!-- <el-row>
            <el-col :span="6">
              <div>
                月竞总电量：<span class="font">{{
                  totalMonthBidElectricity
                }}</span
                >Mwh
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                跨省交易电量：<span class="fontRed">{{
                  totalMonthBidProvElectricity
                }}</span
                >Mwh
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                跨省交易电量占比：<span class="font">{{
                  totalMonthBidProvProportion
                }}</span
                >%
              </div>
            </el-col>
            <el-col :span="6">
              <div class="txt-right unit-info">单位:mwh,元/mwh</div>
            </el-col>
          </el-row> -->

          <el-table
            :key="tableKey"
            :data="sdtableListData"
            @selection-change="selsChange1"
            v-loading.body="listLoading"
            :span-method="objectSpanMethod3"
            border
            fit
            highlight-current-row
            style="width: 100%;"
          >
                      <!-- :span-method="objectSpanMethod" -->

            <el-table-column align="center" type="selection"> </el-table-column>
            <el-table-column
              prop="index"
              label="序号"
              align="center"
              width="60px"
            ></el-table-column>
            <el-table-column align="center"  label="售电公司">
              <template slot-scope="scope">
                <el-input v-model="scope.row.sdOrgName" disabled></el-input>
              </template>
            </el-table-column>

            <el-table-column align="center"  label="报价段">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.quotationStallName"
                  disabled
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column align="center"  label="申报电量">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.declarationElectricity"
                  disabled
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center"  label="申报电价">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.declarationElectricityPrices"
                  disabled
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" width="160" label="审核状态">
              <template slot-scope="scope">
                <el-input v-model="scope.row.stateName" disabled></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>
    <!-- 省内挂牌 -->
    <div v-if="announcementInfoData.tradeWayCode == 'jyfs03'">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="发电公司" name="1">
          <el-row>
            <el-col :span="24">
              <div class="txt-right unit-info">单位:{{units.electricityUnit}},{{units.priceUnit}}</div>
            </el-col>
          </el-row>

          <el-table
            :key="tableKey"
            :data="fdtableListData"
            @selection-change="selsChange"
            v-loading.body="listLoading"
           :span-method="objectSpanMethod"

            border
            fit
            highlight-current-row
            style="width: 100%;"
          >
            <el-table-column align="center" type="selection"> </el-table-column>
            <el-table-column
              prop="index"
              label="序号"
              align="center"
              width="60px"
            ></el-table-column>
            <el-table-column align="center"  label="发电公司">
              <template slot-scope="scope">
                <el-input v-model="scope.row.fdOrgName" disabled></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center"  label="交易单元">
              <template slot-scope="scope">
                <el-input v-model="scope.row.tradingUnitName" disabled></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center"  label="客户名称">
              <template slot-scope="scope">
                <el-input v-model="scope.row.customerName" disabled></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="意向摘牌电量">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.declarationElectricity"
                  disabled
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center"  label="意向摘牌电价">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.declarationElectricityPrices"
                  disabled
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center"  label="审核状态">
              <template slot-scope="scope">
                <el-input v-model="scope.row.stateName" disabled></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="售电公司" name="2">
          <el-row>
            <el-col :span="24">
              <div class="txt-right unit-info">单位:{{units.electricityUnit}},{{units.priceUnit}}</div>
            </el-col>
          </el-row>

          <el-table
            :key="tableKey"
            :data="sdtableListData"
            @selection-change="selsChange1"
            v-loading.body="listLoading"
            :span-method="objectSpanMethod1"
            border
            fit
            highlight-current-row
            style="width: 100%;"
          >
            <el-table-column align="center" type="selection"> </el-table-column>
            <el-table-column
              prop="index"
              label="序号"
              align="center"
              width="60px"
            ></el-table-column>
            <el-table-column align="center" label="售电公司">
              <template slot-scope="scope">
                <el-input v-model="scope.row.sdOrgName" disabled></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="挂牌电量">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.declarationElectricity"
                  disabled
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="挂牌电价">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.declarationElectricityPrices"
                  disabled
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" width="160" label="审核状态">
              <template slot-scope="scope">
                <el-input v-model="scope.row.stateName" disabled></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import { deleteInfoById } from "@common/api/business/powerSideOffer/centralizedBidding/index";
import { mapGetters } from "vuex";
import { getOrgByName } from "@common/api/admin/orgStruManage/index";
import { getTitleData } from "@common/api/business/sellingSideOffer/sdCentralizedBidding/index";

export default {
  name: "inProvince",
  props: {
    announcementInfo: { type: Object },
    fdtableList: { type: Array },
    sdtableList: { type: Array },
    unitMap: { type: Object }
  },
  data() {
    return {
      totalMonthBidElectricity: "",
      totalMonthBidProvElectricity: "",
      totalMonthBidProvProportion: "",
      activeNames: ["1", "2"],
      monthlyElectricity: "80000",
      isErr: false,
      listLoading: false,
      tableKey: 0,
      fdtableListData: this.fdtableList,
      sdtableListData: this.sdtableList,
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
      },
     
      units:this.unitMap
    };
  },
  watch: {
    announcementInfo(val) {
      this.announcementInfoData = val;
      
    },
    // fdtableList(val) {
    //   console.log(val);
    //    this.fdtableListData = val;
    // },
    fdtableList: {
      handler(newData, oldData) {
           this.fdtableListData =newData;           
      },
      immediate: true,
      deep:true,
    },
    sdtableList(val) {
      this.sdtableListData = val;

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
      // let parme = {
      //   orgId: this.orgId,
      //   declarationTime: this.announcementInfoData.tradeIssure
      // };
      // getTitleData(parme).then(res => {
      //   this.totalMonthBidElectricity = res.totalMonthBidElectricity; //月竞总电量
      //   this.totalMonthBidProvElectricity = res.totalMonthBidProvElectricity; //省内交易电量
      //   this.totalMonthBidProvProportion =
      //     res.totalMonthBidProvProportion * 100; //月竞省内占比
       
      // });
     
    },
 
    handleChange(val) {},
    
    unique(array){
      var n = {}, r = [], len = array.length, val, type;
      for (var i = 0; i < array.length; i++) {
        val = array[i];
        type = typeof val;
        if (!n[val]) {
          n[val] = [type];
          r.push(val);
        } else if (n[val].indexOf(type) < 0) {
          n[val].push(type);
          r.push(val);
        }
      }
      return r;
    },
    // 复选框点击
    selsChange(val) {      
      // let id = "";
      // let statusVal = [];
      // val.forEach(element => {
      //   id += "," + element.schemeId;
      // });
      // id = id.substring(1);
      // this.sels = id;
      this.$emit("callback",val);    
   
    },
      // 复选框点击
    selsChange1(val) {
      this.$emit("callback1",val);      
    },
    selsChange2(val) {      
      this.$emit("callback2",val);
    },

//合并行列
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            this.setViewsList();
      if (columnIndex === 2 || columnIndex === 7 || columnIndex === 0) {
        const _row_1 = this.mainIndex[rowIndex];
        const _col_1 = _row_1 > 0 ? 1 : 0; //如果被合并了_row=0则它这个列需要取消
        return {
          rowspan: _row_1,
          colspan: _col_1
        };
      }
    },
    setViewsList() {
      //
      let listData = this.fdtableListData;
      this.mainIndex = [];
      this.mainIndexPos = 0;
      let isMainData = false;
      let arr = [];
      for (let i = 0, l = listData.length; i < l; i++) {
        if (i === 0) {
          arr.push(listData[i].fdOrgId);
          this.mainIndex.push(1);
          this.mainIndexPos = 0;
        } else {
          if (arr.indexOf(listData[i].fdOrgId) < 0) {
            arr.push(listData[i].fdOrgId);
            this.mainIndex.push(1);
            this.mainIndexPos = i;
          } else {
            this.mainIndex[this.mainIndexPos] += 1;
            this.mainIndex.push(0);
          }
        }
      }
      this.fdtableListData = listData;
    },
   

 objectSpanMethod1({ row, column, rowIndex, columnIndex }) {
            this.setViewsList1();
      if (columnIndex === 2 || columnIndex === 5 || columnIndex === 0) {
        const _row_1 = this.mainIndex[rowIndex];
        const _col_1 = _row_1 > 0 ? 1 : 0; //如果被合并了_row=0则它这个列需要取消
        return {
          rowspan: _row_1,
          colspan: _col_1
        };
      }
    },
    setViewsList1() {
      //
      let listData = this.sdtableListData;
      this.mainIndex = [];
      this.mainIndexPos = 0;
      let isMainData = false;
      let arr = [];
      for (let i = 0, l = listData.length; i < l; i++) {
        if (i === 0) {
          arr.push(listData[i].sdOrgId);
          this.mainIndex.push(1);
          this.mainIndexPos = 0;
        } else {
          if (arr.indexOf(listData[i].sdOrgId) < 0) {
            arr.push(listData[i].sdOrgId);
            this.mainIndex.push(1);
            this.mainIndexPos = i;
          } else {
            this.mainIndex[this.mainIndexPos] += 1;
            this.mainIndex.push(0);
          }
        }
      }
      this.sdtableListData = listData;
    },
    
     objectSpanMethod2({ row, column, rowIndex, columnIndex }) {
            this.setViewsList2();
      if (columnIndex === 2 || columnIndex === 7 || columnIndex === 0) {
        const _row_1 = this.mainIndex[rowIndex];
        const _col_1 = _row_1 > 0 ? 1 : 0; //如果被合并了_row=0则它这个列需要取消
        return {
          rowspan: _row_1,
          colspan: _col_1
        };
      }
    },
    setViewsList2() {
      //      
      let listData = this.sdtableListData;
      this.mainIndex = [];
      this.mainIndexPos = 0;
      let isMainData = false;
      let arr = [];
      for (let i = 0, l = listData.length; i < l; i++) {
        if (i === 0) {
          arr.push(listData[i].sdOrgId);
          this.mainIndex.push(1);
          this.mainIndexPos = 0;
        } else {
          if (arr.indexOf(listData[i].sdOrgId) < 0) {
            arr.push(listData[i].sdOrgId);
            this.mainIndex.push(1);
            this.mainIndexPos = i;
          } else {
            this.mainIndex[this.mainIndexPos] += 1;
            this.mainIndex.push(0);
          }
        }
      }
      this.sdtableListData = listData;
    },
 objectSpanMethod3({ row, column, rowIndex, columnIndex }) {
            this.setViewsList3();
      if (columnIndex === 2 || columnIndex === 6 || columnIndex === 0) {
        const _row_1 = this.mainIndex[rowIndex];
        const _col_1 = _row_1 > 0 ? 1 : 0; //如果被合并了_row=0则它这个列需要取消
        return {
          rowspan: _row_1,
          colspan: _col_1
        };
      }
    },
    setViewsList3() {
      //      
      let listData = this.sdtableListData;
      this.mainIndex = [];
      this.mainIndexPos = 0;
      let isMainData = false;
      let arr = [];
      for (let i = 0, l = listData.length; i < l; i++) {
        if (i === 0) {
          arr.push(listData[i].sdOrgId);
          this.mainIndex.push(1);
          this.mainIndexPos = 0;
        } else {
          if (arr.indexOf(listData[i].sdOrgId) < 0) {
            arr.push(listData[i].sdOrgId);
            this.mainIndex.push(1);
            this.mainIndexPos = i;
          } else {
            this.mainIndex[this.mainIndexPos] += 1;
            this.mainIndex.push(0);
          }
        }
      }
      this.sdtableListData = listData;
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
    //初始化表格数据
    initTableData() {
      this.tableList = [];
      //this.addRow();
    },
    //设置表格数据
    setsdList(data) {      
      //this.addRow();
      this.sdtableListData = data;
    },
    //设置表格数据
    setfdList(data) {
      //this.addRow();      
      this.fdtableListData = data;
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





