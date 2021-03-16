import AsyncValidator from 'async-validator';


/**
 *
 * @param {*} rule 验证规则
 * @param {*} value 要验证的值，传入的是字符串
 * @param {*} callback 无参数通过
 * @description 验证数字项
 */
export function validNumber(rule, value, callback) {
  if (!Number.isFinite(parseFloat(value))) {
    callback(new Error('请输入数字值'));
  } else {
    callback();
  }
}
//表单检验邮箱
export function validEmail(rule, value, callback) {
  let s = _.trim(value);
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

//表单检验电话
export function validTel(rule, value, callback) {

  let s = _.trim(value);
  if (!s) {
    return callback()
  } else {
    let regTel1 = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(value);//带区号的固定电话
    let regTel2 = /^(\d{7,8})(-(\d{3,}))?$/.test(value);//不带区号的固定电话
    if (!regTel1 && !regTel2) {
      return callback(new Error('电话格式不正确'))
    } else {
      return callback()
    }
  }

}

//表单检验手机
export function validPhone(rule, value, callback) {
  let s = _.trim(value);
  if (!s) {
    return callback()
  } else {
    let pat = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57]|19[0-9]|16[0-9])[0-9]{8}$/;
    if (pat.exec(s) == null || s == "") {
      return callback(new Error('手机格式不正确'))
    } else {
      return callback()
    }
  }
}

export function validPosHansNumber(rule, value, callback) {
  if (!Number.isFinite(parseFloat(value))) {
    callback(new Error('请输入数字值'));
  } else if(value < 0 || val > 100){
    callback(new Error('请输入0到100的正数'));
  }else {
    callback();
  }
}

export function validate(row, prop, rules, trigger, callback = _.noop) {

  const descriptor = {};
  if (rules && rules.length > 0) {
    rules.forEach((rule) => {
      delete rule.trigger;
    });
  }
  descriptor[prop] = rules;

  const validator = new AsyncValidator(descriptor);
  const model = {};

  model[prop] = row[prop];

  validator.validate(
    model,
    { firstFields: true },
    (errors, invalidFields) => {
      row[`${prop}State`] = !errors ? 'success' : 'error';
      row[`${prop}Message`] = errors ? errors[0].message : '';

      callback(row, row.$index, prop, errors, invalidFields);
    }
  );
}

export function saveValid(validation, list) {
  let valid = true;
  let vLen = validation.length;
  let lk = _.keys(list);
  if (lk.length > 0 && vLen > 0) {
    _.forEach(list, (v) => {
      _.forEach(validation, (vd) => {
        if (v[vd + 'State'] === 'error') {
          valid = false;
        }
      });
    });
  }
  return valid;
}

// 生成填充验证字段
export function setValidation(heads, list, colAction, cb) {
  let dc = colAction.filter((v) => {
    return 'rules' in v;
  });
  let dt = _.map(dc, (d) => {
    return { prop: d.prop, rules: d.rules };
  });
  let validation = _.intersection(
    heads,
    dt.map((v) => v.prop)
  );

  let lk = _.keys(list);
  if (lk.length > 0) {
    _.forEach(list, (vrow) => {
      _.forEach(validation, (vd, i) => {
        let rule = dt.find((t) => t.prop === vd).rules;
        validate(vrow, vd, [...rule], '', (msg, invalidFields) => {
          // console.log(msg, invalidFields);
        });
      });
    });
  }

  cb(validation)
}
