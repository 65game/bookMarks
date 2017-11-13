<template>
	<section>
		<el-row>
			<el-col :span="12">
				<el-button type="primary" icon="plus" @click="handleAddRule">新增规则</el-button>
			</el-col>
			<el-col :span="5" :offset="7">
				<el-input placeholder="请输入规则编号、名称搜索" icon="search" v-model="filters.codeOrName" :on-icon-click="handleIconClick"></el-input>
			</el-col>
		</el-row>
		<el-row>
			<rule-list></rule-list>
		</el-row>
		<rule-dialog></rule-dialog>
	</section>
</template>

<script>
    import RuleList from './rule.list.vue'
    import RuleDialog from './rule.dialog.vue'
    export default {
        components: {
            RuleList,RuleDialog
        },
        data() {
            return {
                filters:{
                    codeOrName:''
                }
            }
        },
        methods: {
            handleIconClick() {
                var _value = this.filters.codeOrName;
                this.$bus.$emit('updataRuleList',_value);
            },
            handleAddRule(){
                var data = {};
                //this.$bus.$emit('ruleDialogShow','新增规则',data,'add');
                this.$router.push({ path: '/rule/add', query: { type:'add'}});
			}

        }
    }
</script>