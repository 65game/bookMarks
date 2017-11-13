<template>
	<div v-loading="listLoading">
		<template v-for="data in Datas">
			<el-row class="mt30">
				<el-col :span="24">
					<strong>{{ data.types }}</strong>（共<span class="c_ff0000">{{ data.ruleList.length }}</span>条）
				</el-col>
			</el-row>
			<el-table :data="data.ruleList" border  style="width: 100%; margin-top: 15px;">
				<el-table-column prop="code" label="规则编号" width="150"></el-table-column>
                <el-table-column prop="name" label="规则名称"></el-table-column>
                <el-table-column prop="smallTypes" label="规则子类"></el-table-column>
                <el-table-column prop="enabled" label="状态"  :formatter="formatter" width="150"></el-table-column>
                <el-table-column inline-template :context="_self" label="操作" width="150">
	             <span>
					<el-button type="primary" size="small" @click="handleEditRule(row)">编辑</el-button>
				</span>
				</el-table-column>
			</el-table>
		</template>
	</div>
</template>

<script>
    import ruleManager from '../../api/ruleManager'
    export default {
        data() {
            return {
                num:'10',
                listLoading:false,
                filters:{
                    codeOrName:''
                },
                Datas:[]
            }
        },
        methods: {
            handleEditRule(row){
                //var _data = this.$Utils.dataClone(row);
                var _data = {id:row.id};
                //this.$bus.$emit('ruleDialogShow','编辑',_data,'edit');
                this.$router.push({ path: '/rule/edit', query: { type:'edit',id:row.id}});
            },
            formatter(row, column) {
                var state = row.enabled;
                var text = "";
                if (state) {
                    text = "启用";
                }else{
                    text = "停用";
                }
                return text;
            },
            getRuleList(){
                var _this = this;
                var params = {
                    codeOrName:_this.filters.codeOrName
                }
                _this.listLoading=true;
                ruleManager.getList(params).then(res =>{
                    _this.listLoading = false;
                    if(res){
                        _this.Datas = res;
                    }else if(res.code=="-1"){
                        _this.$notify({
                            title: '提示',
                            message: res.msg,
                            type: 'error'
                        });
					}
                }).catch(function(error){
                    _this.listLoading = false;
                    _this.$Error(_this,error);
                })
            }
        },
        created: function () {
            this.$bus.$off("updataRuleList");
            this.$bus.$on('updataRuleList', (data) => {
                this.filters.codeOrName=data;
                this.getRuleList();
            })
        },
        mounted() {
            this.getRuleList();
        }
    }
</script>