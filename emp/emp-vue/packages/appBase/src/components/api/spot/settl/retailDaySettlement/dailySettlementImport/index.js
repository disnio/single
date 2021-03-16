/**
 * @说明：零售日结算导入 or 查询
 * @作者：Wang Qiang
 * @Date：2019-10-30 16:55
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// 导入查询
export function getImplDataList(data) {
  return fetch({
    url: '/api/settl/smsettlcustelecgenimportgd/getImplDataList',
    method: 'get',
    params: data
  })
}

//异常Excel 导出
export function exportCwList(data) {
  let token = getToken()
  let url = "@common/api/settl/smsettlcustelecgenimportgd/export-cw-list?token=" + token + "&fileId=" + data.fileId
  window.location.href = url + "&ModelCode=" + window.mdcode;}

// 模板下载
export function exportMainObj(data) {
  let token = getToken()
  let url = "@common/api/settl/smsettlcustelecgenimportgd/downloadTemplate?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// 导出
export function exportFile(data) {
  let token = getToken()
  let url = "@common/api/settl/smsettlcustelecgenimportgd/exportFile?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// 验证是否已存在数据
export function checkAlreadyExists(data) {
  return fetch({
    url: '/api/settl/smsettlcustelecgenimportgd/checkAlreadyExists',
    method: 'get',
    params: data
  })
}

// 查询
export function getAllDataList(data) {
  return fetch({
    url: '/api/settl/smsettlcustelecgenimportgd/getAllDataList',
    method: 'get',
    params: data
  })
}
