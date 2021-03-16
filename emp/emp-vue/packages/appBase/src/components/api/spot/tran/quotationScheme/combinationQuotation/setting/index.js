import fetch from '@common/utils/fetch';

export function adjustmentObj(query) {
    return fetch({  
      url: '/api/tran/typcombquotscheme/updateDetailBatch',
      method:'post',
      data: query
    });
  }
  
  //修改容量和电价
  export function updateObj(query) {
    return fetch({  
      url: '/api/tran/typcombquotscheme/updateDetailList',
      method:'post',
      data: query
    });
  }

  export function getDetailPage(query) {
    return fetch({  
      url: '/api/tran/typcombquotscheme/getDetailPage',
      method:'get',
      params: query
    });
  }

export function selectTheDefaultPowerValue(query) {
  return fetch({
    url: '/api/tran/smtrancomposescheme/selectTheDefaultPowerValue',
    method: 'get',
    params: query
  });
}

  