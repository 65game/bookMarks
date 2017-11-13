<!--新增编辑操作员界面-->
<template>
	<div>
		<el-dialog :title="editFormTtile" size="small" v-model="editFormVisible" @close="hideDialog">
			<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm" id="editForm">
				<el-row>
					<el-col :span="12">
						<el-form-item label="规则名称" prop="name">
							<el-input v-model="editForm.name" name="name" placeholder="请输入规则名称" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="规则编号" prop="code">
							<el-input v-model="editForm.code" name="code" placeholder="请输入规则编号" auto-complete="off" :disabled="inputdisabled"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="归属类别" required>
							<el-row>
								<el-col :span="11">
									<el-form-item prop="types">
										<el-select v-model="editForm.types" filterable placeholder="请选择归属类别">
											<el-option v-for="item in options" :label="item.name" :value="item.id"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col class="line" :span="2">-</el-col>
								<el-col :span="11">
									<el-form-item prop="smallTypes">
										<el-select v-model="editForm.smallTypes" filterable placeholder="请选择规则子类" >
											<el-option v-for="item in subsetoptions" :label="item.name" :value="item.id"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
							</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="规则状态" prop="enabled">
							<el-radio-group v-model="editForm.enabled">
								<el-radio label="true">启用</el-radio>
								<el-radio label="false">停用</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>

				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="规则权重" prop="weight">
							<el-input v-model="editForm.weight"  placeholder="请输入规则权重"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="规则说明" prop="notes">
							<el-input type="textarea" v-model="editForm.notes" resize="none"  placeholder="请输入规则说明"></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row v-show="RuleSetting">
					<el-col :span="24">
						<el-form-item label="规则逻辑" prop="expression">
							<v-editor :input-content="inputContent" :upload-url="uploadUrl" v-model="editForm.expression" name="expression"></v-editor>
						</el-form-item>
					</el-col>
				</el-row>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="hideDialog">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">{{btnEditText}}</el-button>
			</div>
		</el-dialog>

	</div>

</template>

<script>
    import { mapState } from 'vuex'
    import Editor from '../../componnets/wangEditor/Editor.vue'
    import rule from '../../api/ruleManager'
    import ruleConfig from '../../api/ruleConfig' //默认配置文件
    export default {
        components: {
            'v-editor': Editor,
        },
        data() {
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
                type:'',//弹窗类型
                inputContent: '',  // 设置编辑器原本内容
                uploadUrl: '',  // 设置编辑器图片上传地址

                imageUrl:'',
                editFormVisible: false,//编辑界面显是否显示
                editFormTtile: '新增规则',//编辑界面标题
				inputdisabled:false,//判断input是否可编辑

				sid:'',
				truesid:true,
                //编辑界面数据
                editForm: {
                    id: 0,
                    name: '',
                    code: '',
                    expression:'',
                    types:'',
                    smallTypes:'',
                    weight:'',
                    notes:'',
                    enabled: '',// 设置编辑器输出内容
                },
                options: [],
                subsetoptions:[],
                editLoading: false,
                btnEditText: '提交',

                editFormRules: { //校验规则
                    name: [
                        { required: true, message: '请输入规则名称'},
                        { max:20, message: '长度不能超过20个字符'}
                    ],
                    code: [
                        {required: true, validator: ValidatorNumber},
                        { max:20, message: '长度不能超过20个字符'}
                    ],
                    weight: [
                        {required: true, validator: ValidatorWeight},
                        { max:20, message: '长度不能超过20个字符'}
                    ],
                    types: [
                        { required: true, message: '请选择归属大类'}
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
            this.$bus.$off('ruleDialogShow');
            this.$bus.$on('ruleDialogShow', (title,data,type) => {
                this.inputContent='';
                this.type = type;
                this.ruleDialogShow(title,data);
            });
            //alert("created:"+this.RuleSetting);
            //this.HShow = this.RuleSetting;

        },
        methods: {
            hideDialog(){
                this.editFormVisible = false;
                setTimeout(() =>{
                    this.$refs['editForm'].resetFields();
                    this.inputContent='<p><br></p>';
                    this.editForm.expression='<p><br></p>';
                },100)
            },
            //显示dialog模态框
            ruleDialogShow(title,data){
                // this.watchtypes = this.editForm.types;
                this.inputdisabled=false;
                this.editFormTtile = title;
                this.editFormVisible = true;
                if(data.id){
                    this.reload(data);
                    this.inputdisabled=true;
                }else{ //新增--YS
                    this.inputContent = ruleConfig.expression;
                    this.editForm.expression = ruleConfig.expression;
                }
            },
            reload(data){
                var _this = this;
                rule.getRuleInfo(data).then((res) => {
                    this.editForm = res;
					this.inputContent=res.expression;
				    this.truesid=true;
                    this.sid = res.smallTypes;
					this.editForm.types =parseInt(res.types);
					this.editForm.enabled =String(res.enabled);
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
                rule.getoTypesptions(params)
					.then(res=>{
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
            //编辑 or 新增
            editSubmit: function () {
                var _this = this;

                _this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        _this.editLoading = true;
                        _this.btnEditText = '提交中';
                        if (_this.type == "add") {
                            //新增
                            var params = {
                                name: _this.editForm.name,
                                code: _this.editForm.code,
                                expression:_this.editForm.expression,
                                types:_this.editForm.types,
                                smallTypes:_this.editForm.smallTypes,
                                weight:_this.editForm.weight,
                                notes:_this.editForm.notes,
                                enabled: _this.editForm.enabled
                            };
                            rule.addRule(params).then((res) => {
                                _this.editLoading = false;
                            _this.btnEditText = '提交';
                            _this.editFormVisible = false;
                            _this.$message({
                                message: "新增成功！",
                                type: 'success'
                            });
                            _this.$bus.$emit('updataRuleList');
                        }).catch(function (error) {
                                _this.editLoading = false;
                                _this.btnEditText = '提交';
                                _this.$Error(_this,error);
                            });
                        } else if(_this.type == "edit") {
                            //编辑
                            var params = {
                                id: _this.editForm.id,
                                name: _this.editForm.name,
                                code: _this.editForm.code,
                                expression:_this.editForm.expression,
                                types:_this.editForm.types,
                                smallTypes:_this.editForm.smallTypes,
                                weight:_this.editForm.weight,
                                notes:_this.editForm.notes,
                                enabled: _this.editForm.enabled
                            };
                            rule.editRule(params).then((res) => {
                                _this.editLoading = false;
                            _this.btnEditText = '提交';
                            _this.editFormVisible = false;
                            _this.$message({
                                message: "编辑成功！",
                                type: 'success'
                            });
                            _this.$bus.$emit('updataRuleList');
                        }).catch(function (error) {
                                _this.editLoading = false;
                                _this.btnEditText = '提交';
                                _this.$Error(_this,error);
                            });

                        }

                        /*_this.$confirm('确认提交吗？', '提示', {}).then(() => {


                        }).catch(() => {});*/



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
