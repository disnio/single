/*
 * @功能描述: 
 * @版本: 
 * @作者: 李志佳
 * @Date: 2019-12-19 16:52:44
 * @最新修改内容: 
 * @LastEditTime : 2019-12-20 19:27:34
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

/**
 * @方法名称: getSystemRunInfo
 * @功能描述: 获取统计数据
 * @参数: 
 * @返回值: 
 * @作者: 李志佳
 * @Date: 2019-12-20 19:24:17
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function getSystemRunInfo(obj) {
    return fetch({
        url: '/api/dataplatform/countSytemInfo/getSystemRunInfo',
        method: 'get',
        params: obj
    });
}

/**
 * @方法名称: exportSystemRunInfo
 * @功能描述: 导出
 * @参数: 
 * @返回值: 
 * @作者: 李志佳
 * @Date: 2019-12-20 17:33:09
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function exportSystemRunInfo(type, value) {
    let token = getToken();
    let url = "/api/dataplatform/countSytemInfo/exportSystemRunInfo?token=" + token + "&ModelCode=" + sessionStorage.getItem("modelCode");
    if (type == 'week') {
        url += "&week=" + value;
    }else{
        url += "&month=" + value;
    }
    window.location.href = url;
}