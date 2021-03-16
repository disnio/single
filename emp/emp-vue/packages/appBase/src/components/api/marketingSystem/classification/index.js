/*
 * @功能描述: 
 * @版本: 
 * @作者:  
 * @Date: 2020-03-03 17:20:48
 * @最新修改内容: 
 * @LastEditTime: 2020-03-05 14:08:14
 */
import fetch from '@common/utils/fetch';

export function fetchAll() {
    return fetch({
      url: '/api/admin/dim/all',
      method: 'get'
    });
  }
  
  export function addObj(obj) {
    return fetch({
      url: '/api/basicData/policyClassificationManagement',
      method: 'post',
      data: obj
    });
  }
  
  export function getObj(roleCode) {
    return fetch({
      url: '/api/basicData/policyClassificationManagement/getDetailByRoleCode?roleCode=' + roleCode,
      method: 'get',
      
    })
  }
  
  export function delObj(roleCode) {
    return fetch({
      url: '/api/basicData/policyClassificationManagement/deleteTreeNode?roleCode=' + roleCode,
      method: 'get'
    })
  }
  //检查是否可删除
  export function checkPolicyTree(roleCode) {
    return fetch({
      url: '/api/policy/policy/checkPolicyTree?roleCode=' + roleCode,
      method: 'get', 
    })
  }
  
  
  export function putObj(id, obj) {
    return fetch({
      url: '/api/basicData/policyClassificationManagement/' + id,
      method: 'put',
      data: obj
    })
  }
  
  export function checkOnlyOne( obj) {
    return fetch({
      url: '/api/admin/dim/checkUniqueness',
      method: 'post',
      data: obj
    })
  }
  

//分类管理树接口
export function getTree(query) {
    return fetch({
        url: '/api/basicData/policyClassificationManagement/getPolicyTree',
        method: 'GET',
        params: query
    });
}

//获取上级分类下拉框
export function getExistList(code) {
    return fetch({
        url: '/api/basicData/policyClassificationManagement/getExistList?roleCode='+code,
        method: 'GET',
     
    });
}
//新增获取编码
export function getRoleCode() {
  return fetch({
    url: '/api/basicData/policyClassificationManagement/getRoleCode',
    method: 'get'
  });
}
