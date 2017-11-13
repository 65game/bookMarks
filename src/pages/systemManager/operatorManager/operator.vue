<template>
	<div class="box">
		<!--工具条-->
		<el-row>
			<el-form label-width="80px">
				<el-col :span="4">
					<el-form-item label="用户名" :inline="true"> <el-input  placeholder="请输入用户名" v-model="filters.name"></el-input></el-form-item>
				</el-col>
				<el-col :span="4" :offset="1">
					<el-form-item label="邮箱地址" :inline="true"> <el-input  placeholder="请输入邮箱地址" v-model="filters.email"></el-input></el-form-item>
				</el-col>
				<el-col :span="4" :offset="1">
					<el-form-item label="手机号码" :inline="true"> <el-input  placeholder="请输入手机号码" v-model="filters.phone"></el-input></el-form-item>
				</el-col>
				<el-col :span="9" :offset="1">
					<el-form-item class="btn_box">
						<el-button type="primary" icon="search" v-on:click="getOperator()">查询</el-button>
						<!--<el-button type="primary" icon="delete2" v-on:click="clear()">清空</el-button>-->
					</el-form-item>
				</el-col>
			</el-form>
		</el-row>

		<el-row class="button_box">
			<el-button  icon="plus" class="btn_border_none"  @click="handleAdd">添加</el-button>
		</el-row>
		<el-table :data="tableData" border style="width: 100%" v-loading="listLoading" @selection-change="handleSelectionChange">
			<!--<el-table-column type="selection" width="55"></el-table-column>-->
			<el-table-column prop="name" label="管理员账号" width="140"></el-table-column>
			<el-table-column prop="realName" label="真实姓名" width="120"></el-table-column>
			<el-table-column prop="email" label="邮箱" width="200"></el-table-column>
			<el-table-column prop="ip" label="IP地址" width="150"></el-table-column>
			<el-table-column prop="mobile" label="手机号码" width="140"></el-table-column>
			<el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
			<el-table-column prop="lastLoginTime" label="最后登录时间" width="180"></el-table-column>
			<el-table-column prop="workNumber" label="工号" width="120"></el-table-column>
			<el-table-column prop="loginCount" label="登录次数" width="100"></el-table-column>
			<el-table-column prop="lockFlag" label="锁定状态" :formatter="formatter" width="100"></el-table-column>
			<el-table-column inline-template :context="_self" label="操作"  width="150" fixed="right">
	             <span>
					<el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
					 <el-button type="danger" size="small" @click="handlelock(row)"  v-if=" JSON.parse(row.extension).lockFlag == 0">锁定</el-button>
					 <el-button type="success" size="small" @click="handleUllock(row)"  v-else>解锁</el-button>
				</span>
			</el-table-column>
		</el-table>
		<!--分页-->
		<el-col :span="24" class="toolbar" style="padding-bottom:10px;">
			<el-pagination @current-change="handleCurrentChange" :page-size="10" layout="total, prev, pager, next, jumper" :total="total" style="float:right;"></el-pagination>
		</el-col>
		<operator-add></operator-add>
	</div>
</template>

<script>
    import operator from '../../../api/operator'
    import operatorAdd from './operator.dialog.vue'
    export default {
        components: {
            operatorAdd
        },
        data() {
            return {
                filters: {
                    name: '',
                    email:'',
                    phone:''
                },
                tableData: [],
                total: 0,
                page: 1,
                listLoading: false,
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.page = val;
                this.getOperator();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleAdd(){
                var data = {};
                this.$bus.$emit('operatorDialogShow','新增',data,'add');
            },
            handlelock(row, column){
                var _this = this;
                _this.$confirm('您确定要锁定该用户吗？', '提示', {
                }).then(() => {
                    var params = {
                        id:row.id,
                    }
                    operator.lock(params).then(res => {
                        if(res.code==0){
                            this.$message({
                                type: 'success',
                                message: '锁定成功！'
                            });
                            this.getOperator();
                        }
                    })
                })
            },
            handleUllock(row, column){
                var _this = this;
                _this.$confirm('您确定要解锁该用户吗？', '提示', {
                }).then(() => {
                    var params = {
                        id:row.id,
                    }
                    operator.unlock(params).then(res => {
                        if(res.code==0){
                            this.$message({
                                type: 'success',
                                message: '解锁成功！'
                            });
                            this.getOperator();
                        }
                    })
                })
            },
            handleEdit(row){
                var _data = this.$Utils.dataClone(row);
                this.$bus.$emit('operatorDialogShow','编辑',_data,'edit');
            },
            formatter(row, column) {
                var extension = JSON.parse(row.extension);
                var text = "";
                if (extension.lockFlag == "0") {
                    text = "未锁定";
                } else if (extension.lockFlag == "1") {
                    text = "已锁定";
                }
                return text;
            },
            getOperator(val){
                var _this = this;
                var params = {
                    page:_this.page,
                    rows:10,
                    pageNum:_this.page,
                    pageNumber:_this.page,
                    pageSize:10,
                    name: this.filters.name,
                    email:this.filters.email,
                    mobile:this.filters.phone
                }
                _this.listLoading = true;
                operator.getList(params)
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
            clear(){
                this.filters.name='';
                this.filters.email='';
                this.filters.phone='';
            }
        },
        created: function () {
            this.$bus.$off('updatagOperator');
            this.$bus.$on('updatagOperator', () => {
                this.getOperator();
            })
        },
        mounted() {
            this.getOperator();
        }
    }
</script>

<style scoped>
	.el-form-item{ margin-bottom: 10px;}
</style>
