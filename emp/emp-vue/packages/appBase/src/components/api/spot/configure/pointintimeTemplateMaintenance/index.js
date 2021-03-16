
import fetch from "@common/utils/fetch";

// /smpointtimetemplate/getPage
// 时点模板维护 - 分页查询
export function getPage(query) {
  return fetch({
    url: '/api/tran/smpointtimetemplate/getPage',
    method: 'get',
    params: query
  })
}

// /smpointtimetemplate/add
// 时点模板维护 - 新增
export function add(obj) {
  return fetch({
    url: "/api/tran/smpointtimetemplate/add",
    method: "post",
    data: obj
  });
}

// /smpointtimetemplatedetails/getOneById
// 时点模板维护子表 - 通过ID查询数据
export function getOneById(query) {
  return fetch({
    url: '/api/tran/smpointtimetemplatedetails/getOneById',
    method: 'get',
    params: query
  })
}


// /smpointtimetemplate/deleteList
// 时点模板维护 - 多选删除
export function deleteList(obj) {
  return fetch({
    url: "/api/tran/smpointtimetemplate/deleteList",
    method: "post",
    data: obj
  });
}

// /smpointtimetemplatedetails/update
// 时点模板维护子表 - 更新
export function update(obj) {
  return fetch({
    url: "/api/tran/smpointtimetemplatedetails/update",
    method: "post",
    data: obj
  });
}

// /smpointtimetemplatedetails/delete
// 时点模板维护子表 - 删除
export function delDetail(obj) {
  return fetch({
    url: "/api/tran/smpointtimetemplatedetails/delete",
    method: "post",
    data: obj
  });
}