<!--新增编辑操作员界面-->
<template>
	<el-dialog :title="editFormTtile" size="small" v-model="editFormVisible" :close-on-click-modal="false">
		<el-form :model="editForm" label-width="170px" :rules="editFormRules" ref="editForm" id="editForm">
			<el-row>
				<el-col :span="12">
					<el-form-item label="企业名称" prop="name">
						<el-input placeholder="请输入企业名称" v-model="editForm.name" name="name" auto-complete="off"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="营业执照号" prop="name">
						<el-input v-model="editForm.name" name="name" auto-complete="off"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="所属企业" prop="name">
						<el-input v-model="editForm.name" name="name" auto-complete="off"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="企业最大放贷额度" prop="name">
						<el-input placeholder="请输入企业最大放贷额度" v-model="editForm.name" name="name" auto-complete="off">
							<template slot="append">万元</template>
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="最大借款期限" prop="name">
						<el-input placeholder="请输入最大借款期限" v-model="editForm.name" name="name" auto-complete="off">
							<template slot="append">日</template>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="企业白名单个人额度" prop="name">
						<el-input placeholder="请输入企业白名单个人额度" v-model="editForm.import" name="import" auto-complete="off">
							<template slot="append">万元</template>
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span="12">
					<el-form-item label="单笔最高放贷金额" prop="name">
						<el-input placeholder="请输入单笔最高放贷金额" v-model="editForm.desc">
							<template slot="append">万元</template>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="企业关系" prop="name">
						<el-input placeholder="请输入企业关系" v-model="editForm.import" name="import" auto-complete="off"></el-input>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span="12">
					<el-form-item label="截止时间" prop="name">
						<el-date-picker v-model="value1" type="date" placeholder="选择日期" :picker-options="pickerOptions0" :editable="false"></el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>


		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click.native="editFormVisible = false">取消</el-button>
			<el-button type="primary" @click.native="editSubmit" :loading="editLoading">{{btnEditText}}</el-button>
		</div>
	</el-dialog>
</template>

<script>
    export default {
        data() {
            return {
                value1: '',
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
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
                        { required: true, message: '请输入规则名称'}
                    ],
                    number: [
                        { required: true, message: '请输入规则编号'}
                    ],
                    regionBig: [
                        { required: true, message: '请选择所属大类'}
                    ],
                    regionSmall: [
                        { required: true, message: '请选择规则子类'}
                    ],
                    state: [
                        { required: true, message: '请选择规则状态'}
                    ],
                    import:[
                        { required: true, message: '请选输入规则权重'}
					]
                }
            };
        },
        created(){
            this.$bus.$off('companyDialogShow');
            this.$bus.$on('companyDialogShow', (title,data) => {
                //执行处理需要处理事件
                this.DialogShow(title,data);
            })
        },
        methods: {
            //显示dialog模态框
            DialogShow:function(title,data){
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
                       /* _this.$confirm('确认提交吗？', '提示', {}).then(() => {


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
