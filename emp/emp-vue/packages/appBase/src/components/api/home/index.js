/*
 * @Author: fengzp
 * @Date: 2020-11-13 09:47:25
 * @LastEditors: fengzp
 * @LastEditTime: 2021-01-21 19:00:43
 * @Introduce: 首页接口
 */
import fetch from '@/common/utils/fetch';
import { getToken } from "@common/utils/auth";

// 售电公司优化
// GET
// /api/home/tHomeZb/getSignContractList?orgId=001&zbbm=I0002
export function getSignContractList(query) {
  return fetch({
    url: '/api/home/tHomeZb/getSignContractList',
    method: 'get',
    params: query,
  });
}

// /admin/org//getUserOrgInfoById
// 无参数
// 返回对象里面有一个attributeTypeCode属性，
// 当属性等于 zzjgsx01 就是售电公司
// 否则就是 集团等另一批
export function getUserOrgInfoById(query) {
  return fetch({
    url: '/api/admin/org/getUserOrgInfoById',
    method: 'get',
    params: query,
  });
}
// /api/home/tHomeZb/getMonthElectricity
export function getMonthElectricity(query) {
  return fetch({
    url: '/api/home/tHomeZb/getMonthElectricity',
    method: 'get',
    params: query,
  });
}
// /api/home/tHomeZb/getList
export function getList(query) {
  return fetch({
    url: '/api/home/tHomeZb/getList',
    method: 'get',
    params: query,
  });
}
// 首页日历通知 展示 0:无色 1:浅色(无) 2:深色
// /api/business/tradeNotice/getHomeNotice?orgId=001
export function getHomeNotice(query) {
  return fetch({
    url: '/api/business/tradeNotice/getHomeNotice',
    method: 'get',
    params: query,
  });
}

// 日历交易通知选择框  交易中心
// /api/business/tradeNotice/getHomeTradingCenter?orgId=001&calendarTime=2020-10-08
export function getHomeTradingCenter(query) {
  return fetch({
    url: '/api/business/tradeNotice/getHomeTradingCenter',
    method: 'get',
    params: query,
  });
}

// 日历交易分页 
// /api/business/tradeNotice/getHomeNoticePageList?orgId=001&&calendarTime=2020-10-08
export function getHomeNoticePageList(query) {
  return fetch({
    url: '/api/business/tradeNotice/getHomeNoticePageList',
    method: 'get',
    params: query,
  });
}

// 获取发电公司饼图
// http://localhost:8765/api/home/tHomeZb/getFaDianList?orgId=001&issue=2020-11
export function getFaDianList(query) {
  return fetch({
    url: '/api/home/tHomeZb/getFaDianList',
    method: 'get',
    params: query,
  });
}

// 30天售电量
// /api/home/tHomeZb/getDateElectricity?orgId=001004001&zbbm=I0001
export function getDateElectricity(query) {
  return fetch({
    url: '/api/home/tHomeZb/getDateElectricity',
    method: 'get',
    params: query,
  });
}
export function refresh(query) {
  return fetch({
    url: '/api/home/tHomeZb/refresh',
    method: 'post',
    params: query,
  });
}
//集团首页KPI指标
export function getKpiList(query) {
  return fetch({
    url: '/api/home/tHomeJtKpiM/getList',
    method: 'get',
    params: query,
  });
}
//集团首页数据刷新
export function getRefresh(obj) {
  return fetch({
    url: '/api/home/tHomeZb/refresh',
    method: 'post',
    data: obj
  });
}