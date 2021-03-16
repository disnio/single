/*
 * @功能描述: 
 * @版本: 
 * @作者: 滕超
 * @Date: 2019-12-04 14:50:56
 * @最新修改内容: 
 * @LastEditTime: 2020-02-26 17:37:13
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

export function page(query) {
    return fetch({
      url: '/api/balance/preSettlement/page',
      method: 'get',
      params: query
    });
  }
  //判断日期选择完 数据是否保存======================
export function checkInsertFlag(query) {
    return fetch({
      url: '/api/balance/preSettlement/insertSettlementInfo',
      method: 'get',
      params: query
    })
  }
  // 获取结算库里的 明细 数据
export function getGXDetailListByUseId(query) {
    return fetch({
      url: '/api/balance/preSettlementDetail/page',
      method: 'get',
      params: query
    })
  }
  //新增查主表id
export function addObj(query) {
    return fetch({
      url: '/api/balance/preSettlement/insertGxInfo',
      method: 'get',
      params: query
    });
  }

//李志佳 2020年2月18日18:41:19 保存与提交
export function ModifyDataStatus(obj,state) {
    return fetch({
      url: '/api/balance/preSettlementDetail/batchUpdate/'+state,
      method: 'post',
      data: obj
    });
 }
  
//{id} 
export function delObj(id) {
  return fetch({
    url: '/api/balance/preSettlement/' + id,
    method: 'delete',
  })
}

  //保存
  export function insertGxInfo2(query) {
    return fetch({
      url: '/api/balance//preSettlementDetail/insertGxInfo2',
      method: 'put',
      data: query
    })
  }

 //提交
 export function insertGxInfo3(query) {
  return fetch({
    url: '/api/balance//preSettlementDetail/insertGxInfo3',
    method: 'put',
    data: query
  })
}
  //保存
export function insertGxInfo4(id, query) {
  return fetch({
    url: '/api/balance//preSettlementDetail/insertGxInfo4/' + id,
    method: 'put',
    data: query
  })
}

//提交
export function insertGxInfo5(id, query) {
return fetch({
  url: '/api/balance//preSettlementDetail/insertGxInfo5/' + id,
  method: 'put',
  data: query
})
}
 
  //计算
  export function SumData(query) {
    return fetch({
      url: '/api/balance/preSettlementDetail/SumData',
      method: 'put',
      data: query
    });
  }

export function calcData(obj) {
  return fetch({
    url: '/api/balance/gxPreSettlement/calcData',
    method: 'post',
    data: obj
  });
}

//模板下载
export function downTempFile(parm) {
  let token = getToken();
  let url = "/api/balance/preSettlementDetail/downTemplate?token=" + token
  let preSettlementId = parm.preSettlementId
  let provinceName = parm.provinceName
  let columns = parm.columns
  let titles = parm.titles

  if (preSettlementId !== undefined && preSettlementId !== "" && preSettlementId !== null) {
    url += "&preSettlementId=" + preSettlementId
  }
  if (provinceName !== undefined && provinceName !== "" && provinceName !== null) {
    url += "&provinceName=" + provinceName
  }
  if (columns !== undefined && columns !== "" && columns !== null) {
    url += columns
  }
  
  if (titles !== undefined && titles !== "" && titles !== null) {
    url += titles
  }
   url += "&modelCode=" + sessionStorage.getItem("modelCode");
   window.location.href = url + "&ModelCode=" + window.mdcode;
}

//导入解析
export function persettlementImportInfo(flag) {
  return fetch({
      url: '/api/balance/importFile/persettlementImportInfo?description=preSettlementGX&iscorrect=' + flag,
      method: 'get',
  })
}

export function presettlementEnterHouse() {
  // 确认入库
  return fetch({
    url: "/api/balance/importFile/presettlementEnterHouse?description=preSettlementGX",
    method: "get",
  });
}

// // 根据id删除信息
// export function delObj(obj) {
//   return fetch({
//       url: '/api/balance/customerelepresettlementHulunBuir/deleteList',
//       method: 'post',
//       data: obj
//   })
// }
// export function delObj(query) {
//   return fetch({
//     url: '/api/balance/preSettlement/insertGxInfo',
//     method: 'get',
//     params: query
//   });
// }