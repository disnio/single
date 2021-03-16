import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";
// 导入接口 2020/10/28
export function importFile(param) {
    return fetch({
        url: `/api/customer/importFile/importFile`,
        method: 'post',
        data:param
    });
  }


// 删除签约状态
export function deleteStatus(id) {
    return fetch({
        url: `/api/customer/KhCustomerEquityInformation/delete/${id}`,
        method: 'post',
    });
  }
  
export function page(query) {
    return fetch({
        url: '/api/customer/khCustomerRelation/page/getPage',
        // url: '/api/customer/tMdataCustomer/page',
        method: 'get',
        params: query
    });
}
// 联系人修改接口
// /tMdataCustomerContacts/update
export function updateContract(obj) {
    return fetch({
        url: '/api/customer/tMdataCustomerContacts/update/' + obj.contactId,
        method: 'post',
        data: obj
    });
}

// 签约状态组织内状态查询表格数据  /khCustomerSigningStatus
export function getStatusIn(query) {
    return fetch({
        url: '/api/customer/khCustomerSigningStatus',
        method: 'get',
        params: query
    });
}
// /KhCustomerEquityInformation/addInfo 签约状态
export function addInfoEquity(obj) {
    return fetch({
        url: '/api/customer/KhCustomerEquityInformation/addInfo',
        method: 'post',
        data: obj
    });
}

// /KhCustomerEquityInformation/getPageListByCustomerId/{id} 客户id
export function getListEquity(id) {
    return fetch({
        url: `/api/customer/KhCustomerEquityInformation/getPageListByCustomerId/${id}`,
        method: 'get',
    });
}
// 修改签约状态
// /KhCustomerEquityInformation/update  给我传主键id  post请求
export function modifyInfoEquity(obj) {
    return fetch({
        url: '/api/customer/KhCustomerEquityInformation/update',
        method: 'put',
        data: obj
    });
}




export function getNotAlreadyPage(query) {
    return fetch({
        url: '/api/customer/khCustomerRelation/page/getNotAlreadyPage',
        method: 'get',
        params: query
    });
}


export function getAlreadyPage(query) {
    return fetch({
        url: '/api/customer/khCustomerRelation/page/getAlreadyPage',
        // url: '/api/customer/tMdataCustomer/getAlreadyPage', 
        method: 'get',
        params: query
    });
}

export function fetchTree(query) {
    return fetch({
        url: '/api/admin/org/tree',
        method: 'get',
        params: query
    });
}
// 20191203 wangc #2924 获取所有上级组织名称
export function getAllpOrgName() {
    return fetch({
        url: '/api/admin/org/getAllpOrgName',
        method: 'get'
    });
}


export function addObj(obj) {
    return fetch({
        url: '/api/customer/tMdataCustomer',
        method: 'post',
        data: obj
    });
}

export function getObj(id, param) {
    return fetch({
        url: '/api/customer/tMdataCustomer/getCustomerById/' + id,
        method: 'get',
        params: param
    })
}


export function delObj(id) {
    return fetch({
        url: '/api/customer/tMdataCustomer/' + id,
        method: 'delete'
    })
}

export function putObj(id, obj) {
    return fetch({
        url: '/api/customer/tMdataCustomer/' + id,
        method: 'put',
        data: obj
    })
}


export function addJcxxObj(obj) { //基础信息添加
    return fetch({
        url: '/api/customer/tMdataCustomer/insertCustomer',
        method: 'post',
        data: obj
    })
}

export function getJcxxObj(id) { //基础信息编辑获取信息
    return fetch({
        url: '/api/customer/tMdataCustomer/getOneById/' + id,
        method: 'get'
    })
}

export function putJcxxObj(id, obj) { //基础信息编辑保存
    return fetch({
        url: '/api/customer/tMdataCustomer/updateCustomer',
        method: 'put',
        data: obj
    })
}

