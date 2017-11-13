<template>
	<section>
		<el-row class="rule_box">
			<el-col :span="12" style="line-height: 36px;">
				<strong>{{name}}</strong> &gt; {{cname}}
			</el-col>
			<el-col :span="12" style="text-align: right;">
				<el-button type="primary"  icon="plus" @click="handleAddIndicators">新增指标</el-button>
			</el-col>
		</el-row>
		<el-table :data="Datas" border  style="width: 100%; margin-top: 15px;" v-loading="listLoading">
			<el-table-column prop="code" label="指标编号" width="150"></el-table-column>
            <el-table-column prop="name" label="指标名称"></el-table-column>
            <el-table-column prop="score" label="分值"  width="150"></el-table-column>
            <el-table-column prop="enabled" label="状态" :formatter="formatter" width="150"></el-table-column>
			<el-table-column inline-template :context="_self" label="操作" width="100">
	             <span>
					 <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
				</span>
			</el-table-column>
		</el-table>
		<el-row class="mt30">
			<el-button  icon="d-arrow-left" @click="gotoBack">返回</el-button>
		</el-row>
		<indicators-detail-dialog></indicators-detail-dialog>
	</section>
</template>
<script>

    import IndicatorsDetailDialog from './indicators.detail.dialog.vue'
    import indicators from '../../api/indicatorsManager'
    export default {
        components: {
            IndicatorsDetailDialog
        },
        data() {
            return {
                listLoading:false,
				name:'',
                cname:'',
				currentId:'',
                Datas:  []
            }
        },
        methods: {
            gotoBack(){
                this.$router.push({ path: '/indicators'});
            },
            handleEdit(row){
                var _data = {
                    id:row.id,
					type:'edit'
                };
                //this.$bus.$emit('IndicatorsDetailDialogShow','编辑',_data);
                this.$router.push({path:'/indicators/edit',query: { type:'edit',name:this.$route.query.name,cname:this.$route.query.cname,factId:this.$route.query.factId, id:row.id}});
            },
            handleAddIndicators(){
                var data = {
                    type:'add'
				};
                //this.$bus.$emit('IndicatorsDetailDialogShow','新增指标',data);
                this.$router.push({path:'/indicators/add',query: { type:'add',name:this.$route.query.name,cname:this.$route.query.cname,factId:this.$route.query.factId}});
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
                    factId:_this.currentId
                }
                _this.listLoading=true;
                indicators.getDetailInfo(params).then(res =>{
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
        created(){
            this.$bus.$off('updataIndicatorsList');
            this.$bus.$on('updataIndicatorsList', () => {
                this.getIndicatorsList();
            })
        },
        mounted() {
            this.name=this.$route.query.name;
            this.cname=this.$route.query.cname;
            this.currentId = this.$route.query.factId;
            this.getIndicatorsList();

//            console.log(this.$route.query);
//            console.log(this.$route.name);
//            console.log(this.$route.path);
//            console.log(this.$route.params);
//            console.log(this.$route.hash);
//            console.log(this.$route.fullPath);
//            console.log(this.$route.matched);
//            console.log(this.$route.matched.index);
//            console.log( this.$router.options.routes);
        }
    }
</script>