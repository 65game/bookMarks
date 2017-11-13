<template>
	<section>
		<!--汇总 start-->
		<div class="risk-box" v-loading="summaryLoading">
			<el-row :gutter="20">
				<el-col :span="6">
					<div class="riskItem">
						<p class="pName">规则库已启动规则数</p>
						<div class="name">{{summaryData.totalRuleNum}}条</div>
						<img src="../../../static/images/rule-icon-1.png" class="riskIcon" alt="">
					</div>
				</el-col>
				<el-col :span="6">
					<div class="riskItem">
						<p class="pName">规则库建立红线规则数</p>
						<div class="name">{{summaryData.redLineRuleNum}}条</div>
						<img src="../../../static/images/rule-icon-2.png" class="riskIcon" alt="">
					</div>
				</el-col>
				<el-col :span="6">
					<div class="riskItem">
						<p class="pName">产品调用规则数合计</p>
						<div class="name">{{summaryData.transferRuleNum}}条</div>
						<img src="../../../static/images/rule-icon-3.png" class="riskIcon" alt="">
					</div>
				</el-col>
				<el-col :span="6">
					<div class="riskItem">
						<p class="pName">平均每个产品调用规则数</p>
						<div class="name">{{summaryData.avgTransferRuleNum}}条</div>
						<img src="../../../static/images/rule-icon-4.png" class="riskIcon" alt="">
					</div>
				</el-col>
			</el-row>

		</div>
		<!--汇总 end-->

		<!--工具条-->
		<el-row style="margin-top: 20px;">
			<el-form label-width="120px">
				<el-col :span="6">
					<el-form-item label="规则大类" :inline="true"> <el-input  placeholder="请输入规则大类" v-model="filters.ruleType"></el-input></el-form-item>
				</el-col>

				<el-col :span="6">
					<el-form-item label="规则子类" :inline="true"> <el-input  placeholder="请输入规则子类" v-model="filters.smallRuleType"></el-input></el-form-item>
				</el-col>

				<el-col :span="6">
					<el-form-item label="日期范围" :inline="true">
						<el-date-picker
								v-model="filters.dataRange"
								type="daterange"
								:picker-options="pickerOptions"
								placeholder="选择日期范围"
								:editable = false
								@change="getData"
								align="right">
						</el-date-picker>
					</el-form-item>
				</el-col>

				<el-col :span="6">
					<el-form-item class="btn_box">
						<el-button type="primary" icon="search" v-on:click="search()">查询</el-button>
					</el-form-item>
				</el-col>
			</el-form>
		</el-row>

		<el-row class="button_box">
			<el-button  icon="document" class="btn_border_none"  @click="handleDownload">导出</el-button>
		</el-row>

		<el-table :data="tableData" border highlight-current-row style="width: 100%" v-loading="listLoading">
			<el-table-column prop="statisticsDate" label="日期" width="130"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="ruleType" label="规则大类" min-width="120" show-overflow-tooltip></el-table-column>
			<el-table-column prop="smallRuleType" label="规则子类" min-width="120" show-overflow-tooltip></el-table-column>
			<el-table-column prop="triggerNum" label="当日触发次数" min-width="80" show-overflow-tooltip></el-table-column>
			<el-table-column prop="totalTriggerNum" label="累计触发次数" min-width="80" show-overflow-tooltip></el-table-column>
			<el-table-column prop="triggerRate" label="当日用户触发率" min-width="80" show-overflow-tooltip></el-table-column>
			<el-table-column prop="totalTriggerRate" label="累计用户触发率" min-width="80" show-overflow-tooltip></el-table-column>
			<el-table-column inline-template :context="_self" label="操作" width="180" fixed="right">
	             <span>
					<el-button type="primary" size="small" @click="handleEchart(row)">查看规则命中趋势图</el-button>
				</span>
			</el-table-column>
		</el-table>
		<!--分页-->
		<el-col :span="24" class="toolbar" style="padding-bottom:10px;">
			<el-pagination @current-change="handleCurrentChange" :page-size="10" layout="total, prev, pager, next, jumper" :total="total" style="float:right;"></el-pagination>
		</el-col>

		<ruleDialog></ruleDialog>
	</section>
</template>
<script>
	import ruleAnalysisApi from  '../../api/ruleAnalysis'
	import ruleDialog from './ruleAnalysis.dialog.vue'
	export default {
		components: {
			ruleDialog
		},
		data() {
			return {
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				//汇总接口
				summaryData:{
					"totalRuleNum":0,
					"redLineRuleNum":0,
					"transferRuleNum":0,
					"avgTransferRuleNum":0
				},
				summaryLoading:false,
				filters: {
					dataRange:'',
					ruleType:'',
					smallRuleType:''
				},
				tableData:[],
				total: 0,
				page: 1,
				listLoading: false,
				formatterData:''
			};
		},
		watch: {

		},
		methods: {
			handleDownload(){
				if(this.formatterData){
					var beginDate = this.formatterData.slice(0,10);
					var endDate = this.formatterData.substr(this.formatterData.length-10);
				}else{
					var beginDate = '';
					var endDate = '';
				}
				var params = {
					beginDate: beginDate,
					endDate:endDate,
					ruleType:this.filters.ruleType,
					smallRuleType:this.filters.smallRuleType
				};
				ruleAnalysisApi.export(params);
			},
			handleCurrentChange(val) {
				this.page = val;
				this.search();
			},
			search(){
				var _this = this;
				if(this.formatterData){
					var beginDate = this.formatterData.slice(0,10);
					var endDate = this.formatterData.substr(this.formatterData.length-10);
				}else{
					var beginDate = '';
					var endDate = '';
				}
				var params = {
					pageNum:_this.page, //页数
					pageSize:10,   //固定每页10条
					beginDate: beginDate,
					endDate:endDate,
					ruleType:_this.filters.ruleType,
					smallRuleType:_this.filters.smallRuleType
				};
				_this.listLoading = true;
				ruleAnalysisApi.getList(params)
						.then(res => {
					_this.total = res.totalElements;
				for(var i = 0,len = res.content.length; i < len; i++){
					var _data = res.content[i].statisticsDate;
					if(_data && _data.length > 10){
						res.content[i].statisticsDate = _data.slice(0,10);
					}
				}
				_this.tableData = res.content;
				_this.listLoading = false;
			})
			.catch(function (error) {
					_this.listLoading = false;
					_this.$Error(_this,error);
				})
			},
			//返回格式化后的值
			getData(val){
				this.formatterData = val;
			},
			getSummary(){
				var _this = this;
				_this.summaryLoading = true;
				ruleAnalysisApi.getSummary({}).then(res =>{
					_this.summaryData = res;
				_this.summaryLoading = false;
			}).catch(error =>{
					_this.$Error(_this,error);
				_this.summaryLoading = false;
			});
			},
			format_statisticsDate(row,col){
				if(row.statisticsDate.length > 10){
					return row.statisticsDate.slice(0,10);
				}else{
					return row.statisticsDat;
				}
			},
			format_creditAddedAmount(row,col){
				return this.$Utils.addThousandSign(row.creditAddedAmount,2);
			},
			handleEchart(row){
				var data = {
					smallRuleTypeId:row.smallRuleTypeId,
					countWay:'3',
					date:row.statisticsDate
				};
				this.$bus.$emit('ruleAnalysisDialogShow','规则命中趋势图',data);
			}
		},
		mounted() {
			this.getSummary();
			this.search();
		}
	}
</script>
<style scoped>
	/*.el-date-editor--daterange.el-input{width: 100%;}*/
</style>