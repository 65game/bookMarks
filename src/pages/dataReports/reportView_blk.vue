<!--查看风控分析报表 2017/3/31 lhw-->
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
								<span>0001</span>
							</el-form-item>
							<el-form-item label="评分：" class="h-chartR">
								<div id="mainChart" style="width:400px; height:300px;"></div>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="12">
						<el-form  label-width="150px">
							<el-form-item label="报告生成时间：">
								<span>2016-12-02  10:00:00</span>
							</el-form-item>
							<el-form-item label="规则决策结果：">
								<span>— —</span>
							</el-form-item>
							<el-form-item label="综合决策结果：">
								<span>— —</span>
							</el-form-item>
							<el-form-item label="建议额度：">
								<span>206元</span>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>
			</div>

			<!--客户分析报告-->
			<!--<div class="h-box" style="margin-top: -125px;">-->
			<div class="h-box">
				<h3 class="h-title">客户分析报告</h3>
				<el-row>
					<el-col :span="12">
						<el-form  label-width="150px">
							<el-form-item label="姓名：">
								<span>杨小荣</span>
							</el-form-item>
							<el-form-item label="手机号：">
								<span>13636762325</span>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="12">
						<el-form  label-width="150px">
							<el-form-item label="身份证号：">
								<span>220521335213221299</span>
							</el-form-item>
							<el-form-item label="银行卡号：">
								<span>6229123223123538999</span>
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
					<tr>
						<td width="40%">个人信息</td>
						<td width="60%">— —</td>
					</tr>
					<tr>
						<td>职业信息</td>
						<td>5</td>
					</tr>
					<tr>
						<td>借款情况</td>
						<td>5</td>
					</tr>
					<tr>
						<td>个人基本情况</td>
						<td>— —</td>
					</tr>

					<tr>
						<td>工作情况</td>
						<td>— —</td>
					</tr>
					<tr>
						<td>经济情况</td>
						<td>— —</td>
					</tr>
					<tr>
						<td>与金融机构关系情况</td>
						<td>— —</td>
					</tr>
					</tbody>

				</table>

				<!--个人信息 --明细-->
				<h1 class="h-report-mainTitle">个人信息</h1>
				<h2 class="h-report-subTitle">身份证验证</h2>
				<table class="h-table" style="width: 100%;">
					<tbody class="h-tbody" style="table-layout: fixed;">
					<tr>
						<td width="150" class="h-bgeee">姓名：</td>
						<td width="">杨小荣</td>
						<td width="200" rowspan="4">
							身份证件照
						</td>
					</tr>
					<tr>
						<td class="h-bgeee">身份证号：</td>
						<td>220521335213221299</td>
					</tr>
					<tr>
						<td class="h-bgeee">结果：</td>
						<td>一致</td>
					</tr>
					<tr>
						<td class="h-bgeee">身份证归属地：</td>
						<td>东北省黑龙江市二道区</td>
					</tr>
					</tbody>

				</table>

				<!--手机三要素-->
				<h2 class="h-report-subTitle">手机三要素</h2>
				<table class="h-table" style="width: 100%;">
					<tbody class="h-tbody" style="table-layout: fixed;">
					<tr>
						<td width="150" class="h-bgeee">校验项：</td>
						<td width="" >姓名、手机号码、身份证号</td>
						<td width="150" rowspan="2" class="h-bgeee">手机号码归属地：</td>
						<td width="250" rowspan="2">广东深圳移动</td>
					</tr>
					<tr>
						<td class="h-bgeee">结果：</td>
						<td>均一致</td>
					</tr>
					</tbody>
				</table>


				<!--命中规则-->
				<h1 class="h-report-mainTitle">命中规则</h1>
				<!--命中规则  > 个人信息-->
				<h2 class="h-report-subTitle">个人信息</h2>
				<table class="h-table" style="width: 100%; table-layout: fixed;">
					<tbody class="h-tbody">
					<tr>
						<th width="33%">规则子类</th>
						<th width="33%">规则名称</th>
						<th width="">决策等级</th>
					</tr>
					<tr>
						<td>年龄 </td>
						<td>18岁</td>
						<td>RD-重点关注</td>
					</tr>
					<tr>
						<td>现址居住年限 </td>
						<td>三年以上</td>
						<td>R-人工审核</td>
					</tr>
					</tbody>
				</table>
				<!--命中规则  > 职业信息-->
				<h2 class="h-report-subTitle">职业信息</h2>
				<table class="h-table" style="width: 100%; table-layout: fixed;">
					<tbody class="h-tbody">
					<tr>
						<th width="33%">规则子类</th>
						<th width="33%">规则名称</th>
						<th width="">决策等级</th>
					</tr>
					<tr>
						<td>是否有审批中的借款 </td>
						<td>是否有审批中的借款</td>
						<td>RD-重点关注</td>
					</tr>
					</tbody>
				</table>

				<!---命中评分->
				<!--命中评分-->
				<h1 class="h-report-mainTitle">命中评分</h1>
				<!--命中评分  > 个人基本情况-->
				<h2 class="h-report-subTitle">个人基本情况</h2>
				<table class="h-table" style="width: 100%; table-layout: fixed;">
					<tbody class="h-tbody">
					<tr>
						<th width="33%">指标类别</th>
						<th width="33%">指标明细</th>
						<th width="">决策等级</th>
					</tr>
					<tr>
						<td>年龄 </td>
						<td>18岁</td>
						<td>RD-重点关注</td>
					</tr>
					</tbody>
				</table>
				<!--命中评分  > 工作情况-->
				<h2 class="h-report-subTitle">工作情况</h2>
				<table class="h-table" style="width: 100%; table-layout: fixed;">
					<tbody class="h-tbody">
					<tr>
						<th width="33%">指标类别</th>
						<th width="33%">指标明细</th>
						<th width="">决策等级</th>
					</tr>
					<tr>
						<td>职业或单位 </td>
						<td>一般国有企业 、股份公司 、私营企业员工或个体户 </td>
						<td>RD-重点关注</td>
					</tr>
					</tbody>
				</table>


				<!--综合信息-->
				<h1 class="h-report-mainTitle">综合信息</h1>
				<!--综合信息  > 手机信息查询-->
				<h2 class="h-report-subTitle">手机信息查询</h2>
				<table class="h-table" style="width: 100%; table-layout: fixed;">
					<tbody class="h-tbody">
					<tr>
						<th width="33%">手机在网状态</th>
						<th width="33%">手机在网时长</th>
						<th width="">手机消费档次</th>
					</tr>
					<tr>
						<td>正常 </td>
						<td>十二个月以上</td>
						<td>最近三个月消费 > 300元</td>
					</tr>
					</tbody>
				</table>
				<!--综合信息  > 个人信用报告-->
				<h2 class="h-report-subTitle">个人信用报告</h2>
				<div class="h-report-divBox">
					<table style="table-layout: fixed;">
						<tr>
							<td width="100"   class="h-Ttn" ><strong>信用卡：</strong></td>
							<td  class="h-Ttc">一致性 Consistency

								与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
								在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
								反馈 Feedback

								控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
								页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。
								效率 Efficiency

								简化流程：设计简洁直观的操作流程；
								清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
								帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</td>
						</tr>
						<tr>
							<td class="h-Ttn" ><strong>其它贷款：</strong></td>
							<td class="h-Ttc">

							描述XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

							XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

							XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

							XXXXXXXXXXXXXXXXXXXXXXXXXXXXX

							XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
						</td>
						</tr>
						<tr>
						<td class="h-Ttn" ><strong>欠税记录：</strong></td>
						<td class="h-Ttc">

							描述XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

							XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

							XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

							XXXXXXXXXXXXXXXXXXXXXXXXXXXXX

							XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
						</td>
						</tr>

					</table>
				</div>


				<!--end-->

			</div>

		</div>


		<!--按钮-->
		<el-row class="h-scoreSet-btnBox" style="margin-left: 16px; text-align: center;">
			<!--<el-button type="primary" icon="document" @click="exportPDF">导出PDF</el-button>-->
			<el-button type="primary" icon="document" >导出PDF</el-button>
			<el-button type="primary" icon="d-arrow-left" @click="gotoBack">返回</el-button>
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
				result:{
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
			}
		},
		methods:{
			//获取个人客户分析报告
			getPersonReport(){
				var _this = this;
				var params = {
					custAppkey:_this.$route.query.custAppkey,
					productCode:_this.$route.query.productCode,
					personId:_this.$route.query.personId
				};
				riskReport.riskmodel_get(params).then(res =>{
					if(res.code =='0'){
						_this.result =  res.result;
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
		},
		mounted:function(){
			var _this=this;
			//_this.getPersonReport();

			//基于准备好的dom，初始化echarts实例
			this.chartColumn = echarts.init(document.getElementById('mainChart'));

			this.chartColumn.setOption({
				tooltip : {
					//formatter: "{a} <br/>{b} : {c}%"
				},
				toolbox: {
					feature: {
						//restore: {},
						//saveAsImage: {}
					}
				},
				series: [
					{
						min: 0,
						max: 1000,
						name: '评分等级',
						type: 'gauge',
						//detail: {formatter:'{value}%'},
						//detail: {formatter:'value'},
						data: [{value: 800, name: 'A'}]
					}
				]
			});

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
</style>