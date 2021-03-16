import fetch from "@common/utils/fetch";
//获取所有联络线路信息
export function getAllLinList() {
  return fetch({
    url: '/api/basicData/tMdataTieLin/getAllLinList',
    method: 'get',
  });
}
