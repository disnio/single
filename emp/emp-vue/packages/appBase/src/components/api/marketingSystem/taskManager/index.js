import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

//获取制定任务列表
export function getFormulateList(query) {
  return fetch({
    url: '/api/policy/yxAssignment/getFormulatePageList',
    method: 'GET',
    params: query
  });
}
//获取编号
export function gettaskId() {
  return fetch({
    url: '/api/policy/yxAssignment/taskId',
    method: 'GET'
  });
}
//获取编号
export function getAllOrgByPorgIdT(params) {
  return fetch({
    // url: '/api/admin/org/getAllOrgByPorgIdT',
    url: '/api/admin/org/getAllOrgByPorgIdTNew',
    method: 'GET',
    params: params
  });
}
//添加制定任务
export function addFormulate(query) {
  return fetch({
    url: '/api/policy/yxAssignment/addInfo',
    method: 'post',
    data: query
  });
}

//修改制定任务
export function editFormulate(query) {
  return fetch({
    url: '/api/policy/yxAssignment/updateInfo',
    method: 'post',
    data: query
  });
}
//修改制定任务
export function update(query) {
  return fetch({
    url: '/api/policy/toBeDoneTask/update',
    method: 'post',
    data: query
  });
}
//退回
export function detailUpdate(query) {
  return fetch({
    url: '/api/policy/yxAssignmentDetail/'+query.assignmentDetailId,
    method: 'put',
    data: query
  });
}
//删除制定任务
export function delFormulate(query) {
  return fetch({
    url: '/api/policy/yxAssignment/deleteInfo',
    method: 'GET',
    params: query
  });
}
//判断任务制定能否完结
export function getStatusToComplete(query) {
  return fetch({
    url: '/api/policy/yxAssignment/getStatusToComplete',
    method: 'GET',
    params: query
  });
}
//任务制定完结
export function completeTask(query) {
  return fetch({
    url: '/api/policy/yxAssignment/completeTask',
    method: 'GET',
    params: query
  });
}

//获取任务待办列表
export function getUpcomingTasksList(query) {
  return fetch({
    url: '/api/policy/toBeDoneTask/getToDonePageList',
    method: 'GET',
    params: query
  });
}
//待办下发
export function issued(query) {
  return fetch({
    url: '/api/policy/toBeDoneTask/issure',
    method: 'post',
    data: query
  });
}

//任务待办上报
export function report(query) {
  return fetch({
    url: '/api/policy/toBeDoneTask/report',
    method: 'post',
    data: query
  });
}
//删除任务待办
export function delToDo(query) {
  return fetch({
    url: '/api/policy/toBeDoneTask/getToDonePageList',
    method: 'GET',
    params: query
  });
}
//获取任务审核列表
export function getReviewList(query) {
  return fetch({
    url: '/api/policy/yxAssignmentApproval/getApprovalPage',
    method: 'GET',
    params: query
  });
}
//审核
export function toExamine(query) {
  return fetch({
    url: '/api/policy/yxAssignmentApproval/completeAllApproval',
    method: 'GET',
    params: query
  });
}
//审批历史
export function checkPage(query) {
  return fetch({
    url: "/api/admin/processApproval/getApprovalHis",
    method: "get",
    params: query
  });
}
//任务审核查询
export function reviewQuery(query) {
  return fetch({
    url: '/api/policy/yxAssignmentApproval/getApprovalQueryPage',
    method: 'GET',
    params: query
  });
}
//导出
export function exportObj(parm) {
  let token = getToken()
  let url = "/api/policy/yxAssignmentApproval/exportApproval?token=" + token
  let taskName = parm.taskName
  let receiveUnitName = parm.receiveUnitName
  let taskState = parm.taskState
  if (taskName !== undefined && taskName !== "" && taskName !== null) {
    url += "&taskName=" + taskName
  }
  if (receiveUnitName !== undefined && receiveUnitName !== "" && receiveUnitName !== null) {
    url += "&receiveUnitName=" + receiveUnitName
  }
  if (taskState !== undefined && taskState !== "" && taskState !== null) {
    url += "&taskState=" + taskState
  }

  // window.open("@common/api/customer/khCustomerVisit/customer/exportVisiti?token=" + token);
  window.location.href = url + "&ModelCode=" + window.mdcode;

}


//附件下载
export function downloadFile(data) {
  let token=getToken();
  let url = "/api/policy/toBeDoneTask/downloadFile?token=" + token+ "&assignmentDetailId=" + data.assignmentDetailId;
 // let url = "/api/admin/file/downloadFile?token=" + token+ "&enclosures=" + enclosure;
  window.open(url + "&ModelCode=" + window.mdcode);
}
//多附件下载
export function downloadFiles(query) {
  return fetch({
    url: '/api/policy/toBeDoneTask/downloadFiles',
    method: 'GET',
    params: query
  });
}
