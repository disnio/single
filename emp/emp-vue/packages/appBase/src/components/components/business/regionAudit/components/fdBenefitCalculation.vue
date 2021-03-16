<template>
  <div class="app-container calendar-list-container">
    <!-- 弹窗 -->

    <div
      :style="{ paddingRight: '10px', height: layoutInfo.height - 20 + 'px' }"
    >
      <div class="f-mt10" style="position:relative; z-index:10;">
        <!--下方数据展示 -->
        <div style=" margin-top: 20px; ">
          <el-row :gutter="5">
            <el-col :span="4">
              <div>
                <div class="title-1">
                  <span v-if="rowInfo.tradeWayCode != 'jyfs02'"
                    >申报总电量</span
                  >
                  <span v-else>预计成交总电量</span>
                </div>
                <div class="data-info">
                  <span class="number-font-style">{{
                    mainData.totalElectricity.data
                  }}</span
                  ><span class="m-unit">{{units.electricityUnit}}</span>
                  <el-tooltip
                    v-if="mainData.totalElectricity.state != ''"
                    :popper-class="'reditem'"
                    effect="dark"
                    :content="mainData.totalElectricity.msg"
                    placement="bottom"
                  >
                    <i
                      v-if="mainData.totalElectricity.state == 'down'"
                      class="el-icon-caret-bottom iconStyle-green"
                    ></i>
                    <i
                      v-if="mainData.totalElectricity.state == 'up'"
                      class="el-icon-caret-top iconStyle-red"
                    ></i>
                  </el-tooltip>
                </div>
              </div>
            </el-col>
            <el-col :span="4">
              <div>
                <div class="title-2">
                  <span>综合平均电价</span>
                </div>
                <div class="data-info">
                  <span class="number-font-style">{{
                    mainData.electricityPrice.data
                  }}</span
                  ><span class="m-unit">{{units.electricityUnit}}</span>
                  <el-tooltip
                    v-if="mainData.electricityPrice.state != ''"
                    :popper-class="'reditem'"
                    effect="dark"
                    :content="mainData.electricityPrice.msg"
                    placement="bottom"
                  >
                    <i
                      v-if="mainData.electricityPrice.state == 'down'"
                      class="el-icon-caret-bottom iconStyle-green"
                    ></i>
                    <i
                      v-if="mainData.electricityPrice.state == 'up'"
                      class="el-icon-caret-top iconStyle-red"
                    ></i>
                  </el-tooltip>
                </div>
              </div>
            </el-col>
            <el-col :span="4">
              <div>
                <div class="title-3">
                  <span>单位燃料成本</span>
                </div>
                <div class="data-info">
		 <!-- #2983 2019-12-02 康如涛 修改字体显示  start -->
                  <span class="number-font-style">{{
                    mainData.fuelCost.data
                  }}</span
                  ><span class="m-unit">{{units.electricityUnit}}</span>
                <!-- #2983 2019-12-02 康如涛 修改字体显示  end -->
                  <el-tooltip
                    v-if="mainData.fuelCost.state != ''"
                    :popper-class="'reditem'"
                    effect="dark"
                    :content="mainData.fuelCost.msg"
                    placement="bottom"
                  >
                    <i
                      v-if="mainData.fuelCost.state == 'down'"
                      class="el-icon-caret-bottom iconStyle-green"
                    ></i>
                    <i
                      v-if="mainData.fuelCost.state == 'up'"
                      class="el-icon-caret-top iconStyle-red"
                    ></i>
                  </el-tooltip>
                </div>
              </div>
            </el-col>
            <el-col :span="4">
              <div>
                <div class="title-4">
                  <span>单位边际收益</span>
                </div>
                <div class="data-info">
                  <span class="number-font-style">{{
                    mainData.unitContributionMargin.data
                  }}</span
                  ><span class="m-unit">{{units.priceUnit}}</span>
                  <el-tooltip
                    v-if="mainData.unitContributionMargin.state != ''"
                    :popper-class="'reditem'"
                    effect="dark"
                    :content="mainData.unitContributionMargin.msg"
                    placement="bottom"
                  >
                    <i
                      v-if="mainData.unitContributionMargin.state == 'down'"
                      class="el-icon-caret-bottom iconStyle-green"
                    ></i>
                    <i
                      v-if="mainData.unitContributionMargin.state == 'up'"
                      class="el-icon-caret-top iconStyle-red"
                    ></i>
                  </el-tooltip>
                </div>
              </div>
            </el-col>
            <el-col :span="4">
              <div>
                <div class="title-5">
                  <span>收入</span>
                </div>
                <div class="data-info">
                  <span class="number-font-style">{{
                    mainData.income.data
                  }}</span
                  ><span class="m-unit">{{units.amountUnit}}</span>
                  <el-tooltip
                    v-if="mainData.income.state != ''"
                    :popper-class="'reditem'"
                    effect="dark"
                    :content="mainData.income.msg"
                    placement="bottom"
                  >
                    <i
                      v-if="mainData.income.state == 'down'"
                      class="el-icon-caret-bottom iconStyle-green"
                    ></i>
                    <i
                      v-if="mainData.income.state == 'up'"
                      class="el-icon-caret-top iconStyle-red"
                    ></i>
                  </el-tooltip>
                </div>
              </div>
            </el-col>
            <el-col :span="4">
              <div>
                <div class="title-6">
                  <span>边际收益</span>
                </div>
                <div class="data-info">
                  <span class="number-font-style">{{
                    mainData.marginalRevenue.data
                  }}</span
                  ><span class="m-unit">{{units.amountUnit}}</span>
                  <el-tooltip
                    v-if="mainData.marginalRevenue.state != ''"
                    :popper-class="'reditem'"
                    effect="dark"
                    :content="mainData.marginalRevenue.msg"
                    placement="bottom"
                  >
                    <i
                      v-if="mainData.marginalRevenue.state == 'down'"
                      class="el-icon-caret-bottom iconStyle-green"
                    ></i>
                    <i
                      v-if="mainData.marginalRevenue.state == 'up'"
                      class="el-icon-caret-top iconStyle-red"
                    ></i>
                  </el-tooltip>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <el-row>
          <el-col :span="24">
            <el-button
              
              class="filter-item"
              type="primary"
              :loading="beginCalculation"
              @click="reckon"
              >开始计算</el-button
            >
            <div class="txt-right unit-info">
              单位:{{units.priceUnit}},{{units.electricityUnit}},{{units.amountUnit}}
            </div>
          </el-col>
        </el-row>
        <el-table
          :key="tableKey"
          :data="tableList.data"
          border
          fit
          highlight-current-row
          style="width: 100%;"
        >
          <!-- <el-table-column align="center" type="selection"></el-table-column> -->
          <el-table-column
            v-for="item in tableList.columnName"
            :key="item.id"
            :label="item.label"
            border
            show-overflow-tooltip
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="item.id == 'indicators'">{{
                scope.row[item.id]
              }}</span>
              <span v-else>
                <span v-if="scope.row.state == 'input'">
                  <el-input-number
                    v-model="scope.row[item.id]"
                  ></el-input-number>
                </span>
                <span v-else>
                  {{ scope.row[item.id] }}
                </span>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button class="cancel-btn" @click="dialogVisible = false">
        <span>关闭</span>
      </el-button>
    </div>
  </div>
