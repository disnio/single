/*
 * @功能描述: 四大行业用户交易情况录入
 * @版本: 
 * @作者: 张朋
 * @Date: 2019-11-27 21:17:20
 * @最新修改内容: 
 * @LastEditTime: 2019-12-02 11:05:53
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

/**
 * @功能描述: 列表
 * @参数: 
 * @返回值: 
 * @作者: 张朋
 * @Date: 2019-11-29 09:19:55
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function getPageList(params) {
    return fetch({
        url: '/api/business/jyMarketSigningSituation/getPageList',
        method: 'get',
        params: params
    });
}

/**
 * @功能描述: 新增
 * @参数: 
 * @返回值: 
 * @作者: 张朋
 * @Date: 2019-11-29 09:20:13
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function insertOrUpdateBenchmark(obj) {
    return fetch({
        url: '/api/business/jyMarketSigningSituation/addData',
        method: 'post',
        data: obj
    });
}

/**
 * @功能描述: 验证期次唯一性
 * @参数: 
 * @返回值: 
 * @作者: 张朋
 * @Date: 2019-11-29 20:47:08
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function onlyPeriod(obj) {
    return fetch({
        url: '/api/business/jyMarketSigningSituation/checkDataRepeat',
        method: 'post',
        params: obj
    });
}

/**
 * @功能描述: 市场成交情况列表详情查询
 * @参数: 
 * @返回值: 
 * @作者: 张朋
 * @Date: 2019-11-29 09:20:45
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function getDetailList(obj) {
    return fetch({
        url: '/api/business/jyMarketSigningSituation/getDetailList',
        method: 'get',
        params: obj
    });
}

/**
 * @功能描述: 修改
 * @参数: 
 * @返回值: 
 * @作者: 张朋
 * @Date: 2019-12-01 16:14:28
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function updateData(obj) {
    return fetch({
        url: '/api/business/jyMarketSigningSituation/updateData',
        method: 'post',
        data: obj
    });
}

/**
 * @功能描述: 获取标杆电价
 * @参数: 
 * @返回值: 
 * @作者: 张朋
 * @Date: 2019-12-02 11:05:43
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function selectBenchmarkByOrgIdAndIssue(obj) {
    return fetch({
        url: '/api/business/jyMarketSigningSituation/updateData',
        method: 'get',
        data: obj
    });
}