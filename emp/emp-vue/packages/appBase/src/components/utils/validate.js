/**
 * Created by jiachenpan on 16/11/18.
 */
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
    var j = 0, i = str.length;
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
/* 是否是公司邮箱*/
export function isWscnEmail(str) {
  const reg = /^[a-z0-9](?:[-_.+]?[a-z0-9]+)*@wallstreetcn\.com$/i;
  return reg.test(str.trim());
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/* 验证key*/
// export function validateKey(str) {
//     var reg = /^[a-z_\-:]+$/;
//     return reg.test(str);
// }

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
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
//检验手机
export function checkPhone(value) {
  let s = trim(value);
  if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(s))) {
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
    var patrn = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57]|19[0-9]|16[0-9])[0-9]{8}$/;
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

//表单检验邮编
export function validatorPostCode(rule, value, callback) {
  let s = trim(value);
  if (!s) {
    return callback()
  } else {
    if (!/^[0-9][0-9]{5}$/.test(s)) {
      return callback(new Error('邮政编码格式不正确'))
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

// 表单验证0到100
export function validateNumberFromZeroToHundred(rule, value, callback) {
  let s = trim(value);
  if (!s) {
    return callback()
  } else {
    var patrn = /^(-)?\d+(\.\d+)?$/;
    if (patrn.exec(s) == null || s == "") {
      return callback(new Error('必须为数字'))
    } else {
      if (value < 0) {
        callback(new Error('必须大于等于0'));
      } else if (value > 100) {
        callback(new Error('必须小于等于100'));
      } else {
        callback();
      }
    }
  }
}

// 表单验证正数
export function validateNumberPositive(rule, value, callback) {
  let s = trim(value);
  if (!s) {
    return callback()
  } else {
    var patrn = /^(-)?\d+(\.\d+)?$/;
    if (patrn.exec(s) == null || s == "") {
      return callback(new Error('必须为数字'))
    } else {
      if (value < 0) {
        callback(new Error('必须大于等于0'));
      } else {
        callback();
      }
    }
  }
}

// 经度，整数部分为-180-180，小数部分为0-8位！
export function regLongitude(rule, value, callback) {
  const isREG = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,8})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,8}|180)$/;
  let val = trim(value);
  if (val != '') {
    if (!isREG.test(val)) {
      callback(new Error('整数部分为-180-180，小数部分为0-8位！'));
    } else {
      callback();
    }
  } else {
    callback();
  }
}
// 纬度，整数部分为-90-90，小数部分为0-8位！
export function regLatitude(rule, value, callback) {
  const isREG = /^(\-|\+)?([0-8]?\d{1}\.\d{0,8}|90\.0{0,8}|[0-8]?\d{1}|90)$/;
  let val = trim(value);
  if (val != '') {
    if (!isREG.test(val)) {
      callback(new Error('整数部分为-90-90，小数部分为0-8位！'));
    } else {
      callback();
    }
  } else {
    callback();
  }
}
// 统一社会信用代码
export function regSocialCreditCode(rule, value, callback) {
  const isREG = /^[0-9A-Z]{18}$/;
  let val = trim(value);
  if (val != '') {
    if (val.length > 18 || val.length < 18) {
      callback(new Error('社会信用代码格式不正确！'))
    } else {
      if (!isREG.test(val)) {
        callback(new Error('社会信用代码格式不正确！'))
      } else {
        callback()
      }
    }
  } else {
    callback();
  }
}