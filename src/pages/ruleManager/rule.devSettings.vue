<template>
	<section>
        <br>
        <!--<div class="rule-title">规则触发条件 <el-button type="primary" icon="plus" @click="addParents">添加</el-button></div>-->
        <div class="rule-title"> <el-button type="primary" icon="plus" @click="addParents" size="small">添加</el-button></div>

        <template v-for="(item,index) in sorceData">
            <template v-if="item.show">
                <div class="rule-condition">
                    <el-switch
                            v-model="item.value3"
                            off-color="#13ce66"
                            on-color="#20a0ff"
                            off-text="或"
                            on-text="与"
                            on-value="&&"
                            off-value="||">
                    </el-switch>
                </div>
            </template>

            <div class="rule-row clearfix">
                <div class="rule-box">
                    <!--start rule-parents-->
                    <div class="rule-parents">
                    <span class="rule-span1">
                    <!--<label>条件一：</label>-->
                    <el-select v-model="item.select1" filterable placeholder="请选择" class="rule-select" @change="changeSelect1(index)">
                       <!-- <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>-->
                        <el-option-group
                                v-for="group in options"
                                :key="group.label"
                                :label="group.label">
                            <el-option
                                    v-for="item in group.options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-option-group>
                    </el-select>
                    </span>

                    <span class="rule-span2">
                        <!--<label>条件二：</label>-->
                        <el-select v-model="item.select2" filterable placeholder="请选择" class="rule-select">
                            <el-option
                                    v-for="item in item.select2Data"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <template v-if="item.inputShow">
                            <el-input v-model="item.input" placeholder="请输入" style="width: 150px; margin-left: 20px;"></el-input>
                        </template>

                    </span>
                    </div>
                    <!--end rule-parents-->


                    <template v-if="item.child.length">

                        <!--start rule-child-->
                            <template v-for="(item2,index2) in item.child">

                                <template v-if="item2.show">
                                    <div class="rule-condition">
                                        <el-switch
                                                v-model="item2.value3"
                                                off-color="#13ce66"
                                                on-color="#20a0ff"
                                                off-text="或"
                                                on-text="与"
                                                on-value="&&"
                                                off-value="||">
                                        </el-switch>
                                    </div>
                                </template>


                                <div class="rule-child">
                                <span class="rule-span1">
                                <!--<label>条件一：</label>-->
                                <el-select v-model="item2.select1" filterable placeholder="请选择" class="rule-select" @change="changeSelect2(index,index2)">
                                    <!--<el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>-->
                                    <el-option-group
                                            v-for="group in options"
                                            :key="group.label"
                                            :label="group.label">
                                        <el-option
                                                v-for="item in group.options"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-option-group>
                                </el-select>
                                </span>

                                <span class="rule-span2">
                                    <!--<label>条件二：</label>-->
                                    <el-select v-model="item2.select2" filterable placeholder="请选择" class="rule-select">
                                        <el-option
                                                v-for="item in item2.select2Data"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <template v-if="item2.inputShow">
                                        <el-input v-model="item2.input" placeholder="请输入" style="width: 150px; margin-left: 20px;"></el-input>
                                    </template>

                                </span>
                                <span>
                                     <i class="el-icon-minus icon-action" @click="delChild(index,index2)"></i>
                                </span>
                                </div>
                            </template>

                        <!--end rule-child-->
                    </template>

                </div>

                <div class="rule-right">
                 <span class="rule-action">
                    <i class="el-icon-plus icon-action" @click="addChild(index)"></i>
                    <i class="el-icon-minus icon-action" @click="delParents(index)"></i>
                 </span>
                </div>

            </div>
        </template>



     <!--   <template v-if="sorceData.length > 0">
            <div>
                <el-button type="primary" icon="circle-check" @click="save">保存</el-button>
            </div>
        </template>-->

	</section>
</template>

