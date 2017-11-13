<template>
	<section>
		<div style=" width: 1052px; margin: 0 auto; padding-top: 10px; position: relative;">
			<div style="margin-right: 150px;">
				<h2 class="h-title"></h2>
				<!--查询条件-->
				<div id="mainChartFilters"  style="top: 15px; right: 198px; width: auto;">
					<div  id="mainChartTime">
						<el-radio-group v-model="filters.countWay" size="mini" @change="getCountWay">
							<el-radio-button label="1">近7天</el-radio-button>
							<el-radio-button label="2">近30天</el-radio-button>
							<el-radio-button label="3">近一年</el-radio-button>
							<el-radio-button label="4">全部</el-radio-button>
						</el-radio-group>
					</div>
					<div class="data">
						<el-date-picker
								v-model="filters.dataRange"
								type="daterange"
								:picker-options="pickerOptions"
								placeholder="选择日期范围"
								:editable = false
								@change="getData"
								size="mini"
								align="right">
						</el-date-picker>
					</div>
				</div>
				<!--图表-->
				<div id="mainChart" style="width:100%; height:450px; margin-top: 5px; z-index: 0;"></div>
			</div>
			<div id="h-mainChart-bar">
				<ul>
					<!--<li class="h-home-list"><span class="h-bg bg0" data-color="red"></span>员工贷</li>
                    <li class="h-home-list"><span class="h-bg bg1"></span>消费贷</li>
                    <li class="h-home-list"><span class="h-bg bg2"></span>商圈贷</li>-->
					<li class="h-home-list" v-for="(item,index) in chartProductData" v-bind:title="item.name" @click="clickProduct(item,index)"><span class="h-bg" v-bind:class="{ active: item.isActive}"></span>{{item.name}}</li>
				</ul>
			</div>
		</div>
	</section>
</template>
<script>
	import homeApi from '../../api/home'
	import echartsFn from '../../api/echartsFn'
	import echarts from 'echarts'

	export default {
		data() {
			return {
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				//过滤条件
				filters:{
					productCode:'', //产品编号
					countWay:'4',       //统计方式(1:近7天,2:近30天,3:近1年,4:全部,5:范围统计)
					dataRange:''
				},
				formatterData:'', //返回格式日期
				todoLoading:false,
				tableLoading:false,
				objLoading:false,
				//当前背景颜色
				currentColor:'#199ed8',
				currentName:'',//当前产品名称
				//当前产品编号
				currentProductCode:'',
				//定义产品数据
				chartProductData:[]
			};
		},
		watch: {
			/*'filters.countWay': function (val, oldVal) {
			 setTimeout(() => {
			 this.getChart();
			 },500);
			 }*/
		},
		methods: {
			//单击选择产品
			clickProduct(row,index){
				this.currentColor = row.bgColor;
				this.filters.productCode = row.code;
				for(var i= 0,len= this.chartProductData.length; i<len; i++){
					this.chartProductData[i].isActive = false;
				}
				this.chartProductData[index].isActive = true;
				this.getChart();
			},
			//获取产品
			getDicProduct(){
				var  _this = this;
				homeApi.getDicProduct().then(res =>{
					//console.log(res);
					var content = res.content;
				if(content.length){
					for(var i=0; i<content.length; i++){
						this.chartProductData.push({
							name:content[i].descp, //描述值为产品名称
							code:content[i].resName, //编号为产品code
							//bgColor:_this.bgColor[i]
							isActive:false
						})
					}
					_this.filters.productCode = this.chartProductData[0].code; //设置默认为第一个
					this.chartProductData[0].isActive = true;
					//调用图表
					_this.getChart();
				}

			}).catch(error =>{
					_this.$Error(_this,error);
			})
			},
			//获取用户信用评分分布接口
			getChart(){
				var _this = this;
				if(_this.formatterData){
					var params = {
						productCode:_this.filters.productCode,
						countWay:_this.filters.countWay,
						beginDate:_this.formatterData.slice(0,10),
						endDate:_this.formatterData.substr(_this.formatterData.length-10),
					};
				}else{
					var params = {
						productCode:_this.filters.productCode,
						countWay:_this.filters.countWay
					};
				}
				//console.log(JSON.stringify(params));
				_this.chartColumn.showLoading();
				homeApi.getCreditScore(params).then(res =>{
					if(res.xAxisData && res.xAxisTitle){
					echartsFn.barOnlyX('mainChart',res.xAxisTitle,res.xAxisData,{name:'用户数量',toolbox:true,toolboxTop:'15px',toolboxRight:'15px',saveAsImageName:'评分分布图表'});
				}

				_this.chartColumn.hideLoading();
			}).catch(error =>{
					_this.$Error(_this,error);
				_this.chartColumn.hideLoading();
			});
			},

			getCountWay(){
				//alert(this.filters.countWay)
				if(this.filters.countWay !='5'){
					this.formatterData = '';
					this.filters.dataRange = '';
				}
				this.getChart();
			},

			//返回格式化后的值
			getData(val){
				this.formatterData = val;
				if(val){
					this.filters.countWay = '5';
				}else{
					this.filters.countWay = '4'; //设为全部
				}
				this.getChart();
			}

		},
		mounted() {
			this.chartColumn = echarts.init(document.getElementById('mainChart'));
			this.getDicProduct(); //获取数字字典产品列表
		}
	}
</script>
<style scoped>
	#mainChartTime .el-radio-group .el-radio-button__inner{padding: 5px 6px;}
	#mainChart{margin-top: -30px!important; z-index: 0; position: relative;}
</style>