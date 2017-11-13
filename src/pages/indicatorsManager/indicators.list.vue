<template>
	<div v-loading="listLoading">
		<template v-for="data in Datas">
			<el-row class="mt30">
				<el-col :span="24">
					<strong>{{ data.types }}</strong>（共<span class="c_ff0000">{{ data.factList.length }}</span>条）
				</el-col>
			</el-row>
			<el-table :data="data.factList" border  style="width: 100%; margin-top: 15px;" v-loading="listLoading">
				<el-table-column prop="code" label="指标编号" width="150"></el-table-column>
                <el-table-column prop="name" label="指标分类"></el-table-column>
				<el-table-column prop="score" label="分值"></el-table-column>
                <el-table-column prop="enabled" label="状态"  :formatter="formatter" width="150"></el-table-column>
                <el-table-column inline-template :context="_self" label="操作" width="150">
	             <span>
					 <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
					 <el-button type="info" size="small" @click="handleGotoDetail(data.types,row)">明细</el-button>
				</span>
				</el-table-column>
			</el-table>
		</template>
	</div>
</template>

<script>
    import indicators from '../../api/indicatorsManager'
    export default {
        data() {
            return {
                listLoading:false,
                filters:{
                    codeOrName:''
                },
                Datas:[]
            }
        },
        methods: {
            handleEdit(row){
                var _data = {
                    id:row.id
				};
                this.$bus.$emit('IndicatorsDialogShow','编辑',_data,'edit');
            },
            handleGotoDetail(name,row){
                this.$router.push({ path: 'indicators/details', query: { name: name,cname:row.name,factId:row.id }});
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
            getIndicatorsList(){
                var _this = this;
                var params = {
                    codeOrName:_this.filters.codeOrName
                }
                _this.listLoading=true;
                indicators.getList(params).then(res =>{
                    _this.listLoading = false;
                    if(res&&res.length>0){
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
            this.$bus.$off("updataIndicatorsList");
            this.$bus.$on('updataIndicatorsList', (data) => {
                if(data){
                    this.filters.codeOrName=data;
				}else{
                    this.filters.codeOrName='';
                }
                this.getIndicatorsList();
            })
        },
        mounted() {
            this.getIndicatorsList();
        }

    }
</script>