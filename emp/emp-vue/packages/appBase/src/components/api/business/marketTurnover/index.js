/*
 * @功能描述:
 * @版本:
 * @作者: 滕超
 * @Date: 2019-11-04 09:28:34
 * @最新修改内容:
 * @LastEditTime: 2019-12-11 17:05:23
 */
import fetch from "@common/utils/fetch";
import { getToken } from "@common/utils/auth";
//列表接口
export function page(query) {
  return fetch({
    url: "/api/business/jyMarketCondition/getPageList",
    method: "get",
    params: query
  });
}
//报价方案列表分页查询
export function updateSatus(query) {
  return fetch({
    url: "/api/business/jyMarketCondition/updateSatus",
    method: "get",
    params: query
  });
}
// 修改记录分页查询
export function getPageList(query) {
  return fetch({
    url: '/api/business/jsAdjustmentRecord/getPageList',
    method: 'get',
    params: query
  });
}

//列表新增接口 #3088 更换接口 tengc  2019-12-11
export function addObj(obj) {
  return fetch({
    url: "/api/business/jyMarketCondition/addDataInfo",
    method: "post",
    data: obj
  });
}
//列表新增接口
export function calculate(obj) {
  return fetch({
    url: "/api/business/jyMarketCondition/calculate",
    method: "post",
    data: obj
  });
}

//编辑保存数据
// export function modifyInfo(obj) {
//   return fetch({
//     url: "/api/business/jyMarketCondition/" + obj.conditionId,
//     method: "put",
//     data: obj
//   });
// }
/**
 * @方法名称: modifyInfo
 * @功能描述: 更换编辑保存数据接口
 * @参数:
 * @返回值:
 * @样式作用范围:
 * @作者: 滕超
 * @Date: 2019-12-10 14:17:08
 * @最新修改内容:
 * @LastEditTime:
 */
export function modifyInfo(obj) {
  return fetch({
    url: "/api/business/jyMarketCondition/updateDataInfo",
    method: "post",
    data: obj
  });
}
//列表导出
export function exportObj(params) {
  let token = getToken();
  let url = "/api/business/jyMarketCondition/exportDataList?token=" + token;
  for (let key in params) {
    if (typeof params[key] == "undefined") {
    } else {
      url += "&" + key + "=" + params[key];
    }
  }
  url+="&ModelCode"+sessionStorage.getItem("modelCode");
  window.open(url + "&ModelCode=" + window.mdcode);

}
