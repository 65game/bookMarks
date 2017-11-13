import ajax from './ajax';
export default {
    getList:function(params){
        return ajax.get('/dlbiz/risk/bizType/list',params);
    },
    add:function(params){
        return ajax.post('/dlbiz/risk/bizType',params);
    },
    edit:function(params){
        return ajax.putForm('/dlbiz/risk/bizType',params);
    },
    del:function(params){
        return ajax.deleteForm('/dlbiz/risk/bizType?ids='+params);
    }
};



