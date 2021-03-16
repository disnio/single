import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";
export function page(query) {
    return fetch({
        url: '/api/business/jyPowerBaseInfo/page',
        method: 'get',
        params: query
    });
}
//版本记录数据接口
export function editionPage(query) {
    return fetch({
        url: '/api/business/jyPowerBaseVersionRecord/page',
        method: 'get',
        params: query
    });
}

export function addObj(obj) {
    return fetch({
        url: '/api/business/jyPowerBaseInfo',
        method: 'post',
        data: obj
    });
}

export function getObj(id) {
    return fetch({
        url: '/api/business/jyPowerBaseInfo/' + id,
        method: 'get'
    })
}

export function delObj(id) {
    return fetch({
        url: '/api/business/jyPowerBaseInfo/' + id,
        method: 'delete'
    })
}

export function putObj(id, obj) {
    return fetch({
        url: '/api/business/jyPowerBaseInfo/' + id,
        method: 'put',
        data: obj
    })
}

// 获取交易单元数据 /tradingUnit/getTradingUnitbyTradingUnitName
export function getJydyObj(id) {
    return fetch({
        url: '/api/admin/tradingUnit/' + id,
        method: 'get'
    });
}

//取消提交 updateStatus
export function cancleSubmit(query) {
    return fetch({
        url: '/api/business/jyPowerBaseInfo/updateBaseInfoStatus',
        method: 'post',
        params: query
    });
}

// 
export function getjyListObj(query) {
    return fetch({
        url: '/api/admin/tradingUnit/getTradingUnitbyTradingUnitName2',
        method: 'get',
        params: query
    });
}

// daochu  /jyPowerBaseInfo/exportResultsList
export function exportObj(parm) {
    let token = getToken()
    let url = "@common/api/business/jyPowerBaseInfo/exportResultsList?token=" + token
    let orgId = parm.orgId
    let period = parm.period
    let status = parm.status
    if (orgId !== undefined && orgId !== "" && orgId !== null) {
        url += "&orgId=" + orgId
    }
    if (period !== undefined && period !== "" && period !== null) {
        url += "&period=" + period
    }
    if (status !== undefined && status !== "" && status !== null) {
        url += "&status=" + status
    }
    window.location.href = url + "&ModelCode=" + window.mdcode;
}

// 发电公司查询是的下拉数据  /api/admin/org/getOrgListByOrgId
export function fdgsSearchObj(query) {
    return fetch({
        url: '/api/admin/org/getOrgListByOrgId',
        method: 'get',
        params: query
    });
}