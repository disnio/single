<!--
 * @功能描述:
 * @版本:
 * @作者: 李志佳
 * @Date: 2020年1月5日09:51:58
 * @最新修改内容: 居间商合同
 * @LastEditTime: 2020-12-23 16:59:17
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
                        <el-form-item
                          label="系统合同编码:"
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
                          <span>
                            {{ contractLedgerForm.htContract.dataStatusName }}
                          </span>
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
                    <!--      todo wsc 2010-10-29 是否为关联合同  法务系统合同编码  #6           -->
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
                        <el-form-item label="乙方:">
                          <el-select
                            style="width:100%;"
                            v-model="
                              contractLedgerForm.htContract.secondPartCode
                            "
                            filterable
                            :disabled="state"
                            remote
                            :clearable="true"
                            reserve-keyword
                            :remote-method="getSecondPartyInfo"
                            @change="changeSecondPartyInfo"
                            :loading="loading"
                          >
                            <el-option
                              v-for="item in secondPartyList"
                              :key="item.index"
                              :label="item.customerName"
                              :value="item.customerId"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="所属地市:">
                          <!--                          <el-input-->
                          <!--                            v-model="contractLedgerForm.htContract.spProvince"-->
                          <!--                            :disabled="state"-->
                          <!--                          ></el-input>-->
                          <el-select
                            class="four-col left"
                            v-model="
                              contractLedgerForm.htContract.spProvinceCode
                            "
                            :placeholder="state ? '' : '请选择'"
                            @change="changeprovinceKhSp"
                            :disabled="state"
                            style="width:49%"
                          >
                            <el-option
                              v-for="(item, index) in provinceOptionsSp"
                              :key="index"
                              :label="item.propName"
                              :value="item.propCode"
                            ></el-option>
                          </el-select>
                          <el-select
                            class="four-col left"
                            v-model="contractLedgerForm.htContract.spAreaCode"
                            :placeholder="state ? '' : '请选择'"
                            :disabled="state"
                            style="width:49%"
                          >
                            <el-option
                              v-for="(item, index) in areaOptionsKhSp"
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
                            :disabled="state"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="交易中心注册编码:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract
                                .spTradeCenterRegistCode
                            "
                            :disabled="state"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="地址:">
                          <el-input
                            v-model="contractLedgerForm.htContract.spAddr"
                            :disabled="state"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="法人:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract.spLegalPerson
                            "
                            :disabled="state"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="开户行:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract.spDepositBank
                            "
                            :disabled="state"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="开户名:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract.spAccountName
                            "
                            :disabled="state"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="银行账号:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract.spDepositBankAccount
                            "
                            :disabled="state"
                          ></el-input>
                        </el-form-item>
                        <!--  2019-11-15 #2648 滕超 乙方增加字段 start-->
                        <el-form-item label="登记机关:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract.spRegisteredAddress
                            "
                            :disabled="state"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="企业性质:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract.spAttributeTypeName
                            "
                            :disabled="state"
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
                        <!--  2019-12-06 #3021 滕超 以上乙方字段改为可编辑 end-->
                        <!--  2019-11-15 #2648 滕超 乙方增加字段 end-->

                        <el-form-item label="是否有合同交接单:">
                          <el-select
                            v-model="
                              contractLedgerForm.htContract
                                .contractHandoverSheet
                            "
                            :placeholder="state ? '' : '请选择'"
                            :disabled="state"
                          >
                            <el-option
                              v-for="item in optionsB"
                              :key="item.propCode"
                              :label="item.propName"
                              :value="item.propCode"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          prop="htContract.customerName"
                          label="甲方:"
                        >
                          <el-input
                            v-model="contractLedgerForm.htContract.customerName"
                            :disabled="
                              state ||
                                contractLedgerForm.htContract.createFrom == '0'
                            "
                          ></el-input>
                          <!--                          <el-select-->
                          <!--                            style="width:100%;"-->
                          <!--                            v-model="contractLedgerForm.htContract.customerCode"-->
                          <!--                            filterable-->
                          <!--                            :disabled="-->
                          <!--                              state ||-->
                          <!--                                contractLedgerForm.htContract.createFrom == '0'-->
                          <!--                            "-->
                          <!--                            remote-->
                          <!--                            :clearable="true"-->
                          <!--                            reserve-keyword-->
                          <!--                            :remote-method="getFirstPartyInfo"-->
                          <!--                            @change="changeFirstPartyInfo"-->
                          <!--                            :loading="loading"-->
                          <!--                          >-->
                          <!--                            <el-option-->
                          <!--                              v-for="item in firstPartyList"-->
                          <!--                              :key="item.customerCode"-->
                          <!--                              :label="item.customerName"-->
                          <!--                              :value="item.customerCode"-->
                          <!--                            ></el-option>-->
                          <!--                          </el-select>-->
                        </el-form-item>

                        <!-- 所属地市改为省市 并新增县级下拉框 S frj # 2639 2019-11-18 15:24:53 -->
                        <el-form-item label="所属省市">
                          <el-select
                            class="four-col left"
                            v-model="
                              contractLedgerForm.htContract.customerProvinceCode
                            "
                            :placeholder="state ? '' : '请选择'"
                            @change="changeprovinceKh"
                            :disabled="
                              state ||
                                contractLedgerForm.htContract.createFrom == '0'
                            "
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
                            :disabled="
                              state ||
                                contractLedgerForm.htContract.createFrom == '0'
                            "
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
                            :disabled="
                              state ||
                                contractLedgerForm.htContract.createFrom == '0'
                            "
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="交易中心注册编码:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract
                                .customerTradeCenterRegistCode
                            "
                            :disabled="
                              state ||
                                contractLedgerForm.htContract.createFrom == '0'
                            "
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="地址:">
                          <el-input
                            v-model="contractLedgerForm.htContract.customerAddr"
                            :disabled="
                              state ||
                                contractLedgerForm.htContract.createFrom == '0'
                            "
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="法人:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract.customerLegalPerson
                            "
                            :disabled="
                              state ||
                                contractLedgerForm.htContract.createFrom == '0'
                            "
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="开户行:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract.customerDepositBank
                            "
                            :disabled="
                              state ||
                                contractLedgerForm.htContract.createFrom == '0'
                            "
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="开户名:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract.customerAccountName
                            "
                            :disabled="
                              state ||
                                contractLedgerForm.htContract.createFrom == '0'
                            "
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="银行账号:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract
                                .customerDepositBankAccount
                            "
                            :disabled="
                              state ||
                                contractLedgerForm.htContract.createFrom == '0'
                            "
                          ></el-input>
                        </el-form-item>
                        <!--  2019-11-15 #2648 滕超 甲方增加字段 start-->
                        <el-form-item label="登记机关:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract
                                .customerRegisteredAddress
                            "
                            :disabled="
                              state ||
                                contractLedgerForm.htContract.createFrom == '0'
                            "
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="企业性质:">
                          <el-input
                            v-model="contractLedgerForm.htContract.customerQyxz"
                            :disabled="
                              state ||
                                contractLedgerForm.htContract.createFrom == '0'
                            "
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="联系人:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract.customerContacts
                            "
                            :disabled="
                              state ||
                                contractLedgerForm.htContract.createFrom == '0'
                            "
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="电话:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract.customerMobilePhone
                            "
                            :disabled="
                              state ||
                                contractLedgerForm.htContract.createFrom == '0'
                            "
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="邮编:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract.customerPostCode
                            "
                            :disabled="
                              state ||
                                contractLedgerForm.htContract.createFrom == '0'
                            "
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="传真:">
                          <el-input
                            v-model="contractLedgerForm.htContract.customerFax"
                            :disabled="
                              state ||
                                contractLedgerForm.htContract.createFrom == '0'
                            "
                          ></el-input>
                        </el-form-item>
                        <!--#3235 增加所在园区字段 start frj 2019-12-23 16:13:18  -->
                        <el-form-item label="所在园区:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract
                                .customerIndustrialPark
                            "
                            :disabled="
                              state ||
                                contractLedgerForm.htContract.createFrom == '0'
                            "
                          ></el-input>
                        </el-form-item>
                        <!--#3235 增加所在园区字段 end frj 2019-12-23 16:13:18  -->
                        <!-- #3225 wangc 20191222 新增字段 通讯地址 用电规模 start-->
                        <el-form-item label="通讯地址:">
                          <el-input
                            v-model="
                              contractLedgerForm.htContract.contactAddress
                            "
                            :disabled="
                              state ||
                                contractLedgerForm.htContract.createFrom == '0'
                            "
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="用电规模:">
                          <el-input
                            v-model="contractLedgerForm.htContract.powerScale"
                            class="ddw1"
                            type="number"
                            step="“0.0001”"
                            @mousewheel.native.prevent
                            :disabled="
                              state ||
                                contractLedgerForm.htContract.createFrom == '0'
                            "
                          ></el-input>
                          <span>{{ unitMap.electricityUnit }}</span>
                        </el-form-item>
                        <!-- #3225 wangc 20191222 新增字段 通讯地址 用电规模 end-->
                        <!--  2019-11-15 #2648 滕超 甲方增加字段 end-->
                        <el-form-item label="交易名称:">
                          <el-input
                            v-model="contractLedgerForm.htContract.tradeName"
                            :disabled="
                              state ||
                                contractLedgerForm.htContract.createFrom == '0'
                            "
                          ></el-input>
                        </el-form-item>
                        <!--  2019-12-2 #2876 滕超 甲方增加字段客户批次 start-->
                        <el-form-item v-if="this.isSX == '0'" label="客户批次">
                          <el-select
                            :disabled="
                              state ||
                                contractLedgerForm.htContract.createFrom == '0'
                            "
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
                            v-model="this.sdTemplateName"
                          ></el-input>
                        </el-form-item>
                        <el-form-item
                          v-if="proceedInfo.LyydAzdl"
                          label="总电量:"
                        >
                          <el-input
                            disabled
                            class="ddw1"
                            type="number"
                            step="“0.0001”"
                            @mousewheel.native.prevent
                            v-model="
                              contractLedgerForm.htContract.totalElectricity
                            "
                          ></el-input>
                          <span>{{ unitMap.electricityUnit }}</span>
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
                            v-model="
                              contractLedgerForm.clausePrice
                                .totalContractElectricityFee
                            "
                          ></el-input>
                          <span>{{ unitMap.amountUnit }}</span>
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
                            v-model="
                              contractLedgerForm.clausePrice.annualWeightedPrice
                            "
                          ></el-input>
                          <span>{{ unitMap.priceUnit }}</span>
                        </el-form-item>
                        <!-- #3227 年度加权电价 end frj 2019-12-23 14:05:24 -->
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
                    </el-row>

                    <!-- 固定价居间商合同类型 -->
                    <div v-if="proceedInfo.gdjjjs">
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
                          ></el-input>
                          <span>{{ unitMap.priceUnit }}</span>
                        </el-form-item>
                      </el-col>
                    </div>
                    <!-- 价差型居间商合同类型的合同 -->
                    <div v-if="proceedInfo.jcxjjs">
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="度电费用:">
                            <el-input
                              :disabled="state"
                              class="ddw1"
                              type="number"
                              step="“0.0001”"
                              @mousewheel.native.prevent
                              v-model="contractLedgerForm.clausePrice.kwhCost"
                            ></el-input>
                            <span>{{ unitMap.priceUnit }}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="限价降幅:">
                            <el-input
                              :disabled="state"
                              class="ddw1"
                              type="number"
                              step="“0.0001”"
                              @mousewheel.native.prevent
                              v-model="
                                contractLedgerForm.clausePrice.fixDeprice
                              "
                            ></el-input>
                            <span>{{ unitMap.priceUnit }}</span>
                          </el-form-item>
                        </el-col>
                      </el-row>
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
                            ></el-input>
                            <span>%</span>
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
                            ></el-input>
                            <span>%</span>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>

                    <!-- 阶梯服务费居间商合同类型的合同 -->
                    <div v-if="proceedInfo.jtfwjjs">
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
                            ></el-input>
                            <span>%</span>
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
                            ></el-input>
                            <span>%</span>
                          </el-form-item>
                        </el-col>

                        <el-col :span="12">
                          <el-form-item label="限价降幅:">
                            <el-input
                              :disabled="state"
                              class="ddw1"
                              type="number"
                              step="“0.0001”"
                              @mousewheel.native.prevent
                              v-model="
                                contractLedgerForm.clausePrice.fixDeprice
                              "
                            ></el-input>
                            <span>{{ unitMap.priceUnit }}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <el-form-item label="阶梯服务费：">
                            <!-- {{contractLedgerForm.clausePrice.servicePrice}} -->
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>

                    <!-- 利润分成居间商合同类型的合同 profit_sharing_method -->
                    <div v-if="proceedInfo.lrfcjjs">
                      <el-form-item
                        label="利润分成方式:"
                        prop="clausePrice.profitSharingMethod"
                      >
                        <el-select
                          v-model="
                            contractLedgerForm.clausePrice.profitSharingMethod
                          "
                          :disabled="state"
                        >
                          <el-option
                            v-for="item in lrfcOptions"
                            :key="item.propCode"
                            :label="item.propName"
                            :value="item.propCode"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <el-row
                        v-if="
                          contractLedgerForm.clausePrice.profitSharingMethod ==
                            'lrfcfs02'
                        "
                      >
                        <el-col :span="12">
                          <el-form-item label="甲方利润分成比例:">
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
                            ></el-input>
                            <span>%</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="乙方利润分成比例:">
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
                            ></el-input>
                            <span>%</span>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>

                    <div
                      class="txt-right unit-info"
                      v-if="
                        proceedInfo.lrfcjjs &&
                          contractLedgerForm.clausePrice.profitSharingMethod ==
                            'lrfcfs01'
                      "
                    >
                      单位：{{ unitMap.electricityUnit }}
                    </div>
                    <div class="txt-right unit-info" v-if="proceedInfo.jtfwjjs">
                      单位：{{
                        unitMap.electricityUnit + '、' + unitMap.priceUnit
                      }}
                    </div>
                    <el-table
                      border
                      :data="contractLedgerForm.mediatorStairServerPriceList"
                      ref="multipleTable"
                      v-if="
                        (proceedInfo.lrfcjjs &&
                          contractLedgerForm.clausePrice.profitSharingMethod ==
                            'lrfcfs01') ||
                          proceedInfo.jtfwjjs
                      "
                    >
                      <el-table-column
                        type="index"
                        align="center"
                        label="序号"
                        width="120"
                      ></el-table-column>

                      <el-table-column
                        align="center"
                        label="电量"
                        min-width="380"
                      >
                        <template slot-scope="scope">
                          <el-input
                            v-model="scope.row.electricityBegin"
                            style="width:45%"
                            disabled
                          ></el-input>
                          ~
                          <el-input
                            v-model="scope.row.electricityEnd"
                            style="width:45%"
                            :disabled="
                              scope.$index + 1 <
                                contractLedgerForm.mediatorStairServerPriceList
                                  .length || state
                            "
                            @change="checkElectricity(scope.row)"
                          ></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        align="center"
                        label="甲方利润分成比例"
                        v-if="proceedInfo.lrfcjjs"
                      >
                        <template slot-scope="scope">
                          <el-input
                            v-model.number="scope.row.fpProportion"
                            type="number"
                            :disabled="state"
                            @change="calTableJF(scope.row)"
                          ></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        align="center"
                        label="乙方利润分成比例"
                        v-if="proceedInfo.lrfcjjs"
                      >
                        <template slot-scope="scope">
                          <el-input
                            v-model.number="scope.row.spProportion"
                            :disabled="state"
                            type="number"
                            @change="calTableYF(scope.row)"
                          ></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        align="center"
                        label="服务费"
                        v-if="proceedInfo.jtfwjjs"
                      >
                        <template slot-scope="scope">
                          <el-input
                            v-model="scope.row.servicePrice"
                            type="number"
                            :disabled="state"
                            @change="CalculationServicePrice()"
                          ></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        align="center"
                        label="操作"
                        width="200"
                        v-if="!state"
                      >
                        <template slot-scope="scope">
                          <el-button
                            v-if="
                              scope.$index + 1 ==
                                contractLedgerForm.mediatorStairServerPriceList
                                  .length &&
                                Number(scope.row.electricityEnd) >
                                  Number(scope.row.electricityBegin)
                            "
                            icon="el-icon-plus"
                            size="small"
                            type="primary"
                            @click="addStairRow"
                          ></el-button>
                          <el-button
                            size="small"
                            type="text"
                            @click="handleStairDelete(scope)"
                            v-if="
                              scope.$index + 1 ==
                                contractLedgerForm.mediatorStairServerPriceList
                                  .length
                            "
                          >
                            删除
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-collapse-item>
                  <!-- 收益方式 end -->
                  <!-- 附加条款  -->
                  <el-collapse-item
                    v-if="proceedInfo.LyydAzdl"
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
                    title="附件-代理客户信息"
                    name="8"
                    style="margin-left:10px"
                  >
                    <div class="txt-right unit-info">
                      单位：{{ unitMap.electricityUnit }}
                    </div>
                    <el-table
                      border
                      :data="contractLedgerForm.mediatorAgencyCustomerList"
                      ref="multipleTable"
                    >
                      <el-table-column
                        type="index"
                        align="center"
                        label="序号"
                        width="120"
                      ></el-table-column>

                      <el-table-column align="center" label="用电企业">
                        <template slot-scope="scope">
                          <el-select
                            :disabled="state"
                            style="width:100%;"
                            v-model="scope.row.customerName"
                            @change="changeCustomerName($event, scope.row)"
                            :remote-method="selectCustomerName"
                            filterable
                            remote
                          >
                            <el-option
                              v-for="item in orgFilterData"
                              :key="item.id"
                              :label="item.customerName"
                              :value="item.customerId"
                            ></el-option>
                          </el-select>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="行业">
                        <template slot-scope="scope">
                          <el-input
                            v-model="scope.row.industryName"
                            disabled
                          ></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="年用电量">
                        <template slot-scope="scope">
                          <el-input
                            v-model="scope.row.powerScale"
                            disabled
                          ></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        align="center"
                        label="操作"
                        width="200"
                        v-if="!state"
                      >
                        <template slot-scope="scope">
                          <el-button
                            v-if="
                              scope.$index + 1 ==
                                contractLedgerForm.mediatorAgencyCustomerList
                                  .length
                            "
                            icon="el-icon-plus"
                            size="small"
                            type="primary"
                            @click="addRow"
                          ></el-button>
                          <el-button
                            size="small"
                            type="text"
                            @click="handleDelete(scope)"
                            >删除</el-button
                          >
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
          v-if="htElectricityPackageManager_btn_amendant && displayStatus == 3"
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
          v-if="displayStatus === '11' || (!state && submitState == true)"
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
          >关闭</el-button
        >
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
  updateStatus,
  confirm,
  reject,
  toCustomerConfirmation,
  getHtRecords,
  getDimsByParentCodeAndValue,
  getAlreadyPage,
  selectByMediatorId,
  selectByMediatorIdAndCustomerName,
} from '@common/api/contractManage/contractLedger/index';
import { getToken } from '@common/utils/auth';
import {
  getcustomerId,
  getAllocatedCustomerListByName,
  getCustomerContactsByOrgId,
} from '@common/api/contractManage/contractLedger/index';
import { getDlsbIsGD } from '@common/api/business/jyEleDeclareManage/index';
import { selectProvince } from '@common/api/customer/tMdataCustomer/';
import { parseTime, getUnitMap, initDialogHeight } from '@common/utils/index';
import { mapGetters } from 'vuex';
import {
  getSelectList,
  downloadOneFile,
  downloadOneFileUs1,
} from '@common/api/base';
import amendantRecord from '@common/components//amendantRecord';
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
      contractLedgerForm: {
        additionalClause: {
          additionalClauseId: '',
          additionalClauseText: '', //附加条款内容
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
          secondPartProportion: '', //乙方分成比例
          priceId: '',
          yearBilateElectric: '', //年度双边电量
          yearLongtermElectric: '', //年度长协电量
          fixDeprice: '', //固定降价/电价
          benchmarkElectricityPrice: '', //标杆电价
          totalContractElectricityFee: '', //合同总价
          annualWeightedPrice: '', //年度加权电价
          monthBidElectric: '', //月度竞价电量
          bottomElectricPrice: '', //、保底降价/电价
          customerProportion: '', //、甲方分成比例
          // totalElectricity:"",//、总电量
          kwhCost: '', //、用电费用
          proportion: '', //、甲方分成比例
          yearBidElectric: '', //年度竞价
          otherwiseAgree: '', //收益方式另有约定
          profitSharingMethod: '', //利润分成方式:
          // servicePrice:"",        //阶梯服务费
        },
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
          spProvinceCode: '', //所属地市code
          spAreaCode: '', //所属县区code
          spAreaName: '', //所属县区code
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
          relationId: '',
          spFax: '', //乙方传真
          contractTypeCode: 'htlx05', //合同类型
          contractSigningType: '', //签约类型
          contractHandoverSheet: '', //是否有合同交接单
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
          totalVoltageLevelCode: '', //合计-电压等级
          customerConfirmStatus: '', //合同确认状态
          customerConfirmStatusName: '', //合同确认状态
          rejectReason: '', // 驳回原因
          createFrom: '0', // 合同创建来源1,外网，0内网
        },
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
        mediatorAgencyCustomerList: [],
        mediatorStairServerPriceList: [],
      },
      contractLedgerFormRules: {
        'clauseAssessment.negDevRatio': [
          { validator: validNegative, trigger: 'blur' },
        ],
        /** 2019年11月4日09:40:11 #2463 李志佳 允许负偏差比例优化 start */
        // "clauseAssessment.allowNegDevRatio": [
        //   { validator: validNegative, trigger: "blur" }
        // ],
        /** 2019年11月4日09:40:11 #2463  李志佳 允许负偏差比例优化 end */
        'htContract.isRelate': [
          {
            required: true,
            message: '请选择关联交易',
            trigger: 'blur',
          },
        ],
        'htContract.secondPartCode': [
          {
            required: true,
            message: '请输入乙方名称',
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
        'clausePrice.profitSharingMethod': [
          {
            required: true,
            message: '请输入利润分成方式',
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
        'clausePrice.totalContractElectricityFee': [
          {
            required: true,
            message: '请输入合同总价',
            trigger: 'blur',
          },
        ],
        'clausePrice.annualWeightedPrice': [
          {
            required: true,
            message: '请输入年度加权电价',
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

      orgFilterData: [], //模糊查询选项
      lrfcOptions: [], //利润分成
      addShow: true,
      checkState: '', //查看还是编辑权限状态
      province: 'province', //省市需要id
      provinceOptions: [], //省
      areaOptionsKh: [], //市
      provinceOptionsSp: [], //省
      areaOptionsKhSp: [], //市
      dialogHeight: 0, //弹窗高度
      htElectricityPackageManager_btn_amendant: false, //修改记录按钮
      zlist: [],
      ztotal: 0,
      batchList: [], //客户批次
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
      spState: false,
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
        yearBilateElectric: false, //年度双边电量
        fixDeprice: false, //固定降价/电价
        monthBidElectric: false, //月度竞价电量
        bottomElectricPrice: false, //、保底降价/电价
        customerProportion: false, //、甲方分成比例
        totalElectricity: false, //、总电量
        kwhCost: false, //、用电费用
        yearBidElectric: false,
        bgdj: false, //标杆电价
        ndjqdj: false, //年度加权电价
        LyydAzdl: true,
        htzj: false, //合同总价
        gdjj: false,
        jjcf: false,
        jjbdfc: false,
        fwf: false,
        hezj: true,
        fwhthfc: false, //服务合同含分成分解,
        gdjjjs: false,
        jcxjjs: false, //
        jtfwjjs: false,
        lrfcjjs: false,
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
      state: true,
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
        relationId: '',
      },
      secondPartyInfo: {
        secondPartCode: '', //乙方id
        secondPartName: '', //乙方name
        spProvince: '', //所属地市
        spProvinceCode: '', //所属地市code
        spAreaCode: '', //所属县区code
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
      //表单校验

      approvalOpinionRemnant: 0,
      approvalOpinion: '',
      flag: '',
      innerVisible: false,
      isCustomerConfirmStatus: false,
      optionsA: [],
      optionsB: [],
      bjfs: [],
      isFwht: false,
    };
  },
  created() {
    this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
    this.uplaodHeaders = {
      Authorization: getToken(),
      ModelCode: sessionStorage.getItem('modelCode'),
    };
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
    this.getselectYorN();
    getSelectList('profit_sharing_method').then((res) => {
      this.lrfcOptions = res;
    });
    this.getbjfs();
  },
  computed: {
    ...mapGetters(['elements', 'allSubMenus', 'orgId', 'sysOrg']),
  },
  mounted() {},
  methods: {
    initDialog(dataInfo, dialogInfo) {
      this.getFawuIs();
      console.log('新增：', dataInfo, dialogInfo);
      this.getSelectProvince();
      this.getFirstPartyInfo(dataInfo.customerName);

      // 保存时显示保存按钮
      this.submitState = dialogInfo.submitState;
      this.checkFlag = false;
      this.btn_save = false;
      this.btn_submit = false;

      // if (this.$refs.uploadFileAdd !== undefined) {
      //   this.$refs.uploadFileAdd.clearFiles();
      // }

      if (this.$refs.contractForm !== undefined) {
        this.$refs.contractForm.resetFields();
      }

      this.reInitFormData();
      this.getSelectProvince(); //省市初始化
      this.getbatchList(); //客户批次
      this.setProceedInfo(dialogInfo.saleContractType, dialogInfo.state);
      this.$set(
        this.contractLedgerForm['htContract'],
        'contractCode',
        dataInfo.contractCode
      );
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

      let cols = [
        'provinceCode',
        'areaCode',
        'tradingCenterRegistCode',
        'socialCreditCode',
        'addr',
        'legalPerson',
        'accountName',
        'depositBank',
        'depositBankAccount',
        'registeredAddress',
        'attributeTypeName',
        'attributeTypeCode',
        'contacts',
        'mobilePhone',
        'postCode',
        'fax',
      ];

      let customerCols = _.map(cols, (v) => _.upperFirst(v));

      customerCols.forEach((k, i) => {
        this.contractLedgerForm.htContract[`customer${k}`] =
          dataInfo.customerInfo[cols[i]];
      });

      this.contractLedgerForm.htContract = {
        ...this.contractLedgerForm.htContract,
        templateId: dataInfo.templateId,
        customerName: dataInfo.customerName,
        customerCode: dataInfo.customerCode,
        orgId: dataInfo.customerCode,
        contractPriceWay: '',
        contractTypeCode: 'htlx05',
        createFrom: '0',
        customerConfirmStatus: '',
        enclosure: '',
        isVirtual: this.isVirtual,
      };

      this.dataStatus = '';
      this.dialogTitle = dialogInfo.sdTemplateName;
      this.sdTemplateName = dialogInfo.sdTemplateName;
      this.flagOption = dialogInfo.flagOption;
      this.file_rode = dialogInfo.file_rode;

      this.contractLedgerForm.mediatorStairServerPriceList = [];
      this.contractLedgerForm.mediatorAgencyCustomerList = [];

      console.log('rrr:', this.contractLedgerForm.htContract);

      // this.contractLedgerForm.htContract = {
      //   ...this.contractLedgerForm.htContract,
      //   ...dataInfo
      // }

      this.addRow();
      this.addStairRow();
      this.getDlsbIsSX(); //判断客户批次是否山西
      // this.initUpload(this.contractLedgerForm.htContract.enclosure);
      this.showContractPriceWay(dialogInfo, dialogInfo.state);
      this.addDialogVisible = true;
    },
    initEditDialog(dataInfo, dialogInfo) {
      this.hasStopReason = _.has(dataInfo.htContract, 'contractEndReason');

      this.getFawuIs();
      console.log('编辑xx：', dataInfo, dialogInfo);
      this.secondPartyList = [
        {
          customerId: dataInfo.htContract.secondPartCode,
          customerName: dataInfo.htContract.secondPartName,
        },
      ];
      // 查看还是编辑时的状态
      this.$set(this.contractLedgerForm['htContract'], 'contractPriceWay', '');
      this.checkState = dialogInfo.state;
      this.displayStatus = dataInfo.htContract.dataStatus;
      this.originalId = dataInfo.htContract.contractId;
      // 编辑
      this.submitState = dialogInfo.submitState;
      this.checkFlag = false;
      this.btn_save = false;
      this.btn_submit = false;
      // if (this.$refs.uploadFileAdd !== undefined) {
      //   this.$refs.uploadFileAdd.clearFiles();
      // }
      this.reInitFormData();
      this.state = dialogInfo.state;
      // this.spState = dialogInfo.state;

      this.electricityTradeState = dialogInfo.state;
      this.flagOption = dialogInfo.flagOption;
      this.getSelectProvince(); //省市初始化
      this.getbatchList(); //客户批次

      // todo wsc 返回赋值
      _.keys(dataInfo).forEach((v) => {
        if (
          v !== 'templatePowerList' &&
          v != 'mediatorAgencyCustomerList' &&
          v != 'mediatorStairServerPriceList'
        ) {
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
          if (v === 'templatePowerList') {
            this.contractLedgerForm.templatePowerList =
              dataInfo.templatePowerList;
          } else if (v === 'mediatorAgencyCustomerList') {
            this.contractLedgerForm.mediatorAgencyCustomerList =
              dataInfo.mediatorAgencyCustomerList;
          } else if (v === 'mediatorStairServerPriceList') {
            this.contractLedgerForm.mediatorStairServerPriceList =
              dataInfo.mediatorStairServerPriceList;
          }
        }
      });
      // todo 填充乙方列表，显示出乙方名称

      this.getSecondPartyInfo(
        this.contractLedgerForm.htContract.secondPartName
      );
      this.changeprovinceKh(dataInfo.htContract.customerProvinceCode); //x县级显示
      this.changeprovinceKhSp(dataInfo.htContract.spProvinceCode);

      if (this.contractLedgerForm.mediatorAgencyCustomerList.length == 0) {
        this.addRow();
      }
      if (this.contractLedgerForm.mediatorStairServerPriceList.length == 0) {
        this.addStairRow();
      }
      this.checkTime();

      this.dialogTitle = dialogInfo.sdTemplateName;
      this.sdTemplateName = dialogInfo.sdTemplateName;
      this.contractId = dataInfo.htContract.contractId;

      this.setProceedInfo(dialogInfo.saleContractType, dialogInfo.state);
      if (typeof this.contractLedgerForm.htContract.enclosure == 'undefined') {
        this.contractLedgerForm.htContract.enclosure = '';
      }
      this.contractLedgerForm.htContract.isVirtual =
        dataInfo.htContract.isVirtual;
      this.contractLedgerForm.htContract.customerId =
        dataInfo.htContract.customerCode;

      // console.log(dataInfo, dialogInfo);
      this.showContractPriceWay(dialogInfo, dialogInfo.state);
      this.getDlsbIsSX(); //判断客户批次是否山西
      // this.initUpload(dataInfo.htContract.enclosure);
      this.addDialogVisible = true;
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
    //初始化表单
    initFormData() {
      for (let i = 0; i < 12; i++) {
        this.$set(
          this.contractLedgerForm['clausePlan'],
          this.months[i] + 'YearBilateElectric',
          ''
        );
        this.$set(
          this.contractLedgerForm['clausePlan'],
          this.months[i] + 'YearBilateElecPrice',
          ''
        );
        this.$set(
          this.contractLedgerForm['clausePlan'],
          this.months[i] + 'ElectricityTrade',
          ''
        );
        this.$set(
          this.contractLedgerForm['clausePlan'],
          this.months[i] + 'ElectricityPrice',
          ''
        );
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
    //模糊查询代理客户信息
    selectCustomerName(val) {
      let parame = {
        customerName: val,
        mediatorId: this.contractLedgerForm.htContract.relationId,
        endDate: this.contractLedgerForm.htContract.endDate,
        beginDate: this.contractLedgerForm.htContract.beginDate,
      };
      selectByMediatorIdAndCustomerName(parame).then((res) => {
        this.orgFilterData = res.data;
      });
    },
    changeCustomerName(val, row) {
      let data = this.orgFilterData.filter((res) => {
        return val == res.customerId;
      });
      row.industryName = data[0].industry;
      row.industryCode = data[0].industryCode;
      row.customerName = data[0].customerName;
      row.customerId = data[0].customerId;
      row.powerScale = data[0].powerScale;
    },
    //获取甲方联系人信息
    getCustomerContacts(id) {
      let parame = {};
      parame.customerId = id;
      getCustomerContactsByOrgId(parame).then((res) => {
        // #2648 增加res.data不为undefind判断
        if (res.data != undefined) {
          this.contractLedgerForm.htContract.customerContacts =
            res.data.contacts; //甲方联系人
          this.contractLedgerForm.htContract.customerMobilePhone =
            res.data.mobilePhone; //甲方电话
          this.contractLedgerForm.htContract.contactAddress =
            res.data.contactAddress; //甲方地址
        }
      });
    },
    //2019-12-02 #2900 秦侯珍 获取签约类型数据
    getcontractType() {
      getSelectList('contract_signing_type').then((res) => {
        this.optionsA = res;
      });
    },
    getselectYorN() {
      getSelectList('selectYorN').then((res) => {
        this.optionsB = res;
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
      let fwfState = true;
      let isTradeSum = true;
      this.isCustomerConfirmStatus = false;
      let totalElectricity = Number(
        this.contractLedgerForm.htContract.totalElectricity
      ).toFixed(4);

      if (
        this.proceedInfo.monthBidElectric &&
        this.proceedInfo.yearBilateElectric
      ) {
        for (let i = 0; i < 12; i++) {
          electricityTrade += Number(
            this.contractLedgerForm.clausePlan[
              this.months[i] + 'ElectricityTrade'
            ]
          );
          yearBilateElectric += Number(
            this.contractLedgerForm.clausePlan[
              this.months[i] + 'YearBilateElectric'
            ]
          );
        }
        yearBilateElectric = yearBilateElectric.toFixed(4);
        electricityTrade = electricityTrade.toFixed(4);
        // 相加保留4位小数 #3187 frj 2019-12-18 18:15:45
        let _total = (
          Number(electricityTrade) + Number(yearBilateElectric)
        ).toFixed(4);
        if (totalElectricity > _total || totalElectricity < _total) {
          isElectricityTradeSum = false;
          isYearBilateElectricSum = false;
        }
      } else {
        if (
          this.proceedInfo.monthBidElectric &&
          this.proceedInfo.yearLongtermElectric
        ) {
          for (let i = 0; i < 12; i++) {
            electricityTrade += Number(
              this.contractLedgerForm.clausePlan[
                this.months[i] + 'ElectricityTrade'
              ]
            );
            yearBilateElectric += Number(
              this.contractLedgerForm.clausePlan[
                this.months[i] + 'YearLongtermElectric'
              ]
            );
          }
          yearBilateElectric = yearBilateElectric.toFixed(4);
          electricityTrade = electricityTrade.toFixed(4);
          // 相加保留4位小数 #3187 frj 2019-12-18 18:15:45
          let _total = (
            Number(electricityTrade) + Number(yearBilateElectric)
          ).toFixed(4);

          if (totalElectricity > _total || totalElectricity < _total) {
            isElectricityTradeSum = false;
            isYearBilateElectricSum = false;
          }
        } else if (
          this.proceedInfo.yearBilateElectric &&
          !this.proceedInfo.monthBidElectric
        ) {
          for (let i = 0; i < 12; i++) {
            yearBilateElectric += Number(
              this.contractLedgerForm.clausePlan[
                this.months[i] + 'YearBilateElectric'
              ]
            );
          }
          yearBilateElectric = yearBilateElectric.toFixed(4);
          if (
            totalElectricity > yearBilateElectric ||
            totalElectricity < yearBilateElectric
          ) {
            isYearBilateElectricSum = false;
          }
        } else if (
          this.proceedInfo.monthBidElectric &&
          !this.proceedInfo.yearBilateElectric
        ) {
          for (let i = 0; i < 12; i++) {
            electricityTrade += Number(
              this.contractLedgerForm.clausePlan[
                this.months[i] + 'ElectricityTrade'
              ]
            );
          }
          electricityTrade = electricityTrade.toFixed(4);

          if (
            totalElectricity > electricityTrade ||
            totalElectricity < electricityTrade
          ) {
            isElectricityTradeSum = false;
          }
        }
      }
      // console.log(totalElectricity+"==electricityTrade"+electricityTrade+"==yearBilateElectric"+yearBilateElectric);
      /*当分解电量为空时，验证通过，不为空验证 tengc  2019年12月04日 start */
      let dataList = {};
      dataList = {
        aprElectricityTrade: this.contractLedgerForm.clausePlan
          .aprElectricityTrade,
        aprYearBilateElectric: this.contractLedgerForm.clausePlan
          .aprYearBilateElectric,
        aprYearLongtermElectric: this.contractLedgerForm.clausePlan
          .aprYearLongtermElectric,
        augElectricityTrade: this.contractLedgerForm.clausePlan
          .augElectricityTrade,
        augYearBilateElectric: this.contractLedgerForm.clausePlan
          .augYearBilateElectric,
        augYearLongtermElectric: this.contractLedgerForm.clausePlan
          .augYearLongtermElectric,
        decElectricityTrade: this.contractLedgerForm.clausePlan
          .decElectricityTrade,
        decYearBilateElectric: this.contractLedgerForm.clausePlan
          .decYearBilateElectric,
        decYearLongtermElectric: this.contractLedgerForm.clausePlan
          .decYearLongtermElectric,
        febElectricityTrade: this.contractLedgerForm.clausePlan
          .febElectricityTrade,
        febYearBilateElectric: this.contractLedgerForm.clausePlan
          .febYearBilateElectric,
        febYearLongtermElectric: this.contractLedgerForm.clausePlan
          .febYearLongtermElectric,
        janElectricityTrade: this.contractLedgerForm.clausePlan
          .janElectricityTrade,
        janYearBilateElectric: this.contractLedgerForm.clausePlan
          .janYearBilateElectric,
        janYearLongtermElectric: this.contractLedgerForm.clausePlan
          .janYearLongtermElectric,
        julElectricityTrade: this.contractLedgerForm.clausePlan
          .julElectricityTrade,
        julYearBilateElectric: this.contractLedgerForm.clausePlan
          .julYearBilateElectric,
        julYearLongtermElectric: this.contractLedgerForm.clausePlan
          .julYearLongtermElectric,
        junElectricityTrade: this.contractLedgerForm.clausePlan
          .junElectricityTrade,
        junYearBilateElectric: this.contractLedgerForm.clausePlan
          .junYearBilateElectric,
        junYearLongtermElectric: this.contractLedgerForm.clausePlan
          .junYearLongtermElectric,
        marElectricityTrade: this.contractLedgerForm.clausePlan
          .marElectricityTrade,
        marYearBilateElectric: this.contractLedgerForm.clausePlan
          .marYearBilateElectric,
        marYearLongtermElectric: this.contractLedgerForm.clausePlan
          .marYearLongtermElectric,
        mayElectricityTrade: this.contractLedgerForm.clausePlan
          .mayElectricityTrade,
        mayYearBilateElectric: this.contractLedgerForm.clausePlan
          .mayYearBilateElectric,
        mayYearLongtermElectric: this.contractLedgerForm.clausePlan
          .mayYearLongtermElectric,
        novElectricityTrade: this.contractLedgerForm.clausePlan
          .novElectricityTrade,
        novYearBilateElectric: this.contractLedgerForm.clausePlan
          .novYearBilateElectric,
        novYearLongtermElectric: this.contractLedgerForm.clausePlan
          .novYearLongtermElectric,
        octElectricityTrade: this.contractLedgerForm.clausePlan
          .octElectricityTrade,
        octYearBilateElectric: this.contractLedgerForm.clausePlan
          .octYearBilateElectric,
        octYearLongtermElectric: this.contractLedgerForm.clausePlan
          .octYearLongtermElectric,
        sepElectricityTrade: this.contractLedgerForm.clausePlan
          .sepElectricityTrade,
        sepYearBilateElectric: this.contractLedgerForm.clausePlan
          .sepYearBilateElectric,
        sepYearLongtermElectric: this.contractLedgerForm.clausePlan
          .sepYearLongtermElectric,
      };
      // 20191218 wangc #3163 去掉历史无数据字段undefined报错问题
      for (var i in dataList) {
        if (typeof dataList[i] == 'undefined') {
          dataList[i] = '';
        }
      }
      let result = !Object.values(dataList).every((o) => o === '');
      // console.log(result, "result");
      if (result) {
        if (!isYearBilateElectricSum && !isElectricityTradeSum) {
          //长协+竞价让利提示信息  2019年10月21日10:54:58
          if (this.proceedInfo.cxdl) {
            this.$alert(
              '月度竞价分解电量和年度长协电量各月汇总与总电量不同！',
              '消息提示',
              {
                type: 'warning',
                confirmButtonText: '确定',
                callback: (action) => {
                  _this.checkFlag = false;
                },
              }
            );
          } else {
            this.$alert(
              '月度竞价分解电量和年度双边电量各月汇总与总电量不同！',
              '消息提示',
              {
                type: 'warning',
                confirmButtonText: '确定',
                callback: (action) => {
                  _this.checkFlag = false;
                },
              }
            );
          }
        } else if (!isElectricityTradeSum) {
          this.$alert('月度竞价分解电量各月汇总与总电量不同！', '消息提示', {
            type: 'warning',
            confirmButtonText: '确定',
            callback: (action) => {
              _this.checkFlag = false;
            },
          });
        } else if (!isYearBilateElectricSum) {
          this.$alert('年度双边电量各月汇总与总电量不同！', '消息提示', {
            type: 'warning',
            confirmButtonText: '确定',
            callback: (action) => {
              _this.checkFlag = false;
            },
          });
        }

        /* 服务合同增加分解电量验证 2019-10-21 #2337 start */

        let fwfTotal = Number(
          this.contractLedgerForm.clausePrice.yearBidElectric
        ).toFixed(4);
        if (this.proceedInfo.fwf) {
          fwfState = this.checkTotal(fwfTotal, 'ElectricityTrade');
        }
        if (!fwfState) {
          this.$alert('月度竞价分解电量各月汇总与总电量不同！', '消息提示', {
            type: 'warning',
            confirmButtonText: '确定',
            callback: (action) => {
              _this.checkFlag = false;
            },
          });
        }
        /* 服务合同增加分解电量验证 2019-10-21 end */
      } else {
        isYearBilateElectricSum = true;
        isElectricityTradeSum = true;
        fwfState = true;
      }
      /*当分解电量为空时，验证通过，不为空验证 tengc  2019年12月04日 end */

      if (isYearBilateElectricSum && isElectricityTradeSum && fwfState) {
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
    calculatePercentageYF() {
      let data = 100 - this.contractLedgerForm.clausePrice.secondPartProportion;
      this.contractLedgerForm.clausePrice.customerProportion = data;
    },
    calculatePercentageJF() {
      let data = 100 - this.contractLedgerForm.clausePrice.customerProportion;
      this.contractLedgerForm.clausePrice.secondPartProportion = data;
    },
    calTableJF(row) {
      console.log(row.fpProportion);
      let data = 100 - row.fpProportion;
      row.spProportion = data;
    },
    calTableYF(row) {
      let data = 100 - row.spProportion;
      row.fpProportion = data;
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
      if (parame.clauseAssessment.negDevRatio != '') {
        parame.clauseAssessment.negDevRatio =
          0 - Math.abs(parame.clauseAssessment.negDevRatio);
      }
      let isNoCustomerConfirm = true;

      // todo wsc 2020-10-29 混入法务系统必填字段
      parame.htContract = {
        ...parame.htContract,
        ...this.contractLedgerForm.legal,
      };

      if (
        this.contractLedgerForm.htContract.customerConfirmStatus == '' ||
        this.contractLedgerForm.htContract.customerConfirmStatus == '5' ||
        this.contractLedgerForm.htContract.customerConfirmStatus == '7'
      ) {
        isNoCustomerConfirm = true;
        // this.$confirm("此合同客户未确认, 是否继续?", "提示", {
        //   confirmButtonText: "确定",
        //   cancelButtonText: "取消",
        //   type: "warning"
        // }).then(() => {
        //   isNoCustomerConfirm = false;
        // });
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
          // if (this.contractLedgerForm.htContract.customerConfirmStatus == "") {
          //   this.$confirm("此合同是否提交客户未确认?", "提示", {
          //        confirmButtonText: "是",
          // cancelButtonText: "否"
          //   })
          //     .then(({ value }) => {
          //       this.formLoading = true;
          //       parame.htContract.customerConfirmStatus = "5";
          //       this.editSaveObj(parame);
          //     })
          //     .catch(() => {
          //       this.formLoading = true;
          //       this.editSaveObj(parame);
          //     });
          // } else {
          //   this.formLoading = true;

          // }
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
          this.formLoading = false;
          if (res.rel) {
            //2019-11-13 #2595 滕超 延时调用查询防止页面审核状态不变
            setTimeout(() => {
              this.$notify({
                title: '提交成功!',
                message: '提交成功!',
                type: 'success',
                duration: 2000,
              });
              this.$emit('initList');
              this.checkFlag = false;
              this.btn_save = false;
              this.btn_submit = false;
              this.addDialogVisible = false;
            }, 1000);
          } else {
            this.checkFlag = false;
            this.btn_save = false;
            this.btn_submit = false;
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
            //2019-11-13 #2595 滕超 延时调用查询防止页面审核状态不变
            setTimeout(() => {
              this.$notify({
                title: res.msg,
                message: res.msg,
                type: 'success',
                duration: 2000,
              });
              this.$emit('initList');
              this.checkFlag = false;
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
      parame.mediatorAgencyCustomerList = [];
      parame.mediatorStairServerPriceList = [];
      // parame.templatePowerList = this.contractLedgerForm.templatePowerList;   李志佳
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

      parame.mediatorAgencyCustomerList = this.contractLedgerForm.mediatorAgencyCustomerList;
      parame.mediatorStairServerPriceList = this.contractLedgerForm.mediatorStairServerPriceList;

      // todo wsc 2020-10-29 混入法务系统必填字段
      parame.htContract = {
        ...parame.htContract,
        ...this.contractLedgerForm.legal,
      };

      //新增
      parame.htContract.createFrom = '0';
      // parame.htContract.dataStatus = "11";
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
                this.formLoading = false;
                this.btn_save = false;
                this.btn_submit = false;
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
      this.contractLedgerForm.htContract.contractTypeCode = 'htlx05';
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
    //-模糊查询乙方信息 todo 优先使用这里的
    getFirstPartyInfo(query) {
      this.firstPartyList = [];
      if (query !== '') {
        this.loading = true;
        let parme = {
          name: query,
          // 居间商
          cusType: 'khlb8',
        };
        getcustomerId(parme).then((res) => {
          this.loading = false;
          this.firstPartyList = res;
        });
      }
    },
    //-模糊查询甲方信息
    getSecondPartyInfo(query) {
      this.secondPartyList = [];

      let cusType = 'khlb1';
      if (query !== '') {
        this.loading = true;
        let parme = {
          cusType: cusType,
          custName: query,
        };
        getAllocatedCustomerListByName(parme).then((res) => {
          this.loading = false;
          this.secondPartyList = res.data.customerInfo;
        });
      } else {
        this.secondPartyList = [];
      }
    },

    //弹框关闭执行方法
    handleClose() {
      //清空表单 #3131 20191213 阿彪 由于element的表单resetFields方法报错，所以自己手动清空
      this.contractLedgerForm = this.resetFields(this.contractLedgerForm);
      this.addDialogVisible = false;
    },

    setProceedInfo(sdTemplateName, state) {
      this.state = state;
      for (let key in this.proceedInfo) {
        this.proceedInfo[key] = false;
      }
      if (sdTemplateName == 'sdhtlx14') {
        this.proceedInfo.gdjjjs = true;
      } else if (sdTemplateName == 'sdhtlx18') {
        this.proceedInfo.jcxjjs = true;
      } else if (sdTemplateName == 'sdhtlx19') {
        this.proceedInfo.jtfwjjs = true;
      } else if (sdTemplateName == 'sdhtlx20') {
        this.proceedInfo.lrfcjjs = true;
      }

      if (!state) {
        if (this.proceedInfo.yearBidElectric) {
          this.yearBilateElectricState = true;
          this.electricityTradeState = false;
        } else if (this.proceedInfo.yearLongtermElectric) {
          this.yearBilateElectricState = false;
        } else {
          this.yearBilateElectricState =
            this.proceedInfo.yearBilateElectric ||
            this.proceedInfo.yearBidElectric
              ? false
              : true;
          this.electricityTradeState = this.proceedInfo.monthBidElectric
            ? false
            : true;
        }
      } else {
        this.yearBilateElectricState = state;
        this.electricityTradeState = state;
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

    //获取报价方式
    getbjfs() {
      getSelectList('Quotation_method').then((res) => {
        this.bjfs = res;
      });
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
        this.provinceOptionsSp = res;
      });
    },

    changeprovinceKh(val) {
      this.contractLedgerForm.htContract.customerProvinceCode = val;
      this.province = val;
      this.areaOptionsKh = [];
      if (this.submitState !== 'edit') {
        this.contractLedgerForm.htContract.customerAreaCode = '';
      }

      selectProvince(this.province).then((res) => {
        this.areaOptionsKh = res;
      });
    },

    changeprovinceKhSp(val) {
      // provinceOptionsSp
      this.contractLedgerForm.htContract.spProvinceCode = val;
      this.areaOptionsKhSp = [];

      if (this.submitState !== 'edit') {
        this.contractLedgerForm.htContract.spAreaCode = '';
      }

      console.log('spcode:', val);
      selectProvince(val).then((res) => {
        console.log('spcodeList:', res);
        this.areaOptionsKhSp = res;
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

    //添加表格行
    addRow() {
      let Row = {
        customerName: '',
        customerId: '',
        industryCode: '',
        industryName: '',
        powerScale: '',
      };
      this.contractLedgerForm.mediatorAgencyCustomerList.push(Row);
    },
    addStairRow() {
      let Row = {};
      if (this.contractLedgerForm.mediatorStairServerPriceList.length == 0) {
        Row = {
          electricityBegin: 0,
          electricityEnd: '',
          fpProportion: '',
          spProportion: '',
          servicePrice: '',
        };
      } else {
        Row = {
          electricityBegin: this.contractLedgerForm
            .mediatorStairServerPriceList[
            this.contractLedgerForm.mediatorStairServerPriceList.length - 1
          ].electricityEnd,
          electricityEnd: '',
          fpProportion: '',
          spProportion: '',
          servicePrice: '',
        };
      }
      this.contractLedgerForm.mediatorStairServerPriceList.push(Row);
    },
    //删除行信息
    handleDelete(row) {
      //2020-1-10 #3571 zhangp  限制删除时最后一条数据只进行清空
      if (
        row.$index == 0 &&
        this.contractLedgerForm.mediatorAgencyCustomerList.length == 1
      ) {
        this.contractLedgerForm.mediatorAgencyCustomerList = [
          {
            customerName: '',
            customerId: '',
            industryCode: '',
            industryname: '',
            powerScale: '',
          },
        ];
      } else {
        this.contractLedgerForm.mediatorAgencyCustomerList.splice(
          row.$index,
          1
        );
      }
    },
    handleStairDelete(row) {
      if (row.$index == 0) {
        this.contractLedgerForm.mediatorStairServerPriceList = [
          {
            electricityBegin: 0,
            electricityEnd: '',
            fpProportion: '',
            spProportion: '',
            servicePrice: '',
          },
        ];
      } else {
        this.contractLedgerForm.mediatorStairServerPriceList.splice(
          row.$index,
          1
        );
      }
      this.CalculationServicePrice();
    },
    CalculationServicePrice() {
      // let CSArray = this.contractLedgerForm.mediatorStairServerPriceList.map(res => {
      //   return Number(res.servicePrice);
      // });
      // console.log(CSArray);
      // this.contractLedgerForm.clausePrice.servicePrice  = CSArray.reduce((prev, next, index, array) => prev + next);
    },
    checkElectricity(row) {
      if (Number(row.electricityBegin) > Number(row.electricityEnd)) {
        row.electricityEnd = '';
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
