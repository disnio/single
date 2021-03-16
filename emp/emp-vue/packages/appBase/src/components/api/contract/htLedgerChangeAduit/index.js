import fetch from '@common/utils/fetch';
export function approvalObj(obj) {
  return fetch({
    url: '/api/contract/htContractChangeApproval/approveHtContractChange',
    method: 'post',
    data: obj
  });
}

// /htContractChangeApproval/pageList
export function page(query) {
  return fetch({
    url: '/api/contract/htContractChangeApproval/pageList',
    method: 'get',
    params: query
  });
}