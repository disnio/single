/*
 * @功能描述: 
 * @版本: 
 * @作者: 张朋
 * @Date: 2019-12-11 10:56:29
 * @最新修改内容: 
 * @LastEditTime : 2020-01-09 16:31:26
 */
import Vue from 'vue'   
import { log } from 'util';
//设置表格内负数为红色字体显示
Vue.filter('setNegativeColor', function (value) {
    let numArr = 0;
    if (typeof value == 'undefined') {
        numArr = 0;
    } else {
        numArr = String(value).split("%");
    }
    let className = numArr[0] < 0 ? 'fileSate' : ''
    //let className = value < 0 ? 'fileSate' : ''
    return className;
});
//获取数组数据
Vue.filter('setDataByList', function (list, value) {
    let data = "";
    list.forEach(element => {
        let key = "";
        for (key in element) {
            if (key === value) {
                data = element[key]
            }
        }

    });
    return data;
});