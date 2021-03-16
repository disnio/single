<!--
 * @功能描述: 
 * @版本: 
 * @作者: 阿彪
 * @Date: 2019-10-24 20:42:14
 * @最新修改内容: 
 * @LastEditTime: 2019-12-10 16:46:43
 -->
<template>
  <div class="app-container calendar-list-container">
    <!-- 弹窗 -->
    <el-dialog v-drag :close-on-click-modal="false"
      :width="layoutInfo.width+'px'"
      custom-class="dialog-max"
      title="方案效益测算"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
    >
      <div
        :style="{paddingRight:'10px',height:(layoutInfo.height-20)+'px'}"
      
      >
        
      
        <div class="f-mt10" style="position:relative; z-index:10;">
         <!--下方数据展示 -->
    <div style=" margin-top: 20px; ">
      <el-row :gutter="5">
        <el-col :span="4">
          <div>
            <div class="title-1">
              <span>预计成交总电量</span>
            </div>
            <div class="data-info">
              <span class="number-font-style">{{mainData.totalElectricity.data}}</span>
                    <span class="m-unit">{{unitMap.electricityUnit}}</span>
              <el-tooltip
              v-if="mainData.totalElectricity.state!=''"
                :popper-class="'reditem'"
                effect="dark"
                :content="mainData.totalElectricity.msg"
                 placement="bottom"
              >
                <i v-if="mainData.totalElectricity.state=='down'" class="el-icon-caret-bottom iconStyle-green"></i>
                <i v-if="mainData.totalElectricity.state=='up'" class="el-icon-caret-top iconStyle-red"></i>
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
              <span class="number-font-style">{{mainData.electricityPrice.data}}</span>
                    <span class="m-unit">{{unitMap.priceUnit}}</span>
              <el-tooltip
              v-if="mainData.electricityPrice.state!=''"
                :popper-class="'reditem'"
                effect="dark"
                :content="mainData.electricityPrice.msg"
                placement="bottom"
              >
                <i v-if="mainData.electricityPrice.state=='down'" class="el-icon-caret-bottom iconStyle-green"></i>
                <i v-if="mainData.electricityPrice.state=='up'" class="el-icon-caret-top iconStyle-red"></i>
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
              <span class="number-font-style">{{mainData.fuelCost.data}}</span>
	       <!-- #2983 2019-12-02 康如涛 修改字体显示  end -->
                    <span class="m-unit">{{unitMap.priceUnit}}</span>
            <el-tooltip
              v-if="mainData.fuelCost.state!=''"
                :popper-class="'reditem'"
                effect="dark"
                :content="mainData.fuelCost.msg"
                placement="bottom"
              >
                <i v-if="mainData.fuelCost.state=='down'" class="el-icon-caret-bottom iconStyle-green"></i>
                <i v-if="mainData.fuelCost.state=='up'" class="el-icon-caret-top iconStyle-red"></i>
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
              <span class="number-font-style">{{mainData.unitContributionMargin.data}}</span>
                    <span class="m-unit">{{unitMap.priceUnit}}</span>
              <el-tooltip
              v-if="mainData.unitContributionMargin.state!=''"
                :popper-class="'reditem'"
                effect="dark"
                :content="mainData.unitContributionMargin.msg"
                 placement="bottom"
              >
                <i v-if="mainData.unitContributionMargin.state=='down'" class="el-icon-caret-bottom iconStyle-green"></i>
                <i v-if="mainData.unitContributionMargin.state=='up'" class="el-icon-caret-top iconStyle-red"></i>
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
              <span class="number-font-style">{{mainData.income.data}}</span>
                    <span class="m-unit">{{unitMap.amountUnit}}</span>
              <el-tooltip
              v-if="mainData.income.state!=''"
                :popper-class="'reditem'"
                effect="dark"
                :content="mainData.income.msg"
                 placement="bottom"
              >
                <i v-if="mainData.income.state=='down'" class="el-icon-caret-bottom iconStyle-green"></i>
                <i v-if="mainData.income.state=='up'" class="el-icon-caret-top iconStyle-red"></i>
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
              <span class="number-font-style">{{mainData.marginalRevenue.data}}</span>
                    <span class="m-unit">{{unitMap.amountUnit}}</span>
              <el-tooltip
              v-if="mainData.marginalRevenue.state!=''"
                :popper-class="'reditem'"
                effect="dark"
                :content="mainData.marginalRevenue.msg"
                placement="bottom"
              >
                <i v-if="mainData.marginalRevenue.state=='down'" class="el-icon-caret-bottom iconStyle-green"></i>
                <i v-if="mainData.marginalRevenue.state=='up'" class="el-icon-caret-top iconStyle-red"></i>
              </el-tooltip>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :span="24">
        <el-button class="filter-item" type="primary" @click="reckon">开始计算</el-button>
        <div
                class="txt-right unit-info"
              >单位:{{unitMap.priceUnit}},{{unitMap.electricityUnit}},{{unitMap.amountUnit}}</div>
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
            v-for="(item) in tableList.columnName"
            :key="item.id"
            sortable
            :label="item.id"
            border
            show-overflow-tooltip
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="item.id=='指标项'">{{scope.row[item.id]}}</span>
                 <span v-else>
                 <span v-if="scope.row.state=='input'">
                  <el-input-number v-model="scope.row[item.id]" ></el-input-number>

                  </span>
                  <span v-else>
                     {{scope.row[item.id]}}
                  </span>
                </span>
               

            </template>
          </el-table-column>
   
    </el-table>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-btn" @click="dialogVisible=false">
          <span >关闭</span>
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  reckon
} from "@common/api/business/powerSideOffer/centralizedBidding/index";
import { mapGetters } from "vuex";
import { parseTime, getUnitMapByModelCode, getUnitMap } from "@common/utils/index";
import { initLayoutInfo } from "@common/utils/init";
export default {
  name: "result",
  props: {
    schemeInfo: { type: Object },
    announcementInfo: { type: Object },
    orgInfo: {
      type: Object
    },
    unitMaps:{
      type:Object
    }
  },
  data() {
    return {
      tableKey:"0",
      layoutInfo: {},
      calculationInfoData: {},
      announcementInfoData: {},
      tableList:{
       columnName:[
          {"id":"指标项"},
          {"id":"交易单元A"},
          {"id":"交易单元B"}
        ],
         data:[
          {"指标项":"预测出清价","交易单元A":"-40","交易单元B":"-40",state:"input"},
          {"指标项":"申报电量","交易单元A":"-40","交易单元B":"-40",state:"txt"},
          {"指标项":"预测成交电量","交易单元A":"-40","交易单元B":"-40",state:"input"},
          {"指标项":"批复电价","交易单元A":"-40","交易单元B":"-40",state:"txt"}
        ]

      },
      listLoading: false,
      dialogVisible: false,
      mainData:{
        totalElectricity:{ //总电量
          data:"46000",
          msg:"下浮20%",
          state:"down",
        },
        fuelCost:{ //燃料成本
          data:"184",
          msg:"上浮8%",
          state:"up",
        }, 
        marginalRevenue:{  //边际收益
          data:"348.4",
          msg:"下浮20%",
          state:"down",
        }, 
        electricityPrice:{  //综合平均电价
          data:"258.5",
          msg:"",
           state:"",
        }, 
        unitContributionMargin:{  //单位边际收益
          data:"74.5",
          msg:"",
           state:"",
        }, 
        income:{  //收入
          data:"1189.4",
          msg:"",
           state:"",
        }
      },

      unitMap: {},
      subMenus: this.allSubMenus
    };
  },
  watch: {
    announcementInfo(val) {
      this.announcementInfoData = val;
    },
    allSubMenus: {
      handler(newVal, oldVal) {
        this.subMenus = newVal;
        this.initUnits();
      },
      immediate: true,
      deep: true
    },
    unitMaps(newVal,oldVal){
      this.unitMap = newVal;
    }
  },
  created() {
    this.initUnits();
  },
  mounted() {
    const that = this;
    this.layoutInfo = initLayoutInfo();
    window.onresize = function temp() {
      that.layoutInfo = initLayoutInfo();
    };
  },
  computed: {
    ...mapGetters(["elements", "allSubMenus"])
  },
  methods: {
    initUnits() {
      if (sessionStorage.getItem("modelCode") == "dashboard") {
        // this.unitMap = getUnitMapByModelCode(
        //   this.subMenus,
        //   this.unitMap,
        //   "sellinLlistingTransaction"
        // );
        // #3010 2019-12-10 张亮三 修改首页单位不显示问题
        this.unitMap = this.unitMaps;
      } else {
        this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
      }
    },
    //设置信息
    setInfo(data){
      this.mainData=data.mainData;
       this.tableList=data.tableList;

    },
    //效益测算
    reckon() {
       reckon(parma) .then(res => {
         if(res.rel){

         }else{

         }
        })
    },
    //显示窗口
    showDialog(){
      this.dialogVisible=true;

    },
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
.title-1,.title-2,.title-3,.title-4,.title-5,.title-6 {
  font-size: 20px;
  height: 45px;
color:#fff;
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
.number-font-style{font-size: 20px;
    font-weight: 700;}
    .el-input-number {
    line-height: 26px;
}
</style>





