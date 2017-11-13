<!--2017/3/22 接口测试联调 lhw-->
<template>
	<section v-if="hasData" style="min-height: 450px;">
		<template v-for="(item,index) in Data">
		<el-row class="rule_box">
			<el-col :span="18">
				<strong>{{item.types}}</strong>
			</el-col>
			<el-col :span="6" style="text-align: right;">
				<el-button type="primary" icon="plus" size="small" @click="handleSubAdd(index)">配置规则</el-button>
			</el-col>
		</el-row>

		<el-table v-bind:data="item.ruleList" border  style="width: 100%; margin-top: 10px;" v-loading="listLoading">
			<el-table-column prop="code" label="指标编号"  width="150"></el-table-column>
			<el-table-column prop="name" label="规则名称" min-width="250"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="smallTypes" label="规则分类" min-width="200"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="enabled" label="规则状态" width="100" :formatter="formatEnabled"></el-table-column>
			<el-table-column inline-template :context="_self" label="操作" width="150" >
				<div>
					<span v-if="row.unSubmit">
						 <el-button type="danger" size="small" @click="handleRemove(index,row)">移除</el-button>
					</span>
					<span  v-else>
						<el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
						 <el-button type="danger" size="small" @click="handleDel(row)">删除</el-button>
					</span>
				</div>
			</el-table-column>
		</el-table>
		</template>
	</section>
	<section style="min-height: 450px; text-align: center; line-height: 250px; color: #999; letter-spacing: 5px; font-size: 18px;" v-else>
		<i class="el-icon-warning"></i>暂无规则模型配置数据...
	</section>
</template>

