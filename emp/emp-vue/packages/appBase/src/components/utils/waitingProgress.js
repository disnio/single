/*
 * @功能描述: 等待进度组件方法集
 * @版本: 
 * @作者: 康如涛
 * @Date: 2020-04-27 14:14:40
 * @最新修改内容: 
 * @LastEditTime: 2020-05-15 13:46:56
 */
function getNowtime() {
    let time = new Date();
    return time.getFullYear() + "" + parseInt(time.getMonth() + 1) + "" + time.getDate() + "" + time.getHours() + "" + time.getMinutes() + "" + time.getSeconds()
}
/* 按文件流设置进度*/
function setUploadProgress() {

}
/* 按文件流设置进度*/
function setTimeProgress(nowProgressVal) {
    let step = 5;
    if (nowProgressVal < 20) {
        step = 6;
    } else if (nowProgressVal > 19 && nowProgressVal < 50) {
        step = 5;
    } else if (nowProgressVal > 49 && nowProgressVal < 70) {
        step = 4;
    } else if (nowProgressVal > 69 && nowProgressVal < 90) {
        step = 3;
    } else if (nowProgressVal > 69 && nowProgressVal < 90) {
        step = 3;
    } else if (nowProgressVal > 89) {
        step = 2;
    }
    return step
}
/* 设置进度状态*/
export function setProgressState() {
    let modelCode = sessionStorage.getItem("modelCode");
    let pageInfo = {};
    let progressInfoArr = [];
    let newProgressArr = [];
    let value = 5;
    if (sessionStorage.getItem("progresses") != null) {
        progressInfoArr = JSON.parse(sessionStorage.getItem("progresses"));
    }
    if (progressInfoArr.length > 0) {
        progressInfoArr.forEach(element => {
            if (element.modelCode == modelCode) {
                // element['progressInfo']['nowTime']=(new Date()).valueOf();
                let progressVal = element['progressInfo']['progressVal'] + element['progressInfo']['step'];
                if (progressVal < 100) {
                    element['progressInfo']['progressVal'] = progressVal;
                    newProgressArr.push(element)
                } else {
                    element['progressInfo']['progressVal'] = 99;
                    newProgressArr.push(element)
                }
                pageInfo = element.progressInfo;
            } else {
                newProgressArr.push(element)
            }
        });
    } else {
        pageInfo['isWaiting'] = false;
    }
    sessionStorage.setItem("progresses", JSON.stringify(newProgressArr))
    return pageInfo
}

/* 获取当前页面进度状态*/
export function getPageProgress() {
    let modelCode = sessionStorage.getItem("modelCode");
    let isAdd = false;
    let progressInfoArr = [];
    if (sessionStorage.getItem("progresses") != null) {
        progressInfoArr = JSON.parse(sessionStorage.getItem("progresses"));
        progressInfoArr.forEach(item => {
            if (item.modelCode == modelCode) {
                isAdd = true;
            }
        })
    }
    return isAdd
}
/* 获取当前页面进度状态*/
export function getRequesting(progressInfo) {
    let data = {};
    let nowTime = getNowtime();;
    data.progressInfo = progressInfo;
    let timeStep = progressInfo.waitingTime / 1000;
    if (parseInt(nowTime) - parseInt(progressInfo.startTime) < timeStep) {
        data.isRequesting = false
    } else {
        data.isRequesting = true
        data.progressInfo.startTime = nowTime;
        let modelCode = sessionStorage.getItem("modelCode");
        let progressInfoArr = [];
        let newProgressArr = [];
        progressInfoArr = JSON.parse(sessionStorage.getItem("progresses"));
        progressInfoArr.forEach(element => {
            if (element.modelCode == modelCode) {
                element['progressInfo']['startTime'] = nowTime;
                newProgressArr.push(element)
            } else {
                newProgressArr.push(element)
            }
        });
        sessionStorage.setItem("progresses", JSON.stringify(newProgressArr))
    }
    return data
}

/* 关闭进度状态*/
export function closeProgress() {
    let modelCode = sessionStorage.getItem("modelCode");
    let progressInfoArr = [];
    let newProgressArr = [];
    if (sessionStorage.getItem("progresses") != null) {
        progressInfoArr = JSON.parse(sessionStorage.getItem("progresses"));
    }
    if (progressInfoArr.length > 0) {
        progressInfoArr.forEach(element => {
            if (element.modelCode != modelCode) {
                newProgressArr.push(element)
            } else {
                element['progressInfo']['isWaiting'] = false;
                // element['progressInfo']['nowTime']=(new Date()).valueOf();
            }
        });
    }
    sessionStorage.setItem("progresses", JSON.stringify(newProgressArr))
}
/* 初始化进度状态*/
export function initProgress(data) {
    let modelCode = sessionStorage.getItem("modelCode");
    let progressInfo = data;
    progressInfo['isWaiting'] = true;
    progressInfo['isExecute'] = true;
    progressInfo['progressVal'] = 0;
    let isAdd = false;
    progressInfo.startTime = getNowtime();
    // progressInfo.nowTime='';
    let progressInfoArr = [];
    if (sessionStorage.getItem("progresses") != null) {
        progressInfoArr = JSON.parse(sessionStorage.getItem("progresses"));
        progressInfoArr.forEach(item => {
            if (item.modelCode == modelCode) isAdd = true;
        })
    }
    if (!isAdd) {
        progressInfoArr.push({ modelCode: modelCode, progressInfo: progressInfo });
    }
    sessionStorage.setItem("progresses", JSON.stringify(progressInfoArr))
    return progressInfo
}
/* 设置完成*/
export function setProgressFinished() {
    let modelCode = sessionStorage.getItem("modelCode");
    let pageInfo = {};
    let progressInfoArr = [];
    let newProgressArr = [];
    if (sessionStorage.getItem("progresses") != null) {
        progressInfoArr = JSON.parse(sessionStorage.getItem("progresses"));
    }
    if (progressInfoArr.length > 0) {
        progressInfoArr.forEach(element => {
            if (element.modelCode == modelCode) {
                // element['progressInfo']['nowTime']=(new Date()).valueOf();
                element['progressInfo']['progressVal'] = 100;
                element['progressInfo']['isWaiting'] = false;
                element['progressInfo']['isExecute'] = false;
                pageInfo = element.progressInfo;
            } else {
                newProgressArr.push(element)
            }
        });
    } else {
        pageInfo['isWaiting'] = false;
    }
    sessionStorage.setItem("progresses", JSON.stringify(newProgressArr))
    return pageInfo
}
