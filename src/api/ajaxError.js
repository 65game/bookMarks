import user from '../api/user'
export default{
    install(Vue){
        Vue.prototype.$Error=function(obj,error){
            var _this = obj;
            if(typeof error.response !=="object") return;
            let state = error.response.status;
            if (state == 401) {//Token过期
                user.delInfo();
                _this.$alert('系统用户登录超时，请重新登录！', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        _this.$router.replace('/login');
                    }
                });
            }else if (state == 403) {//没有相应权限
                _this.$message({
                    message: '该系统用户没有权限！',
                    type: 'error'
                });
            }
            else if (state == 400) {
                var errDate=JSON.parse(error.response.request.responseText);
                _this.$message({
                    message: errDate.msg,
                    type: 'error'
                });
            }else if(state == 415){
                _this.$message({
                    message: "请求路径或者请求参数错误！",
                    type: 'error'
                });
            }
            else{
                _this.$message({
                    message: "服务器繁忙，请稍后再试！",
                    type: 'error'
                });
            }
        }
    }
}









