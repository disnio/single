import { Notification } from 'element-ui';
import { initLayoutInfo } from "../utils/init"
var XLSX = require("xlsx");
/**
 * Created by jiachenpan on 16/11/18.
 */
//判断浏览器
function isIE() {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        return true;
    } else {
        return false;
    }
}

//过滤左右空格
function trim(s) {
    return trimRight(trimLeft(s));
}
//去掉左边的空白 
function trimLeft(s) {
    if (s == null) {
        return "";
    }
    var whitespace = new String(" \t\n\r");
    var str = new String(s);
    if (whitespace.indexOf(str.charAt(0)) != -1) {
        var j = 0,
            i = str.length;
        while (j < i && whitespace.indexOf(str.charAt(j)) != -1) {
            j++;
        }
        str = str.substring(j, i);
    }
    return str;
}

//去掉右边的空白 www.jb51.net 
function trimRight(s) {
    if (s == null) return "";
    var whitespace = new String(" \t\n\r");
    var str = new String(s);
    if (whitespace.indexOf(str.charAt(str.length - 1)) != -1) {
        var i = str.length - 1;
        while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1) {
            i--;
        }
        str = str.substring(0, i + 1);
    }
    return str;
}
//excel日期转js日期
export function excelDateToJSDate(date) {
    return new Date(Math.round((date - 25569) * 86400 * 1000));
}
export function reverse(array) {
    let newArr = [];
    for (let i = array.length - 1; i >= 0; i--) {
        newArr[newArr.length] = array[i];
    }
    return newArr;
}
export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null;
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date;
    if (typeof time == 'object') {
        date = time;
    } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000;
        date = new Date(time);
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key];
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
        if (result.length > 0 && value < 10) {
            value = '0' + value;
        }
        return value || 0;
    });
    return time_str;
}
export function titleCase2(s) {
    return s.slice(0, 1).toUpperCase() + s.slice(1);
    // return s.toLowerCase().replace(/\b([\w|']+)\b/g, function(word) {  

    //     // let str=substring(0,1);
    //     // return word.replace(word.charAt(0), word.charAt(0).toUpperCase());  
    // });  
}
export function formatTime(time, option) {
    time = +time * 1000;
    const d = new Date(time);
    const now = Date.now();

    const diff = (now - d) / 1000;

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) { // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
    }
}

// 格式化时间
export function getQueryObject(url) {
    url = url == null ? window.location.href : url;
    const search = url.substring(url.lastIndexOf('?') + 1);
    const obj = {};
    const reg = /([^?&=]+)=([^?&=]*)/g;
    search.replace(reg, (rs, $1, $2) => {
        const name = decodeURIComponent($1);
        let val = decodeURIComponent($2);
        val = String(val);
        obj[name] = val;
        return rs;
    });
    return obj;
}


/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
export function getByteLen(val) {
    let len = 0;
    for (let i = 0; i < val.length; i++) {
        if (val[i].match(/[^\x00-\xff]/ig) != null) {
            len += 1;
        } else { len += 0.5; }
    }
    return Math.floor(len);
}

