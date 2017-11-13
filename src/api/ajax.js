import axios from 'axios';

var getCookie=function(key){
    var getCookie = document.cookie.replace(/[ ]/g,"");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
    var arrCookie = getCookie.split(";");  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
    var tips;  //声明变量tips
    for(var i=0;i<arrCookie.length;i++){   //使用for循环查找cookie中的tips变量
        var arr=arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
        if(key==arr[0]){  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
            tips=arr[1];   //将cookie的值赋给变量tips
            break;   //终止for循环遍历
        }
    }
    return tips;
};

var ajaxToken = function(){
    var token = getCookie("UserLoginToken");
    if(token){
        axios.defaults.headers.common['Token'] = token;   //自定义全局请求头 Token
    }
    // var user = JSON.parse(sessionStorage.getItem("user")); //判断是否需要请求Token
    // if(user){
    //     axios.defaults.headers.common['Token'] = user.token;   //自定义全局请求头 Token
    // }
}

//自定义拦截器配置
// var config = {};
// 添加请求拦截器
// axios.interceptors.request.use(function (config) {
//     // 在发送请求之前做些什么
//     console.log("请求之前");
//     return config;
// }, function (error) {
//     // 对请求错误做些什么
//     console.log("请求错误");
//     return Promise.reject(error);
// });
// // 添加响应拦截器
// axios.interceptors.response.use(function (response) {
//     // 对响应数据做点什么
//     console.log("响应数据");
//     return response;
// }, function (error) {
//     // 对响应错误做点什么
//     console.log("响应错误");
//     return Promise.reject(error);
// });

export default {
    get:function(url,params){
        ajaxToken()
        return axios.get(url,{params: params}).then(res => res.data);
    },
    post:function(url,params){
        ajaxToken()
        return axios.post(url, params).then(res => res.data);
    },
    postForm:function(url,params){
        ajaxToken()
        return axios({url: url, method: 'post', data: params,
            transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => res.data);
    },
    put:function(url,params){
        ajaxToken()
        return axios.put(url, params).then(res => res.data);
    },
    putForm:function(url,params){
        ajaxToken()
        return axios({url: url, method: 'put', data: params,
            transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => res.data);
    },
    delete:function(url,params){
        ajaxToken()
        return axios.delete(url, params).then(res => res.data)
    },
    deleteForm:function(url,params){
        ajaxToken()
        return axios({url: url, method: 'delete', data: params,
            transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => res.data);
    },
}









