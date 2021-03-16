import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

export function getNewPageList(query) { //交易公告列表接口
    return fetch({
        url: '/api/business/jyTradingResults/page/getNewPageList',
        method: 'get',
        params: query
    });
}
// #2723 wangc 20191121 修改查询详情方法
export function getDetailsPageList(query) { //交易公告列表接口
    return fetch({
        url: '/api/business/jyTradingResultsDetail/page-map',
        method: 'get',
        params: query
    });
}

/**
 * @功能描述: 根据发电公司编码获取组织信息
 * @参数:
 * @返回值:
 * @作者: 张朋
 * @Date: 2019-12-13 17:48:32
 * @最新修改内容:
 * @LastEditTime:
 */
export function getFdOrgData(id) { //交易结果列表
    return fetch({
        url: '/api/admin/org/' + id,
        method: 'get',
    });
}


/**
 * @功能描述: 非双边协商获取标杆电价
 * @参数:
 * @返回值:
 * @作者: 张朋
 * @Date: 2019-12-13 15:07:26
 * @最新修改内容:
 * @LastEditTime:
 */
export function selectOneBenchmarkPriceSale(query) {
    return fetch({
        url: '/api/basicData/BenchmarkPrice/selectOneBenchmarkPriceSale',
        method: 'get',
        params: query
    });
}

/**
 * selectListBenchmarkPriceSale
 * @功能描述: 非双边协商获取标杆电价数组
 * @作者: 李志佳
 * @Date: 2020年5月19日14:37:15
 */
export function selectListBenchmarkPriceSale(query) {
    return fetch({
        url: '/api/basicData/BenchmarkPrice/selectListBenchmarkPriceSale',
        method: 'get',
        params: query
    });
}

//2019-12-6 #2933 张朋 获取交易公告
export function pageList(id) {
    return fetch({
        url: 'api/business/tradeNotice/' + id,
        method: 'get',
    });
}


export function update(obj) { //编辑提交
    return fetch({
        url: '/api/business/jyTradingResults/updateDetailDatas',
        method: 'put',
        data: obj
    })
}

export function putObj(obj) {
    return fetch({
        url: '/api/business/jyTradingResults/updateBuyData',
        method: 'put',
        data: obj
    })
}
export function page(query) { //交易公告列表接口
    return fetch({
        url: '/api/business/jyTradingResults/page/getPageList?orgType=sell',
        method: 'get',
        params: query
    });
}

export function resultPage(query) { //交易结果主表
    return fetch({
        url: '/api/business/jyTradingResults/getResultsById',
        method: 'get',
        params: query
    });
}

export function resultList(query) { //交易结果列表
    return fetch({
        url: '/api/business/jyTradingResults/page/getResultsDeatilPageById',
        method: 'get',
        params: query
    });
}

export function delResultObj(id) { //
    return fetch({
        url: '/api/business/jyTradingResultsDetail/' + id,
        method: 'delete'
    })
}

export function addObj(obj) {
    return fetch({
        url: '/api/business/jyTradingResults/matchingSellData',
        method: 'post',
        data: obj
    });
}

export function getObj(id) {
    return fetch({
        url: '/api/business/jyTradingResults/' + id,
        method: 'get'
    })
}

export function delObj(id) {
    return fetch({
        url: '/api/business/jyTradingResults/' + id,
        method: 'delete'
    })
}

// export function putObj(obj) {
// return fetch({
// url: '/api/business/jyTradingResults/updateSellData',
// method: 'put',
// data: obj
// })
// }
export function getTradingUnitAll(obj) {
    return fetch({
        url: '/api/admin/tradingUnit/all',
        method: 'get',
        data: obj
    })
}

export function waySelectObj() { //交易方式
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=transaction_mode',
        method: 'get'
    })
}

export function varietySelectObj() { //交易品种
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=transactions_variety',
        method: 'get'
    })
}


export function centerSelectObj() { //交易中心
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=trading_center',
        method: 'get'
    })
}


export function periodSelectObj() { //交易周期
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=transaction_period',
        method: 'get'
    })
}
// 状态下拉的接口 20191223 阿彪 #3235 添加状态下拉
export function getStatusOptionsObj() {
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=state',
        method: 'get'
    })
}

export function quarterSelectObj() { //季度
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=quarter',
        method: 'get'
    })
}