export function cleanArray(actual) {
    const newArray = [];
    for (let i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}

export function param(json) {
    if (!json) return '';
    return cleanArray(Object.keys(json).map(key => {
        if (json[key] === undefined) return '';
        return encodeURIComponent(key) + '=' +
            encodeURIComponent(json[key]);
    })).join('&');
}

export function param2Obj(url) {
    const search = url.split('?')[1];
    if (!search) {
        return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
}

export function html2Text(val) {
    const div = document.createElement('div');
    div.innerHTML = val;
    return div.textContent || div.innerText;
}

export function objectMerge(target, source) {
    /* Merges two  objects,
     giving the last one precedence */

    if (typeof target !== 'object') {
        target = {};
    }
    if (Array.isArray(source)) {
        return source.slice();
    }
    for (const property in source) {
        if (source.hasOwnProperty(property)) {
            const sourceProperty = source[property];
            if (typeof sourceProperty === 'object') {
                target[property] = objectMerge(target[property], sourceProperty);
                continue;
            }
            target[property] = sourceProperty;
        }
    }
    return target;
}


export function scrollTo(element, to, duration) {
    if (duration <= 0) return;
    const difference = to - element.scrollTop;
    const perTick = difference / duration * 10;
    setTimeout(() => {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
}

export function toggleClass(element, className) {
    if (!element || !className) {
        return;
    }
    let classString = element.className;
    const nameIndex = classString.indexOf(className);
    if (nameIndex === -1) {
        classString += '' + className;
    } else {
        classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length);
    }
    element.className = classString;
}

export const pickerOptions = [{
    text: '今天',
    onClick(picker) {
        const end = new Date();
        const start = new Date(new Date().toDateString());
        end.setTime(start.getTime());
        picker.$emit('pick', [start, end]);
    }
}, {
    text: '最近一周',
    onClick(picker) {
        const end = new Date(new Date().toDateString());
        const start = new Date();
        start.setTime(end.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit('pick', [start, end]);
    }
}, {
    text: '最近一个月',
    onClick(picker) {
        const end = new Date(new Date().toDateString());
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        picker.$emit('pick', [start, end]);
    }
}, {
    text: '最近三个月',
    onClick(picker) {
        const end = new Date(new Date().toDateString());
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        picker.$emit('pick', [start, end]);
    }
}]

export function getTime(type) {

    if (type === 'start') {
        return new Date().getTime() - 3600 * 1000 * 24 * 90
    } else {
        return new Date(new Date().toDateString())
    }
}

export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result;

    const later = function() {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp;

        // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
        }
    };

    return function(...args) {
        context = this;
        timestamp = +new Date();
        const callNow = immediate && !timeout;
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }

        return result;
    };
}


export function deepClone(source) {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'shallowClone');
    }
    const targetObj = source.constructor === Array ? [] : {};
    for (const keys in source) {
        if (source.hasOwnProperty(keys)) {
            if (source[keys] && typeof source[keys] === 'object') {
                targetObj[keys] = source[keys].constructor === Array ? [] : {};
                targetObj[keys] = deepClone(source[keys]);
            } else {
                targetObj[keys] = source[keys];
            }
        }
    }
    return targetObj;
}
//检验数字
export function isNumber(value) {
    let s = trim(value);
    var patrn = /^(-)?\d+(\.\d+)?$/;
    if (patrn.exec(s) == null || s == "") {
        return false
    } else {
        return true
    }
}
//检验数字
export function validatorNumber(rule, value, callback) {
    let s = trim(value);
    if (!s) {
        return callback()
    } else {
        var patrn = /^(-)?\d+(\.\d+)?$/;
        if (patrn.exec(s) == null || s == "") {
            return callback(new Error('必须为数字'))
        } else {
            return callback()
        }
    }
}
//表单检验身份证 #4015 gaoaining   身份证校验
export function validatorIdentityCardNo(rule, value, callback) {
    let s = trim(value);
    if (!s) {
        return callback()
    } else {
        if (!/^[1-9]\d{5}(18|19|2([0-9]))\d{2}(0[0-9]|10|11|12)([0-2][1-9]|30|31)\d{3}[0-9Xx]$/.test(s)) {
            return callback(new Error('身份证格式不正确'))
        } else {
            return callback()
        }
    }

}
//检验手机
export function checkPhone(value) {
    let s = trim(value);
    if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(s))) {
        return false;
    } else {
        return true
    }
}
//表单检验手机
export function validatorPhone(rule, value, callback) {
    let s = trim(value);
    if (!s) {
        return callback()
    } else {
        //#3357 联系人移动电话填写175号段的号码都会提示“手机格式不正确” frj 2019-12-27 15:43:26
        var patrn = /^(0|86|17951)?(13[0-9]|15[012356789]|17[5678]|18[0-9]|14[57]|19[0-9]|16[0-9])[0-9]{8}$/;
        if (patrn.exec(s) == null || s == "") {
            return callback(new Error('手机格式不正确'))
        } else {
            return callback()
        }
    }

}
//检验电话
export function checkTel(value) {
    let s = trim(value);
    if (!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(s)) {
        return false;
    } else {
        return true
    }
}
//表单检验电话
export function validatorTel(rule, value, callback) {
    let s = trim(value);
    if (!s) {
        return callback()
    } else {
        if (!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(s)) {
            return callback(new Error('电话格式不正确'))
        } else {
            return callback()
        }
    }

}
//2019-12-17 #3168 张亮三 表单检验办公电话 张亮三
export function validatorbgTel(rule, value, callback) {
    let s = trim(value);
    if (!s) {
        return callback()
    } else {
        if (!/((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3})|(\d{7,8})-(\d{4}|\d{3}))$)/.test(s)) {
            return callback(new Error('电话格式不正确'))
        } else {
            return callback()
        }
    }

}
//#4294 2020-06-16 gaoaining  添加传真的验证
export function validatorbgFax(rule, value, callback) {
    let s = trim(value);
    if (!s) {
        return callback()
    } else {
        if (!/((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3})|(\d{7,8})-(\d{4}|\d{3}))$)/.test(s)) {
            return callback(new Error('传真格式不正确'))
        } else {
            return callback()
        }
    }

}
//传真正则
export function validatorFax(rule, value, callback) {
    let s = trim(value);
    if (!s) {
        return callback()
    } else {
        if (!/^(\d{3,4}-)?\d{7,8}$/.test(s)) {
            return callback(new Error('传真格式不正确'))
        } else {
            return callback()
        }
    }

}

