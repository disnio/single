import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

//增值服务下拉
export function addedServicesName(addedServicesName) {
    return fetch({
        url: '/api/customer/khCustomerAddedServices/submitted?addedServicesName=' + addedServicesName,
        method: 'get',
    })
}
//===================================
//根据id查对象
export function getObj(contractId) {
    return fetch({
        url: '/api/contract/htContract/getOneContractInfo?contractId=' + contractId,
        method: 'get',
        params: 'obj'
    })
}


//下载附件
export function getDownloadFile(parm) {
    let token = getToken()
    let url = "/api/customer/tMdataCustomerTemp/downloadProofMaterialFile?token=" + token
    let customerId = parm.customerId
    if (customerId !== undefined && customerId !== "" && customerId !== null) {
        url += "&customerId=" + customerId
    }
    window.location.href = url + "&ModelCode=" + window.mdcode;
}
// 客户审批下载
export function downloadOneFile(parm) {
    let token = getToken()
    let url = "/api/admin/file/downloadFile?token=" + token + "&enclosures=" + encodeURI(parm.enclosures);
    window.open(url + "&ModelCode=" + window.mdcode);
}



export function getWaysOfCompensation() {
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=ways_of_compensation',
        method: 'get',
    });
}
///售电类型
export function getContractTypeCode() {
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=contract_type',
        method: 'get',
        params: ''
    });
}
export function getcompensation() {
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=compensation_breach_of_contract',
        method: 'get',
        params: ''
    });
}
export function getconditions() {
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=conditions_exemption_of_examination',
        method: 'get',
        params: ''
    });
}
export function getStateCode() {
    return getPropList('state')
}

export function getPropList(code) {
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=' + code,
        method: 'get',
        params: ''
    });
}
//模板ID
export function getContractType(data) {
    return fetch({
        url: '/api/contract/htContract/getTemplateByContractType?contractTypeCode=' + data, //网关
        //url: '/htContract/getTemplateByContractType?contractTypeCode=htlx03',//服务
        method: 'get',
        params: ''
    });
}
export function addObj(obj) {
    return fetch({
        url: '/api/contract/htContract/addInfo', //网关
        //url: '/htContract/addInfo',//服务
        method: 'post',
        data: obj
    });
}
export function delObj(id) {
    return fetch({
        url: '/api/contract/htContract/' + id, //网关
        //url: '/htContract/'+ id,//服务
        method: 'delete'
    })
}

//#3519 gaoaining 2020-01-14 添加子表删除接口
export function delDetailObj(id) {
    return fetch({
        url: '/api/contract/htTransferOfPowerGenerationRight/' + id,
        method: 'delete'
    })
}

// 导出
export function exportObj(parm) {
    let token = getToken()
    let url = "/api/contract/htContract/exportContract?token=" + token //网关
        //let url = "/htContract/exportContract?token=" + token//服务
    let name = parm.contractTypeCode
    let time = parm.status
    let people = parm.contractName
    if (name !== undefined && name !== "" && name !== null) {
        url += "&contractTypeCode=" + name
    }
    if (time !== undefined && time !== "" && time !== null) {
        url += "&status=" + time
    }
    if (people !== undefined && people !== "" && people !== null) {
        url += "&contractName=" + people
    }
    // window.open("@common/api/customer/khCustomerVisit/customer/exportVisiti?token=" + token);
    window.location.href = url + "&ModelCode=" + window.mdcode;

}
// 预览
// export function viewShow(parm) {
//   let token = getToken()
//   let url = "/api/contract/htContract/previewContract?token=" + token//网关
//   let contractId = parm.contractId

//   if (contractId !== undefined && contractId !== "" && contractId !== null) {
//     url += "&contractId=" + contractId
//   }
//   window.open (url) ;
// }

//预览
export function viewShow(parm) {
    let token = getToken()
    let urlstr = "/api/contract/htContract/previewContract?token=" + token //网关
    let contractId = parm.contractId

    if (contractId !== undefined && contractId !== "" && contractId !== null) {
        urlstr += "&contractId=" + contractId
    }
    return fetch({
        url: urlstr,
        method: 'get',
        data: String
    });
}

export function editObj(obj) {
    return fetch({
        url: '/api/contract/htContract/modifyInfo',
        method: 'post',
        data: obj
    })
}
//下载合同文件
export function download(contractIds) {
    let token = getToken()
    let url = '/api/contract/htContract/downloadContractFile?token=' + token;
    if (contractIds !== undefined && contractIds !== "" && contractIds !== null) {
        url += "&contractIds=" + contractIds
    }
    window.location.href = url + "&ModelCode=" + window.mdcode;

}

export function page(query) {
    return fetch({
        url: '/api/contract/htContract/PageList',
        method: 'get',
        params: query
    });
}

export function checkQueryPage(query) {
    return fetch({
        url: '/api/contract//htContractApprovalQuery/PageList',
        method: 'get',
        params: query
    });
}

