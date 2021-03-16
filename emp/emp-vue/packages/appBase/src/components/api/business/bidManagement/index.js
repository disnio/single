import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

//查询
export function getPage(query) {
    return fetch({
        url: '/api/business/jyAssitQuotation/page',
        method: 'get',
        params: query
    });
}
//新增
export function saveObj(query) {
    return fetch({
        url: '/api/business/jyAssitQuotation/insertOrUpdate',
        method: 'post',
        data: query
    });
}
//修改
export function updateObj(query) {
    return fetch({
        url: '/api/business/jyAssitQuotation/insertOrUpdate',
        method: 'post',
        data: query
    });
}
//删除
export function delObj(query) {
    return fetch({
        url: '/api/business/jyAssitQuotation/batchDelete',
        method: 'get',
        params: query
    });
}
//辅助服务报价导出
export function exportObj(params) {
    let token = getToken()
    let url = "/api/business/jyAssitQuotation/exportAssitQuotation?token=" + token
    for (let key in params) {
        url += "&" + key + "=" + params[key];
    }
    window.open(url + "&ModelCode=" + window.mdcode);

}
//通过组织ID，获取已分配给该组织的交易中心
export function getTradeCenter(query) {
    return fetch({
        url: '/api/basicData/tMdataJyorg/getDataListByOrgId',
        method: 'get',
        params: query
    })
}


//机组信息-根据电厂查询所有机组
export function getDeclare(query) {
    return fetch({
        url: '/api/admin/unitInforTable/getListAll',
        method: 'get',
        params: query
    })
}
//根据ID获取机组信息
export function getUnitById(query) {
    return fetch({
        url: '/api/admin/unitInforTable/getObjById',
        method: 'get',
        params: query
    })
}
//根据交易中心获取模板
export function selectByTradeCenter(query) {
    return fetch({
        url: '/api/business/jyAssitQuotationDetail/selectByTradeCenter',
        method: 'get',
        params: query
    })
}
//根据id查辅助服务报价详表
export function selectByAssitQuotationId(query) {
    return fetch({
        url: '/api/business/jyAssitQuotationDetail/selectByAssitQuotationId',
        method: 'get',
        params: query
    })
}

export function getCurrentUserOrg() {
    return fetch({
        url: '/api/admin/org/getCurrentUserOrg',
        method: 'get',
    })
}
