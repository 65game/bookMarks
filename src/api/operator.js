import ajax from './ajax';
export default {
    getList:function(params){
        return ajax.postForm('/dlsys/portal/console/operator/findAll',params)
    },
    editInfo:function(params){
        return ajax.postForm('/dlsys/portal/console/operator/',params)
    },
    lock:function(params){
        return ajax.put('/dlsys/portal/console/group/lockOperators/'+params.id,null);
    },
    unlock:function(params){
        return ajax.put('/dlsys/portal/console/group/unlockOperators/'+params.id,null);
    },
    add:function(params){
        return ajax.postForm('/dlsys/portal/console/operator/',params)
    }
};
