<template>
	<section>
		<!--工具条-->
		<el-row >
			<el-form label-width="120px">

				<el-col :span="6">
					<el-form-item label="产品名称" :inline="true"> <el-input  placeholder="请输入产品名称" v-model="filters.name"></el-input></el-form-item>
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
						<el-button type="primary" icon="search" v-on:click="search()">查询</el-button>
					</el-form-item>
				</el-col>
			</el-form>
		</el-row>

		<el-row class="button_box">
			<el-button  icon="document" class="btn_border_none"  @click="handleDownload">导出</el-button>
		</el-row>

		<el-table :data="tableData" border style="width: 100%" v-loading="listLoading">
			<el-table-column prop="name" label="产品名称" min-width="130" show-overflow-tooltip></el-table-column>
			<el-table-column prop="createTime" label="上架时间" width="180" show-overflow-tooltip></el-table-column>
			<el-table-column prop="updateTime" label="最近一次调整时间" width="180" show-overflow-tooltip></el-table-column>
			<el-table-column prop="enableRuleNum" label="启用规则条数" width="120" show-overflow-tooltip></el-table-column>
			<el-table-column prop="enableFactNum" label="启用评分指标数" width="120" show-overflow-tooltip></el-table-column>
			<el-table-column prop="maxProductCreditAmount" label="产品额度上限（元）"  min-width="120" show-overflow-tooltip></el-table-column>
			<el-table-column prop="maxUserCreditAmount" label="已授信最大额度（元）" min-width="120" show-overflow-tooltip></el-table-column>
			<el-table-column prop="passRate" label="授信直接通过率" width="130" show-overflow-tooltip></el-table-column>
			<el-table-column prop="refuseRate" label="授信直接拒绝率" width="120" show-overflow-tooltip></el-table-column>
			<el-table-column prop="enableWhiteList" label="是否启用白名单" :formatter="format_enableWhiteList" width="100" show-overflow-tooltip></el-table-column>
			<el-table-column prop="reportNum" label="报告输出总数" width="100" show-overflow-tooltip></el-table-column>
			<el-table-column prop="creditUserNum" label="授信总人数" width="100" show-overflow-tooltip></el-table-column>
		</el-table>
		<!--分页-->
		<el-col :span="24" class="toolbar" style="padding-bottom:10px;">
			<el-pagination @current-change="handleCurrentChange" :page-size="10" layout="total, prev, pager, next, jumper" :total="total" style="float:right;"></el-pagination>
		</el-col>
	</section>
</template>
<script>
	import productAnalysisApi from  '../../api/productAnalysis'
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
				filters: {
					dataRange:'',
					name:''
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
				};
				productAnalysisApi.export({
					beginDate: beginDate,
					endDate:endDate,
					name:this.filters.name
				});
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
					name:_this.filters.name
				};
				_this.listLoading = true;
				productAnalysisApi.getProductAnalysis(params)
						.then(res => {
					_this.total = res.totalElements;

					for(var i = 0,len = res.content.length; i < len; i++){
						if(res.content[i].maxProductCreditAmount){
							res.content[i].maxProductCreditAmount = _this.$Utils.addThousandSign(res.content[i].maxProductCreditAmount,0);
						}
						if(res.content[i].maxUserCreditAmount){
							res.content[i].maxUserCreditAmount = _this.$Utils.addThousandSign(res.content[i].maxUserCreditAmount,0);
						}
					}
				_this.tableData = res.content;
				//
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
			format_enableWhiteList(row,col){
				if(row.enableWhiteList =='1'){
					return '启用';
				}else{
					return '不启用';
				}
			}
		},
		mounted() {
			this.search();
		}
	}
</script>
<style scoped>

</style>