import fetch from "@common/utils/fetch";
import axios from "axios";
import { getToken } from "@common/utils/auth";
import { data } from "autoprefixer";
export function page(query) {
  return fetch({
    url: '/api/basicData/tMdataTieLin/page',
    method: 'get',
    params: query
  });
}
export function getHistoryList(query) {
  return fetch({
    url: '/api/basicData/tMdataTieLinVersionRecord/page',
    method: 'get',
    params: query
  });
}

/// 获取电厂名称 模糊查询
export function tTieLinRelation(query) {
  return fetch({
    url: '/api/basicData/tTieLinRelation/page',
    method: 'get',
    params: query
  });
}
export function getNameOfPower(query) {
  return fetch({
    url: '/api/admin/org/getAllOrgByAttribute',
    method: 'get',
    params: query
  });
}
export function addObj(obj) {
  return fetch({
    url: '/api/basicData/tMdataTieLin',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/api/basicData/tMdataTieLin/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/basicData/tMdataTieLin/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/basicData/tMdataTieLin/' + id,
    method: 'put',
    data: obj
  })
}
export function putNewObj( obj) {
  return fetch({
    url: '/api/basicData/tMdataTieLin/updateTieLin',
    method: 'put',
    data: obj
  })
}


//关联机组 新增 /tTieLinRelation
export function crewAddObj(obj) {
  return fetch({
    url: '/api/basicData/tTieLinRelation',
    method: 'post',
    data: obj
  });
}

// 关联机组删除 
export function crewDelObj(id) {
  return fetch({
    url: '/api/basicData/tTieLinRelation/' + id,
    method: 'delete'
  })
} 
export function exportObj(parm) {
  let token = getToken()
  let url = "/api/basicData/tMdataTieLin/exportTMdataTieLin?token=" + token
  let tieLineName = parm.tieLineName
  let powerLevelName = parm.powerLevelName
  let visitSalesman = parm.visitSalesman
  if (tieLineName !== undefined && tieLineName !== "" && tieLineName !== null) {
    url += "&tieLineName=" + tieLineName
  }
  if (powerLevelName !== undefined && powerLevelName !== "" && powerLevelName !== null) {
    url += "&powerLevelName=" + powerLevelName
  }

  // window.open("@common/api/customer/khCustomerVisit/customer/exportVisiti?token=" + token);
  window.location.href = url + "&ModelCode=" + window.mdcode;

}
// ************************************************************************************************************************************
/**
 * 
 * 导入-- 是否有未导入的数据存在
 */
export function isDataExit(query) {
  return fetch({
    url: '/api/basicData/tMdataTieLin/isDataExit',
    method: 'get',
    params: query
  })
}

// 确认入库---导入正确数据
export function importData(query) {
  return fetch({
    url: '/api/basicData/tMdataTieLin/importData',
    method: 'get',
    params: query
  })
}
// 导入解析查询--临时联络线信息数据
export function getTempTieLinByPage(query) {
  return fetch({
    url: '/api/basicData/tMdataTieLin/getTempTieLinByPage',
    method: 'post',
    data: query
  })
}
// 导入解析---导出错误数据
export function exportErrorData(data) {
  let token = getToken()
  let url = '/api/basicData/tMdataTieLin/exportErrorData?token=' + token + '&description=' + data.description + '&ModelCode=' + sessionStorage.getItem("modelCode")
  window.location.href = url + "&ModelCode=" + window.mdcode;
}

// 上传文件
export function importFile(query) {
  return fetch({
    url: '/api/basicData/tMdataTieLin/importFile',
    method: 'post',
    data: query
  })
}