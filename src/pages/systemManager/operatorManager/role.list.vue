<template>
	<div>
		<el-col :span="24"  style="padding: 0 10px 10px 0;">
			<el-row class="b_eef1f6 button_box" style="padding: 5px;">
				<el-tooltip content="新增角色" placement="top">
					<el-button type="primary" icon="plus" size="mini" @click="handleAdd"></el-button>
				</el-tooltip>
				<el-tooltip content="编辑角色" placement="top">
					<el-button type="primary" icon="edit" size="mini" @click="handleEdit"></el-button>
				</el-tooltip>
				<el-tooltip content="删除角色" placement="top">
					<el-button type="primary" icon="delete" size="mini" @click="handleDel"></el-button>
				</el-tooltip>
			</el-row>
			<el-table :data="tableData" border highlight-current-row @row-click="handleCurrentChange" v-loading="listLoading" style="width: 100%">
				<el-table-column property="code" label="编号"></el-table-column>
				<el-table-column property="name" label="名称" ></el-table-column>
			</el-table>
		</el-col>
		<role-edit-dialog></role-edit-dialog>
	</div>
</template>

<script>
    import role from '../../../api/role'
    import roleEditDialog from './role.list.dialog.vue'
    export default {
        components: {
            roleEditDialog
        },
        data() {
            return {
                tableData: [],
                currentRow: '',
                currentRowId: '',
                listLoading: false
            }
        },
        methods: {
            handleCurrentChange(val){
                this.currentRow = val;
                var id = this.currentRow.id;
                this.$bus.$emit('getMembers',id);//获得成员
                this.$bus.$emit('getMenuList',id);//获得授权列表
                this.$bus.$emit('getDialogId',id);//获得弹窗ID
            },
            handleAdd(){
                var data = {};
                this.$bus.$emit('DialogShow','新增',data,'add');
            },
            handleEdit(row){
                if(this.currentRow){
                    this.$bus.$emit('DialogShow','编辑',this.currentRow,'edit');
                }else{
                    this.$message({
                        message: "请选择一条数据！",
                        type: 'warning'
                    });
                }
            },
            handleDel(){
                if(this.currentRow){
                    var _this = this;
                    _this.$confirm('您确定要删除该角色吗？', '提示', {
                    }).then(() => {
                        var params = {
                            id:this.currentRow.id,
                        }
                        role.delrole(params).then(res => {
                            if(res.code==0){
                                this.$message({
                                    type: 'success',
                                    message: '删除成功！'
                                });
                                this.getRoleList();
                            }
                        })
                    })
                }else{
                    this.$message({
                        message: "请选择一条数据！",
                        type: 'warning'
                    });
                }
            },
            getRoleList(){
                var _this = this;
                var params = {page:1, rows:10000};
                _this.listLoading = true;
                role.getList(params)
                    .then(res => {
                        _this.currentRowId = res.content[0].id;
                        _this.tableData = res.content;
                        _this.listLoading = false;
                    })
                    .catch(function (error) {
                        _this.listLoading = false;
                        _this.$Error(_this,error);
                    })
            }
        },
        created: function () {
            this.$bus.$on('updatagrole', () => {
                this.getRoleList();
            })
        },
        mounted() {
            this.getRoleList();
        }
    };
</script>