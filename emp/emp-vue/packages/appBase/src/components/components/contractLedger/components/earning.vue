<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="合同类型:" placeholder="保底合同">
          <el-input disabled class="ddw1" v-model="sdTemplateName"></el-input>
        </el-form-item>
        <el-form-item
          v-if="proceedInfo.LyydAzdl || proceedInfo.Gdfwf"
          label="总电量:"
        >
          <el-input
            :disabled="state"
            class="ddw1"
            type="number"
            step="“0.0001”"
            style="width: 300px;"
            @mousewheel.native.prevent
            v-model="htContract.totalElectricity"
          >
            <template slot="append">{{ unitMap.electricityUnit }}</template>
          </el-input>
        </el-form-item>
        <!-- #3227 添加合同总价字段 start frj 2019-12-23 14:05:24 -->
        <!-- #3391 添加合同总价字段未必填项  阿彪 2019-12-30  -->
        <el-form-item
          v-if="proceedInfo.htzj"
          label="合同总价"
          prop="clausePrice.totalContractElectricityFee"
        >
          <el-input
            :disabled="state"
            class="ddw1"
            type="number"
            step="“0.0001”"
            @mousewheel.native.prevent
            v-model="clausePrice.totalContractElectricityFee"
          >
            <template slot="append">{{ unitMap.amountUnit }}</template>
          </el-input>
        </el-form-item>
        <!-- #3227 添加合同总价字段 end frj 2019-12-23 14:05:24 -->
        <!-- #3227 年度加权电价 start frj 2019-12-23 14:05:24 -->
        <!-- #3391 添加年度加权电价字段未必填项 阿彪 2019-12-30  -->
        <el-form-item
          v-if="proceedInfo.ndjqdj"
          label="年度加权电价"
          prop="clausePrice.annualWeightedPrice"
        >
          <el-input
            :disabled="state"
            class="ddw1"
            type="number"
            step="“0.0001”"
            @mousewheel.native.prevent
            v-model="clausePrice.annualWeightedPrice"
          >
            <template slot="append">{{ unitMap.priceUnit }}</template>
          </el-input>
        </el-form-item>
        <!-- #3227 年度加权电价 end frj 2019-12-23 14:05:24 -->
      </el-col>
      <el-col :span="12">
        <!-- #3927  秦侯珍 在售电合同类型下新增‘固定服务费’类型；收益方式增加付款周期、固定服务费字段-->
        <el-form-item label="付款周期:" v-if="proceedInfo.Gdfwf">
          <el-select
            v-model="clausePrice.htPaymentPeriod"
            placeholder="请选择"
            :disabled="state"
            style="height: 30px"
          >
            <el-option
              v-for="item in fkzq"
              :key="item.propCode"
              :label="item.propName"
              :value="item.propCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="固定服务费:" v-if="proceedInfo.Gdfwf">
          <el-input
            class="ddw1"
            :disabled="state"
            v-model="clausePrice.fixedServiceFee"
          >
            <template slot="append">{{ unitMap.amountUnit }}</template>
          </el-input>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <!-- #3160  郑文杰 合同管理--合同台账管理--优化 在合同台账中增加“合同定价方式”字段，此字段为必填项。-->
        <el-form-item
          label="合同定价方式"
          v-if="!proceedInfo.Gdfwf"
          prop="htContract.contractPriceWay"
        >
          <el-select
            v-model="htContract.contractPriceWay"
            :disabled="state"
            @change="switchRule"
            class="ddw1"
          >
            <el-option
              v-for="item in bjfs"
              :key="item.propCode"
              :label="item.propName"
              :value="item.propCode"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <!--#3229 start 新增标杆电价字段 frj 2019-12-23 09:44:10 -->
      <el-col :span="12">
        <el-form-item v-if="proceedInfo.bgdj" label="标杆电价:">
          <el-input
            :disabled="state"
            class="ddw1"
            type="number"
            step="“0.0001”"
            @mousewheel.native.prevent
            v-model="clausePrice.benchmarkElectricityPrice"
          >
            <template slot="append">{{ unitMap.priceUnit }}</template>
          </el-input>
        </el-form-item>
      </el-col>
      <!--#3229 end 新增标杆电价字段 frj 2019-12-23 09:44:10 -->
      <el-col :span="12">
        <el-form-item
          v-if="
            showGovernmentSubsidies.saleContractType === 'sdhtlx08' ||
              showGovernmentSubsidies.saleContractType === 'sdhtlx09'
          "
          label="有无政府性补贴:"
        >
          <el-select
            v-model="clausePrice.sfGovtSubsidies"
            @change="governmentOptionChange"
            placeholder="请选择"
            :disabled="state"
            class="ddw1"
          >
            <el-option
              v-for="item in governmentOption"
              :key="item.propCode"
              :label="item.propName"
              :value="item.propCode"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <!--#4061 start 在‘标准固定降价含分成’、‘长协+竞价让利分成’合同台账-收益方式下新增：有无政府性补贴、输配价差归公司、政府性补贴归公司 qinhz 2020-05-25 16:44:10 -->
    <el-row
      v-if="
        showGovernmentSubsidies.saleContractType === 'sdhtlx08' ||
          showGovernmentSubsidies.saleContractType === 'sdhtlx09'
      "
    >
      <el-col :span="12">
        <el-form-item label="输配价差归公司:">
          <el-input
            :disabled="state"
            class="ddw1"
            type="number"
            step="“0.0001”"
            @mousewheel.native.prevent
            v-model="clausePrice.spjcPriceDifference"
          >
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="政府性补贴归公司:">
          <el-input
            :disabled="state || noSubsidy"
            style="width: 200px"
            type="number"
            step="“0.0001”"
            @mousewheel.native.prevent
            v-model="clausePrice.ppnGovtSubsidies"
          >
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <!--#4061 end 在‘标准固定降价含分成’、‘长协+竞价让利分成’合同台账-收益方式下新增：有无政府性补贴、输配价差归公司、政府性补贴归公司 qinhz 2020-05-25 16:44:10 -->
    <div v-if="proceedInfo.gdjj">
      <div>固定降价</div>
      <el-row :gutter="10">
        <el-col :span="16">
          <el-form-item label="年度双边电量:">
            <el-input
              :disabled="state"
              class="ddw1"
              type="number"
              step="“0.0001”"
              style="width: 240px;"
              @mousewheel.native.prevent
              @blur="setTotalElectricity"
              v-model="clausePrice.yearBilateElectric"
            >
              <template slot="append">{{ unitMap.electricityUnit }}</template>
            </el-input>

            <el-button
              class="filter-item"
              type="primary"
              :disabled="state"
              @click="share('yearBilateElectric')"
              >分摊
            </el-button>
            <span style="padding-left:10px;" v-if="shareYear">（已分摊）</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="固定降价/保底电价:">
            <el-input
              :disabled="state"
              class="ddw1"
              type="number"
              step="“0.0001”"
              @mousewheel.native.prevent
              v-model="clausePrice.fixDeprice"
            >
              <template slot="append">{{ unitMap.priceUnit }}</template>
            </el-input>
          </el-form-item>
        </el-col>
        <!--固定降价/保底电价(大写)-->
        <el-col :span="12">
          <el-form-item label="固定降价/保底电价(大写):" label-width="190px">
            <el-input
              :disabled="state"
              class="ddw1"
              type="text"
              step="“0.0001”"
              @mousewheel.native.prevent
              v-model="clausePrice.capitalizedFixDeprice"
            >
              <template slot="append">{{ unitMap.priceUnit }}</template>
            </el-input>
          </el-form-item>
        </el-col>
        <!--固定降价/保底电价(大写)-->
      </el-row>
    </div>
    <div v-if="proceedInfo.cxdl">
      <div>长协电量</div>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="年度长协电量:">
            <el-input
              :disabled="state"
              class="ddw1"
              type="number"
              step="“0.0001”"
              style="width: 240px;"
              @mousewheel.native.prevent
              @blur="setTotalElectricity"
              v-model="clausePrice.yearLongtermElectric"
            >
              <template slot="append">{{ unitMap.electricityUnit }}</template>
            </el-input>
            <el-button
              class="filter-item"
              type="primary"
              :disabled="state"
              @click="share('yearLongtermElectric')"
              >分摊
            </el-button>
            <span style="padding-left:10px;" v-if="shareYear">（已分摊）</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="降价/电价:" label-width="100">
            <el-input
              :disabled="state"
              class="ddw1"
              type="number"
              step="“0.0001”"
              style="width:300px"
              @mousewheel.native.prevent
              v-model="clausePrice.fixDeprice"
            >
              <template slot="append">{{ unitMap.priceUnit }}</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="甲方分成比例:">
            <el-input
              :disabled="state"
              class="ddw1"
              type="number"
              step="“0.0001”"
              @mousewheel.native.prevent
              v-model="clausePrice.proportion"
            >
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <div v-if="proceedInfo.yjdl">
      <div>月竞电量</div>
      <el-row :gutter="10">
        <el-col :span="16">
          <el-form-item label="月度竞价电量:">
            <el-input
              :disabled="state"
              class="ddw1"
              type="number"
              step="“0.0001”"
              style="width: 240px;"
              @mousewheel.native.prevent
              @blur="setTotalElectricity"
              v-model="clausePrice.monthBidElectric"
            >
              <template slot="append">{{ unitMap.electricityUnit }}</template>
            </el-input>
            <el-button
              class="filter-item"
              type="primary"
              :disabled="state"
              @click="share('monthBidElectric')"
              >分摊
            </el-button>
            <span style="padding-left:10px;" v-if="shareMonth">（已分摊）</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="降价/电价:" label-width="100">
            <el-input
              :disabled="state"
              class="ddw1"
              type="number"
              step="“0.0001”"
              style="width:300px"
              @mousewheel.native.prevent
              v-model="clausePrice.bottomElectricPrice"
            >
              <template slot="append">{{ unitMap.priceUnit }}</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="甲方分成比例:">
            <el-input
              :disabled="state"
              class="ddw1"
              type="number"
              step="“0.0001”"
              @mousewheel.native.prevent
              v-model="clausePrice.customerProportion"
            >
              <template slot="append">%</template></el-input
            >
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <div v-if="proceedInfo.jjcf">
      <div>竞价分成</div>
      <el-row :gutter="10">
        <el-col :span="16">
          <el-form-item label="月度竞价电量:">
            <el-input
              :disabled="state"
              class="ddw1"
              type="number"
              step="“0.0001”"
              style="width: 240px;"
              @mousewheel.native.prevent
              @blur="setTotalElectricity"
              v-model="clausePrice.monthBidElectric"
            >
              <template slot="append">{{ unitMap.electricityUnit }}</template>
            </el-input>
            <el-button
              class="filter-item"
              type="primary"
              :disabled="state"
              @click="share('monthBidElectric')"
              >分摊
            </el-button>
            <span style="padding-left:10px;" v-if="shareMonth">（已分摊）</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="甲方分成比例:">
            <el-input
              :disabled="state"
              class="ddw1"
              type="number"
              step="“0.0001”"
              @mousewheel.native.prevent
              v-model="clausePrice.customerProportion"
              ><template slot="append">%</template></el-input
            >
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <div v-if="proceedInfo.jjbdfc">
      <div>竞价保底分成</div>
      <el-row :gutter="10">
        <el-col :span="16">
          <el-form-item label="月度竞价电量:">
            <el-input
              :disabled="state"
              class="ddw1"
              type="number"
              step="“0.0001”"
              style="width: 240px;"
              @mousewheel.native.prevent
              @blur="setTotalElectricity"
              v-model="clausePrice.monthBidElectric"
            >
              <template slot="append">{{ unitMap.electricityUnit }}</template>
            </el-input>
            <el-button
              class="filter-item"
              type="primary"
              :disabled="state"
              @click="share('monthBidElectric')"
              >分摊
            </el-button>
            <span style="padding-left:10px;" v-if="shareMonth">（已分摊）</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="甲方分成比例:">
            <el-input
              :disabled="state"
              class="ddw1"
              type="number"
              step="“0.0001”"
              @mousewheel.native.prevent
              v-model="clausePrice.customerProportion"
              ><template slot="append">%</template></el-input
            >
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="保底降价/电价:">
            <el-input
              :disabled="state"
              class="ddw1"
              type="number"
              step="“0.0001”"
              @mousewheel.native.prevent
              v-model="clausePrice.bottomElectricPrice"
            >
              <template slot="append">{{ unitMap.priceUnit }}</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <div v-if="proceedInfo.fwf">
      <div>服务费</div>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="年度竞价电量:"
            prop="clausePrice.yearBidElectric"
          >
            <el-input
              :disabled="state"
              class="ddw1"
              type="number"
              step="“0.0001”"
              style="width: 240px;"
              @mousewheel.native.prevent
              @blur="setTotalElectricity"
              v-model="clausePrice.yearBidElectric"
            >
              <template slot="append">{{ unitMap.electricityUnit }}</template>
            </el-input>
            <el-button
              class="filter-item"
              type="primary"
              :disabled="state"
              @click="share('yearBidElectric')"
              >分摊
            </el-button>
            <span style="padding-left:10px;" v-if="shareYear">（已分摊）</span>
          </el-form-item>
          <div v-if="proceedInfo.fwhthfc">
            <el-form-item label="年度双边电量:">
              <el-input
                :disabled="state"
                class="ddw1"
                type="number"
                step="“0.0001”"
                style="width: 240px;"
                @mousewheel.native.prevent
                @blur="setTotalElectricity"
                v-model="clausePrice.yearBilateElectric"
              >
                <template slot="append">{{ unitMap.electricityUnit }}</template>
              </el-input>
              <el-button
                class="filter-item"
                type="primary"
                :disabled="state"
                @click="share('yearBilateElectric')"
                >分摊
              </el-button>
              <span style="padding-left:10px;" v-if="shareYear"
                >（已分摊）</span
              >
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <el-form-item label="度电费用:" prop="clausePrice.kwhCost">
            <el-input
              :disabled="state"
              class="ddw1"
              type="number"
              step="“0.0001”"
              @mousewheel.native.prevent
              v-model="clausePrice.kwhCost"
            >
              <template slot="append">{{ unitMap.priceUnit }}</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div v-if="proceedInfo.fwhthfc">
        <div>分成</div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="甲方分成比例:">
              <el-input
                :disabled="state"
                class="ddw1"
                type="number"
                step="“0.0001”"
                @mousewheel.native.prevent
                @change="calculatePercentageJF"
                v-model="clausePrice.customerProportion"
                ><template slot="append">%</template></el-input
              >
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方分成比例:">
              <el-input
                :disabled="state"
                class="ddw1"
                type="number"
                step="“0.0001”"
                @mousewheel.native.prevent
                @change="calculatePercentageYF"
                v-model="clausePrice.secondPartProportion"
              >
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </div>
    <!--  2019-11-15 #2648 滕超 收益方式增加字段 start-->
    <el-row :gutter="10">
      <el-col :span="24">
        <el-form-item v-if="proceedInfo.LyydAzdl" label="另有约定：">
          <el-input
            :disabled="state"
            type="textarea"
            rows="5"
            resize="none"
            v-model="clausePrice.otherwiseAgree"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <!--  2019-11-15 #2648 滕超 收益方式增加字段 end-->
  </div>
