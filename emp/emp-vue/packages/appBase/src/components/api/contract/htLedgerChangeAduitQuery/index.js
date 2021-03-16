import fetch from '@common/utils/fetch';
// 分页查询
export function pageList(query) {
    return fetch({
      url: '/api/contract/htContractChangeApproval/changeApprovalQuery',
      method: 'get',
      params: query
    });
  }