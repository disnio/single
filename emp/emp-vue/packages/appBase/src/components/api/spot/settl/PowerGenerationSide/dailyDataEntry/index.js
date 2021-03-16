/*
 * @功能描述:
 * @版本:
 * @作者: frj
 * @Date: 2020-05-27 14:26:28
 * @最新修改内容:
 * @LastEditTime: 2020-06-01 19:23:50
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";
/**
 * @方法名称: getTabList
 * @功能描述: 获取table
 * @参数:
 * @返回值:
 * @作者: frj
 * @issues:
 * @Date: 2020-05-27 14:30:39
 * @最新修改内容:
 * @LastEditTime:
 */
export function getTabList(query) {
	return fetch({
		url: '/api/settl/smsettldailymarket/getTabList',
		method: 'get',
		params: query
	})
}
/**
 * @方法名称: getParamList
 * @功能描述: 获取资源编码
 * @参数:
 * @返回值:
 * @作者: frj
 * @issues:
 * @Date: 2020-05-27 15:16:35
 * @最新修改内容:
 * @LastEditTime:
 */
export function getParamList(query) {
	return fetch({
		url: '/api/settl/smsettldailymarket/getParamList',
		method: 'get',
		params: query
	})
}
export function getParamTypeList(query) {
	return fetch({
		url: '/api/settl/smsettldailymarket/getParamTypeList',
		method: 'get',
		params: query
	})
}
/**
 * @方法名称: getPage
 * @功能描述: 分页查询
 * @参数:
 * @返回值:
 * @作者: frj
 * @issues:
 * @Date: 2020-05-28 10:14:45
 * @最新修改内容:
 * @LastEditTime:
 */
export function getPage(query) {
	return fetch({
		url: '/api/settl/smsettldailymarket/getPage',
		method: 'get',
		params: query
	})
}
export function getAllDataList(query) {
	return fetch({
		url: '/api/settl/smsettldailymarket/getAllDataList',
		method: 'get',
		params: query
	})
}
/**
 * @方法名称: getOneById
 * @功能描述: 通过ID查询数据
 * @参数:
 * @返回值:
 * @作者: frj
 * @issues:
 * @Date: 2020-05-28 13:47:03
 * @最新修改内容:
 * @LastEditTime:
 */
export function getOneById(query) {
	return fetch({
		url: '/api/settl/smsettldailymarket/getOneById',
		method: 'get',
		params: query
	})
}
/**
 * @方法名称: addForm
 * @功能描述: 新增
 * @参数:
 * @返回值:
 * @作者: frj
 * @issues:
 * @Date: 2020-05-28 15:02:59
 * @最新修改内容:
 * @LastEditTime:
 */
export function addForm(query) {
	return fetch({
		url: '/api/settl/smsettldailymarket/add',
		method: 'post',
		data: query
	})
}
/**
 * @方法名称: update
 * @功能描述: 编辑
 * @参数:
 * @返回值:
 * @作者: frj
 * @issues:
 * @Date: 2020-05-28 17:03:27
 * @最新修改内容:
 * @LastEditTime:
 */
export function update(query) {
	return fetch({
		url: '/api/settl/smsettldailymarket/update',
		method: 'post',
		data: query
	})
}
/**
 * @方法名称: deleteList
 * @功能描述: 多选删除
 * @参数: ids
 * @返回值:
 * @作者: frj
 * @issues:
 * @Date: 2020-05-28 15:03:19
 * @最新修改内容:
 * @LastEditTime:
 */
export function deleteList(query) {
	return fetch({
		url: '/api/settl/smsettldailymarket/deleteList',
		method: 'get',
		params: query
	})
}
/**
 * @方法名称: checkTheFile
 * @功能描述: 校验文档是否存在
 * @参数:
 * @返回值:
 * @作者: frj
 * @issues:
 * @Date: 2020-06-01 10:10:04
 * @最新修改内容:
 * @LastEditTime:
 */
export function checkTheFile(query) {
	return fetch({
		url: '/api/settl/smsettldailymarket/checkTheFile',
		method: 'get',
		params: query
	})
}
/**
 * @方法名称: getParamListForError
 * @功能描述: 错误信息表头
 * @参数:
 * @返回值:
 * @作者: frj
 * @issues:
 * @Date: 2020-06-01 18:58:48
 * @最新修改内容:
 * @LastEditTime:
 */
export function getParamListForError(query) {
	return fetch({
		url: '/api/settl/smsettldailymarket/getParamTypeListCw',
		method: 'get',
		params: query
	})
}
export function importTheFile(query) {
	return fetch({
		url: '/api/settl/smsettldailymarket/importTheFile',
		method: 'post',
		data: query
	})
}
// 具体的错误信息查看
export function getDetailCwlist(query) {
	return fetch({
		url: '/api/settl/smsettldailymarket/cwList',
		method: 'post',
		data: query
	})
}

//真* 异常Excel 导出
export function exportCwList(data) {
	let token = getToken()
	let url = "/api/settl/smsettldailymarket/export-cw-list?token=" + token
	for (let k in data) {
	  let value = data[k] != undefined ? data[k] : "";
	  url += `&${k}=${encodeURIComponent(value)}`;
	}
	window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
  }
/**
 * @方法名称: downloadTemplate
 * @功能描述: 模板下载
 * @参数:
 * @返回值:
 * @作者: frj
 * @issues:
 * @Date: 2020-06-01 09:30:08
 * @最新修改内容:
 * @LastEditTime:
 */
export function downloadTemplate(data) {
	// console.log(data, "jsData");

	let token = getToken()
	let url = "/api/settl/smsettldailymarket/downloadTemplate?token=" + token + "&smTranRuleConfigureSubId=" + data.smTranRuleConfigureSubId + "&tradingTypeCode=" + data.tradingTypeCode + "&transDate=" + data.transDate
	window.location.href = url + "&ModelCode=" + window.mdcode;}
