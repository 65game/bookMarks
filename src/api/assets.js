import ajax from './ajax';
export default {
    getTreeMenu:function(id){
        return ajax.get('/dlsys/portal/console/access/role/tree/-1/')
    },
    addTreeMenu:function(params){
        return ajax.postForm('/dlsys/portal/console/assets',params)
    },
    delTreeMenu:function(id){
        return ajax.delete('/dlsys/portal/console/assets/'+id)
    },
    editTreeMenu:function(params){
        return ajax.postForm('/dlsys/portal/console/assets',params)
    },

};
