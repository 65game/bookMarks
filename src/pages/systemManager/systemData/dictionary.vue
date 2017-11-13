<!--数字字典模块 -->
<template>
	<div class="h_pd10" style="padding-bottom: 10px;">
		<!--<el-row>
			<el-col :span="5">
				&lt;!&ndash;<TreeVue></TreeVue>&ndash;&gt;
				<TreeVue parentPath="/系统目录/数据字典/"></TreeVue>
			</el-col>
			<el-col :span="19">
				<div class="grid-content bg-purple-light">
					&lt;!&ndash;列表&ndash;&gt;
					<TableList :dd="11"></TableList>
					&lt;!&ndash;编辑界面&ndash;&gt;
					<DialogBox></DialogBox>
				</div>
			</el-col>
		</el-row>-->
		<div style="float: left; width: 290px;">
			<TreeVue parentPath="/系统目录/数据字典/"></TreeVue>
		</div>
		<div style="margin-left: 295px;">
			<TableList></TableList>
			<!--编辑界面-->
			<DialogBox></DialogBox>
		</div>
	</div>
</template>
<script>
	import TreeVue  from './dictionary.tree'
	import TableList  from './dictionary.list'
	import DialogBox  from './dictionary.dialog'
	export default {
		components: {
			TreeVue,
			TableList,
			DialogBox
		},
		data() {
			return {
				//editFormVisible:true,
			};
		},
		methods: {
			//
		},
		mounted() {
			//
		}
	};
</script>

<style scoped>
	.h-clearfix {zoom:1;}
	.h-clearfix:after { display:block; clear:both; content:"."; visibility:hidden; height:0; font-size:0;}
	.h-left{float:left;width:200px;}.h-right{margin-left:210px;}
</style>