//表单检验邮编
export function validatorPostCode(rule, value, callback) {
    let s = trim(value);
    if (!s) {
        return callback()
    } else {
        if (!/^[0-9][0-9]{5}$/.test(s)) {
            return callback(new Error('格式不正确'))
        } else {
            return callback()
        }
    }

}
//表单检验邮编
export function isPostCode(value) {
    let s = trim(value);
    if (!s) {
        return true
    } else {
        if (!/^[0-9][0-9]{5}$/.test(s)) {
            return false
        } else {
            return true
        }
    }

}
//表单检验邮箱
export function isEmail(value) {
    let s = trim(value);
    if (!s) {
        return true
    } else {
        if (!/^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/.test(s)) {
            return false
        } else {
            return true
        }
    }

}
//表单检验邮箱
export function validatorEmail(rule, value, callback) {
    let s = trim(value);
    if (!s) {
        return callback()
    } else {
        if (!/^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/.test(s)) {
            return callback(new Error('邮箱格式不正确'))
        } else {
            return callback()
        }
    }

}

//表单检验银行账号 #3232 gaoaining  2019-12-22
export function validatorBankAccount(rule, value, callback) {
    let s = trim(value);
    if (!s) {
        return callback()
    } else {
        if (/[\u4E00-\u9FA5]/g.test(s)) {
            return callback(new Error('银行账户格式不正确'))
        } else {
            return callback()
        }
    }

}
// if (!/^[0-9a-zA-Z,'',-]{1,}$/.test(s)


//表单检验企业信用代码
export function validatorSocialCreditCode(rule, value, callback) {
    let s = trim(value);
    if (!s) {
        return callback(new Error('社会信用代码格式不能为空'))
    } else {
        if (s.length > 18 || s.length < 18) {
            return callback(new Error('社会信用代码格式不正确'))
        } else {
            if (!/[0-9A-Z]{18}/.test(s)) {
                return callback(new Error('社会信用代码格式不正确'))
            } else {
                return callback()
            }
        }
    }

}
//检验企业信用代码
export function isSocialCreditCode(value) {
    var s = trim(value);
    if (!s) {
        return false
    } else {
        if (s.length > 18 || s.length < 18) {
            return false
        } else {
            if (!/[0-9A-Z]{18}/.test(s)) {
                return false
            } else {
                return true
            }
        }
    }

}
//保留四位小数
export function keepFour(value) {
    value = Number(value);
    return value.toFixed(4);

}

//动态路由地址转换
export function constructRoute(menu) {
}

//获取上一月 
export function getLastMonth() {
    let nowTime = new Date();
    let year = nowTime.getFullYear();
    let month = nowTime.getMonth() + 1;
    if (month < 2) {
        month = 12;
        year = year - 1;
    } else if (month > 2 && month < 11) {
        month = "0" + (month - 1)
    } else {
        month = month - 1
    }
    return year + "" + month;
}
//获取当前周数
export function getLastWeek() {
    let nowTime = new Date();
    let year = nowTime.getFullYear();
    let weeks = getWeekOfYear(nowTime);
    let lastWeek = "";
    if (weeks == 1) {
        year = year - 1;
        lastWeek = year + "" + getWeekOfYear(new Date((nowTime.getFullYear() - 1) + "-" + "12" + "-" + "31"));
    } else if (weeks < 10 && weeks > 1) {
        lastWeek = year + "" + "0" + (weeks - 1)
    } else {
        lastWeek = year + "" + (weeks - 1)
    }
    return lastWeek

}
//获取当前周数
export function getWeekOfYear(today) {
    let firstDay = new Date(today.getFullYear(), 0, 1);
    let dayOfWeek = firstDay.getDay();  //当前年的1月1日星期几
    let spendDay = 1;
    if (dayOfWeek != 0) {
        spendDay = 7 - dayOfWeek + 1;
    }
    firstDay = new Date(today.getFullYear(), 0, 1 + spendDay);
    let d = Math.ceil((today.valueOf() - firstDay.valueOf()) / 86400000); //86400000一天
    let result = Math.ceil(d / 7);
    return result + 1;

}
//获取昨天
export function getYesterday() {
    let nowTime = new Date();
    let yesterday = new Date(nowTime.getTime() - 24 * 60 * 60 * 1000);
    return yesterday

}

