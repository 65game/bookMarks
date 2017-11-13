/*
 * 首页API 2017/6/13 lhw
 * */
import ajax from './ajax';
const riskAdminApi ='/dlbiz/risk'; //定义风控系统API前缀
export default {
    getUserBoard:function(params){ //获取用户看板数据
        return ajax.get(riskAdminApi+'/statistics/index/userBoard',params)
    },
    getVane:function(params){ //获取产品风向标数据
        return ajax.get(riskAdminApi+'/statistics/index/vane',params)
    },
    getCreditScore:function(params){ //用户信用评分分布接口
        return ajax.get(riskAdminApi+'/statistics/creditScore',params);
    },
    getDicProduct:function(){  //从数字字典获取产品
        return ajax.get('/dlsys/portal/console/sys/dic?parentPath='+encodeURIComponent("/系统目录/数据字典/风控系统/用户信用评分分布统计产品/"));
    },
    //首页-异常规则命中接口
    abnormalRuleHit:function(params){
        return ajax.get(riskAdminApi+'/statistics/abnormalRuleHit',params);
    }
};
