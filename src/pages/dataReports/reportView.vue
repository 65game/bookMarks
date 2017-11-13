<!--查看风控分析报表 2017/4/18 lhw-->
<template>
	<div class="box" style="min-width: 1000px;">
		<!--id="editor"-->
		<div id="editor">
			<!--个人信息  echarts-->
			<div class="h-box">
				<el-row>
					<el-col :span="12" style="position: relative;">
						<el-form  label-width="150px">
							<el-form-item label="报告编号：">
								<span>{{topData.applyNum}}</span>
							</el-form-item>
							<el-form-item label="评分：" class="h-chartR">
								<div id="mainChart" style="width:400px; height:300px;"></div>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="12">
						<el-form  label-width="150px">
							<el-form-item label="报告生成时间：">
								<span>{{topData.createTime}}</span>
							</el-form-item>
							<el-form-item label="规则决策结果：">
								<span>{{topData.ruleDecision}}</span>
							</el-form-item>
							<el-form-item label="综合决策结果：">
								<span>{{topData.overallDecision}}</span>
							</el-form-item>
							<el-form-item label="建议额度：">
								<span>{{topData.suggestAmount}}元</span>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>
			</div>

			<!--客户分析报告-->
			<div class="h-box">
				<h3 class="h-title" style="margin: 0; padding: 0;">客户分析报告</h3>
				<el-row>
					<el-col :span="12">
						<el-form  label-width="150px">
							<el-form-item label="姓名：">
								<span>{{customerData.realName}}</span>
							</el-form-item>
							<el-form-item label="手机号：">
								<span>{{customerData.mobile}}</span>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="12">
						<el-form  label-width="150px">
							<el-form-item label="身份证号：">
								<span>{{customerData.idCard}}</span>
							</el-form-item>
							<el-form-item label="银行卡号：">
								<span>{{customerData.bankCard}}</span>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>

				<!--贷前风险汇总-->
				<table class="h-table" style="width: 100%;">
					<thead class="h-thead">
					<tr>
						<th height="40px" colspan="2" style="font-size: 16px;">贷前风险汇总</th>
					</tr>
					</thead>
					<tbody class="h-tbody">
					<tr>
						<th width="40%">风险类别</th>
						<th width="60%">命中规则</th>
					</tr>
					<template v-if="preLoanData.length > 0">
						<tr v-for="item in preLoanData" >
							<td width="40%">{{item.type}}</td>
							<td width="60%">{{item.hitNum}}</td>
						</tr>
					</template>
					<template v-else>
						<tr >
							<td colspan="2" style="text-align: center; color: #999;">暂无数据</td>
						</tr>
					</template>
					</tbody>
				</table>

				<!--个人信息 --明细-->
				<h1 class="h-report-mainTitle">个人信息</h1>
				<h2 class="h-report-subTitle">身份证验证</h2>
				<table class="h-table" style="width: 100%;">
					<tbody class="h-tbody" style="table-layout: fixed;">
					<tr>
						<td width="150" class="h-bgeee">姓名：</td>
						<td width="">{{IDVerification.realName}}</td>
						<td width="200" rowspan="4">
							<img src="../../../static/images/idDefault.png" alt="身份证照片" title="身份证照片">
						</td>
					</tr>
					<tr>
						<td class="h-bgeee">身份证号：</td>
						<td>{{IDVerification.idCard}}</td>
					</tr>
					<tr>
						<td class="h-bgeee">结果：</td>
						<td>{{IDVerification.result}}</td>
					</tr>
					<tr>
						<td class="h-bgeee">身份证归属地：</td>
						<td>{{IDVerification.attribution}}</td>
					</tr>
					</tbody>

				</table>

				<!--命中规则-->
				<h1 class="h-report-mainTitle">命中规则</h1>
				<div v-if="hitRuleData.length > 0">
					<template v-for="item in hitRuleData">
						<h2 class="h-report-subTitle">{{item.type}}</h2>
						<table class="h-table" style="width: 100%; table-layout: fixed;">
							<tbody class="h-tbody">
							<tr>
								<th width="33%">规则子类</th>
								<th width="33%">规则名称</th>
								<th width="">决策等级</th>
							</tr>
							<template v-if="item.hitRuleDetail.length >0">
								<tr v-for="key in item.hitRuleDetail">
									<td>{{key.type}} </td>
									<td>{{key.name}}</td>
									<td>{{key.decision}}</td>
								</tr>
							</template>
							<template v-else>
								<tr >
									<td colspan="3" style="text-align: center; color: #999;">暂无数据</td>
								</tr>
							</template>

							</tbody>
						</table>
					</template>
				</div>
				<div v-else>
					<div  class="h-noData">没有命中规则</div>
				</div>

				<!--命中评分-->
				<h1 class="h-report-mainTitle">命中评分</h1>
				<div v-if="hitRatingData.length >0">
					<template v-for="item in hitRatingData">
						<h2 class="h-report-subTitle">{{item.type}}</h2>
						<table class="h-table" style="width: 100%; table-layout: fixed;">
							<tbody class="h-tbody">
							<tr>
								<th width="33%">指标类别</th>
								<th width="33%">指标明细</th>
								<th width="">指标分值</th>
							</tr>
							<template v-if="item.hitFactDetail.length >0">
								<tr v-for="key in item.hitFactDetail">
									<td>{{key.type}} </td>
									<td>{{key.name}}</td>
									<td>{{key.score}}</td>
								</tr>
							</template>
							<template v-else>
								<tr >
									<td colspan="3" style="text-align: center; color: #999;">暂无数据</td>
								</tr>
							</template>
							</tbody>
						</table>
					</template>
				</div>
				<div v-else>
					<div  class="h-noData">没有命中评分</div>
				</div>

				<!--end-->

			</div>

		</div>


		<!--按钮-->
		<el-row class="h-scoreSet-btnBox" style="margin-left: 16px; text-align: center;">
			<el-button  icon="d-arrow-left" @click="gotoBack">返回</el-button>
			<el-button type="primary" icon="document" @click="exportPdf">导出PDF</el-button>
		</el-row>


		<div id="test" style="margin-top: 50px;">

		</div>

	</div>
