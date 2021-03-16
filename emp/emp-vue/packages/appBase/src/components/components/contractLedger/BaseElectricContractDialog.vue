<!--
 * @功能描述:
 * @版本:
 * @作者: 张朋
 * @Date: 2020-01-16 10:50:29
 * @最新修改内容: 基数电合同
 * @LastEditTime: 2020-12-23 16:55:28
 -->
<template>
  <div class="app-container calendar-list-container">
    <!-- 弹窗 -->
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      :title="dialogTitle"
      :visible.sync="addDialogVisible"
      custom-class="w1000"
      v-loading="formLoading"
      :before-close="handleClose"
      append-to-body
    >
      <!-- 弹出form -->
      <div :style="{ paddingRight: '10px', height: dialogHeight + 'px' }">
        <el-scrollbar>
          <div class="altdiv">
            <el-form
              ref="contractLedgerForm"
              :model="contractLedgerForm"
              label-width="150px"
              novalidate
              :rules="contractLedgerFormRules"
            >
              <div>
                <el-collapse v-model="activeNames">
                  <el-collapse-item
                    title="基本信息"
                    name="1"
                    style="margin-left:10px"
                  >
                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item
                          label="合同编码:"
                          prop="htContract.contractCode"
                        >
                          <el-input
                            disabled
                            v-model="contractLedgerForm.htContract.contractCode"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="合同编号:"
                          prop="htContract.contractNumber"
                        >
                          <el-input
                            :disabled="state"
                            v-model="
                              contractLedgerForm.htContract.contractNumber
                            "
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item
                          label="合同签订日期："
                          prop="htContract.signingDate"
                        >
                          <el-date-picker
                            v-model="contractLedgerForm.htContract.signingDate"
                            type="date"
                            placeholder="日期选择"
                            :disabled="state"
                            style="width:100%;"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="合同名称:"
                          prop="htContract.contractName"
                        >
                          <el-input
                            :disabled="state"
                            v-model="contractLedgerForm.htContract.contractName"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <!--  todo wsc      近3年平均用电量             -->
                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item
                          label="上一年用电量:"
                          prop="htContract.lastYearElectricConsum"
                        >
                          <el-input
                            :disabled="state"
                            v-model="
                              contractLedgerForm.htContract
                                .lastYearElectricConsum
                            "
                            ><template slot="append"
                              >千千瓦时</template
                            ></el-input
                          >
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="近3年平均用电量:"
                          prop="htContract.threeYearAveElectric"
                        >
                          <el-input
                            :disabled="state"
                            v-model="
                              contractLedgerForm.htContract.threeYearAveElectric
                            "
                            ><template slot="append"
                              >千千瓦时</template
                            ></el-input
                          >
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!--      todo wsc 2010-10-09 是否为关联合同  法务系统合同编码  #6           -->
                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item
                          label="是否为关联交易："
                          prop="htContract.isRelate"
                        >
                          <el-radio-group
                            v-model="contractLedgerForm.htContract.isRelate"
                            :disabled="state"
                          >
                            <el-radio :label="'1'">是</el-radio>
                            <el-radio :label="'0'">否</el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="法务系统合同编码:"
                          prop="htContract.legalContractCode"
                        >
                          <el-input
                            :disabled="true"
                            v-model="
                              contractLedgerForm.htContract.legalContractCode
                            "
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item
                          label="合同生效日期："
                          prop="htContract.beginDate"
                        >
                          <el-date-picker
                            :disabled="state"
                            type="date"
                            placeholder="选择日期"
                            v-model="contractLedgerForm.htContract.beginDate"
                            @change="checkTime()"
                            style="width: 100%;"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          prop="htContract.endDate"
                          label="合同失效日期："
                        >
                          <el-date-picker
                            type="date"
                            :disabled="state"
                            placeholder="选择日期"
                            @change="checkTime()"
                            v-model="contractLedgerForm.htContract.endDate"
                            style="width: 100%;"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item
                          label="售电方（电厂）:"
                          prop="htContract.purchaserCode"
                        >
                          <el-select
                            :disabled="true"
                            style="width:100%;"
                            v-model="
                              contractLedgerForm.htContract.purchaserCode
                            "
                            filterable
                            remote
                            :loading="loading"
                            placeholder="请输入"
                          >
                            <el-option
                              v-for="(item, index) in customerFilterData"
                              :key="index"
                              :label="item.orgName"
                              :value="item.id"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="购电方（电网）:"
                          prop="htContract.customerName"
                        >
                          <el-select
                            :disabled="state"
                            style="width:100%;"
                            v-model="contractLedgerForm.htContract.customerName"
                            :clearable="true"
                            :remote-method="getSupplierCodeInfo"
                            @change="changeGetSupplierCodeInfo"
                            filterable
                            remote
                            :loading="loading"
                          >
                            <el-option
                              v-for="(item, index) in supplierCodeData"
                              :key="index"
                              :label="item.customerName"
                              :value="item.customerId"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item
                          label="签约类型:"
                          prop="htContract.contractSigningType"
                        >
                          <el-select
                            v-model="
                              contractLedgerForm.htContract.contractSigningType
                            "
                            :placeholder="state ? '' : '请选择'"
                            :disabled="state"
                            style="width:100%;"
                          >
                            <el-option
                              v-for="item in optionsA"
                              :key="item.propCode"
                              :label="item.propName"
                              :value="item.propCode"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="合同状态：">
                          <span>{{ dataStatus }}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item label="利用小时:">
                          <el-input
                            :disabled="state"
                            class="ddw1"
                            type="number"
                            @input="utilizationHoursClick"
                            v-model="
                              contractLedgerForm.htContract.utilizationHours
                            "
                          ></el-input>
                          <span>{{ '小时' }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label=" 合同电量:">
                          <el-input
                            class="ddw1"
                            type="number"
                            :disabled="state"
                            @input="utilizationHoursClick"
                            v-model="
                              contractLedgerForm.htContract.contractPower
                            "
                          ></el-input>
                          <span>{{ unitMap.electricityUnit }}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item label="合同总电量:">
                          <el-input
                            disabled
                            class="ddw1"
                            type="number"
                            v-model="
                              contractLedgerForm.htContract.totalElectricity
                            "
                          ></el-input>
                          <span>{{ unitMap.electricityUnit }}</span>
                          <el-button
                            class="filter-item"
                            type="primary"
                            v-if="!state"
                            @click="share('totalElectricity')"
                            >分解
                          </el-button>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="交易名称:"
                          prop="htContract.tradeName"
                        >
                          <el-input
                            :disabled="state"
                            v-model="contractLedgerForm.htContract.tradeName"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="24">
                        <el-form-item label="备注:">
                          <el-input
                            type="textarea"
                            resize="none"
                            :disabled="state"
                            :rows="4"
                            v-model="contractLedgerForm.htContract.remarks"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="附件">
                          <form-file
                            :enclosure="contractLedgerForm.htContract.enclosure"
                            :event="upEvent"
                            :limitNumber="upload.limitNumber"
                            :multiple="upload.multiple"
                            :disabled="upload.disabled"
                          ></form-file>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-collapse-item>
                  <!-- 基本信息 end -->
                  <!-- 用电计划 -->
                  <el-collapse-item
                    title="用电计划"
                    name="2"
                    style="margin-left:10px"
                  >
                    <div class="plannedElectricity">
                      <el-row :gutter="10">
                        <el-col :span="12">
                          <el-row :gutter="10">
                            <el-col :span="6">
                              <el-form-item></el-form-item>
                            </el-col>
                            <el-col :span="16">
                              <div class="txt-center">
                                <span>
                                  计划电量({{ unitMap.electricityUnit }}）
                                </span>
                              </div>
                            </el-col>
                          </el-row>
                        </el-col>
                        <el-col :span="12">
                          <el-row :gutter="10">
                            <el-col :span="6">
                              <el-form-item></el-form-item>
                            </el-col>
                            <el-col :span="12">
                              <div class="txt-center">
                                <span>计划电价({{ unitMap.priceUnit }}）</span>
                              </div>
                            </el-col>
                          </el-row>
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="24">
                          <el-row :gutter="10">
                            <el-col :span="4">
                              <el-form-item
                                label="1月："
                                label-width="120px"
                              ></el-form-item>
                            </el-col>
                            <el-col :span="9">
                              <el-input
                                type="number"
                                @mousewheel.native.prevent
                                :disabled="electricityPlanState"
                                v-model="
                                  contractLedgerForm.clausePlan
                                    .janYearBilateElectric
                                "
                              ></el-input>
                            </el-col>
                            <el-col :span="9">
                              <el-input
                                type="number"
                                @mousewheel.native.prevent
                                :disabled="electricityPlanState"
                                v-model="
                                  contractLedgerForm.clausePlan
                                    .janYearBilateElecPrice
                                "
                              ></el-input>
                            </el-col>
                          </el-row>
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="4">
                          <el-form-item
                            label="2月："
                            label-width="120px"
                          ></el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-input
                            type="number"
                            @mousewheel.native.prevent
                            :disabled="electricityPlanState"
                            v-model="
                              contractLedgerForm.clausePlan
                                .febYearBilateElectric
                            "
                          ></el-input>
                        </el-col>
                        <el-col :span="9">
                          <el-input
                            type="number"
                            @mousewheel.native.prevent
                            :disabled="electricityPlanState"
                            v-model="
                              contractLedgerForm.clausePlan
                                .febYearBilateElecPrice
                            "
                          ></el-input>
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="4">
                          <el-form-item
                            label="3月："
                            label-width="120px"
                          ></el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-input
                            type="number"
                            @mousewheel.native.prevent
                            :disabled="electricityPlanState"
                            v-model="
                              contractLedgerForm.clausePlan
                                .marYearBilateElectric
                            "
                          ></el-input>
                        </el-col>
                        <el-col :span="9">
                          <el-input
                            type="number"
                            @mousewheel.native.prevent
                            :disabled="electricityPlanState"
                            v-model="
                              contractLedgerForm.clausePlan
                                .marYearBilateElecPrice
                            "
                          ></el-input>
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="4">
                          <el-form-item
                            label="4月："
                            label-width="120px"
                          ></el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-input
                            type="number"
                            @mousewheel.native.prevent
                            :disabled="electricityPlanState"
                            v-model="
                              contractLedgerForm.clausePlan
                                .aprYearBilateElectric
                            "
                          ></el-input>
                        </el-col>
                        <el-col :span="9">
                          <el-input
                            type="number"
                            @mousewheel.native.prevent
                            :disabled="electricityPlanState"
                            v-model="
                              contractLedgerForm.clausePlan
                                .aprYearBilateElecPrice
                            "
                          ></el-input>
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="4">
                          <el-form-item
                            label="5月："
                            label-width="120px"
                          ></el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-input
                            type="number"
                            @mousewheel.native.prevent
                            :disabled="electricityPlanState"
                            v-model="
                              contractLedgerForm.clausePlan
                                .mayYearBilateElectric
                            "
                          ></el-input>
                        </el-col>
                        <el-col :span="9">
                          <el-input
                            type="number"
                            @mousewheel.native.prevent
                            :disabled="electricityPlanState"
                            v-model="
                              contractLedgerForm.clausePlan
                                .mayYearBilateElecPrice
                            "
                          ></el-input>
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="4">
                          <el-form-item
                            label="6月："
                            label-width="120px"
                          ></el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-input
                            type="number"
                            @mousewheel.native.prevent
                            :disabled="electricityPlanState"
                            v-model="
                              contractLedgerForm.clausePlan
                                .junYearBilateElectric
                            "
                          ></el-input>
                        </el-col>
                        <el-col :span="9">
                          <el-input
                            type="number"
                            @mousewheel.native.prevent
                            :disabled="electricityPlanState"
                            v-model="
                              contractLedgerForm.clausePlan
                                .junYearBilateElecPrice
                            "
                          ></el-input>
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="4">
                          <el-form-item
                            label="7月："
                            label-width="120px"
                          ></el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-input
                            type="number"
                            @mousewheel.native.prevent
                            :disabled="electricityPlanState"
                            v-model="
                              contractLedgerForm.clausePlan
                                .julYearBilateElectric
                            "
                          ></el-input>
                        </el-col>
                        <el-col :span="9">
                          <el-input
                            type="number"
                            @mousewheel.native.prevent
                            :disabled="electricityPlanState"
                            v-model="
                              contractLedgerForm.clausePlan
                                .julYearBilateElecPrice
                            "
                          ></el-input>
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="4">
                          <el-form-item
                            label="8月："
                            label-width="120px"
                          ></el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-input
                            type="number"
                            @mousewheel.native.prevent
                            :disabled="electricityPlanState"
                            v-model="
                              contractLedgerForm.clausePlan
                                .augYearBilateElectric
                            "
                          ></el-input>
                        </el-col>
                        <el-col :span="9">
                          <el-input
                            type="number"
                            @mousewheel.native.prevent
                            :disabled="electricityPlanState"
                            v-model="
                              contractLedgerForm.clausePlan
                                .augYearBilateElecPrice
                            "
                          ></el-input>
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="4">
                          <el-form-item
                            label="9月："
                            label-width="120px"
                          ></el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-input
                            type="number"
                            @mousewheel.native.prevent
                            :disabled="electricityPlanState"
                            v-model="
                              contractLedgerForm.clausePlan
                                .sepYearBilateElectric
                            "
                          ></el-input>
                        </el-col>
                        <el-col :span="9">
                          <el-input
                            type="number"
                            @mousewheel.native.prevent
                            :disabled="electricityPlanState"
                            v-model="
                              contractLedgerForm.clausePlan
                                .sepYearBilateElecPrice
                            "
                          ></el-input>
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="4">
                          <el-form-item
                            label="10月："
                            label-width="120px"
                          ></el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-input
                            type="number"
                            @mousewheel.native.prevent
                            :disabled="electricityPlanState"
                            v-model="
                              contractLedgerForm.clausePlan
                                .octYearBilateElectric
                            "
                          ></el-input>
                        </el-col>
                        <el-col :span="9">
                          <el-input
                            type="number"
                            @mousewheel.native.prevent
                            :disabled="electricityPlanState"
                            v-model="
                              contractLedgerForm.clausePlan
                                .octYearBilateElecPrice
                            "
                          ></el-input>
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="4">
                          <el-form-item
                            label="11月："
                            label-width="120px"
                          ></el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-input
                            type="number"
                            @mousewheel.native.prevent
                            :disabled="electricityPlanState"
                            v-model="
                              contractLedgerForm.clausePlan
                                .novYearBilateElectric
                            "
                          ></el-input>
                        </el-col>
                        <el-col :span="9">
                          <el-input
                            type="number"
                            @mousewheel.native.prevent
                            :disabled="electricityPlanState"
                            v-model="
                              contractLedgerForm.clausePlan
                                .novYearBilateElecPrice
                            "
                          ></el-input>
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="4">
                          <el-form-item
                            label="12月："
                            label-width="120px"
                          ></el-form-item>
                        </el-col>
                        <el-col :span="9">
                          <el-input
                            type="number"
                            @mousewheel.native.prevent
                            :disabled="electricityPlanState"
                            v-model="
                              contractLedgerForm.clausePlan
                                .decYearBilateElectric
                            "
                          ></el-input>
                        </el-col>
                        <el-col :span="9">
                          <el-input
                            type="number"
                            @mousewheel.native.prevent
                            :disabled="electricityPlanState"
                            v-model="
                              contractLedgerForm.clausePlan
                                .decYearBilateElecPrice
                            "
                          ></el-input>
                        </el-col>
                      </el-row>
                    </div>
                  </el-collapse-item>
                  <!-- 用电计划 end -->

                  <el-collapse-item
                    title="法务系统必填字段"
                    name="9"
                    style="margin-left:10px"
                  >
                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item
                          label="相对方名称:"
                          prop="legal.oppositeName"
                        >
                          <el-input
                            disabled
                            v-model="contractLedgerForm.legal.oppositeName"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item label="类型:" prop="legal.oppositeType">
                          <el-select
                            v-model="contractLedgerForm.legal.oppositeType"
                            :placeholder="state ? '' : '请选择'"
                            :disabled="state"
                          >
                            <el-option
                              v-for="item in oppositeTypes"
                              :key="item.key"
                              :label="item.value"
                              :value="item.key"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="来源:"
                          prop="legal.oppositeSourceType"
                        >
                          <el-select
                            v-model="
                              contractLedgerForm.legal.oppositeSourceType
                            "
                            :placeholder="state ? '' : '请选择'"
                            :disabled="state"
                          >
                            <el-option
                              v-for="item in oppositeSourceTypes"
                              :key="item.key"
                              :label="item.value"
                              :value="item.key"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item
                          label="相对方性质:"
                          prop="legal.oppositeEnterpriseType"
                        >
                          <el-select
                            v-model="
                              contractLedgerForm.legal.oppositeEnterpriseType
                            "
                            :placeholder="state ? '' : '请选择'"
                            :disabled="state"
                          >
                            <el-option
                              v-for="item in oppositeEnterpriseTypes"
                              :key="item.key"
                              :label="item.value"
                              :value="item.key"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="国家:"
                          prop="legal.oppositeCountryType"
                        >
                          <el-select
                            v-model="
                              contractLedgerForm.legal.oppositeCountryType
                            "
                            :placeholder="state ? '' : '请选择'"
                            :disabled="state"
                          >
                            <el-option
                              v-for="item in oppositeCountryTypes"
                              :key="item.key"
                              :label="item.value"
                              :value="item.key"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item
                          label="签约主体编号:"
                          prop="legal.contratSubjectCode"
                        >
                          <el-input
                            disabled
                            v-model="
                              contractLedgerForm.legal.contratSubjectCode
                            "
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="合同类型编号:"
                          prop="legal.oppositeContractType"
                        >
                          <el-select
                            v-model="
                              contractLedgerForm.legal.oppositeContractType
                            "
                            :placeholder="state ? '' : '请选择'"
                            :disabled="state"
                          >
                            <el-option
                              v-for="item in oppositeContractTypes"
                              :key="item.key"
                              :label="item.value"
                              :value="item.key"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item
                          label="收付方向:"
                          prop="legal.payeeDirection"
                        >
                          <el-select
                            v-model="contractLedgerForm.legal.payeeDirection"
                            :placeholder="state ? '' : '请选择'"
                            :disabled="state"
                          >
                            <el-option
                              v-for="item in payeeDirections"
                              :key="item.key"
                              :label="item.value"
                              :value="item.key"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="计价方式:"
                          prop="legal.priceMethod"
                        >
                          <el-select
                            v-model="contractLedgerForm.legal.priceMethod"
                            :placeholder="state ? '' : '请选择'"
                            :disabled="state"
                          >
                            <el-option
                              v-for="item in priceMethods"
                              :key="item.key"
                              :label="item.value"
                              :value="item.key"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item label="采购方式:" prop="legal.buyMethod">
                          <el-select
                            v-model="contractLedgerForm.legal.buyMethod"
                            :placeholder="state ? '' : '请选择'"
                            :disabled="state"
                          >
                            <el-option
                              v-for="item in buyMethods"
                              :key="item.key"
                              :label="item.value"
                              :value="item.key"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="资金来源:" prop="legal.fundSource">
                          <el-select
                            v-model="contractLedgerForm.legal.fundSource"
                            :placeholder="state ? '' : '请选择'"
                            :disabled="state"
                          >
                            <el-option
                              v-for="item in fundSources"
                              :key="item.key"
                              :label="item.value"
                              :value="item.key"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item
                          label="合同币种:"
                          prop="legal.contractCurrencyType"
                        >
                          <el-select
                            v-model="
                              contractLedgerForm.legal.contractCurrencyType
                            "
                            :placeholder="state ? '' : '请选择'"
                            :disabled="state"
                          >
                            <el-option
                              v-for="item in contractCurrencyTypes"
                              :key="item.key"
                              :label="item.value"
                              :value="item.key"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="合同金额/暂估金额:"
                          prop="legal.contractpayee"
                        >
                          <el-input
                            v-model="contractLedgerForm.legal.contractpayee"
                            :disabled="state"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item
                          label="合同标的:"
                          prop="legal.contractCodeType"
                        >
                          <el-select
                            v-model="contractLedgerForm.legal.contractCodeType"
                            :placeholder="state ? '' : '请选择'"
                            :disabled="state"
                          >
                            <el-option
                              v-for="item in contractCodeTypes"
                              :key="item.key"
                              :label="item.value"
                              :value="item.key"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="适合语言:"
                          prop="legal.useLanguage"
                        >
                          <el-select
                            v-model="contractLedgerForm.legal.useLanguage"
                            :placeholder="state ? '' : '请选择'"
                            :disabled="state"
                          >
                            <el-option
                              v-for="item in useLanguages"
                              :key="item.key"
                              :label="item.value"
                              :value="item.key"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item
                          label="涉外合同:"
                          prop="legal.relateToOutside"
                        >
                          <el-select
                            v-model="contractLedgerForm.legal.relateToOutside"
                            :placeholder="state ? '' : '请选择'"
                            :disabled="state"
                          >
                            <el-option
                              v-for="item in relateToOutsides"
                              :key="item.key"
                              :label="item.value"
                              :value="item.key"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="关联项目:"
                          prop="legal.relateToProject"
                        >
                          <el-select
                            v-model="contractLedgerForm.legal.relateToProject"
                            :placeholder="state ? '' : '请选择'"
                            :disabled="state"
                          >
                            <el-option
                              v-for="item in relateToProjects"
                              :key="item.key"
                              :label="item.value"
                              :value="item.key"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item
                          label="重大合同:"
                          prop="legal.greatContract"
                        >
                          <el-select
                            v-model="contractLedgerForm.legal.greatContract"
                            :placeholder="state ? '' : '请选择'"
                            :disabled="state"
                          >
                            <el-option
                              v-for="item in greatContracts"
                              :key="item.key"
                              :label="item.value"
                              :value="item.key"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="合同担保:"
                          prop="legal.contractGuarantee"
                        >
                          <el-select
                            v-model="contractLedgerForm.legal.contractGuarantee"
                            :placeholder="state ? '' : '请选择'"
                            :disabled="state"
                          >
                            <el-option
                              v-for="item in contractGuarantees"
                              :key="item.key"
                              :label="item.value"
                              :value="item.key"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item
                          label="内部合同:"
                          prop="legal.contractInside"
                        >
                          <el-select
                            v-model="contractLedgerForm.legal.contractInside"
                            :placeholder="state ? '' : '请选择'"
                            :disabled="state"
                          >
                            <el-option
                              v-for="item in contractInsides"
                              :key="item.key"
                              :label="item.value"
                              :value="item.key"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="使用范本:" prop="legal.useModel">
                          <el-select
                            v-model="contractLedgerForm.legal.useModel"
                            :placeholder="state ? '' : '请选择'"
                            :disabled="state"
                          >
                            <el-option
                              v-for="item in useModels"
                              :key="item.key"
                              :label="item.value"
                              :value="item.key"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item
                          label="承办人员编码:"
                          prop="legal.undertakePersonCode"
                        >
                          <el-input
                            :disabled="state"
                            v-model="
                              contractLedgerForm.legal.undertakePersonCode
                            "
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="承办日期:"
                          prop="legal.undertakeDate"
                        >
                          <el-date-picker
                            :disabled="state"
                            type="date"
                            placeholder="选择日期"
                            v-model="contractLedgerForm.legal.undertakeDate"
                            style="width: 100%;"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="10">
                      <el-col :span="24">
                        <el-form-item
                          label="合同简介:"
                          prop="legal.contractContentBrief"
                        >
                          <el-input
                            type="textarea"
                            placeholder="合同简介..."
                            rows="6"
                            :maxlength="400"
                            resize="none"
                            :disabled="state"
                            v-model="
                              contractLedgerForm.legal.contractContentBrief
                            "
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="10">
                      <el-col :span="24">
                        <el-form-item label="签订依据:" prop="legal.signBasis">
                          <el-input
                            type="input"
                            :disabled="state"
                            placeholder="签订依据..."
                            v-model="contractLedgerForm.legal.signBasis"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item
                          label="合同收付款笔数:"
                          prop="legal.payeeNumber"
                        >
                          <el-input
                            :disabled="state"
                            v-model="contractLedgerForm.legal.payeeNumber"
                          ></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :span="12">
                        <el-form-item
                          label="收/付款比例:"
                          prop="legal.payeePercent"
                        >
                          <el-input
                            :disabled="state"
                            v-model="contractLedgerForm.legal.payeePercent"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item
                          label="收/付款金额:"
                          prop="legal.paymount"
                        >
                          <el-input
                            :disabled="state"
                            v-model="contractLedgerForm.legal.paymount"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="提醒天数:" prop="legal.warnDays">
                          <el-input
                            :disabled="state"
                            v-model="contractLedgerForm.legal.warnDays"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item
                          label="收/付款计划:"
                          prop="legal.payeePlan"
                        >
                          <el-input
                            :disabled="state"
                            v-model="contractLedgerForm.legal.payeePlan"
                          ></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :span="12">
                        <el-form-item label="层次:" prop="legal.levels">
                          <el-input
                            :disabled="state"
                            v-model="contractLedgerForm.legal.levels"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item label="顺序:" prop="legal.orderBy">
                          <el-input
                            :disabled="state"
                            v-model="contractLedgerForm.legal.orderBy"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="节点说明:"
                          prop="legal.nodeDescription"
                        >
                          <el-input
                            :disabled="state"
                            v-model="contractLedgerForm.legal.nodeDescription"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item
                          label="审批人:"
                          prop="legal.approvalNameCode"
                        >
                          <el-input
                            :disabled="state"
                            v-model="contractLedgerForm.legal.approvalNameCode"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="是否内控审查节点:"
                          prop="legal.internalReviewCode"
                        >
                          <el-input
                            :disabled="state"
                            v-model="
                              contractLedgerForm.legal.internalReviewCode
                            "
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-form>
          </div>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer btn_footer">
        <!-- 按钮 -->
        <el-button
          v-if="fileTypeAudit"
          type="success"
          @click="approvalPass"
          class="pass-btn"
          :disabled="false"
          >通 过
        </el-button>
        <!-- v-if="contractLedgerAudit_btn_pass" -->
        <el-button
          v-if="fileTypeAudit"
          type="warning"
          :disabled="false"
          class="reject-btn"
          @click="approvalReject"
          >驳 回
        </el-button>

        <el-button
          :loading="btn_save"
          class="save-btn"
          :disabled="checkFlag"
          @click="showReason"
          v-if="!hasStopReason && state && displayStatus === '10'"
          >终止合同
        </el-button>

        <el-button
          class="save-btn"
          :disabled="checkFlag"
          v-if="displayStatus === '11' || (!state && submitState == true)"
          @click="submitSave('11')"
          >保存
        </el-button>
        <el-button
          class="submit-btn"
          :disabled="checkFlag"
          v-if="!state"
          @click="submitSave('3')"
          >提交</el-button
        >
        <el-button class="cancel-btn" @click="close()">关闭</el-button>
      </div>
    </el-dialog>

    <reason-stop
      :visible="visibleStop"
      :id="originalId"
      v-if="!hasStopReason && state && displayStatus === '10'"
      @closeReason="closeReason"
    ></reason-stop>
  </div>
</template>

<script>
import {
  addObj,
  delObj,
  editObj,
  getAllocatedCustomerListByName,
  getInstalledCapacity,
} from '@common/api/contractManage/contractLedger/index';
import { initDialogHeight, getUnitMap, parseTime } from '@common/utils/index';
import { getOrgById } from '@common/api/admin/orgStruManage/index';
import { getSelectList } from '@common/api/base';
import { mapGetters } from 'vuex';
import { getToken } from '@common/utils/auth';
import fwmixin from '@common/components/contractLedger/fwmixin';
import FormFile from '@common/components/uniCom/formFile';
import up from '@common/components/contractLedger/up';
import reasonStop from '@common/components/contractLedger/components/reasonStop';

export default {
  components: {
    'reason-stop': reasonStop,

    'form-file': FormFile,
  },
  mixins: [fwmixin, up],
  props: {
    isVirtual: {
      type: Boolean,
    },
    replenish: {
      type: Boolean,
      default: false,
    },
    fileTypeAudit: { type: Boolean },
  },
  data() {
    return {
      contractLedgerForm: {
        htContract: {
          isVirtual: 0,
          // todo wsc 2020-10-09
          lastYearElectricConsum: 0,
          threeYearAveElectric: 0,
          //  是否关联合同 #6
          isRelate: 0,
          //法务系统合同编码
          legalContractCode: '',
          // todo wsc end
          supplierCode: '', //发电方id
          beginDate: '', //合同生效日期
          endDate: '', //合同失效日期
          contractCode: '', //合同编码
          contractNumber: '', //合同编号
          contractName: '', //合同名称
          contractTypeCode: 'htlx04', //合同类型
          contractSigningType: '', //签约类型
          enclosure: '', //附件路径
          orgId: '',
          remarks: '', ///备注
          signingDate: '', //合同签订日期
          dataStatus: '', //合同状态
          utilizationHours: '', ///交易电量
          contractPower: '', //合同电量
          totalElectricity: 0, //合同总电量
          templateId: '', //合同模板id
          purchaserCode: '', //用电方
          supplierName: '', //发电方 //模糊查询数据来自发电公司
          cyjz: '', //参与机组
          sdOrg: '', //输电方
          tradingVariety: '', //交易品种
          tradingWay: '', //交易方式
          noticeId: '', //交易单号
          tradingUnit: '', //交易单元
          noticeName: '', //交易序列  //模糊查询数据从交易公告中选取
          tradeName: '', //交易名称
          contractPriceWay: '', //合同定价方式
          customerName: '', //购电方name //基数电合同甲方信息数据来自客户
        },
        clausePlan: {
          electricityId: '',
          janYearBilateElectric: '',
          janYearBilateElecPrice: '',
          febYearBilateElectric: '',
          febYearBilateElecPrice: '',
          marYearBilateElectric: '',
          marYearBilateElecPrice: '',
          aprYearBilateElectric: '',
          aprYearBilateElecPrice: '',
          mayYearBilateElectric: '',
          mayYearBilateElecPrice: '',
          junYearBilateElectric: '',
          junYearBilateElecPrice: '',
          julYearBilateElectric: '',
          julYearBilateElecPrice: '',
          augYearBilateElectric: '',
          augYearBilateElecPrice: '',
          sepYearBilateElectric: '',
          sepYearBilateElecPrice: '',
          octYearBilateElectric: '',
          octYearBilateElecPrice: '',
          novYearBilateElectric: '',
          novYearBilateElecPrice: '',
          decYearBilateElectric: '',
          decYearBilateElecPrice: '',
        },
        // todo wsc 2020-10-26
        legal: {
          // 计价方式
          priceMethod: '',
          // 是否内控审查节点
          internalReviewCode: '',
          // 审批人
          approvalNameCode: '',
          // 节点说明
          nodeDescription: '',
          // 顺序
          orderBy: '',
          // 层次
          levels: '',
          // 审批行ID
          approvalRowId: '',
          // 审批头ID
          approvalHeadId: '',
          // 收/付款计划
          payeePlan: '',
          // 提醒天数
          warnDays: '',
          // 收/付款比例
          payeePercent: 0,
          // 收/付款金额
          paymount: 0,
          // 履行时间
          lxDate: '',
          // 履行计划编号
          lxjhbh: '',
          // 合同收付款笔数
          payeeNumber: '',
          // 签订依据
          signBasis: '',
          // 合同简介
          contractContentBrief: '',
          //承办日期
          undertakeDate: '',
          //承办人员编码
          undertakePersonCode: '',
          // 使用范本
          useModel: '',
          // 内部合同
          contractInside: '',
          //合同担保
          contractGuarantee: '',
          // 重大合同
          greatContract: '',
          //关联项目
          relateToProject: 'legal_interface1302',
          //涉外合同，没有列表
          relateToOutside: 'legal_interface1102',
          // 适合语言
          useLanguage: 'legal_interface1201',
          // 合同标的编码
          contractCodeType: '',
          // 合同金额/暂估金额
          contractpayee: '',
          //合同币种
          contractCurrencyType: 'legal_interface1001',
          // 采购方式
          buyMethod: '',
          //资金来源
          fundSource: 'legal_interface0901',
          // 收付方向
          payeeDirection: 'legal_interface0602',

          // 相对方合同类型
          oppositeContractType: 'legal_interface0501',
          // 签约主体编号
          contratSubjectCode: '',
          // 国家
          oppositeCountryType: 'legal_interface0401',
          // 相对方性质
          oppositeEnterpriseType: '',
          // 相对方名称
          oppositeName: '',
          // 统一社会信用代码
          socialCreditCode: '',
          // 类型
          oppositeType: '',
          // 相对方来源
          oppositeSourceType: 'legal_interface0203',
        },
        htTemplateAccessoriesVOList: [], //附件表格数据 HtTemplateAccessoriesVO
      },
      contractLedgerFormRules: {
        'htContract.isRelate': [
          {
            required: true,
            message: '请选择关联交易',
            trigger: 'blur',
          },
        ],

        'htContract.contractCode': [
          {
            required: true,
            message: '请输入合同编码',
            trigger: 'blur',
          },
        ],
        'htContract.signingDate': [
          {
            required: true,
            message: '请输入合同签订日期',
            trigger: 'blur',
          },
        ],
        'htContract.contractName': [
          {
            required: true,
            message: '请输入合同名称',
            trigger: 'blur',
          },
        ],
        'htContract.endDate': [
          {
            required: true,
            message: '请输入合同失效日期',
            trigger: 'blur',
          },
        ],
        'htContract.beginDate': [
          {
            required: true,
            message: '请输入合同生效日期',
            trigger: 'blur',
          },
        ],
        //2020-02-11 #3534 zhangp 购电方 （电网）为必选
        'htContract.customerName': [
          {
            required: true,
            message: '请选择',
            trigger: 'blur',
          },
        ],
        'htContract.contractSigningType': [
          {
            required: true,
            message: '请选择签约类型',
            trigger: 'blur',
          },
        ],
      },

      formLoading: false,
      addDialogVisible: false,
      dialogTitle: '', //基数电合同标题
      activeNames: ['1', '2'],
      show_file_name: true,
      limit_number: 10,
      myFileList: [],
      checkFlag: false,
      ydState: false,
      electricityPlanState: false,
      submitState: true, //保存按钮是否显示初始化
      dataStatus: '',

      orgInfo: {
        id: '',
        orgName: '',
      },
      months: [
        'jan',
        'feb',
        'mar',
        'apr',
        'may',
        'jun',
        'jul',
        'aug',
        'sep',
        'oct',
        'nov',
        'dec',
      ],
      flagOption: 'add',
      unitMap: {},
      optionsA: [], //签约类型数据
      loading: false,
      customerFilterData: [],
      supplierCodeData: [],
      state: false,
      dialogHeight: '',
      changeFileList: [],
      installedCapacityData: '', //装机容量-变量
      //表单验证
    };
  },
  computed: {
    ...mapGetters(['elements', 'orgId', 'allSubMenus']),
  },
  //初始化  注：在模板渲染成html前调用
  created() {
    this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
    this.uplaodHeaders = {
      Authorization: getToken(),
      ModelCode: sessionStorage.getItem('modelCode'),
    };
    this.dialogHeight = initDialogHeight();
    const that = this;
    window.onresize = function temp() {
      that.dialogHeight = initDialogHeight(); //获取弹框高度(监控高度变化)
    };
    this.getcontractType();
  },
  //事件方法执行
  methods: {
    //下拉信息
    getcontractType() {
      getSelectList('contract_signing_type').then((res) => {
        this.optionsA = res;
      });
    },
    //调取子组件初始化方法
    initDialog(contractForm, dataInfo) {
      this.getFawuIs();
      this.addDialogVisible = true;
      //this.submitState = dialogInfo.submitState;
      this.getOrgInfo(dataInfo);
      this.dialogTitle = dataInfo.sdTemplateName;
      const _set = this.$refs;
      if (_set.contractForm === undefined) {
      } else {
        _set.contractForm.resetFields();
      }
      this.state = false;
      this.reInitFormData();
      this.supplierCodeData = []; //新增时清空购电方（电网）数据
      this.contractLedgerForm.htContract.contractCode =
        contractForm.contractCode;
      this.contractLedgerForm.htContract.purchaserCode =
        contractForm.secondPartCode;
      this.contractLedgerForm.htContract.purchaserName =
        contractForm.secondPartName;
      this.contractLedgerForm.htContract.templateId = contractForm.templateId;
      this.contractLedgerForm.htContract.isVirtual = this.isVirtual || 0;

      this.flagOption = dataInfo.flagOption; //操作状态
      this.dataStatus = '';
      // this.initUpload(this.contractLedgerForm.htContract.enclosure);
      //初始化获取装机容量数据
      let parame = {
        orgId: this.orgId,
      };
      getInstalledCapacity(parame).then((res) => {
        this.installedCapacityData = res.data;
      });
    },
    //初始化编辑
    initEditDialog(dataInfo, dialogInfo) {
      this.hasStopReason = _.has(dataInfo.htContract, 'contractEndReason');

      this.getFawuIs();
      console.log('编辑：', dataInfo, dialogInfo);
      //  购电方
      // this.supplierCodeData = [
      //   {
      //     customerId: dataInfo.htContract.customerId,
      //     customerName: dataInfo.htContract.customerName,
      //   },
      // ];

      // 售电方
      // this.customerFilterData = [
      //   {
      //     customerId: dataInfo.htContract.customerId,
      //     customerName: dataInfo.htContract.customerName,
      //   },
      // ];
      this.displayStatus = dataInfo.htContract.dataStatus;
      // todo wsc 2021-02-20 16:46:32
      this.originalId = dataInfo.htContract.contractId;
      this.submitState = dialogInfo.submitState;
      // if (this.$refs.uploadFileAdd === undefined) {
      // } else {
      //   this.$refs.uploadFileAdd.clearFiles();
      // }
      this.reInitFormData();
      this.state = dialogInfo.state;
      this.electricityPlanState = dialogInfo.state;
      this.flagOption = dialogInfo.flagOption;

      // todo wsc 2020-10-29
      _.keys(dataInfo).forEach((v) => {
        if (v !== 'templatePowerList') {
          if (v === 'htContractLegal') {
            _.keys(this.contractLedgerForm['legal']).forEach((k) => {
              this.$set(
                this.contractLedgerForm['legal'],
                k,
                dataInfo['htContractLegal'][k]
              );
            });
          } else {
            _.keys(this.contractLedgerForm[v]).forEach((k) => {
              this.$set(this.contractLedgerForm[v], k, dataInfo[v][k]);
            });
          }
        } else {
          this.contractLedgerForm.templatePowerList =
            dataInfo.templatePowerList;
          // 实时监听表格变压器数据是否为空  为空返回false(合同总变压器容量可编辑) 否则返回true(合同总变压器容量不可编辑)
        }
      });
      this.contractLedgerForm.htContract.isVirtual =
        dataInfo.htContract.isVirtual || 0;

      // todo wsc 2020-10-14
      this.getSupplierCodeInfo(dataInfo.htContract.customerName);
      this.checkTime();
      this.contractId = dataInfo.htContract.contractId;
      this.dialogTitle = dialogInfo.sdTemplateName || '查看';
      this.sdTemplateName = dialogInfo.sdTemplateName || '查看';
      this.dataStatus = dataInfo.htContract.dataStatusName;
      if (typeof this.contractLedgerForm.htContract.enclosure == 'undefined') {
        this.contractLedgerForm.htContract.enclosure = '';
      }
      // this.initUpload(dataInfo.htContract.enclosure);
      this.addDialogVisible = true;
    },
    //初始化上传
    initUpload(files) {
      this.isUpload = false;
      let fileArr = [];
      this.myFileList = [];
      if (typeof files == 'undefined') {
        return false;
      }
      if (files != '') {
        fileArr = files.split('|');
        fileArr.forEach((item) => {
          if (item != '') {
            let fileInfo = item.split('/');
            this.myFileList.push({
              url: item,
              name: fileInfo[fileInfo.length - 1],
            });
          }
        });
      }
    },
    reInitFormData() {
      // this.$refs.contractLedgerForm.resetFields();
      for (let key in this.contractLedgerForm) {
        for (let key2 in this.contractLedgerForm[key]) {
          // if (key2 == "partyAssessmentRatio") {
          //   this.$set(this.contractLedgerForm[key], key2, 0);
          // } else {
          this.$set(this.contractLedgerForm[key], key2, '');
          // }
        }
      }
    },
    //-模糊查询购电方信息
    getSupplierCodeInfo(query) {
      this.supplierCodeData = [];
      let cusType = 'khlb4';
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          let parme = { cusType: cusType, custName: query };
          getAllocatedCustomerListByName(parme).then((res) => {
            this.supplierCodeData = res.data.customerInfo;
          });
        }, 200);
      } else {
        this.supplierCodeData = [];
      }
    },
    /**
     * @功能描述: 购电方点击事件
     * @参数:
     * @返回值:
     * @作者: 张朋
     * @Date: 2020-02-11 10:10:22
     * @最新修改内容:
     * @LastEditTime:
     */
    changeGetSupplierCodeInfo(val) {
      this.supplierCodeData.forEach((item) => {
        if (item.customerId.indexOf(val) !== -1) {
          this.contractLedgerForm.htContract.customerName = item.customerName;
          // this.contractLedgerForm.htContract.customerId = item.customerId;
        }
      });
    },
    //获取当前组织信息
    getOrgInfo(dialogInfo) {
      let parame = {};
      parame = this.orgId;
      getOrgById(parame).then((res) => {
        this.orgInfo = res.data;
        if (dialogInfo.flagOption == 'add') {
          this.customerFilterData.push(this.orgInfo);
          this.contractLedgerForm.htContract.purchaserCode = this.orgInfo.id;
        }
      });
    },
    //利用小时监听计算
    utilizationHoursClick() {
      if (this.contractLedgerForm.htContract.utilizationHours) {
        //转成number类型
        this.contractLedgerForm.htContract.utilizationHours = Number(
          this.contractLedgerForm.htContract.utilizationHours
        );
        this.contractLedgerForm.htContract.totalElectricity =
          this.contractLedgerForm.htContract.utilizationHours *
          this.installedCapacityData;
      } else {
        this.contractLedgerForm.htContract.totalElectricity = this.contractLedgerForm.htContract.contractPower;
      }
    },
    /**
     * @功能描述: 合同总电量分摊
     * @参数:
     * @返回值:
     * @作者: 张朋
     * @Date: 2020-01-16 15:19:11
     * @最新修改内容:
     * @LastEditTime:
     */
    share(number) {
      let totalElectricity = parseFloat(
        this.contractLedgerForm.htContract.totalElectricity / 12
      ).toFixed(4);
      for (let i = 0; i < 12; i++) {
        this.$set(
          this.contractLedgerForm.clausePlan,
          this.months[i] + 'YearBilateElectric',
          totalElectricity
        );
      }

      // 2019-10-23 交易电量不能被12整除 无法保存 #2410
      //   if (
      //     totalElectricity * 12 !=
      //     this.contractLedgerForm.htContract.totalElectricity
      //   ) {
      //     let electric = parseFloat(
      //       this.contractLedgerForm.htContract.totalElectricity -
      //         totalElectricity * 11
      //     ).toFixed(4);
      //     this.$set(
      //       this.contractLedgerForm.clausePlan,
      //       this.months[11] + "YearBilateElectric",
      //       electric
      //     );
      //   } else {
      //     this.$set(
      //       this.contractLedgerForm.clausePlan,
      //       this.months[11] + "YearBilateElectric",
      //       totalElectricity
      //     );
      //   }
    },
    //时间点击处理
    checkTime() {
      var beginDate = new Date(
        this.contractLedgerForm.htContract.beginDate
      ).getTime();
      var endDate = new Date(
        this.contractLedgerForm.htContract.endDate
      ).getTime();
      if (beginDate > endDate) {
        this.$notify({
          title: '消息提醒',
          message: '失效日期必须大于生效日期!',
          type: 'warning',
          duration: 2000,
        });
        this.checkFlag = true;
      } else {
        this.checkFlag = false;
      }
    },
    /**
     * @功能描述: 保存 | 提交 操作
     * @参数:
     * @返回值:
     * @作者: 张朋
     * @Date: 2020-01-16 14:10:29
     * @最新修改内容:
     * @LastEditTime:
     */
    submitSave(dataStatus) {
      let _this = this;
      _this.checkFlag = true;
      const set = this.$refs;
      let electricityTrade = 0;
      let isMonthlyElectricitySum = true;
      let totalElectricity = 0;
      let isDealElectricity = true;
      for (let i = 0; i < 12; i++) {
        totalElectricity += Number(
          this.contractLedgerForm.clausePlan[
            this.months[i] + 'YearBilateElectric'
          ]
        );
      }
      totalElectricity = totalElectricity.toFixed(4);
      if (this.contractLedgerForm.htContract.totalElectricity == undefined) {
        this.contractLedgerForm.htContract.totalElectricity = '';
      }
      let totalElectricity2 = parseFloat(
        Number(this.contractLedgerForm.htContract.totalElectricity)
      ).toFixed(4);
      for (let i = 0; i < 12; i++) {
        let clausePlanKey = this.contractLedgerForm.clausePlan[
          this.months[i] + 'YearBilateElectric'
        ];
        if (clausePlanKey !== '') {
          if (totalElectricity2 != totalElectricity) {
            isDealElectricity = false;
          }
        }
      }
      if (!isDealElectricity) {
        this.$alert('计划电量与合同总电量不同！', '消息提示', {
          type: 'warning',
          confirmButtonText: '确定',
          callback: (action) => {
            _this.checkFlag = false;
          },
        });
      }
      if (isDealElectricity) {
        set['contractLedgerForm'].validate((valid) => {
          if (valid) {
            // 补充协议暂存
            if (this.replenish) {
              this.$emit('initList', this.contractLedgerForm);
              this.addDialogVisible = false;
              this.innerVisible = false;
              return;
            }

            // this.formLoading = true;
            this.contractLedgerForm.htContract.dataStatus = dataStatus;

            // 是否进入法务系统
            this.intoFawu(set, '');
          } else {
            this.checkFlag = false;
            return false;
          }
        });
      }
    },
    //格式化表单时间数据
    reSetTime(key) {
      let datatime = this.contractLedgerForm.htContract[key];
      if (typeof datatime === 'object') {
        datatime = parseTime(datatime, '{y}-{m}-{d}');
      }
      return datatime;
    },
    submitForm() {
      this.isUpload = false;
      this.contractLedgerForm.htContract['endDate'] = this.reSetTime('endDate');
      this.contractLedgerForm.htContract['signingDate'] = this.reSetTime(
        'signingDate'
      );
      this.contractLedgerForm.htContract['beginDate'] = this.reSetTime(
        'beginDate'
      );
      this.contractLedgerForm.htContract.contractTypeCode = 'htlx04';
      if (this.flagOption === 'edit') {
        this.editObject(this.contractLedgerForm);
      } else {
        this.addObject(this.contractLedgerForm);
      }
    },
    //新增
    addObject() {
      let parame = {};
      parame.clausePlan = {};
      parame.htContract = {};
      for (let key in this.contractLedgerForm.clausePlan) {
        if (key != 'contractId' && key != 'electricityId') {
          if (
            this.contractLedgerForm.clausePlan[key] == '' ||
            this.contractLedgerForm.clausePlan[key] == null
          ) {
          } else {
            parame.clausePlan[key] = this.contractLedgerForm.clausePlan[key];
          }
        }
      }
      // for (let key in this.contractLedgerForm.htContract) {
      //   if (key != "contractId") {
      //     if (
      //       this.contractLedgerForm.htContract[key] == "" ||
      //       this.contractLedgerForm.htContract[key] == null
      //     ) {
      //     } else {
      //       parame.htContract[key] = this.contractLedgerForm.htContract[key];
      //     }
      //   }
      // }

      // todo wsc 2020-10-13 混入法务系统必填字段
      parame.htContract = {
        ...this.contractLedgerForm.htContract,
        ...this.contractLedgerForm.legal,
      };

      //附件表格数据
      parame.htTemplateAccessoriesVOList = [];
      this.contractLedgerForm.htTemplateAccessoriesVOList.forEach((item) => {
        parame.htTemplateAccessoriesVOList.push(item);
      });
      addObj(parame).then((res) => {
        this.formLoading = false;
        if (res.rel) {
          setTimeout(() => {
            this.addDialogVisible = false;
            this.$notify({
              title: res.msg,
              message: res.msg,
              type: 'success',
              duration: 2000,
            });
            this.$emit('initList');
          }, 1000);
        } else {
          this.checkFlag = true;
          this.$notify({
            title: res.msg,
            message: res.msg,
            type: 'warning',
            duration: 2000,
          });
        }
      });
    },
    //修改
    editObject() {
      let parame = this.contractLedgerForm;
      for (let key in this.contractLedgerForm) {
        if (parame[key] != undefined) {
          parame[key]['contractId'] = this.contractId;
        }
      }
      if (parame.htContract.contractPower == '') {
        parame.htContract.contractPower = 0;
      }
      if (parame.htContract.totalElectricity == '') {
        parame.htContract.totalElectricity = 0;
      }

      // todo wsc 2020-10-13 混入法务系统必填字段
      parame.htContract = {
        ...this.contractLedgerForm.htContract,
        ...parame.htContract,
        ...this.contractLedgerForm.legal,
      };

      editObj(parame).then((res) => {
        this.formLoading = false;
        this.$emit('initList');
        if (res.rel) {
          setTimeout(() => {
            this.addDialogVisible = false;
            this.$notify({
              title: res.msg,
              message: res.msg,
              type: 'success',
              duration: 2000,
            });
            this.$emit('initList');
          }, 1000);
        } else {
          this.checkFlag = true;
          this.$notify({
            title: res.msg,
            message: res.msg,
            type: 'warning',
            duration: 2000,
          });
        }
      });
    },
    //关闭
    close() {
      //清空表单
      const _set = this.$refs;
      if (_set.contractLedgerForm === undefined) {
      } else {
        _set.contractLedgerForm.resetFields();
      }
      this.addDialogVisible = false;
    },
    handleBefore(file) {
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (!isLt20M) {
        this.$message.error('上传文件不能超过 20MB!');
      }
      return isLt20M;
    },
    //文件状态改变
    handleChange(file, fileList) {
      fileList.forEach((item) => {
        if (item.status == 'ready') {
          this.isUpload = true;
          this.changeFileList.push(item.name);
        }
      });
    },
    //上传成功
    uploadSuccess(response, file, fileList) {
      let enclosures = [];
      // this.myFileList.push(response.data.filePath)
      // console.log(this.myFileList);
      this.formLoading = false;
      let statusSuccess = true;
      fileList.forEach((item) => {
        if (item.status != 'success') {
          statusSuccess = false;
        }
      });
      if (statusSuccess) {
        fileList.forEach((item) => {
          if (typeof item.response == 'undefined') {
            enclosures.push(item.url);
          } else {
            enclosures.push(item.response.data.filePath);
          }
        });
        this.contractLedgerForm.htContract.enclosure = enclosures.join('|');
        this.submitForm();
      }
    },
    //上传失败
    uploadErr(response, file, fileList) {
      this.formLoading = false;
      this.$notify({
        title: '上传提示',
        message: '上传失败',
        type: 'warning',
        duration: 2000,
      });
    },
    //文件超出个数限制
    handleExceed() {
      this.$notify({
        title: '上传提示',
        message: '文件最多上传10个',
        type: 'warning',
        duration: 2000,
      });
    },
    //文件列表移除文件
    handleRemove(file, fileList) {
      let enclosures = [];
      fileList.forEach((item) => {
        if (item.status == 'success') {
          enclosures.push(item.url);
        }
      });
      if (enclosures.length > 0) {
        this.contractLedgerForm.htContract.enclosure = enclosures.join('|');
      }
    },
    //详情内附件下载
    handleDownload(file) {
      if (file.status != 'ready') {
        let parme = {
          enclosures: file.url,
        };
        downloadOneFileUs1(parme);
      }
    },
    //关闭窗口
    handleClose() {
      this.addDialogVisible = false;
    },
    //审批
    approvalPass() {
      this.$emit('openCheckWin', '3');
    },
    approvalReject() {
      this.$emit('openCheckWin', '4');
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input.ddw1 {
  width: 60%;
}
</style>
