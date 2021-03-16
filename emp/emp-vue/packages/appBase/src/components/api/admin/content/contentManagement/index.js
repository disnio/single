import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";
//获取左侧栏目树
export function getTree(query) {
    return fetch({
        url: '/api/cms/cmsColumn/tree',
        method: 'get',
        params: query
    });
}

//根据栏目id和组织编码获取文章列表
export function getContentList(query) {
    return fetch({
        url: '/api/cms/cmsContent/getContentPageList',
        method: 'get',
        params: query
    });
}

//栏目新增
export function addObj(obj) {
    return fetch({
        url: '/api/cms/cmsContent',
        method: 'post',
        data: obj
    });
}

export function getColumnAll(query) {
    return fetch({
        url: '/api/cms/cmsColumn/all',
        method: 'get',
        params: query
    });
}

//查询所有信息
export function getAll(query) {
    return fetch({
        url: '/api/cms/cmsContent/all',
        method: 'get',
        params: query
    });
}

//根据id获取文章内容
export function getContent(query) {
    return fetch({
        url: '/api/cms/cmsContent/getContent',
        method: 'get',
        params: query
    });
}

//分页查询
export function getPage(query) {
    return fetch({
        url: '/api/cms/cmsContent/getContentPageList',
        method: 'get',
        params: query
    });
}
//根据id查看信息
export function getContentById(id) {
    return fetch({
        url: '/api/cms/cmsContent/' + id,
        method: 'get',
    });
}

//根据id修改信息
export function updContentById(query, id) {
    return fetch({
        url: '/api/cms/cmsContent/' + id,
        method: 'put',
        data: query
    });
}

//根据id删除信息
export function delContentById(id) {
    return fetch({
        url: '/api/cms/cmsContent/' + id,
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

//附件下载
export function downloadFile(id) {
    let token = getToken();
    let url = "/api/cms/cmsContent/downloadFile?token=" + token + "&fileId=" + id;
    window.open(url + "&ModelCode=" + window.mdcode);
}

//上传文件
export function uploadFile(query) {
    return fetch({
        url: '/api/cms/cmsContent/uploadFile',
        method: 'post',
        data: query
    });
}
