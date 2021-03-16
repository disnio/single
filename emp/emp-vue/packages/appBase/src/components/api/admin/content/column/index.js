import fetch from '@common/utils/fetch';
//获取左侧栏目树
export function getTree(query) {
    return fetch({
        url: '/api/cms/cmsColumn/tree',
        method: 'get',
        params: query
    });
}

//根据栏目父id得到下级所有栏目
export function getColumnList(query) {
    return fetch({
        url: '/api/cms/cmsColumn/getColumnList',
        method: 'get',
        params: query
    });
}

//栏目新增
export function addObj(obj) {
    return fetch({
        url: '/api/cms/cmsColumn',
        method: 'post',
        data: obj
    });
}

//查询所有信息
export function getAll(query) {
    return fetch({
        url: '/api/cms/cmsColumn/all',
        method: 'get',
        params: query
    });
}

//分页查询
export function getPage(query) {
    return fetch({
        url: '/api/cms/cmsColumn/page',
        method: 'get',
        params: query
    });
}
//根据id查看信息
export function getColumnById(id) {
    return fetch({
        url: '/api/cms/cmsColumn/' + id,
        method: 'get',
    });
}

//根据id修改信息
export function updColumnById(query, id) {
    return fetch({
        url: '/api/cms/cmsColumn/' + id,
        method: 'put',
        data: query
    });
}

//根据id删除信息
export function delColumnById(id) {
    return fetch({
        url: '/api/cms/cmsColumn/' + id,
        method: 'delete'
    });
}
//根据orgId获取名称
export function getOrgNameByOrgId(id) {
    return fetch({
        url: '/api/admin/org/' + id,
        method: 'get',
    });
}
//校验栏目编码是否唯一
export function checkColumnCode(query) {
    return fetch({
        url: '/api/cms/cmsColumn/checkColumnCode',
        method: 'get',
        params: query
    });
}

//删除栏目(带效验)
export function deleteColumn(query) {
    return fetch({
        url: '/api/cms/cmsColumn/delete',
        method: 'get',
        params: query
    });
}