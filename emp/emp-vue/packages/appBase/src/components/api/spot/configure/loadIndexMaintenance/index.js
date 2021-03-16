/*
 * @功能描述: #494 负荷指标维护-前端开发
 * @detail: 负荷指标维护 相关接口
 * @作者: chenf
 * @Date: 2019-11-07 14:44:25
 * @最新修改内容: 
 * @LastEditTime: 2019-11-07 10:44:21
 */
import fetch from "@common/utils/fetch";

//  负荷指标维护

// 新增指标
export function addEntity(obj) {
  return fetch({
    url: "/api/tran/smbasiceindex/addEntity",
    method: "post",
    data: obj
  });
}

// 指标表 全部查询 list
export function getAllItemlist(query) {
  return fetch({
    url: '/api/tran/smbasiceindex/getAllDataList',
    method: 'get',
    params: query
  })
}

// 指标表 分页查询（模糊） list
export function getMainPage(query) {
    return fetch({
      url: '/api/tran/smbasiceindex/getMainPage',
      method: 'get',
      params: query
    })
  }

// 编辑 更新 指标
export function updateEntity(obj) {
  return fetch({
    url: "/api/tran/smbasiceindex/updateEntity",
    method: "post",
    data: obj
  });
}

// 删除 批量
export function deleteEntity(obj) {
    return fetch({
      url: "/api/tran/smbasiceindex/deleteList",
      method: "post",
      data: obj
    });
  }

