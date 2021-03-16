<!--
 * @功能描述: 发电权转让合同
 * @版本:
 * @作者: frj
 * @Date: 2019-10-24 14:52:53
 * @最新修改内容: 发电权转让合同
 * @LastEditTime: 2020-12-23 17:13:32
 -->
<template>
  <div>
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      :title="dialogTitle"
      :visible.sync="addDialogVisible"
      custom-class="w1000 "
      v-loading="formLoading"
      :before-close="handleClose"
      append-to-body
    >
      <!-- 弹出form -->
      <!-- 弹窗高度自适应 s #2621 frj 2019-11-12 14:11:16 -->
      <div :style="{ paddingRight: '10px', height: dialogHeight + 'px' }">
        <el-scrollbar>
          <!-- 弹窗高度自适应 e #2621 frj 2019-11-12 14:11:23 -->
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
                      <!-- #3554 gaoaining 2020-01-09加字段名 -->
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
                          label="合同名称:"
                          prop="htContract.contractName"
                        >
                          <el-input
                            :disabled="state"
                            v-model="contractLedgerForm.htContract.contractName"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="合同状态：">
                          <!--    <el-select
                        style="width:100%"
                        v-model="contractLedgerForm.htContract.stateName"
                        placeholder="请选择状态"
                        :disabled="state"
                      >

                        <el-option
                          v-for="item in althtStateCodeList"
                          :key="item.propCode"
                          :label="item.propName"
                          :value="item.propName"
                        >
                        </el-option>
                          </el-select>-->
                          <span>{{
                            contractLedgerForm.htContract.stateName
                          }}</span>
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
                          >
                            <template slot="append">千千瓦时</template>
                          </el-input>
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
                          >
                            <template slot="append">千千瓦时</template>
                          </el-input>
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
                          label="合同生效日期："
                          prop="htContract.beginDate"
                        >
                          <el-date-picker
                            :disabled="state"
                            @change="checkTime()"
                            type="date"
                            placeholder="选择日期"
                            v-model="contractLedgerForm.htContract.beginDate"
                            style="width: 100%;"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item
                          prop="htContract.endDate"
                          label="合同失效日期："
                        >
                          <el-date-picker
                            type="date"
                            :disabled="state"
                            @change="checkTime()"
                            placeholder="选择日期"
                            v-model="contractLedgerForm.htContract.endDate"
                            style="width: 100%;"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>

                      <el-col :span="12">
                        <el-form-item label="电厂:">
                          <el-input
                            disabled
                            v-model="
                              contractLedgerForm.htContract.replacedPartyName
                            "
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="12">
                        <!--   <fieldset>
                      <legend>乙方信息</legend>
                        </fieldset>-->
                        <el-form-item
                          label="交易电厂:"
                          prop="htContract.substitutePartyName"
                        >
                          <!-- <el-select
                          style="width:100%;"
                          v-model="contractLedgerForm.htContract.substitutePartyName"
                          filterable
                          :disabled="state"
                          remote
                          :clearable="true"
                          reserve-keyword
                          :remote-method="getSecondPartyInfo"
                          :loading="loading"
                          @change="changeSecondPartyInfo"
                        >
                          <el-option
                            v-for="item in secondPartyList"
                            :key="item.index"
                            :label="item.customerName"
                            :value="item.customerName"
                          ></el-option>
                          </el-select>-->
                          <el-autocomplete
                            v-model="
                              contractLedgerForm.htContract.substitutePartyName
                            "
                            :fetch-suggestions="querySearchAsync"
                            placeholder="请输入内容"
                            @select="changeSecondPartyInfo"
                            :disabled="state"
                            style="width:100%;"
                          ></el-autocomplete>
                        </el-form-item>
                      </el-col>

                      <el-col :span="12">
                        <el-form-item label="出/受让类型:">
                          <el-select
                            style="width:100%"
                            v-model="
                              contractLedgerForm.htContract.tradingTypeName
                            "
                            :disabled="state"
                            @change="changeTradingType"
                          >
                            <el-option
                              v-for="item in assignmentTypeOption"
                              :key="item.propCode"
                              :label="item.propName"
                              :value="item.propName"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item label="合同总电量:">
                          <el-input
                            :disabled="state"
                            class="ddw1"
                            type="number"
                            @mousewheel.native.prevent
                            v-model="
                              contractLedgerForm.htContract.totalElectricity
                            "
                          ></el-input>
                          <span>{{ unitMap.electricityUnit }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="转让总电费:"
                          prop="htContract.totalElectricityTransferred"
                        >
                          <el-input
                            :disabled="state"
                            class="ddw1"
                            v-model="
                              contractLedgerForm.htContract
                                .totalElectricityTransferred
                            "
                          ></el-input>
                          <!-- #3674 增加单位名称 frj 2020-2-3 13:58:29 -->
                          <span>{{ unitMap.amountUnit }}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item label="交易电价:">
                          <el-input
                            :disabled="state"
                            class="ddw1"
                            type="number"
                            @mousewheel.native.prevent
                            v-model="contractLedgerForm.htContract.dealPrice"
                          ></el-input>
                          <span>{{ unitMap.priceUnit }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <!--  2019-12-02 #2900 秦侯珍 增加签约类型字段 start-->
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
                          >
                            <el-option
                              v-for="item in optionsA"
                              :key="item.propCode"
                              :label="item.propName"
                              :value="item.propCode"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <!--  2019-12-02 #2900 秦侯珍 增加签约类型字段 end-->
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
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

                  <!-- 用电计划  -->
                  <el-collapse-item
                    title="发电权转让计划"
                    name="5"
                    style="margin-left:10px"
                  >
                    <!--                 <div class="txt-right">单位：千千瓦时</div> -->
                    <div class="electricityTrade">
                      <el-row :gutter="10">
                        <el-row :gutter="10">
                          <el-col :span="4">
                            <el-form-item></el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <div class="txt-center">
                              <span
                                >计划转让({{ unitMap.electricityUnit }})</span
                              >
                            </div>
                          </el-col>
                          <el-col :span="6">
                            <div class="txt-center">
                              <span>转让电价({{ unitMap.priceUnit }})</span>
                            </div>
                          </el-col>

                          <el-col :span="6">
                            <div class="txt-center">
                              <span>转让费用({{ unitMap.amountUnit }})</span>
                            </div>
                          </el-col>
                        </el-row>
                      </el-row>
                      <el-row :gutter="10">
                        <el-row :gutter="10">
                          <el-col :span="4">
                            <el-form-item
                              label="1月："
                              label-width="120px"
                            ></el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan
                                  .janElectricityTrade
                              "
                            ></el-input>
                          </el-col>
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan
                                  .janElectricityPrice
                              "
                            ></el-input>
                          </el-col>
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan.janElectricityCost
                              "
                            ></el-input>
                          </el-col>
                        </el-row>
                        <el-row :gutter="10">
                          <el-col :span="4">
                            <el-form-item
                              label="2月："
                              label-width="120px"
                            ></el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan
                                  .febElectricityTrade
                              "
                            ></el-input>
                          </el-col>
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan
                                  .febElectricityPrice
                              "
                            ></el-input>
                          </el-col>
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan.febElectricityCost
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
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan
                                  .marElectricityTrade
                              "
                            ></el-input>
                          </el-col>
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan
                                  .marElectricityPrice
                              "
                            ></el-input>
                          </el-col>
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan.marElectricityCost
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
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan
                                  .aprElectricityTrade
                              "
                            ></el-input>
                          </el-col>
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan
                                  .aprElectricityPrice
                              "
                            ></el-input>
                          </el-col>
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan.aprElectricityCost
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
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan
                                  .mayElectricityTrade
                              "
                            ></el-input>
                          </el-col>
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan
                                  .mayElectricityPrice
                              "
                            ></el-input>
                          </el-col>
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan.mayElectricityCost
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
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan
                                  .junElectricityTrade
                              "
                            ></el-input>
                          </el-col>
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan
                                  .junElectricityPrice
                              "
                            ></el-input>
                          </el-col>
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan.junElectricityCost
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
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan
                                  .julElectricityTrade
                              "
                            ></el-input>
                          </el-col>
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan
                                  .julElectricityPrice
                              "
                            ></el-input>
                          </el-col>
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan.julElectricityCost
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
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan
                                  .augElectricityTrade
                              "
                            ></el-input>
                          </el-col>
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan
                                  .augElectricityPrice
                              "
                            ></el-input>
                          </el-col>
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan.augElectricityCost
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
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan
                                  .sepElectricityTrade
                              "
                            ></el-input>
                          </el-col>
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan
                                  .sepElectricityPrice
                              "
                            ></el-input>
                          </el-col>
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan.sepElectricityCost
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
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan
                                  .octElectricityTrade
                              "
                            ></el-input>
                          </el-col>
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan
                                  .octElectricityPrice
                              "
                            ></el-input>
                          </el-col>
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan.octElectricityCost
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
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan
                                  .novElectricityTrade
                              "
                            ></el-input>
                          </el-col>
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan
                                  .novElectricityPrice
                              "
                            ></el-input>
                          </el-col>
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan.novElectricityCost
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
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan
                                  .decElectricityTrade
                              "
                            ></el-input>
                          </el-col>
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan
                                  .decElectricityPrice
                              "
                            ></el-input>
                          </el-col>
                          <el-col :span="6">
                            <el-input
                              type="number"
                              @mousewheel.native.prevent
                              :disabled="electricityTradeState"
                              v-model="
                                contractLedgerForm.clausePlan.decElectricityCost
                              "
                            ></el-input>
                          </el-col>
                        </el-row>
                      </el-row>
                    </div>
                  </el-collapse-item>
                  <!-- 用电计划 end -->

                  <!-- #3519 gaoaining 2020-01-09 发电权转让计划明细  start-->
                  <el-collapse-item
                    title="发电权转让计划明细"
                    name="6"
                    style="margin-left:10px"
                  >
                    <div class="app-container">
                      <el-row>
                        <el-col :span="24">
                          <div class="txt-right unit-info">
                            单位:{{ unitMap.electricityUnit }},{{
                              unitMap.priceUnit
                            }}
                          </div>
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
                        :height="tabHeight"
                      >
                        <el-table-column
                          prop="index"
                          label="序号"
                          align="center"
                          width="60px"
                        ></el-table-column>

                        <el-table-column
                          align="center"
                          width="150"
                          label="转让期次 "
                        >
                          <template slot-scope="scope">
                            <el-tooltip
                              v-if="
                                scope.row.contractPeriodStatus == 'ipt-err-true'
                              "
                              class="item"
                              effect="dark"
                              :content="scope.row.contractPeriodStatusMsg"
                              placement="top"
                            >
                              <el-date-picker
                                type="month"
                                v-model="scope.row.contractPeriod"
                                :clearable="true"
                                style="width:128px;"
                                :class="scope.row.contractPeriodStatus"
                                @change="setDeclarationDate($event, scope.row)"
                              ></el-date-picker>
                            </el-tooltip>
                            <el-date-picker
                              v-else
                              :disabled="state"
                              type="month"
                              v-model="scope.row.contractPeriod"
                              :clearable="true"
                              style="width:128px;"
                              @change="setDeclarationDate($event, scope.row)"
                            ></el-date-picker>
                          </template>
                        </el-table-column>

                        <el-table-column align="center" label="交易序列名称">
                          <template slot-scope="scope">
                            <el-tooltip
                              v-if="
                                scope.row.transactionSequenceNameStatus ==
                                  'ipt-err-true'
                              "
                              class="item"
                              effect="dark"
                              :content="
                                scope.row.transactionSequenceNameStatusMsg
                              "
                              placement="top"
                            >
                              <el-input
                                v-model="scope.row.transactionSequenceName"
                                :class="scope.row.transactionSequenceNameStatus"
                              ></el-input>
                            </el-tooltip>
                            <el-input
                              v-else
                              :disabled="state"
                              v-model="scope.row.transactionSequenceName"
                            ></el-input>
                          </template>
                        </el-table-column>

                        <el-table-column align="center" label="计划转让">
                          <template slot-scope="scope">
                            <el-input
                              :disabled="state"
                              v-model="scope.row.electricityTrad"
                            ></el-input>
                          </template>
                        </el-table-column>

                        <el-table-column
                          align="center"
                          width="120px"
                          label="转让电价"
                        >
                          <template slot-scope="scope">
                            <el-input
                              :disabled="state"
                              type="number"
                              v-model="scope.row.electricityPrice"
                            ></el-input>
                          </template>
                        </el-table-column>

                        <el-table-column
                          width="120px"
                          align="center"
                          label=" 转让价差"
                        >
                          <template slot-scope="scope">
                            <el-input
                              :disabled="state"
                              type="number"
                              v-model="scope.row.transferSpread"
                            ></el-input>
                          </template>
                        </el-table-column>

                        <el-table-column
                          align="center"
                          v-if="!state"
                          label="操作"
                        >
                          <template slot-scope="scope">
                            <el-button
                              v-if="scope.row.index == tableList.length"
                              icon="el-icon-plus"
                              size="small"
                              type="primary"
                              @click="addRow"
                            ></el-button>
                            <el-button
                              size="small"
                              type="text"
                              @click="handleDelete(scope.row)"
                              >删除
                            </el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </el-collapse-item>
                  <!-- #3519 gaoaining 2020-01-09 发电权转让计划明细  end-->

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
          v-if="htElectricityPackageManager_btn_amendant && displayStatus == 3"
          style="float:left"
          class="filter-item check"
          plain
          @click="clicXGJL()"
          >修改记录
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
          :disabled="checkFlag"
          class="save-btn"
          @click="submitSave('11')"
          v-if="displayStatus === '11' || (!state && submitState == true)"
          >保存
        </el-button>
        <el-button
          class="submit-btn"
          :disabled="checkFlag"
          v-if="!state"
          @click="submitSave('3')"
          >提交
        </el-button>

        <el-button v-if="!fileTypeAudit" class="cancel-btn" @click="close()"
          >关闭
        </el-button>

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
      </div>
    </el-dialog>
    <!-- 修改记录弹窗  s -->
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      custom-class="w880"
      title="修改记录"
      :visible.sync="dialogFormVisibleTwo"
    >
      <amendantRecord
        @setRecords="getRecords"
        :originalId="originalId"
        ref="amendantRecord"
        :list="zlist"
        :total="ztotal"
      ></amendantRecord>
      <div slot="footer" class="dialog-footer btn_footer">
        <!-- 按钮 -->
        <el-button class="cancel-btn" @click="closeAmendantRecord()"
          >关闭
        </el-button>
      </div>
    </el-dialog>
    <!-- 修改记录弹窗  e -->

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
  getContractTypeCode,
  getStateCode,
  getContractType,
  page,
  addObj,
  delObj,
  exportObj,
  getcompensation,
  getconditions,
  getWaysOfCompensation,
  getObj,
  editObj,
  viewShow,
  download,
  getSupplierCode,
  getPowerGeneratorName,
  updateStatus,
  getHtRecords,
  delDetailObj,
} from '@common/api/contractManage/contractLedger/index';
import { getToken } from '@common/utils/auth';
import { getcustomerId } from '@common/api/contractManage/contractLedger/index';
import { parseTime, getUnitMap, initDialogHeight } from '@common/utils/index';
import { mapGetters } from 'vuex';
import {
  getSelectList,
  downloadOneFile,
  downloadOneFileUs1,
} from '@common/api/base';
import amendantRecord from '@common/components//amendantRecord';
import { initLayoutInfo } from '@common/utils/init';
import fwmixin from '@common/components/contractLedger/fwmixin';
import FormFile from '@common/components/uniCom/formFile';
import up from '@common/components/contractLedger/up';
import reasonStop from '@common/components/contractLedger/components/reasonStop';

export default {
  mixins: [fwmixin, up],
  components: {
    amendantRecord,
    'reason-stop': reasonStop,
    'form-file': FormFile,
  },
  props: {
    althtStateCodeList: { type: Array },
    htWaysOfCompensation: { type: Array },
    assessmentElectricityPriceTypes: { type: Array },
    assignmentTypeOption: { type: Array },
    fileTypeAudit: { type: Boolean },
    isVirtual: {
      type: Boolean,
    },
    replenish: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      contractLedgerForm: {
        // additionalClause: {
        //    //additionalClauseId: "", //附加条款主键id
        //    additionalClauseText: "", //附加条款内容
        //  },
        //  clauseAssessment: {
        //    assessmentExemption: "", //免考核条件
        //    partyAssessmentRatio: 0 // 甲方免考核比例
        //    //violationId: null //主键
        //  },
        //  clauseDefault: {
        //    compensate: "", //是否赔偿
        //    compensationStatement: "" //赔偿说明
        //  },
        //    clauseViolation: {
        //    compensation: "", //赔偿方式
        //    compensationAmount: "", //按总数额赔偿
        //    quantityPriceProduct: "", //负偏差惩罚比例
        //    positiveDeviationExemption: "", //合同信息表主键
        //    compensationValue1: "", //支付违约金
        //    compensationValue2: "", //签约电量乘固定降价
        //    compensationValue: "" //表单提交变量

        //    //terminationPerformanceId: "" //主键
        //  },
        //  clausePrice: {
        //    bottomPrice: "", //保底电价
        //    customerProportion: "" //用户分成比例
        //  },
        clausePlan: {
          electricityId: '',
        },
        //#3519 gaoaining 2020-01-16 添加合同编号和转让总电费
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

          replacedPartyCode: '', //甲方id
          replacedPartyName: '', //甲方name //模糊查询数据来自发电公司
          substitutePartyCode: '',
          substitutePartyName: '',
          beginDate: '', //合同生效日期
          contractCode: '', //合同编码
          contractNumber: '', //合同编号
          totalElectricityTransferred: '', //转让总电费
          contractName: '', //合同名称
          contractTypeCode: 'htlx01', //合同类型
          dealPrice: '', //交易电价
          contractSigningType: '', //签约类型
          enclosure: '', //附件路径
          endDate: '', //合同失效日期
          orgId: '',
          remarks: '', ///备注
          signingDate: '', //合同签订日期
          totalElectricity: 0, ///合同总电量
          templateId: '', //合同模板id
          tradingTypeName: '', //处受让类型
          tradingTypeCode: '', //处受让类型
          tradeName: '', //交易名称
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
      },
      //表单校验
      contractLedgerFormRules: {
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
        'htContract.customerName': [
          {
            required: true,
            message: '请输入名称',
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
        'htContract.beginDate': [
          {
            required: true,
            message: '请输入合同生效日期',
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
        'htContract.stateCode': [
          {
            required: true,
            message: '请输入合同状态',
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
        //添加交易电厂必填校验
        'htContract.substitutePartyName': [
          {
            required: true,
            message: '请输入交易电厂',
            trigger: 'change',
          },
        ],
      },

      isErr: false,
      tableKey: 0,
      tableList: [],
      tabHeight: 200,
      dialogHeight: 0, //弹窗高度
      htElectricityPackageManager_btn_amendant: false, //修改记录按钮
      zlist: [],
      ztotal: 0,
      displayStatus: '', //修改记录是否显示判断状态
      originalId: '', //版本记录传值组件
      dialogFormVisibleTwo: false, //修改记录弹窗
      submitState: true, //保存按钮是否显示初始化
      unitMap: {},
      checkFlag: false,
      electricityUnit: '',
      priceUnit: '',
      chargeUnit: '',
      capacityUnit: '',

      dataStatus: '',
      flagOption: 'add',
      electricityTradeState: false,
      monthlyElectricityState: false,
      activeNames: ['1', '2'],
      userList: [
        {
          orgName: 'tt',
          orgCode: 'dd',
          meterNumber: '4',
          voltageLevelCode: '220',
          supplyStationCode: 'uu',
          electricalCapacity: '20',
          remarks: '',
        },
        {
          orgName: 'a',
          orgCode: 'eee',
          meterNumber: '5',
          voltageLevelCode: '110',
          supplyStationCode: 'b',
          electricalCapacity: '10',
          remarks: '',
        },
      ],
      listLoading: false,
      sdTemplateName: '',
      // contractForm:{
      //   templateId:"",
      //   contractTypeCode:"htlx01",
      //   secondPartyName:"",
      //   secondPartyCode:"",
      // },
      // althtStateCodeList:[],
      loading: false, //加载状态
      searchLoading: false, //加载状态
      state: false,
      formLoading: false, //加载状态
      // htWaysOfCompensation: [], //赔偿方式
      //-------------------------
      //上传=====================
      myFileList: [],
      isUpload: false,
      changeFileList: [],
      show_file_name: true,
      limit_number: 10,
      dialogTitle: '', //售电模板标题
      addDialogVisible: false, //新增编辑弹出框状态
      //-------------------------下拉框模糊查询
      firstPartyList: [],
      secondPartyList: [],
      datatemp: '',
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

      contractId: '',
      optionsA: [],
    };
  },
  created() {
    this.init();
    this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
    this.uplaodHeaders = {
      Authorization: getToken(),
      ModelCode: sessionStorage.getItem('modelCode'),
    };
    this.initFormData();

    //修改记录按钮权限
    this.htElectricityPackageManager_btn_amendant = this.elements[
      'htElectricityPackageManager:btn_amendant'
    ];
    // 获取弹窗高度
    this.dialogHeight = initDialogHeight();
    /** #2921 2019-11-29 康如涛 补充变量初始化 start */
    const that = this;
    /** #2921 2019-11-29 康如涛 补充变量初始化 end */
    window.onresize = function temp() {
      that.dialogHeight = initDialogHeight(); //获取弹框高度(监控高度变化)
    };
    this.getcontractType();
    this.setLayoutHeight();
  },
  computed: {
    ...mapGetters(['elements', 'allSubMenus']),
  },
  mounted() {},
  methods: {
    //初始化新增
    initDialog(contractForm, dialogInfo) {
      this.getFawuIs();
      this.tableList = [];
      this.addRow();
      //20200511 阿彪 #4029 新增合同时，弹出台账编辑页面不应出现‘修改记录’功能
      this.displayStatus = '';
      // 保存时显示保存按钮
      this.submitState = dialogInfo.submitState;
      // if (this.$refs.uploadFileAdd === undefined) {
      // } else {
      //   this.$refs.uploadFileAdd.clearFiles();
      // }
      //清空表单
      const _set = this.$refs;
      if (_set.contractForm === undefined) {
      } else {
        _set.contractForm.resetFields();
      }
      this.reInitFormData();

      this.contractLedgerForm.htContract.tradingTypeName = this.assignmentTypeOption[0].propName;
      this.contractLedgerForm.htContract.tradingTypeCode = this.assignmentTypeOption[0].propCode;

      this.dialogTitle = dialogInfo.sdTemplateName || '查看';
      this.sdTemplateName = dialogInfo.sdTemplateName || '查看';
      this.flagOption = dialogInfo.flagOption;
      this.contractLedgerForm.htContract.templateId = contractForm.templateId;
      this.dataStatus = '';
      this.contractLedgerForm.htContract.contractCode =
        contractForm.contractCode;
      this.contractLedgerForm.htContract.replacedPartyName =
        contractForm.replacedPartyName;
      this.contractLedgerForm.htContract.replacedPartyCode =
        contractForm.replacedPartyCode;
      this.contractLedgerForm.htContract.enclosure = '';
      this.contractLedgerForm.htContract.isVirtual = this.isVirtual || 0;

      // this.initUpload(this.contractLedgerForm.htContract.enclosure);
      this.addDialogVisible = true;
    },

    //初始化编辑
    initEditDialog(dataInfo, dialogInfo) {
      this.hasStopReason = _.has(dataInfo.htContract, 'contractEndReason');

      this.getFawuIs();
      // this.tableList=dataInfo.htTransferOfPowerGenerationRightlist;
      let items = dataInfo.htTransferOfPowerGenerationRightlist.map(
        (item, index) => {
          item.index = index + 1;
          return item;
        }
      );
      this.tableList = items;
      if (this.tableList.length == 0) {
        this.addRow();
      }

      this.displayStatus = dataInfo.htContract.dataStatus;
      this.originalId = dataInfo.htContract.contractId;
      this.submitState = dialogInfo.submitState;
      // if (this.$refs.uploadFileAdd === undefined) {
      // } else {
      //   this.$refs.uploadFileAdd.clearFiles();
      // }
      this.reInitFormData();
      this.state = dialogInfo.state;
      this.electricityTradeState = dialogInfo.state;
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

      // 把时间验证放在表单重置再赋值之后  防止验证历史数据  Frj #2512   2019年10月29日14:17:59
      this.checkTime();
      this.contractId = dataInfo.htContract.contractId;
      this.dialogTitle = dialogInfo.sdTemplateName || '查看';
      this.sdTemplateName = dialogInfo.sdTemplateName || '查看';
      this.dataStatus = dataInfo.htContract.dataStatusName;
      // this.contractLedgerForm.htContract["stateName"]= this.getStateNameByCode(this.contractLedgerForm.htContract.stateCode);
      if (typeof this.contractLedgerForm.htContract.enclosure == 'undefined') {
        this.contractLedgerForm.htContract.enclosure = '';
      }
      // this.initUpload(dataInfo.htContract.enclosure);
      this.addDialogVisible = true;
    },

    init() {
      if (this.tableList.length == 0) {
        this.addRow();
      }
    },
    //添加table高度
    setLayoutHeight() {
      let layoutInfo = initLayoutInfo();
      //this.tabHeight = layoutInfo.height- 360;
      this.tabHeight = initDialogHeight() * 0.55 + 'px'; //2019-11-12 #2620 张朋 修改计算的表格高度
    },
    /**
     * @方法名称: clicXGJL
     * @功能描述: 点击查询记录按钮
     * @参数:
     * @返回值:
     * @作者: 李志佳
     * @Date: 2019-11-13 10:01:26
     * @最新修改内容:
     * @LastEditTime:
     */
    clicXGJL() {
      this.dialogFormVisibleTwo = true;
      if (this.$refs.amendantRecord) {
        this.$refs.amendantRecord.init();
      }
    },
    /**
     * @方法名称: getRecords
     * @功能描述: 修改记录查询
     * @参数:
     * @返回值:
     * @作者: frj
     * @issues: #2458
     * @Date: 2019-11-06 15:41:00
     * @最新修改内容:
     * @LastEditTime:
     */
    getRecords(listPageInfo) {
      let parme = {
        originalId: this.originalId,
        limit: listPageInfo.limit,
        page: listPageInfo.page,
      };
      getHtRecords(parme).then((res) => {
        let items = res.data.rows.map((item, index) => {
          item.index = index + 1 + (listPageInfo.page - 1) * listPageInfo.limit;
          return item;
        });
        this.zlist = res.data.rows;
        this.ztotal = res.data.total;
      });
    },
    //2019-12-02 #2900 秦侯珍 获取签约类型数据
    getcontractType() {
      getSelectList('contract_signing_type').then((res) => {
        this.optionsA = res;
      });
    },
    /**
     * @方法名称: closeAmendantRecord
     * @功能描述: 关闭修改记录弹框
     * @参数:
     * @返回值:
     * @作者: frj
     * @issues: #2458
     * @Date: 2019-11-06 15:21:36
     * @最新修改内容:
     * @LastEditTime:
     */
    closeAmendantRecord() {
      this.dialogFormVisibleTwo = false;
    },
    querySearchAsync(queryString, cb) {
      var list = [{}];
      //发电公司模糊查询
      this.searchLoading = true;
      this.orgFilterData = [];
      let parameters = { orgName: queryString, attributeTypeCode: 'zzjgsx02' };
      getPowerGeneratorName(parameters).then((res) => {
        if (typeof res != 'undefined') {
          if (res.length > 0) {
            res.forEach((item) => {
              list.push({
                value: item.orgName,
                orgId: item.id,
              });
            });
          }
        }
        cb(list);
      });
    },
    //已上传显示
    showUploaded(data) {
      let file = data;

      let fileArr = file.split('/');
      this.fileInfo.path = data;
      this.fileInfo.name = fileArr[fileArr.length - 1];
      this.file_rode = true;
      this.uploadBtn = false;
    },
    initFormData() {
      for (let i = 0; i < 12; i++) {
        let key = this.months[i] + 'ElectricityTrade';
        let key2 = this.months[i] + 'ElectricityPrice';
        let key3 = this.months[i] + 'ElectricityCost';
        this.$set(this.contractLedgerForm['clausePlan'], key, '');
        this.$set(this.contractLedgerForm['clausePlan'], key2, '');
        this.$set(this.contractLedgerForm['clausePlan'], key3, '');
      }
    },
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
    reInitFormData() {
      // this.$refs.contractLedgerForm.resetFields();
      for (let key in this.contractLedgerForm) {
        for (let key2 in this.contractLedgerForm[key]) {
          if (key2 == 'partyAssessmentRatio') {
            this.$set(this.contractLedgerForm[key], key2, 0);
          } else {
            this.$set(this.contractLedgerForm[key], key2, '');
          }
        }
      }
    },
    showUpload() {
      this.$refs.uploadFileAdd.clearFiles();
      this.fileInfo.name = '';
      this.fileInfo.path = '';
      this.contractLedgerForm.htContract.enclosure = '';
      this.uploadBtn = true;
    },

    showUplaodFile(data) {
      let file = data;
      let fileArr = file.split('/');
      this.fileInfo.path = data;
      this.fileInfo.name = fileArr[fileArr.length - 1];
    },

    submitSave(dataStatus) {
      // this.checkTab()
      let _this = this;
      //_this.checkFlag = true;
      const set = this.$refs;
      let electricityTrade = 0;
      let isMonthlyElectricitySum = true;
      for (let i = 0; i < 12; i++) {
        electricityTrade += Number(
          this.contractLedgerForm.clausePlan[
            this.months[i] + 'ElectricityTrade'
          ]
        );
      }
      // #3464 2020-01-05 张亮三 解决当用电计划月分解电量为空时不做校验 start
      for (let i = 0; i < 12; i++) {
        let clausePlanKey = this.contractLedgerForm.clausePlan[
          this.months[i] + 'ElectricityTrade'
        ];
        if (clausePlanKey !== '') {
          if (
            this.contractLedgerForm.htContract.totalElectricity !=
            electricityTrade
          ) {
            isMonthlyElectricitySum = false;
          }
        }
      }
      // #3464 2020-01-05 张亮三 解决当用电计划月分解电量为空时不做校验 end
      if (!isMonthlyElectricitySum) {
        this.$alert('计划转让各月汇总与总电量不同！', '消息提示', {
          type: 'warning',
          confirmButtonText: '确定',
          callback: (action) => {
            _this.checkFlag = false;
          },
        });
      }
      this.dataStatus = dataStatus;

      if (isMonthlyElectricitySum) {
        set['contractLedgerForm'].validate((valid) => {
          if (valid) {
            // 补充协议暂存
            if (this.replenish) {
              this.$emit('initList', this.contractLedgerForm);
              this.addDialogVisible = false;
              this.innerVisible = false;
              return;
            }
            this.formLoading = true;
            this.contractLedgerForm.htContract.dataStatus = dataStatus;

            // 是否进入法务系统
            this.intoFawu(set, '');
          } else {
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
    //通过Name值获取Code
    getStateCodeByName(name) {
      let propCode = '';
      this.althtStateCodeList.forEach((item) => {
        if (item.propName === name) {
          propCode = item.propCode;
        }
      });
      return propCode;
    },
    ////通过Code值获取name
    getStateNameByCode(code) {
      let propName = '';
      this.althtStateCodeList.forEach((item) => {
        if (item.propCode === code) {
          propName = item.propCode;
        }
      });
      return propName;
    },
    //修改
    editObject() {
      // console.log(this.checkTradingUnit());
      if (this.checkTradingUnit()) {
        this.formLoading = false;
        return false;
      } else {
        let parme = this.contractLedgerForm;
        for (let key in this.contractLedgerForm) {
          parme[key]['contractId'] = this.contractId;
        }
        let parame = this.contractLedgerForm;

        for (let key in this.contractLedgerForm) {
          parame[key]['contractId'] = this.contractId;
        }

        // todo wsc 2020-10-29 混入法务系统必填字段
        parame.htContract = {
          ...this.contractLedgerForm.htContract,
          ...parame.htContract,
          ...this.contractLedgerForm.legal,
        };

        parame.htTransferOfPowerGenerationRightlist = this.tableList;
        editObj(parame).then((res) => {
          this.formLoading = false;
          if (res.rel) {
            this.addDialogVisible = false;
            this.$notify({
              title: res.msg,
              message: res.msg,
              type: 'success',
              duration: 2000,
            });
            this.$emit('initList');
          } else {
            this.checkFlag = false;
            this.$notify({
              title: res.msg,
              message: res.msg,
              type: 'warning',
              duration: 2000,
            });
            this.$emit('initList');
          }
        });
      }
    },
    //新增
    addObject() {
      let parame = {};
      parame.clausePlan = {};
      parame.htContract = {};
      parame.templatePowerList = this.contractLedgerForm.templatePowerList;
      parame.htTransferOfPowerGenerationRightlist = this.tableList;
      for (let key in this.contractLedgerForm.clausePlan) {
        if (key != 'contractId' && key != 'electricityId') {
          parame.clausePlan[key] = this.contractLedgerForm.clausePlan[key];
        }
      }

      console.log(this.contractLedgerForm.htContract);
      // for (let key in this.contractLedgerForm.htContract) {
      //   if (key != "contractId") {
      //     if( this.contractLedgerForm.htContract[key] != '' && typeof this.contractLedgerForm.htContract[key] != 'undefined'){
      //       parame.htContract[key] = this.contractLedgerForm.htContract[key];
      //     }
      //   }
      // }
      // #4206 gaoaining 2020-06-09 修改传参 end

      // todo wsc 2020-10-29 混入法务系统必填字段
      parame.htContract = {
        ...this.contractLedgerForm.htContract,
        ...this.contractLedgerForm.legal,
      };

      if (this.checkTradingUnit()) {
        this.formLoading = false;
        return false;
      } else {
        addObj(parame).then((res) => {
          this.formLoading = false;
          if (res.rel) {
            this.$emit('initList');
            this.addDialogVisible = false;
            this.$notify({
              title: res.msg,
              message: res.msg,
              type: 'success',
              duration: 2000,
            });
            this.$emit('initList');
          } else {
            this.checkFlag = false;
            this.$notify({
              title: res.msg,
              message: res.msg,
              type: 'warning',
              duration: 2000,
            });
            this.$emit('initList');
          }
        });
      }
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
      this.contractLedgerForm.htContract.contractTypeCode = 'htlx02';
      // this.contractLedgerForm.htContract["stateCode"]= this.getStateCodeByName(this.contractLedgerForm.htContract.stateName);

      if (this.flagOption === 'edit') {
        this.editObject();
      } else {
        this.addObject();
      }
    },
    closeDialog() {
      if (this.flagOption === 'edit') {
        this.fileInfo.name = '';
        this.fileInfo.path = '';
        //  this.form.enclosure = "";
        this.uploadBtn = true;
      } else {
        this.fileInfo.name = '';
        this.fileInfo.path = '';
        this.contractLedgerForm.htContract.enclosure = '';
        this.uploadBtn = true;
      }
    },
    changeSecondPartyInfo(data) {
      this.contractLedgerForm.htContract.substitutePartyName = data.value;
      this.contractLedgerForm.htContract.substitutePartyCode = data.orgId;
    },
    //下拉框触发事件
    getSelectValueBysecondParty(data) {
      this.contractLedgerForm.clauseViolation['firstPartyCompensation'] = data;
    },
    //---------------------------------下拉框模糊查询
    getFirstPartyInfo(query) {
      this.firstPartyList = [];
      let cusType = 'khlb3';
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          let parme = { cusType: cusType, name: query };
          getcustomerId(parme).then((res) => {
            this.firstPartyList = res.data.customerInfo;
          });
        }, 200);
      } else {
        this.firstPartyList = [];
      }
    },
    changeFirstPartyInfo(val) {
      this.firstPartyList.map((item) => {
        if (item.customerName === val) {
          this.contractLedgerForm.htContract.replacedPartyCode =
            item.customerId;
          this.contractLedgerForm.htContract.replacedPartyName =
            item.customerName;
        }
      });
    },
    //下拉框触发事件
    getSelectValueByFirstParty(data) {
      this.contractLedgerForm.clauseViolation['firstPartyCompensation'] = data;
    },
    //弹框关闭执行方法
    handleClose() {
      //清空表单
      const _set = this.$refs;
      if (_set.contractLedgerForm === undefined) {
      } else {
        _set.contractLedgerForm.resetFields();
      }
      this.addDialogVisible = false;
    },
    changeTradingType(val) {
      this.assignmentTypeOption.forEach((item) => {
        if (val == item.propName) {
          this.contractLedgerForm.htContract.tradingTypeCode = item.propCode;
        }
      });
    },
    //详情内附件下载
    handleDownload(file) {
      // let parme = {
      //   customerId: this.form.customerId
      // };
      if (file.status != 'ready') {
        let parme = {
          enclosures: file.url,
        };
        downloadOneFileUs1(parme);
      }
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
    changeSelect() {
      this.$emit('setSelected', selected, this.propCode);
    },
    //审批
    approvalPass() {
      this.$emit('openCheckWin', '3');
    },
    approvalReject() {
      this.$emit('openCheckWin', '4');
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
    //点击文件列表中已上传的文件
    handlePreview(file) {
      downloadOneFile(file.url);
    },
    //上传文件之前#3523 gaoaining 2020-01-07 限制文件大小
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
      // this.showUplaodFile(this.contractLedgerForm.htContract.enclosure);
      // this.formLoading = false;
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
    //#3554 gaoaining 2020-01-09 添加表格行
    addRow() {
      let index = this.tableList.length + 1;
      var newData = {
        index: index,
        contractPeriod: '',
        contractPeriodStatus: '',
        contractPeriodStatusMsg: '',
        transactionSequenceNameStatus: '',
        transactionSequenceNameStatusMsg: '',
        transactionSequenceName: '',
        electricityTrad: '',
        electricityPrice: '',
        transferSpread: '',
      };
      this.tableList.push(newData);
    },

    /**
     * @方法名称:
     * @功能描述:检测交易序列名称与转让期次唯一性
     * @参数:
     * @返回值:
     * @作者: gaoaining #3554
     * @Date: 2020-01-09 16:14:31
     * @最新修改内容: #3554优化
     * @LastEditTime:
     */

    checkTradingUnit() {
      let isErr = false;
      let jsq = 0;
      let tempList = [];
      this.tableList.forEach((item) => {
        //jsq > 1说明交易列表名称和转让期次不唯一
        jsq = this.tableList.filter(function(n) {
          return (
            n.transactionSequenceName + n.contractPeriod ==
            item.transactionSequenceName + item.contractPeriod
          );
        }).length;

        // if(jsq > 1){
        //   item.transactionSequenceNameStatus="ipt-err-true";
        //   item.transactionSequenceNameStatusMsg="交易序列名称不能重复";
        //   item.contractPeriodStatus="ipt-err-true";
        //   item.contractPeriodStatusMsg="转让期次不能重复";
        //   isErr = true;
        // }else{
        //   item.ctStatus = "";
        //   item.ctStatusMsg = "";
        // }
        // tempList.push(item)
        if (
          item.transactionSequenceName != '' &&
          typeof item.transactionSequenceName != 'undefined'
        ) {
          if (
            item.contractPeriod == '' ||
            item.contractPeriod == null ||
            typeof item.contractPeriod == 'undefined'
          ) {
            // console.log("转让期次空")
            isErr = true;
            item.contractPeriodStatus = 'ipt-err-true';
            item.contractPeriodStatusMsg = '转让期次不能为空';
            tempList.push(item);
          } else {
            // console.log('都不为空')
            if (jsq > 1) {
              item.transactionSequenceNameStatus = 'ipt-err-true';
              item.transactionSequenceNameStatusMsg = '交易序列名称不能重复';
              item.contractPeriodStatus = 'ipt-err-true';
              item.contractPeriodStatusMsg = '转让期次不能重复';
              isErr = true;
            } else {
              item.ctStatus = '';
              item.ctStatusMsg = '';
            }
            tempList.push(item);
          }
        } else {
          if (
            item.contractPeriod == '' ||
            item.contractPeriod == null ||
            typeof item.contractPeriod == 'undefined'
          ) {
            // console.log("全空")
            item = null;
          } else {
            //  console.log("交易序列名称空")
            item.transactionSequenceNameStatus = 'ipt-err-true';
            item.transactionSequenceNameStatusMsg = '交易序列名称不能为空';
            isErr = true;
            tempList.push(item);
          }
        }
      });
      this.tableList = tempList;
      return isErr;
    },

    /**
     * @方法名称:
     * @功能描述:检测表格数据
     * @参数:
     * @返回值:
     * @作者:gaoaining #3554
     * @Date: 2020-01-09 16:18:53
     * @最新修改内容:
     * @LastEditTime:
     */

    // checkTab(data) {
    //   this.isErr = false;
    //   for (let i = 0, l = this.tableList.length; i < l; i++) {
    //     this.tableList[i].transactionSequenceNameStatus = "";
    //     this.tableList[i].contractPeriodStatus = "";
    //     this.tableList[i].electricityTradStatus = "";
    //     this.tableList[i].electricityPriceStatus = "";
    //     this.tableList[i].transferSpreadStatus = "";
    //     if(
    //       this.tableList[i].transactionSequenceName == "" ||
    //       typeof this.tableList[i].transactionSequenceName == "undefined"||
    //       this.tableList[i].contractPeriod == "" ||
    //        typeof this.tableList[i].contractPeriod == "undefined"
    //     ){
    //       this.tableList=[];
    //     }else{
    //       if (
    //         this.tableList[i].electricityTrad == "" ||
    //         typeof this.tableList[i].electricityTrad == "undefined"
    //       ) {
    //         this.tableList[i].electricityTradStatus = "ipt-err-true"; //交易序列名称
    //         this.tableList[i].electricityTradStatusMsg ="不能为空";
    //         this.isErr = true;
    //       }else if(
    //         this.tableList[i].electricityPrice == "" ||
    //         typeof this.tableList[i].electricityPrice == "undefined"
    //       ){
    //         this.tableList[i].electricityPriceStatus = "ipt-err-true"; //交易序列名称
    //         this.tableList[i].electricityPriceStatusMsg ="不能为空";
    //         this.isErr = true;
    //       }

    //     }

    //  }
    // },

    //#3554 gaoaining 移除行信息
    delRowData(row) {
      this.tableList.splice(row, 1);
      let items = this.tableList.map((item, index) => {
        item.index = index + 1;
        return item;
      });
      this.tableList = items;
      if (this.tableList.length == 0) {
        this.addRow();
      }
    },
    /**
     * @方法名称: 删除功能
     * @功能描述:
     * @参数:
     * @返回值:
     * @作者:#3554  gaoaining
     * @Date: 2020-01-14 17:39:21
     * @最新修改内容:
     * @LastEditTime:
     */
    handleDelete(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        if (typeof row.contractDetailId == 'undefined') {
          this.delRowData(row);
        } else {
          if (row.contractDetailId == '') {
            this.delRowData(row);
          } else {
            delDetailObj(row.contractDetailId).then((res) => {
              if (res.rel) {
                this.$notify({
                  title: '成功',
                  message: res.msg,
                  type: 'success',
                  duration: 2000,
                });
                this.delRowData(row);
              } else {
                this.$notify({
                  title: '提示',
                  message: res.msg,
                  type: 'warning',
                  duration: 2000,
                });
              }
            });
          }
        }
        return false;
      });
    },
    //#3554 gaoaining  设置表格申报日期格式
    setDeclarationDate(val, row) {
      if (val != null && val != '') {
        this.tableList[row.index - 1]['contractPeriod'] = parseTime(
          val,
          '{y}-{m}'
        );
      }
    },
  },
};
</script>

<style scoped>
.choose_contract {
  margin-left: 20px;
}

.yulan_color {
  color: blue;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type='number'] {
  -moz-appearance: textfield;
}

.altdiv {
  height: 450px;
  padding-right: 15px;
}

.font_center {
  text-align: right;
  margin-right: 1px;
}

.view_style {
  text-align: right;
  padding-right: 10px;
  margin-bottom: 5px;
}

.button_center {
  display: block;
  margin: 0 auto;
}

.el-input-number {
  line-height: 26px !important;
  width: 38% !important;
}

.el-input.ddw1 {
  width: 60%;
}

.el-input input {
  text-align: right;
}

.el-select .el-input input {
  text-align: left;
}
</style>
