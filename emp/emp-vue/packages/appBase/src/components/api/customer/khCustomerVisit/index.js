import fetch from "@common/utils/fetch";
import axios from "axios";
import { getToken } from "@common/utils/auth";
export function page(query) {
  return fetch({
    url: "/api/customer/khCustomerVisit/page",
    method: "get",
    params: query
  });
}
export function pageList(query) {
  return fetch({
    url: "/api/customer/khCustomerVisitApproval/pageList",
    method: "get",
    params: query
  });
}
export function pageListQuery(query) {
  return fetch({
    url: "/api/customer/khCustomerVisitApprovalQuery/PageList",
    method: "get",
    params: query
  });
}

export function addObj(data) {
  // let token = getToken()
  // return axios({
  //   headers: {
  //     'Authorization': token,
  //   },
  //   method: 'post',  // 方式一定是post
  //   url: '/api/customer/khCustomerVisit',
  //   data: data        // 参数需要是单一的formData形式
  // })
  
  return fetch({
    url: "/api/customer/khCustomerVisit",
    // url: "/api/customer/khCustomerVisit/addCostomerVisitInfo",
    method: "post",
    data: data
  });
}

export function getObj(id) {
  return fetch({
    url: "/api/customer/khCustomerVisit/" + id,
    method: "get"
  });
}

export function delObj(id) {
  return fetch({
    url: "/api/customer/khCustomerVisit/" + id,
    method: "delete"
  });
}

export function putObj(id, obj) {
  return fetch({
    url: "/api/customer/khCustomerVisit/" + id,
    method: "put",
    data: obj
  });
}

export function exportObj(parm) {
  let token = getToken()
  let url = "/api/customer/khCustomerVisit/exportVisiti?token=" + token
  let customerName = parm.customerName
  let visitDate = parm.visitDate
  let visitSalesman = parm.visitSalesman
  let visitProgres = parm.visitProgres
  let templateIds = parm.templateIds
  if (customerName !== undefined && customerName !== "" && customerName !== null) {
    url += "&customerName=" + customerName
  }
  if (visitDate !== undefined && visitDate !== "" && visitDate !== null) {
    url += "&visitDate=" + visitDate
  }
  if (visitSalesman !== undefined && visitSalesman !== "" && visitSalesman !== null) {
    url += "&visitSalesman=" + visitSalesman
  }
  if (visitProgres !== undefined && visitProgres !== "" && visitProgres !== null) {
    url += "&visitProgres=" + visitProgres
  }
  if (templateIds !== undefined && templateIds !== "" && templateIds !== null) {
    url += "&templateIds=" + templateIds
  }
  // window.open("@common/api/customer/khCustomerVisit/customer/exportVisiti?token=" + token);
  window.location.href = url + "&ModelCode=" + window.mdcode;

}
// 导出
export function daochuObj(id) {
  let token = getToken();
  let url = "/api/customer/khCustomerVisit/exportVisit/" + id + "?token=" + token;
  window.location.href = url + "&ModelCode=" + window.mdcode;

}
// 下拉接口 拜访类型
export function customerType() {
  return fetch({
    url: "/api/admin/dim/getDimByPropCode?propCode=TV-Customers",
    method: "get"
  });
}
// 下拉接口
export function selectObj() {
  return fetch({
    url: "/api/admin/dim/getDimByPropCode?propCode=event_type",
    method: "get"
  });
}
// 拜访进度下拉
export function selVisitProgresObj() {
  return fetch({
    url: "/api/admin/dim/getDimByPropCode?propCode=customer_progress_status",
    method: "get"
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
export function getAllocatedCustomerListByName(query) {
  return fetch({
    url: '/api/customer/tMdataCustomer/getAllocatedCustomerListByName',
    method: 'get',
    params: query
  })
}

// 拜访对象 下拉拜访客户 自动带出
export function visitPopleId(par) {
  return fetch({
    url: "/api/customer/tMdataCustomerContacts/getCustomerContactsByOrgId",
    method: "get",
    params: par
  });
}

export function putUserInfoObj(id, obj) {
  return fetch({
    url: "/api/customer/khCustomerVisit/updateConstacts/" + id,
    method: "put",
    data: obj
  });
}

// 附件下载
export function downloadAttachmentObj(id) {
  let token = getToken()
  let url = "/api/customer/khCustomerVisit/downloadFile?token=" + token + "&visitId=" + id
  window.location.href = url + "&ModelCode=" + window.mdcode;
}

// 拜访目的
export function bfmdObj() {
  return fetch({
    url: "/api/admin/dim/getDimByPropCode?propCode=khbfmd",
    method: "get"
  });
}
// 客户拜访导入
export function importInfo(data) {
  return fetch({
    url: "/api/customer/khCustomerVisit/importCustomerVisit",
    method: "post",
    data: data
  });
}

//查看导入数据状态
export function getContractImportInfo(obj) {
  return fetch({
    url: '/api/customer/khCustomerVisit/getImportInfo',
    method: 'get',
    params: obj
  });
}

//下载附件
export function getDownloadFile() {
  let token = getToken()
  let url = "/api/customer/khCustomerVisit/dowloadImportTemplate?token=" + token
  window.location.href = url + "&ModelCode=" + window.mdcode;
}

/**
 * @方法名称: getKhbfRecords
 * @功能描述: 客户拜访信息-增加修改记录功能
 * @参数: 
 * @返回值: 
 * @作者: 李志佳
 * @Date: 2019-11-12 18:21:55
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function getKhbfRecords(query) {
  return fetch({
    url: "/api/customer/tMdataCustomerVersionRecord/page",
    method: "get",
    params: query
  });
}
/**
 * @方法名称: getPageList
 * @功能描述: 客户拜访信息查询-分页查询
 * @参数: 
 * @返回值: 
 * @样式作用范围: 
 * @作者: 滕超
 * @Date: 2019-11-13 15:10:18
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function getPageList(query) {
  return fetch({
    url: "/api/customer/khCustomerVisit/getPageList",
    method: "get",
    params: query
  });
}

// 李志佳 2019年12月16日18:59:44 获得电压
export function getVoltageGrade(id) {
  return fetch({
    url: "/api/customer/tMdataCustomerPower/getListByCustomerId/" + id,
    method: "get",
  });
}

//#4090 gaoaining 2020-06-03 添加是否启用审批流接口
export function getValueByOrgIdAndCode(query) {
  return fetch({
    url: "/api/admin/parameter/getValueByOrgIdAndCode" ,
    method: "get",
    params: query
  });
}

//#4090 gaoaining 2020-06-03 获取审批意见
export function getFinalApproval(query) {
  return fetch({
    url: "/api/admin/processApproval/getFinalApproval" ,
    method: "get",
    params: query
  });
}