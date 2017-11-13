<!--模拟风控报告 2017/4/21--再改版 lhw-->
<template>
	<div class="box">
		<div v-if="reportStatus">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" id="ruleForm">
				<!--预授信产品编号-->
				<!--预授信产品编号-->
				<el-row >
					<el-col :span="12">
						<div style="margin-top: 10px;">
							<strong class="h-start" style="position: absolute;left:20px;top: 18px; font-size: 14px;">预授信产品编号：</strong>
							<el-form-item label="" prop="productCode">
								<el-input v-model="ruleForm.productCode" style="width: 250px;" name="productCode" auto-complete="off" placeholder="请输入产品编号"></el-input>
							</el-form-item>
						</div>
					</el-col>
					<el-col :span="12">
						<div style="margin-top: 10px;">
							<!--操作按钮-->
							<el-form-item style="text-align: right;">
								<el-button type="primary" @click="submitForm('ruleForm')" :loading="subLoading">{{textBtn}}</el-button>
								<el-button @click="resetForm('ruleForm')">重置</el-button>
							</el-form-item>
						</div>

					</el-col>
				</el-row>

				<div style="width: 100%; clear: both; overflow: hidden; position: relative;">
					<div style="float: left; width: 140px;text-align: right; padding-right: 10px; line-height: 47px;">
						<strong >填写模拟风控数据：</strong>
					</div>
					<div style="margin-left: 150px;">
						<div style="width: 100%; position: relative;" id="h-tabBox">
							<!--tab start-->
							<el-tabs v-model="activeName"  @tab-click="handleClick">
								<!--个人基本信息Tab-->
								<el-tab-pane label="个人基本信息" name="first">
									<el-row :gutter="20" style="margin-top:20px;">
										<el-col :span="12">
											<el-form-item label="姓名" prop="realName" >
												<el-input v-model="ruleForm.realName" name="realName" auto-complete="off" placeholder="请输入姓名" class="h-fwidth"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="身份证号" prop="idCard" >
												<el-input v-model="ruleForm.idCard" name="idCard" auto-complete="off" placeholder="请输入身份证号" class="h-fwidth"></el-input>
											</el-form-item>
										</el-col>

									</el-row>

									<el-row :gutter="20">
										<el-col :span="12">
											<el-form-item label="手机号码" prop="mobile">
												<el-input v-model="ruleForm.mobile" name="mobile" auto-complete="off" placeholder="请输入手机号码" class="h-fwidth"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="银行卡号" prop="bankCard">
												<el-input v-model="ruleForm.bankCard" name="bankCard" auto-complete="off" placeholder="请输入银行卡号" class="h-fwidth"></el-input>
											</el-form-item>
										</el-col>
									</el-row>

									<el-row :gutter="20">
										<el-col :span="12">
											<el-form-item label="年龄" prop="age">
												<el-input placeholder="请输入年龄" v-model="ruleForm.age" class="h-fwidth">
													<template slot="append">岁</template>
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="户籍所在地">
												<el-select placeholder="请选择户籍所在地" class="h-fwidth">
													<el-option label="深圳" value="深圳"></el-option>
													<el-option label="北京" value="北京"></el-option>
													<el-option label="广州" value="广州"></el-option>
													<el-option label="上海" value="上海"></el-option>
													<el-option label="其他" value="其他"></el-option>
												</el-select>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="20">
										<el-col :span="12">
											<el-form-item label="现居住地">
												<el-input  placeholder="请输入现居住地" class="h-fwidth"></el-input>
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
											<el-form-item label="学历">
												<el-select v-model="ruleForm.education" placeholder="请选择学历" class="h-fwidth">
													<el-option label="初中及以下" value="初中及以下"></el-option>
													<el-option label="高中（中专）" value="高中（中专）"></el-option>
													<el-option label="大专" value="大专"></el-option>
													<el-option label="本科" value="本科"></el-option>
													<el-option label="硕士及以上" value="硕士及以上"></el-option>
												</el-select>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="院校名称">
												<el-input  placeholder="请输入院校名称" class="h-fwidth"></el-input>
											</el-form-item>
										</el-col>
									</el-row>

									<el-row :gutter="20">
										<el-col :span="12">
											<el-form-item label="入学时间">
												<el-date-picker align="right" style="width: 100%;" v-model="value4" type="year" placeholder="请选择入学时间" class="h-fwidth"></el-date-picker>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="毕业时间">
												<el-date-picker align="right" style="width: 100%;" v-model="value5" type="year" placeholder="请选择毕业时间" class="h-fwidth"></el-date-picker>
											</el-form-item>
										</el-col>
									</el-row>

									<el-row :gutter="20">
										<el-col :span="12">
											<el-form-item label="婚姻状况">
												<el-radio class="radio" v-model="ruleForm.married" label="未婚">未婚</el-radio>
												<el-radio class="radio" v-model="ruleForm.married" label="已婚">已婚</el-radio>
												<el-radio class="radio" v-model="ruleForm.married" label="丧偶">丧偶</el-radio>
												<el-radio class="radio" v-model="ruleForm.married" label="离异">离异</el-radio>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="子女数目">
												<el-select  placeholder="请选择子女数目" class="h-fwidth">
													<el-option label="1个" value="1个"></el-option>
													<el-option label="2个" value="2个"></el-option>
													<el-option label="3个" value="3个"></el-option>
													<el-option label="3个以上" value="3个以上"></el-option>
												</el-select>
											</el-form-item>
										</el-col>
									</el-row>

									<!--<el-row :gutter="20">
										<el-col :span="12">
											<el-form-item label="借款期限" prop="deadline" >
												<el-input v-model="ruleForm.deadline" name="deadline" auto-complete="off" placeholder="请输入借款期限" class="h-fwidth">
													<template slot="append">月</template>
												</el-input>
											</el-form-item>
										</el-col>
									</el-row>-->

								</el-tab-pane>

								<!--工作职业信息Tab-->
								<el-tab-pane label="工作职业信息" name="second">

									<el-row :gutter="20" style="margin-top:20px;">
										<el-col :span="12">
											<el-form-item label="单位名称">
												<el-input placeholder="请输入单位名称" class="h-fwidth"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="单位性质">
												<el-select v-model="ruleForm.occupationOrUnit" placeholder="请选择单位性质" class="h-fwidth">
													<el-option label="上市企业" value="上市企业"></el-option>
													<el-option label="国有非上市企业" value="国有非上市企业"></el-option>
													<el-option label="大型民营企业" value="大型民营企业"></el-option>
													<el-option label="中小企业" value="中小企业"></el-option>
													<el-option label="行政事业单位" value="行政事业单位"></el-option>
													<el-option label="其他" value="其他"></el-option>
												</el-select>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="20">
										<el-col :span="12">
											<el-form-item label="单位所在地">
												<el-input placeholder="请输入单位所在地" class="h-fwidth"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="所属行业">
												<el-select v-model="ruleForm.x1" placeholder="请选择所属行业" class="h-fwidth">
													<el-option label="农、林、牧、渔业" value="农、林、牧、渔业"></el-option>
													<el-option label="制造业" value="制造业"></el-option>
													<el-option label="草矿业" value="草矿业"></el-option>
													<el-option label="服务业" value="服务业"></el-option>
													<el-option label="信息技术和软件业" value="信息技术和软件业"></el-option>
													<el-option label="金融业" value="金融业"></el-option>
													<el-option label="其他" value="其他"></el-option>
												</el-select>
											</el-form-item>
										</el-col>
									</el-row>

									<el-row :gutter="20">
										<el-col :span="12">
											<el-form-item label="工作年限">
												<el-select v-model="ruleForm.postWorkingLife" placeholder="请选择工作年限" class="h-fwidth">
													<el-option label="1年以内" value="1年以内"></el-option>
													<el-option label="1-2年" value="1-2年"></el-option>
													<el-option label="2-5年" value="2-5年"></el-option>
													<el-option label="6-10年" value="6-10年"></el-option>
													<el-option label="10年以上" value="10年以上"></el-option>
												</el-select>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="岗位级别">
												<el-select v-model="ruleForm.positionOrTitle" placeholder="请选择岗位级别" class="h-fwidth">
													<el-option label="基层员工" value="基层员工"></el-option>
													<el-option label="初级专员" value="初级专员"></el-option>
													<el-option label="中级专员" value="中级专员"></el-option>
													<el-option label="高级专员" value="高级专员"></el-option>
													<el-option label="部门经理" value="部门经理"></el-option>
													<el-option label="总监" value="总监"></el-option>
													<el-option label="总经理" value="总经理"></el-option>
												</el-select>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="20">
										<el-col :span="12">
											<el-form-item label="社保号">
												<el-input placeholder="请输入社保号" class="h-fwidth"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="股权激励">
												<el-radio class="radio" v-model="ruleForm.radio1" label="无">无</el-radio>
												<el-radio class="radio" v-model="ruleForm.radio1" label="有">有</el-radio>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="20">
										<el-col :span="12">
											<el-form-item label="特殊岗位">
												<el-radio class="radio" v-model="ruleForm.radio2" label="是">是</el-radio>
												<el-radio class="radio" v-model="ruleForm.radio2" label="否">否</el-radio>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="高级管理">
												<el-radio class="radio" v-model="ruleForm.radio3" label="是">是</el-radio>
												<el-radio class="radio" v-model="ruleForm.radio3" label="否">否</el-radio>
											</el-form-item>
										</el-col>
									</el-row>

								</el-tab-pane>

								<!--经济资产情况Tab-->
								<el-tab-pane label="经济资产情况" name="third">
									<el-row :gutter="20" style="margin-top:20px;">
										<el-col :span="12">
											<el-form-item label="个人月收入" prop="personalMonthlyIncome">
												<el-input placeholder="请输入个人月收入" v-model="ruleForm.personalMonthlyIncome" class="h-fwidth">
													<template slot="append">元</template>
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="配偶月收入" prop="spouseMonthlyAverageIncome">
												<el-input placeholder="请输入配偶月收入" v-model="ruleForm.spouseMonthlyAverageIncome" class="h-fwidth">
													<template slot="append">元</template>
												</el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="20">
										<el-col :span="12">
											<el-form-item label="家庭月支出" prop="input1">
												<el-input placeholder="请输入家庭月支出" v-model="ruleForm.input1" class="h-fwidth">
													<template slot="append">元</template>
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="房产情况">
												<el-select v-model="ruleForm.realEstateSituation" placeholder="请选择房产情况" class="h-fwidth">
													<el-option label="无自有房产" value="无自有房产"></el-option>
													<el-option label="自有一处房产 " value="自有一处房产"></el-option>
													<el-option label="自有两处或以上房产 " value="自有两处或以上房产"></el-option>
													<el-option label="与他人共有一处房产" value="与他人共有一处房产"></el-option>
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
											<el-form-item label="金融资产情况">
												<el-select v-model="ruleForm.financialAssets" placeholder="请选择金融资产情况" class="h-fwidth">
													<el-option label="没有购买任何股权/债券/基金/保险等产品" value="没有购买任何股权/债券/基金/保险等产品"></el-option>
													<el-option label="金融资产总价值5万元以下 " value="金融资产总价值5万元以下"></el-option>
													<el-option label="金融资产总价值5~20(含)万元" value="金融资产总价值5~20(含)万元"></el-option>
													<el-option label="金融资产总价值20万元以上" value="金融资产总价值20万元以上"></el-option>
												</el-select>
											</el-form-item>
										</el-col>

									</el-row>

									<el-row :gutter="20">
										<el-col :span="12">
											<el-form-item label="债务收入比">
												<el-select v-model="ruleForm.debtToIncomeRatio" placeholder="请选择债务收入比" class="h-fwidth">
													<el-option label="＜30%" value="＜30%"></el-option>
													<el-option label="30%~40%（含）" value="30%~40%（含）"></el-option>
													<el-option label="40%~50%（含）" value="40%~50%（含）"></el-option>
													<el-option label="50%~60%（含）" value="50%~60%（含）"></el-option>
													<el-option label="60%~70%（含）" value="60%~70%（含）"></el-option>
												</el-select>
											</el-form-item>
										</el-col>

									</el-row>
								</el-tab-pane>

								<!--与金融机构关系Tab-->
								<el-tab-pane label="与金融机构关系" name="fourth">
									<el-row :gutter="20" style="margin-top:20px;">
										<el-col :span="12">
											<el-form-item label="银行账户情况">
												<el-select v-model="ruleForm.bankAccountInformation" placeholder="请选择银行账户情况" class="h-fwidth">
													<el-option label="只有储蓄账户 " value="只有储蓄账户"></el-option>
													<el-option label="只有贷款账户 " value="只有贷款账户"></el-option>
													<el-option label="兼有储蓄和贷款账户" value="兼有储蓄和贷款账户"></el-option>
												</el-select>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="信用卡使用情况">
												<el-select v-model="ruleForm.creditCardUsage" placeholder="请选择信用卡使用情况" class="h-fwidth">
													<el-option label="1张信用卡，年消费额在5万以下" value="1张信用卡，年消费额在5万以下"></el-option>
													<el-option label="1张信用卡，年消费额在5万~10万" value="1张信用卡，年消费额在5万~10万"></el-option>
													<el-option label="2张或2张以上信用卡，年消费额在5万以下" value="2张或2张以上信用卡，年消费额在5万以下"></el-option>
													<el-option label="2张或2张以上信用卡，年消费额在5万~10万" value="2张或2张以上信用卡，年消费额在5万~10万"></el-option>
													<el-option label="2张或2张以上信用卡，年消费额在10万以上" value="2张或2张以上信用卡，年消费额在10万以上"></el-option>
												</el-select>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="20">
										<el-col :span="12">
											<el-form-item label="银行贷款余额">
												<el-select v-model="ruleForm.select9" placeholder="请选择银行贷款余额" class="h-fwidth">
													<el-option label="10万以内 " value="10万以内"></el-option>
													<el-option label="20-30万 " value="20-30万"></el-option>
													<el-option label="30-50万" value="30-50万"></el-option>
													<el-option label="50-80万" value="50-80万"></el-option>
													<el-option label="80-100万" value="80-100万"></el-option>
													<el-option label="100万以上" value="100万以上"></el-option>
												</el-select>
											</el-form-item>
										</el-col>
									</el-row>
								</el-tab-pane>

								<!--借款情况Tab-->
								<el-tab-pane label="借款情况" name="fifth">
									<el-row :gutter="20" style="margin-top:20px;">
										<el-col :span="12">
											<el-form-item label="是否有审批中借款">
												<el-radio class="radio" v-model="ruleForm.radio10" label="有">有</el-radio>
												<el-radio class="radio" v-model="ruleForm.radio10" label="无">无</el-radio>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="是否逾期借款">
												<el-radio class="radio" v-model="ruleForm.radio9" label="有">有</el-radio>
												<el-radio class="radio" v-model="ruleForm.radio9" label="无">无</el-radio>
											</el-form-item>
										</el-col>
									</el-row>

									<el-row :gutter="20">
										<el-col :span="12">
											<el-form-item label="逾期期限">
												<el-select v-model="ruleForm.overdueHistory" placeholder="请选择个贷逾期历史" class="h-fwidth">
													<el-option label="10天以内" value="10天以内"></el-option>
													<el-option label="10~30天" value="10~30天"></el-option>
													<el-option label="30天以上" value="30天以上"></el-option>
												</el-select>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="个人逾期金额">
												<el-input placeholder="请输入个人逾期金额" v-model="ruleForm.overdueAmount" class="h-fwidth">
													<template slot="append">元</template>
												</el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="20">
										<el-col :span="12">
											<el-form-item label="个贷逾期期数">
												<el-input placeholder="请输入个贷逾期期数" v-model="ruleForm.input10" class="h-fwidth">
													<template slot="append">期</template>
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="正常还款期数">
												<el-input placeholder="请输入借款期限" v-model="ruleForm.input9" class="h-fwidth">
													<template slot="append">期</template>
												</el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="20">
										<el-col :span="12">
											<el-form-item label="授信期限到期">
												<el-radio class="radio" v-model="ruleForm.radio8" label="是">是</el-radio>
												<el-radio class="radio" v-model="ruleForm.radio8" label="否">否</el-radio>
											</el-form-item>
										</el-col>
									</el-row>
								</el-tab-pane>

								<!--其他征信数据Tab-->
								<el-tab-pane label="其他征信数据" name="sixth">
									<el-row :gutter="20" style="margin-top:20px;">
										<el-col :span="12">
											<el-form-item label="芝麻信用分">
												<el-input  auto-complete="off" placeholder="请输入芝麻信用分" class="h-fwidth"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="同盾反欺诈分">
												<el-input  auto-complete="off" placeholder="请输入同盾反欺诈分" class="h-fwidth"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="20">
										<el-col :span="12">
											<el-form-item label="百融反欺诈分">
												<el-input  auto-complete="off" placeholder="请输入百融反欺诈分" class="h-fwidth"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="百融信用分">
												<el-input  auto-complete="off" placeholder="请输入百融信用分" class="h-fwidth"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="20">
										<el-col :span="12">
											<el-form-item label="特殊名单">
												<el-radio class="radio" v-model="ruleForm.radio6"  label="1">是</el-radio>
												<el-radio class="radio"  v-model="ruleForm.radio6" label="0">否</el-radio>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="法院失信名单">
												<el-radio class="radio" v-model="ruleForm.radio5"  label="1">是</el-radio>
												<el-radio class="radio" v-model="ruleForm.radio5"  label="0">否</el-radio>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row :gutter="20">
										<el-col :span="12">
											<el-form-item label="消费流水认证" >
												<el-input placeholder="请输入消费流水认证" class="h-fwidth">
													<template slot="append">元</template>
												</el-input>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="通讯录联系人数量">
												<el-input  auto-complete="off" placeholder="请输入通讯录联系人数量" class="h-fwidth"></el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-tab-pane>
							</el-tabs>
							<!--tab end-->
						</div>
					</div>
				</div>

				<!--按钮操作-->
				<!--<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')" :loading="subLoading">{{textBtn}}</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>-->
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

			//tab1
			var checkAge = (rule, value, callback) => {
				//debugger;
				if (value) {
					if (this.$regExp.number.test(value)) {
						//callback();
						if (value < 18) {
							this.errorActive = 'first';
							callback(new Error('必须年满18岁'));
						}else if(value > 100){
							this.errorActive = 'first';
							callback(new Error('年龄必须小于100岁'));
						} else {
							callback();
						}
					}else{
						this.errorActive = 'first';
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
						this.errorActive = 'first';
						callback(new Error('请输入数字值'));
					}
				}else{
					this.errorActive = 'first';
					callback(new Error('请输入借款期限'));
				}
			};



			var checkIdCard = (rule,value,callback) =>{
				if(value){
					if(this.$regExp.idCard.test(value)){
						callback();
					}else{
						this.errorActive = 'first';
						callback(new Error('身份证格式不正确'));
					}
				}else{
					this.errorActive = 'first';
					callback(new Error('请输入身份证'));
				}
			};
			var checkRealName = (rule,value,callback) =>{
				if(value){
					if(this.$regExp.contactReg.test(value)){
						callback();
					}else{
						this.errorActive = 'first';
						callback(new Error('姓名格式不正确'));
					}
				}else{
					this.errorActive = 'first';
					callback(new Error('请输入姓名'));
				}
			};
			var checkMobile = (rule,value,callback) =>{
				if(value){
					if(this.$regExp.phone.test(value)){
						callback();
					}else{
						this.errorActive = 'first';
						callback(new Error('手机号码格式不正确'));
					}
				}else{
					this.errorActive = 'first';
					callback(new Error('请输入手机号码'));
				}
			};

			var checkBankCard = (rule,value,callback) =>{
				if(value){
					if(this.$regExp.banknum.test(value)){
						callback();
					}else{
						this.errorActive = 'first';
						callback(new Error('银行卡号格式不正确'));
					}
				}else{
					this.errorActive = 'first';
					callback(new Error('请输入银行卡号'));
				}
			};


			//tab3检查收入
			var checkMunber  = (rule, value, callback) => {
				if (value) {
					if (this.$regExp.number.test(value)) {
						callback();
					}else{
						this.errorActive = 'third';
						callback(new Error('请输入数字值'));
					}
				}else{
					callback();
				}
			};

			return {
				activeName: 'first', //tab
				errorActive:'first',
				//未定字段
				value4:'',
				value5:'',
				//是否现在报告
				reportStatus:true,
				subLoading:false,
				textBtn:'生成报告',
				ruleForm: {
					//待确定
					radio1:'',
					radio2:'',
					radio3:'',
					radio4:'',
					radio5:'1',
					radio6:'1',
					radio7:'',
					radio8:'',
					radio9:'',
					radio10:'',
					select1:'',
					select2:'',
					select3:'',
					select4:'',
					select5:'',
					select6:'',
					select7:'',
					select8:'',
					select9:'',
					select10:'',
					input1:'', //家庭月支出
					input2:'',
					input3:'',
					input4:'',
					input5:'',
					input7:'',
					input8:'',
					input9:'',
					input10:'',
					input11:'',

					//已对接
					realName:'',
					mobile:'',
					bankCard:'',
					idCard: '',
					productCode: '',
					deadline: '',
					age: '',
					residenceTime: '',
					education: '',
					married: '未婚',
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
					],
					//收入
					personalMonthlyIncome:[
						{required:false,validator:checkMunber}
					],
					spouseMonthlyAverageIncome:[
						{required:false,validator:checkMunber}
					],
					input1:[
						{required:false,validator:checkMunber}
					],
				}
			};
		},
		methods: {
			handleClick(tab, event) { //tab

			},
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
										idCard:res.result.idCard,    //身份证号
										productCode:res.result.productCode,  //产品编号号
										deadline:12

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

				_this.activeName=_this.errorActive;
				//_this.$message.warning('数据验证失败，请检查数据是否满足约束条件！');
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
							deadline: 12,
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
	#ruleForm{width: 100%; position: relative;}
	.h-fwidth{width: 100%; max-width: 320px;}
	.h-title{font-size: 14px;margin: 0; padding-left: 21px; height:40px; line-height: 40px; margin-bottom: 10px;}
	.h-tabMT{margin-bottom: 20px;}
	#h-tabBox input[type='text']{max-width: 250px!important;}
</style>