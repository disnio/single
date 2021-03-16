/**
 * @file: down.js
 * @method
 * @return {type} argName - 批次号下载的混入
 * @description:
 * @author: wsc
 * @date: 2020-11-03
 */

// <el-button
//   v-for="f in scope.row.files"
//   size="small"
//   type="text"
//
// >
//   <span @click="downloadOut(f)">{{ f.name }}</span>
// </el-button>

import {
  exportDetail,
  deleteById,
} from "@common/api/fileUpload/index";
import {getFile} from "./utils";
import {getToken} from "@common/utils/auth";

const dw = {
  methods: {
    appendFiles(rows) {
      let rd = [];
      if (_.isArray(rows)) {
        rd = rows.map((v, i) => {
          v.files = [];
          v.batch = "";
          v.renderTpl = undefined;
          return v;
        });

        if (rd.length > 0) {
          _.forEach(rd, (v) => {
            if (this.hasFiles(v.enclosure)) {
              getFile(v.enclosure, (files) => {
                v.files = files;
              });
            }
          })

        }
      }
      return rd;
    },
    hasFiles(en) {
      return !_.isEmpty(en)
        && !_.isUndefined(en)
        && !_.isNull(en)
        && en !== 'null'
    },
    downloadIn(file) {
      if (file.status === "success") {
        let downloadURl = "";
        if (file.response) {
          downloadURl = file.response.data.file.downloadURl;
        } else {
          downloadURl = file.downloadURl;
        }
        window.location.href = '/api' + downloadURl + '?token=' + getToken() + "&ModelCode=" + window.mdcode;
      } else {
        this.$notify({
          title: "提示",
          message: "该附件未上传成功",
          type: "warning",
          duration: 2000,
        });
      }
    },
    downloadOut(file) {
      window.location.href = '/api' + file.downloadURl + '?token=' + getToken()+ "&ModelCode=" + window.mdcode
    },

  }
};

export default dw;
