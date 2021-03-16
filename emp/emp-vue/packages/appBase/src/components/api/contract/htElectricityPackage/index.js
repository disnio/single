import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

export function page(query) {
    return fetch({
        url: '/api/contract/htElectricityPackage/list',
        method: 'get',
        params: query
    });
}

export function pageAudit(query) {
    return fetch({
        url: '/api/contract/htElectricityPackageApproval/getApprovalPagelist',
        method: 'get',
        params: query
    });
}



export function addObj(obj) {
    return fetch({
        url: '/api/contract/htElectricityPackage/addInfo',
        method: 'post',
        data: obj
    });
}

export function getObj(id) {
    return fetch({
        url: '/api/contract/htElectricityPackage/' + id,
        method: 'get'
    })
}

export function delObj(id) {
    return fetch({
        url: '/api/contract/htElectricityPackage/' + id,
        method: 'delete'
    })
}
//20191113 阿彪 添加删除套餐描述接口
export function deleteDetail(obj) {
    return fetch({
        url: '/api/contract/htElectricityPackage/deleteDetail?detailId=' + obj.detailId + '&state=' + obj.state + '&electricityPackageId=' + obj.electricityPackageId,
        method: 'delete'
    })
}

export function putObj(obj) {
    return fetch({
        url: '/api/contract/htElectricityPackage/modifyInfo',
        method: 'put',
        data: obj
    })
}
export function audit(id, obj) {
    return fetch({
        url: '/api/contract/htElectricityPackage/' + id,
        method: 'put',
        data: obj
    })
}

//套餐类型下拉框的值
export function contract_type_select() {
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=sale_Contract_type',
        method: 'get'
    })
}
//适用范围下拉框的值
export function scopeApplication_select() {
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=package_range',
        method: 'get'
    })
}

// 导出
export function exportObj(parm) {
    let token = getToken()
    let url = "/api/contract/htElectricityPackage/exportElectricityPackage?token=" + token
    let state = parm.state
        // let propCode = parm.propCode
    let templateType = parm.templateType
    let packageName = parm.packageName
    let orgId = parm.orgId;
    let electricityPackageIds  = parm.electricityPackageIds
    if (state !== undefined && state !== "" && state !== null) {
        url += "&state=" + state
    }
    // if (propCode !== undefined && propCode !== "" && propCode !== null) {
    //   url += "&status=" + propCode
    // }
    if (templateType !== undefined && templateType !== "" && templateType !== null) {
        url += "&templateType=" + templateType
    }
    if (packageName !== undefined && packageName !== "" && packageName !== null) {
        url += "&packageName=" + packageName
    }
    if (orgId !== undefined && orgId !== "" && orgId !== null) {
        url += "&orgId=" + orgId
    }
    if (electricityPackageIds !== undefined && electricityPackageIds !== "" && electricityPackageIds !== null) {
        url += "&electricityPackageIds=" + electricityPackageIds
    }
    url += "&ModelCode=" + sessionStorage.getItem("modelCode");
    // window.open("@common/api/customer/khCustomerVisit/customer/exportVisiti?token=" + token);
    window.location.href = url + "&ModelCode=" + window.mdcode;

}


// 套餐状态下拉数据
export function setMealStatusObj() {
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=state',
        method: 'get'
    })
}

// 合同模板下拉数据
export function ht_template_select(query) {
    return fetch({
        url: '/api/contract/htTemplate/getTemplateListByTypeAndState',
        method: 'get',
        params: query
    })
}

// 通过合同模板获取套餐类型
export function templateTypeData(id) {
    return fetch({
        url: '/api/contract/htTemplate/' + id,
        method: 'get'
    })
}
//
export function getPackageCodeList() {
    return fetch({
        url: '/api/contract/htElectricityPackage/getPackageCodeList',
        method: 'get'
    })
}

export function getPackageNameList() {
    return fetch({
        url: '/api/contract/htElectricityPackage/getPackageNameList',
        method: 'get'
    })
}

//取消提交
export function getCancelCom(query) {
    return fetch({
        url: '/api/contract/htElectricityPackage/updateStateById',
        method: 'post',
        params: query
    })
}


//预览
export function viewShow(parm) {
    let token = getToken()
    let urlstr = "/api/contract/htElectricityPackageApproval/previewTemplate?token=" + token //网关
    let templateId = parm.templateId

    if (templateId !== undefined && templateId !== "" && templateId !== null) {
        urlstr += "&templateId=" + templateId
    }
    return fetch({
        url: urlstr,
        method: 'get',
        data: String
    });
}

//审批
export function approveHtTemplate(query) {
    return fetch({
        url: '/api/contract/htElectricityPackageApproval/approveHtElectricityPackage',
        method: 'post',
        params: query
    })
}
//附件下载
export function downloadFile(param) {
    let token = getToken();
    let url = "/api/contract/htElectricityPackage/downloadFile?token=" + token + "&id=" + param.id + "&fileName=" + param.fileName;
    window.open(url + "&ModelCode=" + window.mdcode);
}
