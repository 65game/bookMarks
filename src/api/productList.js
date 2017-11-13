import ajax from './ajax';

/*
* 产品列表API LHW 2017/3/15
* success & error
* http://dev.deelon.net/wiki/doku.php?id=products:hxwxd:hlwxd_0.8.0
* */

const riskManagerApi ='/dlbiz/risk'; //定义风控API前缀
const directoryPath_list ='/dlsys/portal/console/sys/dic';  //数字字典目录ULR
export default {
    //产品列表查询
    productList_get:function(params){
        return ajax.get(riskManagerApi+'/product/list',params);
    },
    //产品更新接口
    productList_put:function(params){
        return ajax.put(riskManagerApi+'/product',params)
    },
    //产品添加
    productList_post:function(params){
        return ajax.post(riskManagerApi+'/product',params)
    },
    //产品详情接口
    productInfo_getById:function(id){    //示例：/product/2/info
        return ajax.get(riskManagerApi+'/product/'+id+'/info');
    },


    //产品规则模型配置接口
    instanceList_get:function(params){   //产品风控规则列表查询接口
        return ajax.get(riskManagerApi+'/rule/instance/list',params);
    },
    //已发布风控规则列表查询 3/29
    releaseList_get:function(params){   //产品风控规则列表查询接口
        return ajax.get(riskManagerApi+'/rule/instance/release/list',params);
    },
    //产品规则重置接口
    instanceReset:function(params){
        return ajax.putForm(riskManagerApi+'/rule/instance/reset',params);
    },
    ruleChoose_get:function(params){   //规则配置时选择规则列表
        return ajax.get(riskManagerApi+'/rule/choose',params);
    },
    instance_delete:function(ids){   //删除产品规则数据   /rule/instance
        return ajax.deleteForm(riskManagerApi+'/rule/instance?ids='+ids);
    },
    instance_put:function(params){
        return ajax.put(riskManagerApi+'/rule/instance',params);
    },
    instance_post:function(params){  //添加产品规则数据
        return ajax.postForm(riskManagerApi+'/rule/instance',params);
    },
    ruleInfo:function(params){  //产品规则编辑页面--获取信息(新添加) 2017/3/24
        return ajax.get(riskManagerApi+'/rule/product/'+params.id+'/info')
    },

    //产品评分模型接口 3/20 ---
    factList_get:function(params){ //查询
        return ajax.get(riskManagerApi+'/fact/list/product',params);
    },
    //查询已发布产品评分模型列表  3/30 pm
    releaseProductList_get:function(params){   //产品风控规则列表查询接口
        return ajax.get(riskManagerApi+'/fact/list/release/product',params);
    },
    //产品评分重置接口
    productReset:function(params){
        return ajax.putForm(riskManagerApi+'/fact/list/product/reset',params);
    },
    factChoose_get:function(params){ //评分模型配置时选择评分指标列表
        return ajax.get(riskManagerApi+'/fact/choose',params)
    },
   factSet_postForm:function(params){ //配置产品评分模型
       return ajax.postForm(riskManagerApi+'/fact/set',params)
   },
    //查询某指标分类的风控指标模板 --明细  /factValue/list  新版2017/3/31
    factValueListNew_get:function(params){
        return ajax.get(riskManagerApi+'/factValue/list/product',params);
    },

    //查询某指标分类的风控指标模板 --明细  /factValue/list  旧版
    factValueList_get:function(params){
        return ajax.get(riskManagerApi+'/factValue/list',params);
    },
    factProduct_delete:function(ids){ //删除产品评分指标
        return ajax.deleteForm(riskManagerApi+'/fact/product/?ids='+ids);
    },
    factProduct_put:function(params){ //更新~明细
        return ajax.put(riskManagerApi+'/factValue/product',params);
    },

    factProductUpdate_put:function(params){ //更新产品评分指标
        return ajax.putForm(riskManagerApi+'/fact/product',params);
    },


    //评分结果（等级）设置接口(查询/新增/编辑) 3/20
    gradelevel_get:function(params){
        return ajax.get(riskManagerApi+'/gradelevel/grade/list',params);
    },
    gradelevel_post:function(params){ //新增
        return ajax.post(riskManagerApi+'/gradelevel',params);
    },
    gradelevel_update:function(params){ //修改评分等级
        return ajax.put(riskManagerApi+'/gradelevel/grade',params);
    },
    gradelevelInfo_getById:function(id){ //查询评分等级详情
        return ajax.get(riskManagerApi+'/gradelevel/'+id+'/info');
    },
    getFactInfo:function(id){ //获取指标编辑明细
        return ajax.get(riskManagerApi+'/fact/'+id+'/info');
    },

    //获取 评分策略 --从数字字典获取
    gradeResultOptions_get:function(parentPath){
        return ajax.get(directoryPath_list+'?parentPath='+encodeURIComponent(parentPath));
    },

    //决策建议结果设置
    decisionList_get:function(params){
        return ajax.get(riskManagerApi+'/decision/list',params)
    },
    decision_deleteById:function(id){  // application/x-www-form-urlencoded
        return ajax.deleteForm(riskManagerApi+'/decision?ids='+id);
    },
    decisionInfo_getById:function(id){   //查询决策建议详情 by 主键ID   示例：/decision/1/info
        return ajax.get(riskManagerApi+'/decision/'+id+'/info');
    },
    decision_put:function(params){ //更新决策建议
        return ajax.put(riskManagerApi+'/decision',params);
    },
    decision_post:function(params){ //新增决策建议
        return ajax.post(riskManagerApi+'/decision',params);
    },
    rulelist_get:function(params){ //过滤规则决策 0324
        return ajax.get(riskManagerApi+'/decision/rule/list',params);
    },
    gradelist_get:function(params){ //过滤评分决策 0324
        return ajax.get(riskManagerApi+'/decision/grade/list',params);
    },

    //额度策略设置接口 http://localhost:8080/#/linesSet?id=1
    //查询额度策略详情
    creditInfo_getById:function(id){
        return ajax.get(riskManagerApi+'/product/'+id+'/credit/info');
    },
    creditInfo_put:function(params){ //设置额度策略
        return ajax.putForm(riskManagerApi+'/product/'+params.id+'/credit',params);
    },
    productCredit_putById:function(id){
        return ajax.putForm(riskManagerApi+'/product/'+id+'/credit');
    },
    //http://dev.deelon.net/wiki/doku.php?id=products:paas:apis:hlwxd_apis_gradelevel#额度系数设置列表接口
    coelist_get:function(params){ //额度系数设置列表
        return ajax.put(riskManagerApi+'/gradelevel/coelist',params)
    },
    coeupdate_put:function(params){  //更改额度系数接口
        return ajax.put(riskManagerApi+'/gradelevel/coefficient',params)
    },
    coefficientList_get:function(params){ //额度系数设置列表
        return ajax.get(riskManagerApi+'/gradelevel/coefficient/list',params)
    }

};
