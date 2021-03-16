/*
 * @功能描述: 
 * @作者: 郑文杰
 * @Date: 2020-09-23 09:46:11
 * @最新修改内容: 
 * @LastEditTime: 2020-09-24 15:22:04
 */
import fetch from '@common/utils/fetch';

//获取列表
export function getList(params) {
    return fetch({
        url: '/api/admin/baseProcessTemplate/page',
        method: 'get',
        params: params
    })
}
//新增
export function add(params) {
    return fetch({
        url: '/api/admin/baseProcessTemplate/add',
        method: 'post',
        data: params

    })
}
//修改
export function upd(params, id) {
    return fetch({
        url: '/api/admin/baseProcessTemplate/update',
        method: 'put',
        data: params
    })
}
//删除
export function del(id) {
    return fetch({
        url: '/api/admin/baseProcessTemplate/' + id,
        method: 'delete'
    })
}
export function sel(id) {
    return fetch({
        url: '/api/admin/baseProcessTemplate/getProcessTemplateVoById/' + id,
        method: 'get'
    })
}