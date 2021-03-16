import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

export function page(query) {
  return fetch({
    url: '/api/balance/pvTradeEleCharge/page', //分页查询 /api/balance/pvTradeEleCharge/page
    method: 'get',
    params: query
  });
}
export function getChargeData(query) {
  return fetch({
    url: '/api/balance/pvTradeEleCharge/getChargeData', //数据抽取
    method: 'get',
    params: query
  });
}

export function addChargeInfo(query) {
  return fetch({
    url: '/api/balance/pvTradeEleCharge/addChargeInfo', //添加清分变量
    method: 'post',
    data: query
  });
}
export function getOneById(id) {
  return fetch({
    url: '/api/balance/pvTradeEleCharge/'+id, //根据id查询信息
    method: 'get',
  });
}


export function modifyConfig(query,id) {
  return fetch({
    url: '/api/balance/pvTradeEleCharge/'+id, //根据id修改信息
    method: 'put',
    data: query
  });
}

//提交
export function updateSatus(query) {
  return fetch({
    url: '/api/balance/pvTradeEleCharge/updateSatus',
    method: 'get',
    params:query
  })
}
//取消提交
export function cancelCommit(query) {
  return fetch({
    url: '/api/balance/pvTradeEleCharge/updateSatus',
    method: 'get',
    params:query
  })
}


//删除
export function delObj(id) {
  return fetch({
    url: '/api/balance/pvTradeEleCharge/'+id,
    method: 'delete',
  })
}


// 状态
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



//验证期次的唯一性
export function getIdBytradingCycle(query) {
  //新增判断
  return fetch({
    url: "/api/balance/gdsdgsDfjs/checkPeriod",
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


//#2582 2019-11-12 张亮三 新增刷新数据接口
export function getRefreshData(query) {
  return fetch({
    url: '/api/balance/pvTradeEleCharge/getRefreshData',
    method: 'get',
    params: query
  })
}


