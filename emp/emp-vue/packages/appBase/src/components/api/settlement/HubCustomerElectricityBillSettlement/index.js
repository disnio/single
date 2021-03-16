/*
 * @功能描述:
 * @版本:
 * @作者: 秦侯珍
 * @Date: 2019-12-08 15:23:53
 * @最新修改内容:
 * @LastEditTime: 2019-12-08 19:00:36
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// 分页查询
export function getPageList(data) {
    return fetch({
        url: '/api/balance/preSettlement/page',
        method: 'get',
        params: data
    })
}

//验证期次的唯一性—已停用
export function checkInsertFlag(query) {
    //新增判断
    return fetch({
        url: "/api/balance/preSettlement/checkInsertFlag",
        method: "get",
        params: query
    });
}

//湖北-新增并验证唯一性
export function insertSettlementInfo(data) {
    return fetch({
        url: '/api/balance/preSettlement/insertSettlementInfo',
        method: 'get',
        params: data
    })
}

// 导出—已停用
export function exportExcel(data) {
    let token = getToken()
    let settlementDate = data.settlementDate
    let status = data.status
    let url = "/api/balance/preSettlementHb/exportExcelMain?token=" + token
    url += "&settlementDate=" + settlementDate + "&status=" + status
    window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// 删除
export function deleteListByIds(id) {
    return fetch({
        url: '/api/balance/preSettlement/' + id,
        method: 'delete'
    })
}

// 查看 分页查询
// export function getDetailPageList(data) {
//     return fetch({
//         url: '/api/balance/preSettlementDetail/page',
//         method: 'get',
//         params: data
//     })
// }

//详情 - 不分页
export function getDetailPageList(data) {
    return fetch({
        url: '/api/balance/preSettlementDetail/getDetailList',
        method: 'get',
        params: data
    })
}

// 湖北-详情页 导出
export function lookExportExcel(parme) {
    let token = getToken()
    let url = "/api/balance/preSettlementDetail/exportSettlementDetail?token=" + token
    let preSettlementId = parme.preSettlementId
    let provinceName = parme.provinceName
    let columns = parme.columns
    let titles = parme.titles

    if (preSettlementId !== undefined && preSettlementId !== "" && preSettlementId !== null) {
        url += "&preSettlementId=" + preSettlementId
    }
    if (provinceName !== undefined && provinceName !== "" && provinceName !== null) {
        url += "&provinceName=" + provinceName
    }
    if (columns !== undefined && columns !== "" && columns !== null) {
        url += columns
    }
    if (titles !== undefined && titles !== "" && titles !== null) {
        url += titles
    }
    //2020-2-25 #3378 zhangp 导出接口添加菜单编码
    url += "&modelCode=" + sessionStorage.getItem("modelCode");
    window.location.href = url
}


//湖北-详情信息页 计算
export function calcData(data) {
    return fetch({
        url: '/api/balance/preSettlementDetail/calcHuBeiData',
        method: 'post',
        data: data
    })
}

// 详情信息页 提交 保存
export function save(data, status) {
    return fetch({
        url: '/api/balance/preSettlementDetail/batchUpdate/' + status,
        method: 'post',
        data: data
    })
}
