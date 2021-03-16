/*
 * @功能描述: 交易管理-发电侧报价方案管理-机组报价维护  -- 10个模块的 API接口 + 历史报价方案接口
 * @作者: lifei
 * @Date: 2020-01-05
 * @最新修改内容:
 * @LastEditTime: 2020-06-08 16:22:02
 */

import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";


// -------------------- 发电侧报价方案模块--机组报价维护：公用方法 start-------------------- //

/**
 * 主页列表分页查询
 * 参数:page分页--必填
 * 参数:limit 几页--必填
 * 参数:areaCode 区域--必填
 * 参数:areaCompanyCode 区域公司--必填
 * 参数:orgCode 发电公司
 * 参数:tradingCenterCode 交易中心--必填
 * 参数:tranDate 交易日期
 * 参数:unitCode 交易单元
 */
export function getMainPageList(query) {
    return fetch({
        url: '/api/tran/smunitscheme/getPage',
        method: 'get',
        params: query
    });
}

/**
 * 报价方案创建分页列表--专用
 */
export function getSchemePage(query) {
    return fetch({
        url: '/api/tran/smunitscheme/getSchemePage',
        method: 'get',
        params: query
    });
}



/**
 * 查询模板
 * 参数:tradingCenterCode 交易中心
 * 参数:tradeType 交易日期
 */
export function getTemplateList(query) {
    return fetch({
        url: '/api/tran/smunitscheme/getAllDataListByModel',
        method: 'get',
        params: query
    });
}

/**
 * 查询模板最新版本
 * 参数:tradingCenterCode 交易中心
 * 参数:tradeType 交易日期
 */
export function getAllDataListByModel(query) {
    return fetch({
        url: '/api/tran/smunitscheme/getAllDataListByModelForTypicalCurve',
        method: 'get',
        params: query
    });
}



/**
 * 复制上期数据查询
 * areaCode区域
 * areaCompanyCode区域公司
 * tradingCenterCode交易中心
 * tranDate交易日期
 * orgCode发电公司
 * unitCode交易单元
 */
export function getAddCopyList(query) {
    return fetch({
        //url: '/api/tran/smunitvariablecosts/getCoalAddList',
        url: '/api/tran/smunitscheme/getStageIaDataList',
        method: 'get',
        params: query
    });
}

/**
 * 复制上期数据查询最新版本
 * areaCode区域
 * areaCompanyCode区域公司
 * tradingCenterCode交易中心
 * tranDate交易日期
 * orgCode发电公司
 * unitCode交易单元
 */
export function getStageIaDataList(query) {
    return fetch({
        url: '/api/tran/smunitscheme/getStageIaDataListForTypicalCurve',
        method: 'get',
        params: query
    });
}


// 编辑、查看-列表查询
export function getDetailList(query) {
    return fetch({
        url: '/api/tran/smunitvariablecosts/getCoalDataList',
        method: 'get',
        params: query
    });
}

/**
 * 检查判断是否用重复数据
 * areaCode区域
 * areaCompanyCode区域公司
 * tradingCenterCode交易中心
 * tranDate交易日期
 * orgCode发电公司
 * unitCode交易单元
 */
export function checkInfoIsRepeat(query) {
    return fetch({
        url: '/api/tran/smunitscheme/valData',
        method: 'get',
        params: query
    });
}

/**
 * 通过ID查询数据
 * 参数:tradingCenterCode 交易中心
 * 参数:id 主键id
 * 参数:modelCode模板code
 * 参数:dataFlag数据集合显示控制标识   boolean
 * 参数:itemTab模板tab页code
 */
export function getObjById(query) {
    return fetch({
        url: '/api/tran/smunitscheme/getOneById',
        method: 'get',
        params: query
    });
}

//通过ID查询典型曲线数据
export function getTypicalCurveById(query) {
    return fetch({
        url: '/api/tran/smunitscheme/getTypicalCurveById',
        method: 'get',
        params: query
    });
}

