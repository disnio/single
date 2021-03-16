import fetch from "@common/utils/fetch";
import axios from "axios";
import { getToken } from "@common/utils/auth";
//协议终止
export function endAgreement(obj) {
  return fetch({
    url: '/api/contract/htAgentProtocol/updateStatus',
    method: 'post',
    data: obj
  });
}

//获取代理协议列表
export function getAgreementList(query) {
  return fetch({
    url: '/api/contract/htAgentProtocol/page',
    method: 'get',
    params: query
  });
}
export function getPageListNew(query) {
  return fetch({
    url: '/api/contract/htAgentProtocol/getPageList',
    method: 'get',
    params: query
  });
}
//添加代理协议
export function addAgreement(obj) {
  return fetch({
    url: '/api/contract/htAgentProtocol',
    method: 'post',
    data: obj
  });
}
//更加ID获取代理协议信息
export function getAgreementById(id) {
  return fetch({
    url: '/api/contract/htAgentProtocol/' + id,
    method: 'get'
  })
}
//获取合同范本
export function getModelOptions(query) {
  return fetch({
    url: '/api/contract/htTemplate/getTemplateListByTypeAndState' ,
    method: 'get',
    params :query
  })
}
//删除代理协议
export function delAgreement(id) {
  return fetch({
    url: '/api/contract/htAgentProtocol/' + id,
    method: 'delete'
  })
}
//更新代理协议
export function updateAgreement(id, obj) {
  return fetch({
    url: '/api/contract/htAgentProtocol/' + id,
    method: 'put',
    data: obj
  })
}

//通过客户名称，模糊查询当前用户所属组织的客户，ID。
export function getCustomerListByName(query) {
  return fetch({
    url: '/api/customer/tMdataCustomer/getCustomerListByName',
    method: 'get',
    params: query
  })
}
//通过客户名称，模糊查询当前用户所属组织的客户，ID。(新)
export function getAllocatedCustomerListByName(query) {
  return fetch({
    url: '/api/customer/tMdataCustomer/getAllocatedCustomerListByName',
    method: 'get',
    params: query
  })
}


// 取消提交 /api/contract/htAgentProtocol/updateStateById
export function CancelSubmitObj(query) {
  return fetch({
    url: ' /api/contract/htAgentProtocol/updateStateById',
    method: 'get',
    params: query
  })
}

// 唯一验证
export function uniqueObj(query) {
  return fetch({
    url: ' /api/contract/htAgentProtocol/checkTemplateName',
    method: 'get',
    params: query
  });
}
//模板下载
export function downloadImportTemplate() {
  let token = getToken()
  let url = "/api/contract/htAgentProtocol/downloadContractImportTemplate?token=" + token
  window.location.href = url + "&ModelCode=" + window.mdcode;
}
//导入
export function importInfo(data) {
  return fetch({
    url: "/api/contract/htAgentProtocol/importHtAgentProtocol",
    method: "post",
     data: data
  });
}
//文件上传
export function importContractFile(obj) {
  return fetch({
    url: '/api/contract/htAgentProtocol/importFile',
    method: 'post',
    data: obj
  });
}
//代理协议确认入库
export function importContract(obj) {
  return fetch({
    url: '/api/contract/htAgentProtocol/enterHouse',
    method: 'get',
    params: obj
  });
}
//查看导入数据状态
export function getContractImportInfo(obj) {
  return fetch({
    url: '/api/contract/htAgentProtocol/getContractImportInfo',
    method: 'get',
    params: obj
  });
}
//导出异常导入数据
export function exportDataErrData(fileType,saleContractType) {
  // return fetch({
  //   url: '/api/contract/htContractImportQuery/exportData',
  //   method: 'get',
  //   params: obj
  // });
  let token = getToken()
  let url = '/api/contract/htAgentProtocol/exportData?token=' + token + "&fileType=" + fileType+ "&saleContractType=" + saleContractType;
// console.log(url);

window.location.href = url + "&ModelCode=" + window.mdcode;
}
//预览
export function viewShow(parm) {    
  let token = getToken()
  let urlstr = "/api/contract/htAgentProtocol/previewContract?token=" + token//网关
  let agentProtocolId = parm.agentProtocolId
  
  if (agentProtocolId !== undefined && agentProtocolId !== "" && agentProtocolId !== null) {
    urlstr += "&agentProtocolId=" + agentProtocolId
  }
  return fetch({
    url: urlstr,
    method: 'get',
    data: String
  });
}

export function exportObj(parm) {
  let token = getToken()
  let url = "@common/api/contract/htAgentProtocol/exportInfo?token=" + token
  let customerName = parm.customerName
  let protocolYear = parm.protocolYear

  if (customerName !== undefined && customerName !== "" && customerName !== null) {
    url += "&customerName=" + customerName
  }
  if (protocolYear !== undefined && protocolYear !== "" && protocolYear !== null) {
    url += "&protocolYear=" + protocolYear
  }

  window.location.href = url + "&ModelCode=" + window.mdcode;

}