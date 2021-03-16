/*
 * @Author: lifei
 * @Date: 2019-11-04 12:58:38
 * @LastEditTime: 2019-11-04 15:32:04
 * @LastEditors: Please set LastEditors
 * @Description: 交易公告管理--设备检修信息
 * @FilePath: \front-ui\src\api\spot\tran\notice\devicemaintenanceplan\index.js
 */
import fetch from '@common/utils/fetch';
/* 交易公告--电网约束信息 */

// 1、 分页查询
export function getListPage(query) {
    return fetch({
        url: '/api/tran/smdevicemaintenanceplan/getListPage',
        method: 'get',
        params: query
    });
}
// 2、 新增
export function addObj(obj) {
    return fetch({
        url: '/api/tran/smdevicemaintenanceplan/add',
        method: 'post',
        data: obj
    });
}
// 3、 修改
export function updateObj(obj) {
    return fetch({
        url: '/api/tran/smdevicemaintenanceplan/update',
        method: 'post',
        data: obj
    });
}
// 4、 删除 参数ids
export function delObjListByIds(obj) {
    return fetch({
        url: '/api/tran/smdevicemaintenanceplan/deleteList',
        method: 'post',
        data: obj
    })
}
// 5、 根据ID获取对象信息
export function getObj(query) {
    return fetch({
        url: '/api/tran/smdevicemaintenanceplan/getOneById',
        method: 'get',
        params: query
    })
}

/// --- 公用下拉框接口 --- //