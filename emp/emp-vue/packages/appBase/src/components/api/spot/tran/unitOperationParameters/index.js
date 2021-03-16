
//  * @功能描述: 交易管理-机组运行参数 详情见工单614
//  * @版本: 1.0.0
//  * @作者: 冯志平
//  * @Date: 2020-1-3 17:39:36
//  * @LastEditTime : 2019-02-10 18:04

import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";
//机组参数信息-全部查询
export function searchAllList(query) {
  return fetch({
    url: '/api/tran/smunitparametersinfo/getAllDataList',
    method: 'get',
    params: query
  })
}

//  /smunitparametersinfo/add
// 机组参数信息-新增
export function add(query) {
  return fetch({
    url: '/api/tran/smunitparametersinfo/add',
    method: 'post',
    data: query
  })
}

//  /smunitparametersinfo/add
// 机组参数信息-删除
export function deleteList(query) {
  return fetch({
    url: '/api/tran/smunitparametersinfo/deleteList',
    method: 'post',
    data: query
  })
}

// /smunitparametersinfo/getTabs  
// 动态获取页签头
export function getTabs(query) {
  return fetch({
    url: '/api/tran/smunitparametersinfo/getTabs',
    method: 'get',
    params: query
  })
}

// /smtabinfo/getTabInfoByTabCode
//机组参数信息-页签信息-单个页签查询
export function getOneById(query) {
  return fetch({
    url: '/api/tran/smtabinfo/getTabInfoByTabCode/',
    method: 'get',
    params: query
  })
}


// /smtabinfo/getTabInfoByTabCodeCircle
//机组参数信息-页签信息-单个页签查询-用于典型开机曲线、停机曲线
export function getTabCodeCircle(query) {
  return fetch({
    url: '/api/tran/smtabinfo/getTabInfoByTabCodeCircle/',
    method: 'get',
    params: query
  })
}

// /smtabinfo/updateTabInfoByTabCode
// 机组参数信息-页签信息-单个页签指标值修改
export function updateTabInfoByTabCode(query) {
  return fetch({
    url: '/api/tran/smtabinfo/updateTabInfoByTabCode/',
    method: 'post',
    data: query
  })
}

// /smtabinfo/updateTabInfoByTabCodeCircle 
// 典型开机、停机曲线单个页签指标值修改   2020/2,12 #861 后台需在url后拼接参数
export function updateTabInfoByTabCodeCircle(query, id) {
  return fetch({
    url: '/api/tran/smtabinfo/updateTabInfoByTabCodeCircle?smTranRuleConfigureId=' + id,
    method: 'post',
    data: query
  })
}



// 2020-5-26优化工单
//获取默认报价方案tab页签内容
export function getTabInfoByTabCodeScheme(query) {
  return fetch({
    url: '/api/tran/smtabinfo/getTabInfoByTabCodeScheme',
    method: 'get',
    params: query
  })
}
// 根据发电公司查找机组类型  #1140 
export function getUnitTypeCode(query) {
  return fetch({
    url: '/api/admin/unitInforTable/getUnitTypeCode',
    method: 'get',
    params: query
  })
}
// 保存时唯一性判断
export function checkData(query) {
  return fetch({
    url: '/api/tran/smunitparametersinfo/checkData',
    method: 'post',
    data: query
  })
}
// 默认报价方案保存接口
export function updateTabInfoByTabCodeScheme(query) {
  return fetch({
    url: '/api/tran/smtabinfo/updateTabInfoByTabCodeScheme',
    method: 'post',
    data: query
  })
}
