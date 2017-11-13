<!--决策建议结果设置 wiki数据对接 2017/3/21 lhw-->
<template>
	<div class="box">
		<section>
			<el-row>
				<el-col :span="12">
					<div class="h-scoreSetTitle" style="padding-top: 8px; padding-bottom: 15px;">
						<strong>产品名称：</strong> {{result.name}}
					</div>
				</el-col>
				<el-col :span="5" :offset="7">
					<!--<el-input
                            placeholder="请输入规则分类搜索" icon="search" v-model="searchinput" :on-icon-click="handleIconClick">
                    </el-input>-->
				</el-col>
			</el-row>

			<el-row class="button_box">
				<el-button  icon="plus" class="btn_border_none"  @click="handleAdd">新增决策结果</el-button>
			</el-row>
			<el-table :data="Data" border style="width: 100%" v-loading="listLoading" @selection-change="handleSelectionChange">
				<!--<el-table-column prop="id" label="编号" width="100" show-overflow-tooltip></el-table-column>-->
				<el-table-column prop="name" label="决策名称" min-width="160" show-overflow-tooltip></el-table-column>
				<el-table-column prop="result" label="决策结果" width="100" show-overflow-tooltip></el-table-column>
				<el-table-column prop="gradeResult" label="评分决策结果" width="130" show-overflow-tooltip></el-table-column>
				<el-table-column prop="ruleResult" label="规则决策结果" width="130" show-overflow-tooltip></el-table-column>
				<el-table-column prop="remark" label="说明" min-width="250" show-overflow-tooltip></el-table-column>
				<el-table-column inline-template :context="_self" label="操作" width="150" >
	             <span>
					 <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
					 <el-button type="danger" size="small" @click="handleDel(row)">删除</el-button>
				</span>
				</el-table-column>
			</el-table>
			<!--分页-->
			<el-col :span="24" class="toolbar">
				<el-pagination @current-change="handleCurrentChange" :page-size="10" layout="total, prev, pager, next, jumper" :total="total" style="float:right;"></el-pagination>
			</el-col>
		</section>
		<div style="clear: both; overflow: hidden; height: 80px;">
			<el-row>
				<el-button  icon="d-arrow-left" @click="gotoBack">返回</el-button>
			</el-row>
		</div>
	</div>
</template>


<script>
	import productList from '../../api/productList' //引入API
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				query:{
					id:'',
					name:''
				},
				result:{
					"id": '',
					"name": ' ',
					"extCode":'',
					"innerCode": '',
					"modelId": '',
					"ownerId": ''
				},
				productId:'',
				productName:'自定义产品名称参数',
				Data: [
					/*{
						"id": 1,
						"productId": 1,
						"name": "快速通过",
						"result": "A",
						"gradeResult": "未触发",
						"ruleResult": "SA",
						"remark": "快速通过，前期人查"
					},
					{
						"id": 10086,
						"productId": 1,
						"name": "快速通过--编号曲艺",
						"result": "A",
						"gradeResult": "未触发",
						"ruleResult": "SA",
						"remark": "快速通过，前期人查"
					}*/
				],
				total: 2,
				page: 1,
				listLoading: false,
			}
		},
		methods:{
			//新增跳转页面
			handleAdd(){
				var data = {};
				this.$router.push({ path: '/productList/optionsResultSet-add', query: { id:'25',productId:this.productId,aciton:'Add',productName:this.result.name}});
			},
			search(){
				var _this = this;
				var params = {
					productId:_this.productId,
					pageNum:_this.page, //页数
					pageSize:10,   //固定每页10条
					name: this.filters.name
				};
				_this.listLoading = true;
				productList.decisionList_get(params).then(res =>{
					_this.Data = res.content;
					_this.total = res.totalElements;
				_this.listLoading = false;
				}).catch(error =>{
					_this.$Error(_this,error);
				_this.listLoading = false;
				})
			},
			handleCurrentChange(val) {
				//debugger;
				this.page = val;
				this.search();
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			//编辑 调整额度策略 路由跳转
			handleEdit(row){
				this.$router.push({ path: '/productList/optionsResultSet-add', query: { id:row.id ,productId:this.productId ,aciton:'Edit'}});
			},
			handleView(row){

			},
			handleDel(row){
				var _this = this;
				this.$confirm('确认要删除吗？', '提示', {}).then(() => {
					productList.decision_deleteById(row.id).then((resp) =>{
					_this.$message({
					type: 'success',
					message: '删除成功！'
					});
					_this.search();
			}).catch((error) =>{
					_this.$Error(_this,error);
			});
			});
			},
			handleSubAdd(){
				alert(11);
			},
			//返回产品列表
			gotoBack(){
				this.$router.push({ path: '/productList'});
			},
			//获取产品信息
			getInfo(){
				var _this = this;
				if(_this.$Utils.isNumber(_this.productId)){
					productList.productInfo_getById(_this.productId).then( res => {
						_this.result = res || '';
				}).catch( error =>{
						_this.$Error(_this,error);
				});
				}
			},
		},
		created: function () {

		},
		mounted(){
			this.query = this.$route.query;
			this.productId = this.query.id;
			this.search();
			this.getInfo();
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