// 拜访客户 模糊查询 下拉选择
export function getcustomerId(parme) {
    return fetch({
        url: "/api/customer/tMdataCustomer/getCustomerByCustomerName",
        method: "get",
        params: parme
    });
}
// 客户名称 模糊查询
export function getCustomerByName(parme) {
    return fetch({
        url: "/api/customer/tMdataCustomer/getCustomerListByName",
        method: "get",
        params: parme
    });
}

export function getAllocatedCustomerListByName(query) {
    return fetch({
        url: '/api/customer/tMdataCustomer/getAllocatedCustomerListByName',
        method: 'get',
        params: query
    })
}

/**
 * @方法名称: getAlreadyPage
 * @功能描述: 获取所有居间商
 * @参数:
 * @返回值:
 * @作者: 李志佳
 * @Date: 2020-01-03 19:23:13
 * @最新修改内容:
 * @LastEditTime:
 */
export function getAlreadyPage(query) {
    return fetch({
        url: '/api/customer/khCustomerRelation/page/getAlreadyPage',
        method: 'get',
        params: query
    })
}
/**
 * @方法名称: selectByMediatorId
 * @功能描述: 代理客户信息查询
 * @参数:
 * @返回值:
 * @作者: 李志佳
 * @Date: 2020-01-03 19:23:13
 * @最新修改内容:
 * @LastEditTime:
 */
export function selectByMediatorId(query) {
    return fetch({
        url: '/api/customer/mediatorAgency/selectByMediatorId',
        method: 'get',
        params: query
    })
}
/**
 * @方法名称: selectByMediatorIdAndCustomerName
 * @功能描述: 模糊客户信息查询
 * @参数:
 * @返回值:
 * @作者: 李志佳
 * @Date: 2020-01-03 19:23:13
 * @最新修改内容:
 * @LastEditTime:
 */
export function selectByMediatorIdAndCustomerName(query) {
    return fetch({
        url: '/api/customer/mediatorAgency/selectByMediatorIdAndCustomerName',
        method: 'get',
        params: query
    })
}
/**
 * @方法名称: getCustomerContactsByOrgId
 * @功能描述: 获取售电合同甲方联系人信息
 * @参数: customerId
 * @返回值: contacts，mobilePhone
 * @样式作用范围:
 * @作者: 滕超
 * @Date: 2019-11-15 14:38:15
 * @最新修改内容:
 * @LastEditTime:
 */
export function getCustomerContactsByOrgId(query) {
    return fetch({
        url: '/api/customer/tMdataCustomerContacts/getCustomerContactsByOrgId',
        method: 'get',
        params: query
    })
}

// 乙方
export function getSupplierCode(orgType) {
    return fetch({
        url: "/api/contract/htContract/geUserCompanyByOrgType?orgType=" + orgType,
        method: "get"
    });
}

// 乙方
export function getContractCode(parme) {
    return fetch({
        url: "/api/contract/htContract/geUserCompanyByOrgType",
        method: "get",
        params: parme
    });
}

//交易序列
export function getTransactionName(query) {
    return fetch({
        url: "/api/business/tradeNotice/getTradeListByNoticeName",
        method: "get",
        params: query
    });
}


export function visitPopleId(id) {
    return fetch({
        url: "/api/business/tradeNotice/" + id,
        method: "get",
        // params: query
    });
}

////根据主键获取交易品种、交易方式
export function getTransactionTypeName(jyTradingResultsId) {
    return fetch({
        url: "/api/business/jyTradingResults/getResultsById?jyTradingResultsId=" + jyTradingResultsId,
        method: "get",
        // params: query
    });
}
//发电方
export function getPowerGeneratorName(query) {
    return fetch({
        url: "/api/admin/org/getAllOrgByAttribute",
        method: "get",
        params: query
    });
}
//
/**
 * @方法名称: getInstalledCapacity
 * @功能描述: 查询装机容量
 * @参数:
 * @返回值:
 * @作者: 张朋
 * @Date: 2020-02-03 23:24:44
 * @最新修改内容:
 * @LastEditTime:
 */
export function getInstalledCapacity(query) {
    return fetch({
        url: "/api/admin/tradingUnit/getInstalledCapacityByOrgId",
        method: "get",
        params: query
    });
}
/**
 * @方法名称: getHtRecords
 * @功能描述: 合同台账修改记录查询接口
 * @参数:
 * @返回值:
 * @作者: frj
 * @issues: #2485
 * @Date: 2019-11-05 16:08:31
 * @最新修改内容:
 * @LastEditTime:
 */
export function getHtRecords(query) {
    return fetch({
        url: "/api/contract/htContractVersionRecord/page",
        method: "get",
        params: query
    });
}
/**
 * @方法名称: getContractColumnImportInfo
 * @功能描述: 获取合同台账导入数据状态信息-动态用电计划列信息
 * @参数:
 * @返回值:
 * @作者: frj
 * @issues:
 * @Date: 2020-01-09 13:08:39
 * @最新修改内容:
 * @LastEditTime:
 */
