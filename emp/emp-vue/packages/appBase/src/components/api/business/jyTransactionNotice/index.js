import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

export function page(query) { //交易公告列表接口
    return fetch({
        url: '/api/business/jyTradingResults/page/getPageList?orgType=buy',
        method: 'get',
        params: query
    });
}
// export function getNewPageList(query) {//交易公告列表接口
//   return fetch({
//   url: '/api/business/jyTradingResults/page/getNewPageList',
//   method: 'get',
//   params: query
//   });
// }
// #2723 wangc 20191121 修改查询详情方法
export function getDetailsPageList(query) { //交易公告列表接口
    return fetch({
        url: '/api/business/jyTradingResultsDetail/page-map',
        method: 'get',
        params: query
    });
}

//#2805 张朋 20191126 查询参数装机、厂用电率和减扣基数电量数据
export function getResultBaseData(query) {
    return fetch({
        url: '/api/business/jyTradeResultBaseData/getResultBaseData',
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

export function getBenchmarkPrice(query) {
    return fetch({
        url: '/api/basicData/BenchmarkPrice/selectOneBenchmarkPrice',
        method: 'get',
        params: query
    });
}

/**
 * getJyBenchmarkPriceSale
 * @功能描述: 获取标杆电价数组
 * @作者: qinhz
 * @Date: 2020年5月27日14:37:15
 */
export function getJyBenchmarkPriceSale(query) {
    return fetch({
        url: '/api/basicData/BenchmarkPrice/getJyBenchmarkPriceSale',
        method: 'get',
        params: query
    });
}

export function selectListBenchmarkPrice(query) {
    return fetch({
        url: '/api/basicData/BenchmarkPrice/selectListBenchmarkPrice',
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

/**
 * @方法名称: 根据交易单元获取批复电价
 * @参数:
 * @返回值:
 * @作者: 张朋
 * @Date: 2019-12-04 19:06:52
 * @最新修改内容:
 * @LastEditTime:
 */
export function getReplyPrice(id) {
    return fetch({
        url: '/api/admin/tradingUnit/' + id,
        method: 'get',
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
        url: '/api/business/jyTradingResults/matchingBuyData',
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

export function putObj(obj) {
    return fetch({
        url: '/api/business/jyTradingResults/updateBuyData',
        method: 'put',
        data: obj
    })
}
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

//获取导入列表数据
export function getExceptpage(query) {
    return fetch({
        url: '/api/business/jyTradingResultTemplate/page',
        method: 'get',
        params: query
    })
}

//获取外层导入列表数据
export function getExceptpages(query) {
    return fetch({
        url: '/api/business/jyTradingResultTemplate/getAllPage',
        method: 'get',
        params: query
    })
}

//解析完成程度状态
export function getTradingStatus(query) {
    return fetch({
        url: '/api/business/jyTradingResultsDetail/status',
        method: 'get',
        params: query
    })
}

//解析完成程度状态
export function getTradingStatuss(query) {
    return fetch({
        url: '/api/business/jyTradingResultsDetail/getAllstatus',
        method: 'get',
        params: query
    })
}

//确认入库
export function getTradingEnter(query) {
    return fetch({
        url: '/api/business/jyTradingResultsDetail/enter',
        method: 'get',
        params: query
    })
}

//确认入库
export function getTradingEnters(query) {
    return fetch({
        url: '/api/business/jyTradingResultsDetail/enters',
        method: 'get',
        params: query
    })
}

//外层模板下载 动态生成
export function downloadTemplate(data) {
    let token = getToken()
    let url = "/api/business/jyTradingResultsDetail/templateDownload?token=" + token
    for (let k in data) {
      let value = data[k] != undefined ? data[k] : "";
      url += `&${k}=${encodeURIComponent(value)}`;
    }
    window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
  }

//交易结果模板下载
export function downloadImportTemplate(parm) {
    let token = getToken()
    let url = "/api/business/jyTradingResultsDetail/template?token=" + token
    let tradingVariety = parm.tradingVariety
    let tradingWay = parm.tradingWay
    let description = parm.description
    if (
        tradingVariety !== undefined &&
        tradingVariety !== "" &&
        tradingVariety !== null
      ) {
        url += "&tradingVariety=" + tradingVariety;
      }
      if (
        tradingWay !== undefined &&
        tradingWay !== "" &&
        tradingWay !== null
      ) {
        url += "&tradingWay=" + tradingWay;
      }
      if (
        description !== undefined &&
        description !== "" &&
        description !== null
      ) {
        url += "&description=" + description;
      }
      window.location.href = url + "&ModelCode=" + window.mdcode;
  }

//数据导出
export function exportDataErrData(description, resultId) {
    let token = getToken()
    let url = '/api/business/jyTradingResultsDetail/abnormalExport?'
         + 'token=' + token
         + "&description=" + description
         + "&resultId=" + resultId
         + "&ModelCode=" + sessionStorage.getItem("modelCode");
         window.location.href = url + "&ModelCode=" + window.mdcode;
}

//数据导出
export function exportDataErrDatas(description, resultId) {
    let token = getToken()
    let url = '/api/business/jyTradingResultsDetail/abnormalExports?'
         + 'token=' + token
         + "&description=" + description
         + "&resultIds=" + resultId
         + "&ModelCode=" + sessionStorage.getItem("modelCode");
         window.location.href = url + "&ModelCode=" + window.mdcode;
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

export function update(obj) { //编辑提交
    return fetch({
        url: '/api/business/jyTradingResults/updateDetailDatas',
        method: 'put',
        data: obj
    })
}


export function ResultExportObj(id, fdOrgName, tradingVariety) {
    let token = getToken()
    let url = "/api/business/jyTradingResultsDetail/exportProductResultDetail?token=" + token + "&jyTradingResultsId=" + id;
    //20191203 阿彪 #2858 交易管理 - 交易结果-发电
    let url1 = "/api/business/jyTradingResultsDetail/exportProductResultDetail?token=" + token + "&jyTradingResultsId=" + id + '&fdOrgName=' + fdOrgName + '&tradingVariety=' + tradingVariety;
    window.location.href = fdOrgName ? (url1 + "&ModelCode=" + window.mdcode) : (url + "&ModelCode=" + window.mdcode);
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
    let regionOrgId = parm.regionOrgId
    let orgId = parm.orgId

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
    if (regionOrgId !== undefined && regionOrgId !== "" && regionOrgId !== null) {
        url += "&regionOrgId=" + regionOrgId
    }
    if (orgId !== undefined && orgId !== "" && orgId !== null) {
        url += "&orgId=" + orgId
    }
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

export function getCustomerByName(parme) { //客户名称模糊查询
    return fetch({
        url: "/api/customer/tMdataCustomer/getCustomerByCustomerName",
        method: "get",
        params: parme
    });
}

export function getAssignmentType() {
    return fetch({
        url: "/api/admin/dim/getDimByPropCode?propCode=Exit/Assignment_Type", //出/受让类型
        method: "get",
    });
}
export function getclassify() {
    return fetch({
        url: "/api/admin/dim/getDimByPropCode?propCode=Transaction_classify", //交易分类
        method: "get",
    });
}
export function getProducts() {
    return fetch({
        url: "/api/admin/dim/getDimByPropCode?propCode=Trading_products", //交易产品
        method: "get",
    });
}
export function getAllOrgByAttribute(parme) {
    return fetch({
        url: "/api/admin/org/getAllOrgByAttribute", //交易产品
        method: "get",
        params: parme

    });
}
// #2723 wangc 20191121 查询月方法
export function getMonths(parme) {
    return fetch({
        url: "/api/business/jyTradingResults/getMonths",
        method: "get",
        params: parme
    });
}

// #2723 wangc 20191121 查询企业参数方法
export function getValueByOrgIdAndCode(parme) {
    return fetch({
        url: "/api/admin/api/parameter/getValueByOrgIdAndCode",
        method: "get",
        params: parme
    });
}

//获取客户名称  #3047  秦侯珍   2019-12-06
export function getAllDataList(parme) {
    return fetch({
        url: "/api/customer/khCustomerRelation/getAllDataList", //客户名称
        method: "get",
        params: parme

    });
}

// 交易管理 - 交易结果-发电/售电-增加修改记录功能  #2873  秦侯珍   2019-12-11
export function getJyTradingResultsDetailPageList(query) {
    return fetch({
      url: '/api/business/jsAdjustmentRecord/getJyTradingResultsDetailPageList',
      method: 'get',
      params: query
    })
  }

// #3545 张亮三 用电企业模糊查询
export function getAlleleEnterprise (parme) {
    return fetch({
        url: "/api/customer/tMdataCustomer/getCustomerByCustomerName", //交易产品
        method: "get",
        params: parme

    });
}

// #4151 qinhz 20200604 查询企业参数方法
export function getValueByOrgIdAndCode2(parme) {
    return fetch({
        url: "/api/admin/parameter/getValueByOrgIdAndCode",
        method: "get",
        params: parme
    });
}

// #4151 qinhz 2020-06-05 获取购电测交易单元下拉框
export function getPowerTestTransactionUnit (id) {
    return fetch({
        url: "/api/basicData/tMdataJyorg/purchaseJyUnitByJyOrgId/" + id,
        method: "get"
    });
}

// 售电侧交易结果文件上传
// /api/business/jyTradingResultsDetail/upload
export function uploadData(params) {
    return fetch({
      url: '/api/business/jyTradingResultsDetail/upload',
      method: 'post',
      data: params
    });
  }
