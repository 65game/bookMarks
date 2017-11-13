<template>
	<section>
		<el-row class="rule_box">
			<el-col :span="18">
				<strong>与金融机构关系情况</strong>
			</el-col>
			<el-col :span="6" style="text-align: right;">
				<el-button type="primary" icon="plus" size="small" @click="handleSubAdd()">配置指标</el-button>
			</el-col>
		</el-row>
		<el-table :data="Data" border  style="width: 100%; margin-top: 10px;" v-loading="listLoading">
			<el-table-column prop="ruleNum" label="指标编号"  width="150"></el-table-column>
			<el-table-column prop="ruleType" label="指标分类" min-width="150"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="state" label="指标状态" width="150"></el-table-column>
			<el-table-column inline-template :context="_self" label="操作" width="250" >
	             <span>
					 <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
					 <el-button type="info" size="small" @click="handleView(row)">明细</el-button>
					 <el-button type="danger" size="small" @click="handleDel(row)">删除</el-button>
				</span>
			</el-table-column>
		</el-table>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				num:'10',
				listLoading:false,
				Data:[
					{
						ruleNum:'0001',
						state:"启用",
						ruleType:"信用卡使用情况"

					},
					{
						ruleNum:'0002',
						state:"停用",
						ruleType:"银行账户情况"

					}
				]
			}
		},
		methods: {
			handleEdit(row){
				this.$bus.$emit('scoreSet_subAdd_DialogShow','编辑指标分类',row);
			},
			handleView(row){
				this.$router.push({ path: '/productList/scoreSet-listView', query: { name: 'scoreSet-listView',id:row.ruleNum }});
			},
			handleDel(row){
				var _this = this;
				_this.$confirm('确认要删除该指标分类吗？', '提示', {}).then(() => {
					_this.$message({
					type: 'success',
					message: '删除成功！'
				});
			});
			},
			handleSubAdd(){
				this.$bus.$emit('scoreSet_settingDialog_open','评分模型配置',{},'与金融机构关系情况 ');
			}
		}
	}
</script>

<style scoped>
	.rule_box{ margin-top: 40px;}
	.c_ff0000{ color: #ff0000;}
</style>