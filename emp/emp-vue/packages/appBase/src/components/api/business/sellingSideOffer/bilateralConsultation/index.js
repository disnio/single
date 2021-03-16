/*
 * @Author: fengzp
 * @Date: 2020-10-13 09:55:51
 * @LastEditors: fengzp
 * @LastEditTime: 2020-11-05 16:15:46
 * @Introduce: Do not edit
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

export function getCurrentUserOrg() {//获取当前用户信息
  return fetch({
  url: '/api/admin/org/getCurrentUserOrg',
  method: 'get'
  });
}
//获取发电公司
export function getAllOrgByProvince(query) { 
  return fetch({
    url: '/api/admin/org/getAllOrgListByProvince',
    method: 'get',
    params: query
    });
}
//唯一申报电量信息
export function getElectricityInfor(query) { 
  return fetch({
    url: '/api/business/jyPowerDeclaration/selectOneByOrgIdAndTime',
    method: 'get',
    params: query
    });
}

// 获取交易单元

export function getOrgBySocialCreditCode(query) { 
  return fetch({
    url: '/api/business/jyQuotationScheme/getOrgBySocialCreditCode',
    method: 'get',
    params: query
  });
}