//设置报表期次
export function setIssue(type, reportUrl) {
    let issueArr = reportUrl.split("issue=");
    let issueInfo = issueArr[1].split("&");
    let issueType = issueInfo[0].substr(0, 1);
    let nowTime = new Date();
    let yesterday = new Date(nowTime.getTime() - 24 * 60 * 60 * 1000);
    let newIssue = "";
    switch (type) {
        case "M":
            //默认月报
            newIssue = getLastMonth() + "00";
            break;
        case "KM":
            //快报月报
            newIssue = parseTime(nowTime, "{y}{m}") + "00";
            break;
        case "XM":
            //下发月报
            newIssue = parseTime(nowTime, "{y}{m}") + "00";
            break;
        case "JM":
            //计划月报
            newIssue = parseTime(nowTime, "{y}{m}") + "00";
            break;
        case "Y":
            //年报
            newIssue = parseTime(nowTime, "{y}") + "0000";
            break;
        case "W":
            //周报
            newIssue = getLastWeek() + "00";
            break;
        default:
            //日报
            newIssue = parseTime(yesterday, "{y}{m}{d}");

    }
    // issueInfo.shift();
    let newUrl = reportUrl.replace(issueInfo[0], issueType + newIssue);
    return newUrl
}

//获取url字符串中的参数
export function getUrlParam(name, search) {
    var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
    var matcher = pattern.exec(search);
    var items = null;
    if (null != matcher) {
        try {
            items = decodeURIComponent(decodeURIComponent(matcher[1]));

        } catch (e) {
            try {
                items = decodeURIComponent(matcher[1]);

            } catch (e) {
                items = matcher[1];
            }
        }
    }
    return items;

}
//设置到处excel数据格式 valType:1 整数，2，两位小数，3，字符
function setTd(val, color, valType) {
    let str = '';
    if (valType === "1") {
        str = "<td style='background:" + color + ";padding:5px;font-size:12pt;border-bottom:1px solid #ccc;border-right:1px solid #ccc;mso-number-format:\"0\";  text-align:right;width:200px;' >" + val;
    } else if (valType === "2") {
        str = "<td style='background:" + color + ";padding:5px;font-size:12pt;border-bottom:1px solid #ccc;border-right:1px solid #ccc;mso-number-format:\"\#\#0\.00\";  text-align:right;width:200px;' >" + val;
    } else if (valType === "3") {
        str = "<td style='background: " + color + ";padding:5px;font-size:12pt;border-bottom:1px solid #ccc;border-right:1px solid #ccc;;  text-align:left;width:300px;' >" + val.split("&nbsp;").join("　");
    }
    // str+="</td>"
    // console.log(str);


    return str + "</td>"
}
//获取url字符串中的参数
export function downloadExcelFile(downFileName, resultTableData, sheetName) {
    let tbody_trs = [];
    let tbody_tr = [];
    let thead_trs = [];
    let thead_cols = [
        [],
        []
    ];
    let oTable = '<table id="tables" style="border-top:1px solid #ccc;border-left:1px solid #ccc;display:none;" >';
    let oThead = '<thead id="js_thead">';
    let oTbody = ' <tbody id="js_tbody">';
    let numberTypeArr = {};
    let oDiv = document.getElementById("js_table_con");
    resultTableData.title.forEach((item, index) => {
        if (item.cols.length > 0) {
            // if(item.col_name.indexOf("利用小时")>-1){
            //   numberTypeArr.push({valType:"1"})
            // }else{
            //   numberTypeArr.push({valType:"2"})
            // }
            thead_cols[0].push("<th style='background: #d1dcf1;border-bottom:1px solid #ccc;border-right:1px solid #ccc;text-align:center;padding:5px;font-size:12pt;' colspan='" + item.cols.length + "'  >" + item.col_name + "</th>");
            item.cols.forEach(subItem => {
                if (item.col_name.indexOf("利用小时") > -1) {
                    numberTypeArr[subItem.col_value] = "1";
                } else {
                    numberTypeArr[subItem.col_value] = "2";
                }
                thead_cols[1].push("<th style='background: #d1dcf1;border-bottom:1px solid #ccc;border-right:1px solid #ccc;text-align:center;mso-number-format:\"\@\";padding:5px;font-size:12pt;' >" + subItem.col_name + "</th>");
                thead_trs.push(subItem.col_value);
            });
        } else {
            thead_cols[0].push("<th style='background: #d1dcf1;border-bottom:1px solid #ccc;border-right:1px solid #ccc;text-align:center;padding:5px;font-size:12pt;' rowspan='2' >" + item.col_name + "</th>");
            numberTypeArr[item.col_value] = "3";
            thead_trs.push(item.col_value);
        }
    });
    let maxCol = 0;
    thead_trs.forEach(item => {
        let colNum = item.substring(3, item.length);
        if (Number(colNum) > maxCol) {
            maxCol = colNum;
        }
    })
    resultTableData.result.forEach((item, index) => {
        tbody_tr = [];
        for (let i = 0; i <= maxCol; i++) {
            if (index % 2 == 1) {
                if (typeof item['col' + i] != "undefined") {
                    tbody_tr.push(setTd(item['col' + i], "#f3f8ff", numberTypeArr['col' + i]));

                } else {
                    tbody_tr.push(setTd('&nbsp;', "#f3f8ff", numberTypeArr['col' + i]));

                }
            } else {
                if (typeof item['col' + i] != "undefined") {
                    tbody_tr.push(setTd(item['col' + i], "#fff", numberTypeArr['col' + i]));

                } else {
                    tbody_tr.push(setTd('&nbsp;', "#fff", numberTypeArr['col' + i]));

                }
            }
        }

        tbody_trs.push("<tr  >" + tbody_tr.join("") + "</tr>");
    });
    oThead +=
        "<tr>" +
        thead_cols[0].join("") +
        "</tr>" +
        "<tr>" +
        thead_cols[1].join("") +
        "</tr></thead>";
    oTbody += tbody_trs.join("") + '</tbody>';
    oTable += oThead + oTbody + '</table>';
    oDiv.innerHTML = oTable;
    let oTables = document.getElementById("js_table_con");

    // const wb = XLSX.utils.table_to_book(oTables);
    // XLSX.writeFile(wb, downFileName + ".xlsx");
    //  oTbody.innerHTML="";
    //   oThead.innerHTML="";
    var lHtml = oDiv.innerHTML;
    var tableHtml = '<html><head><meta charset="UTF-8"></head><body>';
    tableHtml += lHtml;
    tableHtml += '</body></html>';
    var excelBlob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
    if (isIE()) {
        window.navigator.msSaveOrOpenBlob(excelBlob, downFileName);
    } else {
        var oa = document.createElement('a');
        oa.href = URL.createObjectURL(excelBlob);
        oa.download = downFileName;
        document.body.appendChild(oa);
        oa.click();
    }
}