export function delJcxxObjFlug(id) { //判断是否能删除
    return fetch({
        url: '/api/customer/tMdataCustomer/getStatusToDelete?customerIds=' + id,
        method: 'get'
    })
}

export function delJcxxObj(id) { //基础信息删除
    return fetch({
        url: '/api/customer/tMdataCustomer/' + id,
        method: 'delete'
    })
}

export function addYdxxObj(obj) { //用电信息添加
    return fetch({
        url: '/api/customer/tMdataCustomerPower',
        method: 'post',
        data: obj
    })
}

export function getYdxxObj(id) { //用电信息编辑获取信息
    return fetch({
        url: '/api/customer/tMdataCustomerContacts/' + id,
        method: 'get'
    })
}

export function putYdxxObj(obj) { //用电信息编辑保存
    return fetch({
        url: '/api/customer/tMdataCustomerPower/' + obj.powerId,
        method: 'put',
        data: obj
    })
}

export function delYdxxObj(id) { //用电信息删除
    return fetch({
        url: '/api/customer/tMdataCustomerPower/' + id,
        method: 'delete'
    })
}

export function addLxrObj(obj) { //联系人信息添加
    return fetch({
        //url: '/api/customer/tMdataCustomerContacts',
        url: '/api/customer/tMdataCustomerContacts',
        method: 'post',
        data: obj
    })
}

export function getLxrObj(id) { //联系人信息编辑获取信息
    return fetch({
        url: '/api/customer/tMdataCustomerContacts/' + id,
        method: 'get'
    })
}

export function putLxrObj(obj) { //联系人信息编辑保存
    return fetch({
        url: '/api/customer/tMdataCustomerContacts/' + obj.contactId,
        method: 'put',
        data: obj
    })
}

export function delLxrObj(id) { //联系人信息删除
    return fetch({
        url: '/api/customer/tMdataCustomerContacts/' + id,
        method: 'delete'
    })
}

// #4045 2020-05-25 gaoaining 修改接口
export function getYdxxListNew(id,query) { //获取用电信息
    return fetch({
        url: '/api/customer/tMdataCustomerPower/getPageListByCustomerId/' + id,
        method: 'get',
        params: query
    })
}

export function getYdxxList(id) { //获取用电信息
    return fetch({
        url: '/api/customer/tMdataCustomerPower/getListByCustomerId/' + id,
        method: 'get'
    })
}

export function getLxrList(id) { //获取联系人列表
    return fetch({
        url: '/api/customer/tMdataCustomerContacts/getListByCustomerId/' + id,
        method: 'get'
    })
}
// #3303 2019-12-30 张亮三 历史用电量 start
export function getHistoryPower(obj,id) { //初始化获取历史用电量数据列表
    return fetch({
        url: '/api/customer/tMdataCustomerPowerHistory/getListByCustomerId/' + id,
        method: 'get',
        params:obj
    })
}

export function updateHistoryPower(Params,id) { //根据id编辑历史用电量数据
    return fetch({
        url: '/api/customer/tMdataCustomerPowerHistory/'+id,
        method: 'put',
        data:Params
    })
}

export function deleteHistoryPower(id) { //根据id删除历史用电量数据
    return fetch({
        url: '/api/customer/tMdataCustomerPowerHistory/' + id,
        method: 'DELETE'
    })
}

export function addHistoryPower(params) { //根据id删除历史用电量数据
    return fetch({
        url: '/api/customer/tMdataCustomerPowerHistory',
        method: 'post',
        data:params
    })
}
// #3303 2019-12-30 张亮三 历史用电量 end

export function selectSex() { //获取性别
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=sex',
        method: 'get'
    })

}

export function selectProvince(params) { //获取省市区
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=' + params,
        method: 'get'
    })
}

export function selectSsdw(params) { //获取所属电网
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=power_grid',
        method: 'get'
    })
}

