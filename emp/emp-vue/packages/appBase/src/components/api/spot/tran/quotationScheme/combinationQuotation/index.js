import fetch from '@common/utils/fetch';

export function getPageList(query) {
    return fetch({
        url: '/api/tran/typcombquotscheme/getMainPage',
        method: 'get',
        params: query
    });
}

export function addMain(data) {
    return fetch({
        url: '/api/tran/typcombquotscheme/addMain',
        method: 'post',
        data: data
    });
}

export function delMain(data) {
    return fetch({
        url: '/api/tran/typcombquotscheme/deleteMainList',
        method: 'post',
        data: data
    });
}

export function updateMain(data) {
    return fetch({
        url: '/api/tran/typcombquotscheme/updateMain',
        method: 'post',
        data: data
    });
}

export function getDetailPage(data) {
    return fetch({
        url: '/api/tran/typcombquotscheme/getAllDetailPage',
        method: 'get',
        params: data
    });
}

export function submit(data) {
    return fetch({
        url: '/api/tran/typcombquotscheme/startProcess',
        method: 'post',
        data: data
    });
}
