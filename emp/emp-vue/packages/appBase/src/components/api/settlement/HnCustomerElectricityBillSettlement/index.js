/*
 * @功能描述: 
 * @版本: 
 * @作者: frj
 * @Date: 2020-02-20 14:56:46
 * @最新修改内容: 
 * @LastEditTime: 2020-02-21 17:53:47
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";
/**
 * @方法名称: insertHNInfo
 * @功能描述: 选择期次完之后页面
 * @参数: 
 * @返回值: 
 * @作者: frj
 * @issues: 
 * @Date: 2020-02-20 14:58:59
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function insertHNInfo(query) {
    return fetch({
        url: '/api/balance/preSettlement/insertHNInfo',
        method: 'post',
        data: query
    });
}
/**
 * @方法名称: countHNDetail
 * @功能描述: 计算
 * @参数: 
 * @返回值: 
 * @作者: frj
 * @issues: 
 * @Date: 2020-02-2countHNDetail1 09:57:03
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function countHNDetail(query) {
    return fetch({
        url: '/api/balance/preSettlementDetail/countHNDetail',
        method: 'post',
        data: query
    });
}
/**
 * @方法名称: udpateHNDetailById
 * @功能描述: 修改
 * @参数: 
 * @返回值: 
 * @作者: frj
 * @issues: udpateHNDetailById
 * @Date: 2020-02-21 16:35:20
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function udpateHNDetailById(obj) {
    return fetch({
        url: '/api/balance/preSettlementDetail/udpateHNDetailById',
        method: 'put',
        data: obj
    });
}
export function exportObj(parm) {
    let token = getToken()
    let url = "/api/balance/preSettlementDetail/exportHNDetailList?token=" + token 
    let preSettlementId = parm.preSettlementId
  
    if (preSettlementId !== undefined && preSettlementId !== "" && preSettlementId !== null) {
      url += "&preSettlementId=" + preSettlementId
    }
  
    window.location.href = url + "&ModelCode=" + window.mdcode;
  
  }