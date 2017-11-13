<template>
	<section>
		<!--选项卡-->
		<!--<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="个人用户" name="first">
				<user></user>
			</el-tab-pane>
			<el-tab-pane label="企业用户" name="second">
				<company></company>
			</el-tab-pane>
		</el-tabs>-->
        <user></user>
	</section>
</template>

<script>
    import user from './user.vue'
    import company from './company.vue'
    export default {
        components: {
            user,
            company
        },
        data() {
            return {
                activeName: 'first'
            }
        },
        methods: {
            handleClick(tab, event) {
//                console.log(tab, event);
            }
        }
    }
</script>