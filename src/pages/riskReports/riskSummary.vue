<template>
	<section>
		<!--汇总 start-->
		<div class="risk-box" v-loading="summaryLoading">
			<el-row :gutter="20">
				<el-col :span="6">
					<div class="riskItem">
						<p class="pName">总用户数</p>
						<div class="name">{{summaryData.totalUserNum}}人</div>
						<img src="../../../static/images/risk-icon-1.png" class="riskIcon" alt="">
					</div>
				</el-col>
				<el-col :span="6">
					<div class="riskItem">
						<p class="pName">白名单总数</p>
						<div class="name">{{summaryData.whiteUserNum}}人</div>
						<img src="../../../static/images/risk-icon-2.png" class="riskIcon" alt="">
					</div>
				</el-col>
				<el-col :span="6">
					<div class="riskItem">
						<p class="pName">黑名单总数</p>
						<div class="name">{{summaryData.blackUserNum}}人</div>
						<img src="../../../static/images/risk-icon-3.png" class="riskIcon" alt="">
					</div>
				</el-col>
				<el-col :span="6">
					<div class="riskItem">
						<p class="pName">普通用户总数</p>
						<div class="name">{{summaryData.normalUserNum}}人</div>
						<img src="../../../static/images/risk-icon-4.png" class="riskIcon" alt="">
					</div>
				</el-col>
			</el-row>

			<el-row :gutter="20">
				<el-col :span="6">
					<div class="riskItem">
						<p class="pName">风控通过总数</p>
						<div class="name">{{summaryData.passedUserNum}}人</div>
						<img src="../../../static/images/risk-icon-5.png" class="riskIcon" alt="">
					</div>
				</el-col>
				<el-col :span="6">
					<div class="riskItem">
						<p class="pName">风控拒绝总数</p>
						<div class="name">{{summaryData.refuseUserNum}}人</div>
						<img src="../../../static/images/risk-icon-6.png" class="riskIcon" alt="">
					</div>
				</el-col>
				<el-col :span="6">
					<div class="riskItem">
						<p class="pName">风控复议总数</p>
						<div class="name">{{summaryData.reviewUserNum}}人</div>
						<img src="../../../static/images/risk-icon-7.png" class="riskIcon" alt="">
					</div>
				</el-col>
				<el-col :span="6">
					<div class="riskItem">
						<p class="pName">风控授信额度总数</p>
						<div class="name">{{summaryData.creditAmount}}元</div>
						<img src="../../../static/images/risk-icon-8.png" class="riskIcon" alt="">
					</div>
				</el-col>
			</el-row>

			<el-row :gutter="20">
				<el-col :span="6">
					<div class="riskItem">
						<p class="pName">触发黑名单库次数</p>
						<div class="name">{{summaryData.triggerBlackListNum}}次</div>
						<img src="../../../static/images/risk-icon-9.png" class="riskIcon" alt="">
					</div>
				</el-col>
				<el-col :span="6">
					<div class="riskItem">
						<p class="pName">触发异常规则次数</p>
						<div class="name">{{summaryData.triggerRuleNum}}次</div>
						<img src="../../../static/images/risk-icon-10.png" class="riskIcon" alt="">
					</div>
				</el-col>
				<el-col :span="6">
					<div class="riskItem">
						<p class="pName">评分风险较高人数</p>
						<div class="name">{{summaryData.highRiskUserNum}}人</div>
						<img src="../../../static/images/risk-icon-11.png" class="riskIcon" alt="">
					</div>
				</el-col>
			</el-row>

		</div>
		<!--汇总 end-->

		<!--工具条-->
		<el-row style="margin-top: 20px;">
			<el-form label-width="120px">
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

				<el-col :span="9" :offset="9">
					<el-form-item class="btn_box">
						<el-button type="primary" icon="search" v-on:click="search()">查询</el-button>
					</el-form-item>
				</el-col>
			</el-form>
		</el-row>

		<el-row class="button_box">
			<el-button  icon="document" class="btn_border_none"  @click="handleDownload">导出</el-button>
		</el-row>

		<el-table :data="tableData" border style="width: 100%" v-loading="listLoading">
			<el-table-column prop="statisticsDate" label="日期" width="120" :formatter="format_statisticsDate" show-overflow-tooltip></el-table-column>
			<el-table-column prop="whiteUserAddedNum" label="白名单用户新增数" min-width="120" show-overflow-tooltip></el-table-column>
			<el-table-column prop="blackUserAddedNum" label="黑名单用户新增数" min-width="120" show-overflow-tooltip></el-table-column>
			<el-table-column prop="normalUserAddedNum" label="普通用户新增数" min-width="120" show-overflow-tooltip></el-table-column>
			<el-table-column prop="passedUserAddedNum" label="风控通过新增数" min-width="120" show-overflow-tooltip></el-table-column>
			<el-table-column prop="refuseUserAddedNum" label="风控拒绝新增数" min-width="120" show-overflow-tooltip></el-table-column>
			<el-table-column prop="reviewUserAddedNum" label="风控复议新增数" min-width="120" show-overflow-tooltip></el-table-column>
			<el-table-column prop="creditAddedAmount" label="风控授信新增额度（元）" :formatter="format_creditAddedAmount" min-width="130" show-overflow-tooltip></el-table-column>
			<el-table-column prop="triggerBlackListAddedNum" label="触发黑名单新增数" min-width="120" show-overflow-tooltip></el-table-column>
			<el-table-column prop="triggerRuleAddedNum" label="触发异常规则新增数" min-width="120" show-overflow-tooltip></el-table-column>
			<el-table-column prop="highRiskUserAddedNum" label="评分风险较高新增人数" min-width="120" show-overflow-tooltip></el-table-column>
		</el-table>
		<!--分页-->
		<el-col :span="24" class="toolbar" style="padding-bottom:10px;">
			<el-pagination @current-change="handleCurrentChange" :page-size="10" layout="total, prev, pager, next, jumper" :total="total" style="float:right;"></el-pagination>
		</el-col>
	</section>
</template>
<script>
	import riskSummaryApi from  '../../api/riskSummary'
	export default {
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
				//风险汇总接口
				summaryData:{
					"blackUserNum":0,
					"creditAmount":0,
					"highRiskUserNum":0,
					"normalUserNum":0,
					"passedUserNum":0,
					"refuseUserNum":0,
					"reviewUserNum":0,
					"totalUserNum":0,
					"triggerBlackListNum":0,
					"triggerRuleNum":0,
					"whiteUserNum":0
				},
				summaryLoading:false,
				filters: {
					dataRange:''
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
				var _this = this;
				if(this.formatterData){
					var beginDate = this.formatterData.slice(0,10);
					var endDate = this.formatterData.substr(this.formatterData.length-10);
				}else{
					var beginDate = '';
					var endDate = '';
				}
				riskSummaryApi.export(beginDate,endDate);
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
					endDate:endDate
				};
				_this.listLoading = true;
				riskSummaryApi.getList(params)
						.then(res => {
					_this.total = res.totalElements;
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
				riskSummaryApi.getSummary({}).then(res =>{
					_this.summaryData = res;
				    if(_this.summaryData.creditAmount && _this.summaryData.creditAmount > 0){
						_this.summaryData.creditAmount = _this.$Utils.addThousandSign(_this.summaryData.creditAmount,0);
					}
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
				return this.$Utils.addThousandSign(row.creditAddedAmount,0);
			},
		},
		mounted() {
			this.getSummary();
			this.search();
		}
	}
</script>
<style scoped>

</style>