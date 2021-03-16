/*
 * @功能描述: 
 * @版本: 
 * @作者: 
 * @Date: 2019-11-13 15:59:34
 * @最新修改内容: 
 * @LastEditTime: 2019-11-14 10:27:45
 */
import fetch from '@common/utils/fetch';
// 查看页面查询
export function getViewList(query) {
    return fetch({
        url: '/api/customer/mediatorAgency/selectByMediatorId',
        method: 'get',
        params: query
    });
}
// 新增代理列表查询
export function getAddAlreadyPage(query) {
    return fetch({
        url: '/api/customer/khCustomerRelation/page/getAlreadyPage',
        method: 'get',
        params: query
    });
}
//确认代理
export function insertCustomerByMediatorId(query) {
    return fetch({
        url: '/api/customer/mediatorAgency/insertCustomerByMediatorId',
        method: 'post',
        data: query
    });
}
// 解除代理
export function deleteCustomerByMediatorId(query) {
    return fetch({
        url: '/api/customer/mediatorAgency/deleteCustomerByMediatorId',
        method: 'post',
        data: query
    });
}
//保存
export function tMdataCustomer(query) {
    return fetch({
        url: '/api/customer/mediatorAgency/updateMediatorType',
        method: 'get',
        params: query
    });
}
