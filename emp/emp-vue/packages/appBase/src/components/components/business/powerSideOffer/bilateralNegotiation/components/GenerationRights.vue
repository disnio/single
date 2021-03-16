<!--
 * @功能描述: 发电权
 * @版本: 
 * @作者: 康如涛
 * @Date: 2019-08-27 13:48:53
 * @最新修改内容: 
 * @LastEditTime: 2020-05-12 16:22:34
 -->
<template>
  <!--发电权交易-->
  <div class="app-container calendar-list-container">
    <el-row>
      <el-col :span="24">
        <div class="txt-right unit-info">单位:{{unitMap.electricityUnit}},{{unitMap.priceUnit}}</div>
      </el-col>
    </el-row>

    <el-button-group class="f-mb10">
      <el-button
        v-if="!dialogInfo.notEdit"
        type="primary"
        icon="el-icon-upload"
        @click="exportData"
      >导出</el-button>
      <el-button
        v-if="!dialogInfo.notEdit"
        type="primary"
        icon="el-icon-upload"
        @click="handleClickImport"
      >导入</el-button>
      <el-button
        v-if="!dialogInfo.notEdit"
        type="primary"
        icon="el-icon-upload"
        @click="showImportResult"
      >导入解析</el-button>
      <el-button
        v-if="!dialogInfo.notEdit"
        type="primary"
        icon="el-icon-download"
        @click="templateDownload"
      >模板下载</el-button>
    </el-button-group>

    <el-table
      :key="tableKey"
      :data="tableList"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <!-- <el-table-column align="center" type="selection"></el-table-column> -->
      <el-table-column prop="index" label="序号" align="center" width="60px"></el-table-column>
      <el-table-column align="center" min-width="150px" label="交易分类">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.tradingClassificationCodeStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.tradingClassificationCodeStatusMsg"
            placement="top"
          >
            <el-select
              style="width:100%;"
              :disabled="dialogInfo.notEdit"
              :class="scope.row.tradingClassificationCodeStatus"
              v-model="scope.row.tradingClassificationCode"
              @change="changeTradingClass"
            >
              <el-option
                v-for="(item,index) in transactionClassifyOption"
                :key="index"
                :label="item.propName"
                :value="item.propCode"
              ></el-option>
            </el-select>
          </el-tooltip>
          <el-select
            v-else
            style="width:100%;"
            :disabled="dialogInfo.notEdit"
            v-model="scope.row.tradingClassificationCode"
            @change="changeTradingClass"
          >
            <el-option
              v-for="(item,index) in transactionClassifyOption"
              :key="index"
              :label="item.propName"
              :value="item.propCode"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" align="center" label="类型">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.tradingTypeCodeStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.tradingTypeCodeStatusMsg"
            placement="top"
          >
            <el-select
              style="width:100%;"
              :class="scope.row.tradingTypeCodeStatus"
              v-model="scope.row.tradingTypeCode"
            >
              <el-option
                v-for="(item,index) in assignmentTypeOption"
                :key="index"
                :disabled="dialogInfo.notEdit"
                :label="item.propName"
                :value="item.propCode"
              ></el-option>
            </el-select>
          </el-tooltip>
          <el-select
            v-else
            style="width:100%;"
            :disabled="dialogInfo.notEdit"
            v-model="scope.row.tradingTypeCode"
          >
            <el-option
              v-for="(item,index) in assignmentTypeOption"
              :key="index"
              :label="item.propName"
              :value="item.propCode"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" label="发电企业">
        <template slot-scope="scope">
          <el-input v-model="scope.row.fdOrgName" disabled></el-input>
        </template>
      </el-table-column>
      <!-- 2019-11-1   #2435  王岑 合同电量转让交易，机组做成下拉框形式 start -->

      <el-table-column min-width="140px" align="center" label="机组">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.unitStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.unitStatusMsg"
            :disabled="dialogInfo.notEdit"
            placement="top"
          >
            <el-select
              style="width:100%;"
              :class="scope.row.unitStatusStatus"
              v-model="scope.row.unit"
              :disabled="dialogInfo.notEdit"
            >
              <el-option
                v-for="(item,index) in unitList"
                :key="index"
                :label="item.tradingUnitName"
                :value="item.tradingUnitName"
              ></el-option>
            </el-select>
            <!-- 2019-11-1   #2435  王岑 合同电量转让交易，机组做成下拉框形式 end-->
            <!-- <el-input :class="scope.row.unitStatus" v-model="scope.row.unit"></el-input> -->
          </el-tooltip>
          <!-- <el-input v-else v-model="scope.row.unit" :disabled="dialogInfo.notEdit"></el-input> -->
          <el-select
            v-else
            style="width:100%;"
            :class="scope.row.unitStatusStatus"
            v-model="scope.row.unit"
            :disabled="dialogInfo.notEdit"
          >
            <el-option
              v-for="(item,index) in unitList"
              :key="index"
              :label="item.tradingUnitName"
              :value="item.tradingUnitName"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column min-width="200px" align="center" label="交易产品">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.tradingProductStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.tradingProductStatusMsg"
            placement="top"
          >
            <el-select
              style="width:100%;"
              :class="scope.row.tradingProductStatus"
              :disabled="dialogInfo.notEdit"
              v-model="scope.row.tradingProduct"
            >
              <el-option
                v-for="(item,index) in tradingProductsOption"
                :key="index"
                :label="item.propName"
                :value="item.propCode"
              ></el-option>
            </el-select>
          </el-tooltip>
          <el-select
            v-else
            style="width:100%;"
            :disabled="dialogInfo.notEdit"
            v-model="scope.row.tradingProduct"
          >
            <el-option
              v-for="(item,index) in tradingProductsOption"
              :key="index"
              :label="item.propName"
              :value="item.propCode"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="200px" label="出/受让发电企业">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.sellTransfereeOrgIdStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.sellTransfereeOrgIdStatusMsg"
            placement="top"
          >
            <!-- 2020-01-08  #3544   康如涛  增加下拉菜单查询 -->
            <el-select
              style="width:100%;"
              :class="scope.row.sellTransfereeOrgIdStatus"
              v-model="scope.row.sellTransfereeOrgId"
              @change="getUnit"
              :disabled="dialogInfo.notEdit"
              filterable
            >
              <el-option
                v-for="(item,index) in lineOptionData"
                :key="index"
                :label="item.orgName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-tooltip>
          <el-select
            v-else
            style="width:100%;"
            :class="scope.row.mobilePhoneStatus"
            v-model="scope.row.sellTransfereeOrgId"
            @change="getUnit"
            :disabled="dialogInfo.notEdit"
            filterable
          >
            <el-option
              v-for="(item,index) in lineOptionData"
              :key="index"
              :label="item.orgName"
              :value="item.id"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column min-width="120px" align="center" label="出/受让机组">
        <template slot-scope="scope">
          <!-- <el-input v-model="scope.row.sellTransfereeUnit"></el-input> -->
          <!-- 2019-10-30   #2430  康如涛 解决查询时显示为可编辑问题 -->
          <!-- <el-input v-model="scope.row.sellTransfereeUnit"  :disabled="dialogInfo.notEdit"></el-input> -->
          <!-- 2019-11-1   #2435  王岑 合同电量转让交易，机组做成下拉框形式 start-->
          <el-select
            style="width:100%;"
            v-model="scope.row.sellTransfereeUnit"
            :disabled="dialogInfo.notEdit"
            filterable
          >
            <el-option
              v-for="(item,index) in csunitList"
              :key="index"
              :label="item.tradingUnitName"
              :value="item.tradingUnitName"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <!-- #3545 2020-01-13 张亮三 增加用电企业 start -->
      <el-table-column
        :disabled="dialogInfo.notEdit"
        min-width="200px"
        prop
        label="用电企业"
        align="center"
      >
        <template slot-scope="scope">
          <el-select
            style="width:100%;"
            clearable
            v-model="scope.row.eleEnterpriseName"
            :remote-method="getAlleleEnterprise"
            @change="tradingUnitNameFocus1(scope.$index,scope.row)"
            filterable
            remote
            :loading="loading"
            :disabled="dialogInfo.notEdit"
          >
            <!-- @focus="tradingUnitNameFocus" -->

            <el-option
              v-for="(item, index) in eleEnterpriseList"
              :key="index"
              :label="item.customerName"
              :value="item.customerName"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <!-- #3545 2020-01-13 张亮三 增加用电企业 end -->
      <!-- 2019-11-1   #2435  王岑 合同电量转让交易，机组做成下拉框形式end -->
      <el-table-column align="center" width="90" label="电量">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.declarationElectricityStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :enterable="false"
            :content="scope.row.declarationElectricityStatusMsg"
            placement="top"
          >
            <el-input
              :class="scope.row.declarationElectricityStatus"
              type="number"
              :disabled="dialogInfo.notEdit"
              v-model="scope.row.declarationElectricity"
            ></el-input>
          </el-tooltip>
          <el-input
            v-else
            v-model="scope.row.declarationElectricity"
            :disabled="dialogInfo.notEdit"
            type="number"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" width="90" label="电价">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.declarationElectricityPricesStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.declarationElectricityPricesStatusMsg"
            placement="top"
          >
            <el-input
              :class="scope.row.declarationElectricityPricesStatus"
              type="number"
              :disabled="dialogInfo.notEdit"
              v-model="scope.row.declarationElectricityPrices"
            ></el-input>
          </el-tooltip>
          <el-input
            v-else
            v-model="scope.row.declarationElectricityPrices"
            :disabled="dialogInfo.notEdit"
            type="number"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column align="center" width="160" label="备注">
        <template slot-scope="scope">
          <el-input :disabled="dialogInfo.notEdit" v-model="scope.row.schemeDesc"></el-input>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        align="center"
        width="120px"
        label="操作"
        v-if="!dialogInfo.notEdit"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.index==(tableList.length)"
            icon="el-icon-plus"
            size="small"
            type="primary"
            @click="addRow"
          ></el-button>
          <el-button size="small" type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      title="报价方案导入"
      :visible.sync="importTypeDialog"
      custom-class="w640"
      append-to-body
    >
      <div style="height:200px;">
        <el-row>
          <el-col :span="16">
            <div style="margin-top:20px;">
              <el-upload
                ref="uploadFileAdd"
                action="/api/business/jyQuotationSchemeDetail/upload"
                :accept="accept"
                :show-file-list="show_file_name"
                :limit="limit_number"
                :multiple="true"
                :headers="uplaodHeaders"
                :auto-upload="false"
                :file-list="myFileList"
                :data="uploadImportForm"
                :before-upload="handleBefore"
                :on-change="handleChange"
                :on-success="uploadSuccess"
                :on-error="uploadErr"
              >
                <!-- :on-exceed="handleExceed" -->
                <el-button
                  v-loading="importantLoading"
                  slot="trigger"
                  size="small"
                  type="primary"
                >选取文件</el-button>
              </el-upload>
            </div>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="ok-btn" @click="uploadImportTemp()">确 定</el-button>
      </span>
    </el-dialog>

    <import-power ref="importPower" :announcementInfo="announcementInfo"></import-power>
  </div>
