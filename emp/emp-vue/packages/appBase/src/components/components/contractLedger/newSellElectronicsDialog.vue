<!--
 * @功能描述: 售电合同新合同优化
 * @版本:
 * @作者: frj
 * @Date: 2019-11-19 09:45:14
 * @最新修改内容:
 * @LastEditTime: 2020-11-16 16:59:12
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
      :before-close="close"
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
                        <!--  2019-11-15 #2648 滕超 合同编码改为系统合同编码 start-->
                        <el-form-item
                          label="系统合同编码:"
                          prop="htContract.contractCode"
                        >
                          <el-input
                            disabled
                            v-model="contractLedgerForm.htContract.contractCode"
                          ></el-input>
                        </el-form-item>
                        <!--  2019-11-15 #2648 滕超 合同编码改为系统合同编码 end-->
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
                    <!--  2019-11-15 #2648 滕超 增加甲乙方合同编码 start-->
                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item
                          label="甲方合同编码:"
                          prop="htContract.customerContractCode"
                        >
                          <el-input
                            :disabled="state"
                            v-model="
                              contractLedgerForm.htContract.customerContractCode
                            "
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="乙方合同编码:"
                          prop="htContract.spContractCode"
                        >
                          <el-input
                            :disabled="state"
                            v-model="
                              contractLedgerForm.htContract.spContractCode
                            "
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!--  2019-11-15 #2648 滕超 增加甲乙方合同编码 end-->

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
                            <template slot="append">千千瓦时 </template>
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
                            <template slot="append">千千瓦时 </template>
                          </el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!--      todo wsc 2010-10-26 是否为关联合同  法务系统合同编码  #6           -->
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
                            value-format="yyyy-MM-dd"
                            :disabled="state"
                            style="width:100%;"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="合同状态：">
                          <!-- <el-select
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
                          <span>
                            {{ contractLedgerForm.htContract.dataStatusName }}
                          </span>
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
                            v-model="contractLedgerForm.htContract.endDate"
                            @change="checkTime()"
                            style="width: 100%;"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>
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
                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item
                          prop="htContract.customerId"
                          label="甲方:"
                        >
                          <el-select
                            style="width:100%;"
                            v-model="contractLedgerForm.htContract.customerId"
                            filterable
                            :disabled="
                              state ||
                                contractLedgerForm.htContract.createFrom == '1'
                            "
                            remote
                            :clearable="true"
                            reserve-keyword
                            :remote-method="getFirstPartyInfoSd"
                            :loading="loading"
                            @change="changeFirstPartyInfo"
                          >
                            <el-option
                              v-for="item in firstPartyList"
                              :key="item.index"
                              :label="item.customerName"
                              :value="item.customerId"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <!-- <el-form-item label="所属地市:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract.customerProvince
                            "
                            :disabled="state"
                          ></el-input>
                        </el-form-item>-->
                        <!-- 所属地市改为省市 并新增县级下拉框 S frj # 2639 2019-11-18 15:24:53 -->
                        <el-form-item label="所属省市">
                          <el-select
                            class="four-col left"
                            v-model="
                              contractLedgerForm.htContract.customerProvinceCode
                            "
                            :placeholder="state ? '' : '请选择'"
                            @change="changeprovinceKh"
                            :disabled="state"
                            style="width:49%"
                          >
                            <el-option
                              v-for="(item, index) in provinceOptions"
                              :key="index"
                              :label="item.propName"
                              :value="item.propCode"
                            ></el-option>
                          </el-select>
                          <el-select
                            class="four-col left"
                            v-model="
                              contractLedgerForm.htContract.customerAreaCode
                            "
                            :placeholder="state ? '' : '请选择'"
                            :disabled="state"
                            style="width:49%"
                          >
                            <el-option
                              v-for="(item, index) in areaOptionsKh"
                              :key="index"
                              :label="item.propName"
                              :value="item.propCode"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <!-- 所属地市改为省市 并新增县级下拉框 e frj # 2639 2019-11-18 15:24:53 -->
                        <el-form-item label="统一社会信用代码:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract
                                .customerSocialCreditCode
                            "
                            :disabled="spState"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="交易中心注册编码:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract
                                .customerTradeCenterRegistCode
                            "
                            :disabled="state"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="地址:">
                          <el-input
                            v-model="contractLedgerForm.htContract.customerAddr"
                            :disabled="state"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="法人:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract.customerLegalPerson
                            "
                            :disabled="state"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="开户行:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract.customerDepositBank
                            "
                            :disabled="state"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="开户名:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract.customerAccountName
                            "
                            :disabled="state"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="银行账号:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract
                                .customerDepositBankAccount
                            "
                            :disabled="state"
                          ></el-input>
                        </el-form-item>
                        <!--  2019-11-15 #2648 滕超 甲方增加字段 start-->
                        <el-form-item label="登记机关:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract
                                .customerRegisteredAddress
                            "
                            :disabled="state"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="企业性质:">
                          <el-input
                            v-model="contractLedgerForm.htContract.customerQyxz"
                            :disabled="state"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="联系人:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract.customerContacts
                            "
                            :disabled="state"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="电话:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract.customerMobilePhone
                            "
                            :disabled="state"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="邮编:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract.customerPostCode
                            "
                            :disabled="state"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="传真:">
                          <el-input
                            v-model="contractLedgerForm.htContract.customerFax"
                            :disabled="state"
                          ></el-input>
                        </el-form-item>
                        <!--#3235 增加所在园区字段 start frj 2019-12-23 16:13:18  -->
                        <el-form-item label="所在园区:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract
                                .customerIndustrialPark
                            "
                            :disabled="state"
                          ></el-input>
                        </el-form-item>
                        <!--#3235 增加所在园区字段 end frj 2019-12-23 16:13:18  -->
                        <!-- #3225 wangc 20191222 新增字段 通讯地址 用电规模 start-->
                        <el-form-item label="通讯地址:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract.contactAddress
                            "
                            :disabled="state"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="用电规模:">
                          <el-input
                            v-model="contractLedgerForm.htContract.powerScale"
                            :disabled="state"
                            class="ddw1"
                            type="number"
                            step="“0.0001”"
                            @mousewheel.native.prevent
                          ></el-input>
                          <span>{{ unitMap.electricityUnit }}</span>
                        </el-form-item>
                        <!-- #3225 wangc 20191222 新增字段 通讯地址 用电规模 end-->
                        <!--  2019-11-15 #2648 滕超 甲方增加字段 end-->
                        <el-form-item label="交易名称:">
                          <el-input
                            v-model="contractLedgerForm.htContract.tradeName"
                            :disabled="state"
                          ></el-input>
                        </el-form-item>
                        <!--  2019-12-2 #2876 滕超 甲方增加字段客户批次 start-->
                        <el-form-item v-if="this.isSX == '0'" label="客户批次">
                          <el-select
                            :disabled="state"
                            :clearable="true"
                            v-model="
                              contractLedgerForm.htContract.customerBatchCode
                            "
                            placeholder="请选择客户批次"
                          >
                            <el-option
                              v-for="item in batchList"
                              :key="item.index"
                              :label="item.propName"
                              :value="item.propCode"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <!--  2019-12-2 #2876 滕超 甲方增加字段客户批次 end-->
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="乙方:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract.secondPartName
                            "
                            :disabled="spState"
                          ></el-input>
                          <!--                          <el-select-->
                          <!--                            style="width:100%;"-->
                          <!--                            v-model=" contractLedgerForm.htContract.secondPartCode"-->
                          <!--                            filterable-->
                          <!--                            :disabled="spState"-->
                          <!--                            remote-->
                          <!--                            :clearable="true"-->
                          <!--                            reserve-keyword-->
                          <!--                            :remote-method="getSecondPartyInfo"-->
                          <!--                            :loading="loading"-->
                          <!--                          >-->
                          <!--                            <el-option-->
                          <!--                              v-for="item in secondPartyList"-->
                          <!--                              :key="item.index"-->
                          <!--                              :label="item.customerName"-->
                          <!--                              :value="item.customerCode"-->
                          <!--                            ></el-option>-->
                          <!--                          </el-select>-->
                        </el-form-item>
                        <el-form-item label="所属地市:">
                          <!-- <el-input
                            v-model="contractLedgerForm.htContract.spProvince"
                            :disabled="spState"
                          ></el-input> -->
                          <el-select
                            class="four-col left"
                            v-model="contractLedgerForm.htContract.spProvince"
                            :disabled="spState"
                            style="width:49%"
                          >
                            <el-option
                              v-for="(item, index) in spProvinceOptions"
                              :key="index"
                              @change="changeSpProvince"
                              :label="item.propName"
                              :value="item.propCode"
                            ></el-option>
                          </el-select>
                          <el-select
                            class="four-col left"
                            v-model="contractLedgerForm.htContract.spAreaCode"
                            :disabled="spState"
                            style="width:49%"
                          >
                            <el-option
                              v-for="(item, index) in spAreaOptions"
                              :key="index"
                              :label="item.propName"
                              :value="item.propCode"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="统一社会信用代码:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract.spSocialCreditCode
                            "
                            :disabled="spState"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="交易中心注册编码:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract
                                .spTradeCenterRegistCode
                            "
                            :disabled="spState"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="地址:">
                          <el-input
                            v-model="contractLedgerForm.htContract.spAddr"
                            :disabled="spState"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="法人:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract.spLegalPerson
                            "
                            :disabled="spState"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="开户行:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract.spDepositBank
                            "
                            :disabled="spState"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="开户名:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract.spAccountName
                            "
                            :disabled="spState"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="银行账号:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract.spDepositBankAccount
                            "
                            :disabled="spState"
                          ></el-input>
                        </el-form-item>
                        <!--  2019-11-15 #2648 滕超 乙方增加字段 start-->
                        <el-form-item label="登记机关:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract.spRegisteredAddress
                            "
                            :disabled="spState"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="企业性质:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract.spAttributeTypeName
                            "
                            :disabled="spState"
                          ></el-input>
                        </el-form-item>
                        <!--  2019-12-06 #3021 滕超 以下乙方字段改为可编辑 start-->
                        <el-form-item label="联系人:">
                          <el-input
                            v-model="contractLedgerForm.htContract.spContacts"
                            :disabled="state"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="电话:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract.spMobilePhone
                            "
                            :disabled="state"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="邮编:">
                          <el-input
                            v-model="contractLedgerForm.htContract.spPostCode"
                            :disabled="state"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="传真:">
                          <el-input
                            v-model="contractLedgerForm.htContract.spFax"
                            :disabled="state"
                          ></el-input>
                        </el-form-item>
                        <!-- #3225 wangc 20191222 新增字段 通讯地址 -->
                        <el-form-item label="通讯地址:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract.spContactAddress
                            "
                            :disabled="state"
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
                  <!-- 收益方式  -->
                  <el-collapse-item
                    title="收益方式"
                    name="2"
                    style="margin-left:10px"
                  >
                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item label="合同类型:" placeholder="保底合同">
                          <el-input
                            disabled
                            class="ddw1"
                            v-model="this.sdTemplateName"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="总电量:">
                          <el-input
                            disabled
                            class="ddw1"
                            type="number"
                            step="“0.0001”"
                            style="width: 300px;"
                            @mousewheel.native.prevent
                            v-model="
                              contractLedgerForm.htContract.totalElectricity
                            "
                          >
                            <template slot="append">{{
                              unitMap.electricityUnit
                            }}</template>
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <!-- #3160  郑文杰 合同管理--合同台账管理--优化 在合同台账中增加“合同定价方式”字段，此字段为必填项。-->
                        <el-form-item
                          label="合同定价方式"
                          prop="htContract.contractPriceWay"
                        >
                          <el-select
                            v-model="
                              contractLedgerForm.htContract.contractPriceWay
                            "
                            :disabled="isFwht"
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
                      <el-col :span="12">
                        <el-form-item
                          v-if="
                            showGovernmentSubsidies.saleContractType ==
                              'sdhtlx08' ||
                              showGovernmentSubsidies.saleContractType ==
                                'sdhtlx09'
                          "
                          label="有无政府性补贴:"
                        >
                          <el-select
                            v-model="
                              contractLedgerForm.clausePrice.sfGovtSubsidies
                            "
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
                        showGovernmentSubsidies.saleContractType ==
                          'sdhtlx08' ||
                          showGovernmentSubsidies.saleContractType == 'sdhtlx09'
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
                            v-model="
                              contractLedgerForm.clausePrice.spjcPriceDifference
                            "
                            ><template slot="append">%</template></el-input
                          >
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="政府性补贴归公司:">
                          <el-input
                            :disabled="state || noSubsidy"
                            style="width:200px;"
                            type="number"
                            step="“0.0001”"
                            @mousewheel.native.prevent
                            v-model="
                              contractLedgerForm.clausePrice.ppnGovtSubsidies
                            "
                            ><template slot="append">%</template></el-input
                          >
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
                              v-model="
                                contractLedgerForm.clausePrice
                                  .yearBilateElectric
                              "
                              ><template slot="append">{{
                                unitMap.electricityUnit
                              }}</template></el-input
                            >
                            <el-button
                              class="filter-item"
                              type="primary"
                              :disabled="state"
                              @click="share('yearBilateElectric')"
                              >分摊 </el-button
                            ><span style="padding-left:10px;" v-if="shareYear"
                              >(已分摊)</span
                            >
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
                              style="width: 300px;"
                              @mousewheel.native.prevent
                              v-model="
                                contractLedgerForm.clausePrice.fixDeprice
                              "
                            >
                              <template slot="append">{{
                                unitMap.priceUnit
                              }}</template>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item
                            label="固定降价/保底电价(大写):"
                            label-width="170px"
                          >
                            <el-input
                              :disabled="state"
                              class="ddw1"
                              type="text"
                              step="“0.0001”"
                              style="width: 300px;"
                              @mousewheel.native.prevent
                              v-model="
                                contractLedgerForm.clausePrice
                                  .capitalizedFixDeprice
                              "
                            >
                              <template slot="append">{{
                                unitMap.priceUnit
                              }}</template>
                            </el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <div v-if="proceedInfo.fydl">
                        <el-row>
                          <el-col :span="12">
                            <el-form-item label="富余电量:">
                              <el-input
                                :disabled="state"
                                @blur="setTotalElectricity"
                                class="ddw1"
                                type="number"
                                step="“0.0001”"
                                v-model="
                                  contractLedgerForm.clausePrice
                                    .surplusElectricity
                                "
                              >
                                <template slot="append">{{
                                  unitMap.electricityUnit
                                }}</template>
                              </el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </div>
                      <div v-if="proceedInfo.gdjjhfc">
                        <div>固定降价分成</div>
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
                                v-model="
                                  contractLedgerForm.clausePrice
                                    .customerProportion
                                "
                              >
                                <template slot="append">%</template>
                              </el-input>
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
                                v-model="
                                  contractLedgerForm.clausePrice
                                    .secondPartProportion
                                "
                              >
                                <template slot="append">%</template>
                              </el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                    <div v-if="proceedInfo.cxdl">
                      <div>长协电量</div>
                      <el-row :gutter="10">
                        <el-col :span="10">
                          <el-form-item label="年度长协电量:">
                            <el-input
                              :disabled="state"
                              class="ddw1"
                              type="number"
                              step="“0.0001”"
                              style="width: 240px;"
                              @mousewheel.native.prevent
                              @blur="setTotalElectricity"
                              v-model="
                                contractLedgerForm.clausePrice
                                  .yearLongtermElectric
                              "
                            >
                              <template slot="append">{{
                                unitMap.electricityUnit
                              }}</template>
                            </el-input>
                            <el-button
                              class="filter-item"
                              type="primary"
                              :disabled="state"
                              @click="share('yearLongtermElectric')"
                              >分摊 </el-button
                            ><span style="padding-left:10px;" v-if="shareYear"
                              >(已分摊)</span
                            >
                          </el-form-item>
                        </el-col>
                        <el-col :span="7">
                          <el-form-item label="降价/电价:" label-width="100">
                            <el-input
                              :disabled="state"
                              class="ddw1"
                              type="number"
                              step="“0.0001”"
                              style="width:100px;"
                              @mousewheel.native.prevent
                              v-model="
                                contractLedgerForm.clausePrice.fixDeprice
                              "
                            >
                              <template slot="append">{{
                                unitMap.priceUnit
                              }}</template>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="7">
                          <el-form-item label="甲方分成比例:">
                            <el-input
                              :disabled="state"
                              class="ddw1"
                              type="number"
                              step="“0.0001”"
                              @mousewheel.native.prevent
                              v-model="
                                contractLedgerForm.clausePrice.proportion
                              "
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
                        <el-col :span="10">
                          <el-form-item label="月度竞价电量:">
                            <el-input
                              :disabled="state"
                              class="ddw1"
                              type="number"
                              step="“0.0001”"
                              style="width: 240px;"
                              @mousewheel.native.prevent
                              @blur="setTotalElectricity"
                              v-model="
                                contractLedgerForm.clausePrice.monthBidElectric
                              "
                            >
                              <template slot="append">{{
                                unitMap.electricityUnit
                              }}</template>
                            </el-input>
                            <el-button
                              class="filter-item"
                              type="primary"
                              :disabled="state"
                              @click="share('monthBidElectric')"
                              >分摊 </el-button
                            ><span style="padding-left:10px;" v-if="shareMonth"
                              >(已分摊)</span
                            >
                          </el-form-item>
                        </el-col>
                        <el-col :span="7">
                          <el-form-item label="降价/电价:" label-width="100">
                            <el-input
                              :disabled="state"
                              class="ddw1"
                              type="number"
                              step="“0.0001”"
                              style="width:100px;"
                              @mousewheel.native.prevent
                              v-model="
                                contractLedgerForm.clausePrice
                                  .bottomElectricPrice
                              "
                            >
                              <template slot="append">{{
                                unitMap.priceUnit
                              }}</template>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="7">
                          <el-form-item label="甲方分成比例:">
                            <el-input
                              :disabled="state"
                              class="ddw1"
                              type="number"
                              step="“0.0001”"
                              @mousewheel.native.prevent
                              v-model="
                                contractLedgerForm.clausePrice
                                  .customerProportion
                              "
                            >
                              <template slot="append">%</template>
                            </el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                    <div v-if="proceedInfo.jjcf">
                      <div>竞价分成</div>
                      <el-row :gutter="10">
                        <el-col :span="12">
                          <el-form-item label="月度竞价电量:">
                            <el-input
                              :disabled="state"
                              class="ddw1"
                              type="number"
                              step="“0.0001”"
                              style="width: 240px;"
                              @mousewheel.native.prevent
                              @blur="setTotalElectricity"
                              v-model="
                                contractLedgerForm.clausePrice.monthBidElectric
                              "
                              ><template slot="append">{{
                                unitMap.electricityUnit
                              }}</template></el-input
                            >
                            <el-button
                              class="filter-item"
                              type="primary"
                              :disabled="state"
                              @click="share('monthBidElectric')"
                              >分摊 </el-button
                            ><span style="padding-left:10px;" v-if="shareMonth"
                              >(已分摊)</span
                            >
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
                              v-model="
                                contractLedgerForm.clausePrice
                                  .customerProportion
                              "
                            >
                              <template slot="append">%</template>
                            </el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                    <div v-if="proceedInfo.jjbdfc">
                      <div>竞价保底分成</div>
                      <el-row :gutter="10">
                        <el-col :span="12">
                          <el-form-item label="月度竞价电量:">
                            <el-input
                              :disabled="state"
                              class="ddw1"
                              type="number"
                              step="“0.0001”"
                              style="width: 240px;"
                              @mousewheel.native.prevent
                              @blur="setTotalElectricity"
                              v-model="
                                contractLedgerForm.clausePrice.monthBidElectric
                              "
                            >
                              <template slot="append">{{
                                unitMap.electricityUnit
                              }}</template>
                            </el-input>
                            <el-button
                              class="filter-item"
                              type="primary"
                              :disabled="state"
                              @click="share('monthBidElectric')"
                              >分摊 </el-button
                            ><span style="padding-left:10px;" v-if="shareMonth"
                              >（已分摊）</span
                            >
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
                              v-model="
                                contractLedgerForm.clausePrice
                                  .customerProportion
                              "
                            >
                              <template slot="append">%</template>
                            </el-input>
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
                              v-model="
                                contractLedgerForm.clausePrice
                                  .bottomElectricPrice
                              "
                            >
                              <template slot="append">{{
                                unitMap.priceUnit
                              }}</template>
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
                              v-model="
                                contractLedgerForm.clausePrice.yearBidElectric
                              "
                            >
                              <template slot="append">{{
                                unitMap.electricityUnit
                              }}</template>
                            </el-input>
                            <el-button
                              class="filter-item"
                              type="primary"
                              :disabled="state"
                              @click="share('yearBidElectric')"
                              >分摊 </el-button
                            ><span style="padding-left:5px;" v-if="shareYear"
                              >（已分摊）</span
                            >
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item
                            label="度电费用:"
                            prop="clausePrice.kwhCost"
                          >
                            <el-input
                              :disabled="state"
                              class="ddw1"
                              type="number"
                              step="“0.0001”"
                              @mousewheel.native.prevent
                              v-model="contractLedgerForm.clausePrice.kwhCost"
                            >
                              <template slot="append">{{
                                unitMap.priceUnit
                              }}</template>
                            </el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                    <!--  2019-11-15 #2648 滕超 收益方式增加字段 start-->
                    <el-row :gutter="10">
                      <el-col :span="24">
                        <el-form-item label="另有约定：">
                          <el-input
                            :disabled="state"
                            type="textarea"
                            rows="5"
                            resize="none"
                            v-model="
                              contractLedgerForm.clausePrice.otherwiseAgree
                            "
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!--  2019-11-15 #2648 滕超 收益方式增加字段 end-->
                  </el-collapse-item>
                  <!-- 收益方式 end -->
                  <el-collapse-item
                    title="用电计划"
                    name="5"
                    style="margin-left:10px"
                  >
                    <jjfcYdjh
                      v-if="proceedInfo.jjfcdnPlan"
                      :jjfchdnTableData="jjfchdnTableData"
                      :unitMap="unitMap"
                      :checkState="this.checkState"
                      ref="jjfcYdjh"
                    ></jjfcYdjh>
                    <gdjjdydj
                      v-if="proceedInfo.gdjjdydjPlan"
                      :gdjjdydjTableData="gdjjdydjTableData"
                      :tableHeadData="tableHeadData"
                      :unitMap="unitMap"
                      :checkState="this.checkState"
                      ref="gdjjdydj"
                    ></gdjjdydj>
                    <gdjjnylx
                      v-if="proceedInfo.gdjjnylxPlan"
                      :gdjjnylxTableData="gdjjnylxTableData"
                      :gdjjnylxTableData1="gdjjnylxTableData1"
                      :tableHeadData="tableHeadData"
                      :unitMap="unitMap"
                      :checkState="this.checkState"
                      ref="gdjjnylx"
                    ></gdjjnylx>
                    <gdjjfc
                      v-if="proceedInfo.gdjjfcPlan"
                      :tbData="gdjjfcTableData"
                      :tableHeadData="tableHeadData"
                      :unitMap="unitMap"
                      :checkState="this.checkState"
                      ref="gdjjfc"
                    ></gdjjfc>
                  </el-collapse-item>

                  <!-- 电量计划分配  -->
                  <el-collapse-item
                    title="电量计划分配"
                    name="10"
                    style="margin-left:10px"
                  >
                    <elec-fp
                      :unitMap="unitMap"
                      :query.sync="elecFp"
                      :state="state"
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
                        <el-form-item label="允许正偏差比例:">
                          <el-input
                            :disabled="state"
                            class="ddw1"
                            type="number"
                            step="“0.0001”"
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
                            :disabled="state"
                            class="ddw1"
                            type="number"
                            step="“0.0001”"
                            @mousewheel.native.prevent
                            v-model="
                              contractLedgerForm.clauseAssessment.posDevRatio
                            "
                          ></el-input>
                          <span>%</span>
                        </el-form-item>

                        <el-form-item label="偏差考核电价方式:">
                          <el-select
                            style="width:159px"
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
                        <!--  2019-11-15 #2648 滕超 增加甲乙方承担比例 start-->
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
                        <!--  2019-11-15 #2648 滕超 增加甲乙方承担比例 end-->
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="允许负偏差比例:"
                          prop="clauseAssessment.allowNegDevRatio"
                        >
                          <el-input
                            :disabled="state"
                            class="ddw1"
                            type="number"
                            step="“0.0001”"
                            @mousewheel.native.prevent
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
                            class="ddw1"
                            type="number"
                            step="“0.0001”"
                            @mousewheel.native.prevent
                            v-model="
                              contractLedgerForm.clauseAssessment.negDevRatio
                            "
                          ></el-input>
                          <span>%</span>
                        </el-form-item>
                        <!-- 2019-10-29 #2519 张亮三 把this.contractLedgerForm 改为contractLedgerForm -->
                        <!--  2019-11-15 #2648 滕超 增加正负偏差考核电价 start-->
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
                        <!--  2019-11-15 #2648 滕超 增加正负偏差考核电价 end-->
                      </el-col>
                    </el-row>
                    <!--  2019-11-15 #2648 滕超 增加偏差考核另有约定 start-->
                    <el-row :gutter="10">
                      <el-col :span="24">
                        <el-form-item label="另有约定：">
                          <el-input
                            :disabled="state"
                            type="textarea"
                            rows="5"
                            resize="none"
                            v-model="
                              contractLedgerForm.clauseAssessment.otherwiseAgree
                            "
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!--  2019-11-15 #2648 滕超 增加偏差考核另有约定 end-->
                  </el-collapse-item>
                  <!-- 偏差考核 end -->

                  <!-- #4083 gaoaining 2020-05-27 添加增值服务条款 start -->
                  <el-collapse-item
                    v-if="proceedInfo.isValueServicesText"
                    title="增值服务条款"
                    name="6"
                    style="margin-left:10px"
                  >
                    <el-form-item label="增值服务条款">
                      <el-input
                        :disabled="state"
                        type="textarea"
                        rows="5"
                        resize="none"
                        v-model="
                          contractLedgerForm.additionalClause.valueServicesText
                        "
                      ></el-input>
                    </el-form-item>
                  </el-collapse-item>
                  <!-- #4083 gaoaining 2020-05-27 添加增值服务条款 end -->

                  <!-- 违约条款  -->
                  <el-collapse-item
                    title="违约条款"
                    name="6"
                    style="margin-left:10px"
                  >
                    <div>甲方违约：</div>
                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item label="赔偿方式：">
                          <el-select
                            :disabled="state"
                            @change="getSelectValueByFirstParty"
                            v-model="
                              contractLedgerForm.clauseDefault
                                .customerCompensateWay
                            "
                            placeholder="请选择赔偿方式"
                            style="width:100%"
                          >
                            <el-option
                              v-for="item in htWaysOfCompensation"
                              :key="item.propCode"
                              :label="item.propName"
                              :value="item.propCode"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <!-- 2019-10-29 #2519 张亮三 把this.contractLedgerForm 改为contractLedgerForm -->
                        <div
                          v-if="
                            contractLedgerForm.clauseDefault
                              .customerCompensateWay == 'pcfs_01'
                          "
                        >
                          <el-form-item label="比例">
                            <el-input
                              :disabled="state"
                              class="ddw1"
                              type="number"
                              step="“0.0001”"
                              @mousewheel.native.prevent
                              v-model="
                                contractLedgerForm.clauseDefault
                                  .customerCompensateValue2
                              "
                            ></el-input>
                            <span>%</span>
                          </el-form-item>
                        </div>
                        <!--  2019-11-15 #2648 滕超 增加违约条款 甲方 违约电价 start-->
                        <div
                          v-if="
                            contractLedgerForm.clauseDefault
                              .customerCompensateWay == 'pcfs_03'
                          "
                        >
                          <el-form-item label="违约电价：">
                            <el-input
                              :disabled="state"
                              class="ddw1"
                              type="number"
                              step="“0.0001”"
                              @mousewheel.native.prevent
                              v-model="
                                contractLedgerForm.clauseDefault
                                  .customerCompensateValue3
                              "
                            ></el-input>
                            <span>{{ unitMap.priceUnit }}</span>
                          </el-form-item>
                        </div>
                        <!--  2019-11-15 #2648 滕超 增加违约条款 甲方 违约电价 end-->
                        <div
                          v-if="
                            contractLedgerForm.clauseDefault
                              .customerCompensateWay == 'pcfs_02'
                          "
                        >
                          <el-form-item label="支付违约金：">
                            <el-input
                              :disabled="state"
                              class="ddw1"
                              type="number"
                              step="“0.0001”"
                              @mousewheel.native.prevent
                              v-model="
                                contractLedgerForm.clauseDefault
                                  .customerCompensateValue1
                              "
                            ></el-input>
                            <span>{{ unitMap.amountUnit }}</span>
                          </el-form-item>
                        </div>
                      </el-col>
                    </el-row>
                    <div>乙方违约：</div>
                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-form-item label="赔偿方式：">
                          <el-select
                            :disabled="state"
                            @change="getSelectValueBySecondParty"
                            v-model="
                              contractLedgerForm.clauseDefault
                                .secondPartCompensateWay
                            "
                            placeholder="请选择赔偿方式"
                            style="width:100%"
                          >
                            <el-option
                              v-for="item in htWaysOfCompensation"
                              :key="item.propCode"
                              :label="item.propName"
                              :value="item.propCode"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <!-- 2019-10-29 #2519 ���亮三 把this.contractLedgerForm 改为contractLedgerForm -->
                        <div
                          v-if="
                            contractLedgerForm.clauseDefault
                              .secondPartCompensateWay == 'pcfs_01'
                          "
                        >
                          <el-form-item label="比例">
                            <el-input
                              :disabled="state"
                              class="ddw1"
                              type="number"
                              step="“0.0001”"
                              @mousewheel.native.prevent
                              v-model="
                                contractLedgerForm.clauseDefault
                                  .secondPartCompensateValue1
                              "
                            ></el-input>
                            <span>%</span>
                          </el-form-item>
                        </div>
                        <!--  2019-11-15 #2648 滕超 增加违约条款 乙方 违约电价 start-->
                        <div
                          v-if="
                            contractLedgerForm.clauseDefault
                              .secondPartCompensateWay == 'pcfs_03'
                          "
                        >
                          <el-form-item label="违约电价：">
                            <el-input
                              :disabled="state"
                              class="ddw1"
                              type="number"
                              step="“0.0001”"
                              @mousewheel.native.prevent
                              v-model="
                                contractLedgerForm.clauseDefault
                                  .secondPartCompensateValue3
                              "
                            ></el-input>
                            <span>{{ unitMap.priceUnit }}</span>
                          </el-form-item>
                        </div>
                        <!--  2019-11-15 #2648 滕超 增加违约条款 乙方 违约电价 end-->
                        <div
                          v-if="
                            contractLedgerForm.clauseDefault
                              .secondPartCompensateWay == 'pcfs_02'
                          "
                        >
                          <el-form-item label="支付违约金：">
                            <el-input
                              :disabled="state"
                              class="ddw1"
                              type="number"
                              step="“0.0001”"
                              @mousewheel.native.prevent
                              v-model="
                                contractLedgerForm.clauseDefault
                                  .secondPartCompensateValue2
                              "
                            ></el-input>
                            <span>{{ unitMap.amountUnit }}</span>
                          </el-form-item>
                        </div>
                      </el-col>
                    </el-row>
                    <!--  2019-11-15 #2648 滕超 增加违约条款 另有约定 start-->
                    <el-row :gutter="10">
                      <el-col :span="24">
                        <el-form-item label="另有约定：">
                          <el-input
                            :disabled="state"
                            type="textarea"
                            rows="5"
                            resize="none"
                            v-model="
                              contractLedgerForm.clauseDefault.otherwiseAgree
                            "
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!--  2019-11-15 #2648 滕超 增加违约条款 另有约定 end-->
                  </el-collapse-item>
                  <!-- 违约条款 end -->
                  <!-- 附加条款  -->
                  <el-collapse-item
                    title="附加条款"
                    name="7"
                    style="margin-left:10px"
                  >
                    <el-form-item label="合同附加条款：">
                      <el-input
                        :disabled="state"
                        type="textarea"
                        rows="5"
                        resize="none"
                        v-model="
                          contractLedgerForm.additionalClause
                            .additionalClauseText
                        "
                      ></el-input>
                    </el-form-item>
                  </el-collapse-item>
                  <el-collapse-item
                    title="反馈信息"
                    name="8"
                    style="margin-left:10px"
                    v-if="
                      contractLedgerForm.htContract.createFrom == '0' &&
                        contractLedgerForm.htContract.customerConfirmStatus ==
                          '7'
                    "
                  >
                    <el-form-item label="驳回反馈信息">
                      <el-input
                        type="textarea"
                        resize="none"
                        disabled
                        :rows="4"
                        v-model="contractLedgerForm.htContract.rejectReason"
                      ></el-input>
                    </el-form-item>
                  </el-collapse-item>
                  <!-- 附加条款 end -->
                  <!-- 用电信息  -->
                  <el-collapse-item
                    title="合同附件1-用电信息"
                    name="8"
                    style="margin-left:10px"
                  >
                    <div>
                      <el-row>
                        <el-col :span="8">
                          <el-form-item label="合同总用电容量：">
                            <el-input
                              style="width:80px"
                              disabled
                              v-model="
                                contractLedgerForm.htContract
                                  .totalElectricalCapacity
                              "
                            ></el-input>
                            <!--  2019-11-13 #2652 滕超 单位修改 start-->
                            <span>{{ unitMap.capacityUnit }}</span>
                            <!--  2019-11-13 #2652 滕超 单位修改 end-->
                          </el-form-item>
                        </el-col>
                        <!-- #3539 2020-01-08 张亮三 增加合同总变压器容量字段 start 暂时注释掉 -->
                        <el-col :span="8">
                          <el-form-item label="合同总变压器容量：">
                            <el-input
                              style="width:80px"
                              :disabled="state || isEditTotalTCapacity"
                              v-model="
                                contractLedgerForm.htContract
                                  .totalTransformerCapacity
                              "
                            ></el-input>
                            <span>千伏安</span>
                          </el-form-item>
                        </el-col>
                        <!-- #3539 2020-01-08 张亮三 增加合同总变压器容量字段 end  -->
                        <el-col :span="8">
                          <el-form-item label="合同最大电压等级：">
                            <!-- <el-input
                              style="width:80px"
                              disabled
                              v-model="contractLedgerForm.htContract.totalVoltageLevelCode"
                            ></el-input>-->
                            <!-- 判断最大电压等级是否带单位没有带KV的加上KV  #2438 -->
                            <!-- 2019-10-29 #2519 张亮三 把this.contractLedgerForm 改为contractLedgerForm -->
                            <span>
                              {{
                                contractLedgerForm.htContract
                                  .totalVoltageLevelCode
                                  | toTotalVoltageLevelCode
                              }}
                            </span>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                    <!--  2019-11-13 #2652 滕超 单位修改 start-->
                    <div class="txt-right unit-info">
                      单位：kV、{{ unitMap.capacityUnit }}、千伏安
                    </div>
                    <!--  2019-11-13 #2652 滕超 单位修改 end-->
                    <el-table
                      border
                      :data="contractLedgerForm.templatePowerList"
                      ref="multipleTable"
                      @selection-change="selsChange"
                    >
                      <el-table-column
                        align="center"
                        :selectable="selectInit"
                        type="selection"
                      ></el-table-column>

                      <el-table-column align="center" label="企业代码">
                        <template slot-scope="scope">
                          <div class="txt-left">
                            {{ scope.row.enterpriseCode }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="用户名称">
                        <template slot-scope="scope">
                          <span>{{ scope.row.userName }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="户表号">
                        <template slot-scope="scope">
                          <div class="txt-left">
                            {{ scope.row.meterNumber }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="用电地址">
                        <template slot-scope="scope">
                          <span>{{ scope.row.powerPoint }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        align="center"
                        label="计量点表计资产编号"
                      >
                        <template slot-scope="scope">
                          <span>{{ scope.row.assetNumber }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="电压等级">
                        <template slot-scope="scope">
                          <!-- 判断合同台账附件用电信息电压等级是否加kv没有的加上KV #2438 -->
                          <span>
                            {{
                              scope.row.voltageLevelName | toVoltageLevelName
                            }}
                          </span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="用电容量">
                        <template slot-scope="scope">
                          <span>{{ scope.row.electricalCapacity }}</span>
                        </template>
                      </el-table-column>
                      <!-- #3509 2020-01-06 张亮三 增加变压器容量 start -->
                      <el-table-column align="center" label="变压器容量">
                        <template slot-scope="scope">
                          <span>{{ scope.row.transformerCapacity }}</span>
                        </template>
                      </el-table-column>
                      <!-- #3509 2020-01-06 张亮三 增加变压器容量 end-->
                      <el-table-column align="center" label="备注">
                        <template slot-scope="scope">
                          <span>{{ scope.row.remakes }}</span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-collapse-item>
                  <!-- 用电信息 end -->

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
          v-if="
            htElectricityPackageManager_btn_amendant && this.displayStatus == 3
          "
          style="float:left"
          class="filter-item check"
          plain
          @click="clicXGJL()"
          >修改记录
        </el-button>
        <el-button
          class="save-btn"
          :disabled="checkFlag"
          v-if="
            !state &&
              contractLedgerForm.htContract.createFrom == '1' &&
              contractLedgerForm.htContract.customerConfirmStatus == '5'
          "
          @click="submitSave('7')"
          >驳回
        </el-button>
        <el-button
          class="submit-btn"
          :disabled="checkFlag"
          v-if="
            !state &&
              contractLedgerForm.htContract.createFrom == '1' &&
              contractLedgerForm.htContract.customerConfirmStatus == '5'
          "
          @click="submitSave('6')"
          >确认
        </el-button>
        <!-- <el-button
          class="save-btn"
          v-if="!state"
          @click="submitSave('6')"
        >确认</el-button>-->
        <el-button
          :disabled="checkFlag"
          class="save-btn"
          v-if="
            !state &&
              contractLedgerForm.htContract.createFrom == '0' &&
              (contractLedgerForm.htContract.customerConfirmStatus == '' ||
                contractLedgerForm.htContract.customerConfirmStatus == '7' ||
                contractLedgerForm.htContract.customerConfirmStatus ===
                  'yth233' ||
                contractLedgerForm.htContract.customerConfirmStatusName ===
                  '已退回')
          "
          @click="submitSave('5', 'confirm')"
          >提交客户确认
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
          :loading="btn_save"
          class="save-btn"
          :disabled="checkFlag"
          @click="submitSave('11', 'save')"
          v-if="
            (displayStatus === '11' || displayStatus === '') &&
              !state &&
              (submitState == 'edit' || submitState == true)
          "
          >保存
        </el-button>

        <el-button
          :loading="btn_submit"
          :disabled="checkFlag"
          class="submit-btn"
          v-if="
            !state ||
              contractLedgerForm.htContract.dataStatus === '6' ||
              contractLedgerForm.htContract.dataStatusName === '已确认'
          "
          @click="submitSave('3', 'submit')"
          >提交
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

        <el-button class="cancel-btn" @click="close()">关闭</el-button>

        <!-- v-if="contractLedgerAudit_btn_reject" -->
      </div>
    </el-dialog>
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      width="layoutInfo.width+'px'"
      custom-class="w640"
      title="审批意见"
      v-loading="revieweFormLoading"
      :visible.sync="innerVisible"
      append-to-body
    >
      <div style="padding:10px;">
        <el-input
          type="textarea"
          placeholder="审批意见..."
          rows="6"
          :maxlength="400"
          resize="none"
          @input="approvalOpinionInput"
          v-model="approvalOpinion"
        ></el-input>
        <span class="validateText">{{ approvalOpinionRemnant }}/400</span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="save-btn" @click="revieweSave()">保存</el-button>
        <el-button class="cancel-btn" @click="innerVisible = false">
          <span>取消</span>
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
  confirm,
  reject,
  toCustomerConfirmation,
  getHtRecords,
  getDimsByParentCodeAndValue,
  getPropList,
} from '@common/api/contractManage/contractLedger/index';
import { getToken } from '@common/utils/auth';
import {
  getcustomerId,
  getAllocatedCustomerListByName,
  getCustomerContactsByOrgId,
} from '@common/api/contractManage/contractLedger/index';
import { getDlsbIsGD } from '@common/api/business/jyEleDeclareManage/index';
import {
  getYdxxList,
  selectProvince,
} from '@common/api/customer/tMdataCustomer/';
import {
  parseTime,
  getUnitMap,
  initDialogHeight,
  countData,
  traverse,
} from '@common/utils/index';
import { mapGetters } from 'vuex';
import {
  getSelectList,
  downloadOneFile,
  downloadOneFileUs1,
} from '@common/api/base';
import amendantRecord from '@common/components//amendantRecord';
import jjfcYdjh from '@common/components//contractLedger/components/jjfcYdjh';
import gdjjdydj from '@common/components//contractLedger/components/gdjjdydj';
import gdjjnylx from '@common/components//contractLedger/components/gdjjnylx';
import gdjjfc from '@common/components//contractLedger/components/gdjjfc';
import { getValueByOrgIdAndCode } from '@common/api/business/jyTransactionNotice/index';
import fwmixin from '@common/components/contractLedger/fwmixin';
import FormFile from '@common/components/uniCom/formFile';
import up from '@common/components/contractLedger/up';
import nsd from '@common/components/contractLedger/nsd';
import elecFp from '@common/components/contractLedger/components/elecFp';
import reasonStop from '@common/components/contractLedger/components/reasonStop';

export default {
  mixins: [fwmixin, nsd, up],
  components: {
    amendantRecord,
    jjfcYdjh,
    gdjjdydj,
    gdjjnylx,
    gdjjfc,
    'reason-stop': reasonStop,
    'elec-fp': elecFp,
    'form-file': FormFile,
  },
  props: {
    althtStateCodeList: { type: Array },
    htWaysOfCompensation: { type: Array },
    devAssessmentElecPriceWays: { type: Array },
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
    const validNegative = (rule, value, callback) => {
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
        additionalClause: {
          additionalClauseId: '',
          additionalClauseText: '', //附加条款内容
          valueServicesText: '', //增值服务条款 #4083
        },
        clauseAssessment: {
          violationId: '',
          allowPosDevRatio: '', //正偏差比例
          posDevRatio: '', //正偏差考核比例
          allowNegDevRatio: '', //负偏差比例
          negDevRatio: '', //负偏差考核比例
          devAssessmentElecPriceWay: 'pckh1002', //偏差考核电价方式
          // devAssessmentElecPrice: "", //偏差考核电价
          posDevAssessmentElecPrice: '', //正偏差考核电价
          negDevAssessmentElecPrice: '', //负偏差考核电价
          // userCommitmentRatio: "" //用户承担比例
          customerCommitmentRatio: '', //甲方用户承担比例
          spCommitmentRatio: '', //乙方用户承担比例
          otherwiseAgree: '', //偏差考核另有约定
        },
        clauseDefault: {
          defaultId: '',
          // compensate: "", //是否赔偿
          // compensationStatement: "", //赔偿说明
          customerCompensateWay: '', //赔偿方式
          customerCompensateValue1: '', //支付违约金
          customerCompensateValue2: '', //签约电量乘固定降价
          customerCompensateValue3: '', //违约电价
          customerCompensateValue: '', //表单提交变量
          secondPartCompensateWay: '', //赔偿方式
          secondPartCompensateValue1: '', //比例
          secondPartCompensateValue2: '', //支付违约金
          secondPartCompensateValue3: '', //违约电价
          secondPartCompensateValue: '', //表单提交变量
          otherwiseAgree: '', //违规条款另有约定
        },
        clausePlan: {
          electricityId: '',
          janYearBilateElectric: '',
          janYearBilateElecPrice: '',
          janYearLongtermElectric: '',
          janYearLongtermElecPrice: '',
          janElectricityTrade: '',
          janElectricityPrice: '',
          febYearBilateElectric: '',
          febYearBilateElecPrice: '',
          febYearLongtermElectric: '',
          febYearLongtermElecPrice: '',
          febElectricityTrade: '',
          febElectricityPrice: '',
          marYearBilateElectric: '',
          marYearBilateElecPrice: '',
          marYearLongtermElectric: '',
          marYearLongtermElecPrice: '',
          marElectricityTrade: '',
          marElectricityPrice: '',
          aprYearBilateElectric: '',
          aprYearBilateElecPrice: '',
          aprYearLongtermElectric: '',
          aprYearLongtermElecPrice: '',
          aprElectricityTrade: '',
          aprElectricityPrice: '',
          mayYearBilateElectric: '',
          mayYearBilateElecPrice: '',
          mayYearLongtermElectric: '',
          mayYearLongtermElecPrice: '',
          mayElectricityTrade: '',
          mayElectricityPrice: '',
          junYearBilateElectric: '',
          junYearBilateElecPrice: '',
          junYearLongtermElectric: '',
          junYearLongtermElecPrice: '',
          junElectricityTrade: '',
          junElectricityPrice: '',
          julYearBilateElectric: '',
          julYearBilateElecPrice: '',
          julYearLongtermElectric: '',
          julYearLongtermElecPrice: '',
          julElectricityTrade: '',
          julElectricityPrice: '',
          augYearBilateElectric: '',
          augYearBilateElecPrice: '',
          augYearLongtermElectric: '',
          augYearLongtermElecPrice: '',
          augElectricityTrade: '',
          augElectricityPrice: '',
          sepYearBilateElectric: '',
          sepYearBilateElecPrice: '',
          sepYearLongtermElectric: '',
          sepYearLongtermElecPrice: '',
          sepElectricityTrade: '',
          sepElectricityPrice: '',
          octYearBilateElectric: '',
          octYearBilateElecPrice: '',
          octYearLongtermElectric: '',
          octYearLongtermElecPrice: '',
          octElectricityTrade: '',
          octElectricityPrice: '',
          novYearBilateElectric: '',
          novYearBilateElecPrice: '',
          novYearLongtermElectric: '',
          novYearLongtermElecPrice: '',
          novElectricityTrade: '',
          novElectricityPrice: '',
          decYearBilateElectric: '',
          decYearBilateElecPrice: '',
          decYearLongtermElectric: '',
          decYearLongtermElecPrice: '',
          decElectricityTrade: '',
          decElectricityPrice: '',
          // userCommitmentRatio:""//用户承担比例
        },
        clausePrice: {
          surplusElectricity: '', //富余电量
          secondPartProportion: '', //乙方方分成比例
          priceId: '',
          yearBilateElectric: '', //年度双边电量
          yearLongtermElectric: '', //年度长协电量
          fixDeprice: '', //固定降价/电价
          capitalizedFixDeprice: '', //固定降价/电价 大写
          monthBidElectric: '', //月度竞价电量
          bottomElectricPrice: '', //、保底降价/电价
          customerProportion: '', //、甲方分成比例
          // totalElectricity:"",//、总电量
          kwhCost: '', //、用电费用
          proportion: '', //、甲方分成比例
          yearBidElectric: '', //年度竞价
          otherwiseAgree: '', //收益方式另有约定
          sfGovtSubsidies: '', // 有无政府性补贴
          ppnGovtSubsidies: '', // 政府性补贴归公司
          spjcPriceDifference: '', // 输配价差归公司
        },
        htContract: {
          legalFlag: 0,
          spAreaCode: '',
          spProvince: '',
          customerId: '',
          // todo wsc 2020-10-09
          isVirtual: 0,
          lastYearElectricConsum: 0,
          threeYearAveElectric: 0,

          isRelate: 0, //  是否关联合同 #6

          legalContractCode: '', //法务系统合同编码
          // todo wsc end
          // #3225 wangc 20191222 新增字段 客户简称 用电规模 通讯地址
          customerSname: '', //客户简称
          powerScale: '', //用电规模
          spContactAddress: '', //乙方通讯地址
          contactAddress: '', //甲方通讯地址
          customerCode: '', //甲方id
          customerName: '', //甲方name //售电合同甲方信息数据来自客户
          secondPartCode: '', //乙方id
          secondPartName: '', //乙方name
          customerProvince: '', //所属地市
          customerProvinceCode: '', //所属地市code
          customerAreaCode: '', //所属县区code
          // customerAreaName: "", //所属县区
          customerTradeCenterRegistCode: '', //注册编码
          customerSocialCreditCode: '', //统一社会信用代码
          customerAddr: '', //地址
          customerLegalPerson: '', //法人
          customerAccountName: '', //开户名
          customerDepositBank: '', //开户行
          customerDepositBankAccount: '', //银行账户
          tradeName: '', //交易名称
          spProvince: '', //所属地市
          spTradeCenterRegistCode: '', //注册编码
          spSocialCreditCode: '', //统一社会信用代码
          spAddr: '', //地址
          spLegalPerson: '', //法人
          spAccountName: '', //开户名
          spDepositBank: '', //开户行
          spDepositBankAccount: '', //乙方银行账户
          beginDate: '', //合同生效日期
          contractCode: '', //系统合同编码
          contractName: '', //合同名称
          customerContractCode: '', //甲方合同编码
          spContractCode: '', //乙方合同编码
          customerRegisteredAddress: '', //甲方登记机关
          spRegisteredAddress: '', //乙方登记机关
          customerQyxz: '', //甲方企业性质
          spAttributeTypeCode: '', //乙方企业性质
          spAttributeTypeName: '', //乙方企业性质
          customerContacts: '', //甲方联系人
          spContacts: '', //乙方联系人
          customerMobilePhone: '', //甲方电话
          spMobilePhone: '', //乙方电话
          customerPostCode: '', //甲方邮编
          spPostCode: '', //乙方邮编
          customerFax: '', //甲方传真
          customerIndustrialPark: '', //所在园区
          customerBatchCode: '', //客户批次
          spFax: '', //乙方传真
          contractTypeCode: 'htlx03', //合同类型
          contractSigningType: '', //签约类型
          enclosure: '', //附件路径
          endDate: '', //合同失效日期
          orgId: '',
          remarks: '', ///备注
          signingDate: '', //合同签订日期
          //stateCode: "", //合同状态
          dataStatus: '',
          dataStatusName: '',
          totalElectricity: 0, ///合同总电量
          templateId: '', //合同模板id
          totalElectricalCapacity: '', //合计-用电容量
          totalTransformerCapacity: '', // #3539 2020-01-08 张亮三 合同总变压器容量
          totalVoltageLevelCode: '', //合计-电压等级
          customerConfirmStatus: '', //合同确认状态
          customerConfirmStatusName: '', //合同确认状态
          rejectReason: '', // 驳回原因
          createFrom: '0', // 合同创建来源1,外网，0内网
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
        templatePowerList: [],
        monthlyPlan: [], //新类型的用电计划
      },
      //表单校验
      contractLedgerFormRules: {
        'clauseAssessment.negDevRatio': [
          { validator: validNegative, trigger: 'blur' },
        ],
        /** 2019年11月4日09:40:11 #2463 李志佳 允许负偏差比例优化 start */
        // "clauseAssessment.allowNegDevRatio": [
        //   { validator: validNegative, trigger: "blur" }
        // ],
        /** 2019年11月4日09:40:11 #2463  李志佳 允许负偏差比例优化 end */
        'htContract.contractCode': [
          {
            required: true,
            message: '请输入合同编码',
            trigger: 'blur',
          },
        ],
        'htContract.isRelate': [
          {
            required: true,
            message: '请选择关联交易',
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
        'htContract.customerId': [
          {
            required: true,
            message: '请输入甲方名称',
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
        'clausePrice.kwhCost': [
          {
            required: true,
            message: '请输入用电费用',
            trigger: 'blur',
          },
        ],
        'clausePrice.customerProportion': [
          {
            required: true,
            message: '请输入甲方分成比例',
            trigger: 'blur',
          },
        ],
        'clausePrice.bottomElectricPrice': [
          {
            required: true,
            message: '请输入保底降价/电价',
            trigger: 'blur',
          },
        ],
        'clausePrice.monthBidElectric': [
          {
            required: true,
            message: '请输入月度竞价电量',
            trigger: 'blur',
          },
        ],
        'clausePrice.fixDeprice': [
          {
            required: true,
            message: '请输入固定降价/电价',
            trigger: 'blur',
          },
        ],
        'clausePrice.yearBilateElectric': [
          {
            required: true,
            message: '请输入年度双边电量',
            trigger: 'blur',
          },
        ],
        'htContract.contractPriceWay': [
          {
            required: true,
            message: '请选择合同定价方式',
            trigger: 'blur',
          },
        ],
      },

      noSubsidy: false, //有无政府性补贴
      governmentOption: [],
      showGovernmentSubsidies: {}, //显示政府性补贴
      saleContractType: '',
      isEditTotalTCapacity: false,
      //  #2912 合计字段   wangc 20191206
      sums: '',
      sdhtlx: '', //合同类型
      tableHeadData: [], //合同表头维度数据
      jjfchdnTableData: [], //竞价分成含多年
      gdjjdydjTableData: [], //固定降价电压等级
      gdjjnylxTableData: [], //固定降价能源类型
      gdjjnylxTableData1: [], //富余电力`
      gdjjfcTableData: [], //固定降价分成
      province: 'province', //省市需要id
      provinceOptions: [], //省
      areaOptionsKh: [], //市
      batchList: [], //客户批次
      dialogHeight: 0, //弹窗高度
      htElectricityPackageManager_btn_amendant: false, //修改记录按钮
      zlist: [],
      ztotal: 0,
      isSX: '', //判断客户批次是否山西
      displayStatus: '', //修改记录是否显示判断状态
      originalId: '', //版本记录传值组件
      dialogFormVisibleTwo: false, //修改记录弹窗
      submitState: true, //保存按钮是否显示初始化
      checkFlag: false,
      electricityUnit: '',
      priceUnit: '',
      chargeUnit: '',
      capacityUnit: '',
      unitMap: {},
      checkState: false, //合同组件输入框状态
      btns: {
        confirm: false,
        reject: false,
        toCustomerConfirmation: false,
      },
      loadings: {
        confirm: false,
        reject: false,
        toCustomerConfirmation: false,
      },
      btn_save: false,
      btn_submit: false,
      spState: true,
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
      yearBilateElectricState: false,
      electricityTradeState: false,
      activeNames: ['1', '2'],
      dataStatus: '',

      proceedInfo: {
        isValueServicesText: false, //#4083增值服务条款的显隐控制
        yearBilateElectric: false, //年度双边电量
        fixDeprice: false, //固定降价/电价
        monthBidElectric: false, //月度竞价电量
        bottomElectricPrice: false, //、保底降价/电价
        customerProportion: false, //、甲方分成比例
        totalElectricity: false, //、总电量
        kwhCost: false, //、用电费用
        yearBidElectric: false,
        gdjj: false,
        jjcf: false,
        jjbdfc: false,
        fwf: false,
        hezj: true,
        gdjjhfc: false, //固定降价含分成
        fwhthfc: false, //服务合同分成
        jjfcdnPlan: false, //竞价分成含多年用电计划
        gdjjdydjPlan: false, //固定降价电压等级
        gdjjnylxPlan: false, //固定降价能源类型
        gdjjfcPlan: false, //固定降价分成
        fydl: false, //富余电力
      },
      userList: [
        {
          description: '',
          assetNumber: '',
          contractId: '',
          customerId: '',
          enterpriseCode: '',
          meterNumber: '',
          powerId: '',
          powerPoint: '',
          remakes: '',
          templateTypeCode: '20',
          userName: '',
          voltageLevelName: '20',
        },
      ],
      listLoading: false,
      sdTemplateName: '',
      // contractForm:{
      //   templateId:"",
      //   contractTypeCode:"htlx03",
      //   secondPartName:"",
      //   secondPartCode:"",
      // },
      // althtStateCodeList:[],
      loading: false, //加载状态
      state: false,
      formLoading: false, //加载状态
      revieweFormLoading: false, //审核请求状态
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
      firstPartyInfo: {
        customerCode: '', //甲方id
        customerName: '',
        customerProvince: '', //所属地市
        customerProvinceCode: '', //所属地市code
        customerAreaCode: '', //所属县区code
        // customerAreaName: "", //所属县区
        customerTradeCenterRegistCode: '', //注册编码
        customerSocialCreditCode: '', //统一社会信用代码
        customerAddr: '', //地址
        customerLegalPerson: '', //法人
        customerAccountName: '', //开户名
        customerDepositBank: '', //开户行
        customerDepositBankAccount: '', //银行账户
        customerRegisteredAddress: '', //甲方登记机关
        customerQyxz: '', //甲方企业性质
        customerContacts: '', //甲方联系人
        customerMobilePhone: '', //甲方电话
        customerPostCode: '', //甲方邮编
        customerFax: '', //甲方传真
        customerIndustrialPark: '', //所在园区
        customerBatchCode: '', //客户批次
      },
      secondPartyInfo: {
        secondPartCode: '', //乙方id
        secondPartName: '', //乙方name
        spProvince: '', //所属地市
        spTradeCenterRegistCode: '', //注册编码
        spSocialCreditCode: '', //统一社会信用代码
        spAddr: '', //地址
        spLegalPerson: '', //法人
        spAccountName: '', //开户名
        spDepositBank: '', //开户行
        spDepositBankAccount: '', //银行账户
        spRegisteredAddress: '', //乙方登记机关
        spAttributeTypeCode: '', //乙方企业性质
        spAttributeTypeName: '', //乙方企业性质
        spContacts: '', //乙方联系人
        spMobilePhone: '', //乙方电话
        spPostCode: '', //乙方邮编
        spFax: '', //乙方传真
      },

      oldInfo: {},
      contractId: '',

      approvalOpinionRemnant: 0,
      approvalOpinion: '',
      flag: '',
      innerVisible: false,
      isCustomerConfirmStatus: false,
      optionsA: [],
      bjfs: [],
      isFwht: false,
      spProvinceOptions: [],
      spAreaOptions: [],
    };
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
    // this.initFormData();
    //修改记录按钮权限
    this.htElectricityPackageManager_btn_amendant = this.elements[
      'htElectricityPackageManager:btn_amendant'
    ];
    // 获取弹窗高度
    this.dialogHeight = initDialogHeight();
    window.onresize = function temp() {
      this.dialogHeight = initDialogHeight(); //获取弹框高度(监控高度变化)
    };
    this.getcontractType();
    // 3027 调用固定降价方法 frj 2019-12-19 16:23:59
    this.getbjfs();
    this.initSelect();
    // this.getSecondPartyInfo(); // todo wsc 2020-12-19
  },
  computed: {
    ...mapGetters(['elements', 'allSubMenus', 'orgId']),
  },
  mounted() {},
  methods: {
    changeElecFp(q) {
      this.elecFp = {
        ...this.elecFp,
        ...q,
      };
    },
    initDialog(dataInfo, dialogInfo) {
      this.getFawuIs();
      console.log('inNewInitDialog:', dataInfo, dialogInfo);
      this.showGovernmentSubsidies = dialogInfo;

      this.checkState = dialogInfo.state;
      this.checkFlag = false;
      this.btn_save = false;
      this.noSubsidy = false;
      this.btn_submit = false;
      //20200511 阿彪 #4029 新增合同时，弹出台账编辑页面不应出现‘修改记录’功能
      this.displayStatus = '';
      // 保存时显示保存按钮
      this.submitState = dialogInfo.submitState;
      // if (this.$refs.uploadFileAdd === undefined) {
      // } else {
      //   this.$refs.uploadFileAdd.clearFiles();
      // }
      this.reInitFormData();
      //清空表单
      if (this.$refs.contractForm !== undefined) {
        this.$refs.contractForm.resetFields();
      }

      this.resetPlanData();
      this.setProceedInfo(dialogInfo.saleContractType, dialogInfo.state);

      this.getbatchList(); //客户批次
      this.getSelectProvince(); //省市初始化
      this.dialogTitle = dialogInfo.sdTemplateName || '查看';

      this.sdTemplateName = dialogInfo.sdTemplateName || '查看';

      this.flagOption = dialogInfo.flagOption;
      this.file_rode = dialogInfo.file_rode;
      this.contractLedgerForm.htContract.contractTypeCode = 'htlx03';

      let cols = _.keys(dataInfo.customerInfo);
      let customerCols = _.map(cols, (v) => _.upperFirst(v));
      customerCols.forEach((k, i) => {
        this.contractLedgerForm.htContract[`sp${k}`] =
          dataInfo.customerInfo[cols[i]];
      });

      console.log('initDialog:', this.contractLedgerForm.htContract);

      this.contractLedgerForm.htContract.isVirtual = this.isVirtual;
      this.contractLedgerForm.htContract.templateId = dataInfo.templateId;
      this.contractLedgerForm.htContract.secondPartName = dataInfo.customerName;
      this.contractLedgerForm.htContract.secondPartCode = dataInfo.customerCode;
      // 乙方省市
      this.contractLedgerForm.htContract.spProvince =
        dataInfo.customerInfo.provinceCode;
      this.getSelectSpProvince(dataInfo.customerInfo.provinceCode);
      selectProvince(dataInfo.customerInfo.provinceCode).then((res) => {
        this.spAreaOptions = res;
      });

      this.contractLedgerForm.htContract.orgId = this.orgId;
      this.contractLedgerForm.htContract.contractCode = dataInfo.contractCode;

      this.dataStatus = '';
      this.contractLedgerForm.htContract.createFrom = '0';
      this.contractLedgerForm.htContract.customerConfirmStatus = '';

      this.contractLedgerForm.htContract.enclosure = '';
      this.$set(this.contractLedgerForm['htContract'], 'contractPriceWay', '');
      this.showContractPriceWay(dialogInfo, dialogInfo.state);
      this.getDlsbIsSX(); //判断客户批次是否山西
      // this.initUpload(this.contractLedgerForm.htContract.enclosure);
      this.addDialogVisible = true;
    },
    initEditDialog(dataInfo, dialogInfo) {
      // 终止合同
      this.hasStopReason = _.has(dataInfo.htContract, 'contractEndReason');

      this.getFawuIs();
      console.log('initNewEditDialog', dataInfo, dialogInfo);
      this.showGovernmentSubsidies = dialogInfo;
      // todo 2021-02-20 电量分配
      this.elecFp = { ...dataInfo.elecFp };
      this.clausePrice = {
        ...dataInfo.clausePrice,
      };

      if (_.has(dataInfo, 'clausePrice')) {
        if (_.has(dataInfo.clausePrice, 'sharedYear')) {
          this.shareYear =
            dataInfo.clausePrice.sharedYear === 'Y' ? true : false;
        }

        if (_.has(dataInfo.clausePrice, 'sharedMonth')) {
          this.shareMonth =
            dataInfo.clausePrice.sharedMonth === 'Y' ? true : false;
        }
      }

      // #3218 原来合同定价方式清空历史数据放在表单重新赋值之后，现已修改   frj 2019-12-20 13:35:35
      // this.contractLedgerForm.clausePlan.electricityId = dataInfo.htContract.electricityId;
      this.$set(this.contractLedgerForm['htContract'], 'contractPriceWay', '');
      this.displayStatus = dataInfo.htContract.dataStatus;
      this.originalId = dataInfo.htContract.contractId;
      this.submitState = dialogInfo.submitState;
      this.checkState = dialogInfo.state;
      this.checkFlag = false;
      this.btn_save = false;
      this.btn_submit = false;
      // if (this.$refs.uploadFileAdd === undefined) {
      // } else {
      //   this.$refs.uploadFileAdd.clearFiles();
      // }
      this.reInitFormData();
      this.state = dialogInfo.state;
      this.electricityTradeState = dialogInfo.state;
      this.flagOption = dialogInfo.flagOption;
      this.getSelectProvince(); //省市初始化
      this.getbatchList(); //客户批次

      this.getSelectSpProvince(dataInfo.htContract.spProvinceCode);
      selectProvince(dataInfo.htContract.spProvinceCode).then((res) => {
        this.spAreaOptions = res;
      });
      this.changeprovinceKh(dataInfo.htContract.customerProvinceCode); //x县级显示
      // 查看时负偏差考核统一显示为正数 e #2640 frj 2019-11-13 14:28:18
      // todo wsc 2020-10-26
      this.setContractLedgerForm(dataInfo);
      this.setFirst(dataInfo, dialogInfo);

      this.contractLedgerForm.htContract.isVirtual =
        dataInfo.htContract.isVirtual;

      // this.jjfchdnTableData=dataInfo.monthlyPlan;//查看用电计划
      // 判断合同附件用电信息是否选中 回显问题 start Frj #2819 2019-11-25 16:04:41
      this.setTemplatePowerList();
      // #3539 2020-01-08 张亮三 当变压器容量有数据则合同总变压器容量不可编辑 end
      // 判断合同附件用电信息是否选中 回显问题 end Frj #2819 2019-11-25 16:04:41
      // 把时间验证放在表单重置再赋值之后  防止验证历史数据  Frj #2512   2019年10月29日14:17:59
      this.checkTime();

      this.resetPlanData();
      this.setProceedInfo(dialogInfo.saleContractType, dialogInfo.state);

      this.setNegDevRatio(dataInfo);
      this.dialogTitle = dialogInfo.sdTemplateName || '查看';
      // this.dataStatus = dataInfo.htContract.dataStatus;
      this.sdTemplateName = dialogInfo.sdTemplateName || '查看';
      this.contractId = dataInfo.htContract.contractId;

      if (typeof this.contractLedgerForm.htContract.enclosure == 'undefined') {
        this.contractLedgerForm.htContract.enclosure = '';
      }

      this.showContractPriceWay(dialogInfo, dialogInfo.state);
      this.getDlsbIsSX(); //判断客户批次是否山西
      // 月度计划
      this.setMonthlyPlan(dataInfo);
      // 这里只有月度计划，没有年度计划
      // this.setClausePlan(dataInfo);
      this.addDialogVisible = true;
    },

    initSelect() {
      getSelectList('selectYorW').then((res) => {
        this.governmentOption = res;
      });
    },
    //#4061 qinhz 2020-05-25 17:30:10 当‘有无政府性补贴’选择‘无’ 时： ‘政府性补贴归公司’文本框置灰不可编辑，如之前有数据则清除
    governmentOptionChange(val) {
      if (val === 'yw02') {
        this.noSubsidy = true;
        this.contractLedgerForm.clausePrice.ppnGovtSubsidies = '';
      } else {
        this.noSubsidy = false;
      }
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
     * @方法名称: getDlsbIsSX
     * @功能描述: 查询是否为指定组织
     * @参数: configurationId
     * @返回值: 0/1
     * @样式作用范围:
     * @作者: 滕超
     * @Date: 2019-12-02 11:56:29
     * @最新修改内容:
     * @LastEditTime:
     */
    getDlsbIsSX() {
      let params = {};
      params.parameterCode = '1040005';
      params.configurationId = '4';
      params.orgId = this.contractLedgerForm.htContract.orgId;
      getDlsbIsGD(params).then((res) => {
        this.isSX = res;
      });
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
    //审批意见字数统计
    approvalOpinionInput() {
      let txtVal = this.approvalOpinion.length;
      this.approvalOpinionRemnant = 400 - txtVal;
    },
    //驳回
    revieweReject() {
      this.contractLedgerForm.htContract.rejectReason = this.approvalOpinion;
      this.revieweFormLoading = true;
      this.editObject();
    },
    //通过
    reviewePass() {
      this.contractLedgerForm.htContract.rejectReason = this.approvalOpinion;
      this.revieweFormLoading = true;
      this.editObject();
    },
    //审批
    revieweSave() {
      //  console.log(this.flag);
      if (this.contractLedgerForm.htContract.customerConfirmStatus == '6') {
        this.reviewePass();
      } else if (
        this.contractLedgerForm.htContract.customerConfirmStatus == '7'
      ) {
        this.revieweReject();
      }
    },
    //打开审核意见窗口
    openCheckWin() {
      this.approvalOpinionRemnant = 0;
      this.approvalOpinion = '';
      this.contractLedgerForm.htContract.rejectReason = '';
      this.innerVisible = true;
    },
    //确认
    confirm(parame) {
      reject(parame).then((res) => {
        this.formLoading = false;
        this.btn_save = false;
        this.btn_submit = false;
        if (res.rel) {
          this.$notify({
            title: res.msg,
            message: res.msg,
            type: 'success',
            duration: 2000,
          });
          this.$emit('initList');
          this.addDialogVisible = false;
        } else {
          this.$notify({
            title: res.msg,
            message: res.msg,
            type: 'warning',
            duration: 2000,
          });
        }
      });
    },

    //提交客户确认
    toCustomerConfirmation(parame) {
      reject(parame).then((res) => {
        this.formLoading = false;
        this.btn_save = false;
        this.btn_submit = false;
        if (res.rel) {
          this.$notify({
            title: res.msg,
            message: res.msg,
            type: 'success',
            duration: 2000,
          });
          this.$emit('initList');
          this.addDialogVisible = false;
        } else {
          this.$notify({
            title: res.msg,
            message: res.msg,
            type: 'warning',
            duration: 2000,
          });
        }
      });
    },
    // countData(){

    // },
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
        let data = countData(beginDate, endDate);
        let TableData = traverse(beginDate, endDate);
        if (data != false) {
          //  需要判断合同类型
          if (this.proceedInfo.jjfcdnPlan) {
            this.jjfchdnTableData = [];
            TableData.forEach((item) => {
              this.jjfchdnTableData.push({
                month: item,
                year_decompose_electricity: '',
                year_decompose_price: '',
                month_bidding_electricity: '',
                month_bidding_price: '',
              });
            });
          }
          if (this.proceedInfo.gdjjdydjPlan) {
            this.gdjjdydjTableData = [];
            TableData.forEach((item) => {
              this.gdjjdydjTableData.push({
                month: item,
              });
            });
            //#2912 初始化用电计划数据 wangc 20191210
            if (typeof this.$refs.gdjjdydj != 'undefined') {
              this.$refs.gdjjdydj.initInt(this.gdjjdydjTableData);
            }
          }
          if (this.proceedInfo.gdjjnylxPlan) {
            this.gdjjnylxTableData = [];
            TableData.forEach((item) => {
              this.gdjjnylxTableData.push({
                month: item,
              });
            });
            this.gdjjnylxTableData1 = [];
            TableData.forEach((item) => {
              this.gdjjnylxTableData1.push({
                month: item,
              });
            });
          }
          if (this.proceedInfo.gdjjfcPlan) {
            this.gdjjfcTableData = [];
            TableData.forEach((item) => {
              this.gdjjfcTableData.push({
                month: item,
              });
            });
          }
          {
          }
        }
        this.checkFlag = false;
      }
    },
    /**
     * @方法名称: calculatePercentageJF
     * @功能描述: 改变甲方分成比例，改变乙方分成比例
     * @参数:
     * @返回值:
     * @作者: frj
     * @issues: #2674
     * @Date: 2019-11-22 13:31:25
     * @最新修改内容:直接计算不在先除100再乘100
     * @LastEditTime:
     */
    calculatePercentageJF() {
      let data = 100 - this.contractLedgerForm.clausePrice.customerProportion;
      this.contractLedgerForm.clausePrice.secondPartProportion = data;
    },
    /**
     * @方法名称: calculatePercentageYF
     * @功能描述: 改变乙方分成比例，自动填充甲方分成比例
     * @参数:
     * @返回值:
     * @作者: frj
     * @issues: #2674
     * @Date: 2019-11-22 13:44:13
     * @最新修改内容:直接计算不在先除100再乘100
     * @LastEditTime:
     */
    calculatePercentageYF() {
      let data = 100 - this.contractLedgerForm.clausePrice.secondPartProportion;
      this.contractLedgerForm.clausePrice.customerProportion = data;
    },
    /**
     * @方法名称: spCommitmentRatioJS
     * @功能描述: 改变甲方承担比例，计算乙方承担比例
     * @参数:
     * @返回值:
     * @样式作用范围:
     * @作者: 滕超
     * @Date: 2019-11-15 14:36:59
     * @最新修改内容:直接计算不在先除100再乘100
     * @LastEditTime:
     */
    spCommitmentRatioJS() {
      let data =
        100 - this.contractLedgerForm.clauseAssessment.customerCommitmentRatio;
      this.contractLedgerForm.clauseAssessment.spCommitmentRatio = data;
    },
    //计算总电量
    setTotalElectricity() {
      // console.log(this.sdhtlx );

      if (this.sdhtlx == 'sdhtlx11') {
        this.contractLedgerForm.htContract.totalElectricity =
          Number(this.contractLedgerForm.clausePrice.yearBilateElectric) +
          Number(this.contractLedgerForm.clausePrice.surplusElectricity);
      } else {
        // 20191209 wangc  #2912 保留6位小数
        this.contractLedgerForm.clausePrice.yearBilateElectric = Number(
          this.contractLedgerForm.clausePrice.yearBilateElectric
        ).toFixed(6);
        if (
          this.proceedInfo.monthBidElectric &&
          this.proceedInfo.yearLongtermElectric
        ) {
          this.contractLedgerForm.htContract.totalElectricity =
            Number(this.contractLedgerForm.clausePrice.yearLongtermElectric) +
            Number(this.contractLedgerForm.clausePrice.monthBidElectric);
        } else if (
          this.proceedInfo.monthBidElectric &&
          this.proceedInfo.yearBilateElectric
        ) {
          this.contractLedgerForm.htContract.totalElectricity =
            Number(this.contractLedgerForm.clausePrice.yearBilateElectric) +
            Number(this.contractLedgerForm.clausePrice.monthBidElectric);
        } else if (this.proceedInfo.yearBilateElectric) {
          this.contractLedgerForm.htContract.totalElectricity = Number(
            this.contractLedgerForm.clausePrice.yearBilateElectric
          );
        } else if (this.proceedInfo.monthBidElectric) {
          this.contractLedgerForm.htContract.totalElectricity = Number(
            this.contractLedgerForm.clausePrice.monthBidElectric
          );
        } else if (this.proceedInfo.yearLongtermElectric) {
          this.contractLedgerForm.htContract.totalElectricity = Number(
            this.contractLedgerForm.clausePrice.yearLongtermElectric
          );
        }
        if (this.proceedInfo.yearBidElectric) {
          this.contractLedgerForm.htContract.totalElectricity = Number(
            this.contractLedgerForm.clausePrice.yearBidElectric
          );
        }
      }
    },

    //表单数据重置
    reInitFormData() {
      for (let key in this.contractLedgerForm) {
        for (let key2 in this.contractLedgerForm[key]) {
          if (
            key2 == 'partyAssessmentRatio' ||
            key2 == 'posDevRatio' ||
            key2 == 'negDevRatio'
          ) {
            this.$set(this.contractLedgerForm[key], key2, '');
          } else {
            this.$set(this.contractLedgerForm[key], key2, '');
          }
        }
      }
    },

    //计算总电量
    selsChange(items) {
      let electricalCapacity = '';
      let totalVoltageLevelCode = '';
      let transformerCapacity = ''; //#3539 2020-01-08 张亮三 复选框选择后的变压器总和
      // 给isselect 重新赋值 frj #2819 2019-11-25 16:12:15
      this.contractLedgerForm.templatePowerList.forEach((element) => {
        element.isselect = '0';
      });
      items.forEach((item, index) => {
        // 复选框选中之后给isselect赋值为1 frj #2819 2019-11-25 16:12:10
        item.isselect = '1';
        if (totalVoltageLevelCode == '') {
          if (item.voltageLevelName != '') {
            totalVoltageLevelCode = item.voltageLevelName;
          }
        } else {
          if (item.electricalCapacity != '') {
            if (totalVoltageLevelCode < item.voltageLevelName) {
              totalVoltageLevelCode = item.voltageLevelName;
            }
          }
        }
        if (electricalCapacity == '') {
          if (item.templateTypeCode != '') {
            electricalCapacity = Number(item.electricalCapacity);
          }
        } else {
          if (item.electricalCapacity != '') {
            electricalCapacity += Number(item.electricalCapacity);
          }
        }
        // #3539 2020-01-08 张亮三 计算合同总变压器容量的和 start
        if (transformerCapacity == '') {
          if (
            item.transformerCapacity == '' ||
            typeof item.transformerCapacity == 'undefined'
          ) {
            return false;
          } else {
            transformerCapacity = Number(item.transformerCapacity);
          }
        } else {
          if (item.transformerCapacity != '') {
            transformerCapacity += Number(item.transformerCapacity);
          }
        }
        // #3539 2020-01-08 张亮三 计算合同总变压器容量的和 end
      });
      this.$set(
        this.contractLedgerForm.htContract,
        'totalVoltageLevelCode',
        totalVoltageLevelCode
      );
      this.$set(
        this.contractLedgerForm.htContract,
        'totalElectricalCapacity',
        electricalCapacity
      );
      // #3539 2020-01-08 张亮三 给合同总变压器赋值 start
      if (this.isEditTotalTCapacity) {
        this.$set(
          this.contractLedgerForm.htContract,
          'totalTransformerCapacity',
          transformerCapacity
        );
      }
      // #3539 2020-01-08 张亮三 给合同总变压器赋值 end
    },
    //获取用电信息列表
    getPowerList(id) {
      this.contractLedgerForm.templatePowerList = [];
      getYdxxList(id).then((res) => {
        this.contractLedgerForm.templatePowerList = res;
        this.isEditTotalTCapacity = false;
        if (this.contractLedgerForm.templatePowerList.length == 0) {
          this.isEditTotalTCapacity = false;
        } else {
          this.contractLedgerForm.templatePowerList.some((item, index) => {
            // #3539 2020-01-08 张亮三 当变压器容量有数据则合同总变压器容量不可编辑 start
            if (item.transformerCapacity && item.transformerCapacity != '') {
              this.isEditTotalTCapacity = true;
              return true;
            } else {
              this.isEditTotalTCapacity = false;
            }
            // #3539 2020-01-08 张亮三 当变压器容量有数据则合同总变压器容量不可编辑 start
          });
        }
      });
      /**
       * @方法名称: getCustomerContactsByOrgId
       * @功能描述: 获取甲方联系人信息
       * @参数: customerId
       * @返回值: contacts，mobilePhone
       * @样式作用范围:
       * @作者: 滕超
       * @Date: 2019-11-15 14:34:26
       * @最新修改内容:
       * @LastEditTime:
       */
    },

    //2019-12-02 #2900 秦侯珍 获取签约类型数据
    getcontractType() {
      getSelectList('contract_signing_type').then((res) => {
        this.optionsA = res;
      });
    },

    checkTotal(total, key) {
      //服务合同增加分解电量验证 2019-10-21 #2337
      //检查分摊编辑后分摊值与总值是否相等 total总值 key 分摊指标
      let state = true;
      let totalTemp = 0;
      for (let i = 0; i < 12; i++) {
        totalTemp += Number(
          this.contractLedgerForm.clausePlan[this.months[i] + key]
        );
      }
      totalTemp = totalTemp.toFixed(4);
      if (totalTemp > total || totalTemp < total) {
        state = false;
      }
      return state;
    },
    // 提交保存
    submitSave(dataStatus, type) {
      let _this = this;
      _this.checkFlag = true;
      const set = this.$refs;
      let yearBilateElectric = new Number();
      let electricityTrade = new Number();
      let isYearBilateElectricSum = true;
      let isElectricityTradeSum = true;
      let isTradeSum = true;
      this.isCustomerConfirmStatus = false;
      let monthlyBiddingState = true; //竞价分成月度竞价验证
      let totalElectricity = Number(
        this.contractLedgerForm.htContract.totalElectricity
      ).toFixed(4);
      let newMonthBidElectric = new Number();
      let newYearBidElectric = new Number();
      if (this.contractLedgerForm.clausePrice.monthBidElectric != '') {
        newMonthBidElectric =
          Number(this.contractLedgerForm.clausePrice.monthBidElectric).toFixed(
            4
          ) || 0;
      } else if (this.contractLedgerForm.clausePrice.yearBilateElectric != '') {
        newYearBidElectric =
          Number(
            this.contractLedgerForm.clausePrice.yearBilateElectric
          ).toFixed(4) || 0;
      } else {
        newMonthBidElectric =
          this.contractLedgerForm.clausePrice.monthBidElectric || 0;

        newYearBidElectric =
          this.contractLedgerForm.clausePrice.yearBilateElectric || 0;
      }
      // 验证竞价分成含多年的分解和总电量  固定降价能源 固定降价电压等级 s frj #2676 2019-11-22 21:05:16
      if (this.sdhtlx == 'sdhtlx12') {
        let totalTemp = 0;
        let array = this.$refs.jjfcYdjh.tableData;
        // 如果分解电量不填为空则验证通过 tengc #2972 2019-12-13
        let Array1 = [];
        this.$refs.jjfcYdjh.tableData.forEach((element) => {
          if (
            element.month_bidding_electricity != '' &&
            element.month_bidding_electricity != undefined &&
            element.month_bidding_electricity != null
          ) {
            Array1.push(element.month_bidding_electricity);
          }
        });
        if (Array1 == '') {
          monthlyBiddingState = true;
        } else {
          for (let i = 0; i < this.$refs.jjfcYdjh.tableData.length; i++) {
            totalTemp += Number(array[i].month_bidding_electricity);
          }
          if (newMonthBidElectric == totalTemp.toFixed(4)) {
            monthlyBiddingState = true;
          } else {
            monthlyBiddingState = false;
            //  #2912 提示语句修改  wangc 20191206
            this.$alert('月度竞价分解电量各月汇总与总电量不同！', '消息提示', {
              type: 'warning',
              confirmButtonText: '确定',
              callback: (action) => {
                _this.checkFlag = false;
                this.checkFlag = false;
              },
            });
          }
        }
      } else if (this.sdhtlx == 'sdhtlx09') {
        let totalTemp = 0;
        let array = this.$refs.gdjjfc.tableData;
        // 如果分解电量不填为空则验证通过 tengc #2972 2019-12-13
        let Array2 = [];
        this.$refs.gdjjfc.tableData.forEach((element) => {
          if (
            element.year_decompose_electricity != '' &&
            element.year_decompose_electricity != undefined &&
            element.year_decompose_electricity != null
          ) {
            Array2.push(element.year_decompose_electricity);
          }
        });
        if (Array2 == '') {
          monthlyBiddingState = true;
        } else {
          for (let i = 0; i < array.length; i++) {
            totalTemp += Number(array[i].year_decompose_electricity);
          }
          if (newYearBidElectric == totalTemp.toFixed(4)) {
            monthlyBiddingState = true;
          } else {
            monthlyBiddingState = false;
            //  #2912 提示语句修改  wangc 20191206
            this.$alert('年度双边分解电量各月汇总与总电量不同！', '消息提示', {
              type: 'warning',
              confirmButtonText: '确定',
              callback: (action) => {
                _this.checkFlag = false;
                this.checkFlag = false;
              },
            });
          }
        }
      } else if (this.sdhtlx == 'sdhtlx11') {
        let totalTemp = 0;
        let array = this.$refs.gdjjnylx.tableData;
        // 如果分解电量不填为空则验证通过 tengc #2972 2019-12-13
        let Array3 = [];
        this.$refs.gdjjnylx.tableData.forEach((element) => {
          if (
            element.year_trading_electricity != '' &&
            element.year_trading_electricity != undefined &&
            element.year_trading_electricity != null
          ) {
            Array3.push(element.year_trading_electricity);
          }
        });
        if (Array3 == '') {
          monthlyBiddingState = true;
        } else {
          for (let i = 0; i < array.length; i++) {
            totalTemp += Number(array[i].year_trading_electricity);
          }
          if (newYearBidElectric == totalTemp.toFixed(4)) {
            monthlyBiddingState = true;
          } else {
            monthlyBiddingState = false;
            //  #2912 提示语句修改  wangc 20191206
            this.$alert('年度交易电量各月汇总与总电量不同！', '消息提示', {
              type: 'warning',
              confirmButtonText: '确定',
              callback: (action) => {
                _this.checkFlag = false;
                this.checkFlag = false;
              },
            });
          }
        }
        //  #2912电量汇总与总电量条件判断  wangc 20191206
      } else if (this.sdhtlx == 'sdhtlx10') {
        let sums = 0;
        this.$refs.gdjjdydj.sums.forEach((element, index) => {
          if (index != 0 && index != this.$refs.gdjjdydj.sums.length - 1) {
            sums += Number(element);
          }
        });
        // 20191209 wangc  #2912 不填总电量和分级电量数据可提交操作
        if (
          this.contractLedgerForm.htContract.totalElectricity != '' &&
          sums != '' &&
          this.contractLedgerForm.htContract.totalElectricity != sums
        ) {
          this.$notify({
            title: '提示',
            message: '各个电压等级的电量汇总与总电量不同',
            type: 'warning',
            duration: 2000,
          });
          _this.checkFlag = false;
          this.checkFlag = false;
          return false;
        }
      }

      // 验证竞价分成含多年的分解和总电量  固定降价能源 固定降价电压等级 e frj #2676 2019-11-22 21:05:02
      //验证通过之后保存方法
      if (monthlyBiddingState) {
        set['contractLedgerForm'].validate((valid) => {
          if (valid) {
            // 补充协议暂存
            if (this.replenish) {
              this.$emit('initList', this.contractLedgerForm);
              this.addDialogVisible = false;
              this.innerVisible = false;
              return;
            }

            if (dataStatus == '7' || dataStatus == '6' || dataStatus == '5') {
              this.contractLedgerForm.htContract.customerConfirmStatus = dataStatus;
              if (dataStatus == '7' || dataStatus == '6') {
                this.isCustomerConfirmStatus = true;
              }
            } else {
              this.contractLedgerForm.htContract.dataStatus = dataStatus;
            }

            // 是否进入法务系统
            this.intoFawu(set, type);
          } else {
            //20191107 阿彪 #2604 合同管理--合同台账管理--测试bug
            this.checkFlag = false;
            return false;
          }
        });
      }
    },
    //设置时间
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
    editSaveObj(parame) {
      editObj(parame).then((res) => {
        this.formLoading = false;
        this.btn_save = false;
        this.btn_submit = false;
        this.revieweFormLoading = false;
        if (res.rel) {
          this.$notify({
            title: res.msg,
            message: res.msg,
            type: 'success',
            duration: 2000,
          });
          //2019-11-13 #2595 滕超 延时调用查询防止页面审核状态不变
          setTimeout(() => {
            this.$emit('initList');
            this.addDialogVisible = false;
            this.innerVisible = false;
          }, 1000);
        } else {
          this.checkFlag = false;
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
      // this.formLoading = false;
      // return false
      if (
        this.contractLedgerForm.clauseDefault.customerCompensateWay == 'pcfs_02'
      ) {
        this.contractLedgerForm.clauseDefault.customerCompensateValue = this.contractLedgerForm.clauseDefault.customerCompensateValue1;
      }
      if (
        this.contractLedgerForm.clauseDefault.customerCompensateWay == 'pcfs_03'
      ) {
        this.contractLedgerForm.clauseDefault.customerCompensateValue = this.contractLedgerForm.clauseDefault.customerCompensateValue3;
      }
      if (
        this.contractLedgerForm.clauseDefault.customerCompensateWay == 'pcfs_01'
      ) {
        this.contractLedgerForm.clauseDefault.customerCompensateValue = this.contractLedgerForm.clauseDefault.customerCompensateValue2;
      }
      if (
        this.contractLedgerForm.clauseDefault.secondPartCompensateWay ==
        'pcfs_01'
      ) {
        this.contractLedgerForm.clauseDefault.secondPartCompensateValue = this.contractLedgerForm.clauseDefault.secondPartCompensateValue1;
      }
      if (
        this.contractLedgerForm.clauseDefault.secondPartCompensateWay ==
        'pcfs_03'
      ) {
        this.contractLedgerForm.clauseDefault.secondPartCompensateValue = this.contractLedgerForm.clauseDefault.secondPartCompensateValue3;
      }
      if (
        this.contractLedgerForm.clauseDefault.secondPartCompensateWay ==
        'pcfs_02'
      ) {
        this.contractLedgerForm.clauseDefault.secondPartCompensateValue = this.contractLedgerForm.clauseDefault.secondPartCompensateValue2;
      }
      let parame = this.contractLedgerForm;
      for (let key in this.contractLedgerForm) {
        parame[key]['contractId'] = this.contractId;
      }
      // 需要做合同类型判断
      if (this.sdhtlx == 'sdhtlx12') {
        parame.monthlyPlan = this.$refs.jjfcYdjh.tableData; //竞价分成含多年 电压等级重新赋值
      } else if (this.sdhtlx == 'sdhtlx10') {
        parame.monthlyPlan = this.$refs.gdjjdydj.tableData; //固定降价电压等级 电压等级重新赋值
      } else if (this.sdhtlx == 'sdhtlx11') {
        parame.monthlyPlanFY = {
          hdcglist: this.$refs.gdjjnylx.tableData,
          fydllist: this.$refs.gdjjnylx.tableData1,
        }; //固定降价能源类型 电压等级重新赋值
      } else if (this.sdhtlx == 'sdhtlx09') {
        parame.monthlyPlan = this.$refs.gdjjfc.tableData; //固定降价分成 电压等级重新赋值
      } else {
        parame.monthlyPlan = [];
      }
      if (parame.clauseAssessment.negDevRatio != '') {
        parame.clauseAssessment.negDevRatio =
          0 - Math.abs(parame.clauseAssessment.negDevRatio);
      }
      let isNoCustomerConfirm = true;

      // todo wsc 2020-10-13 混入法务系统必填字段
      parame.htContract = {
        ...parame.htContract,
        ...this.contractLedgerForm.legal,
      };
      // todo 2021-02-20 15:41:31 elecFp
      parame.elecFp = this.elecFp;
      parame.clausePrice.sharedYear = this.shareYear ? 'Y' : '';
      parame.clausePrice.sharedMonth = this.shareMonth ? 'Y' : '';

      if (
        this.contractLedgerForm.htContract.customerConfirmStatus == '' ||
        this.contractLedgerForm.htContract.customerConfirmStatus == '5' ||
        this.contractLedgerForm.htContract.customerConfirmStatus == '7'
      ) {
        isNoCustomerConfirm = true;
        if (
          this.contractLedgerForm.htContract.dataStatus == '3' &&
          this.contractLedgerForm.htContract.customerConfirmStatus != '5'
        ) {
          this.$confirm('此合同客户未确认, 是否继续?', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
          })
            .then(({ value }) => {
              this.formLoading = true;
              this.btn_save = true;
              this.btn_submit = true;
              this.editSaveObj(parame);
            })

            .catch(() => {
              this.checkFlag = false;
              this.formLoading = false;
              this.btn_save = false;
              this.btn_submit = false;
              this.revieweFormLoading = false;
            });
        } else {
          this.editSaveObj(parame);
          this.formLoading = true;
          this.btn_save = true;
          this.btn_submit = true;
        }
      } else {
        this.formLoading = true;
        this.btn_save = true;
        this.btn_submit = true;
        this.editSaveObj(parame);
      }
    },
    saveAddObj(parame, type) {
      if (type == 'confirm') {
        addObj(parame).then((res) => {
          this.formLoading = true;
          this.btn_save = true;
          this.btn_submit = true;
          if (res.rel) {
            // 重置用电计划、已分摊、收益方式
            this.resetBdFields();
            //2019-11-13 #2595 滕超 延时调用查询防止页面审核状态不变
            setTimeout(() => {
              this.$notify({
                title: '提交成功!',
                message: '提交成功!',
                type: 'success',
                duration: 2000,
              });
              this.$emit('initList');
              this.formLoading = false;
              this.btn_save = false;
              this.btn_submit = false;
              this.addDialogVisible = false;
            }, 1000);
          } else {
            this.formLoading = false;
            this.btn_save = false;
            this.btn_submit = false;
            this.checkFlag = false;
            this.$notify({
              title: '提交失败!',
              message: '提交失败!',
              type: 'warning',
              duration: 2000,
            });
          }
        });
      } else {
        addObj(parame).then((res) => {
          this.formLoading = false;
          this.btn_save = false;
          this.btn_submit = false;
          if (res.rel) {
            // 重置用电计划、已分摊、收益方式
            this.resetBdFields();
            //2019-11-13 #2595 滕超 延时调用查询防止页面审核状态不变
            setTimeout(() => {
              this.$notify({
                title: res.msg,
                message: res.msg,
                type: 'success',
                duration: 2000,
              });
              this.$emit('initList');
              this.addDialogVisible = false;
            }, 1000);
          } else {
            this.checkFlag = false;
            this.$notify({
              title: res.msg,
              message: res.msg,
              type: 'warning',
              duration: 2000,
            });
          }
        });
      }
    },
    //新增
    addObject(type) {
      if (
        this.contractLedgerForm.clauseDefault.customerCompensateWay == 'pcfs_01'
      ) {
        this.contractLedgerForm.clauseDefault.customerCompensateValue = this.contractLedgerForm.clauseDefault.customerCompensateValue2;
      }
      if (
        this.contractLedgerForm.clauseDefault.customerCompensateWay == 'pcfs_02'
      ) {
        this.contractLedgerForm.clauseDefault.customerCompensateValue = this.contractLedgerForm.clauseDefault.customerCompensateValue1;
      }
      if (
        this.contractLedgerForm.clauseDefault.customerCompensateWay == 'pcfs_03'
      ) {
        this.contractLedgerForm.clauseDefault.customerCompensateValue = this.contractLedgerForm.clauseDefault.customerCompensateValue3;
      }
      if (
        this.contractLedgerForm.clauseDefault.secondPartCompensateWay ==
        'pcfs_01'
      ) {
        this.contractLedgerForm.clauseDefault.secondPartCompensateValue = this.contractLedgerForm.clauseDefault.secondPartCompensateValue1;
      }
      if (
        this.contractLedgerForm.clauseDefault.secondPartCompensateWay ==
        'pcfs_02'
      ) {
        this.contractLedgerForm.clauseDefault.secondPartCompensateValue = this.contractLedgerForm.clauseDefault.secondPartCompensateValue2;
      }
      if (
        this.contractLedgerForm.clauseDefault.secondPartCompensateWay ==
        'pcfs_03'
      ) {
        this.contractLedgerForm.clauseDefault.secondPartCompensateValue = this.contractLedgerForm.clauseDefault.secondPartCompensateValue3;
      }
      let parame = {};
      parame.additionalClause = {};
      parame.clauseAssessment = {};
      parame.clauseDefault = {};
      parame.clausePlan = {};
      parame.clausePrice = {};
      parame.htContract = {};
      parame.monthlyPlan = [];
      parame.templatePowerList = this.contractLedgerForm.templatePowerList;
      // 需要做合同类型判断
      if (this.sdhtlx == 'sdhtlx12') {
        parame.monthlyPlan = this.$refs.jjfcYdjh.tableData; //竞价分成含多年
      } else if (this.sdhtlx == 'sdhtlx10') {
        parame.monthlyPlan = this.$refs.gdjjdydj.tableData; //固定降价电压等级
      } else if (this.sdhtlx == 'sdhtlx11') {
        parame.monthlyPlanFY = {
          hdcglist: this.$refs.gdjjnylx.tableData,
          fydllist: this.$refs.gdjjnylx.tableData1,
        }; //固定降价能源类型 电压等级重新赋值
      } else if (this.sdhtlx == 'sdhtlx09') {
        parame.monthlyPlan = this.$refs.gdjjfc.tableData; //固定降价分成
      } else {
        parame.monthlyPlan = [];
      }
      for (let key in this.contractLedgerForm.additionalClause) {
        if (key != 'contractId' && key != 'additionalClauseId') {
          parame.additionalClause[
            key
          ] = this.contractLedgerForm.additionalClause[key];
        }
      }
      for (let key in this.contractLedgerForm.clauseAssessment) {
        if (key != 'contractId' && key != 'violationId') {
          parame.clauseAssessment[
            key
          ] = this.contractLedgerForm.clauseAssessment[key];
        }
      }
      // 负偏差考核存的时候放入负数 s #2640 frj 2019-11-13 14:24:41
      if (parame.clauseAssessment.negDevRatio != '') {
        parame.clauseAssessment.negDevRatio =
          0 - Math.abs(parame.clauseAssessment.negDevRatio);
      }
      // 负偏差考核存的时候放入负数 e #2640 frj 2019-11-13 14:24:41
      for (let key in this.contractLedgerForm.clauseDefault) {
        if (key != 'contractId' && key != 'defaultId') {
          parame.clauseDefault[key] = this.contractLedgerForm.clauseDefault[
            key
          ];
        }
      }
      for (let key in this.contractLedgerForm.clausePlan) {
        if (key != 'contractId' && key != 'electricityId') {
          parame.clausePlan[key] = this.contractLedgerForm.clausePlan[key];
        }
      }
      for (let key in this.contractLedgerForm.clausePrice) {
        if (key != 'contractId' && key != 'priceId') {
          parame.clausePrice[key] = this.contractLedgerForm.clausePrice[key];
        }
      }
      for (let key in this.contractLedgerForm.htContract) {
        if (key != 'contractId') {
          parame.htContract[key] = this.contractLedgerForm.htContract[key];
        }
      }
      // todo wsc 2020-10-13 混入法务系统必填字段
      parame.htContract = {
        ...parame.htContract,
        ...this.contractLedgerForm.legal,
      };
      // todo elecFp
      // todo 2021-02-20 15:41:31 elecFp
      parame.elecFp = this.elecFp;
      parame.clausePrice.sharedYear = this.shareYear ? 'Y' : '';
      parame.clausePrice.sharedMonth = this.shareMonth ? 'Y' : '';
      //新增
      parame.htContract.createFrom = '0';
      if (parame.htContract.dataStatus === '') {
        parame.htContract.dataStatus = '11';
      }

      console.log(
        'xx:',
        parame.htContract,
        parame.htContract.customerConfirmStatus,
        parame.htContract.dataStatus
      );
      if (parame.htContract.customerConfirmStatus == '') {
        if (parame.htContract.dataStatus == '3') {
          this.$confirm('此合同是否提交至客户确认?', '提示', {
            //2019-11-09 #2595 滕超 取消后提交，关闭提示框后无操作，按钮都恢复可点击
            distinguishCancelAndClose: true,
            confirmButtonText: '是',
            cancelButtonText: '否',
          })
            .then(({ value }) => {
              this.checkFlag = true;
              parame.htContract.customerConfirmStatus = '5';
              this.saveAddObj(parame, type);
            })
            .catch((action) => {
              if (action === 'cancel') {
                this.checkFlag = true;
                this.revieweFormLoading = false;
                this.saveAddObj(parame, type);
              } else {
                this.checkFlag = false;
                this.formLoading = false;
                this.btn_save = false;
                this.btn_submit = false;
                this.revieweFormLoading = false;
              }
            });
        } else {
          // this.$confirm("此合同客户是否提交至确认?", "提示", {
          //      confirmButtonText: "是",
          //   cancelButtonText: "否"
          // })
          //   .then(({ value }) => {
          //     parame.htContract.customerConfirmStatus = "5";
          //     this.saveAddObj(parame);
          //   })
          //   .catch(() => {

          //   });
          this.saveAddObj(parame, type);
        }
      } else {
        this.saveAddObj(parame, type);
      }
    },

    submitForm(type) {
      this.isUpload = false;
      this.contractLedgerForm.htContract['endDate'] = this.reSetTime('endDate');
      this.contractLedgerForm.htContract['signingDate'] = this.reSetTime(
        'signingDate'
      );
      this.contractLedgerForm.htContract['beginDate'] = this.reSetTime(
        'beginDate'
      );
      this.contractLedgerForm.htContract.contractTypeCode = 'htlx03';
      //2019年11月4日09:40:11 #2463 李志佳 允许负偏差比例优化
      if (this.contractLedgerForm.clauseAssessment.allowNegDevRatio != '') {
        this.contractLedgerForm.clauseAssessment.allowNegDevRatio = -Math.abs(
          this.contractLedgerForm.clauseAssessment.allowNegDevRatio
        );
      }
      //  this.contractLedgerForm.htContract["stateCode"]= this.getStateCodeByName(this.contractLedgerForm.htContract.stateName);
      if (this.flagOption === 'edit') {
        if (this.isCustomerConfirmStatus) {
          this.innerVisible = true;
        } else {
          this.formLoading = true;
          this.btn_save = true;
          this.btn_submit = true;
          this.editObject(type);
        }
      } else {
        this.formLoading = true;
        this.btn_save = true;
        this.btn_submit = true;
        this.addObject(type);
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
    //时间格式化方法
    getTime(val, key) {
      if (val != null && val != '' && key != '' && key != '') {
        this.contractLedgerForm.htContract[key] = parseTime(val, '{y}-{m}-{d}');
      }
    },

    //下拉框触发事件
    getSelectValueByFirstParty(data) {
      this.contractLedgerForm.clauseDefault['customerCompensateWay'] = data;
    },
    getSelectValueBySecondParty(data) {
      this.contractLedgerForm.clauseDefault['secondPartCompensateWay'] = data;
    },
    //弹框关闭执行方法
    handleClose() {
      this.firstPartyList = [];
      //清空表单
      this.$refs['contractLedgerForm'].resetFields();
      this.addDialogVisible = false;
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

    /**
     * @方法名称: getSelectProvince
     * @功能描述: 查询省市
     * @参数:
     * @返回值:
     * @作者: frj
     * @issues: #2639
     * @Date: 2019-11-18 15:22:33
     * @最新修改内容:
     * @LastEditTime:
     */
    getSelectProvince() {
      this.province = 'province';
      selectProvince(this.province).then((res) => {
        this.province = 'province';
        this.provinceOptions = res;
      });
    },
    /**
     * @方法名称: getbatchList
     * @功能描述: 查询客户批次
     * @参数:
     * @返回值:
     * @样式作用范围:
     * @作者: 滕超
     * @Date: 2019-12-02 10:46:26
     * @最新修改内容:
     * @LastEditTime:
     */
    getbatchList() {
      let param = {
        parentCode: 'announcement_batches',
        parentValue: '公告批次',
      };
      getDimsByParentCodeAndValue(param).then((res) => {
        this.batchList = res;
      });
    },
    getSelectSpProvince() {
      selectProvince('province').then((res) => {
        this.spProvinceOptions = res;
      });
    },
    /**
     * @方法名称: changeprovinceKh
     * @功能描述: 根据省去查找市
     * @参数: val
     * @返回值:
     * @作者: frj
     * @issues:#2639
     * @Date: 2019-11-18 10:14:33
     * @最新修改内容:
     * @LastEditTime:
     */
    changeSpProvince(val) {
      this.contractLedgerForm.htContract.spProvince = val;

      this.spAreaOptions = [];
      this.contractLedgerForm.htContract.spAreaCode = '';
      selectProvince(val).then((res) => {
        this.spAreaOptions = res;
      });
    },
    changeprovinceKh(val) {
      this.contractLedgerForm.htContract.customerProvinceCode = val;
      this.province = val;
      this.areaOptionsKh = [];
      // this.contractLedgerForm.htContract.customerAreaName = "";
      this.contractLedgerForm.htContract.customerAreaCode = '';
      selectProvince(this.province).then((res) => {
        this.areaOptionsKh = res;
      });
    },
    // 查看时合同附件1-用电信息  table 复选框不可编辑 #2819 start frj 2019-11-25 16:40:01
    selectInit(row) {
      if (this.checkState == true) {
        return false;
      } else {
        return true;
      }
    },
    // 查看时合同附件1-用电信息  table 复选框不可编辑 #2819 end frj 2019-11-25 16:40:01

    showContractPriceWay(dialogInfo, state) {
      this.isFwht = state;
      if (
        dialogInfo.saleContractType == 'sdhtlx06' ||
        dialogInfo.saleContractType == 'sdhtlx13'
      ) {
        this.contractLedgerForm.htContract.contractPriceWay = this.bjfs[1].propCode;
        this.isFwht = true;
      }
    },
    //获取报价方式
    getbjfs() {
      getSelectList('Quotation_method').then((res) => {
        this.bjfs = res;
      });
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
    //上传文件之前
    handleBefore(file) {},
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
      this.btn_save = false;
      this.btn_submit = false;
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
      this.btn_save = false;
      this.btn_submit = false;
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

.validateText {
  position: absolute;
  font-size: 10px;
  bottom: 55px;
  right: 25px;
}

.el-input__inner {
  padding: 0 5px;
}
</style>
