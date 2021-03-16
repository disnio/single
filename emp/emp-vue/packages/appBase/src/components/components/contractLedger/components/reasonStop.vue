<template>
  <el-dialog
    v-drag
    :close-on-click-modal="false"
    ref="dialogResult"
    custom-class="w600"
    title="合同终止原因"
    :before-close="close"
    :visible.sync="visible"
  >
    <el-form :model="nForm" :rules="nrules" ref="nForm">
      <el-form-item
        label="终止时间："
        prop="contractEndDate"
        label-width="150px"
      >
        <el-date-picker
          v-model="nForm.contractEndDate"
          type="date"
          placeholder="请选择终止时间"
          value-format="yyyy-MM-dd"
          style="width:300px;"
        ></el-date-picker>
      </el-form-item>

      <el-form-item
        label="终止原因："
        prop="contractEndReason"
        label-width="150px"
      >
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入终止原因"
          v-model="nForm.contractEndReason"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer f-mt10">
      <el-button class="save-btn" @click="save">提交</el-button>
      <el-button class="cancel-btn" @click="close">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import fetch from '@common/utils/fetch';

export default {
  name: 'contractEndReasonStop',
  props: {
    visible: Boolean,
    id: String,
  },
  data() {
    return {
      nForm: {
        contractEndDate: '',
        contractEndReason: '',
      },
      nrules: {
        contractEndDate: [
          {
            required: true,
            message: '必填项',
            trigger: 'blur',
          },
        ],
        contractEndReason: [
          {
            required: true,
            message: '必填项',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    save() {
      this.$refs.nForm.validate(async (valid) => {
        if (valid) {
          try {
            const res = await fetch({
              url: '/api/contract/htContract/updateContractEnd',
              method: 'post',
              data: {
                contractId: this.id,
                ...this.nForm,
              },
            });
            if (res.rel) {
              this.close(null, true);
              this.$message({
                message: '提交成功',
                type: 'success',
              });
            }
          } catch (e) {
            this.$message({
              message: '提交出错',
              type: 'warning',
            });
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    close(e, flag) {
      this.nForm = {
        contractEndDate: '',
        contractEndReason: '',
      };
      this.$emit('closeReason', flag ? true : false);
    },
  },
};
</script>

<style scoped></style>
