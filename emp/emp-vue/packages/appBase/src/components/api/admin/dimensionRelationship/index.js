/*
 * @功能描述: 
 * @版本: 
 * @作者: 李志佳
 * @Date: 2019-11-19 15:55:17
 * @最新修改内容: 
 * @LastEditTime: 2019-11-19 18:05:56
 */
import fetch from '@common/utils/fetch';
/**
 * @方法名称: getList
 * @功能描述: 获取数据
 * @参数: 
 * @返回值: 
 * @作者: 李志佳
 * @Date: 2019-11-19 18:05:45
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function getList() {
  return fetch({
    url: '/api/admin/tMdataRelationWay/getRelationWay',
    method: 'get',
  });
}
/**
 * @方法名称: save
 * @功能描述: 提交数据
 * @参数: 
 * @返回值: 
 * @作者: 李志佳
 * @Date: 2019-11-19 18:05:29
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function save(data) {
    return fetch({
      url: '/api/admin/tMdataRelationWay/saveRelationWay',
      method: 'post',
      data: data
    });
  }