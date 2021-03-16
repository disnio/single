import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";


//获取列表
export function page(query) {
    return fetch({
        url: '/api/balance/hangingDecomposeElectric/getPageList',
        method: 'get',
        params: query
    });
}

//验证日期的唯一性
export function checkPeriod(query) {
    return fetch({
        url: "/api/balance/hangingDecomposeElectric/checkPeriod",
        method: "get",
        params: query
    });
}

export function getOneById(query) {
    return fetch({
        url: '/api/balance/hangingDecomposeDetail/selectByParamId',
        method: 'get',
        params: query
    });
}
//主表新增
export function addElectric(query) {
    return fetch({
        url: '/api/balance/hangingDecomposeElectric/insertOrUpdate',
        method: 'post',
        data: query
    });
}
export function modifyElectric(query) {
    return fetch({
        url: '/api/balance/hangingDecomposeElectric/insertOrUpdate',
        method: 'post',
        data: query
    });
}

//提交
export function updateSatus(query) {
    return fetch({
        url: '/api/balance/gdsdgsDfjs/updateSatus',
        method: 'get',
        params: query
    })
}

export function cancelCommit(query) {
    return fetch({
        url: '/api/balance/hangingDecomposeElectric/updateStateById',
        method: 'get',
        params: query
    })
}


//删除
export function delObj(query) {
    return fetch({
        url: '/api/balance/hangingDecomposeElectric/deleteHangingDecomposeElectricInfos',
        method: 'get',
        params: query
    })
}


//状态
export function getStateCode() {
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=state',
        method: 'get',
        params: ''
    });
}

//抽取
export function extract(query) {
    let data = {}
    data.jsDate = query;
    return fetch({
        url: '/api/balance/gdsdgsDfjs/getDfjsData',
        method: 'get',
        params: data
    });
}

export function all(query) {
    return fetch({
        url: '/api/balance/jsAdjustmentRecord/getPageList',
        method: 'get',
        params: query

    });
}

//添加保存
export function addDate(body) {
    return fetch({
        url: '/api/balance/fjsdgsDfjs/saveOrUpdate',
        method: 'post',
        data: body
    });
}

export function getCustomerByName(parme) { //客户名称模糊查询
    return fetch({
        url: "/api/customer/tMdataCustomer/getCustomerListByName",
        method: "get",
        params: parme
    });
}

/**
 * @方法名称: deleteDetailElectricInfo
 * @功能描述: 删除某一期次下的某个客户的挂牌电量分解
 * @参数: 
 * @返回值: 
 * @样式作用范围: 
 * @作者: 郑文杰
 * @Date: 2019-11-08 15:50:09
 * @最新修改内容: 
 * @LastEditTime: Do not edit
 */
export function deleteDetailElectricInfo(parme) {
    return fetch({
        url: "/api/balance/hangingDecomposeDetail/deleteDetailElectricInfo?hangDetailId=" + parme,
        method: "get"
    });
}