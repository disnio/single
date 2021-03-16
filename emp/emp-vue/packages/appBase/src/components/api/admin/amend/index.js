/*
 * @Author: fengzp
 * @Date: 2020-10-13 09:55:51
 * @LastEditors: fengzp
 * @LastEditTime: 2021-02-04 16:04:29
 * @Introduce: Do not edit
 */
import fetch from '@common/utils/fetch';

export function reSetPassWord(query) {
  return fetch({
    url: '/api/admin/user/updatePassword',
    method: 'post',
    data: query
  });
}

export function reSetPw(query) {
  return fetch({
    url: '/api/admin/user/modifyInitPassword',
    method: 'post',
    data: query
  });
}