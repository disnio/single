import fetch from '@common/utils/fetch';

export function period_type_select() {
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=transaction_period',
    method: 'get',
  });
}
export function power_type_select() {
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=generation_category',
    method: 'get',
  });
}
export function getAllOrgByPorgId(query) {//获取父节点orgid
  return fetch({
    url: '/api/admin/org/getAllOrgByPorgId',
    method: 'get',
    params: query
  });
}
//客户续签率分析查询接口
export function page(query) {
  return fetch({
    url: '/api/home/khxqlAnalysisAnalysis/getKhxqlData',
    method: 'get',
    params: query
  });
}
//客户续签率分析查询(折线图)
export function chartList(query) {
  return fetch({
    url: '/api/home//khxqlAnalysisAnalysis/getKhxqlLine',
    method: 'get',
    params: query
  });

}

//   页面初始化 根据组织机构属性调取对应的区域
export function getAllOrgByAttribute(query) {
  return fetch({
    url: '/api/admin/org/getAllOrgByAttribute',
    method: 'get',
    params: query
  });
}
