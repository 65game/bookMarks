<!--系统设置模块 -->
<template>
	<div>
		<!--<div style="height: 30px; line-height: 30px; color: #888;" v-show="parentPath">当前目录：{{parentPath}}</div>-->

		<el-row  style="height: 48px;">
			<el-form label-width="80px">
				<el-col :span="5">
					<el-form-item label="编号" :inline="true"> <el-input  placeholder="请输入编号" v-model="filters.resName"></el-input></el-form-item>
				</el-col>
				<el-col :span="5">
					<el-form-item label="别名" :inline="true"> <el-input  placeholder="请输入别名" v-model="filters.alias"></el-input></el-form-item>
				</el-col>
				<el-col :span="5">
					<el-form-item label="描述" :inline="true"> <el-input  placeholder="请输入描述" v-model="filters.descp"></el-input></el-form-item>
				</el-col>
				<el-col :span="9">
					<el-form-item class="btn_box">
						<el-button type="primary" icon="search" v-on:click="getSettings()">查询</el-button>
					</el-form-item>
				</el-col>
			</el-form>
		</el-row>

		<!--工具条-->
		<el-row class="b_eef1f6 button_box"  style="height: 35px; position: relative;">
			<div style="position: absolute; top: 0px; left: 0;">
				<el-button  icon="plus" class="btn_border_none" @click="handleAdd">添加</el-button>
				<span>|</span>
				<el-button  icon="delete" class="btn_border_none " @click="handleDel">删除</el-button>
			</div>
		</el-row>
		<!--列表-->
		<el-table :data="dataList" border  @selection-change="handleSelectionChange"    highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column prop="resName" label="编号" min-width="200"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="itemValue" label="项值" min-width="180"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="descp" label="描述" min-width="250"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="alias" label="别名" width="150"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="orderId" label="序号" width="80"></el-table-column>
			<el-table-column prop="itemKey" label="扩展字段" width="120"  show-overflow-tooltip></el-table-column>
			<el-table-column inline-template :context="_self" label="操作" width="150" fixed="right">
	            <span>
					<el-button size="small" type="primary" @click="handleEdit(row)">编辑</el-button>
					<el-button size="small" type="danger"  @click="handleDel(row)">删除</el-button>
				</span>
			</el-table-column>
		</el-table>

		<!--分页-->
		<el-col :span="24" class="toolbar" style="padding-bottom:10px;">
			<el-pagination layout="total, prev, pager, next, jumper"  @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
	</div>
</template>
<script>
	import dictionary from '../../../api/dictionary'
	export default {
		data() {
			return {
				filters: {
					resName: '',
					alias:'',
					descp:''
				},
				parentPath:'',
				dataList: [],
				total: 0,
				page: 1,
				listLoading: false,
				multipleSelection: []
			};
		},
		created(){
            this.$bus.$off('setting_reloadList');
			this.$bus.$on('setting_reloadList', (parentPath) => {
				//执行处理需要处理事件
				this.setting_reloadList(parentPath);
		})
		},
		methods: {
			setting_reloadList(parentPath){
				this.parentPath = parentPath;
				this.getSettings();
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},

			handleCurrentChange(val) {
				this.page = val;
				this.getSettings();
			},
			// get  obj 搜索查询
			getSettings(val){
				var _this = this;
				var params = {
					page:_this.page,
					rows:10,
					pageNum:_this.page,
					pageNumber:_this.page,
					pageSize:10,
					column:'',
					condition:'',
					queryParams:JSON.stringify({
						resName: _this.filters.resName,
						alias:_this.filters.alias,
						descp:_this.filters.descp,
						parent_path:_this.parentPath
					})
				};
				_this.listLoading = true;
				dictionary.getSettings(params).then(function(res){
					_this.dataList = res.content;
					_this.total = res.totalElements;
					_this.listLoading = false;
				}).catch(function(error){
					_this.listLoading = false;
					_this.$Error(_this,error);
				});

			},

			//获取表格列表
			getTableData(parentPath) {
				//debugger;
				var _this = this;
				if(parentPath){
					_this.parentPath = parentPath;
				}
				let para = {
					page: this.page,
					parentPath: this.parentPath
				};

				_this.listLoading = true;

				dictionary.getList(this.parentPath).then((res) => {
					_this.dataList = res.content;
				_this.total = res.totalElements;
				_this.listLoading = false;
			}).catch(function (error) {
					_this.listLoading = false;
					_this.$Error(_this,error);
				}) ;

			},
			//删除
			handleDel: function (row) {
				//console.log(this.multipleSelection);
				var  _this = this;
				if(row.id){
					var id = row.id;
				}else{
					if(_this.multipleSelection.length){
						var tempArr = [];
						for(var i=0; i<_this.multipleSelection.length; i++){
							tempArr.push(_this.multipleSelection[i].id);
						}
						var id = tempArr.join(',');
					}else{
						_this.$message({
							message: '请至少选择一条数据！',
							type: 'warning'
						});
						return;
					}
				}
				this.$confirm('确认删除该记录吗', '提示', {
				}).then(() => {
					_this.listLoading = true;
				dictionary.del(id).then((res) => {
					_this.listLoading = false;
				_this.$message({
					message: '删除成功',
					type: 'success'
				});
				_this.getSettings();
			}).catch(function (error) {
					_this.$Error(_this,error);
					_this.listLoading = false;
				});
			})
			},
			//新增
			handleAdd: function () {
				//触发diaolog 订阅-发布事件
				//alert(this.parentPath);
				if(this.parentPath){
					this.$bus.$emit('dictionaryDialogShow','新增',{parent_path:this.parentPath});
				}else{
					this.$message({
						message: '请先单击选择一条数字字典再添加！',
						type: 'warning'
					});
				}

			},
			//显示编辑界面
			handleEdit: function (row) {
				var data = {
					parent_path:this.parentPath,
					id:row.id,
					resName:row.resName,
					itemValue:row.itemValue,
					descp:row.descp,
					alias:row.alias,
					orderId:row.orderId,
					itemKey:row.itemKey
				}

				this.$bus.$emit('dictionaryDialogShow','编辑',data);
			}

		},
		mounted() {
			//this.getTableData('/系统目录/数据字典/公共参数配置/模板/');
		}
	};
</script>

<!--<style scoped>-->
	<!--/*.box{ padding: 10px 10px 20px 0;}*/-->
	<!--.btn_box{ text-align: right;}-->
	<!--.b_eef1f6{ background: #e4e9f1;}-->
	<!--.button_box span{ color: #bebfc0;}-->
	<!--.btn_border_none{ border:none; background: none;}-->
	<!--.el-form-item{margin-bottom: 10px;}-->
<!--</style>-->