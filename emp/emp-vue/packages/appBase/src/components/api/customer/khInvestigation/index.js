import fetch from "@common/utils/fetch";
import { getToken } from "@common/utils/auth";
// 满意度调查开始
// 新增
export function add(param){
    return fetch({
        url:'/api/customer/khCustomerSatisfactionSurvey/add',
        method:'post',
        data:param
    })
}
// 分页
export function Pagination(query){
    return fetch({
        url:'/api/customer/khCustomerSatisfactionSurvey/list',
        method:'get',
        params:query
    })
}
// 删除
export function delForm(query){
    return fetch({
        url:'/api/customer/khCustomerSatisfactionSurvey/del/'+query,
        method:'get'
    })
}
// 满意度调查结束
// 满意度调查详情开始
// 分页
export function PaginationSurvey(query){
    return fetch({
        url:'/api/customer/khCustomerSatisfactionSurveyDetail/list',
        method:'get',
        params:query
    })
}
// 查看意见
export function seeSugges(query){
    return fetch({
        url:'/api/customer/khCustomerSatisfactionSurveyDetail/getOpinions/'+query,
        method:'get',
        params:query
    })
}
// 导出
export function exportFile(query){
    let token = getToken()
    let url = "/api/customer/khCustomerSatisfactionSurveyDetail/export?token=" + token
    let id = query.satisfactionSurveyId
    let issue = query.issue
    if (id !== undefined && id !== "" && id !== null) {
        url += "&satisfactionSurveyId=" + id
    }
    if (issue !== undefined && issue !== "" && issue !== null) {
        url += "&issue=" + issue
    }
    window.location.href = url + "&ModelCode=" + window.mdcode;
}
//下发
export function issued(id){
    return fetch({
        url:'/api/customer/khCustomerSatisfactionSurveyDetail/pull/'+ id,
        method:'get',
        params:id
    })
}