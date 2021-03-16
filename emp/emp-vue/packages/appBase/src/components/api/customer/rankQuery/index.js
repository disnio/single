import fetch from "@common/utils/fetch";
import axios from "axios";
import { getToken } from "@common/utils/auth";
export function page(query) {
  return fetch({
    url: "/api/customer/tMdataCustomerTemp/list",
    method: "get",
    params: query
  });
}
export function checkQueryPage(query) {
  return fetch({
    url: "/api/customer/tMdataCustomerTempApproval/getApprovalpageList",
    method: "get",
    params: query
  });
}
export function getObj(id) {
  return fetch({
    url: "/api/customer/tMdataCustomerTemp/" + id,
    method: "get"
  });
}
export function getObjNew(id) {
  return fetch({
    url: "/api/customer/tMdataCustomerTemp/getOneById/" + id,
    method: "get"
  });
}
export function  getImg(query) {
  return fetch({
    url: "/api/admin/processApproval/getActiviImage",
    method: "get",
    params: query
  });
}
export function checkPage(query) {
  return fetch({
    url: "/api/admin/processApproval/getApprovalHis",
    method: "get",
    params: query
  });
}
export function getpOrgIdAllByorgId(query) {
  return fetch({
    url: "/api/admin/org/getpOrgIdAllByorgId",
    method: "get",
    params: query
  });
}
export function getCheckStateCode() {
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=state',
    method: 'get',
    params: ''
  });
}
export function ElectricityInformationPage(query) {
  return fetch({
    url:
      "/api/customer/tMdataCustomerPowerTemp/getListByCustomerId/" +
      query.customerId,
    method: "get",
    params: query
  });
}
export function ContactTablePage(query) {
  return fetch({
    url:
      "/api/customer/tMdataCustomerContactsTemp/getListByCustomerId/" +
      query.customerId,
    method: "get",
    params: query
  });
}
export function selectApprovalStatus() {
  return fetch({
    url: "/api/admin/dim/getDimByPropCode?propCode= customer_audit_state",
    method: "get"
  });
}
export function changeStatus(query) {
  return fetch({
    url: "/api/customer/tMdataCustomerTemp/approvalCustomerTemp",
    method: "post",
    data: query
  });
}
export function updateOrgId(query) {
  return fetch({
    url: "/api/customer/tMdataCustomerTemp/approvalCustomerTemp-updateOrgId",
    method: "post",
    data: query
  });
}
export function showImg(id) {
  let timestamp = Date.parse(new Date());
  let token = getToken();
  let url =
    "/api/customer/tMdataCustomerContactsTemp/downloadFile?token=" +
    token +
    "&contactId=" +
    id +
    "&timestamp=" +
    timestamp;
  return url;
}
// 审批页面所属行业接口
// /api/admin/dim/khhyTree?propCode=customer_profession
export function getInduc(val) {
  return fetch({
      url: `/api/admin/dim/khhyTree?propCode=${val}`,
      method: 'get',
  });
}