// export function selectRate() {//获取联客户等级
//   return fetch({
//     url: '/api/admin/dim/getDimByPropCode?propCode=customer_rate',
//     method: 'get'
//   })
// }

export function selectObj(params) { //获取下拉框
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=' + params,
        method: 'get'
    })
}

export function allot(obj) { //分配
    return fetch({
        url: '/api/customer/khCustomerRelation',
        method: 'post',
        data: obj
    });
}

// export function remove(id) {//解除分配
//   return fetch({
//     url: '/api/customer/khCustomerRelation/' + id,
//     method: 'delete'
//   })
// }
export function remove(obj) { //解除分配
    return fetch({
        url: '/api/customer/khCustomerRelation/checkCustomer',
        method: 'post',
        data: obj

    })
}

export function getCodeList(id) { //信用代码集合
    return fetch({
        url: '/api/customer/tMdataCustomer/getSocialCreditCodeList',
        method: 'get'
    })
}

export function getMeterNumberList(id) { //户表号集合
    return fetch({
        url: '/api/customer/tMdataCustomerPower/getMeterNumberList',
        method: 'get'
    })
}

export function customerFuzzyQuery(parme) { //客户名称模糊查询
    return fetch({
        url: "/api/customer/tMdataCustomer/getCustomerByCustomerName",
        method: "get",
        params: parme
    });
}

export function selectLevel(query) {
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=customer_rate',
        method: 'get',
        params: query
    });
}


export function getAllOrgByPorgId(query) { //获取父节点orgid
    return fetch({
        url: '/api/admin/org/getAllOrgByPorgId',
        method: 'get',
        params: query
    });
}

//获取区域公司的新接口
export function getAllAreaCompanies(query) {
    return fetch({
        url: '/api/admin/org/getAllAreaCompanies',
        method: 'get',
        params: query
    });
}
//获取电厂的新接口
export function getOrgsByPOrgCode(query) {
    return fetch({
        url: '/api/admin/org/getOrgsByPOrgCode',
        method: 'get',
        params: query
    });
}
// export function getAllOrgByPorgId(pOrgId) {//获取父节点orgid
//   return fetch({
//       url: '/api/admin/org/getAllOrgByPorgId?pOrgId='+pOrgId,
//       method: 'get'
//   });
// }
export function getAllotOrg(obj) { //获取已分配组织
    return fetch({
        url: '/api/customer/khCustomerRelation/getDistributionedOrgList',
        method: 'post',
        data: obj
    });
}

export function getUnAllotOrg(query) { //获取未分配组织
    return fetch({
        url: '/api/admin/org/getCanDistributionedOrgs',
        method: 'get',
        params: query
    });
}

export function getGrounpLists(name) { //获取所属企业集团
    return fetch({
        url: '/api/customer/tMdataCustomer/getCustomerListByCustName?custName=' + name,
        method: 'get'
    });
}


// 客户类别下拉数据
export function customerCategoryObj() {
    return fetch({
        url: "/api/admin/dim/getDimByPropCode?propCode=customer_type",
        method: "get"
    });
}

export function selectIndustry() { //获取所属行业 
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=customer_profession',
        method: 'get'
    })
}
export function selectqyzt() { //获取联签约状态
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=contract_status',
        method: 'get'
    })
}

export function selectKhlb(query) {
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=customer_type',
        method: 'get',
        params: query
    });
}

// 所属省份下拉数据
export function customerProvinceObj() {
    return fetch({
        url: "/api/admin/dim/getDimByPropCode?propCode=province",
        method: "get"
    });
}

// 所属行业下拉数据
export function customerIndustryObj() {
    return fetch({
        url: "/api/admin/dim/khhyTree?propCode=customer_profession",
        method: "get"
    });
}

// 签约状态下拉数据
export function customerSignContractStatusObj() {
    return fetch({
        url: "/api/admin/dim/getDimByPropCode?propCode= customer_audit_state",
        method: "get"
    });
}

