import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

export function page(query) {
  return fetch({
    url: '/api/balance/crossAreaPowerConfig/page',
    method: 'get',
    params: query
  });
}
export function getOneById(id) {
  return fetch({
    url: '/api/balance/crossAreaPowerConfig/'+id,
    method: 'get',
  });
}

export function addConfig(query) {
  return fetch({
    url: '/api/balance/crossAreaPowerConfig/addConfig',
    method: 'post',
    data: query
  });
}
export function modifyConfig(query) {
  return fetch({
    url: '/api/balance/crossAreaPowerConfig/modifyConfig',
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

export function cancelCommit(query) {
  return fetch({
    url: '/api/balance/crossAreaPowerConfig/updateSatus',
    method: 'get',
    params:query
  })
}


//删除
export function delObj(id) {
  return fetch({
    url: '/api/balance/crossAreaPowerConfig/'+id,
    method: 'delete',
  })
}


//状态
export function getStateCode() {
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=state',
    method: 'get',
    params: ''
  });
}

//抽取
export function extract(query) {
  let data={}
  data.jsDate  = query;
  return fetch({
    url: '/api/balance/gdsdgsDfjs/getDfjsData',
    method: 'get',
    params: data
  });
}



//验证日期的唯一性
export function checkPeriod(query) {
  //新增判断
  return fetch({
    url: "/api/balance/crossAreaPowerConfig/checkPeriod",
    method: "get",
    params: query
  });
}

export function all(query) {
  return fetch({
    url: '/api/balance/jsAdjustmentRecord/getPageList',
    method: 'get',
    params: query

  });
}

//添加保存
export function addDate(body) {
  return fetch({
    url: '/api/balance/fjsdgsDfjs/saveOrUpdate',
    method: 'post',
    data: body
  });
}

