import fetch from '@common/utils/fetch';
/* 交易公告--必开必停机组 */

// 1.1 分页查询
export function getListPage(query) {
    return fetch({
        url: '/api/tran/smmustopenorstopunit/getListPage',
        method: 'get',
        params: query
    });
}
// 1.2 新增修改
export function addOrUpdate(obj) {
    return fetch({
        url: '/api/tran/smmustopenorstopunit/addOrUpdate',
        method: 'post',
        data: obj
    });
}
// 1.3 删除 参数ids
export function delObjListByIds(obj) {
    return fetch({
        url: '/api/tran/smmustopenorstopunit/deleteList',
        method: 'post',
        data: obj
    })
}

/* 交易公告--必开必停机组详细信息 */
// 1.1 分页查询
export function getDetailListAll(query) {
    return fetch({
        url: '/api/tran/smmustopenorstopunit/getDetailListAll',
        method: 'get',
        params: query
    });
}
// 1.2 批量删除，参数ids
export function deleteDetailList(obj) {
    return fetch({
        url: '/api/tran/smmustopenorstopunit/deleteDetailList',
        method: 'post',
        data: obj
    })
}

/// --- 公用下拉框接口 --- //

// 必开必停机组状态
export function getUnitBkbtState() {
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=unit_bkbt_state',
        method: 'get',
    });
}