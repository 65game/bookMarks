<template>
	<div>
		<el-row class="button_box" style="padding: 5px;">
			<el-tooltip content="添加成员" placement="top">
				<el-button type="primary" icon="plus" size="mini" @click="add"></el-button>
			</el-tooltip>
			<el-tooltip content="移除成员" placement="top">
				<el-button type="primary" icon="delete" size="mini" @click="del"></el-button>
			</el-tooltip>
		</el-row>
		<el-table :data="tableData" border style="width: 100%" v-loading="listLoading" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column prop="name" label="管理员账号" ></el-table-column>
			<el-table-column prop="realName" label="真实姓名"></el-table-column>
			<el-table-column prop="email" label="邮箱"></el-table-column>
			<el-table-column prop="mobile" label="电话"></el-table-column>
			<el-table-column prop="workNumber" label="工号"></el-table-column>
		</el-table>
		<!--分页-->
		<el-col :span="24" class="toolbar" style="padding-bottom:10px;">
			<el-pagination @current-change="handleCurrentChange" :page-size="10" layout="total, prev, pager, next, jumper" :total="total" style="float:right;"></el-pagination>
		</el-col>
		<role-members-list-dialog></role-members-list-dialog>
	</div>
</template>

<script>
    import role from '../../../api/role'
    import roleMembersListDialog from './role.members.list.dialog.vue'
    export default {
        components: {
            roleMembersListDialog
        },
        data() {
            return {
                tableData: [],
                currentID:'',
                total: 0,
                page: 1,
                listLoading: false,
                multipleSelection: [],
                multipleSelectionID:''
            };
        },
        methods: {
            handleCurrentChange(val) {
                this.page = val;
                this.getList();
            },
            handleSelectionChange(val) {
                this.multipleSelection.splice(0, this.multipleSelection.length);
                for(var i = 0; i<val.length; i++){
                    this.multipleSelection.push(val[i].id);
                }
                this.multipleSelectionID = this.multipleSelection.join(',');
            },
            add(){
                if(this.currentID){
                    this.$bus.$emit('membersDialogShow',this.currentID);
				}else{
                    this.$message({
                        message: "请先单击选择角色再添加！",
                        type: 'warning'
                    });
				}
            },
            del(){
                if(this.multipleSelectionID){
                    var _this = this;
                    _this.$confirm('您确定要移除选中的成员吗？', '提示', {
                    }).then(() => {
                        role.delroleMembers(_this.currentID,_this.multipleSelectionID)
                            .then(res => {
                                if(res.code==0){
                                    _this.editFormVisible = false;
                                    _this.$message({
                                        message: "移除成功！",
                                        type: 'success'
                                    });
                                    this.getList();
                                }
                            })
                            .catch(function (error) {
                                _this.listLoading = false;
                                _this.$Error(_this,error);
                            })
                    })
                }else{
                    this.$message({
                        message: "请选择一条数据！",
                        type: 'warning'
                    });
                }
            },
            getList(val){
                var _this = this;
                var id =this.currentID;
                var params = {
                    page:_this.page,
                    rows:10,
                    pageNum:_this.page,
                    pageNumber:_this.page,
                    pageSize:10
                }
                _this.listLoading = true;
                role.getMembers(id,params)
                    .then(res => {
                        _this.total = res.totalElements;
                        _this.tableData = res.content;
                        _this.listLoading = false;
                    })
                    .catch(function (error) {
                        _this.listLoading = false;
                        _this.$Error(_this,error);
                    })
            },
        },
        created: function () {
            this.$bus.$off('getMembers');
            this.$bus.$on('getMembers', (dataid) => {
                this.currentID=dataid;
                this.getList();
            })
        },
        mounted() {
            if(this.currentID){
                this.getList();
			}
        }
    };
</script>