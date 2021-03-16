import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

export function page(query) {
  return fetch({
    url: '/api/balance/paramConfig/page',
    method: 'get',
    params: query
  });
}
// 状态提交
export function putObj(id, obj) {
  return fetch({
    url: '/api/balance/paramConfig/' + id,
    method: 'put',
    data: obj
  });
}
// 主表删除 
export function delObj(id) {
  return fetch({
    url: '/api/balance/paramConfig/' + id,
    method: 'delete'

  });
}
// 主表验证期次 主表新增
export function ValidationPeriod(obj) {
  return fetch({
    url: '/api/balance/paramConfig/insertMain',
    method: 'post',
    data: obj
  });
}

// 从表详情分页 /paramConfigDetail/selectByParamId
export function pageList(query) {
  return fetch({
    url: '/api/balance/paramConfigDetail/selectByParamId',
    method: 'get',
    params: query
  });
}

// 从表详情新增 /paramConfigDetail
export function detailAddObj(obj) {
  return fetch({
    url: '/api/balance/paramConfigDetail/insertOrUpdateDetail',
    method: 'post',
    data: obj
  });
}

// 从表详情修改活新增 
export function detailPutObj(obj) {
  return fetch({
    url: "/api/balance/paramConfigDetail/insertOrUpdateDetail",
    method: "post",
    data: obj
  });
}
// 从表详情查看
export function detailCheckObj(id) {
  return fetch({
    url: '/api/balance/paramConfigDetail/selectByDetailId' + id,
    method: "get"
  })
}

//详情根据id删除
export function paramConfiDelObj(id) {
  return fetch({
    url: "/api/balance/paramConfigDetail/" + id,
    method: "delete"
  });
}

//客户模糊查询
export function getCostomerObj(query) {
  return fetch({
    url: '/api/customer/tMdataCustomer/getCustomerListByName',
    method: "get",
    params: query
  })
}
//详情页导出
export function ResultExportObj(id) {
  let token = getToken()
  let url = "/api/balance/paramConfig/exportData?token=" + token + "&paramId=" + id
  window.location.href = url + "&ModelCode=" + window.mdcode;
}
//模板下载
export function downloadImportTemplate() {
  let token = getToken()
  let url = "/api/balance/paramConfig/dowloadImportTemplate?token=" + token
  window.location.href = url + "&ModelCode=" + window.mdcode;
}
   
//导入
export function importInfo(data) {
  return fetch({
    url: "/api/balance/paramConfig/importData",
    method: "post",
     data: data
  });
}