/**
* @file: formFile.js
* @method
* @return {type} argName - 混入文件上传表单项
* @description:
* @author: wsc
* @date: 2020-11-02
*/
<template>
  <el-upload
    class="upload-demofzp"
    ref="uploadFileAdd"
    action="/api/admin/fdfsfile/upload"
    :limit="limitNumber"
    :multiple="multiple"
    :accept="accept"
    :headers="uploadHeaders"
    auto-upload="false"

    :file-list="files"
    :data="enclosure"
    :disabled="disabled"
    :on-success="uploadSuccess"
    :on-change="uploadChange"
    :on-exceed="uploadExceed"
    :on-preview="uploadPreview"
    :on-remove="uploadDelete"
  >
    <el-button slot="trigger" size="small" type="primary">附件上传</el-button>
  </el-upload>
</template>

<script>
import {getToken} from "@common/utils/auth";
import {
  exportDetail,
  deleteById,
} from "@common/api/fileUpload/index.js";
import {getFile} from "./utils";

export default {
  name: "FormFile",
  data() {
    return {
      files: [],
      uploadHeaders: {}
    }
  },
  props: {
    disabled: {type: Boolean, default: false},
    multiple: {type: Boolean, default: false},
    // 批次号
    enclosure: {type: String, default: ""},
    // 上传类型
    accept: {
      type: String,
      default: ".doc,.docx,.pdf,.txt,.xls,.xlsx,.jpg,.png"
    },
    limitNumber: {type: Number, default: 1},
    event: Object,
  },
  created() {
    console.log("form file created")
    this.uploadHeaders = {
      Authorization: getToken(),
      ModelCode: sessionStorage.getItem("modelCode")
    };

  },
  watch: {
    "enclosure":{
      immediate: true,
      handler: function (n, o) {

        if (n !== o) {
          console.log("formFile:", n, o)
          if (this.hasFiles(n)) {
            getFile(n, (fl) => {
              this.files = fl;
            });
          }else {
            this.files = []
          }
        }
      }
    },
  },
  methods: {
    // 文件上传操作 start
    hasFiles(en) {
      return !_.isEmpty(en)
        && !_.isUndefined(en)
        && !_.isNull(en)
        && en !== 'null'
    },
    //文件超出个数限制
    uploadExceed() {
      this.$notify({
        title: "导入提示",
        message: `导入最多上传${this.limitNumber}个`,
        type: "warning",
        duration: 2000,
      });
    },
    //文件状态改变
    uploadChange(file, fileList) {
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (!isLt20M) {
        this.$message.error("上传文件不能超过 20MB!");
        fileList.pop();
      } else {
        // console.log("upload in change", file, fileList);
        // success 处理批次号
        // this.event.change(file, fileList)
        // this.$refs.uploadFileAdd.submit();
      }
    },
    // 上传成功
    uploadSuccess(res) {
      if (res.rel
        && res.data.batch !== ""
        && typeof res.data.batch !== undefined
      ) {
        this.enclosure = res.data.batch;
        this.event.success(res)
      }
    },
    // 文件移除
    uploadDelete(file, fileList) {
      console.log("del:", file, fileList)
      this.files = fileList;
      this.event.delete(fileList);
      deleteById(file.id).then((res) => {
        if (res.rel) {
          this.$notify({
            title: "提示",
            message: "文件删除成功",
            type: "success",
            duration: 2000,
          });
        }
      });
    },
    // 文件预览
    uploadPreview(file) {
      if (file.status === "success") {
        let param = {
          id: file.id,
        };
        exportDetail(param);
      } else {
        this.$notify({
          title: "提示",
          message: "该附件未上传成功",
          type: "warning",
          duration: 2000,
        });
      }
    },
  }
}
;
</script>
