<!--评分模型配置-->
<!--根据wiki，接口对接 2017/3/20 lhw-->
<template>
	<section>
		<el-row>
			<el-col :span="19">
				<div class="h-scoreSetTitle">
					<strong>产品名称：</strong> {{result.name}}

					<!--草稿或发布则显示-->
                    <span v-show="initData.show">
                       <!-- <span>
                            <strong style="margin-left: 15px;">状态：</strong> {{initData.stateName}}
                        </span>-->
						<span v-if="initData.isCG">
                            <span style="margin-left: 15px;">
                                <el-badge is-dot class="item">
                                    <span style="display: inline-block; padding: 5px 8px; border-radius: 2px;  background-color: #eef1f6;">
                                        <span style="color: #ff4949">{{initData.stateName}}状态</span>
                                    </span>
								</el-badge>
                            </span>
                        </span>
						<!--草稿状态并且有发布ID-->
                        <span v-if="initData.isCGAndID">
                            <strong style="margin-left: 15px;">上次保存草稿时间：</strong> {{initData.lastUpdateTime}}
                            <el-button type="primary" icon="view"  style="margin-left: 15px;" @click="gotoRelease">查看已发布评分模型</el-button>
                         </span>
						<!--反之则显示，1，草稿状态没发布id，2，发布状态有发布id-->
                        <span v-else>
                             <strong style="margin-left: 15px;">上次{{initData.stateName}}时间：</strong> {{initData.lastUpdateTime}}
                        </span>
                    </span>

					<el-button type="primary" icon="setting"  style="margin-left: 15px;" @click="gotoPath">评分结果配置</el-button>
				</div>
			</el-col>
			<el-col :span="5">
				<el-input
						placeholder="请输入指标编号、分类搜索" icon="search" v-model="searchinput" :on-icon-click="handleIconClick">
				</el-input>
			</el-col>
		</el-row>

		<div class="h-boxLoading" v-loading="boxLoading">
			<!--个人基本情况-->
			<scoreSetList></scoreSetList>

			<!--编辑--模态框-->
			<scoreSetEdit></scoreSetEdit>

			<!--配置指标 --模态框-->
			<scoreSettingDialog></scoreSettingDialog>
		</div>


		<el-row class="h-scoreSet-btnBox">
			<el-button  icon="d-arrow-left" @click="gotoBack" :disabled="backDisabled">返回</el-button>
			<el-button type="primary" icon="document" @click="submit(0)" :loading="editLoading" :disabled="editDisabled">保存草稿</el-button>
			<el-button type="primary" icon="check" @click="submit(1)" :loading="addLoading" :disabled="addDisabled">发布</el-button>
			<el-button v-if="initData.isCGAndID" type="primary" icon="setting" @click="resetForm" :loading="resetLoading" :disabled="resetDisabled">重置到发布状态</el-button>
		</el-row>
	</section>
</template>

