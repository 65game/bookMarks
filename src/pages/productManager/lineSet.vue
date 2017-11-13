<!--额度策略调整-->
<template>
	<div class="box">

		<el-form ref="form" :model="form"  :rules="rules"  label-width="150px">

			<el-form-item label="产品名称：" style="font-weight: bold;">
				<el-col :span="12">
					<strong>{{productName}}</strong>
				</el-col>
			</el-form-item>

			<el-form-item label="上限金额" prop="maxCredit">
				<el-col :span="8">
					<el-input placeholder="请输入下限金额" v-model="form.maxCredit" name="maxCredit" auto-complete="off" style="width: 210px;">
						<template slot="append">元</template>
					</el-input>
				</el-col>
			</el-form-item>

			<el-form-item label="下限金额" prop="minCredit">
				<el-col :span="8">
					<el-input placeholder="请输入下限金额" v-model="form.minCredit" name="minCredit" auto-complete="off" style="width: 210px;">
						<template slot="append">元</template>
					</el-input>
				</el-col>
			</el-form-item>

			<el-form-item label="启动白名单"  prop="enabledWhiteList">
				<el-switch on-text="是" off-text="否"  v-model="form.enabledWhiteList" @change="switchChange"></el-switch>
			</el-form-item>

			</el-form-item>


			<el-form-item label="公式调整" prop="expression">
				<el-col :span="8">
					<el-input placeholder="月可支配收入*收入调整系数*申请贷款期限*评分调整系数" v-model="form.expression" style="min-width: 490px;">
						<el-button slot="append" icon="setting" @click="open_rule" >系数设置</el-button>
					</el-input>
				</el-col>
			</el-form-item>


			<el-form-item>
				<el-button  icon="d-arrow-left" @click="gotoBack">返回</el-button>
				<el-button type="primary" icon="check" @click="submitForm" :loading="subLoading">发布</el-button>
			</el-form-item>
		</el-form>


		<!--系数设置弹窗-->
		<lineSetRuleDialog></lineSetRuleDialog>
	</div>
</template>


<script>
	import lineSetRuleDialog from './lineSet.ruleDialog' //引入弹窗
	import productList from '../../api/productList'
	export default {
		components: {
			lineSetRuleDialog
		},
		data() {
			var ValidatorNumber = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入上限金额'));
				} else if(!this.$regExp.amountPlus.test(value)){
					callback(new Error('请输入正确的金额格式'));
				} else {
					callback();
				}
			};

			var ValidatorNumber2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入下限金额'));
				} else if(!this.$regExp.amountPlus.test(value)){
					callback(new Error('请输入正确的金额格式'));
				} else {
					callback();
				}
			};

			return {
				id:'',
				productName:'',
				subLoading:false,
				form: {
					id: '',
					maxCredit: '',
					minCredit: '',
					enabledWhiteList: false,
					expression: ''
				},
				rules: {
					maxCredit: [
						{required: true, validator: ValidatorNumber},
						{max:10,message:'长度不能超过10个字符'}
					],
					minCredit: [
						{required: true, validator: ValidatorNumber2},
						{max:10,message:'长度不能超过10个字符'}
					],
					expression: [
						{  required: true, message: '请设置公式调整' }
					],
					enabledWhiteList: [
						{ required: true, message: '请选择是否启动白名单' }
					]
				}
			}
		},
		created: function () {
			this.$bus.$on('lineSetRuleFn', (data) => {
				//执行处理需要处理事件
				this.lineSetRuleFn(data);
			})
		},
		mounted() {
			var query = this.$route.query;
			this.id = query.id;
			this.productName = query.name;
			this.getInfo();
		},
		methods:{
			getInfo(){
				var _this = this;
				productList.creditInfo_getById(_this.id).then(res =>{
					if(res.code =='-1'){
						_this.$message({
							type:'warning',
							messaage:res.msg || '操作失败！'
						})
					}else{
						_this.form = res;
						if(_this.form.maxCredit){
							_this.form.maxCredit = _this.form.maxCredit.toString();
						}
						if(_this.form.minCredit){
							_this.form.minCredit = _this.form.minCredit.toString();
						}
						if(!res.maxCredit){
							setTimeout(function(){
								_this.$refs['form'].resetFields();
							},10)
						}

					}
				}).catch(error =>{
					_this.$Error(_this,error)
				});
			},
			//提交
			submitForm() {
				var _this = this;
				_this.$refs.form.validate((valid) => {
					if (valid) {
						var params = {
							id:_this.id, //产品id
							maxCredit:_this.form.maxCredit,
							minCredit:_this.form.minCredit,
							enabledWhiteList:_this.form.enabledWhiteList,
							expression:_this.form.expression
						}
						_this.subLoading = true;
						productList.creditInfo_put(params).then(res =>{
							//debugger;
							if(res.code =='0'){
								_this.$message({
									message:'额度策略设置成功！',
									type:'success'
								})
							}else{
								_this.$message({
									message:res.msg ||'操作失败！',
									type:'warning'
								})
							}
						  _this.subLoading = false;
						 _this.getInfo();
						}).catch(error =>{
							_this.$Error(_this,error);
						   _this.subLoading = false;
						});
					} else {

						return false;
					}
				});
			},
			//处理新用户默认额度
			switchChange(){
				//alert(this.form.isUser)
				if(this.form.isUser){

				}
			},

			//返回产品列表
			gotoBack(){
				this.$router.push({ path: '/productList'});
			},
			//请配置决策规则
			open_rule(){
				this.$bus.$emit('lineSetRuleDialog_open','系数设置',{productId:this.id});
			},
			//公式调整--赋值
			lineSetRuleFn(data){
				var _this = this;
				if(data && typeof data =="object"){
					_this.form.rule = '评分等级：'+data.ruleGrade+'，收入系数：'+data.ruleNum+'，评分系数：'+data.ruleType;
				}
			}
		}
	}
</script>

<style scoped>
	.h-title{margin: 10px auto 15px; font-size: 15px;}
</style>

