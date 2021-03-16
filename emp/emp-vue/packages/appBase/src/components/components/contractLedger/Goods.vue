<template>
  <div>
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      title="现货虚拟合同"
      :visible.sync="addDialogVisible"
      custom-class="w1000 "
      :before-close="close"
      append-to-body
    >
      <div :style="{
        paddingRight: '10px',
        height: dialogHeight + 'px' }">
        <el-scrollbar>
          <div class="altdiv">
            <el-form
              ref="goodsForm"
              :model="goods"
              label-width="150px"
              style="width:90%"
            >
              <c-item
                :itemProps="itemProps"
                :values.sync="goods"
              >
              </c-item>
            </el-form>
          </div>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer btn_footer">
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
        <el-button
          class="save-btn"
          :disabled="state"
          @click="submit('save', 11)"
        >保存
        </el-button>
        <el-button
          class="submit-btn"
          :disabled="state"
          @click="submit('submit', 3)"
        >提交
        </el-button>

        <el-button class="cancel-btn" @click="closeDialog()">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {parseTime, getUnitMap, initDialogHeight} from "@common/utils/index";
import {mapGetters} from "vuex";
import {getSelectList, downloadOneFile, downloadOneFileUs1} from "@common/api/base";

import {cItem} from "@common/components/uniCom/cItem";
import fetch from "@common/utils/fetch";
import dw from "@common/components/uniCom/down";

