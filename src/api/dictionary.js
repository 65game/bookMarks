import ajax from './ajax';

var directoryPath_tree ='/dlsys/portal/console/sys/dic/directory';
var directoryPath_tree_search ='/dlapi/cms/directory/search';  //树查询
var directoryPath_list ='/dlsys/portal/console/sys/dic';  //列表

//系统数据>数字字典模块
export default {

    //获取tree数据（注：接口返回数组，而非树结构数据）
    getTree:function(params){
        return ajax.get(directoryPath_tree_search+'?pageNum=1&pageSize=1000&column=&condition=&queryParams='+JSON.stringify(params));
    },
    //加载子节点(异步加载)
    loadNode:function(params){
        return ajax.get(directoryPath_tree_search+'?pageNum=1&pageSize=1000&column=&condition=&queryParams='+JSON.stringify(params.obj)+'&id='+params.id);
    },

    //删除tree
    delTree:function(id){
        return ajax.delete(directoryPath_tree+'/' + id);
    },
    //保存tree /CA
    subTree:function(params){
        return ajax.postForm(directoryPath_tree,params);
    },

    //右侧列表接口
    //获取列表数据
    getList:function(parentPath){
        return ajax.get(directoryPath_list+'?parentPath='+encodeURIComponent(parentPath));
    },

    del:function(id){
        return ajax.delete('/dlapi/cms/sysDic/batch/'+id);
    },
    submit:function(params){
        return ajax.postForm(directoryPath_list,params);
    },

    /*
    * 系统设置 /#/settings
    * */
    //获取系统设置列表
    getSettings:function(params){
        return ajax.get('/dlapi/cms/sysDic/search',params);
    },
    getPath(type){
        if(type ==='ruleClass'){
            return '/系统目录/数据字典/风控系统/风控规则类型/';
        }else if(type =='indicatorsClass'){
            return '/系统目录/数据字典/风控系统/指标类别/';
        }else{
            return '/系统目录/数据字典/';
        }
    },

    //规则分类管理参数配置
    getConfig(type){
        if(type==='ruleClass'){
            return {
                placeholder:'请输入规则分类搜索',
                addNode:'添加规则管理顶级分类',
                addSubNode:'添加规则分类管理',
                edtNode:'编辑规则分类管理',
                delNode:'确认删除吗？',
                handleAdd_message:'请先单击选择一条规则分类再添加！'
            }
        }else if(type==='indicatorsClass'){
            return {
                placeholder:'请输入指标分类搜索',
                addNode:'添加指标管理顶级分类',
                addSubNode:'添加指标分类管理',
                edtNode:'编辑指标分类管理',
                delNode:'确认删除吗？',
                handleAdd_message:'请先单击选择一条指标分类再添加！'
            }
        }
    }
};



