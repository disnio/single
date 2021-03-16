<!--
 * @功能描述: 省内交易
 * @版本:
 * @作者: 康如涛
 * @Date: 2019-08-27 13:48:54
 * @最新修改内容:  #2353 解决交易单元显示问题
 * @LastEditTime: 2020-05-21 15:43:49
 -->
<template>
  <div class="app-container calendar-list-container">
    <div>
      <el-collapse
        v-model="activeNames"
        v-if="dialogInfo.status == 'edit'||dialogInfo.status =='view'||dialogInfo.status == 'change'"
      >
        <el-collapse-item title="内部客户" name="1">
          <el-row>
            <el-col :span="24">
              <div class="txt-right unit-info">单位:{{unitMap.electricityUnit}},{{unitMap.priceUnit}}</div>
            </el-col>
          </el-row>

          <el-table
            :key="tableKey"
            :data="innerTableList"
            v-loading.body="listLoading"
            border
            fit
            highlight-current-row
            style="width: 100%;"
          >
            <!-- <el-table-column align="center" type="selection"></el-table-column> -->
            <el-table-column align="center" label="发电公司">
              <template slot-scope="scope">
                <span>{{scope.row.fdOrgName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="交易单元">
              <template slot-scope="scope">
                <span>{{scope.row.tradingUnitName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="客户名称" >
              <template slot-scope="scope">
                <span>{{scope.row.customerName}}</span>
              </template>
            </el-table-column>

            <!-- 2020-06-04 #4161  qinhz 发电侧报价方案-交易品种为省内直接交易,交易方式为双边协商-新增购电侧交易单元字段 start-->
            <el-table-column align="center" width="120px" v-if="announcementInfo.tradeVarietyCode == 'jypz01' && (announcementInfo.tradeWayCode == 'jyfs01' || announcementInfo.tradeWayCode == 'jyfs03') && isShow" label="购电侧交易单元">
              <template slot-scope="scope">
                <span>{{scope.row.powerPurchaseUnitName}}</span>
              </template>
            </el-table-column>
            <!-- 2020-06-04 #4161  qinhz 发电侧报价方案-交易品种为省内直接交易,交易方式为双边协商-新增购电侧交易单元字段 end-->
            <el-table-column align="center" width="160" label="申报电量">
              <template slot-scope="scope">
                <span>{{scope.row.declarationElectricity}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="160" label="申报电价">
              <template slot-scope="scope">
                <span>{{scope.row.declarationElectricityPrices}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="160" label="备注">
              <template slot-scope="scope">
                <span>{{scope.row.schemeDesc}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div>
      <el-collapse v-if="external" v-model="activeNames">
        <el-collapse-item title="外部客户" name="2">
          <el-row v-if="announcementInfo.tradeVarietyCode != 'jypz10'&& announcementInfo.tradeWayCode!='jyfs04'">
            <el-col :span="12">
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
            </el-col>

            <el-col :span="12">
              <div class="txt-right unit-info">单位:{{unitMap.electricityUnit}},{{unitMap.priceUnit}}</div>
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
          >
            <!-- <el-table-column align="center" type="selection"></el-table-column> -->
            <el-table-column prop="index" label="序号" align="center" width="60px"></el-table-column>
            <el-table-column align="center" label="发电公司">
              <template slot-scope="scope">
                <el-input v-model="scope.row.fdOrgName" disabled></el-input>
              </template>
            </el-table-column>
            <!-- 2019-10-29   #2353  康如涛 修改查看时交易单元显示 start-->
            <el-table-column
              v-if="dialogInfo.status == 'view'||dialogInfo.notEdit"
              align="center"
              label="交易单元"
            >
              <template slot-scope="scope">
                <el-input :disabled="dialogInfo.notEdit" v-model="scope.row.tradingUnitName"></el-input>
              </template>
            </el-table-column>
            <!-- 2019-10-29   #2353  康如涛 修改查看时交易单元显示 end-->
            <el-table-column v-else align="center" label="交易单元">
              <template slot-scope="scope">
                <el-tooltip
                  v-if="scope.row.tradingUnitIdStatus=='ipt-err-true'"
                  class="item"
                  effect="dark"
                  :content="scope.row.tradingUnitIdStatusMsg"
                  placement="top"
                >
                  <el-select
                    style="width:100%;"
                    :class="scope.row.tradingUnitIdStatus"
                    v-model="scope.row.tradingUnitId"
                    :disabled="dialogInfo.notEdit"
                    @change="changeTradingName(scope.row)"
                  >
                    <el-option
                      v-for="(item,index) in tradingUnitOption"
                      :key="index"
                      :label="item.tradingUnitName"
                      :value="item.tradingUnitId"
                    ></el-option>
                  </el-select>
                </el-tooltip>
                <el-select
                  v-else
                  style="width:100%;"
                  :disabled="dialogInfo.notEdit"
                  v-model="scope.row.tradingUnitId"
                  @change="changeTradingName(scope.row)"
                >
                  <el-option
                    v-for="(item,index) in tradingUnitOption"
                    :key="index"
                    :label="item.tradingUnitName"
                    :value="item.tradingUnitId"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <!-- 2019-10-29   #2353  康如涛 修改查看时客户名称显示 start-->
            <el-table-column v-if="dialogInfo.status == 'view' && announcementInfo.tradeWayCode!='jyfs04'" align="center" label="客户名称" >
              <template slot-scope="scope">
                <el-input :disabled="dialogInfo.notEdit" v-model="scope.row.customerName"></el-input>
              </template>
            </el-table-column>
            <!-- 2019-10-29   #2353  康如涛 修改查看时客户名称显示 end-->
            <el-table-column v-if="dialogInfo.status != 'view' && announcementInfo.tradeWayCode!='jyfs04'" align="center" label="客户名称">
              <template slot-scope="scope">
                <el-tooltip
                  v-if="scope.row.customerIdStatus=='ipt-err-true'"
                  class="item"
                  effect="dark"
                  :content="scope.row.customerIdStatusMsg"
                  placement="top"
                >
                  <el-select
                    filterable
                    clearable
                    style="width:100%;"
                    :class="scope.row.customerIdStatus"
                    v-model="scope.row.customerId"
                    :disabled="dialogInfo.notEdit"
                    @change="changeCustomerName(scope.row)"
                  >
                    <el-option
                      v-for="(item,index) in customerNameOptionData"
                      :key="index"
                      :label="item.customerName"
                      :value="item.customerId"
                    ></el-option>
                  </el-select>
                </el-tooltip>
                <el-select
                  v-else
                  style="width:100%;"
                  filterable
                  clearable
                  :class="scope.row.mobilePhoneStatus"
                  v-model="scope.row.customerId"
                  :disabled="dialogInfo.notEdit"
                  @change="changeCustomerName(scope.row)"
                >
                  <el-option
                    v-for="(item,index) in customerNameOptionData"
                    :key="index"
                    :label="item.customerName"
                    :value="item.customerId"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <!-- #4195 gaoaining 2020-06-05 添加报价阶段 start -->
      <el-table-column v-if="dialogInfo.notEdit && announcementInfo.tradeWayCode=='jyfs04'" align="center" label="报价阶段">
        <template slot-scope="scope">
          <!-- <el-input :disabled="dialogInfo.notEdit" v-model="scope.row.quotationPeriodName"></el-input> -->
          <el-select
              style="width:100%;"
              v-model="scope.row.quotationPeriod"
              :disabled="dialogInfo.notEdit"
            >
              <el-option
                v-for="(item,index) in quotationPeriodOption"
                :key="index"
                :label="item.quotationPeriodName"
                :value="item.quotationPeriodCode"
              ></el-option>
            </el-select>
        </template>
      </el-table-column>

      <el-table-column v-if="!dialogInfo.notEdit && announcementInfo.tradeWayCode=='jyfs04'"  align="center" label="报价阶段">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.quotationPeriodStatus=='ipt-err-true'"
            class="item"
            effect="dark"
            :content="scope.row.quotationPeriodStatusMsg"
            placement="top"
          >
            <el-select
              style="width:100%;"
              :class="scope.row.quotationPeriodStatus"
              v-model="scope.row.quotationPeriod"
              :disabled="dialogInfo.notEdit"
              @change="changeQuotationPeriod($event, scope.row)"
            >
              <el-option
                v-for="(item,index) in quotationPeriodOption"
                :key="index"
                :label="item.quotationPeriodName"
                :value="item.quotationPeriodCode"
              ></el-option>
            </el-select>
          </el-tooltip>
          <el-select
            v-else
            style="width:100%;"
            :disabled="dialogInfo.notEdit"
            v-model="scope.row.quotationPeriod"
            @change="changeQuotationPeriod($event, scope.row)"
          >
            <el-option
              v-for="(item,index) in quotationPeriodOption"
              :key="index"
              :label="item.quotationPeriodName"
              :value="item.quotationPeriodCode"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
       <!-- #4195 gaoaining 2020-06-05 添加报价阶段验证 end -->
            <!-- 2020-06-04 #4161  qinhz 发电侧报价方案-交易品种为省内直接交易,交易方式为双边协商-新增购电侧交易单元字段 start-->
            <el-table-column align="center" width="120px" v-if="announcementInfo.tradeVarietyCode == 'jypz01' && (announcementInfo.tradeWayCode == 'jyfs01' || announcementInfo.tradeWayCode == 'jyfs03') && isShow" label="购电侧交易单元">
              <template slot-scope="scope">
                <el-select
                  style="width:100%;"
                  v-model="scope.row.powerPurchaseUnitCode"
                  @change="tradingUnit($event, scope.row)"
                  clearable
                  :disabled="dialogInfo.notEdit"
                >
                  <el-option
                    v-for="(item, index) in powerTestTransactionUnit"
                    :key="index"
                    :label="item.propName"
                    :value="item.propCode"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <!-- 2020-06-04 #4161  qinhz 发电侧报价方案-交易品种为省内直接交易,交易方式为双边协商-新增购电侧交易单元字段 end-->
            <el-table-column align="center" width="160" label="申报电量">
              <template slot-scope="scope">
                <el-tooltip
                  v-if="scope.row.declarationElectricityStatus=='ipt-err-true'"
                  class="item"
                  effect="dark"
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
            <el-table-column align="center" width="160" label="申报电价">
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

            <el-table-column align="center" width="120px" label="操作" v-if="!dialogInfo.notEdit">
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
        </el-collapse-item>
      </el-collapse>
    </div>

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
    <import-resolution ref="importResolution" :announcementInfo="announcementInfo" :isShow="isShow"></import-resolution>
  </div>
</template>
<script>
import {
  deleteInfoById,
  getcustomerId,
  getSchemeDetail,
  importTemplate,
  exportDetail,
  getDetailListBySchemeId,
  getValueByOrgIdAndCode, //是否启用审批流
  getPowerTestTransactionUnit, //获取购电侧交易单元
  addBeforeUpload
} from "@common/api/business/bilateralNegotiation/index";
import { getToken } from "@common/utils/auth";
import { mapGetters } from "vuex";
import { getOrgByName } from "@common/api/admin/orgStruManage/index";
import { getUnitMap, getUnitMapByModelCode } from "@common/utils/index";
import importResolution from "./ImportResolution";
export default {
  name: "provinceTrade",
  components: {
    importResolution
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
    tradingUnitOption: {
      type: Array
    },
    detailListData: {
      type: Array
    },
    unitMaps: {
      type: Object
    }
    // schemeNameCode: {
    //   type: Object
    // }
  },
  data() {
    return {
      quotationPeriodOption:[
        {quotationPeriodName:'第一阶段',quotationPeriodCode:'jd01'},
        {quotationPeriodName:'第二阶段',quotationPeriodCode:'jd02'}
        ],//#4195 gaoaining 2020-06-09
      powerTestTransactionUnit: [], //购电侧交易单元
      importTypeDialog: false,
      external: false,
      innerTableList: [],
      activeNames: ["1", "2"],
      isErr: false,
      listLoading: false,
      tableKey: 0,
      tableList: [],
      customerNameOptionData: [],
      announcementInfoData: this.announcementInfo,
      form: {
        detailId: "",
        declarationElectricity: "",
        declarationElectricityPrices: "",
        fdOrgId: "",
        fdOrgName: "",
        tradingUnitId: "",
        tradingUnitName: "",
        customerId: "",
        customerName: "",
        powerPurchaseUnitCode: "", //购电侧交易单元
        schemeDesc: "",
        quotationPeriod:"报价阶段",
        quotationPeriodName:'报价阶段名称',
      },

      unitMap: {},
      tableListIsNull: false,
      // 导入对应的数据  #4004  begin
      importantLoading: false,
      accept:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
      show_file_name: true,
      isShow: false,
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
    this.getValueByOrgIdAndCode();
    this.getPowerTestTransactionUnit();
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
    if (sessionStorage.getItem("modelCode") == "dashboard") {
      // #3010 2019-12-10 张亮三 修改首页单位不显示问题
      this.unitMap = this.unitMaps;
    } else {
      this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
    }
  },
  computed: {
    ...mapGetters(["elements", "allSubMenus"])
  },
  methods: {
    tradingUnit(data,row) {},
    // ===========吴志超 2020年05月08日修改 工单 #4004  begin===============================================================================================================
    async delGetList(id) {
      let res = await getDetailListBySchemeId({ schemeId: id });
      this.tableList = res.data.detailList.fa_01;
    },
    async getValueByOrgIdAndCode() {
      let params = {};
      params.parameterCode = "1030016";
      params.configurationId = "3";
      let res = await getValueByOrgIdAndCode(params);
      if (res == "0") {
        // 交易报价方案和结果是否展示购电侧交易单元
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    async getPowerTestTransactionUnit() {
      let id = this.announcementInfoData.tradeCenterId
      let res = await getPowerTestTransactionUnit(id);
      this.powerTestTransactionUnit = res.data
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
        this.$refs.importResolution.initImportData();
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

    init() {
      // 省内直接交易双边协商不能创建方案 #3115 frj 2019-12-11 17:31:45
      this.external = true;
      if (
        this.dialogInfo.status == "edit" ||
        this.dialogInfo.status == "change"
      ) {
        this.tableList = this.detailListData;
        //#2470 调整，当外部客户没数据时，进行添加表格并且获取内部客户
        if (this.tableList.length == 0) {
          this.addRow();
          this.setCustomerName();
          //获取内部客户的方法
          this.getSchemeDetailObj();
        } else {
          this.setCustomerName();
          this.getSchemeDetailObj();
        }
      } else if (this.dialogInfo.status == "view") {
        this.tableList = this.detailListData;
        // 查看时外部客户为空时  外部客户标签不显示  start  #2987 frj 2019-12-6 19:06:07
        if (this.tableList.length === 0) {
          this.external = false;
        } else {
          if (this.tableList.length === 1) {
            if (
              this.tableList[0].customerId == "" &&
              typeof this.tableList[0].customerName == "undefined" &&
              this.tableList[0].declarationElectricity == "" &&
              this.tableList[0].declarationElectricityPrices == "" &&
              this.tableList[0].schemeDesc == "" &&
              this.tableList[0].tradingUnitId == "" &&
              typeof this.tableList[0].tradingUnitName == "undefined"
            ) {
              this.external = false;
            } else {
              this.external = true;
            }
          } else {
            this.external = true;
          }
        }
        // 查看时外部客户为空时  外部客户标签不显示 end #2987 frj 2019-12-6 19:06:07
        this.setCustomerName();
        this.getSchemeDetailObj();
      }
    },
    getSchemeDetailObj() {
      this.innerTableList = [];
      let arg = {
        schemeNameCode: "fa_01",
        schemeId: this.announcementInfoData.schemeId
      };
      // #3215 2019-12-23 张亮三 当在首页时传递参数orgAttribute
      if (sessionStorage.getItem("modelCode") == "dashboard") {
        arg.orgAttribute = "FD";
      }
      getSchemeDetail(arg).then(res => {
        this.innerTableList = res.data;
      });
    },
    //设置客户名称下拉选项
    setCustomerName() {
      this.customerNameOptionData = [];
      let kh = {
        Name: this.customerName
      };
      getcustomerId().then(res => {
        this.customerNameOptionData = res;
      });
    },
    //检测交易单元与分段报价唯一性
    checkTradingUnit(data) {
      let isErr = false;
      //#4195 gaoaining 2020-06-10 添加当为复试撮合时‘客户名称’和‘交易单元’唯一性变成‘交易单元’和‘报价阶段’的唯一性 start
      if(this.announcementInfo.tradeWayCode != "jyfs04"){
          this.tableList.forEach(item => {
            if (data.index > item.index) {
              if (
                data.tradingUnitId == item.tradingUnitId &&
                data.customerId == item.customerId
              ) {
                //  item.tradingUnitIdStatus="ipt-err-true";

                isErr = true;
              }
            }
          });
      }else{
        this.tableList.forEach(item => {
            if (data.index > item.index) {
              if (
                data.tradingUnitId == item.tradingUnitId &&
                data.quotationPeriod == item.quotationPeriod
              ) {
                //  item.tradingUnitIdStatus="ipt-err-true";

                isErr = true;
              }
            }
          });
      }
       //#4195 gaoaining 2020-06-10 添加当为复试撮合时‘客户名称’和‘交易单元’唯一性变成‘交易单元’和‘报价阶段’的唯一性 end
      return isErr;
    },
    /**
     * @方法名称: changeTradingName
     * @功能描述: 改变交易单元的值，获取tradingUnitName
     * @参数:
     * @返回值:
     * @样式作用范围:
     * @作者: 滕超
     * @Date: 2019-11-08 09:58:08
     * @最新修改内容:
     * @LastEditTime:
     */
    changeTradingName(row) {
      this.tradingUnitOption.forEach(element => {
        if (element.tradingUnitId == row.tradingUnitId) {
          this.$set(
            this.tableList[row.index - 1],
            "tradingUnitName",
            element.tradingUnitName
          );
        }
      });
    },
    /**
     * @方法名称: changeCustomerName
     * @功能描述: 改变客户的值，获取tradingUnitName
     * @参数:
     * @返回值:
     * @样式作用范围:
     * @作者: 滕超
     * @Date: 2019-11-14 15:30:08
     * @最新修改内容:
     * @LastEditTime:
     */
    changeCustomerName(row) {
      this.customerNameOptionData.forEach(element => {
        if (element.customerId == row.customerId) {
          this.$set(
            this.tableList[row.index - 1],
            "customerName",
            element.customerName
          );
        }
      });
    },
    //根据内部客户信息检查外部数据列表
    checkTableListData() {
      let tempData = [];
      let isNull = true;
      this.tableListIsNull = false;
      let formKey = {
        tradingUnitId: "交易单元",
        customerId: "客户名称",
        declarationElectricity: "申报电量",
        declarationElectricityPrices: "申报电价"
      };
      this.tableList.forEach(item => {
        for (let key in formKey) {
          if (typeof item[key] != "undefined") {
            if (item[key] != "") {
              isNull = false;
            }
          }
        }
        if (!isNull) tempData.push(item);
      });
      if (this.innerTableList.length > 0) {
        if (tempData.length < 1) this.tableListIsNull = true;
        if (this.tableListIsNull) {
          this.isErr = false;
        } else {
          this.checkTab();
        }
      } else {
        this.checkTab();
      }
    },
    //检测表格数据
    checkTab(data) {
      this.isErr = false;
      var patrn = /^(-)?\d+(\.\d+)?$/;
      for (let i = 0, l = this.tableList.length; i < l; i++) {
        this.tableList[i].declarationElectricityStatus = "";
        this.tableList[i].declarationElectricityPricesStatus = "";
        this.tableList[i].customerIdStatus = "";
        this.tableList[i].tradingUnitIdStatus = "";
        this.tableList[i].quotationPeriodStatus = "";
        if (
          patrn.exec(this.tableList[i].declarationElectricity) == null ||
          this.tableList[i].declarationElectricity == "" ||
          typeof this.tableList[i].declarationElectricity == "undefined"
        ) {
          // 申报电量设置为非必填项  #2987 frj 2019-12-6 19:41:10
          this.tableList[i].declarationElectricityStatus = "ipt-err-true"; //交易电量
          this.tableList[i].declarationElectricityStatusMsg =
            "申报电量必须为数字";
          this.isErr = true;
        } else {
          if (this.tableList[i].declarationElectricity < 0) {
            this.tableList[i].declarationElectricityStatus = "ipt-err-true"; //交易电价
            this.tableList[i].declarationElectricityStatusMsg =
              "申报电量不能为负值";
            this.isErr = true;
          }
        }
        if (
          patrn.exec(this.tableList[i].declarationElectricityPrices) == null ||
          this.tableList[i].declarationElectricityPrices == "" ||
          typeof this.tableList[i].declarationElectricityPrices == "undefined"
        ) {
          // 交易电价设置为非必填项  #2987 frj 2019-12-6 19:41:10
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
        // 交易单元设置为非必填项  #2987 frj 2019-12-6 19:41:10
        if (
          this.tableList[i].tradingUnitId == "" ||
          typeof this.tableList[i].tradingUnitId == "undefined"
        ) {
          this.tableList[i].tradingUnitIdStatus = "ipt-err-true"; //交易单元
          this.tableList[i].tradingUnitIdStatusMsg = "请选择交易单元"; //交易单元
          this.isErr = true;
        }

        // #2719 郑文杰 客户名称设为非必填项
        //#4195 gaoaining 2020-06-10 添加当为复试撮合时不验证‘客户名称’必填
        if (
          (this.tableList[i].customerId == "" ||
          typeof this.tableList[i].customerId == "undefined") &&
          this.announcementInfo.tradeWayCode != "jyfs04"
        ) {
          this.tableList[i].customerIdStatus = "ipt-err-true"; //报价段
          this.tableList[i].customerIdStatusMsg = "请选择报价段"; //报价段
          this.isErr = true;
        }

        if (this.checkTradingUnit(this.tableList[i])) {
            this.isErr = true;
            if(this.announcementInfo.tradeWayCode != "jyfs04"){
              this.tableList[i].customerIdStatus = "ipt-err-true"; //报价段
              this.tableList[i].customerIdStatusMsg = "客户名称信息重复";
            }else{
              this.tableList[i].quotationPeriodStatus = "ipt-err-true"; //报价段
              this.tableList[i].quotationPeriodStatusMsg = "报价阶段信息重复";
            }

        }

         //#4195 gaoaining 2020-06-05 添加报价阶段验证 start
        if (
          (this.tableList[i].quotationPeriod == "" ||
            typeof this.tableList[i].quotationPeriod == "undefined") &&
          this.announcementInfo.tradeWayCode == "jyfs04"
        ) {
          this.tableList[i].quotationPeriodStatus = "ipt-err-true"; //报价阶段
          this.tableList[i].quotationPeriodStatusMsg = "请选择报价阶段"; //报价阶段
          this.isErr = true;

        }
        //#4195 gaoaining 2020-06-05 添加报价阶段验证 end
      }
    },

    //初始化表格数据
    initTableData() {
      this.tableList = [];
      this.addRow();
      this.setCustomerName();
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
      newData.transactionLine = this.announcementInfoData.tieLineId;
      newData.transactionLineName = this.announcementInfoData.tieLineName;
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
    },

   //#4195 gaoaining 2020-06-09 添加点击报价阶段方法
    changeQuotationPeriod(value,row){
       this.tableList.forEach(element => {
        this.quotationPeriodOption.forEach(elements => {
          if (elements.quotationPeriod == value) {
            this.$set(
              this.tableList[row.index - 1],
              "quotationPeriodName",
              elements.quotationPeriodName
            );
          }
        });
      });
    },
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





