import Vue from "vue";
import store from "@/core/store/";
import {typeOf} from "mathjs";

export function getMenus() {
  return new Promise((resolve, reject) => {
    if (store.getters.addRouters && store.getters.addRouters.length < 1) { // 判断当前用户是否已拉取完user_info信息
      store.dispatch('GetInfo', Vue.prototype.$getCode)
        .then((userInfo) => {
          let mainMenus = userInfo.systemMenus;
          let jishu = 0;
          let menuTypes = [];
          for (let i = 0; i < mainMenus.length; i++) {
            store.dispatch('GetMenuByType', mainMenus[i].code)
              .then(info => { // 拉取user_info
                if (info.rel) {
                  let systemMenus = info.data.systemMenus;
                  if (mainMenus[i].code == "yxgk_role") {
                    menuTypes.push({
                      code: "marketingSystem_ui",
                      children: systemMenus,
                    });
                  } else if (mainMenus[i].code == "spot_role") {
                    // menuTypes.push({
                    //   code:"spot_ui",
                    //   children:systemMenus,
                    // })
                    systemMenus.forEach(element => {
                      let children = element;
                      if (typeOf(element['children']) != "undefined") children = element['children'];
                      if (element.title == "现货配置管理") {
                        menuTypes.push({
                          code: "configure_ui",
                          children: children,
                        })
                      } else if (element.title == "交易管理") {
                        menuTypes.push({
                          code: "tran_ui",
                          children: children,
                        })
                      } else if (element.title == "结算管理") {
                        menuTypes.push({
                          code: "settl_ui",
                          children: children,
                        })
                      } else if (element.title == "辅助分析") {
                        menuTypes.push({
                          code: "analysis_ui",
                          children: children,
                        })
                      }
                    });
                  } else if (mainMenus[i].code == "sys_role") {
                    menuTypes.push({
                      code: "admin_ui",
                      children: systemMenus,
                    })
                  }
                  // 营销基础库 路由判断
                  else if (mainMenus[i].code == "basic_role") {
                    menuTypes.push({
                      code: "basicData_ui",
                      children: systemMenus,
                    })
                  } else if (mainMenus[i].code == "customer_role") {
                    // 客户管理
                    menuTypes.push({
                      code: "customer_ui",
                      children: systemMenus,
                    })
                  } else if (mainMenus[i].code == "business_role") {
                    // 交易管理
                    menuTypes.push({
                      code: "business_ui",
                      children: systemMenus,
                    })
                  } else if (mainMenus[i].code == "contract_role") {
                    // 合同管理
                    menuTypes.push({
                      code: "contract_ui",
                      children: systemMenus,
                    })
                  } else if (mainMenus[i].code == "balance_role") {
                    // 计算管理
                    menuTypes.push({
                      code: "settlement_ui",
                      children: systemMenus,
                    })
                  } else {
                    systemMenus.forEach(element => {
                      let children = element;
                      if (typeOf(element['children']) != "undefined") children = element['children'];
                      if (element.title == "基础数据管理") {
                        menuTypes.push({
                          code: "basicData_ui",
                          children: children,
                        })
                      } else if (element.title == "合同管理") {
                        menuTypes.push({
                          code: "contract_ui",
                          children: children,
                        })
                      } else if (element.title == "结算管理") {
                        menuTypes.push({
                          code: "settlement_ui",
                          children: children,
                        })
                      } else if (element.title == "客户管理") {
                        menuTypes.push({
                          code: "customer_ui",
                          children: children,
                        })
                      } else if (element.title == "交易管理") {
                        menuTypes.push({
                          code: "business_ui",
                          children: children,
                        })
                      } else if (element.title == "决策支持") {
                        menuTypes.push({
                          code: "decisionSupport_ui",
                          children: children,
                        })
                      }
                    });
                  }

                  mainMenus[i]['children'] = systemMenus;
                  jishu++;
                  if (jishu == mainMenus.length) {
                    // localStorage.setItem("mainMenus",JSON.stringify(mainMenus))
                    store.commit("SET_MENUS", mainMenus);
                    // console.log(menuTypes,8888);

                    resolve({
                      data: menuTypes
                    });
                  }
                }
              })
          }
        })
        .catch((err) => {
          resolve({
            data: []
          });
        })
    } else {
      resolve({
        data: []
      });
    }
  })
}

