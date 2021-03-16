import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

export function page(query) {//交易公告列表接口
    return fetch({
    url: '/api/business/jyPowerDeclaration/page/getPageList',
    method: 'get',
    params: query
    });
}


export function addObj(obj) {//列表新增接口
return fetch({
url: '/api/business/jyPowerDeclaration/insertMainData',
method: 'post',
data: obj
});
}

export function getObj(id) {//编辑获取数据
return fetch({
url: '/api/business/jyPowerDeclaration/' + id,
method: 'get'
})
}

export function delObj(ids) {//删除
return fetch({
url: '/api/business/jyPowerDeclaration/' + ids,
method: 'delete'
})
}

export function putObj(obj,id) {//编辑保存数据
return fetch({
url: '/api/business/jyPowerDeclaration/' + id,
method: 'put',
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

export function exportObj(parm) {//列表导出
  let token = getToken()
  let url = "/api/business/jyPowerDeclaration/exportDataList?token=" + token
  let tradingCenter = parm.tradingCenter
  let tradingVarietyCode = parm.tradingVarietyCode
  let tradingWayCode = parm.tradingWayCode
  let announcementDate = parm.announcementDate
  let tradingCycleCode = parm.tradingCycleCode
  let tradingTime = parm.tradingTime
  
  if (tradingCenter !== undefined && tradingCenter !== "" && tradingCenter !== null) {
    url += "&tradingCenter=" + tradingCenter
  }
  if (tradingVarietyCode !== undefined && tradingVarietyCode !== "" && tradingVarietyCode !== null) {
    url += "&tradingVarietyCode=" + tradingVarietyCode
  }
  if (tradingWayCode !== undefined && tradingWayCode !== "" && tradingWayCode !== null) {
    url += "&tradingWayCode=" + tradingWayCode
  }
  if (announcementDate !== undefined && announcementDate !== "" && announcementDate !== null) {
    url += "&announcementDate=" + announcementDate
  }
  if (tradingCycleCode !== undefined && tradingCycleCode !== "" && tradingCycleCode !== null) {
    url += "&tradingCycleCode=" + tradingCycleCode
  }
  if (tradingTime !== undefined && tradingTime !== "" && tradingTime !== null) {
    url += "&tradingTime=" + tradingTime
  }
  window.location.href = url + "&ModelCode=" + window.mdcode;

}



