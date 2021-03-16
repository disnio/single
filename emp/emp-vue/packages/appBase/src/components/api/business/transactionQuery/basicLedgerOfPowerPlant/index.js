/*
 * @功能描述: 
 * @版本: 
 * @作者: frj
 * @Date: 2019-11-28 16:19:17
 * @最新修改内容: 
 * @LastEditTime : 2020-01-06 13:41:41
 */
import fetch from '@common/utils/fetchUnits';
import { getToken } from "@common/utils/auth";
/**
 * @方法名称: getTransactionBusinessReport
 * @功能描述: 电厂基础台账数据查询接口
 * @参数: 
 * @返回值: 
 * @作者: frj
 * @issues: 
 * @Date: 2019-11-28 23:38:22
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function getTransactionBusinessReport(query) {
  return fetch({
    url: '/api/dataplatform/saleReport/getEleFactoryResult',
    method: 'get',
    params: query
  });
}

/**
 * @方法名称: getJyljReport
 * @功能描述: 电厂直接交易累计情况
 * @参数: 
 * @返回值: 
 * @作者: frj
 * @issues: 
 * @Date: 2019-11-28 23:39:09
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function getJyljReport(query) {
  return fetch({
    url: '/api/dataplatform/saleReport/getElectricityDetailForm',
    method: 'get',
    params: query
  });
}

/**
 * @方法名称: executeJob
 * @功能描述: 汇总按钮
 * @参数: 
 * @返回值: 
 * @作者: frj
 * @issues: 
 * @Date: 2019-11-28 23:39:09
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function executeJob(query) {
  return fetch({
    url: '/api/dataplatform/common/executeJob',
    method: 'get',
    params: query
  });
}
/**
 * @方法名称: jobStatus
 * @功能描述: 判断是否可以进行下步操作
 * @参数: 
 * @返回值: 
 * @作者: frj
 * @issues: 
 * @Date: 2019-11-28 23:39:09
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function jobStatus(query) {
  return fetch({
    url: '/api/dataplatform/common/jobStatus',
    method: 'get',
    params: query
  });
}
/**
 * @方法名称: getSigningChannels
 * @功能描述: 签约情况的三个表用的查询接口
 * @参数: 
 * @返回值: 
 * @作者: frj
 * @issues: 
 * @Date: 2019-12-08 15:34:19
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function getSigningChannels(query) {
  return fetch({
    url: '/api/dataplatform/signingChannels/getSigningChannels',
    method: 'get',
    params: query
  });
}