// 成本报价-新增、编辑
export function addOrUpdate(query) {
    return fetch({
        //url: '/api/tran/smunitvariablecosts/addCoal',
        url: '/api/tran/smunitscheme/addOrUpdate',
        method: 'post',
        data: query
    });
}

export function addOrUpdateTypicalCurve(query) {
    return fetch({
        //url: '/api/tran/smunitvariablecosts/addCoal',
        url: '/api/tran/smunitscheme/addOrUpdateTypicalCurve',
        method: 'post',
        data: query
    });
}

// 成本报价-多选删除 ids
export function deleteList(query) {
    return fetch({
        //url: '/api/tran/smunitvariablecosts/deleteCoalList',
        url: '/api/tran/smunitscheme/deleteList',
        method: 'post',
        data: query
    });
}

// -------------------- 发电侧报价方案模块--机组报价维护：公用方法 end-------------------- //

// -----------------【机组调频】、【日前备用】、【机组基础信息】 特有方法 begin-------------- //

/**
 * 机组调频-通过ID查询数据
 * 参数:tradingCenterCode 交易中心
 * 参数:id 主键id
 * 参数:modelCode模板code
 * 参数:dataFlag数据集合显示控制标识   boolean
 * 参数:itemTab模板tab页code
 */
export function getUnitFmObjById(query) {
    return fetch({
        url: '/api/tran/smunitscheme/getOneInfoByIdForColoumn',
        method: 'get',
        params: query
    });
}

/**
 * 机组调频-查询模板(纵版指标)
 * 参数:tradingCenterCode 交易中心
 * 参数:tradeType 交易日期
 */
export function getUnitFmTemplateList(query) {
    return fetch({
        url: '/api/tran/smunitscheme/getAllDataListByModelForColumn',
        method: 'get',
        params: query
    });
}

// -----------------【机组调频】、【日前备用】、【机组基础信息】 特有方法 end-------------- //

// ------------------ 新能源出力预测   -   start  -------------------------------------- //

// 主页 Tabs 获取参数 动态显示
export function getTabs(query) {
    return fetch({
        url: '/api/tran/smunitscheme/getTabList',
        method: 'get',
        params: query
    });
}

// 获取 动态 table 表头 -- 新能源预测出力使用到
export function getTableHeader(query) {
    return fetch({
        url: '/api/tran/smunitscheme/getParamList',
        method: 'get',
        params: query
    });
}

//模板下载 动态生成
export function downloadTemplate(data) {
    let token = getToken()
    let url = "@common/api/tran/smunitscheme/downloadTemplate?token=" + token
    for (let k in data) {
        let value = data[k] != undefined ? data[k] : "";
        url += `&${k}=${encodeURIComponent(value)}`;
    }
    url += "&modelCode=" + sessionStorage.getItem("modelCode");
    window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}


//校验数据是否已经存在
export function checkAlreadyExists(query) {
    return fetch({
        url: '/api/tran/smunitscheme/checkTheFile',
        method: 'get',
        params: query
    })
}


// 具体的错误信息查看
export function getDetailCwlist(query) {
    return fetch({
        url: '/api/tran/smunitscheme/cwList',
        method: 'post',
        data: query
    })
}


