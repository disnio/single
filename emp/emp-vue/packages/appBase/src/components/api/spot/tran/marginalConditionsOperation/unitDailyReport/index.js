import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";
// 全部查询
///smheatunitdecl/getAllDataList
export function getAllDataList(query) {
  return fetch({
    url: '/api/tran/smheatunitdecl/getAllDataList',
    method: 'get',
    params: query
  })
}

//模板下载 /smheatunitdecl/downloadTemplate
///smheatunitdecl/downloadTemplate
export function exportTemplate(data) {
  let token = getToken()
  let url = "@common/api/tran/smheatunitdecl/downloadTemplate?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// /smheatunitdecl/checkTheFile 上传 检查该文档是否存在
export function checkTheFile(query) {
  return fetch({
    url: '/api/tran/smheatunitdecl/checkTheFile',
    method: 'post',
    data: query
  })
}

