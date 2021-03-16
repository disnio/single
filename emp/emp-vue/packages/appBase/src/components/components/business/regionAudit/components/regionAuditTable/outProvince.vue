<template>
  <div class="app-container calendar-list-container">
    <!-- 省外双边交易 -->
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
            :span-method="objectSpanMethod"
            v-loading.body="listLoading"
            @selection-change="selsChange"
            border
            fit
            highlight-current-row
            style="width: 100%;"
          >
            <el-table-column align="center" type="selection"> </el-table-column>
            <el-table-column
              type="index"
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
            <el-table-column align="center" label="线路">
              <template slot-scope="scope">
                <el-select
                  style="width:100%;"
                  disabled
                  :class="scope.row.transactionLineStatus"
                  v-model="scope.row.transactionLine"
                >
                  <el-option
                    v-for="(item, index) in transactionLineOption"
                    :key="index"
                    :label="item.tieLineName"
                    :value="item.tieLineId"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column align="center"  label="客户名称">
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
            <el-table-column align="center"  label="发电公司">
              <template slot-scope="scope">
                <el-input v-model="scope.row.fdOrgName" disabled></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="交易单元">
              <template slot-scope="scope">
                <el-input v-model="scope.row.tradingUnitName" disabled></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="线路">
              <template slot-scope="scope">
                <el-select
                  style="width:100%;"
                  disabled
                  :class="scope.row.transactionLineStatus"
                  v-model="scope.row.transactionLine"
                >
                  <el-option
                    v-for="(item, index) in transactionLineOption"
                    :key="index"
                    :label="item.tieLineName"
                    :value="item.tieLineId"
                  >
                  </el-option>
                </el-select>
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
            <el-table-column align="center" :label="'申报电价('+units.electricityUnit+')'">
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
    <!-- 省外集中竞价 -->
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
            <el-table-column align="center"  label="线路">
              <template slot-scope="scope">
                <el-select
                  style="width:100%;"
                  disabled
                  :class="scope.row.transactionLineStatus"
                  v-model="scope.row.transactionLine"
                >
                  <el-option
                    v-for="(item, index) in transactionLineOption"
                    :key="index"
                    :label="item.tieLineName"
                    :value="item.tieLineId"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column align="center" label="报价段">
              <template slot-scope="scope">
                <el-input v-model="scope.row.quotationStallName" disabled></el-input>
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
            <el-table-column align="center"  label="审核状态">
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
            :key="tableKey1"
            :data="sdtableListData"
            @selection-change="selsChange1"
            v-loading.body="listLoading"
            :span-method="objectSpanMethod1"
            border
            fit
            highlight-current-row
            style="width: 100%;"
          >
          <!-- :span-method="objectSpanMethod" -->
            
            <el-table-column align="center" width="55" type="selection"></el-table-column>
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
            <el-table-column align="center" label="报价段">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.quotationStall"
                  disabled
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="线路">
              <template slot-scope="scope">
                <el-select
                  style="width:100%;"
                  disabled
                  :class="scope.row.transactionLineStatus"
                  v-model="scope.row.transactionLine"
                >
                  <el-option
                    v-for="(item, index) in transactionLineOption"
                    :key="index"
                    :label="item.tieLineName"
                    :value="item.tieLineId"
                  >
                  </el-option>
                </el-select>
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
      </el-collapse>
    </div>
    <!-- 省外挂牌 -->
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
            :span-method="objectSpanMethod4"
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
            <el-table-column align="center" label="线路">
              <template slot-scope="scope">
                <el-select
                  style="width:100%;"
                  disabled
                  :class="scope.row.transactionLineStatus"
                  v-model="scope.row.transactionLine"
                >
                  <el-option
                    v-for="(item, index) in transactionLineOption"
                    :key="index"
                    :label="item.tieLineName"
                    :value="item.tieLineId"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column align="center" label="客户名称">
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
            <el-table-column align="center" label="意向摘牌电价">
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
            :span-method="objectSpanMethod6"
            border
            fit
            highlight-current-row
            style="width: 100%;"
          >
          <!-- :span-method="objectSpanMethod5" -->
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
              <el-table-column align="center" label="线路">
              <template slot-scope="scope">
                <el-select
                  style="width:100%;"
                  disabled
                  :class="scope.row.transactionLineStatus"
                  v-model="scope.row.transactionLine"
                >
                  <el-option
                    v-for="(item, index) in transactionLineOption"
                    :key="index"
                    :label="item.tieLineName"
                    :value="item.tieLineId"
                  >
                  </el-option>
                </el-select>
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
            <el-table-column align="center" label="审核状态">
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
import { getAllLinList } from "@common/api/basicData/TMdataTieLin/index";
import { getTitleData } from "@common/api/business/sellingSideOffer/sdCentralizedBidding/index";