</template>
<script>
import {
  fdBenefitCalculationObj, //发电侧-集中竞价报价方案效益测算
  sdBenefitCalculationObj, //售电侧-集中竞价报价方案效益测算
  getFdBilateralNegotiationEstimating, //发电侧-双边协商报价方案效益测算
  getFdListedTransactionEstimating, //发电侧-挂牌交易报价方案效益测算
  sdSBXSBenefitCalculationObj, //售电侧-双边协商报价方案效益测算
  getTotalFdBilateralNegotiationEstimating,
  getTotalFdCentralizedBiddingEstimating,
  getTotalFdListedTransactionEstimating,
  getTotalSdBilateralNegotiationEstimating,
  getTotalSdCentralizedBiddingEstimating
} from "@common/api/business/solutionBenefitCalculation/index";
import { mapGetters } from "vuex";
import { parseTime } from "@common/utils/index";
import { initLayoutInfo } from "@common/utils/init";
import { log } from 'util';
export default {
  name: "result",
  props: {
    schemeInfo: { type: Object },
    announcementInfo: { type: Object },
    orgInfo: {
      type: Object
    },
    fdtableList: { type: Array },
    sdtableList: { type: Array },
    unitMap: { type: Object }
  },
  data() {
    return {
      beginCalculation: false,
      dataInfoStatus: {},
      tableKey: "0",
      rowInfo: "",
      layoutInfo: {},
      calculationInfoData: {},
      announcementInfoData: {},
      tableList: {},
      listLoading: false,
      dialogVisible: false,
      mainData: {
        totalElectricity: {
          //总电量
          data: "",
          msg: "",
          state: ""
        },
        fuelCost: {
          //燃料成本
          data: "",
          msg: "",
          state: ""
        },
        marginalRevenue: {
          //边际收益
          data: "",
          msg: "",
          state: ""
        },
        electricityPrice: {
          //综合平均电价
          data: "",
          msg: "",
          state: ""
        },
        unitContributionMargin: {
          //单位边际收益
          data: "",
          msg: "",
          state: ""
        },
        income: {
          //收入
          data: "",
          msg: "",
          state: ""
        }
      },
      
      units:this.unitMap
    };
  },
  watch: {
    announcementInfo(val) {
      this.announcementInfoData = val;
    }
  },
  created() {},
  mounted() {
    const that = this;
    this.layoutInfo = initLayoutInfo();
    window.onresize = function temp() {
      that.layoutInfo = initLayoutInfo();
    };
  },
  computed: {
    ...mapGetters(["elements"])
  },
  methods: {
    init(data, schemeNameCode) {
      // let parme = {
      //   schemeId: data.schemeId,
      //   schemeNameCode: schemeNameCode
      // };
      let parme={};
      let schemeIds=[];
      this.fdtableList.forEach(element => {
        schemeIds.push(element.schemeId);
      });
       schemeIds= Array.from(new Set(schemeIds));
       schemeIds.forEach((element,index) => {
        let data ={};
         data.schemeId =element;
        parme[index]=data;
      });
      
      this.dataInfoStatus = parme;
      if (this.rowInfo.tradeWayCode == "jyfs02") {
        getTotalFdCentralizedBiddingEstimating(parme).then(res => {
          this.back(res);
        });
      } else if (this.rowInfo.tradeWayCode == "jyfs01") {
        
        
        getTotalFdBilateralNegotiationEstimating(parme).then(res => {
          this.back(res);
        });
      } else if (this.rowInfo.tradeWayCode == "jyfs03") {
        getTotalFdListedTransactionEstimating(parme).then(res => {
          this.back(res);
        });
      }
    },
    back(res) {
      if (res.rel) {
        this.tableList.columnName = res.data.columnName;
        this.tableList.data = res.data.indexStatistics;
        // ======================
        this.mainData.totalElectricity.data =
          res.data.expectedDealElectricityCount;
        this.mainData.fuelCost.data = res.data.unitFuelCostCount;
        this.mainData.marginalRevenue.data = res.data.marginalRevenueCount;
        this.mainData.electricityPrice.data =
          res.data.compositeAveragePriceCount;
        this.mainData.unitContributionMargin.data =
          res.data.unitMarginalRevenueCount;
        this.mainData.income.data = res.data.incomeCount;
      }
    },
    //设置信息
    // setInfo(data) {
    //   this.mainData = data.mainData;
    //   this.tableList = data.tableList;
    // },
    //效益测算
    reckon() {
      this.beginCalculation = true;
      let dataJson = {};
      let parmes=[];
      let indexs=[];
      this.tableList.data.forEach((item2, index) => {
        if (item2.state == "input") {
          dataJson[item2.code] = [];
          for (let key in item2) {
            this.tableList.columnName.forEach((item, index) => {
 
              if (item.id == key && key != "indicators") {
                indexs.push(item.schemeId);
                dataJson[item2.code].push({
                  id: item.prop,
                  val: item2[key] + "",
                  schemeId: item.schemeId,
                });
              }
            });
          }
        }
      });
      // console.log(indexs);
      
      indexs= Array.from(new Set(indexs));
     
      indexs.forEach(item=>{
    //  console.log(item);
     
        // let parmesJson={}
        //  parmesJson.schemeId=item;
          let unitFuelCosts=[];
          let expectedClearancePrices=[];
          let columnName= Object.assign([], this.tableList.columnName);
          let tableList= Object.assign([],this.tableList.data);
          columnName.forEach((item1, index) => {
              let unitId="";
              let unitFuelCost={};
              let expectedClearancePrice={};
                 if(index!=0){
                   if(item1.schemeId==item){
                     unitId=item1.id;
                     unitFuelCost.id=item1.prop;
                     expectedClearancePrice.id=item1.prop;
                   }
                    tableList.forEach((item2, index2) => {
                      if(item2.code == "unitFuelCost"){
                        for(let key2 in item2 ){
                           if(key2==unitId){
                             if(typeof item2[unitId]!="undefined" ){
                               unitFuelCost["val"]=item2[unitId];
                             }else{
                               unitFuelCost["val"]=0;
                             }
                           }
                        }
                        if(typeof unitFuelCost["val"]!="undefined"){
                           unitFuelCosts.push(unitFuelCost)
                        }
                      }else  if(item2.code == "expectedClearancePrice"){
                        // console.log(item2);
                        
                        for(let key2 in item2 ){
                           if(key2==unitId){
                             if(typeof item2[unitId]!="undefined" ){
                               expectedClearancePrice["val"]=item2[unitId];
                             }else{
                               expectedClearancePrice["val"]=0;
                             }
                           }
                        }
                        if(typeof expectedClearancePrice["val"]!="undefined"){
                           expectedClearancePrices.push(expectedClearancePrice)
                        }
                      }
                      
                      
                    })
                 }

            });
         
            
         parmes.unshift({schemeId:item,unitFuelCost:unitFuelCosts,expectedClearancePrice:expectedClearancePrices})   
      })
      // console.log(JSON.stringify(parmes));
      
      let data = {};
      parmes.forEach((element,index) => {
       data[index] =  element;
        
      });
      if (this.rowInfo.tradeWayCode == "jyfs02") {
        getTotalFdCentralizedBiddingEstimating(data).then(res => {
          this.back1(res);
        });
      } else if (this.rowInfo.tradeWayCode == "jyfs01") {
        
        
        getTotalFdBilateralNegotiationEstimating(data).then(res => {
          this.back1(res);
        });
      } else if (this.rowInfo.tradeWayCode == "jyfs03") {
        getTotalFdListedTransactionEstimating(data).then(res => {
          this.back1(res);
        });
      }
    },
    back1(res) {
      if (res.rel) {
        this.beginCalculation = false;
        this.$notify({
          title: "成功",
          message: "计算成功",
          type: "success",
          duration: 2000
        });
        // this.tableList.columnName = res.data.columnName;
        this.tableList.data = res.data.indexStatistics;
        // ======================
        this.mainData.totalElectricity.data =
          res.data.expectedDealElectricityCount;
        this.mainData.fuelCost.data = res.data.unitFuelCostCount;
        this.mainData.marginalRevenue.data = res.data.marginalRevenueCount;
        this.mainData.electricityPrice.data =
          res.data.compositeAveragePriceCount;
        this.mainData.unitContributionMargin.data =
          res.data.unitMarginalRevenueCount;
        this.mainData.income.data = res.data.incomeCount;
      } else {
        this.$notify({
          title: "提示",
          message: res.msg,
          type: "warning",
          duration: 2000
        });
      }
    },
    //显示窗口
    showDialog(data, schemeNameCode) {
      this.rowInfo = data;
      this.init(data, schemeNameCode);
      this.dialogVisible = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.w-half {
  width: 80px !important;
}
.lm-title {
  height: 45px;
  //margin-bottom: 25px;
  line-height: 45px;
  background-color: #e9e8e8;
  color: #999999;
  font-weight: bold;
}

.statistics_thire {
  padding-left: 20%;
  margin-top: 5px;
  //text-align: center;
  color: red;
}
//边框
.border-style {
  border: 1px solid #d6d6d6;
}

//左侧统计数据信息样式
.statistics-left-name {
  height: 45px;
  padding-left: 20%;
  line-height: 45px;
  font-family: "Microsoft YaHei";
  color: #545454;
}

.statistics-left-data {
  padding-left: 20%;
  font-size: 30px;
  color: #999999;
}

.compared-data {
  font-size: 15px;
  color: #999999;
}

//下方4个样式
.title-1,
.title-2,
.title-3,
.title-4,
.title-5,
.title-6 {
  font-size: 20px;
  height: 45px;
  color: #fff;
  text-align: center;
  line-height: 45px;
  font-weight: bold;
}
.title-1 {
  background: #00cc99;
}

.title-2 {
  background: #17a4de;
}

.title-3 {
  background: #ff9900;
}
.title-4 {
  background: #1abc9c;
}
.title-5 {
  background: #9820ff;
}
.title-6 {
  background: #20a0ff;
}

//下方字体统一样式
.data-info {
  background: #f2f2f2;
  height: 45px;
  text-align: center;
  line-height: 45px;
  color: #666565;
}

//箭头颜色
.iconStyle-green {
  color: green;
  font-size: 20px;
}
.iconStyle-red {
  color: red;
  font-size: 20px;
}
.number-font-style {
  font-size: 20px;
  font-weight: 700;
}
.el-input-number {
  line-height: 26px;
}
</style>
