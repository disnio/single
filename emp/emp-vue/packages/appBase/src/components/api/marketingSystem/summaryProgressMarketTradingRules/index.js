/*
 * @Author: fengzp
 * @Date: 2020-06-13 11:54:05
 * @LastEditors: fengzp
 * @LastEditTime: 2020-06-13 18:24:51
 * @Introduce: Do not edit
 */ 
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// 分拣类 别接口
export function getPolicyTree(params) {
  return fetch({
    url: '/api/basicData/policyClassificationManagement/getPolicyTree?rootCode='+params,
    method: 'get'
  })
}
// 新增
// /yxgkLnformationBaseFile
export function addInfo(obj) {
  return fetch({
    url: '/api/policy/yxgkLnformationBaseFile',
    method: 'post',
    data: obj
  });
}
// 编辑和修改
// /yxgkLnformationBaseFile
export function editInfo(obj,id) {
  return fetch({
    url: `/api/policy/yxgkLnformationBaseFile/${id}`,
    method: 'put',
    data: obj
  });
}

// 分页查询
// /yxgkLnformationBaseFile/page
export function page(query) {
  return fetch({
    url: `/api/policy/yxgkLnformationBaseFile/page`,
    method: 'get',
    params: query
  });
}

// 根据id删除信息
// /yxgkLnformationBaseFile/{id}
export function delByid(id) {
  return fetch({
    url: `/api/policy/yxgkLnformationBaseFile/${id}`,
    method: 'delete',
  });
}

