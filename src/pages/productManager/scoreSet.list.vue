<!--产品评分模型 --列表 wiki接口对接 2017/3/20 lhw-->
<template>
	<section v-if="hasData" style="min-height: 450px;">
		<template v-for="(item,index) in Data">
			<el-row class="rule_box">
				<el-col :span="18">
					<strong>{{item.types}}</strong>
				</el-col>
				<el-col :span="6" style="text-align: right;">
					<el-button type="primary" icon="plus" size="small" @click="handleSubAdd(index)">配置指标</el-button>
				</el-col>
			</el-row>
			<el-table v-bind:data="item.factList" border  style="width: 100%; margin-top: 10px;" v-loading="listLoading">
				<el-table-column prop="code" label="指标编号"  width="150"></el-table-column>
				<el-table-column prop="name" label="指标分类" min-width="150"  show-overflow-tooltip></el-table-column>
				<el-table-column prop="score" label="指标分值" width="120"  show-overflow-tooltip></el-table-column>
				<el-table-column prop="enabled" label="指标状态" width="100" :formatter="format_enabled"></el-table-column>
				<el-table-column inline-template :context="_self" label="操作" width="200" >

					<div>
					<span v-if="row.unSubmit">
						 <el-button type="danger" size="small" @click="handleRemove(index,row)">移除</el-button>
					</span>
					<span  v-else>
						<el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
						<el-button type="info" size="small" @click="handleView(item.types,row)">明细</el-button>
						 <el-button type="danger" size="small" @click="handleDel(row)">删除</el-button>
					</span>
					</div>
				</el-table-column>
			</el-table>
		</template>
	</section>
	<section style="min-height: 450px; text-align: center; line-height: 250px; color: #999; letter-spacing: 5px; font-size: 18px;" v-else>
		<i class="el-icon-warning"></i>暂无评分模型配置数据...
	</section>
</template>

<script>
	import productList from '../../api/productList' //引入API
    export default {
        data() {
            return {
                num:'10',
				id:'',
                listLoading:false,
				hasData:true,
				ruleIds:'',
				unSubmitIds:'',
                Data:[
					/*{
						"factList":
								[
									{
										"id": 8065,
										"code": "1001",
										"name": "年龄",
										"score": "4",
										"enabled": true
									},
									{
										"id": 8195,
										"code": "1001",
										"name": "年龄222",
										"score": "4",
										"enabled": false
									}
								],
						"types": "个人基本情况"
					},
					{
						"factList":
								[
								],
						"types": "工作情况"
					},
					{
						"factList":
								[
								],
						"types": "经济情况"
					},
					{
						"factList":
								[
								],
						"types": "与金融机构关系情况"
					}*/
				]
            }
        },
        methods: {
            handleEdit(row){
				var data = this.$Utils.dataClone(row);
				this.$bus.$emit('scoreSet_subAdd_DialogShow','编辑指标分类',data);
			},
			//明细--路由跳转
			handleView(type,row){
				this.$router.push({ path: '/productList/scoreSet-listView', query: { id:row.id,productId:this.$route.query.id,name: type,cname:row.name}});
			},
			handleDel(row){
				var _this = this;
				_this.$confirm('确认要删除该指标分类吗？', '提示', {}).then(() => {
					productList.factProduct_delete(row.id).then(res =>{
					if(res.code =='0'){
						_this.$message({
							type: 'success',
							message: '删除成功！'
						});
					_this.search();
					}else{
						_this.$message({
							type: 'warning',
							message: res.msg || '操作失败！'
						});
					}
				}).catch(error =>{
					_this.$Error(_this,error);
				});

				});
			},
			format_enabled(row){
				return row.enabled ? '启用':'停用';
			},
			handleRemove(index,row){ //移除
				//alert(row.code)
				var currentArr = this.Data[index].factList; //当前数组
				for(var i=0; i<currentArr.length; i++){
					if(currentArr[i].id ==row.id){
						currentArr.splice(i,1);
						break;
					}
				}
			},
			search(obj){
				var _this = this;
				//查询产品评分模型列表
				var obj = typeof obj == 'object'? obj :{codeOrName:''};
				var params = {
					productId:_this.id,
					codeOrName:obj.codeOrName || '' //指标名称 或 指标编号
				}
				if(_this.$Utils.isNumber(_this.id)){
					//_this.listLoading = true;
					_this.$bus.$emit('H_SCORESET_showLoading');
					productList.factList_get(params).then( res => {
						_this.Data = res.factListDto;
					_this.$bus.$emit('H_scoreSetInfo',{status:res.status,productName:res.productName,lastUpdateTime:res.lastUpdateTime,releaseModelId:res.releaseModelId});
					_this.listLoading = false;
					_this.$bus.$emit('H_SCORESET_hideLoading');
					if(_this.Data.length){
						_this.hasData = true;
					}else{
						_this.hasData = false;
					}
					}).catch( error =>{
							_this.$Error(_this,error);
					_this.listLoading = false;
					_this.$bus.$emit('H_SCORESET_hideLoading');
					});
				}

			},
			handleSubAdd(index){
				var obj = this.Data[index]; //当前的数组
				var factList = obj.factList;
				var types = obj.types;
				var choosedCodesArr = [];
				for(var i= 0,l=factList.length; i<l; i++){
					choosedCodesArr.push(factList[i].code);
				}
				var params = {
					index:index,    //数据搜索
					type:types,   //指标分类类别
					choosedCodes:choosedCodesArr.join(',') //已选规则编号，以“,”分隔
				}

				this.$bus.$emit('scoreSet_settingDialog_open','评分模型配置',params,'个人基本情况');
			},
			data_push(index,data){  //更新列表数据--针对配置规则--前端操作
				for(var i=0; i<data.length; i++){
					this.Data[index].factList.push(data[i]);
				}
			},
			getRuleIds(callback){ // 配置规则模板ID集
				var idsArr = [];
				for(var i =0; i<this.Data.length; i++){
					for(var j =0; j<this.Data[i].factList.length; j++){
						idsArr.push(this.Data[i].factList[j].id);
					}
				}

				this.ruleIds = idsArr.join(',');
				callback(idsArr.join(','))
			},
			getUnSubmitIds(callback){ //收集未提交的id集合
				var idsArr = [];
				var _data = this.Data;
				for(var i =0; i<_data.length; i++){
					for(var j =0; j<_data[i].factList.length; j++){
						if(_data[i].factList[j].unSubmit){
							idsArr.push(_data[i].factList[j].id);
						}
					}
				}
				this.unSubmitIds = idsArr.join(',');
				callback(idsArr.join(','))
			},

        },
		created(){
			//push 确定回填
			this.$bus.$off('H_scoreSetList_push');
			this.$bus.$on('H_scoreSetList_push', (index,data) => {
				this.data_push(index,data);
			});

			//更新列表数据
			this.$bus.$off('H_scoreSetList_reload');
			this.$bus.$on('H_scoreSetList_reload', (params) => {
				this.search();
			});

			//条件搜索
			this.$bus.$off('H_scoreSetList_search');
			this.$bus.$on('H_scoreSetList_search', (params) => {
				this.search(params);
			});

			//获取列表id集合
			this.$bus.$off('H_scoreSetList_getRuleIds');
			this.$bus.$on('H_scoreSetList_getRuleIds', (callback) => {
				this.getRuleIds(callback);
			});

			//获取未提交的id集合
			this.$bus.$off('H_scoreSetList_getUnSubmitIds');
			this.$bus.$on('H_scoreSetList_getUnSubmitIds', (callback) => {
				this.getUnSubmitIds(callback);
		});
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
</style>