export default {
  name: "outProvince",
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
      activeNames: ["1"],
      importList: [],
      transactionLineOption: [],
      monthlyElectricity: "80000",
      isErr: false,
      listLoading: false,
      tableKey: 0,
      tableKey1:0,
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
     fdtableList(val) {
      this.fdtableListData = val;

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
      //   // this.totalMonthBidElectricity = 100; //月竞总电量
      //   // this.totalMonthBidProvElectricity = 50; //省内交易电量
      //   // this.totalMonthBidProvProportion = 50; //月竞省内占比
      // });
      getAllLinList().then(res => {
        if (res.rel) {
          this.transactionLineOption = res.data;
        }
      });
    },
   
    // 复选框点击
    selsChange(val) {
      this.$emit("callback",val);
    },
     // 复选框点击
    selsChange1(val) {
      this.$emit("callback1",val);
    },

 //合并行列
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      this.setViewsList();
      if (columnIndex === 2 || columnIndex === 8 || columnIndex === 0) {
        const _row_1 = this.mainIndex[rowIndex];
        const _col_1 = _row_1 > 0 ? 1 : 0; //如果被合并了_row=0则它这个列需要取消
        return {
          rowspan: _row_1,
          colspan: _col_1
        };
      }
    },
    setViewsList() {
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
 //合并行列
    objectSpanMethod1({ row, column, rowIndex, columnIndex }) {
      this.setViewsList1();
      if (columnIndex === 2 || columnIndex === 7 || columnIndex === 0) {
        const _row_1 = this.mainIndex[rowIndex];
        const _col_1 = _row_1 > 0 ? 1 : 0; //如果被合并了_row=0则它这个列需要取消
        return {
          rowspan: _row_1,
          colspan: _col_1
        };
      }
    },
    setViewsList1() {
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
 //合并行列
    objectSpanMethod2({ row, column, rowIndex, columnIndex }) {
      this.setViewsList2();
      if (columnIndex === 2 || columnIndex === 8 || columnIndex === 0) {
        const _row_1 = this.mainIndex[rowIndex];
        const _col_1 = _row_1 > 0 ? 1 : 0; //如果被合并了_row=0则它这个列需要取消
        return {
          rowspan: _row_1,
          colspan: _col_1
        };
      }
    },
    setViewsList2() {
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
 //合并行列
    objectSpanMethod3({ row, column, rowIndex, columnIndex }) {
      this.setViewsList3();
      if (columnIndex === 2 || columnIndex === 8 || columnIndex === 0) {
        const _row_1 = this.mainIndex[rowIndex];
        const _col_1 = _row_1 > 0 ? 1 : 0; //如果被合并了_row=0则它这个列需要取消
        return {
          rowspan: _row_1,
          colspan: _col_1
        };
      }
    },
    setViewsList3() {
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
   
 //合并行列
    objectSpanMethod4({ row, column, rowIndex, columnIndex }) {
      this.setViewsList4();
      if (columnIndex === 2 || columnIndex === 8 || columnIndex === 0) {
        const _row_1 = this.mainIndex[rowIndex];
        const _col_1 = _row_1 > 0 ? 1 : 0; //如果被合并了_row=0则它这个列需要取消
        return {
          rowspan: _row_1,
          colspan: _col_1
        };
      }
    },
    setViewsList4() {
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
 //合并行列
    objectSpanMethod5({ row, column, rowIndex, columnIndex }) {
      this.setViewsList5();
      if (columnIndex === 2 || columnIndex === 5 || columnIndex === 0) {
        const _row_1 = this.mainIndex[rowIndex];
        const _col_1 = _row_1 > 0 ? 1 : 0; //如果被合并了_row=0则它这个列需要取消
        return {
          rowspan: _row_1,
          colspan: _col_1
        };
      }
    },
    setViewsList5() {
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
    //合并行列
    objectSpanMethod6({ row, column, rowIndex, columnIndex }) {
      this.setViewsList6();
      if (columnIndex === 2 || columnIndex === 6 || columnIndex === 0) {
        const _row_1 = this.mainIndex[rowIndex];
        const _col_1 = _row_1 > 0 ? 1 : 0; //如果被合并了_row=0则它这个列需要取消
        return {
          rowspan: _row_1,
          colspan: _col_1
        };
      }
    },
    setViewsList6() {
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
    handleChange(val) {}
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





