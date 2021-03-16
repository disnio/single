import fetch from '@common/utils/fetch';

 // 列表查询 （售电侧）_基础数据_日前_时表
 export function getHourPageList(query) {
  return fetch({
    url: '/api/settl/electrecentlyhours/getHours',
    method:'get',
    params: query
  });
}

 // 列表查询 （售电侧）_基础数据_实时_时表
export function getRealtimePageList(query) {
  return fetch({
    url: '/api/settl/electrealtimehours/getHours',
    method:'get',
    params: query
  });
}

 // 列表查询 中长期年度合约下钻 日数据
 export function getDateY (query) {
  return fetch({
    url: '/api/settl/electmltdate/getDateY',
    method:'get',
    params: query
  });
}
//中长期下钻 年度时数据
export function getHoursY (query) {
  return fetch({
    url: '/api/settl/electmlthours/getHoursY',
    method:'get',
    params: query
  });
}

//中长期月度合约下钻 日数据
export function getDateM (query) {
  return fetch({
    url: '/api/settl/electmltdate/getDateM',
    method:'get',
    params: query
  });
}

//中长期下钻 月度时数据
export function getHoursM (query) {
  return fetch({
    url: '/api/settl/electmlthours/getHoursM',
    method:'get',
    params: query
  });
}

//中长期月度合约下钻 日数据
export function getDateJ (query) {
  return fetch({
    url: '/api/settl/electmltdate/getDateJ',
    method:'get',
    params: query
  });
}

//中长期下钻 月度时数据
export function getHoursJ (query) {
  return fetch({
    url: '/api/settl/electmlthours/getHoursJ',
    method:'get',
    params: query
  });
}




