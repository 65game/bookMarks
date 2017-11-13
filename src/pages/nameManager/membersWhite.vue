<template>
	<section>
		<!--选项卡-->
		<!--<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="个人白名单" name="first">
				<user-white></user-white>
			</el-tab-pane>
			<el-tab-pane label="企业白名单" name="second">
				<company-white></company-white>
			</el-tab-pane>
		</el-tabs>-->

        <user-white></user-white>
	</section>
</template>

<script>
    import userWhite from './userWhite.vue'
    import companyWhite from './companyWhite.vue'
    export default {
        components: {
            userWhite,companyWhite
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