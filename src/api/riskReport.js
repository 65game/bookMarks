import ajax from './ajax';

/*
* 客户分析报告API LHW 2017/3/27
* success & error
* http://dev.deelon.net/wiki/doku.php?id=products:hxwxd:hlwxd_apis_risk
* */

const riskManagerApi ='/dlbiz/risk'; //定义风控API前缀
export default {
    riskReportList_get:function(params){   //获取所有的风控报告列表
        return ajax.get(riskManagerApi+'/riskReport/list',params);
    },
    riskmodel_get:function(params){   //获取个人风控报告
        return ajax.get(riskManagerApi+'/riskmodel/report',params);
    },
    getPersonReport:function(id){  //获取个人风控报告 2017/6/6
        return ajax.get(riskManagerApi+'/riskReport?id='+id);
    },
    simulate:function(params){
        return ajax.post(riskManagerApi+'/riskmodel/report/simulate',params)
    },
    exportPdf:function(id){ //导出pdf
        if(id){
            window.location.href = riskManagerApi+'/riskReport/download?reportId='+id;
            return false;
        }
    },
    ajaxPdf:function(id){
        return ajax.get(riskManagerApi+'/riskReport/download?reportId='+id);
    },
};
