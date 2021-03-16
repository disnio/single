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
// 新增客户电费预结算-亮
export function addObj(obj) {
    return fetch({
        url: '/api/balance/preSettlementSX/addSettleMentInfo',
        method: 'post',
        data: obj
    });
}

// 明细修改保存 /preSettlementDetail/{ id }
export function putObj(obj) {
    return fetch({
        url: '/api/balance/preSettlementSX/save',
        method: 'post',
        data: obj
    })
}

// 从表批量的确认
export function detailBatchUpdateStatusObj(id) {
    return fetch({
        url: '/api/balance/preSettlementDetail/batchUpdateStatus/' + id,
        method: 'get'
    })
}

//判断日期选择完 数据是否保存
export function checkInsertFlag(query) {
    return fetch({
        url: '/api/balance/preSettlement/checkInsertFlag',
        method: 'get',
        params: query
    })
}

// 获取结算库里的 明细 数据
export function getBalancePage(query) {
    return fetch({
        url: '/api/balance/preSettlementDetail/page',
        method: 'get',
        params: query
    })
}

// 陕西-主列表删除
export function delObj(id) {
    return fetch({
        url: '/api/balance/preSettlement/' + id,
        method: 'delete'
    })
}

// 陕西-从表计算
export function countKhyjsDataObj(obj) {
    return fetch({
        url: '/api/balance/preSettlementSX/calcData',
        method: 'post',
        data: obj
    })
}

//陕西-客户结算详情页导出
export function exportObj(parm) {
    let token = getToken()
    let url = "/api/balance/preSettlementDetail/exportSXDetailList?token=" + token
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
    window.location.href = url + "&ModelCode=" + window.mdcode;
}

// 调整记录 
export function getadjustmentRecord(query) {
    return fetch({
        url: '/api/balance/jsAdjustmentRecord/getPageList',
        method: 'get',
        params: query
    })
}


// 明细 查看 /preSettlementDetail/{id} 
export function getDetailById(id) {
    return fetch({
        url: '/api/contract/htAgentProtocol/' + id,
        method: 'get'
    })
}

// 抽取福建合同信息
export function getFJList(query) {
    return fetch({
        url: '/api/contract/htContract/extractHtContractFJ',
        method: 'get',
        params: query
    });
}

// 抽取广东合同信息
export function getGDList(query) {
    return fetch({
        url: '/api/contract/htContract/extractHtContractGD',
        method: 'get',
        params: query
    });
}


// //提交
// export function updateStatus(query) {
//     return fetch({
//         url: '/api/balance/preSettlement/updateStatus',
//         method: 'put',
//         params: query
//     });
// }


//提交 liz
export function updateStatus(data) {
    return fetch({
        url: '/api/balance/preSettlementDetail/udpateSXDetailById',
        method: 'put',
        data: data
    });
}

//取消提交
export function ModifyDataStatus(query) {
    return fetch({
        url: '/api/balance/preSettlement/cancelCommit',
        method: 'get',
        params: query
    });
}

/**
 * @功能描述: 新增
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


//计算
export function countSXDetail(data) {
    return fetch({
        url: '/api/balance/preSettlementDetail/countShanXDetail',
        method: 'post',
        data: data
    });
}


// export function countKhyjsDataObj(obj) {
//     return fetch({
//       url: '/api/balance/jsPreSettlement/calcData',
//       method: 'post',
//       data: obj
//     })
//   }
