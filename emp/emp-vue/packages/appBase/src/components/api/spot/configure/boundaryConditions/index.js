import fetch from "@common/utils/fetch";

// /smTranRuleConfigure/page
// -分页查询
export function page(data) {
    return fetch({
        url: "/api/tran/smTranRuleConfigure/page",
        method: "get",
        params: data
    });
}

// /smTranRuleConfigure/checkAndInsert
// -新增
export function add(data) {
    return fetch({
        url: '/api/tran/smTranRuleConfigure/checkAndInsert',
        method: 'post',
        data
    })
}

// /smTranRuleConfigure/{id}
// -多选删除
export function deleteList(str) {
    return fetch({
        url: `/api/tran/smTranRuleConfigure/${str}`,
        method: "delete"
    });
}

// /smpointtimetemplate/getAllDataList
// 时点模板-全部查询
export function getAllDataList(data) {
    return fetch({
        url: '/api/tran/smpointtimetemplate/getAllDataList',
        method: 'get',
        params: data
    })
}

// /smresourcemetricsassociationtable/getItemInfoByResouceCode
// 获取页面指标List
export function getItemInfoByResouceCode(data) {
    return fetch({
        url: '/api/tran/smresourcemetricsassociationtable/getItemInfoByResouceCode',
        method: 'get',
        params: data
    })
}

// /smTranRuleConfigure/subList/{confId}
// 编辑修改  信息回显
export function getSubList(confId) {
    return fetch({
        url: `/api/tran/smTranRuleConfigure/subList/${confId}`,
        method: 'get'
    })
}

// /smTranRuleConfigureSub/saveOrCommit
// 保存  提交
export function saveOrCommit(data) {
    return fetch({
        url: `/api/tran/smTranRuleConfigureSub/saveOrCommit?confId=${data.confId}&status=${data.status}&takeEffectTime=${data.takeEffectTime}`,
        method: "post",
        data: data.configureSubVOList
    });
}