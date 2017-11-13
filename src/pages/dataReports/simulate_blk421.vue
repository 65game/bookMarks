<!--模拟风控报告 2017/4/21--再改版 lhw-->
<template>
	<div class="box">
		<div v-if="reportStatus">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" id="ruleForm">

				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="姓名" prop="realName" >
							<el-input v-model="ruleForm.realName" name="realName" auto-complete="off" placeholder="请输入姓名"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="手机号码" prop="mobile">
							<el-input v-model="ruleForm.mobile" name="mobile" auto-complete="off" placeholder="请输入手机号码"></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="身份证号" prop="idCard" >
							<el-input v-model="ruleForm.idCard" name="idCard" auto-complete="off" placeholder="请输入身份证号"></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="银行卡号" prop="bankCard">
							<el-input v-model="ruleForm.bankCard" name="bankCard" auto-complete="off" placeholder="请输入银行卡号"></el-input>
						</el-form-item>
					</el-col>
				</el-row>


				<el-row :gutter="20">

					<el-col :span="12">
						<el-form-item label="产品编号" prop="productCode">
							<el-input v-model="ruleForm.productCode" name="productCode" auto-complete="off" placeholder="请输入产品编号"></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="借款期限" prop="deadline" >
							<el-input placeholder="请输入借款期限" v-model="ruleForm.deadline">
								<template slot="append">月</template>
							</el-input>
						</el-form-item>
					</el-col>

				</el-row>

				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="年龄" prop="age">
							<el-input placeholder="请输入年龄" v-model="ruleForm.age">
								<template slot="append">岁</template>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="现址居住年限">
							<el-select v-model="ruleForm.residenceTime" placeholder="请选择现址居住年限" class="h-fwidth">
								<el-option label="非本市居住" value="非本市居住"></el-option>
								<el-option label="3年及以下" value="3年及以下"></el-option>
								<el-option label="三年以上" value="三年以上"></el-option>
							</el-select>
						</el-form-item>
					</el-col>

				</el-row>

				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="婚姻状况">
							<el-radio class="radio" v-model="ruleForm.married" label="未婚">未婚</el-radio>
							<el-radio class="radio" v-model="ruleForm.married" label="已婚">已婚</el-radio>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="健康状况">
							<el-select v-model="ruleForm.health" placeholder="请选择健康状况" class="h-fwidth">
								<el-option label="常年受疾病影响，严重影响工作生活" value="常年受疾病影响，严重影响工作生活"></el-option>
								<el-option label="经常受疾病困扰，对工作生活有一定影响" value="经常受疾病困扰，对工作生活有一定影响"></el-option>
								<el-option label="曾有重大病史 ，对正常生活工作无影响或影响轻微" value="曾有重大病史 ，对正常生活工作无影响或影响轻微"></el-option>
								<el-option label="健康，无重大疾病病史" value="健康，无重大疾病病史"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="职业或单位">
							<el-select v-model="ruleForm.occupationOrUnit" placeholder="请选择职业或单位" class="h-fwidth">
								<el-option label="职业不稳定" value="职业不稳定"></el-option>
								<el-option label="一般国有企业 、股份公司 、私营企业员工或个体户" value="一般国有企业 、股份公司 、私营企业员工或个体户"></el-option>
								<el-option label="业绩优良上市公司员工" value="业绩优良上市公司员工"></el-option>
								<el-option label="邮政 、能源 、媒体 、烟草 、航空等优质企业员工" value="邮政 、能源 、媒体 、烟草 、航空等优质企业员工"></el-option>
								<el-option label="国家机关公务员 、事业单位 、金融机构员工" value="国家机关公务员 、事业单位 、金融机构员工"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="教育情况">
							<el-select v-model="ruleForm.education" placeholder="请选择教育情况" class="h-fwidth">
								<el-option label="初中及以下" value="初中及以下"></el-option>
								<el-option label="高中（中专）" value="高中（中专）"></el-option>
								<el-option label="大专" value="大专"></el-option>
								<el-option label="本科" value="本科"></el-option>
								<el-option label="硕士及以上" value="硕士及以上"></el-option>
							</el-select>
						</el-form-item>
					</el-col>

				</el-row>


				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="职位职称">
							<el-select v-model="ruleForm.positionOrTitle" placeholder="请选择职位职称" class="h-fwidth">
								<el-option label="职位不稳定" value="职位不稳定"></el-option>
								<el-option label="一般企事业单位员工 、通过统一执业资格考试的国家专业人员" value="一般企事业单位员工 、通过统一执业资格考试的国家专业人员"></el-option>
								<el-option label="国家机关公务员 、国有大型企业一般管理人员或初级职称人员 、私营企业高层管理人员 、个体私营业主" value="国家机关公务员 、国有大型企业一般管理人员或初级职称人员 、私营企业高层管理人员 、个体私营业主"></el-option>
								<el-option label="国有企业或上市公司中层管理人员 、科级以上干部或中级职称人员" value="国有企业或上市公司中层管理人员 、科级以上干部或中级职称人员"></el-option>
								<el-option label="国有企业或上市公司高层管理人员 、处级以上干部" value="国有企业或上市公司高层管理人员 、处级以上干部"></el-option>
								<el-option label="国家机关厅 （局） 级以上干部或高级职称人员" value="国家机关厅 （局） 级以上干部或高级职称人员"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="岗位工作年限">
							<el-select v-model="ruleForm.postWorkingLife" placeholder="请选择岗位工作年限" class="h-fwidth">
								<el-option label="1年及以下" value="1年及以下"></el-option>
								<el-option label="1~5年（含5年" value="1~5年（含5年"></el-option>
								<el-option label="5年以上" value="5年以上"></el-option>
							</el-select>
						</el-form-item>
					</el-col>

				</el-row>

				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="个人月平均收入">
							<el-input placeholder="请输入个人月平均收入" v-model="ruleForm.personalMonthlyIncome">
								<template slot="append">元</template>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="配偶月平均收入">
							<el-input placeholder="请输入配偶月平均收入" v-model="ruleForm.spouseMonthlyAverageIncome">
								<template slot="append">元</template>
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="单位或行业发展现状及前景">
							<el-select v-model="ruleForm.industryDevelopmentStatus" placeholder="请选择单位或行业发展现状及前景" class="h-fwidth">
								<el-option label="单位业绩亏损严重 ，单位和所在行业已经接近衰亡" value="单位业绩亏损严重 ，单位和所在行业已经接近衰亡"></el-option>
								<el-option label="单位业绩不断下滑 ，单位和所在行业出于衰退期" value="单位业绩不断下滑 ，单位和所在行业出于衰退期"></el-option>
								<el-option label="单位业绩平平 ，单位和所在行业处于初创期" value="单位业绩平平 ，单位和所在行业处于初创期"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="债务收入比">
							<el-select v-model="ruleForm.debtToIncomeRatio" placeholder="请选择债务收入比" class="h-fwidth">
								<el-option label="＞70%" value="＞70%"></el-option>
								<el-option label="60%~70%（含）" value="60%~70%（含）"></el-option>
								<el-option label="50%~60%（含）" value="50%~60%（含）"></el-option>
								<el-option label="40%~50%（含）" value="40%~50%（含）"></el-option>
								<el-option label="30%~40%（含）" value="30%~40%（含）"></el-option>
								<el-option label="＜30%" value="＜30%"></el-option>
							</el-select>
						</el-form-item>
					</el-col>

				</el-row>


				<el-row :gutter="20">

					<el-col :span="12">
						<el-form-item label="车辆情况">
							<el-select v-model="ruleForm.vehicleCondition" placeholder="请选择车辆情况" class="h-fwidth">
								<el-option label="无自有车辆" value="无自有车辆"></el-option>
								<el-option label="车辆5万元以下" value="车辆5万元以下"></el-option>
								<el-option label="车辆5~10（含）万元 " value="车辆5~10（含）万元"></el-option>
								<el-option label="车辆10~20（含）万元 " value="车辆10~20（含）万元"></el-option>
								<el-option label="车辆20（含）~40万元 " value="车辆20（含）~40万元"></el-option>
								<el-option label="车辆40万元以上" value="车辆40万元以上"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="房产情况">
							<el-select v-model="ruleForm.realEstateSituation" placeholder="请选择房产情况" class="h-fwidth">
								<el-option label="无自有房产" value="无自有房产"></el-option>
								<el-option label="与他人共有一处房产" value="与他人共有一处房产"></el-option>
								<el-option label="自有一处房产 " value="自有一处房产"></el-option>
								<el-option label="自有两处或以上房产 " value="自有两处或以上房产"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>


				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="信用卡使用情况">
							<el-select v-model="ruleForm.creditCardUsage" placeholder="请选择信用卡使用情况" class="h-fwidth">
								<el-option label="无信用卡或信用卡年消费额在5 万元以下 " value="无信用卡或信用卡年消费额在5 万元以下"></el-option>
								<el-option label="有1张信用卡或信用卡年消费额在5 （含）万元以上 " value="有1张信用卡或信用卡年消费额在5 （含）万元以上"></el-option>
								<el-option label="有2张或2张以上信用卡，或信用卡年消费额在10 （含）万元以上" value="有2张或2张以上信用卡，或信用卡年消费额在10 （含）万元以上"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="银行账户情况">
							<el-select v-model="ruleForm.bankAccountInformation" placeholder="请选择银行账户情况" class="h-fwidth">
								<el-option label="无银行账户 " value="无银行账户"></el-option>
								<el-option label="只有银行储蓄账户或贷款账户等一种类型账户 " value="只有银行储蓄账户或贷款账户等一种类型账户"></el-option>
								<el-option label="有储蓄账户 、贷款账户等两种类型账户" value="有储蓄账户 、贷款账户等两种类型账户"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="金融资产情况">
							<el-select v-model="ruleForm.financialAssets" placeholder="请选择金融资产情况" class="h-fwidth">
								<el-option label="没有购买任何股票 、债券 、基金 、保险等金融产品 " value="没有购买任何股票 、债券 、基金 、保险等金融产品"></el-option>
								<el-option label="金融资产总价值5万元及以下 " value="金融资产总价值5万元及以下"></el-option>
								<el-option label="金融资产总价值5~20（含）万元 " value="金融资产总价值5~20（含）万元"></el-option>
								<el-option label="金融资产总价值5~20（含）万元 " value="金融资产总价值5~20（含）万元"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="人脸识别状态">
							<el-radio class="radio" v-model="ruleForm.faceRecognitionStatus" label="成功">成功</el-radio>
							<el-radio class="radio" v-model="ruleForm.faceRecognitionStatus" label="失败">失败</el-radio>
						</el-form-item>
					</el-col>


				</el-row>

				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="在职状态">
							<el-radio class="radio" v-model="ruleForm.workingStatus" label="0">在职</el-radio>
							<el-radio class="radio" v-model="ruleForm.workingStatus" label="1">离职</el-radio>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="在职时长">
							<el-select v-model="ruleForm.workingTime" placeholder="请选择在职时长" class="h-fwidth">
								<el-option label="在当前企业在职时长小于6个月 " value="在当前企业在职时长小于6个月"></el-option>
								<el-option label="在当前企业在职时长大于6个月，小于1年 " value="在当前企业在职时长大于6个月，小于1年"></el-option>
							</el-select>
						</el-form-item>
					</el-col>

				</el-row>

				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="个贷逾期历史">
							<el-select v-model="ruleForm.overdueHistory" placeholder="请选择个贷逾期历史" class="h-fwidth">
								<el-option label="近6个月个贷最高逾期期数>=1 " value="近6个月个贷最高逾期期数>=1"></el-option>
								<el-option label="近12个月个贷累计逾期次数>=6 " value="近12个月个贷累计逾期次数>=6"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="当前逾期金额">
							<el-input placeholder="请输入当前逾期金额" v-model="ruleForm.overdueAmount">
								<template slot="append">元</template>
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')" :loading="subLoading">{{textBtn}}</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div v-else>
			<reportView></reportView>
		</div>
	</div>
