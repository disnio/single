import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// 状态下拉的接口 20200529 qinhz 添加状态下拉
export function getStatusOptionsObj() {
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=state',
        method: 'get'
    })
}

/**
 * @方法名称: addSdSettlementConfig
 * @功能描述: 新增
 * @参数: 
 * @返回值: 
 * @作者: qinhz
 * @Date: 20200609 10:30:25
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function addSdSettlementConfig(obj) {
    return fetch({
        url: '/api/balance/jsSdSettlementConfig',
        method: 'post',
        data: obj
    })
}

/**
 * @方法名称: getPageList
 * @功能描述: 主页面查询
 * @参数: 
 * @返回值: 
 * @作者: qinhz
 * @Date: 20200609 10:36:25
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function getPageList(param) {
    return fetch({
        url: '/api/balance/sdSettlementConfig/getPageList',
        method: 'get',
        params: param
    })
}

/**
 * @方法名称: getConfigList
 * @功能描述: 详情页查询
 * @参数: 
 * @返回值: 
 * @作者: qinhz
 * @Date: 20200609 10:40:25
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function getConfigList(id) {
    return fetch({
        url: '/api/balance/jsSdSettlementConfig/getConfigList/' + id,
        method: 'get'
    })
}

/**
 * @方法名称: delObj
 * @功能描述: 主表单行删除
 * @参数: 
 * @返回值: 
 * @作者: qinhz
 * @Date: 202006010 10:42:25
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function delObj(id) {
    return fetch({
      url: '/api/balance/jsSdSettlementConfig/' + id,
      method: 'delete'
    });
}

/**
 * @方法名称: deleteInfoById
 * @功能描述: 通用配置删除
 * @参数: 
 * @返回值: 
 * @作者: qinhz
 * @Date: 20200609 10:42:25
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function deleteInfoById(id) {
    return fetch({
      url: '/api/balance/defaultSettlementConfig/' + id,
      method: 'delete'
    });
}

/**
 * @方法名称: deletePersonaInfoById
 * @功能描述: 个性化配置删除
 * @参数: 
 * @返回值: 
 * @作者: qinhz
 * @Date: 20200609 10:43:25
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function deletePersonaInfoById(id) {
    return fetch({
      url: '/api/balance/personalizedSettlementConfig/' + id,
      method: 'delete'
    });
}

/**
 * @方法名称: getCustomerByUserName
 * @功能描述: 获取平台名称
 * @参数: 
 * @返回值: 
 * @作者: qinhz
 * @Date: 20200609 10:46:25
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function getCustomerByUserName(param) {
    return fetch({
        url: '/api/customer/tMdataCustomer/getCustomerByUserName',
        method: 'get',
        params: param
    })
}

/**
 * @方法名称: extractHtContracJS
 * @功能描述: 个性化配置详情页
 * @参数: 
 * @返回值: 
 * @作者: qinhz
 * @Date: 20200609 10:48:25
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function extractHtContracJS(param) {
    return fetch({
        url: '/api/balance/personalizedSettlementConfig/extractHtContracJS',
        method: 'get',
        params: param
    })
}


/**
 * @方法名称: saveOrSubmit
 * @功能描述: 提交  保存
 * @参数: 
 * @返回值: 
 * @作者: qinhz
 * @Date: 20200609 10:50:25
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function saveOrSubmit(obj) {
    return fetch({
        url: '/api/balance//jsSdSettlementConfig/saveOrSubmit',
        method: 'post',
        data: obj
    })
}