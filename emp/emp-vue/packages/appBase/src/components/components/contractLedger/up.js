// {{< el - upload
// : class="!state ? 'upload-demo' : 'upload-demo views'"
// ref = "uploadFileAdd"
// action = "/api/contract/htContract/uploadFile"
// : show - file - list="show_file_name"
// : limit = "limit_number"
// : multiple = "true"
// : headers = "uplaodHeaders"
// : auto - upload="false"
// : file - list="myFileList"
// : before - upload="handleBefore"
// : on - change="handleChange"
// : on - success="uploadSuccess"
// : on - error="uploadErr"
// : on - exceed="handleExceed"
// : on - remove="handleRemove"
// : on - preview="handleDownload"
//   >
//   <el-button
//     v-if="!state"
//     slot="trigger"
//     size="small"
//     type="primary"
//   >选取文件</el-button
// </el - upload >}}

const up = {
  data() {
    return {
      upEvent: {
        success: (res) => this.upSuccess(res),
      },
      upload: {
        multiple: true,
        limitNumber: 5,
        disabled: false,
      },
    }
  },
  methods: {
    //上传成功
    upSuccess(d) {
      this.formLoading = false;
      this.btn_save = false;
      this.btn_submit = false;
      console.log("up up: ", d)

      this.contractLedgerForm.htContract.enclosure = d.res.batch;

    },
  }
}

export default up;