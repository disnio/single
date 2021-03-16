import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

export function page(query) {//交易公告列表接口
    return fetch({
    url: '/api/business/jyTradingResults/page/getPageList',
    method: 'get',
    params: query
    });
}
// export function getNewPageList(query) {//交易公告列表接口
//     return fetch({
//     url: '/api/business/jyTradingResults/page/getNewPageList',
//     method: 'get',
//     params: query
//     });
// }

export function resultPage(query) {//交易结果主表
    return fetch({
    url: '/api/business/jyTradingResults/getResultsById',
    method: 'get',
    params: query
    });
}

export function resultList(query) {//交易结果列表
  return fetch({
  url: '/api/business/jyTradingResults/page/getResultsDeatilPageById',
  method: 'get',
  params: query
  });
}

export function getDetailsPageList(query) {//交易公告列表接口
  return fetch({
  url: '/api/business/jyTradingResultsDetail/page',
  method: 'get',
  params: query
  });
}
export function getSCDetails(query) {//市场
  return fetch({
  url: '/api/business/jyMarketCondition/getConditionByNoticeId',
  method: 'get',
  params: query
  });
}


export function delResultObj(id) {//
  return fetch({
  url: '/api/business/jyTradingResultsDetail/' + id,
  method: 'delete'
  })
}

export function addObj(obj) {
return fetch({
url: '/api/business/jyTradingResults/insertResults',
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

export function putObj(obj,id) {
return fetch({
url: '/api/business/jyTradingResults/' + id,
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


  export function centerSelectObj() {//交易中心
    return fetch({
      url: '/api/admin/dim/getDimByPropCode?propCode=trading_center',
      method: 'get'
    })
  }

  
  export function periodSelectObj() {//交易周期
    return fetch({
      url: '/api/admin/dim/getDimByPropCode?propCode=transaction_period',
      method: 'get'
    })
  }

  export function importExcel() {//导入
    return fetch({
      url: '/api/business/jyTradingResultsDetail/importExcel',
      method: 'post',
    })
  }
  
export function delResultId(ids) {//编辑删除
    return fetch({
      url: '/api/business/jyTradingResultsDetail/'+ids,
      method: 'delete',
    })
}

export function updateCommit(obj,id) {//编辑提交
  return fetch({
    url: '/api/business/jyTradingResults/'+id,
    method: 'put',
    data:obj
  })
}




export function ResultExportObj(id) {
  let token = getToken()
  let url = "/api/business/jyTradingResultsDetail/exportResult?token=" + token+"&jyTradingResultsId="+id
  window.location.href = url + "&ModelCode=" + window.mdcode;
}

// export function exportObj(parm) {//导出
//   console.log(parm);
//   let token = getToken()
//   let url = "/api/business/jyTradingResultsDetail/exportResult?token=" + token
//   let  jyTradingResultsId= parm
//   url += "&jyTradingResultsId=" + jyTradingResultsId
//   window.location.href = url
// } 

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
  window.location.href = url + "&ModelCode=" + window.mdcode;

}

export function customerFuzzyQuery(parme) {//客户名称模糊查询
  return fetch({
    url: "/api/customer/tMdataCustomer/getCustomerByCustomerName",
    method: "get",
    params: parme
  });
}
// 拜访对象 下拉拜访客户 自动带出
export function visitPopleId(par) {
  return fetch({
    url: "/api/customer/tMdataCustomerContacts/getCustomerContactsByOrgId",
    method: "get",
    params: par
  });
}


/**
 * @方法名称: exportObjJyjg
 * @功能描述: 交易结果/售电/发电导出功能
 * @参数: 
 * @返回值: 
 * @作者: 张亮三
 * @Date: 2019-12-25 10:11:36
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function exportObjJyjg(params) {
  let token = getToken();
  let url = "/api/business/jyTradingResultsDetail/exportResults?token=" + token + "&ModelCode=" + sessionStorage.getItem("modelCode");
  for (let key in params) {
      url += "&" + key + "=" + params[key];
  }
  window.location.href = url + "&ModelCode=" + window.mdcode;
}

/**
 * @方法名称: getConditionByNoticeId
 * @功能描述: 根据noticeId查市场成交情况
 * @参数: 
 * @返回值: 
 * @作者: qinhz
 * @Date: 2020-06-23 10:11:36
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function getConditionByNoticeId(parme) {
  return fetch({
    url: "/api/business/jyMarketCondition/getConditionByNoticeId",
    method: "get",
    params: parme
  });
}


