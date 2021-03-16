import fetch from "@common/utils/fetch";
import { getToken } from "@common/utils/auth";

export function page(query) {
  //列表接口
  return fetch({
    url: "/api/business/jyPowerDeclaration/getPageList",
    method: "get",
    params: query
  });
}
export function checkData(query) {
  //确认校验
  return fetch({
    url: "/api/business/jyPowerDeclarationDetail/checkData",
    method: "post",
    data: query
  });
}

export function addObj(obj) {
  //列表新增接口
  return fetch({
    url: "/api/business/jyPowerDeclaration/insertMainData",
    method: "post",
    data: obj
  });
}

export function getObj(id) {
  //编辑获取数据
  return fetch({
    url: "/api/business/jyPowerDeclaration/" + id,
    method: "get"
  });
}

export function delObj(ids) {
  //删除
  return fetch({
    url: "/api/business/jyPowerDeclaration/" + ids,
    method: "delete"
  });
}

export function putObj(obj, id) {
  //编辑保存数据
  return fetch({
    url: "/api/business/jyPowerDeclaration/" + id,
    method: "put",
    data: obj
  });
}

export function periodSelectObj() {
  //交易周期
  return fetch({
    url: "/api/admin/dim/getDimByPropCode?propCode=transaction_period",
    method: "get"
  });
}
export function getIdBytradingCycle(query) {
  //新增判断
  return fetch({
    url: "/api/business/jyPowerDeclaration/getStatusToAdd",
    method: "get",
    params: query
  });
}
export function insertMainData(query) {
  //新增判断
  return fetch({
    url: "/api/business/jyPowerDeclaration/insertMainData",
    method: "post",
    data: query
  });
}
export function editInfo(query) {
  //修改
  return fetch({
    url: "/api/business/jyPowerDeclarationDetail/updateDetailList",
    method: "post",
    data: query
  });
}
export function editState(query) {
  //下发上报
  return fetch({
    url: "/api/business/jyPowerDeclaration/" + query.declarationId,
    method: "put",
    data: query
  });
}
export function updateReportStatus(query) {
  //确认完毕/取消确认
  return fetch({
    url: "/api/business/jyPowerDeclaration/updateReportStatus",
    method: "post",
    params: query
  });
}
export function editAllState(query) {
  //确认驳回
  return fetch({
    url: "/api/business/jyPowerDeclarationDetail/" + query.detailId,
    method: "put",
    data: query
  });
}
export function getDeclarationById(query) {
  //上方表单
  return fetch({
    url: "/api/business/jyPowerDeclaration/getDeclarationById",
    method: "get",
    params: query
  });
}
export function getOrgAll(query) {//根据公司名称模糊查询信息
  return fetch({
    url: '/api/admin/org/getAllOrgByAttribute',
    method: 'get',
    params: query
  });
}
export function getDeatilPageById(query) {
  //下边列表分页
  return fetch({
    url: "/api/business/jyPowerDeclarationDetail/getDeatilPageById",
    method: "get",
    params: query
  });
}
export function getorgIsHelp(query) {
  // 企业参数
  return fetch({
    url: "/api/admin/api/parameter/getValueByOrgIdAndCode",
    method: "get",
    params: query
  });
}
export function getDlsbIsGD(query) {
  // 企业参数：电量申报是否广东模式
  return fetch({
    url: "/api/admin/api/parameter/getValueByOrgIdAndCode",
    method: "get",
    params: query
  });
}
export function getStatusToReport(query) {
  // 上报判断
  return fetch({
    url: "/api/business/jyPowerDeclaration/getStatusToReport",
    method: "get",
    params: query
  });
}
export function getjyEleDeclareManageInfo(query) {
  // 上报判断
  return fetch({
    url: "/api/business/powerDeclarationImportQuery/getPowerDeclarationImportInfo",
    method: "get",
    params: query
  });
}

export function getExceptpage(query) {
  // 查看导入讯息
  return fetch({
    url: "/api/business/powerDeclarationImportQuery/getPowerDeclarationImportInfo",
    method: "get",
    params: query
  });
}


export function importjyEleDeclareManage(query) {
  // 确认入库
  return fetch({
    url: "/api/business/powerDeclarationImportQuery/enterHouse",
    method: "get",
    params: query
  });
}
//合同台账数据导出
export function exportDataErrData(fileType, declarationId) {
    // return fetch({
    //   url: '/api/contract/htContractImportQuery/exportData',
    //   method: 'get',
    //   params: obj
    // });
    let token = getToken()
    let url = '/api/business/powerDeclarationImportQuery/exportData?token=' + token + "&fileType=" + fileType + "&declarationId=" + declarationId + "&ModelCode=" + sessionStorage.getItem("modelCode");

    window.location.href = url + "&ModelCode=" + window.mdcode;
}


//客户信息模板下载
export function downloadImportTemplate() {
  let token = getToken()
  let url = "/api/business/jyPowerDeclarationDetail/downloadPowerDeclarationTemplate?token=" + token
  window.location.href = url + "&ModelCode=" + window.mdcode;
}


export function exportObj(parm) {
  //列表导出
  let token = getToken();
  let url = "/api/business/jyPowerDeclaration/exportDataList?token=" + token + "&ModelCode=" + sessionStorage.getItem("modelCode");
  let tradingCenter = parm.tradingCenter;
  let tradingVarietyCode = parm.tradingVarietyCode;
  let tradingWayCode = parm.tradingWayCode;
  let announcementDate = parm.announcementDate;
  let tradingCycleCode = parm.tradingCycleCode;
  let tradingTime = parm.tradingTime;
  let isCrossDistrict = parm.isCrossDistrict
  if (
    tradingCenter !== undefined &&
    tradingCenter !== "" &&
    tradingCenter !== null
  ) {
    url += "&tradingCenter=" + tradingCenter;
  }
  if (
    tradingVarietyCode !== undefined &&
    tradingVarietyCode !== "" &&
    tradingVarietyCode !== null
  ) {
    url += "&tradingVarietyCode=" + tradingVarietyCode;
  }
  if (
    tradingWayCode !== undefined &&
    tradingWayCode !== "" &&
    tradingWayCode !== null
  ) {
    url += "&tradingWayCode=" + tradingWayCode;
  }
  if (
    announcementDate !== undefined &&
    announcementDate !== "" &&
    announcementDate !== null
  ) {
    url += "&announcementDate=" + announcementDate;
  }
  if (
    tradingCycleCode !== undefined &&
    tradingCycleCode !== "" &&
    tradingCycleCode !== null
  ) {
    url += "&tradingCycleCode=" + tradingCycleCode;
  }
  if (tradingTime !== undefined && tradingTime !== "" && tradingTime !== null) {
    url += "&tradingTime=" + tradingTime;
  }
  if (
    isCrossDistrict !== undefined &&
    isCrossDistrict !== "" &&
    isCrossDistrict !== null
  ) {
    url += "&isCrossDistrict=" + isCrossDistrict;
  }

  window.location.href = url + "&ModelCode=" + window.mdcode;
}
export function innerExportObj(parm) {
  //列表导出
  let token = getToken();
  let url = "/api/business/jyPowerDeclarationDetail/exportPowerDeclaration?token=" + token + "&ModelCode=" + sessionStorage.getItem("modelCode");
  let declarationId = parm.declarationId;
    url += "&declarationId=" + declarationId;
    window.location.href = url + "&ModelCode=" + window.mdcode;
}




export function updateOneDeclaration(query) {
  //保存单条数据(不提示)
  return fetch({
    url: "/api/business/jyPowerDeclarationDetail/updateOneDeclaration",
    method: "post",
    data: query
  });
}