</template>

<script>
// 收益方式
export default {
  name: 'earning',
  props: {
    sdTemplateName: String,
    unitMap: Object,
    proceedInfo: Object,
    ht: Object,
    cPrice: Object,
    clausePlanSource: Object,
    showGovernmentSubsidies: Object,
    governmentOption: Array,
    fkzq: Array,
    bjfs: Array,
    months: Array,
    noSubsidy: Boolean,
    state: Boolean,
    shareYear: Boolean,
    shareMonth: Boolean,
  },
  watch: {
    ht: {
      immediate: true,
      handler(n, o) {
        if (!_.isEqual(n, this.htContract)) {
          this.htContract = { ...n };
          console.log('new ht:', this.htContract);
        }
      },
      deep: true,
    },
    htContract: {
      deep: true,
      handler(n) {
        this.$emit('change:ht', n);
      },
    },
    cPrice: {
      immediate: true,
      handler(n, o) {
        if (!_.isEqual(n, this.clausePrice)) {
          this.clausePrice = { ...n };
          console.log('new clause:', this.clausePrice);
        }
      },
      deep: true,
    },
    clausePrice: {
      deep: true,
      handler(n) {
        this.$emit('change:cprice', n);
      },
    },
    clausePlanSource: {
      immediate: true,
      handler(n, o) {
        if (!_.isEqual(n, this.clausePlan)) {
          this.clausePlan = { ...n };
        }
      },
      deep: true,
    },
    clausePlan: {
      deep: true,
      handler(n, o) {
        this.$emit('change:cplan', n);
      },
    },
  },
  data() {
    return {
      htContract: {},
      clausePrice: {},
      clausePlan: {},
    };
  },
  methods: {
    // 改变乙方分成比例，自动填充甲方分成比例
    calculatePercentageYF() {
      this.clausePrice.customerProportion =
        100 - this.clausePrice.secondPartProportion;
    },
    // 改变甲方分成比例，改变乙方分成比例
    calculatePercentageJF() {
      this.clausePrice.secondPartProportion =
        100 - this.clausePrice.customerProportion;
    },

    //分摊，todo 年度用电计划
    share(type) {
      console.log('share:', type);
      // 年度双边电量
      if (type === 'yearBilateElectric') {
        this.$emit('shareYear', true);
        let yearBilateElectric = parseFloat(
          this.clausePrice.yearBilateElectric / 12
        ).toFixed(4);

        for (let i = 0; i < 11; i++) {
          this.$set(
            this.clausePlan,
            this.months[i] + 'YearBilateElectric',
            yearBilateElectric
          );
        }

        if (yearBilateElectric * 12 !== this.clausePrice.yearBilateElectric) {
          let electric = parseFloat(
            this.clausePrice.yearBilateElectric - yearBilateElectric * 11
          ).toFixed(4);
          this.$set(
            this.clausePlan,
            this.months[11] + 'YearBilateElectric',
            electric
          );
        } else {
          this.$set(
            this.clausePlan,
            this.months[11] + 'YearBilateElectric',
            yearBilateElectric
          );
        }
      } else if (type === 'yearLongtermElectric') {
        this.$emit('shareYear', true);
        // todo 年度长协电量
        let yearLongtermElectric = parseFloat(
          this.clausePrice.yearLongtermElectric / 12
        ).toFixed(4);

        for (let i = 0; i < 11; i++) {
          this.$set(
            this.clausePlan,
            this.months[i] + 'YearLongtermElectric',
            yearLongtermElectric
          );
        }

        if (
          yearLongtermElectric * 12 !==
          this.clausePrice.yearLongtermElectric
        ) {
          let electric = parseFloat(
            this.clausePrice.yearLongtermElectric - yearLongtermElectric * 11
          ).toFixed(4);
          this.$set(
            this.clausePlan,
            this.months[11] + 'YearLongtermElectric',
            electric
          );
        } else {
          this.$set(
            this.clausePlan,
            this.months[11] + 'YearLongtermElectric',
            yearLongtermElectric
          );
        }
      } else if (type === 'monthBidElectric') {
        this.$emit('shareMonth', true);
        let electricityTrade = parseFloat(
          this.clausePrice.monthBidElectric / 12
        ).toFixed(4);
        for (let i = 0; i < 11; i++) {
          this.$set(
            this.clausePlan,
            this.months[i] + 'ElectricityTrade',
            electricityTrade
          );
        }
        if (electricityTrade * 12 !== this.clausePrice.monthBidElectric) {
          let electric = parseFloat(
            this.clausePrice.monthBidElectric - electricityTrade * 11
          ).toFixed(4);
          this.$set(
            this.clausePlan,
            this.months[11] + 'ElectricityTrade',
            electric
          );
        } else {
          this.$set(
            this.clausePlan,
            this.months[11] + 'ElectricityTrade',
            electricityTrade
          );
        }
      } else if (type === 'yearBidElectric') {
        this.$emit('shareYear', true);

        let electricityTrade = parseFloat(
          this.clausePrice.yearBidElectric / 12
        ).toFixed(4);
        for (let i = 0; i < 11; i++) {
          this.$set(
            this.clausePlan,
            this.months[i] + 'ElectricityTrade',
            electricityTrade
          );
        }

        if (electricityTrade * 12 !== this.clausePrice.yearBidElectric) {
          let electric = parseFloat(
            this.clausePrice.yearBidElectric - electricityTrade * 11
          ).toFixed(4);
          this.$set(
            this.clausePlan,
            this.months[11] + 'ElectricityTrade',
            electric
          );
        } else {
          this.$set(
            this.clausePlan,
            this.months[11] + 'ElectricityTrade',
            electricityTrade
          );
        }
      } else {
        this.$emit('shareYear', true);

        let yearBilateElectric = parseFloat(
          this.clausePrice.monthBidElectric / 12
        ).toFixed(4);
        for (let i = 0; i < 11; i++) {
          this.$set(
            this.clausePlan,
            this.months[i] + 'YearBilateElectric',
            yearBilateElectric
          );
        }
        if (yearBilateElectric * 12 !== this.clausePrice.monthBidElectric) {
          let electric = parseFloat(
            this.clausePrice.monthBidElectric - yearBilateElectric * 11
          ).toFixed(4);
          this.$set(
            this.clausePlan,
            this.months[11] + 'YearBilateElectric',
            electric
          );
        } else {
          this.$set(
            this.clausePlan,
            this.months[11] + 'YearBilateElectric',
            yearBilateElectric
          );
        }
      }
    },

    //计算总电量
    setTotalElectricity() {
      if (
        this.proceedInfo.monthBidElectric &&
        this.proceedInfo.yearLongtermElectric
      ) {
        this.htContract.totalElectricity =
          Number(this.clausePrice.yearLongtermElectric) +
          Number(this.clausePrice.monthBidElectric);
      }
      
      if (
        this.proceedInfo.monthBidElectric &&
        this.proceedInfo.yearBilateElectric
      ) {
        this.htContract.totalElectricity =
          Number(this.clausePrice.yearBilateElectric) +
          Number(this.clausePrice.monthBidElectric);
      }

      if (this.proceedInfo.fwhthfc) {
        this.htContract.totalElectricity =
          Number(this.clausePrice.yearBilateElectric) +
          Number(this.clausePrice.yearBidElectric);
      }

     

      if (this.proceedInfo.monthBidElectric) {
        this.htContract.totalElectricity = Number(
          this.clausePrice.monthBidElectric
        );
      }

      if (this.proceedInfo.yearLongtermElectric) {
        this.htContract.totalElectricity = Number(
          this.clausePrice.yearLongtermElectric
        );
      }

      if (this.proceedInfo.yearBidElectric && !this.proceedInfo.fwhthfc) {
        this.htContract.totalElectricity = Number(
          this.clausePrice.yearBidElectric
        );
      }

       if(this.clausePrice.yearBilateElectric || this.clausePrice.monthBidElectric){
          this.htContract.totalElectricity =
          Number(this.clausePrice.yearBilateElectric) +
          Number(this.clausePrice.monthBidElectric);
      }
      
      console.log('in setTotalElectricity ', this.htContract.totalElectricity);
    },

    switchRule(val) {
      this.$emit('change:swich', val);
    },

    //当‘有无政府性补贴’选择‘无’ 时： ‘政府性补贴归公司’文本框置灰不可编辑，如之前有数据则清除
    governmentOptionChange(val) {
      if (val === 'yw02') {
        this.noSubsidy = true;
        this.clausePrice.ppnGovtSubsidies = '';
      } else {
        this.noSubsidy = false;
      }
    },
  },
};
</script>

<style scoped></style>
