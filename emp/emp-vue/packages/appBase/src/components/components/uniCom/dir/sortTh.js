/**
 * @file: sortTh.js
 * @method
 * @return {type} argName - description
 * @description: 表格排序指令
 * @author: wsc
 * @date: 2020-10-21
 */
import Vue from "vue";

const sortTh = Vue.directive("sortTh", {
  inserted: function (el, binding, vnode) {
    if (vnode.componentInstance.$children.length > 0) {
      _.forEach(vnode.componentInstance.$children, v => {
        if(v.type!=="selection" && _.has(v, "prop")){
          v.sortable = "customer";
        }
      })
    }
  }
})

export default sortTh;

