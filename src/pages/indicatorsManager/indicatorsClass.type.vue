
<template>
	<div>
		<el-col :span="24"  style="padding: 0 10px 10px 0;">
			<el-row class="b_eef1f6 button_box" style="padding: 5px;">
				<el-tooltip content="新增指标分类" placement="top">
					<el-button type="primary" icon="plus" size="mini" @click="addNode"></el-button>
				</el-tooltip>
				<el-tooltip content="编辑指标分类" placement="top">
					<el-button type="primary" icon="edit" size="mini" @click="edtNode"></el-button>
				</el-tooltip>
				<el-tooltip content="删除指标分类" placement="top">
					<el-button type="primary" icon="delete" size="mini" @click="delNode"></el-button>
				</el-tooltip>
			</el-row>
			<el-table :data="tableData" border highlight-current-row @current-change="handleCurrentChange" v-loading="listLoading" style="width: 100%">
				<el-table-column property="name" label="指标分类" ></el-table-column>
			</el-table>
		</el-col>
		<dialog-box></dialog-box>
	</div>
</template>

<script>
    import indicatorsClass from '../../api/indicatorsClass'
    import DialogBox  from './indicatorsClass.type.dialog'
    export default {
        components: {
            DialogBox
        },
        data() {
            return {
                filterText:'',
                tableData:[],
                listLoading: false,
                currentRow: '',
                currentRowId: ''
            };
        },
        created(){
            var _this = this;
            _this.$bus.$off('indicatorsClassReaload');
            _this.$bus.$on('indicatorsClassReaload',function(){
                _this.getlist();
            });
        },
        methods: {
            handleCurrentChange(val){
                this.currentRow = val;
            },
            getlist() {
                var _this = this;
                var params = {'type':'FACT','parentId':'-1'};
                _this.listLoading = true;
                indicatorsClass.getList(params)
                    .then((res) => {
                        _this.listLoading = false;
                        if(res.code=="-1"){
                            _this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }else{
                            _this.tableData = res;
                        }
                    })
                    .catch(function (error) {
                        _this.listLoading = false;
                        _this.$Error(_this,error);
                    })
            },
            addNode() {
                this.$bus.$emit('DialogShow','新增指标分类',{},'add');
            },
            edtNode() {
                if(this.currentRow){
                    var _data = this.$Utils.dataClone(this.currentRow);
                    this.$bus.$emit('DialogShow','编辑',_data,'editType');
                }else{
                    this.$message({
                        message: '请单击选择一条数据！',
                        type: 'warning'
                    });
                }
            },
            delNode() {
                var _this = this;
                if(_this.currentRow){
                    _this.$confirm('您确定要删除选中的数据吗？', '提示', {}).then(() => {
                        indicatorsClass.del(_this.currentRow.id)
                            .then((res) =>{
                                if(res.code=="0"){
                                    _this.$message({
                                        message: '删除成功！',
                                        type: 'success'
                                    });
                                    _this.getlist();
                                }else{
                                    _this.$message({
                                        message: res.msg,
                                        type: 'error'
                                    });
                                }
                            })
                            .catch (function(error){
                                _this.$Error(_this,error);
                            })
                    }).catch(() => {});
                }else{
                    _this.$message({
                        message: '请单击选择一条数据！',
                        type: 'warning'
                    });
                }
            }
        },
        mounted() {
            this.getlist();
        }
    };

</script>
