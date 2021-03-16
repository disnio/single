<!--
 * @功能描述: 
 * @版本: 
 * @作者: 郑文杰
 * @Date: 2019-11-25 16:36:31
 * @最新修改内容: 
 * @LastEditTime: 2020-04-23 09:53:43
 -->
<template>
  <div class="app-container calendar-list-container">
    <div v-if="typeof this.$route.query['orgId'] =='undefined'" class="filter-container">
      <!-- 查询条件 -->
      <el-form :inline="true" :model="listQuery" class="demo-form-inline" ref="listQueryForm">
        <el-row>
          <org-selects ref="orgSelects" @select="selectOrg" @initOrg="initOrg"></org-selects>
          <el-form-item label="期次">
            <el-date-picker
              class="datetime"
              v-model="listQuery.year"
              type="year"
              placeholder="请选择"
              :clearable="true"
              value-format="yyyy"
              style="width:160px"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              :disabled="disaQuery"
              type="primary"
              @click="handleFilter"
              icon="el-icon-search"
            >查询</el-button>
            <el-button
              v-if="marketTransactionSizeEstimates_btn_calculate"
              :disabled="disaHand"
              type="primary"
              icon="el-icon-upload"
              @click="handClickExecute"
            >计算</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <el-button-group class="f-mb10">
      <el-button
        :disabled="disahandleCreate"
        class="filter-item"
        type="primary"
        icon="el-icon-plus"
        v-if="btn_add&&typeof this.$route.query['orgId'] =='undefined'"
        @click="handleCreate"
      >新增</el-button>
    </el-button-group>
    <el-table
      :key="tableKey"
      :data="listData"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column prop="index" label="序号" align="center" width="80px"></el-table-column>
      <el-table-column width="200px" align="center" label="公司名称">
        <template slot-scope="scope">
          <span>{{ scope.row.companyName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="期次">
        <template slot-scope="scope">
          <span>{{ scope.row.transDate }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="下载附件">
        <template slot-scope="scope">
          <el-button type="text" v-if="scope.row.amtsId != ''" @click="downFile(scope.row)">文件下载</el-button>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.infoStatusName }}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="handleViews(scope.row)">查看</el-button>
          <el-button size="small" type="text" @click="preView(scope.row)">预览</el-button>
          <el-button
            v-if="scope.row.infoStatus=='11'&&btn_upd"
            size="small"
            type="text"
            @click="handleUpdate(scope.row,'update')"
          >编辑</el-button>
          <el-button
            v-if="scope.row.infoStatus=='3'&&btn_modify"
            size="small"
            type="text"
            @click="handleUpdate(scope.row,'modify')"
          >修改</el-button>
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
        :total="listTotal"
      ></el-pagination>
    </div>
    <!-- 新增时的弹框 -->
    <el-dialog
      v-drag
      title="新增"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="block">
        <span class="demonstration">选择期次</span>
        <el-date-picker v-model="year" type="year" value-format="yyyy" placeholder="选择年"></el-date-picker>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="create">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-drag
      :title="textMap[dialogStatus]"
      :visible.sync="fillDialogVisible"
      custom-class="w800"
      :before-close="handleClose"
    >
      <div :style="{paddingRight:'10px',height:dialogHeight+'px'}">
        <el-scrollbar>
          <el-form ref="form" label-position="right" label-width="200px" :model="form">
            <span class="demonstration">期次</span>
            <el-date-picker :disabled="true" v-model="form.year" type="year" placeholder="选择年"></el-date-picker>
            <!-- <el-button type="primary" @click="calculate('form')">表内计算</el-button> -->
            <div class="txt-right unit-info">单位：{{unitMap.electricityUnit}}、%</div>
            <el-collapse v-model="activeNames">
              <el-collapse-item title="预计全年全社会用电量" name="1">
                <div style="margin-top:10px;">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="预计全年全社会用电量" prop="estimatedAnnualElectricity">
                        <el-input
                          :disabled="disabled"
                          style="width:150px"
                          v-model="form.estimatedAnnualElectricity"
                          type="number"
                          @blur="calculate"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="钢铁" prop="steelValue">
                        <el-input
                          :disabled="disabled"
                          style="width:150px"
                          v-model="form.steelValue"
                          type="number"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="建材" prop="buildingMaterialValue">
                        <el-input
                          :disabled="disabled"
                          style="width:150px"
                          v-model="form.buildingMaterialValue"
                          type="number"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="有色" prop="colouredValue">
                        <el-input
                          :disabled="disabled"
                          style="width:150px"
                          v-model="form.colouredValue"
                          type="number"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="煤炭" prop="coalValue">
                        <el-input
                          :disabled="disabled"
                          style="width:150px"
                          v-model="form.coalValue"
                          type="number"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-collapse-item>
              <el-collapse-item title="综合合计" name="2">
                <div style="margin-top:10px;">
                  <el-row>
                    <el-col :span="12">
                      <fieldset style="height: 344px;">
                        <legend>直接交易电量</legend>
                        <el-form-item label="全年规模(含区外参与机组)" prop="zhAnnualScale">
                          <el-input
                            :disabled="disabled"
                            style="width:150px"
                            v-model="form.zhAnnualScale"
                            type="number"
                            @blur="calculate"
                          ></el-input>
                        </el-form-item>

                        <el-form-item label="占比(%)" prop="zhProportion">
                          <el-tooltip placement="top">
                            <div slot="content">
                              说明
                              <br />综合合计全年规模/预计全年社会用电量
                            </div>
                            <el-input
                              :disabled="true"
                              style="width:150px"
                              v-model="form.zhProportion"
                            ></el-input>
                          </el-tooltip>
                        </el-form-item>

                        <el-form-item label="普通外来电" prop="zhOrdinaryElectricity">
                          <el-input
                            :disabled="disabled"
                            style="width:150px"
                            v-model="form.zhOrdinaryElectricity"
                            type="number"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="特殊外来电" prop="zhSpecialElectricity">
                          <el-input
                            :disabled="disabled"
                            style="width:150px"
                            v-model="form.zhSpecialElectricity"
                            type="number"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="省内无法参与交易" prop="zhUnableTransaction">
                          <el-input
                            :disabled="disabled"
                            style="width:150px"
                            v-model="form.zhUnableTransaction"
                            type="number"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="省内可参与交易" prop="zhAbleTransaction">
                          <el-input
                            :disabled="disabled"
                            style="width:150px"
                            v-model="form.zhAbleTransaction"
                            type="number"
                          ></el-input>
                        </el-form-item>
                      </fieldset>
                    </el-col>
                    <el-col :span="12">
                      <fieldset style="height: 178px;">
                        <legend>发电权转让</legend>

                        <el-form-item label="合计(全年规模)" prop="zhTotal">
                          <el-tooltip placement="top">
                            <div slot="content">
                              说明
                              <br />交易电转让(全年规模)+基数电转让(全年规模)
                            </div>
                            <el-input :disabled="true" style="width:150px" v-model="form.zhTotal"></el-input>
                          </el-tooltip>
                        </el-form-item>

                        <el-form-item label="交易电转让(全年规模)" prop="zhTransElectricityTransfer">
                          <el-input
                            :disabled="disabled"
                            style="width:150px"
                            v-model="form.zhTransElectricityTransfer"
                            type="number"
                            @blur="calculate1"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="基数电转让(全年规模)" prop="zhBaseElectricityTransfer">
                          <el-input
                            :disabled="disabled"
                            style="width:150px"
                            v-model="form.zhBaseElectricityTransfer"
                            type="number"
                            @blur="calculate1"
                          ></el-input>
                        </el-form-item>
                      </fieldset>
                      <fieldset style="height: 83px;">
                        <legend>外送</legend>
                        <el-form-item label="全年规模" prop="zhAnnualScaleOutward">
                          <el-input
                            :disabled="disabled"
                            style="width:150px"
                            v-model="form.zhAnnualScaleOutward"
                            type="number"
                          ></el-input>
                        </el-form-item>
                      </fieldset>
                      <fieldset style="height: 83px;">
                        <legend>其他</legend>
                        <el-form-item label="全年规模" prop="zhOtherAnnualScale">
                          <el-input
                            :disabled="disabled"
                            style="width:150px"
                            v-model="form.zhOtherAnnualScale"
                            type="number"
                          ></el-input>
                        </el-form-item>
                      </fieldset>
                    </el-col>
                  </el-row>
                </div>
              </el-collapse-item>
              <el-collapse-item title="煤机合计" name="3">
                <div style="margin-top:10px;">
                  <el-row>
                    <el-col :span="12">
                      <fieldset style="height: 344px;">
                        <legend>直接交易电量</legend>
                        <el-form-item label="全年规模(含区外参与机组)" prop="mjAnnualScale">
                          <el-input
                            :disabled="disabled"
                            style="width:150px"
                            v-model="form.mjAnnualScale"
                            type="number"
                            @blur="calculate"
                          ></el-input>
                        </el-form-item>

                        <el-form-item label="占比(%)" prop="mjProportion">
                          <el-tooltip placement="top">
                            <div slot="content">
                              说明
                              <br />煤机合计全年规模/预计全年社会用电量
                            </div>
                            <el-input
                              :disabled="true"
                              style="width:150px"
                              v-model="form.mjProportion"
                            ></el-input>
                          </el-tooltip>
                        </el-form-item>

                        <el-form-item label="普通外来电" prop="mjOrdinaryElectricity">
                          <el-input
                            :disabled="disabled"
                            style="width:150px"
                            v-model="form.mjOrdinaryElectricity"
                            type="number"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="特殊外来电" prop="mjSpecialElectricity">
                          <el-input
                            :disabled="disabled"
                            style="width:150px"
                            v-model="form.mjSpecialElectricity"
                            type="number"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="省内无法参与交易" prop="mjUnableTransaction">
                          <el-input
                            :disabled="disabled"
                            style="width:150px"
                            v-model="form.mjUnableTransaction"
                            type="number"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="省内可参与交易" prop="mjAbleTransaction">
                          <el-input
                            :disabled="disabled"
                            style="width:150px"
                            v-model="form.mjAbleTransaction"
                            type="number"
                          ></el-input>
                        </el-form-item>
                      </fieldset>
                    </el-col>
                    <el-col :span="12">
                      <fieldset style="height: 178px;">
                        <legend>发电权转让</legend>

                        <el-form-item label="合计(全年规模)" prop="mjTotal">
                          <el-tooltip placement="top">
                            <div slot="content">
                              说明
                              <br />交易电转让(全年规模)+基数电转让(全年规模)
                            </div>
                            <el-input :disabled="true" style="width:150px" v-model="form.mjTotal"></el-input>
                          </el-tooltip>
                        </el-form-item>

                        <el-form-item label="交易电转让(全年规模)" prop="mjTransElectricityTransfer">
                          <el-input
                            :disabled="disabled"
                            style="width:150px"
                            v-model="form.mjTransElectricityTransfer"
                            type="number"
                            @blur="calculate1"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="基数电转让(全年规模)" prop="mjBaseElectricityTransfer">
                          <el-input
                            :disabled="disabled"
                            style="width:150px"
                            v-model="form.mjBaseElectricityTransfer"
                            type="number"
                            @blur="calculate1"
                          ></el-input>
                        </el-form-item>
                      </fieldset>
                      <fieldset style="height: 83px;">
                        <legend>外送</legend>
                        <el-form-item label="全年规模" prop="mjAnnualScaleOutward">
                          <el-input
                            :disabled="disabled"
                            style="width:150px"
                            v-model="form.mjAnnualScaleOutward"
                            type="number"
                          ></el-input>
                        </el-form-item>
                      </fieldset>
                      <fieldset style="height: 83px;">
                        <legend>其他</legend>
                        <el-form-item label="全年规模" prop="mjOtherAnnualScale">
                          <el-input
                            :disabled="disabled"
                            style="width:150px"
                            v-model="form.mjOtherAnnualScale"
                            type="number"
                          ></el-input>
                        </el-form-item>
                      </fieldset>
                    </el-col>
                  </el-row>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-form>
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button type="primary" @click="calculate('form')">表内计算</el-button> -->
        <el-button
          v-if="dialogStatus!='view'&&form.infoStatus!='3'"
          :loading="btnLoading"
          class="save-btn"
          @click="save('11')"
        >保存</el-button>
        <el-button
          v-if="dialogStatus!='view'"
          :loading="btnLoading"
          class="submit-btn"
          @click="save('3')"
        >提交</el-button>
        <el-button class="cancel-btn" @click="footerCloseDialog()">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      v-drag
      title="预览"
      :visible.sync="previewDialogVisible"
      width="90%"
      :before-close="handleClose"
    >
      <div :style="{paddingRight:'10px',height:dialogHeight+'px'}">
        <el-scrollbar>
          <h2 style="text-align:center">全年市场交易规模预估表</h2>
          <div class="txt-right unit-info">单位：{{unitMap.electricityUnit}}、%</div>
          <detail ref="detail" :amtsId="amtsId" :tabHeight="tabHeight" />
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="previewDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//引用区域和区域公司组件路径
import OrgSelects from "@common/components//areaComSelectsListJygm";
import {
  getPageList,
  getOneByAmtcId,
  addObj,
  downloadFile,
  checkYear,
  updObj,
  getCalculate
} from "@common/api/business/marketTransactionSizeEstimates/index";
import { getUnitMap, initDialogHeight } from "@common/utils/index";
import { mapGetters } from "vuex";
const detail = () => import("./components/detail");
export default {
  name: "marketTransactionSizeEstimates",
  components: {
    OrgSelects,
    detail
  },
  data() {
    return {
      marketTransactionSizeEstimates_btn_calculate:false,//计算按钮权限
      disahandleCreate: false,
      disaHand: false,
      disaQuery: false,
      listQuery: {
        limit: 10,
        page: 1,
        orgId: "",
        year: new Date().getFullYear() + ""
      },
      form: {
        amtcId: "", //主键
        year: "", //年份
        estimatedAnnualElectricity: "", //预计全年全社会用电量
        colouredValue: "", //有色
        steelValue: "", //钢铁
        coalValue: "", //煤炭
        buildingMaterialValue: "", //建材
        zhAnnualScale: "", //综合-全年规模(含区外参与机组)
        zhProportion: "", //综合-综合统计占比(%)
        zhOrdinaryElectricity: "", //综合-普通外来电
        zhSpecialElectricity: "", //综合-特殊外来电
        zhUnableTransaction: "", //综合-省内无法参与交易
        zhAbleTransaction: "", //综合-省内可参与交易
        zhTotal: "", //综合-发电权转让
        zhTransElectricityTransfer: "", //综合-交易电转让(全年规模)
        zhBaseElectricityTransfer: "", //综合-基数电转让(全年规模)
        zhAnnualScaleOutward: "", //综合-外送全年规模
        zhOtherAnnualScale: "", //综合-其他全年规模
        mjAnnualScale: "", //煤机-全年规模(含区外参与机组)
        mjProportion: "", //煤机-综合统计占比(%)
        mjhOrdinaryElectricity: "", //煤机-普通外来电
        mjSpecialElectricity: "", //煤机-特殊外来电
        mjUnableTransaction: "", //煤机-省内无法参与交易
        mjAbleTransaction: "", //煤机-省内可参与交易
        mjTotal: "", //煤机-发电权转让
        mjTransElectricityTransfer: "", //煤机-交易电转让(全年规模)
        mjBaseElectricityTransfer: "", //煤机-基数电转让(全年规模)
        mjAnnualScaleOutward: "", //煤机-外送全年规模
        mjOtherAnnualScale: "" //煤机-其他全年规模
      },
      year: "",
      listData: [],
      tableKey: 0,
      listTotal: 0,
      activeNames: ["1", "2", "3"],
      dialogHeight: "",
      listLoading: false,
      dialogVisible: false,
      btnLoading: false,
      previewDialogVisible: false, //预览
      fillDialogVisible: false, //预估表填报
      unitMap: {},
      dialogStatus: "",
      textMap: {
        view: "查看",
        add: "新增",
        update: "编辑",
        modify: "修改"
      },
      amtsId: "", //主表ID
      disabled: false, //是否可编辑
      btn_add: false,
      btn_upd: false,
      btn_modify: false,
      tabHeight: "" //表格高度
    };
  },

  created() {
    this.init();
    this.setLayoutHeight();
    this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);
  },
  mounted() {
    const that = this;
    this.dialogHeight = initDialogHeight(); //获取弹框高度
    window.onresize = function temp() {
      that.dialogHeight = initDialogHeight(); //获取弹框高度(监控高度变化)
    };
    this.marketTransactionSizeEstimates_btn_calculate = this.elements[
      "marketTransactionSizeEstimates:btn_calculate"
    ];
  },
  computed: {
    ...mapGetters(["elements", "orgId", "allSubMenus"])
  },
  methods: {
    selectOrg(id, attributeTypeCode) {
      // console.log(id, attributeTypeCode, 599);
      this.disahandleCreate = false;
      this.disaHand = false;
      if (id != undefined && attributeTypeCode == "zzjgsx03") {
        this.disahandleCreate = true;
        this.disaHand = true;
      } else {
        this.disahandleCreate = false;
        this.disaHand = false;
      }
      //设置查询条件中组织ID
      this.listQuery.orgId = id;
    },
    initOrg(id, attributeTypeCode) {
      // console.log(id, attributeTypeCode, 603);
      this.disahandleCreate = false;
      this.disaHand = false;
      if (id != undefined && attributeTypeCode == "zzjgsx03") {
        this.disahandleCreate = true;
        this.disaHand = true;
      } else {
        this.disahandleCreate = false;
        this.disaHand = false;
      }
      //按组织初始化列表
      this.listQuery.orgId = id;
      if (typeof this.$route.query["orgId"] == "undefined") {
        this.getList();
      }
    },

    init() {
      //初始化页面
      this.btn_add = this.elements["marketTransactionSizeEstimates_btn_add"];
      this.btn_upd = this.elements["marketTransactionSizeEstimates_btn_upd"];
      this.btn_modify = this.elements[
        "marketTransactionSizeEstimates_btn_modify"
      ];
    },
    getList() {
      //初始化列表
      let parme = {
        page: this.listQuery.page,
        limit: this.listQuery.limit
      };
      if (this.listQuery.year != undefined && this.listQuery.year != "") {
        parme.transDate = this.listQuery.year;
      }
      if (this.listQuery.orgId != undefined && this.listQuery.orgId != "") {
        parme.orgId = this.listQuery.orgId;
      } else {
        parme.orgId = this.orgId;
      }
      this.listLoading = true;
      getPageList(parme).then(res => {
        let items = res.data.rows.map((item, index) => {
          item.index =
            index + 1 + (this.listQuery.page - 1) * this.listQuery.limit;
          return item;
        });
        this.listData = items;
        this.listData = res.data.rows;

        this.listTotal = res.data.total;
        this.listLoading = false;
      });
    },

    handleFilter() {
      //查询
      this.getList();
    },

    handleCreate() {
      //新增
      this.dialogVisible = true;
      this.year = "";
    },
    /**
     * @方法名称: handClickExecute
     * @功能描述: 计算
     * @参数:
     * @返回值:
     * @作者: frj
     * @issues:
     * @Date: 2020-04-17 15:50:33
     * @最新修改内容:
     * @LastEditTime:
     */
    handClickExecute() {
      this.disaHand = true;
      this.disaQuery = true;
      let param = {
        orgId: this.listQuery.orgId,
        transDate: this.listQuery.year
      };
      getCalculate(param).then(res => {
        // console.log(res, 699);
        if (res.rel) {
          this.disaHand = false;
          this.disaQuery = false;
          this.$notify({
            title: "成功",
            message: res.msg,
            type: "success",
            duration: 2000
          });
        } else {
          this.disaHand = false;
          this.$notify({
            title: "失败",
            message: res.msg,
            type: "error",
            duration: 2000
          });
        }
        // this.jobId = res.data;
      });
    },
    handleViews(row) {
      //查看
      this.year = row.transDate;
      let parme = {
        amtcId: row.amtsId
      };
      getOneByAmtcId(parme).then(res => {
        if (res.rel) {
          this.dialogStatus = "view";
          this.fillDialogVisible = true;
          this.disabled = true;
          this.form = res.data[0];
          this.form.year = row.transDate;
          this.form.infoStatus = row.infoStatus;
        } else {
          this.$notify({
            title: "失败",
            message: res.msg,
            type: "error",
            duration: 2000
          });
        }
      });
    },

    handleUpdate(row, status) {
      //编辑和修改
      this.year = row.transDate;
      this.dialogStatus = status;
      let parme = {
        amtcId: row.amtsId
      };
      getOneByAmtcId(parme).then(res => {
        if (res.rel) {
          this.form = res.data[0];
          this.form.year = row.transDate;
          this.form.infoStatus = row.infoStatus;
          this.disabled = false;
          this.fillDialogVisible = true;
        } else {
          this.$notify({
            title: "失败",
            message: res.msg,
            type: "error",
            duration: 2000
          });
        }
      });
    },

    preView(row) {
      //预览
      this.previewDialogVisible = true;
      this.amtsId = row.amtsId;
      setTimeout(() => {
        this.$refs["detail"].initData();
      });
    },

    downFile(row) {
      //附件下载
      //  #3399 文件下载是加入modelCode frj 2019-12-30 19:21:08
      downloadFile(row.amtsId, sessionStorage.getItem("modelCode"));
    },
    create() {
      //新增时选择期次后点击确定
      let parme = {
        transDate: this.year
      };
      checkYear(parme).then(res => {
        if (res.rel) {
          this.dialogVisible = false;
          this.fillDialogVisible = true;
          this.form.year = this.year;
          this.disabled = false;
          this.dialogStatus = "add";
        } else {
          this.$notify({
            title: "效验不通过",
            message: res.msg,
            type: "error",
            duration: 2000
          });
        }
      });
    },
    save(state) {
      //保存提交、
      this.btnLoading = true;
      let parme = {
        transDate: this.year,
        infoStatus: state,
        jyAnnualMarketTransactionScaleInfo: this.form
      };
      if (this.amtsId != undefined && this.amtsId != "") {
        parme.amtsId = this.amtsId;
      }
      if (this.dialogStatus == "add") {
        addObj(parme).then(res => {
          if (res.rel) {
            this.$notify({
              title: "新增成功",
              message: "新增成功",
              type: "success",
              duration: 2000
            });
            this.btnLoading = false;
            this.fillDialogVisible = false;
            this.getList();
          } else {
            this.$notify({
              title: "新增失败",
              message: res.msg,
              type: "error",
              duration: 2000
            });
            this.btnLoading = false;
          }
        });
      } else {
        updObj(parme).then(res => {
          if (res.rel) {
            if (state == "3") {
              this.$notify({
                title: "提交成功",
                message: "提交成功",
                type: "success",
                duration: 2000
              });
            } else if (state == "11") {
              this.$notify({
                title: "保存成功",
                message: "保存成功",
                type: "success",
                duration: 2000
              });
            }
            this.btnLoading = false;
            this.fillDialogVisible = false;
            this.getList();
            this.clearForm();
          } else {
            if (state == "3") {
              this.$notify({
                title: "提交失败",
                message: res.msg,
                type: "error",
                duration: 2000
              });
            } else if (state == "11") {
              this.$notify({
                title: "保存失败",
                message: res.msg,
                type: "error",
                duration: 2000
              });
            }
            this.btnLoading = false;
            this.fillDialogVisible = false;
            this.getList();
            this.clearForm();
          }
        });
      }
    },
    calculate() {
      //表内计算--直接交易电量
      if (
        this.form.estimatedAnnualElectricity != undefined &&
        this.form.estimatedAnnualElectricity != ""
      ) {
        if (
          this.form.zhAnnualScale != undefined &&
          this.form.zhAnnualScale != ""
        ) {
          //综合合计
          // this.form.zhProportion = (
          //   (Number(this.form.zhAnnualScale) /
          //     Number(this.form.estimatedAnnualElectricity)) *
          //   100
          // ).toFixed(2);
          let zhProportion = (
            (Number(this.form.zhAnnualScale) /
              Number(this.form.estimatedAnnualElectricity)) *
            100
          ).toFixed(2);
          Vue.set(this.form, "zhProportion", zhProportion);
        } else {
          this.form.zhProportion = "";
        }
        if (
          this.form.mjAnnualScale != undefined &&
          this.form.mjAnnualScale != ""
        ) {
          //煤电合计
          // this.form.mjProportion = (
          //   (Number(this.form.mjAnnualScale) /
          //     Number(this.form.estimatedAnnualElectricity)) *
          //   100
          // ).toFixed(2);
          let mjProportion = (
            (Number(this.form.mjAnnualScale) /
              Number(this.form.estimatedAnnualElectricity)) *
            100
          ).toFixed(2);
          Vue.set(this.form, "mjProportion", mjProportion);
        } else {
          this.form.mjProportion = "";
        }
      } else {
        this.form.zhProportion = "";
        this.form.mjProportion = "";
      }
    },
    calculate1() {
      //表内计算--发电权转让
      //综合合计
      if (
        this.form.zhTransElectricityTransfer != undefined &&
        this.form.zhTransElectricityTransfer != "" &&
        this.form.zhBaseElectricityTransfer != undefined &&
        this.form.zhBaseElectricityTransfer != ""
      ) {
        let zhTotal = (
          Number(this.form.zhBaseElectricityTransfer) +
          Number(this.form.zhTransElectricityTransfer)
        ).toFixed(2);
        Vue.set(this.form, "zhTotal", zhTotal);
      } else {
        this.form.zhTotal = "";
      }
      if (
        this.form.mjTransElectricityTransfer != undefined &&
        this.form.mjTransElectricityTransfer != "" &&
        this.form.mjBaseElectricityTransfer != undefined &&
        this.form.mjBaseElectricityTransfer != ""
      ) {
        let mjTotal = (
          Number(this.form.mjBaseElectricityTransfer) +
          Number(this.form.mjTransElectricityTransfer)
        ).toFixed(2);
        Vue.set(this.form, "mjTotal", mjTotal);
      } else {
        this.form.mjTotal = "";
      }
    },
    handleClose() {
      //点X关闭
      this.year = "";
      this.clearForm();
      this.dialogVisible = false;
      this.fillDialogVisible = false;
      this.previewDialogVisible = false;
    },
    footerCloseDialog() {
      //关闭
      this.clearForm();
      this.fillDialogVisible = false;
    },
    clearForm() {
      const set = this.$refs;
      if (typeof set["form"] != "undefined") {
        set["form"].resetFields();
      }
      this.form = {
        amtcId: "", //主键
        year: "", //年份
        estimatedAnnualElectricity: "", //预计全年全社会用电量
        colouredValue: "", //有色
        steelValue: "", //钢铁
        coalValue: "", //煤炭
        buildingMaterialValue: "", //建材
        zhAnnualScale: "", //综合-全年规模(含区外参与机组)
        zhProportion: "", //综合-综合统计占比(%)
        zhOrdinaryElectricity: "", //综合-普通外来电
        zhSpecialElectricity: "", //综合-特殊外来电
        zhUnableTransaction: "", //综合-省内无法参与交易
        zhAbleTransaction: "", //综合-省内可参与交易
        zhTotal: "", //综合-发电权转让
        zhTransElectricityTransfer: "", //综合-交易电转让(全年规模)
        zhBaseElectricityTransfer: "", //综合-基数电转让(全年规模)
        zhAnnualScaleOutward: "", //综合-外送全年规模
        zhOtherAnnualScale: "", //综合-其他全年规模
        mjAnnualScale: "", //煤机-全年规模(含区外参与机组)
        mjProportion: "", //煤机-综合统计占比(%)
        mjhOrdinaryElectricity: "", //煤机-普通外来电
        mjSpecialElectricity: "", //煤机-特殊外来电
        mjUnableTransaction: "", //煤机-省内无法参与交易
        mjAbleTransaction: "", //煤机-省内可参与交易
        mjTotal: "", //煤机-发电权转让
        mjTransElectricityTransfer: "", //煤机-交易电转让(全年规模)
        mjBaseElectricityTransfer: "", //煤机-基数电转让(全年规模)
        mjAnnualScaleOutward: "", //煤机-外送全年规模
        mjOtherAnnualScale: "" //煤机-其他全年规模
      };
      // for (const key in this.form) {
      //   this.form[key] = "";
      // }
    },
    setLayoutHeight() {
      // 设置高度
      this.tabHeight = initDialogHeight() * 0.68 + "px"; //修改计算的表格高度
    },
    handleSizeChange(val) {
      //列表分页条数变更
      this.listQuery.page = 1;
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      //列表分页
      this.listQuery.page = val;
      this.getList();
    }
  }
};
</script>
<style lang="scss" scoped>
// .dd ::v-deep .el-collapse-item__header {
//   background-color: #dcdfe6;
// }
</style>

