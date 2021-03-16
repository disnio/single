/*
 * @功能描述: 
 * @版本: 
 * @作者: 
 * @Date: 2020-01-08 13:57:58
 * @最新修改内容: 
 * @LastEditTime: 2020-11-17 15:24:54
 */
import fetch from "@common/utils/fetch";

export function page(query) {
  return fetch({
    url: '/api/admin/user/list',
    method: 'get',
    params: query
  });
}
export function provinceObj() {//省份
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=province',
    method: 'get'
  })
}
// #3483 2020-01-09 张亮三 获取调度电网下拉框数据
export function powerGridObj() {//省份
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=power_grid',
    method: 'get'
  })
}

export function getPageList(query) {//标杆电价分页查询 
  return fetch({
    url: '/api/basicData/BenchmarkPrice/getPageList',
    method: 'get',
    params: query
  })
}
export function selectByBenchmarkId() {//通过标杆电价id查询
  return fetch({
    url: '/api/basicData/BenchmarkPrice/selectByBenchmarkId',
    method: 'get'
  })
}

export function updateBenchmark(query) {//编辑
  return fetch({
    url: '/api/basicData/BenchmarkPrice/updateBenchmark',
    method: 'post',
    data: query
  })
}

export function addInsert(query) {//新增
  return fetch({
    url: '/api/basicData/BenchmarkPrice/insertBenchmark',
    method: 'post',
    data: query
  })
}

export function delObj(query) {//删除
  return fetch({
    url: '/api/basicData/BenchmarkPrice/deleteBenchmark',
    method: 'post',
    params: query
  })
}

export function insertOrUpdateBenchmark(query) {//新增编辑保存
  return fetch({
    url: '/api/basicData/BenchmarkPrice/insertOrUpdateBenchmark',
    method: 'post',
    data: query
  })
}

//生效当前电价信息，失效上一条同类型电价信息
export function overrideLastInfo(query) {
  return fetch({
    url: '/api/basicData/BenchmarkPrice/overrideLastInfo',
    method: 'post',
    data: query
  })
}
