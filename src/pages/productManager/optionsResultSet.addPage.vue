<!--决策建议结果设置--新增/编辑页面 wiki 数据对接 2017/3/21 lhw-->
<template>
	<div class="box">
		<el-form ref="form" :model="form"  :rules="rules"  label-width="130px">

			<el-form-item label="产品名称" style="font-weight: bold;">
				<el-col :span="8">
					<strong>{{form.productName}}</strong>
				</el-col>
			</el-form-item>

			<el-form-item label="决策名称" prop="name">
				<el-col :span="8">
					<el-input v-model="form.name" placeholder="请输入决策名称"></el-input>
				</el-col>
			</el-form-item>

			<el-form-item label="规则决策结果" prop="ruleResult">
				<el-col :span="8">
					<el-input v-model="form.ruleResult" placeholder="请配置规则决策结果" :disabled="true"></el-input>
				</el-col>
				<el-col :span="2" style="margin-left: 10px;">
					<el-button type="info" icon="setting" @click="open_rule">配置</el-button>
				</el-col>
			</el-form-item>

			<el-form-item label="评分决策结果" prop="gradeResult">
				<el-col :span="8">
					<el-input v-model="form.gradeResult" placeholder="请配置评分决策结果" :disabled="true"></el-input>
				</el-col>
				<el-col :span="2" style="margin-left: 10px;">
					<el-button type="info" icon="setting" @click="open_result">配置</el-button>
				</el-col>
			</el-form-item>

			<el-form-item label="决策建议结果" prop="result">
				<el-col :span="8">
					<el-input v-model="form.result" name="result"  placeholder="请配置决策建议结果" :disabled="true"></el-input>
				</el-col>
				<el-col :span="2" style="margin-left: 10px;">
					<el-button type="info" icon="setting" @click="open_options">配置</el-button>
				</el-col>
			</el-form-item>





			<el-form-item label="说明" prop="remark">
				<el-col :span="8">
					<el-input type="textarea" resize="none" v-model="form.remark" placeholder="请填写说明"></el-input>
				</el-col>

			</el-form-item>

			<el-form-item>
				<el-button  icon="d-arrow-left" @click="gotoBack">返回</el-button>
				<el-button type="primary" icon="check" @click="submit" :loading="editLoading">{{submitTest}}</el-button>
			</el-form-item>
		</el-form>

		<!--配置模态框-->
		<optionsResultSetPageDialog></optionsResultSetPageDialog>

		<!--规则弹窗-->
		<optionsResultSetPageRuleDialog></optionsResultSetPageRuleDialog>
	</div>
</template>


<script>
	import optionsResultSetPageDialog from './optionsResultSet.addPage.dialog.vue'  //引入 模态框之一 评分决策
	import optionsResultSetPageRuleDialog from './optionsResultSet.addPage.ruleDialog.vue' // 引入 模态框之一  决策规则
	import productList from '../../api/productList' //引入API
	export default {
		components: {
			optionsResultSetPageDialog,
			optionsResultSetPageRuleDialog
		},
		data() {
			return {
				id:'',
				editLoading:false,
				submitTest:'提交',
				acType:'',
				productId:'',
				form: {
					"id":"",
					"productId":"",
					"productName":"",
					"name":"",
					"result":"",
					"gradeResult":"",
					"ruleResult":"",
					"remark":""
				},
				rules: {
					result: [
						{ required: true, message: '请配置决策结果'}
					],
					name: [
						{ required: true, message: '请输入决策名称' },
						{ max:20, message: '长度不能超过20个字符'}
					],
					gradeResult: [
						{  required: true, message: '请配置评分决策结果'}
					],
					ruleResult: [
						{ required: true, message: '请配置决策规则'}
					],
					remark: [
						{ required: true, message: '请填写说明' },
						{ max:150, message: '长度不能超过150个字符'}
					]
				}
			}
		},
		methods:{

			gotoBack(){
				this.$router.push({ path: '/productList/optionsResultSet',query:{id:this.$route.query.productId,name:this.form.productName}});
			},

			//请配置决策结果 --弹出
			open_options(){
				this.$bus.$emit('optionsResultSet_addPage_open','请选择决策结果',{type:'result',productId:this.form.productId},{ labelName:'决策建议',
					labelNotes:'决策建议说明'});
			},

			//评分决策结果 --弹出
			open_result(){
				this.$bus.$emit('optionsResultSet_addPage_open','请选择评分决策结果',{type:'gradeResult',productId:this.form.productId,ruleResult:this.form.ruleResult});
			},

			//请配置决策规则
			open_rule(){
				this.$bus.$emit('optionsResultSet_addPage_rule','请选择决策规则',{type:'ruleResult',productId:this.id,gradeResult:this.form.gradeResult});
			},
			bindData(key,val){
				//debugger;
				this.form[key] = val;
			},
			//获取详情
			getInfo(){
				var _this = this;
				productList.decisionInfo_getById(_this.id).then(res =>{
					_this.form = res|| _this.form;
			}).catch(error =>{
					_this.$Error(_this,error);
			});
			},
			//提交
			submit(){
				var _this = this;
				_this.$refs.form.validate((valid) => {
					if(valid){
						_this.submitTest = '提交中';
						_this.editLoading = true;
						//debugger;
						if(_this.acType=='Add'){
							var params = {
								productId:_this.productId,
								productName:_this.form.productName,
								name:_this.form.name,
								result:_this.form.result,
								gradeResult:_this.form.gradeResult,
								ruleResult:_this.form.ruleResult,
								remark:_this.form.remark
							};
							productList.decision_post(params).then(res =>{
								_this.submitTest='提交';
							_this.editLoading = false;
							_this.$message({
								type: 'success',
								message: '新增成功！'
							});
							setTimeout(() =>{
								_this.gotoBack();
							},1000)
						}).catch(error =>{
								_this.$Error(_this,error);
							_this.submitTest='提交';
							_this.editLoading = false;
						});
						}else{
							productList.decision_put(_this.form).then(res =>{
								_this.submitTest='提交';
							_this.editLoading = false;
							_this.$message({
								type: 'success',
								message: '编辑成功！'
							});
							setTimeout(() =>{
								_this.gotoBack();
						},1000)
						}).catch(error =>{
								_this.$Error(_this,error);
							_this.submitTest='提交';
							_this.editLoading = false;
						});
						}

					}
				});

			},
		},
		created: function () {
			var _this = this;
			_this.$bus.$off('H_optionsResultSet_bindData');
			_this.$bus.$on('H_optionsResultSet_bindData', (type,name) => {
				//debugger;
				_this.bindData(type,name);
		   });

			_this.$bus.$on('H_optionsResultSet_bindData2', (ruleResult) => {
				//执行处理需要处理事件
				//this.bindData(key,val);
				//alert(val)
				alert(ruleResult)
				//_this.form.ruleResult = ruleResult;
			})
		},
		mounted() {
			this.id = this.$route.query.id;
			this.productId = this.$route.query.productId;
			this.form.productName ='';
			if(this.$route.query.aciton =='Add'){  //新增
				this.form.productName = this.$route.query.productName || '';
				this.acType = 'Add';
			}else{
				this.acType = 'Edit';
				this.getInfo();
			}


		}
	}
</script>

<style scoped>
	.h-title{margin: 10px auto 15px; font-size: 15px;}
</style>