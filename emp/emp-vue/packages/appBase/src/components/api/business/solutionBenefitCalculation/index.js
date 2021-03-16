import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

//通过方案id，方案名称编码获取发电侧-集中竞价报价方案效益测算
export function fdBenefitCalculationObj(obj) {
  return fetch({
    url: '/api/business/jySchemebenefitEstimating/getFdCentralizedBiddingEstimating',
    method: 'post',
    data: obj
  });
}
//通过方案id，方案名称编码获取发电侧-双边协商报价方案效益测算
export function getFdBilateralNegotiationEstimating(query) {
  return fetch({
    url: '/api/business/jySchemebenefitEstimating/getFdBilateralNegotiationEstimating',
    method: 'post',
    data: query
  });
}
//通过方案id，方案名称编码获取发电侧-挂牌交易报价方案效益测算
export function getFdListedTransactionEstimating(query) {
  return fetch({
    url: '/api/business/jySchemebenefitEstimating/getFdListedTransactionEstimating',
    method: 'post',
    data: query
  });
}

//通过方案id，方案名称编码获取售电侧-双边协商报价方案效益测算
export function sdSBXSBenefitCalculationObj(query) {
  return fetch({
    url: '/api/business/jySchemebenefitEstimating/getSdBilateralNegotiationEstimating',
    method: 'get',
    params: query
  });
}
//通过方案id，方案名称编码获取售电侧-集中竞价报价方案效益测算
export function sdBenefitCalculationObj(query) {
  return fetch({
    url: '/api/business/jySchemebenefitEstimating/getSdCentralizedBiddingEstimating',
    method: 'get',
    params: query
  });
}








//====================区域===========================

//通过方案id，方案名称编码获取区域发电侧-双边协商报价方案效益测算
export function getTotalFdBilateralNegotiationEstimating(query) {
  return fetch({
    url: '/api/business/jySchemebenefitEstimating/getTotalFdBilateralNegotiationEstimating',
    method: 'post',
    data: query
  });
}


//通过方案id集合，获取区域发电侧-集中竞价报价方案效益测算
export function getTotalFdCentralizedBiddingEstimating(query) {
  return fetch({
    url: '/api/business/jySchemebenefitEstimating/getTotalFdCentralizedBiddingEstimating',
    method: 'post',
    data: query
  });
}


//通过方案id，方案名称编码获取区域发电侧-挂牌交易报价方案效益测算
export function getTotalFdListedTransactionEstimating(query) {
  return fetch({
    url: '/api/business/jySchemebenefitEstimating/getTotalFdListedTransactionEstimating',
    method: 'post',
    data: query
  });
}


//通过方案id，方案名称编码获取区域售电侧-双边协商报价方案效益测算
export function getTotalSdBilateralNegotiationEstimating(query) {
  return fetch({
    url: '/api/business/jySchemebenefitEstimating/getTotalSdBilateralNegotiationEstimating',
    method: 'get',
    params: query
  });
}


//通过方案id，方案名称编码获区域取售电侧-集中竞价报价方案效益测算
export function getTotalSdCentralizedBiddingEstimating(query) {
  return fetch({
    url: '/api/business/jySchemebenefitEstimating/getTotalSdCentralizedBiddingEstimating',
    method: 'get',
    params: query
  });
}




