import fetch from "@common/utils/fetch";

// 历史报价方案 列表分页查询

export function getMainPage(query) {
  return fetch({
    url: "/api/tran/smtranhistoryscheme/getMainPage",
    method: "get",
    params: query
  });
}

// /smtranhistoryscheme/getDetailPage
// 现货交易历史申报报价方案明细表 - 分页查询
export function getDetailPage(query) {
  return fetch({
    url: "/api/tran/smtranhistoryscheme/getDetailPage",
    method: "get",
    params: query
  });
}
