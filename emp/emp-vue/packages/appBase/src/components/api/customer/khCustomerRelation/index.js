import fetch from '@common/utils/fetch';

export function page(query) {
return fetch({
url: '/api/customer/khCustomerRelation/page',
method: 'get',
params: query
});
}

export function addObj(obj) {
return fetch({
url: '/api/customer/khCustomerRelation',
method: 'post',
data: obj
});
}

export function getObj(id) {
return fetch({
url: '/api/customer/khCustomerRelation/' + id,
method: 'get'
})
}

export function delObj(id) {
return fetch({
url: '/api/customer/khCustomerRelation/' + id,
method: 'delete'
})
}

export function putObj(id, obj) {
return fetch({
url: '/api/customer/khCustomerRelation/' + id,
method: 'put',
data: obj
})
}
