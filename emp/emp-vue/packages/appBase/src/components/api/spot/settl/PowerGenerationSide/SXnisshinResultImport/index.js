/*
 * @Author: fengzp
 * @Date: 2020-10-13 09:55:51
 * @LastEditors: fengzp
 * @LastEditTime: 2021-03-13 14:10:00
 * @Introduce: Do not edit
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// -------- 山西日清 导入相关  start-------

//校验数据是否已经存在
export function checkAlreadyExists(query) {
    return fetch({
      url: '/api/settl/elecgenimportsx/import-jy',
      method: 'post',
      data: query
    })
  }

  // 山西日清数据查询
  export function getAllDataList(query) {
      return fetch({
        url: '/api/settl/elecgenimportsx/getAllDataList',
        method: 'get',
        params: query
      })
    }

  // 导入
  export function importFile(query) {
      return fetch({
        url: '/api/settl/elecgenimportsx/import-file',
        method: 'post',
        data: query
      })
  }


  //真* 异常Excel 导出
  export function exportCwList(data) {
    let token = getToken()
    let url = "@common/api/settl/elecgenimportsx/export-cw-list?token=" + token + "&fileId=" + data.fileId + "&transtypeCode=" + data.transtypeCode
    window.location.href = url + "&ModelCode=" + window.mdcode;  }

  // 主页面导出
  export function exportMainObj(data) {
    let token = getToken()
    let url = "@common/api/settl/elecgenimportsx/export?token=" + token
    for (let k in data) {
      let value = data[k] != undefined ? data[k] : "";
      url += `&${k}=${encodeURIComponent(value)}`;
    }
    window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
  }

  //模板下载
  export function downloadContractTemplate(data) {
    let token = getToken()
    let url = "/api/settl/elecgenimportsx/downloadContractTemplate?token=" + token
    window.location.href = url + "&ModelCode=" + window.mdcode;  }

  // -------- 山西日清 导入相关  end-------
