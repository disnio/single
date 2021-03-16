/*
 * @功能描述: 
 * @版本: 
 * @作者: 张朋
 * @Date: 2019-12-19 19:16:50
 * @最新修改内容: 
 * @LastEditTime: 2021-03-13 14:01:40
 */

import fetch from '@common/utils/fetch';
import axios from "axios";
import { getToken } from "@common/utils/auth";

export function page(query) {
    return fetch({
        url: '/api/contract/htcontractcustomer/getPage',
        method: 'get',
        params: query
    });
}

/**
 * @功能描述: 获取用户名称
 * @参数: 
 * @返回值: 
 * @作者: 张朋
 * @Date: 2019-12-23 18:34:00
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function getCustomer(query) {
    return fetch({
        url: '/api/contract/htcontractcustomer/getCustomer',
        method: 'get',
        params: query
    });
}

/**
 * @功能描述: 新增
 * @参数: 
 * @返回值: 
 * @作者: 张朋
 * @Date: 2019-12-24 10:04:37
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function saveOrSubmit(query) {
    return fetch({
        url: '/api/contract/htcontractcustomer/saveOrSubmit',
        method: 'post',
        data: query
    });
}

/**
 * @功能描述: 根据合同公告id获取子数据
 * @参数: 
 * @返回值: 
 * @作者: 张朋
 * @Date: 2019-12-24 14:57:26
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function getDetailCustomerVOListSelect(query) {
    return fetch({
        url: '/api/contract/htcontractcustomer/getEleDecomposeList',
        method: 'post',
        params: query
    });
}

/**
 * @功能描述: 删除
 * @参数: 
 * @返回值: 
 * @作者: 张朋
 * @Date: 2019-12-24 15:33:21
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function delResultId(query) {
    return fetch({
        url: '/api/contract/htcontractcustomer/deleteByTableId',
        method: 'get',
        params: query
    });
}

/**
 * @功能描述: 电量调整
 * @参数: 
 * @返回值: 
 * @作者: 张朋
 * @Date: 2019-12-24 18:07:52
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function getVOListSelect(query) {
    return fetch({
        url: '/api/contract/htcontractcustomeradjust/getEleAdjust',
        method: 'get',
        params: query
    });
}

/**
 * @功能描述: 抽取
 * @参数: 
 * @返回值: 
 * @作者: 张朋
 * @Date: 2019-12-24 18:15:32
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function getExtractVOListSelect(query) {
    return fetch({
        url: '/api/contract/htcontractcustomeradjust/extract',
        method: 'get',
        params: query
    });
}

/**
 * @功能描述: 提交
 * @参数: 
 * @返回值: 
 * @作者: 张朋
 * @Date: 2019-12-24 21:33:51
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function submit(query) {
    return fetch({
        url: '/api/contract/htcontractcustomeradjust/submit',
        method: 'post',
        data: query
    });
}

/**
 * @功能描述: 导入解析
 * @参数: 
 * @返回值: 
 * @作者: 张朋
 * @Date: 2019-12-27 10:24:53
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function checkImprotInfo() {
    return fetch({
        url: '/api/contract/htTmpContractCustomer/checkImprotInfo',
        method: 'get',
        // data: query
    });
}

/**
 * @功能描述: 获取正确/错误的导入数据
 * @参数: 
 * @返回值: 
 * @作者: 张朋
 * @Date: 2019-12-27 10:36:59
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function getExceptpage(query) {
    return fetch({
        url: '/api/contract/htTmpContractCustomer/getEleDecomposeList',
        method: 'get',
        params: query
    });
}

/**
 * @功能描述: 确认入库
 * @参数: 
 * @返回值: 
 * @作者: 张朋
 * @Date: 2019-12-27 13:43:25
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function enterHouse(query) {
    return fetch({
        url: '/api/contract/htcontractcustomer/enterHouse',
        method: 'post',
        data: query
    });
}

/**
 * @功能描述: 导出
 * @参数: 
 * @返回值: 
 * @作者: 张朋
 * @Date: 2019-12-18 13:54:47
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function exportFile(params) {
    let token = getToken()
    let url = "/api/contract/htcontractcustomer/exportModelExcel?token=" + token
    for (let key in params) {
        if (typeof params[key] != 'undefined') {
            url += "&" + key + "=" + params[key];
        }
    }
    window.location.href = url + "&ModelCode=" + window.mdcode;

}

// 2020年05年09月 工单 #4011 批量删除
// /api/contract/htcontractcustomer/deleteListByTableIds
export function deleteListByTableIds(query) {
  return fetch({
    url: '/api/contract/htcontractcustomer/deleteListByTableIds',
    method: 'post',
    data: query
  });
}