//检查数组中是否存在不可删除数据
export function checkIsDel(data, key) {
    // status :3、已提交 4、已下发 5、待确认 6、已确认  8、已上报  9、待审核 10、已通过 12、审核中 15、已发布
    let err = [];
    let isDel = true;
    if (data.length > 0) {
        data.forEach(item => {
            if (item[key] == "3" || item[key] == "4" || item[key] == "5" || item[key] == "6" || item[key] == "8" || item[key] == "9" || item[key] == "10" || item[key] == "12" || item[key] == "15") {
                err.push("err")
            }
        })
        if (err.length > 0) {
            Notification({
                title: "提示",
                message: "存在不可删除数据，请重新选择！",
                type: "warning",
                duration: 2000
            });
            isDel = false;
        }

    } else {

        Notification({
            title: "提示",
            message: "请至少选择一条数据！",
            type: "warning",
            duration: 2000
        });
        isDel = false;
    }
    return isDel;

}
//获取流程ID
export function getProcessKeyByNodeCode(initData, nodeCode, processCodes) {
    let processKey = initData;
    if (processCodes.length > 0) {
        processCodes.forEach(item => {
            if (item.businessNodeCode == nodeCode) {
                processKey = item.processCode;
            }
        })
    }
    return processKey

}
//获取计量单位
export function getUnitMap(allSubMenus, unitMap) {
    let unitMaps = unitMap;
    allSubMenus.forEach(menu => {
        if (menu.code == sessionStorage.getItem("modelCode")) {
            if(typeof  menu.unitMap!="undefined" ){
                unitMaps["electricityUnit"] = menu.unitMap[1]; //电量
                unitMaps["priceUnit"] = menu.unitMap[2]; //电价
                unitMaps["amountUnit"] = menu.unitMap[3]; //金额
                unitMaps["capacityUnit"] = menu.unitMap[4]; //容量
            }
          

        }
    });
    return unitMaps

}

export function getUnitMapByModelCode(allSubMenus, unitMap, modelCode) {
    let unitMaps = unitMap;
    let isUnitMaps = false;
    allSubMenus.forEach(menu => {
        if (menu.code == modelCode) {
            isUnitMaps = true;
            unitMaps["electricityUnit"] = menu.unitMap[1]; //电量
            unitMaps["priceUnit"] = menu.unitMap[2]; //电价
            unitMaps["amountUnit"] = menu.unitMap[3]; //金额
            unitMaps["capacityUnit"] = menu.unitMap[4]; //容量
        }
    });
    if (!isUnitMaps) { 
        unitMaps["electricityUnit"] = "千千瓦时"; //电量
        unitMaps["priceUnit"] = "元/千千瓦时"; //电价
        unitMaps["amountUnit"] = "元"; //金额
        unitMaps["capacityUnit"] = "千千瓦"; //容量
    }
    return unitMaps

}
//初始化按钮
export function initBtn(element) {
    let btn = false;
    if (typeof element != "undefined") {
        btn = element;
    }
    return btn
}