export default {
  name: "Goods",
  mixins: [dw],
  components: {
    "c-item": cItem,
  },
  props: {
    fileTypeAudit: { type: Boolean },
  },

  data() {
    return {
      flagOption: "add",
      addDialogVisible: false,
      dialogTitle: "现货虚拟合同",
      // 控制编辑状态
      state: false,
      goods: {
        "dataStatus": "",
        "templateId": 0,
        "contractId": "",//主键id
        "beginDate": "",//合约开始时间
        "benchmarkTariff": "",//基准电价
        "confirmationTime": "",//确认时间
        "contractCode": "",//系统合同编码
        "contractedPrice": "",//签约价格
        "contractName": "",//合同名称
        "contractPrice": "",//合约电价
        "contractStatus": "",//合约状态
        "contractTypeCode": "htlx06",//合同类型
        "customerName": "",//甲方名称
        "enclosure": "",//交易曲线
        "endDate": "",//合约结束时间
        "isVirtual": "1",//是否虚拟
        "regionalMarket": "",  //所属区域市场
        "secondPartName": "",//乙方名称
        "settlementPrice": "",//结算价格
        "submissionTime": "",//提交时间
        "totalElectricity": "", //合约电量
        "tradingVarieties": "",//中长期交易品种
        "transactionCode": "",//交易代码
        "transactionMode": "",//成交方式
        "transactionTime": "",//成交时间
        "transactionType": "",  //交易类型
        "unitId": "",//机组名称
      },
      // 位置，布局 todo 把 state 改掉
      itemProps: [
        // 1 行
        [{
          types: "input",
          type: "text",
          item: {
            prop: "contractCode",
            label: "系统合同编码",

            "label-width": "150px",
            size: "small"
          },
          el: {
            disabled: true,
            value: this.contractCode,
          },
        }, {
          types: "input",
          type: "text",
          item: {
            prop: "contractName",
            label: "合同名称",
            "label-width": "150px",
            size: "small",
            rules: [
              {
                required: true,
                message: "必填项",
                trigger: "blur"
              },
              {
                min: 1,
                max: 100,
                message: "长度在 1 到 100 个字符",
                trigger: "blur"
              }
            ],
          },
          el: {
            disabled: this.state,
            clearable: true,
            placeholder: "输入合同名称",
          },
        }],
        // 2 行
        [{
          types: "input",
          type: "text",
          item: {
            prop: "customerName",
            label: "甲方",
            "label-width": "150px",
            size: "small",
            rules: [
              {
                required: true,
                message: "必填项",
                trigger: "blur"
              },
              {
                min: 1,
                max: 100,
                message: "长度在 1 到 100 个字符",
                trigger: "blur"
              }
            ],
          },
          el: {
            disabled: this.state,
            clearable: true,
            placeholder: "输入甲方名称",
          },
        }, {
          types: "input",
          type: "text",
          item: {
            prop: "secondPartName",
            label: "乙方",
            "label-width": "150px",
            size: "small",
            rules: [
              {
                required: true,
                message: "必填项",
                trigger: "blur"
              },
              {
                min: 1,
                max: 100,
                message: "长度在 1 到 100 个字符",
                trigger: "blur"
              }
            ],
          },
          el: {
            disabled: this.state,
            clearable: true,
            placeholder: "输入乙方名称",
          },
        }],
        // 3 行
        [{
          types: "input",
          type: "text",
          item: {
            prop: "unitId",
            label: "机组名称",
            "label-width": "150px",
            size: "small",
          },
          el: {
            disabled: this.state,
            clearable: true,
            placeholder: "输入机组名称",
          },
        }, {
          types: "input",
          type: "text",
          item: {
            prop: "transactionCode",
            label: "交易代码",
            "label-width": "150px",
            size: "small",
          },
          el: {
            disabled: this.state,
            clearable: true,
            placeholder: "输入交易代码",
          },
        }],
        // 4 行
        [{
          types: "input",
          type: "text",
          item: {
            prop: "totalElectricity",
            label: "合约电量",
            "label-width": "150px",
            size: "small",
            rules: [
              {
                required: true,
                message: "必填项",
                trigger: "blur"
              },
              {
                min: 1,
                max: 100,
                message: "长度在 1 到 100 个字符",
                trigger: "blur"
              }
            ],
          },
          el: {
            disabled: this.state,
            clearable: true,
            placeholder: "输入合约电量",
          },
          append: "千千瓦时"
        }, {
          types: "input",
          type: "text",
          item: {
            prop: "contractPrice",
            label: "合约电价",
            "label-width": "150px",
            size: "small",
            rules: [
              {
                required: true,
                message: "必填项",
                trigger: "blur"
              },
              {
                min: 1,
                max: 100,
                message: "长度在 1 到 100 个字符",
                trigger: "blur"
              }
            ],
          },
          el: {
            disabled: this.state,
            clearable: true,
            placeholder: "输入合约电价",
          },
          append: "元/千千瓦时"
        }],
        // 5 行
        [{
          types: "select",
          item: {
            prop: "transactionMode",
            label: "成交方式",
            "label-width": "150px",
            size: "small",
          },
          el: {
            disabled: this.state,
            clearable: true,
            placeholder: "选择成交方式",
          },
          options: [{
            label: "自动撮合",
            value: "automatic_matchmaking"
          }, {
            label: "连续竞价",
            value: "continuous_auction"
          }]
        }, {
          types: "select",
          item: {
            prop: "contractStatus",
            label: "合约状态",
            "label-width": "150px",
            size: "small",
          },
          el: {
            disabled: this.state,
            clearable: true,
            placeholder: "选择合约状态",
          },
          options: [{
            label: "已确认",
            value: "confirmed"
          }, {
            label: "未确认",
            value: "unconfirmed"
          }]
        }],
        // 6 行
        [{
          types: "date",
          type: "date",
          item: {
            prop: "transactionTime",
            label: "成交时间",
            "label-width": "150px",
            size: "small",
          },
          el: {
            size: "small",
            "value-format": "yyyy-MM-dd HH:mm:ss"
          },
        }, {
          types: "date",
          type: "date",
          item: {
            prop: "submissionTime",
            label: "提交时间",
            "label-width": "150px",
            size: "small",
          },
          el: {
            size: "small",
            "value-format": "yyyy-MM-dd HH:mm:ss"
          },
        }],
        // 7 行
        [{
          types: "date",
          type: "date",
          item: {
            prop: "confirmationTime",
            label: "确认时间",
            "label-width": "150px",
            size: "small",
          },
          el: {
            size: "small",
            "value-format": "yyyy-MM-dd HH:mm:ss"
          },
        }, {
          types: "date",
          type: "date",
          item: {
            prop: "beginDate",
            label: "合约开始时间",
            "label-width": "150px",
            size: "small",
          },
          el: {
            "value-format": "yyyy-MM-dd HH:mm:ss",
            size: "small",
          },
        }],
        // 8 行
        [{
          types: "date",
          type: "date",
          item: {
            prop: "endDate",
            label: "合约结束时间",
            "label-width": "150px",
            size: "small",
          },
          el: {
            "value-format": "yyyy-MM-dd HH:mm:ss",
            size: "small",
          },
        }, {
          types: "input",
          type: "text",
          item: {
            prop: "benchmarkTariff",
            label: "基准电价",
            "label-width": "150px",
            size: "small",
          },
          el: {
            disabled: this.state,
            clearable: true,
            placeholder: "输入基准电价",
          },
          append: "元/千千瓦时"
        }],
        // 9 行
        [{
          types: "input",
          type: "text",
          item: {
            prop: "settlementPrice",
            label: "结算电价",
            "label-width": "150px",
            size: "small",
          },
          el: {
            disabled: this.state,
            clearable: true,
            placeholder: "输入结算电价",
          },
          append: "元/千千瓦时"
        }, {
          types: "select",
          item: {
            prop: "tradingVarieties",
            label: "中长期交易品种",
            "label-width": "150px",
            size: "small",
          },
          el: {
            disabled: this.state,
            clearable: true,
            placeholder: "输入中长期交易品种",
          },
          options: [{
            label: "双边协商",
            value: "bilateral_consultation"
          }, {
            label: "集中竞争",
            value: "centralized_competition"
          }]
        }],
        // 10 行
        [{
          types: "select",
          item: {
            prop: "regionalMarket",
            label: "所属区域市场",
            "label-width": "150px",
            size: "small",
          },
          el: {
            disabled: this.state,
            clearable: true,
            placeholder: "选择所属区域市场",
          },
          options: [{
            label: "省内",
            value: "province"
          }, {
            label: "省外",
            value: "Outside_the_province"
          }]
        }, {
          types: "select",
          item: {
            prop: "transactionType",
            label: "交易类型",
            "label-width": "150px",
            size: "small",
          },
          el: {
            disabled: this.state,
            clearable: true,
            placeholder: "选择交易类型",
          },
          options: [{
            label: "场内",
            value: "venue"
          }, {
            label: "场外",
            value: "outside"
          }]
        }],

        [{
          types: "upload",
          item: {
            prop: "enclosure",
            label: "成交曲线",
            "label-width": "150px",
            size: "small",
          },
          el: {
            disabled: this.state,
            multiple: false,
            limitNumber: 1,
            // 回调
            event: {
              success: this.upSuccess,
              delete: this.upDelete,
              change: this.upChange
            }
          },

        }]
      ],

      unitMap: {},
    }
  },
  created() {
    this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);

    // 获取弹窗高度
    this.dialogHeight = initDialogHeight();
    window.onresize = function temp() {
      this.dialogHeight = initDialogHeight(); //获取弹框高度(监控高度变化)
    };

  },
  computed: {
    ...mapGetters(["elements", "allSubMenus", "orgId", "sysOrg"])
  },
  methods: {
    upSuccess(res) {
      console.log("upload success:", res)
      if (res.rel
        && res.data.batch !== ""
        && typeof res.data.batch !== undefined
      ) {
        this.goods.enclosure = res.data.batch;
      }
    },
    upDelete(files) {
      if (files.length === 0) {
        this.goods.enclosure = ""
      }

      console.log("delete success:", files)
    },
    upChange(file, fileList) {
      console.log("change file:", file, fileList)
    },
    // 新增初始化 openDialog
    initDialog(dataInfo, dialogInfo) {
      // add
      this.flagOption = dialogInfo.flagOption;
      this.reInitFormData();
      this.state = false;
      // 系统合同编码
      this.goods.contractCode = dataInfo.contractCode;
      this.sdTemplateName = dialogInfo.sdTemplateName;
      this.addDialogVisible = true;
    },
    // 编辑初始化 viewInformation
    initEditDialog(dataInfo, dialogInfo) {
      console.log("initEditDialog", dataInfo, dialogInfo)
      // contractId
      this.reInitFormData();
      this.state = dialogInfo.state;
      _.forEach(this.itemProps, (arr) => {
        _.forEach(arr, v => {
          v.el.disabled = this.state;
        })
      })

      this.flagOption = dialogInfo.flagOption;
      _.keys(this.goods).forEach(v => {
        this.goods[v] = dataInfo.htContract[v];
      });

      this.itemProps[this.itemProps.length - 1][0].el.enclosure = this.goods.enclosure;

      this.sdTemplateName = dialogInfo.sdTemplateName;
      this.addDialogVisible = true;
    },

    //表单数据重置
    reInitFormData() {

      this.goods = {
        "templateId": 0,
        "contractId": "",//主键id
        "beginDate": "",//合约开始时间
        "benchmarkTariff": "",//基准电价
        "confirmationTime": "",//确认时间
        "contractCode": "",//系统合同编码
        "contractedPrice": "",//签约价格
        "contractName": "",//合同名称
        "contractPrice": "",//合约电价
        "contractStatus": "",//合约状态
        "contractTypeCode": "htlx06",//合同类型
        "customerName": "",//甲方名称
        "enclosure": "",//交易曲线
        "endDate": "",//合约结束时间
        "isVirtual": "1",//是否虚拟
        "regionalMarket": "",  //所属区域市场
        "secondPartName": "",//乙方名称
        "settlementPrice": "",//结算价格
        "submissionTime": "",//提交时间
        "totalElectricity": "", //合约电量
        "tradingVarieties": "",//中长期交易品种
        "transactionCode": "",//交易代码
        "transactionMode": "",//成交方式
        "transactionTime": "",//成交时间
        "transactionType": "",  //交易类型
        "unitId": "",//机组名称
      }
    },

    closeDialog(){
      this.$emit("initList", {
        close: true,
        data: {...this.goods, goods: true}
      })
      this.close();
    },

    close() {
      this.reInitFormData();
      this.$refs.goodsForm.resetFields();
      this.addDialogVisible = false;
    },

    submit(type, status) {

      if (this.flagOption === "add") {
        this.add(status)
      } else {
        this.save(status)
      }

    },
    // 编辑保存
    async save(status) {
      try {
        const res = await fetch({
          url: '/api/contract/htContract/updateInfo',
          method: 'post',
          data: {
            ...this.goods,
            dataStatus: status
          }
        });

        if (res.rel) {
          this.$notify({
            title: "保存成功!",
            message: "保存成功!",
            type: "success",
            duration: 2000
          });
          this.$emit("initList", {...this.goods});
          this.close();
        } else {
          this.$notify({
            title: "保存失败!",
            message: e.msg,
            type: "warning",
            duration: 2000
          });
        }
      } catch (e) {
        this.$notify({
          title: "提示",
          message: e.msg,
          type: "warning",
          duration: 2000
        });
      }
    },
    // 新增保存
    async add(status) {
      try {
        const res = await fetch({
          url: '/api/contract/htContract/insertInfo',
          method: 'post',
          data: {
            ...this.goods,
            dataStatus: status
          }
        });

        if (res.rel) {
          this.$notify({
            title: "保存成功!",
            message: "保存成功!",
            type: "success",
            duration: 2000
          });
          this.$emit("initList", {...this.goods});
          this.close();
        } else {
          this.$notify({
            title: "保存失败!",
            message: e.msg,
            type: "warning",
            duration: 2000
          });
        }
      } catch (e) {
        this.$notify({
          title: "提示",
          message: e.msg,
          type: "warning",
          duration: 2000
        });
      }

    },
    //审批
    approvalPass() {
      this.$emit('openCheckWin', '3');
    },
    approvalReject() {
      this.$emit('openCheckWin', '4');
    },

  }
}
</script>

<style scoped>

</style>
