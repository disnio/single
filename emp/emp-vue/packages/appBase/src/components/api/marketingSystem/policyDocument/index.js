import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

export function getViewsList(query) {
    return fetch({
        url: '/api/policy/policy/findExamPages',
        method: 'GET',
        params: query
    });
}
export function getList(query) {
    return fetch({
        url: '/api/policy/policy/findPage',
        method: 'GET',
        params: query
    });
}



// 主页面导出 #3751 wangc 2020-03-09
export function exportObj(data) {
    let token = getToken()
    let url = "@common/api/policy/policy/exportPolicy?token=" + token
    for (let k in data) {
      let value = data[k] != undefined ? data[k] : "";
      url += `&${k}=${encodeURIComponent(value)}`;
    }
    window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
  }

//政策文件审核列表查询
export function getExamineList(query) {
    return fetch({
      url: '/api/policy/policy/findExamPage',
      method: 'GET',
      params: query
    });
  }


export function add(params) {
    return fetch({
        url: '/api/policy/policy/save',
        method: 'POST',
        data: params
    });

}

export function update(params) {
    return fetch({
        url: '/api/policy/policy/update',
        method: 'POST',
        data: params
    });

}

export function audit(params) {
    return fetch({
        url: '/api/policy/policy/exam',
        method: 'POST',
        params: params
    });

}
export function downFile(params) {
    /* return fetch({
        url: '/api/policy/policy/down',
        method: 'post',
        params: params
      });*/
    let url = "/api/policy/policy/down?token=" + params.token
    let id = params.id
    let storagePath = params.storagePath
    if (id !== undefined && id !== "" && id !== null) {
        url += "&id=" + id
    }
    if (storagePath !== undefined && storagePath !== "" && storagePath !== null) {
        url += "&storagePath=" + storagePath
    }
    window.open(url + "&ModelCode=" + window.mdcode);
    //window.location.href = url

}

export function viewsFile(params) {
    return fetch({
        url: '/api/policy/policy/read',
        method: 'POST',
        params: params
    });

}
//分页查询
export function getHistoryPage(query) {
    return fetch({
        url: '/api/policy/policy/getHistoryPage',
        method: 'GET',
        params: query
    });
}
//审批历史
export function checkPage(query) {
    return fetch({
        url: "/api/admin/processApproval/getApprovalHis",
        method: "get",
        params: query
    });
}

//删除
// export function delObjPage(id) {
//   return fetch({
//     url: '/api/policy/policy/delete?id=' + id,
//     method: 'delete'
//   });
// }
export function delObjPage(query) {
    return fetch({
        url: '/api/policy/policy/delete',
        method: 'POST',
        params: query
    });
}


