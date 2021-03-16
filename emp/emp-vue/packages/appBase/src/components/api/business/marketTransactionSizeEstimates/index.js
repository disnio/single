/*
 * @功能描述:
 * @版本:
 * @作者: 郑文杰
 * @Date: 2019-11-25 20:10:30
 * @最新修改内容:
 * @LastEditTime: 2020-04-22 13:40:32
 */
import fetch from "@common/utils/fetchUnits";
import { getToken } from "@common/utils/auth";
//分页查询
export function getPageList(query) {
    return fetch({
        url: "/api/business/jyannualmarkettransactionscale/getPage",
        method: "get",
        params: query
    });
}
//根据主表id查询数据
export function getOneByAmtcId(query) {
    return fetch({
        url: "/api/business/jyannualmarkettransactionscaleinfo/getDataByAmtcId",
        method: "get",
        params: query
    });
}
//根据主表id查询数据
export function getOneById(query) {
    return fetch({
        url: "/api/business/jyannualmarkettransactionscaleinfo/getOneById",
        method: "get",
        params: query
    });
}

//新增
export function addObj(obj) {
    return fetch({
        url: "/api/business/jyannualmarkettransactionscale/add",
        method: "post",
        data: obj
    });
}
//编辑， 修改
export function updObj(obj) {
    return fetch({
        url: "/api/business/jyannualmarkettransactionscale/updateTheValue",
        method: "post",
        data: obj
    });
}
//附件下载
export function downloadFile(id, macode) {
    let token = getToken();
    //  #3399 文件下载是加入modelCode frj 2019-12-30 19:21:08
    let url = "/api/business/jyannualmarkettransactionscale/exportTheJmtsFile?token=" + token + "&amtsId=" + id + '&modelCode=' + macode;
    window.open(url + "&ModelCode=" + window.mdcode);
}

//校验期次是否唯一
export function checkYear(query) {
    return fetch({
        url: '/api/business/jyannualmarkettransactionscale/judgeTransDate',
        method: 'get',
        params: query
    });
}
/**
 * @方法名称: getCalculate
 * @功能描述: 计算方法
 * @参数:
 * @返回值:
 * @作者: frj
 * @issues:
 * @Date: 2020-04-22 13:39:27
 * @最新修改内容:
 * @LastEditTime:
 */
export function getCalculate(query) {
    return fetch({
        url: '/api/business/jyannualmarkettransactionscale/calculate',
        method: 'get',
        params: query
    });
}
