<template>
	<section>

		<!--工具条-->
		<el-row>
			<el-form label-width="120px">
				<el-col :span="6">
					<el-form-item label="接口名称" :inline="true"> <el-input  placeholder="请输入接口名称" v-model="filters.callName"></el-input></el-form-item>
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

				<el-col :span="6" :offset="6">
					<el-form-item class="btn_box">
						<!--<el-button type="primary" icon="search" v-on:click="search()">查询</el-button>-->
						<el-button type="primary" icon="search">查询</el-button>
					</el-form-item>
				</el-col>
			</el-form>
		</el-row>

	<!--	<el-row class="button_box">
			<el-button  icon="document" class="btn_border_none"  @click="handleDownload">导出</el-button>
		</el-row>-->

		<el-table :data="tableData" border highlight-current-row style="width: 100%" v-loading="listLoading">
			<el-table-column prop="callTime" label="日期" width="130"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="callName" label="接口名称" min-width="120" show-overflow-tooltip></el-table-column>
			<el-table-column prop="callType" label="接入形式" min-width="120" show-overflow-tooltip></el-table-column>
			<el-table-column prop="beCaller" label="接口提供方" min-width="80" show-overflow-tooltip></el-table-column>
			<el-table-column prop="isCharge" label="是否收费" min-width="80" show-overflow-tooltip></el-table-column>
			<el-table-column prop="charge" label="收费标准" min-width="80" show-overflow-tooltip></el-table-column>
			<el-table-column prop="productName" label="产品" min-width="120" show-overflow-tooltip></el-table-column>
			<el-table-column prop="productCallNum" label="产品当日查询该接口次数" min-width="80" show-overflow-tooltip></el-table-column>
			<el-table-column prop="productTotalCallNum" label="产品累计查询该接口次数" min-width="80" show-overflow-tooltip></el-table-column>
			<el-table-column prop="callNum" label="系统当日查询该接口次数" min-width="80" show-overflow-tooltip></el-table-column>
			<el-table-column prop="totalCallNum" label="系统累计查询该接口次数" min-width="80" show-overflow-tooltip></el-table-column>
		<!--	<el-table-column inline-template :context="_self" label="操作" width="180" fixed="right">
	             <span>
					<el-button type="primary" size="small" @click="handleView(row)">查看明细</el-button>
				</span>
			</el-table-column>-->
		</el-table>
		<!--分页-->
		<el-col :span="24" class="toolbar" style="padding-bottom:10px;">
			<el-pagination @current-change="handleCurrentChange" :page-size="10" layout="total, prev, pager, next, jumper" :total="total" style="float:right;"></el-pagination>
		</el-col>

		<ruleDialog></ruleDialog>
	</section>
</template>
<script>
	import interfaceQuery from  '../../api/interfaceQuery'
//	import ruleDialog from './ruleAnalysis.dialog.vue'
	export default {
		components: {
//			ruleDialog
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
				filters: {
					dataRange:'',
					callName:''
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
				interfaceQuery.export(params);
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
					callName:_this.filters.callName
				};
				_this.listLoading = true;
				interfaceQuery.getList(params)
						.then(res => {
					_this.total = res.totalElements;
				//statisticsDate
				for(var i= 0,len = res.content.length; i<len; i++){
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

			format_statisticsDate(row,col){
				if(row.statisticsDate.length > 10){
					return row.statisticsDate.slice(0,10);
				}else{
					return row.statisticsDat;
				}
			},
			handleView(row){
				var data = {
					smallRuleTypeId:row.smallRuleTypeId,
					countWay:'3',
					date:row.statisticsDate
				};
				//this.$bus.$emit('ruleAnalysisDialogShow','规则命中趋势图',data);
			}
		},
		mounted() {
			//this.search();
		}
	}
</script>
<style scoped>
	/*.el-date-editor--daterange.el-input{width: 100%;}*/
</style>