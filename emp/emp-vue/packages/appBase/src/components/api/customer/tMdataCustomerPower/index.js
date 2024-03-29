import fetch from '@common/utils/fetch';

export function page(query) {
return fetch({
url: '/api/customer/tMdataCustomerPower/page',
method: 'get',
params: query
});
}

export function addObj(obj) {
return fetch({
url: '/api/customer/tMdataCustomerPower',
method: 'post',
data: obj
});
}

export function getObj(id) {
return fetch({
url: '/api/customer/tMdataCustomerPower/' + id,
method: 'get'
})
}

export function delObj(id) {
return fetch({
url: '/api/customer/tMdataCustomerPower/' + id,
method: 'delete'
})
}

export function putObj(id, obj) {
return fetch({
url: '/api/customer/tMdataCustomerPower/' + id,
method: 'put',
data: obj
})
}
