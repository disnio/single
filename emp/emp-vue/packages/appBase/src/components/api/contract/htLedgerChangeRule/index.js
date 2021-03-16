import fetch from '@common/utils/fetch';
import axios from "axios";
import { getToken } from "@common/utils/auth";

// 分页查询
export function page(query) {
  return fetch({
    url: '/api/contract/htContractChange/page',
    method: 'get',
    params: query
  });
}

//新增
export function addObj(obj) {
  return fetch({
    url: '/api/contract//htContractChange',
    method: 'post',
    data: obj
  });
}

//根据id删除
export function delObj(id) {
  return fetch({
    url: '/api/contract/htContractChange/' + id,
    method: 'delete'
  })
}
//根据id查看
export function putObj(obj, id) {
  return fetch({
    url: '/api/contract/htContractChange/' + id,
    method: 'put',
    data: obj
  })
}

//根据id查看
export function getObj(id) {
  return fetch({
    url: '/api/contract/htContractChange/' + id,
    method: 'get'
  })
}

// 获取模板信息
export function getMbObj(id) {
  return fetch({
    url: '/api/contract/htTemplate/' + id,
    method: 'get'
  })
}
//取消提交
export function cancelSubmit(obj) {
  return fetch({
    url: '/api/contract/htContractChange/htChange/cancelSubmit',
    method: 'post',
    data: obj
  })
}

//通过合同编码或合同名称，查询已审核通过且未执行完的合同
export function getInfoByIdOrCode(query) {
  return fetch({
    url: '/api/contract/htContract/getHtContractByCodeOrName',
    method: 'get',
    params: query
  })
}


//获取数据库中当前最大的变更单号3位流水号
export function getChangeTheOddNumber() {
  return fetch({
    url: '/api/contract/htContractChange/getChangeTheOddNumber',
    method: 'get'
  });
}

//获取用户信息
export function getCurrentUserOrd() {
  return fetch({
    url: '/api/admin/user/getCurrentUserInfo',
    method: 'get'
  })
}
//获取当前登陆用户的组织机构信息
export function getCurrentUserOrg() {
  return fetch({
    url: '/api/admin/org/getCurrentUserOrg',
    method: 'get'
  })
}


// /htContractChange/all  查询所有信息
export function getAllInforObj() {
  return fetch({
    url: '/api/contract/htContractChange/all',
    method: 'get'
  })
}

//获取交易中心信息
export function getTradeCenter(query) {
  return fetch({
    url: '/api/basicData/tMdataJyorg/getDataListByOrgId',
    method: 'get',
    params: query
  })
}
//获取所有合同编码
export function getAllHtContract(query) {
  return fetch({
    url: '/api/contract/htContract/page',
    method: 'get',
    params: query
  })
}
//通过主键获取合同信息
export function getHtContractInfo(query) {
  return fetch({
    url: '/api/contract/htContract/getOneContractInfo',
    method: 'get',
    params: query
  }) 
} 
// //通过主键获取合同信息
// export function getHtContractInfo(contractId) {
//   return fetch({
//     url: '/api/contract/htContract/getOneContractInfo?contractId=' + contractId,
//     method: 'get',
//     params: 'obj'
//   })
// }

//通过id 
export function getTemplateByContractType(query) {
  return fetch({
    url: '/api/contract/htContract/getTemplateByContractType',
    method: 'get',
    params: query
  })
}


// /htContractChange/exportHtContractChange  导出

export function exportObj(parm) {
  let token = getToken()
  let url = "@common/api/contract/htContractChange/exportHtContractChange?token=" + token
  let orgId = parm.orgId
  let changeTheOddNumber = parm.changeTheOddNumber
  let changeDate = parm.changeDate
  let changeContractCode = parm.changeContractCode
  let changeContractName = parm.changeContractName
  if (orgId !== undefined && orgId !== "" && orgId !== null) {
    url += "&orgId=" + orgId
  }
  if (changeTheOddNumber !== undefined && changeTheOddNumber !== "" && changeTheOddNumber !== null) {
    url += "&changeTheOddNumber=" + changeTheOddNumber
  }
  if (changeDate !== undefined && changeDate !== "" && changeDate !== null) {
    url += "&changeDate=" + changeDate
  }
  if (changeContractCode !== undefined && changeContractCode !== "" && changeContractCode !== null) {
    url += "&changeContractCode=" + changeContractCode
  }
  if (changeContractName !== undefined && changeContractName !== "" && changeContractName !== null) {
    url += "&changeContractName=" + changeContractName
  }
  // window.open("@common/api/customer/khCustomerVisit/customer/exportVisiti?token=" + token);
  window.location.href = url + "&ModelCode=" + window.mdcode;

}