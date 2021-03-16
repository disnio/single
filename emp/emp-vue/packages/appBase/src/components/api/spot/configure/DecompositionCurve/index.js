import fetch from "@common/utils/fetch";

// /smtrancurvecreate/add
// -新增
export function add(obj) {
  return fetch({
    url: "/api/tran/smtrancurvecreate/add",
    method: "post",
    data: obj
  });
}

// /smtrancurvecreate/getPage
// -分页查询
export function getPage(query) {
  return fetch({
    url: '/api/tran/smtrancurvecreate/getPage',
    method: 'get',
    params: query
  })
}

// /smtrancurvecreate/getAllDataList
// -查询版本
export function getAllDataList(query) {
  return fetch({
    url: '/api/tran/smtrancurvecreate/getAllDataList',
    method: 'get',
    params: query
  })
}

// /smtrancurvecreate/deleteList
// -多选删除
export function deleteList(obj) {
  return fetch({
    url: "/api/tran/smtrancurvecreate/deleteList",
    method: "post",
    data: obj
  });
}

// /smtrancurve/getYearAllDataList
// 年分月比例设置-全部查询
export function getYearAllDataList(query) {
  return fetch({
    url: '/api/tran/smtrancurve/getYearAllDataList',
    method: 'get',
    params: query
  })
}

// /smtrancurve/getMonthBl
// 月分日char图-全部查询
export function getMonthBl(query) {
  return fetch({
    url: '/api/tran/smtrancurve/getMonthBl',
    method: 'get',
    params: query
  })
}

// /smtrancurve/getAllMonthDataList
// 月分日比例设置-全部查询
export function getAllMonthDataList(query) {
  return fetch({
    url: '/api/tran/smtrancurve/getAllMonthDataList',
    method: 'get',
    params: query
  })
}

// /smtrancurve/updateYear
// 年分月比例设置-更新
export function updateYear(obj) {
  return fetch({
    url: "/api/tran/smtrancurve/updateYear",
    method: "post",
    data: obj
  });
}

// /smtrancurve/updateMonth
// 月分日比例设置-更新
export function updateMonth(obj) {
  return fetch({
    url: "/api/tran/smtrancurve/updateMonth",
    method: "post",
    data: obj
  });
}

// /smtrancurve/getAllDayDataList
// 日分时比例设置-全部查询
export function getAllDayDataList(query) {
  return fetch({
    url: '/api/tran/smtrancurve/getAllDayDataList',
    method: 'get',
    params: query
  })
}

// /smtrancurve/updateDay
// 日分时比例设置-更新
export function updateDay(obj) {
  return fetch({
    url: "/api/tran/smtrancurve/updateDay",
    method: "post",
    data: obj
  });
}

export function getParameter(query) {
  // 企业参数
  return fetch({
    url: "/api/admin/api/parameter/getValueByOrgIdAndCode",
    method: "get",
    params: query
  });
}