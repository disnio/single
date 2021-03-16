import fetch from "@common/utils/fetch";

// 树
export function getTreeObj(query) {
  return fetch({
    url: '/api/admin/org/getOrgtree',
    method: 'get',
    params: query
  });
}

export function fdOrgPage(query) {
  return fetch({
    url: '/api/admin/org/getOrgPageByPorgId',
    method: 'get',
    params: query
  });
}

export function jydyPage(query) {
  return fetch({
    url: '/api/admin/tradingUnit/getTradingUnitbyOrgId',
    method: 'get',
    params: query
  });
}

// 发电公司新增
export function fdgsAddObj(obj) {
  return fetch({
    url: '/api/admin/org',
    method: 'post',
    data: obj
  });
}
// 发电公司删除
export function fdgsDelObj(id) {
  return fetch({
    url: '/api/admin/org/' + id,
    method: 'delete'
  })
}

// 发电公司修改
export function fdgsPutObj(id, obj) {
  return fetch({
    url: '/api/admin/org/' + id,
    method: 'put',
    data: obj
  })
}

//单位编码唯一性验证 
export function dwCodeValidateObj() {
  return fetch({
    url: '/api/admin/org/getOrgCodeList',
    method: 'get'
  });
}
//单位名称唯一性验证/org/getOrgNameList
export function dwNameValidateObj() {
  return fetch({
    url: '/api/admin/org/getOrgNameList',
    method: 'get'
  });
}
// 发电公司查看
export function fdOrgGetObj(id) {
  return fetch({
    url: '/api/admin/org/' + id,
    method: 'get',
  });
}
// 发电公司查询的数据 /dim/getProvinceByPorgId
export function searchQueryObj(query) {
  return fetch({
    url: '/api/admin/dim/getProvinceByPorgId',
    method: 'get',
    params: query
  });
}

// 机构属性维度数据
export function getOrgJgsxObj() {
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=organizational_attributes',
    method: 'get',
  });
}

// 发电公司判断/api/admin/org/getStatusToDelete

export function delJudgeObj(query) {
  return fetch({
    url: '/api/admin/org/getStatusToDelete',
    method: 'get',
    params: query
  });
}

// 交易单元删除判断/tradingUnit/getStatusToDelete
export function jydyDelSureObj(query) {
  return fetch({
    url: '/api/admin/tradingUnit/getStatusToDelete',
    method: 'get',
    params: query
  });
}
// 所属省份维度数据
export function getOrgSssfObj() {
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=province',
    method: 'get',
  });
}
// 所属地区维度数据
export function countySelectionObj(par) {
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=' + par,
    method: 'get'
  })
}
// 发电类型维度数据
export function getOrgFdlxObj() {
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=generation_category',
    method: 'get',
  });
}

// 交易单元查看============================
export function jydyGetObj(id) {
  return fetch({
    url: '/api/admin/tradingUnit/' + id,
    method: 'get',
  });
}

// 交易单元新增
export function jydyAddObj(obj) {
  return fetch({
    url: '/api/admin/tradingUnit/add',
    method: 'post',
    data: obj
  });
}

// 交易单元删除
export function jydyDelObj(id) {
  return fetch({
    url: '/api/admin/tradingUnit/' + id,
    method: 'delete'
  })
}

// 交易单元修改
export function jydyPutObj(id, obj) {
  return fetch({
    url: '/api/admin/tradingUnit/' + id,
    method: 'put',
    data: obj
  })
}

//  发电类型下拉数据 <!-- /api/admin/dim/getDimByPropCode?propCode=generation_category -->
export function getDataTypeObj() {
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=generation_category',
    method: 'get',
  });
}

// 交易单元编码验证 /tradingUnit/getUnitCodeList
export function jyOrgCode(query) {
  return fetch({
    url: '/api/admin/tradingUnit/getUnitCodeList',
    method: 'get',
    params: query
  });
}

// 交易单元名称验证
export function jyOrgName(query) {
  return fetch({
    url: '/api/admin/tradingUnit/getUnitNameList',
    method: 'get',
    params: query
  });
}
// 对应机组
export function getListAll(query) {
  return fetch({
    url: '/api/admin/unitInforTable/getListAll',
    method: 'get',
    params: query
  });
}
// 应用领域
export function applicationField() {
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=application_field',
    method: 'get'
  });
}


// ---------- 机组信息API接口 ---------- //

// 1、机组信息：获取机组分页列表
export function getUnitInforPage(query) {
  return fetch({
    url: '/api/admin/unitInforTable/getListPage',
    method: 'get',
    params: query
  });
}
// 2、机组信息：新增
export function unitInforAddObj(obj) {
  return fetch({
    url: '/api/admin/unitInforTable/add',
    method: 'post',
    data: obj
  });
}
// 3、机组信息：修改
export function unitInforUpdateObj(obj) {
  return fetch({
    url: '/api/admin/unitInforTable/update',
    method: 'post',
    data: obj
  });
}
// 4、机组信息：删除 参数：unitIds
export function unitInforDelObj(obj) {
  return fetch({
    url: '/api/admin/unitInforTable/delete',
    method: 'post',
    data: obj
  });
}
// 5、机组信息：根据ID获取对象 参数：unitId
export function unitinforGetObj(query) {
  return fetch({
      url: '/api/admin/unitInforTable/getObjById',
      method: 'get',
      params: query
  })
}

// 6、机组下拉框取值 参数 propCode
export function getDimByPropCode(query) {
  return fetch({
      url: '/api/admin/dim/getDimByPropCode',
      method: 'get',
      params: query
  })
}
//获取交易单元
export function getTradingUnitCode(query) {
  return fetch({
      url: '/api/admin/tradingUnit/getTradingUnitCode',
      method: 'get',
      params: query
  })
}

//20191231 阿彪 #3305 机组信息删除前判断
export function getStatusToDelete(query) {
  return fetch({
      url: '/api/admin/unitInforTable/getStatusToDelete',
      method: 'get',
      params: query
  })
}