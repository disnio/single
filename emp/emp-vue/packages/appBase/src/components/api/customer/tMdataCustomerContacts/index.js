import fetch from '@common/utils/fetch';

export function page(query) {
return fetch({
url: '/api/customer/tMdataCustomerContacts/page',
method: 'get',
params: query
});
}

export function addObj(obj) {
return fetch({
url: '/api/customer/tMdataCustomerContacts',
method: 'post',
data: obj
});
}

export function getObj(id) {
return fetch({
url: '/api/customer/tMdataCustomerContacts/' + id,
method: 'get'
})
}

export function delObj(id) {
return fetch({
url: '/api/customer/tMdataCustomerContacts/' + id,
method: 'delete'
})
}

export function putObj(id, obj) {
return fetch({
url: '/api/customer/tMdataCustomerContacts/' + id,
method: 'put',
data: obj
})
}
