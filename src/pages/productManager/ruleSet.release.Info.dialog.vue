<!--规则模型配置界面 wiki接口对接 2017/3/30 PM lhw-->
<!--已发布规则列表-编辑(详情)-->
<template>
    <div>
        <el-dialog :title="editFormTtile" size="small" v-model="editFormVisible" @close="hideDialog">
            <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm" id="editForm">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="规则名称" prop="name">
                            <el-input v-model="editForm.name" name="name" placeholder="请输入规则名称" auto-complete="off" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="规则编号" prop="code">
                            <el-input v-model="editForm.code" name="code" placeholder="请输入规则编号" :disabled="true" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="归属类别" required>
                            <el-row>
                                <el-col :span="11" >
                                    <el-form-item >
                                        <el-select v-model="editForm.types" filterable placeholder="请选择所属大类" :disabled="true">
                                            <el-option v-for="item in options" :label="item.name" :value="item.id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col class="line" :span="2">-</el-col>
                                <el-col :span="11">
                                    <el-form-item>
                                        <el-select v-model="editForm.smallTypes" filterable placeholder="请选择规则子类" :disabled="true" >
                                            <el-option v-for="item in subsetoptions" :label="item.name" :value="item.id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">

                        <el-form-item label="规则状态" prop="enabled">
                            <el-radio-group v-model="editForm.enabled" :disabled="true">
                                <el-radio label="true">启用</el-radio>
                                <el-radio label="false">停用</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col :span="12">
                        <!--<el-form-item label="规则权重" prop="weight">-->
                        <el-form-item label="规则权重" prop="weight">
                            <el-input v-model="editForm.weight"  placeholder="请输入规则权重" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="规则说明" prop="notes">
                            <el-input type="textarea" v-model="editForm.notes"  placeholder="请输入规则说明" :disabled="true" resize="none"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row v-show="HShow">
                    <el-col :span="24">
                        <!--<el-form-item label="规则逻辑" required>-->
                        <el-form-item label="规则逻辑" prop="expression">
                            <v-editor :input-content="inputContent" :upload-url="uploadUrl" v-model="editForm.expression" name="expression" :disabled="true"></v-editor>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
            <!--<div slot="footer" class="dialog-footer">
                <el-button @click.native="hideDialog">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">{{btnEditText}}</el-button>
            </div>-->

        </el-dialog>

    </div>

</template>

