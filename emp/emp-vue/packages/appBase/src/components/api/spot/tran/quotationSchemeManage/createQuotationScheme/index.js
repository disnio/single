import fetch from '@common/utils/fetch';

 /* 交易管理--报价方案管理 */

 // 报价方案创建列表
 export function getCreateQuotationScheme(query) {
    return fetch({
      url: '/api/tran/smtranscheme/getPage',
      method:'get',
      params: query
    });
  }

  //报价方案创建批量删除
  export function delObj(ids) {
    return fetch({
      url: '/api/tran/smtranscheme/deleteList',
      method:'post',
      data: ids
    });
  }
  
  //报价方案创建新增
  export function addObj(obj) {
    return fetch({
      url: '/api/tran/smtranscheme/add',
      method:'post',
      data: obj
    });
  }
  
  //根据id获取报价详情信息
  export function getDetailPage(query) {
    return fetch({  
      url: '/api/tran/smtranscheme/getDetailPage',
      method:'get',
      params: query
    });
  }
  
  //确认调整
  export function adjustmentObj(query) {
    return fetch({  
      url: '/api/tran/smtranscheme/updateDetailBatch',
      method:'post',
      data: query
    });
  }
  
  //修改容量和电价
  export function updateObj(query) {
    return fetch({  
      url: '/api/tran/smtranscheme/updateDetailList',
      method:'post',
      data: query
    });
  }
  //组合报价生成
  export function zhAddObj(query) {
    return fetch({  
      url: '/api/tran/smtranscheme/buildComposeScheme',
      method:'post',
      data: query
    });
  }
  //提交审核
  export function submit(query) {
    return fetch({  
      url: '/api/tran/smtranscheme/startProcess',
      method:'post',
      data: query
    });
  }
  
  //报价方案获取 额定出力
   export function selectTheDefaultPowerValue(query) {
    return fetch({ 
      url: '/api/tran/smtrancomposescheme/selectTheDefaultPowerValue',
      method:'get',
      params: query
    });
  }