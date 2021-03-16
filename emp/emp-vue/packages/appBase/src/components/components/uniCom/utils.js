/*
 * @Author: fengzp
 * @Date: 2020-12-02 18:34:29
 * @LastEditors: fengzp
 * @LastEditTime: 2021-03-13 15:46:54
 * @Introduce: Do not edit
 */
import {
  getFileByBatch,
  getPageList,
  exportDetail,
  del,
  loaded,
  deleteById,
} from "@common/api/fileUpload/index.js";
import { getToken } from "@common/utils/auth";

// 根据批次号获取文件信息
export function getFile(val, cb) {
  if (val !== "" && val !== undefined) {
    let param = {
      batch: val,
    };
    getFileByBatch(param).then((res) => {
      if (res.rel) {
        let fl = res.data && res.data.map((v) => {
          return {
            id: v.id,
            name: v.filename,
            downloadURl: v.downloadURl,
          };
        });
        cb(fl)
      }
    });
  }
}

export function exportFile(url, ids) {
  let token = getToken()
  let surl = url + ids + "?token=" + token;
  // window.location.href = surl
  window.open(surl + "&ModelCode=" + window.mdcode);
}
