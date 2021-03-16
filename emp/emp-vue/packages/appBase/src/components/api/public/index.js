/*
 * @功能描述:
 * @版本:
 * @作者: 康如涛
 * @Date: 2019-08-27 13:48:50
 * @最新修改内容:
 * @LastEditTime: 2019-11-04 14:48:56
 */
import fetch from '@common/utils/fetch';

//获取当前用户组织信息
export function getUserOrgInfo() {
  return fetch({
    url: '/api/admin/org/getUserOrgInfo',
    method: 'get'
  })
}

// 根据父节点和组织机构属性获取电厂
export function getAllOrgByPorgId(query) {
  return fetch({
    url: '/api/admin/org/getAllOrgByPorgId',
    method: 'get',
    params: query
  })
}

// 根据 组织机构属性 调取区域
export function getAllOrgByAttribute(parme) {
  return fetch({
    url: "/api/admin/org/getAllOrgByAttribute",
    method: "get",
    params: parme
  });
}

// 根据Id获取交易单元信息
export function getTradingUnitbyTradingUnitName(parme) {
  return fetch({
    url: '/api/admin/tradingUnit/getTradingUnitbyTradingUnitName',
    method: 'get',
    params: parme
  });
}

// 获取电价节点
export function getAllGridnodeList(parme) {
  return fetch({
    url: '/api/tran/paramInfoManage/getAllGridnodeList',
    method: 'get',
    params: parme
  });
}

// /tMdataJyorg/getDataListByOrgId
// 通过组织ID，获取已分配给该组织的交易中心
//  let query ={  orgId:""}
export function getDataListByOrgId(query) {
  return fetch({
    url: '/api/basicData/tMdataJyorg/getDataListByOrgId',
    method: 'get',
    params: query
  })
}


// /api/admin/unitInforTable/getListPage?page=1&limit=10&porgId=001002001002
// 获取机组
export function getListAll(query) {
  return fetch({
    url: '/api/admin/unitInforTable/getListAll',
    method: 'get',
    params: query
  })
}

/*
 * @功能描述: 获取用户所属组织
 * @作者: 康如涛
 * @Date: 2019-10-30
 */
export function getUserOrgs() {
  return fetch({
    url: '/api/admin/orgUser/getOrgListByCurrentUseId',
    method: 'get'
  })
}

/*
 * @功能描述: 多个电厂获取机组
 * @作者: 王强
 * @Date: 2019-11-15
 */
export function getListAllOrg(data) {
  return fetch({
    url: '/api/admin/unitInforTable/getListAllOrg',
    method: 'get',
    params: data
  })
}

/*
 * @功能描述: 结算页面通过组织编码获取组织ID #4254
 * @作者: gaoaining
 * @Date: 2020-06-13
 */

export function getOrgIdByCode(code) {
  return fetch({
    url: '/api/admin/org/getOrgIdByCode?orgCode='+ code,
    method: 'get',
  })
}