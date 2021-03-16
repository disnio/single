/*
 * @功能描述: 
 * @版本: 
 * @作者: 康如涛
 * @Date: 2019-08-27 13:48:48
 * @最新修改内容: 
 * @LastEditTime: 2021-03-12 15:31:15
 */
import fetch from '@common/utils/fetch';

export function loginByEmail(data) {
 
  return fetch({
    url: '/api/auth/jwt/token',
    method: 'post',
    data:data
  });
}


export function thirdPartyAccess(data) {
 
  return fetch({
    url: '/Rum-web/rum/login/login.action',
    method: 'post',
    params:data
  });
}


export function getRsaPublicKey(query) {
  return fetch({
    url: '/api/auth/jwt/getRsaPublicKey',
    method: 'get',
  });
}
export function getThirdRsaPublicKey(query) {
  return fetch({
    url: '/Rum-web/rum/login/getPubKey.action',
    method: 'get',
  });
}
export function getUpdateRsaPublicKey(query) {
  return fetch({
    url: '/api/admin/userRsa/getRsaPublicKey',
    method: 'get',
  });
}


export function logout(token) {
  return fetch({
    url: '/api/auth/jwt/invalid',
    method: 'post',
    params: { token }
  });
}

export function getInfo(token) {
  return fetch({
    url: '/api/admin/user/front/info',
    method: 'get',
    headers: {
      'ModelCode': 'dashboard'
    },
    params: { token }
  }); 
}
//第三方系统权限认证
export function getThirdPartyAccess(token) {
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=thirdPartyAccess',
    method: 'get',
    params: { token }
  }); 
}


export function getMenus(params) {
  return fetch({
    url: '/api/admin/user/front/menus',
    method: 'get',
    params: params
  });
}


export function getAllMenus() {
  return fetch({
    url: '/api/admin/user/front/menu/all',
    method: 'get'
  });
}
//获取系统类型
export function getGroupType(query) {
  return fetch({
    url: '/api/admin/groupType/getGroupType',
    method: 'get',
    params: query
  });
}
//获取所有系统类型
export function getAllGroupType(query) {
  return fetch({
    url: '/api/admin/groupType/getAllGroupType',
    method: 'get',
  });
}
//登录CMS
export function loginCms(params) {
  return fetch({
    url: '/cmsApi/cmscp/login.do',
    method: 'post',
    data:params
  });
}
//退出CMS
export function logOutCms() {
  return fetch({
    url: '/cmsApi/cmscp/logout.do',
    method: 'post',
  });
}

/*
 * @功能描述: 通过组织ID重新获取token
 * @param {String} orgId  组织ID
 * @作者: 康如涛 
 * @Date: 2019-10-30 
 */
export function reSetToken(orgId) {
  return fetch({
    url: '/api/admin/user/updateToken',
    method: 'get',
    params: orgId
  });
}


export function getDimNotTokenByPropCode() {
  return fetch({
    url: '/api/admin/dim/getDimNotTokenByPropCode?propCode=indexPage',
    method: 'get',
  });
}