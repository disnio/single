/*
 * @功能描述:
 * @版本:
 * @作者: 李志佳
 * @Date: 2020-05-22 11:06:38
 * @最新修改内容:
 * @LastEditTime: 2021-03-13 14:00:58
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";


/**
 * @功能描述: 江苏报表 - 年度长协汇总表
 * @参数:
 * @返回值:
 * @作者: 李志佳
 * @Date: 2019-12-07 16:38:47
 */
export function jssummary1(obj) {
    return fetch({
        url: '/api/business/jiangsu-report/summary1',
        method: 'get',
        params: obj
    });
}

// /**
//  * @功能描述: 导出
//  * @参数:
//  * @返回值:
//  * @作者: 张朋
//  * @Date: 2019-12-17 16:09:00
//  * @最新修改内容:
//  * @LastEditTime:
//  */
export function exportSummary1(params) {
    let token = getToken()
    let url = "/api/business/jiangsu-report/exportSummary1?token=" + token + "&ModelCode=" + sessionStorage.getItem("modelCode");
    for (let key in params) {
        if (typeof params[key] != 'undefined') {
            url += "&" + key + "=" + params[key];
        }
    }
    //window.open(url + "&ModelCode=" + window.mdcode);
    window.location.href = url + "&ModelCode=" + window.mdcode;

}
