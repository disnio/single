import fetch from '@common/utils/fetch';

export function getPageList(query) {
    return fetch({
        url: '/api/tran/typcombquotscheme/getDetPage',
        method: 'get',
        params: query
    });
}

export function addMain(data) {
    return fetch({
        url: '/api/tran/typcombquotscheme/addDet',
        method: 'post',
        data: data
    });
}

export function delMain(data) {
    return fetch({
        url: '/api/tran/typcombquotscheme/deleteDetList',
        method: 'post',
        data: data
    });
}

export function getDateZhTj(query) {
    return fetch({
        url: '/api/tran/typcombquotscheme/getDateZhTj',
        method: 'get',
        params: query
    });
}

export function getDetailPage(data) {
    return fetch({
        url: '/api/tran/typcombquotscheme/getDetailPage',
        method: 'get',
        data: data
    });
}