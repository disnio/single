/*
 * @Author: fengzp
 * @Date: 2021-01-07 10:34:56
 * @LastEditors: fengzp
 * @LastEditTime: 2021-01-07 10:36:08
 * @Introduce: Do not edit
 */
export function validNumber(rule, value, callback) {
  if (!Number.isFinite(parseFloat(value))) {
    callback(new Error('请输入数字值'));
  } else {
    callback();
  }
}
