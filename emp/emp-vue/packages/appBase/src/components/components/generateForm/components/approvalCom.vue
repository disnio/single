<!--
 * @Author: fengzp
 * @Date: 2021-01-28 14:48:01
 * @LastEditors: fengzp
 * @LastEditTime: 2021-02-01 17:22:49
 * @Introduce: 审批意见组件
 // approvalCom:()=>import('@common/components/generateForm/components/approvalCom')
-->
<template>
  <div class="container">
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      custom-class="w480"
      :title="title"
      :visible.sync="checkDialogVisible"
      append-to-body
      :before-close="close"
    >
      <div>
        <span style="margin-left:10px;font-weight:700;">常用意见:</span>
        <el-button @click="clickBtn('0')" v-if="flag" type="primary">同 意</el-button>
        <el-button @click="clickBtn('1')" v-if="!flag" type="primary">不同意</el-button>
      </div>

      <el-form ref="form" :model="form" label-width="10px" :rules="rules">
        <el-form-item label="" prop="approvalComments">
          <el-input
            placeholder="请填写审批意见.."
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5 }"
            :maxlength="400"
            @input="approvalOpinionInput"
            v-model="form.approvalComments"
          ></el-input>
          <span class="validateText">{{ approvalOpinionRemnant }}/400</span>
        </el-form-item>
      </el-form>
      
      <div slot="footer" class="dialog-footer btn_footer">
        <el-button
          :disabled="disab"
          class="ok-btn"
          @click="sureCheck"
          :loading="savLoading"
          >确 认</el-button
        >
        <el-button class="cancel-btn" @click="close()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "approvalCom",
  components: {},
  computed: {},
  data() {
    return {
      form:{
        approvalComments:"",
      },
      approvalOpinionRemnant: 400,
      checkDialogVisible: false,
      flag: true,
      savLoading:false,
      rules: {
        approvalComments: [
          { required: this.requiredComment, message: "请输入审批意见", trigger: "blur" },
        ],
      },
    };
  },
  watch: {},
  mounted() {},
  props: {
    title: {
      type: String,
      default: "请填写审批意见",
    },
    requiredComment:{
      type:Boolean,
      default:false,
    }
  },
  destroyed() {},
  methods: {
    init(val) {
      // val 0 通过 1 驳回
      if (val == "0") {
        this.flag = true;
      } else {
        this.flag = false;
      }
      this.checkDialogVisible = true;
    },
    approvalOpinionInput() {
      let txtVal = this.form.approvalComments.length;
      this.approvalOpinionRemnant = 400 - txtVal;
    },
    close() {
      this.savLoading = false;
      this.form.approvalComments = "";
      this.approvalOpinionRemnant = 400;
      this.checkDialogVisible = false;
      this.$refs["form"].resetFields();
    },
    sureCheck() {
      this.savLoading = true;
      if (this.requiredComment) {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$emit("getComment", this.form.approvalComments);
          } else {
            return false;
          }
        });
      }else {
        this.$emit("getComment", this.form.approvalComments);
      }
    },
    clickBtn(val) {
      if (val == "0") {
        this.form.approvalComments = "同意";
        this.approvalOpinionInput();
      } else {
        this.form.approvalComments = "不同意";
        this.approvalOpinionInput();
      }
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
