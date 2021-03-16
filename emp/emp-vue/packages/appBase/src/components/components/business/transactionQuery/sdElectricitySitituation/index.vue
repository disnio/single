
<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-row>
          <el-form-item label="交易序列名称">
            <el-input
              class="four-col left"
              style="width:160px"
              v-model="listQuery['noticeName']"
              :clearable="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="交易品种">
            <el-select
              style="width:160px"
              class="four-col left"
              :clearable="true"
              v-model="listQuery['tradeVarietyCode']"
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
          <org-selectsTime
            ref="selectsTime"
            :selectWidth="selectWidth"
            @selectTime="selectTime"
            @tradeIssure="tradeIssure"
          ></org-selectsTime>
          <el-button
            class="filter-item"
            type="primary"
            v-waves
            icon="el-icon-search"
            @click="handleFilter"
          >查询</el-button>
        </el-row>
      </el-form>
    </div>
    <el-table
      :key="tableKey"
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column type="selection" align="center" width="55"></el-table-column>
      <el-table-column prop="index" label="序号" align="center" width="70px"></el-table-column>
      <el-table-column align="center" label="交易中心">
        <template slot-scope="scope">
          <span>{{ scope.row.tradeCenterName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" label="交易序列名称">
        <template slot-scope="scope">
          <span>{{ scope.row.noticeName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="交易品种">
        <template slot-scope="scope">
          <span>{{ scope.row.tradeVarietyName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="交易方式">
        <template slot-scope="scope">
          <span>{{ scope.row.tradeWayName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="交易周期">
        <template slot-scope="scope">
          <span>{{ scope.row.tradeCycleName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="期次">
        <template slot-scope="scope">
          <span>{{ scope.row.tradingTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.sdStatusName }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            v-if="sdElectricitySitituationManager_btn_check"
            size="small"
            type="text"
            @click="handleCheck(scope.row, 'view')"
          >查看</el-button>
          <el-button
            v-if="scope.row.sdStatus == '3' "
            size="small"
            type="text"
            @click="handleModify(scope.row, 'edit')"
          >修改</el-button>
          <el-button
            v-show=" scope.row.sdStatus != '3'"
            size="small"
            type="text"
            @click="handleCheck(scope.row, 'edit')"
          >结果维护</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
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
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      custom-class="w1000"
      title="编辑"
      :visible.sync="dialogFormVisible"
      :before-close="cancel"
    >
      <div :style="{paddingRight:'10px',height:(dialogHeight-70)+'px'}">
        <el-scrollbar>
          <el-form :model="form" :rules="rules" ref="form" label-width="180px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="交易序列名称">
                  <el-input disabled v-model="form.noticeName" placeholder></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="交易品种">
                  <el-input disabled v-model="form.tradeVarietyName" placeholder></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="交易方式">
                  <el-input disabled v-model="form.tradeWayName" placeholder></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="交易周期">
                  <el-input disabled v-model="form.tradeCycleName" placeholder></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="交易期次">
                  <el-select
                    disabled
                    style="width:100%;"
                    v-model="form.tradingTime"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in jydyOptions"
                      :key="item.index"
                      :label="item.tradingUnitName"
                      :value="item.tradingUnitId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="base_power_infor">原始电价</div>
            <!--2019-12-5 #2818 张朋  字段调整,添加number类型 start-->
            <el-row>
              <el-col :span="12">
                <el-form-item label="售电价" prop="sdPrice">
                  <el-input
                    :disabled="this.disState"
                    class="ddw"
                    v-model="form.sdPrice"
                    type="number"
                    @input="jcmlCount(form.sdPrice,form.sdGshjcfcbl)"
                    placeholder
                  ></el-input>
                  <span>{{unitMap.electricityUnit}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="公司获价差分成比例" prop="sdGshjcfcbl">
                  <el-input
                    class="ddw"
                    :disabled="this.disState"
                    v-model="form.sdGshjcfcbl"
                    type="number"
                    @input="jcmlCount(form.sdPrice,form.sdGshjcfcbl)"
                    placeholder
                  ></el-input>
                  <span>%</span>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="base_power_infor">售电收支</div>
            <!--2019-12-2 #2818 张朋 为输入框添加@input监听事件 start-->
            <el-row>
              <el-col :span="12">
                <el-form-item label="售电服务费收入（从用户）" prop="sdFufsr">
                  <el-input
                    :disabled="this.disState"
                    class="ddw"
                    v-model="form.sdFufsr"
                    type="number"
                    @input="sum(form.sdFufsr,form.sdYjsr,form.sdKhyhpcsr,form.sdBpckhzc,form.sdEjdlfzc,form.jcml)"
                    placeholder
                  ></el-input>
                  <span>{{unitMap.electricityUnit}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="售电佣金收入（从电厂）" prop="sdYjsr">
                  <el-input
                    :disabled="this.disState"
                    class="ddw"
                    v-model="form.sdYjsr"
                    type="number"
                    @input="sum(form.sdFufsr,form.sdYjsr,form.sdKhyhpcsr,form.sdBpckhzc,form.sdEjdlfzc,form.jcml)"
                    placeholder
                  ></el-input>
                  <span>{{unitMap.electricityUnit}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="考核用户偏差收入" prop="sdKhyhpcsr">
                  <el-input
                    :disabled="this.disState"
                    class="ddw"
                    v-model="form.sdKhyhpcsr"
                    type="number"
                    @input="sum(form.sdFufsr,form.sdYjsr,form.sdKhyhpcsr,form.sdBpckhzc,form.sdEjdlfzc,form.jcml)"
                    placeholder
                  ></el-input>
                  <span>{{unitMap.electricityUnit}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="被偏差考核支出" prop="sdBpckhzc">
                  <el-input
                    :disabled="this.disState"
                    class="ddw"
                    v-model="form.sdBpckhzc"
                    type="number"
                    @input="sum(form.sdFufsr,form.sdYjsr,form.sdKhyhpcsr,form.sdBpckhzc,form.sdEjdlfzc,form.jcml)"
                    placeholder
                  ></el-input>
                  <span>{{unitMap.electricityUnit}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="二级代理支出" prop="sdEjdlfzc">
                  <el-input
                    :disabled="this.disState"
                    class="ddw"
                    v-model="form.sdEjdlfzc"
                    type="number"
                    @input="sum(form.sdFufsr,form.sdYjsr,form.sdKhyhpcsr,form.sdBpckhzc,form.sdEjdlfzc,form.jcml)"
                    placeholder
                  ></el-input>
                  <span>{{unitMap.electricityUnit}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="价差毛利" prop="jcml">
                  <el-input disabled class="ddw" v-model="form.jcml" placeholder></el-input>
                  <span>{{unitMap.electricityUnit}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="总毛利" prop="zml">
                  <el-input disabled class="ddw" v-model="form.zml" placeholder></el-input>
                  <span>{{unitMap.electricityUnit}}</span>
                </el-form-item>
              </el-col>
            </el-row>
              <!--2019-12-5 #2818 张朋  字段调整,添加number类型 end-->
            <!--2019-12-2 #2818 张朋 为输入框添加@input监听事件 end-->
            <el-row>
              <el-col>
                <el-form-item label="备注">
                  <el-input
                    type="textarea"
                    v-model="form.memo"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    maxlength="500"
                    show-word-limit
                    placeholder="请输入备注"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="save-btn" v-if="btn_save" @click="submit('form','11')">保 存</el-button>
        <el-button v-if="btn_submit" class="submit-btn" @click="submit('form','3')">提 交</el-button>
        <el-button class="cancel-btn" @click="cancel">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  page,
  addObj,
  modifyInfo,
  getPriceDate, //获取购电价
  getPurchaseDate //获取购电量
} from "@common/api/business/transactionQuery/sdElectricitySitituation/index";
import { getTradeCenter } from "@common/api/contract/htTemplate/index";
import { getOrgById } from "@common/api/admin/orgStruManage/index";
import { validateNumberPositive, validatorNumber } from "@common/utils/validate";
import { parseTime, getUnitMap, initDialogHeight } from "@common/utils/index";
import { getSelectList } from "@common/api/base";
import { initLayout } from "@common/utils/init";
import { mapGetters } from "vuex";
export default {
  name: "marketTurnover",
  components: {
    "org-selects": () => import("@common/components//areaComSelectsList"), //区域
    //2019-11-3 #2454 张朋 交易周期、期次组件路径
    "org-selectsTime": () => import("@common/components//orgSelectsTime")
  },
  data() {
    const sdGshjcfcbl = (rule, value, callback) => {
      let reg = /^\d+[\d\.]*$/;
      if (value == "" || value == null) {
        callback();
      } else {
        if (
          reg.exec(value) == null ||
          value == "" ||
          (value.match(/\./g) && value.match(/\./g).length > 1)
        ) {
          return callback(new Error("厂用电率为数字"));
        } else {
          if (value < 0 || value > 100) {
            return callback(new Error("厂用电率在0-100之间"));
          } else {
            callback();
          }
        }
      }
    };
    return {
      disState: false,
      tradeIssureData: {
        quarter: "",
        monthData: "",
        yearData: ""
      },
      //2019-11-3 #2454 张朋 交易周期下拉框宽度设定变量
      selectWidth: false,
      fdgsSearchOptions: [],
      textarea: "",
      textarea1: "",
      sels: "",
      updateId: "",
      jydyOptions: [],
      varietyOptions: [],
      wayOptions: [],
      // periodOptions: [],
      quarterOptions: [],
      pricingProposalOption: [],
      centerOptions: [],
      btn_save: false,
      btn_submit: false,
      btn_modify: true, //修改记录按钮
      dialogTableVisible: false, //修改记录弹框
      gridData: [], //修改记录弹框数据
      checkListLoading: false,
      form: {
        noticeName: "", //交易序列名称
        sdgsqkbId: "", //售电公司情况
        tradeVarietyName: "", //交易品种
        tradeWayName: "", //交易方式
        tradeCycleName: "", //交易周期
        tradingTime: "", //交易期次
        sdPrice: "", //售电价
        sdStatus: "", //状态
        sdGshjcfcbl: "", //公司获价差分成比例
        sdFufsr: "", //售电服务费收入（从用户）
        sdYjsr: "", //售电佣金收入（从电厂）
        sdKhyhpcsr: "", //考核用户偏差收入
        sdBpckhzc: "", //被偏差考核支出
        sdEjdlfzc: "", //二级代理支出
        jcml: "", //价差毛利
        zml: "", //总毛利
        memo: "" //备注
      },
      electricityPrice: "", //购电价
      electricityPurchase: "", //购电量
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        tradingTime: undefined,
        noticeName: undefined,
        tradeVarietyCode: undefined,
        tradeCycleCode: undefined,
        page: 1,
        limit: 10
      },
      rules: {
        sdGshjcfcbl: [
          {
            validator: sdGshjcfcbl,
            trigger: "blur"
          }
        ],
        sdPrice: [{ validator: validateNumberPositive, trigger: "blur" }],
        sdFufsr: [{ validator: validatorNumber, trigger: "blur" }],
        sdYjsr: [{ validator: validatorNumber, trigger: "blur" }],
        sdKhyhpcsr: [{ validator: validatorNumber, trigger: "blur" }],
        sdBpckhzc: [{ validator: validatorNumber, trigger: "blur" }],
        sdEjdlfzc: [{ validator: validatorNumber, trigger: "blur" }]
      },
      dialogFormVisible: false,
      textMap: {
        update: "编辑",
        create: "查看"
      },
      tableKey: 0,
      dialogHeight: "", //2019-11-11 #2620 张朋 弹框获取自适应高度数据
      sdElectricitySitituationManager_btn_check: false,
      sdElectricitySitituationManager_btn_edit: false,
      sdElectricitySitituationManager_btn_maintain: false, //结果维护
      unitMap: {}
    };
  },
  //初始化
  created() {
    this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
    this.init();
    this.getList();
    this.sdElectricitySitituationManager_btn_check = this.elements[
      "sdElectricitySitituationManager:btn_check"
    ];
    this.sdElectricitySitituationManager_btn_edit = this.elements[
      "sdElectricitySitituationManager:btn_edit"
    ];
    this.sdElectricitySitituationManager_btn_maintain = this.elements[
      "sdElectricitySitituationManager:btn_maintain"
    ];
  },
  computed: {
    ...mapGetters(["elements", "allSubMenus", "orgId"])
  },
  mounted() {
    const that = this;
    this.dialogHeight = initDialogHeight();
    window.onresize = function temp() {
      that.dialogHeight = initDialogHeight();
    };
  },
  methods: {
    /**
     * @功能描述: 总毛利（计算）
     * @参数: 
     * @返回值: 
     * @作者: 张朋
     * @工单号：#2818
     * @Date: 2019-12-06 01:21:58
     * @最新修改内容: 
     * @LastEditTime: 
     */
    sum(a, b, c, d, e, f) {
      if (a == "" || b == "" || c == "" || d == "" || e == "" || f == "") {
        this.form.zml = "";
      } else {
        this.form.zml =
          Number(a) + Number(b) + Number(c) + Number(d) + Number(e) + Number(f);
      }
    },
    /**
     * @功能描述: 价差毛利实时计算
     * @参数:
     * @返回值:
     * @作者: 张朋
     * @工单号：#2818
     * @Date: 2019-12-05 23:05:12
     * @最新修改内容:
     * @LastEditTime:
     */
    jcmlCount(a, b) {
      if (a != "" && this.electricityPrice != "") {
        let gxjc = Number(a) - Number(this.electricityPrice);
        if (Number(this.electricityPurchase) != "" && Number(b) != "") {
          this.form.jcml = Number(gxjc) * Number(this.electricityPurchase) * (Number(b) / 100) / 1.13 * 10;
        } else {
          this.form.jcml = "";
        }
      } else {
        this.form.jcml = "";
      }
      // form.sdFufsr,form.sdYjsr,form.sdKhyhpcsr,form.sdBpckhzc,form.sdEjdlfzc,form.jcml
      //2019-12-5 #2818 张朋 总毛利计算
      if (
        this.form.sdFufsr == "" ||
        this.form.sdYjsr == "" ||
        this.form.sdKhyhpcsr == "" ||
        this.form.sdBpckhzc == "" ||
        this.form.sdEjdlfzc == "" ||
        this.form.jcml == ""
      ) {
        this.form.zml = "";
      } else {
        this.form.zml =
          Number(this.form.sdFufsr) +
          Number(this.form.sdYjsr) +
          Number(this.form.sdKhyhpcsr) +
          Number(this.form.sdBpckhzc) +
          Number(this.form.sdEjdlfzc) +
          Number(this.form.jcml);
      }
    },
    init() {
      //交易品种
      getSelectList("transactions_variety").then(res => {
        this.varietyOptions = res;
      });
      //交易方式
      getSelectList("transaction_mode").then(res => {
        this.wayOptions = res;
      });
    },
    /**
     * @功能描述: 清空表单
     * @参数:
     * @返回值:
     * @作者: 张朋
     * @Date: 2019-11-28 14:42:26
     * @最新修改内容:
     * @LastEditTime:
     */
    resetTemp() {
      this.form = {
        noticeId: "", //主键
        sdgsqkbId: "",
        noticeName: "", //交易序列名称
        tradeVarietyName: "", //交易品种
        tradeWayName: "", //交易方式
        tradeCycleName: "", //交易周期
        tradingTime: "", //交易期次
        sdPrice: "", //售电价
        sdStatus: "", //状态
        sdGshjcfcbl: "", //公司获价差分成比例
        sdFufsr: "", //售电服务费收入（从用户）
        sdYjsr: "", //售电佣金收入（从电厂）
        sdKhyhpcsr: "", //考核用户偏差收入
        sdBpckhzc: "", //被偏差考核支出
        sdEjdlfzc: "", //二级代理支出
        jcml: "", //价差毛利
        zml: "", //总毛利
        memo: "" //备注
      };
    },
    /**
     * @功能描述: 保存，提交
     * @参数:
     * @返回值:
     * @样式作用范围:
     * @作者: 张朋
     * @Date: 2019-11-28 14:34:19
     * @最新修改内容:
     * @LastEditTime:
     */
    submit(formName, status) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (
            typeof this.form.sdStatus == "undefined" ||
            this.form.sdStatus == ""
          ) {
            this.form.sdStatus = status;
            addObj(this.form).then(res => {
              if (res.rel) {
                this.$notify({
                  title: res.msg,
                  message: res.msg,
                  type: "success",
                  duration: 2000
                });
              } else {
                this.$notify({
                  title: res.msg,
                  message: res.msg,
                  type: "warning",
                  duration: 2000
                });
              }
              this.dialogFormVisible = false;
              this.getList();
            });
          } else if (this.form.sdStatus == "11" || this.form.sdStatus == "3") {
            this.form.sdStatus = status;
            modifyInfo(this.form).then(res => {
              if (res.rel) {
                this.$notify({
                  title: res.msg,
                  message: res.msg,
                  type: "success",
                  duration: 2000
                });
              } else {
                this.$notify({
                  title: res.msg,
                  message: res.msg,
                  type: "warning",
                  duration: 2000
                });
              }
              this.dialogFormVisible = false;
              this.getList();
            });
          }
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    /**
     * @功能描述: 获取列表数据
     * @参数:
     * @返回值:
     * @作者: 张朋
     * @Date: 2019-11-28 14:42:50
     * @最新修改内容:
     * @LastEditTime:
     */
    getList() {
      this.listLoading = true;
      this.listQuery.orgId = this.orgId;
      page(this.listQuery).then(response => {
        let items = response.data.rows.map((item, index) => {
          item.index =
            index + 1 + (this.listQuery.page - 1) * this.listQuery.limit;
          return item;
        });
        this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
      });
      this.listLoading = false;
    },
    /**
     * @方法名称: selectTime
     * @功能描述: 获取组件交易周期信息
     * @参数:
     * @返回值:
     * @作者:
     * @Date: 2019-11-28 10:26:04
     * @最新修改内容:
     * @LastEditTime:
     */
    selectTime(id) {
      if (id != null) {
        this.listQuery.tradeCycleCode = id;
      }
    },
    /**
     * @方法名称: tradeIssure
     * @功能描述: 获取组件交易期次信息
     * @参数:
     * @返回值:
     * @作者:
     * @Date: 2019-11-28 10:26:28
     * @最新修改内容:
     * @LastEditTime:
     */
    tradeIssure(id) {
      if (typeof id == "undefined") {
        this.listQuery.tradingTime = undefined;
      } else {
        this.listQuery.tradingTime = id;
      }
    },
    /**
     * @功能描述: 查询
     * @参数:
     * @返回值:
     * @作者: 张朋
     * @Date: 2019-12-03 00:59:07
     * @最新修改内容:
     * @LastEditTime:
     */
    handleFilter() {
      if (this.listQuery.orgId == "" || this.listQuery.period == "") {
        this.listQuery.orgId = undefined;
        this.listQuery.period = undefined;
        this.getList();
      } else {
        this.getList();
      }
    },
    /**
     * @功能描述: 编辑和查看方法
     * @参数:
     * @返回值:
     * @作者: 张朋
     * @Date: 2019-12-03 00:58:22
     * @最新修改内容:
     * @LastEditTime:
     */
    handleCheck(row, state) {
      if (state == "edit") {
        this.disState = false;
        this.btn_save = true;
        this.btn_submit = true;
        this.btn_modify = false;
      } else {
        this.disState = true;
        this.btn_save = false;
        this.btn_submit = false;
        this.btn_modify = true;
      }
      this.resetTemp(); //清空数据
      let param = {
        orgId: this.orgId,
        noticeId: row.noticeId
      };
      //2019-12-7  #2818  zhangp 获取购电价数据
      getPriceDate(param).then(res=>{
         this.electricityPrice = res.data;      
      });
       //2019-12-7  #2818  zhangp 获取购电量数据
      getPurchaseDate(param).then(res=>{
         this.electricityPurchase = res.data;      
      });
      //清除form空数据字段
      for (let key in this.form) {
        if (typeof row[key] != "undefined") {
          this.$nextTick(() => {
            this.form[key] = row[key];
          });
        }
      }
      this.form.orgId = this.orgId; //为form赋组织id
      this.dialogFormVisible = true;
    },
    /**
     * @功能描述: 修改
     * @参数:
     * @返回值:
     * @作者: 张朋
     * @Date: 2019-11-28 14:43:15
     * @最新修改内容:
     * @LastEditTime:
     */
    handleModify(row, state) {
      this.$confirm("此条信息包含已上报系统的重要数据，请谨慎修改", "提示", {
        confirmButtonText: "确认修改",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.disState = false;
        this.btn_save = false;
        this.btn_submit = true;
        this.btn_modify = true;
        // if (typeof row.status == "undefined") {
        //   delete this.form.conditionId;
        // } else {
        //   this.form.conditionId = "";
        // }
        this.form.status = "";
        for (let key in this.form) {
          if (typeof row[key] != "undefined") {
            this.$nextTick(() => {
              this.form[key] = row[key];
            });
          }
        }
        this.dialogFormVisible = true;
      });
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },

    cancel() {
      this.$nextTick(() => {
        this.$refs["form"].resetFields();
      });

      this.dialogFormVisible = false;
    }
  }
};
</script>
<style scoped>
.base_power_infor {
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-weight: 700;
  background-color: #f4f7fa;
  margin-bottom: 10px;
}
.el-input.ddw {
  width: 40%;
}
.filter-container .filter-item {
  margin-bottom: -8px !important;
}
</style>