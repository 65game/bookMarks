import ajax from './ajax';
export default {
    getInfo:function(){
        return JSON.parse(sessionStorage.getItem("user"));
    },
    delInfo:function(){
        sessionStorage.removeItem('user');

        var date = new Date(); //获取当前时间
        date.setTime(date.getTime()-10000); //将date设置为过去的时间
        document.cookie = "UserLoginToken" + "=v; expires =" +date.toGMTString();//设置cookie
    },
    saveInfo:function(data){
        sessionStorage.setItem('user', data);
    },
    login:function(params){
        return ajax.post(`/dlsys/portal/console/operator/login/`,params);
    },
    getLoginKey:function(params){
        return ajax.get(`/dlsys/portal/console/operator/getRSAPublicKey`,params);
    },
    getUserMenuList:function(id){
        return ajax.get(`/dlsys/portal/console/access/operator/tree/`+id);
    }

};
