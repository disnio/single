import fetch from "@common/utils/fetch";
import axios from "axios";
import { getToken } from "@common/utils/auth";
export function page(query) {
    return fetch({
        url: '/api/basicData/tMdataJyorg/getPageList',
        method: 'get',
        params: query
    });
}

export function addObj(obj) {
    return fetch({
        url: '/api/basicData/tMdataJyorg',
        method: 'post',
        data: obj
    });
}

export function getObj(id) {
    return fetch({
        url: '/api/basicData/tMdataJyorg/' + id,
        method: 'get'
    })
}

export function delObj(id) {
    return fetch({
        url: '/api/basicData/tMdataJyorg/' + id,
        method: 'delete'
    })
}

export function putObj(id, obj) {
    return fetch({
        url: '/api/basicData/tMdataJyorg/' + id,
        method: 'put',
        data: obj
    })
}

export function exportObj(parm) {
    let token = getToken()
    let url = "@common/api/basicData/tMdataJyorg/export?token=" + token
    let name = parm.name
    let time = parm.time
    let people = parm.people
    if (name !== undefined && name !== "" && name !== null) {
        url += "&name=" + name
    }
    if (time !== undefined && time !== "" && time !== null) {
        url += "&time=" + time
    }
    if (people !== undefined && people !== "" && people !== null) {
        url += "&people=" + people
    }
    // window.open("@common/api/customer/khCustomerVisit/customer/exportVisiti?token=" + token);
    window.location.href = url + "&ModelCode=" + window.mdcode;

}

// 所属县
export function countySelectionObj(par) {
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=' + par,
        method: 'get'
    })
}
// 所属省
export function provincesSelectionObj() {
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=province',
        method: 'get'
    })
}
// 交易报价方式
export function quotationMethodSelectionObj() {
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=Quotation_method',
        method: 'get'
    })
}
// 依托电网
export function dworgCodeSelectionObj() {
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=power_grid',
        method: 'get'
    })
}
// 交易级别
export function jyorgJbSelectionObj() {
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=administrative_level',
        method: 'get'
    })
}

// 点击组织分配
export function organizationDistributionObj(obj) {
    return fetch({
        url: '/api/basicData/tjyorgRelation/page/getAlreadyOrgIdList',
        method: 'get',
        params: obj
    })
}

// 获取已分配信息 
export function haddistributionObj(obj) {
    // console.log(query)
    return fetch({
        url: '/api/admin/org/getAlreadyAllocatedOrgs',
        method: 'post',
        data: obj
    })
}
//获取未分配信息
export function hadUnDistributionObj(obj) {
    return fetch({
        url: '/api/admin/org/getNotAlreadyAllocatedOrgs',
        method: 'post',
        data: obj
    })
}

// 点击yi分配
export function handClickDialogDistributionObj(obj) {
    return fetch({
        url: '/api/basicData/tjyorgRelation',
        method: 'post',
        data: obj
    });
}

// 点击取消分配 
export function handClickDialogUnDistributionObj(obj) {
    return fetch({
        url: '/api/basicData/tjyorgRelation/unallocateOrgIdList',
        method: 'post',
        data: obj
    })
}


// 交易中心校验编码和名称
export function checkCodeAndName(obj) {
    return fetch({
        url: '/api/basicData/tMdataJyorg/checkJycenterCodeAndName',
        method: 'get',
        params: obj
    })
}