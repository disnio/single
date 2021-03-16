/*
 * @功能描述: 交易管理-售电侧出清结果导入-客户用电量管理-客户用电量分析 #937
 * @版本: 1.0.0
 * @作者: wuzhichao
 * @Date: 2020-03-31 09:39:21
 * @最新修改内容: 
 * @LastEditTime: 2020-04-03 17:06:14
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";


/**
 * @方法名称: 查询接口api
 * @参数: 查询条件
 * @返回值: chart图数据
 * @作者: wuzhichao
 * @Date: 2020-03-31 09:47:08
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function getAnalysisInfo(query) {
  return fetch({
    url: '/api/tran/customerClectricityAnalysis/getAnalysisInfo',
    method: 'get',
    params: query
  })
}

// /api/tran/customerClectricityAnalysis/getIndustryByCustomer?
// areaCompanyCode=001002001&
// tranDate=2020-03-26

export function getIndustryByCustomer(query) {
  return fetch({
    url: '/api/tran/customerClectricityAnalysis/getIndustryByCustomer',
    method: 'get',
    params: query
  })
}

// /api/admin/org/getProvinceByCustomer

export function getProvinceByCustomer() {
  return fetch({
    url: '/api/tran/customerClectricityAnalysis/getProvinceByCustomer',
    method: 'get',
  })
}
