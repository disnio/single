/*
 * @功能描述:
 * @版本:
 * @作者: frj
 * @Date: 2019-10-24 14:52:53
 * @最新修改内容:
 * @LastEditTime: 2019-12-06 14:44:55
 */
import fetch from '@common/utils/fetch';
import {getToken} from "@common/utils/auth";

export function getSelectList(params) {
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=' + params,
    method: 'get'
  })

}

//附件下载
export function downloadOneFile(enclosure) {
  let token = getToken();
  let url = "/api/admin/file/downloadFile?token=" + token + "&enclosures=" + encodeURI(enclosure);
  window.open(url + "&ModelCode=" + window.mdcode);
}

// 附件下载新
export function downloadOneFileUs1(parm) {
  let token = getToken()
  let url = "/api/admin/file/downloadFile?token=" + token + "&enclosures=" + encodeURI(parm.enclosures);
  window.open(url + "&ModelCode=" + window.mdcode);
}

/**
 * @方法名称: getHtRecords
 * @功能描述: 合同修改记录查询接口
 * @参数:
 * @返回值:
 * @作者: frj
 * @issues: #2485
 * @Date: 2019-11-05 16:08:31
 * @最新修改内容:
 * @LastEditTime:
 */
export function getHtRecords(query) {
  return fetch({
    url: "/api/contract/htContractVersionRecord/page",
    method: "get",
    params: query
  });
}

/**
 * @方法名称: getPageList
 * @功能描述: 营销计划管理修改记录查询接口
 * @参数:
 * @返回值:
 * @作者: 阿彪
 * @issues: #2511
 * @Date: 2019-11-14 16:08:31
 * @最新修改内容:
 * @LastEditTime:
 */
export function getPageList(query) {
  return fetch({
    url: "/api/policy/yxjhAdjustRecord/getPageList",
    method: "get",
    params: query
  });
}

/**
 * @方法名称: getDimsByParentPropCodes
 * @功能描述: 维度信息下拉窗口，多选级联，在全局唯一性校验开发完成之前，仅用于省市信息查询
 * @参数:
 * @返回值:
 * @作者: frj
 * @issues:
 * @Date: 2019-12-01 17:32:55
 * @最新修改内容:
 * @LastEditTime:
 */
export function getDimsByParentPropCodes(query) {
  return fetch({
    url: "/api/admin/dim/getDimsByParentPropCodes",
    method: "get",
    params: query
  });
}


/**
 * @方法名称: downloadReport
 * @功能描述: 下载报表
 * @参数:
 * @返回值:
 * @作者: 康如涛
 * @issues:
 * @Date: 2019-12-6 17:32:55
 * @最新修改内容:
 * @LastEditTime:
 */
export function downloadReport(issue) {
  let token = getToken()
  let url = "/api/dataplatform/common/exportPowerInfo?token=" + token + "&issue=" + issue;
  window.open(url + "&ModelCode=" + window.mdcode);
}
