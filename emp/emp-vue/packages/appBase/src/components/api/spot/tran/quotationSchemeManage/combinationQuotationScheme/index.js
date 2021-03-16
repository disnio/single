import fetch from '@common/utils/fetch';

 /* 交易管理--组合报价方案管理 */

 // 组合报价方案创建列表
  export function getcombinationQuotationScheme(query) {
    return fetch({
      url: '/api/tran/smtrancomposescheme/getHeadPage',
      method:'get',
      params: query
    });
  }

 // 组合报价方案编辑列表
  export function getQuotationSchemePage(query) {
    return fetch({
      url: '/api/tran/smtrancomposescheme/getSchemePage',
      method:'get',
      params: query
    });
  }

 // 组合报价方案编辑列表
  export function getDetailQuotationSchemePage(query) {
    return fetch({
      url:'/api/tran/smtrancomposescheme/getDetailPage',
      method:'get',
      params: query
    });
  }

  //查询方案列表
  export function getMainPage(query) {
    return fetch({
      url: '/api/tran/smtrancomposescheme/getAllHeadList',
      method: 'get',
      params: query
    });
  }

  //组合报价方案创建批量删除
  export function delObj(ids) {
    return fetch({
      url: '/api/tran/smtrancomposescheme/deleteListHead',
      method:'post',
      data: ids
    });
  }


  //组合报价方案编辑批量删除
  export function delObjPage(ids) {
    return fetch({
      url: '/api/tran/smtrancomposescheme/deleteListScheme',
      method:'post',
      data: ids
    });
  }

  //组合报价方案创建新增
  export function addObj(obj) {
    return fetch({
      url: '/api/tran/smtrancomposescheme/addHead',
      method:'post',
      data: obj
    });
  }

  //组合报价方案编辑新增
  export function addPageObj(obj) {
    return fetch({
      url: '/api/tran/smtrancomposescheme/addScheme',
      method:'post',
      data: obj
    });
  }

  //组合报价方案统计信息
  export function getDateZhTj(query) {
    return fetch({
      url: '/api/tran/smtrancomposescheme/getDateZhTj',
      method:'get',
      params: query
    });
  }

  //根据id获取报价详情信息
  export function getDetailPage(query) {
    return fetch({
      url: '/api/tran/smtrancomposescheme/getOneHeadById',
      method:'get',
      params: query
    });
  }

  //根据id获取报价详情详细信息
  export function getDetailPageObj(query) {
    return fetch({
      url: '/api/tran/smtrancomposescheme/getAllDetailPage',
      method:'get',
      params: query
    });
  }

  //根据id获取报价详情详细信息
  export function getEditDetailPageObj(query) {
    return fetch({
      url: '/api/tran/smtrancomposescheme/getDetailPage',
      method:'get',
      params: query
    });
  }


  //确认调整
  export function adjustmentObj(query) {
    return fetch({
      url: '/api/tran/smtrancomposescheme/updateDetailBatch',
      method:'post',
      data: query
    });
  }

  //修改容量和电价
  export function updateObj(query) {
    return fetch({
      url: '/api/tran/smtrancomposescheme/updateDetailList',
      method:'post',
      data: query
    });
  }

  //提交审核
  export function submitReview(query) {
    return fetch({
      url: '/api/tran/smtrancomposescheme/startProcess',
      method:'post',
      data: query
    });
  }

   //组合报价方案获取 额定出力
   export function selectTheDefaultPowerValue(query) {
    return fetch({
      url: '/api/tran/smtrancomposescheme/selectTheDefaultPowerValue',
      method:'get',
      params: query
    });
  }
