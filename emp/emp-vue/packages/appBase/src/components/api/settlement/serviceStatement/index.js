import fetch from "@common/utils/fetch";
// 确定 
export function add(param){
    return fetch({
        url:'/api/balance/jsAncillaryStatementMd/add',
        method:'post',
        data:param
    })
}
// 分页
export function Pagination(query){
    return fetch({
        url:'/api/balance/jsAncillaryStatementMd/list',
        method:'get',
        params:query
    })
}
// // 提交
// export function commit(query){
//     return fetch({
//         url:'/api/customer/khCustomerAddedServices/commit/'+query,
//         method:'get'
//     })
// }
// // 删除
// export function delForm(query){
//     return fetch({
//         url:'/api/customer/khCustomerAddedServices/delete/'+query,
//         method:'get'
//     })
// }
// // 查看
// export function seeForm(query){
//     return fetch({
//         url:'/api/customer/khCustomerAddedServices/getById/'+query,
//         method:'get'
//     })
// }

// // 修改
// export function update(query){
//     return fetch({
//         url:'/api/customer/khCustomerAddedServices/update',
//         method:'post',
//         data:query
//     })
// }