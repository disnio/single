<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listQuery"
      >
        <el-row>
          <el-form-item label="区域">
            <el-select
              :disabled="qyDisabled"
              v-model="listQuery['areaCode']"
              placeholder="区域"
              :clearable="true"
              @change="changeOrgArea"
            >
              <el-option
                v-for="item in orgAreaOptions"
                :key="item.propCode"
                :label="item.orgName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="区域公司">
            <el-select
              v-model="listQuery['areaCompanyCode']"
              placeholder="请选择区域公司"
              :disabled="qyOrgDisabled"
              :clearable="true"
              @change="changeOrgAreaCom"
            >
              <el-option
                v-for="item in orgAreaComOptions"
                :key="item.propCode"
                :label="item.orgSname"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易中心">
            <el-select
              :clearable="true"
              v-model="listQuery['tradingCenterCode']"
              placeholder="请选择"
            >
              <el-option
                v-for="item in tradingCenterOptions"
                :key="item.propCode"
                :label="item.jyorgName"
                :value="item.jyorgId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易日期">
            <el-date-picker
              @change="getSearchDate"
              v-model="listQuery.transactionDate"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="标的">
            <el-select
              :clearable="true"
              v-model="listQuery['tranObjectCode']"
              placeholder="请选择"
            >
              <el-option
                v-for="item in targetOptions"
                :key="item.propCode"
                :label="item.propName"
                :value="item.propCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发电公司">
            <el-select
              :disabled="fdDisabled"
              :clearable="true"
              v-model="listQuery['orgCode']"
              placeholder="请选择"
              @change="changeTradingCycle"
            >
              <el-option
                v-for="item in orgPowerPlantOptions"
                :key="item.propCode"
                :label="item.orgName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易单元">
            <el-select
              :clearable="true"
              v-model="listQuery['tradingUnitCode']"
              placeholder="请选择"
              :disabled="isCrewTyle"
            >
              <el-option
                v-for="item in powerPlantOptions"
                :key="item.unitId"
                :label="item.unitName"
                :value="item.unitId"
              ></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="方案名称">
             <el-input style="width: 220px;" placeholder="方案名称" v-model="listQuery['schemeName']"></el-input>
          </el-form-item>
          <el-button
            class="filter-item"
            type="primary"
            v-waves
            icon="el-icon-search"
            @click="handleFilter"
          >查询</el-button>
        </el-row>
      </el-form>
      <el-button-group class="f-mb10">
        <el-button
          v-if="createQuotationScheme_btn_add"
          type="primary"
          icon="el-icon-plus"
          @click="handleAdd"
        >新增</el-button>
        <el-button
          v-if="createQuotationScheme_btn_del"
          type="primary"
          icon="el-icon-delete"
          @click="handleDeleteById"
        >删除</el-button>
        <el-button
          v-if="createQuotationScheme_btn_createCombination"
          type="primary"
          @click="createMixPlan"
        >生成组合报价方案</el-button>
      </el-button-group>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="selsChange"
        border
      >
        <el-table-column
          align="center"
          width="40px"
          type="selection"
        ></el-table-column>
        <el-table-column
          prop="index"
          align="center"
          label="序号"
          width="70px"
        ></el-table-column>
        <el-table-column
          align="center"
          label="交易日期"
        >
          <template slot-scope="scope">{{ scope.row.transactionDate}}</template>
        </el-table-column>
        <el-table-column
          align="center"
          label="标的"
        >
          <template slot-scope="scope">{{ scope.row.tranObjectName}}</template>
        </el-table-column>
        <el-table-column
          align="center"
          label="发电公司"
        >
          <template slot-scope="scope">{{scope.row.orgName}}</template>
        </el-table-column>
        <el-table-column
          align="center"
          label="交易单元"
        >
          <template slot-scope="scope">{{scope.row.tradingUnitName}}</template>
        </el-table-column>
        <el-table-column
          align="center"
          label="方案名称"
        >
          <template slot-scope="scope">
            <div style="float:left">{{scope.row.schemeName}}</div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="方案说明"
        >
          <template slot-scope="scope">
            <div style="float:left">{{scope.row.schemeDesc}}</div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="审核状态"
        >
          <template
            width="50px"
            slot-scope="scope"
          >{{scope.row.processStateName}}</template>
        </el-table-column>
        <!-- fixed="right" xxx -->
        <el-table-column
          align="center"
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <el-button
              v-if="createQuotationScheme_btn_edit && (scope.row.processState == '11' || scope.row.processState == '7')"
              type="text"
              size="small"
              @click="updateView(scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="handleViews(scope.row)"
            >查看</el-button>
            <el-button
              v-if="createQuotationScheme_btn_submitAudit && (scope.row.processState == '11' || scope.row.processState == '7')"
              type="text"
              size="small"
              @click="submitAudit(scope.row)"
            >提交审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div
        v-show="!listLoading"
        class="pagination-container"
      >
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="listQuery.page"
          :page-sizes="[10, 20, 30, 50, 100, 200, 500, 1000]"
          :page-size="listQuery.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
       custom-class="w800"
      v-drag
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="150px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item
              v-if="templateBtn"
              label="标的:"
              prop="tranObjectCode"
            >
              <el-select
                :clearable="true"
                v-model="form.tranObjectCode"
                placeholder="请选择"
                style="width:100%"
              >
                <el-option
                  v-for="item in targetOptions"
                  :key="item.propCode"
                  :label="item.propName"
                  :value="item.propCode"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="!templateBtn"
              label="标的:"
              prop="tranObjectCode"
            >
              <el-select
                disabled
                :clearable="true"
                v-model="form.tranObjectCode"
                placeholder="请选择"
                style="width:100%"
              >
                <el-option
                  v-for="item in targetOptions"
                  :key="item.propCode"
                  :label="item.propName"
                  :value="item.propCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              v-if="templateBtn"
              label="交易中心:"
              prop="tradingCenterCode"
            >
              <el-select
                :clearable="true"
                v-model="form.tradingCenterCode"
                placeholder="请选择"
                style="width:100%"
              >
                <el-option
                  v-for="item in tradingCenterOptions"
                  :key="item.propCode"
                  :label="item.jyorgName"
                  :value="item.jyorgId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              v-if="!templateBtn"
              label="交易中心:"
              prop="tradingCenterCode"
            >
              <el-select
                :clearable="true"
                disabled
                v-model="form.tradingCenterCode"
                placeholder="请选择"
                style="width:100%"
              >
                <el-option
                  v-for="item in tradingCenterOptions"
                  :key="item.propCode"
                  :label="item.jyorgName"
                  :value="item.jyorgId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="发电公司:"
              prop="orgCode"
              v-if="templateBtn"
            >
              <el-select
                :disabled="fdDisabled"
                style="width:100%"
                :clearable="true"
                v-model="form.orgCode"
                placeholder="请选择"
                @change="changeTradingCycle"
              >
                <el-option
                  v-for="item in orgPowerPlantOptions"
                  :key="item.propCode"
                  :label="item.orgName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="交易单元:"
              prop="tradingUnitCode"
              v-if="templateBtn"
            >
              <el-select
                style="width:100%"
                :clearable="true"
                v-model="form.tradingUnitCode"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in powerPlantOptions"
                  :key="item.unitId"
                  :label="item.unitName"
                  :value="item.unitId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="方案名称:"
              prop="schemeName"
            >
              <el-input
                style="width:100%"
                v-model="form.schemeName"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="交易日期:"
              prop="transactionDate"
            >
              <el-date-picker
                @change="getDate"
                style="width:100%"
                v-model="form.transactionDate"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="方案说明:">
              <el-input
                style="width:100%"
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 8}"
                v-model="form.schemeDesc"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="默认报价方案:"
              v-if="templateBtn"
            >
              <el-input
                :clearable="true"
                style="width:50%"
                v-model="form.defaultOffer"
                placeholder="请输入"
              ></el-input>
              <el-button
                type="primary"
                @click="choiceStrategy(form,'TACTICS')"
              >选择策略模板</el-button>
              <el-button
                type="primary"
                @click="HistoryProgramme('form','HISTORY')"
              >历史报价方案</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          v-if="templateBtn"
          :loading="saveBtnLoading"
          class="save-btn"
          @click="createSave('form',1)"
        >保 存</el-button>
        <el-button
          v-if="zhTemplateBtn"
          :loading="saveBtnLoading"
          class="save-btn"
          @click="createSave('form',2)"
        >保 存</el-button>
        <el-button
          class="cancel-btn"
          @click="dialogFormVisible = false"
        >关 闭</el-button>
      </div>
    </el-dialog>
    <!--编辑 -->
    <updateView
      ref="updateViewGo"
      :orgAreaOptions="orgAreaOptions"
      :orgAreaComOptions="orgAreaComOptions"
      :orgPowerPlantOptions="orgPowerPlantOptions"
      :tradingCenterOptions="tradingCenterOptions"
      :powerPlantOptions="powerPlantOptions"
      :targetOptions="targetOptions"
    ></updateView>

    <!--查询 -->
    <handleView
      ref="handleView"
      :transactionDate="time"
    ></handleView>
    <!--选择策略模板 -->
    <templateAdministration
      ref="templateAdministration"
      :orgAreaOptions="orgAreaOptions"
      :orgAreaComOptions="orgAreaComOptions"
      v-on:listenToChildEvent="viewHandleAdd"
    ></templateAdministration>
    <!--选择历史模板 -->
    <historyView
      ref="historyView"
      :orgAreaOptions="orgAreaOptions"
      :orgAreaComOptions="orgAreaComOptions"
      v-on:listenToChildEvent="viewHandleAdd"
    ></historyView>
  </div>
