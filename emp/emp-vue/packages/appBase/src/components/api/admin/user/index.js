import fetch from '@common/utils/fetch';

export function page(query) {
    return fetch({
        url: '/api/admin/user/list',
        method: 'get',
        params: query
    });
}
export function listByParam(query) {
    return fetch({
        url: '/api/admin/user/listByParam',
        method: 'get',
        params: query
    });
}
export function getRolePermissionList(query) {
    return fetch({
        url: '/api/admin/group/getGroupListByOrgIdAndOrgId',
        method: 'get',
        params: query
    });
}
export function getUserListByName(query) {
    return fetch({
        url: '/api/admin/user/getUserListByName',
        method: 'get',
        params: query
    });
}
export function rolePage(query) {
    return fetch({
        url: '/api/admin/group/getGroupListByUseId',
        method: 'get',
        params: query
    });
}
export function orgPage(query) {
    return fetch({
        url: '/api/admin/orgUser/getOrgListByUseId',
        method: 'get',
        params: query
    });
}

export function addObj(obj) {
    return fetch({
        url: '/api/admin/user',
        method: 'post',
        data: obj
    });
}
export function addTreeObj(obj) {
    return fetch({
        url: '/api/admin/orgUser',
        method: 'post',
        data: obj
    });
}
export function checkIsDefaultReceiver(obj) {
    return fetch({
        url: '/api/admin/user/checkIsDefaultReceiver',
        method: 'post',
        data: obj
    });
}
export function rollBackPwd(id) {
    return fetch({
        url: '/api/admin/user/resetPassword/' + id,
        method: 'post',
    });
}

export function getObj(id) {
    return fetch({
        url: '/api/admin/user/' + id,
        method: 'get'
    })
}

export function delObj(id) {
    return fetch({
        url: '/api/admin/user/' + id,
        method: 'delete'
    })
}

export function deloOrgUser(id) {
    return fetch({
        url: '/api/admin/orgUser/' + id,
        method: 'delete'
    })
}

export function putObj(id, obj) {
    return fetch({
        url: '/api/admin/user/' + id,
        method: 'put',
        data: obj
    })
}

export function fetchTree(query) {
    return fetch({
        url: '/api/admin/org/tree',
        method: 'get',
        params: query
    });
}
export function fetchTree1(query) {
    return fetch({
        url: '/api/admin/org/getAllocatableOrgByUserId',
        method: 'get',
        params: query
    });
}
export function fetchOrgTree(query) {
    return fetch({
        url: '/api/admin/org/getOrgtreeByUserId',
        method: 'get',
        params: query
    });
}

export function getCurrentUserOrg() { //获取当前用户信息
    return fetch({
        url: '/api/admin/org/getCurrentUserOrg',
        method: 'get'
    });
}

export function putRoleObj(obj, id) {
    return fetch({
        url: '/api/admin/group/' + id + '/role',
        method: 'put',
        data: obj
    })
}
export function getStatusToDelete(query) { //检查用户是否可删除
    return fetch({
        url: '/api/admin/user/getStatusToDelete',
        method: 'get',
        params: query
    });
}
export function resetPassword(id) { //重置密码
    return fetch({
        url: '/api/admin/user/resetPassword/' + id,
        method: 'post'
    });
}
export function getAllUserName(query) { //获取所有用户名称
    return fetch({
        url: '/api/admin/user/all',
        method: 'get',
        params: query
    });
}
/*
 * @功能描述: 检查用户是否可解除分配选中组织
 * @作者: 康如涛 
 * @Date: 2019-11-6
 */
export function checkDeleteOrgUser(id) {
    return fetch({
        url: '/api/admin/orgUser/getStatusToDelete/' + id,
        method: 'get'
    })
}
/*
 * @功能描述: 变更记录查询
 * @作者: wangc
 * @Date: 2019-11-18
 */
export function record(params) {
    return fetch({
        url: '/api/admin/record/page',
        method: 'get',
        params: params
    })
}