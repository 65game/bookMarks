<!--新增编辑操作员界面-->
<template>
	<el-dialog :title="editFormTtile" size="small" v-model="editFormVisible" @close="hideDialog">
		<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm" id="editForm">
			<el-row>
				<el-col :span="12">
					<el-form-item label="账号" prop="name" >
						<el-input v-model="editForm.name" name="name" auto-complete="off" placeholder="请输入账号"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="真实姓名" prop="realName">
						<el-input v-model="editForm.realName" name="realName" auto-complete="off" placeholder="请输入真实姓名"></el-input>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row v-if="editFormInput==true">
				<el-col :span="12">
					<el-form-item label="密码" prop="password">
						<el-input type="password"  v-model="editForm.password" name="password" auto-complete="off" placeholder="请输入密码"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="确认密码" prop="confirmPassword">
						<el-input type="password" v-model="editForm.confirmPassword" name="confirmPassword"  auto-complete="off" placeholder="请输入确认密码"></el-input>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span="12">
					<el-form-item label="手机号码" prop="mobile">
						<el-input  v-model="editForm.mobile" name="mobile" auto-complete="off" placeholder="请输入手机号码"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="邮箱" prop="email">
						<el-input  v-model="editForm.email" name="email" auto-complete="off" placeholder="请输入邮箱"></el-input>
					</el-form-item>
				</el-col>

			</el-row>

			<el-row>
				<el-col :span="12">
					<el-form-item label="工号">
						<el-input v-model="editForm.workNumber" name="workNumber" auto-complete="off" placeholder="请输入工号"></el-input>
					</el-form-item>
				</el-col>
			</el-row>

			<!--<el-row>-->
			<!--<el-col :span="12">-->
			<!--<el-form-item label="头像">-->
			<!--<el-upload-->
			<!--class="avatar-uploader"-->
			<!--action="//jsonplaceholder.typicode.com/posts/"-->
			<!--:show-file-list="false"-->
			<!--:on-success="handleAvatarScucess"-->
			<!--:before-upload="beforeAvatarUpload">-->
			<!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
			<!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
			<!--</el-upload>-->

			<!--</el-form-item>-->
			<!--</el-col>-->
			<!--</el-row>-->

		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click.native="hideDialog">取消</el-button>
			<el-button type="primary" @click.native="editSubmit" :loading="editLoading">{{btnEditText}}</el-button>
		</div>
	</el-dialog>
</template>

<script>
    import operator from '../../../api/operator'
    export default {
        data() {
            var validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号码'));
                } else if(!this.$regExp.phone.test(value)){
                    callback(new Error('请输入正确的手机号码'));
                } else {
                    callback();
                }
            };
            var validateEmail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入邮箱号码'));
                } else if(!this.$regExp.email.test(value)){
                    callback(new Error('请输入正确的邮箱号码'));
                } else {
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入确认密码'));
                } else if (value !== this.editForm.password) {
                    callback(new Error('两次输入密码不一致'));
                } else {
                    callback();
                }
            };

            var validateRealname = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入真实姓名'));
                } else if (!this.$regExp.isZh.test(value)) {
                    callback(new Error('真实姓名格式不正确'));
                } else {
                    callback();
                }
            };
            return {
//                imageUrl:'',
//                dialogImageUrl: '',
//                dialogVisible: false,
				type:'',
                editFormVisible: false,//编辑界面显是否显示
                editFormTtile: '新增',//编辑界面标题
                editFormInput:true,//是否显示input
                //编辑界面数据
                editForm: {
                    id: 0,
                    name: '',
                    realName: '',
                    password: '',
                    confirmPassword: '',
                    mobile: '',
                    email: '',
                    workNumber:''
                },
                proptForm: {
                    name: 'name',
                    realName: 'realName',
                    password: 'password',
                    confirmPassword: 'confirmPassword',
                    mobile: 'mobile',
                    email: 'email'
                },
                editLoading: false,
                btnEditText: '提交',

                editFormRules: { //校验规则
                    name: [
                        { required: true, message: '请输入账号'},
                        { min: 3, max: 20, message: '长度在 3 到 20 个字符'}
                    ],
                    realName: [
                        { required: true, validator: validateRealname}
                    ],
                    password: [
                        { required: true, message: '请输入密码'},
                        { min: 6, max: 18, message: '长度在 6 到 18 个字符'}
                    ],
                    confirmPassword: [
                        {required: true, validator: validatePass2}
                    ],
                    mobile: [
                        {required: true, validator: validatePhone}
                    ],
                    email: [
                        { required: true, validator: validateEmail}
                    ]

                }
            };
        },
        created(){
            this.$bus.$off('operatorDialogShow');
            this.$bus.$on('operatorDialogShow', (title,data,type) => {
                this.type = type;
                this.dictionaryDialogShow(title,data);
            })
        },
        methods: {
			/*handleRemove(file, fileList) {
			 console.log(file, fileList);
			 },
			 handlePictureCardPreview(file) {
			 this.dialogImageUrl = file.url;
			 this.dialogVisible = true;
			 },
			 handleAvatarScucess(res, file) {
			 this.imageUrl = URL.createObjectURL(file.raw);
			 },
			 beforeAvatarUpload(file) {
			 const isJPG = file.type === 'image/jpeg';
			 const isLt2M = file.size / 1024 / 1024 < 2;

			 if (!isJPG) {
			 this.$message.error('上传头像图片只能是 JPG 格式!');
			 }
			 if (!isLt2M) {
			 this.$message.error('上传头像图片大小不能超过 2MB!');
			 }
			 return isJPG && isLt2M;
			 },*/
            //显示dialog模态框
            dictionaryDialogShow:function(title,data){
                //var _this = this;
                this.editFormTtile = title;
                if(this.type=="edit"){//编辑
                    this.editFormInput=false;//隐藏密码模块
                    this.reload(data);
                    //_this.resetForm();//新增重置表单
                }
                else{//新增
                    this.editFormInput=true;//显示密码模块
                    this.editForm= {
                        id: 0,
                        name: '',
                        realName: '',
                        password: '',
                        confirmPassword: '',
                        mobile: '',
                        email: '',
                        workNumber:''
                    }

                }
                this.editFormVisible = true;
            },
            hideDialog(){
                this.editFormVisible = false;
                setTimeout(() =>{
                    this.$refs['editForm'].resetFields();
            },100)
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
                        if (_this.type=="add") {
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


                        }).catch(() => {});*/

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
	/*.avatar-uploader .el-upload {*/
	/*border: 1px dashed #d9d9d9;*/
	/*border-radius: 6px;*/
	/*cursor: pointer;*/
	/*position: relative;*/
	/*overflow: hidden;*/
	/*}*/
	/*.avatar-uploader .el-upload:hover {*/
	/*border-color: #20a0ff;*/
	/*}*/
	/*.avatar-uploader-icon {*/
	/*font-size: 20px;*/
	/*color: #8c939d;*/
	/*width: 100px;*/
	/*height: 100px;*/
	/*line-height: 100px;*/
	/*text-align: center;*/
	/*border: 1px dashed #d9d9d9;*/
	/*}*/
	/*.avatar {*/
	/*width: 178px;*/
	/*height: 178px;*/
	/*display: block;*/
	/*}*/
</style>