</template>
<script>
import {
  getUserOrgInfo,
  getAllOrgByPorgId,
  getAllOrgByAttribute,
  getDataListByOrgId, //交易中心
  getListAll // 机组
} from "@common/api/public/index";
import { parseTime } from "@common/utils/index";
import { getCrewInforList } from "@common/api/spot/settl/electricityGenerationSettl/common/index";
import updateView from "./components/schemeConfiguration";
import handleView from "./components/handleView";
import templateAdministration from "./components/templateAdministration/index";
import historyView from "./components/templateAdministration/historyView";
import { getSelectList } from "@common/api/base";
import { mapGetters } from "vuex";
import { getJydyListByOrgId } from "@common/api/spot/configure/quotationParameters/index";

import {
  getCreateQuotationScheme,
  delObj,
  addObj,
  zhAddObj,
  submit
} from "@common/api/spot/tran/quotationSchemeManage/createQuotationScheme/index";
export default {
  name:'createQuotationScheme',
  components: {
    updateView,
    handleView,
    templateAdministration,
    historyView
  },
  data() {
    return {
      // //按钮权限
      createQuotationScheme_btn_add: false, //添加
      createQuotationScheme_btn_del: false, //删除
      createQuotationScheme_btn_createCombination: false, //生成组合报价方案
      createQuotationScheme_btn_edit: false, //编辑
      createQuotationScheme_btn_submitAudit: false, //提交审核
      saveBtnLoading: false,
      time: parseTime(new Date(), "{y}-{m}-{d}"),
      listQuery: {
        page: 1,
        limit: 10,
        transactionDate: parseTime(new Date(), "{y}-{m}-{d}"),
        orgCode: "",
        tranObjectCode: "",
        areaCode: "",
        areaCompanyCode: "",
        tradingUnitCode: "",
        tradingCenterCode: "",
        schemeName: ""
      },

      //表单
      form: {
        tranObjectCode: "", //标的
        tradingUnitCode: "", //机组
        transactionDate: "",
        orgCode: "", //发电公司
        schemeName: "", //方案名称
        schemeDesc: "", //方案说明
        defaultOffer: "", //默认报价方案
        tradingCenterCode: "" //交易中心
      },
      //必选
      rules: {
        tradingCenterCode: [
          {
            required: true,
            message: "* 为必填项",
            trigger: "change"
          }
        ],
        tranObjectCode: [
          {
            required: true,
            message: "* 为必填项",
            trigger: "change"
          }
        ],
        transactionDate: [
          {
            required: true,
            message: "* 为必填项",
            trigger: "change"
          }
        ],
        orgCode: [
          {
            required: true,
            message: "* 为必填项",
            trigger: "change"
          }
        ],
        schemeName: [
          {
            required: true,
            message: "* 为必填项",
            trigger: "change"
          }
        ],
        tradingUnitCode: [
          {
            required: true,
            message: "* 为必填项",
            trigger: "change"
          }
        ]
      },
      tableData: [], //报价方案主表信息
      //组织下拉
      orgAreaOptions: [], //区域
      orgAreaComOptions: [], //区域公司
      orgPowerPlantOptions: [], //发电公司数据
      tradingCenterOptions: [], //交易中心数据
      powerPlantOptions: [], //交易单元
      dialogStatus: "",
      textMap: {
        create: "新建机组报价方案",
        zhCreate: "新建组合报价方案"
      },
      //标的数据
      targetOptions: [],
      parentOrgId: "001", //父节点ID
      templateBtn: true, //新增模板按钮
      zhTemplateBtn: true,
      dialogFormVisible: false, //新增弹框状态
      qyDisabled: false,
      qyOrgDisabled: false,
      fdDisabled: false,
      isCrewTyle: true,
      listLoading: false, //加载
      templateId: "", //默认报价模板id
      sels: [],
      content: [],
      templateType: "",
      total: 0
    };
  },
  computed: {
    ...mapGetters(["elements", "orgId"])
  },
  created() {
    this.initBtn();
    this.init();
  },
  methods: {
    //初始化
    init() {
      this.getUserInformation();
      this.initSearchSelect();
    },
    // //初始化按钮
    initBtn() {
      this.createQuotationScheme_btn_add = this.elements[
        "spotCreateQuotationScheme:btn_add"
      ];
      this.createQuotationScheme_btn_del = this.elements[
        "spotCreateQuotationScheme:btn_del"
      ];
      this.createQuotationScheme_btn_createCombination = this.elements[
        "spotCreateQuotationScheme:btn_createCombination"
      ];
      this.createQuotationScheme_btn_edit = this.elements[
        "spotCreateQuotationScheme:btn_edit"
      ];
      this.createQuotationScheme_btn_submitAudit = this.elements[
        "spotCreateQuotationScheme:btn_submitAudit"
      ];
    },
    // =========获取用户信息,根据用户信息获取区域，根据区域获取对应的区域公司b==================================================
    // 获取用户信息
    getUserInformation() {
      getUserOrgInfo().then(response => {
        if (response.length == 1) {
          this.qyDisabled = false;
          this.qyOrgDisabled = false;
          let parame = {
            attributeTypeCode: "zzjgsx05"
          };
          getAllOrgByAttribute(parame).then(res => {
            this.orgAreaOptions = res;
          });
        } else if (response.length == 2) {
          this.qyDisabled = true;
          this.qyOrgDisabled = false;
          this.getUserInitDate('2');
          this.listQuery.areaCode = response[1].id;
        } else if (response.length == 3) {
          this.qyDisabled = true;
          this.qyOrgDisabled = true;
          this.listQuery.areaCode = response[1].id;
          this.listQuery.areaCompanyCode = response[2].id;
          this.getUserInitDate('3');
        } else if (response.length == 4) {
          this.qyDisabled = true;
          this.qyOrgDisabled = true;
          this.fdDisabled = true;
          this.listQuery.areaCode = response[1].id;
          this.listQuery.areaCompanyCode = response[2].id;
          // 2019.12.19 chenf #594 数据隔离          ------------     start -----------
           // 如果为发电公司 
        if( response[3].attributeTypeCode === "zzjgsx02"){
             this.orgPowerPlantOptions = [{ id: response[3].id, orgName: response[3].orgName }];
             this.listQuery.orgCode = response[3].id
             this.isCrewTyle = false;
             this.changeTradingCycle(this.listQuery.orgCode)
          }else{
             this.orgPowerPlantOptions = []
          }
           // 2019.12.19 chenf #594 数据隔离          ------------     end -----------
          this.getUserInitDate('4');
        }
      });
    },
    //获取数据
    getUserInitDate(flag) {
      let parame = {
        attributeTypeCode: "zzjgsx05"
      };
      getAllOrgByAttribute(parame).then(res => {
        this.orgAreaOptions = res;
      });
      let parmes = {
        attributeTypeCode: "zzjgsx03",
        pOrgId: this.listQuery.areaCode
      };
      getAllOrgByPorgId(parmes).then(res => {
        this.orgAreaComOptions = res;
        if( flag == '4'){

        }else{
          this.changeOrgAreaCom(this.listQuery.areaCompanyCode);
        }
      }); //区域公司
      let query = {
        orgId: this.listQuery.areaCompanyCode
      };
      //获取交易中心数据
      getDataListByOrgId(query).then(res => {
        this.tradingCenterOptions = res;
        this.listQuery.tradingCenterCode = this.tradingCenterOptions[0].jyorgId
      })
      let _this = this
      setTimeout(function(){
        _this.getList();
      },500)
    },
    initSearchSelect() {
      //获取标的数据
      getSelectList("TRAN_OBJECT").then(res => {
        this.targetOptions = res;
      });
    },
    //点击区域公司
    changeOrgArea(val) {
      if (val == this.parentOrgId) {
        this.listQuery.areaCompanyCode = "";
        (this.listQuery.tradingCenterCode = ""), (this.listQuery.orgCode = "");
        this.orgAreaComOptions = [];
      } else {
        this.listQuery.areaCompanyCode = "";
        (this.listQuery.tradingCenterCode = ""), (this.listQuery.orgCode = "");
        this.orgAreaComOptions = [];
        let condition = {
          pOrgId: val,
          attributeTypeCode: "zzjgsx03"
        };
        this.orgAreaComOptions = [];
        getAllOrgByPorgId(condition).then(res => {
          this.orgAreaComOptions = res;
        });
      }
    },
    //点击区域公司获取电厂数据
    changeOrgAreaCom(val) {
      this.$set(this.listQuery, "tradingCenterCode", "");
      this.listQuery.orgCode = "";
      let parmes = {
        pOrgId: val,
        attributeTypeCode: "zzjgsx02"
      };
      getAllOrgByPorgId(parmes).then(res => {
        this.orgPowerPlantOptions = res;
      });
      if (val != "") {
        let query = {
          orgId: val
        };
        //获取交易中心数据
        getDataListByOrgId(query).then(res => {
          this.tradingCenterOptions = res;
          this.listQuery.tradingCenterCode = this.tradingCenterOptions[0].jyorgId
        });
      }
    },
    //点击发电公司匹配对应的交易单元
    changeTradingCycle(val) {
      this.listQuery.tradingUnitCode = "";
      this.form.tradingUnitCode = "";
      this.powerPlantOptions = [];
      if (val != "" && typeof val != "undefined") {
        let parent = {
          porgId: val
        };
        getListAll(parent).then(res => {
          this.powerPlantOptions = res.data;
        });
        this.isCrewTyle = false;
      } else {
        this.isCrewTyle = true;
      }
    },
    //子组件向父传入值
    childEvent(data) {
      if (data.type == "history") {
        this.templateType = "HISTORY";
        this.form.defaultOffer = data[0].schemeName;
        this.templateId = data[0].schemeId;
      } else {
         this.templateType = "TACTICS";
        this.form.defaultOffer = data[0].templateName;
        this.templateId = data[0].templateId;
      }
    },
    //查询
    handleFilter() {
      this.getList();
    },
    //列表 =================================================
    getList() {
      // console.log(this.listQuery)
      getCreateQuotationScheme(this.listQuery).then(response => {
        let items = response.data.rows.map((item, index) => {
          item.index =
            index + 1 + (this.listQuery.page - 1) * this.listQuery.limit;
          return item;
        });
        this.tableData = items;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },

    //删除 ==========================================================
    handleDeleteById() {
      if (this.sels.length < 1) {
        this.$notify({
          title: "提示信息",
          message: "请勾选至少一条信息进行删除!",
          type: "warning",
          duration: 2000
        });
        return false;
      }
      let Parameters = {
        ids: this.sels
      };
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delObj(Parameters)
            .then(res => {
              this.setRequestInfo(res);
            })
            .catch(function(error) {
              console.log("发生错误！", error);
            });
        })
        .catch(() => {});
    },
    //新增  ==========================================================
    handleAdd() {
      this.emptyForm();
      this.templateId = "";
      if (this.listQuery.areaCompanyCode != "") {
        this.dialogFormVisible = true; //打开新增弹框
      } else {
        this.$notify({
          title: "提示信息",
          message: "新增时需要选择区域和区域公司!",
          type: "warning",
          duration: 2000
        });
      }
      this.dialogStatus = "create";
      this.templateBtn = true;
      this.zhTemplateBtn = false;
      this.form.transactionDate = this.listQuery.transactionDate; //新增传递时间
      this.form.orgCode = this.listQuery.orgCode
    },
    //选择模板数据不清空
    viewHandleAdd(data) {
      this.dialogFormVisible = true; //打开新增弹框
      this.templateId = data.id; //默认报价方案id
      this.form.defaultOffer = data.templateName; //默认报价方案名称
    },

    //生成组合报价方案
    createMixPlan() {
      if (this.sels.length > 1) {
        var is = "true";
        var areaCode = this.content[0].areaCode;
        var areaCompanyCode = this.content[0].areaCompanyCode;
        var tranObjectCode = this.content[0].tranObjectCode;
        var tradingCenterCode = this.content[0].tradingCenterCode;

        var orgCode = this.content[0].orgCode;
        var tradingUnitCode = this.content[0].tradingUnitCode

        //检测 标的、区域公司、交易中心  必须一致
        this.content.forEach(element => {
          if (
            element.areaCode === areaCode &&
            element.areaCompanyCode === areaCompanyCode &&
            element.tranObjectCode === tranObjectCode &&
            element.tradingCenterCode === tradingCenterCode
          ) {
            return false;
          } else {
            is = "false";
          }
        });

        for (let i = 0; i < this.content.length - 1; i++){
           if (this.content[0].orgCode == this.content[i+1].orgCode && this.content[0].tradingUnitCode == this.content[i+1].tradingUnitCode) {
            //  console.log("完全一样的");
             is = "cftest"
           }
        }
        if (is === "true") {
          this.emptyForm();
          this.dialogFormVisible = true;
          this.templateBtn = false;
          this.zhTemplateBtn = true;
          this.dialogStatus = "zhCreate";
          this.form.transactionDate = this.listQuery.transactionDate; //新增传递时间
          this.form.tranObjectCode = tranObjectCode;
          this.form.tradingCenterCode = tradingCenterCode;
        } else if(is === "false") {
          this.$notify({
            title: "提示信息",
            message: "请选择标的、区域公司、交易中心一致的报价方案!",
            type: "warning",
            duration: 2000
          });
        } else if(is === "cftest"){
          this.$notify({
            title: "提示信息",
            message: "交易单元重复，请重新选择",
            type: "warning",
            duration: 2000
          });
        }
      } else {
        this.$notify({
          title: "提示信息",
          message: "请勾选至少两条模板进行组合!",
          type: "warning",
          duration: 2000
        });
      }
    },
    //新增保存
    createSave(formName, type) {
      /*console.log(this.saveBtnLoading);
      if(this.saveBtnLoading) return false;*/
      this.saveBtnLoading = true;
      const set = this.$refs;
      if (type === 1) {
        set[formName].validate(valid => {
          if (valid) {
            //this.saveBtnLoading = true;
            this.listLoading = true;
            let obj = {
              areaCode: this.listQuery.areaCode,
              areaCompanyCode: this.listQuery.areaCompanyCode,
              tradingUnitCode: this.form.tradingUnitCode,
              orgCode: this.form.orgCode,
              schemeDesc: this.form.schemeDesc,
              schemeName: this.form.schemeName,
              tranObjectCode: this.form.tranObjectCode,
              transactionDate: this.form.transactionDate,
              tradingCenterCode: this.form.tradingCenterCode
            };
            if (this.form.defaultOffer != "") {
              (obj.templateId = this.templateId),
                (obj.templateType = this.templateType);
            }
            addObj(obj).then(res => {
              //this.saveBtnLoading = false;
              this.dialogFormVisible = false;
              this.setRequestInfo(res);
              this.saveBtnLoading = false;
            });
          } else {
            this.saveBtnLoading = false;
            return false;
          }
        });
      } else {
        set[formName].validate(valid => {
          if (valid) {
            //this.saveBtnLoading = true;
            this.listLoading = true;
            let obj = {
              areaCode: this.listQuery.areaCode,
              areaCompanyCode: this.listQuery.areaCompanyCode,
              schemeDesc: this.form.schemeDesc,
              schemeName: this.form.schemeName,
              tranObjectCode: this.form.tranObjectCode,
              transactionDate: this.form.transactionDate,
              tradingCenterCode: this.form.tradingCenterCode,
              detailIds: this.sels
            };
            zhAddObj(obj).then(res => {
              //this.saveBtnLoading = false;
              this.dialogFormVisible = false;
              this.setRequestInfo(res);
              this.saveBtnLoading = false;
            });
          } else {
            this.saveBtnLoading = false;
            return false;
          }
        });
      }
    },

    //跳转策略模板
    choiceStrategy(form, type) {
      // this.$router.push({
      //   path: "/spot/tran/quotationSchemeManage/createQuotationScheme/components/templateAdministration",
      //   query: { type: "TACTICS" }
      // })
      if (this.form.tradingCenterCode) {
        let Parameters = {
          areaCode: this.listQuery.areaCode,
          areaCompanyCode: this.listQuery.areaCompanyCode,
          tradingCenterCode: this.form.tradingCenterCode,
          beginDate: this.form.transactionDate,
          endDate: this.form.transactionDate
        };
        this.$refs.templateAdministration.initUpdateDialog(Parameters);
      } else {
        this.$notify({
          title: "提示信息",
          message: "交易中心为必填信息!",
          type: "warning",
          duration: 2000
        });
      }
    },
    //跳转历史报价方案
    HistoryProgramme(formName, type) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          let Parameters = {
            areaCode: this.listQuery.areaCode,
            areaCompanyCode: this.listQuery.areaCompanyCode,
            orgCode: this.form.orgCode,
            tradingCenterCode: this.form.tradingCenterCode,
            tradingUnitCode: this.form.tradingUnitCode,
            tranObjectCode: this.form.tranObjectCode,
            transactionDate: this.form.transactionDate
          };
          this.$refs.historyView.initUpdateDialog(Parameters);
        } else {
          this.$notify({
            title: "提示信息",
            message: "必填项未填写完整!",
            type: "warning",
            duration: 2000
          });
        }
      });

      //  this.templateType = type
      // this.$router.push({
      //   path: "/spot/settl/electricityGenerationSettl/historyView",
      //   query: { type: "HISTORY" }
      // });
    },

    //清空数据
    emptyForm() {
      this.listLoading = false;
      //(this.listQuery.orgCode = ""),
//(this.listQuery.tradingUnitCode = ""),
        //(this.powerPlantOptions = []);
      this.form = {
        tranObjectCode: "",
        orgCode: "",
        transactionDate: "",
        tradingUnitCode: "",
        schemeName: "",
        schemeDesc: "",
        defaultOffer: ""
      };
      if (typeof this.$refs.form != "undefined") {
        this.$refs.form.resetFields(); //移除校验结果并重置字段值
      }
    },
    //提交审核
    submitAudit(row) {
      let Parameters = row;
      submit(Parameters).then(res => {
        this.setRequestInfo(res);
      });
    },
    //编辑 ====================================================================
    updateView(row) {
      this.$refs.updateViewGo.initUpdateDialog(row);
    },
    //返回状态值刷新列表
    setRequestInfo(res) {
      this.listLoading = false;
      if (res.rel) {
        this.$notify({
          title: res.msg,
          message: res.msg,
          type: "success",
          duration: 2000
        });
        this.getList();
      } else {
        this.$notify({
          title: res.msg,
          message: res.msg,
          type: "warning",
          duration: 2000
        });
      }
    },
    //查看
    handleViews(row) {
      this.$refs.handleView.initUpdateDialog(row);
      // this.$store.commit("SET_ROUTER_QUERY", val);
      // this.$router.push({
      //   path:
      //     "/spot/tran/quotationSchemeManage/createQuotationScheme/components/quotationSchemeView"
      // });
    },
    // 复选框点击
    selsChange(val) {
      let id = [];
      let information = [];
      val.forEach(element => {
        id.push(element.schemeId);
        information.push(element);
      });
      this.sels = id;
      this.content = information;
    },
    //列表分页变更条数
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    //列表分页切换
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    //点击时间插件转换时间格式
    getSearchDate(val) {
      if (val) {
        this.listQuery.transactionDate = parseTime(val, "{y}-{m}-{d}");
        this.time = parseTime(val, "{y}-{m}-{d}");
      }
    },
    getDate(val) {
      if (val) {
        this.form.transactionDate = parseTime(val, "{y}-{m}-{d}");
      }
    }
  }
};
</script>
<style>
</style>
