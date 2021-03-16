import axios from 'axios';
import {
  Message,
  MessageBox
} from 'element-ui';
import store from '@/core/store';
import {
  getToken,
  get4AToken,
  getJSESSIONID
} from './auth';




// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 50000 // 请求超时时间
});

// 清除返回status!=200的页面loading
const clearLoading =()=>{
  setTimeout(() => {
    let loadingDom=document.querySelectorAll(".el-loading-mask");
    for(var i= 0; i< loadingDom.length; i ++){
      loadingDom[i].style.display="none"
    }
  }, 2000);
};

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (getToken()) {
    if (sessionStorage.getItem("modelCode") != null) {
      config.headers['ModelCode'] = sessionStorage.getItem("modelCode");
    }
    config.headers['Authorization'] = getToken(); // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['X-Auth-Token'] = get4AToken(); // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['JSESSIONID'] = getJSESSIONID(); // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改

  }
  return config;
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    const res = response.data;
    if (response.status === 401 || res.status === 40101) {
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('FedLogOut').then(() => {
          // location.reload(); // 为了重新实例化vue-router对象 避免bug
          let url = window.location.href; 
          if( url.search("-dev.") != -1 ){
            window.location.href = "http://spic-sso-dev.test.developer.spic.com.cn/logout";    
          } else if ( url.search("-rel.") != -1 ) {
            window.location.href = "http://spic-sso-rel.test.developer.spic.com.cn/logout";    
          } else if ( url.search("-uat.") != -1 ) {
            window.location.href = "http://spic-sso-uat.test.developer.spic/logout";    
          } else if ( url.search("-pro.") != -1 ) {
            window.location.href = "http://10.80.52.235/logout";
          } else {
            window.location.href = "http://10.80.52.235/logout";
          }
        });
      })
      return Promise.reject('error');
    }
    if (res.status === 40301) {
      Message({
        message: '当前用户无相关操作权限！',
        type: 'error',
        duration: 5 * 1000
      });
      clearLoading()
      return Promise.reject('error');
    }
    if (res.status === 40001) {
      Message({
        message: res.msg,
        type: 'warning'
      });
      // clearLoading()
      return Promise.reject('error');
    }
    if (response.status !== 200 && res.status !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      });
      clearLoading()
    } else {
      return response.data;
    }
  },
  error => {
    // console.log('error',error); // for debug
    clearLoading()
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