<script>
    import { mapState } from 'vuex'
    import Editor from '../../componnets/wangEditor/Editor.vue' //引入富文本编辑器
    import rule from '../../api/ruleManager'   //引入规则API---获取规则编辑信息
    import productList from '../../api/productList' //引入产品列表API
    export default {
        components: {
            'v-editor': Editor,
        },
        data() {
            var ValidatorTypes = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择所属大类'));
                }else {
                    callback();
                }
            };
            var ValidatorNumber = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入规则编号'));
                } else if(!this.$regExp.number.test(value)){
                    callback(new Error('规则编号必须为数字值'));
                } else {
                    callback();
                }
            };
            var ValidatorWeight = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入规则权重'));
                } else if(!this.$regExp.number.test(value)){
                    callback(new Error('规则权重必须为数字值'));
                } else {
                    callback();
                }
            };
            var ValidatorExpression = (rule, value, callback) => {
                if (value === ''|| value === '<p><br></p>') {
                    callback(new Error('请输入规则逻辑'));
                } else {
                    callback();
                }
            };
            return {
                HShow:'', //设置是否显示编辑器
                inputContent: '',  // 设置编辑器原本内容
                uploadUrl: '',  // 设置编辑器图片上传地址

                imageUrl:'',
                editFormVisible: false,//编辑界面显是否显示
                editFormTtile: '新增规则',//编辑界面标题

                sid:'',
                truesid:true,
                //编辑界面数据
                types:'',
                editForm: {
                    id: 0,
                    name: '',
                    code: '',
                    expression:'',
                    smallTypes:'',
                    weight:'',
                    notes:'',
                    enabled: '',// 设置编辑器输出内容
                },
                options: [], //大类
                subsetoptions:[], //小类
                editLoading: false,
                btnEditText: '提交',

                editFormRules: { //校验规则

                    name: [
                        { required: true, message: '请输入规则名称'}
                    ],
                    code: [
                        {required: true, validator: ValidatorNumber}
                    ],
                    weight: [
                        {required: true, validator: ValidatorWeight}
                    ],
                    types: [
                        { required: true, message: '请选择所属大类'}
                    ],
                    smallTypes: [
                        { required: true, message: '请选择规则子类'}
                    ],
                    enabled: [
                        { required: true, message: '请选择规则状态' }
                    ],
                    expression:[
                        {required: true, validator:ValidatorExpression}
                    ],
                    notes:[
                        { mim:0, max:200, message: '规则说明在200个文字内'}
                    ]

                }
            };
        },
        watch: {
            'editForm.types'(curVal,oldVal){
                if(curVal==''){
                    return;
                }else{
                    this.editForm.smallTypes='';
                    this.getsmallTypesoptions(curVal);
                }
            },
            'editForm.expression'(curVal,oldVal){
                if(curVal=='<p><br></p>'){
                    return;
                }else{
                    var _this = this;
                    _this.editForm.expression=curVal;
                    setTimeout(() =>{
                        _this.$refs.editForm.validateField( 'expression');
                },1)
                }

            }

        },
        created(){
            this.$bus.$off('H_ruleSet_releaseInfo');
            this.$bus.$on('H_ruleSet_releaseInfo', (title,data) => {
                this.ruleDialogShow(title,data);
             });
            this.HShow = this.RuleSetting;
        },
        methods: {
            hideDialog(){
               this.editFormVisible = false;
                setTimeout(() =>{
                    this.$refs.editForm.resetFields();
                this.inputContent='<p><br></p>';
                this.editForm.expression='<p><br></p>';
                },100)

            },
            //显示dialog模态框
            ruleDialogShow(title,data){
                this.editFormVisible = true;
                this.editFormTtile = title;
                if(data.id){
                    this.reload(data);
                }
            },
            reload(data){
                var _this = this;
                //获取规则编辑信息
                productList.ruleInfo(data).then((res) => {
                    this.editForm = res;
                    this.inputContent=res.expression;
                    this.truesid=true;
                    this.sid = res.smallTypes;
                    this.editForm.types =parseInt(res.types);
                    this.editForm.enabled =String(res.enabled);
                //this.editForm.enabled =res.enabled;

            }).catch(function (error) {
                    _this.$Error(_this,error);
                });

            },
            getsmallTypesoptions(id){//获得归属子类别
                //debugger;
                var _this = this;
                var params = {
                    type:'RULE',
                    parentId:id
                }
                rule.getoTypesptions(params).then(res=>{
                    if(res.code=="-1"){
                    _this.$notify({
                        title: '提示',
                        message: res.msg,
                        type: 'error'
                    });
                }else{
                    _this.subsetoptions = res;
                }
                if(_this.sid&&_this.truesid){
                    _this.truesid=false;
                    _this.editForm.smallTypes =parseInt(_this.sid);
                }
            })
            .catch(function (error) {
                    _this.$Error(_this,error);
                })
            },
            getoTypesptions(){//获得归属类别
                var params = {
                    type:'RULE',
                    parentId:'-1'
                }
                rule.getoTypesptions(params).then(res=>{
                    if(res.code=="-1"){
                    this.$notify({
                        title: '提示',
                        message: res.msg,
                        type: 'error'
                    });
                }else{
                    this.options = res;
                }

            }).catch(function (error) {
                    this.$Error(this,error);
                })
            },
            //编辑
            editSubmit: function () {
                var _this = this;

                _this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        _this.editLoading = true;
                        _this.btnEditText = '提交中';

                        //编辑
                        var params = {
                            id: _this.editForm.id,
                            name: _this.editForm.name, //规则名称
                            expression: _this.editForm.expression, //逻辑表达式
                            notes:_this.editForm.notes, //规则说明
                            weight:_this.editForm.weight, //权重
                            enabled: _this.editForm.enabled //是否启用
                        };
                        productList.instance_put(params).then((res) => {
                            _this.editLoading = false;
                        _this.btnEditText = '提交';
                        _this.editFormVisible = false;
                        _this.$message({
                            message: "编辑成功！",
                            type: 'success'
                        });
                        _this.$bus.$emit('H_ruleSetList_reload');
                    }).catch(function (error) {
                            _this.editLoading = false;
                            _this.btnEditText = '提交';
                            _this.$Error(_this,error);
                        });


                    }
                });

            }
        },
        mounted() {
            this.getoTypesptions();
        },
        computed: {
            ...mapState([
                    'RuleSetting'
                ])
    },
    };
</script>

<style scoped>
    .line{ text-align: center; font-size: 14px;}
</style>