//真* 异常Excel 导出
export function exportCwList(data) {
    let token = getToken()
    let url = "@common/api/tran/smunitscheme/export-cw-list?token=" + token
    for (let k in data) {
        let value = data[k] != undefined ? data[k] : "";
        url += `&${k}=${encodeURIComponent(value)}`;
    }
    url  +=  "&itemTab="  +  sessionStorage.getItem("modelCode");
    window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// 主页面导出
export function exportMainObj(data) {
    let token = getToken()
    let url = "@common/api/tran/smunitscheme/exportElectricity?token=" + token
    for (let k in data) {
        let value = data[k] != undefined ? data[k] : "";
        url += `&${k}=${encodeURIComponent(value)}`;
    }
    window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// 查 询
export function getSearchData(query) {
    return fetch({
        url: '/api/tran/smunitscheme/getDataByParam',
        method: 'get',
        params: query
    });
}
// ------------------ 新能源出力预测   -   end  -------------------------------------- //



// ------------------ 历史报价方案--按钮方法start -------------------------------------- //
/**
 * 历史报价方案选择按钮
 * 参数:page分页--必填
 * 参数:limit 几页--必填
 * 参数:areaCode 区域--必填
 * 参数:areaCompanyCode 区域公司--必填
 * 参数:orgCode 发电公司
 * 参数:tradingCenterCode 交易中心--必填
 * 参数:tranDate 交易日期
 * 参数:unitCode 交易单元
 * 参数:transactionDateType 交易日期类型
 */
export function getHistorySchemePage(query) {
    return fetch({
        url: "/api/tran/smunitscheme/getHisPage",
        method: "get",
        params: query
    });
}

/**
 * 历史报价方案--查看明细数据
 */
export function getHistorySchemeDetail(query) {
    return fetch({
        url: "/api/tran/smtranhistoryscheme/getDetailPage",
        method: "get",
        params: query
    });
}
// ------------------ 历史报价方案--按钮方法start -------------------------------------- //


// ------------------ #618 报价方案管理--报价方案创建 -------------------------------------- //

/**
 * 动态获取tabs集合
 * 参数:smUnitSchemeId 报价方案主键ID
 * 参数:smTranRuleConfigureId 第三步配置主表id
 */
export function getTabList(query) {
    return fetch({
        url: '/api/tran/smunitscheme/getTabInfoById',
        method: 'get',
        params: query
    });
}

/**
 * 动态获取tabs集合
 * 参数:smUnitSchemeId 报价方案主键ID
 * 参数:smTranRuleConfigureId 第三步配置主表id
 * 参数:modelCode 模板code
 * 参数:dataFlag 数据集合显示控制标识
 * 参数:itemTab 模板tab页code
 */
export function getMultiTabDetail(query) {
    return fetch({
        url: '/api/tran/smunitscheme/getMultiTabDetail',
        method: 'get',
        params: query
    });
}

/**
 * 表单保存
 * 参数:list 表单指标集合
 * 参数:smUnitSchemeId 数据表主键id
 * 参数:itemTab 模板tab页code
 */
export function updateForForm(query) {
    return fetch({
        url: '/api/tran/smunitscheme/updateForForm',
        method: 'post',
        data: query
    });
}

// ------------------------- 工作流相关方法 start-----------------------//

/**
 * 提交流程
 * 参数:smUnitSchemeVO 对象，主要用到主键id
 */
export function startProcess(query) {
    return fetch({
        url: '/api/tran/smunitscheme/startProcess',
        method: 'post',
        data: query
    });
}


/**
 * 获取代办审核列表
 * 参数:subpapCode流程配置对应的的页面菜单编码--必填
 * 参数:page分页--必填
 * 参数:limit 几页--必填
 * 参数:areaCode 区域--必填
 * 参数:areaCompanyCode 区域公司--必填
 * 参数:orgCode 发电公司
 * 参数:tradingCenterCode 交易中心--必填
 * 参数:tranDate 交易日期
 * 参数:unitCode 交易单元
 */
export function getPageAudit(query) {
    return fetch({
        url: '/api/tran/smunitschemeAudit/getPageAudit',
        method: 'get',
        params: query
    });
}

/**
 * 通过/驳回操作
 * 参数:businessIds 业务数据主键集合-必填
 * 参数:isPass 是否审核通过(true 通过 false 驳回)-必填
 * 参数:approvalComments 审批意见-必填
 */
export function opertion(params) {
    return fetch({
        url: '/api/tran/smunitschemeAudit/opertion',
        method: 'POST',
        data: params
    });
}

/**
 * 审核查询方法
 * 参数:subpapCodes流程配置对应的的页面菜单编码字符串集合--必填
 * 参数:subpapCode方案类型 10个选项卡的subpapCode
 * 参数:page分页--必填
 * 参数:limit 几页--必填
 * 参数:areaCode 区域--必填
 * 参数:areaCompanyCode 区域公司--必填
 * 参数:orgCode 发电公司
 * 参数:tradingCenterCode 交易中心--必填
 * 参数:tranDate 交易日期
 * 参数:unitCode 交易单元
 */
export function getPageSearch(query) {
    return fetch({
        url: '/api/tran/smunitschemeAudit/getPageSearch',
        method: 'get',
        params: query
    });
}

// 审批历史
export function getApprovalHis(query) {
    return fetch({
        url: '/api/admin/processApproval/getApprovalHis',
        method: 'get',
        params: query
    })
}

// 流程
export function getActiviImage(query) {
    return fetch({
        url: '/api/admin/processApproval/getActiviImage',
        method: 'get',
        params: query
    })
}

// ------------------------- 工作流相关方法 end-----------------------//


// ------------------------- #952 工单修改 start-----------------------//

// 校验模板下载是否异常
export function downTemplateCheck(query) {
    return fetch({
        url: '/api/tran/smunitscheme/downTemplateCheck',
        method: 'get',
        params: query
    })
}

// 校验新能源出力导出是否异常
export function exportCheck(query) {
    return fetch({
        url: '/api/tran/smunitscheme/exportCheck',
        method: 'get',
        params: query
    })
}
// ------------------------- #952 工单修改 end-----------------------//


// #997 工单修改 fengzp 2020-4-26
/**
 * @name: 模板下载 tradingCenterCode，tradeType，unitType
 * @Author: fengzp
 * @msg:
 * @param {type}
 * @return:
 * @Date: 2020-04-27 16:09:38
 * @LastEditTime:
 */
export function exportTemplate(data) {
    let token = getToken()
    let url = "@common/api/tran/smUnitSchemeImport/downloadTemplate?token=" + token
    for (let k in data) {
        let value = data[k] != undefined ? data[k] : "";
        url += `&${k}=${encodeURIComponent(value)}`;
    }
    window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}
// 模板下载前校验
export function downloadTemplateCheck(query) {
    return fetch({
        url: '/api/tran/smUnitSchemeImport/downloadTemplateCheck',
        method: 'get',
        params: query
    })
}

/**
 * @name: 错误文件导出 fileId，areaCompanyCode
 * @Author: fengzp
 * @msg:
 * @param {type}
 * @return:
 * @Date: 2020-04-27 16:10:35
 * @LastEditTime:
 */
export function exportWrongList(data) {
    let token = getToken()
    let url = "@common/api/tran/smUnitSchemeImport/export-cw-list?token=" + token
    for (let k in data) {
        let value = data[k] != undefined ? data[k] : "";
        url += `&${k}=${encodeURIComponent(value)}`;
    }
    window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

export function getPageReviewSearch(query) {
        return fetch({
            url: '/api/tran/smTradeSellDeclaAudit/getAllSellDeclaAuditPage',
            method: 'get',
            params: query
        });
    }




// 2020/06/08吴志超修改工单 #1081  交易管理-发电侧报价方案-成本报价-优化-前端开发  begin
// importFileCostQuotation  这个是上传成本报价文件

// downloadCostQuotation  成本报价 的模板下载接口
export function downloadCostQuotation(data) {
  let token = getToken()
  let url = "@common/api/tran/smUnitSchemeImport/downloadCostQuotation?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}
// export-cwCostQuotation-list  成本报价导出错误信息
export function exportCostWrongList(data) {
  let token = getToken()
  let url = "@common/api/tran/smUnitSchemeImport/export-cwCostQuotation-list?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}
// downloadCostQuotationCheck  模板校验
export function downloadCostQuotationCheck(query) {
  return fetch({
    url: '/api/tran/smUnitSchemeImport/downloadCostQuotationCheck',
    method: 'get',
    params: query
  })
}

 // 2020/06/08吴志超修改工单 #1081  交易管理-发电侧报价方案-成本报价-优化-前端开发  end
