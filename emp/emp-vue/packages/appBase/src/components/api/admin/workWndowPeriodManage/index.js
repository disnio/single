/*
 * @功能描述: 
 * @版本: 
 * @作者: wangc
 * @Date: 2019-12-31 11:24:47
 * @最新修改内容: 
 * @LastEditTime : 2020-01-06 10:48:28
 */
import fetch from '@common/utils/fetch';

export function page(query) {
    return fetch({
        url: '/api/admin/windowPhase/page',
        method: 'get',
        params: query
    });
}
export function getWindowOrgtreeByUserId() {
    return fetch({
        url: '/api/admin/org/getWindowOrgtreeByUserId',
        method: 'get'
    });
}
export function updateState(query) {
    return fetch({
        url: '/api/admin/windowPhase/updateState',
        method: 'post',
        data: query
    });
}
