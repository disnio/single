import fetch from '@common/utils/fetch';

export function getTitleData(query) {
  return fetch({
    url: '/api/business/jyPowerDeclaration/selectOneByOrgIdAndTime',
    method: 'get',
    params: query
  });
}

export function delObj(id) {
  return fetch({
    url: '/api/business/jyQuotationScheme/' + id,
    method: 'delete'
  })
}
//获取用户信息
export function getOrgInfor(query) {
  return fetch({
    url: '/api/admin/org/getAllOrgByAttribute',
    method: 'get',
    params: query
  })
}