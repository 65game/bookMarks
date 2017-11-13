/*
 * http://dev.deelon.net/wiki/doku.php?id=products:paas:apis:hlwxd_apis_statistics#风险汇总接口
 * */
import ajax from './ajax';
const riskAdminApi ='/dlbiz/risk'; //定义风控系统API前缀
export default {
    getSummary:function(params){ //风险汇总接口
        return ajax.get(riskAdminApi+'/statistics/risk/summary',params)
    },
    getList:function(params){ //风险汇总统计列表接口
        return ajax.get(riskAdminApi+'/statistics/risk/list',params)
    },
    export:function(beginDate,endDate){
        window.location.href = riskAdminApi+'/statistics/risk/list/export?beginDate='+beginDate+'&endDate='+endDate;
        return false;
    }
};
