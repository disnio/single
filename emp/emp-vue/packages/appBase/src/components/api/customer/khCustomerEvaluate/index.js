import fetch from '@common/utils/fetch';

export function page(query) {
return fetch({
url: '/api/customer/khCustomerEvaluate/page',
method: 'get',
params: query
});
}

export function addObj(obj) {
return fetch({
url: '/api/customer/khCustomerEvaluate',
method: 'post',
data: obj
});
}

export function getObj(id) {
return fetch({
url: '/api/customer/khCustomerEvaluate/' + id,
method: 'get'
})
}

export function delObj(id) {
return fetch({
url: '/api/customer/khCustomerEvaluate/' + id,
method: 'delete'
})
}

export function putObj(id, obj) {
return fetch({
url: '/api/customer/khCustomerEvaluate/' + id,
method: 'put',
data: obj
})
}