export function importExcel() { //导入
    return fetch({
        url: '/api/business/jyTradingResultsDetail/importExcel',
        method: 'post',
    })
}

export function delResultId(ids) { //编辑删除
    return fetch({
        url: '/api/business/jyTradingResultsDetail/' + ids,
        method: 'delete',
    })
}

export function updateCommit(obj, id) { //编辑提交
    return fetch({
        url: '/api/business/jyTradingResults/' + id,
        method: 'put',
        data: obj
    })
}


export function ResultExportObj(id) {
    let token = getToken()
    let url = "/api/business/jyTradingResultsDetail/exportSellResultDetail?token=" + token + "&jyTradingResultsId=" + id
    // url+="&ModelCode="+sessionStorage.getItem("modelCode");
    window.location.href = url + "&ModelCode=" + window.mdcode;
}

export function exportObj(parm) {
    let token = getToken()
    let url = "/api/business/jyTradingResults/getNewExcelDataList?token=" + token + "&ModelCode=" + sessionStorage.getItem("modelCode")
    let tradingCenterId = parm.tradingCenterId
    let tradingVariety = parm.tradingVariety
    let tradingWay = parm.tradingWay
    let noticeDate = parm.noticeDate
    let tradingCycle = parm.tradingCycle
    let tradingTime = parm.tradingTime
    let orgType = parm.orgType
    let orgId = parm.orgId
    let regionOrgId = parm.regionOrgId
    if (tradingCenterId !== undefined && tradingCenterId !== "" && tradingCenterId !== null) {
        url += "&tradingCenterId=" + tradingCenterId
    }
    if (tradingVariety !== undefined && tradingVariety !== "" && tradingVariety !== null) {
        url += "&tradingVariety=" + tradingVariety
    }
    if (tradingWay !== undefined && tradingWay !== "" && tradingWay !== null) {
        url += "&tradingWay=" + tradingWay
    }
    if (noticeDate !== undefined && noticeDate !== "" && noticeDate !== null) {
        url += "&noticeDate=" + noticeDate
    }
    if (tradingCycle !== undefined && tradingCycle !== "" && tradingCycle !== null) {
        url += "&tradingCycle=" + tradingCycle
    }
    if (tradingTime !== undefined && tradingTime !== "" && tradingTime !== null) {
        url += "&tradingTime=" + tradingTime
    }
    if (orgType !== undefined && orgType !== "" && orgType !== null) {
        url += "&orgType=" + orgType
    }
    if (orgId !== undefined && orgId !== "" && orgId !== null) {
        url += "&orgId=" + orgId
    }
    if (regionOrgId !== undefined && regionOrgId !== "" && regionOrgId !== null) {
        url += "&regionOrgId=" + regionOrgId
    }
    url += "&ModelCode=" + sessionStorage.getItem("modelCode");
    window.location.href = url + "&ModelCode=" + window.mdcode;

}

export function getCustomerAll(query) { //根据公司名称模糊查询信息
    return fetch({
        url: '/api/customer/tMdataCustomer/getCustomerByCustomerName',
        method: 'get',
    });
}

export function getOrgAll(query) { //根据公司名称模糊查询信息
    return fetch({
        url: '/api/admin/org/getAllOrgByAttribute',
        method: 'get',
    });
}

export function getOrgByName(query) { //获取发电公司
    return fetch({
        url: '/api/admin/org/getAllOrgByAttribute?attributeTypeCode=zzjgsx02',
        method: 'get',
        params: query
    })
}

export function getAllOrgListByProvince(query) { //新 获取发电公司
    return fetch({
        url: '/api/admin/org/getAllOrgListByProvince?attributeTypeCode=zzjgsx02',
        method: 'get',
        params: query
    })
}

export function getSdOrgName(query) { //获取售电公司
    return fetch({
        url: '/api/admin/org/getAllOrgByAttribute?attributeTypeCode=zzjgsx01',
        method: 'get',
        params: query
    })
}
export function getTransactionLine() { //获取联络路线
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=link_circuit',
        method: 'get'
    })
}

export function getTradingUnitByName(query) { //根据交易名称模糊查询信息
    return fetch({
        url: '/api/admin/tradingUnit/getTradingUnitbyTradingUnitName',
        method: 'get',
        params: query
    });
}