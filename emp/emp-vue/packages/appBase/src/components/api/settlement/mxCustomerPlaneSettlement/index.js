/*
 * @功能描述: 
 * @版本: 
 * @作者: 张朋
 * @Date: 2020-02-18 15:41:44
 * @最新修改内容: 
 * @LastEditTime: 2021-03-13 14:07:26
 */

import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";
// 获取主列表
export function page(query) {
    return fetch({
        url: '/api/balance/preSettlement/page',
        method: 'get',
        params: query
    });
}

//判断日期选择完 数据是否保存
export function checkInsertFlag(query) {
    return fetch({
        url: '/api/balance/preSettlement/checkInsertFlag',
        method: 'get',
        params: query
    })
}
//提交-亮
export function ModifyDataStatus(query) {
    return fetch({
        url: '/api/balance/preSettlement/cancelCommit',
        method: 'get',
        params: query
    });
}

// 获取结算库里的 明细 数据
export function getBalancePage(query) {
    return fetch({
        url: '/api/balance/preSettlementDetail/page',
        method: 'get',
        params: query
    })
}

// 蒙西-主列表删除
export function delObj(id) {
    return fetch({
        url: '/api/balance/preSettlement/' + id,
        method: 'delete'
    })
}

// 蒙西-从表计算
// export function countKhyjsDataObj(obj) {
//     return fetch({
//         url: '/api/balance/preSettlementSX/calcData',
//         method: 'post',
//         data: obj
//     })
// }

//蒙西-客户结算详情页导出
export function exportObj(parm) {
    let token = getToken()
    let url = "/api/balance/preSettlementDetail/exportSettlementDetail?token=" + token
    let preSettlementId = parm.preSettlementId
    let provinceName = parm.provinceName
    let titles = parm.titles
    let columns = parm.columns
    if (preSettlementId !== undefined && preSettlementId !== "" && preSettlementId !== null) {
        url += "&preSettlementId=" + preSettlementId
    }
    if (provinceName !== undefined && provinceName !== "" && provinceName !== null) {
        url += "&provinceName=" + provinceName
    }
    if (columns !== undefined && columns !== "" && columns !== null) {
        url += columns
    }
    if (titles !== undefined && titles !== "" && titles !== null) {
        url += titles
    }
    if (parm.modelCode !== undefined) {
        url += '&modelCode=' + parm.modelCode
    }
    window.location.href = url + "&ModelCode=" + window.mdcode;

}

// 调整记录 
// export function getadjustmentRecord(query) {
//     return fetch({
//         url: '/api/balance/jsAdjustmentRecord/getPageList',
//         method: 'get',
//         params: query
//     })
// }

//保存、提交
export function batchUpdate(query, status) {
    return fetch({
        url: '/api/balance/preSettlementDetail/batchUpdate/' + status,
        method: 'post',
        data: query
    });
}

/**
 * @功能描述: 蒙西主界面新增
 * @参数: 
 * @返回值: 
 * @作者: 张朋
 * @Date: 2020-02-14 14:00:14
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function insertSettlementInfo(obj) {
    return fetch({
        url: '/api/balance/preSettlement/insertSettlementInfo',
        method: 'get',
        params: obj
    });
}