<script>
    import devSettingsApi from '../../api/rule.devSettings'
    export default {
        components: {
           // RuleList,RuleDialog
        },
        props:['devData'],
        data() {
            return {
                options:[],
                value: '',
                options2:[],
                value2: '',
                input:'',
                value3:'',
                sorceData:[]

            }
        },
        watch: {
            /*'item.select1'(curVal,oldVal){
                console.log('item.select1')
                console.log(curVal)
                console.log(oldVal)
                if(curVal==''){
                    return;
                }else{

                }
            }*/

        },
        methods: {
            addParents(){
                //this.$emit('sendLonding',true);
               var len =  this.sorceData.length;
               if(len >= 1){
                   this.sorceData.push({
                       show:true,
                       value3:'&&',
                       select1:'',
                       select2:'',
                       select2Data:[], // 第2个下拉框数据
                       input:'',
                       inputShow:true,
                       child:[],
                   })
               }else{
                   this.sorceData.push({
                       show:false,
                       value3:'&&',
                       select1:'',
                       select2:'',
                       select2Data:[], // 第2个下拉框数据
                       input:'',
                       inputShow:true,
                       child:[],
                   })
               }
            },
            delParents(index){
                if(index == 0){
                    if(this.sorceData.length >1){
                        this.sorceData[1].show = false;
                    }
                }
                this.sorceData.splice(index,1);
            },
            addChild(index){
                this.sorceData[index].child.push({
                    show:true,
                    select1:'',
                    select2:'',
                    select2Data:[], // 第2个下拉框数据
                    input:'',
                    inputShow:true,
                    value3:'&&'
                })
            },
            delChild(i,j){
                this.sorceData[i].child.splice(j,1);
            },

            toChange(){
                var str = '';
                for(var i = 0,len = this.sorceData.length; i < len; i++){

                    if(i == 0){
                        var first = this.sorceData[0].select1 +' ' + this.sorceData[0].select2 + ' '+ this.sorceData[0].input;
                        var firstChild = '';
                        if(this.sorceData[0].child.length){
                            for(var k in this.sorceData[0].child){
                                firstChild += this.sorceData[0].child[k].value3 +' ' + this.sorceData[0].child[k].select1 + ' '+ this.sorceData[0].child[k].select2 + ' '+ this.sorceData[0].child[k].input;
                            }
                        }
                        first = '(' + first + firstChild + ')';
                        str += first;
                    }

                    if(i > 0){
                        var line = this.sorceData[i].select1 + ' '+ this.sorceData[i].select2 +' ' + this.sorceData[i].input;
                        var lineChild = '';
                        var child = this.sorceData[i].child;
                        if(child.length){
                            for(var j = 0; j<child.length; j++){
                                lineChild += child[j].value3 + child[j].select1 + child[j].select2 + child[j].input;
                            }
                        }
                        line =  line + lineChild;

                        var _and = this.sorceData[i].value3;
                        str += _and +  '('+line + ')';

                    }


                }
                return str;
            },

            validate(){ //返回 true 为验证通过
                var result = true;
                if(this.sorceData && this.sorceData.length){
                    for(var i = 0,len = this.sorceData.length; i < len; i++){
                    if(this.sorceData[i].select1 == '' || this.sorceData[i].select2 === '' || (this.sorceData[i].inputShow==true && this.sorceData[i].input =='')){
                        result =  false;
                        break;
                    }
                    var child = this.sorceData[i].child;
                    if(child.length > 0){
                        for(var j = 0; j< child.length; j++){
                            if(child[j].select1 == '' || child[j].select2 === '' || (child[j].inputShow == true && child[j].input == '')){
                                result =  false;
                            }
                        }
                    }
                }
                }
                
                return result
            },

            save(){

                if(this.validate()){
                    //alert(this.toChange())
                }else{
                    this.$message.warning('请检查数据完整性');
                }

            },

            //获取引擎类中属性接口
            getProperty(){
                var _this = this;
                devSettingsApi.getProperty().then(res =>{
                    var resultArr = [];
                    for(var i= 0,len = res.length; i< len; i++){
                        var type = res[i].type;
                        var facts = res[i].facts;
                        var obj = {
                            label:type,
                            options:[]
                        };
                        for(var j = 0; j< facts.length; j++){
                            for(var k in facts[j]){
                                //obj.options.push({label:facts[j][k],value:k});
                                obj.options.push({value:facts[j][k],label:k});
                            }
                        }
                        resultArr.push(obj);
                    }


                    this.options = resultArr;
                }).catch(error =>{
                        _this.$Error(_this,error)
                });


            },
            //获取属性对应处理逻辑接口
            getLogic(params){
                var _this = this;
                devSettingsApi.getLogic(params).then(res =>{
                var arr  = [];
                for(var k in res){
                    //var obj =  {value:k,label:res[k]};
                    var obj =  {label:k,value:res[k]};
                    arr.push(obj);
                }

                 _this.options2 = arr;
                }).catch(error =>{
                        _this.$Error(_this,error)
                });
             },
            getLogicFn1(params,index){  //处理一级下拉框
                var _this = this;
                devSettingsApi.getLogic(params).then(res =>{
                    var arr  = [];
                for(var k in res){
                    //var obj =  {value:k,label:res[k]};
                    var obj =  {label:k,value:res[k]};
                    arr.push(obj);
                }
                _this.sorceData[index].select2Data = arr;

                //判断第二个下拉框的值是否包含，是 和否 选项,若是，则第三个input值不显示
                if(arr[0].label == '是' || arr[0].label =='否'){
                    //alert('要隐藏了'+index)
                    _this.sorceData[index].inputShow = false;
                    _this.sorceData[index].input = '';
                }else{
                    _this.sorceData[index].inputShow = true;
                }

            }).catch(error =>{
                    _this.$Error(_this,error)
            });
            },


            getLogicFn2(params,index1,index2){  //处理二级下拉框
                var _this = this;
                devSettingsApi.getLogic(params).then(res =>{
                    var arr  = [];
                for(var k in res){
                    //var obj =  {value:k,label:res[k]};
                    var obj =  {label:k,value:res[k]};
                    arr.push(obj);
                }
                _this.sorceData[index1].child[index2].select2Data = arr;
                //判断第二个下拉框的值是否包含，是 和否 选项,若是，则第三个input值不显示
                if(arr[0].label == '是' || arr[0].label =='否'){
                    //alert('要隐藏了'+index)
                    _this.sorceData[index1].child[index2].inputShow = false;
                    _this.sorceData[index1].child[index2].input = '';
                }else{
                    _this.sorceData[index1].child[index2].inputShow = true;
                }

            }).catch(error =>{
                    _this.$Error(_this,error)
            });
            },


            changeSelect1(index){
                var selectVal = this.sorceData[index].select1;
                this.sorceData[index].select2 = '';
                if(selectVal){
                    this.getLogicFn1({property:selectVal},index)
                }
            },
            changeSelect2(i,j){
                var selectVal = this.sorceData[i].child[j].select1;
                this.sorceData[i].child[j].select2 = '';
                if(selectVal){
                    this.getLogicFn2({property:selectVal},i,j)
                }
            },

            returnSubmit(callback){
                if(typeof callback =='function'){
                    callback(this.sorceData,this.validate())
                }
            },

            returnChangeData(callback){
                if(this.validate()){
                    if(typeof callback =='function'){
                        callback(this.toChange())
                    }
                }
            },

            setData(data){
                if(data && data.length > 0){
                    this.sorceData =  data;
                }
            },
            getData(){
                if(Array.isArray(this.sorceData) && this.sorceData.length > 0){
                    return this.sorceData;
                }else{
                    return [];
                }
            }


        },
        created(){
            this.$bus.$off('ruleDevSettings');
            this.$bus.$on('ruleDevSettings',(callback) =>{
                this.returnSubmit(callback);
            })

            this.$bus.$off('ruleDevSettingsChangeData');
            this.$bus.$on('ruleDevSettingsChangeData',(callback) =>{
                this.returnChangeData(callback);
            })

        },
        mounted(){
            this.getProperty();
           // debugger;
            if(this.devData && this.devData.length > 0){
                this.sorceData =  this.devData;
            }
            //this.getLogic({property:'industryDevelopmentStatus'});



        }
    }
</script>

<style scoped>
    .rule-title{margin-bottom: 15px;}
    .rule-row{position: relative; margin-bottom: 15px; }
    .rule-row .rule-box{float: left; width: 850px; border: 1px dashed #20a0ff; padding: 10px; }
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