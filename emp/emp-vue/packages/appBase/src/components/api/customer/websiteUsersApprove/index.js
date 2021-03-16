/*
 * @Author: fengzp
 * @Date: 2020-10-13 09:55:51
 * @LastEditors: fengzp
 * @LastEditTime: 2021-03-13 14:03:20
 * @Introduce: Do not edit
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";


export function page(query) {
return fetch({
url: '/api/customer/webUserAudit/getPageList',
method: 'get',
params: query
});
}

export function changeStatus(query) {
return fetch({
    url: '/api/customer/webUserAudit/completeApproval',
    method: 'post',
    params: query
  });
} 

//附件下载
  export function getDownloadFile(parm) {
    let token = getToken() 
    let url = "/api/customer/webUserAudit/downloadAttachment?token=" + token
    let wuId = parm.wuId
    if (wuId !== undefined && wuId !== "" && wuId !== null) {
      url += "&wuId=" + wuId
    }
    window.location.href = url + "&ModelCode=" + window.mdcode;
  }
