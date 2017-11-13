<!--新增编辑操作员界面-->
<template>
	<el-dialog :title="editFormTtile" size="small" v-model="editFormVisible" @close="hideDialog">
		<!--工具条-->
		<el-row>
			<el-form label-width="100px">
				<el-col :span="12">
					<el-form-item label="管理员账号" :inline="true"><el-input  placeholder="请输入管理员账号" v-model="filters.operatorName"></el-input></el-form-item>
				</el-col>
				<el-col :span="11" :offset="1">
					<el-form-item class="btn_box">
						<el-button type="primary" icon="search" v-on:click="getMembersList()">查询</el-button>
					</el-form-item>
				</el-col>
			</el-form>
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
		<div slot="footer" class="dialog-footer">
			<el-button @click.native="hideDialog">取消</el-button>
			<el-button type="primary" @click.native="Submit" :loading="editLoading">{{btnEditText}}</el-button>
		</div>
	</el-dialog>
</template>

<script>
    import role from '../../../api/role'
    export default {
        data() {
            return {
                currentID:'',
                multipleSelection:'',
                editFormVisible: false,//编辑界面显是否显示
                editFormTtile: '添加成员',//编辑界面标题
                editLoading: false,
                btnEditText: '提交',

                tableData: [],
                total: 0,
                page: 1,
                listLoading: false,
                filters:{
                    operatorName:''
                },
                multipleSelection: [],
                multipleSelectionID:''
            };
        },
        created(){
            this.$bus.$off('membersDialogShow');
            this.$bus.$on('membersDialogShow', (id) => {
                this.currentID = id;
                this.membersDialogShow();
            })
        },
        methods: {
            handleCurrentChange(val) {
                this.page = val;
                this.getMembersList();
            },
            handleSelectionChange(val) {
                this.multipleSelection.splice(0, this.multipleSelection.length);
                for(var i = 0; i<val.length; i++){
                    this.multipleSelection.push(val[i].id);
                }
                this.multipleSelectionID = this.multipleSelection.join(',');
            },
            hideDialog(){
                this.editFormVisible = false;
                setTimeout(() =>{
                    this.filters.operatorName='';
                },100)
            },
            //显示dialog模态框
            membersDialogShow(){
                var _this = this;
                _this.editFormVisible = true;
                _this.getMembersList();
            },
            //添加成员
            Submit() {
                var _this = this;
                if(_this.multipleSelectionID.length>0){
                    role.addroleMembers(_this.currentID,_this.multipleSelectionID)
                        .then(res => {
                            if(res.code==0){
                                _this.editFormVisible = false;
                                _this.$message({
                                    message: "添加成功！",
                                    type: 'success'
                                });
                                _this.$bus.$emit('getMembers',_this.currentID);//获得成员
                            }
                        })
                        .catch(function (error) {
                            _this.listLoading = false;
                            _this.$Error(_this,error);
                        })
				}else{
                    _this.$message({
                        message: "请选择一条数据！",
                        type: 'warning'
                    });
				}

            },
            //获得成员列表
            getMembersList(){
                var _this = this;
                var id =this.currentID;
                var params = {
                    page:_this.page,
                    rows:5,
                    pageNum:_this.page,
                    pageNumber:_this.page,
                    pageSize:5,
                    operatorName:_this.filters.operatorName
                }
                _this.listLoading = true;
                role.getroleMembers(id,params)
                    .then(res => {
                        _this.total = res.totalElements;
                        _this.tableData = res.content;
                        _this.listLoading = false;
                    })
                    .catch(function (error) {
                        _this.listLoading = false;
                        _this.$Error(_this,error);
                    })

            }
        },
        mounted() {
            //var _this = this;
        }
    };
</script>


