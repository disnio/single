import fetch from "@common/utils/fetch";
import axios from "axios";
import { getToken } from "@common/utils/auth";
export function page(query) {
  return fetch({
    url: "/api/home/customerDeviationAnalysis/getPageList",
    method: "get",
    params: query
  });
}

export function getAllOrgByAttribute(name) {
  return fetch({
    url: "/api/admin/org/getAllOrgByAttribute?attributeTypeCode='zzjjsx01'&orgName="+name,
    method: "get",
  });
}


export function getDeviationRate(query) {
  return fetch({
    url: "/api/home/customerDeviationAnalysis/getDeviationRate",
    method: "get",
    params: query
  });
}

