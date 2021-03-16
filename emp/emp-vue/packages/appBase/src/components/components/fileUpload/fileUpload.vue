<!--
 * @Author: fengzp
 * @Date: 2020-09-11 14:41:03
 * @LastEditors: ty
 * @LastEditTime: 2021-02-26 14:04:05
 * @Introduce: 文件上传组件

 使用方法
 import fileUpload from "@common/components/fileUpload";
  components: { fileUpload }
  <file-upload
    @on-setInfo="getInfo"接收子组件传递过来的值
    @on-del="delFile"
    ref="fileInfos"
    :limitNumber="1" 限制上传文件个数
    :uplaodHeaders="uplaodHeaders" 请求头
    :myFileList="myFileList" 回显时传递的文件
    :fileText="fileTexts[0]" 按钮名称
    :isDis="this.dialogInfo.status == 'view' ? true : false"//是否禁用按钮
></file-upload>

-->

<template>
  <div class="filter-container">
    <el-upload
      class="upload-demofzp"
      ref="uploadFileAdd"
      action="/api/admin/fdfsfile/upload"
      :accept="accept"
      :show-file-list="show_file_name"
      :limit="limitNumber"
      :multiple="true"
      :before-remove="handleDel"
      :headers="uplaodHeaders"
      :auto-upload="false"
      :file-list="myFileList"
      :before-upload="handleBefore"
      :on-success="upSuccess"
      :on-change="handleChange"
      :on-exceed="handleExceed"
      :on-preview="handlePreview"
      :data="fileData"
      :disabled="isDis"
    >
      <el-button slot="trigger" size="small" type="primary" :disabled="isDis">{{fileText}}</el-button>
    </el-upload>
  </div>
</template>

<script>
import {
  getPageList,
  exportDetail,
  del,
  loaded,
  deleteById,
} from "@common/api/fileUpload/index.js";
import { getToken } from "@common/utils/auth";

export default {
  name: "",
  props: {
    isDis: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: String,
      default: ".doc,.docx,.pdf,.txt,.xlsx",
    },
    limitNumber: {
      type: Number,
      default: 1,
    },
    myFileList: {
      type: Array,
      default: {
        myFileList: [],
      }
    },
    uplaodHeaders: {
      type: Object,
      default: {},
    },
    fileText: {
      type: String,
      default: '',
    },
    batchParent: {
      type: String,
      default: "",
    },
    fileSize: {
      type: String,
      default: "300",
    },
  },
  data() {
    return {
      show_file_name: true, // 是否显示上传列表
      fileData: { batch: "" },
      batch2: this.batchParent,
      resData: {},
    };
  },
  created() {
    this.init();
  },
  watch: {
    resData: {
      handler(newValue, oldValue) {
        this.$emit("on-setInfo", this.resData);
      },
      deep: true,
    },
    batchParent:{
      handler(newValue, oldValue) {
        this.batch2 = newValue;
      },
      deep: true,
    },
    myFileList:{
      handler(newValue, oldValue) {
        this.myFileList = newValue;
        console.log('newValue',this.myFileList)
      },
      deep: true,
      immediate: true,

    }
  },

  computed: {},
  methods: {
    init() {
      // this.myFileList = [];
    },
    //  文件上传
    handleBefore(file) {
      // const isLt20M = file.size / 1024 / 1024 < 0.1;
      // if (!isLt20M) {
      //   this.$message.error("上传文件不能超过 20MB!");
      //   return
      // }
    },
    // 文件移除
    handleDel(file, fileList) {
        let id = "";
        if (file.response){
          id = file.response.data.file.id;
        }else {
          id = file.id;
        }
        this.$confirm(
            "附件将删除，无法恢复，请谨慎操作！",
            "提示",
            {
              confirmButtonText: "确定删除",
              cancelButtonText: "取消",
              type: "warning",
            }
          ).then(() =>{
            deleteById(id).then((res) => {
              if (res.rel) {
                this.$notify({
                  title: "提示",
                  message: "文件删除成功",
                  type: "success",
                  duration: 2000,
                });
                this.$emit("del-res", {flag:true,list:fileList});
                this.$emit("on-del", fileList);
              }
            });
          }).catch(() => {
            this.$nextTick(() =>{
              this.myFileList = fileList
            })
            this.$notify({
              title: "提示",
              message: "文件删除已取消",
              type: "success",
              duration: 2000,
            });
          })
    },
    // 文件预览
    handlePreview(file,fileList) {
      if (file.status == "success") {
        let downloadURl = "";
        if (file.response){
          downloadURl = file.response.data.file.downloadURl;
        }else {
          downloadURl = file.downloadURl;
        }
        let fileUrl = '/api' + downloadURl + '?token=' + getToken() ;
        window.location.href = fileUrl + "&ModelCode=" + window.mdcode
        // exportDetail(param);
      } else {
        this.$notify({
          title: "提示",
          message: "该附件未上传成功",
          type: "warning",
          duration: 2000,
        });
      }
    },
    //文件状态改变
    handleChange(file, fileList) {
      this.myFileList = fileList;
       if(fileList.length <2){
          this.fileData.batch = "";
       }else{
          this.fileData.batch = this.batch2;
       }
      const isLt20M = file.size / 1024 / 1024 < this.fileSize;
      if (!isLt20M) {
        this.$message.error(`上传文件不能超过 ${this.fileSize}MB!`);
        fileList.pop();
      }else{
        this.$refs.uploadFileAdd.submit();
      }
    },
    //上传成功
    upSuccess(response, file, fileList) {
      // console.log(file, fileList, response);
      let param = {
        res: response,
        fileList: fileList,
        file: file,
      };
      this.resData = param;
      // 上传成功后把值传给父组件
      this.$emit("on-setInfo", param);
      // 判断是否上传成功
      if (response.rel) {
        if (
          response.data.batch != "" &&
          typeof response.data.batch != undefined
        ) {
          this.batch2 = response.data.batch;
        }
      }
      let statusSuccess = true;
      fileList.forEach((item) => {
        if (item.status != "success") {
          statusSuccess = false;
        }
      });
      if (statusSuccess && response.rel) {
        this.$notify({
          title: "提示",
          message: "文件上传成功",
          type: "success",
          duration: 2000,
        });
      }
    },

    // 文件上传
    //文件超出个数限制
    handleExceed() {
      this.$notify({
        title: "导入提示",
        message: `导入最多上传${this.limitNumber}个`,
        type: "warning",
        duration: 2000,
      });
    },
    //上传失败
    uploadErr(response, file, fileList) {
      this.$notify({
        title: "导入提示",
        message: "导入失败",
        type: "warning",
        duration: 2000,
      });
    },
  },
};
</script>

<style scoped>
.typecode_select {
  width: 100%;
}
</style>
