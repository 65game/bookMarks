<!-- 指标明细列表-->
<!-- wiki 明细接口对接联调　2017/3/23 lhw-->
<template>
	<section>
		<el-row class="rule_box">
			<el-col :span="12" style="line-height: 36px; height: 50px;">
				<strong>{{name}}</strong> &gt; {{cname}}
			</el-col>
		</el-row>
		<el-table :data="Data" border  style="width: 100%;" v-loading="listLoading">
			<el-table-column prop="code" label="指标编号" width="150"></el-table-column>
			<el-table-column prop="name" label="指标名称"></el-table-column>
			<el-table-column prop="score" label="分值" width="150"></el-table-column>
			<el-table-column prop="enabled" label="状态" width="150" :formatter="format_enabled"></el-table-column>
			<el-table-column inline-template :context="_self" label="操作" width="100" >
				<span>
					<el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
				</span>
			</el-table-column>
		</el-table>

		<!--编辑弹窗-->
		<!--<scoreSetListViewEdit></scoreSetListViewEdit>-->

		<el-row class="h-scoreSet-btnBox">
			<el-button  icon="d-arrow-left" @click="gotoBack">返回</el-button>
		</el-row>
	</section>
</template>

<script>
	//import scoreSetListViewEdit from './scoreSet.list.view.edit.vue'
	import productList from '../../api/productList'
    export default {
		components: {
			//scoreSetListViewEdit
		},
        data() {
            return {
                num:'10',
                listLoading:false,
				name:'',
				cname:'',
                Data:[
					/*{
						"id": 3,
						"name": "18~24岁或56岁及以上",
						"code": "0001",
						"score": "4",
						"enabled": true
					},
					{
						"id": 4,
						"name": "18~24岁或56岁及以上",
						"code": "0001",
						"score": "4",
						"enabled": false
					}*/
				]
            }
        },
        methods: {
			gotoBack(){
				this.$router.push({ path: '/productList/scoreSet',query: { id:this.$route.query.productId}});
			},
			getList(){
				var _this = this;
				//productList.factValueList_get({factId:this.$route.query.id}).then(res =>{
				//新版--查看明细 2017/3/31
				productList.factValueListNew_get({factId:this.$route.query.id}).then(res =>{
					_this.Data = res;
				}).catch(error =>{
					_this.$Error(_this,error);
				});
			},
			format_enabled(row){
				return row.enabled ? '启用':'停用';
			},
			handleEdit(row){
				var data = this.$Utils.dataClone(row);
				data.type = 'edit';
				//this.$bus.$emit('scoreSet_listViewEdit_DialogShow','编辑指标明细',data);
				///#/productList/scoreSet-listView?id=720&productId=1&name=%E4%B8%AA%E4%BA%BA%E4%BF%A1%E6%81%AF&cname=%E5%81%A5%E5%BA%B7%E7%8A%B6%E5%86%B5

				this.$router.push({path:'/productList/scoreSet-listView/edit',query:{
					type:'edit',
					id:row.id, //当前数据id
					productId:this.$route.query.productId, //指标明细列表 id(查询列表)
					RootId:this.$route.query.id, //产品列表id
					name:this.$route.query.name,
					cname:this.$route.query.cname
				}})
			},
        },
		created(){
			this.$bus.$off('H_scoreSetListView_reload');
			this.$bus.$on('H_scoreSetListView_reload',() =>{
				this.getList();
			});
		},
		mounted(){
			this.name=this.$route.query.name;
			this.cname=this.$route.query.cname;
			this.getList();
		}
    }
</script>

<style scoped>
	/*.rule_box{ margin-top: 25px;}*/
	.c_ff0000{ color: #ff0000;}
	.h-scoreSet-btnBox{margin-top: 30px; }
</style>