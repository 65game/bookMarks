<template>
	<div>
		<!--角色管理-->
		<el-row>
			<el-col :span="5">
				<role-list></role-list>
			</el-col>
			<el-col :span="19">
				<!--选项卡-->
				<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
					<el-tab-pane label="授权列表" name="first" style="margin:0 0 5px 0;">
						<role-menu></role-menu>
					</el-tab-pane>
					<el-tab-pane label="成员列表" name="second" style="margin:0 0 5px 0;">
						<role-members></role-members>
					</el-tab-pane>
				</el-tabs>
			</el-col>
		</el-row>
	</div>
</template>

<script>
    import roleList  from './role.list.vue'
    import roleMenu  from './role.menu.list.vue'
    import roleMembers  from './role.members.list.vue'
    export default {
        components: {
            roleList, roleMenu, roleMembers
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
        },
        mounted() {

        }
    };
</script>