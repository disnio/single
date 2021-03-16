import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

//交易结果数据_日前市场节点电价-全部查询
export function getAllDataList(query) {
  return fetch({
    url: '/api/tran/smrecentlylmp/getAllDataList',
    method: 'get',
    params: query
  })
}

//校验数据是否已存在
export function checkAlreadyExists(query) {
  return fetch({
    url: '/api/tran/smrecentlylmp/checkAlreadyExists',
    method: 'get',
    params: query
  })
}

// 导入
export function importElectricityFile(query) {
    return fetch({
      url: '/api/tran/smrecentlylmp/importElectricityFile',
      method: 'post',
      data: query
    })
}

//节点出清价数据导入文件模板下载
export function downloadSmRecentlyLmpInfoTemplate() {
  let token = getToken()
  let url = "/api/tran/smrecentlylmp/downloadSmRecentlyLmpInfoTemplate?token=" + token
  window.location.href = url + "&ModelCode=" + window.mdcode;}
