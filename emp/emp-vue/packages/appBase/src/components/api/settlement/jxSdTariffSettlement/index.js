/*
 * @功能描述:  结算管理 - （江西）售电公司电费结算
 * @作者: 张亮三
 * @Date: 2019-12-09 10:34:43
 * @最新修改内容: 
 * @LastEditTime: 2019-12-16 13:11:47
 */

import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

//主表分页查询
export function getPageList(query) {
    return fetch({
        url: '/api/balance/jxSdgsDfjs/page',
        method: 'get',
        params: query
    });
}
//详情
export function selectFinanceById(query) {
    return fetch({
        url: '',
        method: 'get',
        params: query
    });
}

//验证期次的唯一性
export function checkPeriod(query) {
    //新增判断
    return fetch({
        url: "/api/balance/jxSdgsDfjs/checkPeriod",
        method: "get",
        params: query
    });
}
//抽取数据
export function getCalData(query) {
    return fetch({
        url: '/api/balance/jxSdgsDfjs/insertJXInfo',
        method: 'get',
        params: query
    });
}
//计算
export function calculateCQ(obj) {
    return fetch({
        url: '/api/balance/jxSdgsDfjs/countJXData',
        method: 'post',
        data: obj
    })
}
// 删除
export function delObj(id) {
    return fetch({
        url: '/api/balance/jxSdgsDfjs/'+id,
        method: 'delete'
    })
}

//添加保存
export function addObj(query,id) {
    return fetch({
        url: '/api/balance/jxSdgsDfjs/'+id,
        method: 'put',
        data: query
    });
}
