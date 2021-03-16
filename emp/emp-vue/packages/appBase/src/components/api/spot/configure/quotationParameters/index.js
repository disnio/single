import fetch from '@common/utils/fetch';
/* 配置管理--报价参数维护 */

// 1.1 报价时点：分页查询
export function getPageTab1(query) {
    return fetch({
        url: '/api/tran/paramInfoManage/getTimePage',
        method: 'get',
        params: query
    });
}
// 1.2 报价时点：新增
export function addObj1(obj) {
    return fetch({
        url: '/api/tran/paramInfoManage/addTime',
        method: 'post',
        data: obj
    });
}
// 1.3 报价时点：修改
export function putObj1(obj) {
    return fetch({
        url: '/api/tran/paramInfoManage/updateTime',
        method: 'post',
        data: obj
    })
}
// 1.4 报价时点：删除
export function delObj1(obj) {
    return fetch({
        url: '/api/tran/paramInfoManage/deleteTimeList',
        method: 'post',
        data: obj
    })
}
// 1.5 报价时点：根据ID获取对象
export function getObj1(query) {
    return fetch({
        url: '/api/tran/paramInfoManage/getTimeById',
        method: 'get',
        params: query
    })
}
// 2.1 报价段：分页查询
export function getPageTab2(query) {
    return fetch({
        url: '/api/tran/paramInfoManage/getBandPage',
        method: 'get',
        params: query
    });
}
// 2.2 报价段：新增
export function addObj2(obj) {
    return fetch({
        url: '/api/tran/paramInfoManage/addBand',
        method: 'post',
        data: obj
    });
}
// 2.3 报价段：修改
export function putObj2(obj) {
    return fetch({
        url: '/api/tran/paramInfoManage/updateBand',
        method: 'post',
        data: obj
    })
}
// 2.4 报价段：删除  参数：bandIds
export function delObj2(params) {
    return fetch({
        url: '/api/tran/paramInfoManage/deleteBandList',
        method: 'post',
        data: params
    })
}
// 2.5 报价段：根据ID获取对象
export function getObj2(query) {
    return fetch({
        url: '/api/tran/paramInfoManage/getBandById',
        method: 'get',
        params: query
    })
}

// 3.1 节点信息：分页查询
export function getPageTab3(query) {
    return fetch({
        url: '/api/tran/paramInfoManage/getGridnodePage',
        method: 'get',
        params: query
    });
}
// 3.2 节点信息：新增
export function addObj3(obj) {
    return fetch({
        url: '/api/tran/paramInfoManage/addGridnode',
        method: 'post',
        data: obj
    });
}
// 3.3 节点信息：修改
export function putObj3(obj) {
    return fetch({
        url: '/api/tran/paramInfoManage/updateGridnode',
        method: 'post',
        data: obj
    })
}
// 3.4 节点信息：删除
export function delObj3(params) {
    return fetch({
        url: '/api/tran/paramInfoManage/deleteGridnodeList',
        method: 'post',
        data: params
    })
}
// 3.5 节点信息：根据ID获取对象 参数：gridnodeId
export function getObj3(query) {
    return fetch({
        url: '/api/tran/paramInfoManage/getGridNodeById',
        method: 'get',
        params: query
    })
}
// 4.1 节点与机组关系：分页查询
export function getPageTab4(query) {
    return fetch({
        url: '/api/tran/paramInfoManage/getGridNodeUnitPage',
        method: 'get',
        params: query
    });
}
// 4.2 节点与机组关系：新增
export function addObj4(obj) {
    return fetch({
        url: '/api/tran/paramInfoManage/addGridNodeUnit',
        method: 'post',
        data: obj
    });
}
// 4.3 节点与机组关系：修改
export function putObj4(obj) {
    return fetch({
        url: '/api/tran/paramInfoManage/updateGridNodeUnit',
        method: 'post',
        data: obj
    })
}
// 4.4 节点与机组关系：删除
export function delObj4(params) {
    return fetch({
        url: '/api/tran/paramInfoManage/deleteGridNodeUnitList',
        method: 'post',
        data: params
    })
}
// 4.5 节点与机组关系：根据ID获取对象 参数:gridNodeUnitId
export function getObj4(query) {
    return fetch({
        url: '/api/tran/paramInfoManage/getGridNodeUnitById',
        method: 'get',
        params: query
    })
}
// 4.6 节点与机组关系：获取交易单元下拉框
export function getJydyListByOrgId(query) {
    return fetch({
        url: '/api/admin/tradingUnit/getTradingUnitbyOrgId',
        method: 'get',
        params: query
    });
}
// 4.7 节点与机组关系：节点标识下拉框
export function getAllGridnodeList(query) {
    return fetch({
        url: '/api/tran/paramInfoManage/getAllGridnodeList',
        method: 'get',
        params: query
    });
}

// 5.1 峰谷平时点：分页查询
export function getPageTab5(query) {
    return fetch({
        url: '/api/tran/paramInfoManage/getPeriodPage',
        method: 'get',
        params: query
    });
}
// 5.2  峰谷平时点：新增
export function addObj5(obj) {
    return fetch({
        url: '/api/tran/paramInfoManage/addPeriod',
        method: 'post',
        data: obj
    });
}
// 5.3  峰谷平时点：修改
export function putObj5(obj) {
    return fetch({
        url: '/api/tran/paramInfoManage/updatePeriod',
        method: 'post',
        data: obj
    })
}
// 5.4  峰谷平时点：删除 参数-ids
export function delObj5(params) {
    return fetch({
        url: '/api/tran/paramInfoManage/deletePeriodList',
        method: 'post',
        data: params
    })
}
// 5.5  峰谷平时点：根据ID获取对象 参数：id
export function getObj5(query) {
    return fetch({
        url: '/api/tran/paramInfoManage/getOnePeriodById',
        method: 'get',
        params: query
    })
}
// 5.6 峰谷平时点：时点下拉框[从报价时点获取] 参数：areaCode、areaCompanyCode、reportSubject
export function getAllTimeDataList(query) {
    return fetch({
        url: '/api/tran/paramInfoManage/getAllTimeDataList',
        method: 'get',
        params: query
    });
}

/// --- 公用下拉框接口 --- //
// 报价主体（市场主体）
export function getReportSubjects() {
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=market_subject',
        method: 'get',
    });
}

// 节点类别
export function getGridNodeTypes() {
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=read_scope',
        method: 'get',
    });
}

// 时点类型
export function getPvtimeTypes() {
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=pvtimeType',
        method: 'get',
    });
}
// 时点
export function getPvtime() {
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=pvtime',
        method: 'get',
    });
}

// 节点标识 下拉框
export function getTimeCodes() {
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=Price_Point',
        method: 'get',
    });
}