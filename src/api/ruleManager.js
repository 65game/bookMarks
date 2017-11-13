import ajax from './ajax';
export default {
    getList:function(params){
        return ajax.get('/dlbiz/risk/rule/list',params)
    },
    getoTypesptions:function(params){
        return ajax.get('/dlbiz/risk/bizType/list',params)
    },
    addRule:function(params){
        return ajax.post('/dlbiz/risk/rule',params)
    },
    editRule:function(params){
        return ajax.put('/dlbiz/risk/rule',params)
    },
    getRuleInfo:function(params){
        return ajax.get('/dlbiz/risk/rule/'+params.id+'/info')
    }

};
