import fetch from "@common/utils/fetch";

// 报价策略模板审核

// 审核列表
export function getTemplateAudit(query) {
  return fetch({
    url: "/api/tran/smtrantemplateAudit/getMainPage",
    method: "get",
    params: query
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
  
  // /smtrantemplate/getZbgs 报价策略模版配置-指标校验
  
  export function getZbgs(query) {
    return fetch({
      url: "/api/tran/smtrantemplate/getZbgs",
      method: "get",
      params: query
    });
  }
//通过/驳回
export function opertion(data) {
    return fetch({
      url: "/api/tran/smtrantemplateAudit/opertion",
      method: "POST",
      params: data
    });
  }
 // 合同类型 下拉数据
export function htlx_select_Obj() {
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=contract_type',
    method: 'get'
  })
}

// 审批状态 
export function spzt_select_Obj() {
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=state',
    method: 'get'
  })
}

// 审批历史
export function approvalHistoryObj(query) {
  return fetch({
    url: '/api/admin/processApproval/getApprovalHis',
    method: 'get',
    params: query
  })
}

// 所属交易中心 下拉数据
export function jyorgId_select_Obj() {
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=trading_center',
    method: 'get'
  })
}

// 区域公司审核列表 -- 20191025 add lifei[跨级审核接口]
export function getTemplateAuditQY(query) {
  return fetch({
    url: "/api/tran/smtrantemplateAudit/getMainTacticsPageList",
    method: "get",
    params: query
  });
}
