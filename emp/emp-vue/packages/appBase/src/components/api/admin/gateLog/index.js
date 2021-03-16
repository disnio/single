import fetch from '@common/utils/fetch';

export function page(query) {
    return fetch({
        url: '/api/admin/gateLog/list',
        method: 'get',
        params: query
    });
}

export function addObj(obj) {
    return fetch({
        url: '/api/admin/gateLog',
        method: 'post',
        data: obj
    });
}

export function getObj(id) {
    return fetch({
        url: '/api/admin/gateLog/' + id,
        method: 'get'
    })
}

export function delObj(id) {
    return fetch({
        url: '/api/admin/gateLog/' + id,
        method: 'delete'
    })
}

export function putObj(id, obj) {
    return fetch({
        url: '/api/admin/gateLog/' + id,
        method: 'put',
        data: obj
    })
}
