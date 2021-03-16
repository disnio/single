import fetch from "@common/utils/fetch";
import { getToken } from "@common/utils/auth";
// 导出
export function exportFile(ids){
    // let token = getToken()
    // let url = "/api/business/jyMarketTransactions/export?token=" + token
    // for(let key in params){
    //     if (typeof params[key] != 'undefined') {
    //     url += "&"+key+"=" + params[key];
    //     }
    // }
    // window.location.href = url
    let token = getToken()
    let url = "/api/business/jyMarketTransactions/export/" + ids + "?token=" + token
    window.location.href = url + "&ModelCode=" + window.mdcode;
}
// 分页查询
export function Pagination(id){
    return fetch({
        url:'/api/business/jyMarketTransactions/'+ id,
        method:'get'
    })
}
// 提交保存
export function add(param){
    return fetch({
        url:'/api/business/jyMarketTransactions/maintain',
        method:'post',
        data:param
    })
}
// 查看
export function seeData(id){
    return fetch({
        url:'/api/business/jyMarketTransactions/'+ id,
        method:'get'
    })
}
