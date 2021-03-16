<template>
  <div>
    <el-dialog
      title="交易结果导入"
      :visible.sync="dialogFormVisible"
      custom-class="w640"
      :close-on-click-modal="false"
      @close="closedialog"
      @open="opendialog"
      v-drag
    >
      <el-row>
        <el-col :span="3">
          <p>
            <b>选取文件：</b>
          </p>
        </el-col>

        <el-col :span="21">
          <div style="margin-top:10px;">
            <el-upload
              ref="uploadFileAdd"
              action="/api/business/jyTradingResultsDetail/uploads"
              :accept="accept"
              :show-file-list="show_file_name"
              :limit="limit_number"
              :multiple="true"
              :on-remove="handleDel"
              :headers="uplaodHeaders"
              :auto-upload="false"
              :file-list="myFileList"
              :data="formInline"
              :before-upload="handleBefore"
              :on-success="upSuccess"
              :on-change="handleChange"
              :on-exceed="handleExceed"
              :on-error="uploadErr"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </div>
        </el-col>
      </el-row>

      <div style="height:60px"></div>

      <div slot="footer" class="dialog-footer">
        <el-button
          class="save-btn"
          :loading="handleClickSaveLoad"
          @click="handleClickSave('ruleForm')"
        >保 存</el-button>
        <!-- <el-button class="cancel-btn" @click="closeBtn('ruleForm')">关 闭</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from "@common/utils/auth";
export default {
  props: {
    resultIds: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // import dialog 参数
      dialogFormVisible: false,
      formInline: {
        description: "jyTransactionNotice",
        resultIds: ""
      },
      info: [], // 用户信息

      accept:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel", // 上传类型
      limit_number: 1, // 最大允许的上传个数
      uplaodHeaders: {}, // 上传的请求头
      myFileList: [], // 添加的文件列表
      show_file_name: true, // 是否显示上传列表
      handleClickSaveLoad: false, //保存loading
      fileList: [], // 已上传的文件列表

      fileId: ""
    };
  },
  watch: {},
  created() {
    this.uplaodHeaders = {
      Authorization: getToken(),
      ModelCode: sessionStorage.getItem("modelCode")
    };
  },
  methods: {
    // 开启弹窗
    opendialog() {
      this.formInline.resultIds = this.resultIds.join(",");
    },
    // ============  文件上传    ===============================
    //上传文件之前
    handleBefore(file) {},
    // 文件移除
    handleDel(file, fileList) {
      this.myFileList = fileList;
      this.$notify({
        title: "提示",
        message: "文件已移除，请重新上传",
        type: "warning",
        duration: 2000
      });
    },
    //文件状态改变
    handleChange(file, fileList) {
      this.myFileList = fileList;
    },
    //上传成功
    upSuccess(response, file, fileList) {
      this.handleClickSaveLoad = false; //上传成功 关闭保存loading
      this.importVisible = false; //上传成功 关闭dialog
      if (response.rel) {
        this.dialogFormVisible = false;
        this.$notify({
          title: "导入提示",
          message: "文件导入成功，正在处理，请稍后查看！",
          type: "success",
          duration: 2000
        });
        //this.$parent.pageInit();
      } else {
        this.dialogFormVisible = false;
        this.$notify({
          title: "导入提示",
          message: response.message,
          type: "success",
          duration: 2000
        });
      }
    },
    //文件超出个数  限制
    handleExceed() {
      this.$notify({
        title: "导入提示",
        message: "导入最多上传1个",
        type: "warning",
        duration: 2000
      });
    },
    //上传失败
    uploadErr(response, file, fileList) {
      this.handleClickSaveLoad = false; //上传失败 关闭保存loading
      this.$notify({
        title: "导入提示",
        message: "导入失败",
        type: "warning",
        duration: 2000
      });
    },

    //保存
    async handleClickSave() {
      if (this.myFileList.length == 1) {
        this.handleClickSaveLoad = true;
        this.$refs.uploadFileAdd.submit();
      } else {
        this.$alert("选择上传文件！", "提示信息", {
          confirmButtonText: "确定",
          callback: action => {}
        });
      }
    },
    // dialog 关闭
    closedialog() {
      this.myFileList = [];
      this.dialogFormVisible = false;
      this.handleClickSaveLoad = false;
    },
    // 关闭按钮
    closeBtn() {
      this.dialogFormVisible = false;
    }
  }
};
</script>

<style>
</style>