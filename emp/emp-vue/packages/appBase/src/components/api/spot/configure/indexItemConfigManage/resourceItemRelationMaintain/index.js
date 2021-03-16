/*
 * @功能描述: #568 现货配置管理-资源指标关联维护-指标项维护
 * @detail: 相关接口
 * @作者: chenf
 * @Date: 2019-12-18 11:14:17
 * @最新修改内容: 
 * @LastEditTime: 2019-12-18 11:14:17
 */
import fetch from "@common/utils/fetch";

// 指标项维护

//查询所有指标名称
export function getAllIndexName(query) {
    return fetch({
      url: '/api/tran/smindexitemtable/getAllIndexItemName',
      method: 'get',
      params: query
    })
  }

// 资源指标关联表新增
export function getAddResource(obj) {
  return fetch({
    url: '/api/tran/smresourcemetricsassociationtable/add',
    method: "post",
    data: obj
  })
}

// 删除单个 
export function deleteONE(obj) {
  return fetch({
    url: "/api/tran/smresourcemetricsassociationtable/delete",
    method: "post",
    data: obj
  });
}

// 删除多个
export function deleteMuch(obj) {
  return fetch({
    url: "/api/tran/smresourcemetricsassociationtable/deleteList",
    method: "post",
    data: obj
  });
}

// 主页点击具体list 查看信息
export function getPageView(query) {
  return fetch({
    url: '/api/tran/smresourcemetricsassociationtable/getResourceMetricsAssociationPage',
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



