/*
 * @功能描述: 
 * @版本: 
 * @作者: 
 * @Date: 2019-11-28 15:25:22
 * @最新修改内容: 
 * @LastEditTime: 2019-12-02 11:13:55
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";
// 获取主列表-亮
export function getPage(query) {
  return fetch({
    url: '/api/balance/hnsdgsDfjs/getPageList',
    method: 'get',
    params: query
  });
}
export function getOneById(dfjsId) {
  return fetch({
    url: '/api/balance/hnsdgsDfjs/'+dfjsId,
    method: 'get',
  });
}

export function addSdgsDfjsInfo(query) {
  return fetch({
    url: '/api/balance/gdsdgsDfjs/addSdgsDfjsInfo',
    method: 'post',
    data: query
  });
}
export function modifySdgsDfjsInfo(query) {
  return fetch({
    url: '/api/balance/gdsdgsDfjs/modifySdgsDfjsInfo',
    method: 'post',
    data: query
  });
}

//提交
export function updateSatus(query) {
  return fetch({
    url: '/api/balance/gdsdgsDfjs/updateSatus',
    method: 'get',
    params:query
  })
}


//删除-亮
export function delObj(id) {
  return fetch({
    url: '/api/balance/hnsdgsDfjs/'+id,
    method: 'delete',
  })
}

//状态-亮
export function getStateCode() {
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=state',
    method: 'get',
    params: ''
  });
}

//抽取-亮
export function extract(query) {
  return fetch({
    url: '/api/balance/hnsdgsDfjs/getBillInfoList',
    method: 'get',
    params: query
  });
}



//验证期次的唯一性-亮
export function getIdBytradingCycle(query) {
  //新增判断
  return fetch({
    url: "/api/balance/hnsdgsDfjs/checkPeriod",
    method: "get",
    params: query
  });
}
//添加保存-亮
export function addDetails(body) {
  return fetch({
    url: '/api/balance/hnsdgsDfjs',
    method: 'post',
    data: body
  });
}

//编辑保存、提交-亮
export function editAddDetails(body,id) {
  return fetch({
    url: '/api/balance/hnsdgsDfjs/'+id,
    method: 'put',
    data: body
  });
}

//计算
export function countKhyjsDataObj(obj) {
  return fetch({
    url: '/api/balance/hnsdgsDfjs/calcData',
    method: 'post',
    data: obj
  })
}
//湖南-详情页导出-亮
export function exportObj(parm) {
  let token = getToken()
  let url = "/api/balance/hnsdgsDfjs/exportExcel?token=" + token
  let dfjsId = parm.dfjsId

  if (dfjsId !== undefined && dfjsId !== "" && dfjsId !== null) {
    url += "&dfjsId=" + dfjsId
  }

  window.location.href = url + "&ModelCode=" + window.mdcode;

}

