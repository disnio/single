/*
 * @功能描述: 交易管理-新能源出力计划申报-前端开发 接口api
 * @版本: 1.0.0
 * @作者: 吴志超
 * @Date: 2019-11-09 13:29:44
 * @最新修改内容: 
 * @LastEditTime: 2019-11-12 16:28:23
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";
// /smnewenergypowerplan/deleteList
// 新能源出力计划申报 - 多选删除
export function deleteList(query) {
  return fetch({
    url: '/api/tran/smnewenergypowerplan/deleteList',
    method: 'post',
    data: query
  });
}

// /smnewenergypowerplan/add
// 新能源出力计划申报 - 新增
export function add(query) {
  return fetch({
    url: '/api/tran/smnewenergypowerplan/add',
    method: 'post',
    data: query
  });
}

// /smnewenergypowerplan/getFirstAllDataList
// 新能源出力计划申报 - 页面全部查询
export function getFirstAllDataList(query) {
  return fetch({
    url: '/api/tran/smnewenergypowerplan/getFirstAllDataList',
    method: 'get',
    params: query
  });
}

// /smnewenergypowerplan/getPage
// 新能源出力计划申报 - 分页查询
export function getPage(query) {
  return fetch({
    url: '/api/tran/smnewenergypowerplan/getPage',
    method: 'get',
    params: query
  });
}


// /smnewenergypowerplan/getAllDataList
// 新能源出力计划申报 - 全部查询
export function getAllDataList(query) {
  return fetch({
    url: '/api/tran/smnewenergypowerplan/getAllDataList',
    method: 'get',
    params: query
  });
}

// /smnewenergypowerplan/getAlltime
// 96点 - 全部查询
export function getAlltime(query) {
  return fetch({
    url: '/api/tran/smnewenergypowerplan/getAlltime',
    method: 'get',
    params: query
  });
}

// /api/tran//smnewenergypowerplan/importNewEnergyPowerPlanFile
// 上传文件


// /smnewenergypowerplan/update
// 96点维护 - 更新
export function update(query) {
  return fetch({
    url: '/api/tran/smnewenergypowerplan/update',
    method: 'post',
    data: query
  });
}


// /smnewenergypowerplan/downloadSmRecentlyLmpInfoTemplate
// 新能源出力计划申报数据导入文件模板下载
export function downloadSmRecentlyLmpInfoTemplate() {
  let token = getToken()
  let url = "@common/api/tran/smnewenergypowerplan/downloadSmRecentlyLmpInfoTemplate?token=" + token
  window.location.href = url + "&ModelCode=" + window.mdcode;}

// /smnewenergypowerplan/checkAlreadyExists
// 校验数据是否已存在
export function checkAlreadyExists(query) {
  return fetch({
    url: '/api/tran/smnewenergypowerplan/checkAlreadyExists',
    method: 'get',
    params: query
  });
}


// /api/tran/smnewenergypowerplan/getOneById
export function getOneById(query) {
  return fetch({
    url: '/api/tran/smnewenergypowerplan/getOneById',
    method: 'get',
    params: query
  });
}

