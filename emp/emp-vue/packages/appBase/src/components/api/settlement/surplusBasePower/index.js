/*
 * @功能描述: 
 * @版本: 
 * @作者: frj
 * @Date: 2020-02-11 10:52:09
 * @最新修改内容: 
 * @LastEditTime: 2020-02-17 12:46:32
 */
import fetch from '@common/utils/fetch';

/**
 * @方法名称: getPageList
 * @功能描述: 页面查询
 * @参数: 
 * @返回值: 
 * @作者: frj 
 * @issues: 
 * @Date: 2020-02-11 10:53:03
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function getPageList(query) {
    return fetch({
        url: '/api/balance/surplusBase/getPageList',
        method: 'get',
        params: query
    });
}
/**
 * @方法名称: deleteListByIds
 * @功能描述: 删除信息
 * @参数: 
 * @返回值: 
 * @作者: frj
 * @issues: 
 * @Date: 2020-02-11 10:54:34
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function deleteListByIds(query) {
    return fetch({
        url: '/api/balance/surplusBase/deleteListByIds',
        method: 'get',
        params: query
    });
}
/**
 * @方法名称: insertOrUpdateDetail
 * @功能描述:编辑修改
 * @参数: 
 * @返回值: 
 * @作者: frj
 * @issues: 
 * @Date: 2020-02-11 10:55:13
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function insertOrUpdateDetail(query) {
    return fetch({
        url: '/api/balance/surplusBase/insertOrUpdateDetail',
        method: 'post',
        data: query
    });
}
/**
 * @方法名称: getAllocatedCustomerListByProvinceCode
 * @功能描述: 根据省份获取客户名称
 * @参数: 
 * @返回值: 
 * @作者: frj
 * @issues: 
 * @Date: 2020-02-17 11:36:43
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function getAllocatedCustomerListByProvinceCode(query) {
    return fetch({
        url: '/api/customer/tMdataCustomer/getAllocatedCustomerListByProvinceCode',
        method: 'get',
        params: query
    });
}