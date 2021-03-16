/*
 * @功能描述: #454-2 现货配置管理-峰谷平时点维护-前端开发
 * @detail: 峰谷平时点信息维护 相关接口
 * @作者: chenf
 * @Date: 2019-10-28 14:44:25
 * @最新修改内容: 
 * @LastEditTime: 2019-10-30 10:44:21
 */
import fetch from "@common/utils/fetch";

//  峰谷平时点信息维护

//维护页新增pvl
export function addPVLtimes(obj) {
  return fetch({
    url: "/api/tran/smpeakvalley/add",
    method: "post",
    data: obj
  });
}

// 维护页获取pvl list
export function getPVLlist(query) {
  return fetch({
    url: '/api/tran/smpeakvalley/getPage',
    method: 'get',
    params: query
  })
}

// 维护页删除单个pvl
export function deleteONE(obj) {
  return fetch({
    url: "/api/tran/smpeakvalley/delete",
    method: "post",
    data: obj
  });
}

// 维护页删除多个
export function deleteMuch(obj) {
  return fetch({
    url: "/api/tran/smpeakvalley/deleteList",
    method: "post",
    data: obj
  });
}

// 维护页主页点击具体list 查看信息
export function getPageView(query) {
  return fetch({
    url: '/api/tran/smpeakvalleytimeinfo/getPage',
    method: 'get',
    params: query
  })
}

// 编辑页新增
export function addeditDetail(obj) {
  return fetch({
    url: "/api/tran/smpeakvalleytimeinfo/add",
    method: "post",
    data: obj
  });
}

// 编辑页编辑 更新
export function updateDetail(obj) {
  return fetch({
    url: "/api/tran/smpeakvalleytimeinfo/update",
    method: "post",
    data: obj
  });
}

// 编辑页删除one
export function deleteDetailONE(obj) {
  return fetch({
    url: "/api/tran/smpeakvalleytimeinfo/delete",
    method: "post",
    data: obj
  });
}

// 编辑页删除 多个
export function deleteDetailList(obj) {
  return fetch({
    url: "/api/tran/smpeakvalleytimeinfo/deleteList",
    method: "post",
    data: obj
  });
}

