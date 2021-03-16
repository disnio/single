/*
 * @功能描述: 结算模块-售电侧-（呼伦贝尔）售电公司电费结算   #2911
 * @作者: 郑文杰
 * @Date: 2019-12-01 15:04:18
 * @最新修改内容: 
 * @LastEditTime: 2019-12-04 19:26:45
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// 主表 分页查询
export function getPageList(query) {
    return fetch({
        url: '/api/balance/hlbesdgsdfjs/getPage',
        method: 'get',
        params: query
    });
}


//根据主表id查询从表数据
export function getDetailList(query) {
    return fetch({
        url: '/api/balance/hlbesdgsdfjsdetails/getDataByElectricityFeesId',
        method: 'get',
        params: query
    });
}

// 根据id删除信息
export function delObj(obj) { //
    return fetch({
        url: '/api/balance/hlbesdgsdfjs/deleteList',
        method: 'post',
        data: obj
    })
}

// 校验当前用户所选期次可否新增
export function checkObj(query) {
    return fetch({
        url: '/api/balance/hlbesdgsdfjs/checkSettlementDate',
        method: 'get',
        params: query
    });
}

// 新增
export function addObj(obj) {
    return fetch({
        url: '/api/balance/hlbesdgsdfjs/add',
        method: 'post',
        data: obj
    });
}
// 导出详情页
export function exportObj(id) {
    let token = getToken()
    let url = "/api/balance/hlbesdgsdfjsdetails/exportDetailData?token=" + token
    if (id !== undefined && id !== "" && id !== null) {
        url += "&electricityFeesId=" + id
    }
    window.open(url)

}