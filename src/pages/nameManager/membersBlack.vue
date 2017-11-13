<template>
	<section>
		<!--选项卡-->

        <!--暂时隐藏企业黑名单-->

		<!--<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="个人黑名单" name="first">
				<user-black></user-black>
			</el-tab-pane>
			<el-tab-pane label="企业黑名单" name="second">
				<company-black></company-black>
			</el-tab-pane>
		</el-tabs>-->


        <user-black></user-black>
	</section>
</template>

<script>
    import userBlack from './userBlack.vue'
    import companyBlack from './companyBlack.vue'
    export default {
        components: {
            userBlack,companyBlack
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