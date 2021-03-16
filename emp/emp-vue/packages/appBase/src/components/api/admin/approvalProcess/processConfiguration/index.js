import fetch from '@common/utils/fetch';
export function getAllProcessList() {
    return fetch({
        url: '/api/admin/processApproval/all',
        method: 'get'
    });
}
//获取流程列表
export function getProcessList(params) {
    return fetch({
        url: '/api/admin/processApproval/page',
        method: 'get',
        params: params
    })
}

//新增流程
export function addProcess(params) {
    return fetch({
        url: '/api/admin/processApproval/add',
        method: 'post',
        data: params

    })
}
//修改流程
export function updateProcess(params) {
    return fetch({
        url: '/api/admin/processApproval/update',
        method: 'put',
        data: params
    })
}
//删除流程
export function deleteProcess(id) {
    return fetch({
        url: '/api/admin/processApproval/' + id,
        method: 'delete'
    })
}
//获取业务节点
export function getAllBusinessMenuBox() {
    return fetch({
        url: '/api/admin/processApproval/getAllBusinessMenuBox',
        method: 'get'
    })
}

//根据维度父节点编码查询维度列表信息
export function getDimByPropCode(code) {
      //2019-10-28 #2132 郑文杰 修改传参
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=' + code,
        method: 'get'
    })
}

//查询所有已启用的模板
export function getEnabledList(params) {
    return fetch({
        url: '/api/admin/baseProcessTemplate/getEnabledList',
        method: 'get',
        params: params
    })
}

export function getOne(params) {
    return fetch({
        url: '/api/admin/processApproval/getOne',
        method: 'get',
        params: params
    })
}

export function list(params) {
    return fetch({
        url: '/api/admin/group/list',
        method: 'get',
        params: params
    })
}