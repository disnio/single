/*
 * @功能描述: 
 * @版本: 
 * @作者: 郑文杰
 * @Date: 2019-09-04 09:45:51     
 * @最新修改内容: 
 * @LastEditTime: 2019-11-11 10:05:00
 */
export function initLayout() {
    let devicePixelRatio = 1;
    if (sessionStorage.getItem("devicePixelRatio") != null) {
        let num = window.devicePixelRatio / Number(sessionStorage.getItem("devicePixelRatio"));
        devicePixelRatio = num.toFixed(2);
    } else {
        sessionStorage.setItem("devicePixelRatio", window.devicePixelRatio);
    }



    let h = `${document.documentElement.clientHeight*devicePixelRatio}` - 55
    return h

}

export function initLayoutInfo() {
    let devicePixelRatio = 1;
    if (sessionStorage.getItem("devicePixelRatio") != null) {
        let num = window.devicePixelRatio / Number(sessionStorage.getItem("devicePixelRatio"));
        devicePixelRatio = num.toFixed(2);
    } else {
        sessionStorage.setItem("devicePixelRatio", window.devicePixelRatio);
    }
    let h = `${document.documentElement.clientHeight}` - 100 //从105 修改为100   
    let w = `${document.documentElement.clientWidth}` - 210
    let info = { width: w, height: h }
    return info
}
export function initPageSize(h) {
    if (h) {

    }
    return h

}
export function checkFileType(type, fileType) {
    if (type != fileType) {
        this.$notify({
            title: "失败",
            message: "请选择上传文件为" + fileType + "！",
            type: "warning",
            duration: 2000
        });
        return false
    } else {
        return true
    }
}
 //设置系统信息
 export function setSysInitInfo(type,menuLength,mainMenus) {
  sessionStorage.setItem("curSys",type);
  let  tabViewsDatas=JSON.parse(sessionStorage.getItem("tabViewsDatas"));
    if(typeof tabViewsDatas === "undefined" || tabViewsDatas==null){
      tabViewsDatas=[];
    for(let i=0;i<menuLength;i++){ 
        tabViewsDatas.push({
          code:mainMenus[i].code,
          name:mainMenus[i].name,
          tabViewsData:[
          {name: "首页",path: "/dashboard",isActive:true,parame:{},modelCode:"dashboard",iframeUrl:""}
          ],
          modelCode:"dashboard"
        });
      }
      sessionStorage.setItem("tabViewsDatas",JSON.stringify(tabViewsDatas));
    }else{
    
    }
}
