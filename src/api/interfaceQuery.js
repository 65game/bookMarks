
import ajax from './ajax';
const riskAdminApi ='/dlbiz/risk'; //定义风控系统API前缀
export default {
    getList:function(params){ //列表
        return ajax.get(riskAdminApi+'/statistics/interfaceCallList',params)
    },
    getInfo:function(params){ //明细
        return ajax.get(riskAdminApi+'/statistics/interfaceCallInfo',params)
    },
    export:function(params){
        var ruleType =params && params.ruleType ? params && params.ruleType : '';
        var smallRuleType =params && params.smallRuleType ? params && params.smallRuleType : '';
        var beginDate =params && params.beginDate ? params && params.beginDate : '';
        var endDate =params && params.endDate ? params && params.endDate : '';
        window.location.href = riskAdminApi+'/statistics/ruleAnalysis/abnormal/list/export?beginDate='+beginDate+'&endDate='+endDate+'&ruleType='+ruleType+'&smallRuleType='+smallRuleType;
        return false;
    }
};
