import fetch from "@common/utils/fetch";
// 新增
export function addValue(param){
    return fetch({
        url:'/api/customer/tenderRecords',
        method:'post',
        data:param
    })
}
// 查看
export function seeForm(query){
    return fetch({
        url:'/api/customer/tenderRecords/'+query,
        method:'get'
    })
}
// 修改
export function update(query, id){
    return fetch({
        url:'/api/customer/tenderRecords/'+ id,
        method:'put',
        data:query
    })
}
// 删除
export function delForm(query){
    return fetch({
        url:'/api/customer/tenderRecords'+query,
        method:'delete'
    })
}
// 提交
export function commit(query){
    return fetch({
        url:'/api/customer/khCustomerAddedServices/commit/'+query,
        method:'get'
    })
}

// 分页
export function Pagination(query){
    return fetch({
        url:'/api/customer/tenderRecords/page/getTenderRecords',
        method:'get',
        params:query
    })
}
