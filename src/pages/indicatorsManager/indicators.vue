<template>
	<section>
		<el-row>
			<el-col :span="12">
				<el-button type="primary" icon="plus" @click="handleAddIndicators">新增指标</el-button>
			</el-col>
			<el-col :span="5" :offset="7">
				<el-input placeholder="请输入指标编号、分类搜索" icon="search" v-model="filters.codeOrName" :on-icon-click="handleIconClick"></el-input>
			</el-col>
		</el-row>
		<el-row>
			<indicators-list></indicators-list>
		</el-row>
		<indicators-add></indicators-add>
	</section>
</template>

<script>
    import IndicatorsList from './indicators.list.vue'
    import IndicatorsAdd from './indicators.dialog.vue'
    export default {
        components: {
            IndicatorsList,IndicatorsAdd
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
                this.$bus.$emit('updataIndicatorsList',_value);
            },
            handleAddIndicators(){
                var data = {};
                this.$bus.$emit('IndicatorsDialogShow','新增指标',data,'add');
            }

        }
    }
</script>