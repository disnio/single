import fetch from '@common/utils/fetch';
//柱状图
export function getBusinessBarChart(query) {
    return fetch({
        url: '/api/home/businessAnalysis/getBusinessBarChart',
        method: 'get',
        params: query
    });
}
//折线图
export function getBusinessLineChart(query) {
    return fetch({
        url: '/api/home/businessAnalysis/getBusinessLineChart',
        method: 'get',
        params: query
    });
}
//饼状图
export function getPieChart(query) {
    return fetch({
        url: '',
        method: 'get',
        params: query
    })
}
export function getBusinessRectangleChart(query) {
    return fetch({
        url: '/api/home/businessAnalysis/getBusinessRectangleChart',
        method: 'get',
        params: query
    });
}