</template>
<script>
import {
  deleteInfoById,
  getOrgListByClassification,
  getCurrentUserOrg,
  getTradingUnitbyOrgId,
  getAlleleEnterprise,
  exportDetail,
  getSchemeDetail,
  importTemplate,
  getDetailListBySchemeId,
  addBeforeUpload
} from "@common/api/business/bilateralNegotiation/index";
import { mapGetters } from "vuex";
import { getOrgByName } from "@common/api/admin/orgStruManage/index";
import { getSelectList } from "@common/api/base";
import { getUnitMapByModelCode, getUnitMap } from "@common/utils/index";
import { getToken } from "@common/utils/auth";
import importPower from "./ImportPower";
export default {
  name: "generationRights",
  components: {
    importPower
  },
  props: {
    dialogInfo: { type: Object },
    orgInfo: { type: Object },
    btns: { type: Object },
    programme: { type: String },
    announcementInfo: { type: Object },
    quotationSegmentOption: {
      type: Array
    },
    tradingProductsOption: {
      type: Array
    },
    assignmentTypeOption: {
      type: Array
    },
    transactionClassifyOption: {
      type: Array
    },
    tradingUnitOption: {
      type: Array
    },
    detailListData: {
      type: Array
    },
    // #3010 2019-12-07 张亮三 接收父组件传的unitMaps
    unitMaps: {
      type: Object
    }
  },
  data() {
    return {
      importTypeDialog: false,
      unitList: [],
      csunitList: [],
      isErr: false,
      listLoading: false,
      loading: false,
      tableKey: 0,
      tableList: [],
      eleEnterpriseList: [], //#3545 2020-01-13 张亮三 用电企业模糊查询数组
      lineOptionData: [],
      quotationSegmentOptionData: [],
      announcementInfoData: this.announcementInfo,
      form: {
        detailId: "",
        declarationElectricity: "申报电量/意向摘牌电量",
        declarationElectricityPrices: "申报电价/意向摘牌电价",
        fdOrgId: "发电公司",
        fdOrgName: "发电公司名称",
        tradingClassificationCode: "交易分类",
        tradingClassificationName: "交易分类名称",
        tradingProduct: "产品/交易产品",
        tradingProductName: "产品/交易产品名称",
        tradingTypeCode: "交易类型",
        tradingTypeName: "交易类型名称",
        tradingVarietyCode: "交易品种",
        tradingVarietyName: "交易品种名称",
        unit: "机组",
        eleEnterprise: "",
        eleEnterpriseName: "", //用电企业
        sellTransfereeOrgId: "出/受让发电企业",
        sellTransfereeUnit: "出/受让机组",
        schemeDesc: "备注"
      },

      unitMap: {},
      // 导入对应的数据  #4004  begin
      importantLoading: false,
      accept:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
      show_file_name: true,
      limit_number: 1,
      uplaodHeaders: {},
      myFileList: [],
      uploadImportForm: {},
      canUplaodImport: ""
      // 导入对应的数据  #4004  end
    };
  },
  watch: {
    announcementInfo(val) {
      this.announcementInfoData = val;
    },
    detailListData(val) {
      this.init();
    },
    unitMaps(newVal, oldVal) {
      this.unitMap = newVal;
    }
  },
  created() {
    //  导入时传的主键id
    if (this.announcementInfoData.schemeId) {
      this.uploadImportForm.schemeId = this.announcementInfoData.schemeId;
    }
    /**
     * @方法名称: 获取token  #4004
     * @作者: wuzhichao
     * @Date: 2020-05-08 13:35:55
     */
    this.uplaodHeaders = {
      Authorization: getToken(),
      ModelCode: "fdPricingProposal"
    };
    this.init();
    // 编辑查看时 调用changeTradingClass #2429
    this.changeTradingClass(this.detailListData.tradingClassificationCode);
    if (sessionStorage.getItem("modelCode") == "dashboard") {
      // #3010 2019-12-07 张亮三 接收父组件传的unitMaps
      this.unitMap = this.unitMaps;
    } else {
      this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
    }
  },
  computed: {
    ...mapGetters(["elements", "allSubMenus", "orgId"])
  },
  methods: {
    // ===========吴志超 2020年05月08日修改 工单 #4004  begin===============================================================================================================

    async delGetList(id) {
      let res = await getDetailListBySchemeId({ schemeId: id });
      this.tableList = res.data.detailList.fa_01;
    },

    // 上传之前
    handleBefore(file) {},
    //文件状态改变
    handleChange(file, fileList) {
      this.canUplaodImport = this.checkImportFileName(file.name);
    },
    // 文件上传成功
    uploadSuccess(response, file, fileList) {
      this.$refs.uploadFileAdd.clearFiles();
      this.$notify({
        title: "导入提示",
        message: "文件导入成功，正在处理，请稍后查看！",
        type: "success",
        duration: 2000
      });
    },

    // 导入失败提示
    uploadErr(response, file, fileList) {
      this.$refs.uploadFileAdd.clearFiles();
      this.importantLoading = false;
      this.$notify({
        title: "导入提示",
        message: "导入失败",
        type: "warning",
        duration: 2000
      });
    },

    checkImportFileName() {
      return true;
    },
    // 点击导出按钮
    async exportData() {
      let par = {
        schemeId: this.announcementInfo.schemeId,
        ModelCode: "fdPricingProposal"
      };

      let res = await exportDetail(par);
    },

    /**
     * @方法名称: 导入文件方法对应的方法 #4004  end
     * @作者: wuzhichao
     * @Date: 2020-05-08 13:19:20
     */

    handleClickImport() {
      if (this.$refs.uploadFileAdd === undefined) {
      } else {
        this.$refs.uploadFileAdd.clearFiles();
      }
      this.importTypeDialog = true;
    },
    //上传导入模板文件
    /**
     * @方法名称: 点击上传弹出框对应的保存方法 #4004
     * @作者: wuzhichao
     * @Date: 2020-05-08 13:38:07
     */
    uploadImportTemp() {
      if (this.announcementInfoData.schemeId) {
        this.$refs.uploadFileAdd.submit();
        this.importTypeDialog = false;
      } else {
        addBeforeUpload(this.announcementInfoData)
          .then(res => {
            this.announcementInfo.schemeId = res.data.schemeId;
            this.uploadImportForm.schemeId = res.data.schemeId;
          })
          .then(() => {
            this.$refs.uploadFileAdd.submit();
            this.importTypeDialog = false;
          });
      }
    },

    // 导入解析
    showImportResult() {
      if (this.announcementInfo.schemeId) {
        this.$refs.importPower.initImportData();
      } else {
        this.$notify({
          title: "成功",
          message: "请先导入对应的文件",
          type: "warning",
          duration: 2000
        });
      }
    },
    // 模板下载
    async templateDownload() {
      let query = {
        tradeVariety: this.announcementInfo.tradeVarietyCode,
        schemeId: this.announcementInfo.schemeId
      };
      let res = await importTemplate(query);
    },

    // ===========吴志超 2020年05月08日修改 工单 #4004  end===============================================================================================================

    //初始化数据
    init() {
      if (
        this.dialogInfo.status == "edit" ||
        this.dialogInfo.status == "change"
      ) {
        this.tableList = this.detailListData;
        if (this.tableList.length == 0) {
          this.addRow();
          this.setQuotationSubsection();
        } else {
          this.setQuotationSubsection();
        }
      } else if (this.dialogInfo.status == "view") {
        this.tableList = this.detailListData;
        this.setQuotationSubsection();
      }
      //根据当前orgId获取机组 2019-11-1   #2435  王岑
      getTradingUnitbyOrgId(this.orgId).then(res => {
        this.unitList = res.data.rows;
      });
    },
    //获取交易分类
    changeTradingClass(val) {
      getCurrentUserOrg().then(res => {
        // console.log(res);
        // this.orgName=res.orgName;
        this.province = res.provinceCode;
      });
      // console.log(val);
      let qq = {
        tradingClassificationCode: val,
        province: this.province,
        // orgName:this.orgName,
        attributeTypeCode: "zzjgsx02"
      };
      getOrgListByClassification(qq).then(res => {
        this.lineOptionData = res.data;
      });
    },
    // #3545 2020-01-13 张亮三 用电企业模糊 查询数据 start
    getAlleleEnterprise(query) {
      this.eleEnterpriseList = [];
      this.loading = true;
      let parameters = {
        name: query
      };
      getAlleleEnterprise(parameters).then(res => {
        this.loading = false;
        this.eleEnterpriseList = res;
      });
    },
    tradingUnitNameFocus1(index, row) {
      this.eleEnterpriseList.forEach(item => {
        if (item.customerName == this.tableList[index].eleEnterpriseName) {
          this.tableList[index].eleEnterprise = item.customerId;
        }
      });
    },
    //根据发电企业获取出受让机组 2019-11-1   #2435  王岑
    getUnit(row) {
      getTradingUnitbyOrgId(row).then(res => {
        this.csunitList = res.data.rows;
      });
    },
    //设置报价分段下拉选项
    setQuotationSubsection() {
      this.quotationSegmentOptionData = [];
      let quotationSubsection = Number(
        this.announcementInfoData.quotationSubsection
      );
      for (let i = 0; i < quotationSubsection; i++) {
        this.quotationSegmentOptionData.push(this.quotationSegmentOption[i]);
      }
    },
    //获取列表数据
    getListData(data) {
      this.tableList = [];
      data.forEach(item => {
        item.declarationElectricityPricesStatus = ""; //申报电价
        // item.tradingUnitIdStatus = ""; //交易电源
        //   item.quotationStallStatus = ""; //报价段
        item.declarationElectricityStatus = ""; //申报电量
        item.declarationElectricityStatusMsg = "";
        item.declarationElectricityPricesStatusMsg = "";
        // item.tradingUnitIdStatusMsg = "";
        // item.quotationStallStatusMsg = "";
        this.tableList.push(item);
      });
    },
    // //检测交易单元与分段报价唯一性
    // checkTradingUnit(data) {
    //   let isErr = false;
    //   this.tableList.forEach(item => {
    //     if (data.index > item.index) {
    //       if (
    //         data.quotationStall == item.quotationStall
    //       ) {
    //         isErr = true;
    //       }
    //     }
    //   });
    //   return isErr;
    // },
    //检测表格数据
    checkTab(data) {
      // console.log(data)
      this.isErr = false;
      var patrn = /^(-)?\d+(\.\d+)?$/;
      for (let i = 0, l = this.tableList.length; i < l; i++) {
        this.tableList[i].declarationElectricityStatus = "";
        this.tableList[i].declarationElectricityPricesStatus = "";
        // this.tableList[i].quotationStallStatus = "";
        // this.tableList[i].tradingUnitIdStatus = "";
        if (
          patrn.exec(this.tableList[i].declarationElectricity) == null ||
          this.tableList[i].declarationElectricity == "" ||
          typeof this.tableList[i].declarationElectricity == "undefined"
        ) {
          this.tableList[i].declarationElectricityStatus = "ipt-err-true"; //交易电量
          this.tableList[i].declarationElectricityStatusMsg =
            "申报电量必须为数字";
          this.isErr = true;
        } else {
          // #3279 2019-12-25 张亮三 增加类型判断，当类型为 '(出让/csrlx_01)' 时申报电量不能为正值，当类型为 （受让/csrlx_02）时申报电量不能为负值 start
          if (
            this.tableList[i].tradingTypeCode == "csrlx_01" &&
            this.tableList[i].declarationElectricity > 0
          ) {
            this.tableList[i].declarationElectricityStatus = "ipt-err-true"; //申报电量
            this.tableList[i].declarationElectricityStatusMsg =
              "申报电量不能为正值";
            this.isErr = true;
          } else if (
            this.tableList[i].tradingTypeCode == "csrlx_02" &&
            this.tableList[i].declarationElectricity < 0
          ) {
            this.tableList[i].declarationElectricityStatus = "ipt-err-true"; //申报电量
            this.tableList[i].declarationElectricityStatusMsg =
              "申报电量不能为负值";
            this.isErr = true;
          }
          // else if(this.tableList[i].tradingTypeCode == null && this.tableList[i].declarationElectricity < 0){
          //   this.tableList[i].declarationElectricityStatus = "ipt-err-true"; //申报电量
          //   this.tableList[i].declarationElectricityStatusMsg =
          //     "申报电量不能为负值";
          //   this.isErr = true;
          // }
          // #3279 2019-12-25 张亮三 增加类型判断，当类型为 '(出让/csrlx_01)' 时申报电量不能为正值，当类型为 （受让/csrlx_02）时申报电量不能为负值 end
        }
        if (
          patrn.exec(this.tableList[i].declarationElectricityPrices) == null ||
          this.tableList[i].declarationElectricityPrices == "" ||
          typeof this.tableList[i].declarationElectricityPrices == "undefined"
        ) {
          this.tableList[i].declarationElectricityPricesStatus = "ipt-err-true"; //交易电价
          this.tableList[i].declarationElectricityPricesStatusMsg =
            "申报电价必须为数字";
          this.isErr = true;
        } else {
          if (this.announcementInfo.quotationMethod == "bjfs01") {
            if (this.tableList[i].declarationElectricityPrices >= 0) {
              this.tableList[i].declarationElectricityPricesStatus =
                "ipt-err-true"; //交易电价
              this.tableList[i].declarationElectricityPricesStatusMsg =
                "申报电价应为负值";
              this.isErr = true;
            }
          }
        }
        // if (this.tableList[i].quotationStall == "" ||typeof this.tableList[i].quotationStall == "undefined") {
        //   this.tableList[i].quotationStallStatus = "ipt-err-true";
        //   this.tableList[i].quotationStallStatusMsg = "请选择报价段";
        //   this.isErr = true;
        // }
        if (
          this.tableList[i].tradingTypeCode == "" ||
          typeof this.tableList[i].tradingTypeCode == "undefined"
        ) {
          this.tableList[i].tradingTypeCodeStatus = "ipt-err-true";
          this.tableList[i].tradingTypeCodeStatusMsg = "请选择类型";
          this.isErr = true;
        }
        if (
          this.tableList[i].tradingProduct == "" ||
          typeof this.tableList[i].tradingProduct == "undefined"
        ) {
          this.tableList[i].tradingProductStatus = "ipt-err-true";
          this.tableList[i].tradingProductStatusMsg = "请选择产品";
          this.isErr = true;
        }
        // if (this.checkTradingUnit(this.tableList[i])) {
        //   this.isErr = true;
        //   this.tableList[i].quotationStallStatus = "ipt-err-true"; //报价段
        //   //  item.tradingUnitIdStatusMsg="交易单元";
        //   this.tableList[i].quotationStallStatusMsg = "报价段信息重复";
        // }
      }
    },

    //初始化表格数据
    initTableData() {
      this.tableList = [];
      this.addRow();
      this.setQuotationSubsection();
    },
    //模糊查询发电公司
    queryFdOrg(queryString, cb) {
      var list = [{}];
      let attributeTypeCode = "zzjgsx01";
      getOrgByName({ orgName: queryString }, attributeTypeCode).then(res => {
        if (typeof res.dataList != "undefined") {
          if (res.dataList.length > 0) {
            res.dataList.forEach(item => {
              list.push({
                value: item.orgName,
                orgId: item.id
              });
            });
          }
        }
        cb(list);
      });
    },
    //添加表格行
    addRow() {
      let index = this.tableList.length + 1;
      var newData = {};
      newData.index = index;
      for (let key in this.form) {
        if (key.indexOf("Name") < 0) {
          newData[key] = "";
          newData[key + "Status"] = "";
          newData[key + "StatusMsg"] = "";
        } else {
          newData[key] = "";
        }
      }
      newData.fdOrgId = this.orgInfo.id;
      newData.fdOrgName = this.orgInfo.orgName;

      this.tableList.push(newData);
    },
    //移除行信息
    delRowData(row) {
      let items = [];
      for (let i = 0, l = this.tableList.length; i < l; i++) {
        if (row.index != this.tableList[i].index) {
          items.push(this.tableList[i]);
        }
      }
      items.forEach((item, index) => {
        item.index = index + 1;
        return item;
      });
      this.tableList = items;
      if (this.tableList.length == 0) {
        this.addRow();
      }
    },

    //删除行信息
    handleDelete(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (typeof row.detailId == "undefined") {
          this.delRowData(row);
        } else {
          if (row.detailId == "") {
            this.delRowData(row);
          } else {
            deleteInfoById(row.detailId).then(res => {
              if (res.rel) {
                this.$notify({
                  title: "成功",
                  message: "删除成功",
                  type: "success",
                  duration: 2000
                });
                this.delRowData(row);
                // this.getListData();
              } else {
                this.$notify({
                  title: "提示",
                  message: res.msg,
                  type: "warning",
                  duration: 2000
                });
              }
            });
          }
        }
        return false;
      });
    }
  }
};
</script>

<style scoped>
.el-input.ddw1 {
  width: 50%;
}
.el-input input {
  text-align: right;
}
.el-select .el-input input {
  text-align: left;
}
</style>





