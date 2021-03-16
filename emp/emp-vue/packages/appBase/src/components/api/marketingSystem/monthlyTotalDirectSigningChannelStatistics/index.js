/*
 * @功能描述: 
 * @版本: 
 * @作者: 郑文杰
 * @Date: 2019-11-25 20:10:30
 * @最新修改内容: 
 * @LastEditTime: 2019-11-28 17:08:29
 */
import fetch from "@common/utils/fetch";
import { getToken } from "@common/utils/auth";
//电厂汇总查询
export function getList1(query) {
    return fetch({
        url: "",
        method: "get",
        params: query
    });
}
//售电汇总查询
export function getList2(query) {
    return fetch({
        url: "",
        method: "get",
        params: query
    });
}
//购电汇总查询
export function getList3(query) {
    return fetch({
        url: "",
        method: "get",
        params: query
    });
}
//导出
export function exportObj(parm) {
    let token = getToken()
    let url = "/api/business/jyannualmarkettransactionscaleinfo/exportStatisticsOfMonthlyTotalDirectSigningChannels?token=" + token
    let beginMonth = parm.beginMonth
    let endMonth = parm.endMonth
    let lableCode = parm.lableCode
    if (beginMonth !== undefined && beginMonth !== "" && beginMonth !== null) {
        url += "&beginMonth=" + beginMonth
    }
    if (endMonth !== undefined && endMonth !== "" && endMonth !== null) {
        url += "&endMonth=" + endMonth
    }
    if (lableCode !== undefined && lableCode !== "" && lableCode !== null) {
        url += "&lableCode=" + lableCode
    }
    window.location.href = url + "&ModelCode=" + window.mdcode;
}