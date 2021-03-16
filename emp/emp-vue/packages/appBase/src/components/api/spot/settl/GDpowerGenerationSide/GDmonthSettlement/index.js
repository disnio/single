/*
 * @文件用途说明: 
 * @作者姓名: 阿彪
 * @Date: 2020-01-19 10:18:58
 */ 
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// 结算  发电测结算 月清算

// 初始化查询列表
export function getAllDataList(paramsObj) {
  return fetch({
    url: '/api/settl//elecgen/getElecgenMonthData',
    method: 'post',
    params: paramsObj
  })
}
//20200602 #296 阿彪 初始化查询列表 
export function getElecgenMonthDataNew(paramsObj) {
  return fetch({
    url: '/api/settl/elecgen/getElecgenMonthDataNew',
    method: 'post',
    params: paramsObj
  })
}