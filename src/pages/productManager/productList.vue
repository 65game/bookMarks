<template>
	<div class="box">
		<!--工具条-->
		<el-row>
			<el-form label-width="120px">
				<el-col :span="6">
					<el-form-item label="产品名称" :inline="true"> <el-input  placeholder="请输入产品名称" v-model="filters.name"></el-input></el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="产品编号" :inline="true"> <el-input  placeholder="请输入产品编号" v-model="filters.extCode"></el-input></el-form-item>
				</el-col>
				<el-col :span="6" :offset="6">
					<el-form-item class="btn_box">
						<el-button type="primary" icon="search" v-on:click="search()">查询</el-button>
					</el-form-item>
				</el-col>
			</el-form>
		</el-row>

		<el-row class="button_box">
			<el-button  icon="plus" class="btn_border_none"  @click="handleAdd">添加</el-button>
		</el-row>
		<el-table :data="tableData" border style="width: 100%" v-loading="listLoading" @selection-change="handleSelectionChange">
			<el-table-column prop="extCode" label="产品编号" width="150" show-overflow-tooltip></el-table-column>
			<el-table-column prop="name" label="产品名称" min-width="200" show-overflow-tooltip></el-table-column>
			<el-table-column prop="enabled" label="产品状态" width="100" show-overflow-tooltip :formatter="format_enabled"></el-table-column>
			<!--<el-table-column inline-template :context="_self" label="操作" width="550" >-->
			<el-table-column inline-template :context="_self" label="操作" width="480" >
	             <span>
					 <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
					 <!--<el-button type="danger" size="small" @click="handleDel(row)">删除</el-button>-->
					 <el-button type="info" size="small" @click="gotoPage_rule(row)">规则模型配置</el-button>
					 <el-button type="info" size="small" @click="gotoPage_scoreSet(row)">评分模型配置</el-button>
					 <el-button type="info" size="small" @click="gotoPage_linesSet(row)">额度策略</el-button>
					 <el-button type="info" size="small" @click="gotoPage_optionsResultSet(row)">决策结果设置</el-button>
				</span>
			</el-table-column>
		</el-table>
		<!--分页-->
		<el-col :span="24" class="toolbar" style="padding-bottom:10px;">
			<el-pagination @current-change="handleCurrentChange" :page-size="10" layout="total, prev, pager, next, jumper" :total="total" style="float:right;"></el-pagination>
		</el-col>
		<product-add></product-add>
	</div>
</template>


<script>
  import productList from '../../api/productList'
  import productAdd from './productList.add.vue'
  export default {
	  components: {
		  productAdd
	  },
	  data() {
		  return {
			  filters: {
				  name: '',
				  extCode:''
			  },
			  tableData: [],
			  total: 2,
			  page: 1,
			  listLoading: false,
		  }
	  },
	  methods:{
		  handleAdd(){
			  var data = {};
			  this.$bus.$emit('productListDialogShow','新增产品',data);
		  },
		  format_enabled(row){
			  return row.enabled ? "启用":"停用"
		  },
		  search(val) {
			  var _this = this;
			  var params = {
				  pageNum:_this.page, //页数
				  pageSize:10,   //固定每页10条
				  name: this.filters.name,
				  extCode:this.filters.extCode
			  }
			  _this.listLoading = true;
			  productList.productList_get(params).then(res => {
				  _this.total = res.totalElements;
			  _this.tableData = res.content;
			  _this.listLoading = false;
		  }).catch(function (error) {
				  _this.listLoading = false;
				  _this.$Error(_this,error);
			  })


		  },
		  handleCurrentChange(val) {
			  this.page = val;
			  this.search();
		  },
		  handleSelectionChange(val) {
			  this.multipleSelection = val;
		  },
		  handleEdit(row){
			  var _data = this.$Utils.dataClone(row);
			  _data.enabled = _data.enabled?"1":"0"; //布尔值转换字符串表示启用/停用,element ui组件 需要
			  //debugger;
			  this.$bus.$emit('productListDialogShow','编辑产品',_data);
		  },
		  handleView(row){

		  },
		  handleDel(row){
			  var _this = this;
			  this.$confirm('确认要删除吗？', '提示', {}).then(() => {
				  productList.del(row.id).then((resp) =>{
				  _this.$message({
				  type: 'success',
				  message: '删除成功！'
			  });
			  }).catch((error) =>{
				  _this.$Error(_this,error);
			  });
			  });
		  },
		  handleSubAdd(){
			  //alert(11);
		  },
		  gotoPage_rule(row){ //规则配置模型页面
			  this.$router.push({ path: '/productList/ruleSet', query: { id:row.id}});
		  },
		  //评分模型配置
		  gotoPage_scoreSet(row){
			  this.$router.push({ path: '/productList/scoreSet', query: { id:row.id }});
		  },
		  //跳转到 决策结果设置
		  gotoPage_optionsResultSet(row){
			  this.$router.push({ path: '/productList/optionsResultSet', query: { id:row.id ,name:row.name}});
		  },
		  //额度策略
		  gotoPage_linesSet(row){
			  this.$router.push({ path: '/productList/linesSet', query: { id:row.id,name:row.name}});
		  }
	  },
	  created: function () {
		  var _this = this;
		  _this.$bus.$on('H_productList_reload', () => {
			  _this.search();
	  	})
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