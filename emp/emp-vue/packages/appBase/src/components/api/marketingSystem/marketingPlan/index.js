import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

//工作计划主列表查询
export function page(query) {
  return fetch({
    url: '/api/policy/workPlanController/getSortPageList',
    method: 'get',
    params: query
  });
}
//工作计划制定唯一性校验
export function checkUniqueness(query) {
  return fetch({
    url: '/api/policy/workPlanController/checkUniqueness',
    method: 'get',
    params: query
  });
}
//工作计划制定获取部门
export function getCurrentUserInfo(query) {
  return fetch({
    url: '/api/admin/user/getCurrentUserInfo',
    method: 'get',
    params: query
  });
}

//工作办理主列表查询
export function getManagePageList(query) {
  return fetch({
    url: '/api/policy/workPlanController/getManagePageList',
    method: 'get',
    params: query
  });
}


//删除
export function delObj(id) {
  return fetch({
    url: '/api/policy/workPlanController/' + id,
    method: 'delete'
  });
}
//删除zi
export function delDetailsObj(id) {
  return fetch({
    url: '/api/policy/workPlanDetails/' + id,
    method: 'delete'
  });
}
//删除工作计划中的新增工作
export function deletByid(obj) {
  return fetch({
    url: '/api/policy/workPlanDetails/deletByid?detailsId=' + obj.detailsId+'&state='+obj.state,
    method: 'delete'
  });
}

//工作计划子列表查询
export function pageList(query) {
  return fetch({
    url: '/api/policy/workPlanDetails/page',
    method: 'get',
    params: query
  });
}

//工作计划子列表查询
export function pageCheckList(query) {
  return fetch({
    url: '/api/policy/workPlanController/pageList',
    method: 'get',
    params: query
  });
}

export function addObj(obj) {
  return fetch({
    url: '/api/policy/workPlanController/add',
    method: 'post',
    data: obj
  });
}
export function addDetailsObj(obj) {
  return fetch({
    url: '/api/policy/workPlanDetails/',
    method: 'post',
    data: obj
  });
}

export function editObj(obj) {
  return fetch({
    url: '/api/policy/workPlanController/update',
    method: 'post',
    data: obj
  });
}

export function updateObj(obj) {
  return fetch({
    url: '/api/policy/workPlanDetails/updateDetails',
    method: 'post',
    data: obj
  });
}
export function putObj(obj,id) {
  return fetch({
    url: '/api/policy/workPlanController/'+id ,
    method: 'put',
    data: obj
  })
}
export function carryOverObj(obj) {
  return fetch({
    url: '/api/policy/workPlanController/carryOver',
    method: 'post',
    data: obj
  })
}
export function putDetilsObj(obj,id) {
  return fetch({
    url: '/api/policy/workPlanDetails/'+id ,
    method: 'put',
    data: obj
  })
}

//组织机构查询
export function getOrginCode() {
  return fetch({
      url: '/api/admin/org/getCurrentUserOrg',
      method: 'get',
      // params: query
  });
}
//查看，编辑
export function getDetailsById(query) {
  return fetch({
      url: '/api/policy/workPlanDetails/getDetailsById',
      method: 'get',
       params: query
  });
}
//保存
export function cancelCompleteDetails(query) {
  return fetch({
      url: '/api/policy/workPlanDetails/cancelCompleteDetails',
      method: 'get',
       params: query
  });
}
//保存
export function completeDetails(query) {
  return fetch({
      url: '/api/policy/workPlanDetails/completeDetails',
      method: 'get',
       params: query
  });
}
//结转
export function carryoverDetails(query) {
  return fetch({
      url: '/api/policy/workPlanDetails/carryoverDetails',
      method: 'get',
       params: query
  });
}
//结转
export function updateSatus(query) {
  return fetch({
      url: '/api/policy/workPlanController/updateSatus',
      method: 'get',
       params: query
  });
}

// 导出
export function exportObj(parm) {
  let token = getToken()
  let url = "/api/policy/workPlanController/exportWorkPlan?token=" + token
  let organizationalAttributes = parm.organizationalAttributes
  let planYear = parm.planYear
  let approvalStatus = parm.approvalStatus
  if (organizationalAttributes !== undefined && organizationalAttributes !== "" && organizationalAttributes !== null) {
    url += "&organizationalAttributes=" + organizationalAttributes
  }
  if (planYear !== undefined && planYear !== "" && planYear !== null) {
    url += "&planYear=" + planYear
  }
  if (approvalStatus !== undefined && approvalStatus !== "" && approvalStatus !== null) {
    url += "&approvalStatus=" + approvalStatus
  }
  // window.open("@common/api/customer/khCustomerVisit/customer/exportVisiti?token=" + token);
  window.location.href = url + "&ModelCode=" + window.mdcode;

}
// 导出
export function exportDetailsObj(parm) {
  let token = getToken()
  let url = "/api/policy/workPlanDetails/exportDetails?token=" + token
  let planYear = parm.planYear
  let approvalStatus = parm.approvalStatus
 
  if (planYear !== undefined && planYear !== "" && planYear !== null) {
    url += "&planYear=" + planYear
  }
  if (approvalStatus !== undefined && approvalStatus !== "" && approvalStatus !== null) {
    url += "&approvalStatus=" + approvalStatus
  }
  // window.open("@common/api/customer/khCustomerVisit/customer/exportVisiti?token=" + token);
  window.location.href = url + "&ModelCode=" + window.mdcode;

}