//客户联系人下拉框数据获取（新增联系人）
export function getCustomerLeader(query) {
    return fetch({
        url: "/api/customer/tMdataCustomerContacts/getCustonerContactsByOrgId",
        method: "get",
        params: query
    });
}
//销售组
export function getAllSaleGroupByOrgId(query) {
    return fetch({
        url: "/api/admin/sale-group/getAllSaleGroupByOrgId",
        method: "get",
        params: query
    });
}
//销售组
export function getsaleMan(query) {
    return fetch({
        url: "/api/admin/sale-man/list",
        method: "get",
        params: query
    });
}

//客户导入
// export function importCustomer(obj) {
//   return fetch({
//     url: "/api/customer/tMdataCustomer/importCustomer",
//     method: 'post',
//     data: obj
//   });
// }

//客户入库
export function importCustomer(query) {
    return fetch({
        url: "/api/customer/tMdataCustomer/enterHouse",
        method: 'get',
        params: query
    });
}

//客户信息模板下载
export function downloadImportTemplate() {
    let token = getToken()
    let url = "/api/customer/tMdataCustomer/downloadCustomerImportTemplate?token=" + token
    window.location.href = url + "&ModelCode=" + window.mdcode;
}
//客户基本信息下载
export function downloadCustomerInfoTemplate() {
    let token = getToken()
    let url = "/api/customer/tMdataCustomer/downloadCustomerInfoTemplate?token=" + token
    window.location.href = url + "&ModelCode=" + window.mdcode;
}

//客户用电信息模板下载
export function downloadCustomerPowerInfoTemplate() {
    let token = getToken()
    let url = "/api/customer/tMdataCustomer/downloadCustomerPowerInfoTemplate?token=" + token
    window.location.href = url + "&ModelCode=" + window.mdcode;
}

//客户联系人模板下载
export function downloadCustomerContactsInfoTemplate() {
    let token = getToken()
    let url = "/api/customer/tMdataCustomer/downloadCustomerContactsInfoTemplate?token=" + token
    window.location.href = url + "&ModelCode=" + window.mdcode;
}
// #3303 2019-12-31 张亮三 增家历史用电量模板下载
export function downloadHistoryPowerTemplate() {
    let token = getToken()
    let url = "/api/customer/tMdataCustomer/downloadCustomerPowerHistoryTemplate?token=" + token
    window.location.href = url + "&ModelCode=" + window.mdcode;
}


export function checkNameOrCodeIsThere(query) {
    return fetch({
        url: "/api/customer/tMdataCustomer/checkNameOrCodeIsThere",
        method: 'get',
        params: query
    });
}

//获取组织信息
export function getAllOrgByAttribute(query) {
    return fetch({
        url: "/api/admin/org/getAllOrgByAttribute",
        method: 'get',
        params: query
    });
}
//判断导入解析数据是否正确 2019年10月21日17:27:11
export function checkImprotInfo(query) {
    return fetch({
        url: "/api/customer/tMdataCustomer/checkImprotInfo",
        method: 'get',
        params: query
    });
}

//客户档案导入数据状态信息查询
export function getCustomerImportInfo(obj) {
    return fetch({
        url: '/api/customer/tMdataCustomer/getCustomerImportInfo',
        method: 'get',
        params: obj
    });
}

//客户档案数据导出
export function exportDataErrData(fileType, templateType) {
    let token = getToken()
    let url = '/api/customer/tMdataCustomer/exportErrorData?token=' + token + "&fileType=" + fileType + "&templateType=" + templateType+"&ModelCode="+sessionStorage.getItem("modelCode");

    window.location.href = url + "&ModelCode=" + window.mdcode;
}
//校验在市场主体页面是否存在该客户，如存在则自动带出数据
export function checkBasicMainMarketName(obj) {
    return fetch({
        url: '/api/customer/tMdataCustomer/checkBasicMainMarketName',
        method: 'get',
        params: obj
    });
}