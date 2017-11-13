import ajax from './ajax';

var settings_search ='/dlapi/cms/sysDic/search?column=&condition=';  //查询

//系统数据>系统设置
export default {

    //右侧列表接口
    //获取列表数据
    search:function(params){
        return ajax.get(settings_search+'?parentPath=',params);
    }
};


