/*
 * @功能描述: 售电公司详情接口
 * @版本:
 * @作者: 张朋
 * @Date: 2019-11-27 21:17:20
 * @最新修改内容:
 * @LastEditTime: 2021-03-13 14:00:49
 */
import fetch from '@common/utils/fetchUnits';
import { getToken } from "@common/utils/auth";

/**
 * @功能描述: 列表
 * @参数:
 * @返回值:
 * @作者: 张朋
 * @Date: 2019-11-29 09:19:55
 * @最新修改内容:
 * @LastEditTime:
 */
export function page(params) {
    return fetch({
        url: '/api/business/jynoticesdgsqkb/getPage',
        method: 'get',
        params: params
    });
}

/**
 * @功能描述: 新增
 * @参数:
 * @返回值:
 * @作者: 张朋
 * @Date: 2019-11-29 09:20:13
 * @最新修改内容:
 * @LastEditTime:
 */
export function addObj(obj) {
    return fetch({
        url: '/api/business/jynoticesdgsqkb/add',
        method: 'post',
        data: obj
    });
}

/**
 * @功能描述: 编辑
 * @参数:
 * @返回值:
 * @作者: 张朋
 * @Date: 2019-11-29 09:20:45
 * @最新修改内容:
 * @LastEditTime:
 */
export function modifyInfo(obj) {
    return fetch({
        url: '/api/business/jynoticesdgsqkb/update',
        method: 'post',
        data: obj
    });
}

/**
 * @功能描述: 获取购电价
 * @参数:
 * @返回值:
 * @作者: 张朋
 * @Date: 2019-12-07 16:38:47
 * @最新修改内容:
 * @LastEditTime:
 */
export function getPriceDate(obj) {
    return fetch({
        url: '/api/business/jyTradingResultsDetail/getBuyElePrice',
        method: 'get',
        data: obj
    });
}

/**
 * @功能描述: 获取购电量
 * @参数:
 * @返回值:
 * @作者: 张朋
 * @Date: 2019-12-07 16:38:47
 * @最新修改内容:
 * @LastEditTime:
 */
export function getPurchaseDate(obj) {
    return fetch({
        url: '/api/business/jyTradingResultsDetail/getBuyElePrice',
        method: 'get',
        data: obj
    });
}

/**
 * @功能描述: 获取售电公司购电交易明细表
 * @参数:
 * @返回值:
 * @作者: 张朋
 * @Date: 2019-12-07 16:38:47
 * @最新修改内容:
 * @LastEditTime:
 */
export function sdCompanyPowerPurchaseList(obj) {
    return fetch({
        url: '/api/dataplatform/saleReport/getSaleElectricityDetail',
        method: 'get',
        params: obj
    });
}
/**
 * @功能描述: 获取公司售电交易情况表
 * @参数:
 * @返回值:
 * @作者: 张朋
 * @Date: 2019-12-08 18:20:31
 * @最新修改内容:
 * @LastEditTime:
 */
export function companyElectricityStatusList(obj) {
    return fetch({
        url: '/api/dataplatform/saleReport/getSaleElectricityDetailCompany',
        method: 'get',
        params: obj
    });
}

/**
 * @功能描述: 区域四大行业用户交易情况表
 * @参数:
 * @返回值:
 * @作者: 张朋
 * @Date: 2019-12-12 17:26:24
 * @最新修改内容:
 * @LastEditTime:
 */
export function fourTransactionList(obj) {
    return fetch({
        url: '/api/dataplatform/fourIndustry/getRegionResult',
        method: 'post',
        params: obj
    });
}

/**
 * @功能描述: 集团全国四大行业用户集团表
 * @参数:
 * @返回值:
 * @作者: 张朋
 * @Date: 2019-12-12 17:26:46
 * @最新修改内容:
 * @LastEditTime:
 */
export function qgFourUserTransactionList(obj) {
    return fetch({
        url: '/api/dataplatform/fourIndustry/getResult',
        method: 'post',
        params: obj
    });
}


// /**
//  * @功能描述: 导出
//  * @参数:
//  * @返回值:
//  * @作者: 张朋
//  * @Date: 2019-12-17 16:09:00
//  * @最新修改内容:
//  * @LastEditTime:
//  */
export function exportAllJmtsFile(params) {
    let token = getToken()
    let url = "/api/dataplatform/saleReport/detailExport?token=" + token
    for (let key in params) {
        if (typeof params[key] != 'undefined') {
            url += "&" + key + "=" + params[key];
        }
    }
    //window.open(url + "&ModelCode=" + window.mdcode);
    window.location.href = url + "&ModelCode=" + window.mdcode;

}

/**
 * @功能描述: 集团测导出
 * @参数:
 * @返回值:
 * @作者: 张朋
 * @Date: 2019-12-18 13:54:47
 * @最新修改内容:
 * @LastEditTime:
 */
export function exportAllFile(params) {
    let token = getToken()
    let url = "/api/dataplatform/saleReport/allExport?token=" + token
    for (let key in params) {
        if (typeof params[key] != 'undefined') {
            url += "&" + key + "=" + params[key];
        }
    }
    window.location.href = url + "&ModelCode=" + window.mdcode;

}

/**
 * @功能描述: 四大行业导出
 * @参数:
 * @返回值:
 * @作者: 阿彪
 * @Date: 2019-12-25 13:54:47
 * @最新修改内容:
 * @LastEditTime:
 */
export function fourTransactionExportAllFile(params) {
    let token = getToken()
    let url = "/api/dataplatform/fourIndustry/regionResultExport?token=" + token
    for (let key in params) {
        if (typeof params[key] != 'undefined') {
            url += "&" + key + "=" + params[key];
        }
    }
    window.location.href = url + "&ModelCode=" + window.mdcode;

}

/**
 * @功能描述: 全国四大行业导出
 * @参数:
 * @返回值:
 * @作者: 阿彪
 * @Date: 2019-12-25 13:54:47
 * @最新修改内容:
 * @LastEditTime:
 */
export function qgFourTransactionExportAllFile(params) {
    let token = getToken()
    let url = "/api/dataplatform/fourIndustry/groupResultExport?token=" + token
    for (let key in params) {
        if (typeof params[key] != 'undefined') {
            url += "&" + key + "=" + params[key];
        }
    }
    window.location.href = url + "&ModelCode=" + window.mdcode;

}
