/*
 * http://dev.deelon.net/wiki/doku.php?id=products:paas:apis:hlwxd_apis_statistics#产品分析表接口
 * */
import ajax from './ajax';
const riskAdminApi ='/dlbiz/risk'; //定义风控系统API前缀
export default {
    getProductAnalysis:function(params){ //产品分析表接口
        return ajax.get(riskAdminApi+'/statistics/productAnalysis',params)
    },
    export:function(params){ //产品分析表导出接口
        var name =params && params.name ? params && params.name : '';
        var beginDate =params && params.beginDate ? params && params.beginDate : '';
        var endDate =params && params.endDate ? params && params.endDate : '';
        window.location.href = riskAdminApi+'/statistics/productAnalysis/export?beginDate='+beginDate+'&endDate='+endDate+'&name='+name;
        return false;
    }
};
