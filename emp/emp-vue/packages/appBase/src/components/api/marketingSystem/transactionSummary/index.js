/*
 * @功能描述: 集团交易处报表 - 交易综合情况统计表
 * @版本: 
 * @作者: 郑文杰
 * @Date: 2019-11-25 20:10:30
 * @最新修改内容: 
 * @LastEditTime : 2019-12-26 09:52:26
 */
import fetch from "@common/utils/fetch";
import { getToken } from "@common/utils/auth";
//查询
export function getList(query) {
    return fetch({
        url: "/api/dataplatform/comprehensiveSituation/getResult",
        method: "get",
        params: query
    });
}

//导出
export function downloadFile(parm) {
    let token = getToken();
    let url = "/api/dataplatform/comprehensiveSituation/getExport?token=" + token
    url += "&issue=" + parm;
    window.location.href=url
}