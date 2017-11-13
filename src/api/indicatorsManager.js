import ajax from './ajax';
export default {
    getList:function(params){
        return ajax.get('/dlbiz/risk/fact/list',params)
    },
    getoTypesptions:function(params){
        return ajax.get('/dlbiz/risk/bizType/list',params)
    },
    // getoTypesptions:function(params){
    //     return ajax.get('/dlapi/cms/directory/search',params)
    // },
    add:function(params){
        return ajax.postForm('/dlbiz/risk/fact',params)
    },
    editInfo:function(params){
        return ajax.putForm('/dlbiz/risk/fact',params)
    },
    getInfo:function(params){
        return ajax.get('/dlbiz/risk/fact/'+params.id+'/info')
    },
    getDetailInfo:function(params){
        return ajax.get('/dlbiz/risk/factValue/list',params)
    },
    addFact:function(params){
        return ajax.post('/dlbiz/risk/factValue',params)
    },
    getFact:function(params){
        return ajax.get('/dlbiz/risk/factValue/'+params.id+'/info')
    },
    editFact:function(params){
        return ajax.put('/dlbiz/risk/factValue',params)
    }

};
