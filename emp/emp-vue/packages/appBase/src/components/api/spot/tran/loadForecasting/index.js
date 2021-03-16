/*
 * @文件用途说明: 交易管理--负荷预测
 * @作者姓名: 阿彪
 * @Date: 2020-05-13 16:48:28
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// 列表
// 列表
export function page(query) {
    return fetch({
        url: '/api/tran/smLoadForecast/getPageList',
        method: 'get',
        params: query
    });
}
// 新增
export function insert(query) {
    return fetch({
        url: '/api/tran/smLoadForecast/addLoadForecast',
        method: 'post',
        data: query
    })
}
// 根据id删除信息 DELETE
export function deleteList(query) {
    return fetch({
        url: '/api/tran/smLoadForecast/deleteList',
        method: 'post',
        data: query
    })
}

//编辑页面第一个chart图，历史负荷趋势分析
export function getSample(query) {
    return fetch({
        url: '/api/tran/smLoadForecast/getSample',
        method: 'get',
        params: query
    });
}
// 编辑页面--查看样本电量
export function getSelectedLoad(query) {
    return fetch({
        url: '/api/tran/smLoadForecast/getSampleTimeEle',
        method: 'post',
        data: query
    });
}
//编辑页面--预测结果查询--Table表格数据+Echars数据--POST
export function getForeCastRealutAll(query) {
    return fetch({
        url: '/api/tran/smLoadForecast/getForeCastRealutAll',
        method: 'post',
        data: query
    })
}
// 编辑页面-- 判断预测数据是否存在--POST
export function checkIsExists(query) {
    return fetch({
        url: '/api/tran/smLoadForecast/checkIsExists',
        method: 'get',
        params: query
    })
}
// 编辑页面-- 保存预测结果--POST
export function addUserPowerForecastDetail(query) {
    return fetch({
        url: '/api/tran/smLoadForecast/addLoadForecastDetail',
        method: 'post',
        data: query
    })
}
// 主页面 和 编辑内页面的--导出按钮功能接口--GET
export function exportFile(data) {
    let token = getToken()
    let url = "@common/api/tran/smLoadForecast/exportFile?token=" + token
    for (let k in data) {
        let value = data[k] != undefined ? data[k] : "";
        url += `&${k}=${encodeURIComponent(value)}`;
    }
    window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}
// 3.1 查看页面--样本确认以及权重设置列表数据--GET
export function getSampleResultShow(query) {
    return fetch({
        url: '/api/tran/smLoadForecast/getSampleResultShow',
        method: 'get',
        params: query
    })
}
//  3.2 查看页面--预测结果查看--Table表格数据+Echars数据--GET
export function getForeCastRealutShow(query) {
    return fetch({
        url: '/api/tran/smLoadForecast/getForeCastRealutShow',
        method: 'get',
        params: query
    })
}

//获取企业参数
export function getForecastLoadContain(query) {
    return fetch({
        url: '/api/admin/parameter/getValueByOrgIdAndCode',
        method: 'get',
        params: query
    })
}

//负荷预测偏差分析
export function ycjgHistoryData(query) {
    return fetch({
        url: '/api/tran/smLoadForecast/getForecastResultAndHisRealLoadDeviationAnalysis',
        method: 'get',
        params: query
    })
}
