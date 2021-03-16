import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";
//交易公告列表接口
export function page(query) {
    return fetch({
        url: '/api/business/tradeNotice/page',
        method: 'get',
        params: query
    });
}

//2019-11-7 #2490  张朋  交易公告管理-增加修改记录接口
export function getPageList(params) {
    return fetch({
        url: '/api/business/jsAdjustmentRecord/getPageList',
        method: 'get',
        params: params
    })
}

//2019年11月21日14:45:21 #2698 李志佳 根据交易中心查询交易品种
export function tMdataJyorg(id) {
    return fetch({
        url: '/api/basicData/tMdataJyorg/' + id,
        method: 'get',
    })
}

//2019年11月21日14:45:21 #2698 李志佳 根据交易中心和交易品种查询交易方式
export function getTradeWay(params) {
    return fetch({
        url: '/api/business/tradeNotice/getTradeWay',
        method: 'get',
        params:params
    })
}

//模糊查询交易序列名称,Id
export function getListByNoticeName(name) {
    return fetch({
        url: '/api/business/tradeNotice/getListByNoticeName?noticeName=' + name,
        method: 'get',
        // params: query
    })
}

//列表新增接口
export function addObj(obj) {
    return fetch({
        url: '/api/business/tradeNotice/add',
        method: 'post',
        data: obj
    });
}
//编辑获取数据
export function getObj(id) {
    return fetch({
        url: '/api/business/tradeNotice/' + id,
        method: 'get'
    })
}

//获取联络线维护不要分页
export function getSelectLinkListNoPage() {
    return fetch({
        url: '/api/basicData/tMdataTieLin/getAllLinList',
        method: 'get'
    })
}
// 联络线路模糊查询

// export function getSelectLinkListNoPage2(query) {
//     return fetch({
//         url: `/api/basicData/tMdataTieLin/selectTMdataTieLin?tieLineName=${query}&tieLineType=outside_the_province`,
//         method: 'get'
//     })
// }
export function getSelectLinkListNoPage2(query) {
    return fetch({
        url: `/api/basicData/tMdataTieLin/selectTMdataTieLin`,
        method: 'get',
        params: query
    })
}

//删除
export function delObj(params) {
    return fetch({
        url: '/api/business/tradeNotice/deleteNoticeList',
        method: 'get',
        params: params
    })
}
//取消提交
export function cancelCommit(query) {
    return fetch({
        url: '/api/business//tradeNotice/cancelCommit',
        method: 'get',
        params: query
    })
}
//编辑保存数据
export function putObj(obj) {
    return fetch({
        url: '/api/business/tradeNotice/update',
        method: 'post',
        data: obj
    })
}
//附件下载
export function downloadFile(id) {
    let token = getToken();
    // return fetch({
    //   url: "/api/business/tradeNotice/downloadFile?token=" + token + "&noticeId=" + id,
    //   method: 'get'

    // })
    let url = "/api/business/tradeNotice/downloadFile?token=" + token + "&noticeId=" + id;
    window.open(url + "&ModelCode=" + window.mdcode);
}
//列表导出
export function exportObj(params) {
    let token = getToken()
    let url = "/api/business/tradeNotice/exportNoticeList?token=" + token
    for (let key in params) {
        url += "&" + key + "=" + params[key];
    }
    window.open(url + "&ModelCode=" + window.mdcode);

}

//拿到导入数据
export function getContractImportInfo(obj){
    return fetch({
        url: '/api/business/tradeNotice/getTradeNoticeImportInfo',
        method: 'get',
        params: obj
    });
}

//模板下载
export function downloadImportTemplate() {
    let token = getToken()
    let url = "/api/business/tradeNotice/dowloadImportTemplate?token=" + token
    window.location.href = url + "&ModelCode=" + window.mdcode;
  }

export function enterHouse() {
    // 确认入库
    return fetch({
      url: "/api/business/tradeNotice/enterHouse",
      method: "get",
    });
}

//客户档案数据导出
export function exportDataErrData(fileType) {
    let token = getToken()
    let url = '/api/business/tradeNotice/exportErrorData?token=' + token + "&fileType=" + fileType + "&ModelCode="+sessionStorage.getItem("modelCode");

    window.location.href = url + "&ModelCode=" + window.mdcode;
}

export function getTradingCenter() {
    return fetch({
      url: "/api/business/tradeNotice/getTradingCenter",
      method: "get",
    });
}
