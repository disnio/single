import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

export function page(query) {
    return fetch({
    url: '/api/business/jyQuotationScheme/getPageList',
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

export function delResultObj(id) {//
  return fetch({
  url: '/api/business/jyTradingResultsDetail/' + id,
  method: 'delete'
  })
}

export function addObj(obj) {
return fetch({
url: '/api/business/jyQuotationScheme/addInfo',
method: 'post',
data: obj
});
}

export function addDetailObj(obj) {
  return fetch({
  url: '/api/business/jyQuotationSchemeDetail/addInfo',
  method: 'post',
  data: obj
  });
  }



export function getObj(id) {
return fetch({
url: '/api/business/jyQuotationScheme/' + id,
method: 'get'
})
}

export function getDetailObj(query) {
  return fetch({
  url: '/api/business/jyQuotationSchemeDetail/getSchemeDetailListBySchemeId' ,
  method: 'get',
  params: query
  })
  }



export function delObj(id) {
return fetch({
url: '/api/business/jyQuotationScheme/' + id,
method: 'delete'
})
}
//主表编辑
export function putObj(obj) {
return fetch({
url: '/api/business/jyQuotationScheme/modifyInfo',
method: 'post',
data: obj
})
}
//详情编辑
export function putDetailObj(obj) {
  return fetch({
  url: '/api/business/jyQuotationSchemeDetail/modifyInfo',
  method: 'post',
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
      url: '/api/basicData/tMdataJyorg/getAllocatedDataList',
      method: 'get'
    })
  }

  export function getPriceMethod(id) {//根据交易中心获取报价方式
    return fetch({
      url: '/api/basicData/tMdataJyorg/'+id,
      method: 'get'
    })
  }
 
  export function periodSelectObj() {//交易周期
    return fetch({
      url: '/api/admin/dim/getDimByPropCode?propCode=transaction_period',
      method: 'get'
    })
  }

  export function modeSelectObj() {//交易方式
    return fetch({
      url: '/api/admin/dim/getDimByPropCode?propCode=transaction_mode',
      method: 'get'
    })
  }

  export function quarterSelectObj() {//季度
    return fetch({
      url: '/api/admin/dim/getDimByPropCode?propCode=quarter',
      method: 'get'
    })
  }
  
export function ResultExportObj(id) {
  let token = getToken()
  let url = "/api/business/jyQuotationScheme/exportDataList?token=" + token+"&jyTradingResultsId="+id
  window.location.href = url + "&ModelCode=" + window.mdcode;
}

export function exportObj(parm) {
  let token = getToken()
  let url = "/api/business/jyQuotationScheme/exportDataList?token=" + token
  let tradingCenterId = parm.tradingCenterId
  let marketSubjectType = parm.marketSubjectType
  let tradingWayCode = parm.tradingWayCode
  let tradingVarietyCode = parm.tradingVarietyCode
  let tradingCycleCode = parm.tradingCycleCode
  let tradingTime = parm.tradingTime
  
  if (tradingCenterId !== undefined && tradingCenterId !== "" && tradingCenterId !== null) {
    url += "&tradingCenterId=" + tradingCenterId
  }
  if (marketSubjectType !== undefined && marketSubjectType !== "" && marketSubjectType !== null) {
    url += "&marketSubjectType=" + marketSubjectType
  }
  if (tradingWayCode !== undefined && tradingWayCode !== "" && tradingWayCode !== null) {
    url += "&tradingWayCode=" + tradingWayCode
  }
  if (tradingVarietyCode !== undefined && tradingVarietyCode !== "" && tradingVarietyCode !== null) {
    url += "&tradingVarietyCode=" + tradingVarietyCode
  }
  if (tradingCycleCode !== undefined && tradingCycleCode !== "" && tradingCycleCode !== null) {
    url += "&tradingCycleCode=" + tradingCycleCode
  }
  if (tradingTime !== undefined && tradingTime !== "" && tradingTime !== null) {
    url += "&tradingTime=" + tradingTime
  }

  window.location.href = url + "&ModelCode=" + window.mdcode;

}

export function getCustomerAll(query) {//根据公司名称模糊查询信息
  return fetch({
  url: '/api/customer/tMdataCustomer/getCustomerByCustomerName',
  method: 'get',
  });
}

export function getOrgAll(query) {//根据公司名称模糊查询信息
  return fetch({
  url: '/api/admin/org/getAllOrgByAttribute',
  method: 'get',
  });
}  

export function getOrgByName(query) {//获取发电公司
  return fetch({
    url: '/api/admin/org/getAllOrgByAttribute?attributeTypeCode=zzjgsx02',
    method: 'get',
    params: query
  })
}

export function getSdOrgName(query) {//获取售电公司
  return fetch({
    url: '/api/admin/org/getAllOrgByAttribute?attributeTypeCode=zzjgsx01',
    method: 'get',
    params: query
  })
}
export function getTransactionLine() {//获取联络路线
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=link_circuit',
    method: 'get'
  })
}


export function getTradingUnitByName(query) {//通过组织id获取交易单元
  return fetch({
  url: '/api/admin/tradingUnit/getTradingUnitbyTradingUnitName',
  method: 'get',
  params: query
  });
}

export function getCurrentUserOrg() {//获取当前用户信息
  return fetch({
  url: '/api/admin/org/getCurrentUserOrg',
  method: 'get'
  });
}

//获取报价段
export function getQuotationSegment() {
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=Quotation_segment',
    method: 'get'
  })
}

//交易类型
export function getAssignmentType() {
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=Exit/Assignment_Type',
    method: 'get'
  })
}
//交易分类
export function getTransactionClassify() {
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=Transaction_classify',
    method: 'get'
  })
}
//交易产品
export function getTradingProducts() {
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=Trading_products',
    method: 'get'
  })
}

//获取电厂基础信息
export function getPowerBaseInfo(query) {
  return fetch({
    url: '/api/business/jyPowerBaseInfo/page',
    method: 'get',
    params:query
  })
}
//方案效益测算
export function getSchemeDetailList(query) {
  return fetch({
    url: '/api/business/jySchemebenefitEstimating/getSchemeDetailListBySchemeId',
    method: 'get',
    params:query
  })
}










