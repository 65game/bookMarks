<!--系统设置模块 -->
<template>
	<div class="h_pd10" style="padding-bottom: 10px;">
		<!--<el-row>
			<el-col :span="5">
				&lt;!&ndash;树形组件&ndash;&gt;
				<TreeVue parentPath="/系统目录/配置设置/"></TreeVue>
			</el-col>
			<el-col :span="19">
				<div class="grid-content bg-purple-light">
					&lt;!&ndash;列表&ndash;&gt;
					<TableList></TableList>

					&lt;!&ndash;编辑界面&ndash;&gt;
					<DialogBox></DialogBox>
				</div>
			</el-col>
		</el-row>-->
		<div style="float: left; width: 290px;">
			<TreeVue parentPath="/系统目录/配置设置/"></TreeVue>
		</div>
		<div style="margin-left: 295px;">
			<!--列表-->
			<TableList></TableList>

			<!--编辑界面-->
			<DialogBox></DialogBox>
		</div>
	</div>
</template>
<script>
	import TreeVue  from './settings.tree'
	import TableList  from './settings.list'
	import DialogBox  from './settings.dialog'
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
