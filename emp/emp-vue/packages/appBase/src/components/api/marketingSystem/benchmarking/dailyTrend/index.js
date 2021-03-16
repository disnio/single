import fetch from '@common/utils/fetch';

//区域和电厂指标值
export function getFdzbData(query) {
    return fetch({
      url: '/api/home/fdzbdb/getFdzbData',
      method: 'get',
      params: query
    });
  }
 
  //区域公司发电类型
export function getFdzbPowertype(query) {
  return fetch({
    url: '/api/home/fdzbdb/getFdzbPowertype',
    method: 'get',
    params: query
  });
}

