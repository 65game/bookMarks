import ajax from './ajax';
export default {
    getList:function(params){
        return ajax.postForm('/dlsys/portal/console/role/findAll',params)
    },
    addrole:function(params){
        return ajax.postForm('/dlsys/portal/console/role',params)
    },
    delrole:function(params){
        return ajax.delete('/dlsys/portal/console/role/'+params.id,)
    },
    getMembers:function(id,params){
        return ajax.postForm('/dlsys/portal/console/operator/findAll?roleId='+id,params)
    },
    getroleMembers:function(id,params){
        return ajax.get('/dlsys/portal/console/operator/findAll/notEqualRoleId?roleId='+id,params)
    },
    addroleMembers:function(id,params){
        return ajax.post('/dlsys/portal/console/role/'+id+'/operators/'+params)
    },
    delroleMembers:function(id,params){
        return ajax.delete('/dlsys/portal/console/role/'+id+'/operators/'+params)
    },
    getTreeMenu:function(id){
        return ajax.get('/dlsys/portal/console/access/role/tree/'+id+'/')
    },
    saveRoleTreeMenu:function(id,params){
        return ajax.postForm('/dlsys/portal/console/access?role.id='+id,params)
    },
    delTreeMenu:function(id){
        return ajax.delete('/dlsys/portal/console/assets/'+id)
    }


};
