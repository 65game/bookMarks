<!--新增编辑界面--名单管理-->
<template>
	<el-dialog :title="editFormTtile" size="small" v-model="editFormVisible" :close-on-click-modal="false">
		<el-form :model="editForm" label-width="140px" :rules="editFormRules" ref="editForm" id="editForm">
			<el-row>
				<el-col :span="12">
					<el-form-item label="手机号码" prop="mobiles">
						<el-input v-model="editForm.mobiles" placeholder="请输入手机号码" name="mobiles" auto-complete="off"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="用户姓名" prop="personName">
						<el-input v-model="editForm.personName" placeholder="请输入用户姓名" name="personName" auto-complete="off"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="身份证号" prop="personIdCard">
						<el-input v-model="editForm.personIdCard" placeholder="请输入身份证号" name="personIdCard" auto-complete="off"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="所属企业" prop="companyName">
						<el-input v-model="editForm.companyName" placeholder="请输入所属企业" name="companyName" auto-complete="off"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="是否企业高管" prop="isLeader">
						<el-radio-group v-model="editForm.isLeader">
							<el-radio label="1">是</el-radio>
							<el-radio label="0">否</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="最大放款额度" prop="maxLendNorm">
						<el-input placeholder="请输入最大放款额度" v-model="editForm.maxLendNorm" name="maxLendNorm" auto-complete="off">
							<template slot="append">元</template>
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span="12">
					<el-form-item label="单笔最高放贷金额" prop="maxSingleLendNorm">
						<el-input placeholder="请输入单笔最高放贷金额" v-model="editForm.maxSingleLendNorm" name="maxSingleLendNorm" auto-complete="off">
							<template slot="append">元</template>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="最大借款期限" prop="maxLoanTerm">
						<el-input placeholder="请输入最大借款期限" v-model="editForm.maxLoanTerm" name="maxLoanTerm" auto-complete="off">
							<template slot="append">日</template>
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span="12">
					<el-form-item label="可用额度">
						<el-input placeholder="请输入可用额度" v-model="editForm.import" :disabled="true" auto-complete="off">
							<template slot="append">元</template>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="已用额度">
						<el-input placeholder="请输入已用额度" v-model="editForm.availableCredit" :disabled="true" auto-complete="off">
							<template slot="append">元</template>
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="冻结额度">
						<el-input placeholder="请输入冻结额度" v-model="editForm.frozenCredit" :disabled="true" auto-complete="off">
							<template slot="append">元</template>
						</el-input>
					</el-form-item>
				</el-col>
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
    import nameManager from '../../api/nameManager'
    export default {
        data() {
            var maxLoanTerm = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入最大借款期限'));
                } else if(!this.$regExp.number.test(value)){
                    callback(new Error('请输入数字'));
                } else {
                    callback();
                }
            };
            //maxSingleLendNorm
            var maxSingleLendNorm = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入单笔最高放贷金额'));
                } else if(!this.$regExp.amountPlus.test(value)){
                    callback(new Error('请输入正确的金额格式'));
                } else {
                    callback();
                }
            };

            var maxLendNorm = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入最大放款额度'));
                } else if(!this.$regExp.amountPlus.test(value)){
                    callback(new Error('请输入正确的金额格式'));
                } else {
                    callback();
                }
            };

            var phone =  (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号码'));
                } else if(!this.$regExp.phone.test(value)){
                    callback(new Error('请输入正确的手机号码'));
                } else {
                    callback();
                }
            };
            return {
                value1: '',
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                imageUrl:'',
                editFormVisible: false,//编辑界面显是否显示
                editFormTtile: '新增规则',//编辑界面标题
                editFormInput:true,//是否显示input
                //编辑界面数据
                editForm: {
                    id: 0,
                    mobiles: '',
                    personName: '',
                    personIdCard:'',
                    companyName:'',
                    isLeader:'',
                    maxLendNorm:'',
                    effectiveTerm:'',
                    maxLoanTerm:'',
                    maxSingleLendNorm:'',
                    status:''
                },
                editLoading: false,
                btnEditText: '提交',

                editFormRules: { //校验规则
                    mobiles: [
                        { required: true, validator: phone}
                    ],
                    personName: [
                        { required: true, message: '请输入用户姓名'}
                    ],
                    personIdCard: [
                        { required: true, message: '请输入身份证号'}
                    ],
                    companyName: [
                        { required: true, message: '请输入所属企业'}
                    ],
                    isLeader: [
                        { required: true, message: '请选择是否企业高管'}
                    ],
                    maxSingleLendNorm: [
                        { required: true,validator:maxSingleLendNorm}
                    ],
                    maxLoanTerm: [
                        {required: true, validator: maxLoanTerm}
                    ],
                    effectiveTerm: [
                        { required: true, message: '请选择截止时间'}
                    ],
                    maxLendNorm:[
                        { required: true, validator: maxLendNorm}
					]


                }
            };
        },
        created(){
            this.$bus.$off('companyDialogShow');
            this.$bus.$off('H_userDialogShow');
            this.$bus.$on('H_userDialogShow', (title,data,api) => {
                //执行处理需要处理事件
                this.DialogShow(title,data,api);
            })
        },
        methods: {
            //显示dialog模态框
            DialogShow:function(title,data,api){
                this.editFormVisible = true;
                this.editFormTtile = title;
                this.api = api || '';
                if(data.id){
                    this.editFormInput=false;//隐藏密码模块
                    this.reload(data);
                }
            },
            reload:function(data){
                this.editForm = data;
                this.editForm.isLeader = this.editForm.isLeader=="1"?"1":"0";
            },
            //编辑 or 新增
            editSubmit: function () {
                var _this = this;

                _this.$refs.editForm.validate((valid) => {
                    if (valid) {

                        /*_this.$confirm('确认提交吗？', '提示', {}).then(() => {


                        });*/

                        _this.editLoading = true;
                        _this.btnEditText = '提交中';
                        if (_this.editForm.id == 0) {
                            //新增
                            var params = {
                                mobiles: _this.editForm.mobiles,
                                realName: _this.editForm.realName,
                                password: _this.editForm.password,
                                confirmPassword:_this.editForm.confirmPassword,
                                mobile: _this.editForm.mobile,
                                email: _this.editForm.email,
                                workNumber: _this.editForm.workNumber
                            };
                            nameManager.personwhite_add(params).then((res) => {
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
                            if(_this.api==='pnormallist_put'){
                               // debugger;
                                //编辑普通用户
                                nameManager.pnormallist_put(_this.editForm).then((res) => {
                                    _this.editLoading = false;
                                _this.btnEditText = '提交';
                                _this.editFormVisible = false;
                                _this.$message({
                                    message: "编辑成功！",
                                    type: 'success'
                                });
                                _this.$bus.$emit('H_userList_reload');
                            }).catch(function (error) {
                                    _this.editLoading = false;
                                    _this.btnEditText = '提交';
                                    _this.$Error(_this,error);
                                });
                            }else{
                                //编辑白名单
                                _this.editForm.maxLoanTermType = 1; //3:年，2:月，1：日 借款期限单位
                                nameManager.personwhite_update(_this.editForm).then((res) => {
                                    _this.editLoading = false;
                                _this.btnEditText = '提交';
                                _this.editFormVisible = false;
                                _this.$message({
                                    message: "编辑成功！",
                                    type: 'success'
                                });
                                _this.$bus.$emit('H_userWhite_reload');
                            }).catch(function (error) {
                                    _this.editLoading = false;
                                    _this.btnEditText = '提交';
                                    _this.$Error(_this,error);
                                });
                            }


                        }

                    }
                });

            }
        }
    };
</script>

<style scoped>
	.el-form-item__content{ font-size: 50px;}
</style>

