import fetch from "@common/utils/fetch";

// 报价策略模板配置

// 主表查看
export function getTemplate(query) {
  return fetch({
    url: "/api/tran/smtrantemplate/getTemplate",
    method: "get",
    params: query
  });
}

//选择报价策略模板查询
export function getTemplateByDateRange(query) {
  return fetch({
    url: "/api/tran/smtrantemplate/getTemplateByDateRange",
    method: "get",
    params: query
  });
}

// 主表新增
export function addTemplateObj(obj) {
  return fetch({
    url: "/api/tran/smtrantemplate/addTemplate",
    method: "post",
    data: obj
  });
}

//主表删除
export function delObj(obj) {
  return fetch({
    url: "/api/tran/smtrantemplate/deleteTemplate",
    method: "post",
    data: obj
  });
}
// /smtrantemplate/getDetailAll  
// 从表查看 无分页
export function getDetailAll(query) {
  return fetch({
    url: "/api/tran/smtrantemplate/getDetailAll",
    method: "get",
    params: query
  });
}
// /smtrantemplate/addDetail
//  从表自动生成
export function addDetailObj(obj) {
  return fetch({
    url: "/api/tran/smtrantemplate/addDetail",
    method: "post",
    data: obj
  });
}

// 从表删除  /smtrantemplate/deleteDetail
export function deleteDetailObj(obj) {
  return fetch({
    url: "/api/tran/smtrantemplate/deleteDetail",
    method: "post",
    data: obj
  });
}

// /smtrantemplate/getDetailzbjg
// 报价策略模版配置 - 负荷容量电量相关指标查询
// areaCompanyCode
// areaCode
export function getDetailzbjg(query) {
  return fetch({
    url: "/api/tran/smtrantemplate/getDetailzbjg",
    method: "get",
    params: query
  });
}

// /smtrantemplate/getDetailzbrl
export function getDetailzbrl(query) {
  return fetch({
    url: "/api/tran/smtrantemplate/getDetailzbrl",
    method: "get",
    params: query
  });
}

// /smtrantemplate/updateDetail
// 报价策略模版明细 - 更新
export function updateDetail(obj) {
  return fetch({
    url: "/api/tran/smtrantemplate/updateDetail",
    method: "post",
    data: obj
  });
}

// /smtrantemplate/getZbgs 报价策略模版配置-指标校验

export function getZbgs(query) {
  return fetch({
    url: "/api/tran/smtrantemplate/getZbgs",
    method: "get",
    params: query
  });
}

// /smtrantemplate/startProcess
// 报价策略模版 - 提交审核
export function startProcess(obj) {
  return fetch({
    url: "/api/tran/smtrantemplate/startProcess",
    method: "post",
    data: obj
  });
}
