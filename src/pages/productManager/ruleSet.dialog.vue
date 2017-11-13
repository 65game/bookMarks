<!--新增编辑操作员界面-->
<template>
	<el-dialog :title="editFormTtile" size="tiny" v-model="editFormVisible" :close-on-click-modal="false">
		<el-form :model="editForm" label-width="85px" :rules="editFormRules" ref="editForm" id="editForm">
			<el-row>
				<el-col :span="24">
					<el-form-item label="规则名称" prop="name">
						<el-input v-model="editForm.name" name="name" auto-complete="off"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="规则编号" prop="number">
						<el-input v-model="editForm.number" name="number" auto-complete="off"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="归属类别" required>
						<el-row>
							<el-col :span="11" >
								<el-form-item prop="regionBig">
									<el-select v-model="editForm.regionBig" filterable placeholder="请选择所属大类">
										<el-option label="个人信息" value="shanghai"></el-option>
										<el-option label="职业信息" value="beijing"></el-option>
										<el-option label="借款情况" value="beijing"></el-option>
									</el-select>
								</el-form-item>

							</el-col>
							<el-col class="line" :span="2">-</el-col>
							<el-col :span="11">
								<el-form-item prop="regionSmall">
									<el-select v-model="editForm.regionSmall" filterable placeholder="请选择规则子类">
										<el-option label="人脸识别" value="shanghai"></el-option>
										<el-option label="实名认证" value="beijing"></el-option>
									</el-select>
								</el-form-item>

							</el-col>
						</el-row>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
				<el-form-item label="规则状态" prop="state">
					<el-radio-group v-model="editForm.state">
						<el-radio label="启用"></el-radio>
						<el-radio label="停用"></el-radio>
					</el-radio-group>
				</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span="24">
					<el-form-item label="规则权重" prop="import">
						<el-input v-model="editForm.import" name="import" auto-complete="off"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="规则说明">
						<el-input type="textarea" v-model="editForm.desc" resize="none"></el-input>
					</el-form-item>
				</el-col>
			</el-row>

		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click.native="editFormVisible = false">取 消</el-button>
			<el-button type="primary" @click.native="editSubmit" :loading="editLoading">{{btnEditText}}</el-button>
		</div>
	</el-dialog>
</template>

<script>
    //import operator from '../../../api/operator'
    export default {
        data() {
            var validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号码'));
                } else if(!/^1[34578]\d{9}$/.test(value)){
                    callback(new Error('请输入正确的手机号码'));
                } else {
                    callback();
                }
            };
            var validateEmail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入邮箱号码'));
                } else if(!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(value)){
                    callback(new Error('请输入正确的邮箱号码'));
                } else {
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入确认密码'));
                } else if (value !== this.editForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                imageUrl:'',
                editFormVisible: false,//编辑界面显是否显示
                editFormTtile: '新增规则',//编辑界面标题
                editFormInput:true,//是否显示input
                //编辑界面数据
                editForm: {
                    id: 0,
                    name: '',
                    number: '',
                    regionBig:'',
                    regionSmall:'',
                    desc:'',
                    state:'',
                    import:''
                },
                editLoading: false,
                btnEditText: '提交',

                editFormRules: { //校验规则
                    name: [
                        { required: true, message: '请输入规则名称', trigger: 'blur' }
                    ],
                    number: [
                        { required: true, message: '请输入规则编号', trigger: 'blur' }
                    ],
                    regionBig: [
                        { required: true, message: '请选择所属大类', trigger: 'blur' }
                    ],
                    regionSmall: [
                        { required: true, message: '请选择规则子类', trigger: 'blur' }
                    ],
                    state: [
                        { required: true, message: '请选择规则状态', trigger: 'change' }
                    ],
                    import:[
                        { required: true, message: '请选输入规则权重', trigger: 'blur' }
					]


                }
            };
        },
        created(){
            this.$bus.$off('ruleDialogShow'); //移除当前注册事件
            this.$bus.$on('ruleDialogShow', (title,data) => {
                //执行处理需要处理事件
                this.ruleDialogShow(title,data);
            })
        },
        methods: {
            //显示dialog模态框
            ruleDialogShow:function(title,data){
                this.editFormVisible = true;
                this.editFormTtile = title;
                if(data.id){
                    this.editFormInput=false;//隐藏密码模块
                    this.reload(data);
                }
            },
            reload:function(data){
                this.editForm = data;
            },
            //编辑 or 新增
            editSubmit: function () {
                var _this = this;

                _this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        _this.editLoading = true;
                        _this.btnEditText = '提交中';
                        if (_this.editForm.id == 0) {
                            //新增
                            var params = {
//                                    id:'',
//                                    photo:'',
                                name: _this.editForm.name,
                                realName: _this.editForm.realName,
                                password: _this.editForm.password,
                                confirmPassword:_this.editForm.confirmPassword,
                                mobile: _this.editForm.mobile,
                                email: _this.editForm.email,
                                workNumber: _this.editForm.workNumber
                            };
                            operator.add(params).then((res) => {
                                _this.editLoading = false;
                            _this.btnEditText = '提交';
                            _this.editFormVisible = false;
                            _this.$message({
                                message: "新增成功！",
                                type: 'success'
                            });
                            _this.$bus.$emit('updatagOperator');
                        }).catch(function (error) {
                                _this.editLoading = false;
                                _this.btnEditText = '提交';
                                _this.$Error(_this,error);
                            });
                        } else {
                            //编辑
                            var params = {
                                id: _this.editForm.id,
//                                    photo:'',
                                name: _this.editForm.name,
                                realName: _this.editForm.realName,
                                mobile: _this.editForm.mobile,
                                email: _this.editForm.email,
                                workNumber: _this.editForm.workNumber
                            };
                            operator.editInfo(params).then((res) => {
                                _this.editLoading = false;
                            _this.btnEditText = '提交';
                            _this.editFormVisible = false;
                            _this.$message({
                                message: "编辑成功！",
                                type: 'success'
                            });
                            _this.$bus.$emit('updatagOperator');
                        }).catch(function (error) {
                                _this.editLoading = false;
                                _this.btnEditText = '提交';
                                _this.$Error(_this,error);
                            });

                        }

                        /*_this.$confirm('确认提交吗？', '提示', {}).then(() => {


                        });*/

                    }
                });

            }
        },
        mounted() {
            var _this = this;
        }
    };
</script>

<style scoped>
	.line{ text-align: center; font-size: 14px;}
</style>