//通过、驳回
export function changeStatus(query) {
  return fetch({
    url: "/api/policy/workPlanController/approveWorkPlan",
    method: 'post',
    params: query
  });
}

// 导出审核
export function exportCheck(parm) {
  let token = getToken()
  let url = "/api/policy/workPlanController/exportWorkPlanCheck?token=" + token
  let organizationalAttributes = parm.organizationalAttributes
  let planYear = parm.planYear
  let approvalStatus = parm.approvalStatus
  if (organizationalAttributes !== undefined && organizationalAttributes !== "" && organizationalAttributes !== null) {
    url += "&organizationalAttributes=" + organizationalAttributes
  }
  if (planYear !== undefined && planYear !== "" && planYear !== null) {
    url += "&planYear=" + planYear
  }
  if (approvalStatus !== undefined && approvalStatus !== "" && approvalStatus !== null) {
    url += "&approvalStatus=" + approvalStatus
  }
  // window.open("@common/api/customer/khCustomerVisit/customer/exportVisiti?token=" + token);
  window.location.href = url + "&ModelCode=" + window.mdcode;

}

// 导出调整数据
export function exportWorkPlanAdjust(parm) {
  let token = getToken()
  let url = "/api/policy/workPlanController/exportWorkPlanAdjust?token=" + token
  let organizationalAttributes = parm.organizationalAttributes
  let planYear = parm.planYear
  let approvalStatus = parm.approvalStatus
  if (organizationalAttributes !== undefined && organizationalAttributes !== "" && organizationalAttributes !== null) {
    url += "&organizationalAttributes=" + organizationalAttributes
  }
  if (planYear !== undefined && planYear !== "" && planYear !== null) {
    url += "&planYear=" + planYear
  }
  if (approvalStatus !== undefined && approvalStatus !== "" && approvalStatus !== null) {
    url += "&approvalStatus=" + approvalStatus
  }
  // window.open("@common/api/customer/khCustomerVisit/customer/exportVisiti?token=" + token);
  window.location.href = url + "&ModelCode=" + window.mdcode;

}

//获取汇总列表
// export function getAggregateList(query) {
//   return fetch({
//     url: '/api/policy/workPlanController/getSortPageList',
//     method: 'get',
//     params: query
//   });
// }
//获取汇总列表
export function getAggregateList(query) {
  return fetch({
    url: '/api/policy/workPlanSummary/getPageList',
    method: 'get',
    params: query
  });
}
//汇总列表详情部门
export function getDeptListByOrgId(query) {
  return fetch({
    url: '/api/admin/dept/getDeptListByOrgId',
    method: 'get',
    params: query
  });
}
//获取计划详情
export function getPlansList(query) {
  return fetch({
    url: '/api/policy/workPlanSummary/getWorkPlanPageList',
    method: 'get',
    params: query
  });
}
//汇总审核
export function toExamine(obj,id) {
  return fetch({
    url: '/api/policy/workPlanController/'+id ,
    method: 'put',
    data: obj
  })
}
//汇总确认
export function toConfirm(obj,id) {
  return fetch({
    url: '/api/policy/workPlanController/'+id ,
    method: 'put',
    data: obj
  })
}
// 导出汇总
export function exportAggregate(parm) {
  let token = getToken()
  let url = "/api/policy/workPlanController/exportWorkPlan?token=" + token
  let organizationalAttributes = parm.organizationalAttributes
  let planYear = parm.planYear
  let approvalStatus = parm.approvalStatus
  if (organizationalAttributes !== undefined && organizationalAttributes !== "" && organizationalAttributes !== null) {
    url += "&organizationalAttributes=" + organizationalAttributes
  }
  if (planYear !== undefined && planYear !== "" && planYear !== null) {
    url += "&planYear=" + planYear
  }
  if (approvalStatus !== undefined && approvalStatus !== "" && approvalStatus !== null) {
    url += "&approvalStatus=" + approvalStatus
  }
  // window.open("@common/api/customer/khCustomerVisit/customer/exportVisiti?token=" + token);
  window.location.href = url + "&ModelCode=" + window.mdcode;

}
// 导出汇总详情
export function exportWorlPlan(parm) {
  let token = getToken()
  let url = "/api/policy/workPlanSummary/exportWorkPlan?token=" + token
  let orgId = parm.orgId
  let planYear = parm.planYear
  let deptId = parm.deptId
  let workType = parm.workType
  let state = parm.state
  let keyWork = parm.keyWork
  if (orgId !== undefined && orgId !== "" && orgId !== null) {
    url += "&orgId=" + orgId
  }
  if (planYear !== undefined && planYear !== "" && planYear !== null) {
    url += "&planYear=" + planYear
  }
  if (deptId !== undefined && deptId !== "" && deptId !== null) {
    url += "&deptId=" + deptId
  }
  if (workType !== undefined && workType !== "" && workType !== null) {
    url += "&workType=" + workType
  }
  if (state !== undefined && state !== "" && state !== null) {
    url += "&state=" + state
  }
  if (keyWork !== undefined && keyWork !== "" && keyWork !== null) {
    url += "&keyWork=" + keyWork
  }
  // window.open("@common/api/customer/khCustomerVisit/customer/exportVisiti?token=" + token);
  window.location.href = url + "&ModelCode=" + window.mdcode;

}


