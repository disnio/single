import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// 结算  售电测结算 月清算

// 初始化查询列表
export function getAllDataList(paramsObj) {
  return fetch({
    url: '/api/settl/electricityformal/getElectricityMonthData',
    method: 'post',
    params: paramsObj
  })
}