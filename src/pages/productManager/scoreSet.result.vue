<!-- 评分结果配置  wiki 数据对接 2017/3/20 lhw > -->
<template>
	<section>
		<el-row class="button_box">
			<el-button  icon="plus" class="btn_border_none"  @click="handleSubAdd()">新增评分结果</el-button>
		</el-row>
		<el-table :data="Data" border  style="width: 100%;" v-loading="listLoading">
			<el-table-column prop="name" label="类别" width="150"></el-table-column>
			<el-table-column prop="score" label="分值" width="250"></el-table-column>
			<el-table-column prop="gradeResult" label="评分决策" width="250"></el-table-column>
			<el-table-column prop="remark" label="说明"></el-table-column>
			<el-table-column inline-template :context="_self" label="操作" width="100" >
	             <span>
					 <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
				</span>
			</el-table-column>
		</el-table>

		<!--编辑弹窗-->
		<score-set-result></score-set-result>

		<el-row class="h-scoreSet-btnBox">
			<el-button  icon="d-arrow-left" @click="gotoBack">返回</el-button>
		</el-row>
	</section>
</template>

<script>
	import scoreSetResult from './scoreSet.result.add.vue'
	import productList from '../../api/productList'
    export default {
		components: {
			scoreSetResult
		},
        data() {
            return {
                num:'10',
				id:'',
                listLoading:false,
                Data:[
					/*{
						"id": 1,
						"productId": 1,
						"name": "A",
						"min": "100",
						"lessThan": "200",
						"gradeResult": "SA",
						"remark": "较小风险11"
					}*/
				]
            }
        },
        methods: {
            handleEdit(row){
				row.productId = this.id;
				this.$bus.$emit('scoreSet_result_DialogShow','编辑评分结果',row);
			},
			handleSubAdd(){
				this.$bus.$emit('scoreSet_result_DialogShow','新增评分结果',{productId:this.id,flag:'add'});
			},
			//返回
			gotoBack(){
				this.$router.push({ path: '/productList/scoreSet' ,query: {id:this.$route.query.id }});
			},
			search(){
				var _this = this;
				productList.gradelevel_get({productId:_this.id}).then( res => {
					_this.Data = res;
				}).catch( error =>{
						_this.$Error(_this,error);
				});

			},
        },
		created(){
			this.$bus.$on('H_scoreSet_result_reload', () => {
				this.search();
			})
		},
		mounted(){
			this.id = this.$route.query.id;
			this.search();
		}
    }
</script>

<style scoped>
	.rule_box{ margin-top: 25px;}
	.c_ff0000{ color: #ff0000;}
	.h-scoreSet-btnBox{margin-top: 30px; }
</style>