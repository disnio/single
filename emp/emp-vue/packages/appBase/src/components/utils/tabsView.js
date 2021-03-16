/*
 * @功能描述: 
 * @版本: 
 * @作者: 康如涛
 * @Date: 2020-02-11 11:46:58
 * @最新修改内容: 
 * @LastEditTime : 2020-02-15 11:24:00
 */
//缓存当前项目tabs信息
export function setTabsData(data) {

    let tabViewsDatas = JSON.parse(sessionStorage.getItem("tabViewsDatas"));
    tabViewsDatas.forEach(element => {
        if (element.code === sessionStorage.getItem("curSys")) {
            // let newArr = element.tabViewsData.filter(item=>item.path == data.path)
            // if (newArr.length < 1) {
            //     element.tabViewsData.push(data)
            // }
             element.tabViewsData = data;
            //    element.tabViewsData[data.length-1].isActive=true;
            //    element.modelCode=data[data.length-1].modelCode;
            //    sessionStorage.setItem("modelCode",data[data.length-1].modelCode);
        }
    });
    sessionStorage.setItem("tabViewsDatas", JSON.stringify(tabViewsDatas));
    setActiveTabs(sessionStorage.getItem("modelCode"));

}
//获取当前项目tabs信息
export function getTabsData() {
    let tabViewsDatas = JSON.parse(sessionStorage.getItem("tabViewsDatas"));
    let visitedViews = [];
    tabViewsDatas.forEach(element => {
        if (element.code === sessionStorage.getItem("curSys")) {
            visitedViews = element.tabViewsData;
        }
    });
    return visitedViews
}
//设置已访问tab
export function setActiveTabs(modelCode) {
    let tabViewsDatas = JSON.parse(sessionStorage.getItem("tabViewsDatas"));
    tabViewsDatas.forEach(element => {
        if (element.code === sessionStorage.getItem("curSys")) {
            element.tabViewsData.forEach(item => {
                if (item.modelCode === modelCode) {
                    item.isActive = true;
                } else {
                    item.isActive = false;
                }
            });
            sessionStorage.setItem("modelCode", modelCode);
        }
    });
    sessionStorage.setItem("tabViewsDatas", JSON.stringify(tabViewsDatas));
}
//获取当前访问页面路径
export function getActivePath() {
    let tabViewsDatas = JSON.parse(sessionStorage.getItem("tabViewsDatas"));
    let path = "/dashboard";
    sessionStorage.setItem("modelCode", "dashboard");
    tabViewsDatas.forEach(element => {
        if (element.code === sessionStorage.getItem("curSys")) {
            element.tabViewsData.forEach(item => {
                if (item.modelCode == element.modelCode) {
                    path = item.path;
                    sessionStorage.setItem("modelCode", element.modelCode);
                }
            });
        }
    });
    return path
}

