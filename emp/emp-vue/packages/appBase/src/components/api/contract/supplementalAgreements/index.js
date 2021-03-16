import fetch from "@common/utils/fetch";
import { getToken } from "@common/utils/auth";
///// 补充协议

// 补充协议新增
export function add(param){
    return fetch({
        url:'api/contract/htContractSupplementaryAgreement/contract/code-name',
        method:'post',
        data:param
    })
}
// 补充协议分页列表
export function Pagination(query){
    return fetch({
        url:'/api/contract/htContractSupplementaryAgreement/list',
        method:'get',
        params:query
    })
}
// 删除补充协议  id
export function delForm(query){
    return fetch({
        url:'/api/contract/htContractSupplementaryAgreement/delete/'+query,
        method:'delete'
    })
}
// 通过编码或名称查询主体合同
export function PaginationSurvey(query){
    return fetch({
        url:'/api/contract/htContractSupplementaryAgreement/contract/code-name',
        method:'get',
        params:query
    })
}
// 编辑
export function editAgreement(query){
    return fetch({
        url:'/api/contract/htContractSupplementaryAgreement/contract/code-name',
        method:'post',
        data:query
    })
}
// // 导出
// export function exportFile(query){
//     let token = getToken()
//     let url = "/api/customer/khCustomerSatisfactionSurveyDetail/export?token=" + token
//     let id = query.satisfactionSurveyId
//     let issue = query.issue
//     if (id !== undefined && id !== "" && id !== null) {
//         url += "&satisfactionSurveyId=" + id
//     }
//     if (issue !== undefined && issue !== "" && issue !== null) {
//         url += "&issue=" + issue
//     }
//     window.location.href = url
// }