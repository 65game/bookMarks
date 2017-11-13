<template>
	<section>
        <div class="rule-title">规则触发条件 <el-button type="primary" icon="plus" @click="addParents">添加</el-button></div>


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
                    <label>条件一：</label>
                    <el-select v-model="item.select1" placeholder="请选择" class="rule-select">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    </span>

                    <span class="rule-span2">
                        <label>条件二：</label>
                        <el-select v-model="item.select2" placeholder="请选择" class="rule-select">
                            <el-option
                                    v-for="item in options2"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-input v-model="item.input" placeholder="请输入" style="width: 150px;"></el-input>
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
                                <label>条件一：</label>
                                <el-select v-model="item2.select1" placeholder="请选择" class="rule-select">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                                </span>

                                <span class="rule-span2">
                                    <label>条件二：</label>
                                    <el-select v-model="item2.select2" placeholder="请选择" class="rule-select">
                                        <el-option
                                                v-for="item in options2"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <el-input v-model="item2.input" placeholder="请输入" style="width: 150px;"></el-input>
                                </span>
                                <span>
                                     <i class="el-icon-delete icon-action" @click="delChild(index,index2)"></i>
                                </span>
                                </div>
                            </template>

                        <!--end rule-child-->
                    </template>

                </div>

                <div class="rule-right">
                 <span class="rule-action">
                    <i class="el-icon-plus icon-action" @click="addChild(index)"></i>
                    <i class="el-icon-delete icon-action" @click="delParents(index)"></i>
                 </span>
                </div>

            </div>
        </template>



        <template v-if="sorceData.length > 0">
            <div>
                <el-button type="primary" icon="circle-check" @click="save">保存</el-button>
            </div>
        </template>

	</section>
</template>

<script>
    import RuleList from './rule.list.vue'
    import RuleDialog from './rule.dialog.vue'
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
                    {
                        show:false,
                        value3:'&&',
                        select1:'',
                        select2:'',
                        input:'',
                        child:[],

                    },
                    {
                        show:true,
                        value3:'&&',
                        select1:'',
                        select2:'',
                        input:'',
                        child:[
                            {
                                show:true,
                                select1:'',
                                select2:'',
                                input:'',
                                value3:'&&'
                            },
                            {
                                show:true,
                                select1:'',
                                select2:'',
                                input:'',
                                value3:'&&'
                            }
                        ]

                    }

                ]

            }
        },
        methods: {
            addParents(){
               var len =  this.sorceData.length;
               if(len >= 1){
                   this.sorceData.push({
                       show:true,
                       value3:'&&',
                       select1:'',
                       select2:'',
                       input:'',
                       child:[],
                   })
               }else{
                   this.sorceData.push({
                       show:false,
                       value3:'&&',
                       select1:'',
                       select2:'',
                       input:'',
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
                    input:'',
                    value3:'&&'
                })
            },
            delChild(i,j){
                this.sorceData[i].child.splice(j,1);
            },

            toChange(data){
                var str = '';
                for(var i = 0,len = this.sorceData.length; i < len; i++){

                    if(i == 0){
                        var first = this.sorceData[0].select1 + this.sorceData[0].select2 + this.sorceData[0].input;
                        var firstChild = '';
                        if(this.sorceData[0].child.length){
                            for(var k in this.sorceData[0].child){
                                firstChild += this.sorceData[0].child[k].value3 + this.sorceData[0].child[k].select1 + this.sorceData[0].child[k].select2 + this.sorceData[0].child[k].input;
                            }
                        }
                        first = '(' + first + firstChild + ')';
                        str += first;
                    }

                    if(i > 0){
                        var line = this.sorceData[i].select1 + this.sorceData[i].select2 + this.sorceData[i].input;
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

            save(){

            }

        }
    }
</script>

<style scoped>
    .rule-title{margin-bottom: 15px;}
    .rule-row{position: relative; margin-bottom: 15px; }
    .rule-row .rule-box{float: left; width: 850px; border: 1px solid #ddd; padding: 10px; }
    .rule-box .rule-parents{margin-bottom: 10px;}
    .rule-condition{ margin: 10px auto;}
    .rule-box .rule-child{margin-bottom: 10px; margin-left: 35px;}
    .rule-box .rule-span1{margin-right: 25px;}

    .rule-row .rule-right{float: left; width: 100px;}
    .rule-select{ width: 220px;}
    .icon-action {margin:  0 5px; font-size: 20px; color: #8492a6; cursor: pointer;}
    .el-icon-plus:hover{color: #20a0ff;}
    .el-icon-delete:hover{color: #ff4949;}
</style>