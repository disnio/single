import fetch from '@common/utils/fetch';



//   页面初始化 根据组织机构属性调取对应的区域
export function electricityAnalysis(query) {
  return fetch({
    url: '/api/home/customerElectricityAnalysis/electricityAnalysis',
    method: 'get',
    params: query
  });
}
