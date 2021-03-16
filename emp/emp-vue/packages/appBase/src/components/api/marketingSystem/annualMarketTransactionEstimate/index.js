/*
 * @功能描述:
 * @版本:
 * @作者: 张朋
 * @Date: 2019-11-29 15:15:50
 * @最新修改内容:
 * @LastEditTime: 2021-03-13 14:03:36
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

/**
 * @功能描述: 全年市场交易规模预估表列表
 * @参数:
 * @返回值:
 * @作者: 张朋
 * @Date: 2019-11-29 15:46:54
 * @最新修改内容:
 * @LastEditTime:
 */
export function getAllDataById(query) {
    return fetch({
        url: '/api/business/jyannualmarkettransactionscaleinfo/getAllDataById',
        method: 'GET',
        params: query
    });
}

/**
 * @功能描述: 导出
 * @参数:
 * @返回值:
 * @作者: 张朋
 * @Date: 2019-11-29 16:09:00
 * @最新修改内容:
 * @LastEditTime:
 */
export function exportAllJmtsFile(params) {
    let token = getToken()
    let url = "/api/business/jyannualmarkettransactionscaleinfo/exportAllJmtsFile?token=" + token
    for (let key in params) {
        if (typeof params[key] != 'undefined') {
            url += "&" + key + "=" + params[key];
        }
    }
    //window.open(url + "&ModelCode=" + window.mdcode);
    window.location.href = url + "&ModelCode=" + window.mdcode;

}
