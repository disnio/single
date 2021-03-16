import fetch from '@common/utils/fetch';
/* 交易公告--机组检修信息--   start --  */

// 1.1 主 新增 dialog
export function addMaintenanceInfo(obj) {
    return fetch({
        url: '/api/tran/smunitmaintenanceinfo/add',
        method: 'post',
        data: obj
    });
}
// 1.2 机组检修信息-条件查询
export function getDataList(query) {
    return fetch({
        url: '/api/tran/smunitmaintenanceinfo/getDataList',
        method: 'get',
        params: query
    });
}
// 1.3 机组检修明细-根据机组检修id查询（查看按钮）
export function getlineDetailList(query) {
    return fetch({
        url: '/api/tran/smunitmaintenanceinfodetail/getDataList',
        method: 'get',
        params: query
    })
}

// 1.4 机组检修明细  编辑/新增
export function getDetailEdit(obj) {
    return fetch({
        url: '/api/tran/smunitmaintenanceinfodetail/add',
        method: 'post',
        data: obj
    });
}
// 1.5 机组检修信息单个删除，参数id
export function deleteONE(obj) {
    return fetch({
        url: '/api/tran/smunitmaintenanceinfo/delete',
        method: 'post',
        data: obj
    })
}

// 1.6 机组检修信息 - 多选删除
export function deleteMuch(obj) {
    return fetch({
        url: '/api/tran/smunitmaintenanceinfo/deleteList',
        method: 'post',
        data: obj
    });
}