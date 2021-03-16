<template>
  <div class="app-container calendar-list-container">
    <!-- 弹窗 -->

    <div>
      <div class="f-mt10" style="position:relative; z-index:10;">
        <el-row>
          <el-col :span="24">
            <el-button
              :loading="beginCalculation"
              class="filter-item"
              type="primary"
              @click="reckon"
              >开始计算</el-button
            >
            <div class="txt-right unit-info">
              单位:{{units.priceUnit}},{{units.electricityUnit}},{{units.amountUnit}}
            </div>
          </el-col>
        </el-row>
        <!-- <el-table
            :key="tableKey"
            :data="tableList.data"
            border
            fit
            highlight-current-row
            style="width: 100%;"
          >
            <el-table-column
              v-for="(item) in tableList.columnName"
              :key="item.id"
              sortable
              :label="item.label"
              border
              show-overflow-tooltip
              align="center"
            >
              <template slot-scope="scope">
                <span v-if="item.id=='zbx'">{{scope.row[item.id]}}</span>
                <span v-else>
                  <span v-if="scope.row.state=='input'">
                    <el-input-number v-model="scope.row[item.id]"></el-input-number>
                  </span>
                  <span v-else>
                    {{scope.row[item.id]}}
                  </span>
                </span>
              </template>
            </el-table-column>
          </el-table> -->

        <el-table
          :key="tableKey"
          :data="tableList.data"
          border
          fit
          highlight-current-row
          style="width: 100%;"
        >
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
         <el-row>
            <el-col :span="24">
              <el-button
                class="filter-item"
                type="primary"
                @click="clickDetail"
              >详情</el-button>

            </el-col>
          </el-row>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <!-- <el-button style="margin-right:1px" class="cancel-btn" @click="close()">
        <span>关闭</span>
      </el-button> -->
    </div>

    <el-dialog v-drag :close-on-click-modal="false"
      width="1000px"
      title="客户费用明细"
      append-to-body 
      :visible.sync="dialogTableVisible"
    >
      <el-table v-loading.body="listLoading" :data="gridData">
        <el-table-column align="center" label="客户名称">
          <template slot-scope="scope">
            <span>{{ scope.row.customerName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="合同编号">
          <template slot-scope="scope">
            <span>{{ scope.row.contractCode }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="'合同竞价电量('+units.electricityUnit+')'">
          <template slot-scope="scope">
            <span>{{ scope.row.monthBidElectric }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="'预计出清价('+units.priceUnit+')'">
          <template slot-scope="scope">
            <span>{{ scope.row.expectedClearancePrice }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="'保低电价('+units.priceUnit+')'">
          <template slot-scope="scope">
            <span>{{ scope.row.bottomElectricPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="'超出电价('+units.priceUnit+')'">
          <template slot-scope="scope">
            <span>{{ scope.row.beyondPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="客户分成比例(%)">
          <template slot-scope="scope">
            <span>{{ scope.row.customerProportion }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="总降价费用">
          <template slot-scope="scope">
            <span>{{ scope.row.customerContractElectricity }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-btn" @click="dialogTableVisible = false">
          <span>关闭</span>
        </el-button>
      </div>
    </el-dialog>
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
      dataInfoStatus: {},
      gridData: [],
      dialogTableVisible: false,
      beginCalculation: false,
      options11: [],
      rowInfo: "",
      value: "",
      tableKey: "0",
      layoutInfo: {},
      calculationInfoData: {},
      announcementInfoData: {},
      tableList: {},
      listLoading: false,
      dialogVisible: false,

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
    close() {
      this.$emit("close");
    },
    init(data, schemeNameCode) {
     let parme={schemeIds:""};
      this.sdtableList.forEach(element => {
       parme.schemeIds += element.schemeId+",";
      });
      

      if (data.tradeWayCode == "jyfs02") {
        getTotalSdCentralizedBiddingEstimating(parme).then(res => {
          this.back(res);
        });
      } else if (data.tradeWayCode == "jyfs01") {
        getTotalSdBilateralNegotiationEstimating(parme).then(res => {
          this.back(res);
        });
      }
    },
    back(res) {
      if (res.rel) {
        this.tableList.columnName = res.data.columnName;
        this.tableList.data = res.data.indexStatistics;
        this.gridData = res.data.detailsVO;
      } else {
        this.$notify({
          title: "失败",
          message: res.msg,
          type: "warning",
          duration: 2000
        });
      }
    },
    //设置信息
    setInfo(data) {
      this.mainData = data.mainData;
      this.tableList = data.tableList;
    },
    //效益测算
    reckon() {
      this.beginCalculation = true;
      let dataJson = {};
      this.tableList.data.forEach((item2, index) => {
        if (item2.state == "input") {
          dataJson[item2.code] = [];
          for (let key in item2) {
            this.tableList.columnName.forEach((item, index) => {
              if (item.id == key && key != "indicators") {
                dataJson[item2.code].push({
                  id: item.prop,
                  val: item2[key] + ""
                });
              }
            });
          }
        }
      });
        let par1;
      let par2;
      if (typeof dataJson.companyOperatingCost!="undefined") {
          par1 = dataJson.companyOperatingCost[0].val;
      }
      if (typeof dataJson.expectedClearancePrice!="undefined") {
          par2 = dataJson.expectedClearancePrice[0].val;
         }
     
      let parme = {
        schemeIds:"",
        schemeNameCode: this.dataInfoStatus.schemeNameCode,
        expectedClearancePrice: par2,
        companyOperatingCosts: par1
      };
       this.sdtableList.forEach(element => {
       parme.schemeIds += element.schemeId+",";
      });

      // for (let key in dataJson) {
      //   parme[key] = dataJson[key];
      // }
      // if (typeof parme.unitFuelCost != "undefined") {
      //   parme.unitFuelCost.forEach(item => {
      //     if (typeof item["val"] == "undefined") {
      //       delete parme["unitFuelCost"];
      //     } else {
      //       if (item["val"] == "undefined") {
      //         delete parme["unitFuelCost"];
      //       }
      //     }
      //   });
      // }
        if (this.rowInfo.tradeWayCode == "jyfs02") {
        getTotalSdCentralizedBiddingEstimating(parme).then(res => {
          this.back1(res);
        });
      } else if (this.rowInfo.tradeWayCode == "jyfs01") {
        getTotalSdBilateralNegotiationEstimating(parme).then(res => {
          this.back1(res);
        });
      }
    },
    back1(res) {
      if (res.rel) {
        this.beginCalculation = false;
        this.tableList.columnName = res.data.columnName;
        this.tableList.data = res.data.indexStatistics;
        this.gridData = res.data.detailsVO;
        this.$notify({
          title: "成功",
          message: "计算成功",
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
    },
    clickDetail() {
      if (JSON.stringify(this.gridData) == "{}") {
        this.$confirm("暂无详情", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
      } else {
        this.dialogTableVisible = true;
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
