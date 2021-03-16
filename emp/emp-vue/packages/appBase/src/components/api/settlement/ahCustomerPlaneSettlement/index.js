/*
 * @功能描述: 
 * @版本: 
 * @作者: 李志佳
 * @Date: 2020-02-12 10:37:28
 * @最新修改内容: 
 * @LastEditTime: 2021-03-13 14:04:45
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// --- 主页面 ---

/**
 * @方法名称: page
 * @功能描述: 主页面查询
 * @参数: 
 * @返回值: 
 * @作者: 李志佳
 * @Date: 2020-02-25 10:36:25
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function page(param) {
  return fetch({
    url: '/api/balance/preSettlement/page',
    method: 'get',
    params: param
  });
}

export function addPeriod(param) {
  return fetch({
    url: '/api/balance/preSettlement/AhInsertSettlementInfo',
    method: 'get',
    params: param
  });
}

// --- 二级页面 ---
/**
 * @方法名称: getAHDetailinfo
 * @功能描述: 详情页面查询
 * @参数: 
 * @返回值: 
 * @作者: 李志佳
 * @Date: 2020-02-25 10:35:49
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function getAHDetailinfo(param) {
  return fetch({
    url: '/api/balance/preSettlementDetail/getAHDetailinfo',
    method: 'get',
    params: param
  });
}

/**
 * @方法名称: udpateAHDetailALL
 * @功能描述: 保存|提交
 * @参数: 
 * @返回值: 
 * @作者: 李志佳
 * @Date: 2020-02-25 14:05:26
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function udpateAHDetailALL(param, id, status) {
  return fetch({
    url: '/api/balance/preSettlementDetail/udpateAHDetailALL/' + id + '/' + status,
    method: 'put',
    data: param
  });
}

/**
 * @方法名称: deleteAHAll
 * @功能描述: 删除
 * @参数: 
 * @返回值: 
 * @作者: 李志佳
 * @Date: 2020-02-25 14:05:26
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function deleteAHAll(param) {
  return fetch({
    url: '/api/balance/preSettlementDetail/deleteAHAll',
    method: 'post',
    data: param
  });
}
/**
 * @方法名称: 
 * @功能描述: 导入解析
 * @参数: 
 * @返回值: 
 * @作者: 李志佳
 * @Date: 2020-02-27 09:32:29
 * @最新修改内容: 
 * @LastEditTime: 
 */
// export function persettlementImportInfo(flag) {
//   return fetch({
//       url: '/api/balance/importFile/persettlementImportInfo?description=preSettlementAH&iscorrect=' + flag,
//       method: 'get',
//   })
// }
//fengzp 2020-04-24 #3952 结算管理-售电侧-（安徽）客户电费结算-bug 增加分页功能
export function persettlementImportInfo(query) {
  return fetch({
      url: '/api/balance/importFile/persettlementImportInfo',
      method: 'get',
      params:query
  })
}

export function presettlementEnterHouse() {
  // 确认入库
  return fetch({
    url: "/api/balance/importFile/presettlementAHEnterHouse?description=preSettlementAH",
    method: "get",
  });
}

//模板下载
export function downTempFile(parm) {
  let token = getToken();
  let url = "/api/balance/preSettlementDetail/downTemplate?token=" + token
  let preSettlementId = parm.preSettlementId
  let provinceName = parm.provinceName
  let columns = parm.columns
  let titles = parm.titles

  if (preSettlementId !== undefined && preSettlementId !== "" && preSettlementId !== null) {
    url += "&preSettlementId=" + preSettlementId
  }
  if (provinceName !== undefined && provinceName !== "" && provinceName !== null) {
    url += "&provinceName=" + provinceName
  }
  if (columns !== undefined && columns !== "" && columns !== null) {
    url += columns
  }
  
  if (titles !== undefined && titles !== "" && titles !== null) {
    url += titles
  }
   url += "&modelCode=" + sessionStorage.getItem("modelCode");
  //  console.log(url)
  window.location.href = url + "&ModelCode=" + window.mdcode;
}

// --- 三级页面 ---
/**
 * @方法名称: getAHDetaillList
 * @功能描述: 户表号页面查询
 * @参数: 
 * @返回值: 
 * @作者: 李志佳
 * @Date: 2020-02-25 10:34:18
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function getAHDetaillList(param) {
  return fetch({
    url: '/api/balance/preSettlementDetail/getAHDetaillList',
    method: 'get',
    params: param
  });
}


export function udpateAHDetail(param, id, status) {
  return fetch({
    url: '/api/balance/preSettlementDetail/udpateAHDetail/' + id + '/' + status,
    method: 'put',
    data: param
  });
}
