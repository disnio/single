<template>
  <div class="app-container calendar-list-container">
    <!-- 弹窗 -->
    <el-dialog v-drag :close-on-click-modal="false"
    
      custom-class="w1000"
      title="方案效益测算"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
    >
      <div>

        <div
          class="f-mt10"
         
        >
          <el-row>
            <el-col :span="24">
              <el-button
                :loading="beginCalculation"
                class="filter-item"
                type="primary"
                @click="reckon"
              >开始计算</el-button>
              <div
                class="txt-right unit-info"
              >单位:{{unitMap.priceUnit}},{{unitMap.electricityUnit}},{{unitMap.amountUnit}}</div>
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
              v-for="(item) in tableList.columnName"
              :key="item.id"
              :label="item.label"
              border
              show-overflow-tooltip
              align="center"
            >
              <template slot-scope="scope">
                <span v-if="item.id=='indicators'">{{scope.row[item.id]}}</span>
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
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          class="cancel-btn"
          @click="dialogVisible=false"
        >
          <span>关闭</span>
        </el-button>
      </div>
    </el-dialog>

    <el-dialog v-drag :close-on-click-modal="false"
      width="1000px"
      title="客户费用明细"
      :visible.sync="dialogTableVisible"
    >
      <div class="txt-right unit-info">单位：{{unitMap.electricityUnit}}、{{unitMap.priceUnit}}</div>
      <el-table
        v-loading.body="listLoading"
        :data="gridData"
      >
        <el-table-column
          align="center"
          label="客户名称"
        >
          <template slot-scope='scope'>
            <span>{{scope.row.customerName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="合同编号"
        >
          <template slot-scope='scope'>
            <span>{{scope.row.contractCode}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="合同竞价电量"
        >
          <template slot-scope='scope'>
            <span>{{scope.row.monthBidElectric}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="预计出清价"
        >
          <template slot-scope='scope'>
            <span>{{scope.row.expectedClearancePrice}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="保低电价"
        >
          <template slot-scope='scope'>
            <span>{{scope.row.bottomElectricPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="超出电价"
        >
          <template slot-scope='scope'>
            <span>{{scope.row.beyondPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="客户分成比例(%)"
        >
          <template slot-scope='scope'>
            <span>{{scope.row.customerProportion}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="总降价费用"
        >
          <template slot-scope='scope'>
            <span>{{scope.row.customerContractElectricity}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          class="cancel-btn"
          @click="dialogTableVisible=false"
        >
          <span>关闭</span>
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { sdBenefitCalculationObj } from "@common/api/business/solutionBenefitCalculation/index";
// import { reckon } from "@common/api/business/powerSideOffer/centralizedBidding/index";
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
      dataInfoStatus: {},
      gridData: [],
      dialogTableVisible: false,
      beginCalculation: false,
      options11: [],
      value: "",
      tableKey: "0",
      layoutInfo: {},
      calculationInfoData: {},
      announcementInfoData: {},
      tableList: {
        // columnName: [
        //   { id: "zbx", label: "指标项" },
        //   { id: "zbz", label: "指标值" }
        // ],
        // data: [
        //   {
        //     zbx: "申报电量（千千瓦时）",
        //     zbz: "20000",
        //     state: "txt"
        //   },
        //   {
        //     zbx: "预计出清价（元/千千瓦时）",
        //     zbz: "298",
        //     state: "input"
        //   },
        //   {
        //     zbx: "预计成交电量（千千瓦时）",
        //     zbz: "-40",
        //     state: "txt"
        //   },
        //   {
        //     zbx: "预计采购节省电费(万元)",
        //     zbz: "258",
        //     state: "txt"
        //   },
        //   {
        //     zbx: "预计客户合约降价电费（万元）",
        //     zbz: "180",
        //     state: "txt"
        //   },
        //   {
        //     zbx: "公司运营成本（万元）",
        //     zbz: "78",
        //     state: "input"
        //   },
        //   {
        //     zbx: "边际收益（万元）",
        //     zbz: "156",
        //     state: "txt"
        //   }
        // ]
      },
      listLoading: false,
      dialogVisible: false,
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
    ...mapGetters(["elements", "allSubMenus","orgId"])
  },
  methods: {
    initUnits() {
      if (sessionStorage.getItem("modelCode") == "dashboard") {
        // this.unitMap = getUnitMapByModelCode(
        //   this.subMenus,
        //   this.unitMap,
        //   "sdCentralizedBidding"
        // );
        // #3010 2019-12-10 张亮三 修改首页单位不显示问题
        this.unitMap = this.unitMaps;
      } else {
        this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
      }
    },
    init(data, schemeNameCode) {
      let parme = {
        schemeId: data.schemeId,
        schemeNameCode: schemeNameCode
      };
      this.dataInfoStatus = parme;
      sdBenefitCalculationObj(parme).then(res => {
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
      });
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
      let par1 = dataJson.companyOperatingCost[0].val;
      let par2 = dataJson.expectedClearancePrice[0].val;
      let parme = {
        schemeId: this.dataInfoStatus.schemeId,
        schemeNameCode: this.dataInfoStatus.schemeNameCode,
        expectedClearancePrice: par2,
        companyOperatingCosts: par1
      };

      sdBenefitCalculationObj(parme).then(res => {
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
      });
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

