/*
 * @Author: fengzp
 * @Date: 2020-11-19 12:16:35
 * @LastEditors: fengzp
 * @LastEditTime: 2020-11-19 12:16:35
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
