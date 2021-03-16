/*
 * @功能描述: 
 * @版本: 
 * @作者: 滕超
 * @Date: 2019-11-04 09:28:34
 * @最新修改内容: 
 * @LastEditTime: 2019-11-12 17:35:05
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

//列表接口
export function page(query) {
    return fetch({
      url: '/api/business/jyAssitConfiguration/page',
      method: 'get',
      params: query
    });
  }

  //新增或修改
  export function insertOrUpdate(obj) {
    return fetch({
      url: '/api/business/jyAssitConfiguration/insertOrUpdate',
      method: 'post',
      data: obj
    });
  }

  //根据id查辅助服务配置详表
  export function selectById(query) {
    return fetch({
      url: '/api/business/jyAssitConfigurationDetail/selectByAssitId',
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
  
  //批量删除
  export function delObj(query) {
    return fetch({
      url: '/api/business/jyAssitConfiguration/batchDelete',
      method: 'get',
      params: query
    });
  }
 /**
  * @方法名称: delObjRow
  * @功能描述: 根据状态和id删除table行
  * @参数: state,detailId
  * @返回值: true/false
  * @作用范围: 
  * @作者: 滕超
  * @Date: 2019-11-12 17:31:45
  * @最新修改内容: 
  * @LastEditTime: 
  */ 
 //编辑修改时删除行
 export function delObjRow(query) {
  return fetch({
    url: '/api/business/jyAssitConfigurationDetail/deleteByDetailId',
    method: 'get',
    params: query
  });
}

  //根据辅助服务配置id删除信息
export function detailIdDelRow(id) {
  return fetch({
    url: '/api/business/jyAssitConfigurationDetail/' + id,
    method: 'delete'
  });
}

//验重
export function checkData(obj) {
  return fetch({
    url: '/api/business/jyAssitConfiguration/checkData',
    method: 'post',
    data: obj
  });
}
  