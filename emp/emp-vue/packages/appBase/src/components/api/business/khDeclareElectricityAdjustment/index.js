/*
 * @功能描述: 
 * @版本: 
 * @作者: 滕超
 * @Date: 2019-11-04 09:28:34
 * @最新修改内容: 
 * @LastEditTime: 2019-11-05 20:27:19
 */
import fetch from '@common/utils/fetch';

// 主表列表显示
export function page(query) {
  return fetch({
    url: '/api/business/jyPowerDeclarationSummary/getPageList',
    method: 'get',
    params: query
  });
}
// 编辑
export function getSummaryByIdAndDeclarationTime(query) {
  return fetch({
    url: '/api/business/jyPowerDeclarationSummary/getSummaryByIdAndDeclarationTime',
    method: 'get',
    params: query
  });
}
// 编辑列表
export function getCrossDeatilPageById(query) {
  return fetch({
    url: '/api/business/jyPowerDeclarationDetail/getCrossDeatilPageById',
    method: 'get',
    params: query
  });
}

// 副表列表显示
export function DeclareElectricityDetailPage(query) {
  return fetch({
    url: '/api/business/jyPowerDeclarationDetail/getDeatilPageById',
    method: 'get',
    params: query
  });
}

// 修改记录分页查询
export function getPageList(query) {
  return fetch({
    url: '/api/business/jsAdjustmentRecord/getPageList',
    method: 'get',
    params: query
  });
}
// 副表列表显示
export function updateStaus(query) {
  return fetch({
    url: '/api/business/jyPowerDeclarationSummary/updateSatus',
    method: 'get',
    params: query
  });
}

// 保存 提交 上报 
export function putObj(obj) {
  return fetch({
    url: '/api/business/jyPowerDeclarationSummary/saveOrUpdateSummaryInfo',
    method: 'post',
    data: obj
  })
}
// 刷新数据
export function refreshData(obj) {
  return fetch({
    url: '/api/business/jyPowerDeclarationSummary/refreshSummary',
    method: 'post',
    params: obj
  })
}
// 计算
export function calcuSummary(obj) {
  return fetch({
    url: '/api/business/jyPowerDeclarationSummary/calcuSummary',
    method: 'post',
    data: obj
  })
}



// export function addObj(obj) {
//   return fetch({
//     url: '/api/business/jyPowerBaseInfo',
//     method: 'post',
//     data: obj
//   });
// }



// export function delObj(id) {
//   return fetch({
//     url: '/api/business/jyPowerBaseInfo/' + id,
//     method: 'delete'
//   })
// }