/**
 * @方法名称: initDialogHeight
 * @功能描述: 判断当电脑的缩放大小不一致时弹框的高度
 * @参数: 
 * @返回值: 弹框的计算后的高度
 * @样式作用范围: 全局适应
 * @作者: 郑文杰
 * @Date: 2019-11-09 16:55:22
 * @最新修改内容: 
 * @LastEditTime: Do not edit
 */
export function initDialogHeight() {
    let h = initLayoutInfo().height;
    let devicePixelRatio = window.devicePixelRatio; 
    let jResolutionHeight = window.screen.height;
    if (devicePixelRatio == 1) {
        if (jResolutionHeight == 600) {
            //当电脑屏幕分辨率的高度为600，缩放比例为100%时
            h = h - 120;
        } else if (jResolutionHeight == 768) {
            //当电脑屏幕分辨率的高度为768，缩放比例为100%时
            h = h - 140;
        } else if (jResolutionHeight == 720) {
            //当电脑屏幕分辨率的高度为720，缩放比例为100%时
            h = h - 140;
        } else if (jResolutionHeight == 800) {
            //当电脑屏幕分辨率的高度为800，缩放比例为100%时
            h = h - 170;
        } else if (jResolutionHeight == 864) {
            //当电脑屏幕分辨率的高度为864，缩放比例为100%时
            h = h - 160;
        } else if (jResolutionHeight == 960) {
            //当电脑屏幕分辨率的高度为960，缩放比例为100%时
            h = h - 170;
        } else if (jResolutionHeight == 900) {
            //当电脑屏幕分辨率的高度为900，缩放比例为100%时
            h = h - 195;
        } else if (jResolutionHeight == 1024) {
            //当电脑屏幕分辨率的高度为1024，缩放比例为100%时
            h = h - 180;
        } else if (jResolutionHeight == 1050) {
            //当电脑屏幕分辨率的高度为1050，缩放比例为100%时
            h = h - 190;
        } else if (jResolutionHeight == 1080) {
            //当电脑屏幕分辨率的高度为1080，缩放比例为100%时
            h = h - 200;
        } else {
            h = h - 200;
        }

    } else if (devicePixelRatio == 1.25) {
        if (jResolutionHeight == 615) {
            //当电脑屏幕分辨率的高度为768，缩放比例为125%时   615为可视高度
            h = h - 120;
        } else if (jResolutionHeight == 640) {
            //当电脑屏幕分辨率的高度为800，缩放比例为125%时   640为可视高度
            h = h - 130;
        } else if (jResolutionHeight == 692) {
            //当电脑屏幕分辨率的高度为864，缩放比例为125%时   692为可视高度
            h = h - 140;
        } else if (jResolutionHeight == 768) {
            //当电脑屏幕分辨率的高度为960，缩放比例为125%时   768为可视高度
            h = h - 150;
        } else if (jResolutionHeight == 820) {
            //当电脑屏幕分辨率的高度为1024，缩放比例为125%时   820为可视高度
            h = h - 160;
        } else if (jResolutionHeight == 840) {
            //当电脑屏幕分辨率的高度为1050，缩放比例为125%时   840为可视高度
            h = h - 170;
        } else if (jResolutionHeight == 864) {
            //当电脑屏幕分辨率的高度为1080，缩放比例为125%时   864为可视高度
            h = h - 180;
        }else {
            h = h - 190;
        }
    } else if (devicePixelRatio == 1.5) {
        if (jResolutionHeight == 640) {
            //当电脑屏幕分辨率的高度为960，缩放比例为150%时   640为可视高度
            h = h - 130;
        } else if (jResolutionHeight == 683) {
            //当电脑屏幕分辨率的高度为1024，缩放比例为150%时   683为可视高度
            h = h - 140;
        } else if (jResolutionHeight == 700) {
            //当电脑屏幕分辨率的高度为1050，缩放比例为150%时   700为可视高度
            h = h - 150;
        } else if (jResolutionHeight == 720) {
            //当电脑屏幕分辨率的高度为1080，缩放比例为150%时   720 为可视高度
            h = h - 160;
        }else {
            h = h - 170;
        }
    } else if (devicePixelRatio == 1.75) {
        if (jResolutionHeight == 600) {
            //当电脑屏幕分辨率的高度为1050，缩放比例为175%时   600为可视高度
            h = h - 130;
        } else if (jResolutionHeight == 618) {
            //当电脑屏幕分辨率的高度为1080，缩放比例为175%时   618为可视高度
            h = h - 140;
        }else {
            h = h - 150;
        }
    } else if (devicePixelRatio == 2) {
        //Mac的缩放比例返回值为2
        h = h - 210;
    } else {
        h = h - 210;
    }
    return h
}
export function tableHeight() {
    let h = initLayoutInfo().height;
    let devicePixelRatio = window.devicePixelRatio; 
    let jResolutionHeight = window.screen.height;
    if (devicePixelRatio == 1) {
        if (jResolutionHeight == 600) {
            //当电脑屏幕分辨率的高度为600，缩放比例为100%时
            h = h - 120;
        } else if (jResolutionHeight == 768) {
            //当电脑屏幕分辨率的高度为768，缩放比例为100%时
            h = h - 266;
        } else if (jResolutionHeight == 720) {
            //当电脑屏幕分辨率的高度为720，缩放比例为100%时
            h = h - 268;
        } else if (jResolutionHeight == 800) {
            //当电脑屏幕分辨率的高度为800，缩放比例为100%时
            h = h - 266;
        } else if (jResolutionHeight == 864) {
            //当电脑屏幕分辨率的高度为864，缩放比例为100%时
            h = h - 266;
        } else if (jResolutionHeight == 960) {
            //当电脑屏幕分辨率的高度为960，缩放比例为100%时
            h = h - 266;
        } else if (jResolutionHeight == 900) {
            //当电脑屏幕分辨率的高度为900，缩放比例为100%时
            h = h - 235;
        } else if (jResolutionHeight == 1024) {
            //当电脑屏幕分辨率的高度为1024，缩放比例为100%时
            h = h - 266;
        } else if (jResolutionHeight == 1050) {
            //当电脑屏幕分辨率的高度为1050，缩放比例为100%时
            h = h - 235;
        } else if (jResolutionHeight == 1080) {
            //当电脑屏幕分辨率的高度为1080，缩放比例为100%时
            h = h - 235;
        } else {
            h = h - 235;
        }

    } else if (devicePixelRatio == 1.25) {
        if (jResolutionHeight == 615) {
            //当电脑屏幕分辨率的高度为768，缩放比例为125%时   615为可视高度
            h = h - 120;
        } else if (jResolutionHeight == 640) {
            //当电脑屏幕分辨率的高度为800，缩放比例为125%时   640为可视高度
            h = h - 130;
        } else if (jResolutionHeight == 692) {
            //当电脑屏幕分辨率的高度为864，缩放比例为125%时   692为可视高度
            h = h - 140;
        } else if (jResolutionHeight == 768) {
            // console.log(h,1072);
            
            //当电脑屏幕分辨率的高度为960，缩放比例为125%时   768为可视高度
            // h = h - 150;
        } else if (jResolutionHeight == 820) {
            //当电脑屏幕分辨率的高度为1024，缩放比例为125%时   820为可视高度
            h = h - 160;
        } else if (jResolutionHeight == 840) {
            //当电脑屏幕分辨率的高度为1050，缩放比例为125%时   840为可视高度
            h = h - 170;
        } else if (jResolutionHeight == 864) {
            //当电脑屏幕分辨率的高度为1080，缩放比例为125%时   864为可视高度
            h = h - 238;
        }else {
            h = h - 190;
        }
    } else if (devicePixelRatio == 1.5) {
        if (jResolutionHeight == 640) {
            //当电脑屏幕分辨率的高度为960，缩放比例为150%时   640为可视高度
            h = h - 130;
        } else if (jResolutionHeight == 683) {
            //当电脑屏幕分辨率的高度为1024，缩放比例为150%时   683为可视高度
            h = h - 140;
        } else if (jResolutionHeight == 700) {
            //当电脑屏幕分辨率的高度为1050，缩放比例为150%时   700为可视高度
            h = h - 150;
        } else if (jResolutionHeight == 720) {
            //当电脑屏幕分辨率的高度为1080，缩放比例为150%时   720 为可视高度
            h = h - 266;
        }else {
            h = h - 170;
        }
    } else if (devicePixelRatio == 1.75) {
        if (jResolutionHeight == 600) {
            //当电脑屏幕分辨率的高度为1050，缩放比例为175%时   600为可视高度
            h = h - 130;
        } else if (jResolutionHeight == 618) {
            //当电脑屏幕分辨率的高度为1080，缩放比例为175%时   618为可视高度
            h = h - 150;
        }else {
            h = h - 150;
        }
    } else if (devicePixelRatio == 2) {
        //Mac的缩放比例返回值为2
        h = h - 210;
    } else {
        h = h - 210;
    }
    return h
}
/**
 * @方法名称: traverse
 * @功能描述: 获取两个日期之间的所有日期（以x年x月格式展示）
 * @参数: Date1, Date2
 * @返回值: result
 * @样式作用范围: 
 * @作者: 滕超
 * @Date: 2019-11-20 18:56:24
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function traverse(Date1, Date2) {
    var beginDate = new Date(Date1);
    var endDate = new Date(Date2);
    var startYear = beginDate.getFullYear(),   
        startMon = (beginDate.getMonth())+1,    
        endYear = endDate.getFullYear(),        
        endMon = (endDate.getMonth())+1;        
    var result = [];
    var year, mon;
    if(startYear==endYear){
        for(mon = startMon; mon<=endMon; mon++){
            result.push(startYear +'年'+ mon+'月');
          }
    }else{
        for (year = startYear; year <= endYear;year++) {
            if(year==startYear){
                for(mon = startMon; mon<=12; mon++){
                    result.push(year +'年'+ mon+'月');
                  }
            }else if(year==endYear){
                for(mon = 1; mon<=endMon; mon++){
                    result.push(year +'年'+ mon+'月');
                  }
            }else{
                for(mon = 1; mon<=12; mon++){
                    result.push(year +'年'+ mon+'月');
                  } 
            } 
        }    
    }
    return result;
}
/**
 * @方法名称: countData
 * @功能描述: 计算两个日期月份差
 * @参数: 
 * @返回值: 
 * @样式作用范围: 
 * @作者: 滕超
 * @Date: 2019-11-19 16:48:46
 * @最新修改内容: 
 * @LastEditTime: 
 */
