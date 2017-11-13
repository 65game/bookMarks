import ajax from './ajax';
export default {
    getProperty:function(params){ //获取引擎类中属性接口
        return ajax.get('/dlbiz/risk/rule/employeeLoanFact/property',params)
    },
    getLogic:function(params){ //获取属性对应处理逻辑接口
        return ajax.get('/dlbiz/risk/rule/employeeLoanFact/property/logic',params)
    },

    getResultType:function(params){ //获取结果类别接口
        return ajax.get('/dlbiz/risk/rule/employeeLoanFact/resultType',params)
    },
    getResultTypeWay:function(params){ //获取处理结果方式的数据接口
        return ajax.get('/dlbiz/risk/rule/employeeLoanFact/resultTypeWay',params)
    },

};
