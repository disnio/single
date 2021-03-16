import fetch from '@common/utils/fetch';

// /smunitbasicstatemaintain/getPage
// 机组状态共有参数信息(主页面)-分页查询
export function getPage(query) {
  return fetch({
    url: '/api/tran/smunitbasicstatemaintain/getPage',
    method: 'get',
    params: query
  });
}

// 初始化  /batchAdjustFormData
export function getInitFormData(query) {
  return fetch({
    url: '/api/tran/smunitbasicstatemaintain/getInitFormData',
    method: 'get',
    params: query
  });
}

// 批量调整  /addSaveOrSubmitFormData
export function getbatchAdjustFormData(query) {
  return fetch({
    url: '/api/tran/smunitbasicstatemaintain/batchAdjustFormData',
    method: 'post',
    data: query
  });
}

// 主页面保存
export function getaddSave(query) {
  return fetch({
    url: '/api/tran/smunitbasicstatemaintain/addSaveOrSubmitFormData',
    method: 'post',
    data: query
  });
}

// 编辑页先获取数据  
export function getEditData(query) {
  return fetch({
    url: '/api/tran/smunitbasicstatemaintain/editOrQueryFormData',
    method: 'get',
    params: query
  });
}

// 编辑页保存或者提交  
export function getSaveANDsub(query) {
  return fetch({
    url: '/api/tran/smunitbasicstatemaintain/editSaveAndSubmitFormdata',
    method: 'post',
    data: query
  });
}

// 复用上期数据接口  
export function getagoData(query) {
  return fetch({
    url: '/api/tran/smunitbasicstatemaintain/multiplexFormData',
    method: 'post',
    data: query
  });
}

// /smunitbasicstatemaintain/addStateMaintain
// 机组状态共有参数信息-新增
export function addStateMaintain(query) {
  return fetch({
    url: '/api/tran/smunitbasicstatemaintain/addStateMaintain',
    method: 'post',
    data: query
  });
}

// /smunitbasicstatemaintain/deleteList
// 机组状态共有参数信息-多选删除
export function deleteList(query) {
  return fetch({
    url: '/api/tran/smunitbasicstatemaintain/deleteList',
    method: 'post',
    data: query
  });
}

// /smunitbasicstatemaintain/getMainMxPage
// 机组96点状态维护-分页查询
export function getMainMxPage(query) {
  return fetch({
    url: '/api/tran/smunitbasicstatemaintain/getMainMxPage',
    method: 'get',
    params: query
  });
}

// /smunitbasicstatemaintain/getAlltime
// 96点-全部查询
export function getAlltime(query) {
  return fetch({
    url: '/api/tran/smunitbasicstatemaintain/getAlltime',
    method: 'get',
    params: query
  });
}

// /smunitbasicstatemaintain/update
// 机组96点状态维护-更新
export function update(query) {
  return fetch({
    url: '/api/tran/smunitbasicstatemaintain/update',
    method: 'post',
    data: query
  });
}

// /smunitbasicstatemaintain/updateList
// 机组96点状态维护-批量调整
export function updateList(query) {
  return fetch({
    url: '/api/tran/smunitbasicstatemaintain/updateList',
    method: 'get',
    params: query
  });
}
