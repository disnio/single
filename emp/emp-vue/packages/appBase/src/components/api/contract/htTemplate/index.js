import fetch from '@common/utils/fetch';
import axios from "axios";
import { getToken } from "@common/utils/auth";
// 获取审批历史

export function getApprovalHistory(query) {
    return fetch({
        url: '/api/admin/activiti/getApprovalHistoryByTemplateId',
        method: 'get',
        params: query
    });
}


export function page(query) {
    return fetch({
        url: '/api/contract/htTemplate/list',
        method: 'get',
        params: query
    });
}

export function getStatusBySaleContractType(obj) {
    return fetch({
        url: '/api/contract/htTemplate/checkTemplateName',
        method: 'get',
        params: obj
    });
}
export function addObj(obj) {
    return fetch({
        url: '/api/contract/htTemplate/addHtTemplate',
        method: 'post',
        data: obj
    });
}

export function isDelObj(id) {
    return fetch({
        url: '/api/contract/htTemplate/getStatusToDelete/' + id,
        method: 'get'
    })
}

export function getObj(id) {
    return fetch({
        url: '/api/contract/htTemplate/' + id,
        method: 'get'
    })
}

export function delObj(id) {
    return fetch({
        url: '/api/contract/htTemplate/' + id,
        method: 'delete'
    })
}

export function putObj(id, obj) {
    return fetch({
        url: '/api/contract/htTemplate/' + id,
        method: 'put',
        data: obj
    })
}

// 合同类型 下拉数据
export function htlx_select_Obj() {
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=contract_type',
        method: 'get'
    })
}

// 所属交易中心 下拉数据
export function jyorgId_select_Obj() {
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=trading_center',
        method: 'get'
    })
}

// 导出
export function exportObj(parm) {
    let token = getToken()
    let url = "/api/contract/htTemplate/exportHtTemplate?token=" + token
    let name = parm.templateTypeCode
    let time = parm.status
    let people = parm.templateName
    let templateIds = parm.templateIds
    if (name !== undefined && name !== "" && name !== null) {
        url += "&templateTypeCode=" + name
    }
    if (time !== undefined && time !== "" && time !== null) {
        url += "&status=" + time
    }
    if (people !== undefined && people !== "" && people !== null) {
        url += "&templateName=" + people
    }
    if (templateIds !== undefined && people !== "" && people !== null) {
        url += "&templateIds=" + templateIds
    }
    // window.open("@common/api/customer/khCustomerVisit/customer/exportVisiti?token=" + token);
    window.location.href = url + "&ModelCode=" + window.mdcode;

}

//下载预览的接口  "/api/contract/htTemplate/downloadFile?token=" + token+"&templateId="+id
export function yulan_Obj(id) {
    let token = getToken()
    return fetch({
        url: "/api/contract/htTemplate/downloadFile?token=" + token + "&templateId=" + id,
        method: 'get'

    })
}

// 状态下拉的接口
export function getStatusOptionsObj() {
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=Contract_template_status',
        method: 'get'
    })
}

//下载附件
export function getDownloadFile(parm) {
    let token = getToken()
    let url = "/api/contract/htTemplate/downloadFile?token=" + token
    let templateId = parm.templateId
    if (templateId !== undefined && templateId !== "" && templateId !== null) {
        url += "&templateId=" + templateId
    }
    window.location.href = url + "&ModelCode=" + window.mdcode;
}

//唯一性校验接口

export function UniqueCheck(query) {
    return fetch({
        url: '/api/contract/htTemplate/checkTemplateName',
        method: 'get',
        params: query
    })
}

//取消提交
export function getCancelCom(query) {
    return fetch({
        url: '/api/contract/htTemplate/updateStateById',
        method: 'get',
        params: query
    })
}

//获取交易中心
export function getTradeCenter(query) {
    return fetch({
        url: '/api/basicData/tMdataJyorg/getDataListByOrgId',
        method: 'get',
        params: query
    })
}

//获取当前用户信息
export function getCurrentUserInfo() {
    return fetch({
        url: '/api/admin/user/getCurrentUserInfo',
        method: 'get'
    })
}

/**
 * @方法名称: getModifyRecord
 * @功能描述: 修改记录分页查询
 * @参数:     {page,limit,originalId(主表id)}
 * @返回值:    对应的合同模板的记录
 * @样式作用范围: 
 * @作者: 郑文杰
 * @Date: 2019-11-04 18:55:30
 * @最新修改内容: 
 * @LastEditTime: Do not edit
 */
export function getModifyRecord(query) {
    return fetch({
        url: '/api/contract/htContractVersionRecord/page',
        method: 'get',
        params: query
    })
}