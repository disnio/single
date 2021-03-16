/*
 * @功能描述: 
 * @版本: 
 * @作者: qhz
 * @Date: 2020-02-18 21:17:20
 * @最新修改内容: 
 * @LastEditTime: 2020-02-21 10:05:45
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";
//新增
export function addObj(obj) {
  return fetch({
    url: '/api/balance/preSettlement/insertHljInfo',
    method: 'post',
    data: obj
  })
}

// 删除 /preSettement/l{id}
export function delObj(id) {
  return fetch({
    url: ' /api/balance/preSettlementHlj/deleteDataByIds/' + id,
    method: 'delete'
  })
}

// 详情信息页 提交 保存
export function save(data) {
  return fetch({
    url: '/api/balance/preSettlementHlj/save',
    method: 'put',
    data: data
  })
}

//详情信息页 计算
export function calcData(data) {
  return fetch({
    url: `/api/balance/preSettlementHlj/calcData`,
    method: 'post',
    data
  })
}