export function countData(Date1,Date2) {
    var beginDate = new Date(Date1);
    var endDate = new Date(Date2);
    if (endDate.getTime()>beginDate.getTime()) {
        var beginMonth=beginDate.getMonth();
        var EndMonth=endDate.getMonth();
        var beginYear=beginDate.getFullYear();
        var endYear=endDate.getFullYear();
        var setYer=endYear-beginYear;
        if (setYer == 0) {
           var setMat = EndMonth - beginMonth + 1; //计算月份差 
          } else {
           var setMat = setYer * 12 + (EndMonth - beginMonth) + 1;//计算月份差
          }
         } else {
            return false    
    }
    // return setMat
    var monthList=[];
    for(var month=beginMonth;month<=EndMonth;month++){
        monthList.push(month);
        }
    }
    /**
     * @方法名称: weekTime  周选择处理
     * @param {String} {*}
     * @param {Array} {*}
     * @return {*}
     * @author: 阿朋
     * @Date: 2021-01-22 13:18:19
     * @param {*} val
     */
    export function weekTimeData(val) {
        let data = {weekShowTime:"",startTime:"",endTime:"",weekTime:""};
        let firstDay = new Date(val.getFullYear(), 0, 1)  // yyyy-mm-dd
        let dayOfWeek = firstDay.getDay()  // 例如yyyy-mm-dd是周三  dayOfWeek==3
        let spendDay = 1
        if (dayOfWeek != 0) {
          spendDay = 7 - dayOfWeek + 1   // 5 离下周一还有5天
        }
        firstDay = new Date(val.getFullYear(), 0, 1 + spendDay)   // 2020-01-06是2020年第一个周一，是2020年第二个周
        let d = Math.ceil((val.valueOf() - firstDay.valueOf()) / 86400000)   // 当前时间距离2020-01-06有几天
        let result = Math.ceil(d / 7)   // 换算成周为单位 2020-01-06result是0,但其实是第二个周，所以默认加2
        let year = val.getFullYear()
        let week = result + 1 // 本年第一天是周日，与下个周一在同一周
        //当年53周改为显示下一年第一周
        // val.getDate() !== 26 排除最后一周和下年第一周不在同一周的情况，正常显示53
        if (week === 53 && val.getDate() !== 26) {
            week = 1
            year += 1
        }
        let startTime = timestampToTime(val.valueOf() - 86400000)   // 时间戳转字符串，$util是我们封装的方法
        let endTime = timestampToTime(val.valueOf() + 5*86400000)
        data.weekShowTime = startTime+'~'+endTime+' 第'+week+'周'   // yyyy-mm-dd~yyyy-mm-dd 第WW周
        data.weekTime = year + "-" + week  // yyyy-WW
        data.startTime = startTime;
        data.endTime = endTime;
        return data
    }
     // 时间戳转换为时间
     export function  timestampToTime(timestamp) {
            var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            let D = date.getDate() + ' ';
            return Y + M + D;
    }

    