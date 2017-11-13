<!--新增编辑操作员界面-->
<template>
	<div>
		<el-dialog :title="editFormTtile" size="small" v-model="editFormVisible" @close="hideDialog">
			<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm" id="editForm">
				<el-row>
					<el-col :span="12">
						<el-form-item label="指标分类" required>
							<el-input v-model="editForm.type" name="type" placeholder="请输入指标分类" auto-complete="off" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="指标编号" prop="code">
							<el-input v-model="editForm.code" name="code" placeholder="请输入指标编号" auto-complete="off" :disabled="inputdisabled"></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="12">
						<el-form-item label="指标名称" prop="name">
							<el-input v-model="editForm.name" name="name" placeholder="请输入指标名称" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="指标分值" prop="score">
							<el-input v-model="editForm.score" name="score" placeholder="请输入指标分值" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>

				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="指标状态" prop="enabled">
							<el-radio-group v-model="editForm.enabled">
								<el-radio label="true">启用</el-radio>
								<el-radio label="false">停用</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="指标说明" prop="notes">
							<el-input type="textarea" v-model="editForm.notes" resize="none"  placeholder="请输入指标说明"></el-input>
						</el-form-item>
					</el-col>
				</el-row>

                <el-row v-show="RuleSetting">
					<el-col :span="24">
						<el-form-item label="指标逻辑" prop="expression">
							<v-editor :input-content="inputContent" :upload-url="uploadUrl" v-model="editForm.expression" name="expression"></v-editor>
						</el-form-item>
					</el-col>
				</el-row>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="hideDialog">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">{{btnEditText}}</el-button>
			</div>
			<!--<div id="textareaEdit">-->
			<!--<p>请输入指标逻辑</p>-->
			<!--</div>-->
		</el-dialog>

	</div>

</template>

<script>
    import { mapState } from 'vuex'
    import Editor from '../../componnets/wangEditor/Editor.vue'
    import indicators from '../../api/indicatorsManager'
    import ruleConfig from '../../api/ruleConfig' //默认配置文件
    export default {
        components: {
            'v-editor': Editor,
        },
        data() {
            var ValidatorNumber = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入指标编号'));
                } else if(!this.$regExp.number.test(value)){
                    callback(new Error('指标编号必须为数字值'));
                } else {
                    callback();
                }
            };
            var ValidatorScore = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入指标分值'));
                } else if(!this.$regExp.numberdS.test(value)){
                    callback(new Error('指标分值必须为数字值'));
                } else {
                    callback();
                }
            };
            var ValidatorExpression = (rule, value, callback) => {
                if (value === ''|| value === '<p><br></p>') {
                    callback(new Error('请输入指标逻辑'));
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
                editFormTtile: '新增指标',//编辑界面标题
				sumbitype:'',
                inputdisabled:false,//判断input是否可编辑
                //编辑界面数据
                types:'',
                editForm: {
                    id: '',
                    factId:'',
                    type:'',
                    code: '',
                    name: '',
                    score:'',
                    enabled: '',
                    notes:'',
                    expression:''
                },
                editLoading: false,
                btnEditText: '提交',
                editFormRules: { //校验指标
                    name: [
                        { required: true, message: '请输入指标名称'}
                    ],
                    code: [
                        {required: true, validator: ValidatorNumber}
                    ],
                    score: [
                        {required: true, validator: ValidatorScore}
                    ],
                    enabled: [
                        { required: true, message: '请选择指标状态'}
                    ],
                    expression:[
                        {required: true, validator:ValidatorExpression}
                    ],
                    notes:[
                        { mim:0, max:200, message: '指标说明在200个文字内'}
                    ]
                }
            };
        },
        created(){
            this.$bus.$off('IndicatorsDetailDialogShow');
            this.$bus.$on('IndicatorsDetailDialogShow', (title,data) => {
                this.inputContent='';
                this.IndicatorsDetailDialogShow(title,data);
            });
            this.HShow = this.RuleSetting;
        },
        watch: {
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
            IndicatorsDetailDialogShow(title,data){
                this.inputdisabled=false;
                this.editFormVisible = true;
                this.editFormTtile = title;
                if(data.type=="edit"){
                    this.sumbitype="edit";
                    this.reload(data);
                    this.inputdisabled=true;
                   // this.HShow = true;
                }else{
                    this.sumbitype="add";
                    //this.HShow = true;
                    this.inputContent = ruleConfig.expression;
                    this.editForm.expression = ruleConfig.expression;
				}
            },
            reload(data){
				var _this = this;
                indicators.getFact(data).then((res) => {
                    _this.editForm = res;
                    _this.editForm.factId = _this.$route.query.factId;
                    _this.editForm.type=this.$route.query.cname;
                    _this.inputContent=res.expression;
                    _this.editForm.enabled =String(res.enabled);

                }).catch(function (error) {
                    _this.$Error(_this,error);
                });
            },
            //编辑 or 新增
            editSubmit: function () {
                var _this = this;

                _this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        _this.editLoading = true;
                        _this.btnEditText = '提交中';
                        if (_this.sumbitype == "add") {
                            //新增
                            var params = {
                                factId: _this.editForm.factId,
                                code:  _this.editForm.code,
                                name:  _this.editForm.name,
                                score: _this.editForm.score,
                                enabled:  _this.editForm.enabled,
                                notes: _this.editForm.notes,
                                expression: _this.editForm.expression
                            };
                            indicators.addFact(params).then((res) => {
                                _this.editLoading = false;
                            _this.btnEditText = '提交';
                            _this.editFormVisible = false;
                            _this.$message({
                                message: "新增成功！",
                                type: 'success'
                            });
                            _this.$bus.$emit('updataIndicatorsList');
                        }).catch(function (error) {
                                _this.editLoading = false;
                                _this.btnEditText = '提交';
                                _this.$Error(_this,error);
                            });
                        } else {
                            //编辑
                            var params = {
                                id: _this.editForm.id,
                                factId: _this.editForm.factId,
                                code:  _this.editForm.code,
                                name:  _this.editForm.name,
                                score: _this.editForm.score,
                                enabled:  _this.editForm.enabled,
                                notes: _this.editForm.notes,
                                expression: _this.editForm.expression
                            };
                            indicators.editFact(params).then((res) => {
                                _this.editLoading = false;
                            _this.btnEditText = '提交';
                            _this.editFormVisible = false;
                            _this.$message({
                                message: "编辑成功！",
                                type: 'success'
                            });
                            _this.$bus.$emit('updataIndicatorsList');
                        }).catch(function (error) {
                                _this.editLoading = false;
                                _this.btnEditText = '提交';
                                _this.$Error(_this,error);
                            });
                        }

                      /*  _this.$confirm('确认提交吗？', '提示', {}).then(() => {

                        }).catch(() => {});*/
                    }
                });

            }
        },
        mounted() {
            this.editForm.type=this.$route.query.cname;
            this.editForm.factId = this.$route.query.factId;
           // this.getoTypesptions();
        },
        computed: {
                ...mapState([
                    'RuleSetting'
                ])
        },
    };
</script>
