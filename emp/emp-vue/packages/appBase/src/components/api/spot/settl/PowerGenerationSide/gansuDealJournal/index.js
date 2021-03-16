/*
 * @功能描述: 甘肃交易日报api
 * @版本: 
 * @作者: frj
 * @Date: 2020-06-03 17:08:29
 * @最新修改内容: 
 * @LastEditTime: 2020-06-03 17:24:50
 */
import fetch from '@common/utils/fetch';

export function selectDayGatherListByQuery(query) {
	return fetch({
		url: '/api/settl/smsettlinvpaydayyyzxcontroller/selectDayGatherListByQuery',
		method: 'get',
		params: query
	})
}