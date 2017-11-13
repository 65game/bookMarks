
<template>
	<div class="h_pd10" style="padding-bottom: 10px;">
		<el-row>
			<el-col :span="24">
				<type-list></type-list>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	import TypeList  from './indicatorsClass.type'
	export default {
		components: {
            TypeList
		}
	};
</script>