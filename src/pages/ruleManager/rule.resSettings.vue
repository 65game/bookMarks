<template>
	<section>
        <br>
        <div class="rule-title"> <el-button type="primary" icon="plus" @click="addParents" size="small">添加</el-button></div>

        <template v-for="(item,index) in sorceData">

            <div class="rule-row clearfix">
                <div class="rule-box">
                    <!--start rule-parents-->
                    <div class="rule-parents">
                    <span class="rule-span1">
                    <el-select v-model="item.select1" placeholder="请选择" class="rule-select" @change="changeSelect1(index)">
                        <el-option
                                v-for="item in item.select1Data"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    </span>

                    <span class="rule-span2">
                        <el-select v-model="item.select2" placeholder="请选择" class="rule-select">
                            <el-option
                                    v-for="item in item.select2Data"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </span>

                         <span class="rule-action">
                            <i class="el-icon-minus icon-action" @click="delParents(index)"></i>
                         </span>

                    </div>
                    <!--end rule-parents-->


                </div>


            </div>
        </template>

	</section>
</template>

<script>
    import devSettingsApi from '../../api/rule.devSettings'
    export default {
        components: {
           // RuleList,RuleDialog
        },
        data() {
            return {
                options:[{
                    value: 'livingYears',
                    label: '居住年限'
                }, {
                    value: 'age',
                    label: '年龄'
                }, {
                    value: 'incomes',
                    label: '收入'
                }],
                value: '',
                options2: [{
                    value: '>=',
                    label: '大于或等于'
                }, {
                    value: '<',
                    label: '小于'
                }, {
                    value: '>',
                    label: '大于'
                }],
                value2: '',
                input:'',
                value3:'',

                sorceData:[
                   /* {
                        select1:'',
                        select1Data:[],
                        select2:'',
                        select2Data:[]

                    }*/

                ]

            }
        },
        methods: {
            addParents(){
                var _this = this;
                _this.getFilterSelectData(function(arr){
                    if(arr && arr.length){
                        _this.sorceData.push({
                            select1:'',
                            select1Data:arr,
                            select2:'',
                            select2Data:[]
                        })
                    }else{
                        /*_this.sorceData.push({
                            select1:'',
                            select1Data:[],
                            select2:'',
                            select2Data:[]
                        })*/
                        _this.$message.warning('下拉框数据已经全部选择了，不能再继续添加哦')
                    }
                 });
            },
            delParents(index){
                this.sorceData.splice(index,1);
            },


            save(){


            },
            getResultType(params){
                var _this = this;
                devSettingsApi.getResultType(params).then(res =>{
                    var arr  = [];
                for(var k in res){
                    var obj =  {value:k,label:res[k]};
                    arr.push(obj);
                }
                _this.options = arr;

                _this.sorceData[0].select1Data = arr;
            }).catch(error =>{
                    _this.$Error(_this,error)
            });
            },
            getLogicFn1(params,index){  //处理一级下拉框
                var _this = this;
                devSettingsApi.getResultTypeWay(params).then(res =>{
                    var arr  = [];
                for(var k in res){
                    //var obj =  {value:k,label:res[k]};
                    var obj =  {label:k,value:res[k]};
                    arr.push(obj);
                }
                this.sorceData[index].select2Data = arr;

                _this.reloadSourceData();

            }).catch(error =>{
                    _this.$Error(_this,error)
            });
            },
            changeSelect1(index){
                var selectVal = this.sorceData[index].select1;
                this.sorceData[index].select2 = '';
                if(selectVal){
                    this.getLogicFn1({resultType:selectVal},index)
                }
            },
            //重新组装原数据
            reloadSourceData(){
                var _this = this;
                _this.getFilterSelectData(function(arr){
                   /*var arr = [
                       {label:'A',value:'A'},
                       {label:'B',value:'B'},
                   ]*/
                   if(arr && arr.length){
                       for(var i = 0,len = _this.sorceData.length; i<len; i++){
                           (function(i){
                                var selectVal = _this.sorceData[i].select1;
                                if(selectVal){
                                  _this.sorceData[i].select1Data = [{label:selectVal,value:selectVal}].concat(arr);
                                }else{
                                    _this.sorceData[i].select1Data = arr;
                                }

                           })(i)
                       }
                   }
                })
            },
            //根据select选中值过滤数据
            getFilterSelectData(callbak){
                var _this = this;
                var selectedArr = [];
                for(var i = 0,len = this.sorceData.length; i<len; i++){
                    if(this.sorceData[i].select1){
                        selectedArr.push(this.sorceData[i].select1);
                    }
                }
                var params = {
                    resultType:selectedArr.length ? selectedArr.join(',') :''
                }
                devSettingsApi.getResultType(params).then(res =>{
                    var arr  = [];
                    for(var k in res){
                        var obj =  {value:k,label:res[k]};
                        arr.push(obj);
                    }
                    if(typeof callbak =='function'){
                        callbak(arr);
                    }
                }).catch(error =>{
                        _this.$Error(_this,error);
                });
            },
            getResult(callback){
                var resultArr = [];
                for(var i = 0,len = this.sorceData.length;i <len; i++){
                    resultArr.push({select1:this.sorceData[i].select1,select2:this.sorceData[i].select2})
                }
                //return resultArr;
                if(typeof callback == 'function'){
                    callback(resultArr)
                }
            }
        },
        created(){
            this.$bus.$off('getRuleResSettinfs');
            this.$bus.$on('getRuleResSettinfs', (callback) => {
                this.getResult(callback);
            });
        },
        mounted(){
            this.getResultType({resultType:'黑名单'});

        }
    }
</script>

<style scoped>
    .rule-title{margin-bottom: 15px;}
    .rule-row{position: relative; margin-bottom: 15px; }
    .rule-row .rule-box{float: left; width: 850px; padding: 0px; }
    .rule-box .rule-parents{margin-bottom: 10px;}
    .rule-condition{ margin: 10px auto;}
    .rule-box .rule-child{margin-bottom: 10px;/* margin-left: 35px;*/}
    .rule-box .rule-span1{margin-right: 25px;}

    .rule-row .rule-right{float: left; width: 100px;}
    .rule-select{ width: 300px;}
    .icon-action {margin:  0 5px; font-size: 15px; color: #8492a6; cursor: pointer;}
    .el-icon-plus:hover{color: #20a0ff;}
    .el-icon-minus:hover{color: #ff4949;}
</style>