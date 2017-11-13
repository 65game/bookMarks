import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import router from './config/router'
import store from './vuex/store'


import './common/style.css'//自定义公共样式
import ajaxError from './api/ajaxError'//配置ajax请求错误插件
Vue.use(ajaxError)
import utils from './common/utils'//配置基础工具类
Vue.use(utils)

Vue.prototype.$bus = new Vue({});//两个组件传递参数全局属性

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)


new Vue({
    el: '#app',
    template: '<App/>',
    router,
    store,
    components: { App }
    //render: h => h(Login)
}).$mount('#app')

//router.replace('/login')
//




var getCookie=function(key){
    var getCookie = document.cookie.replace(/[ ]/g,"");
    var arrCookie = getCookie.split(";");
    var tips;
    for(var i=0;i<arrCookie.length;i++){
        var arr=arrCookie[i].split("=");
        if(key==arr[0]){
            tips=arr[1];
            break;
        }
    }
    return tips;
};
var findNav=function(obj,arr){
    var boole = false;
    for(var i=0;i<arr.length;i++) {
        if(arr[i]==obj||obj.indexOf(arr[i])>-1){
            boole = true;
        }
    }
    return boole;
}

// router.beforeEach ((to, from, next) => {
//     if (to.path === '/login') {
//         next()
//     } else {
//         if (to.path === '/main') {
//             next()
//         } else {
//             // 查看路径是否在允许的路由内
//             var topath = to.path;
//             //console.log(topath);
//             var arr= [];
//             arr = getCookie("UserPermissions").split(",");
//             if (!arr) {
//                 next({path: '/login'})
//             } else {
//                arr.push("/404");
//                //arr = ["/ruleClass", "/indicators", "/indicatorsClass", "/productList", "/members", "/membersWhite", "/membersBlack", "/operator", "/role", "/assets", "/dictionary", "/settings", "/customerList", "/404"]
//                 var canGo = findNav(topath,arr);
//                 if (canGo) {
//                     next()
//                 } else {
//                     next({ path: '/404' });
//                 }
//             }
//         }
//     }
// })


