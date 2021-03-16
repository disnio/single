/*
 * @功能描述: 增加了组织机构编码唯一性验证checkCakeOrgCode() 以及是否关联用户角色checkGroupUser()
 * @版本: 
 * @作者: 张亮三
 * @Date: 2019-10-25 09:44:15
 * @最新修改内容: 
 * @LastEditTime : 2020-01-03 14:20:52
 */
import fetch from '@common/utils/fetch';

export function fetchTree(query) {
    return fetch({
        url: '/api/admin/org/tree',
        method: 'get',
        params: query
    });
}
export function fetchOrgTree(query) {
    return fetch({
        url: '/api/admin/org/getOrgtreeByUserId',
        method: 'get',
        params: query
    });
}
export function getObjList(query) {
    return fetch({
        url: '/api/admin/group/page',
        method: 'get',
        params: query
    });
}
//判断是否可以删除 /**2019年10月20日18:52:01 */
export function getStatusToDelete(query) {
    return fetch({
        url: '/api/admin/org/getStatusToDelete',
        method: 'get',
        params: query
    });
}

export function fetchAll() {
    return fetch({
        url: '/api/admin/org/all',
        method: 'get'
    });
}
export function addObj(obj) {
    return fetch({
        url: '/api/admin/group',
        method: 'post',
        data: obj
    });
}

export function getObj(id) {
    return fetch({
        url: '/api/admin/group/' + id,
        method: 'get'
    })
}

export function delObj(id) {
    return fetch({
        url: '/api/admin/group/' + id,
        method: 'delete'
    })
}

export function putObj(id, obj) {
    return fetch({
        url: '/api/admin/group/' + id,
        method: 'put',
        data: obj
    })
}
export function addOrgObj(obj) {
    return fetch({
        url: '/api/admin/org',
        method: 'post',
        data: obj
    });
}

export function getOrgObj(id) {
    return fetch({
        url: '/api/admin/org/' + id,
        method: 'get'
    })
}

export function delOrgObj(id) {
    return fetch({
        url: '/api/admin/org/' + id,
        method: 'delete'
    })
}

export function putOrgObj(id, obj) {
    return fetch({
        url: '/api/admin/org/' + id,
        method: 'put',
        data: obj
    })
}

// export function selectObj(param) {
//   return fetch({
//     url: '/api/admin/dim/getDimByPropCode/' + param,
//     method: 'get',
//   })
// }

export function selectzzsx(params) { //组织属性
    return fetch({
        url: '/api/admin/dim/getDimByPropCode?propCode=organizational_attributes',
        method: 'get'
    })
}


//根据id获取组织信息
export function getOrgById(id) {
    return fetch({
        url: '/api/admin/org/' + id,
        method: 'get'
    })
}

//根据公司名称模糊查询信息
export function getOrgByName(query, attributeTypeCode) {
    let url = '/api/admin/org/getAllOrgByAttribute';
    if (typeof attributeTypeCode != "undefined") {
        url = '/api/admin/org/getAllOrgByAttribute?attributeTypeCode=' + attributeTypeCode;
    }
    return fetch({
        url: url,
        method: 'get',
        params: query
    });
}


// 检测组织机构编码唯一性  
// #3452 编辑时验证组织机构编码传id frj 2020-1-3 14:14:34  
export function checkCakeOrgCode(query) {
    return fetch({
        url: '/api/admin/org/cakeOrgCode',
        method: 'get',
        params: query
    })
}

// 删除用户时检测是否关联用户角色 10-28 L亮
export function checkGroupUser(id) {
    return fetch({
        url: '/api/admin/group/checkGroupUserLeader?groupId=' + id,
        method: 'get'
    })
}

//2019-11-22 秦侯珍 #2689 #2690 获取指定地区当前天气状况  
export function getNowWeather(query) {
    return fetch({
        url: '/api/home/weather/getNowWeather',
        method: 'get',
        params: query
    });
}
//2019-11-22 秦侯珍 #2689 #2690 获取未来三天的天气
export function getFutureWeather(query) {
    return fetch({
        url: '/api/home/weather/getFutureWeather',
        method: 'get',
        params: query
    });
}
//2019-11-22 秦侯珍 #2689 #2690 获取省市地区数据
export function getAreaListByCondition(query) {
    return fetch({
        url: '/api/home/weather/getAreaListByCondition',
        method: 'get',
        params: query
    });
}