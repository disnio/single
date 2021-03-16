/*
 * @Author: fengzp
 * @Date: 2020-03-26 09:00:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-15 10:05:37
 * @Introduce: Do not edit
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

export function selectProvince(params) { //获取省市区
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=' + params,
        method: 'get'
    })
}

// 所属行业下拉数据
export function customerIndustryObj() {
    return fetch({
        url: "/api/admin/dim/khhyTree?propCode=customer_profession",
        method: "get"
    });
}

// 主页面--新增数据接口--POST
export function addUserPowerForecast(query) {
    return fetch({
        url: '/api/tran/smUserPowerForecast/addUserPowerForecast',
        method: 'post',
        data: query
    })
}


//   主页面--主列表查询接口--GET
export function getAllDataList(query) {
    return fetch({
        url: '/api/tran/smUserPowerForecast/getPageList',
        method: 'get',
        params: query
    })
}
//获取样本期次
export function getCheckDate(query) {
    return fetch({
        url: '/api/tran/smUserPowerForecast/getDate',
        method: 'get',
        params: query
    })
}

//   主页面--删除数据接口--POST
export function deleteList(query) {
    return fetch({
        url: '/api/tran/smUserPowerForecast/deleteList',
        method: 'post',
        data: query
    })
}


// 编辑页面--历史用电量趋势、样本选择、样本确认以及权重设置 统一接口--GET
export function getSample(query) {
    return fetch({
        url: '/api/tran/smUserPowerForecast/getSample',
        method: 'get',
        params: query
    })
}

//2.2 编辑页面--查看样本电量--POST
export function getSampleTimeEle(query) {
    return fetch({
        url: '/api/tran/smUserPowerForecast/getSampleTimeEle',
        method: 'post',
        data: query
    })
}

//编辑页面--预测结果查询--Table表格数据+Echars数据--POST
export function getForeCastRealutAll(query) {
    return fetch({
        url: '/api/tran/smUserPowerForecast/getForeCastRealutAll',
        method: 'post',
        data: query
    })
}

// 编辑页面-- 判断预测数据是否存在--POST
export function checkIsExists(query) {
    return fetch({
        url: '/api/tran/smUserPowerForecast/checkIsExists',
        method: 'get',
        params: query
    })
}

// 编辑页面-- 保存预测结果--POST
export function addUserPowerForecastDetail(query) {
    return fetch({
        url: '/api/tran/smUserPowerForecast/addUserPowerForecastDetail',
        method: 'post',
        data: query
    })
}

// 3.1 查看页面--样本确认以及权重设置列表数据--GET
export function getSampleResultShow(query) {
    return fetch({
        url: '/api/tran/smUserPowerForecast/getSampleResultShow',
        method: 'get',
        params: query
    })
}

//  3.2 查看页面--预测结果查看--Table表格数据+Echars数据--GET
export function getForeCastRealutShow(query) {
    return fetch({
        url: '/api/tran/smUserPowerForecast/getForeCastRealutShow',
        method: 'get',
        params: query
    })
}


// 主页面--用电企业名模糊查询--GET
export function getListByUserCompanyName(query) {
    return fetch({
        url: '/api/tran/smUserPowerImport/getListByUserCompanyName',
        method: 'get',
        params: query
    })
}
// 偏差分析页面-获取预测结果偏差分析表格--GET
export function getOffset(query) {
    return fetch({
        url: '/api/tran/smUserPowerForecast/getOffset',
        method: 'get',
        params: query
    })
}

// 主页面--生成汇总方案--新增接口--POST
export function addUserPowerForecastHZ(query) {
    return fetch({
        url: '/api/tran/smUserPowerForecast/addUserPowerForecastHZ',
        method: 'post',
        data: query
    })
}

// 主页面 和 编辑内页面的--导出按钮功能接口--GET
export function exportFile(data) {
    let token = getToken()
    let url = "@common/api/tran/smUserPowerForecast/exportFile?token=" + token
    for (let k in data) {
      let value = data[k] != undefined ? data[k] : "";
      url += `&${k}=${encodeURIComponent(value)}`;
    }
    window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
  }