</template>

<script>
	import echarts from 'echarts'
	import riskReport from '../../api/riskReport'
	export default{
		data (){
			return {
				chartColumn:null,
				//图表右侧信息
				topData:{
					applyNum:'',       //编号
					createTime:'',     //生成时间
					ruleDecision:'',  //规则决策结果
					overallDecision:'', //综合决策结果
					suggestAmount:'' //建议额度
				},
				//客户信息
				customerData:{
					realName:'',//姓名
					mobile:'',//手机号码
					idCard:'',//身份证号
					bankCard:''//银行卡号
				},
				//贷前风险汇总
				preLoanData:[],
				//身份验证
				IDVerification:{
					realName:'',//姓名
					idCard:'',//身份证号
					attribution:'',//身份证归属地,
					photo:'', //身份证图片
					result:''//结果
				},
				//命中规则
				hitRuleData:[],
				//命中评分
				hitRatingData:[],
				//测试模拟接口数据
				result:{
					"applyNum": 1492504422441,
					"point": 40,
					"triggerLoggers": [
						"个人信息-现址居住年限-非本市居住-1",
						"个人信息-年龄-25~35岁-3",
						"职业信息-在职时长-在当前企业在职时长小于6个月-RD",
						"职业信息-工龄检测-总工龄小于2年-D"
					],
					"suggestAmount": 280,
					"level": "E",
					"decision": "SD-评分快速拒绝",
					"ruleDecision": "D-快速拒绝",
					"overallDecision": "D-快速拒绝",
					"createTime": "2017-04-18 08:33:43",
					"userType": "NORMAL",
					"summaryList": [
						{
							"type": "个人信息",
							"hitNum": 0
						},
						{
							"type": "职业信息",
							"hitNum": 2
						},
						{
							"type": "借款情况",
							"hitNum": 0
						}
					],
					"certification": {
						"realName": "李文",
						"idCard": "440823199010051234",
						"result": "一致",
						"attribution": "暂无法获取"
					},
					"hitRule": [
						{
							"type": "职业信息",
							"hitRuleDetail": [
								{
									"type": "在职时长",
									"name": "在当前企业在职时长小于6个月",
									"decision": "RD-审慎审核"
								},
								{
									"type": "工龄检测",
									"name": "总工龄小于2年",
									"decision": "D-快速拒绝"
								}
							]
						}
					],
					"hitFact": [
						{
							"type": "个人信息",
							"hitFactDetail": [
								{
									"type": "现址居住年限",
									"name": "非本市居住",
									"score": "1"
								},
								{
									"type": "年龄",
									"name": "25~35岁",
									"score": "3"
								}
							]
						}
					],
					"realName": "李鸿文",
					"mobile": "13434636718",
					"bankCard": "6222023654258849987",
					"idCard": "440823199010051234"
				},
			}
		},
		methods:{
			//导出pdf
			exportPdf(){
				var _this = this;
				var id = _this.$route.query.id;
				if(!id) return;
				riskReport.ajaxPdf(id).then(res =>{
					if(res.code !='-1'){
					riskReport.exportPdf(id);
				}
			}).catch(error =>{
					_this.$Error(_this,error);
			})
			},
			//获取个人客户分析报告
			getPersonReport(){
				var _this = this;
				var params = {
					custAppkey:_this.$route.query.custAppkey,
					productCode:_this.$route.query.productCode,
					personId:_this.$route.query.personId
				};
				var id = _this.$route.query.id;
				if(!id) return;
				riskReport.getPersonReport(id).then(res =>{
					if(res.code =='0'){
						_this.result =  eval("("+res.result.content+")");
						_this.demoInit(_this.result);
					    var obj = res.result;
						//填充
						_this.customerRender({
							realName:obj.userName,       //姓名
							mobile:obj.phone,     //手机号码
							idCard:obj.idCard,   //身份证号
							bankCard:obj.bankCard
						});
					}else{
						_this.$message({
							type: 'warning',
							message: res.msg || '操作失败！'
						});
					}
				}).catch(error =>{
				 _this.$Error(_this,error)
				});
			},

			gotoBack(){
				this.$router.push({ path: '/customerList'});
			},
			//图表
			chartInit(parmas){
				var parmas = typeof parmas =='object'?parmas :{};
				var obj = {
					min:parmas.min || 0,
					max:parmas.max ||1000,
					name:parmas.name || '评分等级',
					type:'gauge',
					data:[{value:parmas.point || 0,name:parmas.level || ''}] // point评分，level等级
				};
				var arr = [];
				arr.push(obj);
				this.chartColumn = echarts.init(document.getElementById('mainChart'));
				this.chartColumn.setOption({
					/*tooltip : {
						formatter: "{a} <br/>{b} : {c}分"
					},*/
					series: arr
				});
			},
			//图表右侧信息填充数据
			topDataRender(params){
				this.topData = {
					applyNum:params.applyNum ||'— —',       //编号
					createTime:params.createTime ||'— —',     //生成时间
					ruleDecision:params.ruleDecision ||'— —',  //规则决策结果
					overallDecision:params.overallDecision ||'— —', //综合决策结果
					suggestAmount:this.$Utils.addThousandSign(params.suggestAmount,2)//建议额度
				}
			},
			//客户分析报表填充数据
			customerRender(params){
				this.customerData = {
					realName:params.realName ||'— —',       //姓名
					mobile:params.mobile ||'— —',     //手机号码
					bankCard:params.bankCard ||'— —',  //银行卡号
					idCard:params.idCard ||'— —'  //身份证号
				}
			},
			//身份验证填充数据
			idVerificationRender(params){
				this.IDVerification = {
					realName:params.realName,//姓名
					idCard:params.idCard,//身份证号
					attribution:params.attribution || '— —',//身份证归属地,
					photo:params.photo || '', //身份证图片
					result:params.result//结果
				}
			},
			//贷前风险分析填充数据
			preLoanRender(data){
				for(var i= 0,len = data.length; i<len; i++){
					if(data[i].val ==null || data[i].val ==''){
						data[i].val = '— —';
					}
				}
				this.preLoanData =  data;
			},
			//命中规则填充数据
			hitRuleRender(data){
				this.hitRuleData = data;
			},
			//命中等级填充数据
			hitRatingRender(data){
				this.hitRatingData = data;
			},



			exportPDF(){
				/*var doc = new jsPDF();
				doc.text('Hello world!', 10, 10);
				doc.save('a4.pdf')*/

				/*html2canvas(document.body).then(function(canvas) {
					//document.body.appendChild(canvas);
					document.getElementById('test').appendChild(canvas);
				});*/

				html2canvas(document.getElementById('editor')).then(function(canvas) {
					//document.body.appendChild(canvas);
					//canvas.setAttribute('id','demo');

					//document.getElementById('test').appendChild(canvas);

					/*var imgData = canvas.toDataURL('img/notice/png');
					var doc = new jsPDF('p', 'px','a3');
					//第一列 左右边距  第二列上下边距  第三列是图片左右拉伸  第四列 图片上下拉伸
					doc.addImage(imgData, 'PNG', -9, 0,650,1500);
					doc.addPage();
					doc.addImage(imgData, 'PNG', -9, -900,650,1500);
					doc.save('test.pdf');*/


					//var image    = canvas.toDataURL("image/png");
					//var w=window.open('about:blank','image from canvas');
					//w.document.write("<img src='"+image+"' alt='from canvas'/>");

					var image = canvas.toDataURL("image/png");
					var pHtml = "<img src="+image+" title='操蛋的canvas' />";
					document.getElementById('test').innerHTML = pHtml;


				});

			},

			//测试代码
			demoInit(){
				var _this = this;
				this.chartInit({point:_this.result.point||'',level:_this.result.level||''});
				this.topDataRender(_this.result); ///图形右侧信息
				this.preLoanRender(_this.result.summaryList); //贷前风险分析填充数据
				this.customerRender({
					realName:_this.result.realName,       //姓名
					mobile:_this.result.mobile,     //手机号码
					bankCard:_this.result.bankCard,  //银行卡号
					idCard:_this.result.idCard    //身份证号
				});
				this.idVerificationRender(_this.result.certification); //身份验证
				this.hitRuleRender(_this.result.hitRule); //命中规则
				this.hitRatingRender(_this.result.hitFact); //命中等级填充数据
			},
		},
		mounted:function(){
			this.getPersonReport();
			//this.demoInit();

		}

	}