<script>
	import scoreSetList from './scoreSet.list.vue'      //引入列表组件
	import scoreSetEdit from './scoreSet.subAdd.vue'    //引入列表编辑弹窗组件
	import scoreSettingDialog from './scoreSet.settingDialog.vue'  //引入配置指标弹窗组件
	import productList from '../../api/productList'   //引入API

	export default {
		components: {
			scoreSetList,scoreSetEdit,scoreSettingDialog
		},
		data() {
			return {
				id:'',
				result:{
					"id": '',
					"name": ' ',
					"extCode":'',
					"innerCode": '',
					"modelId": '',
					"ownerId": ''
				},
				initData:{
					show:false,
					first:true, //默认第一次
					isCG:true,  //是否草稿
					isCGAndID:false,
					stateName:'',
					productName:'',
					lastUpdateTime:'', //时间
					releaseModelId:'' //已发布模型id
				},
				oldRuleIds:'',
				boxLoading:true,
				editLoading:false,
				addLoading:false,
				resetLoading:false,
				editDisabled:false,
				addDisabled:false,
				resetDisabled:false,
				backDisabled:false,
				searchinput: '',
				productName:'产品名称-员工贷'
			}
		},
		methods: {
			//根据名称查询
			handleIconClick(ev) {
				this.$bus.$emit('H_scoreSetList_search',{codeOrName:this.searchinput});
			},
			handleAddRule(){
				var data = {};
				this.$bus.$emit('ruleDialogShow','新增规则',data);
			},
			gotoPath(){
				this.$router.push({ path: '/productList/scoreSet-result', query: { name: 'router',id:this.$route.query.id }});
			},
			//返回产品列表
			gotoBack(){
				this.$router.push({ path: '/productList'});
			},
			//查看已发布模型
			gotoRelease(){
				this.$router.push({ path: '/productList/scoreSet/release',query:{productId:this.$route.query.id,modelId:this.initData.releaseModelId}});
			},
			getProductInfo(){
				var _this = this;
				if(_this.$Utils.isNumber(_this.id)){
					productList.productInfo_getById(_this.id).then( res => {
						_this.result = res || _this.result;
				}).catch( error =>{
						_this.$Error(_this,error);
				});
				}
			},
			dealSubmit(obj,params,msg){
				var _this = obj;
				productList.factSet_postForm(params).then( res =>{
					//debugger;
					_this.addLoading = false;
				_this.editLoading = false;
				_this.resetDefaultBtn();
				_this.$message({
					type: 'success',
					message: msg
				});
				setTimeout(function(){
					_this.$bus.$emit('H_scoreSetList_reload');
				},500)
			}).catch(error =>{
					_this.$Error(_this,error);
				_this.addLoading = false;
				_this.editLoading = false;
				_this.resetDefaultBtn();
			});
			},
			submit(status){
				var _this = this;
				this.$bus.$emit('H_scoreSetList_getUnSubmitIds',function(ids){

					if(ids){
						var params = {
							productId:_this.result.id,
							status:status,
							factIds:ids  // 配置规则模板ID集，以“,”分隔
						};
					}else{
						var params = {
							productId:_this.result.id,
							status:status
						};
					}

					var msg = status =='1'? '发布成功！':'保存草稿成功！';
					if(status=='1'){

						_this.$confirm('确认要发布吗？', '提示', {}).then(() => {
							_this.addLoading = true;
						_this.disabledOthersBtn('addDisabled');
						_this.dealSubmit(_this,params,msg);
					});
					}else{
						_this.editLoading = true;
						_this.disabledOthersBtn('editDisabled');
						_this.dealSubmit(_this,params,msg);
					}




				});



			},

			resetDefaultBtn(){ //恢复默认可用
				this.editDisabled = false;
				this.addDisabled = false;
				this.backDisabled = false;
				this.resetDisabled = false;
			},
			disabledAllBtn(){ //全部不可用
				this.editDisabled = true;
				this.addDisabled = true;
				this.backDisabled = true;
				this.resetDisabled = true;
			},
			disabledOthersBtn(btn){ //设置其他不可用，除了自身
				this.disabledAllBtn();
				this[btn] = false;
			},
			resetForm(){
				var _this = this;
				_this.$confirm('确认要重置到发布状态吗？', '提示', {}).then(() => {
					_this.resetLoading = true;

				_this.disabledOthersBtn('resetDisabled');
				productList.productReset({productId:_this.result.id}).then(res =>{
					if(res.code=='0'){
					_this.$message({
						type:'success',
						message: '重置成功！'
					})
					setTimeout(function(){
						_this.$bus.$emit('H_scoreSetList_reload');
					},800);


				}else{
					_this.$message({
						type:'warning',
						message:res.msg || '操作失败！'
					})
				}
				_this.resetLoading = false;
				_this.resetDefaultBtn();
			}).catch(error =>{
					_this.$Error(_this,error);
				_this.resetLoading = false;
				_this.resetDefaultBtn();
			});
			});


			},
			render(params){

				//_this.$bus.$emit('H_ruleSetInfo',{status:res.status,productName:res.productName,lastUpdateTime:res.lastUpdateTime,releaseModelId:res.releaseModelId});

				//debugger;

				if(params.status !=null){ //判断是否草稿或发布
					this.initData.first = false;
					this.initData.show = true;
					if(params.status =='0'){  //判断是否草稿
						this.initData.isCG = true;
						this.initData.stateName = '草稿';
						if(params.releaseModelId){ //有值
							this.initData.isCGAndID = true;
						}else{
							this.initData.isCGAndID = false;
						}
					}else{
						this.initData.isCG = false;
						this.initData.isCGAndID = false;
						this.initData.stateName = '发布';
					}

				}else{
					this.initData.first = true;
					this.initData.show = false;
					this.initData.isCG = false;
					this.initData.isCGAndID = false;
				}
				this.initData.productName = params.productName; //产品名称
				this.initData.lastUpdateTime = params.lastUpdateTime; //时间
				this.initData.releaseModelId = params.releaseModelId; //已发布模型id


			},

			stopLoading(){
				this.boxLoading = false;
			},
			showLoading(){
				this.boxLoading = true;
			},

		},
		created(){
			this.$bus.$off('H_scoreSetInfo');
			this.$bus.$on('H_scoreSetInfo',(params)=>{
				this.render(params);
			});

			this.$bus.$off("H_SCORESET_showLoading");
			this.$bus.$on("H_SCORESET_showLoading",()=>{
				this.showLoading();
		});
			this.$bus.$off("H_SCORESET_hideLoading");
			this.$bus.$on("H_SCORESET_hideLoading",()=>{
				this.stopLoading();
		});
		},
		mounted(){
			var _this = this;
			this.id = this.$route.query.id;
			this.getProductInfo();
			/*setTimeout(() =>{
				_this.$bus.$emit('H_scoreSetList_getRuleIds',function(ids){
				_this.oldRuleIds = ids;
			});
			},1000)*/
		}
	}
</script>

<style scoped>
	.h-scoreSetTitle{font-size: 15px;}
	.button_box span{ color: #bebfc0;}
	.btn_border_none{ border:none; background: none;}
	.rule_box{ margin-top: 40px;}
	.c_ff0000{ color: #ff0000;}
	.h-scoreSet-btnBox{margin-top: 30px; }
</style>
