<template>
  <div class="app-container calendar-list-container">
    <el-form :model="form" ref="form" label-width="130px">
      <el-row>
        <el-form-item label="客户名称" prop="customerName">
          <el-input v-model="form.customerName" :disabled="isDisabled"></el-input>
        </el-form-item>
        <el-col :span="12">
          <el-form-item label="社会信用代码" prop="socialCreditCode">
            <el-input v-model="form.socialCreditCode" :disabled="isDisabled"></el-input>
          </el-form-item>

          <el-form-item class label="客户分类" prop="customerTypeCode">
            <el-select v-model="form['customerTypeCode']" :disabled="isDisabled">
              <el-option
                v-for="(item,index)  in khlbOptions"
                :key="index"
                :label="item.propName"
                :value="item.propCode"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item class label="企业性质" prop="qyxz">
            <el-select v-model="form['qyxz']" :disabled="isDisabled">
              <el-option
                v-for="(item,index)  in qyxz"
                :key="index"
                :label="item.propName"
                :value="item.propCode"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所属行业" prop="industryName">
            <el-input v-model="form.industryName" :disabled="isDisabled"></el-input>
            <!-- <el-select v-model="form['industryCode']" :disabled="isDisabled">
              <el-option
                v-for="(item,index)  in industryOptions"
                :key="index"
                :label="item.propName"
                :value="item.propCode"
              ></el-option>
            </el-select>-->
          </el-form-item>
          <el-form-item label="所属省市" prop="provinceCode">
            <el-select class="four-col left" v-model="form['provinceCode']" :disabled="isDisabled">
              <el-option
                v-for="(item,index)  in provinceOptions"
                :key="index"
                :label="item.propName"
                :value="item.propCode"
              ></el-option>
            </el-select>
            <el-select class="four-col left" v-model="form['areaCode']" :disabled="isDisabled">
              <el-option
                v-for="(item,index)  in areaOptions"
                :key="index"
                :label="item.propName"
                :value="item.propCode"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- <el-form-item label="客户名称" prop="customerName">
            <el-input v-model="form.customerName" :disabled="isDisabled"></el-input>
          </el-form-item>-->

          <el-form-item label="客户简称" prop="customerSname">
            <el-input v-model="form.customerSname" :disabled="isDisabled"></el-input>
            <!-- <el-select v-model="form['signingStateCode']" :disabled="isDisabled">
                <el-option v-for="(item,index)  in qyztOptions" :key="index"  :label="item.propName" :value="item.propCode" >
                </el-option>
            </el-select>-->
          </el-form-item>
          <el-form-item label="是否内部客户">
            <template>
              <el-radio :disabled="isDisabled" :label="1" v-model="form.isInternal">是</el-radio>
              <el-radio :disabled="isDisabled" :label="0" v-model="form.isInternal">否</el-radio>
            </template>
          </el-form-item>
          <el-form-item class label="企业规模" prop="qygm">
            <el-select v-model="form['qygm']" :disabled="isDisabled">
              <el-option
                v-for="(item,index)  in qygm"
                :key="index"
                :label="item.propName"
                :value="item.propCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户等级">
            <el-select v-model="form['customerLevel']" :disabled="isDisabled">
              <el-option
                v-for="(item,index)  in levelOptions"
                :key="index"
                :label="item.propName"
                :value="item.propCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所在工业园区" prop="industrialPark">
            <el-input v-model="form.industrialPark" :disabled="isDisabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item class="one-col" label="详细地址" prop="addr">
            <el-input v-model="form.addr" :disabled="isDisabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否有发电背景">
            <el-select v-model="form['sfyfdqybj']" placeholder="请选择" :disabled="isDisabled">
              <!-- @change="sfyfdqybjClick" -->
              <el-option
                v-for="(item,index)  in sfyfdqybj"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="one-col" label="发电企业背景">
            <el-input v-model="form.ssfdqy" placeholder="描述相关发电企业信息" :disabled="isDisabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="企业所属集团" prop="affiliatedGroupName">
            <el-input v-model="form.affiliatedGroupName" :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="注册资本" prop="registeringProperty">
            <el-input style="width:40%" class="ddw" v-model="form.registeringProperty" :disabled="isDisabled"></el-input>
           <el-select
              class="four-col left"
              style="width:40%"
              v-model="form['currencyCode']"
              :placeholder="isDisabled?'':'请选择'"
              :disabled="isDisabled"
            >
              <el-option
                v-for="(item,index)  in currencys"
                :key="index"
                :label="item.propName"
                :value="item.propCode"
              ></el-option>
            </el-select>
            <span v-if="form.currencyCode == 'currency01'" align="right">万元</span>
            <span v-if="form.currencyCode == 'currency02'" align="right">万美元</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="企业法人" prop="legalPerson">
            <el-input v-model="form.legalPerson" :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="登记机关" prop="registeredAddress">
            <el-input v-model="form.registeredAddress" :disabled="isDisabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="主营产品" prop="mainProduct">
            <el-input v-model="form.mainProduct" :disabled="isDisabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item class="one-col" label="企业注册地址" prop="registeringAddress">
            <el-input v-model="form.registeringAddress" :disabled="isDisabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开户名称" prop="accountName ">
            <el-input v-model="form.accountName " :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="开户银行账号" prop="depositBankAccount">
            <el-input v-model="form.depositBankAccount" :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="用电规模" prop="powerScale">
            <el-input class="ddw" v-model="form.powerScale" :disabled="isDisabled"></el-input>
            <span align="right">{{unitMap.electricityUnit}}</span>
          </el-form-item>
          <el-form-item label="参与跨区交易" prop>
            <template>
              <el-radio :disabled="isDisabled" v-model="form.sfcykqjy" :label="1">是</el-radio>
              <el-radio :disabled="isDisabled" v-model="form.sfcykqjy" :label="0">否</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="代理日期">
            <el-input class="ddw" v-model="form.agentDate" :disabled="isDisabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开户银行" prop="depositBank">
            <el-input v-model="form.depositBank" :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="交易中心注册编号" prop="tradingCenterRegistCode">
            <el-input v-model="form.tradingCenterRegistCode" :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="客户状态" prop="statusName">
            <el-input v-model="form.statusName" :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="开发单位" prop="exploitOrg">
            <el-input v-model="form.exploitOrg" :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="是否光伏交易" prop>
            <template>
              <el-radio :disabled="isDisabled" v-model="form.sfgfjy" :label="1">是</el-radio>
              <el-radio :disabled="isDisabled" v-model="form.sfgfjy" :label="0">否</el-radio>
            </template>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否全电量客户" prop>
            <template>
              <el-radio :disabled="isDisabled" v-model="form.sfqdlkh" :label="1">是</el-radio>
              <el-radio :disabled="isDisabled" v-model="form.sfqdlkh" :label="0">否</el-radio>
            </template>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="one-col" label="备注" prop="description">
            <el-input
              type="textarea"
              :rows="2"
              resize="none"
              v-model="form.description"
              :disabled="isDisabled"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-row>
          <el-col :span="24">
            <el-form-item label="附件">
              <el-upload
                class="upload-demo"
                ref="uploadFileAdd"
                action="/api/customer/tMdataCustomer/uploadCustomerFile"
                :show-file-list="show_file_name"
                :limit="uploadLimit_number"
                :multiple="true"
                :headers="uplaodHeaders"
                :auto-upload="false"
                :file-list="myFileList"
                :before-upload="handleBefore"
                :on-preview="handleDownload"
              >
                <!-- <el-button slot="trigger" size="small" type="primary">选取文件</el-button> -->
                <!-- v-if="!dialogInfo.notEdit" -->
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
    </el-form>
    <el-card class="box-card f-ml10 f-mt10">
      <div slot="header" class="clearfix">
        <span>用电信息</span>
        <div class="txt-right unit-info">单位：KV、{{unitMap.capacityUnit}}、{{unitMap.priceUnit}}</div>
      </div>
      <el-table
        class="input-table"
        :key="tableKey"
        :data="ydxxList"
        v-loading.body="listLoading"
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" align="center" width="70px"></el-table-column>
        <el-table-column width="90" align="center" label="企业代码">
          <template slot-scope="scope">
            <span>{{scope.row.enterpriseCode}}</span>
          </template>
        </el-table-column>
        <el-table-column width="90" align="center" label="用户名称">
          <template slot-scope="scope">
            <span>{{scope.row.userName}}</span>
          </template>
        </el-table-column>
        <el-table-column width="90" align="center" label="电源点">
          <template slot-scope="scope">
            <span>{{scope.row.powerPoint}}</span>
          </template>
        </el-table-column>
        <el-table-column width="90" align="center" label="户表号">
          <template slot-scope="scope">
            <span>{{scope.row.meterNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column width="90" align="center" label="所属电网">
          <template slot-scope="scope">
            <span>{{scope.row.powerGridName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="所属供电所">
          <template slot-scope="scope">
            <span>{{scope.row.supplyStationCode}}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="电压等级">
          <template slot-scope="scope">
            <span>{{scope.row.voltageLevelName}}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="用电容量">
          <template slot-scope="scope">
            <span>{{scope.row.electricalCapacity}}</span>
          </template>
        </el-table-column>
        <el-table-column width="130" align="center" label="目录电价">
          <template slot-scope="scope">
            <span>{{scope.row.catalogPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column width="130" align="center" label="输配电价">
          <template slot-scope="scope">
            <span>{{scope.row.transportPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column width="130" align="center" label="是否光伏户表">
          <template slot-scope="scope">
            <span>{{scope.row.sfgfhbText}}</span>
          </template>
        </el-table-column>
        <el-table-column width="150" align="center" label="备注">
          <template slot-scope="scope">
            <span>{{scope.row.remakes}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="box-card f-ml10 f-mt10">
      <div slot="header" class="clearfix">
        <span>联系人</span>
      </div>
      <el-table
        class="input-table"
        :key="tableKey"
        :data="lxrList"
        v-loading.body="listLoading"
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" align="center" width="70px"></el-table-column>
        <el-table-column width="90" align="center" label="联系人">
          <template slot-scope="scope">
            <span>{{scope.row.contacts}}</span>
          </template>
        </el-table-column>
        <el-table-column width="90" align="center" label="性别">
          <template slot-scope="scope">
            <span>{{scope.row.sexName}}</span>
          </template>
        </el-table-column>
        <el-table-column width="90" align="center" label="职务">
          <template slot-scope="scope">
            <span>{{scope.row.post}}</span>
          </template>
        </el-table-column>
        <el-table-column width="100" align="center" label="办公电话">
          <template slot-scope="scope">
            <span>{{scope.row.officePhone}}</span>
          </template>
        </el-table-column>
        <el-table-column width="80" align="center" label="移动电话">
          <template slot-scope="scope">
            <span>{{scope.row.mobilePhone}}</span>
          </template>
        </el-table-column>
        <el-table-column width="80" align="center" label="邮箱">
          <template slot-scope="scope">
            <span>{{scope.row.fax}}</span>
          </template>
        </el-table-column>
        <el-table-column width="80" align="center" label="邮政编码">
          <template slot-scope="scope">
            <span>{{scope.row.postalCode}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="150" label="是否常用联系人">
          <template slot-scope="scope">
            <span v-if="scope.row.frequentlyUsedContacts==='0'">否</span>
            <span v-if="scope.row.frequentlyUsedContacts==='1'">是</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="100">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="handleCheckLxr(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--联系人新增 弹窗开始 -->
    <el-dialog v-drag :close-on-click-modal="false"
      custom-class="def-dialog  main-container"
      :title="textMap[dialogStatusContact]"
      :visible.sync="dialogLxrFormVisible"
      append-to-body
    >
      <template>
        <el-form class="h400 f-mt10" :model="contactsForm" ref="contactsForm" label-width="130px">
          <div class="clearfix">
            <div class="constants-left">
              <el-form-item class="nofloat" label="姓名" prop="contacts">
                <el-input :disabled="isDisabled" v-model="contactsForm.contacts"></el-input>
              </el-form-item>
              <el-form-item class="nofloat" label="性别" prop="sex">
                <el-select :disabled="isDisabled" v-model="contactsForm['sex']">
                  <el-option
                    v-for="(item,index)  in sexOptions"
                    :key="index"
                    :label="item.propName"
                    :value="item.propCode"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="nofloat" label="生日" prop="date">
                <el-date-picker
                  :disabled="isDisabled"
                  class="datetime"
                  v-model="contactsForm.date"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
              <el-form-item class="nofloat" label="籍贯" prop="nativePlace">
                <el-select
                  :disabled="isDisabled"
                  class="four-col left"
                  v-model="contactsForm['nativePlaceProvice']"
                >
                  <el-option
                    v-for="(item,index)  in provinceOptions"
                    :key="index"
                    :label="item.propName"
                    :value="item.propCode"
                  ></el-option>
                </el-select>
                <el-select
                  :disabled="isDisabled"
                  class="four-col left"
                  v-model="contactsForm['nativePlaceArea']"
                >
                  <el-option
                    v-for="(item,index)  in areaOptions"
                    :key="index"
                    :label="item.propName"
                    :value="item.propCode"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="nofloat" label="邮编" prop="postalCode">
                <el-input :disabled="isDisabled" v-model="contactsForm.postalCode"></el-input>
              </el-form-item>
            </div>
            <div class="constants-right">
              <el-form-item label prop="photo">
                <el-upload
                  :disabled="isDisabled"
                  class="avatar-uploader"
                  :headers="uplaodHeaders"
                  :auto-upload="false"
                  ref="uploadPhoto"
                  action="/api/customer/tMdataCustomerContacts/uploadFile"
                  :show-file-list="false"
                >
                  <img v-if="imgShow" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </div>
          </div>
          <div class="two-col">
            <el-form-item class="one-col" label="联系地址" prop="contactAddress">
              <el-input
                :disabled="isDisabled"
                type="textarea"
                :rows="2"
                resize="none"
                v-model="contactsForm.contactAddress"
              ></el-input>
            </el-form-item>
            <el-row>
              <el-form-item label="职务" prop="post">
                <el-input :disabled="isDisabled" v-model="contactsForm.post"></el-input>
              </el-form-item>
              <el-form-item label="是否常用联系人" prop="frequentlyUsedContacts">
                <el-radio-group
                  :disabled="isDisabled"
                  v-model="contactsForm.frequentlyUsedContacts"
                >
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-form-item label="移动电话" prop="mobilePhone">
              <el-input :disabled="isDisabled" v-model="contactsForm.mobilePhone"></el-input>
            </el-form-item>
            <el-form-item label="办公电话" prop="officePhone ">
              <el-input :disabled="isDisabled" v-model="contactsForm.officePhone "></el-input>
            </el-form-item>
            <el-form-item label="传真" prop="fax">
              <el-input :disabled="isDisabled" v-model="contactsForm.fax"></el-input>
            </el-form-item>
            <el-form-item label="E-mail" prop="email">
              <el-input :disabled="isDisabled" v-model="contactsForm.email"></el-input>
            </el-form-item>
            <el-form-item label="客户负责人" prop="customerLeader">
              <el-input :disabled="isDisabled" v-model="contactsForm.customerLeader" placeholder></el-input>
            </el-form-item>
            <el-form-item class="one-col" label="兴趣爱好" prop="hobby">
              <el-input
                :disabled="isDisabled"
                type="textarea"
                :rows="2"
                resize="none"
                v-model="contactsForm.hobby"
              ></el-input>
            </el-form-item>
            <el-form-item class="one-col" label="备注" prop="description">
              <el-input
                :disabled="isDisabled"
                type="textarea"
                :rows="2"
                resize="none"
                v-model="contactsForm.description"
              ></el-input>
            </el-form-item>
            <el-form-item label="创建时间" prop="crtTime">
              <el-input v-model="contactsForm.crtTime" :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label="创建人" prop="crtUser">
              <el-input v-model="contactsForm.crtUserName" :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label="修改时间" prop="updTime">
              <el-input v-model="contactsForm.updTime" :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label="修改人" prop="updUser">
              <el-input v-model="contactsForm.updUserName" :disabled="isDisabled"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import {
  getObj,
  selectKhlb,
  selectSex,
  selectIndustry,
  selectProvince,
  //selectRate,
  selectqyzt,
  selectObj,
  selectSsdw,
  selectLevel,
  getcontactsObj
} from "@common/api/customer/colligateQuery/index";
import { getToken } from "@common/utils/auth";
import { showImg } from "@common/api/file";
import { mapGetters } from "vuex";
// import { downloadOneFileUs1 } from "@common/api/base";
import { getUnitMap } from "@common/utils/index";
import { getSelectList, downloadOneFile,downloadOneFileUs1 } from "@common/api/base";
export default {
  name: "customerFile",
  props: {
    customerId: {
      type: String
    }
  },
  data() {
    return {
      unitMap: {},
      sfyfdqybj: [
        {
          value: "0",
          label: "是"
        },
        {
          value: "1",
          label: "否"
        }
      ],
      sfcykqjy: 0,
      isInternal: 0,
      currentCusmerId: this.customerId,
      isDisabled: true,
      listLoading: false,
      show_file_name: true,
      uploadLimit_number: 10,
      uplaodHeaders: [],
      myFileList: [],
      currencys:[],
      tableKey: 0,
      total: null,
      total1: null,
      listQuery: {
        page: 1,
        limit: 10
      },
      listQuery1: {
        page: 1,
        limit: 10
      },

      form: {
        customerId: "", //客户id
        socialCreditCode: "", //统一社会信用码
        customerName: "", //客户名称
        customerAbbreviation: "", // 客户简称
        customerSname: "", // 客户简称
        statusName:'',//客户状态
        customerTypeCode: "", //客户分类
        qyxz: "", //企业性质
        qygm: "", //企业规模
        signingStateCode: "", //签约状态
        industryName: "", //所属行业
        customerLevel: "", //客户等级
        provinceCode: "", //省市
        areaCode: "", //区县
        industrialPark: "", //所在工业园区
        addr: "", //详细地址
        registeringAddress: "",
        legalPerson: "", //企业法人
        registeringProperty: "", //注册资金
        powerScale: "", //用电规模
        mainProduct: "", //主营产品
        description: "", //备注
        accountName: "", // 开户名称
        depositBank: "", // 开户银行
        depositBankAccount: "", //开户银行账号
        tradingCenterRegistCode: "", //交易中心注册编号
        affiliatedGroupId: "",
        affiliatedGroupName: "",
        isInternal: 0,
        sfyfdqybj: "1", //是否具有企业背景
        ssfdqy: "无", //企业背景信息
        sfcykqjy: 0,
        registeredAddress: "",
        exploitOrg: "",
        agentDate: "",
        sfgfjy: 0,
        sfqdlkh: 0,
        enclosure: "",
        currencyCode:'currency01'
      },
      contactsForm: {
        customerId: this.addId, //  客户表ID
        contactId: undefined, //联系人ID
        contacts: undefined, //联系人姓名
        date: undefined, // 出生日期
        photo: undefined, //照片
        nativePlace: undefined, //籍贯
        nativePlaceProvice: undefined, //省市
        nativePlaceArea: undefined, //区县
        ContactAddress: undefined, //联系地址
        frequentlyUsedContacts: 0, //是否常用联系人
        hobby: undefined, //兴趣爱好
        description: undefined, //备注
        contacts: undefined, //联系人
        sex: undefined, //性别
        post: undefined, //职务
        officePhone: undefined, //办公电话
        mobilePhone: undefined, //移动电话
        fax: undefined, //传真
        email: undefined, //邮箱
        postalCode: undefined, //邮政编码
        updUser: undefined,
        updTime: undefined,
        crtUser: undefined,
        crtTime: undefined,
        crtUserName: undefined,
        updUserName: undefined,
        customerLeader: undefined
      },
      lxrList: [],
      ydxxList: [],
      khlbOptions: [],
      qyxz: [],
      qygm: [],
      qyztOptions: [],
      sexOptions: [],
      industryOptions: [],
      provinceOptions: [],
      areaOptions: [],
      ssdwOptions: [],
      levelOptions: [],
      province: "province",
      provinceKh: "",
      dialogLxrFormVisible: false,
      uplaodHeaders: "",
      imgShow: false,
      dialogStatusContact: "",
      textMap: {
        checked: "查看"
      }
    };
  },
  watch: {
    customerId(val) {
      this.currentCusmerId = val;
      this.getDetail();
    }
  },
  mounted() {
    this.currentCusmerId=this.customerId
    this.selgroups();
    this.getDetail();
    getSelectList("currency").then(res=>{
      this.currencys = res;
    })
  },
  created() {
    this.uplaodHeaders = {
      Authorization: getToken()
    };
    this.selgroups();
    this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
  },
  computed: {
    ...mapGetters(["elements", "allSubMenus"])
  },
  methods: {
    //发电企业背景
    sfyfdqybjClick(value) {
      if (value == "1") {
        this.disable1 = true;
        this.form.ssfdqy = "无";
      } else {
        this.disable1 = false;
        this.form.ssfdqy = "";
      }
    },
    //初始化上传
    initUpload(files) {
      this.isUpload = false;
      let fileArr = [];
      this.myFileList = [];
      if (typeof files == "undefined") {
        return false;
      }
      if (files != "") {
        fileArr = files.split("|");
        fileArr.forEach(item => {
          if (item != "") {
            let fileInfo = item.split("/");
            this.myFileList.push({
              url: item,
              name: fileInfo[fileInfo.length - 1]
            });
          }
        });
      }
    },
    getDetail() {
      getObj(this.currentCusmerId).then(res => {
        this.provinceKh = res.data.provinceCode;
        selectProvince(this.provinceKh).then(res => {
          this.areaOptions = res;
        });
        for (let key in this.form) {
          if (key == "sfcykqjy") {
            this.form.sfcykqjy = parseInt(res.data.sfcykqjy);
          } else if (key == "isInternal") {
            // console.log(res.data.isInternal)
            this.form.isInternal = parseInt(res.data.isInternal);
          } else if (key == "sfgfjy") {
            this.form.sfgfjy = parseInt(res.data.sfgfjy);
          } else if (key == "sfqdlkh") {
            this.form.sfqdlkh = parseInt(res.data.sfqdlkh);
          } else {
            this.form[key] = res.data[key];
          }
        }
        if (typeof res.data["enclosure"] == "undefined") {
          this.form.enclosure = "";
        }
        // this.form = res.data;
        this.initUpload(this.form.enclosure);
        this.lxrList = res.data.contactsList;
        this.ydxxList = res.data.powerList;

      });
    },
    selgroups() {
      selectKhlb().then(res => {
        this.khlbOptions = res;
      });
      selectqyzt().then(res => {
        this.qyztOptions = res;
      });

      selectSex().then(res => {
        this.sexOptions = res;
      });

      selectIndustry().then(res => {
        this.industryOptions = res;
      });

      selectProvince(this.province).then(res => {
        this.province = "province";
        this.provinceOptions = res;
      });

      selectSsdw().then(res => {
        this.ssdwOptions = res;
      });

      selectLevel().then(res => {
        this.levelOptions = res;
      });
    },
    //下载文件
    handleDownload(file) {
      // let parme = {
      //   customerId: this.form.customerId
      // };
      if (file.status != "ready") {
        let parme = {
        enclosures: file.url
      };
      downloadOneFileUs1(parme);
      }
      
    },
    //上传文件之前
    handleBefore(file) {},
    handleCheckLxr(row) {
      //打开查看联系人
      this.dialogStatusContact = "checked";
      this.isEditContacts = false;
      if (row.provinceCode) {
        //判断省市区的
        this.changeprovince(row.provinceCode);
      } else {
        this.province = "province";
      }
      this.dialogLxrFormVisible = true;
      this.imgShow = true;
      getcontactsObj(row.contactId).then(res => {
        // this.contactsForm=res.data;
        for (let key in this.contactsForm) {
          if (key != "frequentlyUsedContacts") {
            this.contactsForm[key] = res.data[key];
          } else {
            this.contactsForm.frequentlyUsedContacts = parseInt(
              res.data.frequentlyUsedContacts
            );
          }
        }  
        // console.log(this.contactsForm);
      });

      this.imageUrl = showImg(row.contactId);
    }
  }
};
</script>
<style lang="scss" scoped>
.el-select.four-col {
  width: 49%;
  float: left;
}
.el-select.four-col.left {
  margin-right: 1%;
}
.el-select,
.el-date-editor {
  width: 100%;
}
.el-input.ddw {
  width: 76%;
}
.el-input.ddw1 {
  width: 73%;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 190px;
  line-height: 190px;
  text-align: center;
}
.avatar {
  width: 200px;
  height: 190px;
  display: block;
}
.constants-right {
  float: right;
  width: 54%;
}
.constants-left {
  float: left;
  width: 46%;
}
.clearfix {
  overflow: hidden;
}
.constants-right .el-form-item__content {
  margin-left: 80px !important;
}
</style>

