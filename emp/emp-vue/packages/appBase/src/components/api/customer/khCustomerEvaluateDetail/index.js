import fetch from '@common/utils/fetch';

export function page(query) {
return fetch({
url: '/api/customer/khCustomerEvaluateDetail/page',
method: 'get',
params: query
});
}

export function addObj(obj) {
return fetch({
url: '/api/customer/khCustomerEvaluateDetail',
method: 'post',
data: obj
});
}

export function getObj(id) {
return fetch({
url: '/api/customer/khCustomerEvaluateDetail/' + id,
method: 'get'
})
}

export function delObj(id) {
return fetch({
url: '/api/customer/khCustomerEvaluateDetail/' + id,
method: 'delete'
})
}

export function putObj(id, obj) {
return fetch({
url: '/api/customer/khCustomerEvaluateDetail/' + id,
method: 'put',
data: obj
})
}
