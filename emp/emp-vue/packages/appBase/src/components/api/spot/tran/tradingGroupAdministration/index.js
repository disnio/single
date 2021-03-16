/*
 * @功能描述: #763 配置管理-交易组管理 - 前端开发
 * @detail: 配置管理-交易组管理 - 前端开发 相关接口 api
 * @作者: zhangp
 * @Date: 2020-05-05 14:44:25
 * @最新修改内容: 
 * @LastEditTime : 2020-01-07 16:36:28
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

/*------------ 左侧组织树  -   start  -----------------*/

//获取左侧组织树
export function tree(query) {
    return fetch({
        url: '/api/admin/tradeGroup/getTree',
        method: 'get',
        params: query
    });
}

//交易组新增
export function addTradeGroup(query) {
    return fetch({
        url: '/api/tran/smtradegroup/add',
        method: 'post',
        data: query
    });
}

//交易组编辑
export function editTradeGroup(query) {
    return fetch({
        url: '/api/tran/smtradegroup/update',
        method: 'post',
        data: query
    });
}

//交易组删除
export function deleteTradeGroup(query) {
    return fetch({
        url: '/api/tran/smtradegroup/delete',
        method: 'get',
        params: query
    });
}

//交易组详情
export function viewTradeGroup(query) {
    return fetch({
        url: '/api/tran/smtradegroup/getOneById',
        method: 'get',
        params: query
    });
}


/**---------------------------   交易组成员管理区域 -------------------------------------------- */
//新增交易员 
export function addTraderInfo(query) {
    return fetch({
        url: '/api/tran/smtradegroupuser/addList',
        method: 'post',
        params: query
    });
}

//交易员信息
export function checkRightTrader(query) {
    return fetch({
        url: '/api/tran/smtradegroupuser/getAllList',
        method: 'get',
        params: query
    });
}

//根据交易组过滤用户信息
export function getPageWithOutTradeGroupUserList(query) {
    return fetch({
        url: '/api/admin/user/getPageWithOutTradeGroupUserList',
        method: 'get',
        params: query
    });
}

//设置权限
export function setGroupLeader(query) {
    return fetch({
        url: '/api/tran/smtradegroupuser/updateGroupLeader',
        method: 'get',
        params: query
    });
}

//删除交易员
export function deleteTraderInfo(query) {
    return fetch({
        url: '/api/tran/smtradegroupuser/deleteList',
        method: 'get',
        params: query
    });
}

/**---------------------------  市场主体分配管理区域  ------------------------------------------- */
// 市场主体管理 - 查看已分配数据
export function checkRightMarketSubject(query) {
    return fetch({
        url: '/api/tran/smtradegroupusersubject/getPage',
        method: 'get',
        params: query
    });
}

//市场主体管理 - 已分配数据批量删除
export function deleteMarkeInfo(query) {
    return fetch({
        url: '/api/tran/smtradegroupusersubject/deleteList',
        method: 'get',
        params: query
    });
}

//市场主体管理 - 查看未分配数据
export function setMarketSubject(query) {
    return fetch({
        url: '/api/tran/smtradegroupusersubject/getSubjectPage',
        method: 'get',
        params: query
    });
}

//市场主体管理 - 保存
export function addMarkSubject(query) {
    return fetch({
        url: '/api/tran/smtradegroupusersubject/saveTradeGroupUserSubject',
        method: 'post',
        data: query
    });
}