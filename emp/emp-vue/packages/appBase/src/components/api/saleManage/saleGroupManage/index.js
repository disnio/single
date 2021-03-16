import fetch from "@common/utils/fetch";

//获取左侧组织树
export function tree(query) {
    return fetch({
        url: '/api/admin/sale-group/tree',
        method: 'get',
        params: query
    });
}

//查询所有信息
export function checkAll(query) {
    return fetch({
        url: '/api/admin/sale-group/all',
        method: 'get',
        params: query
    });
}
//查询所有信息
export function getOrgName(id) {
    return fetch({
        url: '/api/admin/org/' + id,
        method: 'get'
    });
}
//==========================================================================点击组织获取信息=================================================
//点击组织时 查询右侧表格销售员
export function checkRightOrgStaff(query) {
    return fetch({
        url: '/api/admin/sale-man/list-by-org',
        method: 'get',
        params: query
    });
}
//点击组织时 获取分配客户
export function allCustomer(query) {
    return fetch({
        url: '/api/admin/sale-man-customer/list-by-org',
        method: 'get',
        params: query
    });
}
//点击组织时 查询右侧表格被负责客户
export function checkRightOrgCustomer(query) {
    return fetch({
        url: '/api/admin/sale-man-customer/list-by-org',
        method: 'get',
        params: query
    });
}
//=======================================================================销售组=================================================================
//新增销售组
export function addSaleGroup(obj) {
    return fetch({
        url: '/api/admin/sale-group',
        method: 'post',
        data: obj
    });
}

//编辑销售组
export function editSaleGroup(params, id) {
    return fetch({
        url: '/api/admin/sale-group/' + id,
        method: 'put',
        data: params
    });
}

//删除销售组
export function deleteSaleGroup(id) {
    return fetch({
        url: '/api/admin/sale-group/' + id,
        method: 'delete'
    });
}

//查看销售组
export function viewSaleGroup(id) {
    return fetch({
        url: '/api/admin/sale-group/' + id,
        method: 'get'
    });
}

//点击左侧销售组时   查询右侧列表销售员信息
export function checkRightSaler(query) {
    return fetch({
        url: '/api/admin/sale-man/list',
        method: 'get',
        params: query
    });
}

//点击左侧销售组时   查询右侧列表客户信息
export function customerByGroupId(query) {
    return fetch({
        url: '/api/admin/sale-man-customer/list-by-groupId',
        method: 'get',
        params: query
    });
}
//========================================================================销售员===================================================
//新增销售员
export function addSalerInfo(obj) {
    return fetch({
        url: '/api/admin/sale-man/addInfo',
        method: 'post',
        data: obj
    });
}

//删除销售员
export function deleteSalerInfo(id) {
    return fetch({
        // url: '/api/admin/sale-man/' + id,
        url: '/api/admin/sale-man/deleteByManId/' + id,
        method: 'delete',
    });
}



//查询左侧员工
export function checkLeftSaler(query) {
    return fetch({
        url: '/api/admin/sale-man/not-assigned-emp',
        method: 'get',
        params: query
    });
}
//设置销售组长
export function setGroupLeader(query) {
    return fetch({
        url: '/api/admin/sale-man/employee',
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        data: query
    });
}
//====================================================================客户=================================================
//新增被负责客户
export function addCustomer(obj) {
    return fetch({
        url: '/api/admin/sale-man-customer/addInfo',
        method: 'post',
        data: obj
    })
}

//查询右侧列表已被负责客户
export function checkRightCustomer(query) {
    return fetch({
        url: '/api/admin/sale-man-customer/list',
        method: 'get',
        params: query
    });
}


//查询左侧客户
export function checkLeftCustomer(query) {
    return fetch({
        url: '/api/admin/sale-man-customer/not-assigned-customer',
        method: 'get',
        params: query
    });
}