export function getContractColumnImportInfo(query) {
    return fetch({
        url: "/api/contract/htContractImportQuery/getContractColumnImportInfo",
        method: "get",
        params: query
    });
}

//交易公告查询所有信息
export function getTransactionNameAll() {
    return fetch({
        url: "/api/business//tradeNotice/all",
        method: "get",
    });
}

//==============================


export function fetchTree(query) {
    return fetch({
        url: '/api/admin/org/tree',
        method: 'get',
        params: query
    });
}
// 修改状态
export function updateStatus(params) {
    return fetch({
        url: '/api/contract/htContract/updateStatus',
        method: 'post',
        params: params
    });
}

//确认
export function confirm(params) {
    return fetch({
        url: '/api/contract/htContract/updateStatus',
        method: 'post',
        params: params
    });
}

//驳回
export function reject(params) {
    return fetch({
        url: '/api/contract/htContract/updateStatus',
        method: 'post',
        params: params
    });
}

//提交客户确认
export function toCustomerConfirmation(params) {
    return fetch({
        url: '/api/contract/htContract/updateStatus',
        method: 'post',
        params: params
    });
}

//合同模板下载
export function downContractTempFile(saleContractType) {
    let token = getToken();
    let url = "/api/contract/htContract/downloadContractTemplate?token=" + token + "&saleContractType=" + saleContractType;
    window.open(url + "&ModelCode=" + window.mdcode);
}
//合同模板数据文件上传
export function importContractFile(obj) {
    return fetch({
        url: '/api/contract/importFile/importFile',
        method: 'post',
        data: obj
    });
}

//合同数据入库
export function importContract(obj) {
    return fetch({
        url: '/api/contract/htContract/enterHouse',
        method: 'get',
        params: obj
    });
}
//合同台账导入数据状态信息查询
export function getContractImportInfo(obj) {
    return fetch({
        url: '/api/contract/htContractImportQuery/getContractImportInfo',
        method: 'get',
        params: obj
    });
}
//合同台账数据导出
export function exportDataErrData(fileType, saleContractType) {
    // return fetch({
    //   url: '/api/contract/htContractImportQuery/exportData',
    //   method: 'get',
    //   params: obj
    // });
    let token = getToken()
    let url = '/api/contract/htContractImportQuery/exportData?token=' + token + "&fileType=" + fileType + "&saleContractType=" + saleContractType;

    window.location.href = url + "&ModelCode=" + window.mdcode;
}
/**
 * @方法名称: getDimsByParentCodeAndValue
 * @功能描述: 查看用电计划表头维度
 * @参数:
 * @返回值:
 * @作者: frj
 * @issues: #2676
 * @Date: 2019-11-22 20:59:54
 * @最新修改内容:
 * @LastEditTime:
 */
export function getDimsByParentCodeAndValue(query) {
    return fetch({
        url: "/api/admin/dim/getDimsByParentCodeAndValue",
        method: "get",
        params: query
    });
}



/**
 * @方法名称: getbjfs
 * @功能描述: 根据模板id，获取报价方式
 * @作者: 郑文杰
 * @Date: 2019-12-17 15:32:36
 * @最新修改内容:
 * @LastEditTime: Do not edit
 */
export function getbjfs(query) {
    return fetch({
        url: "/api/contract/htTemplate/getContractPriceWay",
        method: "get",
        params: query
    });
}

// #3453 2020-01-10 张亮三 获取购售电合同附件月份
export function getFjmounth(query) {
    return fetch({
        url: '/api/contract/htContractAccessories/getDateList',
        method: 'get',
        params: query
    });
}

// #3453 2020-01-10 张亮三 购售电 合同附件新增保存
export function addFjinfo(obj) {
    return fetch({
        url: '/api/contract/htContractAccessories/addHtTemplateAccessoriesDetails',
        method: 'post',
        data: obj
    });
}
// #3453 2020-01-10 张亮三 购售电合同附件修改保存
export function updateaddFjinfo(obj) {
    return fetch({
        url: '/api/contract/htContractAccessories/addHtTemplateAccessoriesDetails',
        method: 'post',
        data: obj
    });
}
// #3453 2020-01-10 张亮三 购售电合同附件删除
export function deleteFjinfo(param) {
    return fetch({
        url: '/api/contract/htContractAccessories/deleteById',
        method: 'delete',
        params: param
    });
}

// #3453 2020-01-10 张亮三 购售电合同附件详情
export function getItemFjinfo(param) {
    return fetch({
        url: '/api/contract/htContractAccessories/getHtTemplateAccessoriesDetails',
        method: 'get',
        params: param
    });
}
// #3642  2020-02-03 gaoaining  获取模板接口
//获取模板下载数据
export function getModeList() {
    return fetch({
        url: '/api/contract/htContract/getAllTemplateType',
        method: 'get',
        params: ''
    });
}
