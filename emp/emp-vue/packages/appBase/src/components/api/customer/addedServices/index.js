/*
 * @Author: fengzp
 * @Date: 2020-12-02 18:34:29
 * @LastEditors: fengzp
 * @LastEditTime: 2021-01-13 13:53:31
 * @Introduce: Do not edit
 */
import fetch from "@common/utils/fetch";
// 模糊查询需求方
export function getAllocatedCustomerListByName(query){
    return fetch({
        url:`api/customer/tMdataCustomer/getAllocatedCustomerListByName?custName=${query}`,
        method:'get'
    })
}

// 新增
export function add(param){
    return fetch({
        url:'/api/customer/khCustomerAddedServices/add',
        method:'post',
        data:param
    })
}
// 提交
export function commit(query){
    return fetch({
        url:'/api/customer/khCustomerAddedServices/commit/'+query,
        method:'get'
    })
}
// 删除
export function delForm(query){
    return fetch({
        url:'/api/customer/khCustomerAddedServices/delete/'+query,
        method:'get'
    })
}
// 查看
export function seeForm(query){
    return fetch({
        url:'/api/customer/khCustomerAddedServices/getById/'+query,
        method:'get'
    })
}
// 分页
export function Pagination(query){
    return fetch({
        url:'/api/customer/khCustomerAddedServices/list',
        method:'get',
        params:query
    })
}
// 修改
export function update(query){
    return fetch({
        url:'/api/customer/khCustomerAddedServices/update',
        method:'post',
        data:query
    })
}