</template>


<script>
	import riskReportApi from '../../api/riskReport'
	import reportView from './simulate.report'
	export default {
		components:{
			reportView
		},
		data() {
			var checkAge = (rule, value, callback) => {
				//debugger;
				if (value) {
					if (this.$regExp.number.test(value)) {
						callback();
					}else{
						callback(new Error('请输入数字值'));
					}
				}else{
					callback();
				}
			};
			var checkDeadline  = (rule, value, callback) => {
				if (value) {
					if (this.$regExp.number.test(value)) {
						callback();
					}else{
						callback(new Error('请输入数字值'));
					}
				}else{
					callback(new Error('请输入借款期限'));
				}
			};
			var checkIdCard = (rule,value,callback) =>{
				if(value){
					if(this.$regExp.idCard.test(value)){
						callback();
					}else{
						callback(new Error('身份证格式不正确'));
					}
				}else{
					callback(new Error('请输入身份证'));
				}
			};
			var checkRealName = (rule,value,callback) =>{
				if(value){
					if(this.$regExp.contactReg.test(value)){
						callback();
					}else{
						callback(new Error('姓名格式不正确'));
					}
				}else{
					callback(new Error('请输入姓名'));
				}
			};
			var checkMobile = (rule,value,callback) =>{
				if(value){
					if(this.$regExp.phone.test(value)){
						callback();
					}else{
						callback(new Error('手机号码格式不正确'));
					}
				}else{
					callback(new Error('请输入手机号码'));
				}
			};

			var checkBankCard = (rule,value,callback) =>{
				if(value){
					if(this.$regExp.banknum.test(value)){
						callback();
					}else{
						callback(new Error('银行卡号格式不正确'));
					}
				}else{
					callback(new Error('请输入银行卡号'));
				}
			};
			return {
				reportStatus:true,
				subLoading:false,
				textBtn:'生成报告',
				ruleForm: {
					realName:'',
					mobile:'',
					bankCard:'',
					idCard: '',
					productCode: '',
					deadline: '',
					age: '',
					residenceTime: '',
					education: '',
					married: '',
					health: '',
					occupationOrUnit: '',
					positionOrTitle: '',
					postWorkingLife: '',
					industryDevelopmentStatus: '',
					personalMonthlyIncome: '',
					spouseMonthlyAverageIncome: '',
					debtToIncomeRatio: '',
					realEstateSituation: '',
					financialAssets: '',
					vehicleCondition: '',
					creditCardUsage: '',
					bankAccountInformation: '',
					faceRecognitionStatus: '',
					workingTime: '',
					workingStatus: '',
					overdueAmount: '',
					overdueHistory: ''
				},
				rules: {
					realName:[
						{ required: true, validator: checkRealName }
					],
					mobile:[
						{ required: true, validator: checkMobile }
					],
					bankCard:[
						{ required: true, validator: checkBankCard }
					],
					idCard:[
						{ required: true, validator: checkIdCard }
					],
					productCode:[
						{ required: true, message: '请输入产品编号' },
						{ min: 3, max: 20, message: '长度在 3 到 20 个字符'}
					],
					deadline:[
						{ required: true, validator: checkDeadline }
					],
					age: [
						{ required: false, validator: checkAge}
					],
					region: [
						{ required: true, message: '请选择活动区域'}
					]
				}
			};
		},
		methods: {
			show(){
				this.reportStatus = true;
			},
			hide(){
				this.reportStatus = false;
			},
			test(){
				var _this = this;
				//debugger;
				_this.hide();
				var result ={
					"applyNum": 1484728015391,
					"point": 11,
					"triggerLoggers":
							[
								"年龄'25~35岁'，+3分 ",
								"婚姻状况'已婚'，+2分 ",
								"个人月平均收入'5000（含）~8000元'，+6分 ",
								"在职时长（在当前企业在职时长小于6个月）"
							],
					"suggestAmount": 2100,
					"level": "E",
					"decision": "SD",
					"ruleDecision": "RD",
					"overallDecision": "D"
				}
				setTimeout(function(){
					_this.$bus.$emit('H_simulate_echarts',{point:result.point||'',level:result.level||''});  ////分数，等级
					_this.$bus.$emit('H_simulate_topData',result);
				},800)
			},
			submitForm(formName) {
				var _this = this;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						_this.subLoading = true;
						_this.textBtn = '提交中';
						riskReportApi.simulate(_this.ruleForm).then(res =>{

							if(res.code=='0'){
							//alert(res.result.userType)
							//debugger;
							if(res.result.userType =='NORMAL'){
								_this.hide();
								setTimeout(function(){
									_this.$bus.$emit('H_simulate_echarts',{point:res.result.point||'',level:res.result.level||''});  //分数，等级
									_this.$bus.$emit('H_simulate_topData',res.result); //图形右侧信息

									//客户分析报表填充数据
									_this.$bus.$emit('H_simulate_customer',{
										realName:res.result.realName,       //姓名
										mobile:res.result.mobile,     //手机号码
										bankCard:res.result.bankCard,  //银行卡号
										idCard:res.result.idCard    //身份证号
									});
									_this.$bus.$emit('H_simulate_idVerification',res.result.certification); //身份证验证填充数据
									_this.$bus.$emit('H_simulate_preLoan',res.result.summaryList); //贷前风险分析填充数据
									_this.$bus.$emit('H_simulate_hitRule',res.result.hitRule); //命中规则填充数据
									_this.$bus.$emit('H_simulate_hitRating',res.result.hitFact); //命中等级填充数据
								},800)
							}else{
								var typeName = res.result.userType == 'BLACK'? '黑名单':'白名单';
								//var msg = '该用户存在于'+typeName+'中，建议额度：'+this.$Utils.toThousands(res.result.suggestAmount) +'元'
								var msg = '该用户存在于'+typeName+'中，建议额度：'+res.result.suggestAmount+'元'
								_this.$alert(msg, '提示', {
									confirmButtonText: '确定'
								});
							}

							}else{
								_this.$message.error(res.msg || '接口异常！');
							}
						_this.subLoading = false;
						_this.textBtn = '生成报告';
						}).catch(error =>{
							_this.$Error(_this,error);
						_this.subLoading = false;
						_this.textBtn = '生成报告';
						});

					} else {

					return false;
				}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.ruleForm = {
							realName:'',
							mobile:'',
							bankCard:'',
							idCard: '',
							productCode: '',
							deadline: '',
							age: '',
							residenceTime: '',
							education: '',
							married: '',
							health: '',
							occupationOrUnit: '',
							positionOrTitle: '',
							postWorkingLife: '',
							industryDevelopmentStatus: '',
							personalMonthlyIncome: '',
							spouseMonthlyAverageIncome: '',
							debtToIncomeRatio: '',
							realEstateSituation: '',
							financialAssets: '',
							vehicleCondition: '',
							creditCardUsage: '',
							bankAccountInformation: '',
							faceRecognitionStatus: '',
							workingTime: '',
							workingStatus: '',
							overdueAmount: '',
							overdueHistory: ''
				}
			}
		},
		created(){
			this.$bus.$off('H_simulateShow');
			this.$bus.$on('H_simulateShow',()=>{
				this.show();
			});
		},
		mounted(){}
	}
</script>

<style scoped>
	#ruleForm{width: 960px; position: relative;}
	.h-fwidth{width: 100%;}
</style>