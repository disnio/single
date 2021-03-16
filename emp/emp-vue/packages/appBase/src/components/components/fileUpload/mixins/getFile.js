/*
 * @Author: fengzp
 * @Date: 2020-10-16 09:59:10
 * @LastEditors: fengzp
 * @LastEditTime: 2021-02-01 13:00:24
 * @Introduce: Do not edit
 */
import { getFileByBatch, exportDetail } from "@common/api/fileUpload/index.js";
import { getToken } from "@/common/utils/auth";

export default {
  data() {
    return {
      fileHeight: "",
      myFileListFile: [], // 添加的文件列表
      show_file_name: true, // 是否显示上传列表
      fileTexts: "附件上传",
      enclosureFile: "",//传给后台的batch号
      batch: "",
    }
  },
  created() {
    this.uplaodHeaders = {
      Authorization: getToken(),
      ModelCode: sessionStorage.getItem("modelCode"),
    };
  },
  methods: {
    delFile(val) {
      this.myFileListFile = val;
      if (this.myFileListFile.length > 0) {
        this.fileHeight = this.myFileListFile.length * 40;
      } else {
        this.fileHeight = '25';
      }
    },
    getInfo(val) {
      this.enclosureFile = val.res.data.batch;
      this.myFileListFile = val.fileList;
      if (this.myFileListFile.length > 0) {
        this.fileHeight = this.myFileListFile.length * 40;
      } else {
        this.fileHeight = '25';
      }

    },
    // 根据批次号获取文件信息
    getFile(val) {
      if (val != "") {
        let param = {
          batch: val,
        };
        getFileByBatch(param).then((res) => {
          if (res.rel) {
            let fileArr = res.data;
            let myFileList2 = [];
            fileArr.forEach((item) => {
              myFileList2.push({
                id: item.id,
                name: item.filename,
                downloadURl: item.downloadURl,
              });
            });
            this.myFileListFile = myFileList2;
            if (this.myFileListFile.length > 0) {
              this.fileHeight = this.myFileListFile.length * 40;
            } else {
              this.fileHeight = '25';
            }
          }
        });
      }
    },
    getFileName(val) {
      if (val != "") {
        let param = {
          batch: val,
        };
        return new Promise((resolve, reject)=> {
          getFileByBatch(param).then((res) => {
            let fileArr = res.data;
              let myFileList2 = [];
              fileArr.forEach((item) => {
                myFileList2.push({
                  id: item.id,
                  name: item.filename,
                  downloadURl: item.downloadURl,
                });
              });
            resolve(myFileList2);
          })
          .catch((err) => {
            reject(err);
          });
        })
      }
    },
  }

}
