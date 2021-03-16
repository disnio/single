<!--
 * @功能描述:
 * @版本:
 * @作者:
 * @Date: 2019-10-24 14:52:53
 * @最新修改内容: 购售电合同
 * @LastEditTime: 2020-06-05 10:51:15
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

      <!-- 弹窗高度自适应 s #2621 frj 2019-11-11 19:50:59 -->
      <div :style="{ paddingRight: '10px', height: dialogHeight + 'px' }">
        <el-scrollbar>
          <!-- 弹窗高度自适应 e #2621 frj 2019-11-11 19:50:59 -->
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
                        <el-form-item label="合同状态：">
                          <span>{{ dataStatus }}</span>
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
                          label="合同生效日期："
                          prop="htContract.beginDate"
                        >
                          <el-date-picker
                            :disabled="state"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
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
                            value-format="yyyy-MM-dd"
                            @change="checkTime()"
                            v-model="contractLedgerForm.htContract.endDate"
                            style="width: 100%;"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item
                          prop="htContract.noticeName"
                          label="交易序列:"
                        >
                          <el-select
                            :disabled="state"
                            style="width:100%;"
                            v-model="contractLedgerForm.htContract.noticeName"
                            :remote-method="getTransactionName"
                            :clearable="true"
                            @change="customer_select"
                            filterable
                            remote
                            :loading="loading"
                          >
                            <el-option
                              v-for="item in transactionData"
                              :key="item.noticeId"
                              :label="item.value"
                              :value="item.noticeId"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="交易单号:">
                          <el-input
                            :disabled="state"
                            v-model="contractLedgerForm.htContract.noticeId"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="交易品种:">
                          <el-select
                            style="width:100%;"
                            :disabled="state"
                            v-model="
                              contractLedgerForm.htContract.tradingVariety
                            "
                            placeholder="请选择"
                          >
                            <el-option
                              v-for="item in varietyOptions"
                              :key="item.propCode"
                              :label="item.propName"
                              :value="item.propCode"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="交易方式:">
                          <el-select
                            style="width:100%;"
                            :disabled="state"
                            v-model="contractLedgerForm.htContract.tradingWay"
                            placeholder="请选择"
                          >
                            <el-option
                              v-for="item in wayOptions"
                              :key="item.propCode"
                              :label="item.propName"
                              :value="item.propCode"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-form-item
                          label="用电方:"
                          prop="htContract.purchaserCode"
                        >
                          <el-select
                            :disabled="ydState"
                            style="width:100%;"
                            v-model="
                              contractLedgerForm.htContract.purchaserCode
                            "
                            :remote-method="getCustomerByName"
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
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-form-item
                          label="发电方:"
                          prop="htContract.supplierCode"
                        >
                          <el-select
                            :disabled="fdState"
                            style="width:100%;"
                            v-model="contractLedgerForm.htContract.supplierCode"
                            @change="generationChange"
                            :clearable="true"
                            filterable
                            remote
                            :loading="loading"
                          >
                            <el-option
                              v-for="(item, index) in powerGeneratorData"
                              :key="index"
                              :label="item.orgName"
                              :value="item.id"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="交易单元:">
                          <el-select
                            :disabled="state"
                            style="width:100%;"
                            v-model="contractLedgerForm.htContract.tradingUnit"
                          >
                            <el-option
                              v-for="item in jydyOptions"
                              :key="item.index"
                              :label="item.tradingUnitName"
                              :value="item.tradingUnitCode"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="参与机组:">
                          <el-input
                            :disabled="state"
                            v-model="contractLedgerForm.htContract.cyjz"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-form-item label="输电方:" prop="htContract.sdOrg">
                          <el-input
                            :disabled="state"
                            v-model="contractLedgerForm.htContract.sdOrg"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="12">
                        <!-- #3160  郑文杰 合同管理--合同台账管理--优化 在合同台账中增加“合同定价方式”字段，。-->
                        <el-form-item
                          label="合同定价方式"
                          prop="htContract.contractPriceWay"
                        >
                          <el-select
                            v-model="
                              contractLedgerForm.htContract.contractPriceWay
                            "
                            :disabled="true"
                          >
                            <el-option
                              v-for="item in bjfs"
                              :key="item.propCode"
                              :label="item.propName"
                              :value="item.propCode"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="交易电量:">
                          <el-input
                            :disabled="state"
                            class="ddw1"
                            type="number"
                            v-model="
                              contractLedgerForm.htContract.dealElectricity
                            "
                          ></el-input>
                          <span>{{ unitMap.electricityUnit }}</span>
                          <!-- #3487 2020-01-05 康如涛 隐藏查看时分解按钮  start -->
                          <el-button
                            class="filter-item"
                            type="primary"
                            v-if="!state"
                            @click="share('dealElectricity')"
                            >分解
                          </el-button>
                          <!-- #3487 2020-01-05 康如涛 隐藏查看时分解按钮  end -->
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label=" 交易电价:">
                          <el-input
                            :disabled="state"
                            @mousewheel.native.prevent
                            onkeypress="return (event.keyCode>=48&&event.keyCode<=57)||event.keyCode==46"
                            class="ddw1"
                            type="number"
                            v-model="contractLedgerForm.htContract.dealPrice"
                          ></el-input>
                          <span>{{ unitMap.priceUnit }}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <!--vue resetFields 表单清空方法 需要prop属性对应各个层级  #2518 frj 2019年10月30日14:37:45-->
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
                      <!--  2019-12-02 #2900 秦侯珍 增加签约类型字段 start-->
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
                      <!--  2019-12-02 #2900 秦侯珍 增加签约类型字段 end-->
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
                    title="用电计划"
                    name="5"
                    style="margin-left:10px"
                  >
                    <!--                 <div class="txt-right">单位：万千瓦时</div> -->
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
                                  月分解电量（{{ unitMap.electricityUnit }}）
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
                                <span
                                  >月度分解电价（{{ unitMap.priceUnit }}）</span
                                >
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
                                :disabled="state"
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
                                :disabled="state"
                                v-model="
                                  contractLedgerForm.clausePlan
                                    .janYearBilateElecPrice
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
                            <el-col :span="9">
                              <el-input
                                type="number"
                                @mousewheel.native.prevent
                                :disabled="state"
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
                                :disabled="state"
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
                                :disabled="state"
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
                                :disabled="state"
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
                                :disabled="state"
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
                                :disabled="state"
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
                                :disabled="state"
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
                                :disabled="state"
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
                                :disabled="state"
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
                                :disabled="state"
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
                                :disabled="state"
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
                                :disabled="state"
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
                                :disabled="state"
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
                                :disabled="state"
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
                                :disabled="state"
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
                                :disabled="state"
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
                                :disabled="state"
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
                                :disabled="state"
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
                                :disabled="state"
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
                                :disabled="state"
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
                                :disabled="state"
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
                                :disabled="state"
                                v-model="
                                  contractLedgerForm.clausePlan
                                    .decYearBilateElecPrice
                                "
                              ></el-input>
                            </el-col>
                          </el-row>
                        </el-col>
                      </el-row>
                    </div>
                  </el-collapse-item>
                  <!-- 用电计划 end -->
                  <!-- 电量计划分配  -->
                  <el-collapse-item
                    title="电量计划分配"
                    name="10"
                    style="margin-left:10px"
                  >
                    <elec-fp
                      :unitMap="unitMap"
                      :query.sync="elecFp"
                      @update:query="changeElecFp"
                    ></elec-fp>
                  </el-collapse-item>
                  <!-- 电量计划分配 end -->

                  <!-- 偏差考核 -->
                  <el-collapse-item
                    title="偏差考核"
                    name="4"
                    style="margin-left:10px"
                  >
                    <el-row :gutter="10">
                      <el-col :span="12">
                        <!--vue resetFields 表单清空方法 需要prop属性对应各个层级  #2518 frj 2019年10月30日14:37:45-->
                        <el-form-item
                          label="允许正偏差比例:"
                          prop="clauseAssessment.allowPosDevRatio"
                        >
                          <el-input
                            :disabled="state"
                            onkeyup="value=value.replace(/[^0-9.]+/,'')"
                            class="ddw1"
                            type="number"
                            @mousewheel.native.prevent
                            v-model="
                              contractLedgerForm.clauseAssessment
                                .allowPosDevRatio
                            "
                          ></el-input>
                          <span>%</span>
                        </el-form-item>
                        <el-form-item label="正偏差考核比例:">
                          <el-input
                            onkeyup="value=value.replace(/[^0-9.]+/,'')"
                            :disabled="state"
                            class="ddw1"
                            type="number"
                            @mousewheel.native.prevent
                            v-model="
                              contractLedgerForm.clauseAssessment.posDevRatio
                            "
                          ></el-input>
                          <span>%</span>
                        </el-form-item>

                        <el-form-item label="偏差考核电价方式:">
                          <el-select
                            :disabled="state"
                            class="ddw1"
                            v-model="
                              contractLedgerForm.clauseAssessment
                                .devAssessmentElecPriceWay
                            "
                            placeholder="请选择免考核条件"
                          >
                            <el-option
                              v-for="item in devAssessmentElecPriceWays"
                              :key="item.propCode"
                              :label="item.propName"
                              :value="item.propCode"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <!-- <el-form-item label="用户承担比例:">
                          <el-input
                            :disabled="state"
                            class="ddw1"
                            type="number"
                            @mousewheel.native.prevent
                            v-model="
                              contractLedgerForm.clauseAssessment
                                .userCommitmentRatio
                            "
                          ></el-input>
                          <span>%</span>
                        </el-form-item>-->
                        <!--  2019-12-19 #3194 gaoaiing 增加甲乙承担比例 start-->
                        <el-form-item label="甲方承担比例:">
                          <el-input
                            :disabled="state"
                            class="ddw1"
                            type="number"
                            step="“0.0001”"
                            @mousewheel.native.prevent
                            @change="spCommitmentRatioJS"
                            v-model="
                              contractLedgerForm.clauseAssessment
                                .customerCommitmentRatio
                            "
                          ></el-input>
                          <span>%</span>
                        </el-form-item>
                        <el-form-item label="乙方承担比例:">
                          <el-input
                            :disabled="spState"
                            class="ddw1"
                            type="number"
                            step="“0.0001”"
                            @mousewheel.native.prevent
                            v-model="
                              contractLedgerForm.clauseAssessment
                                .spCommitmentRatio
                            "
                          ></el-input>
                          <span>%</span>
                        </el-form-item>
                        <!--  2019-12-19 #3194 gaoaiing 增加甲乙承担比例 end-->
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="允许负偏差比例:"
                          prop="clauseAssessment.allowNegDevRatio"
                        >
                          <el-input
                            :disabled="state"
                            @mousewheel.native.prevent
                            class="ddw1"
                            type="number"
                            v-model="
                              contractLedgerForm.clauseAssessment
                                .allowNegDevRatio
                            "
                          ></el-input>
                          <span>%</span>
                        </el-form-item>
                        <el-form-item
                          label="负偏差考核比例:"
                          prop="clauseAssessment.negDevRatio"
                        >
                          <el-input
                            :disabled="state"
                            type="number"
                            @mousewheel.native.prevent
                            class="ddw1"
                            v-model="
                              contractLedgerForm.clauseAssessment.negDevRatio
                            "
                          ></el-input>
                          <span>%</span>
                        </el-form-item>

                        <!-- <el-form-item label="偏差考核电价:">
                          <el-input
                            v-if="
                              this.contractLedgerForm.clauseAssessment
                                .devAssessmentElecPriceWay == 'pckh1002'
                            "
                            disabled
                            type="number"
                            @mousewheel.native.prevent
                            class="ddw1"
                            v-model="
                              contractLedgerForm.clauseAssessment
                                .devAssessmentElecPrice
                            "
                          ></el-input>
                          <el-input
                            v-else
                            :disabled="state"
                            class="ddw1"
                            type="number"
                            @mousewheel.native.prevent
                            v-model="
                              contractLedgerForm.clauseAssessment
                                .devAssessmentElecPrice
                            "
                          ></el-input>
                          <span>{{ unitMap.priceUnit }}</span>
                        </el-form-item>-->
                        <!--  2019-12-19 #3194 gaoaiing 增加正负偏差考核电价 start-->
                        <el-form-item label="正偏差考核电价:">
                          <el-input
                            v-if="
                              contractLedgerForm.clauseAssessment
                                .devAssessmentElecPriceWay == 'pckh1002'
                            "
                            disabled
                            class="ddw1"
                            v-model="
                              contractLedgerForm.clauseAssessment
                                .posDevAssessmentElecPrice
                            "
                          ></el-input>
                          <el-input
                            v-else
                            :disabled="state"
                            class="ddw1"
                            type="number"
                            step="“0.0001”"
                            @mousewheel.native.prevent
                            v-model="
                              contractLedgerForm.clauseAssessment
                                .posDevAssessmentElecPrice
                            "
                          ></el-input>
                          <span>{{ unitMap.priceUnit }}</span>
                        </el-form-item>
                        <el-form-item label="负偏差考核电价:">
                          <el-input
                            v-if="
                              contractLedgerForm.clauseAssessment
                                .devAssessmentElecPriceWay == 'pckh1002'
                            "
                            disabled
                            class="ddw1"
                            v-model="
                              contractLedgerForm.clauseAssessment
                                .negDevAssessmentElecPrice
                            "
                          ></el-input>
                          <el-input
                            v-else
                            :disabled="state"
                            class="ddw1"
                            type="number"
                            step="“0.0001”"
                            @mousewheel.native.prevent
                            v-model="
                              contractLedgerForm.clauseAssessment
                                .negDevAssessmentElecPrice
                            "
                          ></el-input>
                          <span>{{ unitMap.priceUnit }}</span>
                        </el-form-item>
                        <!--  2019-12-19 #3194 gaoaiing 增加正负偏差考核电价 end-->
                      </el-col>
                    </el-row>
                  </el-collapse-item>
                  <!-- 偏差考核 end -->
                  <!-- 附加条款  -->
                  <el-collapse-item
                    title="附加条款"
                    name="7"
                    style="margin-left:10px"
                  >
                    <el-form-item label="违约责任：">
                      <el-input
                        :disabled="state"
                        type="textarea"
                        rows="5"
                        resize="none"
                        v-model="
                          contractLedgerForm.additionalClause.violateDuty
                        "
                      ></el-input>
                    </el-form-item>
                  </el-collapse-item>
                  <!-- 附加条款 end -->
                  <!-- #3453 2020-01-06 张亮三 附件 start -->
                  <el-collapse-item
                    title="附件"
                    name="8"
                    style="margin-left:10px"
                  >
                    <div class="btn-box" v-if="!state">
                      <el-button
                        class="filter-item check"
                        type="primary"
                        :disabled="isAddfjj"
                        @click="addGsdht()"
                        >添加
                      </el-button>
                    </div>
                    <!-- #3647 2020-02-10 张亮三 增加单位 start -->
                    <div class="unit-box">
                      <span>单位：{{ unitMap.electricityUnit }}</span>
                    </div>
                    <!-- #3647 2020-02-10 张亮三 增加单位 end -->
                    <el-table
                      border
                      :data="contractLedgerForm.htTemplateAccessoriesVOList"
                      v-loading.body="listLoading"
                      ref="htTemplateAccessoriesVOList"
                    >
                      <el-table-column
                        type="index"
                        label="序号"
                        align="center"
                        width="50px"
                      ></el-table-column>
                      <el-table-column align="center" label="供电公司">
                        <template slot-scope="scope">
                          <div class="txt-center">
                            {{ scope.row.electricCompany }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="代理用户名称">
                        <template slot-scope="scope">
                          <div class="txt-center">
                            {{ scope.row.proxyUserName }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        align="center"
                        label="合计-代理用户交易电量"
                      >
                        <template slot-scope="scope">
                          <div class="txt-center">{{ scope.row.total }}</div>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                          <span>
                            <el-button
                              size="small"
                              type="text"
                              @click="
                                handleCheck(scope.$index, scope.row, 'views')
                              "
                              >详情</el-button
                            >
                          </span>
                          <span v-if="!state">
                            <el-button
                              size="small"
                              type="text"
                              @click="
                                handleUpdate(scope.$index, scope.row, 'edit')
                              "
                              >编辑</el-button
                            >
                          </span>
                          <span v-if="!state">
                            <el-button
                              size="small"
                              type="text"
                              @click="handleDelete(scope.$index, scope.row)"
                              >删除</el-button
                            >
                          </span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-collapse-item>
                  <!-- #3453 2020-01-06 张亮三 附件 end -->
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
          class="save-btn"
          :disabled="checkFlag"
          @click="submitSave('11')"
          v-if="displayStatus === '11' || (!state && this.submitState == true)"
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
    <!-- #3453 2020-01-05 张亮三 增加附件弹框 start -->
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      custom-class="w880"
      :title="FjTitles[dialogStatus]"
      :visible.sync="dialogFjtableVisible"
    >
      <div class="filter-container f-ml10 f-mt10 form-inline-180">
        <el-form
          :inline="true"
          :model="fjForm"
          class="demo-form-inline"
          ref="fjCheckForm"
        >
          <el-row>
            <el-col :span="9">
              <el-form-item label="供电公司：">
                <el-input
                  :disabled="dialogStatus == 'check'"
                  v-model="fjForm.electricCompany"
                  placeholder="请输入供电公司名称"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="代理用户名称：" algin="right">
                <el-select
                  class="four-col left"
                  :clearable="true"
                  :disabled="dialogStatus == 'check'"
                  v-model="fjForm['proxyUserName']"
                  placeholder="请输入代理用户"
                  filterable
                  remote
                  :remote-method="remoteMethod"
                >
                  <el-option
                    v-for="(item, index) in proxyUseroptions"
                    :key="index"
                    :label="item.orgName"
                    :value="item.orgName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <!-- #3647 2020-02-10 张亮三 增加单位 start -->
              <div class="unit-box">
                <span
                  >单位：{{ unitMap.electricityUnit }}、{{
                    unitMap.priceUnit
                  }}</span
                >
              </div>
              <!-- #3647 2020-02-10 张亮三 增加单位 end -->
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 表格 -->
      <el-table
        border
        :data="fjForm.htTemplateAccessoriesDetails"
        v-loading.body="infotablelistLoading"
        ref="list"
        show-summary
        :summary-method="getSummaries"
        :span-method="arraySpanMethod"
      >
        <el-table-column align="center" label="时间">
          <template slot-scope="scope">
            <div class="txt-center">{{ scope.row.time }}</div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="agentUserTransactionQuantity"
          label="代理用户交易电量"
        >
          <template slot-scope="scope">
            <el-input
              :disabled="dialogStatus == 'check'"
              v-model="scope.row.agentUserTransactionQuantity"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="用电方与售电方购销价差">
          <template slot-scope="scope">
            <el-input
              :disabled="dialogStatus == 'check'"
              v-model="scope.row.buyerSellerPrice"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="用电方与代理用户购销价差">
          <template slot-scope="scope">
            <el-input
              :disabled="dialogStatus == 'check'"
              v-model="scope.row.buyerProxyPrice"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="代理服务价格">
          <template slot-scope="scope">
            <el-input
              :disabled="dialogStatus == 'check'"
              v-model="scope.row.agencyServicePrice"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer btn_footer">
        <!-- 按钮 -->
        <el-button
          v-if="dialogStatus != 'check' && dialogStatus == 'create'"
          class="save-btn"
          @click="addfjForm"
          >保存
        </el-button>
        <el-button
          v-if="dialogStatus != 'check' && dialogStatus == 'update'"
          class="save-btn"
          @click="updateaddFjForm"
          >保存
        </el-button>
        <el-button class="cancel-btn" @click="dialogFjtableVisible = false"
          >关闭
        </el-button>
      </div>
    </el-dialog>
    <!-- #3453 2020-01-05 张亮三 增加附件弹框 end -->
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
  updateStatus,
  getTransactionName,
  getTransactionTypeName,
  getPowerGeneratorName,
  visitPopleId,
  getDealPrice,
  getHtRecords,
  getFjmounth, //新增获取月份
  addFjinfo, //购售电合同附件新增保存
  updateaddFjinfo, //购售电合同附件修改保存
  deleteFjinfo, //根据id删除附件条目
  getItemFjinfo, //附件详情
} from '@common/api/contractManage/contractLedger/index';
import { mapGetters } from 'vuex';
import { getToken } from '@common/utils/auth';
import { getcustomerId } from '@common/api/contractManage/contractLedger/index';
import { getCustomerByName } from '@common/api/contractManage/contractLedger/index';
import { parseTime, getUnitMap, initDialogHeight } from '@common/utils/index';
import {
  getSelectList,
  downloadOneFile,
  downloadOneFileUs1,
} from '@common/api/base';
import { getOrgById } from '@common/api/admin/orgStruManage/index';
import {
  waySelectObj,
  varietySelectObj,
  centerSelectObj,
  periodSelectObj,
  getValueByOrgIdAndCode,
  delResultObj,
} from '@common/api/business/jyTransactionNotice/index';
import { getjyListObj } from '@common/api/business/jyPowerBaseInfoCollection/index';
import amendantRecord from '@common/components//amendantRecord';
import fwmixin from '@common/components/contractLedger/fwmixin';
import FormFile from '@common/components/uniCom/formFile';
import up from '@common/components/contractLedger/up';
import elecFp from '@common/components/contractLedger/components/elecFp';
import reasonStop from '@common/components/contractLedger/components/reasonStop';
import bd from '@common/components/contractLedger/bd';

export default {
  mixins: [fwmixin, up, bd],
  components: {
    amendantRecord,
    'reason-stop': reasonStop,

    'form-file': FormFile,
    'elec-fp': elecFp,
  },
  props: {
    althtStateCodeList: { type: Array },
    htWaysOfCompensation: { type: Array },
    assessmentElectricityPriceTypes: { type: Array },
    fileTypeAudit: { type: Boolean },
    devAssessmentElecPriceWays: { type: Array },
    isVirtual: {
      type: Boolean,
    },
    replenish: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const allowNegDevRatioList = (rule, value, callback) => {
      let number = this.contractLedgerForm.clauseAssessment.allowNegDevRatio;
      var patrn = /^(-)?\d+(\.\d+)?$/;
      if (number == '' || number == null) {
        callback();
      } else {
        if (patrn.exec(number) == null || number == '') {
          return callback(new Error('必须为数字'));
        } else {
          /** 2019年11月4日09:40:11 #2463 李志佳 允许负偏差比例优化 start */
          // if (number > 0) {
          //   callback(new Error("该数为负值"));
          // } else {
          callback();
          // }
          /** 2019年11月4日09:40:11 #2463 李志佳 允许负偏差比例优化 end */
        }
      }
    };
    const negDevRatioList = (rule, value, callback) => {
      let number = this.contractLedgerForm.clauseAssessment.negDevRatio;
      var patrn = /^(-)?\d+(\.\d+)?$/;
      if (number == '' || number == null) {
        callback();
      } else {
        if (patrn.exec(number) == null || number == '') {
          return callback(new Error('必须为数字'));
        } else {
          // 合同台帐管理中,负偏差考核比例现在只允许填负数，应修改为正负都可以填。 s #2640 frj 2019-11-12 16:19:50
          // if (number > 0) {
          //   callback(new Error("该数为负值"));
          // } else {
          callback();
          // 合同台帐管理中,负偏差考核比例现在只允许填负数，应修改为正负都可以填。 e #2640 frj 2019-11-12 16:19:50
          // }
        }
      }
    };

    return {
      elecFp: {
        yearLongTermElectricity: '',
        monthElectricityBidding: '',
        largeIndustrialPower: '',
        generalCommercialElectricity: '',
        singlePowerGeneration: '',
        twoPartPower: '',
        peakPower: '',
        peakLectricityPrice: '',
        horizontalElectricQuantity: '',
        horizontalElectricPrice: '',
        lowPower: '',
        lowPrice: '',
      },
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

          // purchaserCode: "", //购电方id
          //purchaserName: "", //购电方name   //模糊查询数据来自发电公司
          //supplierName:"",//购供应商   //模糊查询数据来自发电公司
          supplierCode: '', //发电方id
          beginDate: '', //合同生效日期
          contractCode: '', //合同编码
          contractName: '', //合同名称
          contractTypeCode: 'htlx01', //合同类型
          contractSigningType: '', //签约类型
          enclosure: '', //附件路径
          endDate: '', //合同失效日期
          orgId: '',
          remarks: '', ///备注
          signingDate: '', //合同签订日期
          dataStatus: '', //合同状态
          dealElectricity: 0, ///交易电量
          dealPrice: '0', //交易电价
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
        clauseAssessment: {
          violationId: '',
          allowPosDevRatio: 0, //正偏差比例
          posDevRatio: '0', //正偏差考核比例
          allowNegDevRatio: 0, //负偏差比例
          negDevRatio: '0', //负偏差考核比例
          devAssessmentElecPriceWay: 'pckh1002', //偏差考核电价方式
          devAssessmentElecPrice: 0, //偏差考核电价
          userCommitmentRatio: '', //用户承担比例
          //#3194 2019-12-20 gaoaining 添加新字段 start
          customerCommitmentRatio: '', //甲方用户承担比例
          spCommitmentRatio: '', //乙方用户承担比例
          posDevAssessmentElecPrice: '', //正偏差电价
          negDevAssessmentElecPrice: '', //负偏差电价
          //#3194 2019-12-20 gaoaining 添加新字段 end
        },
        additionalClause: {
          additionalClauseId: '',
          violateDuty: '', //附加条款内容
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
        htTemplateAccessoriesVOList: [], //附件表格数据 HtTemplateAccessoriesVO
      },
      //表单校验
      contractLedgerFormRules: {
        'htContract.isRelate': [
          {
            required: true,
            message: '请选择关联交易',
            trigger: 'blur',
          },
        ],

        'clauseAssessment.allowNegDevRatio': [
          {
            required: false,
            trigger: 'blur',
            validator: allowNegDevRatioList,
          },
        ],
        'clauseAssessment.negDevRatio': [
          {
            required: false,
            trigger: 'blur',
            validator: negDevRatioList,
          },
        ],
        'htContract.contractCode': [
          {
            required: true,
            message: '请输入合同编码',
            trigger: 'blur',
          },
        ],
        'htContract.supplierName': [
          {
            required: true,
            message: '请输入发电方',
            trigger: 'blur',
          },
        ],
        'htContract.sdOrg': [
          {
            required: true,
            message: '请输入输电方',
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
        'htContract.replacedPartyName': [
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
        'htContract.endDate': [
          {
            required: true,
            message: '请输入合同失效日期',
            trigger: 'blur',
          },
        ],
      },

      fjRowLenght: '', //附件行长度
      spState: true,
      dialogHeight: 0, //弹窗高度
      htElectricityPackageManager_btn_amendant: false, //修改记录按钮
      zlist: [],
      ztotal: 0,
      infotablelistLoading: false,
      dialogFjtableVisible: false, //#3453 2020-01-05 张亮三 控制附件弹框显示隐藏
      fjtableList: [], //#3453 2020-01-05 张亮三 附件table表格数据
      FjTitles: {
        //#3453 2020-01-05 张亮三 附件弹框动态标题
        check: '详情',
        update: '编辑',
        create: '新增',
      },
      total: '', //附件 合计
      fjindex: 0,
      accessoriesId: '',
      proxyUseroptions: [], //#3453 2020-01-05 张亮三 附件代理用户查询数组
      dialogStatus: '',
      fjForm: {
        electricCompany: '', // 供电公司
        proxyUserName: '', //代理用户名称
        total: '', //合计
        htTemplateAccessoriesDetails: [], //表格详情数据 #3453  张亮三
      },
      displayStatus: '', //修改记录是否显示判断状态
      originalId: '', //版本记录传值组件
      dialogFormVisibleTwo: false, //修改记录弹窗
      submitState: true, //保存是否显示初始化
      checkFlag: false,
      electricityUnit: '',
      priceUnit: '',
      chargeUnit: '',
      capacityUnit: '',
      unitMap: {},
      flagOption: 'add',
      electricityTradeState: false,
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
      state: false,
      fdState: false,
      ydState: false,
      formLoading: false, //加载状态
      // htWaysOfCompensation: [], //赔偿方式
      //-------------------------
      //上传=====================
      myFileList: [],
      isUpload: false,
      changeFileList: [],
      show_file_name: true,
      limit_number: 10,
      id: '',
      jyTradingResultsId: '',
      dialogTitle: '', //售电模板标题
      addDialogVisible: false, //新增编辑弹出框状态
      //-------------------------下拉框模糊查询
      firstPartyList: [],
      transactionData: [], //交易序列数据
      customerFilterData: [], //客户模糊查询数据
      powerGeneratorData: [], //发电方
      varietyOptions: [], //交易品种
      wayOptions: [], //交易方式
      jydyOptions: [], //交易单元
      quotationMethod: '', //报价方式code
      datatemp: '',
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

      optionsA: [],
      dataStatus: '',
      contractId: '',

      bjfs: [],
    };
  },
  computed: {
    ...mapGetters(['elements', 'orgId', 'allSubMenus', 'sysOrg']),
    isAddfjj() {
      return !(
        this.contractLedgerForm.htContract.beginDate !== '' &&
        this.contractLedgerForm.htContract.endDate !== ''
      );
    },
  },
  //  watch: {
  //   unitMap: {
  //     handler(newVal, oldVal) {
  //       this.units=newVal;
  //     },
  //     immediate: true,
  //     deep: true
  //   }
  // },
  created() {
    this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
    this.uplaodHeaders = {
      Authorization: getToken(),
      ModelCode: sessionStorage.getItem('modelCode'),
    };
    // this.getOrgInfo();
    this.initFormData();
    //修改记录按钮权限
    this.htElectricityPackageManager_btn_amendant = this.elements[
      'htElectricityPackageManager:btn_amendant'
    ];
    // 获取弹窗高度
    this.dialogHeight = initDialogHeight();
    const that = this;
    window.onresize = function temp() {
      that.dialogHeight = initDialogHeight(); //获取弹框高度(监控高度变化)
    };
    this.getcontractType();
    this.getbjfs();
  },

  methods: {
    changeElecFp(q) {
      this.elecFp = {
        ...this.elecFp,
        ...q,
      };
    },
    initDialog(contractForm, dataInfo) {
      this.getFawuIs();
      console.log('new add', contractForm, dataInfo);
      this.contractLedgerForm.htTemplateAccessoriesVOList = [];
      this.checkFlag = false;
      this.displayStatus = '';
      //新增时显示保存按钮
      this.submitState = dataInfo.submitState;
      this.getOrgInfo(dataInfo);
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
      this.state = false;
      // this.contractForm=contractForm;
      this.dialogTitle = dataInfo.sdTemplateName;
      this.sdTemplateName = dataInfo.sdTemplateName;
      this.flagOption = dataInfo.flagOption;
      this.file_rode = dataInfo.file_rode;
      this.contractLedgerForm.htContract.contractPriceWay =
        contractForm.contractPriceWay; //获取报价方式
      this.contractLedgerForm.htContract.isVirtual = this.isVirtual || 0;

      this.contractLedgerForm.htContract.templateId = contractForm.templateId;

      // todo wsc 2020-10-30 当前登录组织是发电方就给发电方默认赋值，如果是用电方，则给用电方赋值
      // 售电公司
      if (this.sysOrg.attributeTypeCode === 'zzjgsx01') {
        this.contractLedgerForm.htContract.purchaserName =
          contractForm.customerName;
        this.contractLedgerForm.htContract.purchaserCode =
          contractForm.customerCode;
      } else if (this.sysOrg.attributeTypeCode === 'zzjgsx02') {
        // 发电公司
        this.contractLedgerForm.htContract.supplierCode =
          contractForm.customerName;
        this.contractLedgerForm.htContract.supplierCode =
          contractForm.customerCode;
      }

      this.dataStatus = '';
      // this.contractLedgerForm.htContract.secondPar.secondPartyInfo = contractForm.secondPartyInfo;
      this.contractLedgerForm.htContract.contractCode =
        contractForm.contractCode;
      this.contractLedgerForm.htContract.enclosure = '';
      // this.initUpload(this.contractLedgerForm.htContract.enclosure);
      this.addDialogVisible = true;
    },

    //初始化编辑
    initEditDialog(dataInfo, dialogInfo) {
      this.hasStopReason = _.has(dataInfo.htContract, 'contractEndReason');

      this.getFawuIs();
      console.log('编辑：', dataInfo, dialogInfo);
      /** 2020-01-15 #3632 康如涛 解决用电方显示不正确问题start*/
      // this.customerFilterData = [];
      this.$set(this, 'customerFilterData', []);

      // todo 2021-02-20 电量分配
      this.elecFp = { ...this.elecFp, ...dataInfo.elecFp };

      /** 2020-01-15 #3632 康如涛 解决用电方显示不正确问题 end*/
      // 编辑查看时 给用电方数组赋值
      this.customerFilterData.push({
        id: dataInfo.htContract.purchaserCode,
        orgName: dataInfo.htContract.purchaserName,
      });
      // console.log(this.customerFilterData,2572)
      this.displayStatus = dataInfo.htContract.dataStatus;
      this.originalId = dataInfo.htContract.contractId;
      this.submitState = dialogInfo.submitState;
      this.state = dialogInfo.state;
      this.$set(this.contractLedgerForm.htContract, 'contractPriceWay', '');
      this.checkTime();
      this.reInitFormData();
      this.getOrgInfo(dialogInfo);

      // if (this.$refs.uploadFileAdd === undefined) {
      // } else {
      //   this.$refs.uploadFileAdd.clearFiles();
      // }

      this.flagOption = dialogInfo.flagOption;
      // todo wsc 2020-10-26
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

      // todo wsc 2020-10-30 当前登录组织是发电方就给发电方默认赋值，如果是用电方，则给用电方赋值
      // 售电公司
      if (this.sysOrg.attributeTypeCode === 'zzjgsx01') {
        this.contractLedgerForm.htContract.purchaserName =
          dataInfo.htContract.customerName;
        this.contractLedgerForm.htContract.purchaserCode =
          dataInfo.htContract.customerCode;
      } else if (this.sysOrg.attributeTypeCode === 'zzjgsx02') {
        // 发电公司
        this.contractLedgerForm.htContract.supplierCode =
          dataInfo.htContract.supplierCode;
        // this.contractLedgerForm.htContract.supplierCode =
        //   dataInfo.htContract.customerCode;
      }

      this.contractLedgerForm.htTemplateAccessoriesVOList =
        dataInfo.htTemplateAccessoriesVOList;
      this.checkTime();
      // 查看时负偏差考核比例 不为空时 统一展示正数 #2640 frj 2019-11-12 16:47:32
      // if (this.contractLedgerForm.clauseAssessment.negDevRatio != "") {
      //   this.contractLedgerForm.clauseAssessment.negDevRatio = Math.abs(
      //     this.contractLedgerForm.clauseAssessment.negDevRatio
      //   );
      // }
      if (this.contractLedgerForm.clauseAssessment.negDevRatio) {
        let obj = {
          orgId: this.orgId,
          configurationId: 4,
          parameterCode: 1040006,
        };
        getValueByOrgIdAndCode(obj).then((res) => {
          let negDevRatio = this.contractLedgerForm.clauseAssessment
            .negDevRatio;
          if (res == '1') {
            this.contractLedgerForm.clauseAssessment.negDevRatio = -Math.abs(
              negDevRatio
            );
          } else {
            this.contractLedgerForm.clauseAssessment.negDevRatio = Math.abs(
              negDevRatio
            );
          }
        });
      }
      this.contractId = dataInfo.htContract.contractId;
      this.dataStatus = dataInfo.htContract.dataStatusName;
      this.dialogTitle = dialogInfo.sdTemplateName || '查看';
      this.sdTemplateName = dialogInfo.sdTemplateName || '查看';
      if (typeof this.contractLedgerForm.htContract.enclosure == 'undefined') {
        this.contractLedgerForm.htContract.enclosure = '';
      }

      // this.initUpload(dataInfo.htContract.enclosure);
      // this.initUpload("htContract/contractLedger/20190514103313-微信截图_20181217174253.png,htContract/contractLedger/20181217174253.png");
      console.log('edit:', this.contractLedgerForm.htContract);
      this.addDialogVisible = true;
    },
    //指定列求和
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (column.property == 'agentUserTransactionQuantity') {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          // console.log(sums);
          sums[index];
          this.fjForm.total = sums[index];
        }
      });
      return sums;
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      // console.log(row,1719);
      // console.log(column,1720);
      // console.log(rowIndex,1721);
      // console.log(columnIndex,1722);

      if (columnIndex === 2 || columnIndex === 3 || columnIndex === 4) {
        if (rowIndex === 0) {
          //3755 frj 当时间超过14行时，超过的行数后面会有用电方与售电方购销价差、用电方与代理用户购销价差、代理服务价格的文本框。
          return [this.fjRowLenght, 1];
        } else if (rowIndex === 1) {
          return [0, 0];
        }
      }
    },
    //获取报价方式
    getbjfs() {
      getSelectList('Quotation_method').then((res) => {
        this.bjfs = res;
      });
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
    selectOption() {
      varietySelectObj().then((res) => {
        this.varietyOptions = res;
      });
      waySelectObj().then((res) => {
        this.wayOptions = res;
      });

      centerSelectObj().then((res) => {
        this.centerOptions = res;
      });
      periodSelectObj().then((res) => {
        this.periodOptions = res;
      });

      //发电方
      let parameter = {
        attributeTypeCode: 'zzjgsx02',
      };
      getPowerGeneratorName(parameter).then((res) => {
        this.loading = false;
        this.powerGeneratorData = res;
      });
      // //获取客户名称数据
      // let parameterss = { orgId: this.orgId};
      // getCustomerByName(parameterss).then(res => {
      //   this.loading = false;
      //   this.customerFilterData = res;
      // });
      //获取交易序列
      let parameters = {
        regionalOrgid: this.orgInfo.id,
      };
      getTransactionName(parameters).then((res) => {
        this.loading = false;
        this.transactionData = res.dataList;
      });
    },

    getOrgInfo(dialogInfo) {
      let parameter = {
        attributeTypeCode: 'zzjgsx02',
      };
      getPowerGeneratorName(parameter).then((res) => {
        this.loading = false;
        this.powerGeneratorData = res;
      });
      let parame = {};
      parame = this.orgId;
      getOrgById(parame).then((res) => {
        console.log('info:', dialogInfo, res.data);
        // 用电方，售电公司
        if (res.data.attributeTypeCode === 'zzjgsx01') {
          if (dialogInfo.state) {
            this.ydState = true;
            this.fdState = true;
          } else {
            this.ydState = true;
            this.fdState = false;
          }
          this.orgInfo = res.data;

          /**
           * @功能描述: 原来用电方显示的为登陆账号所属的公司 现改为显示填写时的信息
           * @作者: frj
           * @issues: #2442
           * @Date: 2019-10-28 13:38:52
           */
          if (dialogInfo.flagOption == 'add') {
            this.customerFilterData.push(this.orgInfo);
            this.contractLedgerForm.htContract.purchaserCode = this.orgInfo.id;
          } else {
            //2019-11-11 #2609 滕超 用户为售电公司时，查看编辑获取当前行发电公司的交易单元数据

            let parmess = {
              orgId: this.contractLedgerForm.htContract.supplierCode,
            };

            getjyListObj(parmess).then((res) => {
              if (res == '' || typeof res == 'undefined') {
                this.contractLedgerForm.htContract.tradingUnit = '';
                this.jydyOptions = [];
              }
              this.jydyOptions = res;
            });
          }

          this.selectOption();
        } else {
          // 发电方，电厂

          if (dialogInfo.state) {
            this.ydState = true;
            this.fdState = true;
          } else {
            this.ydState = false;
            this.fdState = true;
          }
          this.orgInfo = res.data;
          /**

           * @功能描述: 原来发电方显示的为登陆账号所属的公司 现改为显示填写时的信息
           * @作者: frj
           * @issues:  #2442
           * @Date: 2019-10-28 13:44:52
           */
          if (dialogInfo.flagOption == 'add') {
            this.contractLedgerForm.htContract.supplierCode = this.orgInfo.id;
          }
          let parmes = {
            orgId: this.orgId,
          };
          getjyListObj(parmes).then((res) => {
            if (res == '' || typeof res == 'undefined') {
              this.contractLedgerForm.htContract.tradingUnit = '';
              this.jydyOptions = [];
            }
            //2019-11-11 #2609 滕超 原交易单元被置空不显示 现注释掉让其显示
            // this.contractLedgerForm.htContract.tradingUnit = "";
            this.jydyOptions = res;
          });
          // console.log(this.jydyOptions, "jydyOptionsfd");

          this.selectOption();
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
    //2019-12-02 #2900 秦侯珍 获取签约类型数据
    getcontractType() {
      getSelectList('contract_signing_type').then((res) => {
        this.optionsA = res;
      });
    },
    /**
     * @方法名称: spCommitmentRatioJS
     * @功能描述: 改变甲方承担比例，计算乙方承担比例
     * @参数:
     * @返回值:
     * @样式作用范围:
     * @作者: gaoaining
     * @Date: 2019-12-19 16:36:59
     * @最新修改内容:直接计算不在先除100再乘100
     * @LastEditTime:
     */
    spCommitmentRatioJS() {
      let data =
        100 - this.contractLedgerForm.clauseAssessment.customerCommitmentRatio;
      this.contractLedgerForm.clauseAssessment.spCommitmentRatio = data;
    },
    // 模糊查询=远程搜索方法=========================
    getTransactionName(query) {
      //获取交易序列
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          let parameters = {
            noticeName: query,
            regionalOrgid: this.orgInfo.id,
          };
          getTransactionName(parameters).then((res) => {
            this.loading = false;
            this.transactionData = res.dataList;
          });
        }, 200);
      } else {
        this.transactionData = [];
      }
    },
    // 客户名称模糊查询
    getCustomerByName(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          let parameters = { orgId: this.orgId, custName: query };
          getCustomerByName(parameters).then((res) => {
            this.loading = false;
            res.dataList.forEach((item) => {
              this.customerFilterData.push({
                id: item.customerId,
                orgName: item.customerName,
              });
            });
          });
        }, 200);
      } else {
        this.$set(this, 'customerFilterData', []);
      }
    },

    getPowerGeneratorName(query) {
      //获取发电方
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          let parameters = {
            orgName: query,
            attributeTypeCode: 'zzjgsx02',
          };
          getPowerGeneratorName(parameters).then((res) => {
            this.loading = false;
            this.powerGeneratorData = res;
          });
        }, 200);
      }
    },

    initFormData() {
      for (let i = 0; i < 12; i++) {
        let key = this.months[i] + 'ElectricityTrade';
        let key2 = this.months[i] + 'ElectricityPrice';
        this.$set(this.contractLedgerForm['clausePlan'], key, '');
        this.$set(this.contractLedgerForm['clausePlan'], key2, '');
      }
    },

    //分解
    share(number) {
      let dealElectricity = parseFloat(
        this.contractLedgerForm.htContract.dealElectricity / 12
      ).toFixed(4);
      for (let i = 0; i < 12; i++) {
        this.$set(
          this.contractLedgerForm.clausePlan,
          this.months[i] + 'YearBilateElectric',
          dealElectricity
        );
      }
      // 2019-10-23 交易电量不能被12整除 无法保存 #2410
      if (
        dealElectricity * 12 !=
        this.contractLedgerForm.htContract.dealElectricity
      ) {
        let electric = parseFloat(
          this.contractLedgerForm.htContract.dealElectricity -
            dealElectricity * 11
        ).toFixed(4);
        this.$set(
          this.contractLedgerForm.clausePlan,
          this.months[11] + 'YearBilateElectric',
          electric
        );
      } else {
        this.$set(
          this.contractLedgerForm.clausePlan,
          this.months[11] + 'YearBilateElectric',
          dealElectricity
        );
      }
    },

    customer_select(query) {
      if (query != '') {
        this.id = query;
        visitPopleId(this.id).then((res) => {
          this.jyTradingResultsId = res.data.tradeCenterId;
          this.quotationMethod = res.data.quotationMethod; //获取报价方式
          getTransactionTypeName(this.jyTradingResultsId).then((res) => {
            //tradingWay:交易方式   tradingVariety:交易品种
            if (res.tradingWay == '' || typeof res.tradingWay == 'undefined') {
              this.contractLedgerForm.htContract.tradingWay = '';
            } else {
              if (res.tradingWay == 'jyfs01') {
                this.contractLedgerForm.htContract.tradingWay = '双边协商';
              } else if (res.tradingWay == 'jyfs02') {
                this.contractLedgerForm.htContract.tradingWay = '集中竞价';
              } else if (res.tradingWay == 'jyfs03') {
                this.contractLedgerForm.htContract.tradingWay = '挂牌';
              }
            }
            if (
              res.tradingVariety == '' ||
              typeof res.tradingVariety == 'undefined'
            ) {
              this.contractLedgerForm.htContract.tradingVariety = '';
            } else {
              if (res.tradingVariety == 'jypz01') {
                this.contractLedgerForm.htContract.tradingVariety =
                  '省内直接交易';
              } else if (res.tradingVariety == 'jypz02') {
                this.contractLedgerForm.htContract.tradingVariety =
                  '跨省跨区交易';
              } else if (res.tradingVariety == 'jypz03') {
                this.contractLedgerForm.htContract.tradingVariety =
                  '合同电力转让交易';
              } else if (res.tradingVariety == 'jypz04') {
                this.contractLedgerForm.htContract.tradingVariety =
                  '辅助服务交易';
              } else if (res.tradingVariety == 'jypz05') {
                this.contractLedgerForm.htContract.tradingVariety = '日前交易';
              } else if (res.tradingVariety == 'jypz06') {
                this.contractLedgerForm.htContract.tradingVariety = '实时交易';
              }
            }
          });
        });
      } else {
        this.contractLedgerForm.htContract.tradingWay = '';
        this.contractLedgerForm.htContract.tradingVariety = '';
      }
    },

    //选中发电方
    generationChange(val) {
      if (val == '' || typeof val == 'undefined') {
        this.jydyOptions = [];
      } else {
        let parme = { orgId: val };
        getjyListObj(parme).then((res) => {
          if (res == '' || typeof res == 'undefined') {
            this.contractLedgerForm.htContract.tradingUnit = '';
            this.jydyOptions = [];
          }
          this.contractLedgerForm.htContract.tradingUnit = '';
          this.jydyOptions = res;
        });
      }
    },

    reInitFormData() {
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
    showUplaodFile(data) {
      let file = data;
      let fileArr = file.split('/');
      this.fileInfo.path = data;
      this.fileInfo.name = fileArr[fileArr.length - 1];
    },
    //保存&&提交
    submitSave(dataStatus) {
      let _this = this;
      _this.checkFlag = true;
      const set = this.$refs;
      let electricityTrade = 0;
      let isMonthlyElectricitySum = true;
      let dealElectricity = new Number();
      let isDealElectricity = true;
      for (let i = 0; i < 12; i++) {
        dealElectricity += Number(
          this.contractLedgerForm.clausePlan[
            this.months[i] + 'YearBilateElectric'
          ]
        );
      }
      // 2019-10-23 交易电量不能被12整除 无法保存 #2410
      dealElectricity = dealElectricity.toFixed(4);
      //2019-11-06 #2588 滕超 交易电量为undefined时等于空，计算结果为0
      if (this.contractLedgerForm.htContract.dealElectricity == undefined) {
        this.contractLedgerForm.htContract.dealElectricity = '';
      }
      let dealElectricity2 = parseFloat(
        Number(this.contractLedgerForm.htContract.dealElectricity)
      ).toFixed(4);
      // #3464 2020-01-05 张亮三 解决当用电计划月分解电量为空时不做校验 start
      for (let i = 0; i < 12; i++) {
        let clausePlanKey = this.contractLedgerForm.clausePlan[
          this.months[i] + 'YearBilateElectric'
        ];
        if (clausePlanKey !== '') {
          if (dealElectricity2 != dealElectricity) {
            isDealElectricity = false;
          }
        }
      }
      // #3464 2020-01-05 张亮三 解决当用电计划月分解电量为空时不做校验 end
      if (!isDealElectricity) {
        this.$alert('计划用电各月汇总与交易电量不同！', '消息提示', {
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

            this.formLoading = true;
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
      console.log('reSetTime', key);
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
      let parame = this.contractLedgerForm;
      for (let key in this.contractLedgerForm) {
        /**

         * @功能描述: 防止vue resetFields 清空时表单 prop绑定不正确 导致多出字段undefined 做出不为undefined判断
         * @作者: frj
         * @issues: #2518
         * @Date: 2019-10-30 14:38:37
         * @最新修改内容:
         * @LastEditTime:
         */
        if (parame[key] != undefined) {
          parame[key]['contractId'] = this.contractId;
        }
      }
      if (parame.htContract.dealPrice == '') {
        parame.htContract.dealPrice = 0;
      }
      if (parame.htContract.dealElectricity == '') {
        parame.htContract.dealElectricity = 0;
      }

      // 负偏差考核比例存放时统一存成负数 s #2640 frj 2019-11-12 18:48:01
      if (parame.clauseAssessment.negDevRatio != '') {
        parame.clauseAssessment.negDevRatio =
          0 - Math.abs(parame.clauseAssessment.negDevRatio);
      }
      // 负偏差考核比例存放时统一存成负数 e #2640 frj 2019-11-12 18:48:01

      //#4185 gaoaining 2020-06-04 编辑时 增加customerId传参  再通过id匹配customerName start
      parame.htContract.customerId = this.contractLedgerForm.htContract.purchaserCode;
      this.customerFilterData.forEach((item) => {
        if (item.id == this.contractLedgerForm.htContract.purchaserCode) {
          parame.htContract.customerName = item.orgName;
        }
      });
      // todo wsc 2020-10-13 混入法务系统必填字段
      parame.htContract = {
        ...this.contractLedgerForm.htContract,
        ...parame.htContract,
        ...this.contractLedgerForm.legal,
      };
      // todo elecFp
      parame.elecFp = this.elecFp;
      //#4185 gaoaining 2020-06-05 编辑时 增加customerId传参  再通过id匹配customerName end
      editObj(parame).then((res) => {
        this.formLoading = false;

        if (res.rel) {
          this.resetBdFields();
          //2019-11-13 #2595 滕超 延时调用查询防止页面审核状态不变
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
        this.$emit('initList');
      });
    },

    //新增
    addObject() {
      let parame = {};
      parame.clausePlan = {};

      //#4185 gaoaining 2020-06-04 新增时 增加customerId传参  再通过id匹配customerName start
      console.log('add 1', this.contractLedgerForm.htContract.purchaserCode);

      parame.htContract = {
        customerId: this.contractLedgerForm.htContract.purchaserCode,
      };

      this.customerFilterData.forEach((item) => {
        if (item.id == this.contractLedgerForm.htContract.purchaserCode) {
          parame.htContract.customerName = item.orgName;
        }
      });
      //#4185 gaoaining 2020-06-05 新增时 增加customerId传参  再通过id匹配customerName end
      parame.clauseAssessment = {};
      parame.additionalClause = {};
      parame.templatePowerList = this.contractLedgerForm.templatePowerList;
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
      for (let key in this.contractLedgerForm.htContract) {
        if (key != 'contractId') {
          if (
            this.contractLedgerForm.htContract[key] == '' ||
            this.contractLedgerForm.htContract[key] == null
          ) {
          } else {
            parame.htContract[key] = this.contractLedgerForm.htContract[key];
          }
        }
      }
      for (let key in this.contractLedgerForm.clauseAssessment) {
        if (key != 'contractId' && key != 'violationId') {
          if (
            this.contractLedgerForm.clauseAssessment[key] == '' ||
            this.contractLedgerForm.clauseAssessment[key] == null
          ) {
          } else {
            parame.clauseAssessment[
              key
            ] = this.contractLedgerForm.clauseAssessment[key];
          }
        }
      }
      for (let key in this.contractLedgerForm.additionalClause) {
        if (key != 'contractId' && key != 'additionalClauseId') {
          parame.additionalClause[
            key
          ] = this.contractLedgerForm.additionalClause[key];
        }
      }
      // #3474 2020-01-10 张亮三 保存时传递附件信息
      parame.htTemplateAccessoriesVOList = [];
      this.contractLedgerForm.htTemplateAccessoriesVOList.forEach((item) => {
        parame.htTemplateAccessoriesVOList.push(item);
      });
      // 负偏差考核比例存放时统一存成负数 s #2640 frj 2019-11-12 18:48:01
      if (parame.clauseAssessment.negDevRatio != '') {
        parame.clauseAssessment.negDevRatio =
          0 - Math.abs(parame.clauseAssessment.negDevRatio);
      }
      // 负偏差考核比例存放时统一存成负数 e #2640 frj 2019-11-12 18:48:01
      // todo wsc 2020-10-13 混入法务系统必填字段
      parame.htContract = {
        ...this.contractLedgerForm.htContract,
        ...parame.htContract,
        ...this.contractLedgerForm.legal,
      };
      // todo elecFp
      parame.elecFp = this.elecFp;

      addObj(parame).then((res) => {
        this.formLoading = false;
        if (res.rel) {
          this.resetBdFields();
          //2019-11-13 #2595 滕超 延时调用查询防止页面审核状态不变
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
    submitForm() {
      this.isUpload = false;
      this.contractLedgerForm.htContract['endDate'] = this.reSetTime('endDate');
      this.contractLedgerForm.htContract['signingDate'] = this.reSetTime(
        'signingDate'
      );
      this.contractLedgerForm.htContract['beginDate'] = this.reSetTime(
        'beginDate'
      );
      this.contractLedgerForm.htContract.contractTypeCode = 'htlx01';
      //2019年11月4日09:40:11 #2463 李志佳 允许负偏差比例优化
      this.contractLedgerForm.clauseAssessment.allowNegDevRatio = -Math.abs(
        this.contractLedgerForm.clauseAssessment.allowNegDevRatio
      );
      if (this.flagOption === 'edit') {
        this.editObject(this.contractLedgerForm);
      } else {
        this.addObject(this.contractLedgerForm);
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
    //---------------------------------下拉框模糊查询
    getFirstPartyInfo(query) {
      this.firstPartyList = [];
      let cusType = 'khlb3';
      if (query !== '') {
        this.loading = true;

        let parme = { cusType: cusType, name: query };
        getcustomerId(parme).then((res) => {
          this.firstPartyList = res;
          this.loading = false;
        });
      } else {
        this.firstPartyList = [];
      }
    },
    changeFirstPartyInfo(val) {
      this.firstPartyList.map((item) => {
        if (item.customerName === val) {
          this.contractLedgerForm.htContract.supplierCode = item.customerId;
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
      this.$set(this, 'customerFilterData', []);
      this.$set(this.contractLedgerForm.htContract, 'purchaserCode', '');
      const _set = this.$refs;
      if (_set.contractLedgerForm === undefined) {
      } else {
        _set.contractLedgerForm.resetFields();
      }

      this.addDialogVisible = false;
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
    // #3453 2020-01-05 张亮三  附件添加
    addGsdht() {
      this.fjForm.htTemplateAccessoriesDetails = [];
      this.contractLedgerForm.htContract['beginDate'] = this.reSetTime(
        'beginDate'
      );
      this.contractLedgerForm.htContract['endDate'] = this.reSetTime('endDate');
      let params = {
        BeginDate: this.contractLedgerForm.htContract['beginDate'],
        EndDate: this.contractLedgerForm.htContract['endDate'],
      };
      getFjmounth(params).then((res) => {
        // console.log(res.length, 2702);
        this.fjRowLenght = res.length;
        res.forEach((item, index) => {
          item.agentUserTransactionQuantity = '';
          item.buyerSellerPrice = '';
          item.buyerProxyPrice = '';
          item.agencyServicePrice = '';
          item.total = '';
          this.fjForm.htTemplateAccessoriesDetails.push(item);
        });
      });
      this.dialogStatus = 'create';
      this.dialogFjtableVisible = true;
      this.fjForm.electricCompany = '';
      this.fjForm.proxyUserName = '';
      this.fjForm.total = '';
      this.fjForm.htTemplateAccessoriesDetails = [];
    },
    // 附件详情表格保存亮
    addfjForm() {
      this.fjForm.contractId = this.contractId;
      var newFjform = Object.assign({}, this.fjForm);
      this.contractLedgerForm.htTemplateAccessoriesVOList.push(newFjform);
      this.dialogFjtableVisible = false;
    },
    updateaddFjForm() {
      // if(this.contractId!=""){
      //   this.fjForm.contractId = this.contractId;
      //   if(this.accessoriesId&&this.accessoriesId!=""){
      //     this.fjForm.accessoriesId = this.accessoriesId;
      //   }
      //   updateaddFjinfo(this.fjForm).then(res=>{
      //     if(res.rel){
      //       this.$notify({
      //         title: "成功",
      //         message: res.msg,
      //         type: "success",
      //         duration: 2000
      //       });
      //       this.contractLedgerForm.htTemplateAccessoriesVOList.forEach(item=>{
      //         for (const key in item) {
      //           if (item.hasOwnProperty(key)) {
      //             item[key] = res.data[key];
      //           }
      //         }
      //       });
      //       this.dialogFjtableVisible = false;
      //     }else {
      //       this.$notify({
      //         title: "错误",
      //         message: res.msg,
      //         type: "warning",
      //         duration: 2000
      //       });
      //       this.dialogFjtableVisible = false;
      //     }
      //   })
      // }else {
      let updateForm = Object.assign({}, this.fjForm);
      // this.contractLedgerForm.htTemplateAccessoriesVOList[this.fjindex] = updateForm;
      this.$set(
        this.contractLedgerForm.htTemplateAccessoriesVOList,
        this.fjindex,
        updateForm
      );
      // console.log(45);
      this.dialogFjtableVisible = false;
      // }
    },
    getData() {
      getObj(this.contractId).then((res) => {
        if (res.rel && res.data && res.data.htTemplateAccessoriesVOList) {
          this.contractLedgerForm.htTemplateAccessoriesVOList =
            res.data.htTemplateAccessoriesVOList;
        }
      });
    },
    // 代理用户模糊查询
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          let parameters = { orgId: this.orgId, proxyUserName: query };
          getCustomerByName(parameters).then((res) => {
            this.loading = false;
            this.proxyUseroptions = [];
            res.dataList.forEach((item) => {
              this.proxyUseroptions.push({
                id: item.customerId,
                orgName: item.customerName,
              });
            });
          });
        }, 200);
      } else {
        this.proxyUseroptions = [];
      }
    },
    /**
     * @方法名称: handleCheck
     * @功能描述: 附件详情
     * @参数:
     * @返回值:
     * @作者: 张亮三
     * @Date: 2020-01-10 16:31:25
     * @最新修改内容:
     * @LastEditTime:
     */
    handleCheck(index, row, state) {
      this.dialogStatus = 'check';
      if (row.accessoriesId && row.accessoriesId != '') {
        let param = {
          accessoriesId: row.accessoriesId,
        };
        getItemFjinfo(param).then((res) => {
          this.fjForm.electricCompany = row.electricCompany;
          this.fjForm.proxyUserName = row.proxyUserName;
          this.fjForm.htTemplateAccessoriesDetails =
            res.data.htTemplateAccessoriesDetails;
          this.dialogFjtableVisible = true;
        });
      } else {
        this.fjForm = row;
        this.dialogFjtableVisible = true;
      }
    },
    handleUpdate(index, row, state) {
      this.fjindex = index;
      this.dialogStatus = 'update';
      if (row.accessoriesId && row.accessoriesId != '') {
        this.accessoriesId = row.accessoriesId;
        let param = {
          accessoriesId: row.accessoriesId,
        };
        getItemFjinfo(param).then((res) => {
          this.fjForm.electricCompany = row.electricCompany;
          this.fjForm.proxyUserName = row.proxyUserName;
          this.fjForm.htTemplateAccessoriesDetails =
            res.data.htTemplateAccessoriesDetails;
          this.dialogFjtableVisible = true;
        });
      } else {
        this.fjForm = row;
        this.dialogFjtableVisible = true;
      }
    },
    /**
     * @方法名称: handleDelete
     * @功能描述: 附件删除
     * @参数:
     * @返回值:
     * @作者: 张亮三
     * @Date: 2020-01-10 16:32:19
     * @最新修改内容:
     * @LastEditTime:
     */
    handleDelete(index, row) {
      if (row.accessoriesId && row.accessoriesId != '') {
        let param = {
          accessoriesId: row.accessoriesId,
        };
        deleteFjinfo(param).then((res) => {
          if (res.rel) {
            this.$notify({
              title: '成功',
              message: res.msg,
              type: 'success',
              duration: 2000,
            });
            this.getData();
          } else {
            this.$notify({
              title: '失败',
              message: res.msg,
              type: 'warning',
              duration: 2000,
            });
          }
        });
      } else {
        this.contractLedgerForm.htTemplateAccessoriesVOList.splice(index, 1);
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
  width: 50%;
}

.el-input input {
  text-align: right;
}

.el-select .el-input input {
  text-align: left;
}

.btn-box {
  text-align: right;
  margin-bottom: 15px;
}

.unit-box {
  text-align: right;
  margin-bottom: 15px;
}
</style>