</script>

<style scoped>
	.chart {
		width: 100%;
		float: left;
	}
	/*.chart div {
        height: 400px;
        float: left;
    }*/

	#mainChart{position: absolute; left: -70px; top: -40px;}
	.el-col {
		padding: 30px 20px;
	}
	.box{ position: relative; width: 95%; margin: 0 auto; clear: both; overflow: hidden;}
	.h-box{position: relative; width: 100%; clear: both; overflow: hidden; margin-bottom: 25px;}
	.h-box .h-title{text-align: center; height: 50px; line-height: 35px; border-bottom: 1px solid #ddd; font-size: 15px; }
	.h-table{
		color:#333;
		border-width: 1px;
		border-color: #ddd;
		border-collapse: collapse;
	}
	.h-table th{
		border-width: 1px;
		padding: 8px;
		border-style: solid;
		border-color: #ddd;
		background-color: #eee;
	}
	.h-table td{
		border-width: 1px;
		padding: 8px;
		border-style: solid;
		border-color: #ddd;
		background-color: #fff;
		text-align: center;;
	}

	.h-report-mainTitle{height: 57px; width: 100%; text-align: center; background-color:#eee; font-size: 16px; line-height: 57px; margin-top: 40px;}

	.h-report-subTitle{height: 30px; width: 100%; text-align: center; background-color:#fff; font-size: 15px; line-height: 30px;  }
	.h-table td.h-bgeee{background-color:#eee; text-align: right;}

	.h-report-divBox{border: 1px solid #ddd; position: relative; overflow: hidden; clear: both; padding: 15px; }
	.h-report-divBox .h-lineRow{ position: relative; overflow: hidden; clear: both;}
	.h-lineRow .h-spanName{  text-align: right; line-height: 45px;}
	.h-lineRow .h-fl{float: left; padding-left: 150px;}
	.h-Ttn{ text-align: right; vertical-align: top;}
	.h-Ttc{padding-bottom: 35px; line-height: 25px;}

	.h-noData{border: 1px solid rgb(204, 204, 204);
		height: 50px;
		line-height: 50px;
		margin-top: -16px; text-align: center; color: #999;}

	.el-col{
		padding: 10px 20px;
	}
</style>