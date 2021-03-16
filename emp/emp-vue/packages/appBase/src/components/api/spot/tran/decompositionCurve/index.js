import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// /smlongtermcontractdecom/getAllDataList
// 全部查询
export function getAllDataList(query) {
    return fetch({
        url: '/api/tran/smlongtermcontractdecom/getAllDataList',
        method: 'get',
        params: query
    })
}

// /smlongtermcontractdecom/getTitleByTradingCenterCode
// 获取表头
export function getTitleByTradingCenterCode(query) {
    return fetch({
        url: '/api/tran/smlongtermcontractdecom/getTitleByTradingCenterCode',
        method: 'get',
        params: query
    })
}

// /smlongtermcontractdecom/getTabInfoByTabCode
// 获取非时点关联指标
export function getTabInfoByTabCode(query) {
    return fetch({
        url: '/api/tran/smlongtermcontractdecom/getTabInfoByTabCode',
        method: 'get',
        params: query
    })
}

// /smlongtermcontractdecom/import-file
// 导入
export function importFile(query) {
    return fetch({
        url: '/api/tran/smlongtermcontractdecom/import-file',
        method: 'post',
        data: query
    })
}

// /smlongtermcontractdecom/import-jy
// 导入验证
export function importJy(query) {
    return fetch({
        url: '/api/tran/smlongtermcontractdecom/import-jy',
        method: 'get',
        params: query
    })
}

// /smlongtermcontractdecom/insertNoTimeRelatedData
// 导入中插入非时点关联数据
export function insertNoTimeRelatedData(query) {
    return fetch({
        url: '/api/tran/smlongtermcontractdecom/insertNoTimeRelatedData',
        method: 'post',
        data: query
    })
}

// /smlongtermcontractdecom/downloadTemplate
// 模板下载
export function downloadTemplate(data) {
    let token = getToken()
        // let url = "@common/api/tran/smlongtermcontractdecom/downloadTemplate?token=" + token
        //通用模板下载，所有使用这个表配置的功能都可以用这个生成动态模板，所有参数都必传
    let url = "@common/api/tran/smTranRuleConfigure/downloadTemplate?token=" + token
    for (let k in data) {
        let value = data[k] != undefined ? data[k] : "";
        url += `&${k}=${encodeURIComponent(value)}`;
    }
    window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}



// /smlongtermcontractdecom/export-cw-list
// 导出错误信息
export function downloadCwList(data) {
    let token = getToken()
    let url = "@common/api/tran/smlongtermcontractdecom/export-cw-list?token=" + token
    for (let k in data) {
        let value = data[k] != undefined ? data[k] : "";
        url += `&${k}=${encodeURIComponent(value)}`;
    }
    window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// /api/tran/smlongtermcontractdecom/import-file
export function importNofile(query) {
    return fetch({
        url: '/api/tran/smlongtermcontractdecom/import-nofile',
        method: 'post',

        data: query
    })
}
