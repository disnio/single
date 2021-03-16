/*
 * @功能描述: 
 * @版本: 
 * @作者: frj
 * @Date: 2020-02-24 09:36:53
 * @最新修改内容: 
 * @LastEditTime: 2020-02-24 17:15:17
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";
/**
 * @方法名称: addObj
 * @功能描述: 新增
 * @参数: 
 * @返回值: 
 * @作者: frj
 * @issues: 
 * @Date: 2020-02-24 10:58:58
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function addObj(data) {
    return fetch({
        url: '/api/admin/Deductible',
        method: 'post',
        data: data
    });
}
/**
 * @方法名称: editObj
 * @功能描述: 修改
 * @参数: 
 * @返回值: 
 * @作者: frj
 * @issues: 
 * @Date: 2020-02-24 16:59:35
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function editObj(data,id) {
    return fetch({
        url: '/api/admin/Deductible/'+ id,
        method: 'put',
        data: data
    });
}
/**
 * @方法名称: getListPage
 * @功能描述: 查询
 * @参数: 
 * @返回值: 
 * @作者: frj
 * @issues: 
 * @Date: 2020-02-24 10:59:33
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function getListPage(query) {
    return fetch({
        url: '/api/admin/Deductible/getList',
        method: 'get',
        params: query
    });
}
/**
 * @方法名称: getIsEnabled
 * @功能描述: 判断是否可以启用
 * @参数: 
 * @返回值: 
 * @作者: frj
 * @issues: 
 * @Date: 2020-02-24 16:59:53
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function getIsEnabled(query) {
    return fetch({
        url: '/api/admin/Deductible/getIsEnabled',
        method: 'get',
        params: query
    });
}