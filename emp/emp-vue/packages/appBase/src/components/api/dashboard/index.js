import fetch from "@common/utils/fetch";
import { getToken } from "@common/utils/auth";
export function dailyGenerationObj() {
    return fetch({
        url: "/api/home/tPowerDay/getYesterdayPowerGeneration",
        method: "get"
    });
}


export function comprehensiveElectricityPriceObj() {
    return fetch({
        url: "/api/home/tPowerMonth/getSettlementPrice",
        method: "get"
    });
}
export function getMonthAvailableCapacity() {
    return fetch({
        url: "/api/home/tPowerMonth/getMonthAvailableCapacity",
        method: "get"
    });
}

export function lineChartObj() {
    return fetch({
        url: "/api/home/tPowerDay/getMonthPowerGeneration",
        method: "get"
    });
}
//机组启停获取机组启停情况
export function tableDataObj(query) {
    return fetch({
        url: "/api/home/tPowerUnit/getUnitListInfo",
        method: "get",
        params: query
    });
}

// 交易结果
export function transactionResultObj() {
    return fetch({
        url: "/api/policy/policy/findExamPage?page=1&limit=8&filePath=电力市场信息-交易信息-交易结果&type=2",
        method: "get"
    });
}
// url: "/api/policy/policy/findExamPage?page=1&limit=8&filePath=电力市场信息-交易信息-交易结果&type=2",




// 列表
export function getNoticeList(query) {
    return fetch({
        url: '/api/cms/cmsContent/getContentPageList',
        method: 'get',
        params: query
    });
}
// 查看
export function getNoticeInfo(id) {
    return fetch({
        url: '/api/cms/cmsContent/' + id,
        method: 'get',
    });
}
// url: "/api/policy/policy/findExamPage?page=1&limit=8&filePath=通知公告-通知公告&type=2",


// 政策文件
export function policyDocumentObj() {
    return fetch({
        url: "/api/policy/policy/findExamPage?page=1&limit=6&filePath=电力市场信息-政策法规&type=2",
        method: "get"
    });
}
// url: "/api/policy/policy/findExamPage?page=1&limit=8&filePath=电力市场信息-政策法规&type=2",

export function getRealLoad() {
    return fetch({
        url: "/api/home/tPowerLoadRate/getPowerLoadRateFromES",
        method: "get"
    });
}

export function workToBeDoneObj(query) {
    return fetch({
        url: "/api/home/worksToBeDone/getUnfinishedWorks",
        method: "get",
        params: query
    });
}

export function workPlanDetails(query) {
    return fetch({
        url: "/api/policy/workPlanDetails/selectDetails",
        method: "get",
        params: query
    });
}

//工作办理主列表查询
export function getManagePageList(query) {
    return fetch({
        url: '/api/policy/workPlanController/getManagePageList',
        method: 'get',
        params: query
    });
}
//机组启停获取所有分公司组织机构
export function getOrgListInfo(query) {
    return fetch({
        url: '/api/home/tPowerUnit/getOrgListInfo',
        method: 'get',
        params: query
    });
}

export function getBusinessPageList(query) {
    return fetch({
        url: "/api/business/jyTradingResultsDetail/getPageList",
        method: "get",
        params: query
    });

}
export function getSchemePageList(query) {
    return fetch({
        url: "/api/business/jyQuotationScheme/getSchemePageList",
        method: "get",
        params: query
    });

}
//附件下载
export function downloadFile(id) {
    let token = getToken();
    let url = "/api/cms/cmsContent/downloadFile?token=" + token + "&fileId=" + id;
    window.open(url + "&ModelCode=" + window.mdcode);
}
//根据id查看信息
export function getContentById(id) {
    return fetch({
        url: '/api/cms/cmsContent/' + id,
        method: 'get',
    });
}


//获取子栏目
export function getColumnList(query) {
    return fetch({
        url: "/api/cms/cmsColumn/getColumnList",
        method: "get",
        params: query
    });

}

//查询栏目所有信息
export function all() {
    return fetch({
        url: "/api/cms/cmsColumn/all",
        method: "get"
    });

}

/**
 * @方法名称: // 现货工单 #557
 * @功能描述:
 * @作者:吴志超
 * @Date: 2019-11-21 09:52:58
 * @最新修改内容:
 * @LastEditTime:
 */

// /smtranscheme/getHomePage
// 首页 - 现货交易报价方案 - 分页查询

export function getHomePage(query) {
  return fetch({
    url: '/api/tran/smtranscheme/getHomePage',
    method: 'get',
    params: query
  });
}

// #3010 2019-12-06 张亮三 获取首页计量单位getHomeUnit
export function getHomeUnit(query) {
    return fetch({
        url: '/api/admin/unit-conversion/getHomeUnit',
        method: 'get',
        params: query
    });
}

export function waySelectObj() {//交易方式
    return fetch({
      url: '/api/admin/dim/getDimByPropCode?propCode=transaction_mode',
      method: 'get'
    })
  }
export function varietySelectObj() {//交易品种
    return fetch({
      url: '/api/admin/dim/getDimByPropCode?propCode=transactions_variety',
      method: 'get'
    })
  }
export function crewStartToStopChart(query) {
    return fetch({
      url: '/api/home/unitOnOffAnalysis/getUnitListInfo',
      method: 'get',
      params: query
    });
  }
  export function getAreaCompanies(query) {
    return fetch({
        url: '/api/admin/org/getOrgsByPOrgCodeAndIssue',
        method: 'get',
        params: query
    });
  }
  export function exportObj(params) {
    let token = getToken()
    let url = "/api/home/unitOnOffAnalysis/exportData?token=" + token
    for (let key in params) {
        url += "&" + key + "=" + params[key];
    }
    window.location.href = url + "&ModelCode=" + window.mdcode;
  }
  export function getqyNewPageList(query) {
    return fetch({
      url: '/api/business/jyQuotationScheme/getTotalPageList',
      method: 'get',
      params: query
    });
  }
  export function getCurrentUserOrg() { //获取当前用户信息
    return fetch({
        url: '/api/admin/org/getCurrentUserOrg',
        method: 'get'
    });
}

