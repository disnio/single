import fetch from '@common/utils/fetch';

export function getResult(query) {
    return fetch({
        url: '/api/settl/elecgenrecentlydate/getResult',
        method: 'get',
        params: query
    })
}

export function getTime(query) {
    return fetch({
        url: '/api/settl/elecgenrealtimedate/getResult',
        method: 'get',
        params: query
    })
}

export function getBase(query) {
    return fetch({
        url: '/api/settl/elecgenbaseday/getResult',
        method: 'get',
        params: query
    })
}

export function getYResult(query) {
    return fetch({
        url: '/api/settl/elecgenmltdate/getYResult',
        method: 'get',
        params: query
    })
}

export function getMResult(query) {
    return fetch({
        url: '/api/settl/elecgenmltdate/getMResult',
        method: 'get',
        params: query
    })
}

export function getMarketResult(query) {
    return fetch({
        url: '/api/settl/elecgengenrighdate/getMarketResult',
        method: 'get',
        params: query
    })
}

export function getBaseResult(query) {
    return fetch({
        url: '/api/settl/elecgengenrighdate/getBaseResult',
        method: 'get',
        params: query
    })
}







export function getSResult(query) {
    return fetch({
        url: '/api/settl/elecgenrecentlyhour/getResult',
        method: 'get',
        params: query
    })
}

export function getSTime(query) {
    return fetch({
        url: '/api/settl/elecgenrealtimehour/getResult',
        method: 'get',
        params: query
    })
}

export function getSBase(query) {
    return fetch({
        url: '/api/settl/elecgenbasehour/getResult',
        method: 'get',
        params: query
    })
}

export function getSYResult(query) {
    return fetch({
        url: '/api/settl/elecgenmlthour/getYResult',
        method: 'get',
        params: query
    })
}

export function getSMResult(query) {
    return fetch({
        url: '/api/settl/elecgenmlthour/getMResult',
        method: 'get',
        params: query
    })
}

export function getSMarketResult(query) {
    return fetch({
        url: '/api/settl/elecgengenrighhour/getMarketResult',
        method: 'get',
        params: query
    })
}

export function getSBaseResult(query) {
    return fetch({
        url: '/api/settl/elecgengenrighhour/getBaseResult',
        method: 'get',
        params: query
    })
}

