/*
 * @功能描述: 
 * @版本: 
 * @作者: 滕超
 * @Date: 2019-11-27 21:49:21
 * @最新修改内容: 
 * @LastEditTime: 2021-03-13 14:04:36
 */

import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

//获取电厂交易台账汇总-合计-累计发电交易
export function getPowerLedgersSummary(query) {
    return fetch({
        url: '/api/dataplatform/powerLedgersSummary/getResult',
        method: 'POST',
        params: query
    });
}
//获取年度月度合计直接签约渠道统计表---电厂汇总
export function summary(query) {
    return fetch({
        url: '/api/dataplatform/signingChannels/summary',
        method: 'GET',
        params: query
    });
}

//获取年度月度合计直接签约渠道统计表--购电汇总
export function buyingSummary(query) {
    return fetch({
        url: '/api/dataplatform/signingChannels/buyingSummary',
        method: 'GET',
        params: query
    });
}

//获取年度月度合计直接签约渠道统计表--售电汇总
export function saleSummary(query) {
    return fetch({
        url: '/api/dataplatform/signingChannels/saleSummary',
        method: 'GET',
        params: query
    });
}

//获取年度月度合计直接签约渠道统计表--导出 
export function exportSummary(query) {
    let token = getToken()
    let url ='/api/dataplatform/signingChannels/exportSummary?yearOrMonth='+query.yearOrMonth+'&issue='+query.issue+"&token=" + token ;
    window.location.href = url + "&ModelCode=" + window.mdcode;
}