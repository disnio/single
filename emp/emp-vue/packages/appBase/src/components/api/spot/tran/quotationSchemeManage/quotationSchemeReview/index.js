import fetch from '@common/utils/fetch';

/* 交易管理--报价方案管理 */

// 报价方案创建列表
export function getCreateReview(query) {
  return fetch({
    url: '/api/tran/smtranschemeAudit/getTranSchemePage',
    method: 'get',
    params: query
  });
}
//组合报价方案-查询待审批信息
export function getTranComposeSchemePage(query) {
  return fetch({
    url: '/api/tran/smtranschemeAudit/getTranComposeSchemePage',
    method: 'get',
    params: query
  });
}

//通过和驳回
export function approveHtTemplate(query) {
  return fetch({
    url: '/api/tran/smtranschemeAudit/opertion',
    method: 'get',
    params: query
  });
}

// /smtranscheme/getDetailJy
// 现货交易 报价方案明细表 - 审核唯一性校验
// transactionDate 交易日期  orgCode 发电公司 tradingUnitCode 交易单元  tradingCenterCode 交易中心

export function getDetailJy(query) {
  return fetch({
    url: '/api/tran/smtranscheme/getDetailJy',
    method: 'get',
    params: query
  });
}

// /smtrancomposescheme/getSchemePageJy
// 现货交易组合报价方案表 - 审核唯一性校验

// tradingCenterCode  交易中心编码 transactionDate 交易日期
export function getSchemePageJy(query) {
  return fetch({
    url: '/api/tran/smtrancomposescheme/getSchemePageJy',
    method: 'get',
    params: query
  });
}

// 区域公司--报价方案审核列表
export function getTranSchemePageQY(query) {
  return fetch({
    url: '/api/tran/smtranschemeAudit/getMainSchemePageList',
    method: 'get',
    params: query
  });
}
//区域公司--组合报价方案审核列表
export function getTranComposeSchemePageQY(query) {
  return fetch({
    url: '/api/tran/smtranschemeAudit/getMainComposeSchemePageList',
    method: 'get',
    params: query
  });
}