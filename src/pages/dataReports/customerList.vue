<!--wiki 获取所有的风控报告列表 2017/3/27 lhw-->
<template>
	<div class="box">
		<!--工具条-->
		<el-row>
			<el-form label-width="120px">
				<el-col :span="6">
					<el-form-item label="客户姓名" :inline="true"> <el-input  placeholder="请输入客户姓名" v-model="filters.userName"></el-input></el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="手机号码" :inline="true"> <el-input  placeholder="请输入手机号码" v-model="filters.phone"></el-input></el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="身份证号码" :inline="true"> <el-input  placeholder="请输入身份证号码" v-model="filters.idCard"></el-input></el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item class="btn_box">
						<el-button type="primary" icon="search" v-on:click="search()">查询</el-button>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="报告状态" :inline="true">
						<el-radio-group v-model="status">
							<el-radio-button label="">全部</el-radio-button>
							<el-radio-button label="1">已生成</el-radio-button>
							<el-radio-button label="0">未生成</el-radio-button>
						</el-radio-group>
					</el-form-item>
				</el-col>
			</el-form>
		</el-row>

		<!--1期暂时不做删除-->
		<!--<el-row class="button_box">
			<el-button  icon="delete" class="btn_border_none">删除</el-button>
		</el-row>-->
		<el-table :data="Data" border style="width: 100%" v-loading="listLoading" @selection-change="handleSelectionChange">
			<!--<el-table-column type="selection" width="55"></el-table-column>-->
			<el-table-column prop="code" label="报告编号" width="100" show-overflow-tooltip></el-table-column>
			<el-table-column prop="createTime" label="报告生成时间" width="180" show-overflow-tooltip></el-table-column>
			<el-table-column prop="userName" label="客户姓名" width="100" show-overflow-tooltip></el-table-column>
			<el-table-column prop="idCard" label="身份证号" width="160" show-overflow-tooltip></el-table-column>
			<el-table-column prop="phone" label="手机号码" width="150" show-overflow-tooltip></el-table-column>
			<el-table-column prop="score" label="评分" width="100" show-overflow-tooltip></el-table-column>
			<el-table-column prop="decision" label="综合决策结果" min-width="150" show-overflow-tooltip></el-table-column>
			<el-table-column prop="suggestAmount" label="建议额度(元)" width="150" :formatter="format_suggestAmount" show-overflow-tooltip></el-table-column>
			<el-table-column inline-template :context="_self" label="操作" width="200"  fixed="right">
	             <span>
					 <!--<el-button type="danger" size="small" @click="handleDel(row)">删除</el-button>-->
					 <el-button type="primary" size="small" @click="exportPdf(row.id)">导出PDF</el-button>
					 <el-button type="info" size="small" @click="gotoPage_report(row)">查看报告</el-button>
				</span>
			</el-table-column>
		</el-table>
		<!--分页-->
		<el-col :span="24" class="toolbar" style="padding-bottom:10px;">
			<el-pagination @current-change="handleCurrentChange" :page-size="10" layout="total, prev, pager, next, jumper" :total="total" style="float:right;"></el-pagination>
		</el-col>
		<!--<customer-add></customer-add>-->
	</div>
</template>


<script>
  import riskReport from '../../api/riskReport'
  //import customerAdd from './customerList.add.vue'
  export default {
	  components: {

	  },
	  data() {
		  return {
			  status:'',
			  filters: {
				  userName: '',
				  idCard:'',
				  phone:'',
				  status:''
			  },
			  Data: [
				  /*{
					  "id": 1,
					  "code": "0001",
					  "createTime": "2017-03-21 17:46:53",
					  "userName": "李小明",
					  "status": 1,
					  "idCard": "22010516314111",
					  "phone": "13536367325",
					  "score": "100",
					  "decision": "RA",
					  "suggestAmount": 10000
				  }*/
			  ],
			  total: 2,
			  page: 1,
			  listLoading: false,
		  }
	  },
	  watch: {
		  status: function (val, oldVal) {
			  setTimeout(() => {
				  this.search();
		  },500);
		  }
	  },
	  methods:{
		  //导出pdf
		  exportPdf(id){
			  var _this = this;
			  riskReport.ajaxPdf(id).then(res =>{
				  if(res.code !='-1'){
				  riskReport.exportPdf(id);
			  	}
			  }).catch(error =>{
				  _this.$Error(_this,error);
			  })
		  },
		  search(val) {
			  var _this = this;
			  var params = {
				  pageNum:_this.page, //页数
				  pageSize:10,   //固定每页10条
				  userName:_this.filters.userName,
				  idCard:_this.filters.idCard,
				  phone:_this.filters.phone,
				  status:_this.status
			  };
			  _this.listLoading = true;
			  riskReport.riskReportList_get(params).then(res => {
				  _this.total = res.totalElements;
			  _this.Data = res.content;
			  _this.listLoading = false;
		  }).catch(function (error) {
				  _this.listLoading = false;
				  _this.$Error(_this,error);
			  })


		  },
		  format_suggestAmount(row){
			  return this.$Utils.addThousandSign(row.suggestAmount,2);
		  },
		  handleCurrentChange(val) {
			  this.page = val;
			  this.search();
		  },
		  handleSelectionChange(val) {
			  this.multipleSelection = val;
		  },
		  handleView(row){

		  },
		  handleDel(row){
			  var _this = this;
			  this.$confirm('确认删除该客户分析报告吗？', '提示', {}).then(() => {
				  _this.$message({
				  type: 'success',
				  message: '删除成功！'
			  	});

			  });
		  },
		  gotoPage_report(row){
			  var params = {
				  custAppkey:row.custAppkey ? row.custAppkey :'123123213',
				  productCode:row.code,
				  personId:row.idCard
			  };
			  //this.$router.push({ path: 'customerList/csReport', query: params});
			  this.$router.push({ path: 'customerList/csReport', query: {id:row.id}});
		  }
	  },
	  created: function () {

	  },
	  mounted() {
		this.search();
	  }
  }
</script>

<style scoped>
	.btn_box{ text-align: right;}
	.button_box{ background: #e4e9f1;}
	.button_box span{ color: #bebfc0;}
	.el-form-item{ margin-bottom: 10px;}
	.btn_border_none{ border:none; background: none;}
</style>