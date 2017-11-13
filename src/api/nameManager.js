import ajax from './ajax';

var nameManagerApi ='/dlbiz/risk';
//模型中心>名单管理
export default {

    //查询个人黑名单接口
    personblack_get:function(params){
        return ajax.get(nameManagerApi+'/personblackwhite/person/black/list',params);
    },
    //启用停用个人黑名单接口
    personblack_disabled:function(params){
        return ajax.putForm(nameManagerApi+'/personblackwhite/person/black/disabled',params);
    },

    //个人黑名单转白
    blackToWhite_post:function(params){
        return ajax.postForm(nameManagerApi+'/personblackwhite/person/blackToWhite',params);
    },


    //查询企业黑名单接口
    companyblack_get:function(params){
        return ajax.get(nameManagerApi+'/blackwhite/company/black/select',params);
    },

    submit:function(params){
        return ajax.postForm(nameManagerApi,params);
    },

    //白名单管理
    //查询个人白名单接口
    personwhite_get:function(params){
        return ajax.get(nameManagerApi+'/personblackwhite/person/white/list',params);
    },

    //增加个人白名单接口
    personwhite_add:function(params){
        return ajax.post(nameManagerApi+'/personblackwhite/person/white',params);
    },
    //更改个人白名单接口
    personwhite_update:function(params){
        return ajax.put(nameManagerApi+'/personblackwhite/person/white',params);
    },

    //启用停用个人白名单接口
    personwhite_disabled:function(params){
        return ajax.putForm(nameManagerApi+'/personblackwhite/person/white/disabled',params);
    },

    //个人白名单拉黑
    person_whiteToBlack_post:function(params){
        return ajax.postForm(nameManagerApi+'/personblackwhite/person/whiteToBlack',params);
    },

    //普通用户查询接口
    pnormallist_get:function(params){
        return ajax.get(nameManagerApi+'/pnormallist/list',params);
    },

    //普通用户查询接口--更新
    pnormallist_put:function(params){
        return ajax.put(nameManagerApi+'/pnormallist/update',params);
    },
    //普通用户转黑白名单
    pnormallist_change:function(params){
        return ajax.putForm(nameManagerApi+'/pnormallist',params);
    },
};



