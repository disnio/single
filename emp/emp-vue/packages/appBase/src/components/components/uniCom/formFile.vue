<template>
  <el-upload
    class="upload-wz"
    ref="uploadFileAdd"
    :http-request="uploadAjax"
    :limit="limitNumber"
    :multiple="multiple"
    :accept="accept"
    :headers="uploadHeaders"
    auto-upload="false"
    :file-list="files"
    :disabled="disabled"
    :on-success="uploadSuccess"
    :on-change="uploadChange"
    :on-exceed="uploadExceed"
    :on-preview="uploadPreview"
    :on-remove="uploadDelete"
  >
    <el-button slot="trigger" size="small" type="primary" v-if="!disabled"
      >附件上传
    </el-button>
  </el-upload>
</template>

<script>
/**
 * @file: formFile.vue
 * @description: 混入文件上传表单项，事件格式注意，自定义上传方法
 * @author: wsc
 * @date: 2020-12-11
 */
import fetch from '@common/utils/fetch';
import { getToken } from '@common/utils/auth';
import { exportDetail, deleteById } from '@common/api/fileUpload/index.js';
import { getFile } from './utils';

export default {
  name: 'FormFile',
  data() {
    return {
      url_mul: '/api/admin/fdfsfile/uploadMultiFile',
      url_sin: '/api/admin/fdfsfile/upload',
      files: [],
      batchCache: '',
      uploadHeaders: {},
    };
  },
  props: {
    disabled: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    enclosure: { type: String, default: '' },
    accept: {
      type: String,
      default: '.doc,.docx,.pdf,.txt,.xls,.xlsx,.jpg,.png',
    },
    limitNumber: { type: Number, default: 1 },
    event: Object,
  },
  computed: {
    url: function() {
      return this.multiple && this.limitNumber > 1
        ? this.url_mul
        : this.url_sin;
    },
  },
  created() {
    this.uploadHeaders = {
      Authorization: getToken(),
      ModelCode: sessionStorage.getItem('modelCode'),
    };
  },
  watch: {
    enclosure: {
      immediate: true,
      handler: function(n, o) {
        this.batchCache = n;
        if (n === '' && this.multiple) {
          this.batchCache = Date.now();
        }
        if (n !== o && this.hasFiles(n)) {
          getFile(n, (fl) => {
            this.files = fl;
          });
        } else {
          this.files = [];
        }
      },
    },
  },
  methods: {
    uploadAjax(param) {
      const that = this;
      let fileObj = param.file;
      let forms = new FormData();

      this.multiple
        ? forms.append('files', fileObj)
        : forms.append('file', fileObj);
      // forms.append('file', fileObj);
      forms.append('batch', this.batchCache);

      console.log('xx:', this.batchCache, param);

      return new Promise(function(resolve, reject) {
        fetch({
          url: that.url,
          method: 'post',
          data: forms,
        })
          .then((res) => {
            if (res.rel) {
              that.$notify({
                title: '提示',
                message: '上传成功',
                type: 'success',
                duration: 2000,
              });
              resolve(res.data);
            } else {
              reject(res.msg);
              that.$notify({
                title: '提示',
                message: res.msg,
                type: 'warning',
                duration: 2000,
              });
            }
          })
          .catch((e) => {
            that.$notify({
              title: '提示',
              message: e.message,
              type: 'warning',
              duration: 2000,
            });
          });
      });
    },
    hasFiles(en) {
      return (
        !_.isEmpty(en) && !_.isUndefined(en) && !_.isNull(en) && en !== 'null'
      );
    },

    uploadExceed() {
      this.$notify({
        title: '提示',
        message: `最多上传${this.limitNumber}个文件`,
        type: 'warning',
        duration: 2000,
      });
    },
    //文件状态改变，增加新文件时候要用原来的批次号
    uploadChange(file, fileList) {
      this.files = fileList;

      const isLt20M = file.size / 1024 / 1024 < 20;

      if (!isLt20M) {
        this.$message.error('上传文件不能超过 20MB!');
        fileList.pop();
      } else {
        // this.$refs.uploadFileAdd.submit();
      }
    },
    // 上传成功
    uploadSuccess(res, file, fileList) {
      console.log('upss:', res, file, fileList);
      if (res.batch !== '' && typeof res.batch !== undefined) {
        this.batchCache = res.batch;
        this.event.success({
          res,
          file,
          fileList,
        });
      }

      let success = fileList.every((v) => {
        return v.status === 'success';
      });

      if (success && res.rel) {
        this.$notify({
          title: '提示',
          message: '上传成功',
          type: 'success',
          duration: 2000,
        });
      }
    },
    uploadDelete(file, fileList) {
      console.log('del:', file, fileList);
      this.files = fileList;
      let id = '';
      if (file.response) {
        id = file.response.files[0].id;
      } else {
        id = file.id;
      }

      deleteById(id).then((res) => {
        if (res.rel) {
          this.event.delete(fileList);
          this.$notify({
            title: '提示',
            message: '删除成功',
            type: 'success',
            duration: 2000,
          });
        }
      });
    },
    uploadPreview(file) {
      if (file.status === 'success') {
        let param = {
          id: file.id,
        };
        // exportDetail(param);
        let downloadURl = '';
        if (file.response) {
          downloadURl = file.response.data.file.downloadURl;
        } else {
          downloadURl = file.downloadURl;
        }
        let fileUrl = '/api' + downloadURl + '?token=' + getToken();
        window.location.href = fileUrl + "&ModelCode=" + window.mdcode
      } else {
        this.$notify({
          title: '提示',
          message: '未上传成功',
          type: 'warning',
          duration: 2000,
        });
      }
    },
  },
};
</script>
<style lang="scss">
.upload-wz {
  .el-upload-list {
    display: block;
    width: 90%;
  }
}

.upload-wz .el-upload {
  display: inline;
}

.upload-wz .el-upload {
  display: inline !important;
}
</style>