<script>

	import productList from '../../api/productList'
    export default {
		components:{

		},
		props: ['myData'],
        data() {
            return {
				productId:'',
                num:'10',
				hasData:true,
                listLoading:false,
				ruleIds:'',
				unSubmitIds:'',
                Data:[
					/*{
						"ruleList":
								[
									{
										"id": 1,
										"code": "1001",
										"name": "工龄检测",
										"smallTypes": "工龄检测",
										"enabled": false
									},
									{
										"id": 2,
										"code": "1002",
										"name": "在职时长22",
										"smallTypes": "在职时长",
										"enabled": true,
										"unSubmit":true
									}
								],
						"types": "职业信息"
					},
					{
						"ruleList":
								[
									{
										"id": 1,
										"code": "1001",
										"name": "工龄检测",
										"smallTypes": "工龄检测",
										"enabled": false
									},
									{
										"id": 2,
										"code": "1002",
										"name": "在职时长",
										"smallTypes": "在职时长",
										"enabled": true
									}
								],
						"types": "鸿文测试--数据对接的"
					},
					{
						"ruleList":
								[
									{
										"id": 3,
										"code": "2001",
										"name": "人脸识别",
										"smallTypes": "人脸识别",
										"enabled": true
									},
									{
										"id": 4,
										"code": "2002",
										"name": "实名认证",
										"smallTypes": "实名认证",
										"enabled": true
									}
								],
						"types": "个人信息"
					}*/
				]
            }
        },
        methods: {
            handleEdit(row){
				var _data = this.$Utils.dataClone(row);
				//this.$bus.$emit('ruleDialogShow','编辑规则',_data);
				this.$router.push({path:'/productList/ruleSet/edit',query:{id:row.id,productId:this.$route.query.id}})
			},
			//明细--路由跳转
			handleView(row){
				this.$router.push({ path: '/productList/scoreSet-listView', query: { name: 'scoreSet-listView',id:row.ruleNum }});
			},
			handleDel(row){
				var _this = this;
				_this.$confirm('您确定删除该项规则吗？', '提示', {}).then(() => {
					productList.instance_delete(row.id).then(res =>{
					_this.$message({
					 type: 'success',
					 message: '删除成功！'
					 });
				_this.search();
				}).catch(error =>{
					_this.$Error(_this,error);
				});

				});
			},
			handleSubAdd(index){
				//alert(index);
				var obj = this.Data[index]; //当前的数组
				var ruleList = obj.ruleList;
				var types = obj.types;
				var choosedCodesArr = [];
				for(var i= 0,l=ruleList.length; i<l; i++){
					choosedCodesArr.push(ruleList[i].code);
				}
				var params = {
					index:index,    //数据搜索
					ruleType:types, //规则类型
					ruleName:'',   //规则名称 ??待确定，不是必填项
					choosedCodes:choosedCodesArr.join(',') //已选规则编号，以“,”分隔
				}
				//console.log(params);
				this.$bus.$emit('ruleSet_settingDialog_open','规则模型配置',params,'个人信息');
			},
			formatEnabled(row){
				return row.enabled ? '启用':'停用';
			},
			handleRemove(index,row){ //移除
				//alert(row.code)
				var currentArr = this.Data[index].ruleList; //当前数组
				for(var i=0; i<currentArr.length; i++){
					if(currentArr[i].code ==row.code){
						currentArr.splice(i,1);
						break;
					}
				}
			},
			search(obj){
				var _this = this;
				var obj = typeof obj =='object'? obj :{codeOrName:''};
				var params  = {
					productId:this.$route.query.id,//产品id
					codeOrName:obj.codeOrName || ''
				};
				//产品风控规则列表查询
				//_this.listLoading = true;
				_this.$bus.$emit('H_RULESE_showLoading');
				productList.instanceList_get(params).then( res => {
					_this.Data = res.ruleInstanceListDto;
				_this.$bus.$emit('H_ruleSetInfo',{status:res.status,productName:res.productName,lastUpdateTime:res.lastUpdateTime,releaseModelId:res.releaseModelId});
				_this.listLoading = false;
				_this.$bus.$emit('H_RULESE_hideLoading');
				//debugger;
					if(_this.Data.length){
						_this.hasData = true;
					}else{
						_this.hasData = false;
					}
				}).catch( error =>{
						_this.$Error(_this,error);
				_this.listLoading = false;
				_this.$bus.$emit('H_RULESE_hideLoading');
				});
			},
			data_push(index,data){  //更新列表数据--针对配置规则--前端操作
				for(var i=0; i<data.length; i++){
					this.Data[index].ruleList.push(data[i]);
				}
			},
			getRuleIds(callback){ // 配置规则模板ID集
				var idsArr = [];
				for(var i =0; i<this.Data.length; i++){
					for(var j =0; j<this.Data[i].ruleList.length; j++){
						idsArr.push(this.Data[i].ruleList[j].id);
					}
				}

				this.ruleIds = idsArr.join(',');
				callback(idsArr.join(','))
			},
			getUnSubmitIds(callback){ //收集未提交的id集合
				var idsArr = [];
				var _data = this.Data;
				for(var i =0; i<_data.length; i++){
					for(var j =0; j<_data[i].ruleList.length; j++){
						if(_data[i].ruleList[j].unSubmit){
							idsArr.push(_data[i].ruleList[j].id);
						}
					}
				}
				this.unSubmitIds = idsArr.join(',');
				callback(idsArr.join(','))
			},
        },
		created(){
			this.$bus.$off('H_ruleSetList_push');
			this.$bus.$on('H_ruleSetList_push', (index,data) => {
					this.data_push(index,data);
			});
				this.$bus.$off('H_ruleSetList_reload');
				this.$bus.$on('H_ruleSetList_reload', (params) => { //reload
					this.search();
			});

			this.$bus.$off('H_ruleSetList_search');
			this.$bus.$on('H_ruleSetList_search', (params) => { //条件查询
				this.search(params);
		});
				this.$bus.$off('H_ruleSetList_getRuleIds');
				this.$bus.$on('H_ruleSetList_getRuleIds', (callback) => {
					this.getRuleIds(callback);
			});

			this.$bus.$off('H_ruleSetList_getUnSubmitIds');
			this.$bus.$on('H_ruleSetList_getUnSubmitIds', (callback) => {   //getUnSubmitIds
				this.getUnSubmitIds(callback);
		});
		},
		mounted(){
			this.search();
		}
    }
</script>

<style scoped>
	.rule_box{ margin-top: 25px;}
	.c_ff0000{ color: #ff0000;}
</style>