/*
 * @功能描述: #1088 交易管理-售电侧申报管理-前端开发
 * @detail: 交易管理-售电侧报价方案审核 相关接口 api
 * @作者: zhangp
 * @Date: 2020-06-01 14:44:25
 * @最新修改内容:
 * @LastEditTime: 2020-06-01 10:44:21
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

/*------------ 售电侧报价方案审核页   -   start  -----------------*/



//售电侧报价方案审核-查询待审批信息
export function getSellDeclaAuditPage(query) {
    return fetch({
        url: '/api/tran/smTradeSellDeclaAudit/getSellDeclaAuditPage',
        method: 'get',
        params: query
    });
}

//售电侧报价方案审核-通过/驳回操作
export function opertion(query) {
    return fetch({
        url: '/api/tran/smTradeSellDeclaAudit/opertion',
        method: 'get',
        params: query
    });
}

/*------------ 售电侧报价方案页   -   end  -----------------*/