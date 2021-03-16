import fetch from "@common/utils/fetch";

export function getCrossPageList(query) {
  //列表接口
  return fetch({
    url: "/api/business/jyPowerDeclaration/getCrossPageList",
    method: "get",
    params: query
  });
}
export function editAllState(query) {
  //确认驳回
 return fetch({
   url: "/api/business/jyPowerDeclaration/updateReportStatus/" + + query.detailId,
   method: "put",
   data: query
 });
}

export function getIdBytradingCycle(query) {
  //新增判断
  return fetch({
    url: "/api/business/jyPowerDeclaration/getCrossStatusToAdd",
    method: "get",
    params: query
  });
}

export function updateOneDeclaration(query) {
  //新增判断
  return fetch({
    url: "/api/business/jyPowerDeclarationDetail/updateOneDeclaration",
    method: "get",
    params: query
  });
}