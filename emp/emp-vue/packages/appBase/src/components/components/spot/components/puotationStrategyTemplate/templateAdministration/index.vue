<template>
  <div>
    <div v-if="!btnStatus" class="filter-container">
      <el-form :inline="true" :model="listQuery" label-width="70px">
        <el-form-item label="区域">
          <el-select
            clearable
            :disabled="qyDisabled"
            v-model="listQuery['areaCode']"
            placeholder="区域"
            @change="areaCodeSelectChange"
          >
            <el-option
              v-for="item in orgAreaOptions"
              :key="item.id"
              :label="item.orgName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区域公司">
          <el-select
            @change="areaCompanyCodeSelcctChange"
            clearable
            :disabled="qyOrgDisabled"
            v-model="listQuery['areaCompanyCode']"
            placeholder="请选择区域公司"
          >
            <el-option
              v-for="item in orgAreaComOptions"
              :key="item.id"
              :label="item.orgSname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易中心">
          <el-select
            clearable
            v-model="listQuery['tradingCenterCode']"
            placeholder="请选择"
            :disabled="tradingCenterDisabled"
          >
            <el-option
              v-for="item in tradingCenterOptions"
              :key="item.index"
              :label="item.jyorgName"
              :value="item.jyorgId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select
            clearable
            :disabled="sdisabled"
            v-model="listQuery['templateState']"
            placeholder="请选择"
          >
            <el-option
              v-for="item in auditStatusOptions"
              :key="item.index"
              :label="item.propName"
              :value="item.propCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
      </el-form>
    </div>
    <div v-if="!btnStatus" class="filter-container">
      <el-button-group>
        <el-button
          v-if="spotTemplateAdministration_btn_add"
          class="filter-item"
          @click="handleCreate"
          type="primary"
          icon="el-icon-plus"
        >新增</el-button>
        <el-button
          v-if="spotTemplateAdministration_btn_del"
          class="filter-item"
          @click="handleDelete"
          type="primary"
          icon="el-icon-delete"
        >删除</el-button>
      </el-button-group>
    </div>
    <div>
      <el-table
        ref="multipleTable"
        @selection-change="getSelectionIds"
        :key="tableKey"
        :data="tableData"
        v-loading.body="listLoading"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column type="selection" align="center" width="55"></el-table-column>
        <el-table-column prop="index" label="序号" align="center" width="70px"></el-table-column>
        <el-table-column align="center" label="模板名称">
          <template slot-scope="scope">
            <div>{{scope.row.templateName}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="模板描述">
          <template slot-scope="scope">
            <div>{{scope.row.templateDesc}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="审核状态">
          <template slot-scope="scope">
            <div>{{scope.row.templatestateName}}</div>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="有效起日期">
          <template slot-scope="scope">
            <div>{{scope.row.validBeginDate}}</div>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="有效止日期">
          <template slot-scope="scope">
            <div>{{scope.row.validEndDate}}</div>
          </template>
        </el-table-column>
        <!-- fixed="right" -->
        <el-table-column align="center" label="操作" width="230">
          <template slot-scope="scope">
            <el-button
              v-if="!btnStatus&&templateAdministration_btn_config_strategy&&scope.row.templateState!='10'&&scope.row.templateState!='9'&&scope.row.templateState!='12'"
              size="small"
              type="text"
              @click="handleConfigure(scope.row)"
            >配置策略</el-button>
            <el-button size="small" type="text" @click="handleCheck(scope.row)">查看策略</el-button>
            <el-button
              v-if="!btnStatus&&spotTemplateAdministration_btn_submit_audit&&(scope.row.templateState=='11' || scope.row.templateState=='7')"
              size="small"
              type="text"
              @click="submitAudit(scope.row)"
            >提交审核</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="!listLoading" class="pagination-container">
      <el-button
        v-if="btnStatus"
        style="float:left;"
        class="filter-item"
        @click="handelClickChoose"
        type="primary"
        icon="el-icon-plus"
      >确认选择</el-button>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50,100,200,500,1000]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :before-close="clearForm"
      v-loading="formLoading"
      custom-class="w640"
      :close-on-click-modal="false"
      v-drag
    >
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="交易中心" prop="tradingCenterCode">
              <el-select clearable v-model="form.tradingCenterCode" placeholder="请选择交易中心">
                <el-option
                  v-for="item in tradingCenterOptions"
                  :key="item.index"
                  :label="item.jyorgName"
                  :value="item.jyorgId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="模板名称" prop="templateName">
              <el-input v-model="form.templateName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="模板说明">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                :maxlength="400"
                v-model="form.templateDesc"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="生效时间" prop="validBeginDate">
              <el-date-picker
                @change="getValidBeginDate"
                v-model="form.validBeginDate"
                type="date"
                placeholder="请选择"
                style="width:100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="失效时间" prop="validEndDate">
              <el-date-picker
                @change="getValidEndDate"
                v-model="form.validEndDate"
                type="date"
                placeholder="请选择"
                style="width:100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div v-if="this.dialogStatus!='check'" slot="footer" class="dialog-footer">
        <el-button :loading="saveBtnLoding" class="save-btn" @click="handleSave('form')">保 存</el-button>
        <el-button class="cancel-btn" @click="cancel('form')">关 闭</el-button>
      </div>
    </el-dialog>
    <!-- 时间输入错误提示框 -->
    <configurationStrategyDialog ref="configurationStrategyDialog"></configurationStrategyDialog>
  </div>
</template>

<script>
import {
  getTemplate,
  addTemplateObj,
  delObj,
  startProcess,
  getTemplateByDateRange
} from "@common/api/spot/configure/puotationStrategyTemplate/templateAdministration/index";
import {
  getUserOrgInfo,
  getAllOrgByPorgId,
  getAllOrgByAttribute,
  getDataListByOrgId
} from "@common/api/public/index";
import { parseTime } from "@common/utils/index";
import { mapGetters } from "vuex";
import { getSelectList } from "@common/api/base";
// import { page } from "@/api/basicData/tMdataJyorg/index"; //添加的交易中心的接口 新增的交易中心条件
export default {
  name: "templateAdministration",
  props: {
    btnStatus: { type: Boolean }
  },
  components: {
    configurationStrategyDialog: () =>
      import("./components/configurationStrategyDialog")
  },
  data() {
    return {
   
      sdisabled: false,
      saveBtnLoding: false,
      qyDisabled: false,
      qyOrgDisabled: false,
      tradingCenterDisabled: false,
      form: {
        areaCode: "", //区域编码(base_org/大区)
        areaCompanyCode: "", //区域公司编码(base_org/区域公司)
        templateDesc: "", //模板描述
        tradingCenterCode: "", //交易中心名称 新增的交易中心条件
        templateName: "", //模板名称
        validBeginDate: "", //起始有效时间
        validEndDate: "" //终止有效时间
      },
      formLoading: false,
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        create: "新建报价策略模板"
      },
      tableKey: 0,
      tableData: [],
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        areaCode: "",
        areaCompanyCode: "",
        templateState: "",
        tradingCenterCode: "" //新增的交易中心条件
      },
      beginDate: "", //开始时间
      endDate: "", //结束时间
      total: 0,
      orgAreaOptions: [],
      orgAreaComOptions: [],
      auditStatusOptions: [],
      tradingCenterOptions: [], //新增交易中心数组  新增的交易中心条件
      first: "",
      rules: {
        tradingCenterCode: [
          {
            required: true,
            message: "请输入交易中心",
            trigger: "blur"
          }
        ], //新增交易中心
        templateName: [
          {
            required: true,
            message: "请输入模板名称",
            trigger: "blur"
          }
        ],
        validBeginDate: [
          {
            required: true,
            message: "请输入生效时间",
            trigger: "blur"
          }
        ],
        validEndDate: [
          {
            required: true,
            message: "请输入失效时间",
            trigger: "blur"
          }
        ]
      },
      orgAreaComId: "",
      delIds: "",
      publicdata: {},
      templateAdministration_btn_config_strategy: false,
      spotTemplateAdministration_btn_add: false,
      spotTemplateAdministration_btn_del: false,
      spotTemplateAdministration_btn_submit_audit: false
    };
  },
  computed: {
    ...mapGetters(["elements"])
  },
  created() {
    if (!this.btnStatus) {
      this.init();
    }
    this.spotTemplateAdministration_btn_add = this.elements[
      "spotTemplateAdministration:btn_add"
    ];
    this.spotTemplateAdministration_btn_del = this.elements[
      "spotTemplateAdministration:btn_del"
    ];
    this.spotTemplateAdministration_btn_submit_audit = this.elements[
      "spotTemplateAdministration:btn_submit_audit"
    ];
    this.templateAdministration_btn_config_strategy = this.elements[
      "spotTemplateAdministration:btnconfig_strategy"
    ];
  },

  methods: {
    //从其他页面获取的data
    getData(data) {
   
      this.parentmethod(data);
    },
    async parentmethod(data) {
      // 报价方案编辑选择报价策略，删掉表头信息，直接展示表格 工单 #443 吴志超 2019年11月5日 begin
      // getUserOrgInfo()
      //   .then(response => {
      //     if (response.length == 1) {
      //       // =======1=====================
      //       this.getOrg();
      //       this.qyDisabled = false;
      //       this.qyOrgDisabled = false;
      //     } else if (response.length == 2) {
      //       // ============2=================
      //       this.qyDisabled = true;
      //       this.qyOrgDisabled = false;
      //       this.listQuery.areaCode = response[1].id;
      //     } else if (response.length == 3) {
      //       // ======3======================
      //       this.qyDisabled = true;
      //       this.qyOrgDisabled = true;
      //       this.listQuery.areaCode = response[1].id;
      //       this.listQuery.areaCompanyCode = response[2].id;
      //       let parame = {
      //         attributeTypeCode: "zzjgsx05"
      //       };
      //       getAllOrgByAttribute(parame).then(res => {
      //         this.orgAreaOptions = res;
      //       });
      //       let parmes = {
      //         attributeTypeCode: "zzjgsx03",
      //         pOrgId: this.listQuery.areaCode
      //       };
      //       getAllOrgByPorgId(parmes).then(res => {
      //         this.orgAreaComOptions = res;
      //       });
      //       getSelectList("state").then(res => {
      //         this.auditStatusOptions = res;
      //       });
      //       let query = { orgId: this.listQuery.areaCompanyCode };
      //       getDataListByOrgId(query).then(res => {
      //         this.tradingCenterOptions = res;
      //       }); //获取交易中心的下拉值  新增的交易中心条件
      //     } else if (response.length == 4) {
      //       // =========4==========================
      //       this.qyDisabled = true;
      //       this.qyOrgDisabled = true;
      //       this.listQuery.areaCode = response[1].id;
      //       this.listQuery.areaCompanyCode = response[2].id;
      //       let parame = {
      //         attributeTypeCode: "zzjgsx05"
      //       };
      //       getAllOrgByAttribute(parame).then(res => {
      //         this.orgAreaOptions = res;
      //       });
      //       let parmes = {
      //         attributeTypeCode: "zzjgsx03",
      //         pOrgId: this.listQuery.areaCode
      //       };
      //       getAllOrgByPorgId(parmes).then(res => {
      //         this.orgAreaComOptions = res;
      //       });
      //       getSelectList("state").then(res => {
      //         this.auditStatusOptions = res;
      //       });
      //       let query = { orgId: this.listQuery.areaCompanyCode };
      //       getDataListByOrgId(query).then(res => {
      //         this.tradingCenterOptions = res;
      //       }); //获取交易中心的下拉值  新增的交易中心条件
      //     }
      //   })
      //   .then(res => {
      this.listQuery.areaCode = data.areaCode;
      this.listQuery.areaCompanyCode = data.areaCompanyCode;
      this.listQuery.tradingCenterCode = data.tradingCenterCode;
      this.beginDate = data.beginDate;
      this.endDate = data.endDate;
      this.listQuery.templateState = "10";
      this.sdisabled = true;
      this.tradingCenterDisabled = true;
      this.handleFilter();
      // });
      // 报价方案编辑选择报价策略，删掉表头信息，直接展示表格 工单 #443 吴志超 2019年11月5日 end
    },
    getSelectionIds(val) {
      if (val) {
        this.publicdata = val;
        let id = [];
        val.forEach(element => {
          id.push(element.templateId + "");
        });
        this.delIds = id;
      }
    },
    handelClickChoose() {
      if (this.publicdata.length === 1) {
        this.$emit("listenToChildEvent", this.publicdata);
        this.$refs.multipleTable.clearSelection();
      } else {
        this.$notify({
          title: "提示信息",
          message: "策略只能选择一条机组数据！",
          type: "warning",
          duration: 2000
        });
        this.$refs.multipleTable.clearSelection();
      }
    },
    // ===================================================================================
    // 2019年11月04日 吴志超 修改集团用户进入权限问题 #465 begin
    init() {
      // 获取用户信息;
      getUserOrgInfo().then(response => {
        if (response.length == 1) {
          // =============1==================

          this.initSelect();
          this.getOrg();
          this.qyDisabled = false;
          this.qyOrgDisabled = false;
        } else if (response.length == 2) {
          // =========2=================
          this.qyDisabled = false;
          this.qyOrgDisabled = false;
          this.listQuery.areaCode = response[1].id;
        } else if (response.length == 3) {
          this.qyDisabled = true;
          this.qyOrgDisabled = true;
          this.listQuery.areaCode = response[1].id;
          this.listQuery.areaCompanyCode = response[2].id;

          this.getOrg();
          this.getCompanyOrg();
          this.getTradingCenter();
          this.initSelect();
        } else if (response.length == 4) {
          this.qyDisabled = true;
          this.qyOrgDisabled = true;
          this.listQuery.areaCode = response[1].id;
          this.listQuery.areaCompanyCode = response[2].id;

          this.getOrg();
          this.getCompanyOrg();
          this.getTradingCenter();
          this.initSelect();
        }
      });
    },
    initSelect() {
      getSelectList("state").then(res => {
        this.auditStatusOptions = res;
      });
    },
    //获取区域数据
    getOrg() {
      let parame = {
        attributeTypeCode: "zzjgsx05"
      };
      getAllOrgByAttribute(parame).then(res => {
        this.orgAreaOptions = res;
      });
    },
    // 获取区域公司数据
    getCompanyOrg() {
      let parmes = {
        attributeTypeCode: "zzjgsx03",
        pOrgId: this.listQuery.areaCode
      };

      getAllOrgByPorgId(parmes).then(res => {
        this.orgAreaComOptions = res;
      }); //区域公司
    },
    //获取交易中心
    getTradingCenter() {
      let obj = {
        orgId: this.listQuery.areaCompanyCode
      };
      getDataListByOrgId(obj)
        .then(res => {
          this.tradingCenterOptions = res;
        })
        .then(() => {
          this.getList();
        });
    },
    // 2019年11月04日 吴志超 修改集团用户进入权限问题 #465 end
    // 选择区域 调取区域公司的数据
    areaCodeSelectChange(val) {
      this.$set(this.listQuery, "areaCompanyCode", "");
      this.$set(this.listQuery, "tradingCenterCode", "");
      let parmes = {
        attributeTypeCode: "zzjgsx03",
        pOrgId: val
      };
      getAllOrgByPorgId(parmes).then(res => {
        this.orgAreaComOptions = res;
      });
    },
    // 选择区域公司 调取交易中心的数据
    areaCompanyCodeSelcctChange(val) {
      this.$set(this.listQuery, "tradingCenterCode", "");
      let query = { orgId: val };
      getDataListByOrgId(query).then(res => {
        this.tradingCenterOptions = res;
      }); //获取交易中心的下拉值  新增的交易中心条件
    },
    // ==============================================================================
    submitAudit(row) {
      let parame = {
        templateId: row.templateId
      };
      startProcess(parame).then(res => {
        if (res.rel) {
          this.getList();
        } else {
          this.$notify({
            title: "失败",
            message: res.msg,
            type: "warning",
            duration: 2000
          });
        }
      });
    },
    getList() {
      this.listLoading = true;
      let Parameters = {};
      for (let key in this.listQuery) {
        if (
          this.listQuery[key] != undefined ||
          this.listQuery[key] != "" ||
          this.listQuery[key] != null
        ) {
          Parameters[key] = this.listQuery[key];
        }
      }
      if (!this.btnStatus) {
        getTemplate(Parameters).then(response => {
          this.listLoading = false;
          if (response.rel) {
            let items = response.data.rows.map((item, index) => {
              item.index =
                index + 1 + (this.listQuery.page - 1) * this.listQuery.limit;
              return item;
            });
            this.tableData = response.data.rows;
            this.total = response.data.total;
          } else {
            this.$notify({
              title: "失败",
              message: response.msg,
              type: "warning",
              duration: 2000
            });
          }
        });
      } else {
        Parameters.beginDate = this.beginDate;
        Parameters.endDate = this.endDate;
        getTemplateByDateRange(Parameters).then(response => {
          this.listLoading = false;
          if (response.rel) {
            let items = response.data.rows.map((item, index) => {
              item.index =
                index + 1 + (this.listQuery.page - 1) * this.listQuery.limit;
              return item;
            });
            this.tableData = response.data.rows;
            this.total = response.data.total;
          } else {
            this.$notify({
              title: "失败",
              message: response.msg,
              type: "warning",
              duration: 2000
            });
          }
        });
      }
    },
    handleFilter() {
      this.getList();
    },
    handleCreate() {
      this.form = {};
      this.dialogFormVisible = true;
      if (typeof this.$refs.form != "undefined") {
        this.$refs.form.resetFields(); //移除校验结果并重置字段值
      }
      this.dialogStatus = "create";
    },
    handleDelete() {
      let parame = { templateIds: this.delIds };
      delObj(parame).then(res => {
        if (res.rel) {
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 2000
          });
          this.getList();
        } else {
          this.$notify({
            title: "失败",
            message: "删除失败",
            type: "warning",
            duration: 2000
          });
        }
      });
    },
    handleSave(formName) {
      this.saveBtnLoding = true;
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          this.form.areaCode = this.listQuery.areaCode;
          this.form.areaCompanyCode = this.listQuery.areaCompanyCode;
          // this.form.tradingCenterCode = this.listQuery.tradingCenterCode; //新增交易中心条件
          this.form.templateState = "11";
          addTemplateObj(this.form).then(res => {
            this.saveBtnLoding = false;
            this.dialogFormVisible = false;
            if (res.rel) {
              this.$notify({
                title: "成功",
                message: res.msg,
                type: "success",
                duration: 2000
              });
              this.getList();
              // this.$refs.configurePublic.getList(this.listQuery);
            } else {
              this.$notify({
                title: "失败",
                message: res.msg,
                type: "warning",
                duration: 2000
              });
              this.saveBtnLoding = false;
            }
          });
        } else {
          this.saveBtnLoding = false;
          return false;
        }
      });
    },
    handleConfigure(row) {
      this.listQuery.templateid = row.templateId;
      this.listQuery.areaCode = row.areaCode;
      this.listQuery.areaCompanyCode = row.areaCompanyCode;
      this.listQuery.tradingCenterCode = row.tradingCenterCode; //新增交易中心条件
      this.listQuery.isCheckStatus = true;
      this.$store.commit("SET_BJCNMBPZ_DEL_QUERY", this.listQuery);
      this.$router.push({
        path: "/configure/puotationStrategyTemplate/templateAdministration"
      });
    },
    handleCheck(row) {
      if (!this.btnStatus) {
        this.listQuery.templateid = row.templateId;
        this.listQuery.areaCode = row.areaCode;
        this.listQuery.areaCompanyCode = row.areaCompanyCode;
        this.listQuery.tradingCenterCode = row.tradingCenterCode; //新增交易中心条件
        this.listQuery.isCheckStatus = false;
        this.$store.commit("SET_BJCNMBPZ_DEL_QUERY", this.listQuery);
        this.$router.push({
          path: "/configure/puotationStrategyTemplate/templateAdministration"
        });
      } else {
        this.listQuery.templateid = row.templateId;
        this.listQuery.areaCode = row.areaCode;
        this.listQuery.areaCompanyCode = row.areaCompanyCode;
        this.listQuery.tradingCenterCode = row.tradingCenterCode; //新增交易中心条件
        this.listQuery.isCheckStatus = false;
        this.$refs.configurationStrategyDialog.init(this.listQuery);
      }
    },

    cancel() {
      this.dialogFormVisible = false;
    },
    clearForm() {
      this.form = {};
      this.dialogFormVisible = false;
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    getValidBeginDate(val) {
      if (val) {
        this.form.validBeginDate = parseTime(val, "{y}-{m}-{d}");
        if (
          Date.parse(this.form.validBeginDate) >=
          Date.parse(this.form.validEndDate)
        ) {
          this.$notify({
            title: "警告",
            message: "失效时间不能小于生效时间",
            type: "warning"
          });
          this.form.validBeginDate = "";
        }
      }
    },
    getValidEndDate(val) {
      if (val) {
        this.form.validEndDate = parseTime(val, "{y}-{m}-{d}");
        if (
          Date.parse(this.form.validEndDate) <=
          Date.parse(this.form.validBeginDate)
        ) {
          this.$notify({
            title: "警告",
            message: "失效时间不能小于生效时间",
            type: "warning"
          });
          this.form.validEndDate = "";
        }
      }
    }
  }
};
</script>

<style scoped>
</style>
