/*
 * @功能描述: #619 配置管理-指标项配置管理-指标项维护
 * @detail: 相关接口
 * @作者: chenf
 * @Date: 2019-12-18 11:14:17
 * @最新修改内容: 
 * @LastEditTime: 2019-12-18 11:14:17
 */
import fetch from "@common/utils/fetch";

// 指标项维护

//指标项新增
export function addIndexItem(obj) {
  return fetch({
    url: "/api/tran/smindexitemtable/addIndexItemTableInfo",
    method: "post",
    data: obj
  });
}

// 指标项获取 list
export function getItemlist(query) {
  return fetch({
    url: '/api/tran/smindexitemtable/getPage',
    method: 'get',
    params: query
  })
}

// 删除单个 
export function deleteONE(obj) {
  return fetch({
    url: "/api/tran/smindexitemtable/deleteIndexItemTableInfo",
    method: "post",
    data: obj
  });
}

// 删除多个
export function deleteMuch(obj) {
  return fetch({
    url: "/api/tran/smindexitemtable/deleteList",
    method: "post",
    data: obj
  });
}

// 主页点击具体list 查看信息  /api/admin/dim/getDimsByParentCodeAndValue
export function getPageView(query) {
  return fetch({
    url: '/api/tran/smindexitemtable/getOndeById',
    method: 'get',
    params: query
  })
}

// 更新修改
export function updateIndex(obj) {
  return fetch({
    url: "/api/tran/smindexitemtable/updateIndexItemTableInfo",
    method: "post",
    data: obj
  });
}

// 查找维度children  /api/admin/dim/getDimsByParentCodeAndValue
export function getChildren(query) {
  return fetch({
    url: "/api/admin/dim/getDimsByParentCodeAndValue",
    method: 'get',
    params: query
  })
}


